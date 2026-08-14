import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'
import { execFileSync } from 'child_process'

/**
 * The absolute rule for a creature's carried gear (D-133, owner ruling):
 *
 *   A weapon uses the equipment section's REAL damage and REAL properties. The
 *   only legitimate departure is a Quality step, and the creature's tier and
 *   category already say which Quality it carries (D-091).
 *
 * A **rider** on a weapon attack is NOT forbidden — it is a legitimate design
 * tool, and at high tier close to a necessity, because carried gear gains one
 * Quality every two tiers while the chassis gains weapon damage every tier
 * (principle 40). What is forbidden is touching the weapon itself.
 *
 * This is enforced in `generate-creatures.ts` rather than by review because it was
 * broken three times with the principle written down and a gate attached: a
 * `Censer` given invented properties and a bespoke damage figure, and a Shortsword
 * docked a point of weapon damage to pay for a `bleeding` rider. Both named the
 * right catalogue row in prose and got the numbers wrong anyway.
 *
 * The tests below mutate a copy of the roster, run the real generator against it,
 * and assert it refuses to build. Anything that stops firing here is a hole.
 */
const REPO = path.resolve(__dirname, '../..')
const GENERATOR = path.join(REPO, 'src/utils/content-gen/generate-creatures.ts')
const ROSTER = path.join(REPO, 'src/utils/data/json/creatures.json')
const WEAPONS = path.join(REPO, 'src/utils/data/json/weapons.json')

interface Attack {
	name: string
	weapon?: string
	quality?: number
	critWeaponDamage?: number
	properties?: string[]
	text: string
}
interface Creature {
	name: string
	tier: number
	category: string
	attacks: Attack[]
}
interface WeaponRow {
	name: string
	damage: string
	properties: string
}

const roster: Creature[] = JSON.parse(fs.readFileSync(ROSTER, 'utf-8'))
const weapons: WeaponRow[] = JSON.parse(fs.readFileSync(WEAPONS, 'utf-8'))
const rows = new Map(weapons.map((w) => [w.name, w]))

/** Run the real generator over a mutated roster; return its stderr, or '' if it built. */
function buildWith(mutate: (r: Creature[]) => void): string {
	const original = fs.readFileSync(ROSTER, 'utf-8')
	const copy: Creature[] = JSON.parse(original)
	mutate(copy)
	try {
		fs.writeFileSync(ROSTER, `${JSON.stringify(copy, null, '\t')}\n`)
		try {
			execFileSync('bun', [GENERATOR, '--check'], {
				cwd: REPO,
				stdio: 'pipe',
				encoding: 'utf-8',
			})
			return ''
		} catch (err) {
			const e = err as { stderr?: string; stdout?: string }
			return `${e.stderr ?? ''}${e.stdout ?? ''}`
		}
	} finally {
		fs.writeFileSync(ROSTER, original)
	}
}

function attack(r: Creature[], creature: string, name: string): Attack {
	const c = r.find((x) => x.name === creature)
	if (!c) throw new Error(`no creature "${creature}" in the roster`)
	const a = c.attacks.find((x) => x.name === name)
	if (!a) throw new Error(`no attack "${name}" on ${creature}`)
	return a
}

describe('carried weapons use the equipment section verbatim (D-133)', () => {
	it('every declared weapon names a real catalogue row', () => {
		for (const c of roster)
			for (const a of c.attacks) {
				if (a.weapon === undefined) continue
				expect(
					rows.has(a.weapon),
					`${c.name} "${a.name}" resolves to "${a.weapon}", not a weapons.json row`,
				).toBe(true)
			}
	})

	it('every declared weapon carries its row’s properties verbatim', () => {
		// A shield banks AV / parry / rigid into the creature's stat line, so those
		// are deliberately absent from the attack (principle 23).
		const banked = /^(?:AV \+\d+|parry \+\d+|rigid \d+)$/i
		for (const c of roster)
			for (const a of c.attacks) {
				if (a.weapon === undefined) continue
				const row = rows.get(a.weapon)!
				const expected = row.properties
					.split(',')
					.map((p) => p.trim())
					.filter((p) => p !== '' && !banked.test(p))
					.sort()
				expect(
					[...(a.properties ?? [])].sort(),
					`${c.name} "${a.name}" (${a.weapon})`,
				).toEqual(expected)
			}
	})

	it('every carried attack’s weapon damage is the row plus its Quality step', () => {
		const gear: Record<string, number[]> = {
			Basic: [2, 2, 3, 4, 5],
			Elite: [2, 3, 4, 5, 6],
			Lord: [3, 4, 5, 6, 7],
		}
		const step: Record<number, number> = { 2: 0, 3: 1, 4: 1, 5: 2, 6: 3, 7: 4, 8: 5 }
		for (const c of roster)
			for (const a of c.attacks) {
				if (a.weapon === undefined) continue
				// the triple is not always first: an attack that changes its target
				// defense opens with the whole roll. Multi-target attacks take half
				// weapon damage rounded up, a published scaling rule, so they are exempt.
				const m = /(\d+)\/(\d+)\/(\d+) damage/.exec(a.text)
				if (!m) continue
				if (/\b(?:every|each|all) creature/i.test(a.text)) continue
				const [x, y, z] = [Number(m[1]), Number(m[2]), Number(m[3])]
				// Weapon damage is the weak-to-strong step; an always-on critical bonus
				// (Orcish Fury) raises only the critical and must be declared (D-135).
				const crit = 1 + (a.critWeaponDamage ?? 0)
				expect(
					z - y,
					`${c.name} "${a.name}" critical step (critWeaponDamage ${a.critWeaponDamage ?? 0})`,
				).toBe((y - x) * crit)
				// the first band is three tiers wide (0-2), the rest are two
				const band = c.tier <= 2 ? 0 : Math.min(4, Math.floor((c.tier - 1) / 2))
				const quality = a.quality ?? gear[c.category][band]
				expect(
					y - x,
					`${c.name} "${a.name}" (${a.weapon}, Quality ${quality})`,
				).toBe(Number(rows.get(a.weapon)!.damage) + step[quality])
			}
	})

	it('has at least one carried weapon to check, so the suite cannot pass vacuously', () => {
		const declared = roster.flatMap((c) =>
			c.attacks.filter((a) => a.weapon !== undefined),
		)
		expect(declared.length).toBeGreaterThan(10)
	})
})

