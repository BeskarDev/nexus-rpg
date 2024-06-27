import React, { useState } from 'react'
import { Avatar, AvatarProps, Menu, MenuItem } from '@mui/material'
import { Person } from '@mui/icons-material'
import { LoginComponent } from '@site/src/components/LoginComponent'

export const UserAvatar: React.FC<AvatarProps> = (props) => {
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
				MenuListProps={{ sx: { p: 2 } }}
			>
				<LoginComponent />
			</Menu>
		</>
	)
}
