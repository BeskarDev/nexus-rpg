import { TextField } from '@mui/material'
import React, { useState } from 'react'
import conditionsData from '../../utils/data/json/conditions.json'

const DAMAGE_TYPES = [
	'physical',
	'fire',
	'frost',
	'lightning',
	'poison',
	'necrotic',
	'radiant',
	'psychic',
	'acid',
	'force',
	'sonic',
]

const CONDITIONS = (conditionsData as { name: string }[]).map((c) => c.name)

type TabId = 'damage' | 'conditions' | 'other'

interface MultiSelectTabsProps {
	label: string
	value: string[]
	onChange: (values: string[]) => void
}

/**
 * A tabbed chip-picker replacing the free-text comma list for immunities,
 * resistances, and weaknesses (M16).
 *
 * Three tabs: Damage Types, Conditions, Other (custom text entry).
 * The combined selection is sorted alphabetically before calling onChange —
 * the same order the markdown output needs.
 */
export const MultiSelectTabs: React.FC<MultiSelectTabsProps> = ({
	label,
	value,
	onChange,
}) => {
	const [activeTab, setActiveTab] = useState<TabId>('damage')
	const [customInput, setCustomInput] = useState('')

	const toggle = (item: string) => {
		const next = value.includes(item)
			? value.filter((v) => v !== item)
			: [...value, item].sort()
		onChange(next)
	}

	const addCustom = () => {
		const trimmed = customInput.trim()
		if (!trimmed || value.includes(trimmed)) return
		onChange([...value, trimmed].sort())
		setCustomInput('')
	}

	const remove = (item: string) => {
		onChange(value.filter((v) => v !== item))
	}

	const TABS: { id: TabId; label: string }[] = [
		{ id: 'damage', label: 'Damage Types' },
		{ id: 'conditions', label: 'Conditions' },
		{ id: 'other', label: 'Other' },
	]

	return (
		<div className="cb-multi-tabs">
			<span className="cb-field__label">{label}</span>

			<div className="cb-multi-tabs__strip" role="tablist" aria-label={label}>
				{TABS.map((tab) => (
					<button
						key={tab.id}
						role="tab"
						type="button"
						aria-selected={activeTab === tab.id}
						className={`cb-multi-tabs__tab${activeTab === tab.id ? ' is-active' : ''}`}
						onClick={() => setActiveTab(tab.id)}
					>
						{tab.label}
					</button>
				))}
			</div>

			<div
				className="cb-multi-tabs__panel"
				role="tabpanel"
				aria-label={`${label} — ${activeTab}`}
			>
				{activeTab === 'damage' && (
					<div className="cb-multi-chips">
						{DAMAGE_TYPES.map((type) => (
							<button
								key={type}
								type="button"
								className={`cb-multi-chip${value.includes(type) ? ' is-selected' : ''}`}
								aria-pressed={value.includes(type)}
								onClick={() => toggle(type)}
							>
								{type}
							</button>
						))}
					</div>
				)}

				{activeTab === 'conditions' && (
					<div className="cb-multi-chips">
						{CONDITIONS.map((condition) => (
							<button
								key={condition}
								type="button"
								className={`cb-multi-chip${value.includes(condition) ? ' is-selected' : ''}`}
								aria-pressed={value.includes(condition)}
								onClick={() => toggle(condition)}
							>
								{condition}
							</button>
						))}
					</div>
				)}

				{activeTab === 'other' && (
					<div className="cb-multi-tabs__other">
						<TextField
							value={customInput}
							size="small"
							placeholder="Custom value…"
							onChange={(e) => setCustomInput(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === 'Enter') {
									e.preventDefault()
									addCustom()
								}
							}}
							inputProps={{ 'aria-label': `Custom ${label.toLowerCase()} value` }}
						/>
						<button
							type="button"
							className="cb-entry__add"
							onClick={addCustom}
							disabled={
								!customInput.trim() || value.includes(customInput.trim())
							}
						>
							Add
						</button>
					</div>
				)}
			</div>

			{value.length > 0 && (
				<div className="cb-multi-current" aria-label={`Selected ${label}`}>
					{value.map((item) => (
						<button
							key={item}
							type="button"
							className="cb-multi-current__item"
							onClick={() => remove(item)}
							aria-label={`Remove ${item}`}
						>
							{item} ×
						</button>
					))}
				</div>
			)}
		</div>
	)
}
