import React from 'react'

/**
 * THE PRINTED SHEET'S OWN SURROUND — PASS 4 (owner review, 2026-08-06)
 * ====================================================================
 *
 * The sheet is the artifact, not a card in a chapter, so it does not wear
 * `CardFrame`. It gets a surround drawn for this page and nothing else.
 *
 * Three earlier passes drew that surround and all three were rejected. The full
 * record is in `.drafts/nexus-docusaurus-theme/milestone-17/border-redesign.md`;
 * the one rule they all missed is short enough to restate here, because it is the
 * rule this file now obeys:
 *
 * > **Ornament weight is a function of SPAN, not of surface.** A cornice over a
 * > 400px table may carry solid mass. The same tile run edge to edge turns into a
 * > heavy stripe fencing the page.
 *
 * `custom.css` says it in the frieze tokens, `ornament-craft.md` §10 says it
 * independently, and this border is a ~717mm perimeter run: unambiguously the
 * full-edge case. Pass 3 reached for the kit's merlon tile because it was the
 * kit's motif, and never checked that it was the wrong *weight* of that motif —
 * three courses of mass, 6.6mm thick, 21.5% of the sheet's area as frame.
 *
 * ## What pass 4 draws instead
 *
 * The kit has already solved *continuous ornament that does not shout*, once, for
 * the navbar and footer: `--nexus-frieze-rail`, the braid rail. Almost all line
 * and almost no mass, and — the part that matters — it **plaits for only half its
 * period** and runs as plain rail either side of a small lozenge node, because a
 * braid run edge to edge is a continuous texture and reads busy however fine the
 * stroke. This file restates that rail in millimetres rather than inventing a
 * third solution.
 *
 * So the surround follows the pattern every legible ornate sheet uses (The One
 * Ring 2e being the closest analogue):
 *
 * > **Mass belongs at the focal points — four corners and one crest. The ~700mm
 * > of run between them is line.**
 *
 * Five spots can carry weight because they are spots. A continuous band cannot,
 * because it is continuous.
 *
 * | | pass 3 | pass 4 |
 * |---|---|---|
 * | register (outer keyline to content) | 6.6mm | 4.4mm |
 * | content inset | 9.9mm | 6.4mm |
 * | border share of sheet area | 21.5% | ~14% |
 * | ink within the register | ~40% | ~20% |
 *
 * The 3.5mm returned per side is +7mm of content in each dimension. That is not
 * only aesthetic: sheet 1 had 0.8mm of vertical slack and sheet 3's spell columns
 * were trimmed twice to fit a thickening frame.
 *
 * ## The acceptance test
 *
 * **At 25% zoom the border must read as a fine double rule with four accents.**
 * If it reads as a grey band it is still too heavy. Detail should only reveal
 * itself when the sheet is picked up. This is a squint test and it would have
 * caught all three previous passes before the owner had to.
 *
 * ## Why this is drawn at 1:1 instead of using `PlateFrame`
 *
 * `PlateFrame` is built the hard way — masked tiles, a transposed second tile,
 * corner drawings symmetric about the diagonal, container queries stepping the
 * whole thing down — and all of that machinery exists to survive a span the author
 * cannot know.
 *
 * **A printed sheet has exactly one span.** It is 148.5 × 210mm and it will never
 * be anything else (M17 D1), so the geometry is stated in millimetres and the
 * viewBox is the sheet. No masks, no tiles, no container queries, and the repeat
 * count is SOLVED for each run rather than centred and cut.
 *
 * The repeated geometry is still GENERATED rather than hand-authored: hand-authored
 * runs drift, and a loop keeps the proportions honest when a number moves.
 */

/** The sheet, in millimetres. The viewBox is stated in the same unit, so every
 *  number below is a real physical measurement rather than an abstract unit. */
const W = 148.5
const H = 210

/* ============================================================================
 * THE REGISTER
 *
 * Four visible lines and no solid course anywhere on the run:
 *
 * | layer | size |
 * |---|---|
 * | outer hairline | 0.28mm |
 * | air | 0.7mm |
 * | braid band, two mirrored strands at 0.28mm | 1.7mm |
 * | air | 0.7mm |
 * | inner hairline | 0.22mm |
 *
 * Everything below is derived from those five numbers, so moving one moves the
 * corner, the crest and the content inset with it. Pass 3's constants were five
 * independent tables and that is how the corner ended up clipping the content.
 * ========================================================================== */

/** The outer keyline, in from the trim. Full bleed means the trim is the paper's
 *  edge, so this inset is the only thing keeping ink off a home printer's
 *  unprintable margin (M17 D1). */
const MARGIN = 2.0

