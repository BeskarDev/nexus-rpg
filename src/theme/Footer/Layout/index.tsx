import React from 'react'
import Layout from '@theme-original/Footer/Layout'
import type { Props } from '@theme/Footer/Layout'
import { SunDisc } from '@site/src/components/codex/ornaments'

/**
 * Wraps the default footer layout to seat a solar-disc crest at the head of the
 * footer band — the "key/divine position" the disc motif is reserved for, and
 * the closing mark of the page as a carved stone band.
 *
 * The crest is prepended to the `links` slot rather than the footer being
 * reimplemented, so the theme keeps ownership of the footer's structure.
 *
 * Deliberately the plain {@link SunDisc}, not the winged disc: the wings are the
 * spell card's primacy keystone, and repeating them site-wide would spend that
 * mark. The disc alone carries the same motif at a lower rank.
 */
export default function FooterLayout(props: Props): React.ReactNode {
	return (
		<Layout
			{...props}
			links={
				<>
					<div className="footer__crest" aria-hidden="true">
						<SunDisc size={30} />
					</div>
					{props.links}
				</>
			}
		/>
	)
}
