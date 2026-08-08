import {
	Checkbox,
	FormControl,
	InputLabel,
	ListItemText,
	MenuItem,
	OutlinedInput,
	Select,
	SelectChangeEvent,
} from '@mui/material'
import {
	CheckMarkChecked,
	CheckMarkEmpty,
} from '@site/src/components/codex/CheckMark'
import {
	useAutofitPending,
	useSpillPlan,
	whenAutofitSettled,
	type FitResult,
} from '@site/src/components/autofit'
import type { Character, CharacterDocument } from '@site/src/types/Character'
import React, { useMemo, useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import {
	CARD_PAGE,
	CARD_PAGE_MARGIN,
	CARD_SIZE,
	CharacterSelector,
	deckDocumentTitle,
	itemsPerPage,
	PrintPages,
	PrintToolShell,
	usePagePrintStyle,
} from '../PrintingTools'
import {
	catalogueEntries,
	characterAbilities,
	talentRanks,
	type AbilityGroup,
	type DeckEntry,
} from './abilitySources'
import { AbilityPrintCard } from './AbilityPrintCard'
import { FolkPrintCard } from './FolkPrintCard'
import { TalentPrintCard } from './TalentPrintCard'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
}

type GroupFilter = 'all' | AbilityGroup

/** What the tool has taken off one character, so a reset can undo all of it. */
interface LoadedCharacter {
	docId: string
	entries: DeckEntry[]
	skippedCombatArts: number
}

/**
 * The fifth card tool: abilities (M20 D1).
 *
 * The printed character sheet lists a character's abilities by NAME and nothing
 * else — a title and an action glyph per row, because a sheet has no room for
 * 148 talents' worth of rules text. So the one thing a player needs mid-turn
 * ("what does rank 3 of Mana Shield actually do?") was on no printed surface at
 * all. This is that surface.
 *
 * One tool and one mixed deck rather than three tools: the three groups share
 * the character import, the selection list, the page geometry and the print
 * button, and a GM printing a party prints all three kinds in one run.
 * `Combat Art` is excluded because it already has a deck of its own — visibly,
 * with a count (D8).
 */