const RULE_OUTER = 0.28
const RULE_INNER = 0.22
/** Air either side of the braid band. It is what makes four lines read as four
 *  lines rather than as one thickened rule. */
const AIR = 0.7
/** The braid band, edge to edge. */
const BRAID_H = 1.7
/** The strand, and every other line inside the register. One weight. */
const HAIR = 0.28

const OUTER = MARGIN
/** The inner keyline, which the content clears. */
const INNER = OUTER + AIR + BRAID_H + AIR
/** The register's own centre line. The braid rides it, the corner is centred on
 *  it, and — because the corner sits the same distance in from BOTH trims — the
 *  strands terminate exactly at the corner's centre by construction. */
const REG_MID = (OUTER + INNER) / 2
const BRAID_O = REG_MID - BRAID_H / 2
const BRAID_I = REG_MID + BRAID_H / 2

/**
 * Where the content starts, measured from the trim: the inner keyline plus the
 * same 1.3mm of clearance pass 3 used.
 *
 * EXPORTED and consumed by `SheetLayout`, deliberately. The frame is drawn in
 * absolute millimetres, so if the register's thickness moves the content inset
 * has to move with it and no layout system will catch the mismatch. It moved
 * twice already. Now there is one number and one importer.
 */
export const SHEET_CONTENT_INSET_MM = Math.round((INNER + 1.3) * 100) / 100

/* ============================================================================
 * THE RUN — the braid rail, in millimetres
 *
 * `--nexus-frieze-rail` is a 78 × 18 unit tile: two plaited lobes over the first
 * 40 units, plain rail to 55, a lozenge node from 55 to 63, plain rail to 78.
 * Those proportions are reproduced here rather than re-invented, so the printed
 * sheet's run and the site's navbar and footer edges are demonstrably one motif.
 *
 * Symmetry is by construction — both strands come from ONE generator with the
 * phase inverted, never two hand-authored paths, which is how the first guilloche
 * in this kit ended up visibly lopsided (`TrailBraid`).
 * ========================================================================== */

/** One repeat, in mm. 78 tile units against an 18-unit band height. */
const PERIOD = (78 / 18) * BRAID_H
/** Fractions of the period, straight off the rail tile. */
const PLAIT_END = 40 / 78
const RAIL_1_END = 55 / 78
const NODE_C = 59 / 78
const NODE_HALF_A = 4 / 78
const RAIL_2_START = 63 / 78
/** The node's half-height: 5 of the tile's 18 units. */
const NODE_HALF_C = (5 / 18) * BRAID_H
/** The strand's swing, inside the band's own edges. */
const AMP = (BRAID_H - HAIR) / 2

/**
 * Along an edge, `a` runs the length and `c` is the distance in from the trim —
 * so one generator serves all four edges and the verticals are the horizontals
 * TRANSPOSED rather than rotated (ornament-craft §5, §13). A quarter turn would
 * swap the band's thickness for its period.
 */
type Place = (along: number, across: number) => [number, number]

/** The corner's centre, on the register's own centre line in both axes. */
const CORNER_C = REG_MID

/* The corner lotus's radii are declared with the register rather than with its
 * drawing, because the run has to know where the calyx ring is: the strands
 * start ON that ring. See § THE CORNER below for what each one is. */
const LOTUS_LINE = HAIR * 0.8
const PETAL_AXIS = (INNER - OUTER) / 2 - LOTUS_LINE / 2
const PETAL_DIAG = PETAL_AXIS * Math.SQRT2
const CALYX = PETAL_AXIS * 0.42
const SPUR = PETAL_AXIS * 0.8

/** Where a run begins: on the calyx ring, not at the corner's centre. */
const RUN_END = CORNER_C + CALYX

const EDGES: { key: string; from: number; to: number; place: Place }[] = [
	{ key: 'top', from: RUN_END, to: W - RUN_END, place: (a, c) => [a, c] },
	{
		key: 'bottom',
		from: RUN_END,
		to: W - RUN_END,
		place: (a, c) => [a, H - c],
	},
	{ key: 'left', from: RUN_END, to: H - RUN_END, place: (a, c) => [c, a] },
	{
		key: 'right',
		from: RUN_END,
		to: H - RUN_END,
		place: (a, c) => [W - c, a],
	},
]

/**
 * Fit a whole number of repeats into a run, so the run arrives at both corners in
 * phase and no repeat is cut. `PlateFrame` centres and accepts a symmetric cut
 * only because a web span is unknown; a printed sheet's span is known.
 *
 * The count is forced EVEN because each run is generated from both ends inward
 * (see `edgeRun`), which needs the two halves to meet exactly at the midpoint.
 */
