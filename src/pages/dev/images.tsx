import React from 'react'
import Layout from '@theme/Layout'
import {
	PlateShell,
	RosetteMark,
	Cartouche,
	type PlateWeight,
	type PlateConstruction,
	type PlateSilhouette,
} from '@site/src/components/codex'
// A real banner (2000x496) and a real folk portrait (square) — the two shapes
// the whole site actually contains. Imported through webpack so the URLs come
// back already base-url-correct, without a hook at module scope.
import PORTRAIT from '@site/docs/02-adventurers/img/dwarf.jpeg'
import BANNER from '@site/static/img/banner/attributes-banner.png'

/**
 * Image-plate review gallery (M11 S1 task 5) — the screen D1, D2 and D4 get
 * answered from.
 *
 * D1 (motif), D2 (frieze runs vs. extended corner rails) and D4 (rectangular vs.
 * mitred surround) all change the DRAWN result, so none of them can be settled
 * from a spec table. This page puts every combination against real artwork at
 * the sizes it actually ships at: all four weights, both constructions, both
 * silhouettes, at full width and inside a 430px column.
 *
 * Dev only, same guard as `/dev/sigils`: this component renders nothing outside
 * `docusaurus start`, and `/dev/**` is excluded from the sitemap and the
 * production build in docusaurus.config.js. Styles are inline on purpose —
 * nothing about this page should reach the shipped CSS.
 */

const WEIGHTS: PlateWeight[] = ['frontispiece', 'banner', 'inline', 'figure']
const CONSTRUCTIONS: PlateConstruction[] = ['frieze', 'rails']
const SILHOUETTES: PlateSilhouette[] = ['mitred', 'rect']

const label: React.CSSProperties = {
	fontFamily: 'var(--nexus-font-ui)',
	fontSize: 'var(--nexus-text-xs)',
	letterSpacing: '0.06em',
	textTransform: 'uppercase',
	opacity: 0.7,
	marginBottom: '0.5rem',
}

/** One plate, captioned with the exact prop triple that drew it. */
function Specimen({
	src,
	weight,
	construction,
	silhouette,
	width,
}: {
	src: string
	weight: PlateWeight
	construction: PlateConstruction
	silhouette: PlateSilhouette
	width: number | string
}) {
	return (
		<div style={{ width, maxWidth: '100%' }}>
			<div style={label}>
				{weight} · {construction} · {silhouette}
			</div>
			<PlateShell
				weight={weight}
				construction={construction}
				silhouette={silhouette}
				caption={
					weight === 'figure' ? (
						<Cartouche compact>Figure 1</Cartouche>
					) : undefined
				}
			>
				<img src={src} alt="" />
			</PlateShell>
		</div>
	)
}

export default function ImagePlateGallery(): React.ReactNode {
	if (process.env.NODE_ENV !== 'development') return null

	return (
		<Layout title="Image plate gallery (dev)" noFooter>
			<main style={{ padding: '2rem 1.5rem 6rem', maxWidth: '100%' }}>
				<h1>Image plate gallery</h1>
				<p>
					Dev only — this route renders nothing in a production build. Toggle
					the colour mode to review both themes. Every plate below is captioned
					with the exact <code>weight · construction · silhouette</code> that
					drew it.
				</p>

				<h2>The mark alone</h2>
				<p>
					The rosette at each keystone size, and with the inter-petal spurs off
					(which is the inline redraw). Radial symmetry is the load-bearing
					property: the same mark sits on the bottom edge of a frontispiece
					without being upside down.
				</p>
				<div
					style={{
						display: 'flex',
						gap: '2rem',
						alignItems: 'center',
						flexWrap: 'wrap',
						padding: '1.5rem',
						background: 'var(--ifm-background-surface-color)',
						marginBottom: '2.5rem',
					}}
				>
					<RosetteMark size={52} />
					<RosetteMark size={38} />
					<RosetteMark size={26} />
					<RosetteMark size={26} detail={false} />
					<RosetteMark size={16} detail={false} />
				</div>

				<h2>D2 × D4 — the four combinations, at banner width</h2>
				<p>
					<strong>Settled 2026-07-27: banner · frieze · mitred.</strong> The
					other three stay rendered here as the comparison that decided it — (a){' '}
					<code>rails</code> is the existing <code>CardFrame</code> vocabulary
					at plate scale and remains a selectable fallback, but it ships
					nowhere.
				</p>
				{CONSTRUCTIONS.map((construction) => (
					<div key={construction} style={{ marginBottom: '2rem' }}>
						{SILHOUETTES.map((silhouette) => (
							<div key={silhouette} style={{ marginBottom: '2rem' }}>
								<Specimen
									src={BANNER}
									weight="banner"
									construction={construction}
									silhouette={silhouette}
									width="100%"
								/>
							</div>
						))}
					</div>
				))}

				<h2>The four weights</h2>
				<p>
					Frontispiece and banner take the 4.03:1 banner art; inline and figure
					take a square portrait at its real 300px inline size.
				</p>
				{WEIGHTS.map((weight) => (
					<div key={weight} style={{ marginBottom: '2.5rem' }}>
						<Specimen
							src={weight === 'inline' ? PORTRAIT : BANNER}
							weight={weight}
							construction="frieze"
							silhouette="mitred"
							width={weight === 'inline' ? 300 : '100%'}
						/>
					</div>
				))}

				<h2>At 430px</h2>
				<p>
					The narrow check, and the one that failed review: at this width the
					frontispiece&apos;s 28px surround and 52px rosette were eating a plate
					whose picture is only ~93px tall. Below a 640px <em>plate</em> width
					(a container query, not a viewport one) the frontispiece now steps
					down to the banner geometry — same corner and same rosette, drawn at
					the size that reads at this span. Compare the frontispiece below
					against the full-width one above: it should now differ from the banner
					beside it only by its second keystone.
				</p>
				<div
					style={{
						width: 430,
						maxWidth: '100%',
						padding: '1rem',
						outline: '1px dashed var(--ifm-color-emphasis-300)',
						display: 'flex',
						flexDirection: 'column',
						gap: '2rem',
					}}
				>
					{WEIGHTS.map((weight) => (
						<Specimen
							key={weight}
							src={weight === 'inline' ? PORTRAIT : BANNER}
							weight={weight}
							construction="frieze"
							silhouette="mitred"
							width="100%"
						/>
					))}
				</div>
			</main>
		</Layout>
	)
}
