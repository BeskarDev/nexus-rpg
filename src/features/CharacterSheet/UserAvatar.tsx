import { Avatar, AvatarProps, Menu } from '@mui/material'
import { LoginComponent } from '@site/src/components/LoginComponent'
import { UserMenu } from '@site/src/components/UserMenu'
import { useAuth } from '@site/src/hooks/firebaseAuthContext'
import SigilIcon from '@site/src/components/codex/SigilIcon'
import React from 'react'

/**
 * The user plate, and what opens from it (M13 S13).
 *
 * ## Square, not round
 *
 * It was a filled bronze circle — the last round shape above the fold, on a page
 * whose every other plate has hard corners, and the same web-app tell the
 * character list's avatars carried until S12. A keyline square with the reader's
 * initial in it says the same thing in this theme's own hand.
 *
 * ## The panel
 *
 * `MuiMenu` is themed already, so the panel arrives keylined and square without
 * asking. What it needed was `cs-tokens`: the menu is PORTALLED out of
 * `.character-sheet-page`, where every `--cs-*` token is defined, so a login form
 * inside it resolved its ink against nothing. Same fix `ConfirmDialog` carries,
 * for the same reason.
 */
export const UserAvatar: React.FC<AvatarProps> = (props) => {
	const { userLoggedIn, currentUser } = useAuth()
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)
	const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}

	/* The reader's own initial when there is one to show. A generic person glyph
	   on a page where the reader IS the only person is a picture of nothing. */
	const initial = currentUser?.email?.trim()?.[0]?.toUpperCase()

	return (
		<>
			<Avatar
				variant="square"
				aria-label={userLoggedIn ? 'Account menu' : 'Log in'}
				{...props}
				onClick={handleClick}
				className="cs-user-plate"
			>
				{/* Logged out there is no initial to show, and MUI's default is its own
					`Person` glyph. `figure` is the carved mark for a person — the same
					one a character row falls back to — so the plate says "an account"
					in the theme's hand rather than in Material's. */}
				{userLoggedIn && initial ? (
					initial
				) : (
					<SigilIcon name="figure" size={15} />
				)}
			</Avatar>
			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
				slotProps={{ paper: { className: 'cs-tokens' } }}
				onKeyDown={(event) => {
					if (event.key === 'Tab') {
						event.stopPropagation()
					}
				}}
				MenuListProps={{ sx: { p: userLoggedIn ? 0 : 2 } }}
			>
				{userLoggedIn ? <UserMenu onClose={handleClose} /> : <LoginComponent />}
			</Menu>
		</>
	)
}