export const Abilities: React.FC = () => {
	const [manualIds, setManualIds] = React.useState<string[]>([])
	const [loaded, setLoaded] = React.useState<LoadedCharacter[]>([])
	const [groupFilter, setGroupFilter] = React.useState<GroupFilter>('all')
	/**
	 * Print only the rungs a character bought — OFF by default (owner, D5
	 * revised).
	 *
	 * D5 had this the other way round, trimming by default on the paper argument:
	 * the median talent drops from 637 characters to 204, which is a card at
	 * reading size instead of at the type floor. The owner overruled it, and the
	 * reason outranks the measurement — **which ranks a character has unlocked is
	 * a fact about the CHARACTER, and it belongs on the character sheet. A talent
	 * card is the talent.** A card that silently omits rank 3 is a card that lies
	 * about what the talent does, and it stops being reusable the moment the
	 * player buys the next rung.
	 *
	 * So the trim stays, as an opt-in for a player who wants a lean deck of only
	 * what they can use today.
	 */
	const [ownedRanksOnly, setOwnedRanksOnly] = React.useState(false)
	const [characterJsonString, setCharacterJsonString] = React.useState('')
	const [showJsonImport, setShowJsonImport] = React.useState(false)

	const catalogue = useMemo(() => catalogueEntries(), [])

	// `Other` has no catalogue and never will — it is the sheet's free-text
	// bucket, so those cards can only come from a character (F2). The menu offers
	// the two catalogued groups and says so rather than rendering empty.
	const availableEntries = useMemo(() => {
		if (groupFilter === 'all') return catalogue
		return catalogue.filter((entry) => entry.group === groupFilter)
	}, [catalogue, groupFilter])

	const handleManualChange = (event: SelectChangeEvent<string[]>) => {
		const { value } = event.target
		setManualIds(typeof value === 'string' ? value.split(',') : value)
	}

	/**
	 * Accumulate a character, as the spell and treasure tools do (M19 D9).
	 *
	 * Keyed by `docId`, so loading the same character twice refreshes it instead
	 * of printing everything twice — and two DIFFERENT characters holding the
	 * same talent at different ranks stay two entries with two ids (D7).
	 */
	const addCharacter = (
		character: Pick<Character, 'personal' | 'skills'>,
		docId: string,
	) => {
		const { entries, skippedCombatArts } = characterAbilities(character, docId)
		setLoaded((prev) => [
			...prev.filter((entry) => entry.docId !== docId),
			{ docId, entries, skippedCombatArts },
		])
	}

	const handleCharacterSelect = (character: CharacterDocument | null) => {
		if (character) addCharacter(character, character.docId)
	}

	const handleCharacterUpload = (jsonString: string) => {
		setCharacterJsonString(jsonString)
		if (!jsonString.trim()) return
		try {
			const character: Character = JSON.parse(jsonString)
			// A pasted character has no document id. Its name stands in, so two
			// pastes of two different characters do not collide on one key.
			addCharacter(character, `pasted:${character.personal?.name ?? 'unnamed'}`)
		} catch (error) {
			console.error('Failed to parse character JSON:', error)
		}
	}

	const skippedCombatArts = useMemo(
		() => loaded.reduce((total, entry) => total + entry.skippedCombatArts, 0),
		[loaded],
	)

	/**
	 * The deck, in one vocabulary: IDS, end to end (F8).
	 *
	 * Keying the menu by name while the state held ids killed every manual pick
	 * in the spell tool and left a dead print button, and here the collision is
	 * both worse and cheaper to hit — a character's ability already carries its
	 * own id, and two characters legitimately hold the same talent.
	 */
	const deckEntries = useMemo(() => {
		const fromCharacters = loaded.flatMap((entry) => entry.entries)
		const byId = new Map(catalogue.map((entry) => [entry.id, entry]))
		const fromMenu = manualIds
			.map((id) => byId.get(id))
			.filter((entry): entry is DeckEntry => Boolean(entry))
		return [...fromCharacters, ...fromMenu].filter(
			(entry) => groupFilter === 'all' || entry.group === groupFilter,
		)
	}, [catalogue, groupFilter, loaded, manualIds])

	/**
	 * The ladder each talent actually prints (D5, revised by the owner).
	 *
	 * The whole ladder, unless the reader asks for the trim. A manual pick has no
	 * purchaser and prints the whole ladder either way, so this only ever changes
	 * a talent loaded from a character.
	 */
	const printedEntries = useMemo(
		() =>
			deckEntries.map((entry) => ({
				entry,
				body:
					entry.group === 'Talent'
						? talentRanks(
								entry.description ?? '',
								ownedRanksOnly ? entry.rank : undefined,
							)
						: (entry.description ?? ''),
			})),
		[deckEntries, ownedRanksOnly],
	)

	const componentRef = useRef()
	// A print that opens before the cards have settled prints the pre-fit layout,
	// and the dialog blocks the session, so there is no second chance (M18 D2).
	const settlingCards = useAutofitPending()

	// The spill runs BEFORE pagination (M18 D3): a card that becomes two after
	// the grid is computed lands on the wrong page and pushes everything after
	// it. The ladder mode is in the key because switching it changes the body,
	// and a plan's cuts only ever grow — stale cuts from the longer body would
	// over-split the shorter one.
	const planKeys = useMemo(
		() =>
			printedEntries.map(
				({ entry }, index) =>
					`${entry.id}#${index}#${ownedRanksOnly ? 'owned' : 'full'}`,
			),
		[printedEntries, ownedRanksOnly],
	)
	const spillPlan = useSpillPlan(planKeys)
	const printedCards = useMemo(
		() =>
			printedEntries.flatMap(({ entry, body }, index) => {
				const planKey = planKeys[index]
				return spillPlan
					.partsFor(planKey)
					.map((part) => ({ entry, body, planKey, part }))
			}),
		[printedEntries, planKeys, spillPlan.partsFor],
	)

	// From the card and page geometry, not a hand-written 9 — the same call the
	// preview paginates by, so the stated count and the drawn pages cannot drift.
	const sheetCount = Math.ceil(
		printedCards.length / itemsPerPage(CARD_PAGE, CARD_SIZE, CARD_PAGE_MARGIN),
	)

	/**
	 * The plan's own numbers, now that it retires the keys it is no longer asked
	 * for (M21 D5).
	 *
	 * This used to be counted from the deck here instead — `printedCards.length
	 * - deckEntries.length` — because `continuations` summed the cuts of every
	 * key the plan had ever seen and never retired one, so deselecting an entry
	 * or flipping the rank toggle (which changes the key by design) left its cut
	 * in the total. M20 patched that in this file and deferred the real fix;
	 * `useSpillPlan` takes the live keys now, so there is one answer again.
	 */
	const continuations = spillPlan.continuations
	const oversize = spillPlan.oversize

	// One character's deck is named after them; a mixed or unattributed deck is
	// not about a person, so it is left unnamed rather than named after whoever
	// happened to be loaded first.
	const printSubject = useMemo(() => {
		const names = new Set(
			deckEntries
				.map((entry) => entry.characterName)
				.filter((name): name is string => Boolean(name)),
		)
		return names.size === 1 ? [...names][0] : undefined
	}, [deckEntries])

	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
		onBeforeGetContent: whenAutofitSettled,
		documentTitle: deckDocumentTitle({
			kind: 'abilities',
			count: printedCards.length,
			subject: printSubject,
		}),
	})

	// A document-level rule, so it goes in the document head — never in the flow,
	// where a `<style>` printed itself on the page as text (M19).
	usePagePrintStyle('@page { size: 192mm 267mm; }')

	const selectAll = () => setManualIds(availableEntries.map((e) => e.id))
	const deselectAll = () => {
		setManualIds([])
		setLoaded([])
		setCharacterJsonString('')
	}

	return (
		<PrintToolShell
			controlsLabel="Select Abilities"
			previewLabel="Preview"
			controls={
				<>
					<div className="pt-section">
						<div className="pt-section__head">
							<span className="pt-section__step">I</span>
							<span className="pt-section__label">Source</span>
						</div>
						<div className="pt-source">
							<CharacterSelector
								onCharacterSelect={handleCharacterSelect}
								label="Load character's abilities"
								helperText="Adds the character's talents, folk abilities and one-off abilities. Combat arts are left to their own tool."
							/>
							<button
								type="button"
								className={`pt-import-toggle${showJsonImport ? ' is-open' : ''}`}
								onClick={() => setShowJsonImport(!showJsonImport)}
								aria-expanded={showJsonImport}
								aria-controls="pt-import-abilities"
							>
								<span className="pt-import-toggle__caret" aria-hidden="true" />
								Import character as JSON
							</button>
							<div
								id="pt-import-abilities"
								className={`pt-import-body${showJsonImport ? '' : ' is-hidden'}`}
							>
								<textarea
									value={characterJsonString}
									onChange={(event) =>
										handleCharacterUpload(event.target.value)
									}
									placeholder="Paste character JSON here…"
									aria-label="Character JSON import"
								/>
							</div>
						</div>
					</div>
					<div className="pt-section">
						<div className="pt-section__head">
							<span className="pt-section__step">II</span>
							<span className="pt-section__label">Selection</span>
						</div>
						<FormControl size="small" fullWidth sx={{ mb: 0.5 }}>
							<InputLabel>Group</InputLabel>
							<Select
								value={groupFilter}
								onChange={(event) =>
									setGroupFilter(event.target.value as GroupFilter)
								}
								input={<OutlinedInput label="Group" />}
							>
								<MenuItem value="all">All Abilities</MenuItem>
								<MenuItem value="Talent">Talents Only</MenuItem>
								<MenuItem value="Folk">Folk Only</MenuItem>
								<MenuItem value="Other">Other Only</MenuItem>
							</Select>
						</FormControl>
						<FormControl size="small" fullWidth>
							<InputLabel>Talents &amp; Folk</InputLabel>
							<Select
								multiple
								value={manualIds}
								onChange={handleManualChange}
								disabled={groupFilter === 'Other'}
								input={<OutlinedInput label="Talents & Folk" />}
								renderValue={(selected) => `${selected.length} selected`}
								MenuProps={MenuProps}
							>
								{/* Keyed and valued by ID, never by name (F8, D7). */}
								{availableEntries.map(({ id, title, group, category }) => (
									<MenuItem key={id} value={id}>
										<Checkbox checked={manualIds.indexOf(id) > -1} />
										<ListItemText
											primary={title}
											secondary={group === 'Folk' ? 'Folk' : category}
										/>
									</MenuItem>
								))}
							</Select>
						</FormControl>
						{/* Explained rather than shown empty: `Other` is the sheet's
						    free-text bucket, so nothing generates it (F2). */}
						{groupFilter === 'Other' && (
							<div className="pt-count">
								Other abilities are written on a character's sheet — a patron's
								boon, a curse, a GM ruling — so there is nothing to pick from.
								Load a character above.
							</div>
						)}
						<div className="pt-select-row">
							<button
								type="button"
								className="pt-verb-quiet"
								onClick={selectAll}
								disabled={groupFilter === 'Other'}
							>
								Select all
							</button>
							<button
								type="button"
								className="pt-verb-quiet"
								onClick={deselectAll}
							>
								Clear
							</button>
						</div>
						{/*
						 * The D5 override, and the theme's own control rather than MUI's
						 * `Switch`: a sliding pill with a filled knob is the radius, the
						 * colour mass and the motion that `CheckMark` was drawn to take
						 * out of this site's checkboxes (M13 S4d).
						 */}
						<label className="pt-toggle">
							<input
								type="checkbox"
								className="pt-toggle__input"
								checked={ownedRanksOnly}
								onChange={(event) => setOwnedRanksOnly(event.target.checked)}
							/>
							<span className="pt-toggle__mark">
								{ownedRanksOnly ? <CheckMarkChecked /> : <CheckMarkEmpty />}
							</span>
							<span className="pt-toggle__text">
								Only the ranks a character owns
								<span className="pt-toggle__note">
									A talent card prints the whole ladder. Switch this on to cut
									each one to the rank its character has bought.
								</span>
							</span>
						</label>
					</div>
					<div className="pt-section">
						<div className="pt-count">
							{deckEntries.length === 1
								? '1 card'
								: `${deckEntries.length} cards`}{' '}
							selected
							{continuations > 0 && (
								<>
									{' '}
									→ {printedCards.length} printed (
									{continuations === 1
										? '1 continuation'
										: `${continuations} continuations`}
									)
								</>
							)}
							{deckEntries.length > 0 && (
								<> · {sheetCount === 1 ? '1 sheet' : `${sheetCount} sheets`}</>
							)}
							{/* Never a silent drop: a quarter of someone's abilities
							    vanishing is how a player concludes the tool is broken (D8). */}
							{skippedCombatArts > 0 && (
								<div>
									{skippedCombatArts === 1
										? '1 combat art skipped'
										: `${skippedCombatArts} combat arts skipped`}{' '}
									— print them from the Combat Arts tool.
								</div>
							)}
							{oversize.length > 0 && (
								<div className="pt-count__warning">
									{oversize.length} entr{oversize.length === 1 ? 'y' : 'ies'}{' '}
									will not fit on a card even split — the rules text is over
									budget.
								</div>
							)}
						</div>
						<button
							type="button"
							className="pt-print-verb"
							onClick={handlePrint}
							disabled={deckEntries.length === 0 || settlingCards > 0}
						>
							{settlingCards > 0 ? 'Fitting cards…' : 'Print'}
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
						empty={
							<p className="pt-empty">
								Load a character or pick talents and folk in the controls panel
								to preview their cards here.
							</p>
						}
					>
						{printedCards.map(({ entry, body, planKey, part }) => {
							const onFitted = (result: FitResult) =>
								spillPlan.report(planKey, part.start, result)
							const shared = {
								start: part.start,
								end: part.end,
								part: part.part,
								totalParts: part.totalParts,
								onFitted,
							}
							return (
								<div
									key={`${planKey}#${part.part}`}
									title={
										entry.characterName
											? `For character: ${entry.characterName}`
											: undefined
									}
								>
									{entry.group === 'Talent' && (
										<TalentPrintCard
											name={entry.title}
											description={body}
											skill={entry.category}
											{...shared}
										/>
									)}
									{entry.group === 'Folk' && (
										<FolkPrintCard
											name={entry.title}
											abilities={entry.abilities ?? []}
											languages={entry.languages}
											{...shared}
										/>
									)}
									{entry.group === 'Other' && (
										<AbilityPrintCard
											name={entry.title}
											description={body}
											actionType={entry.actionType}
											skill={entry.category}
											{...shared}
										/>
									)}
								</div>
							)
						})}
					</PrintPages>
				</div>
			}
		/>
	)
}
