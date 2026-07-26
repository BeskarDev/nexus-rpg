import React from 'react'
import Layout from '@theme/Layout'
import SigilIcon from '@site/src/components/codex/SigilIcon'
import {
	SIGIL_INNER,
	type SigilName,
} from '@site/src/components/codex/sigil-paths'
import {
	CHAPTER_SIGIL,
	PAGE_SIGIL,
} from '@site/src/components/codex/page-sigils'

/**
 * Sigil review gallery (M10 S1) — every mark at every size it actually renders
 * at, on both the page and the card surface, plus the in-context strips that set
 * the floor: a sidebar row, a breadcrumb trail, an h1, a navbar item.
 *
 * Dev only. The set is reviewed by eye and the marks that matter most are the
 * 12–14px ones, which cannot be judged from a 32-unit path or a 40px card.
 *
 * Guarded twice: this component renders nothing outside `docusaurus start`, and
 * `/dev/**` is excluded from the sitemap in docusaurus.config.js. Styles are
 * inline on purpose — nothing about this page should reach the shipped CSS.
 */

/** Every size a sigil renders at somewhere on the site. */
const SIZES = [12, 14, 16, 20, 22, 34, 40] as const

const NAMES = Object.keys(SIGIL_INNER) as SigilName[]
const CHAPTER_MARKS = new Set(Object.values(CHAPTER_SIGIL))

/** How many docs point at each mark, so an unused or overused one is obvious. */
const USAGE = NAMES.reduce<Record<string, number>>((acc, name) => {
	acc[name] = Object.values(PAGE_SIGIL).filter((m) => m === name).length
	return acc
}, {})

const surface: React.CSSProperties = {
	background: 'var(--ifm-background-surface-color)',
	border: '1px solid var(--ifm-color-emphasis-300)',
	padding: '1rem',
}

function SizeRow({ name }: { name: SigilName }) {
	return (
		<tr>
			<th
				scope="row"
				style={{ textAlign: 'left', fontWeight: 400, whiteSpace: 'nowrap' }}
			>
				<code>{name}</code>
				{CHAPTER_MARKS.has(name) ? ' · chapter' : ''}
				{USAGE[name] ? ` · ${USAGE[name]} page(s)` : ' · unassigned'}
			</th>
			{SIZES.map((size) => (
				<td key={size} style={{ textAlign: 'center', verticalAlign: 'middle' }}>
					<SigilIcon name={name} size={size} />
				</td>
			))}
			<td style={{ ...surface, textAlign: 'center' }}>
				<SigilIcon name={name} size={14} />
				<SigilIcon name={name} size={22} />
				<SigilIcon name={name} size={40} />
			</td>
		</tr>
	)
}

export default function SigilGallery(): React.ReactNode {
	if (process.env.NODE_ENV !== 'development') return null

	return (
		<Layout title="Sigil gallery (dev)" noFooter>
			<main style={{ padding: '2rem', maxWidth: '100%' }}>
				<h1>Sigil gallery</h1>
				<p>
					{NAMES.length} marks. Dev only — this route renders nothing in a
					production build. Toggle the colour mode to review both themes.
				</p>

				<h2>In context</h2>
				<div
					style={{
						display: 'flex',
						gap: '2rem',
						flexWrap: 'wrap',
						marginBottom: '2rem',
					}}
				>
					<div style={surface}>
						<strong>Sidebar rows (14px)</strong>
						{NAMES.slice(0, 10).map((name) => (
							<div
								key={name}
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: '0.5rem',
									padding: '0.25rem 0',
								}}
							>
								<SigilIcon name={name} size={14} />
								<span>{name}</span>
							</div>
						))}
					</div>
					<div style={surface}>
						<strong>Breadcrumb trail (12px)</strong>
						<div
							style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
						>
							{NAMES.slice(0, 4).map((name) => (
								<React.Fragment key={name}>
									<SigilIcon name={name} size={12} />
									<span>{name}</span>
									<span aria-hidden>›</span>
								</React.Fragment>
							))}
						</div>
						<strong style={{ display: 'block', marginTop: '1rem' }}>
							Heading (1em)
						</strong>
						<h1 style={{ margin: 0 }}>
							<SigilIcon name="rune" className="heading-sigil" /> Chapter heading
						</h1>
					</div>
				</div>

				<h2>Size ladder</h2>
				<table>
					<thead>
						<tr>
							<th style={{ textAlign: 'left' }}>Mark</th>
							{SIZES.map((size) => (
								<th key={size}>{size}px</th>
							))}
							<th>On card surface</th>
						</tr>
					</thead>
					<tbody>
						{NAMES.map((name) => (
							<SizeRow key={name} name={name} />
						))}
					</tbody>
				</table>
			</main>
		</Layout>
	)
}
