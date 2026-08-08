/**
 * Where an ability card's content comes from (M20 S1).
 *
 * Three groups, two catalogues and one bucket that has neither (F2):
 *
 * | Group | Source | Unit |
 * |---|---|---|
 * | `Talent` | `talents.json`, or a character's sheet | one talent per card |
 * | `Folk` | `folk.json`, or a character's `Folk`-tagged rows | one card per folk |
 * | `Other` | a character ONLY | one ability per card |
 *
 * `Other` is the sheet's free-text bucket — a patron's boon, a curse, a GM
 * ruling — and nothing generates it. That is not a gap to fill; it is what the
 * bucket is, so the manual menu offers the two catalogued groups and `Other`
 * appears only once a character is loaded.
 *
 * Everything here is pure: no React, no JSX, no DOM. The tool renders it and
 * the tests exercise it directly.
 */
import type { AbilityTag } from '@site/src/types/AbilityTag'
import type { ActionType } from '@site/src/types/ActionType'
import type { Ability, Character } from '@site/src/types/Character'
import { parseTalentDescription } from '@site/src/utils/content-gen/talent-description-parser'
import folkData from '../../utils/data/json/folk.json'
import talentData from '../../utils/data/json/talents.json'

/** The three tags this deck prints. `Combat Art` has its own tool (D1). */
export type AbilityGroup = Exclude<AbilityTag, 'Combat Art'>

export const ABILITY_GROUPS: AbilityGroup[] = ['Talent', 'Folk', 'Other']

/** One ability held by a folk — the roster a `FolkPrintCard` prints (D4). */
export interface FolkAbility {
	name: string
	description: string
}

/**
 * One card's worth of content, whatever it came from.
 *
 * Selection is by `id` end to end, never by name (F8, D7): two characters
 * legitimately hold the same talent at different ranks, and a character's
 * ability already carries an id of its own. Keying anything — the menu, the
 * selection state, the spill plan — by name collapses those two onto one.
 */
export interface DeckEntry {
	/** `talent:<name>`, `folk:<name>`, `char:<docId>:<abilityId>`, `char:<docId>:folk`. */
	id: string
	group: AbilityGroup
	/** The card's name. For a folk card, the FOLK's name (F6). */
	title: string
	/** The owning or required skill, printed as a tag where present. */
	category?: string
	actionType?: ActionType
	/** The rank this character bought. Absent on a manual pick (D5). */
	rank?: number
	/** The body, for a `Talent` or an `Other` card. HTML, as the sources hold it. */
	description?: string
	/** A folk card's roster. One fit block per ability (D4). */
	abilities?: FolkAbility[]
	/** A folk card's languages (Q3). Abilities and languages, never the flavour. */
	languages?: string[]
	/** Who this came off the sheet of. Absent on a manual pick. */
	characterName?: string
}

interface TalentRecord {
	name: string
	'skill requirement': string
	description: string
}

interface FolkRecord {
	name: string
	category: string
	description: string
	abilities: FolkAbility[]
	languages: string[]
}

const byTitle = (a: DeckEntry, b: DeckEntry) => a.title.localeCompare(b.title)

/**
 * The talent catalogue as deck entries, sorted by name.
 *
 * No rank: a manual pick has no purchaser, so it prints the whole ladder (D5).
 * The `skill requirement` is carried through as the entry's category, which is
 * what the card sets as its tag.
 */
export function talentEntries(): DeckEntry[] {
	return (talentData as TalentRecord[])
		.map((talent) => ({
			id: `talent:${talent.name}`,
			group: 'Talent' as const,
			title: talent.name,
			category: talent['skill requirement'],
			description: talent.description,
		}))
		.sort(byTitle)
}

/**
 * The folk catalogue as deck entries, sorted by name.
 *
 * Abilities and languages only (Q3, owner). `folk.json` also holds the folk's
 * flavour description and its cultures, and adding the description roughly
 * doubles the body — it pushes the worst case (Gnome, 649 characters across 3
 * abilities) into a two-card spill for prose that is already on the character
 * sheet's Personal tab and in the docs. A card is a mid-play reference.
 */
export function folkEntries(): DeckEntry[] {
	return (folkData as FolkRecord[])
		.map((folk) => ({
			id: `folk:${folk.name}`,
			group: 'Folk' as const,
			title: folk.name,
			category: folk.category,
			abilities: folk.abilities ?? [],
			languages: folk.languages ?? [],
		}))
		.sort(byTitle)
}

/** Both catalogues, sorted by name — what the manual menu offers (F2). */
export function catalogueEntries(): DeckEntry[] {
	return [...talentEntries(), ...folkEntries()].sort(byTitle)
}

export interface CharacterEntries {
	entries: DeckEntry[]
	/**
	 * How many `Combat Art` abilities were dropped. Stated on screen, never
	 * silently (D8): a quarter of someone's abilities vanishing is how a player
	 * concludes the tool is broken.
	 */
	skippedCombatArts: number
}

/** `ability.tag || 'Other'` — the established fallback for pre-tag docs (F1). */
const groupOf = (ability: Ability): AbilityTag => ability.tag || 'Other'

