export type Party = {
	id: string
	name: string
	notes: string
	createdBy: string
	createdAt: string
	members: string[] // Array of character IDs
}

export type PartyMember = {
	characterId: string
	name: string
	playerName: string
	folk: string
	background: string
	level: number
	profilePicture?: string
}

export type PartyInfo = {
	party: Party
	members: PartyMember[]
}