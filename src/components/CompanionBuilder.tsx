import React, { useState } from 'react'
import {
	Box,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Typography,
	Paper,
	Divider,
	Grid,
	Tabs,
	Tab,
	SelectChangeEvent,
} from '@mui/material'
import companionTraits from '../utils/json/companion-traits.json'

interface CompanionTrait {
	name: string
	type: string
	size: string
	hp: string
	av: string
	strength: string
	agility: string
	spirit: string
	mind: string
	parry: string
	dodge: string
	resist: string
	skills: string
	immunities: string
	resistances: string
	weaknesses: string
	'attack 1': string
	'attack 2': string
	'ability 1': string
	'ability 2': string
	'ability 3': string
}

// Base companion statistics by tier
const BASE_STATS: Record<number, any> = {
	0: {
		maxSize: 'Tiny',
		hp: 5,
		av: 1,
		attributes: { str: 'd4', agi: 'd6', spi: 'd4', mnd: 'd4-2' },
		defenses: { parry: 7, dodge: 7, resist: 7 },
		skillRank: 0,
		attackDamage: { weak: 3, normal: 4, strong: 5 },
	},
	1: {
		maxSize: 'Small',
		hp: 10,
		av: 2,
		attributes: { str: 'd6', agi: 'd6', spi: 'd6', mnd: 'd4-2' },
		defenses: { parry: 8, dodge: 8, resist: 8 },
		skillRank: 1,
		attackDamage: { weak: 5, normal: 7, strong: 9 },
	},
	2: {
		maxSize: 'Medium',
		hp: 20,
		av: 3,
		attributes: { str: 'd8', agi: 'd8', spi: 'd6', mnd: 'd4-1' },
		defenses: { parry: 9, dodge: 9, resist: 9 },
		skillRank: 2,
		attackDamage: { weak: 7, normal: 10, strong: 13 },
	},
	3: {
		maxSize: 'Large',
		hp: 30,
		av: 4,
		attributes: { str: 'd10', agi: 'd10', spi: 'd8', mnd: 'd4-1' },
		defenses: { parry: 10, dodge: 10, resist: 10 },
		skillRank: 3,
		attackDamage: { weak: 9, normal: 13, strong: 17 },
	},
	4: {
		maxSize: 'Large',
		hp: 40,
		av: 5,
		attributes: { str: 'd12', agi: 'd10', spi: 'd8', mnd: 'd4' },
		defenses: { parry: 11, dodge: 11, resist: 11 },
		skillRank: 4,
		attackDamage: { weak: 11, normal: 16, strong: 21 },
	},
	5: {
		maxSize: 'Huge',
		hp: 50,
		av: 6,
		attributes: { str: 'd12+1', agi: 'd12', spi: 'd8', mnd: 'd6' },
		defenses: { parry: 12, dodge: 12, resist: 12 },
		skillRank: 5,
		attackDamage: { weak: 13, normal: 19, strong: 25 },
	},
}

const SIZE_MODIFIERS: Record<
	string,
	{ parry: number; dodge: number; movement: number }
> = {
	Tiny: { parry: -2, dodge: 2, movement: 1 },
	Small: { parry: -1, dodge: 1, movement: 1 },
	Medium: { parry: 0, dodge: 0, movement: 1 },
	Large: { parry: 1, dodge: -1, movement: 2 },
	Huge: { parry: 2, dodge: -2, movement: 3 },
}

const TIER_NAMES: Record<number, string> = {
	0: 'Harmless',
	1: 'Capable',
	2: 'Dangerous',
	3: 'Ferocious',
	4: 'Monstrous',
	5: 'Primeval',
}

interface CompanionStats {
	tier: number
	size: string
	trait: CompanionTrait
	calculatedStats: any
}

interface TabPanelProps {
	children?: React.ReactNode
	index: number
	value: number
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`companion-tabpanel-${index}`}
			aria-labelledby={`companion-tab-${index}`}
			{...other}
		>
			{value === index && <Box sx={{ p: { xs: 1.5, sm: 3 } }}>{children}</Box>}
		</div>
	)
}

