import { SigilName } from './sigil-paths'

/**
 * A sigil per damage type (M13 S4c).
 *
 * ## Why this table exists
 *
 * The sheet renders a weapon's damage constantly and spells one word of it out —
 * `6/9/12 physical` — where the number is the part read at speed. A mark carries
 * the type at a glance and gives the row its width back.
 *
 * ## Two reuses, nine drawn
 *
 * `fire` takes `flame` and `poison` takes `venom-fang`. Both marks are already
 * the matching **condition** (`burning`, `poisoned`), and a burning condition and
 * fire damage are the same idea, so the reuse is coherent rather than merely
 * convenient. It is still a collision in F7's sense — those marks now carry three
 * meanings each — and `sigils:check` cannot see it, because its mapping pass
 * verifies that every mark is *used*, not that it is used once.
 *
 * It is tolerable here for the same reason it was tolerable for conditions: a
 * damage mark only ever renders inside a labelled control or beside a number in
 * a row that names it, never in a navbar or a doc header where a mark must
 * identify something on its own.
 *
 * ## The a11y contract, which is not optional
 *
 * The codex law is explicit that a sigil may never *be* a label and must never be
 * the only carrier of meaning. So every consumer of this table renders the type
 * name alongside the mark for assistive technology — a `title` and a
 * visually-hidden span — exactly as `DieToken` does for an attribute die. The
 * word is hidden from sight, never from the accessibility tree.
 *
 * Keyed by `DamageType` from `src/types/Character.ts`. Not typed against it on
 * purpose: `src/components/` is shared with the docs site and must not depend on
 * the character sheet's types. A test pins the two together instead, so a damage
 * type added to the array fails a test rather than rendering blank.
 */
export const DAMAGE_SIGIL: Record<string, SigilName> = {
	// --- reusing a mark that already depicts the thing ---
	fire: 'flame',
	poison: 'venom-fang',

	// --- marks drawn for this table ---
	physical: 'spearhead',
	frost: 'icicles',
	lightning: 'bolt',
	acid: 'corroded-drop',
	necrotic: 'skull',
	radiant: 'halo',
	psychic: 'cracked-disc',
	blast: 'burst',
	force: 'shockwave',
}

/**
 * The identity hue per damage type, as a text-safe CSS custom property.
 *
 * The `--nexus-damage-*` values are the M5 chip fills, chosen for white text on
 * an opaque swatch, so they are far too dark to use as ink. `--cs-damage-*` mixes
 * each toward the reading ink per mode, exactly as `--cs-skill-*` does for the
 * sixteen skills — one declaration that darkens in light mode and lightens in
 * dark while holding the hue.
 */
export const DAMAGE_TONE: Record<string, string> = Object.fromEntries(
	[
		'acid',
		'blast',
		'fire',
		'force',
		'frost',
		'lightning',
		'necrotic',
		'physical',
		'poison',
		'psychic',
		'radiant',
	].map((type) => [type, `var(--cs-damage-${type})`]),
)
