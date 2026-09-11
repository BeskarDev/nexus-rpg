/**
 * One-off: propose a `damage` block for every spell in the canonical JSON, and
 * write a review table for the designer (M19, owner-reported).
 *
 * The app used to infer spell damage from the effect text at import time. This
 * script runs that inference ONCE, against the whole corpus, so the guesses can
 * be read and corrected in one pass instead of being re-made — differently, and
 * silently — every time a player adds a spell to their sheet.
 *
 * Usage:
 *   bun run spells:damage-backfill            write the review table only
 *   bun run spells:damage-backfill --apply    also write the AUTO proposals into the JSON
 *
 * `--apply` writes only what the success-level clauses state outright. Every
 * REVIEW row stays out of the JSON until a person rules on it.
 */
import fs from 'fs'
import path from 'path'
import {
	damageClaimsFromEffect,
	damageTypeIn,
	normalizeTypeWord,
} from '../../content-gen/spell-damage-check'
import { SpellDamage } from '../../typescript/spellDamage'

const REPO = path.resolve(__dirname, '../../../..')
const JSON_DIR = path.join(REPO, 'src/utils/data/json')

/** Spells the owner ruled to deal no damage of their own (see the rulings file). */
const RULED_NONE: Set<string> = new Set(
	Object.entries(
		JSON.parse(
			fs.readFileSync(path.join(__dirname, 'spell-damage-rulings.json'), 'utf-8'),
		) as Record<string, unknown>,
	)
		.filter(([key, value]) => !key.startsWith('_') && value === null)
		.map(([key]) => key),
)

const SOURCES = [
	{ file: 'arcane-spells.json', magic: 'Arcana' as const, catKey: 'discipline' },
	{ file: 'mystic-spells.json', magic: 'Mysticism' as const, catKey: 'tradition' },
]

type Verdict = 'settled' | 'auto' | 'primary' | 'review' | 'mention' | 'none'

interface Row {
	file: string
	index: number
	name: string
	category: string
	verdict: Verdict
	reason: string
	proposal?: SpellDamage
	snippet: string
}

/** The effect text with markup and runs of whitespace flattened, for reading. */
const plain = (html: string): string =>
	html
		.replace(/<[^>]*>/g, ' ')
		.replace(/\s+/g, ' ')
		.trim()

/** The sentence around the first mention of damage, so a row can be judged. */
const damageSnippet = (html: string): string => {
	const text = plain(html)
	const at = text.search(/damage/i)
	if (at < 0) return ''
	const from = Math.max(0, text.lastIndexOf('.', at - 1) + 1)
	const end = text.indexOf('.', at)
	return text.slice(from, end < 0 ? text.length : end + 1).trim()
}

type Classification = Omit<Row, 'file' | 'index' | 'name' | 'category'>

function classify(spell: any, context: string): Classification {
	const claims = damageClaimsFromEffect(spell.effect, context)

	/*
	 * Already answered: the JSON states the damage, or the owner ruled that the
	 * spell deals none of its own. Either way there is nothing left to propose,
	 * and re-guessing a settled spell is how the old import kept being wrong.
	 */
	if (spell.damage)
		return {
			verdict: 'settled',
			reason: 'damage stated in the JSON',
			snippet: damageSnippet(spell.effect),
		}
	if (RULED_NONE.has(spell.name))
		return {
			verdict: 'settled',
			reason: 'ruled to deal no damage of its own',
			snippet: damageSnippet(spell.effect),
		}
	const snippet = damageSnippet(spell.effect)
	const levels = ['weak', 'strong', 'critical'] as const
	const counts = levels.map((l) => claims.levels[l].length)

	if (counts.every((c) => c === 1)) {
		const [weak, strong, critical] = levels.map((l) => claims.levels[l][0])
		const typeWord = claims.type ?? damageTypeIn(plain(spell.effect))
		return {
			verdict: 'auto',
			reason: 'one damage number under each success level',
			proposal: {
				type: typeWord ? normalizeTypeWord(typeWord) : 'physical',
				weak,
				strong,
				critical,
			},
			snippet,
		}
	}

	if (counts.some((c) => c > 0)) {
		if (claims.successRuns > 1) {
			return {
				verdict: 'review',
				reason: `${claims.successRuns} success-level runs, so no single number is the spell's damage`,
				snippet,
			}
		}

		/*
		 * One run, but a clause carries a second number: splash onto a neighbour
		 * (Static Spark), an alternative against light armour (Wind Slash), a
		 * per-affliction bonus (The Reckoning). The FIRST number in a clause is
		 * the damage to the spell's own target every time in this corpus, and it
		 * is the only one the sheet can carry. A level that names no number deals
		 * none at that level (Counterspell's weak nullifies and no more).
		 */
		const typeWord = claims.type ?? damageTypeIn(plain(spell.effect))
		const [weak, strong, critical] = levels.map((l) => claims.levels[l][0] ?? 0)
		return {
			verdict: 'primary',
			reason: `primary clause damage; rider or splash numbers (${levels
				.map((l) => claims.levels[l].join('+') || '0')
				.join(', ')}) are not modelled`,
			proposal: {
				type: typeWord ? normalizeTypeWord(typeWord) : 'physical',
				weak,
				strong,
				critical,
			},
			snippet,
		}
	}

	if (claims.prose.length) {
		return {
			verdict: 'review',
			reason: `damage mentioned in prose only (${claims.prose.join('/')})`,
			snippet,
		}
	}

	/*
	 * "Damage" with no number beside it anywhere: a resistance, a trigger
	 * ("whenever they take damage"), an illusion that deals none. A spell that
	 * deals damage always says how much, so these need no ruling — they are
	 * listed anyway, to be read once rather than trusted blindly.
	 */
	if (claims.mentionsDamage) {
		return {
			verdict: 'mention',
			reason: 'damage mentioned without a number',
			snippet,
		}
	}

	return { verdict: 'none', reason: 'no mention of damage', snippet: '' }
}

