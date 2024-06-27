import {
	Box,
	Tabs,
	Tab,
	Button,
	Typography,
	List,
	Avatar,
	IconButton,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Link,
	ListItemButton,
} from '@mui/material'
import { useAuth } from '@site/src/hooks/firebaseAuthContext'
import React, { useEffect } from 'react'
import { UserAvatar } from '../UserAvatar'
import { db } from '@site/src/config/firebase'
import {
	DocumentData,
	DocumentReference,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	query,
} from 'firebase/firestore'
import { Delete, Folder, ListAlt } from '@mui/icons-material'
import { DeleteButton } from './DeleteButton'
import { mapDocToCharacter } from '../mapDocToCharacter'
import { Character, CharacterDocument } from '../types/Character'

export const CharacterList: React.FC = () => {
	const [characters, setCharacters] = React.useState<CharacterDocument[]>([])
	const { currentUser } = useAuth()

	useEffect(() => {
		getDocuments()
	}, [])

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
						key={char.personal.name}
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
