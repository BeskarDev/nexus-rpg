import React from 'react'
import { PlateShell, type PlateWeight } from './ornaments'
import styles from './ImagePlate.module.css'

/** Native dimensions per weight, for reserving the box before the file lands.
 *  Both are dimensionally uniform across the whole site — every banner is
 *  1584x672 and every folk portrait is 1024 square — so one pair of numbers per
 *  weight is not an assumption, it is the inventory. A `figure` has no known
 *  size and reserves nothing.
 *
 *  A banner's native ratio is 2.36:1 and it is DISPLAYED at 4:1, which the
 *  `.img-banner` `aspect-ratio` supplies; these attributes describe the file and
 *  serve the no-CSS case, where showing the whole picture is the right fallback. */
const NATIVE: Partial<Record<PlateWeight, { width: number; height: number }>> = {
	banner: { width: 1584, height: 672 },
	inline: { width: 1024, height: 1024 },
}

export interface ImagePlateProps {
	src: string
	/** Empty string marks the image decorative, which also sets
	 *  `role="presentation"`. Never omit it — an absent `alt` is not the same
	 *  claim as an empty one. */
	alt: string
	weight: PlateWeight
	className?: string
	/** See `PlateShell` — `span` for anything rendered from MDX. */
	as?: 'figure' | 'div' | 'span'
	caption?: React.ReactNode
	/**
	 * Crop the artwork to a ratio it does not natively have (the homepage hero
	 * is native 2.40:1 shown at 3:1). Switches the picture to `object-fit:
	 * cover` — the same code path as every other plate, still a real `<img>`
	 * with real `alt`, not a `background-image` div.
	 *
	 * The RATIO itself comes from `imgClassName`, not from here, so that a page
	 * can make it responsive. An inline `aspect-ratio` would win against any
	 * media query the page could write.
	 */
	crop?: boolean
	/**
	 * `object-position` for a plate whose picture is larger than its box, e.g.
	 * `'center 62%'`.
	 *
	 * Independent of `crop`. Banners are natively 2.36:1 shown at 4:1, so a
	 * banner is cropped by its weight's `aspect-ratio` and needs positioning
	 * without ever setting `crop` — which exists to override a ratio, not to
	 * turn cropping on. Tying the two together would have meant every banner
	 * passing `crop` and then re-supplying the ratio it already had.
	 */
	cropPosition?: string
	/** Extra class on the `<img>`. The escape hatch for art direction that
	 *  belongs to a page rather than to a weight: the hero's crop ratio, which
	 *  tightens on narrow screens. */
	imgClassName?: string
}

/**
 * An image inside its carved plate: the frame at the weight the placement calls
 * for, the artwork inlaid behind the well's keyline.
 *
 * Construction and silhouette are NOT props. D2 and D4 were settled at review
 * (`frieze` / `mitred`) and the alternatives stay reachable only through
 * `PlateShell` for the dev gallery — a call site that could pick `rails` per
 * image is a way for the site to end up with two frame vocabularies.
 */
export default function ImagePlate({
	src,
	alt,
	weight,
	className,
	as = 'span',
	caption,
	crop,
	cropPosition,
	imgClassName,
}: ImagePlateProps): React.ReactNode {
	// A cropped plate takes its ratio from the crop, not from the file, so the
	// native dimensions would fight it.
	const native = crop ? undefined : NATIVE[weight]
	return (
		<PlateShell
			weight={weight}
			as={as}
			caption={caption}
			className={
				`${styles[`plate-${weight}`] ?? ''}` + (className ? ' ' + className : '')
			}
		>
			<img
				src={src}
				alt={alt}
				{...(alt === '' ? { role: 'presentation' } : null)}
				// A STABLE hook for selectors outside this component — the zoom
				// plugin's `zoom.selector` in docusaurus.config.js keys off it (D5).
				// It cannot use the class names: CSS-module names are hashed at
				// build time, so a selector written against one would work in dev
				// and silently match nothing in production.
				data-plate-weight={weight}
				className={
					`${styles.plateImg} ` +
					(crop ? styles.imgCropped : (styles[`img-${weight}`] ?? '')) +
					(imgClassName ? ' ' + imgClassName : '')
				}
				style={cropPosition ? { objectPosition: cropPosition } : undefined}
				width={native?.width}
				height={native?.height}
				decoding="async"
				loading="lazy"
			/>
		</PlateShell>
	)
}
