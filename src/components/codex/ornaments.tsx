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
 * A corner mark: a prominent hollow diamond boss as the main element, with two
 * hollow elongated spearhead brackets reaching along each frame edge — outline
 * shapes (two converging lines), so they carry more presence than a single rail
 * yet stay lighter and more stylized than a solid clamp band. The middle ground.
 * An opaque surface backing keeps the frame border from crossing the boss.
 */
function Corner({ pos }: { pos: (typeof CORNERS)[number] }) {
	return (
		<svg
			className={`${styles.corner} ${styles[`corner-${pos}`]}`}
			viewBox="0 0 48 48"
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
		>
			{/* opaque backing: the frame border stops at the boss, never crosses it */}
			<path
				d="M6 -0.4 L12.4 6 L6 12.4 L-0.4 6 Z"
				fill="var(--ifm-background-surface-color)"
				stroke="none"
			/>
			{/* prominent hollow diamond boss — the main corner element */}
			<path d="M6 0.4 L11.6 6 L6 11.6 L0.4 6 Z" strokeWidth={1.3} />
			{/* hollow elongated spearhead brackets along each edge */}
			<path d="M11 4.7 L45 6 L11 7.3 Z" strokeWidth={0.9} />
			<path d="M4.7 11 L6 45 L7.3 11 Z" strokeWidth={0.9} />
		</svg>
	)
}

/**
 * A winged sun disc — the Amonkhet/Egyptian divine cornice motif — set as a
 * keystone on the top edge. Reserved for the "divine" header position.
 */
