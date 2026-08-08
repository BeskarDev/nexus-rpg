import type { Character, Damage, Item, Weapon } from '@site/src/types/Character'
import type { MagicItem, MagicItemCategory } from '@site/src/types/MagicItem'

/**
 * One of a character's possessions, ready to print (M19 S1).
 *
 * Carries the sheet's own `id` and the character it came from: two characters'
 * "Bronze Khopesh" are different objects with different descriptions, and
 * selecting treasure by NAME is the bug M18 spent a round fixing on the spell
 * tool (D9).
 */
export interface TreasureEntry {
	/** The sheet's id for this weapon or item. Unique within a character. */
	id: string
	/** Unique across a deck built from several characters. */
	key: string
	/** Whose it is. */
	characterName: string
	/** True when the entry has rules text worth a card (D6). */
	candidate: boolean
	item: MagicItem
}

/**
 * Which of a character's possessions is worth a card (M19 D6).
 *
 * **A description is the rule.** Catalogue gear arrives with an empty one;
 * anything a GM wrote a description for is, by construction, something with
 * rules text to reference at the table. Quality, tags and `special` were all
 * considered as second tests and rejected: one rule is auditable, two is a
 * guess (F3).
 *
 * The rule HIDES rather than drops — the tool's "show all items" toggle reveals
 * everything, because this is a heuristic about free text and the owner is the
 * one who knows whether the bedroll matters.
 */
export function isTreasureCandidate(item: Pick<MagicItem, 'description'>) {
	return item.description.trim().length > 0
}

/**
 * A weapon's own damage bonus: `+4`.
 *
 * The number the WEAPON adds and nothing else — not the attribute it keys off,
 * not a total. A character's damage is the weapon plus their attribute and
 * their talents, and only the sheet can be right about that (D7); a card
 * printing `5/8/11` would be correct for exactly one character, and one reading
 * `STR +4` still implies a formula the card cannot finish. `+4` is what the
 * object contributes, which is the same thing its load and cost are.
 */
function damageLine(damage?: Damage): string | undefined {
	if (!damage?.weapon) return undefined
	return `+${damage.weapon}`
}

/**
 * Rules text as the player typed it, turned into the markup the card renders.
 *
 * A card body is HTML — the spell and combat art JSON is authored that way, and
 * `FittedBody` parses it. A character sheet's description is a TEXTAREA, and
 * people type `*Ember Lash*` in a textarea, because that is what writing
 * emphasis looks like everywhere else. Left alone it prints its asterisks.
 *
 * So the two inline marks people actually type are converted, and nothing else:
 * this is not a markdown parser and must not become one. Anything already
 * written as HTML passes through untouched.
 */
export function inlineEmphasis(text: string): string {
	return text
		.replace(/\*\*([^*\n]+)\*\*/g, '<strong>$1</strong>')
		.replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>')
}

/** Lower-cased haystack of everything a character's item says about itself. */
const describe = (item: Item) =>
	[item.name, ...(item.tags ?? []), ...(item.properties ?? [])]
		.join(' ')
		.toLowerCase()

/**
 * What KIND of thing a character's item is (M19 D8).
 *
 * First match wins, and every rule is a guess about free text — which is why
 * the tool lets the category be corrected per item rather than treating this as
 * an answer. A lantern has no field anywhere that says "lantern"; it has a name.
 */
export function inferCategory(item: Item): MagicItemCategory {
	const text = describe(item)
	if (/\bscroll\b/.test(text)) return 'Spell Scroll'
	if (/\bwand\b/.test(text)) return 'Wand'
	if (/\bstaff\b/.test(text)) return 'Staff'
	if (/\bshield\b|\bbuckler\b/.test(text)) return 'Shield'
	if (/\barmou?r\b|\bhelm|\bmail\b|\bcuirass\b|\bgreaves\b/.test(text))
		return 'Armor'
	if (/\barrow|\bbolt|\bsling stone|\bammunition\b/.test(text)) return 'Ammo'
	// The sheet's own answer, when it has one: a slot means it is worn.
	if (item.slot) return 'Wearable'
	if (/\bpotion\b|\bdraught\b|\belixir\b|\boil\b|\bration/.test(text))
		return 'Consumable'
	// A stack held in the quick slots is something spent rather than carried.
	if (item.container === 'quick' && (item.amount ?? 0) > 1) return 'Consumable'
	return 'Utility'
}

/** The rules text of a character's item: its description, else its `special`. */
const itemDescription = (item: Item) =>
	(item.description ?? '').trim() || (item.special ?? '').trim()

function fromWeapon(weapon: Weapon): MagicItem {
	return {
		name: weapon.name,
		category: 'Weapon',
		quality: weapon.quality ?? 0,
		// A character's weapon has no `type` field, and its name is already the
		// type: "Bronze Khopesh" IS the type and the material (D2).
		type: weapon.name,
		cost: weapon.cost ?? 0,
		load: weapon.load ?? 0,
		properties: weapon.properties?.trim() || undefined,
		damage: damageLine(weapon.damage),
		// `uses` is NOT mapped. On the sheet it is a 0–3 damage state where 3
		// means broken; on a card it is charges. Mapping them would print
		// "3 uses" on a shattered sword (F2, D3).
		description: inlineEmphasis((weapon.description ?? '').trim()),
	}
}

function fromItem(item: Item): MagicItem {
	return {
		name: item.name,
		category: inferCategory(item),
		quality: item.quality ?? 0,
		type: item.name,
		cost: item.cost ?? 0,
		load: item.load ?? item.weight ?? 0,
		properties: item.properties?.length
			? item.properties.join(', ')
			: undefined,
		description: inlineEmphasis(itemDescription(item)),
	}
}

/**
 * A character's weapons and items, as printable cards (M19 D1, S1).
 *
 * Pure, and the only place that knows how a sheet's possession becomes a card —
 * which is why it is tested against a fixture rather than checked by eye: a
 * silent field mismatch here prints wrong numbers on paper, where nobody looks
 * again.
 *
 * Everything is returned, candidates and not, with `candidate` set. The tool
 * decides what to show; the adapter does not get to hide things (D4).
 */
export function characterTreasure(
	character: Pick<Character, 'personal' | 'items'>,
): TreasureEntry[] {
	const characterName = character.personal?.name ?? ''
	const weapons = character.items?.weapons ?? []
	const items = character.items?.items ?? []

	const entries: TreasureEntry[] = []
	const push = (id: string, item: MagicItem) =>
		entries.push({
			id,
			key: `${characterName}:${id}`,
			characterName,
			candidate: isTreasureCandidate(item),
			item,
		})

	weapons.forEach((weapon) => push(weapon.id, fromWeapon(weapon)))
	items.forEach((item) => push(item.id, fromItem(item)))
	return entries
}
