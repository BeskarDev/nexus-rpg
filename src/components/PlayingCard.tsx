import React from 'react'
import './playingCardStyles.css'
import { Keystone, CodexVariant } from '@site/src/components/codex/ornaments'
import { TornCardFrame } from './CardFrame'
import { useAutofit } from './autofit'
import type { FitResult } from './autofit'

export interface PlayingCardProps {
	/**
	 * The card family, selecting its keystone and corner rails (M18 D1).
	 *
	 * All four printed families already have one: `winged` for spells, `khopesh`
	 * for combat arts, `gem` for magic items, `bull` for creatures. No new
	 * ornament was drawn for this milestone (D6).
	 */
	keystone?: CodexVariant
	/**
	 * The card's head — name, meta lines, the rule above the body.
	 *
	 * Optional so the families can migrate one at a time (M18 S4): a card that
	 * passes everything as `children` still renders, it just puts its header
	 * inside the region that shrinks to fit.
	 */
	header?: React.ReactNode
	/**
	 * A mark seated in the card's top-left corner, OUTSIDE the content column
	 * (M18 S4). It sits on the parchment between the deckle and the text rather
	 * than in the flow, so an ornament costs the body no height — the spell
	 * card's focus boss was eating half a line of rules text and crowding the
	 * name (owner, 2026-08-07).
	 */
	badge?: React.ReactNode
	/**
	 * The autofit's cache key — a hash of the card's own content, NOT its
	 * identity (M18 D2, trap 9). A preview re-render, a scroll or a selection
	 * change must not re-run two hundred binary searches.
	 *
	 * Omitting it disables the fit and the body sets at `--pc-text-body`, which
	 * is what a card with no long prose wants.
	 */
	fitKey?: string
	/**
	 * Called once the body has settled. `spills` is true when the text still
	 * overflows at the 5.5pt floor — the fact the character-count ladder could
	 * never know, and what M18 S3's continuation card is built on.
	 */
	onFitted?: (result: FitResult) => void
	/** The body. This is the ONLY region the autofit shrinks (M18 D2, trap 3). */
	children: React.ReactNode
}

/**
 * The one shell for every printed card (M18 D4).
 *
 * 63 × 88mm — the size sleeves are made for, and nine to a 192 × 267mm page.
 * That number is fixed (M16 constraint 1) and lives in `PrintPages.tsx` as
 * `CARD_SIZE`; this component is what fills it.
 *
 * What it owns: the torn edge, the family keystone, the flex column, and the
 * copyright line. What
 * it does NOT own is any point size — every one of those comes from
 * `print-codex.css` (M16 D0, M18 D5).
 *
 * The column is three parts, and the split is load-bearing rather than tidy:
 * head and foot are `flex: none`, the body is the single flexible child, and
 * the autofit measures the body alone. Measuring the whole card would conflate
 * "the title wrapped onto a second line" with "the rules text is long" and
 * shrink the wrong one.
 */
export const PlayingCard: React.FC<PlayingCardProps> = ({
	keystone = 'winged',
	header,
	badge,
	fitKey,
	onFitted,
	children,
}) => {
	const body = React.useRef<HTMLDivElement>(null)
	const content = React.useRef<HTMLDivElement>(null)
	// A card with no `fitKey` still measures — the predicate answers true at 9pt
	// on the first call and the search stops there, so it costs one layout read.
	useAutofit(body, content, { contentKey: fitKey ?? '', onSettled: onFitted })

	return (
		<div className="pc-card">
			{/* The edge is the torn deckle; the keystone is the family mark laid over
			    it. Not `CardFrame` — its four diamond corners fenced the torn
			    outline with a second, straighter edge (owner, 2026-08-06). */}
			<div className="pc-card__edge">
				<TornCardFrame />
			</div>
			<div className="pc-card__keystone">
				<Keystone variant={keystone} />
			</div>
			{badge ? <div className="pc-card__badge">{badge}</div> : null}
			<div className="pc-card__inner">
				{header ? <div className="pc-card__head">{header}</div> : null}
				{/* Two elements, and the inner one is why: `scrollHeight` is an
				    INTEGER, so a body overflowing its box by a fraction of a pixel
				    reports a perfect fit. The content's own box is measured with
				    `getBoundingClientRect`, which is fractional (M18 trap 14). */}
				<div className="pc-card__body" ref={body}>
					<div className="pc-card__content" ref={content}>
						{children}
					</div>
				</div>
				<div className="pc-card__foot">
					©{new Date().getFullYear()} Nexus RPG
				</div>
			</div>
		</div>
	)
}