/**
 * A character's abilities as deck entries (D6, D7, F6).
 *
 * **Sheet text wins over the catalogue, always.** An ability loaded from a
 * character prints the character's own `title` and `description` and is never
 * re-looked-up in `talents.json` / `folk.json` — the sheet is where a GM's
 * ruling and a player's edit live, and the sheet already has a
 * refresh-talents flow for anyone who wants the catalogue's version. It also
 * means the tool never has to reconcile a renamed ability with a catalogue
 * entry.
 *
 * Folk abilities land on a sheet as SEPARATE `Ability` rows (`PersonalTab`
 * writes one per ability), so one folk card means grouping the character's
 * `Folk`-tagged rows and titling the card from `personal.folk` — not looking
 * the folk up, which would discard every edit and miss a hand-typed folk name.
 *
 * @param docId the character's document id, so two characters holding the same
 *   talent produce two distinct entries rather than collapsing onto one (D7).
 */
export function characterAbilities(
	character: Pick<Character, 'personal' | 'skills'>,
	docId: string,
): CharacterEntries {
	const abilities = character?.skills?.abilities ?? []
	const characterName = character?.personal?.name || 'Uploaded Character'
	const entries: DeckEntry[] = []
	const folkAbilities: FolkAbility[] = []
	let skippedCombatArts = 0

	abilities.forEach((ability) => {
		const group = groupOf(ability)
		if (group === 'Combat Art') {
			skippedCombatArts += 1
			return
		}
		if (group === 'Folk') {
			folkAbilities.push({
				name: ability.title,
				description: ability.description,
			})
			return
		}
		entries.push({
			id: `char:${docId}:${ability.id}`,
			group,
			title: ability.title,
			category: ability.skill,
			actionType: ability.actionType,
			rank: ability.rank,
			description: ability.description,
			characterName,
		})
	})

	if (folkAbilities.length > 0) {
		entries.push({
			id: `char:${docId}:folk`,
			group: 'Folk',
			// The sheet's own folk name. A character with `Folk`-tagged rows but no
			// folk recorded still gets a card rather than a blank name.
			title: character?.personal?.folk?.trim() || 'Folk Abilities',
			abilities: folkAbilities,
			characterName,
		})
	}

	return { entries, skippedCombatArts }
}

/**
 * The canonical rank label, matching the generator's parser.
 *
 * Duplicated rather than exported from `talent-description-parser` because the
 * two want different things from it: the generator wants the ladder as parsed
 * NODES, and this wants the raw HTML sliced at a label boundary so the card's
 * blocks still split on `<br/>` the way every other body does (F4).
 */
const RANK_LABEL = /<strong>\s*\(Rank (\d)\)\s*<\/strong>/g

/** Trailing `<br/>`s left behind by a cut, which would print as a blank line. */
const TRAILING_BREAKS = /(?:\s|<br\s*\/?>)+$/i

/**
 * A talent's description trimmed to the ranks a character actually owns (D5,
 * revised by the owner).
 *
 * **This is the opt-in, not the default.** D5 had the tool trim by default on
 * the paper argument — `buildTalentFields` copies the catalogue's description
 * onto the sheet whole and keeps the purchased rank in a separate field, so a
 * rank-1 purchase carries all three rungs, and cutting them takes the median
 * talent from 637 characters to 204. The owner overruled it: which ranks a
 * character has unlocked is a fact about the CHARACTER and belongs on the
 * character sheet, whereas a talent card is the talent. A card that omits rank
 * 3 misstates what the talent does and expires the moment the player buys it.
 *
 * So this stays, for a player who wants a deck of only what they can use today.
 *
 * **It must not fail the tool when the parser throws.** A hand-edited sheet
 * description is not the frozen corpus, and the generator's fail-loudly
 * contract is exactly wrong here: a card with one rung too many beats a missing
 * card. So a parse failure, an unlabelled description, or a `maxRank` below the
 * first rung all fall back to the untrimmed text.
 *
 * @param maxRank the highest rank to print. `undefined` prints the whole
 *   ladder, which is what a manual pick and the tool's default both pass.
 */
export function talentRanks(description: string, maxRank?: number): string {
	if (!description) return ''
	if (maxRank === undefined || !Number.isFinite(maxRank)) return description

	// The generator's parser is the right guard on the label structure — it
	// catches the four ways the Notion export corrupted a `(Rank N)` label, each
	// of which would silently swallow a whole section from a naive slice.
	try {
		parseTalentDescription(description)
	} catch {
		return description
	}

	const labels = [...description.matchAll(new RegExp(RANK_LABEL.source, 'g'))]
	if (labels.length === 0) return description

	const cut = labels.find((label) => Number(label[1]) > maxRank)
	if (!cut) return description
	// Cutting at the FIRST label leaves the preamble alone — a card with a
	// prerequisite line and no rule text. Capstone talents open at rank 4, so
	// this is reachable from a sheet whose rank was hand-edited down.
	if (cut.index === labels[0].index) return description

	return description.slice(0, cut.index).replace(TRAILING_BREAKS, '')
}

/**
 * The rank span a talent card prints, as it is stated on the card (S3).
 *
 * `R1`, `R1–R3`, or nothing at all when the description carries no ladder.
 */
export function rankSpan(description: string): string {
	const labels = [
		...(description ?? '').matchAll(new RegExp(RANK_LABEL.source, 'g')),
	]
	if (labels.length === 0) return ''
	const first = Number(labels[0][1])
	const last = Number(labels[labels.length - 1][1])
	return first === last ? `R${first}` : `R${first}–R${last}`
}