function WingedDisc() {
	return (
		<svg
			className={styles.wingedDisc}
			viewBox="0 0 86 18"
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
		>
			{/* Opaque backing silhouettes in the surface color, drawn first so the
			    card's straight top border line stops at the ornament and never shows
			    through the wings or disc. */}
			<g fill="var(--ifm-background-surface-color)" stroke="none">
				<path d="M37 7.9 C28 4.6 15 5.2 4 9.4 C7 11.7 18 12.8 36 11 Z" />
				<path d="M49 7.9 C58 4.6 71 5.2 82 9.4 C79 11.7 68 12.8 50 11 Z" />
				<circle cx={43} cy={9} r={5.1} />
			</g>
			{/* left wing: leading-edge sweep, scalloped feather-tip edge, covert row */}
			<path d="M37 7.9 C28 4.6 15 5.2 4 9.4" strokeWidth={1.2} />
			<path
				d="M36.5 9.7 Q32.5 12 29.5 10.6 Q26 12.2 23 10.7 Q19.5 12.2 16.5 10.8 Q13 12 10 10.7 Q6.8 11.4 4 9.4"
				strokeWidth={1}
				opacity={0.9}
			/>
			<path
				d="M34 8.7 Q30.5 10.3 27.8 9.4 Q24.6 10.5 21.9 9.5 Q18.7 10.6 16 9.6 Q12.9 10.3 10.4 9.6"
				strokeWidth={0.7}
				opacity={0.5}
			/>
			{/* right wing (mirror) */}
			<path d="M49 7.9 C58 4.6 71 5.2 82 9.4" strokeWidth={1.2} />
			<path
				d="M49.5 9.7 Q53.5 12 56.5 10.6 Q60 12.2 63 10.7 Q66.5 12.2 69.5 10.8 Q73 12 76 10.7 Q79.2 11.4 82 9.4"
				strokeWidth={1}
				opacity={0.9}
			/>
			<path
				d="M52 8.7 Q55.5 10.3 58.2 9.4 Q61.4 10.5 64.1 9.5 Q67.3 10.6 70 9.6 Q73.1 10.3 75.6 9.6"
				strokeWidth={0.7}
				opacity={0.5}
			/>
			{/* sun disc: filled body + carved ring + a small radiant collar */}
			<circle cx={43} cy={9} r={4.5} fill="var(--ifm-background-surface-color)" strokeWidth={1.2} />
			<circle cx={43} cy={9} r={2.8} strokeWidth={0.7} opacity={0.55} />
			<circle cx={43} cy={9} r={1.5} fill="currentColor" stroke="none" />
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
	return (
		<svg
			className={styles.serpentKeystone}
			viewBox="0 0 64 20"
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
		>
			{/* opaque backing: a band around the border line (y~10) + boss, so the
			    card border stops at the ornament and shows through the tube as fill */}
			<g fill="var(--ifm-background-surface-color)" stroke="none">
				<path d="M4 10 Q18 7 32 9 Q46 7 60 10 Q46 13 32 11 Q18 13 4 10 Z" />
				<path d="M32 6.2 L35.6 10 L32 13.8 L28.4 10 Z" />
			</g>
			{/* left serpent: body drawn as two parallel outlines (a tube) + head */}
			<path d="M31 9.25 C25 5.45 21.5 12.05 16.5 9.25 C12.5 6.95 10 11.05 6.5 8.25" strokeWidth={0.85} />
			<path d="M31 10.75 C25 6.95 21.5 13.55 16.5 10.75 C12.5 8.45 10 12.55 6.5 9.75" strokeWidth={0.85} />
			<path
				d="M1.7 9.4 C2.5 7.9 4 7.3 5.3 7.35 C6.5 7.4 7.2 7.75 7.3 8.4 L7.3 9.6 C7.2 10.45 6.3 11 5.1 11 C3.7 11 2.5 10.5 1.7 9.4 Z"
				fill="currentColor"
				stroke="none"
			/>
			<path d="M4.3 8.95 Q5 8.25 5.7 8.95 Q5 9.55 4.3 8.95 Z" fill="var(--ifm-background-surface-color)" stroke="none" />
			<path d="M1.7 9.4 L0.1 8.7 M1.7 9.4 L0.2 10.1" strokeWidth={0.55} />
			{/* right serpent (mirror) */}
			<path d="M33 9.25 C39 5.45 42.5 12.05 47.5 9.25 C51.5 6.95 54 11.05 57.5 8.25" strokeWidth={0.85} />
			<path d="M33 10.75 C39 6.95 42.5 13.55 47.5 10.75 C51.5 8.45 54 12.55 57.5 9.75" strokeWidth={0.85} />
			<path
				d="M62.3 9.4 C61.5 7.9 60 7.3 58.7 7.35 C57.5 7.4 56.8 7.75 56.7 8.4 L56.7 9.6 C56.8 10.45 57.7 11 58.9 11 C60.3 11 61.5 10.5 62.3 9.4 Z"
				fill="currentColor"
				stroke="none"
			/>
			<path d="M59.7 8.95 Q59 8.25 58.3 8.95 Q59 9.55 59.7 8.95 Z" fill="var(--ifm-background-surface-color)" stroke="none" />
			<path d="M62.3 9.4 L63.9 8.7 M62.3 9.4 L63.8 10.1" strokeWidth={0.55} />
			{/* central lozenge boss */}
			<path d="M32 6.4 L35.4 10 L32 13.6 L28.6 10 Z" strokeWidth={1.1} fill="var(--ifm-background-surface-color)" />
			<path d="M32 8.5 L33.5 10 L32 11.5 L30.5 10 Z" fill="currentColor" stroke="none" />
		</svg>
	)
}

export interface CardFrameProps {
	/** Top-edge keystone: the grand winged disc (spells) or twin serpents (conditions). */
	keystone?: 'winged' | 'serpent'
	/** Lighter, smaller corners for dense subordinate cards. */
	compact?: boolean
}

/**
 * Full card frame — Amonkhet "carved stone slab" logic: four diamond corners
 * and a keystone on the top edge. The nested inner border and engraving live on
 * the card itself. Top boss only — a bottom one would collide with the next
 * stacked card. Parent must be `position: relative`.
 */
export function CardFrame({ keystone = 'winged', compact = false }: CardFrameProps) {
	return (
		<div
			className={`${styles.frame}${compact ? ' ' + styles.frameCompact : ''}`}
			aria-hidden="true"
		>
			{CORNERS.map((pos) => (
				<Corner key={pos} pos={pos} />
			))}
			{keystone === 'serpent' ? <SerpentKeystone /> : <WingedDisc />}
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
				{CORNERS.map((pos) => (
					<Corner key={pos} pos={pos} />
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
