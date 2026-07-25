import React from 'react'
import SigilIcon, { SigilName } from './SigilIcon'
import styles from './ornaments.module.css'

/**
 * Reusable Bronze-Age ornament kit. Shape language: diamonds (lozenges) and
 * triangles (chevrons), struck in bronze. Used by SpellCodexCard now, but
 * generic so any doc container can frame itself, and so `LozengeDivider` can
 * stand in for the default `---` thematic break (wired in `@theme/MDXComponents`).
 * All stroke/fill `currentColor` (bronze token); tint in both themes. Decorative.
 */

const CORNERS = ['tl', 'tr', 'br', 'bl'] as const

/**
 * Corona rays for the winged sun disc, as tapered triangles around the disc rim.
 *
 * Upper arc only, and deliberately so: rays out to the sides would land inside
 * the wing roots (both are bronze, so they would merge into a blob rather than
 * read as rays), and rays below would hang down into the card's name row. The
 * surviving arc reads as a rising sun, which is the right note anyway.
 */
const SUN_RAYS = (() => {
	const cx = 60
	const cy = 18
	const pt = (r: number, deg: number) => {
		const a = (deg * Math.PI) / 180
		return `${(cx + r * Math.cos(a)).toFixed(2)} ${(cy + r * Math.sin(a)).toFixed(2)}`
	}
	const rays: string[] = []
	// -145°..-35° keeps every ray clear of the wing leading edge. Rays alternate
	// long/short for a richer corona, and reach roughly twice the disc radius —
	// anything shorter reads as a tuft of hair rather than a sunburst. They start
	// inside the disc radius so the disc, drawn after, hides their feet.
	for (let i = 0; i < 9; i++) {
		const deg = -145 + i * 13.75
		rays.push(`M${pt(7.4, deg - 3.8)} L${pt(i % 2 === 0 ? 14.5 : 11.5, deg)} L${pt(7.4, deg + 3.8)} Z`)
	}
	return rays
})()

/** Card families, keyed by their keystone. Corners follow the same motif. */
export type CodexVariant = 'winged' | 'serpent' | 'khopesh' | 'ziggurat' | 'bull'

const SURFACE = 'var(--ifm-background-surface-color)'

/**
 * Rail reach, in viewBox units, per card family and axis.
 *
 * The two axes are constrained by completely different things, so they get
 * different reaches. A card's width is effectively unbounded, so the top rail
 * can run long. Its height is not: the top and bottom corners both reach down
 * the same side, so two side rails plus a comfortable gap must fit inside the
 * family's SHORTEST card or they meet in the middle and read as one continuous
 * line. Sized to leave at least ~38% of that shortest card as gap.
 *
 * Measured shortest cards: spells 317px, combat arts 147px, conditions 85px, all
 * on a 76px corner box (≈0.79px per unit). Talents reuse the spell/khopesh
 * reaches: the shortest talent still carries a name row, a divider and at least
 * two rank rungs, so it is bounded well above the 147px combat-art case that
 * those reaches were already validated against. Not independently measured.
 *
 * Asymmetric reach only works because every terminal — spear blade, triangle
 * band, tail wave period — is FIXED size, independent of `len`; only the shaft
 * between the boss and the terminal stretches. When the terminals scaled with
 * the rail instead, the short side rail read as a shrunken copy of the top one
 * and the corner looked broken.
 */
const RAIL_LEN: Record<CodexVariant, { edge: number; side: number }> = {
	winged: { edge: 92, side: 55 },
	khopesh: { edge: 92, side: 55 },
	ziggurat: { edge: 92, side: 55 },
	bull: { edge: 92, side: 55 },
	serpent: { edge: 88, side: 43 },
}

const n = (v: number) => v.toFixed(2)

/**
 * One edge rail of a corner mark, drawn along the +x edge on the border line
 * (y=6) and reaching to `len`. The corner renders it twice — once along the top
 * edge, once mirrored across y=x down the side — so each rail is authored once.
 *
 * Geometry is parametric in `len` rather than hard-coded, so the shorter side
 * rail keeps the same proportions instead of clipping its own detail (fixed
 * triangle positions fall outside a shortened tapering rail).
 *
 * Every variant is a long, low form hugging the frame edge — detail stays on the
 * rail and never projects inward into the content panel. What changes is the
 * motif, so a card's corners echo its keystone.
 */
