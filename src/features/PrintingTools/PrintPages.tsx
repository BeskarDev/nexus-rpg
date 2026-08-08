import React, { useEffect, useRef, useState } from 'react'

/** A physical size in millimetres. */
export interface Millimetres {
	width: number
	height: number
}

/** CSS resolves absolute units at 96dpi, in print as well as on screen. */
const PX_PER_MM = 96 / 25.4

/**
 * The card tools' shared geometry, kept beside the code that divides by it.
 *
 * These are the numbers the `@page` rules and `playingCardStyles.css` already
 * carry; the page count was previously a hand-written `9` in each tool, with no
 * link to either. `itemsPerPage(CARD_PAGE, CARD_SIZE, CARD_PAGE_MARGIN)` is 9.
 */
export const CARD_PAGE: Millimetres = { width: 192, height: 267 }
export const CARD_SIZE: Millimetres = { width: 63, height: 88 }
export const CARD_PAGE_MARGIN = 1

/**
 * The character sheet's geometry — a different sheet in a different orientation.
 *
 * **A4 landscape at full bleed, two exact A5 halves** (M17 D1). 2 × 148.5 = 297
 * with nothing left over, so the fold is the page centre and the four sheets
 * make two pages.
 *
 * This replaces a nonstandard 267 × 192mm page holding two 133 × 191mm sections
 * at a 0.5mm margin. That size existed to survive an unknown printer's
 * unprintable edge; the print target is now fixed (Chrome → Print to PDF,
 * margins none, M17 D0), so there is no edge to survive and the sheet gets the
 * ~25% of content area it was giving away.
 *
 * There is still no slack — an exact tiling never has any — so the keystone's
 * overhang still comes out of the inner margin: see `SheetLayout`'s
 * `KEYSTONE_CLEARANCE`.
 */
export const SHEET_PAGE: Millimetres = { width: 297, height: 210 }
export const SHEET_SECTION: Millimetres = { width: 148.5, height: 210 }
export const SHEET_PAGE_MARGIN = 0

/**
 * How many items the browser will actually fit on one printed page.
 *
 * Derived from the geometry rather than declared, because the number was
 * previously written by hand — `Spells.tsx` alone carried `9` three times, in
 * the page count, the sheet count and the `index % 9 === 8` break — and nothing
 * connected any of them to the card or page size they were counting.
 */
export function pageGrid(page: Millimetres, item: Millimetres, margin = 0) {
	const perRow = Math.max(1, Math.floor((page.width - 2 * margin) / item.width))
	const perColumn = Math.max(
		1,
		Math.floor((page.height - 2 * margin) / item.height),
	)
	return { perRow, perColumn, perPage: perRow * perColumn }
}

export function itemsPerPage(
	page: Millimetres,
	item: Millimetres,
	margin = 0,
): number {
	return pageGrid(page, item, margin).perPage
}

/** Split children into one array per printed page. */
function paginate(children: React.ReactNode, perPage: number) {
	const items = React.Children.toArray(children)
	const pages: React.ReactNode[][] = []
	for (let i = 0; i < items.length; i += perPage) {
		pages.push(items.slice(i, i + perPage))
	}
	return pages
}

/**
 * Fit the paper to the column it is previewed in.
 *
 * The page is laid out at its true millimetre size — that is the whole point,
 * since it is what makes the preview honest — so on screen it has to be scaled
 * down to fit. Measured rather than assumed: the preview column's width depends
 * on the shell's two-column split, the viewport, and whether the mobile tab
 * strip is showing.
 */
function usePaperScale(paperWidthMm: number) {
	const ref = useRef<HTMLDivElement>(null)
	const [scale, setScale] = useState(1)

	useEffect(() => {
		const element = ref.current
		if (!element) return
		const paperWidthPx = paperWidthMm * PX_PER_MM
		const fit = () => {
			const available = element.clientWidth
			if (available > 0) setScale(Math.min(1, available / paperWidthPx))
		}
		fit()
		// `window.ResizeObserver`, not the bare global: this module is also pulled
		// into Docusaurus's SSR build, where the bare identifier is not defined.
		// The effect is client-only, but the reference should be too.
		if (typeof window.ResizeObserver === 'undefined') return
		const observer = new window.ResizeObserver(fit)
		observer.observe(element)
		return () => observer.disconnect()
	}, [paperWidthMm])

	return { ref, scale }
}

/**
 * Where to cut, drawn on the paper itself.
 *
 * The cards tile the page edge to edge with NO gutter — nine 63 × 88mm cells at
 * a 1mm margin — so every cut line is a cell boundary and there is nowhere
 * outside the grid to put a conventional crop mark. The page used to be readable
 * anyway because each card sat on a grey field, and dropping that field to save
 * ink (rightly) took the only guide with it (owner, 2026-08-07).
 *
 * So the marks go WHERE THE INK IS ALLOWED TO BE: short ticks at the page edges
 * and small crosses at the interior corners, both hairline. Deliberately not a
 * full grid — a continuous rule along a cut line prints on the trimmed edge of
 * two cards whenever the blade wanders, and a blade always wanders. A tick at
 * each end of the line is enough to lay a ruler on, and leaves the 2.3mm cut
 * allowance inside each cell clean.
 */