function beats(from: number, to: number, target: number) {
	const n = Math.max(2, Math.round((to - from) / target / 2) * 2)
	return { n, step: (to - from) / n }
}

const pt = ([x, y]: [number, number]) => `${x.toFixed(2)} ${y.toFixed(2)}`

/**
 * The plait: two cubic lobes in antiphase over the first half of the repeat.
 * `phase` is +1 or -1 and is the ONLY difference between the two strands.
 */
function plait(
	place: Place,
	base: number,
	dir: 1 | -1,
	step: number,
	phase: 1 | -1,
): string {
	const lobe = (step * PLAIT_END) / 2
	let d = ''
	for (let i = 0; i < 2; i++) {
		const a0 = base + dir * i * lobe
		const s = phase * (i === 0 ? 1 : -1)
		d +=
			`M${pt(place(a0, REG_MID))}` +
			`C${pt(place(a0 + dir * lobe * 0.25, REG_MID - AMP * s))},` +
			`${pt(place(a0 + dir * lobe * 0.75, REG_MID - AMP * s))},` +
			`${pt(place(a0 + dir * lobe, REG_MID))}`
	}
	return d
}

/** The plain rail either side of the node — the continuity element, and what
 *  stops the plait becoming a texture. */
function rail(place: Place, base: number, dir: 1 | -1, step: number): string {
	const seg = (p0: number, p1: number) =>
		`M${pt(place(base + dir * p0 * step, REG_MID))}` +
		`L${pt(place(base + dir * p1 * step, REG_MID))}`
	return seg(PLAIT_END, RAIL_1_END) + seg(RAIL_2_START, 1)
}

/** A lozenge on the rail's own centre line: the kit's node, and the owner's
 *  requested diamond vocabulary. */
function lozenge(
	place: Place,
	at: number,
	halfA: number,
	halfC: number,
): string {
	return (
		`M${pt(place(at, REG_MID - halfC))}L${pt(place(at + halfA, REG_MID))}` +
		`L${pt(place(at, REG_MID + halfC))}L${pt(place(at - halfA, REG_MID))}Z`
	)
}

/**
 * One edge's run, generated from BOTH ENDS INWARD.
 *
 * The repeat is not symmetric within itself — it starts with the plait and ends
 * with plain rail — so running it left to right would thread two strands into one
 * corner and a single line into the other. Mirroring the second half makes both
 * corners identical and makes the edge symmetric about its own midpoint, which is
 * also where the punctuation lozenge goes.
 */
function edgeRun(from: number, to: number, place: Place) {
	const { n, step } = beats(from, to, PERIOD)
	const under: string[] = []
	const over: string[] = []
	const rails: string[] = []
	const nodes: string[] = []

	for (let k = 0; k < n / 2; k++) {
		const ends: [number, 1 | -1][] = [
			[from + k * step, 1],
			[to - k * step, -1],
		]
		for (const [base, dir] of ends) {
			under.push(plait(place, base, dir, step, -1))
			over.push(plait(place, base, dir, step, 1))
			rails.push(rail(place, base, dir, step))
			nodes.push(
				lozenge(
					place,
					base + dir * NODE_C * step,
					NODE_HALF_A * step,
					NODE_HALF_C,
				),
			)
		}
	}

	return {
		step,
		under: under.join(''),
		over: over.join(''),
		rail: rails.join(''),
		nodes: nodes.join(''),
	}
}

/* ============================================================================
 * THE CORNER — a lotus, and the only mass on the run
 *
 * An open lotus seen from above: eight lanceolate petals alternating long and
 * short, all drawn as OUTLINES, around an OPEN calyx ring. Nothing here is a
 * solid mass — a filled hub at the corner of a frame this light reads as four
 * black dots pinning the page down, and the flower is meant to be open. Three
 * things it has to satisfy, all of them learned from earlier passes:
 *
 * - **It is INSCRIBED IN THE REGISTER — every petal tip lands on a keyline.**
 *   Pass 2's square panel was 9.1mm across and clipped the content's own corner,
 *   so no radius here is chosen: the short petals reach exactly half the
 *   register's width (less half a stroke, so the ink stops on the rule rather
 *   than over it) and the long ones reach √2 of that, which is the extra room the
 *   diagonal has. The flower is therefore as large as the register can hold and
 *   cannot clip anything — and it is at its ceiling, because the outward petal
 *   tips now sit on the outer keyline, which IS the print margin (M17 D1). Any
 *   bigger costs either the margin or the content inset.
 * - **It must be its own transpose.** The long petals sit at 45°, 135°, 225°,
 *   315° and the short at 0°, 90°, 180°, 270°, so reflecting about y=x maps long
 *   to long and short to short. One drawing serves all four corners and
 *   ornament-craft §5's axis-transposition trap cannot bite.
 * - **The run must pass THROUGH it, not stop beside it.** The two strands spring
 *   from the calyx ring itself — the same continuity `PalmetteCorner` gets by
 *   springing its fan off the merlon crest line. That works because the register's
 *   centre line is the corner's centre in BOTH axes, so a run arriving along
 *   either edge meets the ring on its own diameter without anything being tuned.
 *
 * The petal profile is `RosetteMark`'s: it swells a fifth of the way out then
 * converges to a point. Borrowed rather than re-drawn so the flower is in the
 * kit's hand instead of being a generic daisy.
 *
 * Triangles stay as the spurs between the petals. There is deliberately no
 * further course — a third course is exactly how pass 3 got too heavy.
 * ========================================================================== */

