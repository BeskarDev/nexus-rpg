import React, { useMemo, useState } from 'react'
import { Typography } from '@mui/material'
import {
	FilterSelect,
	SheetChip,
	TalentLadder,
	entrySummary,
	talentRankSpan,
} from '../../../components'
import type { SearchDialogColumn } from '../../../components'
import { SearchDialog } from '../../../components'
import talentsData from '../../../../../utils/data/json/talents.json'
import { CharacterDocument } from '../../../../../types/Character'
import {
	getSkillChipColor,
	normalizeSkillName,
} from '../../../../../constants/skills'
import { buildTalentFields } from '../../../utils/talentFactory'
import { getTalentPointSummaries } from '../../../utils/calculateTalentPoints'

export type TalentsSearchDialogProps = {
	open: boolean
	onClose: () => void
	onImportTalents: (talents: any[]) => void
	character: CharacterDocument
}

type TalentData = {
	name: string
	'skill requirement': string
	description: string
	/**
	 * Derived once, at the top of this file's data pipeline, so the ledger can
	 * treat them as the fields they behave like.
	 *
	 * They are computed rather than authored, but a `SearchDialogColumn` keys on
	 * `keyof T` — which is the right constraint, because it is what makes a column
	 * sortable and searchable. Deriving into the row is how a computed value earns
	 * both, instead of a `render` that the sort and the search cannot see.
	 */
	ranks: string
	summary: string
}

