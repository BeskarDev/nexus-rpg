// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')

const autoKeywordPlugin = require('./src/remark/auto-keyword-plugin');

/** @type {import('@docusaurus/types').Config} */
const config = {
	title: 'Nexus RPG',
	tagline: 'Welcome to Nexus RPG. A sword and sorcery TTRPG with wide mechanical options set in a world inspired by real-world ancient cultures from across the earth.\n\nIn this game, you will play as a daring group of adventurers with individual skill sets. Choose freely from different skills, which each provide different sets of abilities, to craft your character.',
	favicon: 'img/favicon.ico',

	// Set the production url of your site here
	url: 'https://nexus-rpg-d04d1.web.app/',
	// Set the /<baseUrl>/ pathname under which your site is served
	// For GitHub pages deployment, it is often '/<projectName>/'
	baseUrl: '/',

	// GitHub pages deployment config.
	// If you aren't using GitHub pages, you don't need these.
	organizationName: 'facebook', // Usually your GitHub org/user name.
	projectName: 'docusaurus', // Usually your repo name.

	onBrokenLinks: 'throw',
	onBrokenMarkdownLinks: 'warn',

	// Even if you don't use internalization, you can use this field to set useful
	// metadata like html lang. For example, if your site is Chinese, you may want
	// to replace "en" with "zh-Hans".
	i18n: {
		defaultLocale: 'en',
		locales: ['en'],
	},

	headTags: [
		{
			tagName: 'link',
			attributes: {
				rel: 'preconnect',
				href: 'https://fonts.googleapis.com',
			},
		},
		{
			tagName: 'link',
			attributes: {
				rel: 'preconnect',
				href: 'https://fonts.gstatic.com',
				crossorigin: 'true',
			},
		},
		{
			tagName: 'link',
			attributes: {
				rel: 'stylesheet',
				href: 'https://fonts.googleapis.com/css2?family=Exo+2:wght@500&display=swap',
			},
		},
	],

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
						sidebarId: 'characterSheetSidebar',
						position: 'right',
						label: '⚙️ Tools',
					},
					{
						href: 'https://github.com/BeskarDev/nexus-rpg',
						label: 'GitHub',
						position: 'right',
					},
				],
			},
			prism: {
				theme: lightCodeTheme,
				darkTheme: darkCodeTheme,
			},
			zoom: {
				selector: '.markdown :not(em) > img',
				config: {
					// options you can specify via https://github.com/francoischalifour/medium-zoom#usage
					background: {
						light: 'rgb(255, 255, 255)',
						dark: 'rgb(50, 50, 50)',
					},
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

	plugins: [
		require.resolve('docusaurus-plugin-image-zoom'),
		[
			'docusaurus-plugin-dotenv',
			{
				path: './.env',
				systemvars: true,
			},
		],
	],

	presets: [
		[
			'classic',
			/** @type {import('@docusaurus/preset-classic').Options} */
			({
				docs: {
					sidebarPath: require.resolve('./sidebars.js'),
          remarkPlugins: [autoKeywordPlugin]
				},
				theme: {
					customCss: require.resolve('./src/css/custom.css'),
				},
			}),
		],
	],
}

module.exports = config
