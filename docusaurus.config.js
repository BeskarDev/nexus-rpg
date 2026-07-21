// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const { themes: prismThemes } = require('prism-react-renderer')
// Warm-neutral gruvbox pair: sits on the cream/obsidian surfaces without the
// cool blue cast of github/dracula. Syntax hues stay distinguishable in both.
const lightCodeTheme = prismThemes.gruvboxMaterialLight
const darkCodeTheme = prismThemes.gruvboxMaterialDark

const autoKeywordPlugin = require('./src/remark/auto-keyword-plugin')
const tableChipsPlugin = require('./src/remark/table-chips-plugin')

// Load .env into process.env so the Firebase config can be injected into the
// client bundle at build time (the values are public Firebase web config).
require('dotenv').config({ quiet: true })

const FIREBASE_ENV_KEYS = [
	'FIREBASE_API_KEY',
	'FIREBASE_AUTH_DOMAIN',
	'FIREBASE_PROJECT_ID',
	'FIREBASE_STORAGE_BUCKET',
	'MESSAGING_SENDER_ID',
	'APP_ID',
	'MEASUREMENT_ID',
]

// Inject the Firebase env vars via the current bundler's DefinePlugin. This
// works with both webpack and Rspack, replacing docusaurus-plugin-dotenv
// (which is webpack-only and blocks the faster Rspack bundler).
function firebaseEnvPlugin() {
	return {
		name: 'firebase-env-plugin',
		configureWebpack(_config, _isServer, { currentBundler }) {
			const definitions = Object.fromEntries(
				FIREBASE_ENV_KEYS.map((key) => [
					`process.env.${key}`,
					JSON.stringify(process.env[key] ?? ''),
				]),
			)
			return {
				plugins: [new currentBundler.instance.DefinePlugin(definitions)],
			}
		},
	}
}

/** @type {import('@docusaurus/types').Config} */
const config = {
	title: 'Nexus RPG',
	tagline:
		'Welcome to Nexus RPG. A sword and sorcery TTRPG with wide mechanical options set in a world inspired by real-world ancient cultures from across the earth.\n\nIn this game, you will play as a daring group of adventurers with individual skill sets. Choose freely from different skills, which each provide different sets of abilities, to craft your character.',
	favicon: 'img/favicon.ico',

	// Set the production url of your site here
	url: 'https://nexus-rpg-d04d1.web.app/',
	// Set the /<baseUrl>/ pathname under which your site is served
	// For GitHub pages deployment, it is often '/<projectName>/'
	baseUrl: '/',

	// Repository metadata (used for edit links and deployment tooling).
	organizationName: 'BeskarDev', // GitHub org/user name.
	projectName: 'nexus-rpg', // Repo name.

	onBrokenLinks: 'throw',

	// Opt into the full Rust-based build toolchain (Rspack bundler, SWC
	// transpile/minify, Lightning CSS) plus the v4 future flags so the site
	// is ready for the next major.
	future: {
		v4: true,
		faster: true,
	},

	markdown: {
		hooks: {
			onBrokenMarkdownLinks: 'warn',
		},
	},

	// Even if you don't use internalization, you can use this field to set useful
	// metadata like html lang. For example, if your site is Chinese, you may want
	// to replace "en" with "zh-Hans".
	i18n: {
		defaultLocale: 'en',
		locales: ['en'],
	},

	themes: [
		[
			/** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
			require.resolve('@easyops-cn/docusaurus-search-local'),
			{
				hashed: true,
				language: ['en'],
			},
		],
	],

	themeConfig:
		/** @type {import('@docusaurus/preset-classic').ThemeConfig} */
		({
			// Replace with your project's social card
			image: 'img/docusaurus-social-card.jpg',
			colorMode: {
				// Parchment is the hero look: light by default, system pref respected.
				defaultMode: 'light',
				respectPrefersColorScheme: true,
			},
			docs: {
				sidebar: {
					hideable: true,
					autoCollapseCategories: true,
				},
			},
			navbar: {
				title: 'Nexus RPG',
				logo: {
					alt: 'Nexus RPG logo',
					src: 'img/logo.png',
				},
				items: [
					{
						type: 'docSidebar',
						sidebarId: 'basicRulesSidebar',
						position: 'left',
						label: '🎲 Basic Rules',
					},
					{
						type: 'docSidebar',
						sidebarId: 'adventurerSidebar',
						position: 'left',
						label: '👳‍♂️ Adventurers',
					},
					{
						type: 'docSidebar',
						sidebarId: 'statisticsSidebar',
						position: 'left',
						label: '📊 Statistics',
					},
					{
						type: 'docSidebar',
						sidebarId: 'equipmentSidebar',
						position: 'left',
						label: '👜 Equipment',
					},
					{
						type: 'docSidebar',
						sidebarId: 'combatSidebar',
						position: 'left',
						label: '⚔ Combat',
					},
					{
						type: 'docSidebar',
						sidebarId: 'sceneSidebar',
						position: 'left',
						label: '⏳ Scenes',
					},
					{
						type: 'docSidebar',
						sidebarId: 'magicSidebar',
						position: 'left',
						label: '🧙‍♂️ Magic',
					},
					{
						type: 'docSidebar',
						sidebarId: 'creatureSidebar',
						position: 'left',
						label: '🐲 Creatures',
					},
					{
						type: 'docSidebar',
						sidebarId: 'gmToolsSidebar',
						position: 'right',
						label: '⚙️ GM Tools',
						className: 'navbar-icon-with-label',
						title: 'GM Tools',
					},
					{
						type: 'docSidebar',
						sidebarId: 'characterSheetSidebar',
						position: 'right',
						label: '📜 Characters',
						className: 'navbar-icon-with-label',
						title: 'Character Sheet',
					},
					{
						href: 'https://github.com/BeskarDev/nexus-rpg',
						position: 'right',
						className: 'navbar-github-link',
						'aria-label': 'GitHub',
					},
				],
			},
			prism: {
				theme: lightCodeTheme,
				darkTheme: darkCodeTheme,
			},
			zoom: {
				selector: '.markdown :not(em) > img',
				// docusaurus-plugin-image-zoom reads background off zoom.background
				// (NOT zoom.config.background — nesting it there silently falls back
				// to the plugin defaults). Tints match the M2a parchment / obsidian
				// tokens so the zoom flash stays on-palette.
				background: {
					light: '#f2eadc',
					dark: '#16120f',
				},
			},
			footer: {
				logo: {
					alt: 'Nexus RPG Logo',
					src: 'img/logo.png',
					href: 'https://github.com/BeskarDev',
					width: 51,
					height: 51,
				},
				copyright: `Copyright © ${new Date().getFullYear()} BeskarDev - Placeholder Art is AI generated`,
			},
		}),

	plugins: [require.resolve('docusaurus-plugin-image-zoom'), firebaseEnvPlugin],

	presets: [
		[
			'classic',
			/** @type {import('@docusaurus/preset-classic').Options} */
			({
				docs: {
					sidebarPath: require.resolve('./sidebars.js'),
					remarkPlugins: [tableChipsPlugin, autoKeywordPlugin],
				},
				theme: {
					customCss: require.resolve('./src/css/custom.css'),
				},
			}),
		],
	],
}

module.exports = config
