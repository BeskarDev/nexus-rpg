import React from 'react'
import { SigilPip } from '../../../components'

interface CompanionWoundCheckboxProps {
	wounded: boolean
	onWoundedChange: (wounded: boolean) => void
}

/**
 * M9 S11: now the shared `SigilPip`. The stopPropagation stays local — a
 * companion pip sits inside a clickable row, which no other pip does.
 */
export const CompanionWoundCheckbox: React.FC<CompanionWoundCheckboxProps> = ({
	wounded,
	onWoundedChange,
}) => (
	<span onClick={(e) => e.stopPropagation()}>
		<SigilPip
			sigil="wound"
			emptySigil="hp"
			tone="error.main"
			size="1.5rem"
			filled={wounded}
			onToggle={() => onWoundedChange(!wounded)}
			label="Wounded"
			sx={{ p: 0.5 }}
		/>
	</span>
)
