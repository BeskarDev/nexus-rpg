/**
 * content:gen (quickstart archetypes) — generate the overview and the 25
 * archetype pages from the frozen app JSON (`src/utils/data/json/archetypes.json`),
 * M22. Canonical edits happen in the JSON; this MDX is generated, committed, and
 * never hand-edited (staleness check guards it). Mirrors generate-talents.ts.
 *
 * The same JSON builds a new player's sheet through `createInitialCharacter`, so
 * the docs and the character sheet cannot disagree by construction.
 *
 * Everything numeric on these pages is DERIVED (see archetype-derivation.ts),
 * which is what turns this generator into an auditor.
 *
 * Usage:
 *   bun src/utils/content-gen/generate-archetypes.ts           regenerate
 *   bun src/utils/content-gen/generate-archetypes.ts --check   staleness gate
 */
import fs from 'fs'
import path from 'path'
import {
	deriveAll,
	STANDARD_GEAR_LOAD,
	STARTING_COINS,
	type DerivedArchetype,
	type DerivedEquipment,
} from './archetype-derivation'

const REPO = path.resolve(__dirname, '../../..')
const DOC_DIR = path.join(REPO, 'docs/01-basic-rules/03-quickstart-characters')
const OVERVIEW_PATH = '/docs/basic-rules/quickstart-characters'

const BANNER =
	'{/* GENERATED from src/utils/data/json/archetypes.json by `bun run content:gen` — do not edit. Edit the JSON and regenerate. */}'

const DAGGER = '†'

function frontmatter(sidebarPosition: number): string {
	return ['---', `sidebar_position: ${sidebarPosition}`, '---'].join('\n')
}

function attributeTable(a: DerivedArchetype): string {
	const { attributes } = a.record
	return [
		'| STR | AGI | SPI | MND |',
		'|-----|-----|-----|-----|',
		`| d${attributes.STR} | d${attributes.AGI} | d${attributes.SPI} | d${attributes.MND} |`,
	].join('\n')
}

function markSkill(name: string, customised: Set<string>): string {
	return customised.has(name) ? `${name} ${DAGGER}` : name
}

function skillSection(a: DerivedArchetype): string {
	const { skills, record } = a
	const rank1 = skills.rank1.map((skill, i) => {
		const talent = record.recommendedTalents[i]
		const marked = markSkill(`**${skill}**`, skills.customised)
		return `- ${marked} - *${talent.name} (Rank 1)* - ${talent.gloss}`
	})
	const rank0 = skills.rank0.map((s) => markSkill(s, skills.customised))
	const blocks = [
		'**Rank 1 Skills**',
		'',
		rank1.join('\n'),
		'',
		`**Rank 0 Skills:** ${rank0.join(', ')}`,
	]
	if (skills.customised.size > 0) {
		const plural = skills.customised.size === 1 ? 'skill' : 'skills'
		blocks.push(
			'',
			`Note: ${DAGGER} Customized ${plural}, chosen outside the upbringing and background suggestions.`,
		)
	}
	return blocks.join('\n')
}

function originSection(a: DerivedArchetype): string {
	const { upbringing, background } = a.skills
	return [
		'**Upbringing & Background**',
		'',
		`- **Upbringing:** ${upbringing.name} (${upbringing.skills.join(', ')})`,
		`- **Background:** ${background.name} (${background.skills.join(', ')})`,
		`- **Starting Item:** ${background.startingItem} (0 load)`,
	].join('\n')
}

function equipmentLine(item: DerivedEquipment): string {
	const name = item.quantity > 1 ? `${item.name} x${item.quantity}` : item.name
	const cost = item.free ? 'free with the weapon' : `${item.cost} coins`
	const parts = [`- ${name} (${cost}, ${item.load} load)`]
	if (item.note) parts.push(` - ${item.note}`)
	return parts.join('')
}

function equipmentSection(a: DerivedArchetype): string {
	const e = a.equipment
	const lines = e.items.map(equipmentLine)
	if (e.toolkit)
		lines.push(`- ${e.toolkit.name} toolkit (included in standard gear)`)
	lines.push(
		`- **Total Load:** ${e.totalLoad} (equipment ${e.equipmentLoad} + standard gear ${STANDARD_GEAR_LOAD})`,
		`- **Carry Capacity:** ${e.carryCapacity} (1/2 STR ${Math.floor(a.record.attributes.STR / 2)} + 8)`,
		`- **Remaining Coins:** ${e.coinsRemaining} (of ${STARTING_COINS})`,
	)
	return ['**Equipment**', '', lines.join('\n')].join('\n')
}

