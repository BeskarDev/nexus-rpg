/* eslint-disable no-mixed-spaces-and-tabs */
import React from 'react'
import { Box, alpha } from '@mui/material'
import { CardFrame } from '@site/src/components/codex/ornaments'
import { CharacterSheetCardProps } from './types'
import { RuleInfo } from '../RuleInfo'

export const CharacterSheetCard: React.FC<CharacterSheetCardProps> = ({
	header,
	children,
	footer,
	info,
	infoLabel,
	editLabel,
	configMenu,
	onConfigClick,
	minWidth,
	maxWidth,
	sx,
	borderColor,
	// M9 S3: the codex kit's cartouche keystone + corner rails (its own motif,
	// per the card-family table in codex-theme/SKILL.md). Off by default —
	// several CharacterSheetCard contexts (weapon/equipment rows) stack tightly
	// with near-zero gap, and the keystone's ~16px overhang needs real
	// clearance above it (ornament-craft §9) or it collides with the card
	// stacked above. Opt in per usage where the surrounding layout has room.
	frame = false,
	// M9 S6: see CardWeight in ./types for why this axis exists and how the
	// registers map onto how often a value is edited during play.
	weight = 'tile',
	'data-testid': testId,
}) => {
	const framed = weight === 'tile'
	/**
	 * One way into edit state, everywhere: clicking the card opens its editor.
	 *
	 * M9 S6. This started as band-only, which left HP with a gear while its
	 * neighbours were click-anywhere — two mechanisms for the same act. Now any
	 * card with a config menu is its own trigger and the gear is gone entirely.
	 * Costs no extra tap; it was always one tap on the gear.
	 */
	const tapToEdit = Boolean(onConfigClick)
	const handleConfigClick = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => {
		onConfigClick?.(event)
	}

	// Clone configMenu to add onClose handler
	const configMenuWithClose = configMenu
		? React.cloneElement(configMenu as React.ReactElement, {
				onClose: (e: any) => {
					;(configMenu as any).props?.onClose?.(e)
				},
			})
		: null

	const cardContent = (
		<Box
			data-testid={testId}
			{...(tapToEdit && {
				role: 'button',
				tabIndex: 0,
				'aria-label': editLabel,
				onClick: (event: React.MouseEvent<HTMLElement>) => {
					// Several of these cards carry their own controls — HP's damage and
					// healing buttons, the pip checkboxes, the die Select. A click that
					// landed on one of those is that control's, not the editor's.
					// Deliberately excludes [role="button"]: the card itself carries it.
					if (
						(event.target as HTMLElement).closest(
							'button, input, select, textarea, a',
						)
					) {
						return
					}
					handleConfigClick(
						event as React.MouseEvent<HTMLButtonElement, MouseEvent>,
					)
				},
				onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => {
					if (event.key === 'Enter' || event.key === ' ') {
						event.preventDefault()
						handleConfigClick(
							event as unknown as React.MouseEvent<
								HTMLButtonElement,
								MouseEvent
							>,
						)
					}
				},
			})}
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				borderRadius: 1,
				// A `column` sits inside a plate that already supplies the frame, and a
				// `band` value is read rather than edited — neither earns a keyline of
				// its own. Only `borderColor` (the wounded-attribute state) still draws
				// one, because that is information, not decoration.
				border: (theme) =>
					borderColor
						? `1px solid ${borderColor}`
						: framed
							? `1px solid ${alpha(theme.palette.divider, 0.2)}`
							: '1px solid transparent',
				...(framed && {
					bgcolor: (theme) => alpha(theme.palette.background.paper, 0.3),
				}),
				p: framed ? 0.5 : 0.25,
				position: 'relative',
				minWidth: minWidth || (framed ? '4rem' : 0),
				...(tapToEdit && {
					cursor: 'pointer',
					borderRadius: 1,
					// The only affordance a frameless value gets: a wash on hover, and a
					// real focus ring so it is reachable by keyboard like the gear was.
					'&:hover': {
						bgcolor: (theme) => alpha(theme.palette.text.primary, 0.05),
					},
					'&:focus-visible': {
						outline: '1.5px solid var(--nexus-bronze)',
						outlineOffset: '1px',
					},
				}),
				// The cartouche keystone overhangs ~16px above the border (see
				// CardFrame's own module CSS); this is that clearance, matching the
				// codex kit's own convention for a keystone this weight.
				...(frame && { mt: '1.15rem' }),
				...(maxWidth && { maxWidth }),
				...sx,
			}}
		>
			{/* M9 S3: corner marks, codex-kit register. `frame` cards get the full
				cartouche keystone + corner rails (CardFrame supplies its own
				corners); everything else gets the lighter rivet dots instead — most
				CharacterSheetCard instances are small stat tiles (AvCard etc., as
				narrow as 4rem) that a full rail system was never sized for. */}
			{frame ? (
				<CardFrame keystone="sheet" />
			) : (
				// Rivets are corner marks for a keyline; with no keyline to pin they
				// would float, so unframed weights omit them.
				framed &&
				(['tl', 'tr', 'br', 'bl'] as const).map((pos) => (
					<span
						key={pos}
						className={`cs-rivet cs-rivet-${pos}`}
						aria-hidden="true"
					/>
				))
			)}
			{header && header}

			{/* Main Content */}
			<Box
				sx={{
					...(footer ? {} : { pb: 0.5 }),
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					width: '100%',
				}}
			>
				{children}
			</Box>

			{/* Footer */}
			{footer && footer}

			{/* The stylus mark sits top-right on every card that has one. The config
				gear is gone: the card body opens the editor now, so a gear would be a
				second way to do one thing — and four of them in a row was exactly the
				dashboard chrome this slice removes. */}
			{info && (
				<Box sx={{ position: 'absolute', top: 0, right: 0, display: 'flex' }}>
					<RuleInfo label={infoLabel}>{info}</RuleInfo>
				</Box>
			)}
		</Box>
	)

	// M9 S6: no Tooltip wrapping the whole card any more. That was what made hover
	// unbearable — it fired from anywhere on the tile, so crossing the plate raised
	// one per card, and cards with inner tooltips nested a second inside it. Hover
	// still works, but only on the stylus mark (see RuleInfo).
	return (
		<>
			{cardContent}
			{configMenuWithClose}
		</>
	)
}
