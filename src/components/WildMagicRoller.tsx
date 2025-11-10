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

interface WildMagicEffect {
	roll: number
	name: string
	description: string
}

const wildMagicData: WildMagicEffect[] = [
	{
		roll: 1,
		name: 'Chromatic Explosion',
		description:
			'Caster erupts with elemental energy. All creatures in a {radius} radius take {damage} damage (roll 1d4: 1=fire, 2=frost, 3=lightning, 4=acid).',
	},
	{
		roll: 2,
		name: 'Elemental Affinity',
		description:
			"Caster's body attunes to an element. Roll 1d4: 1=fire, 2=frost, 3=lightning, 4=acid. Gain resistance to that element but weakness to its opposite (fire↔frost, lightning↔acid) for {duration} duration.",
	},
	{
		roll: 3,
		name: 'Temperature Shift',
		description:
			'Area undergoes extreme temperature change. All creatures in {radius} area take {damage} lasting damage each turn. Roll 1d2: 1=extreme heat (burning), 2=extreme cold (slowed condition). Lasts {duration} duration.',
	},
	{
		roll: 4,
		name: 'Static Field',
		description:
			'Arcs of lightning dance between all creatures. All creatures in {radius} radius take {damage} lightning damage. Creatures in melee of each other take +2 damage (chain lightning).',
	},
	{
		roll: 5,
		name: 'Frost Nova',
		description:
			'A pulse of freezing energy erupts from the caster. All creatures in {radius} radius take {damage} frost damage and are briefly slowed.',
	},
	{
		roll: 6,
		name: 'Flame Vortex',
		description:
			'A swirling fire column appears at a random point in medium range (GM chooses). Creatures entering or starting turn in {radius} radius take {damage} fire damage per turn until end of scene.',
	},
	{
		roll: 7,
		name: 'Acid Rain',
		description:
			'Corrosive droplets fall from above in a random area within medium range (GM chooses or roll 1d8 for direction). Creatures in {radius} area take {damage} acid damage (ignores half AV).',
	},
	{
		roll: 8,
		name: 'Lightning Rod',
		description:
			'Caster becomes magnet for electrical energy. Caster briefly stunned. Next lightning damage targeting anyone in short range redirects to caster (damage doubled) for {duration} duration.',
	},
	{
		roll: 9,
		name: 'Elemental Weapon Infusion',
		description:
			'All held weapons in {radius} radius gain {damage} damage (roll element per weapon: 1d4 fire/frost/lightning/acid) for {duration} duration.',
	},
	{
		roll: 10,
		name: 'Pyroclasm',
		description:
			'Ground beneath caster cracks and releases gouts of flame. Caster\'s area becomes hazardous. Creatures entering or starting turn take {damage} fire damage per turn for {duration} duration.',
	},
	{
		roll: 11,
		name: 'Gravity Reversal',
		description:
			'Gravity inverts in the area. All creatures in {radius} radius float upward a very long distance and hover. At end of {duration} duration, they fall.',
	},
	{
		roll: 12,
		name: 'Repulsion Wave',
		description:
			'A shockwave of force explodes outward from the caster. All creatures in {radius} radius pushed {distance} distance from caster.',
	},
	{
		roll: 13,
		name: 'Attraction Field',
		description:
			'A point of crushing gravitational force manifests at a random location in medium range (GM chooses or roll 1d8 for direction). All creatures in {radius} radius pulled {distance} distance toward it.',
	},
	{
		roll: 14,
		name: 'Kinetic Burst',
		description:
			'Raw kinetic force blasts outward from the caster\'s body. All creatures in melee of caster take {damage} blast damage and pushed close distance.',
	},
	{
		roll: 15,
		name: 'Levitation Lock',
		description:
			'Magic holds all creatures suspended just above the ground. All creatures in {radius} radius float close above ground. Movement becomes 0 unless flying, for {duration} duration.',
	},
	{
		roll: 16,
		name: 'Crushing Pressure',
		description:
			'Intense pressure bears down from above. All creatures in {radius} radius take {damage} blast damage (ignoring AV) and briefly stunned.',
	},
	{
		roll: 17,
		name: 'Whirlwind',
		description:
			'A violent vortex of wind forms around the caster. All creatures in {radius} radius roll STR + Athletics vs. TN {tn}. On fail, pushed {distance} in random direction (roll 1d8).',
	},
	{
		roll: 18,
		name: 'Momentum Theft',
		description:
			'Caster steals kinetic energy from nearby creatures. All other creatures in {radius} radius have Movement reduced to 0. Caster gains {bonus} Movement for {duration} duration.',
	},
	{
		roll: 19,
		name: 'Zero Gravity Zone',
		description:
			'Gravity ceases in caster\'s area. {radius} radius becomes zero gravity. Creatures can fly/float but attacks suffer +1 bane (disorientation) for {duration} duration.',
	},
	{
		roll: 20,
		name: 'Telekinetic Slam',
		description:
			'Invisible force slams all nearby creatures into the ground. All creatures in {radius} radius take {damage} blast damage and fall prone.',
	},
	{
		roll: 21,
		name: 'Random Teleport',
		description:
			'Reality warps and the caster vanishes. Caster teleports to random location within {distance} distance (GM determines unoccupied space).',
	},
	{
		roll: 22,
		name: 'Position Swap',
		description:
			'Caster swaps places with random creature in {distance} range (roll randomly if multiple valid targets).',
	},
	{
		roll: 23,
		name: 'Mass Teleportation',
		description:
			'{count} creatures in {radius} radius (including caster) teleport to random unoccupied locations in medium range (GM distributes or rolls for each).',
	},
	{
		roll: 24,
		name: 'Blink Step',
		description:
			'Caster gains hidden condition against all creatures for {duration} duration or until attacking.',
	},
	{
		roll: 25,
		name: 'Dimensional Anchor',
		description:
			'No teleportation in or out of {radius} radius for {duration} duration.',
	},
	{
		roll: 26,
		name: 'Scatter',
		description:
			'All creatures in close range (except caster) teleport to random unoccupied locations in medium range (GM distributes or rolls 1d8 for direction and distance for each). Affects {count} creatures.',
	},
	{
		roll: 27,
		name: 'Recall',
		description: 'Caster teleports back to where they started this scene.',
	},
	{
		roll: 28,
		name: 'Phase Shift',
		description:
			'Caster gains resistance to physical damage but weakness to psychic and radiant for {duration} duration.',
	},
	{
		roll: 29,
		name: 'Displacement Field',
		description:
			'Caster creates illusory duplicates. Attacks against caster suffer {bane} banes for {duration} duration.',
	},
	{
		roll: 30,
		name: 'Dimensional Door',
		description:
			'Portal appears at caster\'s location and another in {distance} range (GM chooses destination). Creatures can move through as if adjacent for {duration} duration.',
	},
	{
		roll: 31,
		name: 'Random Polymorph',
		description:
			'Caster transforms into harmless beast (tier 0-1, GM choice). Retain mental attributes, gain physical attributes of form for {duration} duration.',
	},
	{
		roll: 32,
		name: 'Size Shift',
		description:
			'Roll 1d6: 1-3 shrink one size, 4-6 grow one size. Adjust attributes (GM discretion) for {duration} duration.',
	},
	{
		roll: 33,
		name: 'Mass Polymorph',
		description:
			'All creatures in {radius} radius transform into identical tiny harmless creatures (GM chooses form). Retain mental attributes for {duration} duration.',
	},
	{
		roll: 34,
		name: 'Stone Flesh',
		description:
			'Caster gains {av} AV but AGI die decreases two steps (min d4) and Movement -1 for {duration} duration.',
	},
	{
		roll: 35,
		name: 'Gaseous Form',
		description:
			'Caster becomes mist. Immune to physical damage, can\'t attack or cast. Can move through small openings. Double damage from fire/lightning for {duration} duration.',
	},
	{
		roll: 36,
		name: 'Beast Aspect',
		description:
			'Roll 1d6: 1=bear (+STR die, +2 AV), 2=cat (+AGI die, +2 Dodge), 3=owl (+SPI die, darkvision), 4=ape (+Athletics rank), 5=wolf (+Movement, keen smell), 6=snake (poison bite {damage} damage) for {duration} duration.',
	},
	{
		roll: 37,
		name: 'Elemental Body',
		description:
			'Roll 1d4: 1=fire (burning {damage} aura in melee, fire resistance), 2=water (breathe underwater, frost resistance), 3=air (hover, lightning resistance), 4=earth ({av} AV, physical resistance) for {duration} duration.',
	},
	{
		roll: 38,
		name: 'Age Shift',
		description:
			'Roll 1d2: 1=younger (AGI +1 die, STR -1 die), 2=older (MND +1 die, AGI -1 die) for {duration} duration.',
	},
	{
		roll: 39,
		name: 'Spectral Form',
		description:
			'Caster becomes translucent, moves through objects (not creatures). Resistance to physical, weakness to radiant/force for {duration} duration.',
	},
	{
		roll: 40,
		name: 'Limb Multiplication',
		description:
			'Caster grows {count} extra arms. Can wield extra weapons/items. {boon} boons on grapple for {duration} duration.',
	},
	{
		roll: 41,
		name: 'Mind Swap',
		description:
			'Caster and random creature in {radius} range (roll if multiple) swap bodies. Each controls other\'s body but retains own mind. Mental attributes stay with mind, physical with body for {duration} duration.',
	},
	{
		roll: 42,
		name: 'Shared Senses',
		description:
			'All creatures in {radius} radius telepathically share senses (see/hear what others see/hear). Overwhelming input causes all creatures in area to suffer +1 bane on all rolls for {duration} duration.',
	},
	{
		roll: 43,
		name: 'Mass Confusion',
		description:
			'Chaotic magic scrambles thoughts and senses. All creatures in {radius} radius (including caster) become confused for {duration} duration.',
	},
	{
		roll: 44,
		name: 'Phantom Army',
		description:
			'Illusory magic creates {count} duplicate images of each creature in {radius} radius. All attacks in the area suffer {bane} banes (hard to distinguish real targets from illusions) for {duration} duration.',
	},
	{
		roll: 45,
		name: 'Telepathic Broadcast',
		description:
			'All creatures in {distance} range hear caster\'s surface thoughts. Caster has disadvantage on social rolls for {duration} duration.',
	},
	{
		roll: 46,
		name: 'Sensory Chaos',
		description:
			'Magic distorts senses in {radius} radius. All creatures in area experience hallucinations (colors swap, sounds mislead, smells overwhelm). All affected creatures suffer {bane} bane on Perception for {duration} duration.',
	},
	{
		roll: 47,
		name: 'Fear Aura',
		description:
			'Primal terror emanates from the caster. All creatures in {radius} radius (except caster) become frightened of caster for {duration} duration.',
	},
	{
		roll: 48,
		name: 'Charm Wave',
		description:
			'A pulse of beguiling magic washes over all who see the caster. All creatures in {radius} radius that can see caster become charmed for {duration} duration.',
	},
	{
		roll: 49,
		name: 'Mirror Dimension',
		description:
			'Illusory mirror-world overlaps reality in {radius} radius. All creatures in area see false reflections (movement in wrong directions, false obstacles). All affected creatures suffer {bane} bane on physical rolls for {duration} duration.',
	},
	{
		roll: 50,
		name: 'Psychic Scream',
		description:
			'A mental shriek radiates from the caster\'s mind. All creatures in {radius} radius take {damage} psychic damage (ignoring AV) and briefly dazed.',
	},
	{
		roll: 51,
		name: 'Random Summon',
		description:
			'Summon random creature at random close location (GM chooses). Roll 1d6 for tier: 1-2=tier 0, 3-4=tier 1, 5=tier 2, 6=tier {tier}. Could be hostile, neutral, or friendly (GM choice). Lasts until end of scene or dismissed.',
	},
	{
		roll: 52,
		name: 'Weapon Rain',
		description:
			'The sky darkens as countless weapons fall like rain in {radius} radius. All creatures take {damage} physical damage. Ground littered with weapons.',
	},
	{
		roll: 53,
		name: 'Object Conjuration',
		description:
			'Random mundane objects (chairs, barrels, ropes, etc.) materialize and clutter {radius} radius. Area becomes difficult terrain (must navigate around objects) for {duration} duration.',
	},
	{
		roll: 54,
		name: 'Swarm Summon',
		description:
			'A swarm of distracting creatures (insects/bats/rats) fills {radius} radius. While harmless, they buzz, flutter, and crawl on everyone. All creatures in area suffer {bane} bane on all rolls (distraction) for {duration} duration.',
	},
	{
		roll: 55,
		name: 'Duplicate Self',
		description:
			'Create duplicate with half HP and attributes (round down). Acts independently (GM controls), lasts {duration} duration or until destroyed.',
	},
	{
		roll: 56,
		name: 'Elemental Spawn',
		description:
			'Summon tier {tier} elemental (roll 1d4: fire/water/air/earth). Hostile to all, attacks nearest. Lasts {duration} duration or until destroyed.',
	},
	{
		roll: 57,
		name: 'Wall of Matter',
		description:
			'Wall appears in close range. Roll 1d4: 1=stone (HP 20), 2=ice (HP 15), 3=thorns (HP 10, damages melee for 3), 4=force (HP 30). HP ×{multiplier}, height {height}, length {length}. Lasts {duration} duration.',
	},
	{
		roll: 58,
		name: 'Conjure Food',
		description:
			'Feast appears in close range for creatures in {radius} radius. Consuming restores {heal} HP and removes deprived.',
	},
	{
		roll: 59,
		name: 'Phantom Mount',
		description:
			'Summon spectral mount with {hp} HP, Movement 3. Carries caster plus gear for {duration} duration or until destroyed.',
	},
	{
		roll: 60,
		name: 'Trap Conjuration',
		description:
			'{count} magical traps appear in {distance} radius (GM places at strategic locations). Creatures entering roll AGI + Athletics vs. TN {tn} or take {damage} damage. Lasts {duration} duration.',
	},
	{
		roll: 61,
		name: 'Earthquake',
		description:
			'The ground violently shakes and buckles. All creatures in {radius} radius roll STR + Athletics vs. TN {tn} or fall prone. Area becomes difficult terrain for {duration} duration.',
	},
	{
		roll: 62,
		name: 'Fog Bank',
		description:
			'Thick, impenetrable fog rolls in. All areas in {distance} radius become heavily obscured (total darkness for vision) for {duration} duration.',
	},
	{
		roll: 63,
		name: 'Windstorm',
		description:
			'Powerful winds buffet {radius} radius. All creatures in area have Movement -1 (min 0) and ranged attacks suffer {bane} banes (wind deflection) for {duration} duration.',
	},
	{
		roll: 64,
		name: 'Thunderstorm',
		description:
			'Dark clouds gather and lightning strikes erratically. Random creatures in {distance} radius struck by lightning each turn (roll 1d6 per creature: 1-2=struck). Deal {damage} lightning damage for {duration} duration.',
	},
	{
		roll: 65,
		name: 'Blizzard',
		description:
			'Howling winds and freezing snow fill the area. All areas in {distance} radius become difficult terrain. Creatures take {damage} frost damage per turn. Visibility reduced to close for {duration} duration.',
	},
	{
		roll: 66,
		name: 'Mudslide',
		description:
			'Ground turns to thick mud in {radius} radius. All areas become difficult terrain. Creatures in area need +1 Movement to move (slowed by clinging mud) and suffer +1 bane on AGI rolls for {duration} duration.',
	},
	{
		roll: 67,
		name: 'Light Show',
		description:
			'Brilliant, pulsing lights erupt in dazzling patterns. {distance} radius illuminated as bright daylight. Creatures with darkvision/light sensitivity briefly blinded each turn for {duration} duration.',
	},
	{
		roll: 68,
		name: 'Darkness Wave',
		description:
			'All light is snuffed out as absolute darkness spreads. All light in {distance} radius extinguished. Total darkness (even darkvision can\'t see). Only magical light pierces for {duration} duration.',
	},
	{
		roll: 69,
		name: 'Plant Growth',
		description:
			'Vines, roots, and vegetation burst forth explosively. All areas in {radius} radius overgrown. Difficult terrain. Creatures can choose to be restrained (grants +2 Defense vs. ranged) for {duration} duration.',
	},
	{
		roll: 70,
		name: 'Lava Pool',
		description:
			'The ground cracks and molten rock wells up. Area in {radius} radius transforms to lava. Creatures entering or starting turn take {damage} fire damage (ignoring AV) for {duration} duration.',
	},
	{
		roll: 71,
		name: 'Antimagic Pulse',
		description:
			'A ripple of nullifying energy spreads outward. All magic (spells, enchantments, items) in {radius} radius suppressed. Resume when duration ends or leaving area for {duration} duration.',
	},
	{
		roll: 72,
		name: 'Magic Surge',
		description:
			'All spellcasters in {radius} radius gain {bonus} Focus but spell TNs +2 for {duration} duration.',
	},
	{
		roll: 73,
		name: 'Spell Reflection',
		description:
			'Next {count} spells targeting anyone in {radius} radius reflected back at caster for {duration} duration.',
	},
	{
		roll: 74,
		name: 'Wild Zone',
		description:
			'Spells cast in {radius} radius trigger additional wild surge roll (but that roll doesn\'t cascade) for {duration} duration.',
	},
	{
		roll: 75,
		name: 'Spell Theft',
		description:
			'All other spellcasters in {radius} radius lose {count} Focus. Caster gains that Focus (up to max).',
	},
	{
		roll: 76,
		name: 'Magic Backlash',
		description:
			'All spellcasters in {radius} radius (including caster) take {damage} psychic damage (ignoring AV).',
	},
	{
		roll: 77,
		name: 'Dispel Cascade',
		description:
			'A wave of unraveling magic sweeps through the area. All active spell effects in {distance} radius end immediately (doesn\'t affect permanent items).',
	},
	{
		roll: 78,
		name: 'Enchantment Overload',
		description:
			'All magic items in {radius} radius gain enhanced power (+1 bonuses, +2 damage) but become inert for short duration after {duration} duration ends.',
	},
	{
		roll: 79,
		name: 'Mana Leak',
		description:
			'Spellcasters in {radius} radius lose {bonus} extra Focus when casting for {duration} duration.',
	},
	{
		roll: 80,
		name: 'Spell Echo',
		description:
			'{count} random spells cast last round in {radius} radius repeat with same/random targets (GM choice, use original roll).',
	},
	{
		roll: 81,
		name: 'Healing Burst',
		description:
			'All creatures in {radius} radius (including enemies) regain {heal} HP.',
	},
	{
		roll: 82,
		name: 'Vampiric Aura',
		description:
			'All other creatures in {radius} radius lose {damage} HP (ignoring AV). Caster regains half total drained.',
	},
	{
		roll: 83,
		name: 'Regeneration Field',
		description:
			'All creatures in {radius} radius regain {heal} HP per turn for {duration} duration.',
	},
	{
		roll: 84,
		name: 'Life Link',
		description:
			'Creatures in {radius} radius share damage and healing equally for {duration} duration.',
	},
	{
		roll: 85,
		name: 'Vigor Surge',
		description:
			'All creatures in {radius} radius gain {heal} temporary HP and +1 Movement for {duration} duration.',
	},
	{
		roll: 86,
		name: 'Death Ward',
		description:
			'Next time caster or {count} allies in close range would reach 0 HP, remain at 1 HP instead for {duration} duration.',
	},
	{
		roll: 87,
		name: 'Condition Transfer',
		description:
			'All caster\'s conditions removed. Choose: caster cured, or all creatures in {radius} radius gain those conditions.',
	},
	{
		roll: 88,
		name: 'Restore',
		description:
			'All creatures in {radius} radius have all conditions removed.',
	},
	{
		roll: 89,
		name: 'Necrotic Pulse',
		description:
			'All living in {radius} radius take {damage} necrotic damage (ignoring AV). Undead regain that amount as HP.',
	},
	{
		roll: 90,
		name: 'Revitalize',
		description:
			'Caster regains {heal} HP and removes all conditions and {count} Fatigue.',
	},
	{
		roll: 91,
		name: 'Time Hiccup',
		description:
			'All creatures in {radius} radius (including caster) re-roll Initiative. Use new values.',
	},
	{
		roll: 92,
		name: 'Slow Field',
		description:
			'All creatures in {radius} radius become slowed and can only take Quick Action or Action (not both) for {duration} duration.',
	},
	{
		roll: 93,
		name: 'Haste Aura',
		description:
			'All creatures in {radius} radius gain +1 Action and +1 Movement for {duration} duration.',
	},
	{
		roll: 94,
		name: 'Turn Theft',
		description:
			'Random creature in {distance} range (roll if multiple) loses next turn. Caster gains additional Action next turn.',
	},
	{
		roll: 95,
		name: 'Future Echo',
		description:
			'Caster can reroll any {count} rolls and choose result for {duration} duration.',
	},
	{
		roll: 96,
		name: 'Time Loop',
		description:
			'Last round repeats with identical results. Aware creatures can try to change actions (GM discretion).',
	},
	{
		roll: 97,
		name: 'Age Freeze',
		description:
			'Caster doesn\'t age or need food/water/rest. Immune to bleeding, poison, disease. Can\'t regain HP naturally for {duration} duration.',
	},
	{
		roll: 98,
		name: 'Temporal Displacement',
		description:
			'Attacks against caster suffer {bane} banes. Caster\'s attacks gain {boon} boons for {duration} duration.',
	},
	{
		roll: 99,
		name: 'Causal Break',
		description:
			'Caster can have effects before causes (take action after seeing result, attack before moving to range, etc.). GM determines reasonable limits. Lasts {duration} duration.',
	},
	{
		roll: 100,
		name: 'Reality Ripple',
		description:
			'Roll on this table three times (ignore 100s). Apply all simultaneously. Most recent takes precedence if contradictory. These rolls don\'t trigger further cascades.',
	},
]

