#!/usr/bin/env node

/**
 * Creature Builder CLI
 *
 * A command-line interface for creating creatures in the Nexus RPG system.
 * Accepts JSON input via stdin or file, making it ideal for LLM agents and automation.
 *
 * @module creatureBuilderCLI
 *
 * @description
 * This CLI creates balanced creatures from JSON configuration. It validates input,
 * calculates stats using the same rules as the web UI, and outputs markdown.
 *
 * @usage
 * ```bash
 * # From JSON file
 * npm run creature:build < creature.json
 *
 * # From stdin
 * echo '{"tier": 2, "category": "Basic", ...}' | npm run creature:build
 *
 * # Direct execution
 * npx tsx src/utils/creatureBuilderCLI.ts < creature.json
 *
 * # Save to file
 * npm run creature:build < input.json > output.md
 * ```
 *
 * @input-format
 * JSON object with the following structure:
 * ```json
 * {
 *   "tier": 0-10,                    // Required: Power level
 *   "category": "Basic|Elite|Lord",  // Required: HP multiplier
 *   "size": "Tiny|Small|Medium|Large|Huge|Gargantuan|Colossal",  // Required
 *   "archetype": "Standard|Brute|Nimble|Mystic|...",  // Required: Combat style
 *   "type": "string",                // Required: Creature type (e.g., "Dragon", "Undead")
 *   "name": "string",                // Required: Creature name
 *
 *   // Optional custom stat overrides
 *   "customHP": number,
 *   "customAV": number,
 *   "customArmorType": "light|heavy",
 *   "customStr": "string",           // e.g., "d10+2"
 *   "customAgi": "string",
 *   "customSpi": "string",
 *   "customMnd": "string",
 *   "customParry": number,
 *   "customDodge": number,
 *   "customResist": number,
 *
 *   // Optional features
 *   "skills": [
 *     {"name": "string", "rank": number}
 *   ],
 *   "immunities": ["string"],
 *   "resistances": ["string"],
 *   "weaknesses": ["string"],
 *
 *   // Attacks
 *   "attacks": [
 *     {
 *       "name": "string",
 *       "properties": ["string"],     // e.g., ["light", "pierce"]
 *       "damageType": "string",       // e.g., "physical", "fire"
 *       "weaponDamage": number,       // Modifier to base weapon damage
 *       "baseAttribute": "string",    // "STR", "AGI", "SPI", "MND", or ""
 *       "damage": "string",           // Additional damage formula
 *       "description": "string"       // Optional mechanical description
 *     }
 *   ],
 *
 *   // Abilities
 *   "abilities": [
 *     {
 *       "name": "string",
 *       "description": "string",
 *       "actionType": "string",       // "Action", "Quick Action", "Passive", etc.
 *       "properties": "string"        // Optional recharge/restrictions
 *     }
 *   ]
 * }
 * ```
 *
 * @example
 * Example JSON for a Dark Elf Assassin:
 * ```json
 * {
 *   "tier": 2,
 *   "category": "Basic",
 *   "size": "Medium",
 *   "archetype": "Nimble",
 *   "type": "Humanoid",
 *   "name": "Dark Elf Assassin",
 *   "skills": [
 *     {"name": "Stealth", "rank": 4},
 *     {"name": "Perception", "rank": 3}
 *   ],
 *   "attacks": [
 *     {
 *       "name": "Dagger",
 *       "properties": ["light", "pierce"],
 *       "damageType": "physical",
 *       "weaponDamage": 0,
 *       "baseAttribute": "AGI",
 *       "damage": "",
 *       "description": "On strong hit, target suffers bleeding (2 x Tier)"
 *     },
 *     {
 *       "name": "Poison Dagger",
 *       "properties": ["light", "pierce"],
 *       "damageType": "physical",
 *       "weaponDamage": 0,
 *       "baseAttribute": "AGI",
 *       "damage": "",
 *       "description": "On strong hit, target takes poison damage (2 x Tier) and is poisoned for short duration"
 *     }
 *   ],
 *   "abilities": [
 *     {
 *       "name": "Shadow Step",
 *       "description": "Can teleport to unoccupied space in close range as Quick Action",
 *       "actionType": "Quick Action",
 *       "properties": "Once per scene"
 *     }
 *   ]
 * }
 * ```
 *
 * @output
 * Outputs creature stat block in markdown format to stdout.
 * Errors are written to stderr.
 * Exit code 0 on success, 1 on error.
 *
 * @llm-usage
 * LLM agents should:
 * 1. Generate valid JSON matching the schema above
 * 2. Ensure tier is 0-10, category is valid, size/archetype exist
 * 3. Pipe JSON to this CLI via stdin
 * 4. Capture stdout for the markdown creature
 * 5. Check exit code for success/failure
 *
 * @features
 * - JSON input for easy automation
 * - Same calculation engine as web UI
 * - Validates all inputs against game rules
 * - Markdown output compatible with documentation
 * - Error messages to stderr for debugging
 * - No interactive prompts - single execution
 *
 * @technical
 * - Reads JSON from stdin
 * - Uses creatureBuilderCalculations.ts for stat calculation
 * - Uses generateCreatureMarkdown for output formatting
 * - Type-safe with TypeScript interfaces
 *
 * @see {@link creatureBuilderCalculations} for stat calculation logic
 * @see {@link creatureBuilderFormatting} for markdown generation
 * @see {@link CreatureBuilder} for type definitions
 */