function CornerRail({ variant, len }: { variant: CodexVariant; len: number }) {
	if (variant === 'khopesh') {
		// Martial: a socketed spear — bound haft, collar, then a leaf blade. The
		// blade is a lanceolate leaf with a carved midrib, NOT a plain triangle:
		// a triangle reads as a generic arrowhead and loses the weapon entirely.
		// Long and narrow (~3:1). A stubbier blade reads as an almond, not a point.
		// Fixed size: only the haft stretches, so the long top rail and the short
		// side rail carry the identical head instead of two scaled copies.
		const blade = 15
		const b = len - blade
		const halfW = 2.275
		const x = (f: number) => b + blade * f
		// Half-width profile along the blade: swells to full width a third of the
		// way up, then converges to the point. `k` is the fraction of full width.
		const up = (k: number) => 6 - halfW * k
		const dn = (k: number) => 6 + halfW * k
		const haftEnd = b - 1.4
		return (
			<>
				<path
					d={`M13 5.1 L${n(haftEnd)} 5.1 M13 6.9 L${n(haftEnd)} 6.9`}
					strokeWidth={0.85}
				/>
				{/* binding near the butt, then the socket collar under the blade */}
				<path d="M18.5 4.3 L18.5 7.7 M22.5 4.3 L22.5 7.7" strokeWidth={0.8} />
				<path d={`M${n(haftEnd)} 4.5 L${n(haftEnd)} 7.5`} strokeWidth={0.9} />
				<path
					d={
						`M${n(b)} 6 ` +
						`C${n(x(0.1))} ${n(up(0.72))} ${n(x(0.24))} ${n(up(1))} ${n(x(0.45))} ${n(up(0.86))} ` +
						`C${n(x(0.68))} ${n(up(0.6))} ${n(x(0.86))} ${n(up(0.32))} ${n(x(1))} 6 ` +
						`C${n(x(0.86))} ${n(dn(0.32))} ${n(x(0.68))} ${n(dn(0.6))} ${n(x(0.45))} ${n(dn(0.86))} ` +
						`C${n(x(0.24))} ${n(dn(1))} ${n(x(0.1))} ${n(dn(0.72))} ${n(b)} 6 Z`
					}
					fill="currentColor"
					stroke="none"
				/>
				{/* midrib, carved out of the solid blade */}
				<path
					d={`M${n(x(0.18))} 6 L${n(x(0.62))} 6`}
					stroke={SURFACE}
					strokeWidth={0.45}
				/>
			</>
		)
	}
	if (variant === 'ziggurat') {
		// Architectural: a low plinth course running the edge, ending in a stepped
		// terminal — the ziggurat keystone's profile laid on its side. The steps
		// DESCEND outward so the rail still tapers to a thin tip like its siblings;
		// an ascending stair ended blunt and read as a broken-off fragment.
		//
		// The terminal is a FIXED 15 units (per the rail-length note): only the
		// plinth stretches, so the long top rail and the short side rail carry the
		// identical stair instead of two scaled copies.
		const TERMINAL = 15
		const b = len - TERMINAL
		// Course heights step down 3 → 2 → 1 units above the border line. All growth
		// is upward (−y): the top rail's detail must never project down into the
		// content panel.
		const steps: [number, number, number][] = [
			[b, b + 5, 3.2],
			[b + 5, b + 10, 2.2],
			[b + 10, b + TERMINAL, 1.2],
		]
		return (
			<>
				{/* plinth: a solid low course, thicker than a stroke so the rail reads as
				    masonry rather than a line */}
				<path
					d={`M13 5.2 L${n(b)} 5.2 L${n(b)} 6.8 L13 6.8 Z`}
					fill="currentColor"
					stroke="none"
				/>
				{/* two pilaster ticks near the butt — the rhythm the keystone's flanking
				    courses use, so corner and keystone read as one order */}
				<path d="M18 4.2 L18 7.8 M22.5 4.2 L22.5 7.8" strokeWidth={0.8} />
				<g fill="currentColor" stroke="none">
					{steps.map(([xa, xb, h]) => (
						<path key={xa} d={`M${n(xa)} ${n(6.8 - h)} L${n(xb)} ${n(6.8 - h)} L${n(xb)} 6.8 L${n(xa)} 6.8 Z`} />
					))}
				</g>
				{/* carved coping: a surface-colour line under each course top, so the
				    stepped mass stays legible instead of fusing into one wedge */}
				<g stroke={SURFACE} strokeWidth={0.45}>
					{steps.map(([xa, xb, h]) => (
						<path key={xa} d={`M${n(xa + 0.8)} ${n(6.8 - h + 0.75)} L${n(xb - 0.8)} ${n(6.8 - h + 0.75)}`} />
					))}
				</g>
			</>
		)
	}
	if (variant === 'bull') {
		// Bestial: a low plinth ending in a fixed-size horn — the bull keystone's
		// crescent laid along the edge. Same two-part construction as its siblings
		// (fixed terminal, variable shaft) so the long top rail and the short side
		// rail carry the identical horn.
		const HORN = 17
		const b = len - HORN
		const tip = len
		return (
			<>
				<path
					d={`M13 5.3 L${n(b)} 5.3 L${n(b)} 6.7 L13 6.7 Z`}
					fill="currentColor"
					stroke="none"
				/>
				{/* two collar ticks, the rhythm the other rails use near the butt */}
				<path d="M18 4.3 L18 7.7 M22.5 4.3 L22.5 7.7" strokeWidth={0.8} />
				{/* the horn: a solid crescent sweeping up off the edge line to a point.
				    Struck solid rather than outlined — an outline at this width reads as
				    wire (the serpent-body finding). */}
				<path
					d={
						`M${n(b)} 7.4 ` +
						`C${n(b + 7)} 7.6 ${n(tip - 3.4)} 5.4 ${n(tip)} 1.6 ` +
						`C${n(tip - 2.2)} 5.2 ${n(b + 8)} 5.6 ${n(b)} 4.6 Z`
					}
					fill="currentColor"
					stroke="none"
				/>
				{/* a carved growth ring, stopping short of the silhouette so it does not
				    segment the horn */}
				<path
					d={`M${n(b + 4.5)} 5.0 L${n(b + 4.5)} 7.0`}
					stroke={SURFACE}
					strokeWidth={0.45}
				/>
			</>
		)
	}
	if (variant === 'serpent') {
		// A serpent's tail running the edge: a solid body that tapers to a point,
		// not a uniform stroke. Carries no scale ticks on purpose — the body is
		// barely a couple of pixels wide, and carving it turns the tail into a
		// dashed line instead of a snake.
		//
		// The wave has a FIXED period, so a longer rail grows more undulations
		// rather than stretching the same two. That is what lets the long top rail
		// and the short side rail read as the same creature. Amplitude is kept
		// shallow so the body stays over the border line instead of weaving off it
		// and leaving the border visibly broken.
		const x0 = 13.5
		const amp = 1.25
		const period = 24
		const halfT = 1.5
		const steps = Math.max(14, Math.round((len - x0) / 2))
		const centre = (x: number) => 6 + amp * Math.sin((2 * Math.PI * (x - x0)) / period)
		// Taper over a fixed run-out from the tip, not a fraction of total length,
		// so the pointed end is identical on the long and short rails and the body
		// stays at full thickness for as long as the rail allows.
		const runOut = 18
		const thick = (x: number) => halfT * Math.min(1, (len - x) / runOut)
		const top: string[] = []
		const bottom: string[] = []
		for (let i = 0; i <= steps; i++) {
			const x = x0 + ((len - x0) * i) / steps
			top.push(`${n(x)} ${n(centre(x) - thick(x))}`)
			bottom.push(`${n(x)} ${n(centre(x) + thick(x))}`)
		}
		return (
			<path
				d={`M${top.join(' L')} L${bottom.reverse().join(' L')} Z`}
				fill="currentColor"
				stroke="none"
			/>
		)
	}
	// Solar: the hollow spearhead rail, carrying the winged disc's triangle band.
	//
	// The rail is built in two sections rather than as one triangle tapering to a
	// point. A pure taper couples length to internal proportion — shorten it and
	// the whole profile steepens, squashing the triangle band — so the first
	// stretch (13→40) has a FIXED taper and carries the band at a fixed size, and
	// only the tail beyond it stretches out to `len`.
	const HEAD_END = 40
	const HEAD_HALF = 1.1
	const halfH = (x: number) =>
		x <= HEAD_END
			? 2.4 - (2.4 - HEAD_HALF) * ((x - 13) / (HEAD_END - 13))
			: HEAD_HALF * (1 - (x - HEAD_END) / (len - HEAD_END))
	const bands: [number, number][] = [
		[16.5, 22.5],
		[24.5, 30.5],
		[32.5, 38.5],
	]
	return (
		<>
			<path
				d={
					`M13 3.6 L${n(HEAD_END)} ${n(6 - HEAD_HALF)} L${n(len)} 6 ` +
					`L${n(HEAD_END)} ${n(6 + HEAD_HALF)} L13 8.4 Z`
				}
				strokeWidth={0.9}
			/>
			<g fill="currentColor" stroke="none">
				{bands.map(([xa, xb]) => {
					const xm = (xa + xb) / 2
					return (
						<path
							key={xa}
							d={
								`M${n(xa)} ${n(6 + halfH(xa) - 0.25)} ` +
								`L${n(xb)} ${n(6 + halfH(xb) - 0.25)} ` +
								`L${n(xm)} ${n(6 - 0.375 * halfH(xm))} Z`
							}
						/>
					)
				})}
			</g>
		</>
	)
}

