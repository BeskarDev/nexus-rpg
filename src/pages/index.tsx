import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import type { SigilName } from '@site/src/components/codex'
import {
  CardFrame,
  Cartouche,
  FriezeDivider,
  LozengeDivider,
  SigilIcon,
  SolarMedallion,
} from '@site/src/components/codex'
import homeBanner from '@site/static/img/banner/home-banner.png'
import Layout from '@theme/Layout'
import React from 'react'

import styles from './index.module.css'

/** Year the project started, for the colophon's "in development since" line. */
const PROJECT_START_YEAR = 2020

/** Corner rivets pinning the matted art. Order is irrelevant; the CSS places them. */
const PLATE_RIVETS = ['tl', 'tr', 'br', 'bl'] as const

interface Entry {
	label: string
	href: string
	sigil: SigilName
	blurb: string
}

/**
 * The three ways in. A visitor landing here is one of exactly three people —
 * someone deciding whether to read the game, someone about to make a character,
 * or someone about to run it — and the old page answered none of them: it
 * offered ten equally-weighted chapter tiles and left the choice to guesswork.
 * These sit above the contents on purpose.
 */
const THRESHOLDS: Entry[] = [
	{
		label: 'Learn the Game',
		href: '/docs/basic-rules/how-to-roll',
		sigil: 'dice',
		blurb: 'One attribute die, one skill, one target number. Start here.',
	},
	{
		label: 'Make a Character',
		href: '/docs/basic-rules/character-creation',
		sigil: 'quill',
		blurb: 'Folk, upbringing, background, and the skills that shape them.',
	},
	{
		label: 'Run a Table',
		href: '/docs/gm-tools/index',
		sigil: 'key',
		blurb: 'Encounter budgets, random tables, and the bestiary.',
	},
]

/**
 * The book proper, in reading order. Numerals are the index's own ordinals and
 * match the chapter folders for I-VIII; GM Tools and the character sheet are
 * deliberately NOT numbered and sit below the divider, because they are tools
 * rather than chapters of the rules.
 *
 * Each entry's sigil is its mark from the shared SigilIcon set, so the navbar,
 * this index and the docs chapter markers all carry one identity. Hrefs mirror
 * the landing doc each navbar item resolves to; if one moves, update it here.
 */
const CHAPTERS: (Entry & { numeral: string })[] = [
	{
		numeral: 'I',
		label: 'Basic Rules',
		href: '/docs/basic-rules/how-to-roll',
		sigil: 'sun',
		blurb: 'Rolling dice, success levels, character creation and progression.',
	},
	{
		numeral: 'II',
		label: 'Adventurers',
		href: '/docs/adventurers/folk',
		sigil: 'ziggurat',
		blurb: 'Folk, languages, upbringing, background and ties to the world.',
	},
	{
		numeral: 'III',
		label: 'Statistics',
		href: '/docs/statistics/attributes',
		sigil: 'tablet',
		blurb: 'Attributes, hit points, defenses, resolve, skills and talents.',
	},
	{
		numeral: 'IV',
		label: 'Equipment',
		href: '/docs/equipment/items',
		sigil: 'anvil',
		blurb: 'Gear and coin, weapons and armor, and magic items.',
	},
	{
		numeral: 'V',
		label: 'Combat',
		href: '/docs/combat/combat-scenes',
		sigil: 'blades',
		blurb: 'Combat scenes, attacking, movement, conditions and combat arts.',
	},
	{
		numeral: 'VI',
		label: 'Scenes',
		href: '/docs/scenes/scenes-time-intervals',
		sigil: 'hourglass',
		blurb: 'Time intervals, resting, downtime, crafting and challenges.',
	},
	{
		numeral: 'VII',
		label: 'Magic',
		href: '/docs/magic/magic-spells/',
		sigil: 'rune',
		blurb: 'Arcane and mystic spells, metamagic arts and spell properties.',
	},
	{
		numeral: 'VIII',
		label: 'Creatures',
		href: '/docs/creatures/mounts-companions/',
		sigil: 'serpent',
		blurb: 'Mounts and companions, creature rules and the bestiary.',
	},
]

const TOOLS: Entry[] = [
	{
		label: 'GM Tools',
		href: '/docs/gm-tools/index',
		sigil: 'key',
		blurb: 'Random tables, builder tools and printable sheets.',
	},
	{
		label: 'Character Sheet',
		href: '/docs/character-sheet/character-sheet',
		sigil: 'scroll',
		blurb: 'The interactive sheet, saved to your account.',
	},
]

function IndexRow({
	entry,
	numeral,
}: {
	entry: Entry
	numeral?: string
}): React.ReactNode {
	return (
		<li className={styles.indexItem}>
			<Link to={entry.href} className={styles.indexRow}>
				<span className={styles.indexNumeral} aria-hidden="true">
					{numeral ?? ''}
				</span>
				<span className={styles.indexSigil} aria-hidden="true">
					<SigilIcon name={entry.sigil} size={22} />
				</span>
				<span className={styles.indexText}>
					<span className={styles.indexLabel}>{entry.label}</span>
					<span className={styles.indexBlurb}>{entry.blurb}</span>
				</span>
			</Link>
		</li>
	)
}

