import { PlayingCard } from '@site/src/components/PlayingCard'
import CardDivider from '@site/src/components/codex/CardDivider'
import CardTag from '@site/src/components/codex/CardTag'
import {
	FIT_BLOCK_ATTRIBUTE,
	type FitResult,
} from '@site/src/components/autofit'
import { ActionGlyph } from '@site/src/features/CharacterSheet/CharacterSheetTabs/01_Skills/components/ActionMark'
import type { CodexVariant } from '@site/src/components/codex/ornaments'
import type { ActionType } from '@site/src/types/ActionType'
import React from 'react'
import { abilityBody, bodyChunks } from './abilityBody'

export interface AbilityCardShellProps {
	/** The card's name, on both the first card and every continuation. */
	name: string
	keystone: CodexVariant
	/** What the ability costs to use, as the drawn mark (F7). */
	actionType?: ActionType
	/** A classification banner beside the name — an owning or required skill. */
	tag?: React.ReactNode
	/** A line under the name: the rank span, a folk's languages count. */
	meta?: React.ReactNode
	/** The whole body, in the units a continuation card may cut between (D4). */
	blocks: React.ReactNode[]
	/** A hash of the card's CONTENT, so the fit is not re-run on a re-render. */
	contentKey: string
	start?: number
	end?: number
	part?: number
	totalParts?: number
	onFitted?: (result: FitResult) => void
}

/**
 * The one shell every ability card is built on (M20 D2).
 *
 * `Other` is the plain case — a name, an action mark, an optional skill and a
 * body — and the folk card is the same card with a LIST body, so they share
 * this rather than being one file twice over. The talent card adds the ladder's
 * furniture on top of it. That is the M18 lesson applied before it costs
 * anything: `ArcaneSpellCard` / `MysticSpellCard` / `SpellCard` were one file
 * three times, and three copies of a fitting bug is how M18 started.
 *
 * The body is a list of BLOCKS, never a string. Each one carries
 * `data-fit-block`, which is how the engine finds where the body stops fitting,
 * and it is the unit a continuation card is cut at — so no card ever cuts
 * inside a single ability's or a single rank's text (D4).
 */
export const AbilityCardShell: React.FC<AbilityCardShellProps> = ({
	name,
	keystone,
	actionType,
	tag,
	meta,
	blocks,
	contentKey,
	start = 0,
	end,
	part = 1,
	totalParts = 1,
	onFitted,
}) => {
	const shown = blocks.slice(start, end)
	const isContinuation = part > 1

	return (
		<PlayingCard
			keystone={keystone}
			// The cut is part of the content: a continuation measures its own half,
			// which is why neither half stays at the floor when it need not (M18 D3).
			fitKey={`${name}|${start}|${end ?? ''}|${contentKey}`}
			onFitted={onFitted}
		>
			{/* The continuation head, on every family: a card found loose on the
			    table says what it is. Same mark in the same place as the card it
			    continues from — two halves of one entry reading as two different
			    cards is the failure M18 logged. */}
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
				{/* The action type is the single most-asked question about an ability
				    mid-turn, so it rides with the name rather than dropping into the
				    meta line. `ActionGlyph` is print-proven at 11px on the character
				    sheet; the word is carried for readers who cannot see the mark. */}
				{actionType && !isContinuation && (
					<span className="pc-action-plate">
						<ActionGlyph actionType={actionType} size={10} />
						<span className="pc-cell__name">{actionType}</span>
					</span>
				)}
				{tag && !isContinuation ? tag : null}
			</div>
			{meta && !isContinuation ? (
				<div className="pc-spell__rank">{meta}</div>
			) : null}
			<CardDivider className="pc-card__divider" />
			{shown.map((block, index) => (
				<div
					key={start + index}
					className="pc-fit"
					{...{ [FIT_BLOCK_ATTRIBUTE]: '' }}
				>
					{block}
				</div>
			))}
		</PlayingCard>
	)
}

export interface AbilityPrintCardProps {
	name: string
	/** The body's HTML, as the sheet holds it. */
	description: string
	actionType?: ActionType
	/** The owning skill, where the sheet records one. */
	skill?: string
	start?: number
	end?: number
	part?: number
	totalParts?: number
	onFitted?: (result: FitResult) => void
}

/**
 * The plain ability card — the `Other` group (M20 D1, D2).
 *
 * `Other` is the sheet's free-text bucket: a boon from a patron, a curse, a GM
 * ruling. It is a bucket rather than a content family, and inventing a motif for
 * "miscellaneous" would be inventing meaning — so the mark says the true thing
 * about it instead: a VOTIVE STELE, a record set in stone for one person, which
 * came off someone's sheet and exists nowhere else.
 *
 * D3 spent the character sheet's own `sheet` cartouche on this for the same
 * reason, and the owner rejected the drawing rather than the argument — see
 * `SteleKeystone` for what was wrong with it and why a redraw could not fix it
 * without ceasing to be a cartouche. The sheet family keeps its own mark.
 */
export const AbilityPrintCard: React.FC<AbilityPrintCardProps> = ({
	name,
	description,
	actionType,
	skill,
	start,
	end,
	part,
	totalParts,
	onFitted,
}) => {
	// An `Other` ability is free text off a sheet, so it can be either encoding
	// (see `abilityBody`) — a GM's pasted ruling may well carry bullets.
	const blocks = React.useMemo(
		() => bodyChunks(description).map((chunk) => abilityBody(chunk)),
		[description],
	)
	return (
		<AbilityCardShell
			name={name}
			keystone="stele"
			actionType={actionType}
			tag={skill ? <CardTag>{skill}</CardTag> : undefined}
			blocks={blocks}
			contentKey={description}
			start={start}
			end={end}
			part={part}
			totalParts={totalParts}
			onFitted={onFitted}
		/>
	)
}
