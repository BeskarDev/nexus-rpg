import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'
import { htmlToMarkdownLines } from '@site/src/utils/content-gen/spell-effect-parser'

const JSON_FILE = path.resolve(
	__dirname,
	'../../src/utils/data/json/conditions.json',
)

interface Condition {
	name: string
	description: string
}

const conditions: Condition[] = JSON.parse(fs.readFileSync(JSON_FILE, 'utf-8'))

describe('conditions content generation', () => {
	it('has a well-formed record for every condition', () => {
		expect(conditions.length).toBeGreaterThan(0)
		for (const c of conditions) {
			expect(typeof c.name).toBe('string')
			expect(c.name.trim()).not.toBe('')
			expect(typeof c.description).toBe('string')
			expect(c.description.trim()).not.toBe('')
		}
	})

	it('converts every condition description to markdown without throwing (fail-loud corpus guard)', () => {
		for (const c of conditions) {
			const lines = htmlToMarkdownLines(c.description, c.name)
			expect(lines.length).toBeGreaterThan(0)
		}
	})

	it('fails loudly on an unexpected HTML tag in a description', () => {
		expect(() => htmlToMarkdownLines('<div>oops</div>', 'bad')).toThrow()
	})
})
