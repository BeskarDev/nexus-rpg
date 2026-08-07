import { MysticSpell } from '@site/src/types/MysticSpell'
import {
	SpellPrintCard,
	type SpellPrintCardProps,
} from '@site/src/features/Spells/SpellPrintCard'
import React from 'react'

type MysticSpellCardProps = MysticSpell &
	Pick<
		SpellPrintCardProps,
		'start' | 'end' | 'part' | 'totalParts' | 'onFitted'
	>

/**
 * A mystic spell on the one printed spell card (M18 D4).
 *
 * The whole difference from the arcane card is `tradition` where that one says
 * `discipline` (F5).
 */
export const MysticSpellCard: React.FC<MysticSpellCardProps> = ({
	tradition,
	...spell
}) => <SpellPrintCard {...spell} category={tradition} />