/**
 * A corner mark: a hollow diamond boss at the vertex with a long rail reaching
 * along each frame edge. The boss is identical across variants — it is the shared
 * anchor that keeps the card family reading as one kit — while the rails carry a
 * per-family motif (see {@link CornerRail}).
 *
 * An opaque surface backing keeps the frame border from crossing the boss.
 */
function Corner({ pos, variant }: { pos: (typeof CORNERS)[number]; variant: CodexVariant }) {
	// Corners are oriented with CSS `rotate()`, and at 90°/270° (tr, bl) that turns
	// the SVG's +x axis into the screen's vertical. Swap the two reaches there, or
	// half the corners end up with the long rail running down the side. Invisible
	// while both rails were the same length — which is exactly why it slipped by.
	const quarterTurned = pos === 'tr' || pos === 'bl'
	const { edge, side } = RAIL_LEN[variant]
	const alongX = quarterTurned ? side : edge
	const alongY = quarterTurned ? edge : side
	return (
		<svg
			className={`${styles.corner} ${styles[`corner-${pos}`]}`}
			viewBox="0 0 96 96"
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
		>
			{/* opaque backing: the frame border stops at the boss, never crosses it */}
			<path d="M6 -0.4 L12.4 6 L6 12.4 L-0.4 6 Z" fill={SURFACE} stroke="none" />
			{/* the two rails: one along +x, one mirrored across y=x onto +y */}
			<CornerRail variant={variant} len={alongX} />
			<g transform="matrix(0 1 1 0 0 0)">
				<CornerRail variant={variant} len={alongY} />
			</g>
			{/* prominent hollow diamond boss — drawn last so the rails tuck under it */}
			<path d="M6 -0.4 L12.4 6 L6 12.4 L-0.4 6 Z" fill={SURFACE} stroke="none" />
			<path d="M6 0.4 L11.6 6 L6 11.6 L0.4 6 Z" strokeWidth={1.3} />
		</svg>
	)
}

/**
 * A winged sun disc — the Amonkhet/Egyptian divine cornice motif — set as a
 * keystone on the top edge. Reserved for the "divine" header position, and the
 * only ornament allowed a concentric focal (see the corner-mark note).
 *
 * The wings follow Egyptian scarab-wing construction: a bold outlined fan with a
 * band of solid triangles inside it, rather than a solid feathered slab. This is
 * a deliberate exception to the kit's solid-mass rule — that rule exists because
 * *thin parallel outlines* read as bent wire, but a bold contour enclosing a
 * large area with a structured internal motif is a different thing, and it lets
 * light through. A solid wing at this width made the spell keystone far too
 * dominant, and carving it thinner only ever traded weight against detail; the
 * outlined fan is light at any size, so the disc keeps the hierarchy.
 *
 * The disc stays solid on purpose: it becomes the single mass in an otherwise
 * airy motif, which is exactly the focal contrast the card wants.
 */
function WingedDisc() {
	// Triangle band inside each wing, seated along the trailing edge with the
	// apexes reaching up toward the inner arc (the scarab-wing pattern).
	const TRIANGLES_RIGHT = [
		'M73.88 22.43 L79.96 21.21 L75.91 16.76 Z',
		'M81.67 20.87 L87.75 19.65 L83.85 15.97 Z',
		'M89.46 19.31 L95.54 18.09 L91.79 15.17 Z',
		'M97.25 17.75 L103.33 16.53 L99.74 14.37 Z',
		'M103.81 16.44 L109.89 15.22 L106.42 13.70 Z',
	]
	const TRIANGLES_LEFT = [
		'M46.12 22.43 L40.04 21.21 L44.09 16.76 Z',
		'M38.33 20.87 L32.25 19.65 L36.15 15.97 Z',
		'M30.54 19.31 L24.46 18.09 L28.21 15.17 Z',
		'M22.75 17.75 L16.67 16.53 L20.26 14.37 Z',
		'M16.19 16.44 L10.11 15.22 L13.58 13.70 Z',
	]
	const surface = 'var(--ifm-background-surface-color)'
	return (
		<svg
			className={styles.wingedDisc}
			viewBox="0 0 120 30"
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
		>
			{/* Opaque backing along the border line only, so the card's top border
			    stops at the ornament instead of running through the open wings. */}
			<path d="M4 16.8 L116 16.8 L116 19.2 L4 19.2 Z" fill={surface} stroke="none" />

			{/* right wing: outlined fan, inner arc, then the triangle band. The root
			    tucks under the disc, which is drawn last. */}
			<path
				d="M71 11.5 L111 11.5 L113 14.6 L72 22.8 Z"
				fill={surface}
				strokeWidth={1.4}
			/>
			<path d="M73 15.5 L110.5 12.9" strokeWidth={1} />
			<g fill="currentColor" stroke="none">
				{TRIANGLES_RIGHT.map((d) => (
					<path key={d} d={d} />
				))}
			</g>

			{/* left wing (mirror) */}
			<path
				d="M49 11.5 L9 11.5 L7 14.6 L48 22.8 Z"
				fill={surface}
				strokeWidth={1.4}
			/>
			<path d="M47 15.5 L9.5 12.9" strokeWidth={1} />
			<g fill="currentColor" stroke="none">
				{TRIANGLES_LEFT.map((d) => (
					<path key={d} d={d} />
				))}
			</g>

			{/* sun disc: a radiant corona behind a struck disc with a carved rim line —
			    the concentric focal. The rim sits close to the edge on purpose: a ring
			    set further in reads as an eyelet rather than a sun. */}
			<g fill="currentColor" stroke="none">
				{SUN_RAYS.map((d) => (
					<path key={d} d={d} />
				))}
			</g>
			<circle cx={60} cy={18} r={7.6} fill="currentColor" stroke="none" />
			<circle cx={60} cy={18} r={5.8} stroke={surface} strokeWidth={1.3} fill="none" />
		</svg>
	)
}

