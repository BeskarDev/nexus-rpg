import { Add, Remove } from '@mui/icons-material'
import { Box, Button, TextField, Typography } from '@mui/material'
import React from 'react'

export interface AdjustStepperProps {
	/** Section heading, e.g. "Damage / Healing". */
	title?: string
	/** Label for the subtract button — "Damage", "Spend". */
	decreaseLabel: string
	/** Label for the add button — "Healing", "Restore". */
	increaseLabel: string
	onDecrease: (amount: number) => void
	onIncrease: (amount: number) => void
}

/**
 * The spend-or-restore control shared by every gauge on the sheet (M9 S11).
 *
 * `HpCard`, `FocusCard` and `CompanionHPCard` each carried their own copy of
 * this: two outlined buttons in error and success, an amount field between them,
 * both disabled while the amount is zero, and a reset to zero after applying.
 * The only real difference was the pair of verbs, which is now a prop.
 *
 * It owns the amount, because the amount is scratch state that never belongs to
 * the character — every copy had to remember to clear it, and one of them
 * cleared it in two places.
 */
export const AdjustStepper: React.FC<AdjustStepperProps> = ({
	title = 'Damage / Healing',
	decreaseLabel,
	increaseLabel,
	onDecrease,
	onIncrease,
}) => {
	const [amount, setAmount] = React.useState(0)

	const apply = (direction: 'decrease' | 'increase') => {
		if (amount <= 0) return
		if (direction === 'decrease') onDecrease(amount)
		else onIncrease(amount)
		setAmount(0)
	}

	return (
		<>
			<Typography variant="subtitle2" sx={{ mb: 1 }}>
				{title}
			</Typography>
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
				<Button
					variant="outlined"
					color="error"
					size="small"
					onClick={() => apply('decrease')}
					startIcon={<Remove />}
					disabled={amount <= 0}
				>
					{decreaseLabel}
				</Button>
				<TextField
					type="number"
					size="small"
					label="Amount"
					value={amount}
					onChange={(event) => setAmount(Number(event.target.value))}
					sx={{ flexGrow: 1, maxWidth: '5rem' }}
					inputProps={{ min: 0, sx: { textAlign: 'center' } }}
				/>
				<Button
					variant="outlined"
					color="success"
					size="small"
					onClick={() => apply('increase')}
					startIcon={<Add />}
					disabled={amount <= 0}
				>
					{increaseLabel}
				</Button>
			</Box>
		</>
	)
}
