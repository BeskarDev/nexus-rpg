import { SigilName } from './sigil-paths'

/**
 * A sigil per status condition (M13).
 *
 * This replaces the 24 `@mui/icons-material` imports the character sheet's
 * `statusEffectIcons` table used to carry — the largest single block of Material
 * icons anywhere in the app.
 *
 * Ten conditions reuse a mark that already ships, where the existing motif
 * genuinely depicts the condition: a drop for bleeding, a fang for poisoned, a
 * knot for restrained. **Those ten marks now carry two meanings** — `flame` is
 * also the Fatigue page, `hourglass` is the Scenes chapter — which is exactly
 * the hazard M13's F7 flagged, and `sigils:check` cannot see it, because it
 * checks that every mark is *used*, not that it is used once. The collision is
 * tolerable here and nowhere else: a condition mark only ever renders inside a
 * labelled row on the character sheet, never in the navbar or a doc header where
 * it would have to identify a chapter on its own.
 *
 * The other fourteen are new marks, drawn for this table. See the Status
 * conditions tier in `sigil-paths.ts` for what five rounds of drawing them
 * taught about legibility at 16px.
 *
 * Keyed by `StatusEffectType` from `src/types/Character.ts`. Not typed against
 * it on purpose — `src/components/` is shared with the docs site and must not
 * depend on the character sheet's types. A test pins the two together instead,
 * so a condition added to the type array fails a test rather than rendering
 * blank.
 */
export const CONDITION_SIGIL: Record<string, SigilName> = {
	// --- reusing a mark that already depicts the thing ---
	bleeding: 'sweat-drop',
	burning: 'flame',
	confused: 'vortex',
	deprived: 'broken-jar',
	frightened: 'votive-mask',
	grappled: 'hand',
	poisoned: 'venom-fang',
	restrained: 'knot',
	slowed: 'hourglass',
	unconscious: 'moon',

	// --- marks drawn for these conditions ---
	blinded: 'blindfold',
	charmed: 'lotus',
	dazed: 'bell',
	deafened: 'drum',
	distracted: 'bird',
	hidden: 'cowl',
	invisible: 'hollow-figure',
	marked: 'target',
	paralyzed: 'statue',
	prone: 'fallen-figure',
	pushed: 'ram',
	silenced: 'stopper',
	staggered: 'tilted-column',
	stunned: 'mace',
	suffocating: 'water',
}
