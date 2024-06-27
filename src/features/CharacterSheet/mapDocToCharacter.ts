import { DocumentData, DocumentSnapshot } from 'firebase/firestore'
import { Character } from './CharacterList/CharacterList'

export const mapDocToCharacter = (
	doc: DocumentSnapshot<DocumentData, DocumentData>,
): Character => {
	const docData = { ...doc.data() }
	console.log(docData['statistics'])
	const character: Character = {
		docRef: doc.ref,
		docId: doc.id,
		name: docData['name'] ?? '',
		statistics: {
			healthTotal: docData['statistics']['healthTotal'] ?? 16,
			healthCurrent: docData['statistics']['healthCurrent'] ?? 16,
			strength: docData['statistics']['strength'] ?? 'd6',
			agility: docData['statistics']['agility'] ?? 'd6',
			spirit: docData['statistics']['spirit'] ?? 'd6',
			mind: docData['statistics']['mind'] ?? 'd6',
			parry: docData['statistics']['parry'] ?? 7,
			dodge: docData['statistics']['dodge'] ?? 7,
			resist: docData['statistics']['resist'] ?? 7,
		},
	}
	return character
}
