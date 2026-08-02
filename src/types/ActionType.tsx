export type ActionType =
	'Action' | 'Quick Action' | 'Passive' | 'Triggered' | 'Free' | 'Other'

export const ACTION_TYPES: ActionType[] = [
	'Action',
	'Quick Action',
	'Passive',
	'Triggered',
	'Free',
	'Other',
]

/*
	`getActionTypeIcon` is gone (M15 S5).

	It mapped the six action types onto Material icons, and M13 S8c replaced every
	consumer of it on the character sheet with `ActionMark` — the drawn set — while
	logging that ONE caller survived outside the sheet: the creature builder's
	advanced settings. That file is gone now, so the helper and its five Material
	imports go with it.
*/