describe('the generator refuses to build each historical defect', () => {
	it('rejects an invented weapon property', () => {
		const out = buildWith((r) => {
			attack(r, 'Cult Priest', 'Censer').properties = ['crush', 'reach']
		})
		expect(out).toContain('but the catalogue row is')
	})

	it('rejects weapon damage docked to pay for a rider', () => {
		const out = buildWith((r) => {
			attack(r, 'Slinger', 'Shortsword').text = '4/5/6 damage.'
		})
		expect(out).toContain('weapon damage')
	})

	it('rejects the doubled increment (6/10/14 for 6/9/12)', () => {
		const out = buildWith((r) => {
			attack(r, 'Spearman', 'Spear').text = '6/10/14 damage.'
		})
		expect(out).toContain('should read 6/9/12')
	})

	it('rejects a weapon that is not in the catalogue', () => {
		const out = buildWith((r) => {
			attack(r, 'Veteran', 'Spear').weapon = 'Censer'
		})
		expect(out).toContain('not a row in weapons.json')
	})

	it('rejects carried gear that skips the declaration', () => {
		const out = buildWith((r) => {
			delete attack(r, 'Orc Raider', 'Javelin').weapon
		})
		expect(out).toContain('declares no "weapon" field')
	})

	it('rejects silently giving a Basic its officer’s Quality', () => {
		const out = buildWith((r) => {
			attack(r, 'Spearman', 'Spear').text = '7/11/15 damage.'
		})
		expect(out).toContain('Quality 2 gear')
	})

	it('checks an attack whose damage triple is not the first thing in its text', () => {
		// The Goblin Chief's Sling opens by writing out its roll, which anchoring to
		// the start of the text silently skipped.
		const out = buildWith((r) => {
			const a = attack(r, 'Slinger', 'Sling')
			a.text = 'Roll Strength + Fighting vs. Dodge. 7/11/15 damage.'
		})
		expect(out).toContain('Quality 2 gear')
	})

	it('exempts a multi-target attack, which takes half weapon damage by rule', () => {
		// The Polearm Soldier's Sweeping Blow is 6/8/10 off a Glaive's 4, because
		// multi-target halves it. That is scaling, not an adjusted weapon.
		const out = buildWith((r) => {
			attack(r, 'Polearm Soldier', 'Sweeping Blow')
		})
		expect(out).not.toContain('weapon damage')
	})

	it('rejects an inflated critical that is not declared', () => {
		const out = buildWith((r) => {
			const a = attack(r, 'Spearman', 'Spear')
			a.text = '7/10/16 damage.' // Orcish-Fury-shaped, but the Spearman has no such ability
		})
		expect(out).toContain('critWeaponDamage')
	})

	it('allows a declared always-on critical bonus (Orcish Fury)', () => {
		// The published Orc Raider already carries it; assert the roster form is legal
		// rather than tolerated by accident.
		// Assert the RELATIONSHIP, not a literal triple: the orc's tier moved once
		// already (1 -> 2 in the roster-adjustment batch) and pinning 6/9/15 made this
		// test fail on a legitimate re-stat rather than on a defect.
		const raider = roster.find((c) => c.name === 'Orc Raider')!
		const axe = raider.attacks.find((a) => a.name === 'Battleaxe')!
		expect(axe.critWeaponDamage).toBe(1)
		const m = /(\d+)\/(\d+)\/(\d+) damage/.exec(axe.text)!
		const [x, y, z] = [Number(m[1]), Number(m[2]), Number(m[3])]
		// one extra application of weapon damage on the critical, at any tier
		expect(z - y).toBe(2 * (y - x))
	})

	it('keeps Orcish Fury OUT of a thrown weapon, which is ranged by rule', () => {
		const raider = roster.find((c) => c.name === 'Orc Raider')!
		const javelin = raider.attacks.find((a) => a.name === 'Javelin')!
		expect(javelin.critWeaponDamage).toBeUndefined()
	})

	it('allows a deliberate Quality exception when it is declared', () => {
		const out = buildWith((r) => {
			const a = attack(r, 'Spearman', 'Spear')
			a.quality = 3
			a.text = '7/11/15 damage.'
		})
		// Only the staleness check should complain, never the weapon guard.
		expect(out).not.toContain('Quality 2 gear')
		expect(out).not.toContain('but the catalogue row is')
	})
})
