/// <reference types="vitest" />
/// <reference types="@testing-library/jest-dom" />
import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: ['./src/test-setup.ts'],
		include: ['**/*.{test,spec}.{js,ts,jsx,tsx}'],
		exclude: [
			'node_modules/**',
			'dist/**',
			'build/**',
			'.docusaurus/**',
			'functions/**',
		],
		css: false,
		testTimeout: 15000, // Increase timeout to 15 seconds
		hookTimeout: 15000, // Increase hook timeout
		coverage: {
			provider: 'v8',
			reporter: ['text', 'html', 'json'],
			exclude: [
				'node_modules/**',
				'dist/**',
				'build/**',
				'.docusaurus/**',
				'coverage/**',
				'functions/**',
				'**/*.config.*',
				'**/*.d.ts',
				'src/test-setup.ts',
				// Exclude documentation and config files
				'sidebars.js',
				'src/pages/**',
				// Exclude internal tooling (remark plugins)
				'src/remark/**',
				// Exclude dev/mock files
				'src/dev/**',
				// Exclude pure type definitions
				'src/types/**',
			],
		},
		// Mock modules that are not available in jsdom
		server: {
			deps: {
				inline: ['@docusaurus/core', '@docusaurus/theme-classic'],
			},
		},
	},
	resolve: {
		alias: {
			'@site': path.resolve(__dirname, './'),
			'@': path.resolve(__dirname, './src'),
		},
	},
})
