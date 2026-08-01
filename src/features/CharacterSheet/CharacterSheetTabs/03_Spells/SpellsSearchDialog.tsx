import React, { useMemo, useState } from 'react'
import { Typography, Button } from '@mui/material'
import {
	SheetChip,
	EntryProse,
	entrySummary,
	FilterSelect,
} from '../../components'
import { SearchDialog } from '../../components'
import type { SearchDialogColumn } from '../../components'
import arcaneSpellsData from '../../../../utils/data/json/arcane-spells.json'
import mysticSpellsData from '../../../../utils/data/json/mystic-spells.json'
import { CharacterDocument } from '../../../../types/Character'
import { buildSpellFromData } from '../../utils/spellFactory'
import { maxLearnableSpellRank } from '../../utils/spellAccess'

/**
 * The discipline colour map is gone (M13 S8) — see `EquipmentSearchDialog` for the
 * general reason. This one is worth its own note: the map had fourteen entries and
 * six colours, so Evocation, Tempest and War were one hue and Telepathy, Death and
 * Peace were another. Readers cannot learn an identity that three subjects share.
 *
 * Not the magic register either, though a discipline is unambiguously magic. S5
 * spent `--cs-magic` on three things — the cast plate, the focus pool, the catalyst
 * — and the milestone's rule is that cyan reads as sorcery only while it stays
 * rare. A filter facet inside a search dialog is not worth the fourth spend.
 */

export type SpellsSearchDialogProps = {
	open: boolean
	onClose: () => void
	onImportSpells: (spells: any[]) => void
	character: CharacterDocument
	magicType: 'Arcana' | 'Mysticism'
}

type SpellData = {
	name: string
	discipline?: string // for arcane spells
	tradition?: string // for mystic spells
	rank: string
	focus: string
	target: string
	range: string
	properties: string
	effect: string
	heightened?: string
}

