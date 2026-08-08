import { PlayingCard } from '@site/src/components/PlayingCard'
import CardDivider from '@site/src/components/codex/CardDivider'
import CardTag from '@site/src/components/codex/CardTag'
import { FittedBody, type FitResult } from '@site/src/components/autofit'
import React from 'react'
import { CombatArt } from 'src/types/CombatArt'

type CombatArtCardProps = CombatArt & {
	/** Basic or Supreme, where the JSON carries it. */
	category?: string
	/** First body block on this card. 0 unless this is a continuation (D3). */
	start?: number
	end?: number
	part?: number
	totalParts?: number
	onFitted?: (result: FitResult) => void
}

/**
 * A combat art (M18 S4, second header pass).
 *
 * The head follows the spell card's, because the two sit in the same deck box:
 * name flush left, the category as a plaque beside it, and the WEAPONS as slabs
 * rather than as a comma run. A weapons line is a list of separate permissions —
 * `Axe, Blade, Mace, Polearm` is four facts a player checks their own weapon
 * against — and set as slabs they can be scanned instead of read.
 */
export const CombatArtCard: React.FC<CombatArtCardProps> = ({
	name,
	category,
	weapons,
	effect,
	start = 0,
	end,
	part = 1,
	totalParts = 1,
	onFitted,
}) => {
	const weaponList = React.useMemo(
		() =>
			(weapons ?? '')
				.split(',')
				.map((weapon) => weapon.trim())
				.filter(Boolean),
		[weapons],
	)

	return (
		<PlayingCard
			keystone="khopesh"
			fitKey={`${name}|${start}|${end ?? ''}|${effect}`}
			onFitted={onFitted}
		>
			<div className="pc-card__head-row">
				<span className="pc-card__name">
					{name}
					{totalParts > 1 && (
						<span className="pc-card__part">
							{' '}
							({part}/{totalParts})
						</span>
					)}
				</span>
				{category && <CardTag>{category}</CardTag>}
			</div>
			{/* Both halves of a spilled art carry the weapons: a continuation found
			    loose on the table is still a usable card. */}
			{weaponList.length > 0 && (
				<div className="pc-slabs">
					{weaponList.map((weapon) => (
						<span className="pc-slab" key={weapon}>
							{weapon}
						</span>
					))}
				</div>
			)}
			<CardDivider className="pc-card__divider" />
			<FittedBody html={effect} start={start} end={end} />
		</PlayingCard>
	)
}
