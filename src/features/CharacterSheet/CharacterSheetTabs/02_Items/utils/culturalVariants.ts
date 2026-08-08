/**
 * Cultural weapon and armor appearances (M13 S8).
 *
 * The equipment chapter carries two sections that let a reader rename a base item
 * without changing a single mechanic. They were rules the builder could not reach:
 * every item it made was a *Bronze Longsword*, never a *Bronze Bastard Sword*.
 *
 * This table is the machine-readable form of those sections, keyed by the base
 * item's name exactly as it appears in `weapons.json` / `armor.json`. It is the only
 * copy in code, and it must agree with the two doc sections — neither is generated
 * from the other, so a change to one is a change to both. `culturalVariants.test.ts`
 * fails naming the entry that drifted.
 *
 * An appearance is PURELY a name. It never touches cost, load, damage, AV,
 * properties or quality, which is why it is applied at `generateItemName` and
 * nowhere else.
 *
 * ## The region is where a shape is COMMON, not who may carry one
 *
 * Each appearance is keyed to one of the five regions of the folk chapter, or to
 * `Common` for the shapes every people forges. The keying is **suggestive, never a
 * restriction** (owner's call): any adventurer may name their weapon after any of
 * these regardless of where they are from. The region exists so the lists do
 * worldbuilding work rather than reading as an appendix of reskins, which is what
 * `docs/analysis/genre/sword-and-sorcery-genre-review-v2.md` §4.A found them to be.
 *
 * ## What the names are drawn from
 *
 * The world's own ages of bronze, with rule-of-cool latitude. Note this is a source
 * comment and may say so plainly — **the published rules must never name a
 * real-world period or place**, which is a defect the first draft of these sections
 * shipped with and the owner caught.
 *
 * The regions carry their analogues: the Eternal Desert is the river-and-canyon
 * register (khopesh, sappara, the angular bow), the Western Island Realms the
 * seafaring one (xiphos, labrys, linothorax), the Eastern Mist Realms the eastern
 * one (ge, jian, yue, tsurugi, vajra), the Frozen North the steppe-and-ice one
 * (sagaris, sica, horn bow), the Southern Jungle the deep-green one (macuahuitl,
 * atlatl, shotel).
 */

/** The five regions of the folk chapter, plus the shapes belonging to none. */
export const VARIANT_REGIONS = [
	'Eternal Desert',
	'Frozen North',
	'Eastern Mist Realms',
	'Western Island Realms',
	'Southern Jungle',
	'Common',
] as const

export type VariantRegion = (typeof VARIANT_REGIONS)[number]

export type CulturalVariant = {
	/** What the weapon or armor is called. */
	name: string
	/** Where the shape is common. Never a restriction — see the note above. */
	region: VariantRegion
}

const variant = (name: string, region: VariantRegion): CulturalVariant => ({
	name,
	region,
})

