import { useColorMode } from '@docusaurus/theme-common'
import { Replay, Save } from '@mui/icons-material'
import {
	Box,
	CircularProgress,
	IconButton,
	TextField,
	Typography,
} from '@mui/material'
import { db } from '@site/src/config/firebase'
import { useAuth } from '@site/src/hooks/firebaseAuthContext'
import {
	collection,
	getDocs,
	query,
	updateDoc,
	where,
} from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { SectionHeader } from '../../CharacterSheet'
import { useAppSelector } from '../../hooks/useAppSelector'
import { useDeviceSize } from '../../utils/useDeviceSize'

export const SharedNotes: React.FC = () => {
	const { currentUser } = useAuth()
	const { isMobile } = useDeviceSize()
	const [ref, setRef] = useState(undefined)

	const [unsavedChanges, setUnsavedChanges] = useState(false)
	const [loadingSave, setLoadingSave] = useState(false)
	const [notes, setNotes] = useState('')

	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState(null)

	const { docId: characterId } = useAppSelector(
		(state) => state.characterSheet.activeCharacter,
	)

	useEffect(() => {
		const fetchData = async () => {
			if (!currentUser) {
				setError('User not logged in')
				setIsLoading(false)
				return
			}

			await fetchNotes()
		}

		fetchData()
	}, [currentUser])

	const fetchNotes = async () => {
		setIsLoading(true)
		try {
			const q = query(
				collection(db, 'shared-notes'),
				where('allowedCharacters', 'array-contains', characterId),
			)
			const querySnapshot = await getDocs(q)

			if (querySnapshot.empty) {
				setError('No shared notes found')
			} else {
				setRef(querySnapshot.docs[0].ref)
				const data = querySnapshot.docs[0].data()
				setNotes(data.notes)
			}
		} catch (err) {
			setError(err.message)
		} finally {
			setIsLoading(false)
		}
	}

	const updateNotes = (notes: string) => {
		setNotes(notes)
		setUnsavedChanges(true)
	}

	const saveNotes = async () => {
		console.log('about to save shared notes...')
		if (unsavedChanges) {
			setLoadingSave(true)
			await updateDoc(ref, { notes })
			setUnsavedChanges(false)
			setLoadingSave(false)
		}
		console.log('done saving shared notes')
	}

	return (
		<>
			<Box
				sx={{
					position: isMobile ? 'sticky' : 'static',
					top: '164px',
					zIndex: isMobile ? 100 : 'auto',
					backgroundColor: 'var(--ifm-background-color)',
					display: 'flex',
					alignItems: 'center',
					gap: 1,
					width: '100%',
					maxWidth: { lg: 'unset', xl: '47rem' },
				}}
			>
				<SectionHeader>Shared Notes</SectionHeader>
				<IconButton
					disabled={isLoading || loadingSave}
					onClick={fetchNotes}
					sx={{ mb: '6px' }}
				>
					{loadingSave ? <CircularProgress size={20} /> : <Replay />}
				</IconButton>
				<IconButton
					disabled={!unsavedChanges}
					onClick={saveNotes}
					sx={{ mb: '6px' }}
				>
					{loadingSave ? <CircularProgress size={20} /> : <Save />}
				</IconButton>
			</Box>
			<Typography
				variant="caption"
				sx={{
					mb: 1,
				}}
			>
				shared across multiple users. make sure to not edit at the same time!
			</Typography>
			{error && (
				<Typography sx={{ mt: 1 }}>
					Error: No shared notes connected to your character.
				</Typography>
			)}
			<TextField
				disabled={error || isLoading || loadingSave}
				multiline
				minRows={20}
				maxRows={20}
				value={notes}
				onChange={(event) => updateNotes(event.target.value)}
				sx={{
					maxWidth: '100%',
					'& textarea.Mui-disabled': {
						color: 'inherit',
						['-webkit-text-fill-color']: 'inherit',
					},
				}}
			/>
		</>
	)
}
