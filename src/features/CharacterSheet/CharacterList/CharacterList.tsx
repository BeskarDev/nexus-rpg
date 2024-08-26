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

export const CharacterList: React.FC = () => {
	const [characters, setCharacters] = React.useState<CharacterDocument[]>([])
	const { currentUser } = useAuth()

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

			const allDocs: CharacterDocument[] = querySnapshot.docs.map((doc) =>
				mapDocToCharacter(doc),
			)
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
							href={`${window.location.href.split('?')[0]}?id=${char.docId}`}
							sx={{ width: '100%', textDecoration: 'none' }}
						>
							<ListItemButton sx={{ borderRadius: 30, mr: 2 }}>
								<ListItemAvatar>
									<Avatar>
										<ListAlt />
									</Avatar>
								</ListItemAvatar>
								<ListItemText
									primary={char.personal.name}
									sx={{ textDecoration: 'none' }}
								/>
							</ListItemButton>
						</Link>
					</ListItem>
				))}
		</List>
	)
}
