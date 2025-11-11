import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock Firebase completely before any imports
vi.mock('firebase/app', () => ({
	initializeApp: vi.fn(() => ({})),
	getApps: vi.fn(() => [{}]),
	getApp: vi.fn(() => ({})),
}))

vi.mock('firebase/auth', () => ({
	getAuth: vi.fn(() => ({
		currentUser: null,
		onAuthStateChanged: vi.fn(),
	})),
	signInWithEmailAndPassword: vi.fn(),
	createUserWithEmailAndPassword: vi.fn(),
	signOut: vi.fn(),
	onAuthStateChanged: vi.fn(),
}))

vi.mock('firebase/firestore', () => ({
	getFirestore: vi.fn(() => ({})),
	doc: vi.fn(),
	getDoc: vi.fn().mockResolvedValue({
		exists: () => false,
		data: () => ({}),
	}),
	setDoc: vi.fn().mockResolvedValue(undefined),
	updateDoc: vi.fn().mockResolvedValue(undefined),
	collection: vi.fn(),
	getDocs: vi.fn().mockResolvedValue({ docs: [] }),
	query: vi.fn(),
	where: vi.fn(),
	orderBy: vi.fn(),
}))

// Mock window.matchMedia for responsive design tests
Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: vi.fn().mockImplementation((query) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: vi.fn(), // deprecated
		removeListener: vi.fn(), // deprecated
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn(),
	})),
})

// Mock ResizeObserver for responsive components
global.ResizeObserver = vi.fn().mockImplementation(() => ({
	observe: vi.fn(),
	unobserve: vi.fn(),
	disconnect: vi.fn(),
}))

// Mock document navigation
Object.defineProperty(window, 'location', {
	value: {
		href: 'http://localhost:3000',
		origin: 'http://localhost:3000',
		pathname: '/',
		search: '',
		hash: '',
	},
	writable: true,
})

// Set desktop screen size by default for consistent test environment
Object.defineProperty(window, 'innerWidth', {
	writable: true,
	configurable: true,
	value: 1920,
})

Object.defineProperty(window, 'innerHeight', {
	writable: true,
	configurable: true,
	value: 1080,
})

// Mock localStorage for character data persistence
const localStorageMock = {
	getItem: vi.fn(),
	setItem: vi.fn(),
	removeItem: vi.fn(),
	clear: vi.fn(),
}
Object.defineProperty(window, 'localStorage', {
	value: localStorageMock,
})

// Mock sessionStorage
Object.defineProperty(window, 'sessionStorage', {
	value: localStorageMock,
})

// Mock the useDeviceSize hook to return consistent desktop values
vi.mock('@site/src/features/CharacterSheet/utils/useDeviceSize', () => ({
	useDeviceSize: () => ({
		isMobile: false,
		viewChanged: false,
	}),
}))

// Mock Docusaurus dependencies
vi.mock('@docusaurus/useDocusaurusContext', () => ({
	default: () => ({
		siteConfig: {
			title: 'Test Site',
			url: 'http://localhost:3000',
			baseUrl: '/',
			customFields: {},
		},
		i18n: {
			currentLocale: 'en',
			locales: ['en'],
		},
	}),
}))

vi.mock('@docusaurus/theme-common', () => ({
	useThemeConfig: () => ({}),
	ThemeClassNames: {},
	useColorMode: () => ({
		colorMode: 'light',
		setColorMode: vi.fn(),
	}),
}))

// Mock Material-UI theme dependencies that might cause issues
vi.mock('@mui/material', async (importOriginal) => {
	const actual: any = await importOriginal()
	return {
		...actual,
		Experimental_CssVarsProvider: ({ children }: any) => children,
		experimental_extendTheme: (theme: any) => theme,
		useColorScheme: () => ({
			mode: 'light',
			setMode: vi.fn(),
			systemMode: 'light',
		}),
	}
})

// Mock console methods to reduce noise in tests
global.console = {
	...console,
	log: vi.fn(),
	warn: vi.fn(),
	error: vi.fn(),
}
