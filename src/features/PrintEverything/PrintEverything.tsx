import React, { useMemo, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import {
	useAutofitPending,
	useSpillPlan,
	whenAutofitSettled,
	type FitResult,
} from '@site/src/components/autofit'
import type { Character, CharacterDocument } from '@site/src/types/Character'
import { AbilityPrintCard } from '../Abilities/AbilityPrintCard'
import { FolkPrintCard } from '../Abilities/FolkPrintCard'
import { TalentPrintCard } from '../Abilities/TalentPrintCard'
import { CombatArtCard } from '../CombatArts/CombatArtCard'
import '../CombatArts/combatArtStyles.css'
import { CreatureCompactCard } from '../CreatureCards/CreatureCompactCard'
import '../CreatureCards/creatureCardsStyles.css'
import { MagicItemCard } from '../MagicItems/MagicItemCard'
import '../MagicItems/magicItemsStyles.css'
import { CHARACTER_SHEETS } from '../PrintCharacterSheet/sheets/sheetSections'
import '../PrintCharacterSheet/printCharacterSheetStyles.css'
import {
	CARD_PAGE,
	CARD_PAGE_MARGIN,
	CARD_SIZE,
	CharacterMultiSelector,
	itemsPerPage,
	PrintPages,
	PrintToggle,
	PrintToolShell,
	SHEET_PAGE,
	SHEET_PAGE_MARGIN,
	SHEET_SECTION,
	usePagePrintStyle,
} from '../PrintingTools'
import { SpellCard } from '../Spells/SpellCard'
import '../Spells/spellsStyles.css'
import {
	buildPartyDeck,
	CATEGORY_LABELS,
	deckByDeckPageCount,
	partyDocumentTitle,
	PRINT_CATEGORIES,
	type CardEntry,
	type PrintCategory,
} from './partyDeck'
import './printEverythingStyles.css'

/**
 * Two paper sizes in ONE print job (M22 S4, spiked before it was built).
 *
 * Cards print on 192 x 267mm portrait and character sheets on A4 landscape, and
 * a single `@page` rule cannot say both. CSS named pages can, and Chrome
 * honours them: measured with `page.pdf({ preferCSSPageSize: true })` over this
 * exact markup, the card pages came out 191.9 x 267.0mm and the sheet pages
 * 297.0 x 209.9mm, with no blank page and no bleed where a part-filled card
 * page meets the first sheet.
 *
 * The name has to sit on the `.pt-page` FIGURE rather than on the paper inside
 * it, which is why `PrintPages` takes a `pageName` and stamps the figure.
 */
const PAGE_CSS = `
	@page cards  { size: 192mm 267mm; margin: 0; }
	@page sheets { size: A4 landscape; margin: 0; }
	.pt-page--cards  { page: cards; }
	.pt-page--sheets { page: sheets; }
`

/** Everything except the character sheets — the paper-saving default. */
const DEFAULT_CATEGORIES: PrintCategory[] = PRINT_CATEGORIES.filter(
	(category) => category !== 'characterSheets',
)

const CATEGORY_NOTES: Partial<Record<PrintCategory, string>> = {
	abilities: 'Talents, folk abilities and one-off abilities.',
	magicItems: 'Only items whose description carries rules text.',
	companions: 'Stat block cards for animal companions and mounts.',
	characterSheets: 'Two A4 landscape pages per character, not cards.',
}

/** The card for one entry, whichever deck it would have come from. */
const EntryCard: React.FC<{
	entry: CardEntry
	start: number
	end?: number
	part: number
	totalParts: number
	onFitted: (result: FitResult) => void
}> = ({ entry, ...fit }) => {
	switch (entry.kind) {
		case 'spell':
			return <SpellCard {...entry.spell} {...fit} />
		case 'combatArt':
			return (
				<CombatArtCard
					name={entry.art.name}
					category={entry.art.category}
					weapons={entry.art.weapons}
					effect={entry.art.effect}
					{...fit}
				/>
			)
		case 'ability':
			if (entry.entry.group === 'Folk') {
				return (
					<FolkPrintCard
						name={entry.entry.title}
						abilities={entry.entry.abilities ?? []}
						languages={entry.entry.languages}
						{...fit}
					/>
				)
			}
			if (entry.entry.group === 'Talent') {
				// The whole rank ladder, never the character's purchased rank: which
				// ranks someone has unlocked is a fact about the CHARACTER and lives
				// on their sheet, and a card that omits rank 3 expires the moment
				// they buy it (M20 D5, owner's ruling).
				return (
					<TalentPrintCard
						name={entry.entry.title}
						description={entry.entry.description ?? ''}
						skill={entry.entry.category}
						{...fit}
					/>
				)
			}
			return (
				<AbilityPrintCard
					name={entry.entry.title}
					description={entry.entry.description ?? ''}
					actionType={entry.entry.actionType}
					skill={entry.entry.category}
					{...fit}
				/>
			)
		case 'magicItem':
			return <MagicItemCard {...entry.item} {...fit} />
		case 'companion':
			return <CreatureCompactCard {...entry.creature} {...fit} />
	}
}

/**
 * Everything a party prints, in one job (M22).
 *
 * The five card decks and the character sheet each print one character's worth
 * of one kind of thing. Preparing a table therefore meant six visits, six
 * selections and six print jobs, each ending in a page with room left on it —
 * six part-filled pages for a party of four is most of a sheet of paper thrown
 * away per session.
 *
 * Here the whole party's cards are ONE continuously packed run: only the last
 * card page is part empty, whatever the party owns. The stack is ordered by
 * character and then by category, so cutting it up still deals into player
 * piles in a single pass.
 */
export const PrintEverything: React.FC = () => {
	const [selectedKeys, setSelectedKeys] = useState<string[]>([])
	const [characters, setCharacters] = useState<CharacterDocument[]>([])
	const [categories, setCategories] =
		useState<PrintCategory[]>(DEFAULT_CATEGORIES)

	usePagePrintStyle(PAGE_CSS)

	const deck = useMemo(
		() => buildPartyDeck(characters, categories),
		[characters, categories],
	)

	/*
	 * The same party with everything switched on, for the counts beside the
	 * toggles.
	 *
	 * A count that only appears once a category is ticked answers the question
	 * after it has been asked. The whole point of the number is to say what
	 * ticking would cost, so it is computed from a deck that always includes
	 * every category. Building the deck is pure array work over data already in
	 * memory; the cards are what cost anything, and these are never rendered.
	 */
	const fullDeck = useMemo(
		() => buildPartyDeck(characters, PRINT_CATEGORIES),
		[characters],
	)

	const componentRef = useRef()
	// A print that opens before the cards have settled prints the pre-fit
	// layout, and the dialog blocks the session, so there is no second chance
	// (M18 D2). With a party's worth of cards there are a great many more fits
	// to wait on than any single deck ever had.
	const settlingCards = useAutofitPending()

	// The spill runs BEFORE pagination (M18 D3): a card that becomes two after
	// the grid is computed lands on the wrong page and pushes everything after
	// it. Keys are already unique across characters AND categories, which is
	// what makes one plan over the whole party safe.
	const planKeys = useMemo(() => deck.cards.map((card) => card.key), [deck])
	const spillPlan = useSpillPlan(planKeys)
	const printedCards = useMemo(
		() =>
			deck.cards.flatMap((entry) =>
				spillPlan.partsFor(entry.key).map((part) => ({ entry, part })),
			),
		[deck, spillPlan.partsFor],
	)

	const cardPageCount = Math.ceil(
		printedCards.length / itemsPerPage(CARD_PAGE, CARD_SIZE, CARD_PAGE_MARGIN),
	)
	const sectionsPerPage = itemsPerPage(
		SHEET_PAGE,
		SHEET_SECTION,
		SHEET_PAGE_MARGIN,
	)
	const sheetSections = deck.sheets.length * CHARACTER_SHEETS.length
	const sheetPageCount = Math.ceil(sheetSections / sectionsPerPage)
	const totalPages = cardPageCount + sheetPageCount

	// What the tight pack is worth, counted rather than claimed: the same cards
	// printed one tool at a time end each deck on a part-filled page, and that
	// is the paper this page exists to stop spending.
	const savedPages =
		deckByDeckPageCount(
			deck.counts,
			itemsPerPage(CARD_PAGE, CARD_SIZE, CARD_PAGE_MARGIN),
		) - cardPageCount

	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
		onBeforeGetContent: whenAutofitSettled,
		documentTitle: partyDocumentTitle(
			characters.map((character) => character.personal?.name || 'Unnamed'),
			printedCards.length,
			sheetPageCount,
		),
	})

	const toggleCategory = (category: PrintCategory, on: boolean) =>
		setCategories((previous) =>
			on
				? PRINT_CATEGORIES.filter(
						(candidate) =>
							candidate === category || previous.includes(candidate),
					)
				: previous.filter((candidate) => candidate !== category),
		)

	const nothingToPrint = printedCards.length === 0 && sheetSections === 0

	return (
		<PrintToolShell
			controlsLabel="Select"
			previewLabel="Preview"
			controls={
				<>
					<div className="pt-section">
						<div className="pt-section__head">
							<span className="pt-section__step">I</span>
							<span className="pt-section__label">Characters</span>
						</div>
						<CharacterMultiSelector
							selectedKeys={selectedKeys}
							onChange={(selected, keys) => {
								setCharacters(selected)
								setSelectedKeys(keys)
							}}
							helperText="Everything below is printed for each character ticked here."
						/>
					</div>

					<div className="pt-section">
						<div className="pt-section__head">
							<span className="pt-section__step">II</span>
							<span className="pt-section__label">Include</span>
						</div>
						{PRINT_CATEGORIES.map((category) => {
							const count =
								category === 'characterSheets'
									? fullDeck.sheets.length
									: fullDeck.counts[category]
							return (
								<PrintToggle
									key={category}
									className="pt-toggle--tight"
									checked={categories.includes(category)}
									onChange={(on) => toggleCategory(category, on)}
									label={
										<>
											{CATEGORY_LABELS[category]}
											{characters.length > 0 && (
												<span className="pe-category__count">
													{category === 'characterSheets'
														? `${count} ${count === 1 ? 'sheet' : 'sheets'}`
														: `${count} ${count === 1 ? 'card' : 'cards'}`}
												</span>
											)}
										</>
									}
									note={CATEGORY_NOTES[category]}
								/>
							)
						})}
					</div>

					<div className="pt-section">
						<div className="pt-count">
							{printedCards.length}{' '}
							{printedCards.length === 1 ? 'card' : 'cards'}
							{spillPlan.continuations > 0 && (
								<>
									{' '}
									(
									{spillPlan.continuations === 1
										? '1 continuation'
										: `${spillPlan.continuations} continuations`}
									)
								</>
							)}
							{sheetSections > 0 && (
								<>
									{' '}
									· {deck.sheets.length}{' '}
									{deck.sheets.length === 1 ? 'sheet' : 'sheets'}
								</>
							)}
							{totalPages > 0 && (
								<>
									{' '}
									· {totalPages} {totalPages === 1 ? 'page' : 'pages'}
								</>
							)}
							{/* What the tight pack actually saved, stated rather than
							    implied: printing the same cards one deck at a time is
							    what this page exists to replace, and the difference is
							    the reason to use it. */}
							{savedPages > 0 && (
								<div className="pe-savings">
									{savedPages} {savedPages === 1 ? 'page' : 'pages'} saved by
									packing the decks together, against printing them one tool at
									a time.
								</div>
							)}
							{deck.companionErrors.length > 0 && (
								<div className="pt-count__warning">
									Could not read companions for{' '}
									{deck.companionErrors.join(', ')} — check the companion
									markdown on those sheets.
								</div>
							)}
							{spillPlan.oversize.length > 0 && (
								<div className="pt-count__warning">
									{spillPlan.oversize.length} entr
									{spillPlan.oversize.length === 1 ? 'y' : 'ies'} will not fit
									on a card even split — the rules text is over budget.
								</div>
							)}
						</div>
						<button
							type="button"
							className="pt-print-verb"
							onClick={handlePrint}
							disabled={nothingToPrint || settlingCards > 0}
						>
							{settlingCards > 0 ? 'Fitting cards…' : 'Print everything'}
						</button>
					</div>
				</>
			}
			preview={
				<div ref={componentRef}>
					<PrintPages
						page={CARD_PAGE}
						item={CARD_SIZE}
						margin={CARD_PAGE_MARGIN}
						pageName="cards"
						pageNumbering={{ offset: 0, total: totalPages }}
						empty={
							sheetSections === 0 ? (
								<p className="pt-empty">
									Tick the characters to print for, and what to print, in the
									controls panel.
								</p>
							) : null
						}
					>
						{printedCards.map(({ entry, part }) => (
							<div
								key={`${entry.key}#${part.part}`}
								title={`For character: ${entry.characterName}`}
							>
								<EntryCard
									entry={entry}
									start={part.start}
									end={part.end}
									part={part.part}
									totalParts={part.totalParts}
									onFitted={(result) =>
										spillPlan.report(entry.key, part.start, result)
									}
								/>
							</div>
						))}
					</PrintPages>

					{deck.sheets.length > 0 && (
						<PrintPages
							page={SHEET_PAGE}
							item={SHEET_SECTION}
							margin={SHEET_PAGE_MARGIN}
							pageName="sheets"
							pageNumbering={{ offset: cardPageCount, total: totalPages }}
							/* Nothing here is cut: the sheet page IS the artifact, kept
							   whole or folded once down its centre. */
							cutMarks={false}
						>
							{deck.sheets.flatMap((document) =>
								CHARACTER_SHEETS.map(({ key, Sheet }) => (
									<Sheet
										key={`${document.docId}-${key}`}
										char={document as unknown as Character}
									/>
								)),
							)}
						</PrintPages>
					)}
				</div>
			}
		/>
	)
}
