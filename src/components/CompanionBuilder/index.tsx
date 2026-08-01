import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
	BuilderRegister,
	BuilderShell,
	BuilderTrigger,
	BuilderVerb,
	BuilderVerbSpacer,
	ChoiceRail,
	GrantLine,
	type RailOption,
} from '../builder'
import type {
	CompanionBuilderProps,
	CompanionTrait,
} from '../../types/companion'
import { companionBuilderActions } from '../../features/CompanionBuilder/companionBuilderReducer'
import { useCompanionBuilderState } from '../../hooks/useCompanionBuilderState'
import {
	BASE_STATS,
	TIER_NAMES,
	SIZE_MODIFIERS,
	getAvailableSizes,
} from '../../utils/typescript/companion/companionCalculations'
import { generateMarkdown } from '../../utils/typescript/companion/companionFormatting'
import companionTraits from '../../utils/data/json/companion-traits.json'
import StatSigil from '../codex/StatSigil'
import SigilIcon from '../codex/SigilIcon'
import { MOVEMENT_SIGIL } from './companionMarks'
import { CreatureLedger } from './CreatureLedger'
import { CompanionPlate } from './CompanionPlate'

const TRAITS = companionTraits as CompanionTrait[]
const ALL_SIZES = ['Tiny', 'Small', 'Medium', 'Large', 'Huge']

const signed = (value: number) => (value >= 0 ? `+${value}` : String(value))

/**
 * The Companion Builder — a commission, and the beast it produces (M13 S8).
 *
 * ## What it is for
 *
 * Three decisions (tier, size, creature) generate a complete companion stat block,
 * which is then imported into the character or copied as markdown for use
 * elsewhere. The same component backs the Companions tab and the
 * `08-creatures/01-mounts-companions` docs page, which is why its styling stands
 * on the global codex tokens rather than the sheet's — see the head of
 * `codexBuilder.css` in `components/builder/`.
 *
 * ## What this replaced
 *
 * A `DialogContent` holding a 5/7 `Grid`: on the left a `Paper` captioned "Core
 * Stats" with three MUI `Select`s and the import button wedged into its header, on
 * the right a second `Paper` with MUI `Tabs` switching between a stat block of six
 * nested `Paper`s and a `<pre>` of markdown — and, until all three selects were
 * set, a centred grey *"Select tier, size, and trait to build companion"*.
 *
 * Four things were wrong with it beyond the styling, and each is a fix here:
 *
 * - **The three choices were the same control, and they are not the same kind of
 *   choice.** Tier and size are short ordered ladders whose steps buy stated
 *   things; the creature is a catalogue of thirty-four. Two rails and a ledger
 *   (`ChoiceRail`, `CreatureLedger`).
 * - **Nothing showed the consequence of a choice at the moment of choosing.** The
 *   tier's grant is now a line under its rail, the size's trade is printed on the
 *   plate that makes it, and the result plate is live from the first press instead
 *   of withheld until the third.
 * - **`trait.size` was ignored.** One creature in the data (the Floating Eye) is
 *   size-locked to Tiny, and the old size dropdown would happily build a Huge one.
 *   The rail honours the lock and says so on the disabled plates.
 * - **The import verb was inside the form's header**, competing with a Reset
 *   button, while the dialog's own action bar held only "Close". The verbs are in
 *   the action bar now, one primary.
 *
 * The Preview/Markdown tabs are gone with them. The preview IS the companion; the
 * markdown is the export mechanism, so it is a disclosure under the plate — kept
 * rendered and `hidden` rather than unmounted, per the sheet's disclosure rule.
 */
