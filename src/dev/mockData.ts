import { Character, CharacterDocument, Damage } from '../types/Character'
import { doc } from 'firebase/firestore'
import { db } from '@site/src/config/firebase'
import { PartyInfo } from '@site/src/types/Party'

// Helper function to generate UUIDs consistently with the rest of the codebase
const generateId = () => crypto.randomUUID()

/**
 * Mock character data for local development testing.
 * This provides complete characters with all required fields
 * to test the skills dropdown and other UI components.
 */
export const createMockCharacter = (): CharacterDocument => {
	const mockCharacter: Character = {
		personal: {
			name: 'Kael Stormwind',
			playerName: 'Developer Test',
			folk: 'Akashic',
			upbringing: 'Urban',
			background: 'Scholar',
			height: '6\'0"',
			weight: '180 lbs',
			age: '28',
			description:
				'A tall, scholarly figure with weathered hands and keen eyes. Wears practical robes suited for both study and adventure.',
			motivation:
				'To uncover the lost secrets of ancient civilizations and preserve knowledge for future generations.',
			profilePicture: '',
			allies: [
				{
					id: generateId(),
					description:
						'Master Theron - Former mentor at the Academy of Sciences',
				},
			],
			contacts: [
				{
					id: generateId(),
					description:
						"Lyra - Information broker in the city's merchant quarter",
				},
			],
			rivals: [
				{
					id: generateId(),
					description:
						'Vex Shadowmere - Competing scholar who uses questionable methods',
				},
			],
			npcRelationships: [
				{
					id: generateId(),
					name: 'Master Theron',
					role: 'Scholar',
					disposition: 2,
					description:
						'Former mentor at the Academy of Sciences. A wise and patient teacher who helped shape my understanding of ancient languages and arcane theory.',
				},
				{
					id: generateId(),
					name: 'Lyra Nightwhisper',
					role: 'Scoundrel',
					disposition: 0,
					description:
						"Information broker in the city's merchant quarter. Reliable for trade secrets and rumors, but demands fair payment for her services.",
				},
				{
					id: generateId(),
					name: 'Vex Shadowmere',
					role: 'Scholar',
					disposition: -2,
					description:
						'Competing scholar who uses questionable methods. We clash over proper research ethics and she has sabotaged my work in the past.',
				},
			],
			notes:
				'Fascinated by ancient texts and archaeological discoveries. Tends to get lost in research.',
		},
		statistics: {
			health: {
				current: 25,
				temp: 0,
				maxHpModifier: 0,
			},
			fatigue: {
				current: 0,
				max: 6,
			},
			av: {
				armor: 1,
				helmet: 0,
				shield: 0,
				other: 0,
			},
			strength: {
				value: 6,
				wounded: false,
			},
			agility: {
				value: 8,
				wounded: false,
			},
			spirit: {
				value: 10,
				wounded: false,
			},
			mind: {
				value: 12,
				wounded: false,
			},
			parry: 8,
			dodge: 10,
			resist: 12,
			resolve: 3,
			statusEffects: [],
		},
		skills: {
			xp: {
				total: 45,
				spend: 42,
			},
			skills: [
				{
					id: generateId(),
					name: 'Arcana',
					rank: 3,
					xp: 12,
				},
				{
					id: generateId(),
					name: 'Education',
					rank: 2,
					xp: 6,
				},
				{
					id: generateId(),
					name: 'Lore',
					rank: 2,
					xp: 6,
				},
				{
					id: generateId(),
					name: 'Insight',
					rank: 2,
					xp: 6,
				},
				{
					id: generateId(),
					name: 'Perception',
					rank: 2,
					xp: 6,
				},
				{
					id: generateId(),
					name: 'Crafting',
					rank: 1,
					xp: 2,
				},
				{
					id: generateId(),
					name: 'Athletics',
					rank: 1,
					xp: 2,
				},
				{
					id: generateId(),
					name: 'Fortitude',
					rank: 1,
					xp: 2,
				},
				{
					id: generateId(),
					name: 'Fighting',
					rank: 1,
					xp: 4,
				},
			],
			professions: ['Alchemist', 'Inscriber'],
			languages: ['Tradespeak', 'Draconic', 'Elvish'],
			abilities: [
				{
					id: generateId(),
					title: 'Spell Weaving',
					description:
						'Can combine two spells of rank 1 or lower into a single casting.',
					tag: 'Talent',
				},
				{
					id: generateId(),
					title: 'Ancient Knowledge',
					description:
						'Gain +2 boons when recalling information about historical events or civilizations.',
					tag: 'Talent',
				},
				{
					id: generateId(),
					title: 'Keen Mind',
					description:
						'Can perfectly recall anything seen or heard within the last month.',
					tag: 'Talent',
				},
			],
			abilityCategoryVisibility: {
				'Combat Art': true,
				Talent: true,
				Folk: true,
				Other: true,
			},
		},
		items: {
			coins: 250,
			encumbrance: {
				encumberedAt: 8,
				overencumberedAt: 12,
				carryModifier: 0,
				currentLoad: 6,
				mountMaxLoad: 0,
				storageMaxLoad: 0,
			},
			weapons: [
				{
					id: generateId(),
					name: "Scholar's Staff",
					damage: {
						base: 'STR',
						weapon: 3,
						other: 0,
						otherWeak: 0,
						otherStrong: 0,
						otherCritical: 0,
						type: 'physical',
						staticDamage: false,
					},
					properties: 'reach, two-handed, arcane catalyst',
					description:
						'A gnarled oak staff topped with a crystal focus. Serves as both walking aid and magical implement.',
					cost: 45,
					load: 2,
					location: 'worn',
					uses: 0,
					durability: 'd8',
				},
			],
			items: [
				{
					id: generateId(),
					name: "Traveler's Robes",
					properties: ['light armor', '+1 AV'],
					cost: 25,
					container: 'worn',
					amount: 1,
					location: 'worn',
					uses: 0,
					durability: 'd6',
				},
				{
					id: generateId(),
					name: 'Spellbook',
					properties: ['arcane focus'],
					cost: 30,
					container: 'backpack',
					amount: 1,
					location: 'carried',
					uses: 0,
					durability: 'd6',
				},
				{
					id: generateId(),
					name: 'Alchemy Kit',
					properties: ['crafting tools'],
					cost: 50,
					container: 'backpack',
					amount: 1,
					location: 'carried',
					uses: 0,
					durability: 'd8',
				},
			],
			itemLocationVisibility: {
				worn: true,
				carried: true,
				mount: true,
				storage: true,
			},
		},
		spells: {
			magicSkill: 'Arcana',
			specialization: 'Evocation',
			focus: {
				total: 14,
				current: 11,
			},
			spellCatalystDamage: 0,
			spells: [
				{
					id: generateId(),
					name: 'Mage Light',
					rank: 0,
					cost: 0,
					target: 'special',
					range: 'touch',
					properties: 'concentrate',
					dealsDamage: false,
					damage: {
						base: '',
						weapon: 0,
						other: 0,
						otherWeak: 0,
						otherStrong: 0,
						otherCritical: 0,
						type: 'radiant',
						staticDamage: false,
					},
					effect:
						'Creates a bright light source that lasts until concentration ends.',
				},
				{
					id: generateId(),
					name: 'Magic Missile',
					rank: 1,
					cost: 2,
					target: 'Dodge',
					range: 'medium',
					properties: '',
					dealsDamage: true,
					damage: {
						base: 'MND',
						weapon: 4,
						other: 0,
						otherWeak: 0,
						otherStrong: 0,
						otherCritical: 0,
						type: 'psychic',
						staticDamage: false,
					},
					effect: 'Launches a bolt of pure magical energy at a target.',
				},
				{
					id: generateId(),
					name: 'Shield',
					rank: 1,
					cost: 2,
					target: 'special',
					range: 'self',
					properties: 'quick',
					dealsDamage: false,
					damage: {
						base: '',
						weapon: 0,
						other: 0,
						otherWeak: 0,
						otherStrong: 0,
						otherCritical: 0,
						type: 'psychic',
						staticDamage: false,
					},
					effect:
						'Creates a magical barrier that provides +2 AV until your next turn.',
				},
			],
		},
		companions: [
			{
				id: 'mock-companion-1',
				name: 'Ashfoot',
				// The Companion Builder's own output shape, verbatim — so the dev fixture
				// exercises `parseCompanionMarkdown` rather than a hand-tidied version of it
				// that would hide a parser fault (M13 S7, owner review).
				markdown: [
					'#### **Ashfoot** (Medium Beast)',
					'',
					'**Tier:** 2 (Veteran)',
					'',
					'| HP | AV | STR | AGI | SPI | MND | Parry | Dodge | Resist |',
					'| --- | --- | --- | --- | --- | --- | --- | --- | --- |',
					'| 18 | 2 (natural light) | d8 | d10 | d6 | d4 | 8 | 10 | 7 |',
					'',
					'**Diet:** herbivore',
					'',
					'**Skills:** Athletics (2), Perception (2), Survival (1)',
					'',
					'**Movement:** 12 (gallop)',
					'',
					'**Immunities:** —',
					'**Resistances:** frost',
					'**Weaknesses:** fire',
					'',
					'**Attacks:**',
					'- **Hooves** 7/11/15 physical damage. On a strong hit, the target is knocked prone.',
					'- **Trample** 5/8/11 physical damage against a prone target, no roll needed.',
					'',
					'**Abilities:**',
					'- **Sure-footed** *Passive* Ignores difficult terrain caused by scree or sand.',
					'- **Bolt** *Quick Action* Moves its full movement away from a threat without provoking.',
				].join('\n'),
				currentHP: 14,
				maxHP: 18,
				wounds: 1,
			},
		],
		partyId: undefined,
	}

	return {
		...mockCharacter,
		docRef: doc(db, 'mock-collection', 'mock-character-1'),
		docId: 'mock-character-1',
		collectionId: 'mock-collection',
	}
}

