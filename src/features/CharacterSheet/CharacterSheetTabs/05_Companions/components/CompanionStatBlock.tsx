import React from 'react'
import { Box } from '@mui/material'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
// Imported from the module, NOT the `codex` barrel: that barrel reaches
// `MDXComponents` and Docusaurus's own theme components, which vitest cannot parse — six
// unrelated test files started failing the moment this file imported it (M13 S7).
import CreatureStatBlock, {
	StatBlockSection,
	StatBlockTrait,
	TraitItem,
} from '@site/src/components/codex/CreatureStatBlock'
import { parseCompanionMarkdown } from '../utils/parseCompanionMarkdown'
import {
	renderCompanionEntry,
	renderCompanionInline,
} from '@site/src/utils/typescript/companion/companionInline'

/** Trait rows whose value is a comma-separated list rather than a phrase. */
const LIST_TRAITS = ['Immunities', 'Resistances', 'Weaknesses']

export type CompanionStatBlockProps = {
	name: string
	markdown: string
}

/**
 * A companion's stat block, drawn as the codex's own creature card (M13 S7, owner review).
 *
 * ## Why the docs' component, and not a copy of it
 *
 * The README's don't-list includes "reusing character sheet spell components in the docs (or
 * vice versa)", and that rule is right for the case it was written about: a spell ROW on the
 * sheet is an editable control and a spell CARD in the docs is a published reading, so sharing
 * one component would force it to be both.
 *
 * This is not that case. A companion's stat block is the *same artifact* as a creature's, read
 * the same way, and the sheet's copy is display-only — `CreatureStatBlock` is documented as
 * "purely an information display", which is exactly the job here. Building a second stat block
 * for the sheet would mean two implementations of the defence-vitals-attributes band, two
 * `DieToken` layouts and two sets of trait rows, drifting apart the way the two meta bands did
 * in S4d. The rule is amended rather than broken: a read-only codex DISPLAY component may be
 * reused by the sheet; an editable sheet component still may not go the other way.
 *
 * ## When it falls back
 *
 * A player can paste anything into a companion's markdown, and plenty will: half a stat block,
 * a note about a mount's temperament, a list of tricks. The parser returns `null` unless it
 * finds a header and a nine-column stat row, and this renders the markdown as prose in that
 * case. A card with empty numerals would be worse than the text it replaced.
 */
export const CompanionStatBlock: React.FC<CompanionStatBlockProps> = ({
	name,
	markdown,
}) => {
	const block = parseCompanionMarkdown(markdown)

	if (!block) {
		return (
			<Box className="cs-statblock" sx={{ flex: '1 1 100%', minWidth: 0 }}>
				<ReactMarkdown remarkPlugins={[remarkGfm]}>
					{markdown || '_No stat block yet._'}
				</ReactMarkdown>
			</Box>
		)
	}

	return (
		<Box className="cs-companion-card" sx={{ flex: '1 1 100%', minWidth: 0 }}>
			<CreatureStatBlock
				type={block.type}
				tier={block.tier}
				category={block.category}
				hp={block.hp}
				av={block.av}
				str={block.str}
				agi={block.agi}
				spi={block.spi}
				mnd={block.mnd}
				parry={block.parry}
				dodge={block.dodge}
				resist={block.resist}
			>
				{/* The card lifts its first child into the name row, and expects that child to
					be the heading — so the companion's own name is passed as one, exactly as a
					generated creature page does. */}
				<h3>{block.name || name}</h3>
				{/* `renderCompanionInline`, not `ReactMarkdown`: a companion's block is a string
					in Firestore, so none of the MDX pipeline a creature page goes through runs on
					it — no chips, no entry names, no damage ladders. See that module. */}
				{block.traits.map((trait) => (
					<StatBlockTrait key={trait.label} label={trait.label}>
						{LIST_TRAITS.includes(trait.label)
							? /*
								Immunities, resistances and weaknesses are LISTS, and a creature page
								wraps each entry in a `TraitItem` — a quiet badge — precisely because
								those lists mix damage types (which chip) with conditions and free-form
								qualifiers (which do not). Passing the raw comma string gave the
								companion one long sentence with a single loud chip dropped into it,
								which is exactly the reading `TraitItem` was created to prevent
								(S7, owner review).
							*/
								trait.value
									.split(',')
									.map((entry, index) => (
										<TraitItem key={index}>
											{renderCompanionInline(entry.trim())}
										</TraitItem>
									))
							: renderCompanionInline(trait.value)}
					</StatBlockTrait>
				))}
				{block.sections.map((section) => (
					<StatBlockSection key={section.label} label={section.label}>
						<ul>
							{section.items.map((item, index) => (
								<li key={index}>{renderCompanionEntry(item)}</li>
							))}
						</ul>
					</StatBlockSection>
				))}
			</CreatureStatBlock>
		</Box>
	)
}
