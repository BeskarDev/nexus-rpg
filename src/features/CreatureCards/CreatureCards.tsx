import {
	Button,
	Checkbox,
	Divider,
	FormControl,
	InputLabel,
	ListItemText,
	MenuItem,
	OutlinedInput,
	Select,
	SelectChangeEvent,
	Stack,
	TextField,
	Typography,
	useTheme,
} from '@mui/material'
import { theme } from '@site/src/hooks/createTheme'
import { Creature, Attack, Ability } from '@site/src/types/Creature'
import { Character, CharacterDocument } from '@site/src/types/Character'
import React, { useMemo, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import './creatureCardsStyles.css'
import { CreatureCompactCard } from './CreatureCompactCard'
import { CreatureDetailCard } from './CreatureDetailCard'
import { parseCreatureMarkdown } from './parseCreatureMarkdown'
import { ThemeSwitcher } from '@site/src/components/ThemeSwitcher'
import { CharacterSelector } from '../PrintingTools'

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

// Determine how many cards a creature needs and what type
const getCreatureCardStrategy = (
	creature: Creature,
): 'single' | 'double' | 'triple' => {
	const totalAbilities = creature.abilities.length
	const totalAttacks = creature.attacks.length

	// Calculate actual content lengths for more accurate assessment
	const abilityContentLength = getContentLength(creature.abilities)
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
	const muiTheme = useTheme()
	const [markdownInput, setMarkdownInput] = useState<string>('')
	const [creatures, setCreatures] = useState<Creature[]>([])
	const [selectedCreatures, setSelectedCreatures] = useState<string[]>([])
	const [error, setError] = useState<string>('')
	const [characterJsonString, setCharacterJsonString] =
		React.useState<string>('')
	const [selectedCharacter, setSelectedCharacter] =
		React.useState<CharacterDocument | null>(null)

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
				if (creature.abilities.length > 0) {
					const abilityChunks = splitAbilities(creature.abilities)
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

				if (creature.abilities.length > 0) {
					const abilityChunks = splitAbilities(creature.abilities)
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
				{
					'\
        @page { size: 192mm 267mm; }\
      '
				}
			</style>
			<Stack
				gap={2}
				sx={{
					mb: 2,
					py: 2,
					px: 3,
					backgroundColor:
						muiTheme.palette.mode === 'dark' ? '#1e1e1e' : 'white',
					borderRadius: '8px',
				}}
			>
				<Typography variant="h6" component="h2">
					Creature Card Printing
				</Typography>
				<Typography variant="body2" color="text.secondary">
					Select a character to load their companions, upload a markdown file, or
					manually paste creature stat blocks to print cards.
				</Typography>

				<Divider sx={{ my: 1 }} />

				<CharacterSelector
					onCharacterSelect={handleCharacterSelect}
					label="Load Character's Companions"
					helperText="Selecting a character will automatically add their companions to the print list below."
				/>

				<Divider sx={{ my: 1 }} />

				{/* File Upload */}
				<Stack flexDirection="row" gap={2} alignItems="center">
					<input
						accept=".md,.txt"
						style={{ display: 'none' }}
						id="markdown-file-upload"
						type="file"
						onChange={handleFileUpload}
					/>
					<label htmlFor="markdown-file-upload">
						<Button variant="outlined" component="span">
							Upload Markdown File
						</Button>
					</label>
					<Button
						variant="contained"
						onClick={handleParseMarkdown}
						disabled={!markdownInput.trim()}
					>
						Parse Creatures
					</Button>
				</Stack>

				{/* Markdown Input */}
				<TextField
					multiline
					rows={6}
					label="Creature Markdown"
					value={markdownInput}
					onChange={handleMarkdownChange}
					placeholder="Paste your creature markdown here or upload a file..."
					sx={{
						backgroundColor:
							muiTheme.palette.mode === 'dark' ? '#2a2a2a' : 'white',
					}}
				/>

				{error && (
					<Typography color="error" variant="body2">
						{error}
					</Typography>
				)}

				<Divider sx={{ my: 1 }} />

				<TextField
					multiline
					minRows={3}
					maxRows={5}
					fullWidth
					label="Alternative: Import Character as JSON"
					value={characterJsonString}
					onChange={(event) => handleCharacterUpload(event.target.value)}
					placeholder="Paste character JSON here to automatically load their companions..."
					helperText="You can also paste a character's exported JSON data here as an alternative to selecting a character above."
				/>

				{/* Creature Selection */}
				{creatures.length > 0 && (
					<Stack flexDirection="row" gap={1} alignItems="center">
						<Button variant="contained" size="large" onClick={handlePrint}>
							PRINT
						</Button>
						<FormControl sx={{ minWidth: 300 }}>
							<InputLabel>Creatures</InputLabel>
							<Select
								multiple
								value={selectedCreatures}
								onChange={handleCreatureSelectionChange}
								input={<OutlinedInput label="Creatures" />}
								renderValue={(selected) => selected.join(', ')}
								MenuProps={MenuProps}
								sx={{
									backgroundColor:
										muiTheme.palette.mode === 'dark' ? '#2a2a2a' : 'white',
								}}
							>
								{creatures.map(({ name }) => (
									<MenuItem key={name} value={name}>
										<Checkbox checked={selectedCreatures.indexOf(name) > -1} />
										<ListItemText primary={name} />
									</MenuItem>
								))}
							</Select>
						</FormControl>
						<Button variant="outlined" size="small" onClick={selectAll}>
							Select all
						</Button>
						<Button variant="outlined" size="small" onClick={deselectAll}>
							Deselect all
						</Button>
					</Stack>
				)}

				{/* Card Layout Info */}
				{creatures.length > 0 && (
					<Typography variant="body2" color="text.secondary">
						{
							filteredCreatures.filter(
								(c) => getCreatureCardStrategy(c) === 'single',
							).length
						}{' '}
						single cards,{' '}
						{
							filteredCreatures.filter(
								(c) => getCreatureCardStrategy(c) === 'double',
							).length
						}{' '}
						double cards,{' '}
						{
							filteredCreatures.filter(
								(c) => getCreatureCardStrategy(c) === 'triple',
							).length
						}{' '}
						triple cards.
					</Typography>
				)}
			</Stack>

			<Typography variant="subtitle1">
				{allCards.length} cards will be printed:
			</Typography>

			<div className="creature-cards--container" ref={componentRef}>
				{allCards.map((card, index) => (
					<React.Fragment key={index}>
						{card}
						{Boolean(index % 9 === 8) && <div className="page-break" />}
					</React.Fragment>
				))}
				{!allCards.length && (
					<Typography variant="body2">
						Upload and parse a markdown file with creature stat blocks to begin.
					</Typography>
				)}
			</div>
		</>
	)
}