/**
 * Creates a second mock character for testing multiple character scenarios
 */
export const createSecondMockCharacter = (): CharacterDocument => {
	const secondMockCharacter: Character = {
		personal: {
			name: 'Thara Ironforge',
			playerName: 'Developer Test',
			folk: 'Vorthak',
			upbringing: 'Rural',
			background: 'Artisan',
			height: '5\'4"',
			weight: '160 lbs',
			age: '35',
			description:
				'A stout, muscular smith with calloused hands and burn scars from the forge. Her beard is braided with small metal trinkets.',
			motivation:
				'To forge legendary weapons that will be remembered for generations.',
			profilePicture: '',
			allies: [],
			contacts: [],
			rivals: [],
			npcRelationships: [
				{
					id: generateId(),
					name: 'Grim Stonebeard',
					role: 'Artisan',
					disposition: 1,
					description:
						'Fellow blacksmith and friendly rival. We often share techniques and compete in friendly crafting contests.',
				},
			],
			notes:
				'Master of metalworking and weapon crafting. Values tradition and quality above all else.',
		},
		statistics: {
			health: {
				current: 32,
				temp: 0,
				maxHpModifier: 0,
			},
			fatigue: {
				current: 0,
				max: 8,
			},
			av: {
				armor: 4,
				helmet: 0,
				shield: 2,
				other: 0,
			},
			strength: {
				value: 12,
				wounded: false,
			},
			agility: {
				value: 8,
				wounded: false,
			},
			spirit: {
				value: 10,
				wounded: false,
			},
			mind: {
				value: 6,
				wounded: false,
			},
			parry: 12,
			dodge: 8,
			resist: 9,
			resolve: 4,
			statusEffects: [],
		},
		skills: {
			xp: {
				total: 50,
				spend: 48,
			},
			skills: [
				{
					id: generateId(),
					name: 'Fighting',
					rank: 3,
					xp: 12,
				},
				{
					id: generateId(),
					name: 'Crafting',
					rank: 3,
					xp: 12,
				},
				{
					id: generateId(),
					name: 'Fortitude',
					rank: 2,
					xp: 6,
				},
				{
					id: generateId(),
					name: 'Athletics',
					rank: 2,
					xp: 6,
				},
				{
					id: generateId(),
					name: 'Perception',
					rank: 2,
					xp: 6,
				},
				{
					id: generateId(),
					name: 'Insight',
					rank: 1,
					xp: 2,
				},
				{
					id: generateId(),
					name: 'Streetwise',
					rank: 1,
					xp: 2,
				},
				{
					id: generateId(),
					name: 'Influence',
					rank: 1,
					xp: 2,
				},
			],
			professions: ['Smith', 'Jeweler'],
			languages: ['Tradespeak', 'Giant'],
			abilities: [
				{
					id: generateId(),
					title: 'Master Crafter',
					description:
						'Can create items of exceptional quality with +1 boon to crafting rolls.',
					tag: 'Talent',
				},
				{
					id: generateId(),
					title: 'Combat Reflexes',
					description:
						'Gain +1 to Initiative and can make opportunity attacks.',
					tag: 'Combat Art',
				},
				{
					id: generateId(),
					title: 'Iron Will',
					description: 'Gain +2 boons against fear and intimidation effects.',
					tag: 'Talent',
				},
			],
			abilityCategoryVisibility: {
				'Combat Art': true,
				Talent: true,
				Folk: true,
				Other: true,
			},
		},
		items: {
			coins: 180,
			encumbrance: {
				encumberedAt: 12,
				overencumberedAt: 18,
				carryModifier: 0,
				currentLoad: 14,
				mountMaxLoad: 0,
				storageMaxLoad: 0,
			},
			weapons: [
				{
					id: generateId(),
					name: 'Masterwork Warhammer',
					damage: {
						base: 'STR',
						weapon: 6,
						other: 0,
						otherWeak: 0,
						otherStrong: 0,
						otherCritical: 0,
						type: 'physical',
						staticDamage: false,
					},
					properties: 'crush, two-handed',
					description:
						'A perfectly balanced warhammer of her own creation, inscribed with protective runes.',
					cost: 120,
					load: 3,
					location: 'worn',
					uses: 0,
					durability: 'd10',
				},
			],
			items: [
				{
					id: generateId(),
					name: 'Scale Mail',
					properties: ['heavy armor', '+4 AV'],
					cost: 80,
					container: 'worn',
					amount: 1,
					location: 'worn',
					uses: 0,
					durability: 'd10',
				},
				{
					id: generateId(),
					name: 'Steel Shield',
					properties: ['shield', '+2 AV'],
					cost: 40,
					container: 'worn',
					amount: 1,
					location: 'worn',
					uses: 0,
					durability: 'd8',
				},
			],
			itemLocationVisibility: {
				worn: true,
				carried: true,
				mount: true,
				storage: true,
			},
		},
		spells: {
			magicSkill: '',
			specialization: '',
			focus: {
				total: 0,
				current: 0,
			},
			spellCatalystDamage: 0,
			spells: [],
		},
		companions: [],
		partyId: undefined,
	}

	return {
		...secondMockCharacter,
		docRef: doc(db, 'mock-collection', 'mock-character-2'),
		docId: 'mock-character-2',
		collectionId: 'mock-collection',
	}
}

