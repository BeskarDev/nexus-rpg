import { useMemo } from 'react'
import parse from 'html-react-parser'
import { SheetLayout } from './SheetLayout'
import { Character, NpcRelationship, Relation } from '@site/src/types/Character'
import { Field, Prose } from './SheetPrimitives'

/**
 * The Personal sheet (M16 S3).
 *
 * This page was already the one that worked, because prose is what it is for and
 * prose does not need a form. So the rebuild is the lightest of the four: the
 * dotted rounded boxes become wash bands, and the two panels gain RULED LINES.
 *
 * The lines are the point. Relationships and notes are what a player adds to
 * between sessions, and a bordered box of empty white is a worse invitation to
 * write than a ruled one — which is why every paper form since forms existed has
 * had them.
 */
export const PersonalSheet: React.FC<{ char: Character }> = ({ char }) => {
	const { isNewFormat, groupedRelationships, allies, contacts, rivals } =
		useMemo<{
			isNewFormat: boolean
			groupedRelationships: Map<number, NpcRelationship[]>
			allies: Relation[]
			contacts: Relation[]
			rivals: Relation[]
		}>(() => {
			if (
				char.personal.npcRelationships &&
				char.personal.npcRelationships.length > 0
			) {
				const grouped = new Map<number, NpcRelationship[]>()
				char.personal.npcRelationships.forEach((npc) => {
					if (!grouped.has(npc.disposition)) grouped.set(npc.disposition, [])
					grouped.get(npc.disposition)!.push(npc)
				})
				return {
					isNewFormat: true,
					groupedRelationships: grouped,
					allies: [],
					contacts: [],
					rivals: [],
				}
			}
			return {
				isNewFormat: false,
				groupedRelationships: new Map(),
				allies: char.personal.allies || [],
				contacts: char.personal.contacts || [],
				rivals: char.personal.rivals || [],
			}
		}, [char.personal])

	const getDispositionLabel = (disposition: number): string => {
		if (disposition >= 2) return 'Intimate (+2)'
		if (disposition === 1) return 'Friendly (+1)'
		if (disposition === 0) return 'Indifferent (0)'
		if (disposition === -1) return 'Suspicious (-1)'
		if (disposition === -2) return 'Hostile (-2)'
		return 'Hateful (-3)'
	}

	const sortedDispositions = Array.from(groupedRelationships.keys()).sort(
		(a, b) => b - a,
	)

	const legacyList = (label: string, entries: Relation[]) =>
		entries.length > 0 && (
			<div style={{ marginBottom: '1mm' }}>
				<div className="pc-label">{label}</div>
				{entries.map((entry, index) => (
					<div key={entry.id || `${label}-${index}`}>{entry.description}</div>
				))}
			</div>
		)

	return (
		<SheetLayout>
			<div style={{ display: 'flex', gap: '1.5mm' }}>
				<Field
					label="Motivation"
					sigil="motivation"
					value={char.personal.motivation}
					grow
				/>
				<Field label="Height" value={char.personal.height} width="16mm" />
				<Field label="Weight" value={char.personal.weight} width="16mm" />
				<Field label="Age" value={char.personal.age} width="12mm" />
			</div>

			<Prose label="Physical Description" sigil="description" weight={1}>
				{char.personal.description}
			</Prose>

			<div
				style={{
					display: 'flex',
					gap: '2mm',
					flexGrow: 3,
					flexBasis: 0,
					minHeight: 0,
					alignItems: 'stretch',
				}}
			>
				<div style={{ width: '50%', display: 'flex', minHeight: 0 }}>
					<Prose label="NPC Relationships" sigil="figure-pair">
						{isNewFormat
							? sortedDispositions.map((disposition) => (
									<div key={disposition} style={{ marginBottom: '1mm' }}>
										<div className="pc-label">
											{getDispositionLabel(disposition)}
										</div>
										{groupedRelationships
											.get(disposition)!
											.map((npc, index) => (
												<div key={npc.id || `npc-${index}`}>
													{npc.name} ({npc.role}): {npc.description}
												</div>
											))}
									</div>
								))
							: [
									legacyList('Allies', allies),
									legacyList('Contacts', contacts),
									legacyList('Rivals', rivals),
								]}
					</Prose>
				</div>
				<div style={{ width: '50%', display: 'flex', minHeight: 0 }}>
					<Prose label="Personal Notes" sigil="stylus">
						{parse(char.personal.notes || '')}
					</Prose>
				</div>
			</div>
		</SheetLayout>
	)
}
