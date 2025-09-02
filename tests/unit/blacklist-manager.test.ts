import { describe, it, expect, beforeEach } from 'vitest'
import { blacklistManager, isBlacklisted, BlacklistContext } from '../../src/remark/blacklist'

describe('Blacklist Manager', () => {
	beforeEach(() => {
		// Reload blacklist for each test to ensure clean state
		blacklistManager.reloadBlacklist()
	})

	describe('Basic Functionality', () => {
		it('should load blacklist configuration', () => {
			const blacklist = blacklistManager.getBlacklist()
			expect(Array.isArray(blacklist)).toBe(true)
		})

		it('should handle empty blacklist gracefully', () => {
			const context: BlacklistContext = {
				filePath: 'docs/test.md',
				pluginType: 'auto-keyword'
			}
			
			// A keyword that shouldn't be in blacklist
			const result = isBlacklisted('nonexistent', context, 0)
			expect(result).toBe(false)
		})
	})

	describe('File Path Matching', () => {
		it('should match exact file paths', () => {
			const context: BlacklistContext = {
				filePath: 'docs/06-scenes/06-harvesting-creature-parts.md',
				pluginType: 'auto-keyword'
			}
			
			const result = isBlacklisted('Tool', context, 0)
			expect(result).toBe(true)
		})

		it('should handle path variations', () => {
			const context: BlacklistContext = {
				filePath: '/home/project/docs/06-scenes/06-harvesting-creature-parts.md',
				pluginType: 'auto-keyword'
			}
			
			const result = isBlacklisted('Tool', context, 0)
			expect(result).toBe(true)
		})

		it('should not match different files', () => {
			const context: BlacklistContext = {
				filePath: 'docs/different-file.md',
				pluginType: 'auto-keyword'
			}
			
			const result = isBlacklisted('Tool', context, 0)
			expect(result).toBe(false)
		})
	})

	describe('Plugin Type Filtering', () => {
		it('should respect plugin-specific blacklist entries', () => {
			const autoKeywordContext: BlacklistContext = {
				filePath: 'docs/06-scenes/06-harvesting-creature-parts.md',
				pluginType: 'auto-keyword'
			}
			
			const tableChipsContext: BlacklistContext = {
				filePath: 'docs/06-scenes/06-harvesting-creature-parts.md',
				pluginType: 'table-chips'
			}
			
			// 'Tool' is blacklisted for auto-keyword but not table-chips
			expect(isBlacklisted('Tool', autoKeywordContext, 0)).toBe(true)
			expect(isBlacklisted('Tool', tableChipsContext, 0)).toBe(false)
		})

		it('should handle "both" plugin setting', () => {
			// We need a test case configured for both plugins
			// For now, test with a theoretical entry
			const context1: BlacklistContext = {
				filePath: 'docs/test-both.md',
				pluginType: 'auto-keyword'
			}
			
			const context2: BlacklistContext = {
				filePath: 'docs/test-both.md',
				pluginType: 'table-chips'
			}
			
			// Since no such entry exists in our test config, both should return false
			expect(isBlacklisted('test', context1, 0)).toBe(false)
			expect(isBlacklisted('test', context2, 0)).toBe(false)
		})
	})

	describe('Match Index Handling', () => {
		it('should exclude specific match indices', () => {
			const context: BlacklistContext = {
				filePath: 'docs/06-scenes/06-harvesting-creature-parts.md',
				pluginType: 'auto-keyword'
			}
			
			// First occurrence (index 0) should be blacklisted
			expect(isBlacklisted('Tool', context, 0)).toBe(true)
			
			// Second occurrence (index 1) should not be blacklisted
			expect(isBlacklisted('Tool', context, 1)).toBe(false)
		})

		it('should exclude all matches when matchIndex is not specified', () => {
			const context: BlacklistContext = {
				filePath: 'docs/07-magic/03-metamagic-arts.md',
				pluginType: 'table-chips'
			}
			
			// 'fire' should be blacklisted for all occurrences
			expect(isBlacklisted('fire', context, 0)).toBe(true)
			expect(isBlacklisted('fire', context, 1)).toBe(true)
			expect(isBlacklisted('fire', context, 5)).toBe(true)
		})
	})

	describe('Case Sensitivity', () => {
		it('should handle case-insensitive keyword matching', () => {
			const context: BlacklistContext = {
				filePath: 'docs/06-scenes/06-harvesting-creature-parts.md',
				pluginType: 'auto-keyword'
			}
			
			// Test different cases of the same keyword
			expect(isBlacklisted('tool', context, 0)).toBe(true)
			expect(isBlacklisted('TOOL', context, 0)).toBe(true)
			expect(isBlacklisted('Tool', context, 0)).toBe(true)
		})
	})

	describe('Error Handling', () => {
		it('should handle malformed blacklist gracefully', () => {
			// Test with invalid context
			const context: BlacklistContext = {
				filePath: '',
				pluginType: 'auto-keyword'
			}
			
			const result = isBlacklisted('test', context, 0)
			expect(typeof result).toBe('boolean')
		})

		it('should handle missing file path', () => {
			const context: BlacklistContext = {
				filePath: '',
				pluginType: 'auto-keyword'
			}
			
			const result = isBlacklisted('Tool', context, 0)
			expect(result).toBe(false)
		})
	})
})