/**
 * Creates a mock character carrying intentionally OUTDATED talents and spells.
 *
 * The spell/talent names all exist in the JSON rulebook source, but the stored
 * effect text, focus costs, and damage values are stale on purpose. Load this
 * character in dev mode and use the "Refresh from rulebook" buttons (Spells tab
 * and Talent section) to exercise the update-detection + auto-update flow,
 * including damage recalculation (e.g. Frost Snap's inflated damage gets nerfed
 * back to the current value, Flickering Flame gains its damage detection).
 */
export const createOutdatedMockCharacter = (): CharacterDocument => {
	const base = createMockCharacter()

	return {
		...base,
		docRef: doc(db, 'mock-collection', 'mock-character-3'),
		docId: 'mock-character-3',
		collectionId: 'mock-collection',
		personal: {
			...base.personal,
			name: 'Outdated Testdummy',
			playerName: 'Refresh Test',
		},
		skills: {
			...base.skills,
			abilities: [
				{
					id: generateId(),
					title: 'Battle Mage',
					// stale: replaced by the current multi-rank rulebook wording
					description:
						'(Rank 1) Spend 2 Focus to add +2 to your Parry or Dodge against one attack.',
					tag: 'Talent',
					rank: 2,
					skill: 'Arcana',
				},
				{
					id: generateId(),
					title: 'Arcane Spell Knowledge',
					// stale: outdated summary of the talent
					description:
						'(Rank 1) +2 Focus. Learn two rank 0 or 1 spells for your disciplines.',
					tag: 'Talent',
					rank: 1,
					skill: 'Arcana',
				},
			],
		},
		spells: {
			...base.spells,
			magicSkill: 'Arcana',
			specialization: 'Evocation',
			spells: [
				{
					id: generateId(),
					name: 'Flickering Flame',
					rank: 0,
					cost: 0,
					target: 'Dodge',
					range: 'medium',
					properties: '-',
					// stale: damage not detected at all — refresh should turn this on
					dealsDamage: false,
					damage: {
						base: '',
						weapon: 0,
						other: 0,
						otherWeak: 0,
						otherStrong: 0,
						otherCritical: 0,
						type: 'physical',
						staticDamage: false,
					},
					effect:
						'You create a small flame in your palm and can throw it at a target.',
				},
				{
					id: generateId(),
					name: 'Static Spark',
					// stale: wrong rank + inflated focus cost + old effect wording
					rank: 1,
					cost: 2,
					target: 'Dodge',
					range: 'short',
					properties: '-',
					dealsDamage: true,
					damage: {
						base: 'MND',
						weapon: 1,
						other: 0,
						otherWeak: 0,
						otherStrong: 0,
						otherCritical: 0,
						type: 'lightning',
						staticDamage: false,
					},
					effect:
						'You zap a target with a small electric discharge for +2 lightning damage.',
				},
				{
					id: generateId(),
					name: 'Frost Snap',
					rank: 0,
					cost: 0,
					target: 'Dodge',
					range: 'medium',
					properties: '-',
					// stale: damage is overtuned — refresh should nerf weapon 5 -> 2
					dealsDamage: true,
					damage: {
						base: 'MND',
						weapon: 5,
						other: 0,
						otherWeak: 0,
						otherStrong: 0,
						otherCritical: 0,
						type: 'frost',
						staticDamage: false,
					},
					effect:
						'You snap your fingers to chill the air around the target, dealing +5 frost damage.',
				},
			],
		},
	}
}