/*
 * The radii, all declared up with the register:
 *
 * | | derivation |
 * |---|---|
 * | `LOTUS_LINE` | finer than the strand — eight outlines meeting at one ring is the densest spot on the sheet |
 * | `PETAL_AXIS` | half the register, less half a stroke, so the tip lands ON the keyline |
 * | `PETAL_DIAG` | `PETAL_AXIS × √2` — exactly the extra room the diagonal has |
 * | `CALYX` | the open ring the petals spring from and the strands stop on |
 * | `SPUR` | the triangles bisecting the petal gaps |
 *
 * So the alternation of long and short is a property of the FRAME, not a drawn
 * choice, and the whole flower follows the register if it ever moves.
 */

const CornerLotus: React.FC<{ cx: number; cy: number }> = ({ cx, cy }) => {
	/** Point at angle `a`, radius `r`, offset `w` perpendicular to the axis. */
	const p = (a: number, r: number, w: number) =>
		`${(cx + r * Math.cos(a) - w * Math.sin(a)).toFixed(2)} ` +
		`${(cy + r * Math.sin(a) + w * Math.cos(a)).toFixed(2)}`

	const petals: string[] = []
	const spurs: string[] = []
	for (let i = 0; i < 8; i++) {
		const a = (i * Math.PI) / 4
		const r1 = i % 2 === 0 ? PETAL_AXIS : PETAL_DIAG
		const span = r1 - CALYX
		const hw = span * 0.26
		petals.push(
			`M${p(a, CALYX, 0)} ` +
				`C${p(a, CALYX + span * 0.2, hw)},${p(a, CALYX + span * 0.62, hw * 0.72)},${p(a, r1, 0)} ` +
				`C${p(a, CALYX + span * 0.62, -hw * 0.72)},${p(a, CALYX + span * 0.2, -hw)},${p(a, CALYX, 0)} Z`,
		)
		const b = a + Math.PI / 8
		spurs.push(
			`M${p(b, CALYX, 0.26)} L${p(b, SPUR, 0)} L${p(b, CALYX, -0.26)} Z`,
		)
	}

	return (
		<g>
			{/* Opaque backing in the ORNAMENT's own shape and hugging its extent
				(ornament-craft §11) — a disc for a radial mark, sized to the calyx
				and no larger. The strands already stop on the ring, so all this has
				to take is the over-strand's casing, which overshoots its own start by
				half its width. A backing the flower's full width would blank a
				straight section of both keylines and leave a notch either side. */}
			<circle
				cx={cx}
				cy={cy}
				r={CALYX - LOTUS_LINE / 2}
				fill="var(--pc-paper, #fff)"
			/>
			<g fill="none" stroke="currentColor" strokeWidth={LOTUS_LINE}>
				{petals.map((d) => (
					<path key={d} d={d} />
				))}
				{/* The calyx: an open ring, not a boss. */}
				<circle cx={cx} cy={cy} r={CALYX} />
			</g>
			<g fill="currentColor">
				{spurs.map((d) => (
					<path key={d} d={d} />
				))}
			</g>
		</g>
	)
}

export type SheetCrest = 'statistics' | 'equipment' | 'magic' | 'personal'

/**
 * THE CREST — the one place the four sheets differ, and the fifth focal point.
 *
 * These say which of the four sheets is in the reader's hand from across a table,
 * before a word is read. They were accepted in pass 3 and are not being
 * redesigned; only their SIZE follows the thinner register.
 *
 * ## Why they are all the same plaque
 *
 * The first cut drew four free assemblies — a sun over a ziggurat, a shield
 * between two swords, a starburst between two wings, two figures between two
 * bars — and judged at true size they failed together. Three faults, and the
 * plaque fixes all three at once:
 *
 * - **Detached parts read as debris.** The statistics crest's flanking horns
 *   touched nothing, so at 6mm they were two slashes near a diamond rather than
 *   one ornament. A bounded panel gives every motif something to sit in.
 * - **They had no family.** Four silhouettes of four different widths and weights
 *   on four sheets of one artifact read as four ornaments, not as one set with a
 *   variable. Now the panel is the constant and the motif is the variable.
 * - **The magic crest used flanking chevrons**, which the kit bans outright as a
 *   motif — a caret is a UI arrow, not a Bronze Age sign.
 *
 * The panel is the kit's cartouche language: a tapered tablet with end bars, the
 * run coming in and stopping against it. One motif inside, in solid mass, no
 * interior detail below the texture floor (ornament-craft §8).
 */

