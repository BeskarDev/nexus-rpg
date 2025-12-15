import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';

export default [
	{
		ignores: [
			'node_modules/**',
			'dist/**',
			'build/**',
			'functions/dist/**',
			'functions/lib/**',
			'coverage/**',
			'.docusaurus/**',
			'src/dev/mockData.ts', // Known to have many intentional type mismatches for testing
		],
	},
	// Main source files
	{
		files: ['src/**/*.{js,jsx,ts,tsx}'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaVersion: 2020,
				sourceType: 'module',
				ecmaFeatures: {
					jsx: true,
				},
			},
			globals: {
				React: 'readonly',
				// Browser globals
				navigator: 'readonly',
				setTimeout: 'readonly',
				setInterval: 'readonly',
				clearTimeout: 'readonly',
				clearInterval: 'readonly',
				window: 'readonly',
				document: 'readonly',
				console: 'readonly',
				HTMLElement: 'readonly',
				HTMLFormElement: 'readonly',
				HTMLInputElement: 'readonly',
				HTMLButtonElement: 'readonly',
				HTMLDivElement: 'readonly',
				File: 'readonly',
				FileList: 'readonly',
				FileReader: 'readonly',
				Image: 'readonly',
				URL: 'readonly',
				URLSearchParams: 'readonly',
				MouseEvent: 'readonly',
				localStorage: 'readonly',
				alert: 'readonly',
				Blob: 'readonly',
				JSX: 'readonly',
				// Node globals (for utilities)
				__dirname: 'readonly',
				__filename: 'readonly',
				process: 'readonly',
				global: 'readonly',
				crypto: 'readonly',
				require: 'readonly',
				module: 'readonly',
			},
		},
		plugins: {
			'@typescript-eslint': tsPlugin,
			react: reactPlugin,
		},
		rules: {
			...js.configs.recommended.rules,
			...tsPlugin.configs.recommended.rules,
			...reactPlugin.configs.recommended.rules,

			// Customize rules as needed
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
				},
			],
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/explicit-module-boundary-types': 'off',
			'@typescript-eslint/no-var-requires': 'off', // Allow require() statements in some files
			'react/react-in-jsx-scope': 'off', // Not needed in React 17+
			'react/prop-types': 'off', // Using TypeScript for prop types
			'react/display-name': 'off', // Not always necessary
			'react/jsx-key': 'off', // Sometimes intentional for component keys
			'react/no-unescaped-entities': 'off', // HTML entities can be verbose
			'no-console': [
				'warn',
				{
					allow: ['warn', 'error'],
				},
			],
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
	},
	// Test files with browser and test globals
	{
		files: ['tests/**/*.{ts,tsx}', '**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaVersion: 2020,
				sourceType: 'module',
				ecmaFeatures: {
					jsx: true,
				},
			},
			globals: {
				React: 'readonly',
				// Vitest/Jest globals
				describe: 'readonly',
				it: 'readonly',
				expect: 'readonly',
				beforeEach: 'readonly',
				afterEach: 'readonly',
				beforeAll: 'readonly',
				afterAll: 'readonly',
				test: 'readonly',
				jest: 'readonly',
				vi: 'readonly',
				// Node globals
				__dirname: 'readonly',
				__filename: 'readonly',
				global: 'readonly',
				process: 'readonly',
				crypto: 'readonly',
				// DOM globals
				HTMLElement: 'readonly',
				File: 'readonly',
				window: 'readonly',
				document: 'readonly',
				navigator: 'readonly',
				localStorage: 'readonly',
				HTMLFormElement: 'readonly',
				HTMLInputElement: 'readonly',
				HTMLButtonElement: 'readonly',
				HTMLDivElement: 'readonly',
				HTMLLinkElement: 'readonly',
				HTMLScriptElement: 'readonly',
			},
		},
		plugins: {
			'@typescript-eslint': tsPlugin,
			react: reactPlugin,
		},
		rules: {
			...js.configs.recommended.rules,
			...tsPlugin.configs.recommended.rules,
			...reactPlugin.configs.recommended.rules,

			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
				},
			],
			'@typescript-eslint/no-explicit-any': 'warn',
			'react/react-in-jsx-scope': 'off',
			'react/prop-types': 'off',
			'no-console': [
				'warn',
				{
					allow: ['warn', 'error', 'log'],
				},
			],
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
	},
	// Functions (Cloud Functions)
	{
		files: ['functions/src/**/*.ts'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaVersion: 2020,
				sourceType: 'module',
			},
			globals: {
				__dirname: 'readonly',
				__filename: 'readonly',
				global: 'readonly',
				process: 'readonly',
				crypto: 'readonly',
			},
		},
		plugins: {
			'@typescript-eslint': tsPlugin,
		},
		rules: {
			...js.configs.recommended.rules,
			...tsPlugin.configs.recommended.rules,
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
				},
			],
			'@typescript-eslint/no-explicit-any': 'warn',
			'no-console': [
				'warn',
				{
					allow: ['warn', 'error'],
				},
			],
		},
	},
];
