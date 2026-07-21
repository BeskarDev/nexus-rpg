import React from 'react'
// Default Docusaurus MDX component mapping (admonitions, headings, code, etc.).
import MDXComponents from '@theme-original/MDXComponents'
import ChapterSigil from '@site/src/components/codex/ChapterSigil'
import SpellCodexCard from '@site/src/components/codex/SpellCodexCard'
import SuccessLevel from '@site/src/components/codex/SuccessLevel'
import SpellHeightened from '@site/src/components/codex/SpellHeightened'
import { LozengeDivider, RankChip } from '@site/src/components/codex/ornaments'

/**
 * Global MDX component registry. Extends the Docusaurus defaults with codex
 * components that the remark plugins inject or the content generator emits
 * without a per-file import. `ChapterSigil` is emitted before each page's h1 by
 * the chapter-sigil plugin; the spell trio is emitted by `content:gen`.
 */
export default {
	...MDXComponents,
	ChapterSigil,
	SpellCodexCard,
	SuccessLevel,
	SpellHeightened,
	RankChip,
	// Replace the default `---` thematic break with the ornamental divider.
	hr: LozengeDivider,
}
