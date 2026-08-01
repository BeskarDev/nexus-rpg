import type { BaseDamageType } from '../../../../../types/Character'

/**
 * The weapon types whose attacks are rolled with Agility.
 *
 * Read off the weapon table's own `type` column, not off properties: a Throwing Axe
 * carries `thrown` and is still an Axe you swing, where a Sling carries the same
 * property and is nothing else.
 */
const RANGED_WEAPON_TYPES = new Set(['bow', 'crossbow', 'thrown'])

/**
 * Which attribute a weapon's damage is based on, as the rules default it.
 *
 * Melee is Strength, bows, crossbows and thrown weapons are Agility. That is the
 * whole rule. `agile` and `thrown` do NOT change it — read them:
 *
 * > **agile** — You *can* roll attacks with Agility instead of Strength.
 * > **thrown** — You *can* roll thrown attacks with Strength instead of Agility.
 *
 * Both grant an OPTION at the table, which the player exercises per attack. Neither
 * restates what the weapon's base is.
 *
 * ## Why this is not character-aware
 *
 * It used to be. `WeaponSearchDialog` held a private copy that compared the
 * character's Strength against their Agility and pre-filled whichever was higher,
 * so an `agile` Cleaver came out as AGI for an Agility-leaning character. Three
 * things were wrong with that:
 *
 * - It answered a question the rules leave to the player, and did it silently.
 * - The pre-fill goes STALE. Attributes rise with level, and the base attribute
 *   written onto the weapon at import does not follow.
 * - It cannot serve the Magic Item Builder's docs mount, which has no character at
 *   all — and that is where the field was being left EMPTY, which is the defect
 *   that surfaced this.
 *
 * The player still changes it in one press on the weapon's own damage editor. What
 * the tool owes them is the rules' answer, not a guess at their build.
 */
export function getBaseDamageType(
	weaponType: string | null | undefined,
): BaseDamageType {
	if (!weaponType) return 'STR'
	return RANGED_WEAPON_TYPES.has(weaponType.trim().toLowerCase())
		? 'AGI'
		: 'STR'
}
