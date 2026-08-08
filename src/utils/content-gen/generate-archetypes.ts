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

/**
 * The overview's comparison table, and the anchor every archetype page links
 * back to. Heading and slug are derived from one constant so the back-link
 * cannot drift from its destination the way it did in S2.
 */
const OVERVIEW_SECTION = 'Archetypes at a Glance'
const OVERVIEW_ANCHOR = OVERVIEW_SECTION.toLowerCase().replace(/\s+/g, '-')

function frontmatter(sidebarPosition: number): string {
	return ['---', `sidebar_position: ${sidebarPosition}`, '---'].join('\n')
}

/**
 * One labelled block of the card. Markdown children throughout, never props: the
 * skill names, weapon categories and item names inside are exactly what the chip
 * and keyword plugins exist to catch (component-patterns § 1).
 */
function section(label: string, ...blocks: string[]): string {
	return [
		`<ArchetypeSection label="${label}">`,
		'',
		blocks.join('\n\n'),
		'',
		'</ArchetypeSection>',
	].join('\n')
}

/** A named field inside a section, with its value on one line. */
function field(label: string, value: string): string {
	return `<ArchetypeField label="${label}">${value}</ArchetypeField>`
}

/** A named field whose value is a list, so the label takes its own line. */
function blockField(label: string, value: string): string {
	return [
		`<ArchetypeField label="${label}" block>`,
		'',
		value,
		'',
		'</ArchetypeField>',
	].join('\n')
}

function markSkill(name: string, customised: Set<string>): string {
	return customised.has(name) ? `${name} ${DAGGER}` : name
}

function skillSection(a: DerivedArchetype): string {
	const { skills, record } = a
	// Skill names are deliberately NOT bold: both plugins skip text inside a
	// `strong` ancestor, so the old `**Fighting**` was the one thing on the page
	// the skill-chip plugin could never see (component-patterns § 2).
	const rank1 = skills.rank1
		.map((skill, i) => {
			const talent = record.recommendedTalents[i]
			return `- ${markSkill(skill, skills.customised)} - *${talent.name} (Rank 1)* - ${talent.gloss}`
		})
		.join('\n')
	const rank0 = skills.rank0
		.map((s) => markSkill(s, skills.customised))
		.join(', ')

	const blocks = [blockField('Rank 1', rank1), field('Rank 0', rank0)]
	if (skills.customised.size > 0) {
		const plural = skills.customised.size === 1 ? 'skill' : 'skills'
		blocks.push(
			`Note: ${DAGGER} Customized ${plural}, chosen outside the upbringing and background suggestions.`,
		)
	}
	return section('Skills', ...blocks)
}

function originSection(a: DerivedArchetype): string {
	const { upbringing, background } = a.skills
	return section(
		'Origin',
		[
			field(
				'Upbringing',
				`${upbringing.name} (${upbringing.skills.join(', ')})`,
			),
			field(
				'Background',
				`${background.name} (${background.skills.join(', ')})`,
			),
			// Granted for roleplay by the background, never bought, so it carries no
			// coins and no load (M22 D4, F10).
			field('Starting Item', `${background.startingItem} (0 load)`),
		].join('\n'),
	)
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
	// What the kit cost belongs WITH the kit (owner review): three figures under
	// the item list, each carrying its own derivation, rather than one run-on
	// "Totals" line naming all three at once.
	const tally = [
		'<ArchetypeTally',
		`\tcoins={${e.coinsRemaining}}`,
		`\tcoinsFrom="${STARTING_COINS} - ${e.coinsSpent} spent"`,
		`\tload={${e.totalLoad}}`,
		`\tloadFrom="equipment ${e.equipmentLoad} + standard gear ${STANDARD_GEAR_LOAD}"`,
		`\tcapacity={${e.carryCapacity}}`,
		`\tcapacityFrom="1/2 STR ${Math.floor(a.record.attributes.STR / 2)} + 8"`,
		'/>',
	].join('\n')
	return section('Equipment', lines.join('\n'), tally)
}

