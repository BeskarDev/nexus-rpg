import { Box, MenuItem, Select } from '@mui/material'
import { RollDie } from '@site/src/components/codex/RollDie'
import React, { useEffect, useRef, useState } from 'react'

const COUNT_OPTIONS = [1, 2, 3, 5, 10]

/** How many rolls the log keeps before the oldest fall off the bottom. */
const LOG_LIMIT = 24

/**
 * Short answers are names and read as one; long answers are composed prose.
 * The threshold is a measurement of the corpus rather than a preference: every
 * single-field generator returns well under this (e.g. "Kethran", 7 chars;
 * "Elan al-Dunn", 12 chars), while treasure descriptions and composed results
 * run well over it (e.g. "bundle of scrolls (painted, durable). (Q3, ~50
 * coins)", 51 chars).
 */
const NAMELIKE_LENGTH = 30

interface AutoRollerGroup {
	id: string
	label: string
}

export interface AutoRollerOption {
	id: string
	label: string
}

interface AutoRollerProps {
	title: string
	groups: AutoRollerGroup[]
	generateResult: (groupId: string, useGerman?: boolean) => string
	defaultGroup?: string
	/**
	 * Per-surface switches, shown in the caption line.
	 *
	 * D4: the German-family-names checkbox was one page's exception living inside
	 * a shared component, which is how a component grows a prop per consumer. It
	 * is the first instance of an options slot now — and it keeps its old prop
	 * name at the call site because `generateName` takes a bare boolean.
	 */
	showGermanToggle?: boolean
	/**
	 * Extra selects for a surface that needs more than "which table" — treasure
	 * asks for a sub-category and a Quality, quests for a party level.
	 *
	 * They sit in the bar beside the table select and the caller owns their state,
	 * because the value has to reach that caller's own `generateResult` closure.
	 * Before this existed, both of those surfaces reimplemented the ENTIRE roller
	 * — controls, results list and all — to add one dropdown, which is how a
	 * component with no extension point grows two copies of itself.
	 */
	extraControls?: React.ReactNode
	/** Told when the reader picks a different table, for a surface whose extra
	 *  controls depend on it (treasure's sub-categories belong to its groups). */
	onGroupChange?: (groupId: string) => void
}

/**
 * One labelled control in the oracle's bar, so a surface adding a select does not
 * also restyle one.
 */
export const OracleField: React.FC<{
	label: string
	children: React.ReactNode
}> = ({ label, children }) => (
	<div className="cs-oracle__field">
		<span className="cs-oracle__label">{label}</span>
		{children}
	</div>
)

/**
 * The oracle (M14 S2).
 *
 * ## What it was
 *
 * An MUI `Card` holding a `Select`, a `Checkbox`, a `Button` and a `<Typography>`
 * list. The controls that produced an answer were the largest thing in it, and the
 * answer was the smallest — a plain paragraph beneath the form that submitted it.
 *
 * ## What it is
 *
 * A random table is an **oracle**: you ask it a question and it answers. Three
 * things follow, and they are the whole design.
 *
 * 1. **The answer is the subject.** The newest roll reads at display size in the
 *    serif this site uses for a named thing. Everything else is quieter than it.
 * 2. **Rolling again is the primary act.** One control, the loudest thing in the
 *    instrument, fixed so the hand returns to the same place. `Enter` anywhere
 *    inside rolls again without moving.
 * 3. **A roll has a history.** Rolling five and keeping the third is the actual
 *    workflow (D2), and the old component discarded every previous answer. They
 *    accumulate, newest first, until the reader clears them.
 *
 * ## One result shape, sized by its length
 *
 * D1: every generator in `generators.ts` returns a **string** — sometimes a word
 * (`Kethran`), sometimes a paragraph (a settlement's twelve composed facts). So
 * there is one result type and the presentation adapts to LENGTH, rather than to
 * a per-surface `kind` prop nobody could keep straight. Inventing a record type
 * the generators cannot fill would have been a shape for its own sake.
 */
