import React from 'react'
import { SheetLayout } from './SheetLayout'
import { Character } from '@site/src/types/Character'
import DieToken from '@site/src/components/codex/DieToken'
import {
	AbilityWriteLines,
	Field,
	Group,
	MarkLabel,
	Rows,
	Stat,
} from './SheetPrimitives'
import { calculateCharacterLevel } from '../../CharacterSheet/utils/calculateCharacterLevel'
import { calculateMaxHp } from '../../CharacterSheet/utils/calculateHp'

/**
 * The Statistics sheet — the page that is open on the table (M16 S3).
 *
 * ## What was cut, and why (D3)
 *
 * - **The dice guide.** A column of drawn d4–d12 reference polygons ran down the
 *   left margin, next to the attributes it was explaining. The attributes now
 *   carry the die polygon THEMSELVES, exactly as the digital sheet does
 *   (`DieToken`), so the reference has nothing left to reference.
 * - **The wound helper `(___)`** under each attribute becomes a word that is
 *   printed or absent, which is what the helper was pretending to be.
 * - **Level, spent XP, total XP** collapse from three bordered boxes into one
 *   line of three fields, per D3's "abbreviated".
 *
 * Ability RULES TEXT was never on this page and stays off it. The names, grouped
 * by where they came from, are the reminder; the text is in the app.
 */
export const StatisticsSheet: React.FC<{ char: Character }> = ({ char }) => {
	const maxHp = calculateMaxHp(
		char.statistics.strength.value,
		char.skills.xp.total,
		char.statistics.health.maxHpModifier || 0,
		char.statistics.health.auto || 0,
	)

	const av =
		char.statistics.av.armor +
		char.statistics.av.helmet +
		char.statistics.av.shield +
		(char.statistics.av.auto || 0) +
		char.statistics.av.other

	/*
	 * The attribute die, as the polygon whose side count IS the die size — the
	 * same mark the digital sheet uses, in ink (owner review).
	 *
	 * This is the codex's one case where a custom mark beats a label outright:
	 * four attributes are read together and compared constantly, and shape is
	 * preattentive in a way that `d6` / `d8` set in the same face is not. On
	 * paper that argument is stronger, not weaker — there is no hover, no
	 * tooltip, and the sheet is read at arm's length across a table.
	 */
	const die = (attr: { value: number }) =>
		attr.value ? (
			<span className="pc-die">
				<DieToken value={`d${attr.value}`} />
			</span>
		) : (
			' '
		)

	const groupedAbilities = char.skills.abilities.reduce(
		(groups, ability) => {
			const tag = ability.tag || 'Other'
			if (!groups[tag]) groups[tag] = []
			groups[tag].push(ability)
			return groups
		},
		{} as Record<string, typeof char.skills.abilities>,
	)
	const categoryOrder = ['Combat Art', 'Talent', 'Folk', 'Other']

	return (
		<SheetLayout>
			<div style={{ display: 'flex', gap: '1.5mm' }}>
				<Field label="Name" sigil="name" value={char.personal.name} grow />
				<Field
					label="Folk"
					sigil="folk"
					value={char.personal.folk}
					width="26mm"
				/>
				<Field
					label="Upbringing"
					sigil="upbringing"
					value={char.personal.upbringing}
					width="26mm"
				/>
				<Field
					label="Background"
					sigil="background"
					value={char.personal.background}
					width="26mm"
				/>
			</div>

			<div style={{ display: 'flex', gap: '1.5mm' }}>
				<Stat
					label="Strength"
					sigil="strength"
					bare
					value={die(char.statistics.strength)}
					note={char.statistics.strength.wounded ? 'wounded' : undefined}
				/>
				<Stat
					label="Agility"
					sigil="agility"
					bare
					value={die(char.statistics.agility)}
					note={char.statistics.agility.wounded ? 'wounded' : undefined}
				/>
				<Stat
					label="Spirit"
					sigil="spirit"
					bare
					value={die(char.statistics.spirit)}
					note={char.statistics.spirit.wounded ? 'wounded' : undefined}
				/>
				<Stat
					label="Mind"
					sigil="mind"
					bare
					value={die(char.statistics.mind)}
					note={char.statistics.mind.wounded ? 'wounded' : undefined}
				/>
			</div>

			{/* Read on someone else's turn, so they sit together and read across. */}
			<div style={{ display: 'flex', gap: '1.5mm' }}>
				<Stat
					label="Parry"
					sigil="parry"
					value={char.statistics.parry}
					width="16mm"
				/>
				<Stat
					label="Dodge"
					sigil="dodge"
					value={char.statistics.dodge}
					width="16mm"
				/>
				<Stat
					label="Resist"
					sigil="resist"
					value={char.statistics.resist}
					width="16mm"
				/>
				<Stat
					label="Resolve"
					sigil="resolve"
					value={char.statistics.resolve}
					width="16mm"
				/>
				<Stat label="AV" sigil="av" value={av} width="13mm" />
				<Stat
					label="Current HP"
					value={char.statistics.health.current}
					write
					width="24mm"
				/>
				<Stat
					label="Temp HP"
					value={char.statistics.health.temp}
					write
					width="14mm"
				/>
				<Stat label="Max HP" value={maxHp} width="14mm" />
				<Stat
					label="Fatigue"
					value={`${char.statistics.fatigue?.current ?? 0} / 6`}
					write
				/>
			</div>

			<div style={{ display: 'flex', gap: '1.5mm' }}>
				<Field
					label="Level"
					value={
						typeof char.skills.xp.spend === 'number'
							? calculateCharacterLevel(char.skills.xp.spend)
							: ' '
					}
					width="14mm"
				/>
				<Field
					label="Spent XP"
					sigil="xp"
					value={char.skills.xp.spend}
					width="20mm"
				/>
				<Field label="Total XP" value={char.skills.xp.total} width="20mm" />
			</div>

			<div
				style={{
					display: 'flex',
					gap: '2mm',
					flexGrow: 1,
					minHeight: 0,
					alignItems: 'stretch',
				}}
			>
				<div
					style={{ width: '60mm', flex: 'none', display: 'flex', minHeight: 0 }}
				>
					<Group name="Skills" sigil="scales">
						<Rows
							noun="skills"
							limit={40}
							fill
							columns={[
								{ label: 'Rank', width: '8mm', align: 'center' },
								{ label: 'Skill', width: '36mm' },
								{ label: 'XP', width: '8mm', align: 'right' },
							]}
							/*
							 * A nameless skill is an empty row on a blank form, not a
							 * skill worth zero. Printing `0 0` down an unfilled sheet
							 * is noise a player then has to write over.
							 */
							rows={char.skills.skills.map((s) =>
								s.name ? [s.rank, s.name, s.xp] : ['', '', ''],
							)}
						/>
					</Group>
				</div>

				<div
					style={{ flexGrow: 1, minWidth: 0, display: 'flex', minHeight: 0 }}
				>
					<Group name="Abilities" sigil="rune">
						{categoryOrder.map((category) => {
							const abilities = groupedAbilities[category] || []
							if (abilities.length === 0) return null
							return (
								<div key={category} style={{ padding: '0.5mm 1mm 1mm' }}>
									<MarkLabel label={category} />
									{abilities.map((ability) => (
										<div
											key={ability.id}
											style={{
												fontSize: 'var(--pc-text-dense)',
												lineHeight: 1.35,
											}}
										>
											{ability.title}
										</div>
									))}
								</div>
							)
						})}
						<AbilityWriteLines />
					</Group>
				</div>
			</div>
		</SheetLayout>
	)
}
