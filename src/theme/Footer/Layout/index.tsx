import React from 'react'
import Layout from '@theme-original/Footer/Layout'
import type { Props } from '@theme/Footer/Layout'
import { SunDisc } from '@site/src/components/codex/ornaments'

/**
 * Wraps the default footer layout to seat a solar-disc crest as the footer's
 * colophon mark: the disc inline with the wordmark, immediately above the
 * provenance block.
 *
 * It used to be a standalone 30px disc in its own centred band at the head of
 * the `links` slot, back when the footer had no links at all — which made it the
 * only thing in the footer and left it reading as an ornament occupying space
 * rather than marking anything. Seating it in the `logo` slot puts it where a
 * printed colophon puts the press mark: beside the name it belongs to, above the
 * licence and attribution.
 *
 * `props.logo` is deliberately discarded. `themeConfig.footer.logo` would render
 * the raster site logo in this slot instead, which is not the codex mark.
 *
 * Deliberately the plain {@link SunDisc}, not the winged disc: the wings are the
 * spell card's primacy keystone, and repeating them site-wide would spend that
 * mark. The disc alone carries the same motif at a lower rank.
 */
export default function FooterLayout(props: Props): React.ReactNode {
	return (
		<Layout
			{...props}
			logo={
				<div className="footer__crest">
					<span aria-hidden="true">
						<SunDisc size={22} />
					</span>
					<span className="footer__wordmark">Nexus RPG</span>
				</div>
			}
		/>
	)
}