export const CompanionBuilder: React.FC = () => {
	const [open, setOpen] = useState(false)
	const [selectedTier, setSelectedTier] = useState<number>(0)
	const [selectedSize, setSelectedSize] = useState<string>('')
	const [selectedTrait, setSelectedTrait] = useState<CompanionTrait | null>(
		null,
	)
	const [builtCompanion, setBuiltCompanion] = useState<CompanionStats | null>(
		null,
	)
	const [activeTab, setActiveTab] = useState(0)

	const getAvailableSizes = (tier: number) => {
		const maxSize = BASE_STATS[tier].maxSize
		const sizes = ['Tiny', 'Small', 'Medium', 'Large', 'Huge']
		const maxIndex = sizes.indexOf(maxSize)
		return sizes.slice(0, maxIndex + 1)
	}

	const modifyDie = (baseDie: string, modifier: string): string => {
		if (modifier === '-') return baseDie

		const diceOrder = [
			'd4-2',
			'd4-1',
			'd4',
			'd6',
			'd8',
			'd10',
			'd12',
			'd12+1',
			'd12+2',
		]
		const baseIndex = diceOrder.indexOf(baseDie)
		const modValue = parseInt(modifier)

		if (isNaN(modValue)) return baseDie

		const newIndex = Math.max(
			0,
			Math.min(diceOrder.length - 1, baseIndex + modValue),
		)
		return diceOrder[newIndex]
	}

	const applyModifier = (base: number, modifier: string): number => {
		if (modifier === '-') return base
		const modValue = parseInt(modifier)
		return isNaN(modValue) ? base : base + modValue
	}

	const parseAV = (avValue: string): { value: number; type: string } => {
		if (avValue === '-') return { value: 0, type: 'light' }

		const match = avValue.match(/^(\+?)(\d+)\s*\((\w+)\)/)
		if (match) {
			return { value: parseInt(match[2]), type: match[3] }
		}

		const numMatch = avValue.match(/^(\+?)(\d+)/)
		if (numMatch) {
			return { value: parseInt(numMatch[2]), type: 'light' }
		}

		return { value: 0, type: 'light' }
	}

	const parseAttackDamage = (
		attackText: string,
		baseAttackDamage: { weak: number; normal: number; strong: number },
		tier: number,
	): string => {
		if (!attackText || attackText === '-') return ''

		// Parse damage modifiers
		let weaponDamageModifier = 0 // 0 = normal, -1 = reduced, +1 = increased
		let useDamageCalculation = true

		if (attackText.includes('Deals normal weapon damage')) {
			weaponDamageModifier = 0
		} else if (attackText.includes('Deals -1 weapon damage')) {
			weaponDamageModifier = -1
		} else if (attackText.includes('Deals +1 weapon damage')) {
			weaponDamageModifier = 1
		} else if (attackText.includes('Deals no damage')) {
			useDamageCalculation = false
		} else {
			useDamageCalculation = false // Don't calculate if no clear damage pattern
		}

		let processedText = attackText

		if (useDamageCalculation) {
			// Calculate damage values
			const weaponDamage = baseAttackDamage.normal - baseAttackDamage.weak
			const baseDamage = baseAttackDamage.weak - weaponDamage
			const modifiedWeaponDamage = Math.max(
				1,
				weaponDamage + weaponDamageModifier,
			)

			const weakDamage = Math.max(1, baseDamage + modifiedWeaponDamage)
			const strongDamage = Math.max(1, baseDamage + 2 * modifiedWeaponDamage)
			const criticalDamage = Math.max(1, baseDamage + 3 * modifiedWeaponDamage)

			// Remove the original damage text and related patterns
			processedText = processedText
				.replace(/Deals .*?weapon damage.*?\./g, '')
				.trim()
			processedText = processedText.replace(/\(min\.\s*\d+\)/g, '').trim()

			// Add the calculated damage after the properties
			const damageText = ` ${weakDamage}/${strongDamage}/${criticalDamage} damage (${baseDamage} base + ${modifiedWeaponDamage} weapon).`

			// Insert damage text after the attack name and properties
			const propertiesMatch = processedText.match(
				/(<strong>.*?<\/strong>)\s*(\(<em>.*?<\/em>\))/,
			)
			if (propertiesMatch) {
				processedText = processedText.replace(
					/(<strong>.*?<\/strong>)\s*(\(<em>.*?<\/em>\))/,
					`$1 $2.${damageText}`,
				)
			} else {
				processedText = processedText.replace(
					/(<strong>.*?<\/strong>)/,
					`$1.${damageText}`,
				)
			}
		}

		// Evaluate "x Tier" expressions
		processedText = processedText.replace(
			/(\d+)\s*x\s*Tier/gi,
			(match, multiplier) => {
				return String(parseInt(multiplier) * tier)
			},
		)

		// Clean up remaining artifacts from damage text removal - be more specific
		processedText = processedText.replace(/\(min\.\s*\d+\)/g, '') // Remove any remaining (min. X) patterns
		processedText = processedText.replace(/\s+\d+\)\./g, '') // Remove patterns like " 1)." but not regular ")."

		// Clean up extra periods and spaces
		processedText = processedText.replace(/\.\s*\./g, '.')
		processedText = processedText.replace(/\s+/g, ' ')
		processedText = processedText.trim()

		return processedText
	}

	const formatSkillsWithRanks = (
		skillsText: string,
		baseSkillRank: number,
	): string => {
		if (!skillsText || skillsText === '-') return skillsText

		// Split skills by comma and process each one
		const skills = skillsText.split(',').map((skill) => {
			let trimmedSkill = skill.trim()
			let skillRank = baseSkillRank

			// Check for (-1) modifier and apply it
			if (trimmedSkill.includes('(-1)')) {
				skillRank = Math.max(0, baseSkillRank - 1)
				trimmedSkill = trimmedSkill.replace(/\s*\(-1\)/g, '')
			}

			// Add the skill rank in parentheses
			return `${trimmedSkill} (${skillRank})`
		})

		return skills.join(', ')
	}

	const calculateStats = (
		tier: number,
		size: string,
		trait: CompanionTrait,
	) => {
		const baseStats = BASE_STATS[tier]
		const sizeModifier = SIZE_MODIFIERS[size]

		// Calculate HP
		let hp = baseStats.hp
		if (trait.hp !== '-') {
			hp += parseInt(trait.hp) || 0
		}

		// Calculate AV
		let av = baseStats.av
		let avType = 'natural light'
		if (trait.av !== '-') {
			const traitAV = parseAV(trait.av)
			av += traitAV.value
			avType = `natural ${traitAV.type}`
		}

		// Calculate Attributes
		const attributes = {
			str: modifyDie(baseStats.attributes.str, trait.strength),
			agi: modifyDie(baseStats.attributes.agi, trait.agility),
			spi: modifyDie(baseStats.attributes.spi, trait.spirit),
			mnd: modifyDie(baseStats.attributes.mnd, trait.mind),
		}

		// Calculate Defenses
		const defenses = {
			parry:
				baseStats.defenses.parry +
				sizeModifier.parry +
				applyModifier(0, trait.parry),
			dodge:
				baseStats.defenses.dodge +
				sizeModifier.dodge +
				applyModifier(0, trait.dodge),
			resist: baseStats.defenses.resist + applyModifier(0, trait.resist),
		}

		return {
			hp,
			av: `${av} (${avType})`,
			attributes,
			defenses,
			attackDamage: baseStats.attackDamage,
			movement: sizeModifier.movement,
			skills: formatSkillsWithRanks(trait.skills, baseStats.skillRank),
			immunities: trait.immunities,
			resistances: trait.resistances,
			weaknesses: trait.weaknesses,
			attacks: [trait['attack 1'], trait['attack 2']]
				.filter((attack) => attack && attack !== '-')
				.map((attack) =>
					parseAttackDamage(attack, baseStats.attackDamage, tier),
				),
			abilities: [
				trait['ability 1'],
				trait['ability 2'],
				trait['ability 3'],
			].filter((ability) => ability && ability !== '-'),
		}
	}

	const buildCompanion = () => {
		if (!selectedTrait || !selectedSize) return

		const calculatedStats = calculateStats(
			selectedTier,
			selectedSize,
			selectedTrait,
		)
		const companion: CompanionStats = {
			tier: selectedTier,
			size: selectedSize,
			trait: selectedTrait,
			calculatedStats,
		}

		setBuiltCompanion(companion)
	}

	// Auto-build companion when all selections are made
	React.useEffect(() => {
		if (selectedTier !== undefined && selectedSize && selectedTrait) {
			buildCompanion()
		} else {
			setBuiltCompanion(null)
		}
	}, [selectedTier, selectedSize, selectedTrait])

	const convertHtmlToMarkdown = (text: string): string => {
		if (!text) return text

		return (
			text
				// Convert <strong> tags to **bold** and trim whitespace, ensure space after
				.replace(
					/<strong>(.*?)<\/strong>/g,
					(match, content) => `**${content.trim()}** `,
				)
				// Convert <em> tags to *italic* and trim whitespace
				.replace(/<em>(.*?)<\/em>/g, (match, content) => `*${content.trim()}*`)
				// Remove any remaining HTML tags (fallback)
				.replace(/<[^>]*>/g, '')
				// Clean up any double spaces that might have been created
				.replace(/\s+/g, ' ')
				.trim()
		)
	}

	const generateMarkdown = (companion: CompanionStats) => {
		const { trait, calculatedStats } = companion
		const tierName = TIER_NAMES[companion.tier]

		// Convert attacks and abilities to markdown format
		const markdownAttacks = calculatedStats.attacks
			.map((attack) => `- ${convertHtmlToMarkdown(attack)}`)
			.join('\n')
		const markdownAbilities = calculatedStats.abilities
			.map((ability) => `- ${convertHtmlToMarkdown(ability)}`)
			.join('\n')

		return `#### **${trait.name}** (${companion.size} ${trait.type})

**Tier:** ${companion.tier} (${tierName})

| HP | AV | STR | AGI | SPI | MND | Parry | Dodge | Resist |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ${calculatedStats.hp} | ${calculatedStats.av} | ${calculatedStats.attributes.str} | ${calculatedStats.attributes.agi} | ${calculatedStats.attributes.spi} | ${calculatedStats.attributes.mnd} | ${calculatedStats.defenses.parry} | ${calculatedStats.defenses.dodge} | ${calculatedStats.defenses.resist} |

**Skills:** ${calculatedStats.skills}

**Movement:** ${calculatedStats.movement}

**Immunities:** ${calculatedStats.immunities}
**Resistances:** ${calculatedStats.resistances}
**Weaknesses:** ${calculatedStats.weaknesses}

**Attacks:**
${markdownAttacks}

**Abilities:**
${markdownAbilities}`
	}

	const generateJSON = (companion: CompanionStats) => {
		return JSON.stringify(
			{
				name: companion.trait.name,
				type: companion.trait.type,
				tier: companion.tier,
				tierName: TIER_NAMES[companion.tier],
				size: companion.size,
				hp: companion.calculatedStats.hp,
				av: companion.calculatedStats.av,
				attributes: companion.calculatedStats.attributes,
				defenses: companion.calculatedStats.defenses,
				skills: companion.calculatedStats.skills,
				movement: companion.calculatedStats.movement,
				immunities: companion.calculatedStats.immunities,
				resistances: companion.calculatedStats.resistances,
				weaknesses: companion.calculatedStats.weaknesses,
				attacks: companion.calculatedStats.attacks,
				abilities: companion.calculatedStats.abilities,
				attackDamage: companion.calculatedStats.attackDamage,
			},
			null,
			2,
		)
	}

	const resetBuilder = () => {
		setSelectedTier(0)
		setSelectedSize('')
		setSelectedTrait(null)
		setActiveTab(0)
	}

	return (
		<>
			<Button
				variant="contained"
				color="primary"
				onClick={() => setOpen(true)}
				sx={{ mb: 2 }}
			>
				🐾 Open Companion Builder
			</Button>

			<Dialog
				open={open}
				onClose={() => setOpen(false)}
				maxWidth="lg"
				fullWidth
			>
				<DialogTitle>Companion Builder</DialogTitle>
				<DialogContent>
					<Box sx={{ mt: 2 }}>
						<Grid container columnSpacing={3} rowSpacing={1}>
							<Grid item xs={12} md={4}>
								<FormControl fullWidth sx={{ mb: { xs: 1, sm: 2 } }}>
									<InputLabel>Tier</InputLabel>
									<Select
										value={selectedTier}
										label="Tier"
										onChange={(e: SelectChangeEvent<number>) => {
											const newTier = e.target.value as number
											setSelectedTier(newTier)

											// Only reset size if it's not available in the new tier
											const availableSizes = getAvailableSizes(newTier)
											if (
												selectedSize &&
												!availableSizes.includes(selectedSize)
											) {
												setSelectedSize('')
											}
										}}
									>
										{Object.entries(TIER_NAMES).map(([tier, name]) => (
											<MenuItem key={tier} value={parseInt(tier)}>
												{tier} - {name}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Grid>

							<Grid item xs={12} md={4}>
								<FormControl fullWidth sx={{ mb: { xs: 1, sm: 2 } }}>
									<InputLabel>Size</InputLabel>
									<Select
										value={selectedSize}
										label="Size"
										onChange={(e: SelectChangeEvent<string>) => {
											setSelectedSize(e.target.value as string)
										}}
										disabled={selectedTier === undefined}
									>
										{getAvailableSizes(selectedTier).map((size) => (
											<MenuItem key={size} value={size}>
												{size}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Grid>

							<Grid item xs={12} md={4}>
								<FormControl fullWidth sx={{ mb: { xs: 1, sm: 2 } }}>
									<InputLabel>Trait</InputLabel>
									<Select
										value={selectedTrait?.name || ''}
										label="Trait"
										onChange={(e: SelectChangeEvent<string>) => {
											const trait = (companionTraits as CompanionTrait[]).find(
												(t) => t.name === e.target.value,
											)
											setSelectedTrait(trait || null)
										}}
										MenuProps={{
											PaperProps: {
												style: {
													maxHeight: 400,
												},
											},
										}}
									>
										{(companionTraits as CompanionTrait[]).map((trait) => (
											<MenuItem key={trait.name} value={trait.name}>
												{trait.name} ({trait.type})
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Grid>
						</Grid>

						{builtCompanion && (
							<Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
								<Button variant="outlined" size="small" onClick={resetBuilder}>
									Reset All
								</Button>
							</Box>
						)}

						{builtCompanion && (
							<Paper sx={{ mt: 3, p: { xs: 1, sm: 2 } }}>
								<Tabs
									value={activeTab}
									onChange={(e, newValue: number) => setActiveTab(newValue)}
								>
									<Tab label="Stat Block" />
									<Tab label="Markdown" />
									<Tab label="JSON" />
								</Tabs>

								<TabPanel value={activeTab} index={0}>
									<Box
										sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
									>
										<Typography variant="h6" gutterBottom>
											{builtCompanion.trait.name} ({builtCompanion.size}{' '}
											{builtCompanion.trait.type})
										</Typography>
										<Typography
											variant="body2"
											color="text.secondary"
											gutterBottom
										>
											Tier {builtCompanion.tier} (
											{TIER_NAMES[builtCompanion.tier]})
										</Typography>

										{/* Main Stats Row */}
										<Paper variant="outlined" sx={{ p: { xs: 1, sm: 2 } }}>
											<Grid container spacing={1}>
												<Grid item xs={6} sm={4}>
													<Typography variant="caption" color="text.secondary">
														HP
													</Typography>
													<Typography variant="body2">
														{builtCompanion.calculatedStats.hp}
													</Typography>
												</Grid>
												<Grid item xs={6} sm={4}>
													<Typography variant="caption" color="text.secondary">
														AV
													</Typography>
													<Typography variant="body2">
														{builtCompanion.calculatedStats.av}
													</Typography>
												</Grid>
												<Grid item xs={6} sm={4}>
													<Typography variant="caption" color="text.secondary">
														Movement
													</Typography>
													<Typography variant="body2">
														{builtCompanion.calculatedStats.movement}
													</Typography>
												</Grid>
											</Grid>
										</Paper>

										{/* Attributes and Defenses Row */}
										<Grid container spacing={1}>
											<Grid item xs={12} md={6}>
												<Paper
													variant="outlined"
													sx={{ p: { xs: 1, sm: 2 }, h: '100%' }}
												>
													<Typography variant="subtitle1" gutterBottom>
														Attributes
													</Typography>
													<Grid container spacing={1}>
														{Object.entries(
															builtCompanion.calculatedStats.attributes,
														).map(([attr, value]) => (
															<Grid item xs={6} key={attr}>
																<Typography
																	variant="caption"
																	color="text.secondary"
																>
																	{attr.toUpperCase()}
																</Typography>
																<Typography variant="body2" fontWeight="bold">
																	{String(value)}
																</Typography>
															</Grid>
														))}
													</Grid>
												</Paper>
											</Grid>
											<Grid item xs={12} md={6}>
												<Paper
													variant="outlined"
													sx={{ p: { xs: 1, sm: 2 }, h: '100%' }}
												>
													<Typography variant="subtitle1" gutterBottom>
														Defenses
													</Typography>
													<Grid container spacing={1}>
														<Grid item xs={4}>
															<Typography
																variant="caption"
																color="text.secondary"
															>
																Parry
															</Typography>
															<Typography variant="body2" fontWeight="bold">
																{builtCompanion.calculatedStats.defenses.parry}
															</Typography>
														</Grid>
														<Grid item xs={4}>
															<Typography
																variant="caption"
																color="text.secondary"
															>
																Dodge
															</Typography>
															<Typography variant="body2" fontWeight="bold">
																{builtCompanion.calculatedStats.defenses.dodge}
															</Typography>
														</Grid>
														<Grid item xs={4}>
															<Typography
																variant="caption"
																color="text.secondary"
															>
																Resist
															</Typography>
															<Typography variant="body2" fontWeight="bold">
																{builtCompanion.calculatedStats.defenses.resist}
															</Typography>
														</Grid>
													</Grid>
												</Paper>
											</Grid>
										</Grid>

										{/* Skills */}
										<Paper variant="outlined" sx={{ p: { xs: 1, sm: 2 } }}>
											<Typography variant="subtitle1" gutterBottom>
												Skills
											</Typography>
											<Typography variant="body2">
												{builtCompanion.calculatedStats.skills}
											</Typography>
										</Paper>

										{/* Attacks */}
										{builtCompanion.calculatedStats.attacks.length > 0 && (
											<Paper variant="outlined" sx={{ p: { xs: 1, sm: 2 } }}>
												<Typography variant="subtitle1" gutterBottom>
													Attacks
												</Typography>
												{builtCompanion.calculatedStats.attacks.map(
													(attack, index) => (
														<Typography
															key={index}
															variant="body2"
															sx={{ mb: 1 }}
															dangerouslySetInnerHTML={{ __html: attack }}
														/>
													),
												)}
											</Paper>
										)}

										{/* Abilities */}
										{builtCompanion.calculatedStats.abilities.length > 0 && (
											<Paper variant="outlined" sx={{ p: { xs: 1, sm: 2 } }}>
												<Typography variant="subtitle1" gutterBottom>
													Abilities
												</Typography>
												{builtCompanion.calculatedStats.abilities.map(
													(ability, index) => (
														<Typography
															key={index}
															variant="body2"
															sx={{ mb: 1 }}
															dangerouslySetInnerHTML={{ __html: ability }}
														/>
													),
												)}
											</Paper>
										)}

										{/* Resistances/Immunities/Weaknesses */}
										<Paper variant="outlined" sx={{ p: { xs: 1, sm: 2 } }}>
											<Grid container spacing={1}>
												<Grid item xs={12} md={4}>
													<Typography
														variant="caption"
														color="text.secondary"
														gutterBottom
													>
														Immunities
													</Typography>
													<Typography variant="body2">
														{builtCompanion.calculatedStats.immunities}
													</Typography>
												</Grid>
												<Grid item xs={12} md={4}>
													<Typography
														variant="caption"
														color="text.secondary"
														gutterBottom
													>
														Resistances
													</Typography>
													<Typography variant="body2">
														{builtCompanion.calculatedStats.resistances}
													</Typography>
												</Grid>
												<Grid item xs={12} md={4}>
													<Typography
														variant="caption"
														color="text.secondary"
														gutterBottom
													>
														Weaknesses
													</Typography>
													<Typography variant="body2">
														{builtCompanion.calculatedStats.weaknesses}
													</Typography>
												</Grid>
											</Grid>
										</Paper>
									</Box>
								</TabPanel>

								<TabPanel value={activeTab} index={1}>
									<Box
										sx={{
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center',
											mb: 2,
										}}
									>
										<Typography variant="h6">Markdown Output</Typography>
										<Button
											size="small"
											onClick={() =>
												navigator.clipboard.writeText(
													generateMarkdown(builtCompanion),
												)
											}
										>
											Copy to Clipboard
										</Button>
									</Box>
									<Paper
										variant="outlined"
										sx={{ p: 2, backgroundColor: 'action.hover' }}
									>
										<pre
											style={{
												whiteSpace: 'pre-wrap',
												fontSize: '0.875rem',
												margin: 0,
											}}
										>
											{generateMarkdown(builtCompanion)}
										</pre>
									</Paper>
								</TabPanel>

								<TabPanel value={activeTab} index={2}>
									<Box
										sx={{
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center',
											mb: 2,
										}}
									>
										<Typography variant="h6">JSON Output</Typography>
										<Button
											size="small"
											onClick={() =>
												navigator.clipboard.writeText(
													generateJSON(builtCompanion),
												)
											}
										>
											Copy to Clipboard
										</Button>
									</Box>
									<Paper
										variant="outlined"
										sx={{ p: 2, backgroundColor: 'action.hover' }}
									>
										<pre
											style={{
												whiteSpace: 'pre-wrap',
												fontSize: '0.875rem',
												margin: 0,
											}}
										>
											{generateJSON(builtCompanion)}
										</pre>
									</Paper>
								</TabPanel>
							</Paper>
						)}
					</Box>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpen(false)}>Close</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}
