import React, { useEffect, useId, useRef, useState } from 'react'
import styles from './CreatureStatBlock.module.css'
import { CardFrame, LozengeDivider, Cartouche } from './ornaments'
import SigilIcon, { SIGIL_SIZE, SigilName } from './SigilIcon'
import StatSigil from './StatSigil'
import { StatSigilName } from './stat-sigils'
import DieToken from './DieToken'
// Moved to its own module in M13 S4d (the character sheet's weapon rows use it
// too); re-exported here so every existing import and the MDX registration keep
// resolving from where they always did.
export { DamageLadder } from './DamageLadder'
export type { DamageLadderProps } from './DamageLadder'

export interface CreatureStatBlockProps {
	/** Size and type, e.g. "Medium Beast". */
	type: string
	tier: number | string
	/** Basic, Elite, or Lord. */
	category: string
	/** May be a life-pool pattern like "2x30" for Elite/Lord creatures. */
	hp: string
	av: string
	str: string
	agi: string
	spi: string
	mnd: string
	parry: number | string
	dodge: number | string
	resist: number | string
	children: React.ReactNode
}

interface Figure {
	label: string
	value: React.ReactNode
	glyph: StatSigilName
	/** Short armor-category tag riding beside the AV numeral. */
	note?: string
}

/**
 * Abbreviations for the AV parenthetical, so the armor category rides beside the
 * numeral instead of taking a line of its own.
 *
 * Only the four categories that account for 138 of the 150 creatures get a short
 * form. The dozen compound cases ("heavy + helmet + shield") are left in full and
 * simply wrap — inventing cryptic abbreviations for a handful of one-offs trades a
 * real reading cost for a cosmetic win.
 */
const ARMOR_ABBR: Record<string, string> = {
	light: 'L',
	heavy: 'H',
	'natural light': 'NAT L',
	'natural heavy': 'NAT H',
}

/**
 * Split `"0 (natural light)"` into its number and its parenthetical.
 *
 * AV is the one stat whose value is not a bare number — it runs to 35 characters
 * against 2 for a defense. Left inline it forced the whole band to size for its
 * longest member. Split, the numeral joins the other figures and the qualifier
 * drops to a note line.
 */
function splitAv(av: string): { value: string; note?: string } {
	const match = av.trim().match(/^(\S+)\s*\((.+)\)$/)
	return match ? { value: match[1], note: match[2] } : { value: av.trim() }
}

/**
 * Split a life-pool HP value (`"3x100"`) into pool count and pool size.
 *
 * Elite and Lord creatures fight through several pools in sequence, so the count
 * is a structural fact about the fight, not a multiplier to be read as one
 * number. Rendered as pips beside the pool size.
 */
function splitHp(hp: string): { value: string; pools: number } {
	const match = hp.trim().match(/^(\d+)\s*[x×]\s*(\d+)$/i)
	return match ? { value: match[2], pools: Number(match[1]) } : { value: hp.trim(), pools: 1 }
}

/** One stat: glyph, big value, small label under it. */
function StatFigure({ label, value, glyph, note, pools = 1 }: Figure & { pools?: number }) {
	const abbr = note ? (ARMOR_ABBR[note.toLowerCase()] ?? note) : undefined
	return (
		<div className={styles.figure}>
			<div className={styles.figureValue}>
				<StatSigil name={glyph} size={14} className={styles.figureGlyph} />
				<span className={styles.figureNumber}>{value}</span>
				{abbr && (
					<span className={styles.armorTag} title={note}>
						{abbr}
					</span>
				)}
				{pools > 1 && (
					<span className={styles.pools} title={`${pools} life pools`}>
						{Array.from({ length: pools }, (_, i) => (
							<i key={i} className={styles.pool} aria-hidden="true" />
						))}
						<span className={styles.srOnly}>{`${pools} life pools`}</span>
					</span>
				)}
			</div>
			<div className={styles.figureLabel}>{label}</div>
		</div>
	)
}

