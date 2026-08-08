import React from 'react'
import SigilIcon from './SigilIcon'
import { SigilName } from './sigil-paths'

export interface ChapterSigilProps {
	name: SigilName
}

/**
 * The chapter sigil shown before a doc page's h1, injected by the chapter-sigil
 * remark plugin as `<ChapterSigil name="..."/>`. Registered globally in
 * `src/theme/MDXComponents` so the plugin can reference it without a per-file
 * import. The `heading-sigil` class (styled in custom.css) sizes it to the cap
 * height and tints it bronze via currentColor.
 */
export default function ChapterSigil({ name }: ChapterSigilProps) {
	return <SigilIcon name={name} className="heading-sigil" title={undefined} />
}
