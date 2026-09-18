import React from 'react'
import Link from '@docusaurus/Link'
import CreatureStatBlock, {
	StatBlockSection,
	StatBlockTrait,
	StatBadge,
	EntryName,
	TraitItem,
	LoreTag,
	EncounterTemplate,
	EncounterGroup,
	DamageLadder,
	// Imported from the module rather than the codex barrel: the barrel reaches
	// `@theme/MDXComponents/Img` through the image plate, which drags Docusaurus's
	// theme (JSX inside .js) into anything that imports it.
} from '@site/src/components/codex/CreatureStatBlock'
import creatureTraits from '@site/src/utils/data/json/creature-traits.json'
import { presetCount } from './encounter'
import {
	CREATURE_SECTIONS,
	FALLBACK_SECTION,
	sectionForQualifier,
} from '@site/src/utils/typescript/creature/creatureSections'
import {
	inlineText,
	// The damage split the tier page and the printed card both use, so a ladder
	// reads the same in all three places.
} from '@site/src/features/CreatureCards/creatureBlocks'
import { splitDamageText } from '@site/src/features/CreatureCards/creatureEntryText'
import type {
	CreatureIndexEntry,
	CreatureIndexEntryLine,
} from '@site/src/types/CreatureIndex'
import styles from './BestiaryBrowser.module.css'

/**
 * The expanded row: the creature's card, in the codex `CreatureStatBlock` the
 * tier pages are generated into, so the two are the same object rather than two
 * renderings of one.
 *
 * It renders the WHOLE card and not just the entries: the defenses, hit points,
 * armor value and four attribute dice are in the stat band, which a hand-built
 * panel simply left out — a GM opening a creature got their attacks with no
 * Parry to aim at and no dice to roll.
 *
 * **It is not the full entry, on purpose.** Lore, physiology, tactics and
 * treasure stay on the tier page — they are reading, and this is a lookup. A
 * "full entry" link sits at the end of every panel, and that page is also where
 * the auto-keyword and chip plugins have run: those operate on markdown at build
 * time and cannot reach content React assembles from JSON at runtime, so
 * conditions and damage types here are plain text rather than links.
 */
const TRAIT_TEXT = new Map(
	(creatureTraits as { name: string; text: string }[]).map((t) => [
		t.name,
		t.text,
	]),
)

/** `"Quick Action"` → one badge; a recharge rider keeps its own. */
function qualifierBadges(line: CreatureIndexEntryLine): string[] {
	if (!line.qualifier) return []
	return line.qualifier.split(/\s*,\s*/).filter(Boolean)
}

const AttackLine: React.FC<{ attack: CreatureIndexEntryLine }> = ({
	attack,
}) => {
	const { damage, damageType, description } = splitDamageText(attack.text)
	return (
		<li>
			<EntryName>{attack.name}</EntryName>{' '}
			{(attack.properties ?? []).map((property) => (
				<StatBadge key={property}>{property}</StatBadge>
			))}{' '}
			{damage && (
				<DamageLadder values={damage}>{damageType || undefined}</DamageLadder>
			)}{' '}
			{description && inlineText(description, `${attack.name}-d`)}
			{(attack.details ?? []).map((detail, i) => (
				<div key={i} className={styles.entryDetail}>
					{inlineText(detail, `${attack.name}-${i}`)}
				</div>
			))}
		</li>
	)
}

const AbilityLine: React.FC<{ ability: CreatureIndexEntryLine }> = ({
	ability,
}) => (
	<li>
		<EntryName>{ability.name}</EntryName>{' '}
		{qualifierBadges(ability).map((q) => (
			<StatBadge key={q}>{q}</StatBadge>
		))}{' '}
		{inlineText(ability.text, `${ability.name}-t`)}
		{(ability.details ?? []).map((detail, i) => (
			<div key={i} className={styles.entryDetail}>
				{inlineText(detail, `${ability.name}-${i}`)}
			</div>
		))}
	</li>
)

