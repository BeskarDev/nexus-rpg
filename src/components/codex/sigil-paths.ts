/**
 * Single source of truth for the sigils — the raw inner SVG markup
 * (shapes/paths only, no <svg> wrapper) for each mark. Consumed by:
 *   - SigilIcon (React, renders these inside a themed <svg>)
 *   - the chapter-sigil remark plugin (injects the mark into doc h1 headers)
 *   - the DocSidebarItems swizzle (mark before the sidebar label)
 *   - the navbar mask generator (scripts) for the `navbar-sigil--*` masks
 *
 * Keeping the geometry here (plain data, no JSX) lets the build-time plugin, the
 * runtime component, and the sidebar all share one definition, so navbar, cards,
 * headers, and side-nav never drift apart. Shapes stay abstract/geometric — see
 * README § Ornament / Sigil System (no cuneiform font, no accidental meaning).
 *
 * Two tiers:
 *   - Chapter sigils (navbar + homepage cards + chapter fallback).
 *   - Page sigils: one bespoke mark per doc page that used to carry an emoji,
 *     mapped in `page-sigils.ts`. Replaces the legacy emoji on the page heading
 *     and its side-nav entry.
 */
export type SigilName =
	// --- Chapter sigils (navbar / cards) ---
	| 'sun' // Basic Rules
	| 'ziggurat' // Adventurers / folk
	| 'tablet' // Statistics
	| 'anvil' // Equipment
	| 'blades' // Combat
	| 'hourglass' // Scenes
	| 'rune' // Magic
	| 'serpent' // Creatures
	| 'key' // GM Tools
	| 'scroll' // Characters
	// --- 01 Basic Rules ---
	| 'dice'
	| 'quill'
	| 'masks'
	| 'star'
	| 'scales'
	| 'book'
	// --- 02 Adventurers ---
	| 'figure'
	| 'speech'
	| 'hearth'
	| 'portrait'
	| 'twofigures'
	// --- 03 Statistics ---
	| 'dumbbell'
	| 'heart'
	| 'shield'
	| 'spark'
	| 'runner'
	| 'target'
	// --- 04 Equipment ---
	| 'pack'
	| 'coins'
	| 'sword'
	| 'breastplate'
	| 'grid'
	| 'crossedtools'
	| 'gem'
	// --- 05 Combat ---
	| 'burst'
	| 'thrust'
	| 'footsteps'
	| 'gauge'
	| 'chevron'
	// --- 06 Scenes ---
	| 'sundial'
	| 'lightning'
	| 'tent'
	| 'moon'
	| 'hammer'
	| 'alembic'
	| 'knife'
	| 'flag'
	| 'maskface'
	| 'compass'
	// --- 07 Magic ---
	| 'chaosstar'
	| 'chain'
	| 'orb'
	| 'sparkle'
	| 'spiral'
	| 'eye'
	| 'spellbook'
	// --- 08 Creatures ---
	| 'horse'
	| 'fang'
	| 'paw'
	// --- 10 GM Tools ---
	| 'wand'
	| 'card'
	| 'chalice'
	| 'cartouche'
	| 'trap'
	| 'temple'
	| 'mountains'
	| 'dragon'

