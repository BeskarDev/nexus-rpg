import React from 'react'
import {
	Box,
	Checkbox,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
} from '@mui/material'
import { SheetChip } from '../SheetChip'

/**
 * What a chip in the SLOT sits on, composited (M13 S8b, owner review).
 *
 * A clipped chip's outline is a filled silhouette with the surface inset on top,
 * so this must match the real backdrop or the chip's interior reads as the wrong
 * colour. Three layers here: the dialog paper, the filter band's 5% bronze wash,
 * and the input slot's own 7% over that — which composites to ~12% of bronze, not
 * 5 plus 7. In the MENU there is only the paper, so that call passes the token
 * bare.
 */
const SLOT_SURFACE =
	'color-mix(in srgb, var(--nexus-bronze) 12%, var(--ifm-background-surface-color))'

/** How many chosen values the slot shows before it starts counting instead. */
const CHIPS_SHOWN = 2

export interface FilterSelectProps {
	/** The facet's name, static above the slot. */
	label: string
	/** What the slot reads when nothing is chosen — "All skills", "All ranks". */
	allLabel: string
	options: string[]
	value: string[]
	onChange: (next: string[]) => void
	/**
	 * How an option reads, when the stored value is not the words you want shown
	 * (`3` stored, `Rank 3` shown).
	 */
	optionLabel?: (option: string) => string
	/**
	 * The chip's identity ink, or nothing for the structural bronze.
	 *
	 * S8's rule stands: a hue is an identity a reader LEARNS, so skills get their
	 * tone and an equipment category or a spell discipline does not — a reader
	 * cannot learn an identity that three subjects share, and cyan reads as sorcery
	 * only while it stays rare.
	 */
	tone?: (option: string) => string | undefined
	minWidth?: string
}

/**
 * A multi-select facet in the search dialogs' filter band.
 *
 * ## Why it is one component
 *
 * Seven of these existed across four dialogs as seven hand-built
 * `FormControl` + `Select` + `MenuItem` trees, and every fix had to be made seven
 * times — `displayEmpty` was missing from all of them until S8, and the chips the
 * owner asked for in S8b would have been the second such sweep. The differences
 * between them were only ever the label, the options and whether a value carries a
 * tone, so those are props and the rest is here.
 *
 * ## The two traps it closes
 *
 * - **`displayEmpty`.** MUI does not call `renderValue` for an empty selection
 *   unless told to, so a filter with a perfectly good "All …" fallback renders a
 *   BLANK BOX under a static label. That was a live bug on all five filters until
 *   S8 found it in the running app.
 * - **The portal.** A `Select`'s menu renders at `<body>`, outside
 *   `.cs-search-dialog` and outside `.character-sheet-page`, so without
 *   `cs-tokens` on its paper every chip inside it resolves to no styles and falls
 *   back to bare text. Fourth boundary crossing this milestone.
 */
export const FilterSelect: React.FC<FilterSelectProps> = ({
	label,
	allLabel,
	options,
	value,
	onChange,
	optionLabel = (option) => option,
	tone,
	minWidth = '12rem',
}) => {
	const labelId = `filter-${label.toLowerCase().replace(/\s+/g, '-')}`

	return (
		<FormControl size="small" sx={{ minWidth }}>
			<InputLabel id={labelId}>{label}</InputLabel>
			<Select
				multiple
				displayEmpty
				labelId={labelId}
				label={label}
				value={value}
				onChange={(event) => onChange(event.target.value as string[])}
				MenuProps={{ PaperProps: { className: 'cs-tokens' } }}
				renderValue={(selected) =>
					selected.length ? (
						<Box className="cs-filter-chips">
							{/* The slot is a fixed 36px, so a wrapped second line would be
								clipped rather than shown. Two chips, then a count — what is
								hidden is stated rather than cut off silently. */}
							{selected.slice(0, CHIPS_SHOWN).map((option) => (
								<SheetChip
									key={option}
									tone={tone?.(option)}
									surface={SLOT_SURFACE}
								>
									{optionLabel(option)}
								</SheetChip>
							))}
							{selected.length > CHIPS_SHOWN && (
								<span className="cs-filter-chips__more">
									+{selected.length - CHIPS_SHOWN}
								</span>
							)}
						</Box>
					) : (
						allLabel
					)
				}
			>
				{options.map((option) => (
					<MenuItem key={option} value={option}>
						<Checkbox checked={value.indexOf(option) > -1} />
						{/* The same stamp the rows and the tabs show for this value.
							`ListItemText` printed it as plain text, so a filter named a skill
							in a register nothing else on the sheet uses for one. */}
						<SheetChip
							tone={tone?.(option)}
							surface="var(--ifm-background-surface-color)"
						>
							{optionLabel(option)}
						</SheetChip>
					</MenuItem>
				))}
			</Select>
		</FormControl>
	)
}