// Scaling data: [rank1, rank2, rank3, rank4, rank5]
const scalingData: Record<string, string[]> = {
	radius: ['close', 'close', 'short', 'short', 'medium'],
	damage: ['4', '6', '8', '10', '12'],
	damage_low: ['2', '3', '4', '5', '6'],
	damage_mid: ['3', '5', '7', '9', '11'],
	damage_high: ['5', '7', '9', '11', '13'],
	damage_fire: ['3', '4', '5', '6', '7'],
	damage_vhigh: ['6', '8', '10', '12', '14'],
	duration: ['short', 'short', 'medium', 'medium', 'long'],
	duration_brief: ['brief', 'short', 'short', 'medium', 'medium'],
	duration_brief2: ['brief', 'brief', 'short', 'short', 'medium'],
	distance: ['close', 'close', 'short', 'short', 'medium'],
	distance_short: ['short', 'medium', 'medium', 'long', 'very long'],
	distance_medium: ['close', 'short', 'medium', 'medium', 'long'],
	distance_long: ['close', 'short', 'short', 'medium', 'medium'],
	distance_far: ['short', 'short', 'medium', 'medium', 'long'],
	distance_vfar: ['short', 'medium', 'medium', 'long', 'long'],
	distance_extreme: ['close', 'short', 'medium', 'medium', 'long'],
	count: ['2', '3', '4', '5', '6'],
	count_low: ['1', '1', '2', '2', '3'],
	count_mid: ['1', '2', '2', '3', '3'],
	bonus: ['+1', '+1', '+2', '+2', '+3'],
	bonus_dmg: ['+2', '+3', '+4', '+5', '+6'],
	bonus_focus: ['+2', '+3', '+4', '+5', '+6'],
	bane: ['+1', '+1', '+2', '+2', '+2'],
	boon: ['+1', '+1', '+2', '+2', '+3'],
	tn: ['8', '9', '10', '11', '12'],
	av: ['+3', '+4', '+5', '+6', '+7'],
	heal: ['4', '6', '8', '10', '12'],
	heal_low: ['3', '5', '7', '9', '11'],
	heal_high: ['8', '12', '16', '20', '24'],
	hp: ['10', '15', '20', '25', '30'],
	tier: ['0', '0', '1', '1', '2'],
	tier_elemental: ['0', '1', '1', '2', '2'],
	multiplier: ['1', '1.5', '2', '2.5', '3'],
	height: ['close', 'close', 'short', 'short', 'medium'],
	length: ['short', 'short', 'medium', 'medium', 'long'],
}

