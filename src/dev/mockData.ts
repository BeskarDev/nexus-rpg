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
 * ## Its abilities are REAL CONTENT (M20)
 *
 * Every Combat Art, Talent and Folk ability is the catalogue's own entry, copied
 * verbatim from `combat-arts.json`, `talents.json` and `folk.json` — name, rules
 * text and, for a talent, the whole rank ladder, which is exactly what
 * `buildTalentFields` puts on a real character.
 *
 * They were thirty invented one-liners, and a fixture that invents its content
 * cannot test the thing it exists to test. Three consequences, all found at
 * once: the talents' one-line summaries made the new ability deck and the
 * sheet's own description field look like they were LOSING text; three combat
 * arts claimed `Passive`, `Free` and `Triggered`, which no combat art in the
 * corpus can be, since every one of them is a rider on an attack; and
 * `personal.folk` was `Akashic` — not a folk, not a culture, and in no document
 * under `docs/` — so the folk block could never be checked against anything.
 *
 * `Other` stays hand-written, and that is not an oversight: it is the sheet's
 * free-text bucket for a patron's boon or a GM ruling, it has no catalogue, and
 * it never will (M20 F2).
 *
 * The folk is the Gnome, chosen rather than defaulted: `Small Stature` is the
 * one folk ability carrying a BULLET LIST, so the fixture exercises the encoding
 * that broke when `folk.json`'s truncations were repaired.
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
		manaShield: generateId(),
		spellblade: generateId(),
		shadowSlip: generateId(),
		scentOfIllusions: generateId(),
		guildContact: generateId(),
		heirloomSeal: generateId(),
	}

	const abilities: Character['skills']['abilities'] = [
		/*
			COMBAT ARTS — ten from `combat-arts.json`, verbatim (M20).

			They were invented rules text until now, and three of them claimed action
			types a combat art cannot have. Every art in the corpus is a rider on an
			attack, so every one of these is an `Action`; the other five action types
			come from the talents and the folk below, where they are true.

			Chosen against the weapons Everith actually carries — a two-handed staff,
			a shortsword, a dagger, a bow and a sling — so the sheet reads as one
			character rather than as a list of unrelated rows.
		*/
		{
			id: ids.cleave,
			title: 'Cleave',
			description:
				"Your attack with a two-handed melee weapon hits up to 2 additional creatures in your weapon's reach. On a hit, subtract your weapon damage once from the total damage you deal against each target.",
			tag: 'Combat Art',
			actionType: 'Action',
		},
		{
			id: generateId(),
			title: 'Feint',
			description:
				'If you don’t move during your turn, you gain +1 boon on the attack with a non-heavy melee weapon.',
			tag: 'Combat Art',
			actionType: 'Action',
		},
		{
			id: generateId(),
			title: 'Precise Strike',
			description:
				'You suffer +1 bane on the attack with a pierce melee weapon.<br/><strong>Weak.</strong> Ignore 1/2 AV (rounded up).<br/><strong>Strong. </strong>Ignore 1/2 AV (rounded up) and add 1/4 x Agility to damage.<br/><strong>Critical.</strong> Ignore 1/2 AV (rounded up) and add 1/2 x Agility to damage.',
			tag: 'Combat Art',
			actionType: 'Action',
		},
		{
			id: generateId(),
			title: 'Quick Lunge',
			description:
				'Your attack with a pierce melee weapon targets the enemy’s Dodge instead of Parry. They can’t use a Quick Action in response to this attack.',
			tag: 'Combat Art',
			actionType: 'Action',
		},
		{
			id: generateId(),
			title: 'Aimed Shot',
			description:
				'If you don’t move during your turn, you gain +1 boon on the attack.',
			tag: 'Combat Art',
			actionType: 'Action',
		},
		{
			id: generateId(),
			title: 'Barrage',
			description:
				'You can roll another attack with a non-heavy ranged weapon, but suffer +1 bane on it.',
			tag: 'Combat Art',
			actionType: 'Action',
		},
		{
			id: generateId(),
			title: 'Volley',
			description:
				"Your attack with a non-heavy ranged weapon hits up to 2 additional creatures in your weapon's reach. On a hit, subtract your weapon damage once from the total damage you deal against each target.",
			tag: 'Combat Art',
			actionType: 'Action',
		},
		{
			id: generateId(),
			title: 'Pinning Shot',
			description:
				'<strong>Weak.</strong> The target’s Movement briefly becomes 0.<br/><strong>Strong.</strong> The target is briefly restrained.<br/><strong>Critical.</strong> The target is restrained for a short duration. They can roll Strength + Athletics at the end of their turns to regain their Movement.',
			tag: 'Combat Art',
			actionType: 'Action',
		},
		{
			id: generateId(),
			title: 'Precise Shot',
			description:
				'You suffer +1 bane on the attack with a ranged weapon.<br/><strong>Weak.</strong> Ignore 1/2 AV (rounded up).<br/><strong>Strong. </strong>Ignore 1/2 AV (rounded up) and add 1/4 x Agility to damage.<br/><strong>Critical.</strong> Ignore 1/2 AV (rounded up) and add 1/2 x Agility to damage.',
			tag: 'Combat Art',
			actionType: 'Action',
		},
		{
			id: generateId(),
			title: 'Disarming Shot',
			description:
				'Immediately after this attack, use the Disarm action against the same target. You can only choose a one-handed item the target holds, that isn’t a shield. Roll Strength/Agility + Archery for the disarm instead. For a non-light item, you suffer +1 bane on your roll.',
			tag: 'Combat Art',
			actionType: 'Action',
		},
		/*
			TALENTS — twelve from `talents.json`, with the WHOLE rank ladder in the
			description, because that is exactly what `buildTalentFields` copies onto a
			real character (M20 F3). A one-line summary here made the ability deck and
			the sheet's description field both look like they were losing text.

			Ranks 1 to 5 are all present, and every `skill` is the talent's own
			`skill requirement` — except the last one, which drops it on purpose.
		*/
		{
			id: generateId(),
			title: 'Arcane Spell Knowledge',
			description:
				'You can take higher ranks for this talent without having taken its lower ranks provided your Arcana also has the required rank.<br/><br/><strong>(Rank 1)</strong> +2 Focus. Learn two rank 0 or 1 spells for any of your disciplines, or adopt a new discipline and learn one new rank 0 spell for it. You can choose this Talent multiple times.<br/><br/><strong>(Rank 2) </strong>+2 Focus.<strong> </strong>Learn two rank 2 or lower spells for any of your disciplines. You can choose this Talent multiple times.<br/><br/><strong>(Rank 3)</strong> +2 Focus.<strong> </strong>Learn two rank 3 or lower spells for any of your disciplines. You can choose this Talent multiple times.<br/><br/><strong>(Rank 4) </strong>+2 Focus. Learn two rank 4 or lower spells for any of your disciplines. You can choose this Talent multiple times.<br/><br/><strong>(Rank 5) </strong>+2 Focus. Learn two rank 5 or lower spells for any of your disciplines. You can choose this Talent multiple times.',
			tag: 'Talent',
			actionType: 'Passive',
			rank: 5,
			skill: 'Arcana',
		},
		{
			id: ids.manaShield,
			title: 'Mana Shield',
			description:
				'<strong>(Rank 1)</strong> When you successfully cast an arcane spell of rank 1 or higher, a barrier of arcane force forms around you. Whenever you take damage, the barrier absorbs it instead, up to a total of twice the cast spell’s rank. Once it has absorbed that much damage, it fades. Forming a new barrier replaces the old one only if the new barrier’s absorption is higher. The barrier also fades after a short break.<br/><br/><strong>(Rank 2)</strong> When you successfully cast an arcane spell of rank 1 or higher while your barrier holds, you can choose to increase the barrier’s remaining absorption by the spell’s rank instead of forming a new barrier.<br/><br/><strong>(Rank 3)</strong> Once per scene, when you take damage while your barrier holds, you can choose to have the barrier absorb all of that damage. The barrier then fades.',
			tag: 'Talent',
			actionType: 'Triggered',
			rank: 3,
			skill: 'Arcana',
		},
		{
			id: ids.spellblade,
			title: 'Spellblade',
			description:
				"<strong>(Rank 1)</strong> By spending your Quick Action and 2 additional Focus on top of the spell's normal casting cost, you can cast any of your arcane rank 0 spells that target a single creature vs. one of their Defenses as a strike spell. Casting the spell still uses your Action as normal. The spell gains the strike property and its range becomes that of the weapon used.<br/><br/><strong>(Rank 2)</strong> You can also cast your arcane rank 1 spells this way. Once per scene, when the attack of one of your strike spells fails, you can reroll the attack.<br/><br/><strong>(Rank 3)</strong> You can also cast your arcane rank 2 spells this way. Your strike spells cost -2 Focus (min. 0).",
			tag: 'Talent',
			actionType: 'Quick Action',
			rank: 1,
			skill: 'Arcana',
		},
		{
			id: generateId(),
			title: 'Spellbreaker',
			description:
				"<strong>(Rank 1)</strong> When a spell or another magical effect rolls against your Resist, you can use your Quick Action and spend 2 Focus to raise counter-sigils, gaining +2 Resist against that roll. You can spend another 2 Focus for the same effect against further magical effects until your next turn without using another Quick Action.<br/><br/><strong>(Rank 2)</strong> When a creature you can see within medium range casts a spell, you can use your Quick Action and spend 2 Focus to disrupt their casting. They suffer +1 bane on the roll to cast it.<br/><br/><strong>(Rank 3)</strong> Once per scene, when you disrupt a creature's casting, you can attempt to break the spell entirely instead of only hindering it. Roll Mind + Arcana vs. the caster's Resist plus the spell's rank. On a success, the spell fails and has no effect.",
			tag: 'Talent',
			actionType: 'Triggered',
			rank: 2,
			skill: 'Arcana',
		},
		{
			id: generateId(),
			title: 'Magical Sense',
			description:
				"<strong>(Rank 1)</strong> Your senses are attuned to the presence of magic. As a Quick Action, you can roll Spirit + Lore to detect whether any magical effects (traps, wards, lingering magic, …), creatures (spellcasters, magical beasts, extraplanar creatures, …), or items are present within your close range. On a success, you sense the rough position, presence (faint, moderate, strong, overwhelming) and general type (arcane or mystical) of each source of magic that is not hidden behind solid walls or other obstructions.<br/>This ability lasts briefly or for a short duration if you use your Spell Concentration on it.<br/><br/><strong>(Rank 2) </strong>You gain the following abilities:<br/>- Your Magical Sense ability extends to short range.<br/>- When you use your Magical Sense ability, you can attempt to focus your senses on one creature in range with a magical presence. Roll Spirit + Lore vs. their Resist. On a success, pick once for each SL (one for weak, two for strong, three for critical): Magical Ability, Resistance, Weakness, Immunity (you can choose the same type multiple times). If you chose something the target doesn’t have, choose again. You learn about one property of the chosen type for each pick (GM’s choice).<br/>You can use this ability once per individual creature.<br/><br/><strong>(Rank 3)</strong> You gain the following abilities:<br/>- Your Magical Sense ability extends to medium range.<br/>- While you use your Magical Sense ability, you gain +1 Resist and +1 boon on any Spirit rolls that target one or more of the magical sources.<br/><br/><strong>(Rank 4)</strong> You gain the following abilities:<br/>- Your Magical Sense ability extends to long range.<br/>- When you sense sources of magic, you also learn each source's specific discipline or tradition, and whether its power is of rank 1 or lower, rank 2 to 3, or rank 4 or higher.<br/>- Your Magical Sense ability lasts for a short duration without using your Spell Concentration on it.",
			tag: 'Talent',
			actionType: 'Quick Action',
			rank: 4,
			skill: 'Lore',
		},
		{
			id: generateId(),
			title: 'Methodical Research',
			description:
				"<strong>(Rank 1)</strong> You keep a body of ongoing Research, a pool of points up to a maximum equal to your Education. You gain Research in two ways:<br/>- During downtime, when you undertake the Research activity, you gain 1 Research on a weak success, 2 on a strong success, or 3 on a critical success, on top of the information you learn.<br/>- During an adventure, you can spend one use of a Bundle of Scrolls to gain 1 Research.<br/>Spending Research requires no action, but you can only spend Research once between your turns. You can spend 1 Research when you or an ally within short range makes an Education, Lore, or Nature roll to grant +1 boon on it.<br/><br/><strong>(Rank 2)</strong> You gain the following ways to spend Research:<br/>- Spend 1 Research to put your knowledge to work on a device or obstacle. You or an ally within short range gains +1 boon on a roll to disarm, pick, operate, or bypass a trap, lock, ward, or mechanism.<br/>- Spend 1 Research when you or an ally within short range fails an Education or Lore roll to recall or research something. They still uncover a minor but useful clue, the GM's choice: a partial fact, a pointer to another source, or a dead end now known to avoid.<br/><br/><strong>(Rank 3)</strong> You gain the following abilities:<br/>- When you gain Research from the downtime Research activity, you gain 1 additional Research, even on a failure.<br/>- Spend 2 Research when you or an ally within short range faces a creature, hazard, mechanism, or phenomenon. They gain +1 boon on their next roll to overcome or exploit it, and the GM tells you one of the following about it, your choice: a weakness to exploit (such as a damage type it is vulnerable to), a danger to expect (such as an attack it favors or what triggers it), or a way to handle it (such as how to disable, bypass, or calm it).",
			tag: 'Talent',
			actionType: 'Passive',
			rank: 3,
			skill: 'Education',
		},
		{
			id: generateId(),
			title: 'Empath',
			description:
				'<strong>(Rank 1)</strong> When you roll Insight about the emotional state, personality, or life circumstances of another intelligent creature, you can re-roll the test once per scene.<br/><br/><strong>(Rank 2)</strong> You can use your Quick Action during your turn to roll Spirit + Insight vs. Resist against a creature you can see.<br/>On a success, you use your insights into the creature’s emotional state, personality, or life circumstances to predict their behaviour. You briefly gain +1 boon on any rolls targeting them and they suffer +1 bane on any roll targeting you. On a success, you can also roll for this ability again on your following turns without using your Quick Action. On a failure, the target is immune against this ability for the rest of the scene.<br/><br/><strong>(Rank 3)</strong> When you roll Insight about the emotional state, personality, or life circumstances of another intelligent creature, you gain +1 boon on the roll.',
			tag: 'Talent',
			actionType: 'Passive',
			rank: 3,
			skill: 'Insight',
		},
		{
			id: generateId(),
			title: 'Sense of Deduction',
			description:
				'<strong>(Rank 1) </strong>When you roll Insight to investigate a chain of events, the responsible entity of an event, the time an event took place, or who might know more about an event, you can re-roll the test once per scene.<br/><br/><strong>(Rank 2) </strong>While investigating a chain of events, the responsible entity of an event, the time an event took place, or who might know more about an event, you can choose to make an assessment about that topic. The GM will tell you if your assessment is generally true or false without any more nuance. You can use this ability once per scene.<br/><br/><strong>(Rank 3)</strong> When you use your Sense of Deduction ability to make an assessment, you can re-use this ability multiple times per scene until you make a false assessment.',
			tag: 'Talent',
			actionType: 'Passive',
			rank: 2,
			skill: 'Insight',
		},
		{
			id: generateId(),
			title: 'Keen Observer',
			description:
				'<strong>(Rank 1)</strong> When you roll Perception to investigate a scene, track a trail, or keep watch for danger, you can re-roll the test once per scene.<br/><br/><strong>(Rank 2)</strong> Once per challenge, when you succeed on a Perception roll during the challenge, you read the situation and the GM points out one of the following, your choice:<br/>- an obstacle ahead (ignore the consequence of your next failure)<br/>- an opening to press (+1 boon on your next roll toward the challenge)<br/>- a misstep to catch (remove one pending consequence from an earlier failure)<br/><br/><strong>(Rank 3)</strong> When you achieve a critical success on a Perception roll during a challenge, choose one: reduce the challenge die by an additional 1, or negate one pending consequence.',
			tag: 'Talent',
			actionType: 'Passive',
			rank: 2,
			skill: 'Perception',
		},
		{
			id: generateId(),
			title: 'Adrenaline Surge',
			description:
				'<strong>(Rank 1) </strong>While you have taken damage or spent HP since the end of your last turn, you are surged. When you become surged, you gain +1 boon on the next attack roll or Strength roll you make while surged.<br/><br/><strong>(Rank 2)</strong> While surged, you also gain the following effects:<br/>- When you hit with the attack you spend your surge boon on, it deals +2 damage (situational bonus).<br/>- At the start of your turn, you can end the dazed, weakened, or frightened condition on yourself.<br/><br/><strong>(Rank 3)</strong> You gain the following abilities:<br/>- The damage bonus on your surge boon attack increases to +4.<br/>- Once per scene, when an enemy within your melee range damages you, you can use your Quick Action to immediately make one melee attack against them.',
			tag: 'Talent',
			actionType: 'Passive',
			rank: 1,
			skill: 'Fortitude',
		},
		{
			id: ids.shadowSlip,
			title: 'Shadow Slip',
			description:
				'<strong>(Rank 1)</strong> While you wear no heavy armor, once per scene, when a creature you can see makes a melee attack against you, you can use your Quick Action to slip aside at the last moment. You gain +2 to the targeted Defense against that attack (situational bonus).<br/><br/><strong>(Rank 2)</strong> When an attack affected by your Shadow Slip ability misses you, you can spend 1 unprovoked Movement.<br/><br/><strong>(Rank 3)</strong> When an attack affected by your Shadow Slip ability misses you, and there is cover, concealment, or darkness within short distance for you to slip into, the attacker loses track of you for just that moment. You can immediately take the Hide action against them as a free action.',
			tag: 'Talent',
			actionType: 'Free',
			rank: 1,
			skill: 'Stealth',
		},
		// The unassigned case: a real talent with its skill deliberately left off,
		// so the sheet's "no skill" branch and the talent-point warning both have
		// something to report.
		{
			id: generateId(),
			title: 'General Education',
			description:
				'<strong>(Rank 1) </strong>Once per scene, when you roll for an expert skill you haven’t learned using Mind, you don’t suffer the +1 bane for it being an untrained skill for you.<br/><br/><strong>(Rank 2)</strong> You gain the following abilities:<br/>- You no longer suffer the +1 bane for rolling untrained expert skills using Mind.<br/>- Once per scene, when you roll for any expert skill using Mind, you can choose to add your Education instead of the other expert skill.<br/><br/><strong>(Rank 3)</strong> When you roll Mind + Education, you gain +1 boon on the roll.',
			tag: 'Talent',
			actionType: 'Other',
			rank: 2,
		},
		/*
			FOLK — the Gnome's three abilities from `folk.json`, verbatim, and
			`personal.folk` says Gnome to match (M20).

			It used to say `Akashic`, which is not a folk, not a culture, and appears
			nowhere in `docs/` — so the folk block could never be checked against
			anything. The Gnome earns the slot: `Small Stature` is the one folk ability
			that carries a BULLET LIST, which is the encoding that broke when the
			truncations in `folk.json` were repaired, so the review character now
			exercises it on both the sheet and the printed card.
		*/
		{
			id: generateId(),
			title: 'Natural Empath',
			description:
				'You can read the surface thoughts and emotions of any close creature by rolling Spirit + Insight. You can also project your feelings to a creature close to you, allowing you to communicate simple ideas with animals and other creatures. You also intuitively know how many living creatures are close to you and their general direction.',
			tag: 'Folk',
			actionType: 'Action',
		},
		{
			id: ids.scentOfIllusions,
			title: 'Scent of Illusions',
			description:
				'You can instinctively make out illusions and invisible things. You gain +1 boon on Spirit rolls to identify magical falsehoods and illusions and impose +1 bane on rolls to fool you with falsehoods or illusions.',
			tag: 'Folk',
			actionType: 'Passive',
		},
		{
			id: generateId(),
			title: 'Small Stature',
			description:
				"You are of small size. This grants you the following effects:\n\n- You gain +1 boon on Agility rolls to hide or move stealthily.\n- You can only wield versatile weapons two-handed and don't add a bonus to weapon damage from it.\n- Increase the Strength requirement for heavy weapons you wield by +1d (max. d12).",
			tag: 'Folk',
			actionType: 'Passive',
		},
		/*
			OTHER — the only group with no catalogue and never will have one: it is
			the sheet's free-text bucket for a patron's boon, a curse or a GM ruling
			(M20 F2). So these stay hand-written, and they are the ONLY hand-written
			abilities left on this character.
		*/
		{
			id: ids.guildContact,
			title: 'Guild Contact',
			description:
				'You know someone in most cities who will trade information for a favour.',
			tag: 'Other',
			actionType: 'Other',
		},
		{
			id: ids.heirloomSeal,
			title: 'Heirloom Seal',
			description:
				'Presenting the seal to a Ghahar magistrate grants one boon on the first Influence roll of an audience.',
			tag: 'Other',
			actionType: 'Free',
		},
		{
			id: generateId(),
			title: 'Sefkari Caravan Passage',
			description:
				'Any Sefkari caravan will carry you a day of travel without payment.',
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
			title: 'Open Shelves',
			description:
				'The archive of your old academy admits you to its open shelves without a writ.',
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

	/*
		THE STASH — one card of every shape (M19 S4).

		Everith exists to exercise the printed SHEET at its limits; this block
		exercises the printed CARDS, which are a different artifact with different
		edge cases. Both live on one character so a reviewer picks a name rather
		than assembling a fixture.

		Deliberately at `location: 'storage'`. The sheet's equipment page reads
		`worn` and `carried` only, so a stash is invisible to it — which is what
		keeps this addition from breaking the page-two claim that Everith carries
		EXACTLY the 24 items the block holds before it starts reporting overflow.
		The card tool reads every location, so it sees all of them.

		Between them these cover: every category the inference can reach, quality
		absent / low / rare, properties none / one / many, rules text from
		`description` and from `special`, a body long enough to spill to a
		continuation card, a name long enough to wrap, and — the one that matters —
		an item whose `uses: 3` is a DAMAGE state that must never print as three
		charges.
	*/
	const stash = (
		[
			// [name, properties, description, special, quality, load, cost, uses]
			[
				'Scroll of Ember Lash',
				[],
				'Casts *Ember Lash* at rank 2 without spending focus. The scroll burns to ash as the spell resolves.',
				'',
				3,
				0,
				150,
				0,
			],
			[
				'Wand of Sparks',
				['4 charges'],
				'Spend a charge to cast *Mage Light*, or three to cast *Ember Lash* at rank 1.',
				'',
				4,
				0,
				900,
				0,
			],
			[
				'Staff of the Reed Marshes',
				['two-handed', 'arcane catalyst', 'reach'],
				'While held, water counts as open ground for your movement, and you may cast *Sand Veil* once per rest without spending focus. The staff remembers every marsh it has walked.',
				'',
				5,
				2,
				2400,
				0,
			],
			[
				'Bronze Buckler of the Ninth Reed',
				['+1 AV', 'parrying'],
				'Once per combat, when an attack would hit you, the buckler turns it aside and you take no damage from it.',
				'',
				6,
				1,
				3200,
				0,
			],
			[
				'Barbed Arrows',
				['piercing'],
				'',
				'A hit deals +1 damage and the target bleeds until they spend an action to pull the barb free.',
				4,
				0,
				45,
				0,
			],
			[
				'Storm Lantern',
				[],
				'Never gutters in wind or rain. Its light cannot be seen from more than a short distance away, which is why smugglers pay for them.',
				'',
				0,
				1,
				400,
				0,
			],
			[
				'Draught of the Long March',
				['consumable'],
				'Drink to ignore one level of fatigue for a medium duration. When it ends, gain one level of fatigue.',
				'',
				3,
				0,
				120,
				0,
			],
			[
				'Ingot of Sky Iron',
				['crafting material'],
				'Metal fallen from the sky, worked only at a forge hot enough to shame a smith. A weapon forged from it counts as one quality higher against creatures of the dark.',
				'',
				6,
				2,
				5000,
				0,
			],
			[
				'The Weeping Crown of Ninsun-Who-Waited',
				['heirloom', 'attunement', 'cursed'],
				'While worn, you know the direction of the nearest creature that has wept in the last day, and you may speak with them once across any distance.<br/>The crown weeps with them. You take a bane on all Spirit rolls while it is on your head, and it cannot be removed until the creature you last spoke to is at peace or dead.<br/>Ninsun waited nine years at the gate of a city that had already fallen. The crown has not stopped since.',
				'',
				8,
				1,
				40000,
				0,
			],
			[
				'Notched Bronze Khopesh',
				['slash'],
				'Taken from a tomb guard and never repaired. It still cuts, and the notches catch.',
				'',
				4,
				2,
				300,
				// A DAMAGE state, not charges. The card must print nothing for this,
				// and there is a unit test named for the trap (M19 F2, D3).
				3,
			],
		] as const
	).map(
		([name, properties, description, special, quality, load, cost, uses]) => ({
			id: generateId(),
			name,
			properties: [...properties],
			description,
			special,
			quality: (quality ||
				undefined) as Character['items']['items'][number]['quality'],
			load,
			cost,
			container: 'backpack' as const,
			amount: 1,
			location: 'storage' as const,
			uses,
			durability: 'd8' as const,
		}),
	)

	/*
		Two stashed WEAPONS, because a weapon becomes a card by a different path:
		its properties are one string rather than an array, and its category is
		never inferred. One carries rules text and one does not, so the tool's
		candidate rule has a weapon on each side of it.
	*/
	const treasureWeapons: Character['items']['weapons'] = [
		{
			id: generateId(),
			name: 'Ashen Khopesh',
			damage: damage('STR', 4),
			properties: 'slash, versatile',
			description:
				'On a strong hit the blade sheds embers, and the target takes +2 fire damage until the end of their next turn.',
			cost: 1350,
			load: 2,
			location: 'storage' as const,
			uses: 0,
			durability: 'd10' as const,
			quality: 5,
		},
		{
			id: generateId(),
			// No description: the candidate rule must leave this one out of the deck
			// until the reviewer asks to see everything (D4, D6).
			name: 'Spare Bronze Dagger',
			damage: damage('AGI', 2),
			properties: 'light, thrown',
			description: '',
			cost: 20,
			load: 1,
			location: 'storage' as const,
			uses: 0,
			durability: 'd6' as const,
		},
	]

	const treasureItems: Character['items']['items'] = stash

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
			// A real folk, so the Folk abilities below can be `folk.json`'s own and
			// the ability deck's folk card has something true to be titled from
			// (M20 F6). It said `Akashic`, which is not a folk, not a culture, and
			// is in no document in `docs/`.
			folk: 'Gnome',
			description:
				'Built for reviewing the sheet rather than for playing: every ability category, every action type, talent ranks 1 to 5, a populated Quick Ref, and enough of everything to fill all four printed pages to their stated limits. Its abilities are the real entries from talents.json, combat-arts.json and folk.json.',
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
			// The folk's own language, since the folk is now a real one.
			languages: ['Tradespeak', 'Gnomish', 'Draconic'],
			abilities,
			/*
				Pinned across all four kinds, so every branch of the Quick Ref grouping
				has something in it: an Action, a Triggered, a Quick Action, a Passive
				and a Free, plus a weapon, an item and a spell.
			*/
			quickRefSelections: {
				abilities: [
					ids.cleave, // Action
					ids.manaShield, // Triggered
					ids.spellblade, // Quick Action
					ids.scentOfIllusions, // Passive
					ids.shadowSlip, // Free
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
			weapons: [...weapons, ...treasureWeapons],
			items: [
				...wornItems,
				...unslottedWorn,
				...carriedItems,
				...treasureItems,
			],
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