export const TalentsSearchDialog: React.FC<TalentsSearchDialogProps> = ({
	open,
	onClose,
	onImportTalents,
	character,
}) => {
	const [selectedTalents, setSelectedTalents] = useState<Set<string>>(new Set())
	const [skillFilter, setSkillFilter] = useState<string[]>([])

	/*
		Parse each talent ONCE, not once per render per row.

		`talentRankSpan` and `entrySummary` both walk the description, and there are
		148 of them; doing it inside a column's `render` would re-do the whole corpus
		on every keystroke in the search field.
	*/
	const talents = useMemo<TalentData[]>(
		() =>
			(talentsData as Omit<TalentData, 'ranks' | 'summary'>[]).map(
				(talent) => ({
					...talent,
					ranks: talentRankSpan(talent.description, talent.name) ?? '',
					// The rank labels come out: `(Rank 1)` mid-sentence is noise in a
					// two-line lead now that the span has a column of its own.
					summary: entrySummary(talent.description, { stripRankLabels: true }),
				}),
			),
		[],
	)

	const skillOptions = useMemo(
		() =>
			Array.from(
				new Set(
					talents.map(
						(talent) =>
							normalizeSkillName(talent['skill requirement']) ||
							talent['skill requirement'],
					),
				),
			).sort(),
		[talents],
	)

	const filteredTalents = useMemo(
		() =>
			talents.filter((talent) => {
				const normalized =
					normalizeSkillName(talent['skill requirement']) ||
					talent['skill requirement']
				return (
					!skillFilter.length ||
					skillFilter.some((skill) => skill === normalized)
				)
			}),
		[skillFilter, talents],
	)

	/*
		Where each talent stands on THIS character's sheet (M13 S8b, F11.2).

		`character` was declared, destructured and never read here — so a player
		browsing 148 talents was told nothing about which they already hold or which
		their own skills reach. The rule this encodes is the chapter's own, verbatim:

		> You can only buy a talent if you meet its skill rank requirement and you
		> have enough talent points from that same skill.
		> — docs/03-statistics/06-talents/00-overview.md

		Only the two STRUCTURED halves are checked. A talent's per-rank skill-rank
		requirement lives in its prose (`(Rank 1)`, `(Rank 2)`) and is not a field, so
		a rank check here would be a guess dressed as a rule. Rank 1 of any talent
		needs skill rank 1, which being trained already implies — the two blockers
		below are the ones the data can actually support.
	*/
	const standingOf = useMemo(() => {
		const abilities = character.skills?.abilities ?? []
		const trained = character.skills?.skills ?? []
		const owned = new Set(
			abilities
				.filter((ability) => ability.tag === 'Talent')
				.map((ability) => ability.title.trim().toLowerCase()),
		)
		const { summaries } = getTalentPointSummaries(trained, abilities)
		const pointsLeft = new Map(
			summaries.map((summary) => [
				summary.skill,
				summary.available - summary.spent,
			]),
		)

		return (talent: TalentData) => {
			const skill =
				normalizeSkillName(talent['skill requirement']) ||
				talent['skill requirement']
			if (!pointsLeft.has(skill)) {
				return {
					owned: owned.has(talent.name.trim().toLowerCase()),
					blocked: 'untrained',
				}
			}
			return {
				owned: owned.has(talent.name.trim().toLowerCase()),
				// Zero points left is a real bar: the talent costs one and you have
				// none in that skill. Said as the shortage rather than as a refusal,
				// because the fix is XP in that skill and the phrase should point at it.
				blocked: (pointsLeft.get(skill) ?? 0) > 0 ? undefined : 'no points',
			}
		}
	}, [character.skills?.abilities, character.skills?.skills])

	const columns: SearchDialogColumn<TalentData>[] = [
		{
			key: 'name',
			label: 'Talent',
			width: 'minmax(0, 1.2fr)',
			render: (value, talent) => (
				<Typography variant="body2" sx={{ fontWeight: 'medium' }}>
					{talent.name}
				</Typography>
			),
		},
		{
			key: 'skill requirement',
			label: 'Skill',
			width: '9rem',
			render: (value) => {
				const normalized = normalizeSkillName(value) || value
				// The same stamp the Skills tab shows for the same skill (M13 S8) —
				// identity in the ink, not in an outlined Material pill.
				return (
					<SheetChip tone={getSkillChipColor(normalized)}>
						{normalized}
					</SheetChip>
				)
			},
		},
		{
			key: 'ranks',
			label: 'Ranks',
			width: '4.25rem',
			align: 'center',
			// The docs card shows this on its name line as the entry's scanning key:
			// it separates a talent you can start now from a capstone that needs skill
			// rank 4 before it begins. The ledger had no equivalent, so 148 rows all
			// looked equally reachable.
			render: (value) =>
				value ? <SheetChip variant="plate">{String(value)}</SheetChip> : null,
		},
		{
			key: 'summary',
			label: 'Description',
			sortable: false,
			width: 'minmax(0, 2fr)',
			// The lead, flowed. It used to be `sanitizeHtml(description)` under
			// `white-space: pre-line`, and `sanitizeHtml` turns every `<br/>` into a
			// newline — so a talent's `<br/><br/>` rank breaks spent one or two of the
			// three clamped lines on blank space. Same three lines, three lines of
			// words now.
			render: (value) => (
				<Typography component="span" className="cs-entry-summary">
					{String(value)}
				</Typography>
			),
		},
	]

	const handleImport = () => {
		const talentsToImport = talents
			.filter((talent) => selectedTalents.has(talent.name))
			.map((talent) => ({
				id: crypto.randomUUID(),
				...buildTalentFields(talent),
				tag: 'Talent' as const,
				rank: 1, // Default to rank 1
			}))

		onImportTalents(talentsToImport)
	}

	return (
		<SearchDialog
			open={open}
			onClose={onClose}
			title="Search Talents"
			data={filteredTalents}
			columns={columns}
			// `summary` rather than `description`: the flattened text is what the row
			// shows, and searching markup a reader cannot see finds phantom matches.
			searchFields={['name', 'skill requirement', 'summary']}
			selectedItems={selectedTalents}
			onSelectionChange={setSelectedTalents}
			onImport={handleImport}
			getItemKey={(talent) => talent.name}
			importButtonText="Import"
			itemNoun="talent"
			getStanding={standingOf}
			// A talent description is a median of 671 characters and the row shows
			// three clamped lines of it, so the fact you choose on was about a fifth
			// visible (F11.1). The row opens onto the whole of it — as the LADDER the
			// docs render, not as the flattened `<br/>` run the first pass showed:
			// "Rank 1 grants this, Rank 2 that" is a talent's whole shape, and one
			// grey paragraph is not a cheaper view of it, it is a different fact.
			renderDetails={(talent) => (
				<TalentLadder source={talent.description} name={talent.name} />
			)}
			// Alphabetical, because a talent list is browsed by name. Four of the nine
			// dialogs still open in JSON authoring order (F11.6); this is one of them
			// no longer doing that.
			defaultSort={{ key: 'name' }}
			searchPlaceholder="Search by name, skill requirement, or description..."
			filters={
				/* No wrapper: the dialog's filter band is the flex row now. */
				<FilterSelect
					label="Skill"
					allLabel="All skills"
					options={skillOptions}
					value={skillFilter}
					onChange={setSkillFilter}
					tone={getSkillChipColor}
					minWidth="13rem"
				/>
			}
		/>
	)
}
