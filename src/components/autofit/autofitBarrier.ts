/**
 * The print barrier (M18 D2, pattern file trap 2).
 *
 * `window.print()` opening before the fits have settled prints the pre-fit
 * layout, and there is no second chance — the dialog blocks the session and the
 * paper is already wrong. Every card registers while it is measuring and the
 * tools' PRINT verb waits on the count reaching zero.
 *
 * A module-level store rather than a React context, because the two ends are on
 * opposite sides of `PrintToolShell`: the cards are inside the preview pane and
 * the verb is in the controls pane, with no common provider between them that
 * is not the page itself. A store also survives the preview unmounting mid-fit,
 * which a context's unmount ordering does not make easy to reason about.
 */

let pending = 0
const subscribers = new Set<() => void>()
const waiters = new Set<() => void>()

function emit() {
	subscribers.forEach((notify) => notify())
}

/** A card has started measuring. Pair with exactly one `endFit`. */
export function beginFit(): void {
	pending += 1
	emit()
}

/** A card has settled (or given up, or unmounted mid-measure). */
export function endFit(): void {
	pending = Math.max(0, pending - 1)
	if (pending === 0) {
		const settled = Array.from(waiters)
		waiters.clear()
		settled.forEach((resolve) => resolve())
	}
	emit()
}

/** How many cards have not settled yet. */
export function autofitPending(): number {
	return pending
}

/**
 * Resolves once every card has settled.
 *
 * `react-to-print`'s `onBeforeGetContent` takes a promise, so a tool gates its
 * print on this and the dialog cannot open early.
 */
export function whenAutofitSettled(): Promise<void> {
	if (pending === 0) return Promise.resolve()
	return new Promise<void>((resolve) => {
		waiters.add(resolve)
	})
}

export function subscribeAutofit(notify: () => void): () => void {
	subscribers.add(notify)
	return () => {
		subscribers.delete(notify)
	}
}

/** Test seam. Never called by the app. */
export function resetAutofitBarrier(): void {
	pending = 0
	waiters.clear()
	subscribers.clear()
}
