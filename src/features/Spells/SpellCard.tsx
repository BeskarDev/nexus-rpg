import React from 'react'
import { SpellPrintCard, type SpellPrintCardProps } from './SpellPrintCard'

/**
 * The combined tool's spell card (M18 D4).
 *
 * This one already took a `category` — it is fed from both the arcane and the
 * mystic JSON — so it is now `SpellPrintCard` under its old name, kept for the
 * call sites (F5).
 */
export const SpellCard: React.FC<SpellPrintCardProps> = (props) => (
	<SpellPrintCard {...props} />
)
