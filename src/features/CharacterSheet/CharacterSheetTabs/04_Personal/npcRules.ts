import {
	NpcDisposition,
	NpcRole,
	npcDispositionArray,
} from '@site/src/types/Character'
import { UI_COLORS } from '@site/src/utils/colors'

/**
 * What the rules say about a role and a disposition, and how each reads on the sheet
 * (M13 S6).
 *
 * The descriptions were inline in `NpcRow`, which is why they were only reachable as a
 * `Tooltip` on a chip. They are data here so the row can show them as a gloss, the details
 * panel can show them under the select that sets them, and neither has to hold a copy.
 */
export const NPC_ROLE_DESCRIPTION: Record<NpcRole, string> = {
	Adventurer:
		'Lives for excitement, danger and exploration — mercenaries, bounty hunters, treasure hunters, outlaws, wanderers who take on high-risk work.',
	Artisan:
		'A skilled crafter or builder, master of a trade — blacksmiths, carpenters, weavers, architects who shape the world with their hands.',
	Authority:
		'Holds power, law or governance — nobles, guards, judges, anyone who wields social or political influence.',
	Scholar:
		'A seeker of knowledge, academic or religious or medical — priests, healers, historians, shamans who value study above all else.',
	Scoundrel:
		'Thrives in the shadows on trickery and manipulation — thieves, con artists, spies, anyone with a hidden agenda.',
	Seeker:
		'Driven by a quest, for knowledge or wealth or expression — merchants, guides, entertainers, anyone after something they do not yet have.',
}

export const NPC_DISPOSITION_DESCRIPTION: Record<NpcDisposition, string> = {
	[-3]: 'Actively despises the adventurer and will work to undermine them even at personal cost.',
	[-2]: "Opposes the adventurer's goals and needs significant persuasion or leverage to cooperate.",
	[-1]: 'Distrusts the adventurer but may be convinced to assist for appropriate compensation.',
	[0]: 'No strong feelings either way, and interacts purely transactionally.',
	[1]: 'Views the adventurer favourably and will offer modest assistance or a discount.',
	[2]: 'Counts the adventurer as family, close friend or honoured ally, and offers substantial support.',
}

/** `friendly +1` — the word a player reads, and the number the rules use. */
export const npcDispositionLabel = (disposition: NpcDisposition): string => {
	const entry = npcDispositionArray.find((d) => d.value === disposition)
	const signed = `${disposition >= 0 ? '+' : ''}${disposition}`
	return entry ? `${entry.label} ${signed}` : signed
}

/**
 * Disposition's ink: the sheet's own alert register rather than MUI's chip colours.
 *
 * Hostility is danger and warmth is success, which is the same vocabulary encumbrance and
 * wear already use — "this is bad for you" should not be said in a second language because
 * it happens to be about a person rather than a number.
 */
export const npcDispositionTone = (disposition: NpcDisposition): string => {
	if (disposition <= -2) return UI_COLORS.danger
	if (disposition === -1) return UI_COLORS.warning
	if (disposition >= 2) return UI_COLORS.success
	if (disposition === 1) return UI_COLORS.info
	return 'inherit'
}