function combatArtsSection(a: DerivedArchetype): string | null {
	const { required, arts } = a.combatArts
	if (required === 0) return null
	const skills = a.skills
	const held = (['Fighting', 'Archery'] as const)
		.filter((s) => skills.rank1.includes(s) || skills.rank0.includes(s))
		.map((s) => `${s} rank ${skills.rank1.includes(s) ? 1 : 0}`)
	const plural = required === 1 ? 'Combat Art' : 'Combat Arts'
	return section(
		'Combat Arts',
		`With ${held.join(' and ')}, you know **${required} ${plural}**. Recommended:`,
		arts
			.map((art) => `- **${art.name}** (*${art.weapons}*) - ${art.gloss}`)
			.join('\n'),
	)
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
		field(kind, `${names}. ${rule}`),
		field(
			'Focus Pool',
			`(${focus.attribute} ${focus.value} - 2) + (2 x ${data.magicSkill} rank 1) = ${focus.total}`,
		),
	]

	const spells: string[] = []
	for (const option of data.options) {
		const byRank = new Map<number, string[]>()
		for (const spell of option.spells) {
			if (!byRank.has(spell.rank)) byRank.set(spell.rank, [])
			byRank.get(spell.rank)!.push(spell.name)
		}
		const ranks = [...byRank.entries()]
			.sort((x, y) => x[0] - y[0])
			.map(([rank, names]) => `  - Rank ${rank}: ${names.join(', ')}`)
		spells.push(`- **${option.name}:**`, ...ranks)
	}

	return section(
		'Spells',
		blocks.join('\n'),
		spells.join('\n'),
		`Note: at rank 1 you know ${a.spellsKnown} spells in total.`,
	)
}

function companionSection(a: DerivedArchetype): string | null {
	const companions = a.record.recommendedCompanions
	const familiars = a.record.recommendedFamiliars
	// The talent and the spell grant the ABILITY to have a companion, never the
	// creature (owner ruling; the Mounts & Companions chapter has always said so).
	// A starting character may pay for one out of the 350 coins, and this page is
	// where a new player looks for that number — so the cost and the remainder are
	// derived and stated rather than left to the reader.
	const cost = a.companionCost
	if (companions && cost) {
		return section(
			'Animal Companion',
			`The talent lets you keep a companion, it does not give you one. A trained Tier 1 companion costs ${cost.cost} coins, which you can pay from your starting coins to begin play with it, leaving ${cost.left}. You can also tame one during play instead.`,
			'Use the companion base stat block with Tier equal to your Nature rank (see the Mounts & Companions rules). Then pick any one Animal trait to define your companion.',
			'Suggested traits:',
			companions.map((c) => `- **${c.name}.** ${c.gloss}`).join('\n'),
		)
	}
	if (familiars && cost) {
		return section(
			'Familiar',
			`Conjure Familiar is a ritual taking hours, and each casting spends ${cost.cost} coins of incense and occult ingredients. You can pay that from your starting coins to begin play with your familiar already summoned, leaving ${cost.left}.`,
			'Build your familiar as a Tier 0 companion (see the Mounts & Companions rules), then pick any one Animal trait to define its form and role.',
			'Suggested traits:',
			familiars.map((f) => `- **${f.name}.** ${f.gloss}`).join('\n'),
		)
	}
	return null
}

/**
 * The card holds the BUILD only (M22 Q4, owner). The overview line introduces it
 * and the two advice paragraphs close the page, both as ordinary prose, so an
 * archetype page reads like the rest of the content pages with one card in it.
 */