/**
 * Twin waving serpents (Egyptian uraeus) rising from a small lozenge boss — the
 * keystone variant for lighter, subordinate cards (conditions), reserving the
 * grander winged sun disc for the primary content (spells). Same craft rules:
 * opaque backing so the border stops at the ornament, currentColor, flat.
 */
function SerpentKeystone() {
	const surface = 'var(--ifm-background-surface-color)'
	// Scale ticks carved across each body, placed on the curve's perpendicular so
	// they sit square to the direction of travel rather than merely vertical.
	const SCALES_LEFT = [
		'M40.36 12.26 L40.64 14.34',
		'M35.62 14.06 L36.58 15.94',
		'M31.45 15.76 L31.75 17.84',
		'M21.74 13.08 L22.26 15.12',
		'M16.56 14.88 L17.04 16.92',
	]
	const SCALES_RIGHT = [
		'M55.64 12.26 L55.36 14.34',
		'M60.38 14.06 L59.42 15.94',
		'M64.55 15.76 L64.25 17.84',
		'M74.26 13.08 L73.74 15.12',
		'M79.44 14.88 L78.96 16.92',
	]
	return (
		<svg
			className={styles.serpentKeystone}
			viewBox="0 0 96 30"
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
		>
			{/* Opaque backing along the border line only (y=15). The bodies are solid,
			    so a thin band is enough to stop the card's top border. */}
			<g fill={surface} stroke="none">
				<path d="M2 13.7 L94 13.7 L94 16.3 L2 16.3 Z" />
				<path d="M48 10.3 L53.4 15 L48 19.7 L42.6 15 Z" />
			</g>

			{/* left serpent. The body is a single SOLID stroke, not the two parallel
			    hairlines it used to be — a hollow tube at this size reads as wire.
			    Scale ticks are carved back out in the surface colour. */}
			<path
				d="M44.5 15 C39.5 9 33 21 27 15.2 C22.5 10.9 17 18.6 12.5 15.2"
				strokeWidth={3.4}
			/>
			<g stroke={surface} strokeWidth={0.5}>
				{SCALES_LEFT.map((d) => (
					<path key={d} d={d} />
				))}
			</g>
			{/* wedge head: broad at the brow, tapering to the snout, with an almond eye */}
			<path
				d="M3.4 15.2 C4.7 12.5 7.0 11.5 9.2 11.6 C11.3 11.7 12.7 12.6 12.9 13.7 L12.9 16.7 C12.6 18.1 11.1 18.9 9.1 18.9 C6.7 18.9 4.7 17.6 3.4 15.2 Z"
				fill="currentColor"
				stroke="none"
			/>
			<path d="M6.2 14.6 Q7.8 13.1 9.5 14.6 Q7.8 16.1 6.2 14.6 Z" fill={surface} stroke="none" />
			<path d="M3.4 15.2 L0.4 13.9 M3.4 15.2 L0.6 16.5" strokeWidth={0.8} />

			{/* right serpent (mirror) */}
			<path
				d="M51.5 15 C56.5 9 63 21 69 15.2 C73.5 10.9 79 18.6 83.5 15.2"
				strokeWidth={3.4}
			/>
			<g stroke={surface} strokeWidth={0.5}>
				{SCALES_RIGHT.map((d) => (
					<path key={d} d={d} />
				))}
			</g>
			<path
				d="M92.6 15.2 C91.3 12.5 89.0 11.5 86.8 11.6 C84.7 11.7 83.3 12.6 83.1 13.7 L83.1 16.7 C83.4 18.1 84.9 18.9 86.9 18.9 C89.3 18.9 91.3 17.6 92.6 15.2 Z"
				fill="currentColor"
				stroke="none"
			/>
			<path d="M89.8 14.6 Q88.2 13.1 86.5 14.6 Q88.2 16.1 89.8 14.6 Z" fill={surface} stroke="none" />
			<path d="M92.6 15.2 L95.6 13.9 M92.6 15.2 L95.4 16.5" strokeWidth={0.8} />

			{/* central lozenge boss — solid centre, no concentric ring (reserved for
			    the winged disc so the hierarchy holds) */}
			<path d="M48 10.6 L53.1 15 L48 19.4 L42.9 15 Z" strokeWidth={1.2} fill={surface} />
			<path d="M48 12.9 L50.2 15 L48 17.1 L45.8 15 Z" fill="currentColor" stroke="none" />
		</svg>
	)
}

/**
 * Crossed khopeshes (the Egyptian sickle-sword) over a struck boss — the martial
 * keystone, for combat arts. Period-correct and unmistakably a weapon, and its X
 * silhouette reads clearly apart from its siblings (the winged disc spreads flat,
 * the serpents wave).
 *
 * Unlike the serpent bodies, the blades are struck SOLID rather than drawn as a
 * hollow two-outline tube: at this width an outline reads as bent wire, and a
 * sword needs mass to register as a weapon at all. A negative-space fuller keeps
 * that mass from going flat. Each blade ends in a clean sickle point — curling
 * the tip back turns it into a decorative volute and the weapon read is lost.
 *
 * The crossing boss is deliberately solid rather than concentric: concentric
 * rings stay reserved for the winged disc so the hierarchy holds. Same craft
 * rules otherwise: opaque backing, currentColor, flat.
 */