/**
 * List of all available mock characters for development testing
 */
/**
 * The review character: every surface populated, nothing left to imagine.
 *
 * ## Why it exists
 *
 * The three characters above grew one feature at a time, and between them they
 * still cover the sheet unevenly — the owner hit this reviewing S8c:
 *
 * | Gap | Consequence |
 * |---|---|
 * | no `Folk` or `Other` ability anywhere | two of the four ability sections never render |
 * | one Combat Art in total | the section renders with a single row |
 * | no ability carries `actionType`, `rank` or `skill` | every row reads `Other` with both Talent tracks empty |
 * | **no character has `quickRefSelections`** | Quick Ref only ever shows its empty state |
 * | the second character has no spells | the Spells tab is one character deep |
 *
 * So it is deliberately built for LOOKING at rather than for playing: all four
 * ability categories, all six action types, talent ranks 1 to 5, skills that are
 * and are not trained, and a Quick Ref spanning all four kinds it can hold.
 *
 * ## It also has to fill the PRINTED sheet (M17)
 *
 * The printed sheet is four A5 pages with hard limits, and every one of those
 * limits is a claim about the worst case — twelve skills is a game rule (M17 D2),
 * five weapons is what a character carries in the extreme, twenty-four carried
 * items is what page two measurably holds. A claim like that is only worth
 * anything if something exercises it, and M17 had to build a throwaway JSON
 * fixture to do the measuring because no mock character came close: nine skills,
 * ONE weapon, three items, no equipment slot assigned anywhere, four spells.
 *
 * The throwaway is now here instead, so the next person to touch the printed
 * layout can see the worst case by picking a character rather than by writing
 * one. Everith is therefore sized to the sheet's stated maxima:
 *
 * | Block | Sheet's limit | Everith |
 * |---|---|---|
 * | Skills | fixed 12-row grid (D2) | 12, so the grid has no empty place |
 * | Abilities | two columns, balanced | 30 across all four categories |
 * | Weapons | 5 rows reserved | 5 |
 * | Worn slots | 8 slots, one panel | all 8 filled |
 * | Carried | 24 rows, then the note | 24, so the block ends exactly at its limit |
 * | Spells | 40 rows | 11 |
 *
 * One attribute is `wounded` and both HP and fatigue are part-spent, because
 * those are the three places the sheet prints a state rather than a number.
 *
 * ## Built on the first character, not beside it
 *
 * It spreads `createMockCharacter()` and replaces only what it is testing. A
 * fourth hand-written `Character` literal would be a fourth thing to update every
 * time the schema moves, and the three above have already drifted from each other
 * that way.
 */
