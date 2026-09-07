import React from 'react'
import { FIT_BLOCK_ATTRIBUTE } from '@site/src/components/autofit'
import { DamageLadder } from '@site/src/components/codex/DamageLadder'
import { Ability, Attack, Creature } from '@site/src/types/Creature'
import {
	CREATURE_SECTIONS,
	FALLBACK_SECTION,
	QUICK_ACTION_QUALIFIER,
	sectionForQualifier,
} from '@site/src/utils/typescript/creature/creatureSections'
import { TraitRow, type TraitRowKind } from './CreatureTraits'
import { ANY_TRIPLE } from './creatureEntryText'

/**
 * One splittable piece of a creature card's body (M18 D3).
 *
 * `section` is the heading the block sits under. A continuation card that
 * starts inside a section redraws its heading, so a reader never meets a bare
 * list of abilities with no idea what they are.
 */
export interface CreatureBlock {
	key: string
	section?: string
	node: React.ReactNode
}

/**
 * A list of short facts, each on its own keyline (M21 D3, D4).
 *
 * `.pc-slab` is the card vocabulary's LIST ITEM — what a combat art uses for the
 * weapons it applies to and a spell for its properties. An ability's qualifier
 * is exactly that kind of item, and it is the biggest content loss the old card
 * had: every one of the 402 abilities in `creatures.json` carries one, the
 * values are load bearing (`Passive` against `Action, recharge (d6)` against
 * `Lord Trigger`), and the card dropped all of it — so a printed Lord's trigger
 * was indistinguishable from a passive (F4).
 *
 * Split on comma, exactly as the docs generator splits it into one `StatBadge`
 * each: `Passive, 3/day` is genuinely two facts, while a nested parenthetical
 * like `recharge (d6)` has no comma and stays whole.
 */
const Slabs: React.FC<{ items: string[] }> = ({ items }) => {
	const parts = items.map((item) => item.trim()).filter(Boolean)
	if (parts.length === 0) return null
	return (
		<span className="pc-slabs pc-slabs--inline">
			{parts.map((part) => (
				<span className="pc-slab" key={part}>
					{part}
				</span>
			))}
		</span>
	)
}

/**
 * An ability's qualifier as slabs, MINUS whatever the section heading already
 * says (D-147).
 *
 * `Passive, 3/day` under a `Passives` heading is one new fact and one repeated
 * one, and the docs card drops the repeat for the same reason: a badge on every
 * line saying what the heading above it says is ink for nothing. The limiter is
 * kept, because a heading cannot carry it.
 *
 * An unrecognised value is kept whole — Companion Traits writes `**Flying
 * (hover).**`, where `hover` is a property rather than a `when`, and the
 * fallback heading it groups under does not say it.
 */
const splitQualifier = (qualifier?: string): string[] => {
	const parts = qualifier ? qualifier.split(',') : []
	return sectionForQualifier(qualifier) ? parts.slice(1) : parts
}

/**
 * The corpus's inline emphasis, rendered rather than printed as asterisks.
 *
 * 85 distinct runs of `*Fire Storm*` and `**Telekinetic Ray.**` live in the
 * creature text — spell names in a caster's list, the lead-in on each of the
 * Beholder Spawn's eye rays. The card printed the asterisks.
 *
 * Deliberately only the two emphases: this is stat-block prose, not markdown, and
 * a fuller parser on a card body would be inventing a rendering contract the data
 * does not have.
 */
const EMPHASIS = /(\*\*[^*]+\*\*|\*[^*]+\*)/g

function withEmphasis(text: string, keyPrefix: string): React.ReactNode[] {
	if (!text.includes('*')) return [text]
	return text.split(EMPHASIS).map((part, index) => {
		const key = `${keyPrefix}-e${index}`
		if (part.startsWith('**') && part.endsWith('**') && part.length > 4)
			return <strong key={key}>{part.slice(2, -2)}</strong>
		if (part.startsWith('*') && part.endsWith('*') && part.length > 2)
			return <em key={key}>{part.slice(1, -1)}</em>
		return <React.Fragment key={key}>{part}</React.Fragment>
	})
}