function combatArtsSection(a: DerivedArchetype): string | null {
	const { required, arts } = a.combatArts
	if (required === 0) return null
	const skills = a.skills
	const held = (['Fighting', 'Archery'] as const)
		.filter((s) => skills.rank1.includes(s) || skills.rank0.includes(s))
		.map((s) => `${s} rank ${skills.rank1.includes(s) ? 1 : 0}`)
	const plural = required === 1 ? 'Combat Art' : 'Combat Arts'
	return [
		'**Combat Arts**',
		'',
		`With ${held.join(' and ')}, you know **${required} ${plural}**. Recommended:`,
		'',
		arts
			.map((art) => `- **${art.name}** (*${art.weapons}*) - ${art.gloss}`)
			.join('\n'),
	].join('\n')
}

function spellSection(a: DerivedArchetype): string | null {
	const data = a.record.spellData
	const focus = a.focus
	if (!data || !focus) return null

	const kind = data.magicSkill === 'Arcana' ? 'Discipline' : 'Tradition'
	const names = data.options
		.map((o) => (o.blurb ? `${o.name} (${o.blurb})` : o.name))
		.join(data.mode === 'devotion' ? ' or ' : ' and ')
	const rule =
		data.mode === 'devotion'
			? `Choose one ${kind.toLowerCase()} and take its spells.`
			: `Using Balance, you draw on both and choose spells freely from either.`

	const blocks = [
		'**Spells**',
		'',
		`**${kind}:** ${names}. ${rule}`,
		'',
		`**Focus Pool:** (${focus.attribute} ${focus.value} - 2) + (2 x ${data.magicSkill} rank 1) = ${focus.total}`,
		'',
		'**Starting Spells**',
		'',
	]

	for (const option of data.options) {
		const byRank = new Map<number, string[]>()
		for (const spell of option.spells) {
			if (!byRank.has(spell.rank)) byRank.set(spell.rank, [])
			byRank.get(spell.rank)!.push(spell.name)
		}
		const ranks = [...byRank.entries()]
			.sort((x, y) => x[0] - y[0])
			.map(([rank, spells]) => `  - Rank ${rank}: ${spells.join(', ')}`)
		blocks.push(`- **${option.name}:**`, ...ranks)
	}

	blocks.push('', `Note: at rank 1 you know ${a.spellsKnown} spells in total.`)
	return blocks.join('\n')
}

function companionSection(a: DerivedArchetype): string | null {
	const companions = a.record.recommendedCompanions
	const familiars = a.record.recommendedFamiliars
	if (companions) {
		return [
			'**Animal Companion**',
			'',
			'Use the companion base stat block with Tier equal to your Nature rank (see the Mounts & Companions rules). Then pick any one Animal trait to define your companion.',
			'',
			'Suggested traits:',
			'',
			companions.map((c) => `- **${c.name}.** ${c.gloss}`).join('\n'),
		].join('\n')
	}
	if (familiars) {
		return [
			'**Familiar**',
			'',
			'If you prepare Conjure Familiar, build your familiar as a Tier 0 companion (see the Mounts & Companions rules). Then pick any one Animal trait to define its form and role.',
			'',
			'Suggested traits:',
			'',
			familiars.map((f) => `- **${f.name}.** ${f.gloss}`).join('\n'),
		].join('\n')
	}
	return null
}

function renderArchetype(a: DerivedArchetype, sidebarPosition: number): string {
	const blocks: (string | null)[] = [
		frontmatter(sidebarPosition),
		`# ${a.record.name}`,
		BANNER,
		`**Role:** ${a.record.role}`,
		`**Overview:** ${a.record.description}`,
		['**Attributes**', '', attributeTable(a)].join('\n'),
		originSection(a),
		skillSection(a),
		combatArtsSection(a),
		equipmentSection(a),
		spellSection(a),
		companionSection(a),
		['**Playstyle**', '', a.record.playstyle].join('\n'),
		['**Advancement**', '', a.record.advancement].join('\n'),
		`[Back to Quick Reference](${OVERVIEW_PATH}/overview#archetypes-at-a-glance)`,
	]
	return blocks.filter((b): b is string => b !== null).join('\n\n') + '\n'
}

/**
 * The overview's intro and closing advice. Page prose rather than archetype
 * data, so it lives with the generator: nothing derives it and nothing else
 * states it.
 */
const OVERVIEW_INTRO = `![banner-img](/img/banner/character-creation-banner.png)

> "The greatest warriors were once novices with nothing but determination and a well-chosen path."

## Using These Examples

These quickstart characters demonstrate classic fantasy archetypes within Nexus RPG. Each example follows the standard character creation rules:

- **Starting XP:** 6 XP total (3 skills at rank 1 with 2 XP each, 4 skills at rank 0)
- **Starting Coins:** ${STARTING_COINS} coins for equipment (plus 10 unspendable coins)
- **Standard Gear:** Backpack, 2 pouches, traveler's clothes, hemp rope (1 load), camping kit (1 load), toolkit (1 load), rations d4 (1 load), torches d4 (1 load)
  - If an archetype lists a specific toolkit, it is the one from Standard Gear: it costs 0 extra coins and its load is already counted in the ${STANDARD_GEAR_LOAD}-load Standard Gear.
  - Selecting a weapon that needs ammunition gives you one unit of that ammunition for free.

Each archetype includes recommended attributes, skill selections with talent choices, upbringing and background, equipment purchases within the ${STARTING_COINS} coin budget, and playstyle descriptions.

Feel free to customize these examples to match your vision or use them as-is for quick character creation.`

