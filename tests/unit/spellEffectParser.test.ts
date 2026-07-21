import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'
import {
	parseSpellEffect,
	normalizePlaceholder,
	validateSpellRecord,
} from '@site/src/utils/content-gen/spell-effect-parser'

const prose = (p: { nodes: { kind: string; text: string }[] }) =>
	p.nodes.filter((n) => n.kind === 'prose').map((n) => n.text)
const levels = (p: {
	nodes: { kind: string; level?: string; text: string }[]
}) =>
	p.nodes
		.filter((n) => n.kind === 'success')
		.map((n) => ({ level: n.level, text: n.text }))

describe('parseSpellEffect', () => {
	it('orders a standard entry as body → weak/strong/critical → trailing prose', () => {
		const effect =
			'You create a small flame in your palm. It provides light at a close range. You can throw the flame as a projectile.' +
			'<br/><strong>Weak.</strong><em> </em>Deals +2 fire damage. ' +
			'<br/><strong>Strong.</strong> Deals +4 fire damage and the target suffers burning (2) for a short duration.' +
			'<br/><strong>Critical.</strong> Deals +6 fire damage and the target suffers burning (4) for a short duration.' +
			'<br/>You can also use the flame to ignite flammable materials in range, such as tinder or straw.'
		const parsed = parseSpellEffect(effect, 'Flickering Flame')
		expect(parsed.nodes.map((n) => n.kind)).toEqual([
			'prose',
			'success',
			'success',
			'success',
			'prose',
		])
		expect(prose(parsed)[0]).toBe(
			'You create a small flame in your palm. It provides light at a close range. You can throw the flame as a projectile.',
		)
		expect(levels(parsed).map((l) => l.level)).toEqual(['weak', 'strong', 'critical'])
		expect(levels(parsed)[0].text).toBe('Deals +2 fire damage.')
		expect(levels(parsed)[1].text).toContain('burning (2)')
		expect(prose(parsed)[1]).toBe(
			'You can also use the flame to ignite flammable materials in range, such as tinder or straw.',
		)
	})

	it('handles an entry with no trailing prose', () => {
		const effect =
			'You conjure a short spray of acid.' +
			'<br/><strong>Weak.</strong> Deal +2 acid damage.' +
			'<br/><strong>Strong.</strong> Deal +4 acid damage.' +
			'<br/><strong>Critical.</strong> Deal +6 acid damage.'
		const parsed = parseSpellEffect(effect, 'Acid Splash')
		expect(prose(parsed)).toHaveLength(1)
		expect(levels(parsed)).toHaveLength(3)
		expect(parsed.nodes[parsed.nodes.length - 1].kind).toBe('success')
	})

	it('converts <em> emphasis to markdown italics in body prose', () => {
		const effect =
			'Target one creature suffering from your <em>Death Mark</em>.' +
			'<br/><strong>Weak.</strong> Deal +6 necrotic damage.' +
			'<br/><strong>Strong.</strong> Deal +12 necrotic damage.' +
			'<br/><strong>Critical.</strong> Deal +18 necrotic damage.'
		const parsed = parseSpellEffect(effect, 'Harvest the Mark')
		expect(prose(parsed)[0]).toBe('Target one creature suffering from your *Death Mark*.')
	})

	it('treats an effect with no Weak/Strong/Critical as pure prose', () => {
		// Choice-based spell (Temper Heat): bold sub-options are NOT success levels.
		const effect =
			'You force the heat to flow into or out of a small area.' +
			'<br/>On a success, choose one:' +
			'<br/>- <strong>Warm.</strong> Draw warmth into the target.' +
			'<br/>- <strong>Chill.</strong> Draw the warmth out.'
		const parsed = parseSpellEffect(effect, 'Temper Heat')
		expect(levels(parsed)).toEqual([])
		expect(prose(parsed)).toHaveLength(1)
		expect(prose(parsed)[0]).toContain('**Warm.**')
		expect(prose(parsed)[0]).toContain('**Chill.**')
		expect(prose(parsed)[0].split('\n').length).toBeGreaterThan(2)
	})

	it('supports multiple mode-labeled success runs (Force Surge)', () => {
		const effect =
			'Choose one of the following effects:' +
			'<br/><br/><strong>Constrict.</strong> They are briefly restrained.' +
			'<br/><strong>Weak.</strong> Deal +4 force damage.' +
			'<br/><strong>Strong.</strong> Deal +8 force damage.' +
			'<br/><strong>Critical.</strong> Deal +12 force damage.' +
			'<br/><br/><strong>Slam.</strong> Target one creature.' +
			'<br/><strong>Weak.</strong> Deal +6 force damage.' +
			'<br/><strong>Strong.</strong> Deal +12 force damage.' +
			'<br/><strong>Critical.</strong> Deal +18 force damage.'
		const parsed = parseSpellEffect(effect, 'Force Surge')
		expect(levels(parsed)).toHaveLength(6)
		// Two runs, each weak→strong→critical, with a prose mode label before each.
		expect(parsed.nodes.map((n) => n.kind)).toEqual([
			'prose', 'success', 'success', 'success',
			'prose', 'success', 'success', 'success',
		])
		expect(prose(parsed)[1]).toContain('**Slam.**')
	})

	it('throws on a partial run (Weak + Strong, no Critical)', () => {
		const effect =
			'You overwhelm a mind.' +
			'<br/><strong>Weak.</strong> Deal +0 psychic damage.' +
			'<br/><strong>Strong.</strong> Deal +2 psychic damage.'
		expect(() => parseSpellEffect(effect, 'Broken Spell')).toThrow(
			/each success run must be weak→strong→critical/,
		)
	})

	it('throws on levels out of order', () => {
		const effect =
			'Intro.' +
			'<br/><strong>Strong.</strong> a' +
			'<br/><strong>Weak.</strong> b' +
			'<br/><strong>Critical.</strong> c'
		expect(() => parseSpellEffect(effect, 'Scrambled')).toThrow(
			/each success run must be weak→strong→critical/,
		)
	})

	it('throws on unexpected HTML tags', () => {
		const effect =
			'Intro with a <span>bad</span> tag.' +
			'<br/><strong>Weak.</strong> a' +
			'<br/><strong>Strong.</strong> b' +
			'<br/><strong>Critical.</strong> c'
		expect(() => parseSpellEffect(effect, 'Tagged')).toThrow(/unexpected HTML tag/)
	})

	it('throws on an empty effect', () => {
		expect(() => parseSpellEffect('', 'Empty')).toThrow(/effect is empty/)
	})
})

