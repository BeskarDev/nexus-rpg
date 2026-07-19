import { Ability } from '../../../types/Character'
import { sanitizeHtml } from '../../../utils/typescript/htmlSanitizer'
import { normalizeSkillName } from '../../../constants/skills'
import talentsData from '../../../utils/data/json/talents.json'

export type TalentData = {
	name: string
	'skill requirement': string
	description: string
}

/**
 * Builds the canonical talent fields from a raw JSON talent entry. Shared by the
 * talent search dialog import and the "refresh talents" update flow. Does NOT set
 * the character's chosen rank — refresh preserves the existing rank.
 */
export const buildTalentFields = (
	talent: TalentData,
): Pick<Ability, 'title' | 'description' | 'skill'> => ({
	title: talent.name,
	description: sanitizeHtml(talent.description),
	skill:
		normalizeSkillName(talent['skill requirement']) ||
		talent['skill requirement'],
})

/** Locates a talent by name in the JSON source. */
export const findTalentSource = (name: string): TalentData | null => {
	const key = name.trim().toLowerCase()
	return (
		(talentsData as TalentData[]).find(
			(t) => t.name.trim().toLowerCase() === key,
		) || null
	)
}