const OVERVIEW_OUTRO = `## Customization Tips

**Adjusting Attributes**
While each example shows recommended attributes, you can swap the d8 and d4 to create different flavors:

- **Agile Fighter:** d8 AGI, d4 MND. Focus on light armor and quick weapons.
- **Strong Archer:** d8 STR, d4 MND. Use heavy bows and thrown weapons.

**Skill Variations**
The 3 rank 1 skills define your starting capabilities, but the 4 rank 0 skills show growth potential. Different rank 0 skills support varied secondary roles. Consider your party composition when selecting skills.

**Equipment Priorities**
With ${STARTING_COINS} coins, prioritize based on your role:

- **Frontline:** Invest in weapons and armor.
- **Casters:** Get your catalyst (included in toolkit), save coins for consumables.
- **Utility:** Balance between combat gear and tools.

**Talent Flexibility**
Each rank 1 skill offers multiple talent options. Consider offensive talents for strikers, defensive talents for tanks, and utility talents for support roles.

Remember: these are starting points. Your character will grow and specialize as you gain XP and advance through the ranks!`

/** The role a reader picks first, in the order a party is usually built. */
const ROLE_ORDER = ['Tank', 'Striker', 'Support', 'Controller'] as const

function primaryRole(role: string): string {
	const first = role.split('/')[0].trim()
	return (ROLE_ORDER as readonly string[]).includes(first) ? first : 'Other'
}

function renderOverview(all: DerivedArchetype[]): string {
	const byRole = new Map<string, DerivedArchetype[]>()
	for (const a of all) {
		const role = primaryRole(a.record.role)
		if (!byRole.has(role)) byRole.set(role, [])
		byRole.get(role)!.push(a)
	}
	const unknown = byRole.get('Other')
	if (unknown)
		throw new Error(
			`[generate-archetypes] unrecognised primary role on: ${unknown
				.map((a) => `${a.record.name} (${a.record.role})`)
				.join(', ')}`,
		)

	// A 25-row alphabetical table answers "what kind of character do I want to
	// be" last, so the role index goes above it and the table stays as the
	// comparison surface it is good at (M22 D7).
	const index = ROLE_ORDER.flatMap((role) => {
		const entries = byRole.get(role) ?? []
		if (entries.length === 0) return []
		return [
			`### ${role}`,
			'',
			entries
				.map(
					(a) =>
						`- [${a.record.name}](${OVERVIEW_PATH}/${a.slug}) - ${a.record.bestFor}`,
				)
				.join('\n'),
			'',
		]
	})

	const table = [
		'| Archetype | Role | Primary Skills | Best For |',
		'|-----------|------|----------------|----------|',
		...all.map(
			(a) =>
				`| [${a.record.name}](${OVERVIEW_PATH}/${a.slug}) | ${a.record.role} | ${a.skills.rank1.join(', ')} | ${a.record.bestFor} |`,
		),
	].join('\n')

	return (
		[
			frontmatter(0),
			'# Quickstart Characters',
			BANNER,
			OVERVIEW_INTRO,
			[
				'## Choose a Role',
				'',
				'Every archetype leans on one job in a party. Start here, then compare the details in the table below.',
			].join('\n'),
			index.join('\n').trim(),
			['## Archetypes at a Glance', '', table].join('\n'),
			OVERVIEW_OUTRO,
		].join('\n\n') + '\n'
	)
}

function main() {
	const check = process.argv.slice(2).includes('--check')
	const all = deriveAll()

	const pages = new Map<string, string>()
	pages.set('00-overview.mdx', renderOverview(all))
	all.forEach((a, i) => {
		pages.set(`${a.slug}.mdx`, renderArchetype(a, i + 1))
	})

	let stale = 0
	for (const [file, content] of pages) {
		const outFile = path.join(DOC_DIR, file)
		if (check) {
			const current = fs.existsSync(outFile)
				? fs.readFileSync(outFile, 'utf-8')
				: null
			if (current !== content) {
				stale++
				console.error(`STALE: ${path.relative(REPO, outFile)}`)
			}
			continue
		}
		fs.writeFileSync(outFile, content)
		// Retire the hand-written .md once its .mdx is generated.
		const legacy = outFile.replace(/\.mdx$/, '.md')
		if (fs.existsSync(legacy)) fs.rmSync(legacy)
	}

	if (check) {
		if (stale > 0) {
			console.error(
				`\ncontent:gen --check found ${stale} stale archetype page(s). Run \`bun run content:gen\` and commit.`,
			)
			process.exit(1)
		}
		console.log('content:gen --check: archetype pages up to date.')
		return
	}
	console.log(`wrote ${pages.size} archetype pages (${all.length} archetypes)`)
}

main()
