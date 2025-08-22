import { 
	collection, 
	doc, 
	getDocs, 
	query, 
	where, 
	addDoc, 
	updateDoc, 
	deleteDoc,
	getDoc,
	onSnapshot,
	Unsubscribe
} from 'firebase/firestore'
import { db } from '@site/src/config/firebase'
import { Party, PartyMember, PartyInfo } from '@site/src/types/Party'
import { CharacterDocument } from '@site/src/types/Character'
import { calculateCharacterLevel } from '../utils/calculateCharacterLevel'

export class PartyService {
	/**
	 * Create a new party
	 */
	static async createParty(name: string, creatorCharacterId: string, createdBy: string): Promise<string> {
		try {
			// Validate inputs
			if (!name?.trim()) {
				throw new Error('Party name is required')
			}
			if (!creatorCharacterId?.trim()) {
				throw new Error('Creator character ID is required')
			}
			if (!createdBy?.trim()) {
				throw new Error('Creator user ID is required')
			}

			// Validate character ID format
			const characterIdParts = creatorCharacterId.split('-')
			if (characterIdParts.length < 2) {
				throw new Error('Invalid character ID format')
			}

			const party: Omit<Party, 'id'> = {
				name: name.trim(),
				notes: '',
				createdBy,
				createdAt: new Date().toISOString(),
				members: [creatorCharacterId]
			}
			
			// Create the party document
			const docRef = await addDoc(collection(db, 'parties'), party)
			
			// Update the creator's character to reference this party
			const [collectionId, docId] = creatorCharacterId.split('-')
			try {
				await updateDoc(doc(db, collectionId, docId), { partyId: docRef.id })
			} catch (updateError) {
				// If character update fails, clean up the created party
				await deleteDoc(doc(db, 'parties', docRef.id))
				throw new Error(`Failed to update character: ${updateError.message || 'Unknown error'}`)
			}
			
			return docRef.id
		} catch (error) {
			console.error('PartyService.createParty error:', error)
			if (error instanceof Error) {
				throw error
			}
			throw new Error('Failed to create party: Unknown error')
		}
	}

	/**
	 * Get party information by party ID
	 */
	static async getPartyInfo(partyId: string): Promise<PartyInfo | null> {
		const partyDoc = await getDoc(doc(db, 'parties', partyId))
		if (!partyDoc.exists()) return null
		
		const party = { id: partyDoc.id, ...partyDoc.data() } as Party
		const members = await this.getPartyMembers(party.members)
		
		return { party, members }
	}

	/**
	 * Get party members information from character IDs
	 */
	static async getPartyMembers(characterIds: string[]): Promise<PartyMember[]> {
		const members: PartyMember[] = []
		
		for (const characterId of characterIds) {
			try {
				const [collectionId, docId] = characterId.split('-')
				const charDoc = await getDoc(doc(db, collectionId, docId))
				
				if (charDoc.exists()) {
					const charData = charDoc.data()
					members.push({
						characterId,
						name: charData.personal.name,
						playerName: charData.personal.playerName,
						folk: charData.personal.folk,
						background: charData.personal.background,
						level: calculateCharacterLevel(charData.skills.xp.spend || 0),
						profilePicture: charData.personal.profilePicture
					})
				}
			} catch (error) {
				console.warn(`Failed to fetch character data for ${characterId}:`, error)
			}
		}
		
		return members
	}

	/**
	 * Add a character to a party
	 */
	static async addCharacterToParty(partyId: string, characterId: string): Promise<void> {
		const partyRef = doc(db, 'parties', partyId)
		const partyDoc = await getDoc(partyRef)
		
		if (!partyDoc.exists()) {
			throw new Error('Party not found')
		}
		
		const party = partyDoc.data() as Party
		if (!party.members.includes(characterId)) {
			await updateDoc(partyRef, {
				members: [...party.members, characterId]
			})
			
			// Update the character to reference this party
			const [collectionId, docId] = characterId.split('-')
			await updateDoc(doc(db, collectionId, docId), { partyId })
		}
	}

	/**
	 * Remove a character from a party
	 */
	static async removeCharacterFromParty(partyId: string, characterId: string): Promise<void> {
		const partyRef = doc(db, 'parties', partyId)
		const partyDoc = await getDoc(partyRef)
		
		if (!partyDoc.exists()) {
			throw new Error('Party not found')
		}
		
		const party = partyDoc.data() as Party
		const updatedMembers = party.members.filter(id => id !== characterId)
		
		if (updatedMembers.length === 0) {
			// Delete the party if no members left
			await deleteDoc(partyRef)
		} else {
			await updateDoc(partyRef, {
				members: updatedMembers
			})
		}
		
		// Remove party reference from character
		const [collectionId, docId] = characterId.split('-')
		await updateDoc(doc(db, collectionId, docId), { partyId: null })
	}

	/**
	 * Update party notes
	 */
	static async updatePartyNotes(partyId: string, notes: string): Promise<void> {
		await updateDoc(doc(db, 'parties', partyId), { notes })
	}

	/**
	 * Update party name
	 */
	static async updatePartyName(partyId: string, name: string): Promise<void> {
		if (!name?.trim()) {
			throw new Error('Party name cannot be empty')
		}
		await updateDoc(doc(db, 'parties', partyId), { name: name.trim() })
	}

	/**
	 * Listen for real-time party updates
	 */
	static subscribeToParty(partyId: string, callback: (partyInfo: PartyInfo | null) => void): Unsubscribe {
		return onSnapshot(doc(db, 'parties', partyId), async (doc) => {
			if (doc.exists()) {
				const party = { id: doc.id, ...doc.data() } as Party
				const members = await this.getPartyMembers(party.members)
				callback({ party, members })
			} else {
				callback(null)
			}
		}, (error) => {
			console.error('Error listening to party updates:', error)
			callback(null)
		})
	}

	/**
	 * Get party by character ID
	 */
	static async getPartyByCharacterId(characterId: string): Promise<PartyInfo | null> {
		const q = query(
			collection(db, 'parties'),
			where('members', 'array-contains', characterId)
		)
		
		const querySnapshot = await getDocs(q)
		if (querySnapshot.empty) return null
		
		const partyDoc = querySnapshot.docs[0]
		const party = { id: partyDoc.id, ...partyDoc.data() } as Party
		const members = await this.getPartyMembers(party.members)
		
		return { party, members }
	}
}