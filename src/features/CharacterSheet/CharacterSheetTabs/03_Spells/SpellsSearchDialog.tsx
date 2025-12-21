import React, { useMemo, useState } from 'react'
import {
	Typography,
	Chip,
	Box,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Checkbox,
	ListItemText,
	Button,
} from '@mui/material'
import {
	SearchDialog,
	SearchDialogColumn,
} from '../02_Items/SearchDialog/GenericSearchDialog'
import arcaneSpellsData from '../../../../utils/data/json/arcane-spells.json'
import mysticSpellsData from '../../../../utils/data/json/mystic-spells.json'
import { CharacterDocument } from '../../../../types/Character'
import { sanitizeHtml } from '../../../../utils/typescript/htmlSanitizer'
import { parseDamageFromEffect } from '../../../../utils/typescript/spellDamageParser'
import { targetTypeArray, rangeTypeArray } from '../../../../types/Character'

// Color mapping for disciplines/traditions
const disciplineColorMap: Record<
	string,
	'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'
> = {
	// Arcane disciplines
	Evocation: 'error',
	Illusion: 'secondary',
	Conjuration: 'warning',
	Telepathy: 'primary',
	Telekinetics: 'info',
	Necromancy: 'success',

	// Mystic traditions
	Light: 'warning',
	Twilight: 'secondary',
	Life: 'success',
	Death: 'primary',
	Nature: 'info',
	Tempest: 'error',
	Peace: 'primary',
	War: 'error',
}

const getDisciplineColor = (
	discipline: string,
): 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' => {
	return disciplineColorMap[discipline] || 'primary'
}

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
					!rankFilter.length ||
					rankFilter.includes(String(spell.rank))
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

	const columns: SearchDialogColumn<SpellData>[] = [
		{
			key: 'name',
			label: 'Spell',
			render: (value, spell) => (
				<Typography variant="body2" sx={{ fontWeight: 'medium' }}>
					{spell.name}
				</Typography>
			),
		},
		{
			key: typeFieldKey as keyof SpellData,
			label: typeLabel,
			render: (value) => (
				<Chip
					label={value}
					size="small"
					variant="outlined"
					color={getDisciplineColor(value)}
					sx={{ fontSize: '0.75rem' }}
				/>
			),
		},
		{
			key: 'rank',
			label: 'Rank',
			width: '80px',
			render: (value) => (
				<Typography variant="body2" sx={{ textAlign: 'center' }}>
					{value}
				</Typography>
			),
		},
		{
			key: 'focus',
			label: 'Focus',
			width: '80px',
			render: (value) => (
				<Typography variant="body2" sx={{ textAlign: 'center' }}>
					{value}
				</Typography>
			),
		},
		{
			key: 'target',
			label: 'Target',
			width: '120px',
			render: (value) => <Typography variant="caption">{value}</Typography>,
		},
		{
			key: 'range',
			label: 'Range',
			width: '100px',
			render: (value) => <Typography variant="caption">{value}</Typography>,
		},
		{
			key: 'effect',
			label: 'Effect',
			sortable: false,
			render: (value) => (
				<Typography
					variant="caption"
					sx={{
						display: '-webkit-box',
						WebkitLineClamp: 3,
						WebkitBoxOrient: 'vertical',
						overflow: 'hidden',
						lineHeight: 1.2,
						whiteSpace: 'pre-line', // Preserve newlines from sanitized HTML
					}}
				>
					{sanitizeHtml(value)}
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

	// Hilfsfunktionen für Mapping
	const mapRangeType = (val: string) => {
		if (!val) return ''
		const lower = val.trim().toLowerCase()
		return rangeTypeArray.includes(lower as any) ? (lower as any) : ''
	}

	const mapTargetType = (val: string) => {
		if (!val) return ''
		let v = val.trim()
		// z.B. "Medium (8)" → "8"
		const parenMatch = v.match(/\((\d+)\)/)
		if (parenMatch) {
			v = parenMatch[1]
		}
		// z.B. "vs. Dodge" oder "Dodge" → "Dodge"
		const vsMatch = v.match(/vs\.?\s*(Parry|Dodge|Resist)/i)
		if (vsMatch) {
			v = vsMatch[1].charAt(0).toUpperCase() + vsMatch[1].slice(1).toLowerCase()
		}
		// "Special" (beliebige Groß-/Kleinschreibung) zu "special"
		if (/^special$/i.test(v)) {
			v = 'special'
		}
		// Nur erlaubte Werte zulassen
		return targetTypeArray.includes(v as any) ? (v as any) : ''
	}

	const handleImport = () => {
		const spellsToImport = (spellsData as SpellData[])
			.filter((spell) => selectedSpells.has(spell.name))
			.map((spell) => {
				const parsedDamage = parseDamageFromEffect(spell.effect, magicType)
				// Remove staticDamage from parsed damage since it's not part of the Character.Damage type in the import
				const { staticDamage: _, ...damageWithoutStatic } = parsedDamage

				return {
					id: crypto.randomUUID(),
					name: spell.name,
					rank: parseInt(spell.rank) || 0,
					cost: parseInt(spell.focus) || 0,
					target: mapTargetType(spell.target),
					range: mapRangeType(spell.range),
					properties: spell.properties,
					// dealsDamage: true nur wenn explizit Schaden verursacht wird
					dealsDamage:
						/deal(s)?\s*\+?\d+\s*(\w+)?\s*damage|take(s)?\s*\+?\d+\s*(\w+)?\s*damage|inflict(s)?\s*damage/i.test(
							spell.effect,
						),
					damage: {
						...damageWithoutStatic,
						staticDamage: parsedDamage.staticDamage,
					},
					effect: sanitizeHtml(spell.effect),
				}
			})

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
			getItemKey={(spell) => spell.name}
			importButtonText="Import"
			searchPlaceholder={`Search by name, ${typeLabel.toLowerCase()}, rank, or effect...`}
			filters={
				<>
					<FormControl size="small" sx={{ minWidth: '10rem' }}>
						<InputLabel id="rank-filter-label">Rank</InputLabel>
						<Select
							multiple
							labelId="rank-filter-label"
							value={rankFilter}
							label="Rank"
							onChange={(event) =>
								setRankFilter(event.target.value as string[])
							}
							renderValue={(selected) =>
								selected.length ? selected.join(', ') : 'All ranks'
							}
						>
							{rankOptions.map((rank) => (
								<MenuItem key={rank} value={String(rank)}>
									<Checkbox checked={rankFilter.indexOf(String(rank)) > -1} />
									<ListItemText primary={`Rank ${rank}`} />
								</MenuItem>
							))}
						</Select>
					</FormControl>

					<FormControl size="small" sx={{ minWidth: '12rem' }}>
						<InputLabel id="type-filter-label">{typeLabel}</InputLabel>
						<Select
							multiple
							labelId="type-filter-label"
							value={typeFilter}
							label={typeLabel}
							onChange={(event) =>
								setTypeFilter(event.target.value as string[])
							}
							renderValue={(selected) =>
								selected.length ? selected.join(', ') : `All ${typeLabel}s`
							}
						>
							{typeOptions.map((type) => (
								<MenuItem key={type} value={type}>
									<Checkbox checked={typeFilter.indexOf(type) > -1} />
									<ListItemText primary={type} />
								</MenuItem>
							))}
						</Select>
					</FormControl>

					<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
						<Button
							variant="text"
							size="small"
							onClick={clearFilters}
							disabled={!rankFilter.length && !typeFilter.length}
						>
							Clear filters
						</Button>
					</Box>
				</>
			}
		/>
	)
}
