import React from 'react'
import styles from './ArchetypeCard.module.css'
import { CardFrame, Cartouche, LozengeDivider } from './ornaments'
import DieToken from './DieToken'
import StatSigil from './StatSigil'
import { StatSigilName } from './stat-sigils'

export interface ArchetypeCardProps {
	/** Party job, as written: "Tank / Striker". */
	role: string
	/** Attribute dice, as written in the data: `d8`. */
	str: string
	agi: string
	spi: string
	mnd: string
	children: React.ReactNode
}

const ATTRIBUTES: { label: string; glyph: StatSigilName }[] = [
	{ label: 'STR', glyph: 'strength' },
	{ label: 'AGI', glyph: 'agility' },
	{ label: 'SPI', glyph: 'spirit' },
	{ label: 'MND', glyph: 'mind' },
]

/**
 * Visual card for one quickstart archetype, rendered from generated MDX (M22 D6).
 *
 * An archetype page used to be ten `**Bold**` run-ins and a bare markdown
 * attribute table, on a site whose spells, talents, conditions, combat arts and
 * creatures all have a card. Every device this needs already existed, so the card
 * introduces no new one beyond its own keystone: {@link DieToken} for the four
 * attributes, {@link Cartouche} for a field label, and the chip plugin's skill
 * banners for the proficiencies — which is the whole reason the skill lists are
 * markdown children rather than props.
 *
 * The card holds the BUILD only (M22 Q4, owner): attributes, skills, origin,
 * equipment, spells and companion. Playstyle and advancement stay as prose below
 * it, where they read like the rest of the content pages.
 *
 * The header carries the role and the four dice — "what is it for?" and "what
 * does it roll?". What the kit COST belongs with the kit, so the coins and load
 * figures sit inside the Equipment block ({@link ArchetypeTally}), not up here.
 *
 * Purely an information display; the character sheet builds the same archetype
 * from the same JSON through `createInitialCharacter`, and the two never share a
 * component (README § sheet-component separation).
 */
export default function ArchetypeCard({
	role,
	str,
	agi,
	spi,
	mnd,
	children,
}: ArchetypeCardProps) {
	const dice = [str, agi, spi, mnd]
	// A role is one or two jobs written "Tank / Striker"; each becomes its own tag
	// so the pair reads as two answers rather than one string with a slash in it.
	const roles = role
		.split('/')
		.map((part) => part.trim())
		.filter(Boolean)

	return (
		<section className={styles.card}>
			<CardFrame keystone="gate" />
			<header className={styles.head}>
				<ul className={styles.roleRail}>
					{roles.map((tag) => (
						<li key={tag} className={styles.roleTag}>
							{tag}
						</li>
					))}
				</ul>
			</header>
			<div className={styles.attributes}>
				{ATTRIBUTES.map(({ label, glyph }, i) => (
					<div key={label} className={styles.attribute}>
						<StatSigil
							name={glyph}
							size={13}
							className={styles.attributeGlyph}
						/>
						<DieToken value={dice[i]} />
						<span className={styles.attributeLabel}>{label}</span>
					</div>
				))}
			</div>
			<LozengeDivider compact />
			<div className={styles.body}>{children}</div>
		</section>
	)
}

export interface ArchetypeSectionProps {
	/** Origin, Skills, Combat Arts, Equipment, Spells, or the companion block. */
	label: string
	children: React.ReactNode
}

/**
 * One labelled block of the build.
 *
 * The contents stay markdown children throughout: a skill name has to reach the
 * chip plugin, an equipment line names catalogue items the keyword plugin links,
 * and a combat art's weapon list chips per weapon category. Passing any of it as
 * a prop would render it as dead text (component-patterns § 1) — and on this card
 * the keywords ARE the content.
 */
export function ArchetypeSection({ label, children }: ArchetypeSectionProps) {
	return (
		<section className={styles.section}>
			<h4 className={styles.sectionLabel}>{label}</h4>
			<div className={styles.sectionBody}>{children}</div>
		</section>
	)
}

export interface ArchetypeTallyProps {
	/** Coins left after the kit is bought, and the subtraction that got there. */
	coins: number
	coinsFrom: string
	/** Total load carried, standard gear included. */
	load: number
	loadFrom: string
	/** Carry capacity, `1/2 STR + 8`. */
	capacity: number
	capacityFrom: string
}

/**
 * What the kit cost: coins left, load carried, load allowed.
 *
 * These sit inside the Equipment block rather than in the card header (owner
 * review). They are the ANSWER to the item list directly above them, and as
 * header badges they were both too small to find and too far from the thing they
 * summarise.
 *
 * Each figure carries its own derivation underneath — `equipment 4 + standard
 * gear 5`. That used to be one run-on "Totals" line naming all three
 * derivations in sequence, which is unreadable: the arithmetic belongs under the
 * number it produces, not in a sentence about all of them.
 *
 * Values and derivations are props on purpose: they are integers and arithmetic,
 * the one thing the props/children line does allow (component-patterns § 1).
 */
export function ArchetypeTally({
	coins,
	coinsFrom,
	load,
	loadFrom,
	capacity,
	capacityFrom,
}: ArchetypeTallyProps) {
	const figures: {
		label: string
		value: number
		from: string
		glyph: StatSigilName
	}[] = [
		{ label: 'Coins left', value: coins, from: coinsFrom, glyph: 'coins' },
		{ label: 'Load', value: load, from: loadFrom, glyph: 'load' },
		// Capacity takes the SAME pack mark as load, because it is the same
		// quantity measured the other way — what you carry against what you can.
		// The other candidate was Strength's bull head, since capacity derives from
		// STR, and a glyph that names the input rather than the stat states the
		// wrong thing (SKILL.md § accessibility).
		{
			label: 'Carry capacity',
			value: capacity,
			from: capacityFrom,
			glyph: 'load',
		},
	]
	return (
		<div className={styles.tally}>
			{figures.map(({ label, value, from, glyph }) => (
				<div key={label} className={styles.tallyFigure}>
					<div className={styles.tallyValue}>
						<StatSigil name={glyph} size={14} className={styles.tallyGlyph} />
						<span className={styles.tallyNumber}>{value}</span>
					</div>
					<div className={styles.tallyLabel}>{label}</div>
					<div className={styles.tallyFrom}>{from}</div>
				</div>
			))}
		</div>
	)
}

export interface ArchetypeFieldProps {
	/** Upbringing, Background, Starting Item, Rank 1, Focus Pool, … */
	label: string
	/** Put the label on its own line, for a value that is a list. */
	block?: boolean
	children: React.ReactNode
}

/**
 * One named field inside a section: a cartouche label and its value.
 *
 * A one-line value runs on from its label, which is what makes the origin block
 * read as three labelled facts rather than six stacked lines. A LIST cannot: the
 * label is floated, so the first bullet came up beside it and sat left of its own
 * siblings — three items, two indents. Those fields pass `block` and take the
 * label on its own line instead.
 */
export function ArchetypeField({
	label,
	block = false,
	children,
}: ArchetypeFieldProps) {
	return (
		<div className={`${styles.field}${block ? ' ' + styles.fieldBlock : ''}`}>
			<span className={styles.fieldLabel}>
				<Cartouche compact>{label}</Cartouche>
			</span>
			<div className={styles.fieldValue}>{children}</div>
		</div>
	)
}