/**
 * Visual card for one creature stat block, rendered from generated MDX (README §
 * game content architecture, M6).
 *
 * The published stat block presented nine stats as a markdown table, and the
 * first pass at this card merely re-flowed that table into a band — it reproduced
 * the old reading order rather than improving it. This layout is organised around
 * how a GM actually reads a stat block at the table, in the order the questions
 * come up:
 *
 * 1. **Defenses** — "what do I roll against?" The number a player needs before
 *    anything else, so Parry / Dodge / Resist lead, set large.
 * 2. **Vitals** — "how long does it last?" HP (with life-pool pips for Elite and
 *    Lord creatures) and AV.
 * 3. **Attributes** — "what does it roll?" Four {@link DieToken}s, where the
 *    polygon's side count encodes the die, so the spread is legible as a shape.
 * 4. **Traits, then actions.**
 *
 * Groups are separated by space and a hairline inlaid panel rather than rules
 * between them (no flat dividers as grouping devices — the talent-card lesson).
 *
 * The first child must be the `### Name` heading; it is lifted into the name row
 * so its anchor stays a real heading. Remaining children ({@link StatBlockTrait}
 * rows then {@link StatBlockSection} blocks) flow as markdown so keyword
 * auto-links resolve — which matters more here than anywhere else in the codex,
 * since a creature's text is dense with conditions.
 *
 * Note the traits are CHILDREN, not props, unlike the spell card's stat band.
 * Those trait lines are almost entirely condition and damage-type keywords — 38
 * mentions of `poisoned`, 33 of `charmed` across the corpus — so passing them as
 * props would silently kill the highest-value links on the page (README §
 * rendering contract). Only the numeric band, whose values are dice and integers,
 * stays props.
 *
 * Purely an information display — never merged with the character sheet or the
 * print tool's creature components (README § sheet-component separation).
 */
export default function CreatureStatBlock({
	type,
	tier,
	category,
	hp,
	av,
	str,
	agi,
	spi,
	mnd,
	parry,
	dodge,
	resist,
	children,
}: CreatureStatBlockProps) {
	const [loreOpen, setLoreOpen] = useState(false)
	const loreId = useId()
	const kids = React.Children.toArray(children)
	const nameHeading = kids[0] ?? null
	// The lore block is lifted out of the body and rendered in the header, so the
	// toggle can sit on the name line and the panel can open above the stats. The
	// generator emits it immediately after the heading; matching on the component
	// type as well as position keeps that from being a silent positional contract.
	const rest = kids.slice(1)
	const loreIndex = rest.findIndex(
		(child) => React.isValidElement(child) && child.type === CreatureLore,
	)
	const lore = loreIndex === -1 ? null : rest[loreIndex]
	const body = loreIndex === -1 ? rest : rest.filter((_, i) => i !== loreIndex)

	const armor = splitAv(av)
	const vitality = splitHp(hp)

	const defenses: Figure[] = [
		{ label: 'Parry', value: parry, glyph: 'parry' },
		{ label: 'Dodge', value: dodge, glyph: 'dodge' },
		{ label: 'Resist', value: resist, glyph: 'resist' },
	]
	const attributes = [
		{ label: 'STR', value: str },
		{ label: 'AGI', value: agi },
		{ label: 'SPI', value: spi },
		{ label: 'MND', value: mnd },
	]

	return (
		<section className={styles.card}>
			<CardFrame keystone="bull" />
			<header className={styles.head}>
				<div className={styles.nameRow}>
					<div className={styles.identity}>
						{nameHeading}
						<p className={styles.type}>{type}</p>
					</div>
					<div className={styles.headerMarks}>
						{lore && (
							<button
								type="button"
								className={styles.loreToggle}
								aria-expanded={loreOpen}
								aria-controls={loreId}
								title={loreOpen ? 'Hide lore' : 'Show lore'}
								onClick={() => setLoreOpen((open) => !open)}
							>
								<SigilIcon name="scroll" size={SIGIL_SIZE.breadcrumb} />
								<span className={styles.srOnly}>Lore</span>
							</button>
						)}
						<span className={`${styles.tierChip} ${styles[`tier-${String(category).toLowerCase()}`] ?? ''}`}>
							<span className={styles.tierNumber}>Tier {tier}</span>
							<span className={styles.category}>{category}</span>
						</span>
					</div>
				</div>
			</header>
			{/* Always rendered, `hidden` when closed, so the prose stays in the static
			    HTML for the search index instead of appearing only after a click. */}
			{lore && (
				<div id={loreId} hidden={!loreOpen}>
					{lore}
				</div>
			)}
			<LozengeDivider compact />
			<div className={styles.statPanel}>
				<div className={`${styles.group} ${styles.defenses}`}>
					{defenses.map((d) => (
						<StatFigure key={d.label} {...d} />
					))}
				</div>
				<div className={`${styles.group} ${styles.vitals}`}>
					<StatFigure
						label="HP"
						value={vitality.value}
						glyph="hp"
						pools={vitality.pools}
					/>
					<StatFigure
						label="AV"
						value={armor.value}
						glyph="av"
						note={armor.note}
					/>
				</div>
				<div className={`${styles.group} ${styles.attributes}`}>
					{attributes.map((a) => (
						<div key={a.label} className={styles.figure}>
							<div className={styles.figureValue}>
								<DieToken value={a.value} />
							</div>
							<div className={styles.figureLabel}>{a.label}</div>
						</div>
					))}
				</div>
			</div>
			<div className={styles.body}>{body}</div>
		</section>
	)
}

