/**
 * Raster image modules.
 *
 * Docusaurus's `@docusaurus/module-type-aliases` declares `*.svg`, `*.css`,
 * `*.md` and `*.mdx`, but not raster formats — so importing a banner
 * (`import banner from '@site/static/img/banner/home-banner.png'`) is a `tsc`
 * error even though webpack resolves it fine through its asset loader. The
 * homepage hit this the moment it moved from `.js` to `.tsx`, because the old
 * `.js` file was never type-checked.
 *
 * Each import resolves to the emitted asset URL, so the type is a string.
 */

declare module '*.png' {
	const src: string
	export default src
}

declare module '*.jpg' {
	const src: string
	export default src
}

declare module '*.jpeg' {
	const src: string
	export default src
}

declare module '*.gif' {
	const src: string
	export default src
}

declare module '*.webp' {
	const src: string
	export default src
}
