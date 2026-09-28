import type { Companion } from '@site/src/types/Character'
import type {
	CompanionBuildResult,
	CompanionOwner,
} from '@site/src/types/companion'
import {
	regenerateCompanion,
	sameMarkdown,
} from '@site/src/utils/typescript/companion/companionBuild'
import type { FieldChange } from '../../../utils/computeContentUpdates'
import { extractHPFromMarkdown } from './hpExtractor'

/**
 * Rebuild and Refresh for builder-made companions: regenerate a saved build's stat
 * block from the current rules and the owner as they are now, then apply it without
 * touching what the player owns about the companion.
 */

/**
 * A companion with a new stat block applied.
 *
 * Replaces the markdown, the build and the max HP (read off the new block, as the
 * sheet does when a block is pasted). Keeps the id, the player's own name for the
 * companion and their wounds, and clamps current HP to the new max: a rebuild is
 * not a heal.
 */
export const applyCompanionBuild = (
	companion: Companion,
	result: CompanionBuildResult,
): Companion => {
	const maxHP = extractHPFromMarkdown(result.markdown) ?? companion.maxHP
	return {
		...companion,
		markdown: result.markdown,
		build: result.build,
		maxHP,
		currentHP: Math.min(companion.currentHP ?? 0, maxHP),
	}
}

/** The labelled parts of a stat block, for a change list a reader can scan. */
const statBlockParts = (markdown: string): Map<string, string> => {
	const parts = new Map<string, string[]>()
	let label = 'Stat block'
	const add = (line: string) => {
		const lines = parts.get(label) ?? []
		lines.push(line)
		parts.set(label, lines)
	}
	for (const line of markdown.split('\n')) {
		if (/^#{2,6}\s/.test(line)) {
			label = 'Name and type'
		} else if (line.includes('|')) {
			label = 'Statistics'
		} else {
			const field = line.match(/^\*\*(.+?):\*\*/)
			if (field) label = field[1]
			else if (!line.trim()) continue
		}
		add(line)
	}
	return new Map(
		[...parts].map(([key, lines]) => [key, lines.join('\n').trim()]),
	)
}

/** Which parts of a stat block differ, as before and after. */
export const statBlockChanges = (
	before: string,
	after: string,
): FieldChange[] => {
	const old = statBlockParts(before)
	const next = statBlockParts(after)
	const labels = [...new Set([...next.keys(), ...old.keys()])]
	const changes = labels
		.filter(
			(label) => !sameMarkdown(old.get(label) ?? '', next.get(label) ?? ''),
		)
		.map((label) => ({
			field: label,
			before: old.get(label) ?? '',
			after: next.get(label) ?? '',
		}))
	return changes.length > 0 ? changes : [{ field: 'Stat block', before, after }]
}

export type CompanionUpdate = {
	id: string
	name: string
	/** The saved creature, e.g. "Crocodile". */
	trait: string
	changes: FieldChange[]
	result: CompanionBuildResult
}

/**
 * The builder-made companions whose stat block no longer matches what their build
 * produces today. Companions without a build (hand-written) are never offered, and
 * whitespace differences do not count.
 */
export const computeCompanionUpdates = (
	companions: Companion[],
	owner: CompanionOwner | undefined,
): CompanionUpdate[] =>
	companions.flatMap((companion) => {
		if (!companion.build) return []
		const result = regenerateCompanion(companion.build, owner)
		if (!result || sameMarkdown(result.markdown, companion.markdown ?? ''))
			return []
		return [
			{
				id: companion.id,
				name: companion.name,
				trait: companion.build.trait,
				changes: statBlockChanges(companion.markdown ?? '', result.markdown),
				result,
			},
		]
	})
