import React from 'react'
import { SheetLayout } from './SheetLayout'
import { Character } from '@site/src/types/Character'
import { ACTION_TYPES } from '@site/src/types/ActionType'
import DieToken from '@site/src/components/codex/DieToken'
import {
	ActionLegend,
	Band,
	Field,
	FixedGrid,
	Group,
	MarkedList,
	Pips,
	PipStat,
	Stat,
} from './SheetPrimitives'
import { calculateCharacterLevel } from '../../CharacterSheet/utils/calculateCharacterLevel'
import { calculateMaxHp } from '../../CharacterSheet/utils/calculateHp'

/**
 * The Statistics sheet — the page that is open on the table (M16 S3, M17 S2).
 *
 * ## What was cut, and why (M16 D3)
 *
 * - **The dice guide.** A column of drawn d4–d12 reference polygons ran down the
 *   left margin, next to the attributes it was explaining. The attributes now
 *   carry the die polygon THEMSELVES, exactly as the digital sheet does
 *   (`DieToken`), so the reference has nothing left to reference.
 *
 * Ability RULES TEXT was never on this page and stays off it. The names, grouped
 * by where they came from and marked with what they cost, are the reminder; the
 * text is in the app and on the cards (M17 D3).
 *
 * ## What M17 rebuilt
 *
 * - **Skills are a fixed grid of twelve** (D2). They were a list with
 *   `limit={40}` in a 60mm column, on a system where sixteen skills exist and
 *   one character can hold twelve.
 * - **Abilities are two columns, action-marked** (F5), with the key to those
 *   marks printed once at the foot of the page.
 * - **The header blocks became named bands**, in the digital sheet's own order.
 *
 * ## The bands are the digital sheet's registers (owner review)
 *
 * `StatisticsTab` groups these three ways and the printed sheet had invented a
 * fourth, which is a needless thing for a player to relearn between the two
 * surfaces:
 *
 * | Register | Holds | Why it is grouped that way |
 * |---|---|---|
 * | Health & Progress | HP, Resolve, Fatigue, level, XP | the live resources, changed constantly |
 * | Attributes | STR, AGI, SPI, MND | read on every roll |
 * | Defenses | AV, Parry, Dodge, Resist | read when attacked, and AV leads |
 *
 * Resolve belongs with HP and Fatigue rather than with the defenses — it is a
 * pool you spend, not a number an attack is compared against — and AV comes
 * first in the defense register, not last.
 *
 * ## Three resources print as marks, not numbers
 *
 * Wounds, Resolve and Fatigue are struck through with a pen during play, so they
 * print as pips: hollow for unspent, solid for spent (see `Pips`). Printing
 * Fatigue as `2 / 6` asked the player to erase a digit inside a 4mm box.
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

	/*
	 * The wound slot, ALWAYS drawn (owner review).
	 *
	 * It used to be a `note` reading "wounded" that appeared only once the
	 * attribute was hurt, so wounding a character in play shifted every row under
	 * it — and a player could not record the wound on paper at all without
	 * writing the word themselves.
	 *
	 * It is the same pair the digital sheet uses: `hp`'s intact vessel hollow,
	 * `wound`'s broken one solid, so the mark reads as one jar cracking. The slot
	 * is there whether it is struck or not, which is what holds the baseline.
	 */
	const wound = (attr: { wounded?: boolean }) => (
		<Pips
			count={1}
			filled={attr.wounded ? 1 : 0}
			sigil="wound"
			emptySigil="hp"
			size="3mm"
		/>
	)

	const attribute = (
		label: string,
		sigil: 'strength' | 'agility' | 'spirit' | 'mind',
		attr: { value: number; wounded?: boolean },
	) => (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				gap: '0.3mm',
				width: '14mm',
			}}
		>
			<Stat label={label} sigil={sigil} bare width="14mm" value={die(attr)} />
			{wound(attr)}
		</div>
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

	const abilityGroups = categoryOrder
		.filter((category) => (groupedAbilities[category] || []).length > 0)
		.map((category) => ({
			name: category,
			entries: groupedAbilities[category].map((ability) => ({
				key: ability.id,
				label: ability.title,
				action: ability.actionType,
			})),
		}))

	return (
		<SheetLayout crest="statistics">
			{/* No `grow`. The sheet is a COLUMN, so a growing field stretches down it
				— which is what put 33.7mm of blank paper under the name (owner
				review). A block-level field is already full width. */}
			<Field label="Name" sigil="name" value={char.personal.name} title />

			<div style={{ display: 'flex', gap: '1.5mm' }}>
				<Field label="Folk" sigil="folk" value={char.personal.folk} grow />
				<Field
					label="Upbringing"
					sigil="upbringing"
					value={char.personal.upbringing}
					grow
				/>
				<Field
					label="Background"
					sigil="background"
					value={char.personal.background}
					grow
				/>
			</div>

			{/*
				Register 1 — the live resources, as the digital sheet groups them.
				A band's own mark is never one of its children's: `chalice` for the
				vessel of vitality, where HP already holds the canopic jar.
			*/}
			<Band name="Health & Progress" sigil="chalice">
				<Stat
					label="Current HP"
					sigil="hp"
					value={char.statistics.health.current}
					width="20mm"
				/>
				{/* "Temp" and "Max", not "Temp HP" and "Max HP": every label now reserves
					the width of a mark whether it carries one or not, so the two-word labels
					wrapped inside a 14mm cell. They sit beside Current HP under a band named
					Health, which is the same shortening the digital HP card uses. */}
				<Stat label="Temp" value={char.statistics.health.temp} width="14mm" />
				<Stat label="Max" value={maxHp} width="14mm" />
				<PipStat
					label="Resolve"
					sigil="resolve"
					count={3}
					filled={char.statistics.resolve ?? 0}
					pip="resolve"
					width="16mm"
				/>
				<PipStat
					label="Fatigue"
					sigil="fatigue"
					count={char.statistics.fatigue?.max ?? 6}
					filled={char.statistics.fatigue?.current ?? 0}
					pip="fatigue"
					width="16mm"
					wrap
				/>
				<Stat
					label="Level"
					value={
						typeof char.skills.xp.spend === 'number'
							? calculateCharacterLevel(char.skills.xp.spend)
							: ' '
					}
					width="14mm"
				/>
				{/* Spent and total were two cells whose labels both wrapped. They are one
					value in practice — what is spent OF what is earned — and reading them as
					a pair is the only reason either is on the page. */}
				<Stat
					label="XP"
					sigil="xp"
					value={`${char.skills.xp.spend} / ${char.skills.xp.total}`}
					width="22mm"
				/>
			</Band>

			{/* Registers 2 and 3, side by side. `casting-sticks` for the attributes —
				the cast that every roll starts with — and `shield` for the defenses,
				neither of which is a mark any of their own cells carries. */}
			<div style={{ display: 'flex', gap: '2mm', alignItems: 'flex-start' }}>
				<Band name="Attributes" sigil="casting-sticks">
					{attribute('Strength', 'strength', char.statistics.strength)}
					{attribute('Agility', 'agility', char.statistics.agility)}
					{attribute('Spirit', 'spirit', char.statistics.spirit)}
					{attribute('Mind', 'mind', char.statistics.mind)}
				</Band>

				<Band name="Defenses" sigil="shield" grow>
					<Stat label="AV" sigil="av" value={av} width="13mm" />
					<Stat
						label="Parry"
						sigil="parry"
						value={char.statistics.parry}
						width="13mm"
					/>
					<Stat
						label="Dodge"
						sigil="dodge"
						value={char.statistics.dodge}
						width="13mm"
					/>
					<Stat
						label="Resist"
						sigil="resist"
						value={char.statistics.resist}
						width="13mm"
					/>
				</Band>
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
					style={{ width: '46mm', flex: 'none', display: 'flex', minHeight: 0 }}
				>
					<Group name="Skills" sigil="scales">
						<FixedGrid
							count={12}
							columns={[
								{ label: 'Rank', width: '7mm', align: 'center' },
								{ label: 'Skill', width: '26mm' },
								{ label: 'XP', width: '7mm', align: 'right' },
							]}
							/*
							 * A nameless skill is an empty place on the grid, not a skill
							 * worth zero. Printing `0 0` down an unfilled sheet is noise a
							 * player then has to write over.
							 */
							rows={char.skills.skills
								.filter((s) => s.name)
								.map((s) => [s.rank, s.name, s.xp])}
						/>
					</Group>
				</div>

				<div
					style={{ flexGrow: 1, minWidth: 0, display: 'flex', minHeight: 0 }}
				>
					<Group name="Abilities" sigil="rune">
						<MarkedList groups={abilityGroups} />
					</Group>
				</div>
			</div>

			{/* The key to the action marks, full width under both blocks — the skills
				grid uses 46mm of a 137mm page, so the strip was empty anyway, and this
				is the one thing on the sheet a glyph alone cannot explain. */}
			<ActionLegend types={ACTION_TYPES} />
		</SheetLayout>
	)
}
