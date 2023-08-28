// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Nexus RPG',
  tagline: 'Welcome to Nexus RPG. A skill-based ancient fantasy TTRPG!',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://beskardev.github.io/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/nexus-rpg/',

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

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themes: [
    [
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      require.resolve("@easyops-cn/docusaurus-search-local"),
      ({
        hashed: true,
        language: ["en"],
      }),
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
            dark: 'rgb(50, 50, 50)'
          }
        }
      },
      footer: {
        logo: {
          alt: 'Nexus RPG Logo',
          src: 'img/logo.png',
          href: 'https://github.com/BeskarDev',
          width: 51,
          height: 51,
        },
        copyright: `Copyright © ${new Date().getFullYear()} BeskarDev - Art generated with https://leonardo.ai/`,
      },
    }),

    plugins: [require.resolve("docusaurus-plugin-image-zoom")]
};

module.exports = config;
