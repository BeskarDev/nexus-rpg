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
import combatArtsData from '../../../../utils/data/json/combat-arts.json'
import { CharacterDocument, Ability } from '../../../../types/Character'
import { sanitizeHtml } from '../../../../utils/typescript/htmlSanitizer'

/**
 * `getCategoryColor` is gone (M13 S8) — see `EquipmentSearchDialog` for the general
 * reason. Basic was `info` and Supreme was `error`, so the rarer and better combat
 * art was the one painted in the colour the rest of the app uses for a failure.
 */

export type CombatArtsSearchDialogProps = {
	open: boolean
	onClose: () => void
	onImportCombatArts: (combatArts: Partial<Ability>[]) => void
	character: CharacterDocument
}

type CombatArtData = {
	name: string
	category: string
	weapons: string
	effect: string
}

export const CombatArtsSearchDialog: React.FC<CombatArtsSearchDialogProps> = ({
	open,
	onClose,
	onImportCombatArts,
	character,
}) => {
	const [selectedCombatArts, setSelectedCombatArts] = useState<Set<string>>(
		new Set(),
	)
	const [categoryFilter, setCategoryFilter] = useState<string[]>([])
	const [weaponFilter, setWeaponFilter] = useState<string[]>([])

	const arts = combatArtsData as CombatArtData[]

	/*
		This dialog had NO filters at all (F11.6) — 44 rows and two obvious facets
		sitting unused in the data. Weapons is the one that matters in play: a combat
		art you cannot perform with anything you carry is not a candidate.

		A `weapons` cell is a comma list (`Axe, Mace`), so the facet is its parts
		rather than the whole string; filtering on the raw cell would offer
		`Axe, Mace` and `Axe` as two unrelated options.
	*/
	const categoryOptions = useMemo(
		() => Array.from(new Set(arts.map((art) => art.category))).sort(),
		[arts],
	)
	const weaponOptions = useMemo(
		() =>
			Array.from(
				new Set(
					arts.flatMap((art) =>
						art.weapons
							.split(',')
							.map((weapon) => weapon.trim())
							.filter(Boolean),
					),
				),
			).sort(),
		[arts],
	)

	const filteredArts = useMemo(
		() =>
			arts.filter((art) => {
				const categoryMatch =
					!categoryFilter.length || categoryFilter.includes(art.category)
				const weaponMatch =
					!weaponFilter.length ||
					weaponFilter.some((weapon) =>
						art.weapons
							.split(',')
							.map((entry) => entry.trim())
							.includes(weapon),
					)
				return categoryMatch && weaponMatch
			}),
		[arts, categoryFilter, weaponFilter],
	)

	/*
		Which of these the character already has (M13 S8b, F11.2). `character` was
		declared and never read here too.

		Only `owned` — a combat art has no rules prerequisite in the data, so there is
		nothing to bar on. `blocked` is left undefined rather than invented, which is
		also why the "only what I can take" toggle is honest here: it filters nothing
		because nothing is barred.
	*/
	const standingOf = useMemo(() => {
		const owned = new Set(
			(character.skills?.abilities ?? [])
				.filter((ability) => ability.tag === 'Combat Art')
				.map((ability) => ability.title.trim().toLowerCase()),
		)
		return (art: CombatArtData) => ({
			owned: owned.has(art.name.trim().toLowerCase()),
		})
	}, [character.skills?.abilities])

	const columns: SearchDialogColumn<CombatArtData>[] = [
		{
			key: 'name',
			label: 'Combat Art',
			width: 'minmax(0, 1.2fr)',
			render: (value, combatArt) => (
				<Typography variant="body2" sx={{ fontWeight: 'medium' }}>
					{combatArt.name}
				</Typography>
			),
		},
		{
			key: 'weapons',
			label: 'Weapons',
			width: 'minmax(0, 1fr)',
			render: (value) => (
				<Typography
					variant="caption"
					sx={{
						display: '-webkit-box',
						WebkitLineClamp: 2,
						WebkitBoxOrient: 'vertical',
						overflow: 'hidden',
						lineHeight: 1.2,
					}}
				>
					{value}
				</Typography>
			),
		},
		{
			key: 'category',
			label: 'Type',
			width: '7rem',
			render: (value) => <SheetChip>{value}</SheetChip>,
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

	const handleImport = () => {
		const combatArtsToImport = (combatArtsData as CombatArtData[])
			.filter((combatArt) => selectedCombatArts.has(combatArt.name))
			.map((combatArt) => ({
				id: crypto.randomUUID(),
				title: combatArt.name,
				description: sanitizeHtml(combatArt.effect),
				tag: 'Combat Art' as const,
				actionType: 'Action' as const,
			}))

		onImportCombatArts(combatArtsToImport)
	}

	return (
		<SearchDialog
			open={open}
			onClose={onClose}
			title="Search Combat Arts"
			data={filteredArts}
			columns={columns}
			searchFields={['name', 'category', 'weapons', 'effect']}
			selectedItems={selectedCombatArts}
			onSelectionChange={setSelectedCombatArts}
			onImport={handleImport}
			getItemKey={(combatArt) => combatArt.name}
			importButtonText="Import"
			itemNoun="combat art"
			// `allowPartialRuns`, because a combat art's prose above a success run IS
			// the base case that lands on any hit and the tiers only add to it. Spells
			// forbid that — a gap there means the data lost a line. `Deep Cut` is the
			// one entry in the corpus that proves the difference, and parsing it with
			// the spell rule throws.
			renderDetails={(art) => (
				<EntryProse
					source={art.effect ?? ''}
					name={art.name}
					allowPartialRuns
				/>
			)}
			// 44 rows in JSON authoring order until now (F11.6).
			defaultSort={{ key: 'name' }}
			getStanding={standingOf}
			searchPlaceholder="Search by name, category, weapons, or effect..."
			filters={
				<>
					<FilterSelect
						label="Type"
						allLabel="All types"
						options={categoryOptions}
						value={categoryFilter}
						onChange={setCategoryFilter}
						minWidth="10rem"
					/>
					<FilterSelect
						label="Weapon"
						allLabel="All weapons"
						options={weaponOptions}
						value={weaponFilter}
						onChange={setWeaponFilter}
					/>
					<Button
						variant="text"
						size="small"
						onClick={() => {
							setCategoryFilter([])
							setWeaponFilter([])
						}}
						disabled={!categoryFilter.length && !weaponFilter.length}
					>
						Clear filters
					</Button>
				</>
			}
		/>
	)
}
