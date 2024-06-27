import { Box, Tabs, Tab, Button, Typography } from '@mui/material'
import { useAuth } from '@site/src/hooks/firebaseAuthContext'
import React from 'react'
import { UserAvatar } from './UserAvatar'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '@site/src/config/firebase'

export const CharacterSheetHeader: React.FC = () => {
	const { userLoggedIn, currentUser } = useAuth()

	const createNewCharacter = () => {
		try {
			const userUid = currentUser.uid
			const collectionRef = collection(db, userUid)
			addDoc(collectionRef, { field1: 'bar' })
		} catch (error) {
			console.error('Error creating document: ', error)
		}
	}

	return (
		<Box
			sx={{
				display: 'flex',
				gap: 2,
				borderBottom: 1,
				borderColor: 'divider',
				pb: 1,
				mb: 2,
			}}
		>
			<Typography variant="h5">Your Characters</Typography>
			<Box sx={{ display: 'flex', gap: 2, ml: 'auto' }}>
				{
					<Button
						variant="outlined"
						size="small"
						disabled={!userLoggedIn}
						onClick={createNewCharacter}
					>
						new character
					</Button>
				}
				<UserAvatar />
			</Box>
		</Box>
	)
}
