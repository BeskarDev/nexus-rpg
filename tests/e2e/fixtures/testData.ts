/**
 * Test data and fixtures for character sheet E2E tests
 */

export const TEST_CHARACTER_IDS = {
	MOCK_CHARACTER_1: 'mock-collection-mock-character-1',
	MOCK_CHARACTER_2: 'mock-collection-mock-character-2',
} as const

export const TEST_VIEWPORT_SIZES = {
	DESKTOP: { width: 1920, height: 1080 },
	TABLET: { width: 768, height: 1024 },
	MOBILE: { width: 375, height: 667 },
} as const

export const CHARACTER_SHEET_TABS = {
	STATISTICS: 0,
	SKILLS: 1,
	ITEMS: 2,
	SPELLS: 3,
	PERSONAL: 4,
	COMPANIONS: 5,
	PARTY: 6,
} as const

export const TAB_NAMES = [
	'Statistics',
	'Skills',
	'Items',
	'Spells',
	'Personal',
	'Companions',
	'Party'
] as const

export const TEST_VALUES = {
	ATTRIBUTE_VALUE: '12',
	HP_VALUE: '25',
	SKILL_RANK: '3',
	XP_VALUE: '50',
	COINS_VALUE: '100',
	CARRY_MODIFIER: '2',
	CHARACTER_NAME: 'Test Character',
	PERSONAL_NOTES: 'Test personal notes for the character.',
	ALLY_NAME: 'Test Ally',
	CONTACT_NAME: 'Test Contact',
	RIVAL_NAME: 'Test Rival',
} as const

export const EXPECTED_COMPONENTS = {
	STATISTICS: [
		'Strength', 'Agility', 'Spirit', 'Mind',
		'HP', 'AV', 'Parry', 'Dodge', 'Resist',
		'Fatigue', 'Rest'
	],
	SKILLS: [
		'XP', 'Combat Art', 'Talent', 'Spell', 'Feature',
		'Language', 'Profession', 'Add', 'Search'
	],
	ITEMS: [
		'Load', 'Carry', 'Inventory', 'Weapon', 'Equipment',
		'Coin', 'Add', 'Search', 'Settings'
	],
	SPELLS: [
		'Spell', 'Focus', 'Magic', 'Arcane', 'Mystic'
	],
	PERSONAL: [
		'Character', 'Allies', 'Contacts', 'Rivals',
		'Notes', 'Add', 'Edit'
	],
	COMPANIONS: [
		'Companion', 'Animal', 'Follower'
	],
	PARTY: [
		'Party', 'Member', 'Shared', 'Notes'
	]
} as const

export const COMMON_SELECTORS = {
	TAB_BUTTON: (index: number) => `button[id="${index}"]`,
	NUMBER_INPUT: 'input[type="number"]',
	TEXT_INPUT: 'input[type="text"]',
	TEXTAREA: 'textarea',
	ADD_BUTTON: 'button:has([data-testid="AddCircleIcon"])',
	SEARCH_BUTTON: 'button:has([data-testid="SearchIcon"])',
	DELETE_BUTTON: 'button:has([data-testid="DeleteIcon"])',
	EDIT_BUTTON: 'button:has([data-testid="BuildIcon"])',
	CLOSE_BUTTON: 'button:has([data-testid="CloseIcon"])',
	DIALOG: '[role="dialog"]',
	ACCORDION: '.MuiAccordion-root',
	MENU: '[role="menu"]',
} as const

export const ERROR_SCENARIOS = {
	INVALID_CHARACTER_ID: 'invalid-character-id',
	MALFORMED_URL: '/docs/tools/character-sheet?id=<script>alert("xss")</script>',
	MISSING_CHARACTER_ID: '',
} as const

export const WAIT_TIMES = {
	PAGE_LOAD: 5000,
	COMPONENT_LOAD: 1000,
	INTERACTION: 500,
	AUTOSAVE: 2000,
	DIALOG_ANIMATION: 1000,
} as const

export const SCREENSHOT_NAMES = {
	STATISTICS_COMPONENTS: 'statistics-tab-components.png',
	SKILLS_COMPONENTS: 'skills-tab-components.png',
	ITEMS_COMPONENTS: 'items-tab-components.png',
	SPELLS_COMPONENTS: 'spells-tab-components.png',
	PERSONAL_COMPONENTS: 'personal-tab-components.png',
	COMPANIONS_COMPONENTS: 'companions-tab-components.png',
	PARTY_COMPONENTS: 'party-tab-components.png',
	TAB_NAVIGATION: 'tab-navigation.png',
	RESPONSIVE_MOBILE: 'responsive-mobile.png',
	RESPONSIVE_TABLET: 'responsive-tablet.png',
	RESPONSIVE_DESKTOP: 'responsive-desktop.png',
	ERROR_HANDLING: 'error-handling.png',
} as const