import {
	barD,
	boxD,
	circleD,
	ellipseD,
	leafD,
	path,
	polyD,
	rayFanD,
	blobD,
	ribbonD,
	ribbonLoopD,
	arcBandD,
	ringD,
	rowD,
	spiralD,
	starD,
	wedgeD,
} from './sigil-geometry'

/**
 * Single source of truth for the sigils — the raw inner SVG markup (shapes only,
 * no <svg> wrapper) for each mark. Consumed by:
 *   - SigilIcon (React, renders these inside a themed <svg>)
 *   - the chapter-sigil remark plugin (injects the mark into doc h1 headers)
 *   - the DocSidebarItems swizzle (mark before the sidebar label)
 *   - the navbar mask generator (`bun run sigils:masks`)
 *
 * Every mark is a **carved silhouette**: solid `currentColor` mass, interior
 * detail as real voids or separated subpaths, no strokes and no rounded corners.
 * The motif is always a thing seen in profile or plan — the determinative logic
 * of Egyptian and Mesopotamian sign lists, which is a writing system built to
 * stay legible tiny. See README § Ornament / Sigil System (no cuneiform font, no
 * accidental meaning) and the design law in the M10 milestone; `sigils:check`
 * enforces the mechanical half of it.
 *
 * Two tiers:
 *   - Chapter sigils (navbar + homepage cards + chapter fallback).
 *   - Page sigils: a mark per doc page that used to carry an emoji, mapped in
 *     `page-sigils.ts`. Sibling pages share their chapter's mark rather than
 *     each getting a bespoke one that blurs into its neighbours at 14px.
 */

/** The grid every mark is drawn on. */
export const SIGIL_VIEWBOX = 32

export type SigilName =
	// --- Chapter sigils (navbar / cards) ---
	| 'sun' // Basic Rules
	| 'ziggurat' // Adventurers
	| 'tablet' // Statistics
	| 'anvil' // Equipment
	| 'blades' // Combat
	| 'hourglass' // Scenes
	| 'rune' // Magic
	| 'serpent' // Creatures
	| 'key' // GM Tools
	| 'scroll' // Character Sheet
	// --- 01 Basic Rules ---
	| 'casting-sticks'
	| 'stylus'
	| 'votive-mask'
	| 'ishtar-star'
	| 'scales'
	// --- 02 Adventurers ---
	| 'figure'
	| 'wedges'
	| 'hearth'
	| 'stele'
	| 'figure-pair'
	// --- 03 Statistics ---
	| 'bull-head'
	| 'canopic-jar'
	| 'shield'
	| 'flame'
	| 'hand'
	| 'sprig'
	// --- 04 Equipment ---
	| 'pack'
	| 'sword'
	| 'breastplate'
	| 'bow'
	| 'gem'
	// --- 05 Combat ---
	| 'khopesh'
	| 'footprints'
	| 'venom-fang'
	| 'axe'
	// --- 06 Scenes ---
	| 'sundial'
	| 'tent'
	| 'moon'
	| 'hammer'
	| 'knife'
	| 'standard'
	| 'two-faces'
	| 'boat'
	// --- 07 Magic ---
	| 'vortex'
	| 'orb'
	| 'sparkle'
	| 'knot'
	| 'eye'
	// --- 08 Creatures ---
	| 'horse'
	| 'paw'
	// --- 10 GM Tools ---
	| 'chalice'
	| 'cartouche'
	| 'temple'
	| 'mountains'
	// --- 11 Character sheet stats (M9 S4) ---
	// Only the marks the sheet needed that nothing here already depicted. The
	// other stat tiles reuse existing marks — see `stat-sigils.ts`.
	| 'sweat-drop'
	| 'measuring-rod'
	| 'broken-jar'
	| 'ingots'
	// --- Status conditions (M13) ---
	// One mark per condition that has an instrument or a visible sign to depict.
	// Fourteen of the twenty-four needed a new mark; the other ten reuse marks
	// above. Both halves are mapped in `condition-sigils.ts`.
	| 'target'
	| 'mace'
	| 'ram'
	| 'tilted-column'
	| 'lotus'
	| 'bell'
	| 'drum'
	| 'bird'
	| 'cowl'
	| 'blindfold'
	| 'stopper'
	| 'statue'
	| 'fallen-figure'
	| 'water'
	| 'hollow-figure'

