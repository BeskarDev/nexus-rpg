import { SigilName } from './sigil-paths'

/**
 * Per-page and per-chapter sigil assignments. One bespoke mark per doc page that
 * used to carry an emoji — the same mark appears on the page heading (via the
 * chapter-sigil remark plugin) and its side-nav entry (via the DocSidebarItems
 * swizzle). Pages with no entry fall back to their chapter sigil on the heading
 * and get no sidebar mark (they carried no emoji).
 *
 * Keys are the NORMALIZED doc id: the Docusaurus doc id (number prefixes
 * stripped, e.g. `basic-rules/how-to-roll`) with any trailing `/index` or
 * `/overview` removed, so a category and its overview doc resolve to one key.
 * Derivable identically from a source file path (plugin), a sidebar item's
 * `docId` (doc entries), or its `href` (category entries) — see the helpers
 * below — so all surfaces stay in lockstep without editing source docs.
 */

/** Numbered chapter directory → chapter sigil (navbar / card / heading fallback). */
export const CHAPTER_SIGIL: Record<string, SigilName> = {
	'01-basic-rules': 'sun',
	'02-adventurers': 'ziggurat',
	'03-statistics': 'tablet',
	'04-equipment': 'anvil',
	'05-combat': 'blades',
	'06-scenes': 'hourglass',
	'07-magic': 'rune',
	'08-creatures': 'serpent',
	'10-gm-tools': 'key',
	'11-character-sheet': 'scroll',
}

/**
 * Normalized doc id → page sigil.
 *
 * Not every page gets a bespoke mark. Where a page is a sibling or a subpage of
 * one that already carries the idea, it maps to its chapter's mark or to the
 * mark of the page it belongs with — 54 marks that stay apart at 14px beat 67
 * that blur together (M10 D2).
 */
export const PAGE_SIGIL: Record<string, SigilName> = {
	// 01 Basic Rules
	'basic-rules/how-to-roll': 'casting-sticks',
	'basic-rules/character-creation': 'stylus',
	'basic-rules/quickstart-characters': 'votive-mask',
	'basic-rules/character-progression': 'ishtar-star',
	'basic-rules/general-rulings': 'scales',
	'basic-rules/glossary': 'tablet',
	// 02 Adventurers
	'adventurers/folk': 'figure',
	'adventurers/languages': 'wedges',
	'adventurers/upbringing': 'hearth',
	'adventurers/background': 'stele',
	'adventurers/npc-relations': 'figure-pair',
	// 03 Statistics
	'statistics/attributes': 'bull-head',
	'statistics/hit-points-wounds': 'canopic-jar',
	'statistics/defenses': 'shield',
	'statistics/resolve': 'flame',
	'statistics/skills': 'hand',
	'statistics/talents': 'sprig',
	// 04 Equipment
	'equipment/items': 'pack',
	'equipment/equipment': 'anvil',
	'equipment/weapons': 'sword',
	'equipment/armor': 'breastplate',
	'equipment/armor-weapon-properties': 'anvil',
	'equipment/exotic-weapons': 'bow',
	'equipment/magic-items': 'gem',
	// 05 Combat
	'combat/combat-scenes': 'blades',
	'combat/attacking': 'khopesh',
	'combat/distances-movement': 'footprints',
	'combat/conditions': 'venom-fang',
	'combat/combat-arts': 'axe',
	// 06 Scenes
	'scenes/scenes-time-intervals': 'sundial',
	'scenes/effect-durations': 'hourglass',
	'scenes/resting': 'tent',
	'scenes/downtime': 'moon',
	'scenes/crafting-professions': 'hammer',
	'scenes/crafting-professions/field-alchemy': 'hammer',
	'scenes/harvesting-creature-parts': 'knife',
	'scenes/challenges': 'standard',
	'scenes/challenges/social-intrigue': 'two-faces',
	'scenes/challenges/travel': 'boat',
	// 07 Magic
	'magic/magic-spells/wild-surge-table': 'vortex',
	'magic/magic-spells/mystic-penance-table': 'eye',
	'magic/magic-spells': 'orb',
	'magic/arcane-spells': 'sparkle',
	'magic/metamagic-arts': 'knot',
	'magic/mystic-spells': 'eye',
	'magic/spell-properties': 'rune',
	// 08 Creatures
	'creatures/mounts-companions': 'horse',
	'creatures/creature-rules': 'serpent',
	'creatures/creatures': 'paw',
	// 10 GM Tools
	'gm-tools': 'key',
	'gm-tools/printing/combat-arts': 'axe',
	'gm-tools/printing/spells': 'sparkle',
	'gm-tools/printing/magic-items': 'gem',
	'gm-tools/printing/print-character-sheet': 'scroll',
	'gm-tools/printing/creature-cards': 'paw',
	'gm-tools/random-tables/random-treasure': 'chalice',
	'gm-tools/random-tables/random-creature': 'paw',
	'gm-tools/random-tables/random-spell': 'sparkle',
	'gm-tools/random-tables/random-name': 'cartouche',
	'gm-tools/random-tables/random-challenge': 'standard',
	'gm-tools/random-tables/random-quests': 'scroll',
	'gm-tools/random-tables/social-intrigue': 'two-faces',
	'gm-tools/random-tables/random-settlement': 'temple',
	'gm-tools/random-tables/random-terrain': 'mountains',
	'gm-tools/builder-tools/creature-builder': 'serpent',
}

/** Drop a trailing `/index` or `/overview` so a category and its landing doc share a key. */
function normalize(key: string): string {
	return key.replace(/\/(index|overview)$/, '')
}

/** Sigil for a resolved Docusaurus doc id (sidebar doc items, or any known id). */
export function pageSigilForDocId(docId: string): SigilName | undefined {
	return PAGE_SIGIL[normalize(docId)]
}

/** Sigil for a sidebar permalink/href, e.g. `/docs/basic-rules/quickstart-characters/overview`. */
export function pageSigilForHref(href: string): SigilName | undefined {
	const key = href.replace(/^\/docs\//, '').replace(/\/$/, '')
	return PAGE_SIGIL[normalize(key)]
}

/**
 * Sigil for a source file path (the remark plugin's `file.path`). Mirrors the
 * Docusaurus doc-id derivation: relative to `docs/`, extension dropped, and each
 * path segment's leading `NN-` number prefix removed.
 */
export function pageSigilForSourcePath(path: string): SigilName | undefined {
	const rel = path.split(/[/\\]docs[/\\]/).pop()
	if (!rel) return undefined
	const docId = rel
		.replace(/\.mdx?$/, '')
		.split(/[/\\]/)
		.map((seg) => seg.replace(/^\d+-/, ''))
		.join('/')
	return PAGE_SIGIL[normalize(docId)]
}

/** Chapter sigil for a source file path, used as the heading fallback. */
export function chapterSigilForSourcePath(path: string): SigilName | undefined {
	for (const dir of Object.keys(CHAPTER_SIGIL)) {
		if (path.includes(`/${dir}/`) || path.includes(`\\${dir}\\`)) {
			return CHAPTER_SIGIL[dir]
		}
	}
	return undefined
}
