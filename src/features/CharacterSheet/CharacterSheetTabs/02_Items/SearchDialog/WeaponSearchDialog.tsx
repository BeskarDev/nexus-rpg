import React, { useMemo, useState } from 'react'
import { Typography, TextField, Button } from '@mui/material'
import { SheetChip } from '../../../components'
import { parseCostValue } from './costUtils'
import type { SearchDialogColumn } from '../../../components'
import {
	SearchDialog,
	FilterSelect,
	entrySummary,
	EntryProse,
	MetaBand,
	MetaBandField,
	MetaBandLabel,
	MetaBandValue,
} from '../../../components'
import weaponsData from '../../../../../utils/data/json/weapons.json'
import {
	Weapon,
	CharacterDocument,
	DamageType,
} from '../../../../../types/Character'
import { QualityTier } from '../utils/magicItemsConfig'
import { getBaseDamageType } from '../utils/weaponDamage'

/**
 * `getWeaponTypeColor` is gone (M13 S8) — see the note in `EquipmentSearchDialog`.
 * It mapped nine weapon types onto MUI's semantic palette, twice over: axe and
 * polearm were both `error`, crossbow and shield were both `info`. A hue that does
 * not even distinguish its own members is not an identity system.
 */

export type WeaponSearchDialogProps = {
	open: boolean
	onClose: () => void
	onImportWeapons: (weapons: Partial<Weapon>[]) => void
	character: CharacterDocument
}

type WeaponData = {
	name: string
	quality: string
	type: string
	damage: string
	properties: string
	load: string
	cost: string
}

