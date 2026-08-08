import React from 'react'
import { Box, Typography } from '@mui/material'
import { UnifiedListItem } from '../../../components/DynamicList'
import { DeleteButton, MarkButton } from '../../../components'
import { PartyMember } from '@site/src/types/Party'
import { PARTY_TEMPLATE } from './partyColumns'

export interface PartyMemberItemProps {
	member: PartyMember
	isCurrentUser: boolean
	isOnlyMember: boolean
	onLeaveParty: () => void
	onRemoveMember: () => void
	onDeleteParty: () => void
}

/**
 * One party member, as a ledger row (M13 S7).
 *
 * ## What it was
 *
 * An MUI `ListItem` with a rounded border and `bgcolor: action.hover` for the current
 * user, a circular `Avatar`, and `ListItemText` whose primary line was a **built string** —
 * `"Kael (Akashic Scholar, Level 4)"` — with the player's name as its secondary. Then one
 * of three Material icon buttons in `error` or `warning`: `Delete`, `ExitToApp`,
 * `PersonRemove`.
 *
 * Two faults beyond the register. The composed string meant four facts could not line up
 * with anything — the one list on the sheet whose values were prose rather than columns. And
 * "you" was marked by a grey Material hover fill, which is the same wash the sheet uses for
 * *hover* everywhere else, so the current row looked permanently hovered.
 *
 * ## What it is
 *
 * The four facts on the shared party tracks, so a party reads down its columns. `you` is a
 * small-caps mark beside the name rather than a background: it says the thing in words, and
 * it leaves the hover wash meaning hover.
 *
 * The row does NOT expand — a member has nothing inside them from this character's sheet —
 * so it uses the non-expanding variant, and its one control is whichever verb applies:
 * delete the party (you, alone), leave it (you, with others), or remove them (anyone else).
 */
export const PartyMemberItem: React.FC<PartyMemberItemProps> = ({
	member,
	isCurrentUser,
	isOnlyMember,
	onLeaveParty,
	onRemoveMember,
	onDeleteParty,
}) => (
	<UnifiedListItem
		summaryClassName="cs-ledger-row-grid"
		summarySx={{ gridTemplateColumns: PARTY_TEMPLATE, columnGap: 1 }}
		summaryContent={
			<>
				<Cell label="Adventurer" strong>
					{member.name}
					{isCurrentUser && <span className="cs-you">you</span>}
				</Cell>
				<Cell label="Player" muted>
					{member.playerName}
				</Cell>
				<Cell label="Folk" muted>
					{member.folk}
				</Cell>
				<Cell label="Level" align="center">
					{member.level}
				</Cell>
				<Box
					className="cs-section-actions"
					sx={{ display: 'flex', justifyContent: 'flex-end' }}
				>
					{isCurrentUser ? (
						isOnlyMember ? (
							// The last member deleting the party deletes the shared notes with it,
							// which is the one destructive action here that cannot be undone — so it
							// keeps the confirmation `PartyManagement` puts behind it.
							<DeleteButton
								onDelete={onDeleteParty}
								// `PartyManagement` already puts its own confirmation behind
								// this, and two dialogs for one press is worse than none.
								confirm={false}
								tooltipText="Delete this party"
							/>
						) : (
							<MarkButton
								glyph="×"
								label="Leave this party"
								onClick={onLeaveParty}
							/>
						)
					) : (
						<MarkButton
							glyph="×"
							label={`Remove ${member.name} from the party`}
							onClick={onRemoveMember}
						/>
					)}
				</Box>
			</>
		}
	/>
)

/** One read cell of the party row. */
const Cell: React.FC<{
	children: React.ReactNode
	label: string
	align?: 'left' | 'center'
	muted?: boolean
	strong?: boolean
}> = ({ children, label, align = 'left', muted, strong }) => (
	<Typography
		component="div"
		sx={{
			minWidth: 0,
			overflow: 'hidden',
			textOverflow: 'ellipsis',
			whiteSpace: 'nowrap',
			textAlign: align,
			fontSize: 'var(--nexus-text-dense)',
			...(align === 'center' && { fontVariantNumeric: 'tabular-nums' }),
			...(muted && { color: 'text.secondary' }),
			...(strong && { fontWeight: 600 }),
		}}
	>
		<span className="cs-cell-label">{label}</span>
		{children}
	</Typography>
)
