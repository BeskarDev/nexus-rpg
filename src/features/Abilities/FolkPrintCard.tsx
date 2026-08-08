import React from 'react'
import type { FitResult } from '@site/src/components/autofit'
import { AbilityCardShell } from './AbilityPrintCard'
import { abilityBody } from './abilityBody'
import type { FolkAbility } from './abilitySources'

export interface FolkPrintCardProps {
	/** The folk's name — the card's name (F6). */
	name: string
	/** The whole roster. One fit block each (D4). */
	abilities: FolkAbility[]
	/** The folk's languages, where the catalogue records them (Q3). */
	languages?: string[]
	start?: number
	end?: number
	part?: number
	totalParts?: number
	onFitted?: (result: FitResult) => void
}

/**
 * One folk, one card (M20 D1, F5).
 *
 * **The grouping is measured, not assumed.** The worst case in the catalogue is
 * the Gnome at 649 characters across 3 abilities — under the median arcane
 * spell body (639), which fits one card comfortably above the type floor —
 * costing 3 extra name lines of head furniture. Roughly 2× of margin.
 *
 * The tail risk is the SHEET rather than the catalogue: a character's folk
 * abilities are ordinary editable `Ability` rows, so a GM can paste a paragraph
 * into one. Each ability being its own fit block covers that with no special
 * case — an overlong folk spills at an ability boundary instead of being
 * flagged as over budget (D4).
 *
 * Each ability's name is a RUN-IN heading rather than a bar. The theme's bar
 * (`.pc-card__section`) is a grouping device for sections of a body; three of
 * them on one card would fence three abilities into three panels and spend a
 * rule's height on each.
 */
export const FolkPrintCard: React.FC<FolkPrintCardProps> = ({
	name,
	abilities,
	languages = [],
	start,
	end,
	part,
	totalParts,
	onFitted,
}) => {
	const blocks = React.useMemo(() => {
		const rows: React.ReactNode[] = abilities.map((ability) => (
			<>
				<span className="pc-run-in">{ability.name}.</span>{' '}
				{abilityBody(ability.description ?? '')}
			</>
		))
		// Languages last, and only when there are any. A folk's flavour
		// description and its cultures stay off the card (Q3, owner): they roughly
		// double the body for prose that is already on the sheet's Personal tab and
		// in the docs, and a card is a mid-play reference.
		if (languages.length > 0) {
			rows.push(
				<>
					<span className="pc-run-in">Languages.</span> {languages.join(', ')}
				</>,
			)
		}
		return rows
	}, [abilities, languages])

	return (
		<AbilityCardShell
			name={name}
			keystone="palm"
			blocks={blocks}
			contentKey={
				abilities.map((a) => `${a.name}:${a.description}`).join('|') +
				`|${languages.join(',')}`
			}
			start={start}
			end={end}
			part={part}
			totalParts={totalParts}
			onFitted={onFitted}
		/>
	)
}
