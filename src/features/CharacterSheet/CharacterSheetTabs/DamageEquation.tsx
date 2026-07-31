import React from 'react'
import { Box, MenuItem, Typography } from '@mui/material'
import DamageSigil from '@site/src/components/codex/DamageSigil'
import {
	CheckMarkChecked,
	CheckMarkEmpty,
} from '@site/src/components/codex/CheckMark'
import StatSigil from '@site/src/components/codex/StatSigil'
import type { StatSigilName } from '@site/src/components/codex/stat-sigils'
import {
	BaseDamageType,
	baseDamageTypeArray,
	Damage,
	damageTypeArray,
	DamageType,
} from '@site/src/types/Character'
import { SheetInput } from '../components'

/** The four attributes damage can scale from, each with its own mark. */
const BASE_SIGIL: Record<string, StatSigilName> = {
	STR: 'strength',
	AGI: 'agility',
	SPI: 'spirit',
	MND: 'mind',
}

export type DamageEquationProps = {
	type: 'weapon' | 'spell'
	damage: Damage
	updateDamage: (update: Partial<Damage>) => void
}

/**
 * A weapon's damage, as the EQUATION it is rather than as a form (M13 S4d).
 *
 * ## What was there
 *
 * Nine controls — base, weapon, other, other-weak, other-strong, other-critical, a
 * static toggle, a type select — laid out as three wrapping rows of identical
 * boxes, each with a small-caps label above it. The owner's word for it was
 * soul-less, and the diagnosis is that it showed the INPUTS of a rule and never
 * the rule: nothing on the panel said that these numbers are added, that the
 * weapon die is counted once at weak, twice at strong and three times at critical,
 * or what the whole thing currently comes to. A player had to know the formula to
 * understand the form.
 *
 * ## What it is now
 *
 * The terms of the sum on ONE line, reading left to right with their operators
 * drawn between them — `STR ÷ 2` `+` `weapon 3` `+` `other 0`, then the type — so
 * the panel states the rule while you edit it.
 *
 * It opened with the computed `DamageLadder` and an `=` for two revisions, and the
 * owner's call to drop them is right on both counts: the summary row two lines above
 * shows the same ladder, so it was the same number twice in one view, and the space
 * it took forced the four terms to wrap over two lines with the operators landing at
 * line ends. A formula that wraps is a formula you have to reassemble. One line of
 * `a + b + c` is read without being parsed, and the result stays where a player
 * already looks for it.
 *
 * The three success-level extras are a subordinate line beneath, because they are
 * per-level adjustments to the sum above rather than terms of it, and they go dead
 * when `static` is set, which is exactly what static means: one number for all
 * three levels. The static switch sits with them rather than with the terms for the
 * same reason.
 *
 * Every term is labelled with the sheet's own field label — the small-caps caption
 * above its slot that `MuiInputLabel` levels for every input in the app. The first
 * version invented a smaller caption UNDER each control, which was a second label
 * register for no reason; that these fields sit in an equation does not make them a
 * different kind of field (S4d, owner review).
 *
 * Everything is bare text at rest with the slot appearing under the pointer, so
 * the equation reads as an inscription rather than as nine boxes.
 *
 * `DamageFields` still exists and still serves the SPELL summary, which has a
 * different container and its own gear-popover history. This is the weapon's
 * version; the spell tab gets it when S5 rebuilds that surface.
 */