export const CreatureDetail: React.FC<{
	entry: CreatureIndexEntry
	/** Omitted where the panel is read-only, such as in a test or a print view. */
	onAdd?: (count: number) => void
}> = ({ entry, onAdd }) => {
	/**
	 * Traits are rendered as the Passives they are, resolved from
	 * `creature-traits.json` — the same move the docs generator makes. The index
	 * ships trait NAMES only, so `Undead Nature` is written once and shipped
	 * once rather than copied into every undead entry.
	 */
	const traitLines: CreatureIndexEntryLine[] = entry.traits.map((name) => ({
		name,
		qualifier: 'Passive',
		text: TRAIT_TEXT.get(name) ?? '',
	}))
	const abilities = [...entry.abilities, ...traitLines]

	const rows: [string, string[]][] = [
		['Skills', entry.skills],
		['Immunities', entry.immunities],
		['Resistances', entry.resistances],
		['Weaknesses', entry.weaknesses],
	]

	const subtype =
		entry.subtype.length > 0 ? ` (${entry.subtype.join(', ')})` : ''

	return (
		<CreatureStatBlock
			type={`${entry.size} ${entry.type}${subtype}`}
			tier={entry.tier}
			category={entry.category}
			hp={entry.hp}
			av={entry.av}
			str={entry.str}
			agi={entry.agi}
			spi={entry.spi}
			mnd={entry.mnd}
			parry={entry.parry}
			dodge={entry.dodge}
			resist={entry.resist}
		>
			{/* The card lifts its first child into the name row. The row above this
			    one already names the creature, but a card that does not say who it
			    belongs to stops being a card. */}
			<h3>{entry.name}</h3>
			<div className={styles.detailTraits}>
				{rows.map(([label, values]) =>
					values.length === 0 ? null : (
						<StatBlockTrait key={label} label={label}>
							{label === 'Skills'
								? values.join(', ')
								: values.map((value) => (
										<TraitItem key={value}>{value}</TraitItem>
									))}
						</StatBlockTrait>
					),
				)}
			</div>

			{CREATURE_SECTIONS.map((group) => {
				const attacks = group.withAttacks ? entry.attacks : []
				const inGroup = abilities.filter(
					(ability) =>
						(sectionForQualifier(ability.qualifier) ?? FALLBACK_SECTION) ===
						group.label,
				)
				if (attacks.length === 0 && inGroup.length === 0) return null
				return (
					<StatBlockSection key={group.label} label={group.label}>
						<ul>
							{attacks.map((attack, i) => (
								<AttackLine key={`attack-${i}`} attack={attack} />
							))}
							{inGroup.map((ability, i) => (
								<AbilityLine key={`ability-${i}`} ability={ability} />
							))}
						</ul>
					</StatBlockSection>
				)
			})}

			<div className={styles.detailFooter}>
				<div className={styles.detailTags}>
					{entry.environment.map((term) => (
						<LoreTag key={term}>{term}</LoreTag>
					))}
				</div>
				{entry.organization.length > 0 && (
					<div className={styles.detailTags}>
						{entry.organization.map((template) => {
							const tag = template.count ? (
								<EncounterTemplate count={template.count}>
									{template.name}
								</EncounterTemplate>
							) : (
								<EncounterGroup name={template.name}>
									{(template.composition ?? [])
										.map((part) => `${part.count} ${part.creature}`)
										.join(', ')}
								</EncounterGroup>
							)
							/**
							 * A group the roster DESIGNED is one click away from being in
							 * the fight. "A pack of four to six jackals" is an authored
							 * number, and it is a better starting point than a GM's guess.
							 * A mixed band names other creatures, so it stays a label: the
							 * builder would have to add creatures this row does not know.
							 */
							if (!onAdd || !template.count)
								return (
									<React.Fragment key={template.name}>{tag}</React.Fragment>
								)
							return (
								<button
									key={template.name}
									type="button"
									className={styles.presetButton}
									aria-label={`Add ${template.count} to the encounter as a ${template.name}`}
									onClick={() => onAdd(presetCount(template.count as string))}
								>
									{tag}
								</button>
							)
						})}
					</div>
				)}
				{onAdd && (
					<button
						type="button"
						className={styles.addToEncounter}
						onClick={() => onAdd(1)}
					>
						Add to encounter
					</button>
				)}
				<Link className={styles.detailLink} to={entry.href}>
					Full entry, lore and treasure →
				</Link>
			</div>
		</CreatureStatBlock>
	)
}
