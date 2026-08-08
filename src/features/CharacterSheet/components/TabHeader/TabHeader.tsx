import React from 'react'
import { Box } from '@mui/material'
import type { SxProps, Theme } from '@mui/material'

export interface TabHeaderProps {
	/** Commands that belong to the whole tab (the Magic Item Builder, a settings menu). */
	actions?: React.ReactNode
	/** The tab's meta band, and anything else that states facts about the whole tab. */
	children?: React.ReactNode
	sx?: SxProps<Theme>
}

/**
 * A tab's opening plate: the band of facts about the whole tab, and the commands that
 * act on it (M13 S6).
 *
 * ## Two rounds to get the weight right
 *
 * It began as `CharacterSheetCard`'s `frame` treatment — the codex kit's cartouche
 * keystone plus four corner rails — which the Personal tab had been spending on **every
 * field**, nine keystones down one tab. Moving that ornament to one container per tab was
 * the right direction and the wrong dose: at a tab's full width the rails run a metre of
 * bronze filigree across the top of the sheet, and the owner's report was immediate. An
 * ornament sized for a spell card is not sized for a 1200px strip.
 *
 * So the plate keeps the frame's IDEA — a bounded, marked container — with the quietest
 * device that carries it: four corner rivets, the same 3px diamonds `CharacterSheetCard`
 * puts on its tiles, plus the keyline and wash every container on this sheet has. No
 * keystone, no rails.
 *
 * ## And no title
 *
 * The first version set the tab's name in the display serif at the top of the plate. The
 * tab bar three pixels above it already says which tab this is, so that was the same word
 * twice — and, as the owner put it, this is a tool rather than a document: a page title is
 * something a document needs and a panel does not. The plate holds facts and verbs only,
 * which is also why a tab with neither (Personal) simply has no header rather than an
 * empty plate with a heading in it.
 */
export const TabHeader: React.FC<TabHeaderProps> = ({
	actions,
	children,
	sx,
}) => (
	<Box className="cs-tab-header" sx={sx}>
		<span className="cs-rivet cs-rivet-tl" aria-hidden="true" />
		<span className="cs-rivet cs-rivet-tr" aria-hidden="true" />
		<span className="cs-rivet cs-rivet-br" aria-hidden="true" />
		<span className="cs-rivet cs-rivet-bl" aria-hidden="true" />
		<Box className="cs-tab-header__body">{children}</Box>
		{actions && (
			/* The levelled control strip — a tab's commands wear the same stamped plates a
				section's do, so "acts on this tab" and "acts on this list" are one register at
				two scales. */
			<Box className="cs-section-actions">{actions}</Box>
		)}
	</Box>
)
