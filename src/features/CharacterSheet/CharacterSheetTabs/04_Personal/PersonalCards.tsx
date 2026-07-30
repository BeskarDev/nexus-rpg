import React from 'react'
import { SheetField, FieldText } from '../../components'
import { UI_COLORS } from '../../../../utils/colors'
import type { SheetSigilName } from '@site/src/components/codex/stat-sigils'

interface SimpleTextCardProps {
	value: string
	onChange: (value: string) => void
	onBlur: () => void
	error?: string
	label: string
	sigil: SheetSigilName
	minWidth?: string
	maxWidth?: string
	multiline?: boolean
}

/**
 * A plain free-text identity card — Height, Weight, Age, Description.
 *
 * M9 S11: the `icon` prop became `sigil`. It used to take a rendered node, so
 * every convenience export below constructed its own `<StatSigil>` at the same
 * size and could have disagreed about it. The mark is now data, and `SheetField`
 * renders it.
 */
export const SimpleTextCard: React.FC<SimpleTextCardProps> = ({
	value,
	onChange,
	onBlur,
	error,
	label,
	sigil,
	minWidth = '5rem',
	maxWidth = '8rem',
	multiline = false,
}) => (
	<SheetField
		label={label}
		sigil={sigil}
		tone={UI_COLORS.greyBlue}
		minWidth={minWidth}
		maxWidth={maxWidth}
		// M9 S3: these are identity cards (name, folk, background...) — the
		// cartouche keystone's "this encloses a name" motif fits here more than
		// anywhere else in the sheet, and the Personal tab's grid gap already
		// clears the overhang.
		frame
	>
		<FieldText
			value={value}
			onChange={onChange}
			onBlur={onBlur}
			error={!!error}
			multiline={multiline}
		/>
	</SheetField>
)

// Convenience exports for common use cases
export const HeightCard: React.FC<
	Omit<SimpleTextCardProps, 'label' | 'sigil'>
> = (props) => <SimpleTextCard {...props} label="Height" sigil="height" />

export const WeightCard: React.FC<
	Omit<SimpleTextCardProps, 'label' | 'sigil'>
> = (props) => <SimpleTextCard {...props} label="Weight" sigil="weight" />

export const AgeCard: React.FC<Omit<SimpleTextCardProps, 'label' | 'sigil'>> = (
	props,
) => <SimpleTextCard {...props} label="Age" sigil="age" />

export const DescriptionCard: React.FC<
	Omit<
		SimpleTextCardProps,
		'label' | 'sigil' | 'multiline' | 'minWidth' | 'maxWidth'
	>
> = (props) => (
	<SimpleTextCard
		{...props}
		label="Description"
		sigil="description"
		minWidth="19.5rem"
		multiline
	/>
)
