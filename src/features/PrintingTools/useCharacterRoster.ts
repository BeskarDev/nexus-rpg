/**
 * The characters a print tool is allowed to print (M22 S2).
 *
 * Lifted out of `CharacterSelector`, which owned auth, the Firestore read, the
 * admin collections and the schema migration as well as its dropdown. The Print
 * Everything page needs the same roster behind a DIFFERENT control — a checkbox
 * list, because it prints for a party — and a second copy of the fetch is a
 * second place for the migration to be forgotten.
 *
 * `migrateStoredCharacter` is the load-bearing part: the sheet app migrates on
 * fetch and this path did not, so a character saved before items gained
 * `location` printed with an empty inventory (M19, owner-reported).
 */
import { useCallback, useEffect, useMemo, useState } from 'react'
import { firebaseService } from '@site/src/dev/firebaseService'
import { useAuth } from '@site/src/hooks/firebaseAuthContext'
import type { CharacterDocument } from '@site/src/types/Character'
import { migrateStoredCharacter } from '../CharacterSheet/utils/migrateDoc'

export interface CharacterRoster {
	/** Filtered by the admin "view as" toggle, ready to list. */
	characters: CharacterDocument[]
	loading: boolean
	error: string | null
	/** False when nobody is signed in, outside development. */
	userLoggedIn: boolean
}

/** The stable key for one character across collections. */
export const characterKey = (character: CharacterDocument): string =>
	`${character.collectionId}-${character.docId}`

export function useCharacterRoster(): CharacterRoster {
	const { userLoggedIn, currentUser, isAdmin, viewAsAdmin } = useAuth()
	const [allCharacters, setAllCharacters] = useState<CharacterDocument[]>([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const loadCharacters = useCallback(async () => {
		setLoading(true)
		setError(null)
		try {
			const userUid = currentUser?.uid || 'dev-user'
			const userChars = (await firebaseService.getCollection(userUid)).map(
				migrateStoredCharacter,
			)
			const userInfo = await firebaseService.getUserInfo(userUid)

			if (userInfo.allowedCollections.length > 0) {
				const allChars = [...userChars]
				for (const adminCollectionId of userInfo.allowedCollections) {
					const adminChars = (
						await firebaseService.getCollection(adminCollectionId)
					).map(migrateStoredCharacter)
					allChars.push(...adminChars)
				}
				setAllCharacters(allChars)
			} else {
				setAllCharacters(userChars)
			}
		} catch (err) {
			console.error('Failed to load characters:', err)
			setError('Failed to load characters. Please try again.')
		} finally {
			setLoading(false)
		}
	}, [currentUser])

	useEffect(() => {
		if (userLoggedIn && currentUser) {
			loadCharacters()
		} else if (process.env.NODE_ENV === 'development') {
			// In development mode, load mock data even without auth
			loadCharacters()
		}
	}, [userLoggedIn, currentUser, loadCharacters])

	const characters = useMemo(() => {
		if (!isAdmin || !currentUser || viewAsAdmin) return allCharacters
		return allCharacters.filter(
			(character) => character.collectionId === currentUser.uid,
		)
	}, [allCharacters, isAdmin, currentUser, viewAsAdmin])

	return { characters, loading, error, userLoggedIn }
}