export interface StatBlockTraitProps {
	/** Skills, Immunities, Resistances, or Weaknesses. */
	label: string
	children: React.ReactNode
}

/** Glyphs for the trait rows, so each is identifiable without reading its label. */
const TRAIT_GLYPHS: Record<string, SigilName> = {
	Skills: 'hand',
	// A shield stops a blow outright; a standing stone weathers it. That is the
	// Immunities/Resistances distinction, and it keeps Resistances off
	// `breastplate`, which `stat-sigils.ts` assigns to AV — the two would
	// otherwise render the same mark twice in one card meaning different things.
	Immunities: 'shield',
	Resistances: 'stele',
	Weaknesses: 'khopesh',
	// Companions only — no generated creature page emits a Movement row, so this key
	// is additive (M13 S8). `footprints` is the mark movement wants and is already
	// **Dodge**, which renders four cells above in the same card; the horse is the
	// period's own image of pace, and it is the mark the size rail uses for the same
	// figure, so the trade you choose and the row it lands in carry one glyph.
	Movement: 'horse',
}

/**
 * One trait row: a cartouche label and a comma-separated value list.
 *
 * The value is markdown children rather than a prop precisely so its condition
 * and damage-type terms keyword-link (see the note on {@link CreatureStatBlock}).
 * The generator emits these as the first body children, so they sit directly
 * under the stat panel and read as part of the header block.
 */
export function StatBlockTrait({ label, children }: StatBlockTraitProps) {
	const glyph = TRAIT_GLYPHS[label]
	return (
		<div className={styles.trait}>
			<span className={styles.traitLabel}>
				<Cartouche compact glyph={glyph}>
					{label}
				</Cartouche>
			</span>
			<span className={styles.traitValue}>{children}</span>
		</div>
	)
}

export interface StatBlockSectionProps {
	/** Attacks, Abilities, or Quick Actions. */
	label: string
	children: React.ReactNode
}

/**
 * One labeled block of a stat block's action lists.
 *
 * The entries stay markdown children rather than props so their rule text
 * keyword-links — creature attacks and abilities reference conditions constantly
 * ("the target is briefly staggered", "inflict burning (4)"), so this is the
 * content type that gains the most from linking.
 */
export function StatBlockSection({ label, children }: StatBlockSectionProps) {
	return (
		<section className={styles.section}>
			<h4 className={styles.sectionLabel}>{label}</h4>
			<div className={styles.sectionBody}>{children}</div>
		</section>
	)
}

