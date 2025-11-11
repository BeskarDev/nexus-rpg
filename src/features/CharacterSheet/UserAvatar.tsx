import { Avatar, AvatarProps, Menu } from '@mui/material'
import { LoginComponent } from '@site/src/components/LoginComponent'
import { UserMenu } from '@site/src/components/UserMenu'
import { useAuth } from '@site/src/hooks/firebaseAuthContext'
import React from 'react'

export const UserAvatar: React.FC<AvatarProps> = (props) => {
	const { userLoggedIn } = useAuth()
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)
	const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}

	return (
		<>
			<Avatar
				{...props}
				onClick={handleClick}
				sx={{
					bgcolor: (theme) => theme.palette.primary.main,
					cursor: 'pointer',
					transition: 'opacity 200ms ease-in-out',
					'&:hover': {
						opacity: 0.7,
					},
					...props.sx,
				}}
			/>
			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
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