function KhopeshKeystone() {
	return (
		<svg
			className={styles.khopeshKeystone}
			viewBox="0 0 76 26"
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
		>
			{/* opaque backing: a band along the border line (y~15.5) plus both blade
			    silhouettes, so the card's top border stops at the ornament */}
			<g fill="var(--ifm-background-surface-color)" stroke="none">
				<path d="M8 14.2 L68 14.2 L68 16.9 L8 16.9 Z" />
				<path d="M24.2 17.4 C34 14.6 48 10.2 57.5 7.6 C63 6.1 68 6.6 69.6 9.4 C70.2 10.4 70.2 11.4 69.9 12.4 C69.2 10.6 67.6 9.7 65 9.6 C61 9.5 55 11.2 49 13.4 C40 16.7 31 19.4 25.6 21 Z" />
				<path d="M51.8 17.4 C42 14.6 28 10.2 18.5 7.6 C13 6.1 8 6.6 6.4 9.4 C5.8 10.4 5.8 11.4 6.1 12.4 C6.8 10.6 8.4 9.7 11 9.6 C15 9.5 21 11.2 27 13.4 C36 16.7 45 19.4 50.4 21 Z" />
				<path d="M31.6 15.5 L38 11.6 L44.4 15.5 L38 19.4 Z" />
			</g>

			{/* left-pointing khopesh: hilt low-right, hooked sickle blade sweeping up-left.
			    The blade is struck solid — a hollow outline at this width reads as bent
			    wire, and a sword needs mass to register as a weapon. A negative-space
			    fuller keeps the mass from going flat. */}
			<path d="M51.8 18.4 L63 21.6" strokeWidth={1.9} />
			<path d="M52.6 15.7 L51.1 21.1" strokeWidth={1.1} />
			<path d="M63 20.1 L64.5 21.6 L63 23.1 L61.5 21.6 Z" strokeWidth={0.9} />
			<path
				d="M51.8 17.4 C42 14.6 28 10.2 18.5 7.6 C13 6.1 8 6.6 6.4 9.4 C5.8 10.4 5.8 11.4 6.1 12.4 C6.8 10.6 8.4 9.7 11 9.6 C15 9.5 21 11.2 27 13.4 C36 16.7 45 19.4 50.4 21 Z"
				fill="currentColor"
				stroke="none"
			/>
			<path
				d="M47.5 17.6 C39.5 15.2 27.5 11.2 19 9.2"
				stroke="var(--ifm-background-surface-color)"
				strokeWidth={0.6}
				opacity={0.55}
			/>

			{/* right-pointing khopesh (mirror) */}
			<path d="M24.2 18.4 L13 21.6" strokeWidth={1.9} />
			<path d="M23.4 15.7 L24.9 21.1" strokeWidth={1.1} />
			<path d="M13 20.1 L14.5 21.6 L13 23.1 L11.5 21.6 Z" strokeWidth={0.9} />
			<path
				d="M24.2 17.4 C34 14.6 48 10.2 57.5 7.6 C63 6.1 68 6.6 69.6 9.4 C70.2 10.4 70.2 11.4 69.9 12.4 C69.2 10.6 67.6 9.7 65 9.6 C61 9.5 55 11.2 49 13.4 C40 16.7 31 19.4 25.6 21 Z"
				fill="currentColor"
				stroke="none"
			/>
			<path
				d="M28.5 17.6 C36.5 15.2 48.5 11.2 57 9.2"
				stroke="var(--ifm-background-surface-color)"
				strokeWidth={0.6}
				opacity={0.55}
			/>

			{/* struck boss over the crossing — solid, not concentric */}
			<path
				d="M31.6 15.5 L38 11.6 L44.4 15.5 L38 19.4 Z"
				strokeWidth={1.1}
				fill="var(--ifm-background-surface-color)"
			/>
			<path d="M35.3 15.5 L38 13.85 L40.7 15.5 L38 17.15 Z" fill="currentColor" stroke="none" />
		</svg>
	)
}

/**
 * A stepped ziggurat — the Mesopotamian temple-tower — as the keystone for
 * talent cards.
 *
 * Chosen because a talent *is* a ladder: you buy Rank 1, then 2, then 3, and the
 * card renders that as tiers. The ziggurat encodes tiered ascent literally, it is
 * period-correct for the setting's Mesopotamian half, and its stepped triangular
 * silhouette reads clearly apart from its siblings (the winged disc spreads flat,
 * the serpents wave, the khopeshes cross in an X).
 *
 * Same craft rules as the rest of the kit: opaque backing so the card's top
 * border stops at the ornament, currentColor, flat. The tiers are struck SOLID
 * with carved surface-colour coping lines rather than drawn as outlines — at this
 * size nested rectangles of hairline stroke read as a wireframe diagram, not
 * masonry. The summit shrine is a hollow diamond with a solid core, matching the
 * serpent and khopesh bosses; the concentric ring stays reserved for the winged
 * disc so the hierarchy holds.
 */