/**
 * Prose, with every damage triple in it set as a ladder.
 *
 * The head of an entry is split out by `splitDamageText`, deliberately strictly:
 * a pattern loose enough to swallow "6/9/12 poison damage, or 5/7/9 if this
 * swarm has already lost half its max HP" would eat half the clause with it. So
 * the Swarm of Snakes printed BOTH of its triples as bare slash-runs, when the
 * ladder is exactly the notation that makes them readable (owner, 2026-08-07).
 *
 * Splitting the clause was never the answer. Laddering the numbers WHERE THEY
 * STAND is: a triple is a triple wherever it appears, the surrounding sentence
 * is left exactly as written, and no text can be lost because none is consumed.
 */
export function inlineText(text: string, keyPrefix = 't'): React.ReactNode {
	const parts = text.split(ANY_TRIPLE)
	return parts.map((part, index) =>
		index % 2 === 1 ? (
			<DamageLadder key={`${keyPrefix}-${index}`} values={part} />
		) : (
			<React.Fragment key={`${keyPrefix}-${index}`}>
				{withEmphasis(part, `${keyPrefix}-${index}`)}
			</React.Fragment>
		),
	)
}

/**
 * An attack entry: its name, its properties and its qualifier as slabs, its
 * damage triple as a `DamageLadder`, then whatever prose follows.
 *
 * The ladder is the cheap win of the four repairs (F3): it is INLINE and
 * `em`-sized by construction — its own doc records that a stacked version cost a
 * line per attack and was rejected — so it transfers to a card at no height
 * cost, and the raw `6/9/12` stops sitting in the middle of a sentence.
 */
const AttackEntry: React.FC<{ attack: Attack }> = ({ attack }) => (
	<>
		<span className="pc-run-in">{attack.name}</span>
		<Slabs items={attack.properties} />{' '}
		{attack.damage && (
			<DamageLadder values={attack.damage}>
				{attack.damageType || undefined}
			</DamageLadder>
		)}
		{/* No space when the prose resumes with punctuation: the Swarm of Snakes'
		    text continues `, or 5/7/9 …` after its ladder, and an unconditional
		    space printed `poison , or`. */}
		{attack.damage &&
		attack.description &&
		!/^[,.;:!?)]/.test(attack.description)
			? ' '
			: ''}
		{attack.description && inlineText(attack.description)}
	</>
)

const AbilityEntry: React.FC<{ ability: Ability }> = ({ ability }) => (
	<>
		<span className="pc-run-in">{ability.name}</span>
		<Slabs
			items={[
				...splitQualifier(ability.qualifier),
				...(ability.recharge ? [ability.recharge] : []),
			]}
		/>{' '}
		{inlineText(ability.description)}
	</>
)

/**
 * A creature's card body, as the blocks a continuation card can cut at.
 *
 * **The nine stats are no longer here.** They were blocks 0, 1 and 2, which is
 * why a spilled creature printed its Parry, Dodge and Resist on card 1 only
 * (F6): the panel was filed as body when it is head furniture. It moved to the
 * shell's `header` slot (D4), which is also what makes a continuation cheap —
 * its head is one name line, so most of the card is free for text.
 *
 * **Sections come from `CREATURE_SECTIONS`** — Actions / Quick Actions /
 * Triggers / Passives, grouped off the qualifier (D-147, Q8T4.23). The printed
 * card used to group by `Attacks` / `Abilities` / `Quick Actions`, which is the
 * shape of the record rather than of a turn, so a GM reading a printed card and
 * the same creature in the docs met two different stat blocks.
 */
