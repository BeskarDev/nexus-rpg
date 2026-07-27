import React from 'react'
// Default Docusaurus MDX component mapping (admonitions, headings, code, etc.).
import MDXComponents from '@theme-original/MDXComponents'
import ChapterSigil from '@site/src/components/codex/ChapterSigil'
import SpellCodexCard from '@site/src/components/codex/SpellCodexCard'
import SuccessLevel from '@site/src/components/codex/SuccessLevel'
import SpellHeightened from '@site/src/components/codex/SpellHeightened'
import ConditionCard from '@site/src/components/codex/ConditionCard'
import CombatArtCard from '@site/src/components/codex/CombatArtCard'
import TalentCard, { TalentRank } from '@site/src/components/codex/TalentCard'
import CreatureStatBlock, {
	StatBlockSection,
	StatBlockTrait,
	DamageLadder,
	StatBadge,
	EntryName,
	TraitItem,
	CreatureLore,
	LoreSection,
	LoreTag,
	EncounterTemplate,
	EncounterGroup,
	TreasureTable,
	TreasureRow,
} from '@site/src/components/codex/CreatureStatBlock'
import { LozengeDivider, RankChip } from '@site/src/components/codex/ornaments'
import DocTable from '@site/src/components/codex/DocTable'
import MdxImage from '@site/src/components/codex/MdxImage'

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
	ConditionCard,
	CombatArtCard,
	TalentCard,
	TalentRank,
	CreatureStatBlock,
	StatBlockSection,
	StatBlockTrait,
	DamageLadder,
	StatBadge,
	EntryName,
	TraitItem,
	CreatureLore,
	LoreSection,
	LoreTag,
	EncounterTemplate,
	EncounterGroup,
	TreasureTable,
	TreasureRow,
	RankChip,
	// Replace the default `---` thematic break with the ornamental divider.
	hr: LozengeDivider,
	// Wrap every markdown table in its stone slab + frieze cornice (M8 S3).
	table: DocTable,
	// Route alt-marked images into their carved plate (M11 S2). This one
	// registration is the entire banner rollout: 46 placements across 41 files,
	// with no markdown edited — which is also what makes it safe to revert.
	img: MdxImage,
}
