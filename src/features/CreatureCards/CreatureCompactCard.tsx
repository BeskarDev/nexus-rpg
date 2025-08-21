import React from 'react'
import { Creature } from '@site/src/types/Creature'
import { BaseCreatureCard } from './BaseCreatureCard'
import { CreatureStats } from './CreatureStats'
import { CreatureActions } from './CreatureActions'

// Accept both individual props (for backward compatibility) and creature object
export const CreatureCompactCard: React.FC<Creature> = (props) => {
	// Handle both calling patterns
	const creature = props

	return (
		<BaseCreatureCard
			name={creature.name}
			tier={creature.tier}
			category={creature.category}
			type={creature.type}
			size="compact"
		>
			<CreatureStats
				hp={creature.hp}
				av={creature.av}
				str={creature.str}
				agi={creature.agi}
				spi={creature.spi}
				mnd={creature.mnd}
				parry={creature.parry}
				dodge={creature.dodge}
				resist={creature.resist}
				skills={creature.skills}
				immunities={creature.immunities}
				resistances={creature.resistances}
				weaknesses={creature.weaknesses}
				attacks={creature.attacks}
				abilities={creature.abilities}
			/>
			<CreatureActions
				attacks={creature.attacks}
				abilities={creature.abilities}
				notes={[]}
			/>
		</BaseCreatureCard>
	)
}
