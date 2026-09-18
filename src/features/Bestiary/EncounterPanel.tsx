import React, { useId, useMemo, useState } from 'react'
import Link from '@docusaurus/Link'
import type { CreatureIndexEntry } from '@site/src/types/CreatureIndex'
import SigilIcon from '@site/src/components/codex/SigilIcon'
import StatSigil from '@site/src/components/codex/StatSigil'
import { Cartouche, LozengeDivider } from '@site/src/components/codex/ornaments'
import {
	COUNT_MAX,
	Encounter,
	PARTY_LEVEL_MAX,
	PARTY_SIZE_MAX,
	SavedEncounter,
	missingMembers,
	setCount,
	setTroop,
	toLines,
	toggleCircumstance,
	totalHitPoints,
} from './encounter'
import {
	CIRCUMSTANCES,
	MIN_TROOP_SIZE,
	assessEncounter,
	lineThreat,
} from './threat'
import styles from './BestiaryBrowser.module.css'

/**
 * The print deck, which takes the same `<name>~<tier>` keys the encounter is
 * saved and shared by. Each creature travels once however many are in the
 * fight: a card says how the creature works, so five goblins want one card
 * between them.
 */
const printHref = (encounter: Encounter): string =>
	`/docs/gm-tools/printing/creature-cards?print=${encodeURIComponent(
		encounter.members.map((member) => member.key).join(','),
	)}`

/**
 * One figure in the verdict: a mark, a numeral, a label under it — the same
 * construction a creature's stat block uses, because a GM is reading the same
 * kind of thing (how much of this is there).
 */
const Figure: React.FC<{
	value: React.ReactNode
	label: string
	glyph: React.ReactNode
}> = ({ value, label, glyph }) => (
	<div className={styles.figure}>
		<span className={styles.figureValue}>
			{glyph}
			{value}
		</span>
		<span className={styles.figureLabel}>{label}</span>
	</div>
)

/**
 * The encounter under construction, priced against the party.
 *
 * ## Three zones, not one panel
 *
 * The first version was a single wash holding a table, a verdict, seven toggles
 * and a save row at one visual weight, and there was nowhere for the eye to
 * land. It is now three: the ROSTER (who is in the fight), the VERDICT (what
 * that costs, carrying its own keyline because it is the answer and the roster
 * is the working), and the SCENE beneath them (what modifies it, and what to do
 * with it). Each is separated the way the codex separates things — a cartouche
 * label, a wash, and space — never a bar.
 *
 * Everything shown is derived: the panel holds no numbers of its own, so a
 * revision to the rules moves this display without being re-entered. The
 * arithmetic is `threat.ts`, which implements the published Building Encounters
 * page.
 */
