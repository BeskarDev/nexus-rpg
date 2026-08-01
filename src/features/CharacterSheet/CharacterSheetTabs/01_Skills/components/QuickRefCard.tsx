import React from 'react'
import { Box, IconButton, MenuItem, Select, Tooltip } from '@mui/material'
import { ActionType, ACTION_TYPES } from '@site/src/types/ActionType'
import {
	SheetChip,
	entrySummary,
} from '@site/src/features/CharacterSheet/components'
import { ActionGlyph } from './ActionMark'

export type QuickRefCardItem = {
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

export type QuickRefCardProps = {
	item: QuickRefCardItem
	onRemove: () => void
	onActionTypeChange: (actionType: ActionType) => void
}

/**
 * One play on the Quick Ref board (M13 S8c).
 *
 * ## What this replaced, and why the shape changed rather than the styling
 *
 * Quick Ref was a stack of `ListSection`s of `UnifiedListItem`s — the sheet's
 * ledger idiom, correctly applied and wrong for this surface. **The section exists
 * so a player does not have to look a thing up, and an accordion is looking it
 * up.** Every entry hid its own rule behind a press, and only the first group
 * opened by default, so Quick Actions were always one click away on turn one.
 *
 * A ledger is for scanning a CORPUS by column: 285 spells, aligned, so the eye can
 * run down one fact. Quick Ref holds a handful of things the player already chose,
 * and what they need from each is its text. Those are different jobs, and the row
 * was borrowed from the wrong one.
 *
 * ## The trade this makes on purpose
 *
 * The card shows its rule **unclamped**. A two-line clamp would put the click
 * back — it is the same "open it to find out" with extra steps — and the reader
 * pinned this entry precisely because they need to read it mid-turn. The cost is
 * height when a long talent is pinned, and the control is the pin itself: the
 * board holds what you put on it.
 *
 * ## Maintenance is not play
 *
 * Unpinning and re-typing an action are authoring tasks that were sitting in every
 * row during combat. They are here, but revealed on hover and focus — the same
 * judgement the row titles and the record plate already take, and the same reason
 * the summary rows on this tab have no controls at all.
 */
export const QuickRefCard: React.FC<QuickRefCardProps> = ({
	item,
	onRemove,
	onActionTypeChange,
}) => {
	/*
		The one line above the rule: what this costs or what it does on a hit.

		Damage for a weapon or an attacking spell, properties otherwise. Joined with
		commas — the array used to be interpolated straight into JSX, which React
		renders by concatenation, so `['agile','pierce']` read as `agilepierce`.
	*/
	const meta = item.damage ?? item.properties?.join(', ')

	return (
		<Box className="cs-play-card">
			<Box className="cs-play-card__head">
				<span className="cs-play-card__name">{item.name}</span>
				{/* A talent's or spell's rank, as a numeral. It was a Unicode circled
					glyph (`①`) — font-dependent, outside the type scale, and rendered
					differently on every platform. */}
				{typeof item.rank === 'number' && item.rank > 0 && (
					<span className="cs-play-card__rank">{item.rank}</span>
				)}
				<Box className="cs-play-card__tools">
					{/* The action-type override. It stays because it genuinely
						reclassifies a weapon or item whose timing the heuristic guessed
						wrong — but it is maintenance, so it waits for the pointer. */}
					<Select
						value={item.actionType ?? 'Other'}
						variant="standard"
						disableUnderline
						className="cs-play-card__retype"
						onChange={(event) =>
							onActionTypeChange(event.target.value as ActionType)
						}
						inputProps={{ 'aria-label': `Action type for ${item.name}` }}
						renderValue={(value) => (
							<ActionGlyph actionType={value as ActionType} size={12} />
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
					<Tooltip title={`Remove ${item.name} from Quick Ref`}>
						<IconButton
							size="small"
							className="cs-play-card__unpin"
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

			<Box className="cs-play-card__meta">
				{/* Structural bronze, not a hue. `getCategoryColor` used to map a kind
					onto a SKILL colour — weapon to Fortitude red, item to Crafting grey,
					Talent to Fighting brown — which is the local palette encoding nothing
					that S8 deleted from four search dialogs. A weapon is not Fortitude. */}
				<SheetChip variant="plate">
					{item.sourceCategory || item.source}
				</SheetChip>
				{meta && <span className="cs-play-card__figure">{meta}</span>}
			</Box>

			{item.description && (
				<p className="cs-play-card__rule">{entrySummary(item.description)}</p>
			)}
		</Box>
	)
}