const applyRankScaling = (description: string, rank: number): string => {
	let result = description

	// Replace all {variable} placeholders with rank-specific values
	Object.entries(scalingData).forEach(([key, values]) => {
		const pattern = new RegExp(`\\{${key}\\}`, 'g')
		result = result.replace(pattern, values[rank - 1])
	})

	return result
}

export const WildMagicRoller: React.FC = () => {
	const [rank, setRank] = useState<number>(3)
	const [result, setResult] = useState<WildMagicEffect | null>(null)
	const [scaledDescription, setScaledDescription] = useState<string>('')

	const handleRoll = () => {
		const roll = Math.floor(Math.random() * 100) + 1
		const effect = wildMagicData.find((e) => e.roll === roll) || wildMagicData[0]
		setResult(effect)
		setScaledDescription(applyRankScaling(effect.description, rank))
	}

	return (
		<Box sx={{ mb: 3 }}>
			<Card variant="outlined">
				<CardContent>
					<Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
						<FormControl sx={{ minWidth: 120 }}>
							<InputLabel id="rank-select-label">Spell Rank</InputLabel>
							<Select
								labelId="rank-select-label"
								id="rank-select"
								value={rank}
								label="Spell Rank"
								onChange={(e) => setRank(Number(e.target.value))}
							>
								<MenuItem value={1}>Rank 1</MenuItem>
								<MenuItem value={2}>Rank 2</MenuItem>
								<MenuItem value={3}>Rank 3</MenuItem>
								<MenuItem value={4}>Rank 4</MenuItem>
								<MenuItem value={5}>Rank 5</MenuItem>
							</Select>
						</FormControl>

						<Button variant="contained" color="primary" onClick={handleRoll}>
							🎲 Roll Wild Surge (d100)
						</Button>
					</Box>

					{result && (
						<Box
							sx={{
								mt: 2,
								p: 2,
								border: '2px solid',
								borderColor: 'primary.main',
								borderRadius: 1,
								backgroundColor: 'background.paper',
							}}
						>
							<Typography variant="h6" gutterBottom>
								<strong>
									{result.roll}. {result.name}
								</strong>
							</Typography>
							<Typography variant="body1">{scaledDescription}</Typography>
						</Box>
					)}
				</CardContent>
			</Card>
		</Box>
	)
}
