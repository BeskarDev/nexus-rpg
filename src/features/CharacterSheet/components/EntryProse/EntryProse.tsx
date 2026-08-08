import React from 'react'
import SuccessLevel from '@site/src/components/codex/SuccessLevel'
import {
	parseSpellEffect,
	type EffectNode,
} from '@site/src/utils/content-gen/spell-effect-parser'
import {
	parseTalentDescription,
	type ParsedTalent,
} from '@site/src/utils/content-gen/talent-description-parser'

/**
 * A rulebook entry's own prose, with the structure the JSON actually carries
 * (M13 S8b, owner review).
 *
 * ## Why this is not the docs card
 *
 * The owner asked whether the search dialogs should show the FORMATTED entry the
 * docs pages show. Half yes, and the split is worth recording.
 *
 * The half that was right: the dialog rendered `sanitizeHtml(description)` — one
 * flattened string of `<br/>` runs — which throws away the thing a reader is
 * choosing on. A talent IS its rank ladder ("Rank 1 grants this, Rank 2 that")
 * and a spell IS its weak/strong/critical tiers; both arrived as a single grey
 * paragraph. That is a content-fidelity failure, not a styling preference.
 *
 * The half that was not: rendering `TalentCard` / `SpellCodexCard` themselves.
 * Three reasons, all found by looking rather than assumed —
 *
 * 1. **They take MDX children, not data.** `generate-talents.ts` emits SOURCE
 *    TEXT (`'<TalentCard ranks="1–3">'`) for the MDX pipeline to compile, so the
 *    generator and a React caller cannot share an assembly. Rendering the card
 *    here would be a SECOND place that knows how to build one — the duplication
 *    the reuse was supposed to avoid.
 * 2. **The keyword chips are a build-time pass.** `src/remark/auto-keyword-plugin`
 *    runs in the MDX compile. A card rendered at runtime gets no skill, damage or
 *    weapon chips, so it would look *almost* like the docs — and the gap is a
 *    register this theme treats as core. Near-parity claimed as parity is worse
 *    than an honest difference.
 * 3. **Three frames deep.** `CardFrame` brings a keystone with overhang and four
 *    corner marks. Inside an expanded row, inside a dialog, that is a bordered
 *    card in a keylined panel in a keylined paper — the box-inside-a-box
 *    `DetailsPanel`'s own docblock says this theme keeps removing. The ROW is the
 *    card here: it already carries the name, the chips and the expanded keyline.
 *
 * So: the docs' STRUCTURE, on the sheet's own register. The parsers are shared —
 * they are pure functions over the same canonical JSON, with no `fs` and no node
 * APIs — which is where the real agreement between the two surfaces lives.
 *
 * ## The markdown subset
 *
 * Measured over the whole corpus rather than guessed: 148 talents (452 rungs),
 * 486 spells and 44 combat arts between them use **bold, bullet lists, blank-line
 * paragraphs and success runs** and nothing else. No tables, no ordered lists, no
 * italics. That is small enough to render directly, and a markdown library for it
 * would be a dependency carrying six features to deliver two.
 */

/**
 * The one-line lead for a ledger row's prose cell (M13 S8b, owner review).
 *
 * The cell rendered `sanitizeHtml(description)` under `white-space: pre-line`,
 * and `sanitizeHtml` turns every `<br/>` into a newline. A talent separates its
 * rank sections with `<br/><br/>`, so a three-line clamp spent one or two of those
 * lines on BLANK SPACE — the row looked airy and said a third of what it had room
 * for. Collapsing to a single flowed paragraph is the whole fix: the same three
 * lines now carry three lines of words.
 *
 * `stripRankLabels` is for talents specifically. `(Rank 1)` mid-flow is noise in a
 * two-line lead now that the span has its own column, and the ladder itself is one
 * press away.
 */
export const entrySummary = (
	source: string,
	{ stripRankLabels = false }: { stripRankLabels?: boolean } = {},
): string => {
	let text = source
	if (stripRankLabels) {
		text = text.replace(/<strong>\s*\(Rank \d\)\s*<\/strong>/gi, ' ')
	}
	return text
		.replace(/<[^>]*>/g, ' ')
		.replace(/&nbsp;/g, ' ')
		.replace(/\s+/g, ' ')
		.trim()
}

/**
 * The rank span a talent covers — `1-3`, or `2` for a single rung.
 *
 * The docs card shows this on its name line as the entry's scanning key: it
 * separates a talent you can start now from a capstone that needs skill rank 4
 * before it begins. The ledger row had no equivalent, so a player scanning 148
 * rows could not tell the two apart without opening each one.
 *
 * `generate-talents.ts` has its own copy that FAILS THE BUILD on a gap in the
 * ladder, because a span label over a gap is a lie about what you can buy. That is
 * right for the generator and wrong here — this returns `null` instead and the
 * caller shows nothing, because a dash in one cell is not worth a blank dialog.
 * The hyphen is ASCII: CLAUDE.md bars en dashes from game content.
 */
export const talentRankSpan = (source: string, name: string): string | null => {
	try {
		const { ranks } = parseTalentDescription(source, name)
		const values = ranks.map((section) => section.rank)
		if (!values.length) return null
		const lo = values[0]
		const hi = values[values.length - 1]
		if (values.length !== hi - lo + 1) return null
		return lo === hi ? `${lo}` : `${lo}-${hi}`
	} catch {
		return null
	}
}

