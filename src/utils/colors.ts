// Centralized color constants for reuse across the app
// Export attribute colors and re-export skill color getter
//
// M9 S0/S1: these used to be literal Material Design pastels, hardcoded for a
// dark surface and unreadable in light mode (F1). They now read the
// `--cs-*` custom properties declared in `characterSheet.css`, scoped to
// `.character-sheet-page` and derived from the `--nexus-*` jewel/alert tokens
// per M9 D3 — one declaration per color tracks both color modes. Export shape
// is unchanged so all 39 consumers (StatCard, CardHeader, tab cards, etc.)
// need no edits.
// Attribute-specific palette, jewel-derived (D3)
export const ATTRIBUTE_COLORS = {
	strength: 'var(--cs-attr-strength)',
	agility: 'var(--cs-attr-agility)',
	spirit: 'var(--cs-attr-spirit)',
	mind: 'var(--cs-attr-mind)',
}

// Common UI color constants used in the character sheet
export const UI_COLORS = {
	danger: 'var(--cs-danger)',
	success: 'var(--cs-success)',
	info: 'var(--cs-info)',
	warning: 'var(--cs-warning)',
	purple: 'var(--cs-purple)',
	amber: 'var(--cs-amber)',
	// The magic register (M13 S5) — rune-cyan, reserved by the README for content
	// that IS magical: the focus pool, the catalyst, the cast control. `lightBlue`
	// is the M9-era alias for the same token and is kept for its existing callers.
	magic: 'var(--cs-magic)',
	lightBlue: 'var(--cs-light-blue)',
	grey: 'var(--cs-grey)',
	greyBlue: 'var(--cs-grey-blue)',
	// Additional semantic color used by Resolve card
	resolve: 'var(--cs-resolve)',
}

export { getSkillChipColor, getProfessionChipColor } from '../constants/skills'

export default ATTRIBUTE_COLORS