export interface StatBadgeProps {
	children: React.ReactNode
}

/**
 * A small inlaid badge for one parenthesised property — an attack's weapon
 * properties (`light`, `reach`, `range (medium)`) or an ability's qualifier
 * (`Passive`, `Elite Trigger`, `recharge (d6)`).
 *
 * These were previously italic text inside parentheses, which put them in the
 * same visual register as the rule text they precede, so the eye had to read them
 * to skip them. As badges they are scannable at a glance and the sentence after
 * the name starts cleanly.
 *
 * Children stay markdown so property terms keep keyword-linking (several, such as
 * `range` and the damage types, resolve to the weapon-property and combat pages).
 */
export function StatBadge({ children }: StatBadgeProps) {
	return <span className={styles.badge}>{children}</span>
}

export interface EntryNameProps {
	children: React.ReactNode
}

/**
 * The name of an attack, ability or quick action.
 *
 * Once properties became badges, the bold name and the badge beside it sat at
 * similar weight and the eye lost the boundary between "what this is" and "what
 * it does". Rather than making the name a badge too — a row of three different
 * pill shapes per line is soup — the name moves to a different REGISTER: the
 * display face in bronze small caps, against the serif body of the effect text
 * and the sans of the badges. Three distinct voices, one box.
 */
export function EntryName({ children }: EntryNameProps) {
	return <span className={styles.entryName}>{children}</span>
}

export interface CreatureLoreProps {
	children: React.ReactNode
}

/**
 * Non-mechanical lore for a creature, collapsed by default.
 *
 * A stat block is a play-time reference: at the table a GM wants defenses and
 * attacks, not prose. But a bestiary is also a reading document, and the setting
 * work has nowhere to live on the page today.
 *
 * This renders only the panel. {@link CreatureStatBlock} lifts it out of the body,
 * puts its toggle on the name line and opens it directly under the header, above
 * the stats — so collapsed it occupies NO vertical space at all, and expanded it
 * reads as an introduction to the creature rather than a footnote after their
 * abilities. A native `<details>` cannot do that: its summary and its panel have
 * to be the same element, which forces the toggle and the prose into the same
 * place in the layout.
 *
 * Children stay markdown, so lore can carry emphasis, links and keyword
 * auto-links like any other rules text.
 *
 * No published creature has lore yet; the field is optional throughout, and the
 * creature-design skill now asks for it on new entries.
 */
export function CreatureLore({ children }: CreatureLoreProps) {
	return <div className={styles.loreBody}>{children}</div>
}

export interface LoreSectionProps {
	/** Ecology, Tactics, Treasure, or Organization. */
	label: string
	children: React.ReactNode
}

/**
 * One labeled part of a creature's lore.
 *
 * The lore block is deliberately structured rather than free prose: every
 * creature answers the same questions in the same order, so a reader learns the
 * shape once and can then jump straight to the part they want. The label is an
 * inline lead-in rather than a heading, because these are short and a stack of
 * block headings inside a collapsed panel reads heavier than the prose it
 * introduces.
 */
export function LoreSection({ label, children }: LoreSectionProps) {
	return (
		<p className={styles.loreSection}>
			<span className={styles.loreLabel}>{label}</span>
			{children}
		</p>
	)
}

export interface LoreTagProps {
	children: React.ReactNode
}

/**
 * A keyworded lore value — an environment term, a treasure scale.
 *
 * These are the parts of the lore block that are shorthand rather than prose, so
 * they are badged to say so: a reader can scan the tags without reading the
 * sentences around them. Quieter than {@link StatBadge}, which marks mechanical
 * properties that matter in play.
 */
export function LoreTag({ children }: LoreTagProps) {
	return <span className={styles.loreTag}>{children}</span>
}

export interface EncounterTemplateProps {
	/** How many appear, as written: `"1"`, `"2-4"`, `"6-10"`. */
	count: string
	children: React.ReactNode
}