describe('normalizePlaceholder', () => {
	it('maps "-" and blank to empty string, keeps real values', () => {
		expect(normalizePlaceholder('-')).toBe('')
		expect(normalizePlaceholder('')).toBe('')
		expect(normalizePlaceholder('quick')).toBe('quick')
	})
})

describe('validateSpellRecord', () => {
	const good = {
		name: 'Flickering Flame',
		rank: '0',
		focus: '0',
		target: 'vs. Dodge',
		range: 'Medium',
		properties: '-',
		heightened: '-',
		effect: 'x<br/><strong>Weak.</strong> a<br/><strong>Strong.</strong> b<br/><strong>Critical.</strong> c',
		discipline: 'Evocation',
	}

	it('accepts a well-formed record', () => {
		expect(() => validateSpellRecord(good, good.name)).not.toThrow()
	})

	it('throws when rank is not numeric', () => {
		expect(() => validateSpellRecord({ ...good, rank: 'I' }, 'Bad')).toThrow(
			/rank must be a whole number/,
		)
	})

	it('throws when a required field is missing', () => {
		const { effect, ...noEffect } = good
		expect(() => validateSpellRecord(noEffect, 'NoEffect')).toThrow(
			/field "effect" must be a string/,
		)
	})

	it('throws without a discipline or tradition', () => {
		const { discipline, ...noCat } = good
		expect(() => validateSpellRecord(noCat, 'NoCat')).toThrow(
			/discipline .* or tradition/,
		)
	})
})

describe('full JSON corpus parses cleanly (fail-loud guard)', () => {
	const jsonDir = path.join(__dirname, '../../src/utils/data/json')
	for (const file of ['arcane-spells.json', 'mystic-spells.json']) {
		it(`every entry in ${file} validates and parses`, () => {
			const entries = JSON.parse(
				fs.readFileSync(path.join(jsonDir, file), 'utf-8'),
			)
			expect(Array.isArray(entries)).toBe(true)
			for (const entry of entries) {
				const rec = validateSpellRecord(entry, entry?.name ?? '(unnamed)')
				// Must not throw for any real entry.
				parseSpellEffect(rec.effect, rec.name)
			}
		})
	}
})
