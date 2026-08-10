import React from 'react'
import Layout from '@theme/Layout'
import { useAutofitPending, useSpillPlan } from '@site/src/components/autofit'
import type { FitResult } from '@site/src/components/autofit'
import { CreatureCompactCard } from '@site/src/features/CreatureCards/CreatureCompactCard'
import { creatureEntries } from '@site/src/features/CreatureCards/creatureSources'

/**
 * The creature deck's measurement bench (M21 S2, S3).
 *
 * D8 makes "fewest cards" a constraint, and the milestone insists the number be
 * MEASURED rather than argued: how many cards the 150-creature catalogue prints
 * as, before the recut and after it. That question has one honest answer and it
 * is the laid-out card — the whole lesson of M18 F1 — so the bench renders all
 * 150 through the real card component and the real spill plan, and reports what
 * the autofit settled on.
 *
 * `window.__creatureCardsMeasure` carries the report once every card has
 * settled, so a headless run can read it without scraping the DOM.
 *
 * Dev only, twice guarded, exactly as `/dev/sigils` is: the component renders
 * nothing outside `docusaurus start`, and `/dev/**` is out of the sitemap.
 */

interface CreatureMeasurement {
	name: string
	tier: number
	category: string
	cards: number
	/** The smallest settled size across this creature's cards, in points. */
	size: number
	/** True when a card still overflows at the 6.5pt floor with nowhere to cut. */
	oversize: boolean
}

export interface CreatureMeasureReport {
	creatures: number
	cards: number
	continuations: number
	oversize: string[]
	atFloor: number
	byTier: Record<number, { creatures: number; cards: number }>
	rows: CreatureMeasurement[]
}

declare global {
	interface Window {
		__creatureCardsMeasure?: CreatureMeasureReport
	}
}

function Bench() {
	const { entries, errors } = React.useMemo(() => creatureEntries(), [])
	const [fits, setFits] = React.useState<Record<string, FitResult>>({})

	const planKeys = React.useMemo(
		() => entries.map((entry) => entry.id),
		[entries],
	)
	const spillPlan = useSpillPlan(planKeys)
	const pending = useAutofitPending()

	const cards = React.useMemo(
		() =>
			entries.flatMap((entry) =>
				spillPlan.partsFor(entry.id).map((part) => ({ entry, part })),
			),
		[entries, spillPlan.partsFor],
	)

	const report = React.useMemo<CreatureMeasureReport>(() => {
		const rows = entries.map((entry) => {
			const parts = spillPlan.partsFor(entry.id)
			const sizes = parts
				.map((part) => fits[`${entry.id}#${part.part}`]?.size)
				.filter((size): size is number => typeof size === 'number')
			return {
				name: entry.creature.name,
				tier: entry.creature.tier,
				category: entry.creature.category,
				cards: parts.length,
				size: sizes.length > 0 ? Math.min(...sizes) : 0,
				oversize: spillPlan.oversize.includes(entry.id),
			}
		})
		const byTier: Record<number, { creatures: number; cards: number }> = {}
		rows.forEach((row) => {
			const bucket = (byTier[row.tier] ??= { creatures: 0, cards: 0 })
			bucket.creatures += 1
			bucket.cards += row.cards
		})
		return {
			creatures: rows.length,
			cards: rows.reduce((total, row) => total + row.cards, 0),
			continuations: spillPlan.continuations,
			oversize: spillPlan.oversize,
			atFloor: rows.filter((row) => row.size > 0 && row.size <= 6.5).length,
			byTier,
			rows,
		}
	}, [
		entries,
		fits,
		spillPlan.partsFor,
		spillPlan.continuations,
		spillPlan.oversize,
	])

	const settled = pending === 0 && Object.keys(fits).length >= cards.length
	React.useEffect(() => {
		if (typeof window === 'undefined') return
		window.__creatureCardsMeasure = settled ? report : undefined
	}, [settled, report])

	return (
		<main style={{ padding: '1rem' }}>
			<h1>Creature card bench</h1>
			<p>
				{settled ? 'settled' : `fitting… (${pending} cards measuring)`} ·{' '}
				<strong>{report.creatures}</strong> creatures ·{' '}
				<strong>{report.cards}</strong> cards ·{' '}
				<strong>{report.continuations}</strong> continuations ·{' '}
				<strong>{report.atFloor}</strong> at the 6.5pt floor ·{' '}
				<strong>{report.oversize.length}</strong> over budget
			</p>
			{errors.length > 0 && (
				<p>
					{errors.length} catalogue entries could not be adapted:{' '}
					{errors.map((e) => `${e.name} (${e.reason})`).join(', ')}
				</p>
			)}
			<div
				style={{
					display: 'flex',
					flexWrap: 'wrap',
					gap: '4mm',
					background: '#ddd',
					padding: '4mm',
				}}
			>
				{cards.map(({ entry, part }) => (
					<CreatureCompactCard
						key={`${entry.id}#${part.part}`}
						{...entry.creature}
						start={part.start}
						end={part.end}
						part={part.part}
						totalParts={part.totalParts}
						onFitted={(result) => {
							spillPlan.report(entry.id, part.start, result)
							setFits((current) => ({
								...current,
								[`${entry.id}#${part.part}`]: result,
							}))
						}}
					/>
				))}
			</div>
		</main>
	)
}

export default function CreatureCardBench() {
	if (process.env.NODE_ENV !== 'development') return null
	return (
		<Layout title="Creature card bench" noFooter>
			<Bench />
		</Layout>
	)
}
