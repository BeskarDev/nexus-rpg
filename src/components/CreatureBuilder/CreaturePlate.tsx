import React from 'react'
import CreatureStatBlock, {
	StatBlockSection,
	StatBlockTrait,
} from '../codex/CreatureStatBlock'
import type { BuiltCreature } from '../../types/CreatureBuilder'

export interface CreaturePlateProps {
	creature: BuiltCreature | null
}

/**
 * The creature being built, drawn as the card the rulebook draws (M15 S4).
 *
 * ## What this replaces, and why it is a deletion rather than a restyle
 *
 * `CreatureBuilderStatBlock` was 168 lines of hand-rolled `<table>` with inline
 * styles, including a literal `border-bottom: 2px solid #ccc` — Material grey,
 * hardcoded, in a component the codex theme had never reached. It drew the same
 * entity `CreatureStatBlock` draws for every creature in the rulebook, for a
 * companion on the character sheet, and for the printed cards.
 *
 * Two components that know how to draw a creature is the duplication M13 spent a
 * milestone removing, and the one M15 exists to finish. The builder's preview IS
 * the card now, so a creature looks the same in the tool that makes it as it will
 * on the page that publishes it — which is the only way a preview is worth having.
 *
 * ## The two things the card does not know about
 *
 * A card renders a finished creature. A builder holds an unfinished one, so:
 *
 * - **The name may be empty.** The card lifts its first child into the name row,
 *   so an empty heading would leave the row blank rather than absent. It shows a
 *   placeholder in the card's own register instead.
 * - **Nothing is a "warning" here.** Tier validation lives in the shell's
 *   commission line, where the frame already says what is missing (D3). A card is
 *   a record, and a record does not scold.
 */
export const CreaturePlate: React.FC<CreaturePlateProps> = ({ creature }) => {
	if (!creature) {
		return (
			<p className="cb-plate-empty">
				Pick a tier to begin. The creature appears here as you build it.
			</p>
		)
	}

	const typeLine = creature.subtype
		? `${creature.size} ${creature.type} (${creature.subtype})`
		: `${creature.size} ${creature.type}`

	const armor = creature.armorType === 'heavy' ? 'heavy' : 'light'

	return (
		<CreatureStatBlock
			type={typeLine}
			tier={creature.tier}
			category={creature.category}
			hp={String(creature.hp)}
			av={`${creature.av} (${armor})`}
			str={creature.str}
			agi={creature.agi}
			spi={creature.spi}
			mnd={creature.mnd}
			parry={creature.parry}
			dodge={creature.dodge}
			resist={creature.resist}
		>
			<h3>{creature.name || 'Unnamed creature'}</h3>

			{creature.skills?.length > 0 && (
				<StatBlockTrait label="Skills">
					{creature.skills.join(', ')}
				</StatBlockTrait>
			)}
			{creature.immunities?.length > 0 && (
				<StatBlockTrait label="Immunities">
					{creature.immunities.join(', ')}
				</StatBlockTrait>
			)}
			{creature.resistances?.length > 0 && (
				<StatBlockTrait label="Resistances">
					{creature.resistances.join(', ')}
				</StatBlockTrait>
			)}
			{creature.weaknesses?.length > 0 && (
				<StatBlockTrait label="Weaknesses">
					{creature.weaknesses.join(', ')}
				</StatBlockTrait>
			)}

			{creature.attacks?.length > 0 && (
				<StatBlockSection label="Attacks">
					<ul>
						{creature.attacks.map((attack) => (
							<li key={attack.name}>
								<strong>{attack.name}</strong>
								{attack.properties?.length > 0 && (
									<em> ({attack.properties.join(', ')})</em>
								)}
								{attack.damage ? `. ${attack.damage} damage.` : '.'}
								{attack.description ? ` ${attack.description}` : ''}
							</li>
						))}
					</ul>
				</StatBlockSection>
			)}

			{creature.abilities?.length > 0 && (
				<StatBlockSection label="Abilities">
					<ul>
						{creature.abilities.map((ability) => (
							<li key={ability.name}>
								<strong>
									{ability.name}
									{ability.actionType ? ` (${ability.actionType})` : ''}.
								</strong>{' '}
								{ability.description}
							</li>
						))}
					</ul>
				</StatBlockSection>
			)}
		</CreatureStatBlock>
	)
}
