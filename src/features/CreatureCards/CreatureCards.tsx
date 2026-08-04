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
import { Character, CharacterDocument } from '@site/src/types/Character'
import { Ability, Attack, Creature } from '@site/src/types/Creature'
import React, { useMemo, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import { CharacterSelector, PrintToolShell } from '../PrintingTools'
import './creatureCardsStyles.css'
import { CreatureCompactCard } from './CreatureCompactCard'
import { CreatureDetailCard } from './CreatureDetailCard'
import { parseCreatureMarkdown } from './parseCreatureMarkdown'

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

/**
 * The ability list for the multi-card (detail) layouts: real abilities followed by
 * the creature's quick actions.
 *
 * Quick actions used to arrive already merged into `abilities` because the markdown
 * parser's abilities section ran greedily to the end of the block. Now that they
 * are parsed as their own list, the detail layouts have to re-merge them or they
 * would silently vanish from printed multi-card creatures — and the layout
 * strategy would under-count content and pick too few cards.
 *
 * Tagging each with `recharge: 'Quick Action'` is enough to label them: both
 * `DetailCardContent` and `CreatureAbilityCard` already render that field in
 * parentheses after the name, so they are no longer indistinguishable from
 * passives the way the old merge left them.
 */
const detailAbilities = (creature: Creature): Ability[] => [
	...creature.abilities,
	...creature.quickActions.map((quickAction) => ({
		...quickAction,
		recharge: quickAction.recharge ?? 'Quick Action',
	})),
]

// Determine how many cards a creature needs and what type
const getCreatureCardStrategy = (
	creature: Creature,
): 'single' | 'double' | 'triple' => {
	const abilitiesForLayout = detailAbilities(creature)
	const totalAbilities = abilitiesForLayout.length
	const totalAttacks = creature.attacks.length

	// Calculate actual content lengths for more accurate assessment
	const abilityContentLength = getContentLength(abilitiesForLayout)
	const attackContentLength = getAttackContentLength(creature.attacks)
	const statsLength =
		creature.skills.join(' ').length +
		creature.immunities.join(' ').length +
		creature.resistances.join(' ').length +
		creature.weaknesses.join(' ').length

	// Single card: Can fit everything with moderate font scaling
	// More conservative to prevent clipping
	const totalContentForSingle =
		statsLength + attackContentLength + abilityContentLength
	if (
		totalAbilities <= 3 &&
		totalAttacks <= 2 &&
		totalContentForSingle <= 700
	) {
		return 'single'
	}

	// Double card: Stats + attacks on first card, abilities on second
	// With improved font scaling, we can allow more content on stats+attacks card
	const firstCardContent = statsLength + attackContentLength
	if (firstCardContent <= 600) {
		return 'double'
	}

	// Triple card: Stats only, attacks separate, abilities separate
	return 'triple'
}

// Estimate content length with better accuracy for rendered height
const getContentLength = (abilities: Ability[]): number => {
	return abilities.reduce((total, ability) => {
		const nameLength = ability.name.length
		const rechargeLength = ability.recharge ? ability.recharge.length : 0
		const descriptionLength = ability.description.length

		// More accurate overhead accounting for actual line wrapping and spacing
		// Each ability has: name line, description (potentially wrapped), margin
		const baseOverhead = 20 // Account for formatting, line breaks, margins
		const wrappingFactor = Math.ceil(descriptionLength / 50) * 5 // Estimate line wrapping

		return (
			total +
			nameLength +
			rechargeLength +
			descriptionLength +
			baseOverhead +
			wrappingFactor
		)
	}, 0)
}

const getAttackContentLength = (attacks: Attack[]): number => {
	return attacks.reduce((total, attack) => {
		const nameLength = attack.name.length
		const propertiesLength =
			attack.properties.length > 0 ? attack.properties.join(', ').length : 0
		const damageLength = attack.damage.length
		const descriptionLength = attack.description ? attack.description.length : 0

		// More accurate overhead accounting for actual line wrapping and spacing
		// Attacks often have more complex formatting with properties and descriptions
		const baseOverhead = attack.description ? 25 : 15
		const wrappingFactor = attack.description
			? Math.ceil(attack.description.length / 45) * 6
			: 0

		return (
			total +
			nameLength +
			propertiesLength +
			damageLength +
			descriptionLength +
			baseOverhead +
			wrappingFactor
		)
	}, 0)
}

// Split abilities into chunks with balanced approach - scale font first, then split
const splitAbilities = (abilities: Ability[]): Ability[][] => {
	if (abilities.length === 0) return []

	// Check if all abilities can fit using content measurement
	// Slightly more conservative to prevent clipping
	const totalContentLength = getContentLength(abilities)

	// Middle ground: Allow good amount of content but split before clipping
	if (totalContentLength <= 1200) {
		return [abilities] // No splitting needed - font scaling can handle this
	}

	// If splitting is needed, create chunks that are readable at smaller font sizes
	const chunks: Ability[][] = []
	let currentChunk: Ability[] = []
	let currentChunkLength = 0

	for (const ability of abilities) {
		const abilityLength = getContentLength([ability])

		// Split when chunk would cause clipping even with font scaling
		if (currentChunkLength + abilityLength > 1000 && currentChunk.length > 0) {
			chunks.push(currentChunk)
			currentChunk = [ability]
			currentChunkLength = abilityLength
		} else {
			currentChunk.push(ability)
			currentChunkLength += abilityLength
		}
	}

	// Add the last chunk if it has any abilities
	if (currentChunk.length > 0) {
		chunks.push(currentChunk)
	}

	return chunks
}

// Split attacks into chunks with balanced approach - scale font first, then split
const splitAttacks = (attacks: Attack[]): Attack[][] => {
	if (attacks.length === 0) return []

	// Check if all attacks can fit using content measurement
	// Slightly more conservative to prevent clipping
	const totalContentLength = getAttackContentLength(attacks)

	// Middle ground: Allow good amount of content but split before clipping
	if (totalContentLength <= 900) {
		return [attacks] // No splitting needed - font scaling can handle this
	}

	// If splitting is needed, create chunks that are readable at smaller font sizes
	const chunks: Attack[][] = []
	let currentChunk: Attack[] = []
	let currentChunkLength = 0

	for (const attack of attacks) {
		const attackLength = getAttackContentLength([attack])

		// Split when chunk would cause clipping even with font scaling
		if (currentChunkLength + attackLength > 700 && currentChunk.length > 0) {
			chunks.push(currentChunk)
			currentChunk = [attack]
			currentChunkLength = attackLength
		} else {
			currentChunk.push(attack)
			currentChunkLength += attackLength
		}
	}

	// Add the last chunk if it has any attacks
	if (currentChunk.length > 0) {
		chunks.push(currentChunk)
	}

	return chunks
}

export const CreatureCards: React.FC = () => {
	const [markdownInput, setMarkdownInput] = useState<string>('')
	const [creatures, setCreatures] = useState<Creature[]>([])
	const [selectedCreatures, setSelectedCreatures] = useState<string[]>([])
	const [error, setError] = useState<string>('')
	const [characterJsonString, setCharacterJsonString] =
		React.useState<string>('')
	const [selectedCharacter, setSelectedCharacter] =
		React.useState<CharacterDocument | null>(null)
	const [showJsonImport, setShowJsonImport] = useState(false)
	const [showMarkdownPaste, setShowMarkdownPaste] = useState(false)

	const handleMarkdownChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setMarkdownInput(event.target.value)
	}

	const handleCharacterSelect = (character: CharacterDocument | null) => {
		setSelectedCharacter(character)
		if (character && character.companions && character.companions.length > 0) {
			// Companions have markdown field - parse that directly
			const companionMarkdown = character.companions
				.map((companion) => companion.markdown)
				.filter((md) => md && md.trim())
				.join('\n\n')

			if (companionMarkdown) {
				try {
					const parsedCreatures = parseCreatureMarkdown(companionMarkdown)
					setCreatures((prev) => {
						const existingNames = new Set(prev.map((c) => c.name))
						const newCreatures = parsedCreatures.filter(
							(c) => !existingNames.has(c.name),
						)
						return [...prev, ...newCreatures]
					})
					setSelectedCreatures((prev) => {
						const existingNames = new Set(prev)
						parsedCreatures.forEach((c) => existingNames.add(c.name))
						return Array.from(existingNames)
					})
					setError('')
				} catch (err) {
					console.error('Failed to parse companion:', err)
					setError('Failed to parse companion data. Please check the format.')
				}
			}
		}
	}

	const handleCharacterUpload = (jsonString: string) => {
		setCharacterJsonString(jsonString)
		try {
			if (jsonString.trim()) {
				const character: Character = JSON.parse(jsonString)
				if (character.companions && character.companions.length > 0) {
					const companionMarkdown = character.companions
						.map((companion) => companion.markdown)
						.filter((md) => md && md.trim())
						.join('\n\n')

					if (companionMarkdown) {
						const parsedCreatures = parseCreatureMarkdown(companionMarkdown)
						setCreatures((prev) => {
							const existingNames = new Set(prev.map((c) => c.name))
							const newCreatures = parsedCreatures.filter(
								(c) => !existingNames.has(c.name),
							)
							return [...prev, ...newCreatures]
						})
						setSelectedCreatures((prev) => {
							const existingNames = new Set(prev)
							parsedCreatures.forEach((c) => existingNames.add(c.name))
							return Array.from(existingNames)
						})
					}
				}
			}
		} catch (error) {
			console.error('Failed to parse character JSON:', error)
			setError('Failed to parse character data. Please check the JSON format.')
		}
	}

	const handleParseMarkdown = () => {
		try {
			const parsedCreatures = parseCreatureMarkdown(markdownInput)
			setCreatures(parsedCreatures)
			setSelectedCreatures(parsedCreatures.map((c) => c.name))
			setError('')
			console.warn('Successfully parsed creatures:', parsedCreatures)
		} catch (err) {
			const errorMessage = `Failed to parse markdown: ${err.message}`
			setError(errorMessage)
			setCreatures([])
			setSelectedCreatures([])
			console.error('Parse error:', err)
		}
	}

	const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if (file) {
			const reader = new FileReader()
			reader.onload = (e) => {
				const content = e.target?.result as string
				setMarkdownInput(content)
			}
			reader.readAsText(file)
		}
	}

	const handleCreatureSelectionChange = (
		event: SelectChangeEvent<typeof selectedCreatures>,
	) => {
		const {
			target: { value },
		} = event
		setSelectedCreatures(typeof value === 'string' ? value.split(',') : value)
	}

	const componentRef = useRef()
	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	})

	const filteredCreatures = useMemo(
		() =>
			creatures.filter((creature) => selectedCreatures.includes(creature.name)),
		[creatures, selectedCreatures],
	)

	const selectAll = () =>
		setSelectedCreatures(creatures.map((creature) => creature.name))
	const deselectAll = () => setSelectedCreatures([])

	// Generate cards with dynamic layout based on complexity
	const allCards = useMemo(() => {
		const cards: JSX.Element[] = []

		filteredCreatures.forEach((creature) => {
			const strategy = getCreatureCardStrategy(creature)

			if (strategy === 'single') {
				// Single card with all content
				cards.push(
					<CreatureCompactCard key={`${creature.name}-single`} {...creature} />,
				)
			} else if (strategy === 'double') {
				// Two cards: stats + attacks on first, abilities on second
				cards.push(
					<CreatureCompactCard
						key={`${creature.name}-main`}
						{...creature}
						abilities={[]} // No abilities on main card for double strategy
					/>,
				)

				// Always create abilities card(s) for double strategy
				if (detailAbilities(creature).length > 0) {
					const abilityChunks = splitAbilities(detailAbilities(creature))
					abilityChunks.forEach((abilityChunk, chunkIndex) => {
						cards.push(
							<CreatureDetailCard
								key={`${creature.name}-abilities-${chunkIndex}`}
								creatureName={creature.name}
								tier={creature.tier}
								cardType="abilities"
								abilities={abilityChunk}
								partNumber={
									abilityChunks.length > 1 ? chunkIndex + 1 : undefined
								}
								totalParts={
									abilityChunks.length > 1 ? abilityChunks.length : undefined
								}
							/>,
						)
					})
				}
			} else {
				// Triple cards: stats only, attacks separate, abilities separate
				cards.push(
					<CreatureCompactCard
						key={`${creature.name}-stats`}
						{...creature}
						attacks={[]} // Stats only - no attacks or abilities
						abilities={[]}
					/>,
				)

				if (creature.attacks.length > 0) {
					const attackChunks = splitAttacks(creature.attacks)
					attackChunks.forEach((attackChunk, chunkIndex) => {
						cards.push(
							<CreatureDetailCard
								key={`${creature.name}-attacks-${chunkIndex}`}
								creatureName={creature.name}
								tier={creature.tier}
								cardType="attacks"
								attacks={attackChunk}
								partNumber={
									attackChunks.length > 1 ? chunkIndex + 1 : undefined
								}
								totalParts={
									attackChunks.length > 1 ? attackChunks.length : undefined
								}
							/>,
						)
					})
				}

				if (detailAbilities(creature).length > 0) {
					const abilityChunks = splitAbilities(detailAbilities(creature))
					abilityChunks.forEach((abilityChunk, chunkIndex) => {
						cards.push(
							<CreatureDetailCard
								key={`${creature.name}-abilities-${chunkIndex}`}
								creatureName={creature.name}
								tier={creature.tier}
								cardType="abilities"
								abilities={abilityChunk}
								partNumber={
									abilityChunks.length > 1 ? chunkIndex + 1 : undefined
								}
								totalParts={
									abilityChunks.length > 1 ? abilityChunks.length : undefined
								}
							/>,
						)
					})
				}
			}
		})

		return cards
	}, [filteredCreatures])

	return (
		<>
			<style type="text/css" media="print">
				{'@page { size: 192mm 267mm; }'}
			</style>
			<PrintToolShell
				controlsLabel="Select Creatures"
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
									label="Load character's companions"
									helperText="Adds the character's companion creatures to the list."
								/>
								<button
									type="button"
									className={`pt-import-toggle${showMarkdownPaste ? ' is-open' : ''}`}
									onClick={() => setShowMarkdownPaste(!showMarkdownPaste)}
									aria-expanded={showMarkdownPaste}
								>
									<span className="pt-import-toggle__caret" aria-hidden="true" />
									Paste creature markdown
								</button>
								<div className={`pt-import-body${showMarkdownPaste ? "" : " is-hidden"}`}>
									<textarea
										value={markdownInput}
										onChange={(e) => setMarkdownInput(e.target.value)}
										placeholder="Paste creature stat block markdown here…"
										aria-label="Creature markdown input"
									/>
									<div className="pt-select-row" style={{ marginTop: '0.35rem' }}>
										<button
											type="button"
											className="pt-verb-quiet"
											onClick={handleParseMarkdown}
											disabled={!markdownInput.trim()}
										>
											Parse creatures
										</button>
										<label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', cursor: 'pointer' }}>
											<input
												type="file"
												accept=".md,.txt"
												style={{ display: 'none' }}
												onChange={handleFileUpload}
											/>
											<span className="pt-verb-quiet">Upload file</span>
										</label>
									</div>
									{error && (
										<p style={{ color: 'var(--ifm-color-danger)', fontSize: 'var(--nexus-text-xs)', margin: '0.25rem 0 0' }}>
											{error}
										</p>
									)}
								</div>
								<button
									type="button"
									className={`pt-import-toggle${showJsonImport ? ' is-open' : ''}`}
									onClick={() => setShowJsonImport(!showJsonImport)}
									aria-expanded={showJsonImport}
								>
									<span className="pt-import-toggle__caret" aria-hidden="true" />
									Import character as JSON
								</button>
								<div className={`pt-import-body${showJsonImport ? "" : " is-hidden"}`}>
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
						{creatures.length > 0 && (
							<div className="pt-section">
								<div className="pt-section__head">
									<span className="pt-section__step">II</span>
									<span className="pt-section__label">Selection</span>
								</div>
								<FormControl size="small" fullWidth>
									<InputLabel>Creatures</InputLabel>
									<Select
										multiple
										value={selectedCreatures}
										onChange={handleCreatureSelectionChange}
										input={<OutlinedInput label="Creatures" />}
										renderValue={(selected) => `${selected.length} selected`}
										MenuProps={MenuProps}
									>
										{creatures.map(({ name }) => (
											<MenuItem key={name} value={name}>
												<Checkbox checked={selectedCreatures.indexOf(name) > -1} />
												<ListItemText primary={name} />
											</MenuItem>
										))}
									</Select>
								</FormControl>
								<div className="pt-select-row">
									<button type="button" className="pt-verb-quiet" onClick={selectAll}>Select all</button>
									<button type="button" className="pt-verb-quiet" onClick={deselectAll}>Deselect all</button>
								</div>
							</div>
						)}
						<div className="pt-section">
							<div className="pt-count">
								{allCards.length > 0 ? (
									<>
										<strong>{allCards.length}</strong>{' '}
										{allCards.length === 1 ? 'card' : 'cards'} selected
										{' '}·{' '}
										<strong>{Math.ceil(allCards.length / 9)}</strong>{' '}
										{Math.ceil(allCards.length / 9) === 1 ? 'sheet' : 'sheets'}
									</>
								) : (
									'No creatures selected'
								)}
							</div>
							<button
								type="button"
								className="pt-print-verb"
								onClick={handlePrint}
								disabled={allCards.length === 0}
							>
								Print
							</button>
						</div>
					</>
				}
				preview={
					<div className="creature-cards--container" ref={componentRef}>
						{allCards.map((card, index) => (
							<React.Fragment key={index}>
								{card}
								{Boolean(index % 9 === 8) && <div className="page-break" />}
							</React.Fragment>
						))}
						{!allCards.length && (
							<p className="pt-empty">
								Load creatures in the controls panel to preview cards here.
							</p>
						)}
					</div>
				}
			/>
		</>
	)
}