/**
 * One encounter template: a named grouping and how many it contains.
 *
 * The two facts are compartments of one badge rather than a name followed by a
 * parenthetical, the same construction as the tier chip and the rank-bearing
 * skill chips — "warden squad" and "2-4" are one answer, not two.
 */
export interface TreasureTableProps {
	/** How much, relative to the creature's tier: None … Hoard. */
	scale: string
	/** Exactly six rows, in d6 order. */
	children: React.ReactNode
}

/**
 * A creature's loot as a rollable d6 table.
 *
 * Prose treasure ("grave goods, regalia, canopic jars") tells a GM what the
 * creature has but leaves them inventing the specifics mid-session. A d6 table is
 * actionable at the table: roll, read, hand it over. It is also the unit a future
 * hoard generator can consume — six typed rows per creature compose into a hoard
 * far more usefully than a paragraph does.
 *
 * Rolling highlights a row rather than replacing the table, so the GM keeps the
 * other five options in view and can ignore the die if something fits better.
 */
export function TreasureTable({ scale, children }: TreasureTableProps) {
	const [rolled, setRolled] = useState<number | null>(null)
	const [face, setFace] = useState(6)
	const [rolling, setRolling] = useState(false)
	const timers = useRef<ReturnType<typeof setTimeout>[]>([])
	const rows = React.Children.toArray(children)

	// Clear any pending shuffle if the card unmounts mid-roll.
	useEffect(() => () => timers.current.forEach(clearTimeout), [])

	const roll = () => {
		if (rolling) return
		const result = 1 + Math.floor(Math.random() * rows.length)
		// Someone who has asked for less motion gets the answer, not the theatre.
		const reduced =
			typeof window !== 'undefined' &&
			window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
		if (reduced) {
			setFace(result)
			setRolled(result)
			return
		}
		setRolling(true)
		setRolled(null)
		// Tumble through faces on an easing-out cadence, so it visibly slows into
		// its answer instead of stopping dead.
		const steps = [0, 70, 140, 210, 285, 370, 470]
		timers.current = steps.map((delay, i) =>
			setTimeout(() => {
				if (i < steps.length - 1) {
					// Never repeat the current face, or a step reads as a dropped frame.
					setFace((current) => {
						let next = current
						while (next === current) next = 1 + Math.floor(Math.random() * 6)
						return next
					})
					return
				}
				setFace(result)
				setRolled(result)
				setRolling(false)
			}, delay),
		)
	}

	return (
		<>
			{/* Scale and die sit together on the label line: the die belongs beside
			    "how much treasure", and hoisting it out of the grid buys the table a
			    whole column back. */}
			<span className={styles.loreTag}>{scale}</span>
			<button
				type="button"
				className={`${styles.treasureRoll}${rolling ? ' ' + styles.treasureRolling : ''}`}
				onClick={roll}
				disabled={rolling}
				title="Roll d6 for treasure"
				aria-label="Roll d6 for treasure"
			>
				<DieIcon face={face} />
			</button>
			<span className={styles.srOnly} role="status">
				{rolled && !rolling ? `Rolled ${rolled}` : ''}
			</span>
			<span className={styles.treasure}>
				{rows.map((row, i) => (
					<span
						key={i}
						className={`${styles.treasureRow}${rolled === i + 1 ? ' ' + styles.treasureRolled : ''}`}
					>
						<span className={styles.treasureNum}>{i + 1}</span>
						{row}
					</span>
				))}
			</span>
		</>
	)
}

/** Pip positions per face, on the icon's 24-unit grid. */
const DIE_PIPS: Record<number, [number, number][]> = {
	1: [[12, 12]],
	2: [
		[8.5, 8],
		[15.5, 16],
	],
	3: [
		[8.5, 8],
		[12, 12],
		[15.5, 16],
	],
	4: [
		[8.5, 8],
		[15.5, 8],
		[8.5, 16],
		[15.5, 16],
	],
	5: [
		[8.5, 8],
		[15.5, 8],
		[12, 12],
		[8.5, 16],
		[15.5, 16],
	],
	6: [
		[8.5, 8],
		[15.5, 8],
		[8.5, 12],
		[15.5, 12],
		[8.5, 16],
		[15.5, 16],
	],
}