export const EncounterPanel: React.FC<{
	encounter: Encounter
	roster: Map<string, CreatureIndexEntry>
	saved: SavedEncounter[]
	onChange: (encounter: Encounter) => void
	onSave: (name: string) => void
	onLoad: (name: string) => void
	onDelete: (name: string) => void
	onClear: () => void
}> = ({
	encounter,
	roster,
	saved,
	onChange,
	onSave,
	onLoad,
	onDelete,
	onClear,
}) => {
	const [saveName, setSaveName] = useState('')
	const [copied, setCopied] = useState(false)
	/**
	 * Minimised, the panel keeps its verdict on the header line and gives the
	 * page back to the table. A GM who is still browsing does not need the
	 * roster in front of them, but does want to know what they have built.
	 */
	const [collapsed, setCollapsed] = useState(false)
	const bodyId = useId()
	const { party } = encounter

	const steps = useMemo(
		() =>
			CIRCUMSTANCES.filter((c) =>
				encounter.circumstances.includes(c.id),
			).reduce((sum, c) => sum + c.step, 0),
		[encounter.circumstances],
	)

	const assessment = useMemo(
		() =>
			assessEncounter(
				toLines(encounter, roster),
				party.size,
				party.level,
				steps,
			),
		[encounter, roster, party.size, party.level, steps],
	)

	const bodies = encounter.members.reduce((sum, m) => sum + m.count, 0)
	const missing = missingMembers(encounter, roster)
	const hitPoints = totalHitPoints(encounter, roster)
	const deadly = Math.max(1, assessment.budgets.Deadly)
	// The bar runs to the Deadly threshold, because that is the line a GM is
	// actually watching. Past it the bar is full and the band says the rest.
	const barPercent = Math.min(100, (assessment.total / deadly) * 100)

	return (
		<section className={styles.encounter} aria-label="Encounter">
			<header className={styles.encounterHead}>
				<button
					type="button"
					className={styles.encounterToggle}
					aria-expanded={!collapsed}
					aria-controls={bodyId}
					onClick={() => setCollapsed((current) => !current)}
				>
					<SigilIcon name="blades" size={16} className={styles.titleGlyph} />
					<span className={styles.encounterTitle}>Encounter</span>
					<span aria-hidden="true" className={styles.headCaret}>
						{collapsed ? '▸' : '▾'}
					</span>
				</button>
				{/* Minimised, the header carries the answer: how many, what it costs,
				    and what that reads as. */}
				{collapsed && (
					<span className={styles.encounterSummary}>
						{bodies} {bodies === 1 ? 'creature' : 'creatures'},{' '}
						{assessment.total} TP,{' '}
						<strong
							className={styles.summaryBand}
							data-band={assessment.adjusted}
						>
							{assessment.adjusted}
						</strong>
					</span>
				)}
				<button type="button" className={styles.clear} onClick={onClear}>
					Empty it
				</button>
			</header>

			{/* The divider belongs to the open panel. Minimised, the header is the
			    whole thing and an ornament under it is a rule with nothing to rule
			    off. */}
			{!collapsed && <LozengeDivider compact />}

			{/* Rendered and `hidden` rather than unmounted, so `aria-controls` always
			    points at something and nothing is rebuilt on a toggle. */}
			<div className={styles.encounterGrid} id={bodyId} hidden={collapsed}>
				<div className={styles.zone + ' ' + styles.partyZone}>
					<Cartouche compact glyph="figure">
						Party
					</Cartouche>
					<div className={styles.partyBlock}>
						<label className={styles.partyControl}>
							<select
								aria-label="Party size"
								value={party.size}
								onChange={(event) =>
									onChange({
										...encounter,
										party: { ...party, size: Number(event.target.value) },
									})
								}
							>
								{Array.from({ length: PARTY_SIZE_MAX }, (_, i) => i + 1).map(
									(size) => (
										<option key={size} value={size}>
											{size}
										</option>
									),
								)}
							</select>
							adventurers
						</label>
						<label className={styles.partyControl}>
							at level
							<select
								aria-label="Party level"
								value={party.level}
								onChange={(event) =>
									onChange({
										...encounter,
										party: { ...party, level: Number(event.target.value) },
									})
								}
							>
								{Array.from({ length: PARTY_LEVEL_MAX + 1 }, (_, i) => i).map(
									(level) => (
										<option key={level} value={level}>
											{level}
										</option>
									),
								)}
							</select>
						</label>
					</div>
				</div>

				<div className={styles.zone + ' ' + styles.rosterZone}>
					<Cartouche compact glyph="standard">
						Roster
					</Cartouche>
					<table className={styles.encounterTable}>
						<thead>
							<tr>
								<th scope="col">Creature</th>
								<th scope="col">Number</th>
								<th scope="col">Troop</th>
								<th scope="col" className={styles.numeric}>
									TP
								</th>
							</tr>
						</thead>
						<tbody>
							{encounter.members.map((member) => {
								const entry = roster.get(member.key)
								if (!entry) return null
								const threat = lineThreat(
									{
										tier: entry.tier,
										category: entry.category,
										count: member.count,
										troop: member.troop,
									},
									party.level,
								)
								const canTroop =
									entry.category === 'Basic' && member.count >= MIN_TROOP_SIZE
								return (
									<tr key={member.key}>
										<th scope="row" className={styles.encounterName}>
											{entry.name}
											<span className={styles.encounterMeta}>
												{` T${entry.tier} ${entry.category}`}
											</span>
										</th>
										<td>
											<div className={styles.stepper}>
												<button
													type="button"
													aria-label={`One fewer ${entry.name}`}
													onClick={() =>
														onChange(
															setCount(encounter, member.key, member.count - 1),
														)
													}
												>
													−
												</button>
												<input
													type="number"
													min={0}
													max={COUNT_MAX}
													aria-label={`Number of ${entry.name}`}
													value={member.count}
													onChange={(event) =>
														onChange(
															setCount(
																encounter,
																member.key,
																Number(event.target.value),
															),
														)
													}
												/>
												<button
													type="button"
													aria-label={`One more ${entry.name}`}
													onClick={() =>
														onChange(
															setCount(encounter, member.key, member.count + 1),
														)
													}
												>
													+
												</button>
											</div>
										</td>
										<td>
											{canTroop ? (
												<button
													type="button"
													className={styles.troopToggle}
													aria-pressed={member.troop}
													onClick={() =>
														onChange(
															setTroop(encounter, member.key, !member.troop),
														)
													}
												>
													{member.troop ? 'One unit' : 'Separate'}
												</button>
											) : (
												<span
													className={styles.troopNone}
													title={
														entry.category === 'Basic'
															? `Troops need ${MIN_TROOP_SIZE} or more`
															: 'Only Basic creatures form troops'
													}
												>
													—
												</span>
											)}
										</td>
										<td className={`${styles.numeric} ${styles.lineThreat}`}>
											{threat}
										</td>
									</tr>
								)
							})}
						</tbody>
					</table>
					{missing.length > 0 && (
						<p className={styles.encounterWarning}>
							{missing.length} creature{missing.length > 1 ? 's are' : ' is'} no
							longer in the bestiary and {missing.length > 1 ? 'have' : 'has'}{' '}
							been left out of the total:{' '}
							{missing.map((member) => member.key.split('~')[0]).join(', ')}.
						</p>
					)}
				</div>

				<div className={`${styles.zone} ${styles.verdict}`}>
					<Cartouche compact glyph="scales">
						Threat
					</Cartouche>
					<strong
						className={styles.verdictBand}
						data-band={assessment.adjusted}
					>
						{assessment.adjusted}
					</strong>
					<div
						className={styles.budgetBar}
						role="img"
						aria-label={`${assessment.total} of ${deadly} threat points to Deadly`}
					>
						{/* Ticks at the thresholds, so the bar says WHERE in the budget the
						    fight sits rather than only how full it is. */}
						{(['Easy', 'Moderate', 'Hard'] as const).map((band) => (
							<span
								key={band}
								className={styles.budgetTick}
								style={{
									left: `${(assessment.budgets[band] / deadly) * 100}%`,
								}}
							/>
						))}
						<span
							className={styles.budgetFill}
							data-band={assessment.adjusted}
							style={{ width: `${barPercent}%` }}
						/>
					</div>
					<p className={styles.verdictLine}>
						{assessment.total} TP against a budget of{' '}
						{assessment.budgets.Moderate} moderate, {assessment.budgets.Hard}{' '}
						hard, {assessment.budgets.Deadly} deadly
						{assessment.actionMultiplier > 1 &&
							` (${assessment.baseTotal} × ${assessment.actionMultiplier} for action economy)`}
					</p>

					<div className={styles.figures}>
						<Figure
							value={assessment.creatureActions}
							label="Creature turns"
							glyph={
								<SigilIcon
									name="hourglass"
									size={13}
									className={styles.figureGlyph}
								/>
							}
						/>
						<Figure
							value={party.size}
							label="Party turns"
							glyph={
								<StatSigil
									name="party"
									size={13}
									className={styles.figureGlyph}
								/>
							}
						/>
						<Figure
							value={hitPoints}
							label="HP in total"
							glyph={
								<StatSigil name="hp" size={13} className={styles.figureGlyph} />
							}
						/>
					</div>

					{steps !== 0 && assessment.adjusted !== assessment.difficulty && (
						<p className={styles.verdictNote}>
							{`Circumstances move this ${Math.abs(steps)} step${
								Math.abs(steps) > 1 ? 's' : ''
							} ${steps > 0 ? 'up' : 'down'} from ${assessment.difficulty}.`}
						</p>
					)}
					{steps > 0 && assessment.adjusted === assessment.difficulty && (
						<p className={styles.verdictNote}>
							Circumstances cannot push this past Deadly.
						</p>
					)}
					{assessment.notes.map((note) => (
						<p key={note} className={styles.encounterNote}>
							{note}
						</p>
					))}
				</div>

				<div className={styles.zone + ' ' + styles.circumstanceZone}>
					<Cartouche compact glyph="eye">
						Circumstances
					</Cartouche>
					<div className={styles.circumstances}>
						{CIRCUMSTANCES.map((circumstance) => (
							<button
								key={circumstance.id}
								type="button"
								className={styles.toggleChip}
								aria-pressed={encounter.circumstances.includes(circumstance.id)}
								onClick={() =>
									onChange(toggleCircumstance(encounter, circumstance.id))
								}
							>
								{circumstance.label}
								<span aria-hidden="true" className={styles.stepMark}>
									{circumstance.step > 0 ? '↑' : '↓'}
								</span>
							</button>
						))}
					</div>
				</div>

				<div className={styles.zone + ' ' + styles.keepZone}>
					<Cartouche compact glyph="scroll">
						Keep it
					</Cartouche>
					<div className={styles.saveRow}>
						<input
							type="text"
							className={styles.saveName}
							placeholder="Name this encounter…"
							aria-label="Encounter name"
							value={saveName}
							onChange={(event) => setSaveName(event.target.value)}
						/>
						<button
							type="button"
							className={styles.footButton}
							disabled={!saveName.trim() || encounter.members.length === 0}
							onClick={() => {
								onSave(saveName)
								setSaveName('')
							}}
						>
							Save
						</button>
						<Link className={styles.footButton} to={printHref(encounter)}>
							<SigilIcon name="pack" size={12} className={styles.footGlyph} />
							Print these cards
						</Link>
						<button
							type="button"
							className={styles.footButton}
							onClick={async () => {
								// `navigator.clipboard` is missing outside a secure context and
								// can reject when the document is not focused. The address bar
								// already holds the link, so a failure costs the GM nothing
								// they did not already have.
								try {
									await navigator.clipboard?.writeText(window.location.href)
									setCopied(true)
									window.setTimeout(() => setCopied(false), 2000)
								} catch {
									setCopied(false)
								}
							}}
						>
							<SigilIcon name="knot" size={12} className={styles.footGlyph} />
							{copied ? 'Link copied' : 'Copy link'}
						</button>
					</div>
					{saved.length > 0 && (
						<div className={styles.savedList}>
							{saved.map((item) => (
								<span key={item.name} className={styles.savedItem}>
									<button
										type="button"
										className={styles.savedLoad}
										onClick={() => onLoad(item.name)}
									>
										{item.name}
									</button>
									<button
										type="button"
										className={styles.savedDelete}
										aria-label={`Delete ${item.name}`}
										onClick={() => onDelete(item.name)}
									>
										×
									</button>
								</span>
							))}
						</div>
					)}
					<p className={styles.saveNote}>
						Saved encounters live in this browser only. The page address carries
						the whole encounter, so a link is how you move one to another device
						or hand it to someone else.
					</p>
				</div>
			</div>
		</section>
	)
}
