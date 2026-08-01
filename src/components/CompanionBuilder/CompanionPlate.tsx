import React from 'react'
// Imported from the MODULE, not the `codex` barrel — that barrel reaches
// `MDXComponents` and Docusaurus's own theme components, which vitest cannot
// parse. The Companions tab's copy carries the same note for the same reason.
import CreatureStatBlock, {
	StatBlockSection,
	StatBlockTrait,
	TraitItem,
} from '../codex/CreatureStatBlock'
import type { CompanionTrait } from '../../types/companion'
import {
	BASE_STATS,
	SIZE_MODIFIERS,
	TIER_NAMES,
	applyModifier,
	calculateStats,
} from '../../utils/typescript/companion/companionCalculations'
import { convertHtmlToMarkdown } from '../../utils/typescript/companion/companionFormatting'
import {
	renderCompanionEntry,
	renderCompanionInline,
} from '../../utils/typescript/companion/companionInline'

export interface CompanionPlateProps {
	tier: number
	size: string
	trait: CompanionTrait | null
}

const signed = (value: number) => (value >= 0 ? `+${value}` : String(value))

/** Trait rows whose value is a comma-separated list rather than a phrase. */
const LIST_TRAITS = ['Immunities', 'Resistances', 'Weaknesses']

/**
 * The companion the builder is producing, drawn as the codex's creature card
 * (M13 S8, owner review).
 *
 * ## Why this component and not a layout of its own
 *
 * The first pass at this panel built a bespoke plate — a figure band, two courses
 * of ruled cells, prose courses. It read well and it was **a fourth rendering of
 * one artifact**: a creature page renders `CreatureStatBlock`, the Companions tab
 * renders `CreatureStatBlock` (S7 settled that, and amended the
 * sheet-component-separation rule to allow it: a read-only codex DISPLAY component
 * may be reused by the sheet), and the builder is showing the very block those two
 * will go on to show. A player builds a companion here and then looks at it on the
 * sheet; if the two disagree, the builder is lying about its own output.
 *
 * So the preview IS the card. What the old plate replaced — six nested `Paper`s
 * from `src/components/CompanionStatBlock.tsx` — is still deleted; this is the
 * same deletion resolved to the shared component rather than to a fourth one.
 *
 * ## What is passed, and in what form
 *
 * The card takes its numeric band as props and everything else as CHILDREN, so
 * trait and action text keeps its keyword rendering. The builder holds its attacks
 * and abilities as HTML strings (`<strong>Bite</strong> …`), so they go through
 * `convertHtmlToMarkdown` and then `renderCompanionInline` — which is exactly the
 * path the same text takes on the sheet, where it has been through
 * `generateMarkdown` and back. One transform chain, so a `DamageLadder` here and a
 * `DamageLadder` there come from the same numbers.
 *
 * ## Why it renders before a creature is chosen
 *
 * Tier and size alone determine HP, AV, the four attribute dice and the defense
 * floor — the whole left half of the rulebook's tier table. The old builder showed
 * *"Select tier, size, and trait to build companion"* until all three were set,
 * throwing away the feedback that makes the first two choices legible. The card is
 * live from the first press; the creature fills in its own modifiers, skills,
 * attacks and abilities.
 */
export const CompanionPlate: React.FC<CompanionPlateProps> = ({
	tier,
	size,
	trait,
}) => {
	const base = BASE_STATS[tier]
	const sizeMod = size ? SIZE_MODIFIERS[size] : null
	const built = trait && size ? calculateStats(tier, size, trait) : null

	const hp = built ? built.hp : base.hp
	const av = built ? built.av : `${base.av} (natural light)`
	const attributes = built ? built.attributes : base.attributes
	const defenses = built
		? built.defenses
		: {
				parry: base.defenses.parry + (sizeMod?.parry ?? 0),
				dodge: base.defenses.dodge + (sizeMod?.dodge ?? 0),
				resist: base.defenses.resist,
			}

	/**
	 * The trait rows, in the order `parseCompanionMarkdown` reads them off a stored
	 * block — so the builder's preview and the sheet's render list the same facts in
	 * the same sequence. Empty values are dropped rather than printed as `-`, which
	 * is the same judgement that parser makes.
	 */
	const traitRows: { label: string; value: string }[] = built
		? [
				{ label: 'Skills', value: built.skills },
				{ label: 'Movement', value: String(built.movement) },
				{ label: 'Immunities', value: built.immunities },
				{ label: 'Resistances', value: built.resistances },
				{ label: 'Weaknesses', value: built.weaknesses },
			].filter(({ value }) => value && value !== '-')
		: []

	const sections = built
		? [
				{ label: 'Attacks', items: built.attacks },
				{ label: 'Abilities', items: built.abilities },
			].filter(({ items }) => items.length > 0)
		: []

	return (
		<>
			<div className="cs-companion-card">
				<CreatureStatBlock
					type={
						trait ? `${size} ${trait.type}` : `${size || 'Unsized'} companion`
					}
					tier={tier}
					category={TIER_NAMES[tier]}
					hp={String(hp)}
					av={av}
					str={attributes.str}
					agi={attributes.agi}
					spi={attributes.spi}
					mnd={attributes.mnd}
					parry={defenses.parry}
					dodge={defenses.dodge}
					resist={defenses.resist}
				>
					{/* The card lifts its first child into the name row and expects a
						heading, exactly as a generated creature page passes one. */}
					<h3>{trait ? trait.name : 'No creature chosen'}</h3>

					{traitRows.map((row) => (
						<StatBlockTrait key={row.label} label={row.label}>
							{LIST_TRAITS.includes(row.label)
								? /* Lists mix damage types (which chip) with conditions and
									free-form qualifiers (which do not), so each entry gets the
									quiet `TraitItem` badge — the S7 judgement, unchanged. */
									row.value
										.split(',')
										.map((entry, index) => (
											<TraitItem key={index}>
												{renderCompanionInline(entry.trim())}
											</TraitItem>
										))
								: renderCompanionInline(row.value)}
						</StatBlockTrait>
					))}

					{sections.map((section) => (
						<StatBlockSection key={section.label} label={section.label}>
							<ul>
								{section.items.map((item, index) => (
									<li key={index}>
										{renderCompanionEntry(convertHtmlToMarkdown(item))}
									</li>
								))}
							</ul>
						</StatBlockSection>
					))}
				</CreatureStatBlock>
			</div>

			{/*
				The arithmetic the defense band came out of.

				Kept from the first pass and kept OUTSIDE the card, which is the right
				side of the line: the card is the published artifact and must look
				identical wherever it is shown, while this is scaffolding that belongs to
				the act of building. Show the rule, not just its inputs — the
				expanded-row pattern's standing instruction.
			*/}
			<p className="cb-equation">
				<span className="cb-equation__name">Parry</span> {base.defenses.parry}{' '}
				{signed(sizeMod?.parry ?? 0)}{' '}
				{signed(trait ? applyModifier(0, trait.parry) : 0)}
				{' · '}
				<span className="cb-equation__name">Dodge</span> {base.defenses.dodge}{' '}
				{signed(sizeMod?.dodge ?? 0)}{' '}
				{signed(trait ? applyModifier(0, trait.dodge) : 0)}
				{' · '}
				<span className="cb-equation__name">Resist</span> {base.defenses.resist}{' '}
				{signed(0)} {signed(trait ? applyModifier(0, trait.resist) : 0)}
				<span className="cb-equation__key">tier base + size + creature</span>
			</p>
		</>
	)
}
