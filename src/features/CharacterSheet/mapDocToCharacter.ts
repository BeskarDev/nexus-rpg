import { DocumentData, DocumentSnapshot } from 'firebase/firestore'
import { Character } from './CharacterList/CharacterList'

export const mapDocToCharacter = (
	doc: DocumentSnapshot<DocumentData, DocumentData>,
): Character => {
	const docData = { ...doc.data() }
	const character: Character = {
		docRef: doc.ref,
		docId: doc.id,
		name: docData['name'] ?? '',
		strength: docData['strength'] ?? '',
		agility: docData['agility'] ?? '',
		spirit: docData['spirit'] ?? '',
		mind: docData['mind'] ?? '',
	}
	return character
}
