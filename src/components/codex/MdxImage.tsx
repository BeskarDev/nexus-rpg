import React from 'react'
import MDXImg from '@theme/MDXComponents/Img'
import ImagePlate from './ImagePlate'
import type { PlateWeight } from './ornaments'

/**
 * Alt-marker to plate weight. The markers already exist in the content — 46
 * `banner-img` uses across 41 files and 12 `folk-img` — which is what lets the
 * whole rollout happen by registration, with no markdown edited.
 */
const MARKER_WEIGHT: Record<string, PlateWeight> = {
	'banner-img': 'banner',
	'folk-img': 'inline',
	'figure-img': 'figure',
}

/** `![folk-img|A dwarf smith](./img/dwarf.jpeg)` — marker, then the real alt.
 *  Everything after the first `|` is the authored description. Filename
 *  derivation was considered and rejected: `lionfolk.jpeg` illustrates the folk
 *  named Catfolk, so a derived alt is wrong on the first case checked. */
export function parseImageAlt(raw: string | undefined): {
	weight: PlateWeight | undefined
	alt: string
} {
	const [marker, ...rest] = (raw ?? '').split('|')
	return {
		weight: MARKER_WEIGHT[marker.trim()],
		alt: rest.join('|').trim(),
	}
}

export interface MdxImageProps extends React.ComponentProps<'img'> {
	src?: string
}

/**
 * The `img` intrinsic replacement (registered in `src/theme/MDXComponents.tsx`).
 *
 * Reads the alt marker, maps it to a plate weight, and **strips the marker** so
 * it never reaches the DOM — the markers were only ever CSS hooks, and
 * `alt="banner-img"` read aloud by a screen reader is noise.
 *
 * An unrecognised alt falls through to Docusaurus's own `MDXImg` untouched, so
 * a future image that wants no frame just omits the marker, and nothing about
 * this component is a decision an author has to opt out of.
 */
export default function MdxImage(props: MdxImageProps): React.ReactNode {
	const { alt: raw, src, ...rest } = props
	const { weight, alt } = parseImageAlt(raw)

	if (!weight || typeof src !== 'string') {
		return <MDXImg {...props} />
	}

	return (
		<ImagePlate
			src={src}
			// Banners are decorative mood art with nothing to describe, so they
			// emit `alt=""` unless a call site authored something. `parseImageAlt`
			// already returns "" when no description follows the marker.
			alt={alt}
			weight={weight}
			className={typeof rest.className === 'string' ? rest.className : undefined}
		/>
	)
}
