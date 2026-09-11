import React from 'react'
import conditions from '@site/src/utils/data/json/conditions.json'
import { CONDITIONS_OFF_SHEET } from '../referenceContent'
import { ReferenceSheet } from './ReferenceSheet'
import { conditionBody } from './conditionText'

export interface ConditionRecord {
	name: string
	description: string
}

/** The conditions the sheet prints, in the JSON's own alphabetical order —
 *  alphabetical being the only order a mid-turn lookup can use. */
export const SHEET_CONDITIONS: ConditionRecord[] = conditions.filter(
	(condition) => !CONDITIONS_OFF_SHEET.includes(condition.name),
)

const ConditionEntry: React.FC<{ entry: ConditionRecord }> = ({ entry }) => (
	<div className="cr-condition">
		{conditionBody(
			entry.description,
			entry.name,
			<span className="cr-condition__name">{entry.name} </span>,
		)}
	</div>
)

/**
 * The right half of the sheet: every condition, at full length, in two columns.
 *
 * Full length rather than briefed because a condition is read mid-turn to settle
 * what a player may do, and a paraphrase is the wrong thing to hand someone at
 * that moment. That costs the whole half, which is what the Figma sheet spent on
 * it too.
 *
 * ALL of them, including the ones a combatant rarely meets: the rare condition
 * is precisely the one nobody at the table remembers, so leaving it off answers
 * the questions that were never going to be asked (owner, 2026-09-11).
 */
// No `flow` on this half: `.cr-conditions` runs its own two columns, and
// nesting multicol inside multicol is undefined ground.
export const ConditionsSheet: React.FC = () => (
	<ReferenceSheet title="Conditions" mark="2 of 2" dense>
		<div className="cr-conditions">
			{SHEET_CONDITIONS.map((entry) => (
				<ConditionEntry key={entry.name} entry={entry} />
			))}
		</div>
	</ReferenceSheet>
)