export const CULTURAL_VARIANTS: Record<string, CulturalVariant[]> = {
	// ── Axe types ─────────────────────────────────────────────────────────────
	'Throwing Axe': [
		variant('Handaxe', 'Common'),
		variant('Francisca', 'Frozen North'),
		variant('Adze', 'Common'),
	],
	Hatchet: [
		variant('Broadaxe', 'Common'),
		variant('Cleaver', 'Common'),
		variant('War Sickle', 'Eternal Desert'),
	],
	Battleaxe: [
		variant('Crescent Axe', 'Eternal Desert'),
		variant('Sagaris', 'Frozen North'),
		variant('Duckbill Axe', 'Eternal Desert'),
		variant('Yue', 'Eastern Mist Realms'),
	],
	Greataxe: [
		variant('Epsilon Axe', 'Eternal Desert'),
		variant('War Scythe', 'Southern Jungle'),
		variant('Labrys', 'Western Island Realms'),
	],

	// ── Blade types ───────────────────────────────────────────────────────────
	'Throwing Knife': [
		variant('Dart', 'Common'),
		variant('Chakram', 'Eastern Mist Realms'),
		variant('Plumbata', 'Western Island Realms'),
	],
	Scimitar: [
		variant('Khopesh', 'Eternal Desert'),
		variant('Sappara', 'Eternal Desert'),
		variant('Kopis', 'Western Island Realms'),
		variant('Shotel', 'Southern Jungle'),
		variant('Dao', 'Eastern Mist Realms'),
		variant('Macuahuitl', 'Southern Jungle'),
	],
	Shortsword: [
		variant('Dagger', 'Common'),
		variant('Gladius', 'Western Island Realms'),
		variant('Xiphos', 'Western Island Realms'),
		variant('Akinakes', 'Eternal Desert'),
		variant('Sica', 'Frozen North'),
		variant('Jian', 'Eastern Mist Realms'),
	],
	Broadsword: [
		variant('Spatha', 'Western Island Realms'),
		variant('Falcata', 'Western Island Realms'),
		variant('Leaf-Blade Sword', 'Common'),
		variant('Chokuto', 'Eastern Mist Realms'),
	],
	Longsword: [
		variant('Bastard Sword', 'Common'),
		variant('Ring-Pommel Sword', 'Eastern Mist Realms'),
		variant('Chariot Sword', 'Eternal Desert'),
	],
	'Crescent Greatsword': [
		variant('Rhomphaia', 'Frozen North'),
		variant('Falx', 'Frozen North'),
		variant('Harpe', 'Western Island Realms'),
	],
	Greatsword: [
		variant('Great Xiphos', 'Western Island Realms'),
		variant('Warblade', 'Common'),
		variant('Tsurugi', 'Eastern Mist Realms'),
	],
	Twinblade: [
		variant('War Chakram', 'Eastern Mist Realms'),
		variant('Twin Khopesh', 'Eternal Desert'),
	],

	// ── Bow types ─────────────────────────────────────────────────────────────
	Shortbow: [
		variant('Hunting Bow', 'Common'),
		variant('Horn Bow', 'Frozen North'),
	],
	Longbow: [
		variant('Composite Bow', 'Common'),
		variant('Angular Bow', 'Eternal Desert'),
		variant('Yumi', 'Eastern Mist Realms'),
	],
	Warbow: [
		variant('Greatbow', 'Common'),
		variant('Siege Bow', 'Western Island Realms'),
	],

	// ── Brawling types ────────────────────────────────────────────────────────
	Whip: [
		variant('Urumi', 'Eastern Mist Realms'),
		variant('Scourge', 'Eternal Desert'),
	],
	Claw: [
		variant('Arm Blade', 'Southern Jungle'),
		variant('Katar', 'Eastern Mist Realms'),
		variant('Bagh Nakh', 'Eastern Mist Realms'),
	],
	Cestus: [
		variant('Spiked Gauntlet', 'Common'),
		variant('Push Dagger', 'Common'),
		variant('Knuckle Stone', 'Southern Jungle'),
	],
	'Spiked Chain': [
		variant('Weighted Chain', 'Common'),
		variant('Meteor Hammer', 'Eastern Mist Realms'),
	],

	// ── Crossbow types ────────────────────────────────────────────────────────
	'Light Crossbow': [
		variant('Gastraphetes', 'Western Island Realms'),
		variant('Belly Bow', 'Common'),
		variant('Nu', 'Eastern Mist Realms'),
	],
	'Heavy Crossbow': [
		variant('Hand Ballista', 'Western Island Realms'),
		variant('Scorpion', 'Western Island Realms'),
	],

	// ── Mace types ────────────────────────────────────────────────────────────
	Club: [
		variant('Vajra', 'Eastern Mist Realms'),
		variant('War Scepter', 'Eternal Desert'),
		variant('Cudgel', 'Common'),
	],
	'Throwing Club': [
		variant('Light Hammer', 'Common'),
		variant('Throwing Stick', 'Eternal Desert'),
	],
	Mace: [
		variant('War Club', 'Common'),
		variant('Flail', 'Eternal Desert'),
		variant('Morningstar', 'Common'),
		variant('Warhammer', 'Common'),
		variant('Warpick', 'Frozen North'),
	],
	Maul: [
		variant('Greatclub', 'Common'),
		variant('Polehammer', 'Common'),
		variant('Stone Maul', 'Southern Jungle'),
	],

	// ── Polearm types ─────────────────────────────────────────────────────────
	Javelin: [
		variant('Harpoon', 'Western Island Realms'),
		variant('Pilum', 'Western Island Realms'),
	],
	'Short Spear': [
		variant('Trident', 'Western Island Realms'),
		variant('Boar Spear', 'Frozen North'),
	],
	Quarterstaff: [
		variant('Scepter', 'Eternal Desert'),
		variant('Herding Staff', 'Common'),
		variant('Shu', 'Eastern Mist Realms'),
	],
	Glaive: [
		variant('Halberd', 'Common'),
		variant('Poleaxe', 'Common'),
		variant('Ge', 'Eastern Mist Realms'),
		variant('Ji', 'Eastern Mist Realms'),
		variant('Swordstaff', 'Frozen North'),
	],
	Spear: [
		variant('Winged Spear', 'Frozen North'),
		variant('Sarissa', 'Western Island Realms'),
		variant('Dory', 'Western Island Realms'),
		variant('Mao', 'Eastern Mist Realms'),
	],

	// ── Thrown types ──────────────────────────────────────────────────────────
	Sling: [
		variant('Slingshot', 'Common'),
		variant('Staff Sling', 'Western Island Realms'),
	],
	Bola: [
		variant('Net', 'Western Island Realms'),
		variant('Weighted Cord', 'Southern Jungle'),
	],
	'Spear Thrower': [
		variant('Kestros', 'Western Island Realms'),
		variant('Atlatl', 'Southern Jungle'),
	],

	// ── Light armor ───────────────────────────────────────────────────────────
	Leather: [
		variant('Padded Cloth', 'Common'),
		variant('Heavy Robes', 'Eternal Desert'),
	],
	'Banded Leather': [
		variant('Studded Leather', 'Common'),
		variant('Piecemeal Mail', 'Common'),
	],
	'Chain Mail': [
		variant('Linothorax', 'Western Island Realms'),
		variant('Bone Lamellar', 'Frozen North'),
		variant('Horn Lamellar', 'Eastern Mist Realms'),
	],

	// ── Heavy armor ───────────────────────────────────────────────────────────
	'Scale Mail': [
		variant('Disk Plate', 'Eternal Desert'),
		variant('Wood Plates', 'Southern Jungle'),
		variant('Shell Plates', 'Western Island Realms'),
	],
	Breastplate: [
		variant('Plate Cuirass', 'Western Island Realms'),
		variant('Splint Mail', 'Frozen North'),
		variant('Tanko', 'Eastern Mist Realms'),
	],
	'Plate Harness': [
		variant('Segmented Plate', 'Western Island Realms'),
		variant('Heavy Lamellar', 'Eastern Mist Realms'),
		variant('Bell Cuirass', 'Western Island Realms'),
		variant('Keiko', 'Eastern Mist Realms'),
	],

	// ── Helmet ────────────────────────────────────────────────────────────────
	Helmet: [
		variant('Reinforced Turban', 'Eternal Desert'),
		variant('Studded Leather Hood', 'Common'),
		variant('Boar Tusk Helm', 'Western Island Realms'),
	],
}

/**
 * The appearances open to a base item, its own name first.
 *
 * The standard name is a real option in the list rather than the absence of one,
 * for the same reason "No enchantment" is a row: choosing the plain form is a
 * choice, and it has to be reachable after choosing something else. It carries no
 * region, since it belongs to no one people.
 */
export function getCulturalVariants(baseItemName: string): CulturalVariant[] {
	const alternatives = CULTURAL_VARIANTS[baseItemName]
	const standard: CulturalVariant = { name: baseItemName, region: 'Common' }
	return alternatives ? [standard, ...alternatives] : [standard]
}

/** Whether this base item has any alternative appearance at all. */
export function hasCulturalVariants(baseItemName: string): boolean {
	return (CULTURAL_VARIANTS[baseItemName]?.length ?? 0) > 0
}
