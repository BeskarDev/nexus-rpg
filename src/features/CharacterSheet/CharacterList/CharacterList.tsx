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
} from '@mui/material'
import { useAuth } from '@site/src/hooks/firebaseAuthContext'
import React from 'react'
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

export type Character = DocumentData & {
	docRef: DocumentReference<DocumentData, DocumentData>
}

export const CharacterList: React.FC = () => {
	const [characters, setCharacters] = React.useState<Character[]>([])
	const { currentUser } = useAuth()

	const userUid = currentUser.uid
	const collectionRef = collection(db, userUid)

	const getDocuments = async () => {
		try {
			const q = query(collectionRef) // Create a query to get all documents
			const querySnapshot = await getDocs(q) // Use getDocs to fetch documents

			const allDocs: Character[] = querySnapshot.docs.map((doc) => ({
				docRef: doc.ref,
				...doc.data(),
			}))
			setCharacters(allDocs)
		} catch (error) {
			console.error('Error fetching documents: ', error)
		}
	}

	getDocuments()

	return (
		<List dense={false}>
			{Boolean(characters.length) &&
				characters.map((char) => (
					<ListItem
						key={char.docId}
						secondaryAction={<DeleteButton char={char} />}
					>
						<ListItemAvatar>
							<Avatar>
								<ListAlt />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary={char['field1']} />
					</ListItem>
				))}
		</List>
	)
}
