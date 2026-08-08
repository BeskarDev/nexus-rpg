import { ArcaneSpell } from '@site/src/types/ArcaneSpell'
import {
	SpellPrintCard,
	type SpellPrintCardProps,
} from '@site/src/features/Spells/SpellPrintCard'
import React from 'react'

type ArcaneSpellCardProps = ArcaneSpell &
	Pick<
		SpellPrintCardProps,
		'start' | 'end' | 'part' | 'totalParts' | 'onFitted'
	>

/**
 * An arcane spell on the one printed spell card (M18 D4).
 *
 * All this file carries is the field name: an arcane spell has a `discipline`
 * where a mystic spell has a `tradition` and the sheet variant has a
 * `category`. That difference is why there were three copies of this card, and
 * three copies of the fitting bug M18 started from (F5).
 */
export const ArcaneSpellCard: React.FC<ArcaneSpellCardProps> = ({
	discipline,
	...spell
}) => <SpellPrintCard {...spell} category={discipline} />