export const SpellsSearchDialog: React.FC<SpellsSearchDialogProps> = ({
	open,
	onClose,
	onImportSpells,
	character,
	magicType,
}) => {
	const [selectedSpells, setSelectedSpells] = useState<Set<string>>(new Set())
	const [rankFilter, setRankFilter] = useState<string[]>([])
	const [typeFilter, setTypeFilter] = useState<string[]>([])

	const spellsData =
		magicType === 'Arcana' ? arcaneSpellsData : mysticSpellsData
	const typeFieldKey = magicType === 'Arcana' ? 'discipline' : 'tradition'
	const typeLabel = magicType === 'Arcana' ? 'Discipline' : 'Tradition'

	const rankOptions = useMemo(
		() =>
			Array.from(
				new Set((spellsData as SpellData[]).map((spell) => spell.rank)),
			).sort((a, b) => Number(a) - Number(b)),
		[spellsData],
	)

	const typeOptions = useMemo(
		() =>
			Array.from(
				new Set(
					(spellsData as SpellData[]).map(
						(spell) => spell[typeFieldKey as keyof SpellData] as string,
					),
				),
			).filter(Boolean),
		[spellsData, typeFieldKey],
	)

	const filteredSpells = useMemo(
		() =>
			(spellsData as SpellData[]).filter((spell) => {
				const rankMatch =
					!rankFilter.length || rankFilter.includes(String(spell.rank))
				const typeValue =
					(spell[typeFieldKey as keyof SpellData] as string) || ''
				const typeMatch = !typeFilter.length || typeFilter.includes(typeValue)
				return rankMatch && typeMatch
			}),
		[spellsData, rankFilter, typeFilter, typeFieldKey],
	)

	const clearFilters = () => {
		setRankFilter([])
		setTypeFilter([])
	}

	/*
		Where each spell stands on THIS character's sheet (M13 S8b, F11.2).

		`character` was declared and never read. The ceiling is `maxLearnableSpellRank`
		— the magic skill's rank OR a spell-granting talent's, whichever reaches
		higher. The first pass used the skill alone and was wrong on the owner's
		correction: `Divine Scholar` is a Lore talent that grants mystic spells, so a
		character with no Mysticism can legitimately know them. See `spellAccess.ts`.

		What is NOT checked is the discipline half of the rule. A learned spell is
		stored as `Spell`, which has no discipline field, so the sheet does not know
		which disciplines a character has adopted; checking it would mean inventing
		the data. For the same reason `owned` matches on NAME alone — the dialog keys
		rows by `name|discipline` because two arcane spells are called *Astral Body*,
		but the sheet records only the name, so learning either marks both. Named
		here rather than papered over; the fix is a discipline on `Spell`, which is a
		schema change and a migration.
	*/
	const standingOf = useMemo(() => {
		const abilities = character.skills?.abilities ?? []
		const known = new Set(
			(character.spells?.spells ?? []).map((spell) =>
				spell.name.trim().toLowerCase(),
			),
		)
		const ceiling = maxLearnableSpellRank(
			magicType,
			character.skills?.skills ?? [],
			abilities,
		)

		return (spell: SpellData) => {
			const owned = known.has(spell.name.trim().toLowerCase())
			// No skill and no granting talent: every spell of this kind is out of
			// reach, and the reason is the discipline itself rather than the rank.
			if (ceiling === null) return { owned, blocked: `no ${magicType}` }
			return {
				owned,
				blocked:
					Number(spell.rank) > ceiling ? `rank ${spell.rank}` : undefined,
			}
		}
	}, [
		character.spells?.spells,
		character.skills?.skills,
		character.skills?.abilities,
		magicType,
	])

	const columns: SearchDialogColumn<SpellData>[] = [
		{
			key: 'name',
			label: 'Spell',
			width: 'minmax(0, 1.2fr)',
			render: (value, spell) => (
				<Typography variant="body2" sx={{ fontWeight: 'medium' }}>
					{spell.name}
				</Typography>
			),
		},
		{
			key: typeFieldKey as keyof SpellData,
			label: typeLabel,
			width: '9rem',
			render: (value) => <SheetChip>{value}</SheetChip>,
		},
		{
			key: 'rank',
			label: 'Rank',
			width: '4rem',
			// The cell's alignment, not the Typography's: the column heading reads the
			// same `align` the cell does, so a value centred locally under a heading
			// aligned by the shared template is exactly the drift the one-template rule
			// exists to stop (M13 S8).
			align: 'center',
			render: (value) => <Typography variant="body2">{value}</Typography>,
		},
		{
			key: 'focus',
			label: 'Focus',
			width: '4rem',
			align: 'center',
			render: (value) => <Typography variant="body2">{value}</Typography>,
		},
		{
			key: 'target',
			label: 'Target',
			width: '7rem',
			render: (value) => <Typography variant="caption">{value}</Typography>,
		},
		{
			key: 'range',
			label: 'Range',
			width: '5.5rem',
			render: (value) => <Typography variant="caption">{value}</Typography>,
		},
		{
			key: 'effect',
			label: 'Effect',
			sortable: false,
			width: 'minmax(0, 2fr)',
			render: (value) => (
				<Typography component="span" className="cs-entry-summary">
					{entrySummary(String(value ?? ''))}
				</Typography>
			),
		},
	]

	const searchFields: (keyof SpellData)[] = [
		'name',
		typeFieldKey as keyof SpellData,
		'rank',
		'target',
		'range',
		'properties',
		'effect',
	]

	/**
	 * A spell's identity is its name AND its discipline, not its name.
	 *
	 * `arcane-spells.json` holds two spells called *Astral Body* — one Conjuration,
	 * one Telepathy — and keying rows by name alone gave React two children with
	 * the same key. Filtering to rank 5 then rendered 17 rows for 16 spells with a
	 * rank 4 spell stranded at the top, because React could not tell which of the
	 * two a retained node belonged to. Selecting one also selected the other, and
	 * importing it imported both.
	 *
	 * `SearchDialog` now shouts about a non-unique key in development, but the fix
	 * belongs here: this is where a spell's identity is known.
	 */
	const spellKey = (spell: SpellData) =>
		`${spell.name}|${(spell[typeFieldKey as keyof SpellData] as string) ?? ''}`

	const handleImport = () => {
		const spellsToImport = (spellsData as SpellData[])
			.filter((spell) => selectedSpells.has(spellKey(spell)))
			.map((spell) => ({
				id: crypto.randomUUID(),
				...buildSpellFromData(spell, magicType),
			}))

		onImportSpells(spellsToImport)
	}

	return (
		<SearchDialog
			open={open}
			onClose={onClose}
			title={`Search ${magicType === 'Arcana' ? 'Arcane' : 'Mystic'} Spells`}
			data={filteredSpells as SpellData[]}
			columns={columns}
			searchFields={searchFields}
			selectedItems={selectedSpells}
			onSelectionChange={setSelectedSpells}
			onImport={handleImport}
			getItemKey={spellKey}
			importButtonText="Import"
			itemNoun="spell"
			getStanding={standingOf}
			// Rank ascending, then name — the order a reader looks a spell up in. The
			// JSON's own order is by discipline with ranks interleaved, which is an
			// authoring artefact, not a reading order.
			defaultSort={{ key: 'rank' }}
			// An arcane spell's effect is a median of 558 characters and the row
			// clamps it to three lines (F11.1). Opened, it shows the weak / strong /
			// critical tiers the docs card shows — the same `SuccessLevel` rows, from
			// the same parser — instead of collapsing them into one paragraph.
			renderDetails={(spell) => (
				<EntryProse source={spell.effect ?? ''} name={spell.name} />
			)}
			searchPlaceholder={`Search by name, ${typeLabel.toLowerCase()}, rank, or effect...`}
			filters={
				<>
					<FilterSelect
						label="Rank"
						allLabel="All ranks"
						options={rankOptions.map(String)}
						value={rankFilter}
						onChange={setRankFilter}
						optionLabel={(rank) => `Rank ${rank}`}
						minWidth="10rem"
					/>
					{/* No tone. A discipline is unambiguously magic, so `--cs-magic` was
						available and is deliberately not spent: S5 gave the magic register
						to the cast plate, the focus pool and the catalyst, and cyan reads
						as sorcery only while it stays rare. Structural bronze. */}
					<FilterSelect
						label={typeLabel}
						allLabel={`All ${typeLabel.toLowerCase()}s`}
						options={typeOptions}
						value={typeFilter}
						onChange={setTypeFilter}
					/>
					<Button
						variant="text"
						size="small"
						onClick={clearFilters}
						disabled={!rankFilter.length && !typeFilter.length}
					>
						Clear filters
					</Button>
				</>
			}
		/>
	)
}