export const SIGIL_INNER: Record<SigilName, string> = {
	// --- Chapter sigils ---
	sun: '<circle cx="12" cy="12" r="4.5" /><path d="M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3M4.6 4.6l2.1 2.1M17.3 17.3l2.1 2.1M19.4 4.6l-2.1 2.1M6.7 17.3l-2.1 2.1" />',
	ziggurat:
		'<path d="M12 3l3 3h-6zM6 9h12M4 14h16M2.5 20h19" /><path d="M9 9v-3M15 9v-3" />',
	tablet: '<rect x="6" y="3" width="12" height="18" rx="2.5" /><path d="M9 7h2M12.5 7h2.5M9 10h1.5M12 10h3M9 13h3M13 13h2M9 16h2.5M12.5 16h2" />',
	anvil: '<path d="M4 8h13a3 3 0 0 1-3 3H9l-1 0" /><path d="M10 11v4M14 11v4M7 19h10M8.5 15h7l1 4h-9z" />',
	blades:
		'<path d="M5 4l9 9M19 4l-9 9" /><path d="M12 11l3 3-1 1-3-3M12 11l-3 3 1 1 3-3" /><path d="M6 20l3-3M18 20l-3-3" />',
	hourglass:
		'<path d="M6 3h12M6 21h12" /><path d="M7 3c0 5 5 6 5 9s-5 4-5 9M17 3c0 5-5 6-5 9s5 4 5 9" />',
	rune: '<path d="M12 2v20M12 8l6-4M12 8l-6-4M12 15l6 4M12 15l-6 4" /><circle cx="12" cy="12" r="2" />',
	serpent:
		'<path d="M4 17c3 0 3-4 6-4s3 4 6 4 4-3 4-6-2-5-5-5" /><circle cx="6" cy="7" r="2" /><path d="M5.2 6.5h.01" />',
	key: '<circle cx="12" cy="6" r="3.5" /><path d="M12 9.5v11" /><path d="M12 15h3.5M12 18h2.5" />',
	scroll: '<path d="M7 4h10a2 2 0 0 1 2 2v12a2 2 0 0 0 2 2H8a2 2 0 0 1-2-2V6" /><path d="M6 6a2 2 0 0 0-2 2v0a2 2 0 0 0 2 2h1M10 9h6M10 13h6" />',

	// --- 01 Basic Rules ---
	dice: '<rect x="4" y="4" width="16" height="16" rx="2.5" /><circle cx="8.5" cy="8.5" r="1.2" /><circle cx="12" cy="12" r="1.2" /><circle cx="15.5" cy="15.5" r="1.2" />',
	quill: '<path d="M5 19c7-1 12-6 14-15-9 2-13 8-14 15z" /><path d="M5 19l3.5-3.5" /><path d="M8 19h8" />',
	masks: '<path d="M12 3c-3.5 0-5.5 2.5-5.5 7.5S9 21 12 21s5.5-5.5 5.5-10.5S15.5 3 12 3z" /><path d="M8.5 9.5c.8-.6 1.8-.6 2.5 0M13 9.5c.7-.6 1.7-.6 2.5 0" /><path d="M12 12v2.5M10 17h4" />',
	star: '<path d="M12 3l2.3 4.7 5.2.8-3.8 3.7.9 5.1-4.6-2.4-4.6 2.4.9-5.1-3.8-3.7 5.2-.8z" />',
	scales:
		'<path d="M12 4v16M8 20h8" /><path d="M4 8h16M12 4l-8 4M12 4l8 4" /><path d="M2 12a2 2 0 0 0 4 0zM18 12a2 2 0 0 0 4 0z" />',
	book: '<path d="M12 7c-2.2-1.4-5-1.6-8-1v12c3-.6 5.8-.4 8 1 2.2-1.4 5-1.6 8-1V6c-3-.6-5.8-.4-8 1z" /><path d="M12 7v12" />',

	// --- 02 Adventurers ---
	figure: '<circle cx="12" cy="6" r="3" /><path d="M6 21v-2a6 6 0 0 1 12 0v2" />',
	// Impressed cuneiform wedges (spoken/written tongues), not a chat bubble.
	speech:
		'<path d="M4 7l4 1.8L4 10.6zM11 6l4 1.8L11 9.6zM6 14l4 1.8L6 17.6zM13 15l4 1.6L13 18.2z" />',
	hearth: '<path d="M4 11l8-6 8 6" /><path d="M6 10v10h12V10" /><path d="M10 20v-5h4v5" />',
	// Carved standing stele with a relief figure, not a framed photo.
	portrait:
		'<path d="M6 21V9a6 6 0 0 1 12 0v12z" /><circle cx="12" cy="9.5" r="1.8" /><path d="M9 15.5a3 3 0 0 1 6 0" /><path d="M7 21h10" />',
	twofigures:
		'<circle cx="8" cy="7" r="2.5" /><circle cx="16" cy="7" r="2.5" /><path d="M3.5 20v-1.5a4.5 4.5 0 0 1 9 0M11.5 20v-1.5a4.5 4.5 0 0 1 9 0" />',

	// --- 03 Statistics ---
	// Bull's head (Bronze-Age might / raw power), carved-emblem style.
	dumbbell:
		'<path d="M6 9C3.5 8 2.5 5.5 2.5 3M18 9c2.5-1 3.5-3.5 3.5-6" /><path d="M6 8.5a6 6 0 0 0 12 0" /><path d="M7.5 10.5L12 20l4.5-9.5" /><circle cx="9.7" cy="11.5" r=".7" /><circle cx="14.3" cy="11.5" r=".7" />',
	heart: '<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" />',
	shield: '<path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />',
	spark: '<path d="M12 3c1 4 5 5 5 9a5 5 0 0 1-10 0c0-2 1-3 2-4 .5 1.5 1.5 2 2 2 0-2-1-4-1-7z" />',
	// Open hand (aptitude / capability), petroglyph style.
	runner:
		'<path d="M7 20v-7M7 13V8.5a1.1 1.1 0 0 1 2.2 0V12M9.2 12V7a1.1 1.1 0 0 1 2.2 0v5M11.4 12V7.3a1.1 1.1 0 0 1 2.2 0V12M13.6 12.5V9a1.1 1.1 0 0 1 2.2 0v5.5a5.5 5.5 0 0 1-5.5 5.5H9a2.5 2.5 0 0 1-2.2-1.3L4.6 15a1.2 1.2 0 0 1 2-1.3L7 14.5" />',
	target:
		'<circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="1" />',

	// --- 04 Equipment ---
	pack: '<path d="M6 11a6 6 0 0 1 12 0v8a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2z" /><path d="M9 11a3 3 0 0 1 6 0" /><path d="M8 16h8" /><path d="M4 13l2-1M20 13l-2-1" />',
	// Drawstring coin pouch, not a database cylinder.
	coins:
		'<path d="M8 8h8l1.5 5a5.5 5.5 0 0 1-11 0z" /><path d="M8 8l-1.5-2 3-1 2.5 2 2.5-2 3 1L16 8" /><path d="M9.5 13h5" />',
	sword:
		'<path d="M12 2l2 4v9h-4V6z" /><path d="M8 15h8M12 15v6M10 18h4" />',
	breastplate:
		'<path d="M6 5l6 2 6-2v6c0 5-3 8-6 9-3-1-6-4-6-9z" /><path d="M12 7v13M8 10h8" />',
	// Shield with an overlaid sword (weapon & armor emblem), not a hash grid.
	grid: '<path d="M12 3l6 2.3v5.2c0 4-2.4 6.8-6 8.2-3.6-1.4-6-4.2-6-8.2V5.3z" /><path d="M12 6.5v8.5M9.7 9h4.6M11 15h2l-1 2z" />',
	crossedtools:
		'<path d="M6 6l12 12M18 6L6 18" /><path d="M4 5l3-1 1 3-3 1zM20 5l-3-1-1 3 3 1zM4 19l3 1 1-3-3-1zM20 19l-3 1-1-3 3-1z" />',
	gem: '<path d="M6 4h12l3 5-9 11L3 9z" /><path d="M6 4l3 5M18 4l-3 5M3 9h18M9 9l3 11 3-11" />',

	// --- 05 Combat ---
	burst:
		'<path d="M12 2l1.8 5.5 5-3-3 5 5.5 1.8-5.5 1.8 3 5-5-3L12 22l-1.8-5.5-5 3 3-5L2.7 13.6l5.5-1.8-3-5 5 3z" />',
	// Khopesh (Bronze-Age sickle-sword), a struck blow — not a plain arrow.
	thrust:
		'<path d="M5 20l4.5-4.5" /><path d="M8 17l1.5-1.5" /><path d="M9.5 15.5c4.5-1 8-4.5 8.5-11.5-4 .5-7 2.5-8.5 6" />',
	footsteps:
		'<path d="M8 4c-1.5 0-2.2 2-2.2 4S6.5 12 8 12s2.2-2 2.2-4S9.5 4 8 4z" /><path d="M16 11c-1.5 0-2.2 2-2.2 4s.7 4 2.2 4 2.2-2 2.2-4-.7-4-2.2-4z" />',
	// Venom / affliction droplet, not a speedometer dial.
	gauge:
		'<path d="M12 3c3.5 5.5 5.5 8 5.5 11a5.5 5.5 0 0 1-11 0c0-3 2-5.5 5.5-11z" /><path d="M9.5 13.5a2.5 2.5 0 0 0 2.5 2.5" />',
	chevron: '<path d="M6 5l6 5 6-5M6 12l6 5 6-5" />',

	// --- 06 Scenes ---
	sundial:
		'<path d="M3 19a9 9 0 0 1 18 0z" /><path d="M12 19V8" /><path d="M6.5 14.5l-1.5-1.5M17.5 14.5l1.5-1.5M12 6.5v1.5" />',
	lightning: '<path d="M13 2L5 13h5l-2 9 9-12h-5z" />',
	tent: '<path d="M12 4L3 20h18z" /><path d="M12 4v16M9 20l3-6 3 6" />',
	moon: '<path d="M15 3a9 9 0 1 0 6 15A7 7 0 0 1 15 3z" />',
	// Crossed hammer and tongs (smith emblem) for the crafting professions.
	hammer:
		'<path d="M5 20l7-7" /><path d="M9.5 5.5l4 4 3-3-4-4z" /><path d="M11 11l3.5 3.5" /><path d="M19 20c-2-1-3-2.5-3.5-4.5M19 20c1-2 1.2-3.8.5-6" />',
	alembic:
		'<path d="M10 3h4M11 3v5l-5 9a2 2 0 0 0 2 3h8a2 2 0 0 0 2-3l-5-9V3" /><path d="M8 16h8" />',
	knife:
		'<path d="M5 19l9-9" /><path d="M14 10l4-5c1.2 2 .3 5-2 7z" /><path d="M5 19l-1-2 2-1z" />',
	flag: '<path d="M6 3v18" /><path d="M6 4h11l-2.5 3.5L17 11H6z" />',
	// Two opposed head profiles facing each other (whispers / two-faced
	// dealings) for social intrigue.
	maskface:
		'<path d="M5 21c-.5-2 0-3.5 1-4.5-2-1.5-2.5-4-1.5-6.5C5.7 6.5 8 5 10.5 6l-1 2.5 1 1.5-1.2 1.3 1.2 1.7" /><path d="M19 21c.5-2 0-3.5-1-4.5 2-1.5 2.5-4 1.5-6.5C18.3 6.5 16 5 13.5 6l1 2.5-1 1.5 1.2 1.3-1.2 1.7" /><circle cx="8" cy="10" r=".6" /><circle cx="16" cy="10" r=".6" />',
	// Road receding to a sun on the horizon (a journey), not a modern compass.
	compass:
		'<path d="M5 21L10 8M19 21L14 8" /><path d="M12 19v-1.5M12 15v-1.5M12 11v-1.5" /><circle cx="12" cy="5.5" r="2" /><path d="M8 5.5H6M16 5.5h2M9.6 3.1l-1.4-1.4M14.4 3.1l1.4-1.4" />',

	// --- 07 Magic ---
	chaosstar:
		'<path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19" /><circle cx="12" cy="12" r="2" />',
	chain:
		'<circle cx="8" cy="8" r="3.2" /><circle cx="16" cy="16" r="3.2" /><path d="M10.3 10.3l3.4 3.4" />',
	orb: '<circle cx="12" cy="11" r="6" /><path d="M9.5 9a3 3 0 0 1 3-2" /><path d="M6 20h12M9 17l-1 3M15 17l1 3" />',
	sparkle:
		'<path d="M12 3c1 5 3 7 8 9-5 2-7 4-8 9-1-5-3-7-8-9 5-2 7-4 8-9z" />',
	spiral:
		'<path d="M12 12a2.5 2.5 0 1 1-2-2.5 5 5 0 1 1-1.5 6.5 8 8 0 1 1 9.5-8.5" />',
	eye: '<path d="M3 12s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6z" /><circle cx="12" cy="12" r="2.5" />',
	// Rune-inscribed tablet, not a modern spiral notebook.
	spellbook:
		'<path d="M6 3h12a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" /><path d="M12 7l2.6 3.2L12 13.4l-2.6-3.2z" /><path d="M9 17h6" />',

	// --- 08 Creatures ---
	horse:
		'<path d="M8 21c-1-4-.5-7 1.5-9.5C8 10 7.5 8 8 6l3 2.5L14 5c3 1 4.5 4 4.5 8v8" /><circle cx="11.5" cy="9" r=".6" />',
	fang: '<path d="M8 4c-1 6-1 9 1 14 2-5 1-8 1-14z" /><path d="M15 4c-1 6-1 9 1 14 2-5 1-8 1-14z" />',
	paw: '<circle cx="12" cy="15" r="4" /><circle cx="6.5" cy="10" r="1.7" /><circle cx="10.5" cy="7" r="1.7" /><circle cx="14.5" cy="7" r="1.7" /><circle cx="18" cy="10.5" r="1.7" />',

	// --- 10 GM Tools ---
	wand: '<path d="M5 19L15 9" /><path d="M17 3l1 3 3 1-3 1-1 3-1-3-3-1 3-1z" /><path d="M5 19l-1-2 2-1z" />',
	card: '<rect x="6" y="3" width="12" height="18" rx="1.5" /><path d="M12 7l1.6 3-1.6 3-1.6-3z" /><path d="M9 17h6" />',
	chalice:
		'<path d="M7 4h10l-1 5a4 4 0 0 1-8 0z" /><path d="M12 13v5M9 20h6" />',
	cartouche:
		'<rect x="4" y="8" width="16" height="8" rx="4" /><path d="M8 12h.5M11 11.5v1M14 12h.5M16.5 11.5v1" />',
	trap: '<path d="M4 15a8 3.5 0 0 0 16 0" /><path d="M4 15l2-4 2 4 2-4 2 4 2-4 2 4 2-4 2 4" />',
	temple:
		'<path d="M3 9l9-5 9 5" /><path d="M5 9v9M9 9v9M15 9v9M19 9v9" /><path d="M3 20h18M4 9h16" />',
	mountains:
		'<path d="M3 19l6-11 4 6 2-3 6 8z" /><path d="M9 8l2 3-2 2-2-2z" />',
	dragon:
		'<path d="M3 17c2 1 3-2 6-2s3 3 6 2" /><circle cx="4.5" cy="14.5" r="1.5" /><path d="M4 8l1.5 3" /><path d="M15 11l4-4 1 4 3 1-4 2z" />',
}