function ZigguratKeystone() {
	// Four receding courses. Each entry is [x-left, x-right, y-top]; every course
	// runs down to the base line so the mass is continuous rather than a stack of
	// floating bars.
	const BASE = 19.4
	const COURSES: [number, number, number][] = [
		[26, 58, 15.0],
		[30, 54, 11.4],
		[34, 50, 7.9],
		[37.6, 46.4, 5.0],
	]
	// The monumental central stairway, carved out in the surface colour as a ladder
	// of treads rather than a solid slot — a solid slot cut the tower in half.
	const TREADS = [17.6, 15.6, 13.6, 11.6, 9.6].map(
		(y, i) => `M${n(39.4 + i * 0.45)} ${n(y)} L${n(44.6 - i * 0.45)} ${n(y)}`,
	)
	return (
		<svg
			className={styles.zigguratKeystone}
			viewBox="0 0 84 26"
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
		>
			{/* Opaque backing along the border line only (y=19.4), so the card's top
			    border stops at the ornament instead of running through the tiers. */}
			<path d="M2 18.2 L82 18.2 L82 20.6 L2 20.6 Z" fill={SURFACE} stroke="none" />

			{/* Flanking plinth courses out to the frame edges, stepping DOWN in height
			    away from the tower. This is what lets the keystone span the top edge
			    like its siblings, and it gives the rigid stepped geometry a gradient of
			    mass instead of an abrupt stop. */}
			<g fill="currentColor" stroke="none">
				<path d={`M14 16.6 L26 16.6 L26 ${n(BASE)} L14 ${n(BASE)} Z`} />
				<path d={`M4 17.6 L14 17.6 L14 ${n(BASE)} L4 ${n(BASE)} Z`} />
				<path d={`M58 16.6 L70 16.6 L70 ${n(BASE)} L58 ${n(BASE)} Z`} />
				<path d={`M70 17.6 L80 17.6 L80 ${n(BASE)} L70 ${n(BASE)} Z`} />
			</g>

			{/* the tower: solid receding courses */}
			<g fill="currentColor" stroke="none">
				{COURSES.map(([xa, xb, yt]) => (
					<path key={xa} d={`M${n(xa)} ${n(yt)} L${n(xb)} ${n(yt)} L${n(xb)} ${n(BASE)} L${n(xa)} ${n(BASE)} Z`} />
				))}
			</g>

			{/* carved coping under each course top + the stairway treads, all in the
			    surface colour so the tiers stay separable */}
			<g stroke={SURFACE} strokeWidth={0.5}>
				{COURSES.map(([xa, xb, yt]) => (
					<path key={xa} d={`M${n(xa + 1)} ${n(yt + 0.85)} L${n(xb - 1)} ${n(yt + 0.85)}`} />
				))}
				{TREADS.map((d) => (
					<path key={d} d={d} />
				))}
			</g>

			{/* summit shrine: hollow diamond with a solid core (no concentric ring —
			    that stays the winged disc's alone) */}
			<path d={`M42 0.6 L46.2 4.6 L42 8.6 L37.8 4.6 Z`} fill={SURFACE} stroke="none" />
			<path d={`M42 1.4 L45.4 4.6 L42 7.8 L38.6 4.6 Z`} strokeWidth={1.1} />
			<path d={`M42 3.1 L43.9 4.6 L42 6.1 L40.1 4.6 Z`} fill="currentColor" stroke="none" />
		</svg>
	)
}

/**
 * A horned bull's head — the Mesopotamian guardian bull (the lamassu's body, and
 * the bull imagery that runs through Babylonian and Assyrian gate art) — as the
 * keystone for creature stat blocks.
 *
 * Chosen because a bestiary needs a mark that reads as *a living thing* at a
 * glance, and because its silhouette is unmistakable against its four siblings:
 * the winged disc spreads flat, the serpents wave, the khopeshes cross in an X,
 * the ziggurat steps up in a triangle, and this is a broad symmetric mass with
 * two crescents sweeping out of it.
 *
 * Craft rules as elsewhere: opaque backing along the border line, solid struck
 * mass with detail carved back out in the surface colour (horns outlined at this
 * width would read as wire), currentColor, flat. The brow boss is a solid
 * lozenge, not concentric — the concentric focal stays the winged disc's alone.
 */
/**
 * One strand of the flanking guilloche braid, drawn from the rosette outward to
 * both frame edges. `phase` selects which of the two counter-phase strands this
 * is; together they read as a twisted rope, the standard Mesopotamian border.
 *
 * Built as a sampled sine rather than arcs so the two strands stay exactly a
 * half-period apart at every x — hand-authored arcs drifted and the braid stopped
 * reading as woven.
 */
const GUILLOCHE = (phase: 1 | -1) => {
	const amp = 2.1
	const span = 18
	// Whole periods across the span, so each strand starts and ends on the centre
	// line and meets its rosette cleanly at both ends.
	const periods = 1.5
	const steps = 30
	const strand = (mirror: boolean) => {
		const pts: string[] = []
		for (let i = 0; i <= steps; i++) {
			const t = i / steps
			// `d` is distance measured OUTWARD from the rosette, so both flanks are
			// generated by the same function and the pair is mirror-symmetric about
			// the head by construction. Referencing a single global x (which the
			// first version did) left the two flanks at unrelated phases.
			const y = 20 + phase * amp * Math.sin(2 * Math.PI * periods * t)
			const d = span * t
			pts.push(`${n(mirror ? 22 - d : 74 + d)} ${n(y)}`)
		}
		return `M${pts.join(' L')}`
	}
	return `${strand(true)} ${strand(false)}`
}

/**
 * An eight-petal rosette — the Ishtar Gate emblem — used as the terminal where
 * each guilloche strand meets the bull's head. Solid petals around a struck
 * centre, per the kit's solid-mass rule; the centre is a plain disc, not a
 * concentric ring (that stays the winged disc's alone).
 */
function Rosette({ cx, cy }: { cx: number; cy: number }) {
	const petals = Array.from({ length: 8 }, (_, i) => {
		const a = (i * Math.PI) / 4
		const [dx, dy] = [Math.cos(a), Math.sin(a)]
		// A tapered petal: a narrow lozenge reaching from the hub outward.
		const tip = [cx + dx * 4.4, cy + dy * 4.4]
		const l = [cx + dx * 1.6 - dy * 1.5, cy + dy * 1.6 + dx * 1.5]
		const r = [cx + dx * 1.6 + dy * 1.5, cy + dy * 1.6 - dx * 1.5]
		return `M${n(cx)} ${n(cy)} L${n(l[0])} ${n(l[1])} L${n(tip[0])} ${n(tip[1])} L${n(r[0])} ${n(r[1])} Z`
	})
	return (
		<>
			{/* opaque backing so the border line stops at the rosette */}
			<circle cx={cx} cy={cy} r={4.8} fill={SURFACE} stroke="none" />
			<g fill="currentColor" stroke="none">
				{petals.map((d) => (
					<path key={d} d={d} />
				))}
			</g>
			<circle cx={cx} cy={cy} r={1.7} fill={SURFACE} stroke="none" />
			<circle cx={cx} cy={cy} r={1.0} fill="currentColor" stroke="none" />
		</>
	)
}

