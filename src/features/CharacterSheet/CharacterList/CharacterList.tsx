import { ListAlt } from '@mui/icons-material'
import {
	Avatar,
	Link,
	List,
	ListItem,
	ListItemAvatar,
	ListItemButton,
	ListItemText,
} from '@mui/material'
import { db } from '@site/src/config/firebase'
import { useAuth } from '@site/src/hooks/firebaseAuthContext'
import { collection, deleteDoc, getDocs, query } from 'firebase/firestore'
import React, { useEffect } from 'react'
import { CharacterDocument } from '../../../types/Character'
import { mapDocToCharacter } from '../utils/mapDocToCharacter'
import { DeleteButton } from './DeleteButton'

const DOC_BLACKLIST = ['player-info']

export const CharacterList: React.FC = () => {
	const [characters, setCharacters] = React.useState<CharacterDocument[]>([])
	const { currentUser, setIsAdmin } = useAuth()

	useEffect(() => {
		getDocuments()
	}, [])

	if (!currentUser) {
		return undefined
	}

	const userUid = currentUser.uid

	const getDocuments = async () => {
		try {
			const collectionRef = collection(db, userUid)
			const q = query(collectionRef) // Create a query to get all documents
			const querySnapshot = await getDocs(q) // Use getDocs to fetch documents

			const allowedCollections: string[] =
				querySnapshot.docs.find((doc) => doc.id === 'player-info')?.data()
					.allowedCollections ?? []
			setIsAdmin(Boolean(allowedCollections.length))

			const allDocs: CharacterDocument[] = querySnapshot.docs
				.filter((doc) => !DOC_BLACKLIST.includes(doc.id))
				.map((doc) => mapDocToCharacter(userUid, doc))

			if (Boolean(allowedCollections.length)) {
				await allowedCollections.map(async (collectionId) => {
					const collectionRef = collection(db, collectionId)
					const q = query(collectionRef)
					const querySnapshot = await getDocs(q)
					allDocs.push(
						...querySnapshot.docs
							.filter((doc) => !DOC_BLACKLIST.includes(doc.id))
							.map((doc) => mapDocToCharacter(collectionId, doc)),
					)
				})
			}

			setCharacters(allDocs)
		} catch (error) {
			console.error('Error fetching documents: ', error)
		}
	}

	const handleDeleteCharacter = async (char: CharacterDocument) => {
		await deleteDoc(char.docRef)
		setCharacters((chars) => chars.filter((c) => c.docId !== char.docId))
	}

	return (
		<List>
			{Boolean(characters.length) &&
				characters.map((char) => (
					<ListItem
						key={char.docId}
						secondaryAction={
							<DeleteButton
								handleDeleteCharacter={() => handleDeleteCharacter(char)}
							/>
						}
					>
						<Link
							href={`${window.location.href.split('?')[0]}?id=${char.collectionId}-${char.docId}`}
							sx={{ width: '100%', textDecoration: 'none' }}
						>
							<ListItemButton sx={{ borderRadius: 30, mr: 2 }}>
								<ListItemAvatar>
									<Avatar>
										<ListAlt />
									</Avatar>
								</ListItemAvatar>
								<ListItemText
									primary={char?.personal?.name ?? '?'}
									sx={{ textDecoration: 'none' }}
								/>
							</ListItemButton>
						</Link>
					</ListItem>
				))}
		</List>
	)
}
