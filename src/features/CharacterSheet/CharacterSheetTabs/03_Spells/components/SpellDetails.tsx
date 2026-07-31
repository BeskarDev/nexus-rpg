import React from 'react'
import { MenuItem } from '@mui/material'
import {
	DeleteButton,
	DetailField,
	DetailsGroup,
	DetailsPanel,
	Inscription,
	QuickRefButton,
	RecordPlate,
	RecordRow,
	ToggleMark,
} from '@site/src/features/CharacterSheet/components'
import {
	RangeType,
	rangeTypeArray,
	Spell,
	TargetType,
	targetTypeArray,
} from '@site/src/types/Character'
import { DamageEquation } from '../../DamageEquation'

export type SpellDetailsProps = {
	spell: Spell
	spellCost: number
	onNameChange: (name: string) => void
	onNameBlur: () => void
	onRankChange: (rank: number) => void
	onPropertiesChange: (properties: string) => void
	onPropertiesBlur: () => void
	onEffectChange: (effect: string) => void
	onEffectBlur: () => void
	onDealsDamageChange: (dealsDamage: boolean) => void
	onDamageUpdate: (update: Partial<Spell['damage']>) => void
	onTargetChange: (target: TargetType) => void
	onRangeChange: (range: RangeType) => void
	onDelete: () => void
	isInQuickRef?: boolean
	onToggleQuickRef?: (spellId: string) => void
}

/**
 * Everything that defines a spell (M13 S5).
 *
 * On the S4d **expanded-row pattern**, which is why this file declares almost no
 * layout: the inscription (what the spell is and what it does) on the left, the
 * record plate (its numbers) down the right, the damage equation between them when the
 * spell deals damage. See `milestone-13/expanded-row-pattern.md` for the anatomy and
 * for the corrections it took to arrive at it on the Items tab.
 *
 * ## What moved here from the row
 *
 * The name and the rank were editable in the summary; the damage calculator was in the
 * summary too, all nine fields of it. Per D5 a summary shows and edits only what
 * changes mid-play — for a spell that is exactly one thing, casting it — so everything
 * else is here.
 *
 * ## The cost is derived, and says so
 *
 * `cost` is `rank × 2` and was already being written back to the character on every
 * render by `SpellRow`. It is a disabled `DetailField` in the plate: shown because a
 * player wants to see what a rank change costs them, not editable because the rule
 * decides it. That is the same treatment `DerivedPart` gives a computed statistic.
 */
export const SpellDetails: React.FC<SpellDetailsProps> = ({
	spell,
	spellCost,
	onNameChange,
	onNameBlur,
	onRankChange,
	onPropertiesChange,
	onPropertiesBlur,
	onEffectChange,
	onEffectBlur,
	onDealsDamageChange,
	onDamageUpdate,
	onTargetChange,
	onRangeChange,
	onDelete,
	isInQuickRef = false,
	onToggleQuickRef,
}) => (
	<DetailsPanel
		aside={
			<RecordPlate
				label="Record"
				actions={
					<>
						{onToggleQuickRef && (
							<QuickRefButton
								itemId={spell.id}
								isInQuickRef={isInQuickRef}
								onToggle={onToggleQuickRef}
							/>
						)}
						<DeleteButton onDelete={onDelete} />
					</>
				}
			>
				<RecordRow sigil="xp" label="Rank">
					<DetailField
						type="number"
						align="center"
						value={spell.rank}
						onChange={(event) => onRankChange(Number(event.target.value))}
						inputProps={{ min: 0, max: 10, 'aria-label': 'Rank' }}
					/>
				</RecordRow>
				<RecordRow sigil="focus" label="Cost">
					<DetailField
						disabled
						align="center"
						value={spellCost}
						inputProps={{ 'aria-label': 'Focus cost' }}
					/>
				</RecordRow>
				<RecordRow sigil="parry" label="Target" section>
					<DetailField
						select
						value={spell.target}
						onChange={(event) =>
							onTargetChange(event.target.value as TargetType)
						}
						width="7rem"
						inputProps={{ 'aria-label': 'Target' }}
					>
						{targetTypeArray.map((target) => (
							<MenuItem key={target} value={target}>
								{target || '—'}
							</MenuItem>
						))}
					</DetailField>
				</RecordRow>
				<RecordRow sigil="dodge" label="Range">
					<DetailField
						select
						value={spell.range}
						onChange={(event) => onRangeChange(event.target.value as RangeType)}
						width="7rem"
						inputProps={{ 'aria-label': 'Range' }}
					>
						{rangeTypeArray.map((range) => (
							<MenuItem key={range} value={range}>
								{range || '—'}
							</MenuItem>
						))}
					</DetailField>
				</RecordRow>
			</RecordPlate>
		}
	>
		<DetailsGroup label="Identity" sigil="name">
			<Inscription
				subject
				grow={2}
				label="Name"
				value={spell.name}
				onChange={(event) => onNameChange(event.target.value)}
				onBlur={onNameBlur}
			/>
			<Inscription
				grow={3}
				label="Properties"
				value={spell.properties}
				onChange={(event) => onPropertiesChange(event.target.value)}
				onBlur={onPropertiesBlur}
			/>
			<Inscription
				block
				multiline
				maxRows={10}
				label="Effect"
				value={spell.effect}
				onChange={(event) => onEffectChange(event.target.value)}
				onBlur={onEffectBlur}
				sx={{ flex: '1 1 100%' }}
			/>
		</DetailsGroup>

		{/* `magic` rather than a damage-ish mark: the group is the spell's damage, but
			the spell is the reason this tab is the one place cyan is correct, and the
			heading is where that reads. The toggle lives in the heading because it
			decides whether the group has any content at all — a switch that empties the
			block it sits inside belongs on the block's edge, not among its fields. */}
		<DetailsGroup
			label="Damage"
			sigil="magic"
			trailing={
				<ToggleMark
					checked={spell.dealsDamage}
					onChange={onDealsDamageChange}
					title="Whether this spell rolls damage"
				>
					deals damage
				</ToggleMark>
			}
		>
			{spell.dealsDamage && (
				<DamageEquation
					type="spell"
					damage={spell.damage}
					updateDamage={onDamageUpdate}
				/>
			)}
		</DetailsGroup>
	</DetailsPanel>
)
