import { DocumentData, DocumentSnapshot } from 'firebase/firestore'
import { Character, CharacterDocument } from '../../../types/Character'

export const mapDocToCharacter = (
	collectionId: string,
	doc: DocumentSnapshot<DocumentData, DocumentData>,
): CharacterDocument => {
	const docData = { ...(doc.data() as Character) }

	const character: CharacterDocument = {
		docRef: doc.ref,
		docId: doc.id,
		collectionId,
		...docData,
	}
	return character
}
