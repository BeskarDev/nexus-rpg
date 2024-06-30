import {
	DarkMode,
	Fireplace,
	SvgIconComponent,
	Thunderstorm,
} from '@mui/icons-material'
import {
	Button,
	ButtonGroup,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	SvgIcon,
} from '@mui/material'
import React, { useState } from 'react'
import { DeepPartial } from '../../CharacterSheetContainer'
import { Character } from '../../types/Character'

export type RestingButtonGroupProps = {
	character: Character
	updateCharacter: (update: DeepPartial<Character>) => void
}

type RestingType = 'shortBreak' | 'nightsRest' | 'badNight'
const restingOptions: {
	[type in RestingType]: {
		icon: SvgIconComponent
		title: string
		description: React.ReactNode
	}
} = {
	shortBreak: {
		icon: Fireplace,
		title: 'Short Break',
		description: (
			<>
				<p>
					This condition is met after one delving turn, during which you had a
					few moments to breathe and calm down. Being in an imminently dangerous
					place might hinder you from taking a short break until you find a safe
					or hidden place.
				</p>
				<p>Benefits of a short break include:</p>
				<ul>
					<li>regain all of your HP (auto)</li>
					<li>regain all “once per combat” Abilities</li>
					<li>short-lasting effects end</li>
				</ul>
			</>
		),
	},
	nightsRest: {
		icon: DarkMode,
		title: "Night's Rest",
		description: (
			<>
				<p>
					After setting up camp, having a decent meal, and having a full night's
					sleep, you gain the following benefits:
				</p>
				<ul>
					<li>regain up to 1 Resolve (auto)</li>
					<li>regain all of your Focus (auto)</li>
					<li>regain 1/day Abilities</li>
					<li>lose two Fatigue (auto)</li>
					<li>
						roll a hard Strength + Fortitude test to heal one previously treated
						Injury
					</li>
					<li>long-lasting effects end</li>
				</ul>
				<p>
					A night’s rest needs to last at least 8 hours, from which 2 hours can
					be used for light non-physical activity.
				</p>
			</>
		),
	},
	badNight: {
		icon: Thunderstorm,
		title: 'Bad Night',
		description: (
			<>
				<p>
					This option is met when you weren’t able to establish a proper camp
					for a night’s rest. This can happen, because you are out of food, the
					navigator couldn’t find good shelter during bad weather, or heavy
					interruption of your sleep. Instead of the benefits of a night’s rest,
					you:
				</p>
				<ul>
					<li>regain 1/2 your max. Focus (auto)</li>
					<li>regain 1/day Abilities</li>
					<li>lose one Fatigue (auto)</li>
					<li>long-lasting effects end</li>
				</ul>
			</>
		),
	},
}

export const RestingButtonGroup: React.FC<RestingButtonGroupProps> = ({
	character,
	updateCharacter,
}) => {
	const [open, setOpen] = useState(false)
	const [dialogType, setDialogType] = useState<RestingType>('shortBreak')

	const handleOpen = (type: RestingType) => {
		setDialogType(type)
		setOpen(true)
	}

	const handleAbort = () => {
		setOpen(false)
	}

	const sortWounds = (a: string, b: string) => {
		const woundOrder: string[] = ['woundThree', 'woundTwo', 'woundOne']
		return woundOrder.indexOf(a) - woundOrder.indexOf(b) // explains itself
	}

	const removeFatigue = (amount: number) => {
		const { current, temp, total, ...wounds } = character.statistics.health
		let i = amount
		Object.keys(wounds)
			.sort((a, b) => sortWounds(a, b))
			.map((w) => {
				if (i === 0) {
					return
				}
				if (i > 0 && character.statistics.health[w].fatigueTwo) {
					updateCharacter({
						statistics: { health: { [w]: { fatigueTwo: false } } },
					})
					i--
				}
				if (i > 0 && character.statistics.health[w].fatigueOne) {
					updateCharacter({
						statistics: { health: { [w]: { fatigueOne: false } } },
					})
					i--
				}
			})
	}

	const handleConfirm = async () => {
		switch (dialogType) {
			case 'shortBreak':
				updateCharacter({
					statistics: {
						health: { current: character.statistics.health.total },
					},
				})
				break
			case 'nightsRest':
				removeFatigue(2)
				updateCharacter({
					statistics: {
						health: { current: character.statistics.health.total },
						resolve: Math.max(character.statistics.resolve, 1),
					},
					spells: {
						focus: {
							current: character.spells.focus.total,
						},
					},
				})
				break
			case 'badNight':
				removeFatigue(1)
				updateCharacter({
					statistics: {
						health: { current: character.statistics.health.total },
					},
					spells: {
						focus: {
							current: Math.min(
								character.spells.focus.total,
								character.spells.focus.current +
									Math.floor(character.spells.focus.total / 2),
							),
						},
					},
				})
				break
			default:
				break
		}
		setOpen(false)
	}

	return (
		<>
			<ButtonGroup variant="outlined">
				<Button onClick={() => handleOpen('shortBreak')}>Short Break</Button>
				<Button onClick={() => handleOpen('nightsRest')}>Night's Rest</Button>
				<Button onClick={() => handleOpen('badNight')}>Bad Night</Button>
			</ButtonGroup>
			<Dialog open={open} onClose={handleAbort} fullWidth maxWidth="xs">
				<DialogTitle
					sx={{
						borderBottom: 1,
						borderColor: 'divider',
						mb: 2,
						display: 'flex',
						alignItems: 'center',
						gap: 1,
					}}
				>
					<SvgIcon component={restingOptions[dialogType].icon} />
					{restingOptions[dialogType].title}
				</DialogTitle>
				<DialogContent>
					<DialogContentText sx={{ mb: 2 }}>
						{restingOptions[dialogType].description}
					</DialogContentText>
				</DialogContent>
				<DialogActions sx={{ p: 2 }}>
					<Button onClick={handleAbort}>Cancel</Button>
					<Button variant="contained" onClick={handleConfirm} autoFocus>
						Apply
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}