import { generateCreatureMarkdown } from '../creature/creatureBuilderFormatting'
import {
	calculateHP,
	calculateAV,
	calculateDefense,
	calculateAttributes,
	getArchetypeData,
	getAvailableArchetypes,
	getAvailableSizes,
	getWeaponDamage,
	calculateBaseDamage,
	formatDamageString,
	TIER_NAMES,
} from '../creature/creatureBuilderCalculations'
import {
	BuiltCreature,
	CreatureCategory,
	CreatureAttack,
	CreatureAbility,
} from '../../../types/CreatureBuilder'

/**
 * Input JSON schema for creature creation
 */
interface CreatureInput {
	tier: number
	category: CreatureCategory
	size: string
	archetype: string
	type: string
	name: string
	customHP?: number | null
	customAV?: number | null
	customArmorType?: 'light' | 'heavy' | null
	customStr?: string | null
	customAgi?: string | null
	customSpi?: string | null
	customMnd?: string | null
	customParry?: number | null
	customDodge?: number | null
	customResist?: number | null
	skills?: { name: string; rank: number }[]
	immunities?: string[]
	resistances?: string[]
	weaknesses?: string[]
	attacks?: CreatureAttack[]
	abilities?: CreatureAbility[]
}

/**
 * Validates the input JSON against schema and game rules
 * @param input - The parsed JSON input
 * @returns Array of error messages, empty if valid
 */
function validateInput(input: any): string[] {
	const errors: string[] = []

	// Required fields
	if (typeof input.tier !== 'number' || input.tier < 0 || input.tier > 10) {
		errors.push('tier must be a number between 0 and 10')
	}

	if (!['Basic', 'Elite', 'Lord'].includes(input.category)) {
		errors.push('category must be "Basic", "Elite", or "Lord"')
	}

	const validSizes = getAvailableSizes()
	if (!validSizes.includes(input.size)) {
		errors.push(`size must be one of: ${validSizes.join(', ')}`)
	}

	const validArchetypes = getAvailableArchetypes()
	if (!validArchetypes.includes(input.archetype)) {
		errors.push(`archetype must be one of: ${validArchetypes.join(', ')}`)
	}

	if (typeof input.type !== 'string' || !input.type.trim()) {
		errors.push('type must be a non-empty string')
	}

	if (typeof input.name !== 'string' || !input.name.trim()) {
		errors.push('name must be a non-empty string')
	}

	// Optional custom armor type
	if (
		input.customArmorType &&
		!['light', 'heavy'].includes(input.customArmorType)
	) {
		errors.push('customArmorType must be "light" or "heavy"')
	}

	return errors
}

/**
 * Builds a creature from validated input
 * @param input - Validated creature input
 * @returns Built creature ready for markdown output
 */