/** `**bold**` is the only inline markup the corpus uses. */
const renderInline = (text: string): React.ReactNode[] =>
	text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
		const bold = part.match(/^\*\*([^*]+)\*\*$/)
		return bold ? <strong key={index}>{bold[1]}</strong> : part
	})

/**
 * One block, as its runs of lines.
 *
 * Grouped LINE BY LINE, not block by block. The first version asked whether a
 * whole block was bullets and rendered a paragraph otherwise — which is wrong for
 * the shape the corpus actually has: *Temper Heat* is a lead sentence, then
 * `On a success, choose one:`, then four `- ` options, all separated by SINGLE
 * newlines inside one node. Every list in the corpus is introduced that way, so
 * the block test matched none of them and silently flattened all four options
 * into a paragraph. Found by pointing the test at a real entry after a
 * hand-written fixture passed for the wrong reason.
 */
const renderBlock = (block: string, key: React.Key): React.ReactNode[] => {
	const out: React.ReactNode[] = []
	let bullets: string[] = []

	const flushBullets = () => {
		if (!bullets.length) return
		out.push(
			<ul key={`${key}-l${out.length}`} className="cs-entry-prose__list">
				{bullets.map((line, index) => (
					<li key={index}>{renderInline(line)}</li>
				))}
			</ul>,
		)
		bullets = []
	}

	for (const line of block.split('\n')) {
		if (line.startsWith('- ')) {
			bullets.push(line.slice(2))
			continue
		}
		flushBullets()
		if (line.trim()) {
			out.push(
				<p key={`${key}-p${out.length}`} className="cs-entry-prose__para">
					{renderInline(line)}
				</p>,
			)
		}
	}
	flushBullets()
	return out
}

const renderNodes = (nodes: EffectNode[]): React.ReactNode[] =>
	nodes.flatMap<React.ReactNode>((node, index) => {
		if (node.kind === 'success') {
			return [
				<SuccessLevel key={index} level={node.level}>
					{renderInline(node.text)}
				</SuccessLevel>,
			]
		}
		return node.text
			.split(/\n{2,}/)
			.filter((block) => block.trim())
			.flatMap((block, blockIndex) =>
				renderBlock(block, `${index}-${blockIndex}`),
			)
	})

/**
 * The last-resort rendering: the raw text, unstructured.
 *
 * Both parsers FAIL LOUDLY by contract — malformed data stops the build so it
 * gets fixed in the JSON rather than papered over. That contract is right at
 * generation time and wrong here: the sheet reads the same JSON at runtime, and
 * a throw in a dialog is a white screen for a player mid-session. The current
 * corpus all parses (checked: 148 / 486 / 44), and `content:check` guards
 * regressions in CI — this is for the entry that lands between those two facts.
 */
const Fallback: React.FC<{ text: string }> = ({ text }) => (
	<p className="cs-entry-prose__para" style={{ whiteSpace: 'pre-line' }}>
		{text}
	</p>
)

export interface EntryProseProps {
	/** The raw `effect` / `description` HTML string from the content JSON. */
	source: string
	/** The entry's name, used only in parse errors. */
	name: string
	/**
	 * Combat arts allow a success run that omits leading levels — the prose above
	 * the run is the base case and the tiers only add to it. Spells do not: a gap
	 * there means the data lost a line. `Deep Cut` is the entry that proves it.
	 */
	allowPartialRuns?: boolean
}

/** A spell's or combat art's effect, with its success tiers intact. */
export const EntryProse: React.FC<EntryProseProps> = ({
	source,
	name,
	allowPartialRuns,
}) => {
	const content = React.useMemo(() => {
		try {
			return renderNodes(
				parseSpellEffect(source, name, { allowPartialRuns }).nodes,
			)
		} catch {
			return null
		}
	}, [source, name, allowPartialRuns])

	return (
		<div className="cs-entry-prose">
			{content ?? <Fallback text={source.replace(/<[^>]+>/g, ' ')} />}
		</div>
	)
}

export interface TalentLadderProps {
	/** The raw `description` HTML string from `talents.json`. */
	source: string
	name: string
}

/**
 * A talent's rank ladder — the structure the flattened string was hiding.
 *
 * Each rung is a small-caps rank marker and its rule text, ruled from the next by
 * the ledger hairline: the same course construction `RecordPlate` uses, rather
 * than the docs card's gutter. Deliberately NOT a left bar — this theme's most
 * repeated correction is that a rule is a frame, never a grouping device.
 */
export const TalentLadder: React.FC<TalentLadderProps> = ({ source, name }) => {
	const parsed = React.useMemo<ParsedTalent | null>(() => {
		try {
			return parseTalentDescription(source, name)
		} catch {
			return null
		}
	}, [source, name])

	if (!parsed) {
		return (
			<div className="cs-entry-prose">
				<Fallback text={source.replace(/<[^>]+>/g, ' ')} />
			</div>
		)
	}

	return (
		<div className="cs-entry-prose">
			{/* A rule that spans every rank, or a prerequisite — 16 of the 148 have
				one, and it belongs above the ladder rather than inside rung 1. */}
			{parsed.preamble.length > 0 && (
				<div className="cs-entry-prose__preamble">
					{renderNodes(parsed.preamble)}
				</div>
			)}
			{parsed.ranks.map((section) => (
				<div key={section.rank} className="cs-talent-rung">
					<span className="cs-talent-rung__mark">Rank {section.rank}</span>
					<div className="cs-talent-rung__text">
						{renderNodes(section.nodes)}
					</div>
				</div>
			))}
		</div>
	)
}
