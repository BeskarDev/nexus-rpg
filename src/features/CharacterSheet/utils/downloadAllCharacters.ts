import JSZip from 'jszip'
import { CharacterDocument } from '../../../types/Character'

export const downloadAllCharacters = async (characters: CharacterDocument[]) => {
	if (!characters || characters.length === 0) {
		console.warn('No characters to download')
		return
	}

	try {
		const zip = new JSZip()

		// Group characters by player name
		const charactersByPlayer = characters.reduce(
			(groups, char) => {
				const playerName = char.personal.playerName || 'Unknown Player'
				if (!groups[playerName]) {
					groups[playerName] = []
				}
				groups[playerName].push(char)
				return groups
			},
			{} as Record<string, CharacterDocument[]>
		)

		// Add each character to the zip file in their respective player folder
		Object.entries(charactersByPlayer).forEach(([playerName, playerCharacters]) => {
			// Create a safe folder name by removing/replacing invalid characters
			const safeFolderName = playerName.replace(/[<>:"/\\|?*]/g, '_')
			
			playerCharacters.forEach((character) => {
				// Create a safe filename
				const safeCharacterName = character.personal.name.replace(/[<>:"/\\|?*]/g, '_')
				const fileName = `${safeCharacterName}.json`
				
				// Remove Firebase-specific properties before saving
				const characterData = {
					...character,
					docId: undefined,
					docRef: undefined,
					collectionId: undefined,
				}
				
				// Add file to zip in the player's folder
				zip.file(`${safeFolderName}/${fileName}`, JSON.stringify(characterData, null, 2))
			})
		})

		// Generate and download the zip file
		const content = await zip.generateAsync({ type: 'blob' })
		
		// Create download link
		const url = URL.createObjectURL(content)
		const a = document.createElement('a')
		a.href = url
		a.download = `nexus-characters-${new Date().toISOString().split('T')[0]}.zip`
		
		// Trigger download
		document.body.appendChild(a)
		a.click()
		
		// Cleanup
		document.body.removeChild(a)
		URL.revokeObjectURL(url)
		
		console.log(`Successfully downloaded ${characters.length} characters for ${Object.keys(charactersByPlayer).length} players`)
	} catch (error) {
		console.error('Error generating zip file:', error)
		alert('Failed to download characters. Please try again.')
	}
}