export function creatureBlocks(creature: Creature): CreatureBlock[] {
	const blocks: CreatureBlock[] = []
	const push = (key: string, node: React.ReactNode, section?: string) =>
		blocks.push({ key, node, section })

	/**
	 * The trait rows, in the docs stat block's own shapes and with its own
	 * labels (owner, 2026-08-07) — chips rather than a comma sentence behind a
	 * bold run-in. See `CreatureTraits`.
	 */
	const trait = (key: string, label: TraitRowKind, values: string[]) => {
		if (values.length === 0) return
		push(key, <TraitRow label={label} values={values} />)
	}

	trait('skills', 'Skills', creature.skills)
	trait('immunities', 'Immunities', creature.immunities)
	trait('resistances', 'Resistances', creature.resistances)
	trait('weaknesses', 'Weaknesses', creature.weaknesses)

	/**
	 * The markdown path's legacy `**Quick Actions:**` section, folded in.
	 *
	 * `quickActions` is a HEADING, not a kind of ability (D-005): a quick action
	 * is an ability whose qualifier says so. Companion Traits still writes the
	 * heading and its entries carry no inline qualifier, so the heading supplies
	 * one and the grouping below reads qualifiers only — one rule for both
	 * sources, as with the entry contract in `creatureEntryText`.
	 */
	const abilities: Ability[] = [
		...creature.abilities,
		...(creature.quickActions ?? []).map((ability) =>
			ability.qualifier
				? ability
				: { ...ability, qualifier: QUICK_ACTION_QUALIFIER },
		),
	]

	for (const group of CREATURE_SECTIONS) {
		const section = group.label
		if (group.withAttacks) {
			// Attacks first inside their group, exactly as the docs card orders
			// them: they are the default thing to do, and they carry the damage
			// ladder a GM scans for.
			creature.attacks.forEach((attack, index) => {
				push(`attack-${index}`, <AttackEntry attack={attack} />, section)
				/**
				 * An attack's sub-list is its OWN blocks, one per line.
				 *
				 * The Beholder Spawn's six eye rays are the corpus's one consumer,
				 * and hung off the attack as a single `<ul>` they made a first block
				 * that would not fit on a card of its own — the deck's only
				 * over-budget entry, and a silent drop before F7 was fixed. Each ray
				 * is a self-contained numbered line, so cutting between them costs a
				 * reader nothing.
				 */
				;(attack.details ?? []).forEach((detail, detailIndex) => {
					push(
						`attack-${index}-detail-${detailIndex}`,
						<div className="pc-details">{inlineText(detail)}</div>,
						section,
					)
				})
			})
		}
		abilities.forEach((ability, index) => {
			// An unrecognised qualifier is grouped, never dropped: the markdown
			// sources are hand-written and `**Flying (hover).**` puts a property
			// where a qualifier goes. `creatures.json` cannot reach this — the
			// generator fails the build on a qualifier outside the closed list.
			const belongs =
				(sectionForQualifier(ability.qualifier) ?? FALLBACK_SECTION) === section
			if (!belongs) return
			push(`ability-${index}`, <AbilityEntry ability={ability} />, section)
		})
	}

	return blocks
}

/**
 * Render a slice of a creature's blocks, redrawing the heading of any section
 * the slice opens inside.
 */
export const CreatureBlocks: React.FC<{
	blocks: CreatureBlock[]
	start?: number
	end?: number
}> = ({ blocks, start = 0, end }) => {
	const shown = blocks.slice(start, end)
	return (
		<>
			{shown.map((block, index) => {
				// A continuation card redraws the heading of the section it opens
				// inside, always — a card that starts with three unlabelled
				// paragraphs does not say whether they are abilities or attacks.
				const opensSection =
					block.section !== undefined &&
					(index === 0 || shown[index - 1].section !== block.section)
				return (
					<React.Fragment key={block.key}>
						{opensSection && (
							<div className="pc-card__section">{block.section}</div>
						)}
						<div className="pc-fit" {...{ [FIT_BLOCK_ATTRIBUTE]: '' }}>
							{block.node}
						</div>
					</React.Fragment>
				)
			})}
		</>
	)
}
