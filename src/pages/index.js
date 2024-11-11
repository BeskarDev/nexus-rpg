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
	const { siteConfig } = useDocusaurusContext()
	const [items, setItems] = React.useState([])

	React.useEffect(() => {
		const navbarItems = Array.from(
			document.querySelectorAll('.navbar__item.navbar__link'),
		)
			.map((element) => ({ label: element.textContent, href: element.href }))
			.filter((element) => element.label !== 'GitHub')

		setItems(navbarItems)
	}, [])

	return (
		<Layout
			title="Home"
			description="Welcome to Nexus RPG. A sword and sorcery TTRPG with wide mechanical options set in a world inspired by real-world ancient cultures from across the earth.\n\nIn this game, you will play as a daring group of adventurers with individual skill sets. Choose freely from different skills, which each provide different sets of abilities, to craft your character."
		>
			<header
				className={clsx(styles.heroBanner)}
				style={{
					background: `no-repeat center/cover url(${require('@site/static/img/home-banner.png').default})`,
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
						The rules of this game are still incomplete and everything is subject to change!
					</p>
					<p>
						Nexus RPG is a single-person passion project and has been in developement for the last 5 years. As only a close group of friends has yet played this game regurily, not every rule or character option has had the chance to be thorouly playtested.
					</p>
				</div>
			</header>
		</Layout>
	)
}
