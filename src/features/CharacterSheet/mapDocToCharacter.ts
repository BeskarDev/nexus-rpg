import { DocumentData, DocumentSnapshot } from 'firebase/firestore'
import { Character, CharacterDocument } from './types/Character'

export const mapDocToCharacter = (
	doc: DocumentSnapshot<DocumentData, DocumentData>,
): CharacterDocument => {
	const docData = { ...(doc.data() as Character) }
	console.log(docData['statistics'])
	const character: CharacterDocument = {
		docRef: doc.ref,
		docId: doc.id,
		...docData,
	}
	return character
}