/**
 * The crest fills the band it is allowed to occupy, and both of its limits are
 * stated rather than tuned:
 *
 * - **It may NOT overhang the trim, and it may not sit ON the outer keyline
 *   either.** M16's keystone hung above the sheet's top edge on a section that is
 *   exactly the printable height, so its clearance had to be bought out of the top
 *   margin (4.5mm against 2mm elsewhere) — and getting it wrong amputated the
 *   cartouche twice. Nothing overhangs now, and 0.5mm of air keeps the tablet's
 *   top edge from merging with the keyline into one thick rule.
 * - **It MAY straddle the inner keyline.** It is the crest: the keyline runs in
 *   and stops against it, which is the same thing the braid does.
 */
const CREST_TOP = OUTER + 0.5
const CREST_BOTTOM = SHEET_CONTENT_INSET_MM - 0.2
const CREST_Y = (CREST_TOP + CREST_BOTTOM) / 2
/** Half-extents of the tablet about that centre. The height is derived from the
 *  two limits above; only the width is a drawn choice. */
const PLAQUE_H = (CREST_BOTTOM - CREST_TOP) / 2
const PLAQUE_W = 8.6
/** How far the tablet's ends taper in. */
const PLAQUE_TAPER = 1.6

/**
 * The motifs are drawn at a nominal ±2.5mm and scaled to fit the plaque.
 *
 * Authoring at a comfortable size and scaling once beats authoring four drawings
 * against an 1.85mm half-height: the coordinates stay readable, and if the
 * register's thickness ever changes this is the single number that follows it.
 * Uniform, so nothing is stretched.
 */
const MOTIF_SCALE = 0.52

/**
 * The contour, in NOMINAL units, so it renders at 0.34mm after the scale — one
 * step above the run's 0.28mm strand. It has to read as a contour enclosing a
 * shape rather than as another line of the frame's, and one step is enough to do
 * that at this size.
 */
const MOTIF_LINE = 0.34 / MOTIF_SCALE

/** How far the crest reaches, so the top run can be interrupted for it. The end
 *  bars stand OUTSIDE the tablet, so the blanked run has to clear them too. */
const CREST_HALF = PLAQUE_W + 0.85 + 0.26 + 0.3

/** The tablet's outline. */
function plaqueOutline(cx: number, cy: number) {
	const l = cx - PLAQUE_W
	const r = cx + PLAQUE_W
	const t = cy - PLAQUE_H
	const b = cy + PLAQUE_H
	return (
		`M${l + PLAQUE_TAPER} ${t} L${r - PLAQUE_TAPER} ${t} L${r} ${cy} ` +
		`L${r - PLAQUE_TAPER} ${b} L${l + PLAQUE_TAPER} ${b} L${l} ${cy} Z`
	)
}

/** The tapered tablet every crest sits in. */
function plaque(cx: number, cy: number) {
	return (
		<>
			<path
				d={plaqueOutline(cx, cy)}
				fill="var(--pc-paper, #fff)"
				stroke="currentColor"
				strokeWidth={HAIR}
				strokeLinejoin="miter"
			/>
			{/* The end bars: what makes it a cartouche rather than a box, and what
				the run visibly stops against. */}
			{[-1, 1].map((side) => (
				<rect
					key={side}
					x={cx + side * (PLAQUE_W + 0.85) - 0.26}
					y={cy - PLAQUE_H}
					width={0.52}
					height={PLAQUE_H * 2}
					fill="currentColor"
				/>
			))}
		</>
	)
}

