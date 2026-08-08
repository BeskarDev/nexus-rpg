import { describe, expect, it } from 'vitest'
import { bodyBlocks, splitHtmlBlocks } from '../splitBlocks'

describe('splitHtmlBlocks', () => {
	it('splits a body at its breaks', () => {
		expect(splitHtmlBlocks('One.<br/>Two.<br/>Three.')).toEqual([
			'One.',
			'Two.',
			'Three.',
		])
	})

	it('accepts every spelling of a break the content uses', () => {
		expect(splitHtmlBlocks('One.<br>Two.<br />Three.<BR/>Four.')).toHaveLength(
			4,
		)
	})

	it('drops the empty block a doubled break leaves behind', () => {
		// The cards used to collapse `<br/><br/>` by hand — after measuring the
		// uncollapsed string, which was one of F1's five reasons the count lied.
		expect(splitHtmlBlocks('One.<br/><br/>Two.')).toEqual(['One.', 'Two.'])
	})

	it('keeps markup inside a block intact', () => {
		expect(
			splitHtmlBlocks('<strong>(Rank 3)</strong> More.<br/>Next.'),
		).toEqual(['<strong>(Rank 3)</strong> More.', 'Next.'])
	})

	it('returns nothing for an empty or absent body', () => {
		expect(splitHtmlBlocks('')).toEqual([])
		expect(splitHtmlBlocks(undefined as unknown as string)).toEqual([])
	})
})

describe('bodyBlocks', () => {
	const EFFECT = 'You summon a circle.<br/>On a success, it appears.'
	const HEIGHTENED =
		'<strong>(Rank 2)</strong> Bigger.<br/><strong>(Rank 3)</strong> Biggest.'

	it('orders the effect before its heightened clauses', () => {
		const blocks = bodyBlocks(EFFECT, HEIGHTENED)
		expect(blocks.map((block) => block.section)).toEqual([
			'effect',
			'effect',
			'heightened',
			'heightened',
		])
	})

	it('gives each rank clause a block of its own', () => {
		// D3: never orphan a heightened heading from its text. Each clause carries
		// its own `(Rank n)` label, so a cut between two of them cannot do it —
		// the content's shape satisfies the rule, not a check.
		const blocks = bodyBlocks(EFFECT, HEIGHTENED)
		expect(blocks[2].html).toContain('(Rank 2)')
		expect(blocks[2].html).toContain('Bigger.')
		expect(blocks[3].html).toContain('(Rank 3)')
	})

	it('treats the JSON’s "-" as no heightened section', () => {
		expect(bodyBlocks(EFFECT, '-')).toHaveLength(2)
		expect(bodyBlocks(EFFECT)).toHaveLength(2)
	})
})
