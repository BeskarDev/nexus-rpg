import { useMemo } from 'react'
import parse from 'html-react-parser'
import { SheetLayout } from './SheetLayout'
import { Character, NpcRelationship, Relation } from '@site/src/types/Character'
import { Band, Field, ProseBlocks } from './SheetPrimitives'
import { splitProseBlocks } from './splitProseBlocks'

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
 *
 * ## M17 S5
 *
 * This is the one page D3's ban on general-purpose write-lines does NOT reach:
 * elsewhere they were filler standing in for content that had nowhere to go, and
 * here they are the surface a hand actually writes on. So the slice only tightens
 * the space: the four identity fields become one carved band instead of a loose
 * unnamed row, and the physical description gives a larger share of the page to
 * the two panels that are actually added to during play.
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

	/*
	 * One block per relationship, in disposition order, each carrying its group's
	 * heading when it opens the group.
	 *
	 * The cut is per RELATIONSHIP rather than per disposition group, because a
	 * group is as long as the player made it and cutting a whole one costs more
	 * than it has to. Carrying the heading inside its first entry is what keeps a
	 * heading from being left behind at the bottom of the panel with nothing
	 * under it.
	 */
	const relationshipBlocks = useMemo(() => {
		if (isNewFormat) {
			return sortedDispositions.flatMap((disposition) =>
				groupedRelationships
					.get(disposition)!
					.filter((npc) => npc.name?.trim() || npc.description?.trim())
					.map((npc, index) => ({
						key: `${disposition}-${npc.id || index}`,
						node: (
							<>
								{index === 0 && (
									<div className="pc-label">
										{getDispositionLabel(disposition)}
									</div>
								)}
								<div className="pc-entry-clamp">
									{npc.name} ({npc.role}): {npc.description}
								</div>
							</>
						),
					})),
			)
		}

		/*
		 * Keyed by GROUP AND id: the pre-migration lists number their entries from
		 * 1 independently, so allies, contacts and rivals all contain an entry
		 * with id "1". Flattened into one list those are duplicate React keys, and
		 * the panel rendered a mix of stale and current nodes.
		 *
		 * Blank entries are dropped rather than printed. The empty character ships
		 * seven placeholders per list, and 21 empty blocks would fill the panel
		 * with nothing and push every real relationship into the overflow note.
		 */
		const legacyGroup = (label: string, entries: Relation[]) =>
			entries
				.filter((entry) => entry.description?.trim())
				.map((entry, index) => ({
					key: `${label}-${entry.id || index}`,
					node: (
						<>
							{index === 0 && <div className="pc-label">{label}</div>}
							<div className="pc-entry-clamp">{entry.description}</div>
						</>
					),
				}))

		return [
			...legacyGroup('Allies', allies),
			...legacyGroup('Contacts', contacts),
			...legacyGroup('Rivals', rivals),
		]
	}, [
		isNewFormat,
		sortedDispositions,
		groupedRelationships,
		allies,
		contacts,
		rivals,
	])

	/*
	 * Notes cut at a paragraph, which is the unit the player wrote in. The same
	 * splitter the card decks use, so "what counts as a block" is one rule in one
	 * place rather than two that drift.
	 */
	const noteBlocks = useMemo(
		() =>
			splitProseBlocks(char.personal.notes || '').map((block, index) => ({
				key: `note-${index}`,
				node: <>{parse(block)}</>,
			})),
		[char.personal.notes],
	)

	/*
	 * The description is bounded for the same reason the panels are: it is free
	 * text, and 6000 characters of it pushed the sheet 51.6mm past the trim. It
	 * sits above two panels that can give way, which is what made the overflow
	 * look like their fault.
	 */
	const descriptionBlocks = useMemo(
		() =>
			splitProseBlocks(char.personal.description || '').map((block, index) => ({
				key: `description-${index}`,
				node: <>{parse(block)}</>,
			})),
		[char.personal.description],
	)

	return (
		<SheetLayout crest="personal">
			{/* "Personal Information" says what the block is; "The Person" was a
				flourish (owner review). The band takes `figure` so it does not repeat
				the motivation star its own first cell carries. */}
			<Band name="Personal Information" sigil="figure">
				<Field
					label="Motivation"
					sigil="motivation"
					value={char.personal.motivation}
					grow
				/>
				<Field
					label="Height"
					sigil="height"
					value={char.personal.height}
					width="18mm"
				/>
				<Field
					label="Weight"
					sigil="weight"
					value={char.personal.weight}
					width="18mm"
				/>
				<Field label="Age" sigil="age" value={char.personal.age} width="14mm" />
			</Band>

			<ProseBlocks
				label="Physical Description"
				sigil="description"
				weight={1}
				blocks={descriptionBlocks}
				noun={{ one: 'paragraph', many: 'paragraphs' }}
			/>

			<div
				style={{
					display: 'flex',
					gap: '2mm',
					flexGrow: 4,
					flexBasis: 0,
					minHeight: 0,
					alignItems: 'stretch',
				}}
			>
				{/*
					`minWidth: 0` beside the height rule: a pasted URL or any other
					unbreakable run would otherwise widen the column and push its
					neighbour off the sheet sideways, which no height measurement sees.
				*/}
				<div
					style={{
						width: '50%',
						display: 'flex',
						minHeight: 0,
						minWidth: 0,
					}}
				>
					<ProseBlocks
						label="NPC Relationships"
						sigil="figure-pair"
						blocks={relationshipBlocks}
						noun={{ one: 'relationship', many: 'relationships' }}
					/>
				</div>
				<div
					style={{
						width: '50%',
						display: 'flex',
						minHeight: 0,
						minWidth: 0,
					}}
				>
					<ProseBlocks
						label="Personal Notes"
						sigil="stylus"
						blocks={noteBlocks}
						noun={{ one: 'paragraph of notes', many: 'paragraphs of notes' }}
					/>
				</div>
			</div>
		</SheetLayout>
	)
}
