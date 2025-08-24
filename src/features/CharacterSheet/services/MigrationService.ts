import {
	collection,
	getDocs,
	doc,
	getDoc,
	addDoc,
	updateDoc,
	deleteDoc,
} from 'firebase/firestore'
import { db } from '@site/src/config/firebase'
import { Party } from '@site/src/types/Party'
import { logger } from '../utils'

export interface LegacySharedNote {
	id: string
	notes: string
	allowedCharacters: string[]
}

export class MigrationService {
	/**
	 * Migrate all existing shared notes to the new party system
	 */
	static async migrateSharedNotesToParties(): Promise<void> {
		logger.debug('Starting migration of shared notes to parties...')

		try {
			// Get all existing shared notes
			const sharedNotesSnapshot = await getDocs(collection(db, 'shared-notes'))

			if (sharedNotesSnapshot.empty) {
				logger.debug('No shared notes found to migrate')
				return
			}

			for (const noteDoc of sharedNotesSnapshot.docs) {
				const noteData = noteDoc.data() as LegacySharedNote

				// Skip if no allowed characters
				if (
					!noteData.allowedCharacters ||
					noteData.allowedCharacters.length === 0
				) {
					logger.debug(
						`Skipping shared note ${noteDoc.id} - no allowed characters`,
					)
					continue
				}

				// Check if any of these characters already have a party
				const hasExistingParty = await this.checkCharactersHaveParty(
					noteData.allowedCharacters,
				)
				if (hasExistingParty) {
					logger.debug(
						`Skipping shared note ${noteDoc.id} - characters already have a party`,
					)
					continue
				}

				// Get the first character to determine party creator
				const firstCharacterId = noteData.allowedCharacters[0]
				const creatorInfo = await this.getCharacterCreatorInfo(firstCharacterId)

				if (!creatorInfo) {
					logger.debug(
						`Skipping shared note ${noteDoc.id} - cannot find creator info`,
					)
					continue
				}

				// Create a new party from this shared note
				const party: Omit<Party, 'id'> = {
					name: `Migrated Party (${creatorInfo.characterName})`,
					notes: noteData.notes || '',
					createdBy: creatorInfo.createdBy,
					createdAt: new Date().toISOString(),
					members: noteData.allowedCharacters,
				}

				// Add the party to the database
				const partyRef = await addDoc(collection(db, 'parties'), party)
				logger.debug(
					`Created party ${partyRef.id} from shared note ${noteDoc.id}`,
				)

				// Update all member characters to reference this party
				for (const characterId of noteData.allowedCharacters) {
					await this.updateCharacterPartyReference(characterId, partyRef.id)
				}

				// Delete the old shared note
				await deleteDoc(noteDoc.ref)
				logger.debug(`Deleted legacy shared note ${noteDoc.id}`)
			}

			logger.debug('Migration completed successfully')
		} catch (error) {
			logger.error('Migration failed:', error)
			throw error
		}
	}

	/**
	 * Check if any characters already have a party assigned
	 */
	private static async checkCharactersHaveParty(
		characterIds: string[],
	): Promise<boolean> {
		for (const characterId of characterIds) {
			try {
				const [collectionId, docId] = characterId.split('-')
				const charDoc = await getDoc(doc(db, collectionId, docId))

				if (charDoc.exists() && charDoc.data().partyId) {
					return true
				}
			} catch (error) {
				logger.warn(
					`Failed to check party for character ${characterId}:`,
					error,
				)
			}
		}
		return false
	}

	/**
	 * Get character creator information
	 */
	private static async getCharacterCreatorInfo(characterId: string): Promise<{
		characterName: string
		createdBy: string
	} | null> {
		try {
			const [collectionId, docId] = characterId.split('-')
			const charDoc = await getDoc(doc(db, collectionId, docId))

			if (charDoc.exists()) {
				const charData = charDoc.data()
				return {
					characterName: charData.personal?.name || 'Unknown Character',
					createdBy: collectionId, // The collection ID is the user ID
				}
			}
		} catch (error) {
			logger.warn(
				`Failed to get creator info for character ${characterId}:`,
				error,
			)
		}
		return null
	}

	/**
	 * Update a character to reference a party
	 */
	private static async updateCharacterPartyReference(
		characterId: string,
		partyId: string,
	): Promise<void> {
		try {
			const [collectionId, docId] = characterId.split('-')
			await updateDoc(doc(db, collectionId, docId), { partyId })
			logger.debug(
				`Updated character ${characterId} with party reference ${partyId}`,
			)
		} catch (error) {
			logger.warn(
				`Failed to update character ${characterId} with party reference:`,
				error,
			)
		}
	}

	/**
	 * Check if migration is needed (are there still shared notes?)
	 */
	static async isMigrationNeeded(): Promise<boolean> {
		const sharedNotesSnapshot = await getDocs(collection(db, 'shared-notes'))
		return !sharedNotesSnapshot.empty
	}
}