/**
 * The four motifs, each about 4.6mm across and 4.4mm tall before scaling.
 *
 * Every one is drawn from a sign the kit already carries, so the printed sheet
 * borrows no new vocabulary: the bull of `BullKeystone`, a shield, the winged
 * disc of `WingedDisc`, the paired figures of `figure-pair`.
 *
 * ## Why they are contours with an internal motif, not solid mass (pass 4)
 *
 * The silhouettes are unchanged and were accepted in pass 3. Their WEIGHT was
 * not, because the frame around them changed underneath: pass 3's crest was one
 * solid shape on a register of three solid courses, which was consistent. On a
 * register that is now entirely line, four solid motifs are the only mass on the
 * page and each one reads as a black lump in a thin tablet.
 *
 * `ornament-craft.md` §1 names both the rule and the escape:
 *
 * > Reach for [bold contour + internal motif] when a solid motif is too
 * > DOMINANT: a solid shape can only be lightened by trading weight against
 * > detail, whereas an outlined-with-motif shape stays light at any size.
 *
 * So each motif is now a bold contour (0.34mm, one step above the strand)
 * enclosing an area, carrying a few solid marks inside it. Three constraints
 * came with the change:
 *
 * - **The contour has to enclose a LARGE area or §1 bites the other way** — thin
 *   parallel outlines read as bent wire. Nothing here is a tube; every contour
 *   is a single closed silhouette 2.4mm or more across.
 * - **The internal marks are RHYTHM, not anatomy** (§8). At this size anything
 *   under ~0.3mm is texture, so they are pips, bands and triangles — the same
 *   vocabulary as the scarab-wing treatment on `WingedDisc`.
 * - **One solid mass may remain per motif, and it holds the focus** (§7). On the
 *   magic crest that is the disc itself, which is what stops an outlined pair of
 *   wings reading as a moth.
 */
