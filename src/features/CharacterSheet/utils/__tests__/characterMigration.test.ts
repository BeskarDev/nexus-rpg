import { describe, expect, it } from 'vitest'
import { migrateCharacterData } from '../characterMigration'
import type { CharacterDocument } from '@site/src/types/Character'

/**
 * M13 S7 — a companion's wound FLAG becomes a wound COUNT.
 *
 * A companion has two Health Marks (`docs/08-creatures/01-mounts-companions`): at two Wounds it
 * is instantly dead. The sheet stored `wounded: boolean`, so the second mark — the one that
 * decides whether it lives — could not be recorded. Stored documents still carry the flag, and
 * these assertions pin the only reading of it that does not invent information.
 */
const withCompanions = (companions: unknown[]) =>
	({ companions }) as unknown as CharacterDocument

describe('migrateCharacterData — companion wounds', () => {
	it('reads a wounded companion as one wound', () => {
		const result = migrateCharacterData(
			withCompanions([
				{ id: 'a', name: 'Ashfoot', markdown: '', wounded: true },
			]),
		)
		expect(result.companions[0].wounds).toBe(1)
	})

	it('reads an unwounded companion as none', () => {
		const result = migrateCharacterData(
			withCompanions([
				{ id: 'a', name: 'Ashfoot', markdown: '', wounded: false },
			]),
		)
		expect(result.companions[0].wounds).toBe(0)
	})

	it('leaves an existing count alone, including the second mark', () => {
		const result = migrateCharacterData(
			withCompanions([
				{ id: 'a', name: 'Ashfoot', markdown: '', wounded: true, wounds: 2 },
			]),
		)
		expect(result.companions[0].wounds).toBe(2)
	})

	it('gives a companion with neither field a count of none', () => {
		const result = migrateCharacterData(
			withCompanions([{ id: 'a', name: 'Ashfoot', markdown: '' }]),
		)
		expect(result.companions[0].wounds).toBe(0)
	})
})