function main() {
	const apply = process.argv.includes('--apply')
	const rows: Row[] = []

	for (const src of SOURCES) {
		const file = path.join(JSON_DIR, src.file)
		const entries: any[] = JSON.parse(fs.readFileSync(file, 'utf-8'))

		entries.forEach((spell, index) => {
			const verdict = classify(spell, `${src.file}[${index}] (${spell.name})`)
			rows.push({
				file: src.file,
				index,
				name: spell.name,
				category: spell[src.catKey] ?? '',
				...verdict,
			})
		})

		if (apply) {
			rows
				.filter(
					(r) =>
						r.file === src.file &&
						(r.verdict === 'auto' || r.verdict === 'primary'),
				)
				.forEach((r) => {
					entries[r.index] = { ...entries[r.index], damage: r.proposal }
				})
			fs.writeFileSync(file, JSON.stringify(entries, null, '\t') + '\n')
			console.log(`applied AUTO proposals to ${src.file}`)
		}
	}

	const counts = {
		settled: rows.filter((r) => r.verdict === 'settled').length,
		auto: rows.filter((r) => r.verdict === 'auto').length,
		primary: rows.filter((r) => r.verdict === 'primary').length,
		review: rows.filter((r) => r.verdict === 'review').length,
		mention: rows.filter((r) => r.verdict === 'mention').length,
		none: rows.filter((r) => r.verdict === 'none').length,
	}

	const table = (subset: Row[], withProposal: boolean) =>
		subset.length === 0
			? '_None._'
			: [
			`| Spell | ${withProposal ? 'Proposed damage' : 'Why it needs a ruling'} | Text |`,
			'|---|---|---|',
			...subset.map((r) => {
				const middle = withProposal
					? `${r.proposal!.weak}/${r.proposal!.strong}/${r.proposal!.critical} ${r.proposal!.type}`
					: r.reason
				const text = r.snippet.replace(/\|/g, '\\|').slice(0, 200)
				return `| **${r.name}** (${r.category}) | ${middle} | ${text} |`
			}),
			].join('\n')

	const out = [
		'# Spell damage backfill — review table',
		'',
		`${rows.length} spells: **${counts.settled} settled** (a block in the JSON, or ruled ` +
			`to deal none), **${counts.auto} auto**, **${counts.primary} primary-clause**, ` +
			`**${counts.review} still need a ruling**, ${counts.mention} mention damage ` +
			`without a number, ${counts.none} never mention damage.`,
		'',
		'The rulings themselves live in `src/utils/scripts/maintenance/spell-damage-rulings.json`,',
		'grouped by theme. An empty table below means nothing is pending.',
		'',
		'AUTO rows state one damage number under each of Weak/Strong/Critical, which is',
		'the spell\'s own damage by construction. REVIEW rows say "damage" somewhere the',
		'parser cannot read as a direct effect: a zone, a reaction, or a bonus granted to',
		'something else. Each needs one of three rulings — a scaling block, a flat block,',
		'or no block at all (the spell grants damage, it does not deal it).',
		'',
		'## Needs a ruling',
		'',
		table(
			rows.filter((r) => r.verdict === 'review'),
			false,
		),
		'',
		'## Auto (applied by `--apply`)',
		'',
		table(
			rows.filter((r) => r.verdict === 'auto'),
			true,
		),
		'',
		'## Primary clause (applied, confirm the reading)',
		'',
		'One success-level run whose clauses carry more than one number. The first',
		'number is taken as the damage to the spell\'s own target; the rest is splash,',
		'a rider, or an alternative the sheet cannot carry.',
		'',
		[
			'| Spell | Applied | What else the clause says | Text |',
			'|---|---|---|---|',
			...rows
				.filter((r) => r.verdict === 'primary')
				.map(
					(r) =>
						`| **${r.name}** (${r.category}) | ${r.proposal!.weak}/${r.proposal!.strong}/${r.proposal!.critical} ${r.proposal!.type} | ${r.reason} | ${r.snippet.replace(/\|/g, '\\|').slice(0, 160)} |`,
				),
		].join('\n'),
		'',
		'## Mentions damage, states no number',
		'',
		'No block proposed. Listed so the judgement can be checked, not repeated.',
		'',
		table(
			rows.filter((r) => r.verdict === 'mention'),
			false,
		),
		'',
	].join('\n')

	const outFile = path.join(
		REPO,
		'docs/analysis/systems/spell-damage-backfill-review.md',
	)
	fs.writeFileSync(outFile, out)
	console.log(
		`${rows.length} spells: ${counts.settled} settled, ${counts.auto} auto, ` +
			`${counts.primary} primary, ${counts.review} review, ` +
			`${counts.mention} bare mentions, ${counts.none} none`,
	)
	console.log(`wrote ${path.relative(REPO, outFile)}`)
}

main()
