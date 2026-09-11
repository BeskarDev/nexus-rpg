import React from 'react'
import combatActions from '@site/src/utils/data/json/combat-actions.json'
import skillActions from '@site/src/utils/data/json/skill-actions.json'
import quickActions from '@site/src/utils/data/json/quick-actions.json'
import {
	ATTACK_NOTES,
	ATTACK_ROLLS,
	COMBAT_TURN,
	DISTANCES,
	DURATIONS,
	MOVEMENT,
	STARTING_COMBAT,
	WEAPON_SUCCESS_LEVELS,
} from '../referenceContent'
import { Block, Notes, ReferenceSheet, Steps, TermList } from './ReferenceSheet'

/**
 * The left half of the sheet: everything a combatant does on their turn.
 *
 * ## Why this is one half and not two (owner, 2026-09-11)
 *
 * The Figma sheet this replaces put the WHOLE reference on one A4 landscape
 * page: two halves, two columns each, four columns across the spread. The first
 * build read that image as two pages and gave each half a column of its own,
 * which doubled the paper for the same words. The page count is the constraint,
 * so the halves are back to two columns each and the ten blocks flow down them.
 *
 * The flow is `columns: 2` rather than two hand-filled divs: which block lands
 * at the foot of column one is a function of the type size and of how long each
 * Action's brief is, and both of those change. A hand-assigned split has to be
 * re-balanced by eye every time one does. `break-inside: avoid` on the blocks is
 * what keeps a table from being cut in half by the column break.
 */
export const CombatSheet: React.FC = () => (
	<ReferenceSheet title="The Combat Turn" mark="1 of 2" flow>
		<Block name="Starting Combat">
			<Steps entries={STARTING_COMBAT} />
		</Block>
		<Block name="Combat Turns">
			<Steps entries={COMBAT_TURN} />
		</Block>
		<Block name="Actions">
			<TermList
				entries={combatActions.map(({ name, quickRef }) => ({
					term: name,
					text: quickRef,
				}))}
			/>
		</Block>
		<Block name="Skill Actions">
			<TermList
				entries={skillActions.map(({ name, quickRef }) => ({
					term: name,
					text: quickRef,
				}))}
			/>
		</Block>
		<Block name="Quick Actions">
			{/* One Quick Action per turn, and the TRIGGER is what a player is looking
			    for — it is the half that decides whether they may act at all — so it
			    is set first, in italic, rather than given a column of its own. A
			    third column at this width would set two words a line. */}
			<dl className="cr-terms">
				{quickActions.map(({ name, quickRef, quickRefTrigger }) => (
					<div className="cr-terms__row" key={name}>
						<dt>{name}</dt>
						<dd>
							<em>{quickRefTrigger}</em> {quickRef}
						</dd>
					</div>
				))}
			</dl>
		</Block>
		<Block name="Attacking">
			<TermList entries={ATTACK_ROLLS} />
			<Notes entries={ATTACK_NOTES} />
		</Block>
		<Block name="Weapon Attack Success Levels">
			<TermList entries={WEAPON_SUCCESS_LEVELS} />
		</Block>
		<Block name="Distances">
			<TermList entries={DISTANCES} />
		</Block>
		<Block name="Movement">
			<Notes entries={MOVEMENT} />
		</Block>
		<Block name="Effect Durations">
			<TermList entries={DURATIONS} />
		</Block>
	</ReferenceSheet>
)
