import {
	Box,
	Button,
	Card,
	CardContent,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Typography,
} from '@mui/material'
import React, { useState } from 'react'

interface CycleType {
	id: number
	name: string
	description: string
	diagramHint: string
}

const CYCLE_TYPES: CycleType[] = [
	{
		id: 1,
		name: 'Two Alternative Paths',
		description:
			'Two long paths lead to the same goal, each with different themes (e.g., monsters vs. traps). Both are equally challenging.',
		diagramHint: 'Two parallel routes from start to goal.',
	},
	{
		id: 2,
		name: 'Two Keys',
		description:
			'Two long paths lead to a locked goal room; each path contains a key that must be combined or used together to open the lock.',
		diagramHint: 'Two paths each leading to a key that unlocks a final goal.',
	},
	{
		id: 3,
		name: 'Hidden Shortcut',
		description:
			'A hidden passage shortcuts the main route. Players who explore carefully can bypass challenges.',
		diagramHint: 'Long route and hidden short route to goal.',
	},
	{
		id: 4,
		name: 'Dangerous Route',
		description:
			'A short, risky route exists alongside a longer, safer path. Risk-takers may take heavy damage or gain rewards.',
		diagramHint: 'Short, risky route versus long, safer path.',
	},
	{
		id: 5,
		name: 'Foreshadowing Loop',
		description:
			"From the start, players can see or sense the goal but can't reach it directly. A long loop eventually leads there.",
		diagramHint: 'Start shows view of goal with long looping route.',
	},
	{
		id: 6,
		name: 'Lock-and-Key Cycle',
		description:
			'A locked barrier blocks the goal. The key is found via a looping path that returns players near the start before unlocking the way forward.',
		diagramHint: 'Path from goal to key loops back to start.',
	},
	{
		id: 7,
		name: 'Blocked Retreat',
		description:
			'After crossing a threshold (pit, one-way door, collapse), players cannot return. They must complete the loop to escape.',
		diagramHint: 'Barrier prevents returning until long loop completed.',
	},
	{
		id: 8,
		name: 'Monster Patrol',
		description:
			'A powerful monster patrols a circular route. Players must time their movement or find a way to defeat it.',
		diagramHint: 'Circular path patrolled by powerful monster.',
	},
	{
		id: 9,
		name: 'Altered Return',
		description:
			'The return path becomes more dangerous—new traps spring, monsters awaken, or the environment changes.',
		diagramHint: 'Return path becomes more dangerous.',
	},
	{
		id: 10,
		name: 'False Goal',
		description:
			'A decoy goal is presented first. The true goal is hidden and requires additional exploration or clues.',
		diagramHint: 'Fake goal leads to hidden true goal.',
	},
	{
		id: 11,
		name: 'Simple Lock-and-Key',
		description:
			'A short path leads to a key, and a short path leads to the locked goal. The simplest cycle type.',
		diagramHint: 'Short path to key and short path to goal.',
	},
	{
		id: 12,
		name: 'Gambit',
		description:
			'Near the goal, an optional side path leads to extra treasure behind a dangerous obstacle. High risk, high reward.',
		diagramHint: 'Optional reward behind a dangerous obstacle near goal.',
	},
]

interface LockKeyType {
	id: number
	type: string
	hardSoft: 'Hard' | 'Soft'
	description: string
}

const LOCK_KEY_TYPES: LockKeyType[] = [
	{
		id: 1,
		type: 'Door lock and key',
		hardSoft: 'Hard',
		description: 'A physical door with a matching key hidden elsewhere.',
	},
	{
		id: 2,
		type: 'Mechanism/NPC and key item',
		hardSoft: 'Hard',
		description:
			'A lever, puzzle, or NPC that requires a specific item to activate.',
	},
	{
		id: 3,
		type: 'Magical or environmental barrier',
		hardSoft: 'Hard',
		description:
			'A force field, elemental wall, or enchanted obstruction requiring a magical counter.',
	},
	{
		id: 4,
		type: 'Powerful monster and method to defeat/evade',
		hardSoft: 'Soft',
		description:
			'A creature blocking the way that can be fought, bypassed, or distracted.',
	},
	{
		id: 5,
		type: 'Deadly trap and method to disable/evade',
		hardSoft: 'Soft',
		description: 'A hazardous trap that can be disarmed, avoided, or survived.',
	},
	{
		id: 6,
		type: 'Hazard and method to neutralize/evade',
		hardSoft: 'Soft',
		description:
			'An environmental danger (poison gas, flooding) that can be countered or escaped.',
	},
]

export type DungeonScope =
	| 'tiny'
	| 'small'
	| 'medium'
	| 'large'
	| 'huge'
	| undefined

const SCOPE_DESCRIPTIONS: Record<
	Exclude<DungeonScope, undefined>,
	{ label: string; description: string; cycles: string }
> = {
	tiny: {
		label: 'Tiny (Single Challenge)',
		description:
			'A quick encounter or puzzle room. Great for side content or a single scene.',
		cycles: '1 cycle',
	},
	small: {
		label: 'Small (2-4 hours / One-Shot)',
		description:
			'A compact dungeon for a single session. Straightforward progression with a few interesting choices.',
		cycles: '2-3 cycles',
	},
	medium: {
		label: 'Medium (Few Sessions)',
		description:
			'A multi-session dungeon with branching paths and multiple objectives.',
		cycles: '4-6 cycles',
	},
	large: {
		label: 'Large (5-10 Sessions)',
		description:
			'A significant dungeon complex with multiple wings, factions, and sub-goals.',
		cycles: '7-10 cycles',
	},
	huge: {
		label: 'Huge (Mega-Dungeon / Campaign)',
		description:
			'An entire campaign location with multiple levels, themes, and factions. Can be explored over months.',
		cycles: '10+ cycles, multiple levels',
	},
}

