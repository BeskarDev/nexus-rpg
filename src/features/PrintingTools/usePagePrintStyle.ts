import { useEffect } from 'react'

/**
 * Put a print-only `@page` rule in the document head, for as long as the tool
 * is on screen (M19, owner-reported).
 *
 * **Why not a `<style>` in the JSX**: the tools rendered one inline, and the
 * auto-columns plugin later began wrapping doc pages in a grid whose
 * `.grid > *` rule sets `display: block`. That beats the user agent's
 * `display: none` for a style element, so `@page { size: 192mm 267mm; }`
 * printed itself on the page as literal text. The columns rule now excludes
 * non-rendered elements, but an `@page` rule is document-level and has no
 * business being in the flow in the first place.
 *
 * **Why not `<Head>`**: Docusaurus's helmet quietly drops a `<style>` child —
 * no warning, no rule, and the printed page silently reverts to the browser's
 * default paper size. Verified rather than assumed: the rule never reached
 * `document.head`.
 *
 * So: imperative, client-only, removed on unmount. Printing is a client
 * concern, and the server has no page size to declare.
 */
export function usePagePrintStyle(css: string): void {
	useEffect(() => {
		if (typeof document === 'undefined') return
		const style = document.createElement('style')
		style.media = 'print'
		style.setAttribute('data-print-tool', '')
		style.textContent = css
		document.head.appendChild(style)
		return () => {
			style.remove()
		}
	}, [css])
}
