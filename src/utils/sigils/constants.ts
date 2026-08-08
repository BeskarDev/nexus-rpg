/**
 * The sigil design law, as numbers (M10). Every threshold here is expressed in
 * viewBox units so it stays meaningful independent of the size a mark renders
 * at; the checker converts to pixels once, against the size that matters.
 *
 * Why these values: 2.5/32 units at the 14px sidebar render is 1.09px — the
 * thinnest thing that survives that surface, which is the smallest one a mark
 * ships on apart from the 12px breadcrumb. The coverage band exists because the
 * previous set mixed solid fills with hairline outlines and read as three
 * different icon packs side by side.
 */
import { SIGIL_VIEWBOX } from '../../components/codex/sigil-paths'

export { SIGIL_VIEWBOX }

/** Minimum width of any ink feature — stroke, bar, limb. */
export const MIN_INK_FEATURE = 2.5

/** Minimum width of any void: an enclosed hole, or a gap between two masses. */
export const MIN_VOID = 2

/**
 * Ink as a fraction of the 32×32 box. One density for the whole set.
 *
 * The M10 spec proposed 25–40%. Drawing the set showed that floor is unreachable
 * for honestly linear objects — a key, a bow, a sickle blade or a crescent only
 * reaches 25% by becoming a club, which costs more legibility than the density
 * mismatch it buys. 20–38% is the band the recut actually holds, and it is still
 * a tighter spread (1.9×) than the old set's solid-fill-to-hairline range.
 */
export const INK_COVERAGE_MIN = 0.2
export const INK_COVERAGE_MAX = 0.38

/** Common cap box, centred, that a mark's ink should sit inside. */
export const CAP_BOX = 26
/** Slack on the cap box for a deliberately tall or wide mark. */
export const CAP_BOX_SLACK = 2

/**
 * Silhouette distinctness: RMS distance between two marks' 8×8 coverage
 * signatures at 14px. Below this they blur together in a sidebar row.
 */
export const MIN_SILHOUETTE_DISTANCE = 0.1

/** Every size a sigil renders at somewhere on the site. */
export const SIZE_LADDER = [12, 14, 16, 20, 22, 34, 40] as const

/** The size the law is written against — the sidebar mark. */
export const REFERENCE_SIZE = 14
