/**
 * Write the owner's damage rulings into the canonical spell JSON (M19).
 *
 * `backfill-spell-damage.ts` proposes what the text states outright. This
 * applies the 85 judgements that needed a person: which spells deal damage of
 * their own, and which only raise someone else's. The rulings and their themes
 * live in `spell-damage-rulings.json` beside this script, so the reasoning is
 * readable after the fact instead of being buried in a diff.
 *
 * Usage:
 *   bun run spells:damage-rulings            report what would change
 *   bun run spells:damage-rulings --apply    write it
 *
 * Every spell named must exist and must not already carry a block, and every
 * spell needing a ruling must be named — a rulings file that has drifted from
 * the corpus stops the run rather than half-applying.
 */
import fs from 'fs'
import path from 'path'
import { damageClaimsFromEffect } from '../../content-gen/spell-damage-check'
import { validateSpellDamage } from '../../typescript/spellDamage'

const REPO = path.resolve(__dirname, '../../../..')
const JSON_DIR = path.join(REPO, 'src/utils/data/json')
const RULINGS = path.join(__dirname, 'spell-damage-rulings.json')

const SOURCES = ['arcane-spells.json', 'mystic-spells.json']

/** A spell the backfill left alone but whose text says damage somewhere. */
const needsRuling = (spell: any): boolean => {
	if (spell.damage) return false
	const claims = damageClaimsFromEffect(spell.effect, spell.name)
	const hasLevelDamage = (['weak', 'strong', 'critical'] as const).some(
		(l) => claims.levels[l].length > 0,
	)
	return claims.prose.length > 0 || hasLevelDamage
}

function main() {
	const apply = process.argv.includes('--apply')
	const raw = JSON.parse(fs.readFileSync(RULINGS, 'utf-8')) as Record<
		string,
		unknown
	>
	const rulings = new Map(
		Object.entries(raw).filter(([key]) => !key.startsWith('_')),
	)

	const unused = new Set(rulings.keys())
	let blocks = 0
	let noBlock = 0
	const missing: string[] = []

	for (const file of SOURCES) {
		const full = path.join(JSON_DIR, file)
		const entries: any[] = JSON.parse(fs.readFileSync(full, 'utf-8'))
		let touched = false

		entries.forEach((spell, i) => {
			if (!rulings.has(spell.name)) {
				if (needsRuling(spell)) missing.push(`${file} — ${spell.name}`)
				return
			}
			unused.delete(spell.name)
			const ruling = rulings.get(spell.name)

			if (ruling === null) {
				if (spell.damage)
					throw new Error(
						`${file} — ${spell.name} is ruled to deal no damage, but carries a block.`,
					)
				noBlock++
				return
			}
			/*
			 * Idempotent: a ruling already in the JSON is left alone, and one that
			 * disagrees with what is there stops the run. Re-running must be safe,
			 * because the alternative is a script nobody dares use twice.
			 */
			if (spell.damage) {
				if (JSON.stringify(spell.damage) !== JSON.stringify(ruling))
					throw new Error(
						`${file} — ${spell.name} carries ${JSON.stringify(spell.damage)}, ` +
							`but the ruling says ${JSON.stringify(ruling)}. Reconcile them by hand.`,
					)
				blocks++
				return
			}

			validateSpellDamage(ruling, `${file}[${i}] (${spell.name})`)
			entries[i] = { ...spell, damage: ruling }
			blocks++
			touched = true
		})

		if (apply && touched) {
			fs.writeFileSync(full, JSON.stringify(entries, null, '\t') + '\n')
			console.log(`wrote ${file}`)
		}
	}

	if (unused.size)
		throw new Error(
			`rulings name spells that are not in the corpus: ${[...unused].join(', ')}`,
		)
	if (missing.length)
		throw new Error(
			`spells still need a ruling:\n  ${missing.join('\n  ')}`,
		)

	console.log(
		`${blocks} damage blocks ${apply ? 'in place' : 'ready'}, ` +
			`${noBlock} spells ruled to deal no damage of their own.`,
	)
}

main()