export default function Home(): React.ReactNode {
	const { siteConfig } = useDocusaurusContext()
	const years = new Date().getFullYear() - PROJECT_START_YEAR

	return (
		<Layout
			title="Home"
			description="Nexus RPG is a sword and sorcery tabletop roleplaying game in an age of bronze. A few cities hold out, the ruins are older than memory, and the gods expect their due. Build an adventurer out of skills and talents, read the rules, and run a table."
		>
			{/* A landmark, not a div: Layout provides no <main>, and the skip link
			    needs somewhere to land. */}
			<main className={styles.page}>
				{/* --- Frontispiece: the title plate --------------------------------
				    The banner is an inlaid PLATE inside the frame, not a full-bleed
				    backdrop with translucent boxes floating on it. */}
				<header className={styles.plate}>
					{/* The art is MATTED — inset in a band of stone with its own keyline
					    and a rivet at each corner — rather than bleeding to the plate
					    edge. Decorating a photograph directly does not work: bronze on
					    a bright sky has no contrast, so the ornament has to sit on the
					    mat, where it is guaranteed to read whatever the picture does. */}
					<div className={styles.plateArtWrap}>
						<div
							className={styles.plateArt}
							style={{ backgroundImage: `url(${homeBanner})` }}
							role="img"
							aria-label="A Bronze Age river valley beneath high cliffs"
						/>
						{PLATE_RIVETS.map((pos) => (
							<span
								key={pos}
								className={`${styles.plateRivet} ${styles[`plateRivet-${pos}`]}`}
								aria-hidden="true"
							/>
						))}
						<span className={styles.plateCrest} aria-hidden="true">
							<SolarMedallion size={88} />
						</span>
					</div>
					<div className={styles.plateBody}>
						<CardFrame cornersOnly />
						<span
							className={`${styles.platePillar} ${styles.platePillarLeft}`}
							aria-hidden="true"
						/>
						<span
							className={`${styles.platePillar} ${styles.platePillarRight}`}
							aria-hidden="true"
						/>
						<h1 className={styles.title}>{siteConfig.title}</h1>
						{/* No epigraph line. The prose below now opens by naming the game,
						    so a small-caps "sword and sorcery in the age of bronze" two
						    lines above it was the same sentence twice. The divider carries
						    the step from display face to body on its own. */}
						<LozengeDivider compact />
						{/* Answers two questions in two paragraphs: what is this, and how
						    does it play. Four drafts got here, and the failures are worth
						    keeping so they are not repeated:

						    - Metaphor first ("civilization is a handful of bonfires in a
						      long night") asks the reader to decode an image before they
						      know what they are reading. A first line has to orient.
						    - Meta narration ("steel is unknown") is a fact about the rules
						      wearing a costume.
						    - Negative framing ("there are no classes") defines the game
						      against an assumption the reader may not hold.
						    - Description without a hook. Long subordinate clauses read as
						      setting notes rather than an invitation.

						    Hence: name the game, then short declaratives with concrete
						    nouns, then what a session actually feels like. */}
						<p className={styles.standfirst}>
							Nexus RPG is sword and sorcery in an age of bronze. A few cities
							hold out. Past their walls the land is unruled, the ruins are
							older than memory, and the gods are awake and expect their due.
						</p>
						<p className={styles.standfirst}>
							Build your adventurer out of skills and the talents that grow from
							them, and be anyone you like.
						</p>
					</div>
				</header>

				{/* --- Where to start --------------------------------------------- */}
				<nav className={styles.thresholds} aria-label="Where to start">
					{THRESHOLDS.map((t) => (
						<Link key={t.href} to={t.href} className={styles.threshold}>
							<span className={styles.thresholdSigil} aria-hidden="true">
								<SigilIcon name={t.sigil} size={34} />
							</span>
							<Cartouche>{t.label}</Cartouche>
							<span className={styles.thresholdBlurb}>{t.blurb}</span>
						</Link>
					))}
				</nav>

				{/* --- Contents ---------------------------------------------------- */}
				<section className={styles.contents} aria-labelledby="contents-heading">
					<h2 className={styles.sectionHeading} id="contents-heading">
						<Cartouche glyph="book">Contents</Cartouche>
					</h2>
					<ol className={styles.indexList}>
						{CHAPTERS.map((c) => (
							<IndexRow key={c.href} entry={c} numeral={c.numeral} />
						))}
					</ol>

					<FriezeDivider compact />

					<h2 className={styles.sectionHeading} id="tools-heading">
						<Cartouche glyph="crossedtools">At the Table</Cartouche>
					</h2>
					<ul className={styles.indexList} aria-labelledby="tools-heading">
						{TOOLS.map((t) => (
							<IndexRow key={t.href} entry={t} />
						))}
					</ul>
				</section>

				{/* --- Colophon ----------------------------------------------------- */}
				<aside className={styles.colophon}>
					<h2 className={styles.colophonHeading}>
						<Cartouche glyph="hourglass">Still Being Written</Cartouche>
					</h2>
					<p>
						The rules are incomplete and everything here is subject to change.
					</p>
					<p>
						Nexus RPG is a single-person passion project, {years} years in the
						making. Only a small group of friends has played it regularly, so
						not every rule or character option has been thoroughly playtested.
					</p>
				</aside>
			</main>
		</Layout>
	)
}
