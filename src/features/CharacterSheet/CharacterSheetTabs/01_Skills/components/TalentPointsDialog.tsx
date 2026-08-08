import React from 'react'
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Typography,
} from '@mui/material'
import { RecordPlate, RecordRow, SheetChip } from '../../../components'
import { getSkillChipColor } from '../../../../../constants/skills'
import { UI_COLORS } from '../../../../../utils/colors'
import type { TalentPointSummary } from '../../../utils/calculateTalentPoints'

export interface TalentPointsDialogProps {
	open: boolean
	onClose: () => void
	/** Every trained skill's talent-point standing, unfiltered. */
	summaries: TalentPointSummary[]
	/** Points spent on talents that name no skill. */
	unassignedSpent: number
	characterLevel: number
	maxXpPerSkill: number
	/** Opens the talent search, so the dialog is a doorway and not a dead end. */
	onBrowseTalents: () => void
}

/**
 * What a skill's talent points are worth, and what is left of them.
 *
 * @param spent how many are committed to talents
 * @param available how many the skill's XP has earned
 */
const PointTally: React.FC<{ spent: number; available: number }> = ({
	spent,
	available,
}) => {
	const open = available - spent
	return (
		<Box sx={{ display: 'flex', gap: 0.5, alignItems: 'baseline' }}>
			<Typography
				component="span"
				sx={{
					fontWeight: 'bold',
					fontSize: 'var(--nexus-text-md)',
					lineHeight: 1.2,
				}}
			>
				{spent}
			</Typography>
			<Typography
				component="span"
				sx={{ fontSize: 'var(--nexus-text-xs)', color: 'text.secondary' }}
			>
				/ {available}
			</Typography>
			{open !== 0 && (
				<Typography
					component="span"
					sx={{
						fontSize: 'var(--nexus-text-xs)',
						ml: 0.5,
						color: open > 0 ? UI_COLORS.success : UI_COLORS.danger,
					}}
				>
					({open > 0 ? '+' : ''}
					{open})
				</Typography>
			)}
		</Box>
	)
}

/**
 * The talent-point standing, as a plate per state (M13 S3, second pass).
 *
 * ## What this replaced
 *
 * An inline MUI `Dialog` in `CategorizedAbilities` — `DialogContentText`, a bare
 * `Button` reading `Close`, and one line per skill prefixed by a **10px circular
 * div filled with the skill's colour**. That dot was the codex theme's most
 * explicitly rejected construction twice over: a block of saturated colour
 * carrying identity, and the only round shape anywhere in the set. `SheetChip`
 * exists precisely to say "this skill" without either, and S8 kept a skill's tone
 * as the one learned identity a chip may still carry.
 *
 * ## The three things it did not say
 *
 * The old dialog listed only skills with points left to spend. Two states were
 * computed in its parent and thrown away:
 *
 * - **Overspent** — more points committed than the skill's XP has earned. That is
 *   a rules violation, and the sheet's only surface for it showed nothing at all.
 *   `overspentTalentSummaries` was a dead binding for the life of the file.
 * - **Fully spent** — a skill in good standing said nothing, so a reader could not
 *   tell "I have looked at this and it is correct" from "this is not listed".
 *   Every trained skill appears now.
 *
 * The third was that it was a **dead end**: a dialog named for spending points
 * whose only verb was `Close`. It carries the talent search now.
 */
export const TalentPointsDialog: React.FC<TalentPointsDialogProps> = ({
	open,
	onClose,
	summaries,
	unassignedSpent,
	characterLevel,
	maxXpPerSkill,
	onBrowseTalents,
}) => {
	const overspent = summaries.filter((summary) => summary.overspent > 0)
	const toSpend = summaries.filter(
		(summary) => summary.overspent === 0 && summary.available > summary.spent,
	)
	const settled = summaries.filter(
		(summary) =>
			summary.overspent === 0 &&
			summary.available === summary.spent &&
			summary.available > 0,
	)
	/*
		A trained skill with 0 XP has earned nothing and committed nothing, so it
		belongs to none of the three plates — it would be a row reading `0 / 0`
		three dozen times over. `summaries.length` is therefore the wrong test for
		"there is nothing to show here": what matters is whether any plate drew.
	*/
	const nothingToShow =
		overspent.length === 0 &&
		toSpend.length === 0 &&
		settled.length === 0 &&
		unassignedSpent === 0

	const plate = (label: string, rows: TalentPointSummary[]) =>
		rows.length > 0 && (
			<RecordPlate label={label} sx={{ mb: 1 }}>
				{rows.map((summary) => (
					<RecordRow
						key={`tp-${summary.skill}`}
						label={
							<SheetChip
								tone={getSkillChipColor(summary.skill)}
								// A clipped chip's outline is a filled silhouette with its
								// surface inset on top, so a mismatch here shows as a
								// wrong-coloured chip interior. What this one sits on is two
								// layers: the dialog's paper (which `--ifm-background-surface-color`
								// matches exactly in both modes) with the record plate's 4%
								// bronze wash over it. Passing the paper alone leaves the wash
								// out and the chip reads a shade cold against its own row.
								surface="color-mix(in srgb, var(--nexus-bronze) 4%, var(--ifm-background-surface-color))"
							>
								{summary.skill}
							</SheetChip>
						}
					>
						<PointTally spent={summary.spent} available={summary.available} />
					</RecordRow>
				))}
			</RecordPlate>
		)

	return (
		<Dialog
			open={open}
			onClose={onClose}
			maxWidth="xs"
			fullWidth
			// Portalled outside `.character-sheet-page`. `cs-tokens` is what makes
			// every `--cs-*` in here resolve, and it is also the scope the record
			// plate now answers to.
			PaperProps={{ className: 'cs-tokens cs-search-dialog cs-talent-points' }}
		>
			<DialogTitle>Talent points</DialogTitle>
			<DialogContent sx={{ pt: 2 }}>
				{/* The rule, in the sheet's own quiet register rather than as body
					prose. Not the caution band: that ink is reserved for a loss that
					cannot be undone, and this is how the system works. */}
				<Typography component="p" className="cs-talent-points__rule">
					Every 2 XP spent in a skill grants 1 talent point for that
					skill&apos;s talents. You are level {characterLevel}, so a skill holds
					at most {maxXpPerSkill} XP.
				</Typography>

				{/* Overspent first: it is the only state here that is WRONG, and a
					reader who has one wants it before the good news. */}
				{plate('Overspent', overspent)}
				{plate('To spend', toSpend)}
				{plate('Fully spent', settled)}

				{unassignedSpent > 0 && (
					<Box className="cs-dialog-notice" role="note">
						{unassignedSpent} talent point
						{unassignedSpent > 1 ? 's are' : ' is'} spent on talents that name
						no skill. Give each of those talents a skill and they will count
						against it.
					</Box>
				)}

				{nothingToShow && (
					<Typography component="p" className="cs-talent-points__rule">
						No talent points yet. Spend XP on a skill and its points appear
						here.
					</Typography>
				)}
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Close</Button>
				<Button variant="contained" onClick={onBrowseTalents}>
					Browse talents
				</Button>
			</DialogActions>
		</Dialog>
	)
}