export const DamageEquation: React.FC<DamageEquationProps> = ({
	type,
	damage,
	updateDamage,
}) => {
	const halved = ['STR', 'AGI', 'SPI', 'MND'].includes(String(damage.base))

	return (
		<Box className="cs-equation">
			<Box className="cs-equation__terms">
				{/* The attribute carries its own mark beside the shorthand, the way it does
					on the Statistics tab — an attribute is one of the sheet's named things,
					and it should look like the same thing everywhere it appears. MUI renders
					the selected option's children as the closed value, so the mark comes
					along for free. */}
				<Term label={halved ? 'Base ÷ 2' : 'Base'}>
					<SheetInput
						select
						size="small"
						value={damage.base}
						onChange={(event) =>
							updateDamage({ base: event.target.value as BaseDamageType })
						}
						sx={{ width: '6rem', maxWidth: 'none', m: 0 }}
					>
						{baseDamageTypeArray.map((attribute) => (
							<MenuItem key={attribute} value={attribute}>
								{attribute ? (
									<Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
										<StatSigil name={BASE_SIGIL[attribute]} size={14} />
										{attribute}
									</Box>
								) : (
									'—'
								)}
							</MenuItem>
						))}
					</SheetInput>
				</Term>
				<Operator>+</Operator>
				{/* The multiplier is the RULE, printed: the weapon die counts once at
					weak, twice at strong, three times at critical. It was nowhere on the
					old form, so the three "other" fields looked like the only thing that
					differed between the levels. */}
				<Term
					label={type === 'weapon' ? 'Weapon' : 'Spell'}
					title="Counted once at weak, twice at strong, three times at critical"
				>
					<SheetInput
						size="small"
						type="number"
						value={damage.weapon}
						onChange={(event) =>
							updateDamage({ weapon: Number(event.target.value) })
						}
						sx={{ width: '3.25rem', maxWidth: 'none', m: 0 }}
					/>
				</Term>
				<Operator>+</Operator>
				<Term label="Other">
					<SheetInput
						size="small"
						type="number"
						value={damage.other}
						onChange={(event) =>
							updateDamage({ other: Number(event.target.value) })
						}
						sx={{ width: '3.25rem', maxWidth: 'none', m: 0 }}
					/>
				</Term>
				<Term label="Type">
					<SheetInput
						select
						size="small"
						value={damage.type}
						onChange={(event) =>
							updateDamage({ type: event.target.value as DamageType })
						}
						sx={{ width: '8rem', maxWidth: 'none', m: 0 }}
					>
						{damageTypeArray.map((dt) => (
							<MenuItem key={dt} value={dt}>
								<Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
									<DamageSigil type={dt} size={15} />
									{dt}
								</Box>
							</MenuItem>
						))}
					</SheetInput>
				</Term>
			</Box>

			{/* Per-level adjustments — subordinate to the sum, and meaningless when one
				number covers all three levels. */}
			<Box className="cs-equation__levels">
				<LevelTerm
					label="Weak"
					value={damage.otherWeak}
					disabled={damage.staticDamage}
					onChange={(otherWeak) => updateDamage({ otherWeak })}
				/>
				<LevelTerm
					label="Strong"
					value={damage.otherStrong}
					disabled={damage.staticDamage}
					onChange={(otherStrong) => updateDamage({ otherStrong })}
				/>
				<LevelTerm
					label="Critical"
					value={damage.otherCritical}
					disabled={damage.staticDamage}
					onChange={(otherCritical) => updateDamage({ otherCritical })}
				/>
				{/* A toggle, and it has to LOOK like one: the plate alone read as a command
					button ("do the static thing"), so it carries the app's checkbox mark —
					empty socket off, inlaid lozenge on, the same pair the category menu's rows
					use. `aria-pressed` on a button is the right semantics for a control that
					changes how the thing beside it is computed. */}
				<Box
					component="button"
					type="button"
					className="cs-equation__static"
					aria-pressed={damage.staticDamage || false}
					onClick={() => updateDamage({ staticDamage: !damage.staticDamage })}
					title="Static damage uses one number for all three success levels"
				>
					{damage.staticDamage ? (
						<CheckMarkChecked size={14} />
					) : (
						<CheckMarkEmpty size={14} />
					)}
					static
				</Box>
			</Box>
		</Box>
	)
}

/**
 * One term of the sum.
 *
 * The label is passed down to the CONTROL rather than drawn here, so it is the same
 * small-caps caption every other field on the sheet carries. `cloneElement` because
 * the term wraps an arbitrary field and MUI wants `label` on the field itself.
 */
const Term: React.FC<{
	label: string
	title?: string
	children: React.ReactElement
}> = ({ label, title, children }) => (
	<Box className="cs-equation__term" title={title}>
		{React.cloneElement(children, { label })}
	</Box>
)

const Operator: React.FC<{ children: React.ReactNode }> = ({ children }) => (
	<Typography component="span" className="cs-equation__operator">
		{children}
	</Typography>
)

const LevelTerm: React.FC<{
	label: string
	value: number
	disabled?: boolean
	onChange: (value: number) => void
}> = ({ label, value, disabled, onChange }) => (
	<Box className="cs-equation__level" data-disabled={disabled || undefined}>
		<SheetInput
			size="small"
			type="number"
			label={label}
			value={value}
			disabled={disabled}
			onChange={(event) => onChange(Number(event.target.value))}
			sx={{ width: '3.25rem', maxWidth: 'none', m: 0 }}
		/>
	</Box>
)
