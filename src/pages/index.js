import React from 'react'
import clsx from 'clsx'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'

import styles from './index.module.css'

function Card({ label, href }) {
	return (
		<a href={href} className={clsx(styles.card)}>
			<h2>{label}</h2>
		</a>
	)
}

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
	const [items, setItems] = React.useState([])

	React.useEffect(() => {
		const navbarElements = Array.from(
			document.querySelectorAll('.navbar__item.navbar__link'),
		)
			// Filter out GitHub link by its className
			.filter((element) => !element.classList.contains('navbar-github-link'))
			.map((element) => {
				let label = element.textContent
				const href = element.href
				// If the label is empty or only emoji, set it based on href
				const isIconOnly = !label || /^[^\w]*$/.test(label.trim())
				if (isIconOnly) {
					if (/\/docs\/(gm-tools|10-gm-tools)\//.test(href) || /\/docs\/gm-tools(\/|$)/.test(href)) {
						label = '⚙️ GM Tools'
					} else if (/\/docs\/(character-sheet|11-character-sheet)\//.test(href) || /\/docs\/character-sheet(\/|$)/.test(href)) {
						label = '📜 Character Sheet'
					}
				}
				return { label, href }
			})
		setItems(navbarElements)
	}, [])

	return (
		<Layout
			title="Home"
			description="Welcome to Nexus RPG. A sword and sorcery TTRPG with wide mechanical options set in a world inspired by real-world ancient cultures from across the earth.\n\nIn this game, you will play as a daring group of adventurers with individual skill sets. Choose freely from different skills, which each provide different sets of abilities, to craft your character."
		>
			<header
				className={clsx(styles.heroBanner)}
				style={{
					background: `no-repeat center/cover url(${require('@site/static/img/banner/home-banner.png').default})`,
				}}
			>
				<div className={clsx(styles.heroContainer)}>
					<h1 className="hero__title">{siteConfig.title}</h1>
					<p className="hero__subtitle">{siteConfig.tagline}</p>
				</div>
				<h2
					style={{
						marginTop: '3rem',
						padding: '1rem',
						backgroundColor: 'rgba(0,0,0,0.5)',
						borderRadius: '8px',
						color: 'white',
						maxWidth: '1400px',
						marginInline: 'auto',
					}}
				>
					Chapters
				</h2>
				<main
					style={{
						display: 'flex',
						flexWrap: 'wrap',
						gap: '1rem',
						maxWidth: '1400px',
						marginInline: 'auto',
					}}
				>
					{items.map((item, index) => (
						<Card key={index} {...item} />
					))}
				</main>
				<div className={clsx(styles.contentContainer)}>
					<div style={{ paddingTop: '0.5rem', display: 'flex', gap: '0.5rem' }}>
						<WarningAmberIcon />
						<h3>Disclaimer</h3>
					</div>
					<p>
						The rules of this game are still incomplete and everything is
						subject to change!
					</p>
					<p>
							Nexus RPG is a single-person passion project and has been in
							developement for the last {getProjectYears()} years. As only a close group of friends
						has yet played this game regurily, not every rule or character
						option has had the chance to be thorouly playtested.
					</p>
				</div>
			</header>
		</Layout>
	)
}
