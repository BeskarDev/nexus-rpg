import type {
	AbilityTemplate,
	AttackTemplate,
	CreatureAbility,
	CreatureAttack,
} from '../../types/CreatureBuilder'

/**
 * Library template → builder entry.
 *
 * Shared because it was written twice — once for the library panel and once for
 * the type-defaults hint — and the two copies each carried `damage: t.damage`,
 * which is the field the tier-scaling fix removes. Two copies of a mapping are
 * two places to forget.
 */

/**
 * `damage` is left EMPTY on purpose.
 *
 * It is the override channel: set it and it is used verbatim, leave it empty and
 * the creature's tier decides (see `useCreatureBuilderState`). Carrying the
 * `weaponDamage` MODIFIER instead of a figure is what lets an attack added at
 * tier 3 re-derive when the tier is later changed to 7.
 */
export const templateToAttack = (t: AttackTemplate): CreatureAttack => ({
	name: t.name,
	properties: [],
	damage: '',
	weaponDamage: t.weaponDamage,
	baseAttribute: t.baseAttribute,
	damageType: t.damageType,
	description: t.description,
})

export const templateToAbility = (t: AbilityTemplate): CreatureAbility => ({
	name: t.name,
	description: t.description,
	actionType: t.actionType,
})
