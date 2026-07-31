import React, { useCallback, useEffect, useRef, useState } from 'react'

export interface SheetTabBarTab {
	id: string
	label: string
}

export interface SheetTabBarProps {
	tabs: SheetTabBarTab[]
	value: number
	onChange: (index: number) => void
	/** Names the tablist for screen readers. */
	label?: string
}

/**
 * The sheet's tab bar — a rail of inscribed nameplates, with edge affordances when
 * it overflows (M13 S4e).
 *
 * ## Why it stopped being MUI `Tabs`
 *
 * Two reasons, and the second is the one that mattered.
 *
 * The look: MUI's `Tabs` is a row of text buttons with a sliding underline
 * indicator. The theme had already switched the indicator off and given the
 * selected tab a wash and a keyline, which got it to "not obviously Material" and
 * no further — the tabs still floated in space with nothing tying them to the panel
 * they open. A codex tab is a nameplate on a rail: the rail is a keyline the whole
 * bar sits on, and the SELECTED plate breaks that line, because the thing you are
 * looking at is continuous with its label. That cannot be expressed through MUI's
 * indicator machinery, which draws a line *under* the selection rather than letting
 * the selection interrupt one.
 *
 * The overflow: at 768px and below, seven tabs do not fit. MUI's answer is
 * `variant="scrollable"` with `scrollButtons`, and this sheet had the buttons
 * switched OFF — so the bar simply cut off at the viewport edge with nothing saying
 * more tabs existed. A player who had never scrolled it sideways had no way to know
 * Companions and Party were there. Turning MUI's buttons on was the obvious fix and
 * the wrong one: they reserve their width permanently (the bar loses ~88px of label
 * space even when nothing is hidden) and they render as Material chevron icon
 * buttons.
 *
 * ## What the overflow behaviour is
 *
 * Three ways to reach a hidden tab, all live at once:
 *
 * - **Swipe / trackpad scroll** — native overflow scrolling, with scroll-snap so a
 *   flick lands on a plate rather than halfway through one.
 * - **The edge plates** — shown only when there IS something hidden on that side,
 *   and each scrolls by most of a viewport. They overlay the ends of the rail rather
 *   than sitting outside it, so the bar's measure does not change when they appear
 *   and disappear.
 * - **Keyboard** — arrow keys move the selection and pull the new tab into view,
 *   which is the standard tablist contract and is what the MUI version gave for
 *   free. Hand-rolling the bar means hand-rolling this, so it is here explicitly:
 *   `role="tablist"`, `aria-selected`, roving `tabIndex`, Home/End.
 *
 * The selected tab is also scrolled into view whenever it changes from outside (a
 * deep link with `?tab=5`, or the mobile/desktop switch renumbering the tabs), which
 * the CSS-only version of this could not do.
 */
export const SheetTabBar: React.FC<SheetTabBarProps> = ({
	tabs,
	value,
	onChange,
	label = 'Character sheet sections',
}) => {
	const scroller = useRef<HTMLDivElement>(null)
	const [overflow, setOverflow] = useState({ start: false, end: false })

	/**
	 * Which ends have something hidden past them.
	 *
	 * The 2px slack matters: fractional layout widths mean `scrollLeft` at the far
	 * end lands on values like `max - 0.5`, and without it the trailing plate
	 * flickers on at rest.
	 */
	const measure = useCallback(() => {
		const el = scroller.current
		if (!el) return
		setOverflow({
			start: el.scrollLeft > 2,
			end: el.scrollLeft + el.clientWidth < el.scrollWidth - 2,
		})
	}, [])

	useEffect(() => {
		const el = scroller.current
		if (!el) return
		measure()
		el.addEventListener('scroll', measure, { passive: true })
		// A resize changes what fits, and so does a font finishing loading; the
		// observer catches both without a window listener guessing at either.
		// `no-undef` is off-target here: ResizeObserver is a DOM global the lint env
		// does not list. Guarded for the same reason as `scrollIntoView` below —
		// a test environment without it must lose the affordance, not the sheet.
		/* eslint-disable no-undef */
		const observer =
			typeof ResizeObserver === 'undefined'
				? undefined
				: new ResizeObserver(measure)
		/* eslint-enable no-undef */
		observer?.observe(el)
		return () => {
			el.removeEventListener('scroll', measure)
			observer?.disconnect()
		}
	}, [measure, tabs.length])

	// Keeps the active plate reachable when the selection changes from outside —
	// `?tab=` on load, or the tab renumbering the mobile/desktop switch performs.
	useEffect(() => {
		const el = scroller.current
		if (!el) return
		const active = el.querySelector<HTMLElement>('[aria-selected="true"]')
		// Feature-detected, not assumed: `scrollIntoView` is absent in jsdom, and an
		// effect that throws takes the whole sheet down with it — which is exactly what
		// 23 integration tests reported when this landed unguarded.
		active?.scrollIntoView?.({ block: 'nearest', inline: 'nearest' })
	}, [value])

	const page = (direction: -1 | 1) => {
		const el = scroller.current
		if (!el) return
		el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: 'smooth' })
	}

	const onKeyDown = (event: React.KeyboardEvent) => {
		const last = tabs.length - 1
		const next = {
			ArrowRight: Math.min(value + 1, last),
			ArrowLeft: Math.max(value - 1, 0),
			Home: 0,
			End: last,
		}[event.key]
		if (next === undefined) return
		event.preventDefault()
		onChange(next)
	}

	return (
		<div className="cs-tabbar">
			{/* Edge plates before and after the rail in DOM order, so a screen reader
				meets them where they are; `aria-hidden` because scrolling a scroll
				container is not a task — the tabs themselves are all reachable by
				keyboard without them. */}
			<button
				type="button"
				className="cs-tabbar__edge cs-tabbar__edge--start"
				data-shown={overflow.start || undefined}
				aria-hidden="true"
				tabIndex={-1}
				onClick={() => page(-1)}
			>
				‹
			</button>
			<div className="cs-tabbar__scroll" ref={scroller}>
				<div role="tablist" aria-label={label} className="cs-tabbar__rail">
					{tabs.map((tab, index) => (
						<button
							key={tab.id}
							type="button"
							role="tab"
							id={`cs-tab-${tab.id}`}
							className="cs-tabbar__tab"
							aria-selected={index === value}
							// Roving tabIndex: one stop for the whole bar, then arrows move
							// within it. Seven tab stops for one control is the accessibility
							// mistake a hand-rolled tablist makes by default.
							tabIndex={index === value ? 0 : -1}
							onClick={() => onChange(index)}
							onKeyDown={onKeyDown}
						>
							{tab.label}
						</button>
					))}
				</div>
			</div>
			<button
				type="button"
				className="cs-tabbar__edge cs-tabbar__edge--end"
				data-shown={overflow.end || undefined}
				aria-hidden="true"
				tabIndex={-1}
				onClick={() => page(1)}
			>
				›
			</button>
		</div>
	)
}
