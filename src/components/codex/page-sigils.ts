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

/** Normalized doc id → bespoke page sigil. */
export const PAGE_SIGIL: Record<string, SigilName> = {
	// 01 Basic Rules
	'basic-rules/how-to-roll': 'dice',
	'basic-rules/character-creation': 'quill',
	'basic-rules/quickstart-characters': 'masks',
	'basic-rules/character-progression': 'star',
	'basic-rules/general-rulings': 'scales',
	'basic-rules/glossary': 'book',
	// 02 Adventurers
	'adventurers/folk': 'figure',
	'adventurers/languages': 'speech',
	'adventurers/upbringing': 'hearth',
	'adventurers/background': 'portrait',
	'adventurers/npc-relations': 'twofigures',
	// 03 Statistics
	'statistics/attributes': 'dumbbell',
	'statistics/hit-points-wounds': 'heart',
	'statistics/defenses': 'shield',
	'statistics/resolve': 'spark',
	'statistics/skills': 'runner',
	'statistics/talents': 'target',
	// 04 Equipment
	'equipment/items': 'pack',
	'equipment/equipment': 'coins',
	'equipment/weapons': 'sword',
	'equipment/armor': 'breastplate',
	'equipment/armor-weapon-properties': 'grid',
	'equipment/exotic-weapons': 'crossedtools',
	'equipment/magic-items': 'gem',
	// 05 Combat
	'combat/combat-scenes': 'burst',
	'combat/attacking': 'thrust',
	'combat/distances-movement': 'footsteps',
	'combat/conditions': 'gauge',
	'combat/combat-arts': 'chevron',
	// 06 Scenes
	'scenes/scenes-time-intervals': 'sundial',
	'scenes/effect-durations': 'lightning',
	'scenes/resting': 'tent',
	'scenes/downtime': 'moon',
	'scenes/crafting-professions': 'hammer',
	'scenes/crafting-professions/field-alchemy': 'alembic',
	'scenes/harvesting-creature-parts': 'knife',
	'scenes/challenges': 'flag',
	'scenes/challenges/social-intrigue': 'maskface',
	'scenes/challenges/travel': 'compass',
	// 07 Magic
	'magic/magic-spells/wild-surge-table': 'chaosstar',
	'magic/magic-spells/mystic-penance-table': 'chain',
	'magic/magic-spells': 'orb',
	'magic/arcane-spells': 'sparkle',
	'magic/metamagic-arts': 'spiral',
	'magic/mystic-spells': 'eye',
	'magic/spell-properties': 'spellbook',
	// 08 Creatures
	'creatures/mounts-companions': 'horse',
	'creatures/creature-rules': 'fang',
	'creatures/creatures': 'paw',
	// 10 GM Tools
	'gm-tools': 'key',
	'gm-tools/printing/combat-arts': 'chevron',
	'gm-tools/printing/spells': 'wand',
	'gm-tools/printing/magic-items': 'card',
	'gm-tools/printing/print-character-sheet': 'scroll',
	'gm-tools/printing/creature-cards': 'card',
	'gm-tools/random-tables/random-treasure': 'chalice',
	'gm-tools/random-tables/random-creature': 'paw',
	'gm-tools/random-tables/random-spell': 'wand',
	'gm-tools/random-tables/random-name': 'cartouche',
	'gm-tools/random-tables/random-challenge': 'trap',
	'gm-tools/random-tables/random-quests': 'scroll',
	'gm-tools/random-tables/social-intrigue': 'maskface',
	'gm-tools/random-tables/random-settlement': 'temple',
	'gm-tools/random-tables/random-terrain': 'mountains',
	'gm-tools/builder-tools/creature-builder': 'dragon',
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
	const key = href
		.replace(/^\/docs\//, '')
		.replace(/\/$/, '')
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