export const WeaponSearchDialog: React.FC<WeaponSearchDialogProps> = ({
	open,
	onClose,
	onImportWeapons,
	character,
}) => {
	const [selectedWeapons, setSelectedWeapons] = useState<Set<string>>(new Set())
	const [qualityFilter, setQualityFilter] = useState<string[]>([])
	const [typeFilter, setTypeFilter] = useState<string[]>([])
	const [costMin, setCostMin] = useState('')
	const [costMax, setCostMax] = useState('')

	const qualityOptions = useMemo(
		() =>
			Array.from(
				new Set((weaponsData as WeaponData[]).map((weapon) => weapon.quality)),
			),
		[],
	)

	const typeOptions = useMemo(
		() =>
			Array.from(
				new Set((weaponsData as WeaponData[]).map((weapon) => weapon.type)),
			),
		[],
	)

	const filteredWeapons = useMemo(
		() =>
			(weaponsData as WeaponData[]).filter((weapon) => {
				const matchesQuality =
					!qualityFilter.length || qualityFilter.includes(weapon.quality)

				const matchesType =
					!typeFilter.length || typeFilter.includes(weapon.type)

				const cost = parseCostValue(weapon.cost)
				const min = costMin === '' ? Number.NEGATIVE_INFINITY : Number(costMin)
				const max = costMax === '' ? Number.POSITIVE_INFINITY : Number(costMax)
				const matchesCost =
					cost === null
						? costMin === '' && costMax === ''
						: cost >= min && cost <= max

				return matchesQuality && matchesType && matchesCost
			}),
		[weaponsData, qualityFilter, typeFilter, costMin, costMax],
	)

	const resetFilters = () => {
		setQualityFilter([])
		setTypeFilter([])
		setCostMin('')
		setCostMax('')
	}

	/*
		Where each weapon stands against this character's purse and pack (F11.2).

		`character` was declared and never read here. Two facts the dialog was
		already holding:

		- **owned** — the sheet already carries one by this name. Not a bar: a second
		  torch is a legitimate thing to want, which is why it is `owned` and not
		  `blocked`.
		- **cost** — `items.coins` against the entry's price. `parseCostValue` is the
		  same reader the Min/Max filter uses, so "affordable" here and "under 50"
		  there cannot disagree. An entry with no parseable price (a `-`) is never
		  barred: unknown is not the same as unaffordable.
	*/
	const standingOf = useMemo(() => {
		const coins = character.items?.coins ?? 0
		const owned = new Set(
			(character.items?.weapons ?? []).map((entry) =>
				entry.name.trim().toLowerCase(),
			),
		)
		return (weapon: WeaponData) => {
			const price = parseCostValue(String(weapon.cost ?? ''))
			return {
				owned: owned.has(weapon.name.trim().toLowerCase()),
				blocked:
					price !== null && price > coins ? `costs ${weapon.cost}` : undefined,
			}
		}
	}, [character.items?.coins, character.items?.weapons])

	const columns: SearchDialogColumn<WeaponData>[] = [
		{
			key: 'name',
			label: 'Name',
			width: 'minmax(0, 1.3fr)',
			render: (value, weapon) => (
				<>
					<Typography variant="body2" sx={{ fontWeight: 'medium' }}>
						{weapon.name}
					</Typography>
					<Typography variant="caption" color="text.secondary">
						Quality {weapon.quality}
					</Typography>
				</>
			),
		},
		{
			key: 'type',
			label: 'Type',
			width: '8rem',
			render: (value) => <SheetChip>{value}</SheetChip>,
		},
		{
			key: 'damage',
			label: 'Dmg',
			align: 'center',
			width: '4.5rem',
			render: (value, weapon) => {
				const baseDamage = getBaseDamageType(weapon.type)
				return (
					<>
						<Typography variant="body2">{value}</Typography>
						<Typography
							variant="caption"
							color="text.secondary"
							display="block"
						>
							({baseDamage})
						</Typography>
					</>
				)
			},
		},
		{
			key: 'load',
			label: 'Load',
			align: 'center',
			width: '3rem',
			render: (value) => <Typography variant="body2">{value}</Typography>,
		},
		{
			key: 'cost',
			label: 'Cost',
			align: 'center',
			width: '4rem',
			render: (value) => <Typography variant="body2">{value}</Typography>,
		},
		{
			key: 'properties',
			label: 'Properties',
			sortable: false,
			width: 'minmax(0, 1.5fr)',
			render: (value) => (
				<Typography component="span" className="cs-entry-summary">
					{entrySummary(String(value ?? ''))}
				</Typography>
			),
		},
	]

	const handleImport = () => {
		const weaponsToImport = (weaponsData as WeaponData[])
			.filter((weapon) => selectedWeapons.has(weapon.name))
			.map((weapon) => ({
				id: crypto.randomUUID(),
				name: weapon.name,
				damage: {
					base: getBaseDamageType(weapon.type),
					weapon: parseInt(weapon.damage) || 0,
					other: 0,
					otherWeak: 0,
					otherStrong: 0,
					otherCritical: 0,
					type: 'physical' as DamageType,
				},
				properties: weapon.properties,
				description: `${weapon.type} weapon (Quality ${weapon.quality})`,
				cost: parseCostValue(weapon.cost) || 0,
				load: parseInt(weapon.load) || 0,
				quality: parseInt(weapon.quality) as QualityTier,
			}))

		onImportWeapons(weaponsToImport)
	}

	return (
		<SearchDialog
			open={open}
			onClose={onClose}
			title="Search Weapons"
			data={filteredWeapons as WeaponData[]}
			columns={columns}
			searchFields={['name', 'type', 'properties']}
			selectedItems={selectedWeapons}
			onSelectionChange={setSelectedWeapons}
			onImport={handleImport}
			getItemKey={(weapon) => weapon.name}
			importButtonText="Import"
			searchPlaceholder="Search by name, type, or properties..."
			itemNoun="weapon"
			getStanding={standingOf}
			// A band, not a plate (owner review). `RecordPlate` is the sheet's shape
			// for an entity's facts when there are eight of them and half take a
			// control; here there are five short read-only values, and five ruled
			// courses at a 6.5rem label measure is a tall sparse column for
			// "Load 1, Cost 25". `MetaBand` is the same facts as one bounded line
			// that wraps — the idiom the Items tab's purse strip already uses, one
			// rank down. No separators between fields: a vertical rule there is the
			// bar-as-grouping-device this theme has rejected three times.
			renderDetails={(weapon: WeaponData) => (
				<div className="cs-entry-prose">
					<MetaBand variant="sub">
						<MetaBandField>
							<MetaBandLabel>Type</MetaBandLabel>
							<MetaBandValue>{weapon.type}</MetaBandValue>
						</MetaBandField>
						<MetaBandField>
							<MetaBandLabel>Quality</MetaBandLabel>
							<MetaBandValue>{weapon.quality}</MetaBandValue>
						</MetaBandField>
						<MetaBandField>
							<MetaBandLabel>Damage</MetaBandLabel>
							<MetaBandValue>{weapon.damage}</MetaBandValue>
						</MetaBandField>
						<MetaBandField>
							<MetaBandLabel sigil="load">Load</MetaBandLabel>
							<MetaBandValue>{weapon.load}</MetaBandValue>
						</MetaBandField>
						<MetaBandField>
							<MetaBandLabel sigil="coins">Cost</MetaBandLabel>
							<MetaBandValue>{weapon.cost}</MetaBandValue>
						</MetaBandField>
					</MetaBand>
					{weapon.properties && (
						<p className="cs-entry-prose__para">
							<strong>Properties.</strong>{' '}
							{entrySummary(String(weapon.properties))}
						</p>
					)}
				</div>
			)}
			// Alphabetical. It opened in JSON authoring order until now (F11.6).
			defaultSort={{ key: 'name' }}
			filters={
				<>
					<FilterSelect
						label="Quality"
						allLabel="All qualities"
						options={qualityOptions}
						value={qualityFilter}
						onChange={setQualityFilter}
						minWidth="10rem"
					/>

					<FilterSelect
						label="Weapon Type"
						allLabel="All types"
						options={typeOptions}
						value={typeFilter}
						onChange={setTypeFilter}
						minWidth="10rem"
					/>

					{/* Three Material icons retired here (M13 S8), as in the equipment
						dialog: a dollar sign for a currency the setting does not have, and
						two arrows restating "Min" and "Max". */}
					<TextField
						label="Min cost"
						size="small"
						type="number"
						value={costMin}
						onChange={(event) => setCostMin(event.target.value)}
						sx={{ width: '7rem' }}
					/>
					<TextField
						label="Max cost"
						size="small"
						type="number"
						value={costMax}
						onChange={(event) => setCostMax(event.target.value)}
						sx={{ width: '7rem' }}
					/>

					<Button
						variant="text"
						size="small"
						onClick={resetFilters}
						disabled={
							!qualityFilter.length &&
							!typeFilter.length &&
							!costMin &&
							!costMax
						}
					>
						Clear filters
					</Button>
				</>
			}
		/>
	)
}
