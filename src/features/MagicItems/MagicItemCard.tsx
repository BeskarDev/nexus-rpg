import { PlayingCard } from '@site/src/components/PlayingCard'
import CardDivider from '@site/src/components/codex/CardDivider'
import CardTag from '@site/src/components/codex/CardTag'
import SigilIcon from '@site/src/components/codex/SigilIcon'
import { FittedBody, type FitResult } from '@site/src/components/autofit'
import React from 'react'
import { MagicItem } from '@site/src/types/MagicItem'

type MagicItemCardProps = MagicItem & {
	/** First body block on this card. 0 unless this is a continuation (D3). */
	start?: number
	end?: number
	part?: number
	totalParts?: number
	onFitted?: (result: FitResult) => void
}

/**
 * What the item IS, under its name: `bronze khopesh`.
 *
 * Dropped entirely when the type just repeats the name, which is what a
 * character's item always does — the sheet has no `type` field, so
 * `characterTreasure` falls back to the name (M19 D2). Printing
 * "Bronze Khopesh / bronze khopesh" would be the adapter's shrug in ink.
 */
function itemType(name: string, type: string, material?: string) {
	const full = material ? `${material} ${type}` : type
	if (!full.trim()) return ''
	return full.trim().toLowerCase() === name.trim().toLowerCase()
		? ''
		: full.toLowerCase()
}

/**
 * A magic item card (M19 S3).
 *
 * The head follows the spell and combat art cards: name flush left, the
 * category as a banner tag on the right edge, the numbers as a marked strip,
 * the properties as slabs. What was there before was one comma run doing all
 * four jobs — `Q3 weapon (bronze khopesh), 2L, 40C` — five facts to parse out
 * of a sentence.
 *
 * **Quality is a strip number, not a boss.** It took the corner mark first, the
 * one a spell's focus cost takes, and that is a claim these two facts do not
 * support: a focus cost is spent on every cast and decides whether the spell
 * can be cast at all, while quality is a property an object simply has. Equal
 * marks would say they are equally urgent to read.
 */
export const MagicItemCard: React.FC<MagicItemCardProps> = ({
	name,
	category,
	quality,
	type,
	material,
	cost,
	load,
	properties,
	damage,
	uses,
	description,
	start = 0,
	end,
	part = 1,
	totalParts = 1,
	onFitted,
}) => {
	const subtitle = itemType(name, type, material)
	const propertyList = React.useMemo(
		() =>
			(properties ?? '')
				.split(',')
				.map((property) => property.trim())
				.filter(Boolean),
		[properties],
	)

	return (
		<PlayingCard
			keystone="gem"
			fitKey={`${name}|${start}|${end ?? ''}|${description ?? ''}`}
			onFitted={onFitted}
		>
			{/* The category rides the card's right edge: with the quality out of the
			    corner there is nothing up there to leave room for. */}
			<div className="pc-card__head-row">
				<span className="pc-card__name">
					{name}
					{totalParts > 1 && (
						<span className="pc-card__part">
							{' '}
							({part}/{totalParts})
						</span>
					)}
				</span>
				<CardTag>{category}</CardTag>
			</div>
			{subtitle && <div className="pc-card__meta">{subtitle}</div>}
			{/* Load and cost, marked rather than labelled — `load` and `coins` are
			    the kit's own stat sigils, the same two the character sheet uses for
			    the same two numbers (M18's lesson: at this size a repeated word
			    costs more measure than the value it names). */}
			<div className="pc-strip">
				{/* Quality reads as one of three numbers, not as a headline.
				    It sat in the corner boss first — the mark the spell card gives a
				    focus cost — and that put a Q5 khopesh and a rank-5 spell at the
				    same visual weight, which is a claim about the game that the game
				    does not make (owner, 2026-08-07). A spell's focus is spent every
				    cast; an item's quality is a property it simply has. */}
				{/* A weapon's own bonus, beside the other three numbers the object
				    carries. In the head it read as a formula the card cannot finish
				    — the attribute belongs to the character, and the sheet is the
				    only surface that can add them up (owner, 2026-08-07). */}
				{damage && (
					<span className="pc-cell">
						<SigilIcon name="sword" size="1.15em" className="pc-cell__mark" />
						<span className="pc-cell__name">Damage </span>
						{damage}
					</span>
				)}
				{quality > 0 && (
					<span className="pc-cell">
						<SigilIcon name="gem" size="1.15em" className="pc-cell__mark" />
						<span className="pc-cell__name">Quality </span>Q{quality}
					</span>
				)}
				<span className="pc-cell">
					<SigilIcon name="pack" size="1.15em" className="pc-cell__mark" />
					<span className="pc-cell__name">Load </span>
					{load}
				</span>
				<span className="pc-cell">
					<SigilIcon name="ingots" size="1.15em" className="pc-cell__mark" />
					<span className="pc-cell__name">Cost </span>
					{cost}
				</span>
			</div>
			{(propertyList.length > 0 || uses !== undefined) && (
				<div className="pc-slabs">
					{propertyList.map((property) => (
						<span className="pc-slab" key={property}>
							{property}
						</span>
					))}
					{uses !== undefined && (
						<span className="pc-slab">
							{uses} use{uses !== 1 ? 's' : ''}
						</span>
					)}
				</div>
			)}
			<CardDivider className="pc-card__divider" />
			<FittedBody html={description} start={start} end={end} />
		</PlayingCard>
	)
}