export const AutoRoller: React.FC<AutoRollerProps> = ({
	title,
	groups,
	generateResult,
	defaultGroup,
	showGermanToggle = false,
	extraControls,
	onGroupChange,
}) => {
	const [selectedGroup, setSelectedGroup] = useState<string>(
		defaultGroup || groups[0]?.id || '',
	)
	const [count, setCount] = useState<number>(1)
	const [log, setLog] = useState<string[]>([])
	const [useGerman, setUseGerman] = useState(false)
	const [highlighted, setHighlighted] = useState(false)
	const [newCount, setNewCount] = useState(0)

	/** Held so a roll that is still fading can be cancelled — both when the next
	 *  roll restarts it and when the component unmounts mid-fade. */
	const fadeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
	useEffect(
		() => () => {
			if (fadeTimer.current !== null) clearTimeout(fadeTimer.current)
		},
		[],
	)

	const handleRoll = () => {
		const rolled: string[] = []
		for (let i = 0; i < count; i += 1) {
			rolled.push(generateResult(selectedGroup, useGerman))
		}
		setLog((previous) => [...rolled.reverse(), ...previous].slice(0, LOG_LIMIT))
		setHighlighted(true)
		setNewCount(count)
		if (fadeTimer.current !== null) clearTimeout(fadeTimer.current)
		fadeTimer.current = setTimeout(() => {
			setHighlighted(false)
			setNewCount(0)
			fadeTimer.current = null
		}, 800)
	}

	const [newest, ...older] = log
	const isNamelike = newest !== undefined && newest.length <= NAMELIKE_LENGTH

	return (
		<Box
			className="cs-tokens cs-oracle"
			onKeyDown={(event) => {
				if (event.key === 'Enter') {
					event.preventDefault()
					handleRoll()
				}
			}}
		>
			<Box className="cs-oracle__bar">
				<Box className="cs-oracle__field cs-oracle__field--main">
					<span className="cs-oracle__label">{title}</span>
					<Select
						value={selectedGroup}
						variant="outlined"
						size="small"
						onChange={(event) => {
							setSelectedGroup(event.target.value)
							onGroupChange?.(event.target.value)
						}}
						className="cs-oracle__select"
						inputProps={{ 'aria-label': `${title}: which table` }}
					>
						{groups.map((group) => (
							<MenuItem key={group.id} value={group.id}>
								{group.label}
							</MenuItem>
						))}
					</Select>
				</Box>

				{extraControls}

				{/* The die IS the control (owner review). It was a bronze `Roll` slab,
					which said the right thing about hierarchy and the wrong thing about
					the act: a rolled answer that simply appears has been computed, not
					rolled. This is the same die `TreasureTable` presses on a creature
					card, tumble and all — and the same one every `RollableTable` inside
					this page's folds now presses, so one page no longer holds two roll
					buttons that behave differently. */}
				<RollDie
					label={`Roll on ${title}`}
					size={22}
					className="cs-oracle__roll"
					onRoll={handleRoll}
				>
					<span className="cs-oracle__roll-word">Roll</span>
				</RollDie>
			</Box>

			{/* The count and any per-surface switch: a caption line, not co-equal
				fields. A reader changes the table constantly and the count rarely. */}
			<Box className="cs-oracle__caption">
				<span className="cs-oracle__count-field">
					<span className="cs-oracle__caption-label">Rolls</span>
					<Select
						value={count}
						variant="standard"
						disableUnderline
						onChange={(event) => setCount(Number(event.target.value))}
						className="cs-oracle__count"
						inputProps={{ 'aria-label': 'How many rolls at once' }}
					>
						{COUNT_OPTIONS.map((option) => (
							<MenuItem key={option} value={option}>
								{option}
							</MenuItem>
						))}
					</Select>
				</span>
				{showGermanToggle && (
					<label className="cs-oracle__switch">
						<input
							type="checkbox"
							checked={useGerman}
							onChange={(event) => setUseGerman(event.target.checked)}
						/>
						German family names
					</label>
				)}
				{log.length > 0 && (
					<Box
						component="button"
						type="button"
						className="cs-oracle__clear"
						onClick={() => setLog([])}
					>
						Clear
					</Box>
				)}
			</Box>

			{/* The answer. Rendered even when empty, so the instrument does not resize
				under the reader's hand on the first roll. */}
			<Box className="cs-oracle__answer" aria-live="polite">
				{newest === undefined ? (
					<span className="cs-oracle__empty">
						Not yet asked. Pick a table and roll.
					</span>
				) : (
					<p
						className={[
							'cs-oracle__struck',
							isNamelike ? null : 'is-prose',
							highlighted ? 'is-highlighted' : null,
						]
							.filter(Boolean)
							.join(' ')}
					>
						{newest}
					</p>
				)}
			</Box>

			{older.length > 0 && (
				<Box className="cs-oracle__log">
					<span className="cs-oracle__log-label">Earlier</span>
					<ol>
						{older.map((entry, index) => (
							<li
								key={`${index}-${entry.slice(0, 24)}`}
								className={index < newCount - 1 ? 'is-new' : undefined}
							>
								{entry}
							</li>
						))}
					</ol>
				</Box>
			)}
		</Box>
	)
}
