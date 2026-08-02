import React from 'react'
import { Box, IconButton, MenuItem, Select, Tooltip } from '@mui/material'
import { ActionType, ACTION_TYPES } from '@site/src/types/ActionType'
import {
	SheetChip,
	entrySummary,
} from '@site/src/features/CharacterSheet/components'
import { ActionGlyph } from './ActionMark'

export type QuickRefEntryItem = {
	id: string
	name: string
	description: string
	source: 'ability' | 'weapon' | 'item' | 'spell'
	sourceCategory?: string
	actionType?: ActionType
	rank?: number
	properties?: string[]
	damage?: string
}

export type QuickRefEntryProps = {
	item: QuickRefEntryItem
	expanded: boolean
	onToggle: () => void
	onRemove: () => void
	onActionTypeChange: (actionType: ActionType) => void
}

/**
 * One play on the Quick Ref board (M13 S8c, owner review 5).
 *
 * ## What the previous card got wrong
 *
 * The card showed every entry's full rule text, unclamped, all the time. That was a
 * deliberate trade — "the section exists so a player does not have to look a thing
 * up, and an accordion is looking it up" — and it does not survive contact with a
 * real board. Ten pins is ten paragraphs, and a reference you have to SCROLL is not
 * faster than one you have to click: the eye has to find the entry either way, and
 * now it has to find it among prose.
 *
 * ## What is basic and what is detail
 *
 * The summary answers **"is this the thing I want?"** — the name, its rank, and the
 * one figure the play turns on (damage, or the properties), falling back to the
 * first words of the rule where there is no figure, which is every ability. That is
 * what a player scans. The detail answers **"what exactly does it do?"** — the rule text and what
 * kind of entry it is — and only ever for the ONE entry they landed on, which is
 * why the section owns the expansion state and not the row.
 *
 * The summary is the disclosure control itself rather than carrying a separate
 * chevron button: the whole line is the target, which clears the D4 floor without
 * spending any width on a mark.
 *
 * ## Maintenance is not play, and there are two grades of it
 *
 * **Unpinning** is play-adjacent — it is how the board stays short, done in the
 * same breath as reading it — so it stays in the head, outside the disclosure
 * button (a button cannot nest one) and hidden until hover or focus.
 *
 * **Re-typing the action** is re-filing, done once per entry when the heuristic
 * guesses a weapon's or item's timing wrong, and it lives in the DETAIL (owner
 * review 6). It had no business in the line a player scans mid-turn. Down there it
 * also affords the room to show its VALUE in words rather than as a bare 12px
 * glyph, which is what made it read as a control rather than a fact.
 */
export const QuickRefEntry: React.FC<QuickRefEntryProps> = ({
	item,
	expanded,
	onToggle,
	onRemove,
	onActionTypeChange,
}) => {
	const detailId = `cs-playrow-detail-${item.id}`

	/*
		The one figure the play turns on: what it does on a hit, or what it costs.

		Damage for a weapon or an attacking spell, properties otherwise. Joined with
		commas — the array used to be interpolated straight into JSX, which React
		renders by concatenation, so `['agile','pierce']` read as `agilepierce`.
	*/
	const meta = item.damage ?? item.properties?.join(', ')

	/*
		The lead, for an entry that has no figure at all (owner review 7).

		Abilities carry no damage and no properties, so their whole summary line was
		a name and empty space to the right of it — and "Cleave" alone does not tell
		you whether it is the thing you want. The first words of the rule do.

		It is only a fallback: where a figure exists, the figure IS the cue and a
		lead beside it would be two things competing for one glance.

		Truncated by CSS rather than by a word count. A `slice(0, n)` cuts mid-word
		at one width and leaves half the line empty at another; `text-overflow`
		spends exactly the space the row has. `stripRankLabels` because `(Rank 1)`
		as the first two words of a talent's lead says nothing the rank numeral to
		its left has not already said.
	*/
	const lead =
		!meta && item.description
			? entrySummary(item.description, { stripRankLabels: true })
			: undefined

	return (
		<Box className={`cs-playrow${expanded ? ' cs-playrow--open' : ''}`}>
			<Box className="cs-playrow__head">
				<Box
					component="button"
					type="button"
					className="cs-playrow__summary"
					aria-expanded={expanded}
					aria-controls={detailId}
					onClick={onToggle}
				>
					<span className="cs-playrow__name">{item.name}</span>
					{/* A talent's or spell's rank, as a numeral. It was a Unicode circled
						glyph (`①`) — font-dependent, outside the type scale, and rendered
						differently on every platform. */}
					{typeof item.rank === 'number' && item.rank > 0 && (
						<span className="cs-playrow__rank">{item.rank}</span>
					)}
					{meta && <span className="cs-playrow__figure">{meta}</span>}
					{lead && (
						<span className="cs-playrow__figure cs-playrow__figure--lead">
							{lead}
						</span>
					)}
				</Box>
				<Box className="cs-playrow__tools">
					<Tooltip title={`Remove ${item.name} from Quick Ref`}>
						<IconButton
							size="small"
							className="cs-playrow__unpin"
							aria-label={`Remove ${item.name} from Quick Ref`}
							onClick={onRemove}
						>
							<Box component="span" sx={{ fontSize: '0.85em' }}>
								×
							</Box>
						</IconButton>
					</Tooltip>
				</Box>
			</Box>

			{/* Rendered and `hidden` rather than unmounted — the theme's disclosure
				rule, and here it also keeps the collapse from destroying the scroll
				position of the panel above it. */}
			<Box id={detailId} className="cs-playrow__detail" hidden={!expanded}>
				<Box className="cs-playrow__detail-head">
					{/* Structural bronze, not a hue. `getCategoryColor` used to map a kind
						onto a SKILL colour — weapon to Fortitude red, item to Crafting grey,
						Talent to Fighting brown — which is the local palette encoding nothing
						that S8 deleted from four search dialogs. A weapon is not Fortitude. */}
					<SheetChip variant="plate">
						{item.sourceCategory || item.source}
					</SheetChip>
					{/* The action-type override, in the DETAIL (owner review 6).
						It reclassifies a weapon or item whose timing the heuristic guessed
						wrong, and it is the only way to move a mis-filed pin to another
						tab — so it stays. But it is re-filing, done once, and it was
						sitting in the line a player scans mid-turn. */}
					<Select
						value={item.actionType ?? 'Other'}
						variant="standard"
						disableUnderline
						className="cs-playrow__retype"
						onChange={(event) =>
							onActionTypeChange(event.target.value as ActionType)
						}
						inputProps={{ 'aria-label': `Action type for ${item.name}` }}
						renderValue={(value) => (
							<Box
								sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}
								component="span"
							>
								<ActionGlyph actionType={value as ActionType} size={12} />
								{value}
							</Box>
						)}
					>
						{ACTION_TYPES.map((type) => (
							<MenuItem key={type} value={type}>
								<Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
									<ActionGlyph actionType={type} />
									{type}
								</Box>
							</MenuItem>
						))}
					</Select>
				</Box>
				{item.description && (
					<p className="cs-playrow__rule">{entrySummary(item.description)}</p>
				)}
			</Box>
		</Box>
	)
}
