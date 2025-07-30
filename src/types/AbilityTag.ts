export const ABILITY_TAGS = ['Combat Art', 'Talent', 'Folk', 'Other'] as const

export type AbilityTag = typeof ABILITY_TAGS[number]