function renderArchetype(a: DerivedArchetype, sidebarPosition: number): string {
	const { attributes } = a.record
	const card = [
		'<ArchetypeCard',
		`\trole="${a.record.role}"`,
		`\tstr="d${attributes.STR}"`,
		`\tagi="d${attributes.AGI}"`,
		`\tspi="d${attributes.SPI}"`,
		`\tmnd="d${attributes.MND}"`,
		'>',
	].join('\n')

	const sections = [
		originSection(a),
		skillSection(a),
		combatArtsSection(a),
		equipmentSection(a),
		spellSection(a),
		companionSection(a),
	].filter((b): b is string => b !== null)

	const blocks: string[] = [
		frontmatter(sidebarPosition),
		`# ${a.record.name}`,
		BANNER,
		a.record.description,
		card,
		...sections,
		'</ArchetypeCard>',
		['## Playstyle', '', a.record.playstyle].join('\n'),
		['## Advancement', '', a.record.advancement].join('\n'),
		// The label names the section it lands on. It used to read "Back to Quick
		// Reference" against a heading called "Quick Reference: Archetype
		// Overview", and S2 renamed that heading without moving the label with it
		// — a link whose words do not match its destination.
		`[Back to all archetypes](${OVERVIEW_PATH}/overview#${OVERVIEW_ANCHOR})`,
	]
	return blocks.join('\n\n') + '\n'
}

/**
 * The overview's intro and closing advice. Page prose rather than archetype
 * data, so it lives with the generator: nothing derives it and nothing else
 * states it.
 */
const OVERVIEW_LEAD = `![banner-img](/img/banner/character-creation-banner.png)

> "The greatest warriors were once novices with nothing but determination and a well-chosen path."

Twenty-five characters built by the standard rules and ready to play as written. Filter the table by the job you want in the party, then open one to see its full build.`

const OVERVIEW_USING = `## Using These Examples

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

/** The jobs a party is built from, in the order it is usually built. */
const ROLE_ORDER = ['Tank', 'Striker', 'Support', 'Controller'] as const

/**
 * What may follow the slash without being a party job of its own. These say how
 * the archetype plays rather than what seat it takes, so they are not filters.
 */
const QUALIFIER_ROLES = ['Utility', 'Hybrid']

/** Every role an archetype claims, from a `Tank / Striker` string. */
function rolesOf(role: string): string[] {
	return role
		.split('/')
		.map((part) => part.trim())
		.filter(Boolean)
}

function renderOverview(all: DerivedArchetype[]): string {
	// The filter offers the four party jobs, so every archetype must lead with
	// one — otherwise a reader filtering for "Support" silently loses rows. The
	// qualifier after the slash is a different vocabulary (`Utility`, `Hybrid`)
	// and is not offered as a filter, but it is still checked, because an unknown
	// word there means the role string drifted (D3: fail loud).
	const unknown = all.filter((a) => {
		const [primary, ...rest] = rolesOf(a.record.role)
		return (
			!(ROLE_ORDER as readonly string[]).includes(primary) ||
			rest.some(
				(role) =>
					!(ROLE_ORDER as readonly string[]).includes(role) &&
					!QUALIFIER_ROLES.includes(role),
			)
		)
	})
	if (unknown.length > 0)
		throw new Error(
			`[generate-archetypes] unrecognised role on: ${unknown
				.map((a) => `${a.record.name} (${a.record.role})`)
				.join(', ')}`,
		)

	// ONE surface, narrowed, rather than two listings of the same 25 archetypes
	// (owner review). The role-grouped index that used to sit above this table
	// answered "what kind of character do I want to be" — so does a filter over
	// the Role column, and it leaves the table as the comparison surface it is
	// good at instead of repeating it.
	//
	// A role written `Tank / Striker` answers to BOTH filters, because the filter
	// matches the cell's text rather than a parsed primary role.
	const table = [
		`<TableFilter column="Role" options="${ROLE_ORDER.join(', ')}">`,
		'',
		'| Archetype | Role | Primary Skills | Best For |',
		'|-----------|------|----------------|----------|',
		...all.map(
			(a) =>
				`| [${a.record.name}](${OVERVIEW_PATH}/${a.slug}) | ${a.record.role} | ${a.skills.rank1.join(', ')} | ${a.record.bestFor} |`,
		),
		'',
		'</TableFilter>',
	].join('\n')

	// The table leads (owner review): a reader arrives to pick an archetype, not
	// to read the character-creation rules again, so the rules that produced them
	// sit under it rather than in front of it.
	return (
		[
			frontmatter(0),
			'# Quickstart Characters',
			BANNER,
			OVERVIEW_LEAD,
			[`## ${OVERVIEW_SECTION}`, '', table].join('\n'),
			OVERVIEW_USING,
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
