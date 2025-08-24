# Copilot Agent Mode Setup

This repository includes a dedicated setup workflow for GitHub Copilot agents, following the [official GitHub customization guidelines](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/customize-the-agent-environment).

## Overview

The Copilot Agent Mode setup provides:
- **Automated dependency caching** for faster installations between sessions
- **Environment optimization** for agent-specific workflows
- **Quick reference commands** and project structure guidance
- **Non-interference** with standard development and CI processes

## Setup Components

### 1. Workflow File
- **Location**: `.github/workflows/copilot-setup-steps.yml`
- **Trigger**: Manual dispatch or repository dispatch events
- **Features**:
  - Auto-detects package manager (Yarn/NPM)
  - Implements intelligent dependency caching using `actions/cache`
  - Supports multiple cache strategies
  - Provides environment verification and summary

### 2. Setup Script
- **Location**: `.github/scripts/copilot-setup.sh`
- **Purpose**: Environment customization and optimization
- **Features**:
  - Sets agent-specific environment variables
  - Creates `.env.agent` configuration file
  - Generates `.copilot-commands.md` quick reference
  - Validates Docusaurus installation
  - Optimizes build settings for agent usage

## Usage

### Manual Trigger
You can manually trigger the setup workflow from the GitHub Actions tab:

1. Go to **Actions** → **Copilot Agent Environment Setup**
2. Click **Run workflow**
3. Choose cache strategy (auto/npm/yarn/skip)
4. Click **Run workflow**

### Agent Automatic Usage
The workflow automatically responds to `copilot-agent-setup` repository dispatch events when Copilot agents need environment setup.

### Local Development
You can also run the setup script locally:

```bash
chmod +x .github/scripts/copilot-setup.sh
./.github/scripts/copilot-setup.sh
```

## Caching Strategy

The workflow implements intelligent dependency caching:

### Yarn Caching
- **Cache Path**: `~/.cache/yarn` and `node_modules`
- **Cache Key**: Based on `yarn.lock` hash
- **Restore Keys**: Fallback to previous Yarn caches

### NPM Caching
- **Cache Path**: `~/.npm` and `node_modules`
- **Cache Key**: Based on `package-lock.json` and `package.json` hash
- **Restore Keys**: Fallback to previous NPM caches

### Auto-Detection
The workflow automatically detects the appropriate package manager based on lockfiles:
- Finds `yarn.lock` → Uses Yarn
- Finds `package-lock.json` → Uses NPM
- Falls back to NPM if neither found

## Configuration Files

### `.env.agent`
Created during setup with agent-optimized settings:
```bash
COPILOT_AGENT_MODE=true
NODE_ENV=development
DOCUSAURUS_SSR_CONCURRENCY=1
DISABLE_ESLINT_PLUGIN=true
GENERATE_SOURCEMAP=false
FAST_REFRESH=false
```

### `.copilot-commands.md`
Quick reference guide for agents with:
- Available yarn commands
- Project structure overview
- Key files and directories
- Agent-specific tips and best practices

## Integration with Existing Workflows

The Copilot agent setup is designed to **not interfere** with existing CI/CD processes:

- **Separate workflow**: Isolated from Firebase deployment workflows
- **Manual trigger**: Only runs when explicitly requested
- **No build artifacts**: Doesn't affect production builds
- **Independent caching**: Uses separate cache keys from main workflows

## Customization

### Modifying the Setup Script
Edit `.github/scripts/copilot-setup.sh` to add project-specific customizations:

```bash
# Add custom environment variables
export CUSTOM_AGENT_SETTING=value

# Add agent-specific tool installations
# npm install -g custom-tool

# Add project-specific validations
# your-custom-validation-here
```

### Workflow Customization
Modify `.github/workflows/copilot-setup-steps.yml` to:
- Add additional setup steps
- Configure different Node.js versions
- Add custom validation steps
- Integrate with other tools

### Environment Variables
The setup supports these environment variables:

| Variable | Purpose | Default |
|----------|---------|---------|
| `COPILOT_AGENT_MODE` | Enables agent-specific optimizations | `true` |
| `DOCUSAURUS_SSR_CONCURRENCY` | Limits SSR concurrency | `1` |
| `DISABLE_ESLINT_PLUGIN` | Reduces noise in agent environments | `true` |
| `GENERATE_SOURCEMAP` | Controls sourcemap generation | `false` |
| `FAST_REFRESH` | Controls Fast Refresh feature | `false` |

## Troubleshooting

### Cache Issues
If you encounter dependency issues:
1. Use cache strategy "skip" in workflow dispatch
2. Or clear caches manually in GitHub repository settings

### Permission Issues
Ensure the setup script is executable:
```bash
chmod +x .github/scripts/copilot-setup.sh
```

### Environment Problems
Check the generated `.env.agent` file and ensure environment variables are properly set.

## Related Links

- [GitHub Copilot Agent Customization Guide](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/customize-the-agent-environment)
- [GitHub Actions Caching](https://docs.github.com/en/actions/using-workflows/caching-dependencies-to-speed-up-workflows)
- [Docusaurus Documentation](https://docusaurus.io/docs)

## Support

For issues with the Copilot agent setup:
1. Check the workflow run logs in GitHub Actions
2. Review the setup script output
3. Ensure all required files are present
4. Verify that the repository structure matches expectations

The setup is designed to be self-diagnostic and will provide clear error messages for common issues.