export const SIGIL_INNER: Record<SigilName, string> = {
	// --- Chapter sigils ---

	/** Sun disc with a corona — the rules that light everything else. */
	sun: path(circleD(16, 16, 9)) + path(rayFanD(16, 16, 8.5, 13.5, 7, 8, -90)),

	/** Stepped temple platform, seen head-on, with its processional doorway. */
	ziggurat: path(
		boxD(2.5, 25, 29.5, 29.5) +
			boxD(5, 20.5, 27, 25) +
			boxD(7.5, 16, 24.5, 20.5) +
			boxD(10, 11.5, 22, 16) +
			boxD(12.5, 6, 19.5, 11.5) +
			boxD(14.2, 25, 17.8, 29.5),
		true,
	),

	/** Clay tablet, flared as a pressed slab is, with three impressed rulings. */
	tablet: path(
		polyD([
			[8.5, 3.5],
			[23.5, 3.5],
			[25, 28.5],
			[7, 28.5],
		]) +
			boxD(11, 9.5, 22, 12) +
			boxD(11, 15, 22.2, 17.5) +
			boxD(11, 20.5, 22.4, 23),
		true,
	),

	/** Smith's anvil in profile: horn, face, waist, base. */
	anvil: path(
		polyD([
			[1.5, 13.5],
			[9, 8],
			[27, 8],
			[27, 15],
			[19.5, 15],
			[19.5, 20],
			[25.5, 20],
			[25.5, 25.5],
			[6.5, 25.5],
			[6.5, 20],
			[12.5, 20],
			[12.5, 15],
			[9, 15],
		]),
	),

	/** Two khopeshes crossed over a grip band — the combat mark. */
	blades:
		path(ribbonD([[7, 27], [12, 20], [17.5, 12.5], [22, 8], [26.5, 7.5]], 5.6, 3.4)) +
		path(ribbonD([[25, 27], [20, 20], [14.5, 12.5], [10, 8], [5.5, 7.5]], 5.6, 3.4)) +
		path(boxD(9.5, 21.5, 22.5, 25)),

	/** Sandglass: two vessels through a throat, capped top and bottom. */
	hourglass:
		path(boxD(5.5, 3.5, 26.5, 7.5)) +
		path(boxD(5.5, 24.5, 26.5, 28.5)) +
		path(
			polyD([
				[7.5, 7.5],
				[24.5, 7.5],
				[17.4, 14.8],
				[14.6, 14.8],
			]) +
				boxD(14.6, 14.8, 17.4, 17.2) +
				polyD([
					[14.6, 17.2],
					[17.4, 17.2],
					[24.5, 24.5],
					[7.5, 24.5],
				]),
		),

	/** A carved stave with struck arms — the magic mark. */
	rune:
		path(boxD(13.4, 3.5, 18.6, 28.5)) +
		path(barD([18.6, 11], [26, 4.5], 4.4)) +
		path(barD([18.6, 19], [26, 25.5], 4.4)) +
		path(barD([13.4, 15], [6, 8.5], 4.4)),

	/** Serpent coiled in an S, head raised — the creatures mark. */
	serpent:
		path(
			ribbonD(
				[
					[8.5, 27.5],
					[14, 25],
					[18, 20.5],
					[14, 16],
					[9.5, 12],
					[13, 7],
					[18, 6.5],
				],
				4,
				7.5,
			),
		) +
		path(polyD([[17, 3], [28, 7], [17, 10.5]])),

	/** Bronze key: lozenge bow, shaft, two wards. */
	key:
		path(
			polyD([
				[16, 2],
				[24.5, 10],
				[16, 18],
				[7.5, 10],
			]) + polyD([[16, 7], [19, 10], [16, 13], [13, 10]]),
			true,
		) +
		path(boxD(13, 14, 19, 29.5)) +
		path(boxD(19, 19.5, 26, 23.5)) +
		path(boxD(19, 25.5, 24.5, 29.5)),

	/** Papyrus scroll, rolled at both ends, three lines of script. */
	scroll:
		path(boxD(5, 4.5, 8.5, 27.5)) +
		path(boxD(23.5, 4.5, 27, 27.5)) +
		path(
			boxD(8.5, 7, 23.5, 25) +
				boxD(11.5, 9.9, 20.5, 12.1) +
				boxD(11.5, 14.9, 18, 17.1) +
				boxD(11.5, 19.9, 19.5, 22.1),
			true,
		),

	// --- 01 Basic Rules ---

	/** Three casting sticks fanned from the throw — how the dice fall. */
	'casting-sticks':
		path(barD([16, 29], [7.5, 6], 5, 3.4)) +
		path(barD([16, 29], [16, 4.5], 5, 3.4)) +
		path(barD([16, 29], [24.5, 6], 5, 3.4)),

	/** Reed stylus poised over the wedge it has just impressed. */
	stylus:
		path(barD([25.5, 6], [13, 18.5], 10, 4.5)) +
		path(polyD([[11, 16.5], [17, 20.5], [6.5, 25.5]])) +
		path(wedgeD(29.5, 18.5, 9, 5.5, 180)) +
		path(wedgeD(29.5, 26.5, 9, 5.5, 180)),

	/** Votive face mask: brow band, two eye slots, a mouth bar. */
	'votive-mask': path(
		polyD([
			[8.5, 4],
			[23.5, 4],
			[22, 22],
			[16, 28.5],
			[10, 22],
		]) +
			boxD(12, 10.5, 14.6, 14) +
			boxD(17.4, 10.5, 20, 14) +
			boxD(13, 18.5, 19, 21),
		true,
	),

	/** Eight-pointed star of Ishtar — the mark of advancement. */
	'ishtar-star': path(starD(16, 16, 13.5, 5.8, 8)),

	/** Balance scale: beam, two pans, a standing post. */
	scales:
		path(boxD(4, 7.5, 28, 10.5)) +
		path(boxD(14.6, 7.5, 17.4, 26)) +
		path(boxD(8.5, 26, 23.5, 29.5)) +
		path(polyD([[2.5, 14], [12.5, 14], [7.5, 21]])) +
		path(polyD([[19.5, 14], [29.5, 14], [24.5, 21]])),

	// --- 02 Adventurers ---

	/** A standing figure — the folk of the world. */
	figure:
		path(circleD(16, 6.5, 4.5)) +
		path(
			polyD([
				[16, 10],
				[24.5, 15.5],
				[24.5, 19.5],
				[19.5, 18],
				[19.5, 29.5],
				[12.5, 29.5],
				[12.5, 18],
				[7.5, 19.5],
				[7.5, 15.5],
			]),
		),

	/** Four impressed cuneiform wedges — spoken and written tongues. */
	wedges:
		path(wedgeD(2.5, 7, 13, 9)) +
		path(wedgeD(17.5, 7, 13, 9)) +
		path(wedgeD(2.5, 23.5, 13, 9)) +
		path(wedgeD(17.5, 23.5, 13, 9)),

	/** House and hearth: gabled roof over a doorway — where a character is from. */
	hearth:
		path(polyD([[16, 3], [30, 14], [2, 14]])) +
		path(boxD(6, 14, 26, 29.5) + boxD(12, 17.5, 20, 29.5), true),

	/** Round-topped stele carrying a two-band inscription — a character's past. */
	stele: path(
		polyD([
			[8.5, 29.5],
			[8.5, 11],
			[10.5, 6],
			[16, 3],
			[21.5, 6],
			[23.5, 11],
			[23.5, 29.5],
		]) +
			boxD(11.5, 14.5, 20.5, 17) +
			boxD(11.5, 20, 20.5, 22.5),
		true,
	),

	/** Two figures turned toward each other — bonds and rivalries. */
	'figure-pair':
		path(circleD(8.5, 7.5, 4)) +
		path(
			polyD([
				[8.5, 10.5],
				[12.5, 16],
				[12.5, 29.5],
				[4.5, 29.5],
				[4.5, 16],
			]),
		) +
		path(circleD(23.5, 7.5, 4)) +
		path(
			polyD([
				[23.5, 10.5],
				[27.5, 16],
				[27.5, 29.5],
				[19.5, 29.5],
				[19.5, 16],
			]),
		),

	// --- 03 Statistics ---

	/** Bull's head with swept horns — raw attributes. */
	'bull-head':
		path(ribbonD([[4, 12], [5, 6.5], [10, 4.5], [14, 9]], 3.8, 3.4)) +
		path(ribbonD([[28, 12], [27, 6.5], [22, 4.5], [18, 9]], 3.8, 3.4)) +
		path(
			polyD([
				[9, 9],
				[23, 9],
				[21, 22],
				[16, 28.5],
				[11, 22],
			]) +
				boxD(11.5, 12.5, 14.8, 15.5) +
				boxD(17.2, 12.5, 20.5, 15.5),
			true,
		),

	/**
	 * Canopic jar — the vessel a body's viscera were kept in, so it reads as the
	 * thing that holds a life rather than as a generic heart. Jackal-headed lid
	 * over a collar and a swelling belly: three masses, no interior detail, which
	 * is what keeps it legible once the lid is 3px tall.
	 */
	'canopic-jar':
		path(
			blobD([
				[10.5, 9.5],
				[10.5, 6],
				[13, 2.5],
				[19, 2.5],
				[21.5, 6],
				[21.5, 9.5],
			]),
		) +
		path(boxD(8.5, 9.5, 23.5, 12.5)) +
		path(
			blobD([
				[10.5, 12.5],
				[21.5, 12.5],
				[25, 18],
				[23, 26],
				[19, 29.5],
				[13, 29.5],
				[9, 26],
				[7, 18],
			]),
		),

	/** Shield with a central boss — defenses. */
	shield: path(
		polyD([
			[5, 5.5],
			[27, 5.5],
			[27, 15],
			[16, 29],
			[5, 15],
		]) + circleD(16, 14, 3),
		true,
	),

	/** A flame: resolve, burning as it is spent. */
	flame: path(
		blobD([
			[14.5, 2],
			[19.5, 7.5],
			[23.5, 14],
			[24, 22],
			[19, 29],
			[12, 29],
			[8, 22.5],
			[8.5, 14.5],
			[12, 9.5],
		]) + polyD([[16, 15], [20, 21], [16, 25.5], [12, 21]]),
		true,
	),

	/** Open hand — the reach of a character's skills. */
	hand:
		path(
			polyD([
				[7.5, 17],
				[24.5, 17],
				[24.5, 24],
				[20, 29.5],
				[12, 29.5],
				[7.5, 24],
			]),
		) +
		path(boxD(7.5, 8.5, 10.6, 18)) +
		path(boxD(12.1, 5.5, 15.2, 18)) +
		path(boxD(16.7, 6.5, 19.8, 18)) +
		path(boxD(21.3, 10.5, 24.4, 18)) +
		path(ribbonD([[9.5, 23.5], [5.5, 22], [2.5, 18.5]], 4.2, 3.4)),

	/** A sprig putting out leaves — talents, grown deliberately. */
	sprig:
		path(boxD(14.4, 6, 17.6, 29.5)) +
		path(leafD([17.6, 15.5], [4.5, 12], 6.4)) +
		path(leafD([14.4, 20], [27.5, 16.5], 6.4)) +
		path(leafD([17.6, 25], [5.5, 22], 6)) +
		path(polyD([[16, 2], [19.5, 8], [12.5, 8]])),

	// --- 04 Equipment ---

	/** Traveller's pack with its flap and strap. */
	pack:
		path(
			polyD([
				[9, 10],
				[23, 10],
				[26, 29.5],
				[6, 29.5],
			]),
		) +
		path(boxD(7.5, 15, 24.5, 19)) +
		path(polyD([[11.5, 10], [11.5, 4.5], [20.5, 4.5], [20.5, 10]])),

	/** Straight blade, point up, over guard and pommel — weapons. */
	sword:
		path(
			polyD([
				[16, 2],
				[22, 10],
				[20, 18.5],
				[18.5, 21],
				[13.5, 21],
				[12, 18.5],
				[10, 10],
			]),
		) +
		path(boxD(11.5, 21, 20.5, 23.5)) +
		path(boxD(13.6, 23.5, 18.4, 26.5)) +
		path(
			polyD([
				[10.5, 26.5],
				[21.5, 26.5],
				[20, 29.8],
				[17.4, 29.8],
				[16, 27.4],
				[14.6, 29.8],
				[12, 29.8],
			]),
		),

	/** Cuirass: shoulders, chest ridge, waist — armor. */
	breastplate: path(
		polyD([
			[6, 5],
			[12.5, 5],
			[16, 8.5],
			[19.5, 5],
			[26, 5],
			[25.5, 16],
			[21.5, 29.5],
			[10.5, 29.5],
			[6.5, 16],
		]) + boxD(14.4, 12, 17.6, 25),
		true,
	),

	/** Recurve bow with its string drawn straight — exotic weapons. */
	bow:
		path(
			ribbonD(
				[
					[17, 5],
					[11.5, 8],
					[20, 11.5],
					[23, 16],
					[20, 20.5],
					[11.5, 24],
					[17, 27],
				],
				4.6,
				4.6,
			),
		) +
		path(boxD(15.5, 4.5, 18.5, 27.5)),

	/** Cut gem, table and crown — magic items. */
	gem: path(
		polyD([
			[9, 6],
			[23, 6],
			[28.5, 13],
			[16, 28.5],
			[3.5, 13],
		]) +
			polyD([[12, 11], [20, 11], [16, 17]]),
		true,
	),

	// --- 05 Combat ---

	/** Khopesh mid-strike: sickle blade over a straight grip. */
	khopesh:
		path(barD([7.5, 29.5], [10, 20.5], 7, 6.4)) +
		path(
			blobD([
				[8.5, 22],
				[11, 12],
				[18, 4.5],
				[29, 3.5],
				[25.5, 11],
				[19, 14],
				[15.5, 18],
				[13.5, 23],
			]),
		),

	/** Two prints, one ahead of the other — distances and movement. */
	footprints:
		path(
			blobD([
				[9.5, 2],
				[14, 5.5],
				[14.5, 12.5],
				[11, 17],
				[5.5, 13.5],
				[4.5, 6.5],
			]),
		) +
		path(
			blobD([
				[22.5, 15],
				[27, 18.5],
				[27.5, 25.5],
				[24, 30],
				[18.5, 26.5],
				[17.5, 19.5],
			]),
		),

	/** Two fangs and the drop falling from them — conditions and afflictions. */
	'venom-fang':
		path(polyD([[4.5, 3.5], [14.5, 3.5], [13, 14], [9.5, 21.5], [6, 14]])) +
		path(polyD([[17.5, 3.5], [27.5, 3.5], [26, 14], [22.5, 21.5], [19, 14]])) +
		path(blobD([[16, 22], [18.5, 26.5], [16, 29.5], [13.5, 26.5]])),

	/** Broad axe on its haft — combat arts. */
	axe:
		path(boxD(13.9, 2.5, 18.1, 30)) +
		path(
			polyD([
				[15, 8.5],
				[20, 6.5],
				[26, 3.5],
				[28, 12],
				[26, 20.5],
				[20, 17.5],
				[15, 15.5],
			]),
		) +
		path(
			polyD([
				[17, 8.5],
				[12, 6.5],
				[6, 3.5],
				[4, 12],
				[6, 20.5],
				[12, 17.5],
				[17, 15.5],
			]),
		),

	// --- 06 Scenes ---

	/** Sundial: gnomon on a graduated arc — scenes and time intervals. */
	sundial:
		path(boxD(2.5, 22, 29.5, 25.5)) +
		path(arcBandD(16, 22, 13.5, 9.5, 180, 360)) +
		path(polyD([[16, 5], [19.5, 22], [12.5, 22]])),

	/** Tent pitched for the night — resting. */
	tent: path(
		polyD([
			[16, 3],
			[29.5, 28.5],
			[2.5, 28.5],
		]) + polyD([[16, 14], [21, 28.5], [11, 28.5]]),
		true,
	),

	/** Waning crescent — the long weeks of downtime. */
	moon: path(
		blobD([
			[15.5, 2.5],
			[24, 8],
			[26.5, 16],
			[24, 24],
			[15.5, 29.5],
			[9.5, 27],
			[17.5, 22.5],
			[19.5, 16],
			[17.5, 9.5],
			[9.5, 5],
		]),
	),

	/** Hammer and its head, struck downward — crafting professions. */
	hammer:
		path(barD([8, 29.5], [18.5, 10], 4.8, 4.8)) +
		path(
			polyD([
				[11, 3],
				[27.5, 5],
				[27.5, 14],
				[11, 16],
				[7.5, 11],
				[7.5, 8],
			]),
		),

	/** Curved flint blade in its haft — harvesting creature parts. */
	knife:
		path(barD([3.5, 28.5], [12, 20], 7, 6)) +
		path(
			blobD([
				[28.5, 3.5],
				[25, 13],
				[17.5, 21.5],
				[9, 25],
				[13, 16],
				[20.5, 8.5],
			]),
		),

	/**
	 * Field standard: a solar emblem on a pole, crossbar and two hanging
	 * streamers — the Assyrian/Egyptian signum, not a banner on a flagpole.
	 */
	standard:
		path(polyD([[9.5, 2.5], [22.5, 2.5], [24, 11], [8, 11]])) +
		path(boxD(13.9, 11, 18.1, 29.5)) +
		path(polyD([[8.5, 11], [11.5, 11], [11.5, 19], [10, 21.5], [8.5, 19]])) +
		path(polyD([[20.5, 11], [23.5, 11], [23.5, 19], [22, 21.5], [20.5, 19]])),

	/** Two profiles turned against each other — social intrigue. */
	'two-faces':
		path(
			polyD([
				[4, 27.5],
				[3.5, 15],
				[6, 8],
				[11, 5.5],
				[14, 10],
				[11.5, 13],
				[13.5, 15.5],
				[10.5, 19],
				[11.5, 27.5],
			]),
		) +
		path(
			polyD([
				[28, 27.5],
				[28.5, 15],
				[26, 8],
				[21, 5.5],
				[18, 10],
				[20.5, 13],
				[18.5, 15.5],
				[21.5, 19],
				[20.5, 27.5],
			]),
		),

	/** Reed boat under sail — travel. */
	boat:
		path(boxD(14.4, 4, 17.6, 25.5)) +
		path(polyD([[17.4, 5.5], [27, 13], [17.4, 18.5]])) +
		path(
			blobD([
				[3, 19],
				[9.5, 23.5],
				[22.5, 23.5],
				[29, 19],
				[25.5, 28.5],
				[6.5, 28.5],
			]),
		),

	// --- 07 Magic ---

	/** A vortex opening — wild magic surging out of control. */
	vortex: path(spiralD(16, 16, 2.5, 12.5, 1.75, 4.4)),

	/** Scrying orb on its stand — the magic overview. */
	orb:
		path(circleD(16, 13, 8.6) + circleD(12.8, 9.8, 1.9), true) +
		path(boxD(12.5, 19.5, 19.5, 25.5)) +
		path(polyD([[9, 25.5], [23, 25.5], [25.5, 29.5], [6.5, 29.5]])),

	/** Four-point radiance — arcane spellcraft. */
	sparkle:
		path(starD(16, 16, 14, 5.6, 4, -90)) +
		path(starD(16, 16, 9, 3.6, 4, -45)),

	/** Interlaced knot — metamagic, spells bent around themselves. */
	knot: path(
		ribbonLoopD(
			[
				[16, 4.5],
				[23, 8.5],
				[27, 16],
				[23, 23.5],
				[16, 27.5],
				[9, 23.5],
				[5, 16],
				[9, 8.5],
			],
			4.6,
		) + starD(16, 16, 6.4, 2.8, 4, -90),
		true,
	),

	/** The seeing eye — mystic sight. */
	eye:
		path(
			ribbonLoopD(
				[
					[4, 16],
					[10, 9.5],
					[16, 7.5],
					[22, 9.5],
					[28, 16],
					[22, 22.5],
					[16, 24.5],
					[10, 22.5],
				],
				4,
			),
			true,
		) +
		path(circleD(16, 16, 4)),

	// --- 08 Creatures ---

	/** Horse in profile — mounts and companions. */
	horse:
		path(
			blobD([
				[7, 15.5],
				[12, 12.5],
				[19, 12],
				[24, 13.5],
				[26, 17],
				[24, 21],
				[16, 22],
				[9, 21],
			]),
		) +
		path(ribbonD([[21, 15], [23.5, 11], [24.5, 8]], 6.5, 4.6)) +
		path(polyD([[22.5, 5.5], [29.5, 7], [29, 10.5], [24, 11], [21.5, 8.5]])) +
		path(ribbonD([[8, 16], [4.5, 19], [3, 24]], 3.8, 2.8)) +
		path(boxD(8.5, 20, 11.5, 29.5)) +
		path(boxD(13.5, 20, 16.5, 29.5)) +
		path(boxD(19.5, 20, 22.5, 29.5)) +
		path(boxD(24, 20, 27, 29.5)),

	/** Beast's paw print — creatures at large. */
	paw:
		path(ellipseD(16, 23.5, 7.8, 6.2)) +
		path(ellipseD(5.5, 15.5, 2.8, 3.5)) +
		path(ellipseD(11.5, 9, 3, 3.8)) +
		path(ellipseD(20.5, 9, 3, 3.8)) +
		path(ellipseD(26.5, 15.5, 2.8, 3.5)),

	// --- 10 GM Tools ---

	/** Footed chalice — treasure. */
	chalice:
		path(
			polyD([
				[6.5, 4],
				[25.5, 4],
				[23, 13],
				[19, 17],
				[13, 17],
				[9, 13],
			]),
		) +
		path(boxD(13.6, 17, 18.4, 25)) +
		path(polyD([[8, 25], [24, 25], [26, 29.5], [6, 29.5]])),

	/** Name-ring: an oval cartouche closed with its tie — names. */
	cartouche:
		path(
			ellipseD(17.5, 16, 12, 9) + ellipseD(17.5, 16, 7.8, 4.6),
			true,
		) + path(boxD(2, 11.5, 5.5, 20.5)),

	/** Temple facade: pediment over a colonnade — settlements. */
	temple:
		path(polyD([[16, 4], [29, 11], [3, 11]])) +
		path(boxD(4, 11, 28, 13.5)) +
		path(rowD(6, 26, 13.5, 25, 4, 3)) +
		path(boxD(2.5, 25, 29.5, 28.5)),

	/** Two peaks with a snowline — terrain. */
	mountains: path(
		polyD([
			[2, 28.5],
			[11.5, 6.5],
			[17.5, 20],
			[21, 13],
			[30, 28.5],
		]),
	),

	// --- Character sheet stats -----------------------------------------------


	/** A single bead of sweat — Fatigue. */
	'sweat-drop': path(
		blobD([
			[16, 2.5],
			[23, 13],
			[24.5, 20.5],
			[16, 29.5],
			[7.5, 20.5],
			[9, 13],
		]),
	),

	/**
	 * The vessel of life, broken: lidless, its rim cracked away, a shard beside
	 * it — a Wound. Pairs with `canopic-jar`, which an unwounded slot shows.
	 */
	'broken-jar':
		path(
			polyD([
				[9.5, 11],
				[15.5, 11],
				[17.5, 16.5],
				[21, 12],
				[24.5, 17.5],
				[22.5, 25.5],
				[18.5, 29.5],
				[12.5, 29.5],
				[8.5, 25.5],
				[6.5, 17.5],
			]),
		) + path(polyD([[23.5, 3.5], [27.5, 7.5], [22.5, 8.5]])),

	/** Stacked ring-ingots — Coins. Coinage postdates the setting; wealth was weighed silver. */
	ingots:
		path(ellipseD(16, 6.5, 10, 3.1)) +
		path(ellipseD(16, 16, 10, 3.1)) +
		path(ellipseD(16, 25.5, 10, 3.1)),

	/**
	 * A graduated measuring rod — Height. The rod-and-line is the surveyor's
	 * instrument the period actually used (Ur-Nammu and Gudea are both depicted
	 * holding one), and unlike a mountain or a standing stone it means MEASURED
	 * extent rather than terrain or a monument, so it does not collide with
	 * `mountains` or `stele`. Read vertically: the graduations are what make it
	 * a rule and not a staff.
	 */
	'measuring-rod':
		path(boxD(9.5, 3, 15.5, 29)) +
		path(boxD(15.5, 6, 22.5, 9)) +
		path(boxD(15.5, 12, 22.5, 15)) +
		path(boxD(15.5, 18, 22.5, 21)) +
		path(boxD(15.5, 24, 22.5, 27)),

	// --- Status conditions (M13) ---
	//
	// These were the hardest tier in the set to draw, and the reason is worth
	// recording: every other sigil names a THING, while a condition names a state
	// of a body. So each of these depicts the instrument or the visible sign
	// instead — a mace for stunned, a bell for dazed, water for suffocating.
	//
	// The mechanical gate was never the constraint. The first full round passed
	// `sigils:check` 14/14 and read correctly 2/14: the lyre drawn for charmed came
	// out a wastebasket, the scorpion drawn for paralyzed a bull's head, the ear
	// drawn for deafened a snail. Four more rounds got it to 13/14. What the
	// rounds taught, all of it about the 16px row-gutter size these ship at:
	//
	//   - interior detail fills in. A lyre's strings, a sistrum's crossbars and a
	//     drum's lacing all closed up; meaning has to live in the OUTLINE, and a
	//     void needs ~3.5 units before it survives.
	//   - thin appendages merge or vanish — a scorpion's claws, a bird's beak.
	//   - a mirrored pair of limbs reads as horns no matter what it depicts, which
	//     is what made two different marks come out as `bull-head`.
	//   - a vertical stem on a round mass always reads as a mushroom. It sank the
	//     sistrum and the hand-mirror both, and it is why `bell` has a base plate.
	//   - a mark has to read as one whole shape. Anything assembled from parts
	//     reads as its own convex hull once the parts touch.
	//
	// Where a mark failed twice the MOTIF was wrong rather than the geometry, so
	// most of the later rounds changed object instead of nudging coordinates.

	/** A shooting butt seen face-on — Marked. */
	target:
		path(ringD(16, 16, 13, 9.5), true) +
		path(ringD(16, 16, 7, 3.9), true) +
		path(circleD(16, 16, 1.3)),

	/** A pear-headed mace — Stunned. The blunt instrument, not its effect. */
	mace:
		path(barD([11, 28.5], [17, 13], 5.4, 5.4)) +
		path(
			blobD([
				[16, 3.5],
				[22.5, 4.5],
				[25, 11],
				[19.5, 15.5],
				[12.5, 14.5],
				[9, 8.5],
			]),
		),

	/** A battering ram driven along its beam — Pushed. */
	ram:
		path(barD([4, 16], [22, 16], 5, 6)) +
		path(polyD([[21, 9], [29.5, 12.5], [29.5, 19.5], [21, 23]])) +
		path(boxD(7, 21, 11, 29.5)),

	/** A column toppling off its base — Staggered. */
	'tilted-column':
		path(barD([9, 27], [21, 6.5], 6.5, 6.5)) +
		path(polyD([[16, 2], [28, 6], [26, 11], [15, 8]])) +
		path(boxD(3, 26.5, 17, 29.5)),

	/**
	 * A lotus in bloom — Charmed. Two rounds of drawing a lyre for this slot
	 * proved a frame fills in at 16px; a blossom is solid mass with a splayed
	 * outline, which is what survives.
	 */
	lotus:
		path(
			polyD([
				[16, 6],
				[21, 9],
				[23, 17],
				[16, 21],
				[9, 17],
				[11, 9],
			]),
		) +
		path(polyD([[4, 9], [10, 12], [11.5, 19], [6, 16]])) +
		path(polyD([[28, 9], [22, 12], [20.5, 19], [26, 16]])) +
		path(boxD(14, 21, 18, 29.5)),

	/**
	 * A bell — Dazed. The base plate is load-bearing: without it the crown and
	 * body read as a mushroom, and the outline sat 0.093 from `sweat-drop`,
	 * because a bell and a falling drop are the same gesture.
	 */
	bell:
		path(boxD(12, 3, 20, 6.5)) +
		path(
			polyD([
				[10.5, 6.5],
				[21.5, 6.5],
				[24, 20],
				[24, 24],
				[8, 24],
				[8, 20],
			]),
		) +
		path(boxD(4.5, 24, 27.5, 28.5)),

	/** A barrel drum, laced head to head — Deafened. */
	drum:
		path(
			blobD([
				[9.5, 9],
				[16, 8],
				[22.5, 9],
				[25, 16],
				[22.5, 23],
				[16, 24],
				[9.5, 23],
				[7, 16],
			]),
		) +
		path(boxD(5, 8, 27, 11.2)) +
		path(boxD(5, 20.8, 27, 24)),

	/** A bird flitting past — Distracted. What pulls the eye off the field. */
	bird:
		path(
			blobD([
				[11, 12],
				[18, 11],
				[22, 15],
				[20, 21],
				[13, 22],
				[9, 17],
			]),
		) +
		path(circleD(21, 12, 4.8)) +
		path(polyD([[24, 9.5], [29.5, 12.5], [24, 15.5]])) +
		path(polyD([[14, 13], [4.5, 6], [11, 18.5]])) +
		path(polyD([[11.5, 18], [2.5, 25], [14, 24]])),

	/**
	 * A cowled figure, the face a carved void — Hidden. The shoulders have to be
	 * clearly wider than the hood so the outline steps in twice on the way up;
	 * with the hood at full width it read as an arched doorway instead.
	 */
	cowl: path(
		polyD([
			[16, 3.5],
			[21, 7],
			[22.5, 15],
			[28.5, 20],
			[29.5, 29.5],
			[2.5, 29.5],
			[3.5, 20],
			[9.5, 15],
			[11, 7],
		]) + polyD([[16, 8.5], [20.5, 13.5], [19.5, 20], [12.5, 20], [11.5, 13.5]]),
		true,
	),

	/**
	 * A strap bound round the head — Blinded. The tied ends have to break the face
	 * outline: kept inside it, the strap read as a stripe painted on a shield
	 * rather than as cloth wrapped around something.
	 */
	blindfold:
		path(
			polyD([[9, 5], [23, 5], [22, 20], [16, 27], [10, 20]]) +
				boxD(7, 11, 25, 15.5),
			true,
		) +
		path(boxD(2.5, 11, 9.5, 15.5)) +
		path(boxD(22.5, 11, 29.5, 15.5)) +
		path(polyD([[24.5, 15.5], [29.5, 17], [26.5, 24]])),

	/**
	 * An amphora stopper — Silenced. Five motifs went through this one slot: a
	 * bound mouth read as a fish, a banded face as a shield, a bridle bit as
	 * handcuffs, a snapped reed pipe as two abstract shards. The stopper is the
	 * only one that reads as an object at 16px. "Stopped" is a determinative for
	 * silence rather than a picture of it, which is the job these marks actually
	 * do — the condition's name is always beside them.
	 */
	stopper:
		path(polyD([[4.5, 4], [27.5, 4], [27.5, 11], [4.5, 11]])) +
		path(polyD([[9, 11], [23, 11], [19.5, 28.5], [12.5, 28.5]])),

	/**
	 * A stone figure on its plinth — Paralyzed. `figure` spreads its limbs; this
	 * one cannot move them, and the plinth is what says stone rather than person.
	 */
	statue:
		path(circleD(16, 7, 4.2)) +
		path(polyD([[12, 10.5], [20, 10.5], [21.5, 24], [10.5, 24]])) +
		path(boxD(6, 24, 26, 29.5)),

	/**
	 * A figure laid out on the ground — Prone. The ground bar is what turns a
	 * horizontal body into a fallen one instead of a floating one, and the two
	 * bent legs are what keep it from reading as a cannon on a carriage.
	 */
	'fallen-figure':
		path(circleD(7, 12.5, 4)) +
		path(polyD([[10.5, 9], [21, 10], [21, 16], [10.5, 16]])) +
		path(polyD([[19, 10], [24, 10], [27.5, 16.5], [22.5, 16.5]])) +
		path(polyD([[17.5, 16], [21.5, 16], [24, 23.5], [20, 23.5]])) +
		path(polyD([[11, 16], [15, 16], [15.5, 23.5], [11.5, 23.5]])) +
		path(boxD(2.5, 26, 29.5, 29.5)),

	/**
	 * Stacked ripples — Suffocating. The oldest sign there is for being under it,
	 * and the only one of the fourteen that was legible on its first draft.
	 */
	/**
	 * A figure drawn as nothing but its own outline — Invisible.
	 *
	 * Deliberately the same body as `statue`, hollowed: paralyzed is a figure gone
	 * solid, invisible is the same figure with nothing inside it. Invisible is
	 * mechanically a stronger `hidden`, so it could not reuse `cowl` — two rows
	 * carrying one mark is exactly the ambiguity these marks exist to prevent.
	 *
	 * The hollowness IS the meaning here, which makes this the one mark in the set
	 * that depicts an absence rather than a thing. It earns the exception because
	 * there is no object that means "not there".
	 */
	'hollow-figure':
		path(ringD(16, 7, 4.8, 2.2), true) +
		path(
			polyD([[10.5, 14.2], [21.5, 14.2], [24, 29], [8, 29]]) +
				polyD([[14, 17.8], [18, 17.8], [19.5, 25.3], [12.5, 25.3]]),
			true,
		),

	water:
		path(
			ribbonD([[4.5, 9.2], [11, 6.8], [17, 9.2], [23, 6.8], [27.5, 9.2]], 3.4, 3.4),
		) +
		path(
			ribbonD(
				[[4.5, 17.2], [11, 14.8], [17, 17.2], [23, 14.8], [27.5, 17.2]],
				3.4,
				3.4,
			),
		) +
		path(
			ribbonD(
				[[4.5, 25.2], [11, 22.8], [17, 25.2], [23, 22.8], [27.5, 25.2]],
				3.4,
				3.4,
			),
		),
}