const MOTIFS: Record<SheetCrest, (cx: number, cy: number) => React.ReactNode> =
	{
		/*
		STATISTICS — the bull: strength, and the sign this theme already uses for a
		creature's own power. Horns and head are ONE contour, because two horns drawn
		as separate strokes beside a head is the debris the first cut produced.
	*/
		statistics: (cx, cy) => (
			<g
				fill="none"
				stroke="currentColor"
				strokeWidth={MOTIF_LINE}
				strokeLinejoin="miter"
			>
				<path
					d={`M${cx - 4.3} ${cy - 2.3}
					L${cx - 3.1} ${cy - 2.5} L${cx - 2.4} ${cy - 1.1}
					L${cx - 1.5} ${cy - 1.5} L${cx + 1.5} ${cy - 1.5}
					L${cx + 2.4} ${cy - 1.1} L${cx + 3.1} ${cy - 2.5}
					L${cx + 4.3} ${cy - 2.3} L${cx + 3.4} ${cy - 0.2}
					L${cx + 2.1} ${cy + 0.3} L${cx + 1.5} ${cy + 2.3}
					L${cx - 1.5} ${cy + 2.3} L${cx - 2.1} ${cy + 0.3}
					L${cx - 3.4} ${cy - 0.2} Z`}
				/>
				{/* Two eye slots, now the SOLID marks inside the contour rather than voids
				cut out of a mass — the read is the same votive mask either way, and it
				survives a printer that thins a hairline. */}
				{[-1, 1].map((s) => (
					<rect
						key={s}
						x={cx + s * 1.05 - 0.36}
						y={cy - 0.55}
						width={0.72}
						height={0.8}
						fill="currentColor"
						stroke="none"
					/>
				))}
				{/* The brow band: one rhythm mark across the mask, and what keeps the
				contour from reading as an empty outline. */}
				<path
					d={`M${cx - 1.5} ${cy + 0.95} L${cx + 1.5} ${cy + 0.95}
					L${cx + 1.2} ${cy + 1.55} L${cx - 1.2} ${cy + 1.55} Z`}
					fill="currentColor"
					stroke="none"
				/>
			</g>
		),
		/*
		EQUIPMENT — a shield, carrying a voided band. What the character takes into
		the world, and the one motif of the four that is unambiguously an object.
	*/
		equipment: (cx, cy) => (
			<g
				fill="none"
				stroke="currentColor"
				strokeWidth={MOTIF_LINE}
				strokeLinejoin="miter"
			>
				<path
					d={`M${cx - 3.1} ${cy - 2.4} L${cx + 3.1} ${cy - 2.4}
					L${cx + 3.1} ${cy - 0.2} L${cx} ${cy + 2.6}
					L${cx - 3.1} ${cy - 0.2} Z`}
				/>
				{/* The band is now the mass and the shield the contour — the inversion of
				pass 3, same drawing. */}
				<path
					d={`M${cx - 1.6} ${cy - 1.15} L${cx + 1.6} ${cy - 1.15}
					L${cx + 1.6} ${cy - 0.5} L${cx} ${cy + 1.05}
					L${cx - 1.6} ${cy - 0.5} Z`}
					fill="currentColor"
					stroke="none"
				/>
				{/* Two rivets on the rim: rhythm, not anatomy. */}
				{[-1, 1].map((s) => (
					<rect
						key={s}
						x={cx + s * 2.25 - 0.29}
						y={cy - 1.95}
						width={0.58}
						height={0.58}
						fill="currentColor"
						stroke="none"
					/>
				))}
			</g>
		),
		/*
		MAGIC — the winged disc, the theme's own primary sign for sorcery.

		The DISC stays solid and the wings become outlined wedges carrying a band of
		solid triangles. That is `WingedDisc`'s own scarab-wing treatment, and it is
		the one place on this sheet where §7's hierarchy rule has work to do: without
		a solid centre, two outlined wings read as a moth.

		A wing tapers to a TIP and never curls (§3), and the triangles are how this
		kit carries feathering at a size where a drawn feather would be texture.
	*/
		magic: (cx, cy) => (
			<g
				fill="none"
				stroke="currentColor"
				strokeWidth={MOTIF_LINE}
				strokeLinejoin="miter"
			>
				{/* Wings FIRST, disc over them. Drawn the other way round the wing
					roots crossed the disc and the solid centre was reduced to a diamond
					peeking out between two shapes — losing the hierarchy the solid
					centre exists to hold. */}
				{[-1, 1].map((s) => (
					<g key={s}>
						{/*
							LEVEL, and one taper root to tip. Two faults were making this
							crest read as a bat rather than a winged sun, and the second is
							the one that mattered:

							- the wing had a notch cut into its underside, and a notched
							  outline at 3mm is a scallop;
							- and it SWEPT UPWARD from the root. Two raised wings over a
							  pointed body is a bat's silhouette whatever the detail. The
							  Egyptian winged disc spreads its wings LEVEL, and that alone
							  is what fixes the read.

							The root is 2.25 deep against a 5.0 disc — §3 warns that a wing
							whose root depth is well under the disc diameter reads as a
							propeller blade, and the original 1.5 root was exactly that.
						*/}
						<path
							d={`M${cx + s * 1.4} ${cy - 1.15}
							L${cx + s * 5.6} ${cy - 0.6} L${cx + s * 1.4} ${cy + 1.1} Z`}
						/>
						{/* Two feather marks per wing. Two, not four: at 0.5mm across a
						third would be the texture floor (§8). */}
						<path
							d={`M${cx + s * 1.95} ${cy - 0.85} L${cx + s * 2.65} ${cy - 0.8} L${cx + s * 2.3} ${cy - 0.2} Z`}
							fill="currentColor"
							stroke="none"
						/>
						<path
							d={`M${cx + s * 3.15} ${cy - 0.75} L${cx + s * 3.85} ${cy - 0.65} L${cx + s * 3.5} ${cy - 0.2} Z`}
							fill="currentColor"
							stroke="none"
						/>
					</g>
				))}
				{/* The disc: the one solid mass, and the focal the wings hang off. */}
				<path
					d={`M${cx} ${cy - 2.5} L${cx + 1.85} ${cy} L${cx} ${cy + 2.5} L${cx - 1.85} ${cy} Z`}
					fill="currentColor"
					stroke="none"
				/>
				<path
					d={`M${cx} ${cy - 1.05} L${cx + 0.78} ${cy} L${cx} ${cy + 1.05} L${cx - 0.78} ${cy} Z`}
					fill="var(--pc-paper, #fff)"
					stroke="none"
				/>
			</g>
		),
		/*
		PERSONAL — two figures facing across a bond. `figure-pair` is the mark the
		digital sheet already uses for NPC relationships, which is most of what this
		page is.

		This is now the SIGIL'S OWN GEOMETRY, scaled — round head, splayed
		shoulders, straight torso — rather than a redrawing of it from memory. Both
		of the shapes it went through were inventions, and both failed the same way:
		a diamond head over a wide trapezoid read as a house, and over a narrow
		tapered one it read as a bottle. A figure's torso does not taper to its hem,
		and `figure-pair` already knew that.
	*/
		personal: (cx, cy) => (
			<g
				fill="none"
				stroke="currentColor"
				strokeWidth={MOTIF_LINE}
				strokeLinejoin="miter"
			>
				{[-1, 1].map((s) => {
					/* The sigil is 26 units tall for a 4.8 nominal motif, and its
						figures stand 2.6 either side of the axis so the bond lozenge has
						its own air between them. */
					const x = cx + s * 2.6
					const head = cy - 1.66
					return (
						<g key={s}>
							<path
								d={`M${x} ${cy - 1.11}
								L${x + 0.74} ${cy - 0.09} L${x + 0.74} ${cy + 2.41}
								L${x - 0.74} ${cy + 2.41} L${x - 0.74} ${cy - 0.09} Z`}
							/>
							{/* The head: the one solid mass per figure, OVERLAPPING the
								shoulder line so the two pieces read as one body. */}
							<circle
								cx={x}
								cy={head}
								r={0.74}
								fill="currentColor"
								stroke="none"
							/>
						</g>
					)
				})}
				{/* The bond between them, and the reason they are a pair and not two
				figures: one lozenge on the axis both face. It stays solid — it is the
				subject of the crest. */}
				<path
					d={`M${cx} ${cy - 1.5} L${cx + 1.0} ${cy} L${cx} ${cy + 1.5} L${cx - 1.0} ${cy} Z`}
					fill="currentColor"
					stroke="none"
				/>
			</g>
		),
	}

