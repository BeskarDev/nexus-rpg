import type { SigilName } from '../codex/sigil-paths'

/**
 * A creature type's mark (M13 S8).
 *
 * ## What this replaces
 *
 * `getTypeColor` — eight hardcoded hexes (`Animal: '#48A06C'`, `Fey: '#914C70'`,
 * …) rendered as a 12px filled circle beside every option in the trait dropdown.
 * Three faults in one device: the hues were Material's, five of the eight types
 * do not exist in the companion data at all, and a saturated dot is exactly the
 * block of colour the codex rule forbids — identity lives in the ink and in the
 * mark, never in a colour mass. S8 deleted four such palettes from the search
 * dialogs for the same reason.
 *
 * The four types the data actually contains get a mark instead, each reusing
 * existing geometry, so nothing is added to `stat-sigils.ts` and the F7 collision
 * check is untouched.
 *
 * ## The one collision that had to be avoided
 *
 * `eye` is the obvious mark for an aberration and is already **Spirit** — which
 * renders four cells away in the same plate. `hollow-figure` instead: a body of
 * the wrong shape, which is what an aberration is, and it collides with nothing
 * on this surface.
 */
export const COMPANION_TYPE_SIGIL: Record<string, SigilName> = {
	Animal: 'paw',
	Aberration: 'hollow-figure',
	Elemental: 'vortex',
	Undead: 'skull',
}

/** A type with no mark still reads — the word is always beside it. */
export const typeSigil = (type: string): SigilName | undefined =>
	COMPANION_TYPE_SIGIL[type]

/**
 * Movement's mark, in both places the figure appears: the size rail's trade line
 * and the preview card's `Movement` trait row (M13 S8, owner review).
 *
 * `footprints` is the mark movement wants and is already **Dodge**, which the same
 * card renders four cells away. The horse is the period's own image of pace, and
 * it reads correctly on a surface whose whole subject is the creature that carries
 * you. Registered for the card in `creature-trait-sigils.ts`'s `CREATURE_TRAIT_SIGIL`, and used
 * here for the rail, so one glyph covers the trade you choose and the row it lands
 * in.
 *
 * Nothing else is needed: the preview is `CreatureStatBlock`, which brings its own
 * marks for every stat it shows — one mark table per artifact, not two.
 */
export const MOVEMENT_SIGIL: SigilName = 'horse'