function TrimMarks({
	page,
	item,
	margin,
	perRow,
	perColumn,
}: {
	page: Millimetres
	item: Millimetres
	margin: number
	perRow: number
	perColumn: number
}) {
	// Every cut line, in millimetres from the page's own corner.
	const columns = Array.from(
		{ length: perRow + 1 },
		(_, index) => margin + index * item.width,
	)
	const rows = Array.from(
		{ length: perColumn + 1 },
		(_, index) => margin + index * item.height,
	)
	// Long enough to see and to align a ruler against, short enough to stay in
	// the margin and the corners.
	const TICK = 3
	const CROSS = 1.6

	return (
		<svg
			className="pt-page__trim"
			viewBox={`0 0 ${page.width} ${page.height}`}
			preserveAspectRatio="none"
			aria-hidden="true"
		>
			{/* 0.25mm: a hairline still, but a printer's dot is ~0.08mm and a 0.2mm
			    line came back from the laser as an interrupted grey. A cut guide
			    that is faint on paper is not a guide. */}
			<g stroke="currentColor" strokeWidth={0.25} shapeRendering="crispEdges">
				{columns.map((x) => (
					<React.Fragment key={`c${x}`}>
						<path d={`M${x} 0 V${TICK}`} />
						<path d={`M${x} ${page.height - TICK} V${page.height}`} />
					</React.Fragment>
				))}
				{rows.map((y) => (
					<React.Fragment key={`r${y}`}>
						<path d={`M0 ${y} H${TICK}`} />
						<path d={`M${page.width - TICK} ${y} H${page.width}`} />
					</React.Fragment>
				))}
				{/* The interior corners: a cross a blade can be centred on, so a cut
				    can be checked halfway down the sheet rather than only at its
				    edges. */}
				{rows.slice(1, -1).map((y) =>
					columns.slice(1, -1).map((x) => (
						<React.Fragment key={`x${x}:${y}`}>
							<path d={`M${x - CROSS} ${y} H${x + CROSS}`} />
							<path d={`M${x} ${y - CROSS} V${y + CROSS}`} />
						</React.Fragment>
					)),
				)}
			</g>
		</svg>
	)
}

export interface PrintPagesProps {
	/** The sheet size, matching the tool's own `@page` rule. */
	page: Millimetres
	/** One printed item — a 63 × 88mm card, a 148.5 × 210mm sheet section. */
	item: Millimetres
	/** The `@page` margin in mm, which the items do not get to use. */
	margin?: number
	/** Shown in place of the pages when there is nothing selected. */
	empty?: React.ReactNode
	/**
	 * Draw trim marks where the paper has to be cut (M19, owner-reported).
	 *
	 * Only meaningful when a page holds more than one item; a page that IS the
	 * artifact has nothing to trim.
	 */
	cutMarks?: boolean
	children: React.ReactNode
}

/**
 * The print preview as PAGES, not as a run of cards.
 *
 * The preview used to be the same flat flex-wrap the printer would receive,
 * with an invisible `.page-break` every nth child — so the one question a
 * reader has before spending paper ("what lands on sheet 2?") could only be
 * answered by printing. Each page is drawn here at its true size, scaled to
 * fit, and captioned.
 *
 * In print the framing gets out of the way: the scale is dropped, the caption
 * and the paper's own edge are hidden, and each page box breaks after itself.
 * A box that is exactly the page size with `break-after: page` is what the
 * printer wanted anyway, so the preview and the output are the same DOM rather
 * than two layouts kept in step by hand.
 */
export const PrintPages: React.FC<PrintPagesProps> = ({
	page,
	item,
	margin = 0,
	empty,
	cutMarks = true,
	children,
}) => {
	const { perRow, perColumn, perPage } = pageGrid(page, item, margin)
	const pages = paginate(children, perPage)
	const { ref, scale } = usePaperScale(page.width)

	return (
		<div className="pt-pages" ref={ref}>
			{pages.length === 0 && empty}
			{pages.map((contents, index) => (
				<figure
					className="pt-page"
					key={index}
					// The scaled paper is taken out of flow by `transform`, so the
					// figure has to reserve the height the paper ends up occupying.
					style={{
						height: `${page.height * PX_PER_MM * scale}px`,
					}}
				>
					<div
						className="pt-page__paper"
						style={{
							width: `${page.width}mm`,
							height: `${page.height}mm`,
							transform: `scale(${scale})`,
						}}
					>
						{/* An explicit grid, not flow. The sheet page fits its two 148.5mm
							sections into 297mm of printable width EXACTLY, so leaving the
							placement to `flex-wrap` meant the 1.5px paper keyline plus
							sub-pixel rounding of `148.5mm` was enough to push the second
							section onto a row of its own, where `overflow: hidden` then
							cut it. The column count is already known here — the same
							number the pagination used — so it is stated rather than
							rediscovered. */}
						{cutMarks && perPage > 1 && (
							<TrimMarks
								page={page}
								item={item}
								margin={margin}
								perRow={perRow}
								perColumn={perColumn}
							/>
						)}
						<div
							className="pt-page__bed"
							style={{
								padding: `${margin}mm`,
								gridTemplateColumns: `repeat(${perRow}, 1fr)`,
							}}
						>
							{contents}
						</div>
					</div>
					<figcaption className="pt-page__label">
						Page {index + 1} of {pages.length}
					</figcaption>
				</figure>
			))}
		</div>
	)
}
