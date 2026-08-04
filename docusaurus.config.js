// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const { themes: prismThemes } = require('prism-react-renderer')
// Warm-neutral gruvbox pair: sits on the cream/obsidian surfaces without the
// cool blue cast of github/dracula. Syntax hues stay distinguishable in both.
const lightCodeTheme = prismThemes.gruvboxMaterialLight
const darkCodeTheme = prismThemes.gruvboxMaterialDark

const autoKeywordPlugin = require('./src/remark/auto-keyword-plugin')
const tableChipsPlugin = require('./src/remark/table-chips-plugin')
const chapterSigilPlugin = require('./src/remark/chapter-sigil-plugin')
const autoColumnsPlugin = require('./src/remark/auto-columns-plugin')

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
			// Branded social card: parchment + bronze frame, Cinzel title, rune
			// sigil (M4 Half B). Generated at 1200x630 from the codex tokens.
			image: 'img/social-card.png',
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
				// Chapter sigils replace the old emoji labels — one mark per chapter
				// from the shared SigilIcon set (rendered via the `navbar-sigil--*`
				// mask rules in custom.css). Labels stay as plain text; the two
				// right-side items keep `navbar-icon-with-label` so they show the
				// sigil only on desktop (label restored on mobile).
				items: [
					{
						type: 'docSidebar',
						sidebarId: 'basicRulesSidebar',
						position: 'left',
						label: 'Basic Rules',
						className: 'navbar-sigil navbar-sigil--sun',
					},
					{
						type: 'docSidebar',
						sidebarId: 'adventurerSidebar',
						position: 'left',
						label: 'Adventurers',
						className: 'navbar-sigil navbar-sigil--ziggurat',
					},
					{
						type: 'docSidebar',
						sidebarId: 'statisticsSidebar',
						position: 'left',
						label: 'Statistics',
						className: 'navbar-sigil navbar-sigil--tablet',
					},
					{
						type: 'docSidebar',
						sidebarId: 'equipmentSidebar',
						position: 'left',
						label: 'Equipment',
						className: 'navbar-sigil navbar-sigil--anvil',
					},
					{
						type: 'docSidebar',
						sidebarId: 'combatSidebar',
						position: 'left',
						label: 'Combat',
						className: 'navbar-sigil navbar-sigil--blades',
					},
					{
						type: 'docSidebar',
						sidebarId: 'sceneSidebar',
						position: 'left',
						label: 'Scenes',
						className: 'navbar-sigil navbar-sigil--hourglass',
					},
					{
						type: 'docSidebar',
						sidebarId: 'magicSidebar',
						position: 'left',
						label: 'Magic',
						className: 'navbar-sigil navbar-sigil--rune',
					},
					{
						type: 'docSidebar',
						sidebarId: 'creatureSidebar',
						position: 'left',
						label: 'Creatures',
						className: 'navbar-sigil navbar-sigil--serpent',
					},
					{
						type: 'docSidebar',
						sidebarId: 'gmToolsSidebar',
						position: 'right',
						label: 'GM Tools',
						className: 'navbar-sigil navbar-sigil--key navbar-icon-with-label',
						title: 'GM Tools',
					},
					{
						type: 'docSidebar',
						sidebarId: 'characterSheetSidebar',
						position: 'right',
						label: 'Characters',
						className:
							'navbar-sigil navbar-sigil--scroll navbar-icon-with-label',
						title: 'Character Sheet',
					},
					// The GitHub mark used to sit here. It moved to the footer's
					// "Tools & Source" column: it is a project-provenance link, not
					// navigation, and on mobile it was one of three 32px icons
					// crowding a bar that had no room for them.
				],
			},
			prism: {
				theme: lightCodeTheme,
				darkTheme: darkCodeTheme,
			},
			zoom: {
				// D5 (b): portraits and reference figures only. A banner is mood art
				// with no detail to inspect, and zooming one now lifts it out of its
				// plate for nothing.
				//
				// The selector names the WEIGHTS via `data-plate-weight`, not the
				// plate's classes — CSS-module names are hashed at build time, so a
				// class selector here would work in dev and match nothing in prod.
				// The old `.markdown :not(em) > img` is not narrowed by the wrapping:
				// the <img> is still a descendant of a non-`em` parent, so every
				// banner would keep zooming.
				selector:
					'.markdown img[data-plate-weight="inline"], .markdown img[data-plate-weight="figure"]',
				// docusaurus-plugin-image-zoom reads background off zoom.background
				// (NOT zoom.config.background — nesting it there silently falls back
				// to the plugin defaults). Tints match the M2a parchment / obsidian
				// tokens so the zoom flash stays on-palette.
				background: {
					light: '#f2eadc',
					dark: '#16120f',
				},
			},
			// The footer is the codex's colophon: an index of the book's parts, then
			// the provenance block. It carried no links at all before, so the sun
			// disc was the only thing in it and it read as spent space.
			//
			// No `logo` key: the Footer/Layout swizzle supplies its own crest for
			// that slot (the disc seated inline with the wordmark), so anything set
			// here would be discarded.
			footer: {
				links: [
					{
						title: 'The Rules',
						items: [
							{ label: 'Basic Rules', to: '/docs/basic-rules/how-to-roll' },
							{ label: 'Adventurers', to: '/docs/adventurers/folk' },
							{ label: 'Statistics', to: '/docs/statistics/attributes' },
							{ label: 'Equipment', to: '/docs/equipment/items' },
						],
					},
					{
						title: 'At the Table',
						items: [
							{ label: 'Combat', to: '/docs/combat/combat-scenes' },
							{ label: 'Scenes', to: '/docs/scenes/scenes-time-intervals' },
							{ label: 'Magic', to: '/docs/magic/magic-spells/' },
							{ label: 'Creatures', to: '/docs/creatures/mounts-companions/' },
						],
					},
					{
						title: 'Tools & Source',
						items: [
							{
								label: 'Character Sheet',
								to: '/docs/character-sheet/character-sheet',
							},
							{ label: 'GM Tools', to: '/docs/gm-tools/index' },
							{
								label: 'GitHub Repository',
								href: 'https://github.com/BeskarDev/nexus-rpg',
							},
							{
								label: 'License Deed',
								href: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
							},
						],
					},
				],
				// Rendered with dangerouslySetInnerHTML by Footer/Copyright, so the
				// markup here is the whole provenance block, not just a line.
				copyright: [
					`<p class="footer__legal">Nexus RPG by BeskarDev is licensed under <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" rel="license noopener noreferrer" target="_blank">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International</a>. You are free to share and adapt this work for non commercial purposes, as long as you credit the author and release your version under the same license.</p>`,
					`<p class="footer__legal">Current art is placeholder art generated by AI. It is not intended for commercial use or any physical publication.</p>`,
					`<p class="footer__legal footer__legal--mark">© ${new Date().getFullYear()} BeskarDev</p>`,
				].join(''),
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
					remarkPlugins: [
						chapterSigilPlugin,
						tableChipsPlugin,
						// Disable keyword linking on the random-tables pages: table cells
						// there contain creature names, place names and item fragments that
						// match RPG keywords (e.g. "Fire", "Large") but are flavor text,
						// not mechanical terms.
						[
							autoKeywordPlugin,
							{ disableInPaths: ['/01-random-tables/'] },
						],
						// LAST: it reparents top-level blocks into <Columns>, and the
						// plugins above walk the tree by node type, so running it earlier
						// would bury their targets one level deeper for no benefit.
						autoColumnsPlugin,
					],
				},
				// The sigil review gallery (`/dev/sigils`) is a development tool: it
				// exists so the 12–14px marks can be judged at the size they ship at.
				// Excluded from production builds outright, not just hidden, so it
				// never becomes a public route or a sitemap entry.
				pages: {
					exclude: [
						'**/_*.{js,jsx,ts,tsx,md,mdx}',
						'**/_*/**',
						'**/*.test.{js,jsx,ts,tsx}',
						'**/__tests__/**',
						...(process.env.NODE_ENV === 'production' ? ['**/dev/**'] : []),
					],
				},
				sitemap: {
					ignorePatterns: ['/dev/**'],
				},
				theme: {
					customCss: require.resolve('./src/css/custom.css'),
				},
			}),
		],
	],
}

module.exports = config