function buildCreature(input: CreatureInput): BuiltCreature {
	const attributes = calculateAttributes(
		input.tier,
		input.archetype,
		input.type,
		input.customStr ?? null,
		input.customAgi ?? null,
		input.customSpi ?? null,
		input.customMnd ?? null,
	)

	const parry = calculateDefense(
		input.tier,
		input.archetype,
		input.size,
		'parry',
		input.customParry ?? null,
	)
	const dodge = calculateDefense(
		input.tier,
		input.archetype,
		input.size,
		'dodge',
		input.customDodge ?? null,
	)
	const resist = calculateDefense(
		input.tier,
		input.archetype,
		input.size,
		'resist',
		input.customResist ?? null,
	)

	const baseHp = calculateHP(
		input.tier,
		input.archetype,
		input.category,
		input.customHP ?? null,
	)
	const av = calculateAV(
		input.tier,
		input.archetype,
		input.size,
		input.customAV ?? null,
		input.customArmorType ?? null,
	)

	const archetypeData = getArchetypeData(input.archetype)
	const armorType = input.customArmorType ?? archetypeData?.armorType ?? 'light'

	const formattedSkills = (input.skills || []).map(
		(skill) => `${skill.name} (${skill.rank})`,
	)

	// Calculate damage strings for attacks
	const tierWeaponDamage = getWeaponDamage(input.tier, input.archetype)
	const formattedAttacks = (input.attacks || []).map((attack) => {
		let damageString = ''

		if (attack.damage && attack.damage.trim()) {
			// Custom damage formula provided
			damageString = attack.damage
		} else if (attack.baseAttribute && attack.baseAttribute.trim()) {
			// Calculate damage based on attribute
			const attr = attack.baseAttribute.toUpperCase()
			let attributeDie = ''
			if (attr === 'STR') attributeDie = attributes.str
			else if (attr === 'AGI') attributeDie = attributes.agi
			else if (attr === 'SPI') attributeDie = attributes.spi
			else if (attr === 'MND') attributeDie = attributes.mnd

			if (attributeDie) {
				const baseDamage = calculateBaseDamage(attributeDie)
				const totalWeaponDamage = tierWeaponDamage + (attack.weaponDamage || 0)
				damageString = formatDamageString(baseDamage, totalWeaponDamage)
			}
		} else {
			// No attribute, just use weapon damage
			const totalWeaponDamage = tierWeaponDamage + (attack.weaponDamage || 0)
			damageString = formatDamageString(0, totalWeaponDamage)
		}

		return {
			...attack,
			damage: damageString,
		}
	})

	return {
		name: input.name,
		tier: input.tier,
		category: input.category,
		size: input.size,
		type: input.type,
		archetype: input.archetype,
		baseHp: baseHp.base,
		baseTier: input.tier,
		hp: baseHp.display,
		av,
		armorType,
		str: attributes.str,
		agi: attributes.agi,
		spi: attributes.spi,
		mnd: attributes.mnd,
		parry,
		dodge,
		resist,
		skills: formattedSkills,
		immunities: input.immunities || [],
		resistances: input.resistances || [],
		weaknesses: input.weaknesses || [],
		attacks: formattedAttacks,
		abilities: input.abilities || [],
	}
}

/**
 * Reads JSON from stdin
 * @returns Promise resolving to the input string
 */
async function readStdin(): Promise<string> {
	return new Promise((resolve, reject) => {
		let data = ''
		process.stdin.setEncoding('utf8')

		process.stdin.on('data', (chunk) => {
			data += chunk
		})

		process.stdin.on('end', () => {
			resolve(data)
		})

		process.stdin.on('error', (err) => {
			reject(err)
		})
	})
}

/**
 * Main CLI entry point
 * Reads JSON from stdin, validates, builds creature, outputs markdown
 */
async function main() {
	try {
		// Read JSON from stdin
		const inputStr = await readStdin()

		if (!inputStr.trim()) {
			console.error('Error: No input provided')
			console.error('Usage: npm run creature:build < creature.json')
			console.error('See JSDoc in creatureBuilderCLI.ts for JSON schema')
			process.exit(1)
		}

		// Parse JSON
		let input: any
		try {
			input = JSON.parse(inputStr)
		} catch (err) {
			console.error('Error: Invalid JSON')
			console.error(err instanceof Error ? err.message : String(err))
			process.exit(1)
		}

		// Validate input
		const errors = validateInput(input)
		if (errors.length > 0) {
			console.error('Validation errors:')
			errors.forEach((err) => console.error(`  - ${err}`))
			console.error(
				'\nSee JSDoc in creatureBuilderCLI.ts for valid input schema',
			)
			process.exit(1)
		}

		// Build creature
		const creature = buildCreature(input as CreatureInput)

		// Output markdown
		const markdown = generateCreatureMarkdown(creature)
		console.warn(markdown)

		process.exit(0)
	} catch (error) {
		console.error(
			'Error:',
			error instanceof Error ? error.message : String(error),
		)
		process.exit(1)
	}
}

// Run if executed directly
if (require.main === module) {
	main()
}

export { main as runCreatureBuilderCLI, validateInput, buildCreature }