export const SheetFrame: React.FC<{ crest: SheetCrest }> = ({ crest }) => {
	const runs = EDGES.map((edge) => ({
		edge,
		run: edgeRun(edge.from, edge.to, edge.place),
	}))

	return (
		<svg
			className="pc-frame"
			viewBox={`0 0 ${W} ${H}`}
			width={`${W}mm`}
			height={`${H}mm`}
			aria-hidden="true"
		>
			{/* The two keylines. Both are hairlines and both run unbroken through all
				four corners — they are this surround's continuity element, the way the
				merlon course's ground line is `PlateFrame`'s (ornament-craft §13). */}
			<rect
				x={OUTER}
				y={OUTER}
				width={W - OUTER * 2}
				height={H - OUTER * 2}
				fill="none"
				stroke="currentColor"
				strokeWidth={RULE_OUTER}
			/>
			<rect
				x={INNER}
				y={INNER}
				width={W - INNER * 2}
				height={H - INNER * 2}
				fill="none"
				stroke="currentColor"
				strokeWidth={RULE_INNER}
			/>

			{/*
				The run. Each edge draws through the same `place` transform, so the
				verticals are the horizontals transposed and no run can drift out of
				step with its own corner.

				Draw order is the braid's whole trick: under-strand, then an opaque
				casing along the over-strand, then the over-strand on top of it. The
				over/under at each crossing is what makes two waves read as a cord
				rather than as two overlapping lines. The plain rail and the nodes come
				after the casing so it cannot nibble them.
			*/}
			{runs.map(({ edge, run }) => (
				<g
					key={edge.key}
					fill="none"
					stroke="currentColor"
					strokeWidth={HAIR}
					strokeLinecap="butt"
				>
					<path d={run.under} />
					<path
						d={run.over}
						stroke="var(--pc-paper, #fff)"
						strokeWidth={HAIR * 2.6}
					/>
					<path d={run.over} />
					<path d={run.rail} />
					<path d={run.nodes} fill="currentColor" stroke="none" />
					{/*
						One larger lozenge at the edge's midpoint as punctuation — the
						thing that stops a fine braid degenerating into texture. The top
						edge's midpoint carries the crest instead, which is the same job
						done louder.
					*/}
					{edge.key !== 'top' && (
						<path
							d={lozenge(
								edge.place,
								(edge.from + edge.to) / 2,
								NODE_HALF_A * run.step * 1.8,
								NODE_HALF_C * 1.8,
							)}
							fill="currentColor"
							stroke="none"
						/>
					)}
				</g>
			))}

			{/* The four corner lotuses, drawn after the run so the calyx takes the
				strands' terminals. */}
			<CornerLotus cx={CORNER_C} cy={CORNER_C} />
			<CornerLotus cx={W - CORNER_C} cy={CORNER_C} />
			<CornerLotus cx={CORNER_C} cy={H - CORNER_C} />
			<CornerLotus cx={W - CORNER_C} cy={H - CORNER_C} />

			{/*
				The crest, on the top run.

				Its opaque backing takes the BAND's extent and nothing more
				(ornament-craft §11): the braid comes in and stops against the crest,
				while both keylines pass 0.26mm clear above and below the blank and
				keep running. A backing padded to the tablet's own height would have
				punched a hole in each keyline and left a notch either side.
			*/}
			<rect
				x={W / 2 - CREST_HALF}
				y={BRAID_O - 0.3}
				width={CREST_HALF * 2}
				height={BRAID_H + 0.6}
				fill="var(--pc-paper, #fff)"
			/>
			{plaque(W / 2, CREST_Y)}
			{/* Scaled about the crest's own centre, so the motif keeps its drawn
				proportions inside a plaque the register's thickness decides. */}
			<g
				transform={`translate(${W / 2} ${CREST_Y}) scale(${MOTIF_SCALE}) translate(${-W / 2} ${-CREST_Y})`}
			>
				{MOTIFS[crest](W / 2, CREST_Y)}
			</g>
		</svg>
	)
}
