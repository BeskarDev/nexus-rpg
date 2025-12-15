[![CC BY-NC-SA 4.0][cc-by-nc-sa-shield]][cc-by-nc-sa]

This work is licensed under a
[Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License][cc-by-nc-sa].

[![CC BY-NC-SA 4.0][cc-by-nc-sa-image]][cc-by-nc-sa]

[cc-by-nc-sa]: http://creativecommons.org/licenses/by-nc-sa/4.0/
[cc-by-nc-sa-image]: https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png
[cc-by-nc-sa-shield]: https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg

# Nexus RPG

Welcome to Nexus RPG. A sword and sorcery TTRPG with wide mechanical options set in a world inspired by real-world ancient cultures from across the earth.

In this game, you will play as a daring group of adventurers with individual skill sets. Choose freely from different skills, which each provide different sets of abilities, to craft your character.

> **Disclaimer**<br/>
> The rules of this game are still incomplete and everything is subject to change!<br/>
> Nexus RPG is a single-person passion project and has been in developement for the last 5 years. As only a close group of friends has yet played this game regurily, not every rule or character option has had the chance to be thorouly playtested.
> 

## 🤖 GitHub Copilot Agent Support

This repository includes optimized setup for GitHub Copilot agents with automated dependency caching and environment configuration. 

**Quick Setup**: The Copilot Agent workflow automatically handles environment setup when needed, or you can manually trigger it from the Actions tab.

📖 **Documentation**: See [`.github/COPILOT_AGENT_SETUP.md`](.github/COPILOT_AGENT_SETUP.md) for detailed setup instructions and customization options.

## 🚀 Development

This website is built using [Docusaurus 3](https://docusaurus.io/), a modern static website generator.

### Installation

```bash
yarn install
```

### Local Development

```bash
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```bash
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

```bash
yarn deploy
```

Builds the website and deploys it to Firebase Hosting.

## 📝 Content Management

### Notion Import Automation

**Automatically update docs from Notion exports!** This repository includes a complete automation system for importing Notion HTML exports directly into the documentation.

**Quick Start**:

```bash
cd src/utils/notion-import
./run-import.sh ../input/notion-export.zip
```

**Full Documentation**: [`NOTION_IMPORT.md`](NOTION_IMPORT.md) | [`src/utils/notion-import/README.md`](src/utils/notion-import/README.md)

### Plugin Blacklist System

This project includes automatic keyword and chip conversion plugins that enhance the documentation by converting specific terms to links or styled elements. However, sometimes these conversions are unwanted in certain contexts.

The blacklist system allows you to prevent automatic conversions for specific terms in particular locations.

**Blacklist Configuration**: [`src/remark/blacklist/blacklist.json`](src/remark/blacklist/blacklist.json)

**Full Documentation**: [`src/remark/blacklist/README.md`](src/remark/blacklist/README.md)

**Quick Example**:

```json
[
  {
    "file": "docs/example.md",
    "section": "Section Title",
    "keyword": "fire",
    "matchIndex": 0,
    "plugin": "table-chips"
  }
]
```

This would prevent the first occurrence of "fire" in the "Section Title" section of `docs/example.md` from being converted to a chip.