function BullKeystone() {
	// Horns: solid crescents sweeping up and outward from the brow. Drawn for the
	// right side and mirrored, so the two are identical by construction.
	const horn = (dir: 1 | -1) => {
		const x = (v: number) => 48 + dir * v
		return (
			`M${n(x(9))} 13.6 ` +
			`C${n(x(17))} 13.2 ${n(x(26))} 11.2 ${n(x(31))} 4.4 ` +
			`C${n(x(30))} 10.4 ${n(x(22))} 16.2 ${n(x(10.5))} 17.4 Z`
		)
	}
	// Ears, tucked under the horn roots.
	const ear = (dir: 1 | -1) => {
		const x = (v: number) => 48 + dir * v
		return `M${n(x(9.5))} 16.4 C${n(x(15))} 16.6 ${n(x(17.5))} 18.4 ${n(x(16))} 20.4 C${n(x(12.5))} 20.2 ${n(x(9.8))} 18.8 ${n(x(9.5))} 16.4 Z`
	}
	return (
		<svg
			className={styles.bullKeystone}
			viewBox="0 0 96 30"
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
		>
			{/* Opaque backing along the border line (y=20) only — the head and horns
			    are solid, so they mask themselves. */}
			<path d="M2 18.8 L94 18.8 L94 21.2 L2 21.2 Z" fill={SURFACE} stroke="none" />

			{/* Flanking friezes out to the frame edges. A plain bar was tried first and
			    read as two boring rules bolted onto the head; this is the Ishtar Gate
			    language instead — a guilloche braid (two counter-phase strands, the
			    standard Mesopotamian border) terminating in an eight-petal rosette,
			    the emblem that runs along those same gate friezes. */}
			<g strokeWidth={0.9}>
				<path d={GUILLOCHE(1)} />
				<path d={GUILLOCHE(-1)} />
			</g>
			<Rosette cx={22} cy={20} />
			<Rosette cx={74} cy={20} />

			<g fill="currentColor" stroke="none">
				<path d={ear(1)} />
				<path d={ear(-1)} />
				<path d={horn(1)} />
				<path d={horn(-1)} />
				{/* head: broad brow tapering to a blunt muzzle */}
				<path
					d={
						'M38.6 13.2 C40.6 11.2 55.4 11.2 57.4 13.2 ' +
						'C58.4 16.6 56.6 21.4 53.6 24.2 ' +
						'C51.4 26.2 44.6 26.2 42.4 24.2 ' +
						'C39.4 21.4 37.6 16.6 38.6 13.2 Z'
					}
				/>
			</g>

			{/* Carved detail, deliberately abstract: two eye slots and a brow band, and
			    nothing else. A literal muzzle line plus nostrils were tried first and
			    read as a cartoon face — at 87px the features are only a few pixels
			    across, so representational detail turns comic rather than carved. Two
			    slots under a brow read as a bucranium (the votive bull mask of the
			    period) and stay a mask instead of trying to be a portrait. */}
			<g fill={SURFACE} stroke="none">
				<path d="M41.8 17.9 L45.6 17.4 L45.6 19.0 L41.8 18.9 Z" />
				<path d="M54.2 17.9 L50.4 17.4 L50.4 19.0 L54.2 18.9 Z" />
			</g>
			<path d="M41.4 15.4 L54.6 15.4" stroke={SURFACE} strokeWidth={0.7} />

			{/* brow boss: a solid lozenge between the horns (no concentric ring) */}
			<path d="M48 10.4 L51.2 13.2 L48 16.0 L44.8 13.2 Z" fill={SURFACE} stroke="none" />
			<path d="M48 11.2 L50.2 13.2 L48 15.2 L45.8 13.2 Z" fill="currentColor" stroke="none" />
		</svg>
	)
}

export interface CardFrameProps {
	/**
	 * Which card family this is. Selects both the top-edge keystone and the
	 * matching corner rails: the grand winged disc (spells), twin serpents
	 * (conditions), crossed khopeshes (combat arts), the stepped ziggurat
	 * (talents), or the horned bull (creature stat blocks).
	 */
	keystone?: CodexVariant
}

const KEYSTONES = {
	winged: WingedDisc,
	serpent: SerpentKeystone,
	khopesh: KhopeshKeystone,
	ziggurat: ZigguratKeystone,
	bull: BullKeystone,
} as const

/**
 * Full card frame — Amonkhet "carved stone slab" logic: four diamond corners
 * and a keystone on the top edge, all drawn in the card family's motif. The
 * nested inner border and engraving live on the card itself. Top boss only — a
 * bottom one would collide with the next stacked card. Parent must be
 * `position: relative`.
 */
export function CardFrame({ keystone = 'winged' }: CardFrameProps) {
	const Keystone = KEYSTONES[keystone]
	return (
		<div className={styles.frame} aria-hidden="true">
			{CORNERS.map((pos) => (
				<Corner key={pos} pos={pos} variant={keystone} />
			))}
			<Keystone />
		</div>
	)
}

export interface LozengeDividerProps {
	/** Tighter vertical margins for use inside a container (vs. a page divider). */
	compact?: boolean
}

/**
 * A brass rule fading OUT from a central lozenge — solid at the ornament, fading
 * to nothing at the frame edges. Doubles as the site's `---` break replacement.
 */
export function LozengeDivider({ compact = false }: LozengeDividerProps) {
	return (
		<div
			className={`${styles.divider}${compact ? ' ' + styles.dividerCompact : ''}`}
			role="separator"
			aria-hidden="true"
		>
			<svg
				className={styles.lozenge}
				viewBox="0 0 22 12"
				fill="none"
				stroke="currentColor"
				strokeWidth={1}
				aria-hidden="true"
			>
				<path d="M11 1 L18 6 L11 11 L4 6 Z" />
				<path d="M11 3.6 L14.4 6 L11 8.4 L7.6 6 Z" fill="currentColor" stroke="none" />
				<path d="M4 6 L1 6" />
				<path d="M18 6 L21 6" />
			</svg>
		</div>
	)
}

export interface RankChipProps {
	rank: number | string
	/** Smaller, stud-less variant for inline use (e.g. Heightened rank lines). */
	compact?: boolean
}

/**
 * The spell rank marker. Full form is a carved bronze seal for the card header —
 * a struck-metal plaque with an engraved keyline, a small "Rank" label, and a
 * prominent numeral flanked by inlaid end-bars (the cartouche motif inverted on
 * bronze), so it reads as a divine rank-seal rather than a flat button. Compact
 * form is the quiet inline prefix used inside Heightened rule text.
 */
