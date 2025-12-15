import {
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	query,
	updateDoc,
	QuerySnapshot,
	DocumentSnapshot,
} from 'firebase/firestore'
import { db } from '@site/src/config/firebase'
import { CharacterDocument } from '../types/Character'
import { getMockCharacters } from './mockData'

/**
 * Development Firebase service that provides mock data in development
 * and real Firebase functionality in production.
 *
 * This approach keeps all development logic separate from production code.
 *
 * NOTE: This entire /dev folder is only used in development mode and
 * has no impact on production builds.
 */
class FirebaseService {
	private isDevelopment(): boolean {
		return (
			process.env.NODE_ENV === 'development' &&
			typeof window !== 'undefined' &&
			(window.location.hostname === 'localhost' ||
				window.location.hostname === '127.0.0.1')
		)
	}

	private getMockCollectionDocs(): CharacterDocument[] {
		return getMockCharacters()
	}

	async getCollection(collectionId: string): Promise<CharacterDocument[]> {
		// In development, return mock data for any collection
		if (this.isDevelopment()) {
			console.warn('🔧 Development mode: Using mock character data')
			return this.getMockCollectionDocs()
		}

		// Production: Use real Firebase
		const collectionRef = collection(db, collectionId)
		const q = query(collectionRef)
		const querySnapshot = await getDocs(q)

		const DOC_BLACKLIST = ['player-info']
		return querySnapshot.docs
			.filter((doc) => !DOC_BLACKLIST.includes(doc.id))
			.map(
				(docSnapshot) =>
					({
						...docSnapshot.data(),
						docRef: docSnapshot.ref,
						docId: docSnapshot.id,
						collectionId,
					}) as CharacterDocument,
			)
	}

	async getDocument(
		collectionId: string,
		docId: string,
	): Promise<CharacterDocument | null> {
		// In development, return mock data if requesting mock collection
		if (this.isDevelopment()) {
			const mockChars = this.getMockCollectionDocs()
			const mockChar = mockChars.find((char) => char.docId === docId)
			if (mockChar) {
				console.warn(
					'🔧 Development mode: Using mock character:',
					mockChar.personal.name,
				)
				return mockChar
			}
		}

		// Production: Use real Firebase
		const docSnapshot = await getDoc(doc(db, collectionId, docId))
		if (!docSnapshot.exists()) {
			return null
		}

		return {
			...docSnapshot.data(),
			docRef: docSnapshot.ref,
			docId: docSnapshot.id,
			collectionId,
		} as CharacterDocument
	}

	async updateDocument(character: CharacterDocument): Promise<void> {
		// In development, just log the update
		if (this.isDevelopment()) {
			console.warn(
				'🔧 Development mode: Mock save for character:',
				character.personal.name,
			)
			return Promise.resolve()
		}

		// Production: Use real Firebase
		const { docRef, docId, collectionId, ...characterData } = character
		await updateDoc(docRef, characterData as any)
	}

	async deleteDocument(character: CharacterDocument): Promise<void> {
		// In development, just log the deletion
		if (this.isDevelopment()) {
			console.warn(
				'🔧 Development mode: Mock delete for character:',
				character.personal.name,
			)
			return Promise.resolve()
		}

		// Production: Use real Firebase
		await deleteDoc(character.docRef)
	}

	async getUserInfo(userId: string): Promise<{ allowedCollections: string[] }> {
		// In development, return empty allowedCollections to avoid duplicates
		// since getCollection() already returns mock data for any collection
		if (this.isDevelopment()) {
			console.warn('🔧 Development mode: Mock admin permissions granted')
			return { allowedCollections: [] } // Return empty to avoid duplicate mock characters
		}

		// Production: Get real user info
		const userDoc = await getDoc(doc(db, userId, 'player-info'))
		if (!userDoc.exists()) {
			return { allowedCollections: [] }
		}

		return {
			allowedCollections: userDoc.data().allowedCollections ?? [],
		}
	}
}

// Export singleton instance
export const firebaseService = new FirebaseService()