const CycleTypeRoller: React.FC = () => {
	const [rolledCycle, setRolledCycle] = useState<CycleType | null>(null)
	const [rolledLockKey, setRolledLockKey] = useState<LockKeyType | null>(null)
	const [dungeonRank, setDungeonRank] = useState<number>(1)
	const [dungeonScope, setDungeonScope] = useState<DungeonScope>(undefined)

	const rollCycleType = () => {
		const roll = Math.floor(Math.random() * 12) + 1
		setRolledCycle(CYCLE_TYPES[roll - 1])
	}

	const rollLockKey = () => {
		const roll = Math.floor(Math.random() * 6) + 1
		setRolledLockKey(LOCK_KEY_TYPES[roll - 1])
	}

	const getRankAdvice = (rank: number): string => {
		if (rank <= 2) {
			return 'Low-tier dungeon: Use Tier 0-2 creatures, simple traps (TN 6-8), and Q1-Q2 treasure. Focus on straightforward challenges.'
		} else if (rank <= 4) {
			return 'Mid-tier dungeon: Use Tier 2-4 creatures, moderate traps (TN 8-10), and Q2-Q4 treasure. Introduce tactical complexity.'
		} else if (rank <= 6) {
			return 'High-tier dungeon: Use Tier 4-6 creatures, dangerous traps (TN 10-12), and Q4-Q6 treasure. Include elite enemies and multi-phase encounters.'
		} else if (rank <= 8) {
			return 'Expert dungeon: Use Tier 6-8 creatures, deadly traps (TN 12-14), and Q5-Q7 treasure. Expect powerful magic and legendary foes.'
		} else {
			return 'Legendary dungeon: Use Tier 8-10 creatures, lethal traps (TN 14-16), and Q6-Q8 treasure. The pinnacle of mortal challenge.'
		}
	}

	return (
		<Box sx={{ my: 2 }}>
			<Typography variant="h6" gutterBottom>
				Dungeon Configuration
			</Typography>

			<Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
				<FormControl sx={{ minWidth: 150 }}>
					<InputLabel id="dungeon-rank-label">Dungeon Rank</InputLabel>
					<Select
						labelId="dungeon-rank-label"
						value={dungeonRank}
						label="Dungeon Rank"
						onChange={(e) => setDungeonRank(Number(e.target.value))}
					>
						{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rank) => (
							<MenuItem key={rank} value={rank}>
								Rank {rank}
							</MenuItem>
						))}
					</Select>
				</FormControl>

				<FormControl sx={{ minWidth: 200 }}>
					<InputLabel id="dungeon-scope-label">Dungeon Scope</InputLabel>
					<Select
						labelId="dungeon-scope-label"
						value={dungeonScope || ''}
						label="Dungeon Scope"
						onChange={(e) =>
							setDungeonScope(e.target.value as DungeonScope | undefined)
						}
					>
						<MenuItem value="">
							<em>Select scope...</em>
						</MenuItem>
						{Object.entries(SCOPE_DESCRIPTIONS).map(([key, { label }]) => (
							<MenuItem key={key} value={key}>
								{label}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Box>

			{dungeonScope && (
				<Card sx={{ mb: 2, backgroundColor: 'rgba(0,0,0,0.02)' }}>
					<CardContent>
						<Typography variant="subtitle2" color="primary">
							Scope: {SCOPE_DESCRIPTIONS[dungeonScope].label}
						</Typography>
						<Typography variant="body2">
							{SCOPE_DESCRIPTIONS[dungeonScope].description}
						</Typography>
						<Typography variant="body2" sx={{ mt: 1 }}>
							<strong>Recommended:</strong>{' '}
							{SCOPE_DESCRIPTIONS[dungeonScope].cycles}
						</Typography>
					</CardContent>
				</Card>
			)}

			<Card sx={{ mb: 2, backgroundColor: 'rgba(0,0,0,0.02)' }}>
				<CardContent>
					<Typography variant="subtitle2" color="primary">
						Rank {dungeonRank} Advice
					</Typography>
					<Typography variant="body2">{getRankAdvice(dungeonRank)}</Typography>
				</CardContent>
			</Card>

			<Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
				Cycle Roller
			</Typography>

			<Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
				<Button variant="outlined" onClick={rollCycleType}>
					🎲 Roll Cycle Type (d12)
				</Button>
				<Button variant="outlined" onClick={rollLockKey}>
					🎲 Roll Lock & Key (d6)
				</Button>
			</Box>

			{rolledCycle && (
				<Card sx={{ mb: 2 }}>
					<CardContent>
						<Typography variant="subtitle1" color="primary">
							Cycle Type: {rolledCycle.name} (rolled {rolledCycle.id})
						</Typography>
						<Typography variant="body2" sx={{ mt: 1 }}>
							{rolledCycle.description}
						</Typography>
						<Typography
							variant="body2"
							sx={{ mt: 1, fontStyle: 'italic', color: 'text.secondary' }}
						>
							<strong>Diagram hint:</strong> {rolledCycle.diagramHint}
						</Typography>
					</CardContent>
				</Card>
			)}

			{rolledLockKey && (
				<Card sx={{ mb: 2 }}>
					<CardContent>
						<Typography variant="subtitle1" color="primary">
							Lock & Key: {rolledLockKey.type} (rolled {rolledLockKey.id})
						</Typography>
						<Typography variant="body2" sx={{ mt: 1 }}>
							<strong>Type:</strong> {rolledLockKey.hardSoft}
						</Typography>
						<Typography variant="body2" sx={{ mt: 1 }}>
							{rolledLockKey.description}
						</Typography>
					</CardContent>
				</Card>
			)}
		</Box>
	)
}

export default CycleTypeRoller