export function RankChip({ rank, compact = false }: RankChipProps) {
	if (compact) {
		return (
			<span className={`${styles.rankChip} ${styles.rankChipCompact}`}>
				<span className={styles.rankWord}>Rank</span> {rank}
			</span>
		)
	}
	return (
		<span className={styles.rankSeal}>
			{RIVETS.map((pos) => (
				<i key={pos} className={`${styles.rivet} ${styles[`rivet-${pos}`]}`} aria-hidden="true" />
			))}
			<span className={styles.rankSealWord}>Rank</span>
			<span className={styles.rankSealNum}>{rank}</span>
		</span>
	)
}

const RIVETS = ['tl', 'tr', 'br', 'bl'] as const

/* ============================================================================
 * M7 — Amonkhet ornament expansion. Constructed-first, ornamented-second:
 * carved stone nameplates, hieroglyph friezes, inlaid jewels, solar discs, and
 * a heavy standalone tablet frame. All generic (any doc container may adopt),
 * token-driven, currentColor, decorative (aria-hidden).
 * ========================================================================== */

export interface CartoucheProps {
	children: React.ReactNode
	/** Optional leading sigil engraved inside the nameplate. */
	glyph?: SigilName
	/** Optional inlaid jewel accent before the text — for KEY/divine labels only. */
	jewel?: JewelTone
	/** Tighter size for dense bands (e.g. stat-band labels). */
	compact?: boolean
	className?: string
}

/**
 * A tapered nameplate with an engraved inner bevel — the sacred-nameplate
 * cartouche of the Amonkhet brief. Generalizes the {@link RankChip} look into a
 * reusable label (ink-forward text so it stays AA-legible; the bronze lives in
 * the border and faint fill). Used for the spell stat-band labels and the
 * Heightened label so they read as inlaid nameplates, not flat small-caps.
 */
export function Cartouche({
	children,
	glyph,
	jewel,
	compact = false,
	className,
}: CartoucheProps) {
	return (
		<span
			className={`${styles.cartouche}${compact ? ' ' + styles.cartoucheCompact : ''}${className ? ' ' + className : ''}`}
		>
			{jewel && <JewelAccent tone={jewel} size={compact ? 7 : 9} />}
			{glyph && (
				<SigilIcon
					name={glyph}
					size={compact ? 11 : 14}
					className={styles.cartoucheGlyph}
				/>
			)}
			<span className={styles.cartoucheText}>{children}</span>
		</span>
	)
}

/**
 * A hieroglyph frieze rule: a short band of rhythmic carved glyph-marks centered
 * between two fading rails, as an alternate {@link LozengeDivider}. The band is a
 * repeat-x mask tinted by currentColor, so it tiles seamlessly at any width.
 */
export function FriezeDivider({ compact = false }: { compact?: boolean }) {
	return (
		<div
			className={`${styles.friezeDivider}${compact ? ' ' + styles.dividerCompact : ''}`}
			role="separator"
			aria-hidden="true"
		>
			<span className={styles.friezeSeg} />
		</div>
	)
}

/**
 * A full-width hieroglyph cornice band for the top/bottom edge of a heavy
 * container (e.g. {@link TabletFrame}) — the architectural frieze of the brief.
 * Same seamless repeat-x mask as {@link FriezeDivider}.
 */
export function FriezeBand({ edge = 'top' }: { edge?: 'top' | 'bottom' }) {
	return (
		<div
			className={`${styles.friezeCornice} ${styles[`friezeCornice-${edge}`]}`}
			aria-hidden="true"
		/>
	)
}

export type JewelTone = 'lapis' | 'carnelian' | 'emerald'

export interface JewelAccentProps {
	/** Jewel tone. All three are distinct from the reserved magic rune-cyan. */
	tone?: JewelTone
	/** Cut: rotated square (default) or round. */
	shape?: 'lozenge' | 'disc'
	/** Pixel size. */
	size?: number
}

/**
 * A tiny inlaid gem — a beveled jewel accent for KEY/divine glyphs only (school
 * or discipline markers), never a general accent. Jewel tones are deliberately
 * blue/red/green so none reads as the magic-reserved rune-cyan.
 */
export function JewelAccent({
	tone = 'lapis',
	shape = 'lozenge',
	size = 10,
}: JewelAccentProps) {
	return (
		<span
			className={`${styles.jewel} ${styles[`jewel-${tone}`]} ${styles[`jewel-${shape}`]}`}
			style={{ width: size, height: size }}
			aria-hidden="true"
		/>
	)
}

/**
 * A plain (wingless) solar disc — the disc from the winged keystone, on its own,
 * as a section/heading marker. Reserve the circular motif for key/divine
 * positions (brief: the circle is a "key" mark, not general decoration).
 */
export function SunDisc({ size = 22 }: { size?: number }) {
	return (
		<svg
			className={styles.sunDisc}
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			aria-hidden="true"
		>
			<circle cx={12} cy={12} r={7} strokeWidth={1.2} />
			<circle cx={12} cy={12} r={2.8} fill="currentColor" stroke="none" />
		</svg>
	)
}

export interface TabletFrameProps {
	children: React.ReactNode
	className?: string
}

/**
 * A heavy, standalone "tablet" frame — diamond corner studs, flanking pillars
 * with lintel caps, a solar-disc keystone, and hieroglyph cornices top and
 * bottom. Explicitly for surfaces that STAND ALONE (a featured callout or stat
 * block), NOT the stacked spell-card list, where side pillars would be noisy.
 * The lighter {@link CardFrame} is the one for repeated cards.
 */
export function TabletFrame({ children, className }: TabletFrameProps) {
	return (
		<section className={`${styles.tablet}${className ? ' ' + className : ''}`}>
			<div className={styles.tabletFrame} aria-hidden="true">
				{/* solar corners to match this frame's sun-disc keystone */}
				{CORNERS.map((pos) => (
					<Corner key={pos} pos={pos} variant="winged" />
				))}
				<span className={`${styles.pillar} ${styles.pillarLeft}`} />
				<span className={`${styles.pillar} ${styles.pillarRight}`} />
				<span className={styles.tabletKeystone}>
					<SunDisc size={26} />
				</span>
			</div>
			<FriezeBand edge="top" />
			<div className={styles.tabletBody}>{children}</div>
			<FriezeBand edge="bottom" />
		</section>
	)
}
