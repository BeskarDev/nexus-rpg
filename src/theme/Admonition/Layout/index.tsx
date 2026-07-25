import React from 'react'
import clsx from 'clsx'
import Layout from '@theme-original/Admonition/Layout'
import type { Props } from '@theme/Admonition/Layout'
import SigilIcon from '@site/src/components/codex/SigilIcon'
import type { SigilName } from '@site/src/components/codex/sigil-paths'

/**
 * Wraps the default admonition layout so every `:::note/tip/info/warning/danger`
 * renders as a carved-stone callout with no per-page work: the theme's stock
 * Material icon is swapped for the codex sigil of that type, and stable class
 * hooks (`codex-admonition`, `…__title`) are added for the frame / title-band
 * styling in custom.css.
 *
 * Wrap, not eject: the container, heading and content structure stay the
 * theme's own, so Docusaurus upgrades keep working.
 *
 * Colour does focused work here — note/tip/info all stay bronze and are told
 * apart by their SIGIL and label, while only the two alarm types (warning,
 * danger) take a hue, so the reading column never carries a block of saturated
 * colour.
 */

/**
 * One sigil per admonition type. Each states what the callout actually is: an
 * inscribed tablet for a recorded note, a flame for an insight, a book for
 * reference detail, the watchful eye for a warning, crossed blades for real
 * danger.
 *
 * The marks have to be distinguishable at ~22px, which ruled out two of the
 * first picks: `scroll` for info was a second small rectangle beside note's
 * tablet, and `fang` collapsed into a pair of vertical strokes.
 */
const TYPE_SIGILS: Record<string, SigilName> = {
	note: 'tablet',
	tip: 'spark',
	info: 'book',
	warning: 'eye',
	caution: 'eye',
	danger: 'blades',
}

export default function AdmonitionLayout(props: Props): React.ReactNode {
	const sigil = TYPE_SIGILS[props.type]
	const icon = sigil ? (
		<SigilIcon name={sigil} size={22} className="codex-admonition__sigil" />
	) : (
		props.icon
	)
	return (
		<Layout
			{...props}
			className={clsx('codex-admonition', props.className)}
			icon={icon}
			title={
				props.title ? (
					<span className="codex-admonition__title">{props.title}</span>
				) : (
					props.title
				)
			}
		/>
	)
}