export const createReviewMockCharacter = (): CharacterDocument => {
	const base = createMockCharacter()

	/*
		Ability ids are captured up front because `quickRefSelections` refers to
		them. Generating inside the array and then trying to find them again by
		title is how you get a Quick Ref that silently pins nothing.
	*/
	const ids = {
		cleave: generateId(),
		riposte: generateId(),
		surge: generateId(),
		lore: generateId(),
		darkvision: generateId(),
		stoneblood: generateId(),
		contact: generateId(),
		heirloom: generateId(),
	}

	const abilities: Character['skills']['abilities'] = [
		// Combat Arts — the section that had one row.
		{
			id: ids.cleave,
			title: 'Cleaving Blow',
			description:
				'Spend a boon on a melee hit to strike a second adjacent creature for half damage.',
			tag: 'Combat Art',
			actionType: 'Action',
		},
		{
			id: ids.riposte,
			title: 'Riposte',
			description:
				'When a melee attack against you misses, you may immediately attack that creature.',
			tag: 'Combat Art',
			actionType: 'Triggered',
		},
		{
			id: generateId(),
			title: 'Measured Guard',
			description: 'While you have not moved this turn, gain +1 Parry.',
			tag: 'Combat Art',
			actionType: 'Passive',
		},
		// Talents — ranks 1 to 5, and one with no skill so the unassigned case shows.
		{
			id: ids.surge,
			title: 'Adrenaline Surge',
			description:
				'While you have taken damage since your last turn, gain a boon on your next Strength roll.',
			tag: 'Talent',
			actionType: 'Quick Action',
			rank: 1,
			skill: 'Fortitude',
		},
		{
			id: ids.lore,
			title: 'Ancient Knowledge',
			description:
				'Gain +2 boons when recalling information about historical events or civilizations.',
			tag: 'Talent',
			actionType: 'Passive',
			rank: 3,
			skill: 'Lore',
		},
		{
			id: generateId(),
			title: 'Arcane Spell Knowledge',
			description:
				'You can take higher ranks for this talent without having taken its lower ranks provided your Arcana also has the required rank.',
			tag: 'Talent',
			actionType: 'Passive',
			rank: 5,
			skill: 'Arcana',
		},
		{
			id: generateId(),
			title: 'Unfiled Knack',
			description:
				'A talent with no skill assigned, so the unassigned case and the talent-point warning both have something to report.',
			tag: 'Talent',
			actionType: 'Other',
			rank: 2,
		},
		// Folk — a section that never rendered at all.
		{
			id: ids.darkvision,
			title: 'Darkvision',
			description: 'You see in dim light as though it were bright light.',
			tag: 'Folk',
			actionType: 'Passive',
		},
		{
			id: ids.stoneblood,
			title: 'Stoneblood',
			description:
				'Once per rest, reduce the damage of one physical attack by 3.',
			tag: 'Folk',
			actionType: 'Free',
		},
		// Other — likewise.
		{
			id: ids.contact,
			title: 'Guild Contact',
			description:
				'You know someone in most cities who will trade information for a favour.',
			tag: 'Other',
			actionType: 'Other',
		},
		{
			id: ids.heirloom,
			title: 'Heirloom Seal',
			description:
				'Presenting the seal to an Akashic official grants one boon on the first Influence roll.',
			tag: 'Other',
			actionType: 'Free',
		},
		/*
			Everything below is BULK (M17). The twelve above cover the categories,
			action types and talent ranks the screen sheet is reviewed for; these
			take the count to thirty, which is what the printed sheet's two-column
			ability block has to survive. Without them the block printed a third
			full and the layout was never actually tested.

			They are still real abilities rather than "Ability 13" — a column of
			numbered placeholders tells you nothing about how names of a realistic
			length set, which is the only thing this block's layout depends on.
		*/
		{
			id: generateId(),
			title: 'Shield Wall',
			description:
				'While adjacent to an ally with a shield, both gain +1 Parry.',
			tag: 'Combat Art',
			actionType: 'Passive',
		},
		{
			id: generateId(),
			title: 'Whirling Guard',
			description: 'Attack every adjacent creature at one bane.',
			tag: 'Combat Art',
			actionType: 'Action',
		},
		{
			id: generateId(),
			title: 'Second Wind',
			description: 'Once per rest, recover HP equal to your Strength die.',
			tag: 'Combat Art',
			actionType: 'Quick Action',
		},
		{
			id: generateId(),
			title: 'Disarming Strike',
			description:
				'On a strong hit, the target drops one held item of your choice.',
			tag: 'Combat Art',
			actionType: 'Action',
		},
		{
			id: generateId(),
			title: 'Braced Stance',
			description:
				'While you have not moved this turn, ignore the first push effect against you.',
			tag: 'Combat Art',
			actionType: 'Free',
		},
		{
			id: generateId(),
			title: 'Opening Feint',
			description:
				'When you win initiative, one ally gains a boon on their first attack.',
			tag: 'Combat Art',
			actionType: 'Triggered',
		},
		{
			id: generateId(),
			title: 'Careful Hands',
			description: 'Gain a boon on Crafting rolls made with proper tools.',
			tag: 'Talent',
			actionType: 'Passive',
			rank: 1,
			skill: 'Crafting',
		},
		{
			id: generateId(),
			title: 'Field Surgeon',
			description: 'Treat a wound outside a rest once per scene.',
			tag: 'Talent',
			actionType: 'Action',
			rank: 2,
			skill: 'Education',
		},
		{
			id: generateId(),
			title: 'Sure Footing',
			description: 'Ignore difficult terrain caused by loose ground.',
			tag: 'Talent',
			actionType: 'Passive',
			rank: 1,
			skill: 'Athletics',
		},
		{
			id: generateId(),
			title: 'Read the Room',
			description:
				'Once per scene, ask the GM one question about a creature you can see.',
			tag: 'Talent',
			actionType: 'Quick Action',
			rank: 2,
			skill: 'Insight',
		},
		{
			id: generateId(),
			title: "Scribe's Memory",
			description:
				'Recall the contents of any text you have read this session.',
			tag: 'Talent',
			actionType: 'Free',
			rank: 3,
			skill: 'Lore',
		},
		{
			id: generateId(),
			title: 'Iron Stomach',
			description: 'Gain a boon on Fortitude rolls against ingested poison.',
			tag: 'Talent',
			actionType: 'Passive',
			rank: 1,
			skill: 'Fortitude',
		},
		{
			id: generateId(),
			title: 'Ley Sense',
			description: 'Sense the nearest active ley line within a mile.',
			tag: 'Talent',
			actionType: 'Action',
			rank: 4,
			skill: 'Arcana',
		},
		{
			id: generateId(),
			title: 'Nightsight',
			description: 'You take no bane for dim light on Perception rolls.',
			tag: 'Folk',
			actionType: 'Passive',
		},
		{
			id: generateId(),
			title: 'Desert Born',
			description: 'You need half as much water as others do.',
			tag: 'Folk',
			actionType: 'Passive',
		},
		{
			id: generateId(),
			title: 'Ancestral Tongue',
			description: 'You can read the older Akashic script without a roll.',
			tag: 'Folk',
			actionType: 'Free',
		},
		{
			id: generateId(),
			title: 'Caravan Passage',
			description:
				'Any Akashic caravan will carry you a day’s travel without payment.',
			tag: 'Other',
			actionType: 'Other',
		},
		{
			id: generateId(),
			title: 'Debt of the Reeds',
			description:
				'Once per session, call in the favour Nin-shara owes you for a mundane resource.',
			tag: 'Other',
			actionType: 'Free',
		},
		{
			id: generateId(),
			title: 'Archivist’s Standing',
			description:
				'Any Akashic archive will admit you to its open shelves without a writ.',
			tag: 'Other',
			actionType: 'Other',
		},
	]

	/*
		THE PRINTED SHEET'S WORST CASE (M17)
		------------------------------------

		Everything from here to the `return` exists to fill the four printed pages
		to the limits they claim to hold. The base character has one weapon, three
		items and no equipment slot assigned anywhere, which is why M17 had to
		measure against a throwaway JSON fixture instead.

		Written as tuples mapped into the full shape rather than as sixty object
		literals: the sheet's layout depends on the NAMES and the counts, and the
		remaining fields are the same boilerplate every time. Spelling each one out
		would add ~600 lines in which the two things that matter are invisible.
	*/

	const damage = (base: Damage['base'], weapon: number): Damage => ({
		base,
		weapon,
		other: 0,
		otherWeak: 0,
		otherStrong: 0,
		otherCritical: 0,
		type: 'physical',
		staticDamage: false,
	})

	// Five: what a character carries in the extreme case, which is what the
	// printed weapons block reserves (M17 F3).
	const weapons: Character['items']['weapons'] = (
		[
			["Scholar's Staff", 'STR', 3, 'reach, two-handed, arcane catalyst', 2],
			['Bronze Shortsword', 'AGI', 3, 'light, parrying', 1],
			['Hunting Bow', 'AGI', 4, 'ranged, two-handed, ammunition', 2],
			['Bronze Dagger', 'AGI', 2, 'light, concealable, thrown', 1],
			['Sling', 'AGI', 2, 'ranged, ammunition, quiet', 1],
		] as const
	).map(([name, base, dice, properties, load]) => ({
		id: generateId(),
		name,
		damage: damage(base as Damage['base'], dice),
		properties,
		description: '',
		cost: 25,
		load,
		location: 'worn' as const,
		uses: 0,
		durability: 'd8' as const,
	}))

	// All eight slots, so the printed slot panel has no empty place — the panel's
	// whole argument is that an empty slot is VISIBLE, and a fixture that leaves
	// six of them blank never tests the full case (M17 F4).
	const wornItems: Character['items']['items'] = (
		[
			['head', 'Bronze Helm', ['+1 AV'], 1, 30],
			['neck', 'Torc of the Nine Reeds', ['heirloom'], 0, 120],
			['back', 'Wolfskin Cloak', ['warm', 'concealing'], 1, 25],
			['body', 'Scale Hauberk', ['+3 AV', 'noisy'], 3, 180],
			['hands', 'Scribe’s Bracers', ['+1 Crafting'], 0, 40],
			['ring', 'Signet of Kesh', ['authority'], 0, 90],
			['waist', 'War Belt', ['2 quick slots'], 1, 20],
			['feet', 'Marching Boots', ['long march'], 1, 15],
		] as const
	).map(([slot, name, properties, load, cost]) => ({
		id: generateId(),
		// Real properties, loads and costs: the printed worn panel gained a second
		// line for exactly these, and a fixture of empty arrays would have left it
		// looking correct while proving nothing (M17, owner review).
		name,
		properties: [...properties],
		slot,
		cost,
		load,
		container: 'worn' as const,
		amount: 1,
		location: 'worn' as const,
		uses: 0,
		durability: 'd6' as const,
	}))

	/*
		One worn thing with NO slot, because the panel has to place it.
		The printed sheet used to sweep these into carried inventory and mark them
		with a location glyph; they now get their own cell after the eight.
	*/
	const unslottedWorn: Character['items']['items'] = [
		{
			id: generateId(),
			name: 'Cord of Prayer Beads',
			properties: ['devotional'],
			slot: '' as const,
			cost: 8,
			load: 0,
			container: 'worn' as const,
			amount: 1,
			location: 'worn' as const,
			uses: 0,
			durability: 'd4' as const,
		},
	]

	/*
		Twenty-four, which is exactly what page two holds (M17). Sized to the limit
		rather than under it on purpose: at 25 the block prints its overflow note,
		so this fixture sits on the boundary where the next item added is the one
		that has to be reported rather than shown.
	*/
	const carriedItems: Character['items']['items'] = (
		[
			['Spellbook', 1],
			['Alchemy Kit', 2],
			['Rope, 15 m', 3],
			['Waterskin', 1],
			['Rations', 2],
			['Whetstone', 1],
			['Tinderbox', 1],
			['Bedroll', 2],
			['Healing Draught', 1],
			['Oil Flask', 1],
			['Grappling Hook', 2],
			['Bandages', 1],
			['Chalk', 1],
			['Iron Spikes', 2],
			['Lantern', 2],
			['Trail Bread', 1],
			['Salt Pouch', 1],
			['Fishing Line', 1],
			['Sewing Kit', 1],
			['Wax Tablet', 1],
			['Bronze Mirror', 1],
			['Antitoxin', 1],
			['Signal Horn', 1],
			['Cook Pot', 2],
		] as const
	).map(([name, load], index) => ({
		id: generateId(),
		name,
		properties: [],
		cost: 2 + (index % 5) * 3,
		load,
		container: 'backpack' as const,
		// A few stacks, so the printed `×3` suffix has something to render.
		amount: index % 7 === 0 ? 3 : 1,
		location: 'carried' as const,
		// The wear track prints as three pips, so the fixture has to show all four
		// of its states — untouched, part-worn, and fully used up.
		uses: index % 4,
		durability: 'd6' as const,
	}))

	// Eleven, over four ranks, some dealing damage and some not — the printed
	// spell table's Damage column is empty for the latter, which is the case the
	// M16 rebuild fixed and nothing had covered since.
	const spells: Character['spells']['spells'] = (
		[
			['Mage Light', 0, 0, 'special', 'touch', false],
			['Magic Missile', 1, 2, 'Dodge', 'medium', true],
			['Ember Lash', 1, 2, 'Dodge', 'short', true],
			['Stone Skin', 2, 3, 'self', 'self', false],
			['Gale Step', 1, 2, 'self', 'self', false],
			['Scrying Bowl', 2, 3, 'special', 'self', false],
			['Chain Lightning', 4, 5, 'Dodge', 'long', true],
			['Ward of Salt', 3, 4, 'special', 'close', false],
			['Sand Veil', 2, 2, 'self', 'close', false],
			['Molten Grasp', 3, 4, 'Parry', 'melee', true],
			['Read Omens', 2, 3, 'special', 'self', false],
		] as const
	).map(([name, rank, cost, target, range, dealsDamage]) => ({
		id: generateId(),
		name,
		rank,
		cost,
		target: target as Character['spells']['spells'][number]['target'],
		range: range as Character['spells']['spells'][number]['range'],
		properties: 'concentrate',
		dealsDamage,
		damage: damage('MND', 4),
		effect: '',
	}))

	/*
		Twelve skills, because twelve is a GAME RULE and the printed block is a
		fixed twelve-row grid built on it (M17 D2). The base character has nine, so
		the grid printed with three empty places and the full case was untested.
	*/
	const skills: Character['skills']['skills'] = (
		[
			['Arcana', 4, 20],
			['Athletics', 2, 6],
			['Crafting', 2, 6],
			['Education', 3, 12],
			['Fighting', 2, 6],
			['Fortitude', 2, 6],
			['Influence', 1, 2],
			['Insight', 3, 12],
			['Lore', 3, 12],
			['Perception', 2, 6],
			['Stealth', 1, 2],
			['Survival', 1, 2],
		] as const
	).map(([name, rank, xp]) => ({ id: generateId(), name, rank, xp }))

	return {
		...base,
		// Its own doc id and name, or it is indistinguishable from the character it
		// was spread from in the character list.
		docRef: doc(db, 'mock-collection', 'mock-character-review'),
		docId: 'mock-character-review',
		personal: {
			...base.personal,
			name: 'Everith Fullsheet',
			playerName: 'Developer Review',
			description:
				'Built for reviewing the sheet rather than for playing: every ability category, every action type, talent ranks 1 to 5, a populated Quick Ref, and enough of everything to fill all four printed pages to their stated limits.',
		},
		/*
			The three values the printed sheet renders as a STATE rather than as a
			number: a wounded attribute prints the word under its die, and current HP
			and fatigue are the write-fields a player pencils over during play. All
			three were at their default on the base character, so none of them had
			ever printed.
		*/
		statistics: {
			...base.statistics,
			strength: { ...base.statistics.strength, wounded: true },
			health: { ...base.statistics.health, current: 18, temp: 4 },
			fatigue: { ...base.statistics.fatigue, current: 2 },
		},
		skills: {
			...base.skills,
			xp: { total: 92, spend: 92 },
			skills,
			abilities,
			/*
				Pinned across all four kinds, so every branch of the Quick Ref grouping
				has something in it: an Action, a Triggered, a Quick Action, a Passive
				and a Free, plus a weapon, an item and a spell.
			*/
			quickRefSelections: {
				abilities: [
					ids.cleave,
					ids.riposte,
					ids.surge,
					ids.darkvision,
					ids.heirloom,
				],
				/*
					Pinned against the arrays this character actually ends up with, not
					against `base`'s. The ids are regenerated per call, so pinning
					`base.items.weapons` while the returned character carries `weapons`
					is a Quick Ref that silently holds nothing — the same failure the
					`ids` object above exists to avoid.
				*/
				weapons: weapons.slice(0, 2).map((weapon) => weapon.id),
				items: carriedItems.slice(0, 2).map((item) => item.id),
				spells: spells.slice(0, 2).map((spell) => spell.id),
			},
		},
		items: {
			...base.items,
			coins: 482,
			// Sized to the kit above, so the printed Load / Encumbered / Max cells
			// read as a character who is genuinely near their limit.
			encumbrance: {
				...base.items.encumbrance,
				currentLoad: 38,
				encumberedAt: 40,
				overencumberedAt: 60,
			},
			weapons,
			items: [...wornItems, ...unslottedWorn, ...carriedItems],
		},
		spells: {
			...base.spells,
			specialization: 'Evocation, Divination',
			focus: { total: 18, current: 11 },
			spellCatalystDamage: 1,
			spells,
		},
	}
}