export const CompanionBuilder: React.FC<CompanionBuilderProps> = ({
	onImportCompanion,
}) => {
	const [open, setOpen] = useState(false)
	const [showSource, setShowSource] = useState(false)
	const [copied, setCopied] = useState(false)
	const dispatch = useDispatch()
	const { state, builtCompanion } = useCompanionBuilderState()
	const { tier, size, trait } = state

	const base = BASE_STATS[tier]
	const availableSizes = getAvailableSizes(tier)

	const tierOptions: RailOption[] = Object.entries(TIER_NAMES).map(
		([value, name]) => ({
			value: Number(value),
			figure: value,
			name,
		}),
	)

	/**
	 * A size is available when the TIER reaches it and the CREATURE allows it.
	 * Both caps are real rules and both were previously invisible: the tier cap
	 * because the dropdown simply listed fewer options, the creature cap because
	 * nothing read `trait.size` at all.
	 */
	const sizeOptions: RailOption[] = ALL_SIZES.map((name, index) => {
		const modifier = SIZE_MODIFIERS[name]
		const overTier = !availableSizes.includes(name)
		const lockedByTrait =
			!!trait &&
			trait.size !== 'any' &&
			trait.size.toLowerCase() !== name.toLowerCase()
		return {
			value: name,
			/*
				A lozenge that GROWS across the rail, not the size's initial.

				The two rails are otherwise five and six identical boxes stacked in one
				column, and they read as one control repeated (owner review). A mark
				that gets physically bigger from Tiny to Huge states the axis in the
				theme's own shape vocabulary — carved, no word, no hue — and makes the
				size rail unmistakable at a glance.
			*/
			figure: (
				<span
					className="cb-scale"
					style={{ '--cb-scale': `${5 + index * 3}px` } as React.CSSProperties}
				/>
			),
			name,
			/*
				The trade in the stats' own marks, not in initials (owner review). `P`/`D`/`M`
				had to be learned and matched nothing else in the app; these are the same
				blades, footprints and horse the preview card puts on the very figures this
				choice moves.
			*/
			trade: (
				<>
					<span className="cb-trade__part">
						<StatSigil name="parry" size={10} />
						{signed(modifier.parry)}
					</span>
					<span className="cb-trade__part">
						<StatSigil name="dodge" size={10} />
						{signed(modifier.dodge)}
					</span>
					<span className="cb-trade__part">
						<SigilIcon name={MOVEMENT_SIGIL} size={10} />
						{modifier.movement}
					</span>
				</>
			),
			disabled: overTier || lockedByTrait,
			disabledReason: overTier
				? `tier ${tier} reaches ${base.maxSize} at most`
				: `${trait?.name} is always ${trait ? trait.size.charAt(0).toUpperCase() + trait.size.slice(1) : ''}`,
		}
	})

	const setTier = (value: string | number) => {
		const next = Number(value)
		dispatch(companionBuilderActions.setTier(next))
		if (size && !getAvailableSizes(next).includes(size)) {
			dispatch(companionBuilderActions.setSize(''))
		}
	}

	const setTrait = (next: CompanionTrait) => {
		dispatch(companionBuilderActions.setTrait(next))
		// A size-locked creature sets its own size, and clears a size it forbids.
		if (next.size !== 'any') {
			const locked = ALL_SIZES.find(
				(name) => name.toLowerCase() === next.size.toLowerCase(),
			)
			if (locked && availableSizes.includes(locked)) {
				dispatch(companionBuilderActions.setSize(locked))
			} else if (size) {
				dispatch(companionBuilderActions.setSize(''))
			}
		}
	}

	const markdown = builtCompanion ? generateMarkdown(builtCompanion) : ''

	const copySource = () => {
		navigator.clipboard.writeText(markdown).then(() => {
			setCopied(true)
			setTimeout(() => setCopied(false), 1800)
		})
	}

	const importToCharacter = () => {
		if (!builtCompanion || !onImportCompanion) return
		onImportCompanion(builtCompanion.trait.name, markdown)
		setOpen(false)
	}

	/** The commission as a sentence, or the one thing still missing. */
	const commission = builtCompanion ? (
		<>
			<b>{trait!.name}</b> — {size} {trait!.type}, tier {tier}{' '}
			{TIER_NAMES[tier]}
		</>
	) : !size ? (
		<>Choose a size</>
	) : (
		<>Choose a creature</>
	)

	return (
		<>
			<BuilderTrigger onClick={() => setOpen(true)}>
				Build Companion
			</BuilderTrigger>

			<BuilderShell
				open={open}
				onClose={() => setOpen(false)}
				title="Companion Builder"
				commission={commission}
				result={
					<>
						<CompanionPlate tier={tier} size={size} trait={trait} />

						<div className="cb-source">
							<button
								type="button"
								className="cb-source__toggle"
								aria-expanded={showSource}
								aria-controls="cb-source-body"
								disabled={!builtCompanion}
								onClick={() => setShowSource(!showSource)}
							>
								{showSource ? '▾' : '▸'} Markdown source
							</button>
							<pre
								id="cb-source-body"
								className="cb-source__body"
								hidden={!showSource || !builtCompanion}
							>
								{markdown}
							</pre>
						</div>
					</>
				}
				actions={
					<>
						<BuilderVerb
							disabled={!size && !trait}
							onClick={() => dispatch(companionBuilderActions.resetBuilder())}
						>
							Reset
						</BuilderVerb>
						<BuilderVerbSpacer />
						{copied && (
							<span className="cb-flash" role="status">
								Copied
							</span>
						)}
						<BuilderVerb disabled={!builtCompanion} onClick={copySource}>
							Copy markdown
						</BuilderVerb>
						{onImportCompanion && (
							<BuilderVerb
								tone="primary"
								disabled={!builtCompanion}
								onClick={importToCharacter}
							>
								Import to character
							</BuilderVerb>
						)}
						<BuilderVerb onClick={() => setOpen(false)}>Close</BuilderVerb>
					</>
				}
			>
				<BuilderRegister
					step="I"
					label="Tier"
					note="how dangerous the companion is"
				>
					<ChoiceRail
						label="Tier"
						variant="tier"
						options={tierOptions}
						value={tier}
						onChange={setTier}
					/>
					<GrantLine
						pairs={[
							['HP', base.hp],
							['AV', base.av],
							[
								'Dice',
								`${base.attributes.str}/${base.attributes.agi}/${base.attributes.spi}/${base.attributes.mnd}`,
							],
							['Defenses', base.defenses.parry],
							['Skill rank', base.skillRank],
							[
								'Damage',
								`${base.attackDamage.weak}/${base.attackDamage.normal}/${base.attackDamage.strong}`,
							],
							['Max size', base.maxSize],
						]}
					/>
				</BuilderRegister>

				<BuilderRegister
					step="II"
					label="Size"
					note="parry / dodge / move, capped by tier"
				>
					<ChoiceRail
						label="Size"
						variant="size"
						options={sizeOptions}
						value={size}
						onChange={(value) =>
							dispatch(companionBuilderActions.setSize(String(value)))
						}
					/>
				</BuilderRegister>

				{/* The one register that grows: the only decision here with an unbounded
					number of options, so it takes whatever height the rails leave. */}
				<BuilderRegister
					step="III"
					label="Creature"
					note="its skills, attacks and abilities"
					grow
				>
					<CreatureLedger
						traits={TRAITS}
						selected={trait}
						onSelect={setTrait}
					/>
				</BuilderRegister>
			</BuilderShell>
		</>
	)
}
