import React from 'react'
import clsx from 'clsx'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import homeBanner from '@site/static/img/banner/home-banner.png'
import { ChapterCard } from '@site/src/components/codex'

import styles from './index.module.css'

/**
 * Static chapter list — one entry per navbar chapter, in navbar order. This
 * replaces the old runtime `.navbar` DOM scraping (fragile, and it inherited the
 * emoji labels). Hrefs mirror the docSidebar landing pages the navbar resolves
 * to; each sigil is the chapter's mark from the shared SigilIcon set, so navbar,
 * these cards, and the docs chapter markers all carry one identity. If a
 * chapter's landing doc moves, update the href here.
 */
const CHAPTERS = [
	{ label: 'Basic Rules', href: '/docs/basic-rules/how-to-roll', sigil: 'sun' },
	{ label: 'Adventurers', href: '/docs/adventurers/folk', sigil: 'ziggurat' },
	{ label: 'Statistics', href: '/docs/statistics/attributes', sigil: 'tablet' },
	{ label: 'Equipment', href: '/docs/equipment/items', sigil: 'anvil' },
	{ label: 'Combat', href: '/docs/combat/combat-scenes', sigil: 'blades' },
	{
		label: 'Scenes',
		href: '/docs/scenes/scenes-time-intervals',
		sigil: 'hourglass',
	},
	{ label: 'Magic', href: '/docs/magic/magic-spells/', sigil: 'rune' },
	{
		label: 'Creatures',
		href: '/docs/creatures/mounts-companions/',
		sigil: 'serpent',
	},
	{ label: 'GM Tools', href: '/docs/gm-tools/index', sigil: 'key' },
	{
		label: 'Character Sheet',
		href: '/docs/character-sheet/character-sheet',
		sigil: 'scroll',
	},
]

export default function Home() {
	// Calculate number of years since 1.1.2020, rounded up
	function getProjectYears() {
		const startDate = new Date(2020, 0, 1) // Jan 1, 2020
		const now = new Date()
		const diffMs = now - startDate
		const diffYears = diffMs / (1000 * 60 * 60 * 24 * 365.2425)
		return Math.ceil(diffYears)
	}
	const { siteConfig } = useDocusaurusContext()

	return (
		<Layout
			title="Home"
			description="Welcome to Nexus RPG. A sword and sorcery TTRPG with wide mechanical options set in a world inspired by real-world ancient cultures from across the earth.\n\nIn this game, you will play as a daring group of adventurers with individual skill sets. Choose freely from different skills, which each provide different sets of abilities, to craft your character."
		>
			<header
				className={clsx(styles.heroBanner)}
				style={{
					background: `no-repeat center/cover url(${homeBanner})`,
				}}
			>
				<div className={clsx(styles.heroContainer)}>
					<h1 className="hero__title">{siteConfig.title}</h1>
					<p className="hero__subtitle">{siteConfig.tagline}</p>
				</div>
				<h2 className={clsx(styles.chaptersHeading)}>Chapters</h2>
				<main className={clsx(styles.cardGrid)}>
					{CHAPTERS.map((chapter) => (
						<ChapterCard key={chapter.href} {...chapter} />
					))}
				</main>
				<aside className={clsx(styles.contentContainer)}>
					<div className={styles.disclaimerHeading}>
						<WarningAmberIcon />
						<h3>Disclaimer</h3>
					</div>
					<p>
						The rules of this game are still incomplete and everything is
						subject to change!
					</p>
					<p>
						Nexus RPG is a single-person passion project and has been in
						development for the last {getProjectYears()} years. As only a close
						group of friends has yet played this game regularly, not every rule
						or character option has had the chance to be thoroughly playtested.
					</p>
				</aside>
			</header>
		</Layout>
	)
}