export const getMockCharacters = (): CharacterDocument[] => {
	return [
		createMockCharacter(),
		createSecondMockCharacter(),
		createOutdatedMockCharacter(),
		createReviewMockCharacter(),
	]
}

/**
 * A party for the Party tab in dev mode (M13 S7, owner review).
 *
 * The tab is the one surface on the sheet that cannot render from a mock CHARACTER: its
 * content belongs to a `parties` document that only Firestore has, so signed out — which is
 * how the sheet is reviewed locally — it showed the "create or join a party" branch and, once
 * a subscription was attempted, an error. Two of its three surfaces (the member ledger and the
 * shared notes) were therefore unreviewable.
 *
 * This is that document, shaped exactly as `PartyService` returns it: three members, one of
 * them the mock character itself, so the `you` mark, the leave-vs-remove verbs and the
 * last-member delete case are all visible. `SharedNotes` uses it only when there is no signed
 * in user AND `NODE_ENV === 'development'`.
 */
export const createMockParty = (characterId: string): PartyInfo => ({
	party: {
		id: 'mock-party-1',
		name: 'The Ashen Compact',
		notes: [
			'## Standing questions',
			'',
			'- Who paid the Kesh caravan to leave three days early?',
			'- The seal below the granary is Akashic, not local. Ask Theron.',
			'',
			'## Owed',
			'',
			'| To | What | By when |',
			'| --- | --- | --- |',
			'| Harbourmaster | 40c berth fee | next full moon |',
			'| Theron | the copied tablet | no deadline given |',
		].join('\n'),
		createdBy: 'mock-user',
		createdAt: new Date('2026-07-01T10:00:00Z').toISOString(),
		members: [
			characterId,
			'mock-collection-mock-character-2',
			'mock-collection-mock-character-3',
		],
	},
	members: [
		{
			characterId,
			name: 'Kael Stormwind',
			playerName: 'You',
			folk: 'Akashic',
			background: 'Scholar',
			level: 4,
		},
		{
			characterId: 'mock-collection-mock-character-2',
			name: 'Ysra of the Reeds',
			playerName: 'Mara',
			folk: 'Human',
			background: 'Fisher',
			level: 3,
		},
		{
			characterId: 'mock-collection-mock-character-3',
			name: 'Bardun Ninefold',
			playerName: 'Sam',
			folk: 'Duran',
			background: 'Smith',
			level: 5,
		},
	],
})