/**
 * A struck d6 showing a given face, matching the kit's flat carving.
 *
 * The shell is fixed and only the pips change, so a shuffle animation can never
 * shift the button's size or the row beside it.
 */
function DieIcon({ face }: { face: number }) {
	return (
		<svg
			width={15}
			height={15}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeLinejoin="round"
			aria-hidden="true"
		>
			<rect x={3.5} y={3.5} width={17} height={17} rx={2.5} strokeWidth={1.5} />
			<g fill="currentColor" stroke="none">
				{(DIE_PIPS[face] ?? DIE_PIPS[6]).map(([cx, cy]) => (
					<circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={1.35} />
				))}
			</g>
		</svg>
	)
}

export interface TreasureRowProps {
	/** Loot category: Weapon, Armor, Magic, Material, Valuables, Supplies, Relic. */
	kind: string
	/** Rules reference — the core-rules item this is, and its Quality. */
	stats?: string
	/** What it sells for, or what it rolls for. */
	value?: string
	/** The item's name, plus any short qualifying note, as markdown. */
	children: React.ReactNode
}

/**
 * One row of a treasure table: a typed category and the item itself.
 *
 * The category is a closed vocabulary so a hoard generator can filter on it
 * ("give me the crafting materials from this lair"), and so a GM scanning six
 * rows can find the weapon without reading all of them. The item stays markdown,
 * so it can link to equipment and magic-item entries.
 */
export function TreasureRow({ kind, stats, value, children }: TreasureRowProps) {
	return (
		<>
			<span className={styles.treasureKind}>{kind}</span>
			<span className={styles.treasureItem}>
				{children}
				{stats && <span className={styles.treasureStats}>{stats}</span>}
				{value && <span className={styles.treasureValue}>{value}</span>}
			</span>
		</>
	)
}

export interface EncounterGroupProps {
	/** The grouping's name, e.g. "Tomb guard". */
	name: string
	children: React.ReactNode
}

/**
 * An encounter template whose members are OTHER creatures — a mixed band rather
 * than N of the same thing ("tomb guard: 1 mummy lord and 6-10 mummies").
 *
 * The composition is markdown children, not a prop, so the generator can link
 * each named creature to their own entry. Those links are resolved from the
 * roster at generation time and the build fails on a name that does not exist,
 * so a template can never point at a creature that was renamed or never written.
 */
export function EncounterGroup({ name, children }: EncounterGroupProps) {
	return (
		<span className={styles.encounter}>
			<span className={styles.encounterName}>{name}</span>
			<span className={styles.encounterParts}>{children}</span>
		</span>
	)
}

export function EncounterTemplate({ count, children }: EncounterTemplateProps) {
	return (
		<span className={styles.encounter}>
			<span className={styles.encounterName}>{children}</span>
			<span className={styles.encounterCount}>{count}</span>
		</span>
	)
}

export interface TraitItemProps {
	children: React.ReactNode
}

/**
 * One entry in an Immunities / Resistances / Weaknesses list.
 *
 * These lists mix damage types (which chip) with conditions and free-form
 * qualifiers (which do not), so an unstyled run read as a comma-separated
 * sentence with a few loud chips dropped into it. Each entry now sits in a quiet
 * badge — deliberately lighter than both the skill chips above it and the
 * property badges below, since a creature can carry a dozen of these and they are
 * the most situational thing on the card.
 *
 * Children stay markdown so damage types keep chipping and conditions keep
 * keyword-linking; the plugin treats this element as damage context by
 * construction, because the row's own label already establishes it.
 */
export function TraitItem({ children }: TraitItemProps) {
	return <span className={styles.traitItem}>{children}</span>
}
