import React, { useMemo, useState } from 'react'
import { Box, Typography, IconButton, Tooltip, Select } from '@mui/material'
import { Clear } from '@mui/icons-material'
import {
	Ability,
	Weapon,
	Item,
	Spell,
	Damage,
	BaseDamageType,
} from '../../../../types/Character'
import { ActionType, ACTION_TYPES } from '../../../../types/ActionType'
import { ActionGlyph } from './components/ActionMark'
import { QuickRefCard } from './components/QuickRefCard'
import {
	ConfirmDialog,
	ListSection,
	ListSectionHeader,
	UnifiedListItem,
} from '../../components'
import { useAppSelector } from '../../hooks/useAppSelector'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { characterSheetActions } from '../../characterSheetReducer'
import { getSkillChipColor } from '../../../../constants/skills'

/** One course of the board: everything you can spend a given action on. */
type QuickRefCourse = {
	type: ActionType
	title: string
	items: QuickRefItem[]
}

/** The board: the choices, in the order a turn spends them, then the standing facts. */
type QuickRefBoard = {
	courses: QuickRefCourse[]
	/** Passive and untyped entries — true all the time, never a choice. */
	inForce: QuickRefItem[]
}

type QuickRefItem = {
	id: string
	name: string
	description: string
	source: 'ability' | 'weapon' | 'item' | 'spell'
	sourceCategory?: string // for abilities: 'Talent', 'Folk', etc.
	actionType?: ActionType
	rank?: number
	properties?: string[] // for items/weapons/spells
	damage?: string // for weapons/spells that deal damage
}

export const QuickRefSection: React.FC = () => {
	const dispatch = useAppDispatch()
	const { activeCharacter } = useAppSelector((state) => state.characterSheet)
	const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)

	const {
		abilities = [],
		quickRefSelections = {
			abilities: [],
			weapons: [],
			items: [],
			spells: [],
			actionTypeOverrides: {},
		},
	} = useMemo(() => activeCharacter.skills, [activeCharacter.skills])

	const { weapons = [] } = useMemo(
		() => activeCharacter.items,
		[activeCharacter.items],
	)
	const { items = [] } = useMemo(
		() => activeCharacter.items,
		[activeCharacter.items],
	)
	const spells = useMemo(
		() => activeCharacter.spells.spells || [],
		[activeCharacter.spells.spells],
	)

	/*
		Bound as locals so the memo below can actually depend on them.

		`calculateDamageDisplay` reaches through `activeCharacter` for both, which
		reads fine and left the memo unable to name what it uses — so every damage
		string froze at whatever the attributes were when the section mounted.
	*/
	const statistics = activeCharacter.statistics
	const spellCatalystDamage = activeCharacter.spells.spellCatalystDamage

	// Helper function to calculate actual damage values
	const calculateDamageDisplay = (
		damage: Damage,
		type: 'weapon' | 'spell',
	): string => {
		const baseDamage = (() => {
			switch (damage.base) {
				case 'STR':
					return statistics.strength.value / 2
				case 'AGI':
					return statistics.agility.value / 2
				case 'SPI':
					return statistics.spirit.value / 2
				case 'MND':
					return statistics.mind.value / 2
				case '':
					return 0
				default:
					return damage.base as number
			}
		})()

		const catalyst = type === 'spell' ? spellCatalystDamage : 0

		if (damage.staticDamage) {
			const staticValue = baseDamage + damage.weapon + catalyst + damage.other
			return `${staticValue} ${damage.type}`
		} else {
			const weakDamage =
				baseDamage + damage.weapon + catalyst + damage.other + damage.otherWeak
			const strongDamage =
				baseDamage +
				damage.weapon * 2 +
				catalyst * 2 +
				damage.other +
				damage.otherStrong
			const criticalDamage =
				baseDamage +
				damage.weapon * 3 +
				catalyst * 3 +
				damage.other +
				damage.otherCritical
			return `${weakDamage}/${strongDamage}/${criticalDamage} ${damage.type}`
		}
	}

	// Helper function to get category color, ensuring no duplicates
	/*
		`getCategoryColor` is gone (M13 S8c).

		It mapped a CONTENT KIND onto a SKILL colour — weapon to Fortitude red, item
		to Crafting grey, Talent to Fighting brown, Combat Art to Athletics green —
		so the board painted eight kinds in eight learned skill hues that had nothing
		to do with them. That is the "four local palettes, none of which encoded
		anything" fault S8 deleted from the search dialogs, still living here. The
		kind is a structural-bronze `SheetChip` on the card now.
	*/
	const determineActionType = (
		item: Weapon | Item | Spell | Ability,
	): ActionType => {
		const itemId = item.id

		// Check for manual override first
		if (quickRefSelections.actionTypeOverrides?.[itemId]) {
			return quickRefSelections.actionTypeOverrides[itemId]
		}

		// For abilities, use their existing actionType
		if ('actionType' in item && item.actionType) {
			return item.actionType
		}

		if ('properties' in item && item.properties) {
			// For spells and items, check properties for action type indicators
			const propsStr = Array.isArray(item.properties)
				? item.properties.join(' ').toLowerCase()
				: String(item.properties || '').toLowerCase()
			if (
				propsStr.includes('quick action') ||
				propsStr.includes('reaction') ||
				propsStr.includes('quick')
			) {
				return 'Quick Action'
			}
			if (propsStr.includes('triggered') || propsStr.includes('trigger')) {
				return 'Triggered'
			}
			if (propsStr.includes('free') || propsStr.includes('passive')) {
				return 'Free'
			}
		}

		// Check description for action type hints
		const description =
			('description' in item
				? item.description
				: 'effect' in item
					? item.effect
					: '') || ''
		const descLower = description.toLowerCase()
		if (descLower.includes('quick action') || descLower.includes('reaction')) {
			return 'Quick Action'
		}
		if (descLower.includes('triggered') || descLower.includes('trigger')) {
			return 'Triggered'
		}
		if (descLower.includes('free action') || descLower.includes('passive')) {
			return 'Free'
		}

		// Default based on item type
		if ('rank' in item) {
			// This is a spell
			return 'Action' // Most spells are actions
		}

		return 'Action' // Default for weapons and most items
	}

	// Get selected items organized by action type
	const quickRefBoard = useMemo((): QuickRefBoard => {
		const selectedAbilities = abilities.filter((ability) =>
			quickRefSelections.abilities.includes(ability.id),
		)
		const selectedWeapons = weapons.filter((weapon) =>
			quickRefSelections.weapons.includes(weapon.id),
		)
		const selectedItems = items.filter((item) =>
			quickRefSelections.items.includes(item.id),
		)
		const selectedSpells = spells.filter((spell) =>
			quickRefSelections.spells?.includes(spell.id),
		)

		// Convert to QuickRefItems
		const quickRefItems: QuickRefItem[] = [
			...selectedAbilities.map((ability) => ({
				id: ability.id,
				name: ability.title,
				description: ability.description,
				source: 'ability' as const,
				sourceCategory: ability.tag || 'Ability', // Show category instead of generic "Ability"
				// M13 S3: `|| 'Other'` is not cosmetic. Abilities predating the
				// actionType field store it as undefined, which matched none of the six
				// buckets below, so a bookmarked ability was counted in the Quick Ref
				// header and then rendered nowhere — the section claimed "1" over an
				// empty list. `AbilityRow` already defaults the same way for display,
				// so this makes the grouping agree with what the row shows.
				// The override FIRST, as every other kind already does. Writing it
				// and not reading it made the card's action-type control inert on
				// abilities alone — it moved the ability nowhere while appearing to
				// work, because the grouping below read `ability.actionType` direct.
				actionType:
					quickRefSelections.actionTypeOverrides?.[ability.id] ||
					ability.actionType ||
					'Other',
				rank: ability.rank,
			})),
			...selectedWeapons.map((weapon) => {
				const damageStr = weapon.damage
					? calculateDamageDisplay(weapon.damage, 'weapon')
					: undefined
				return {
					id: weapon.id,
					name: weapon.name,
					description: weapon.description || '',
					source: 'weapon' as const,
					sourceCategory: 'Weapon',
					actionType: determineActionType(weapon),
					properties: weapon.properties
						? Array.isArray(weapon.properties)
							? weapon.properties
							: [weapon.properties]
						: undefined,
					damage: damageStr,
				}
			}),
			...selectedItems.map((item) => ({
				id: item.id,
				name: item.name,
				description: item.description,
				source: 'item' as const,
				sourceCategory: 'Item',
				actionType: determineActionType(item),
				properties: item.properties
					? Array.isArray(item.properties)
						? item.properties
						: [item.properties]
					: undefined,
			})),
			...selectedSpells.map((spell) => {
				const damageStr =
					spell.dealsDamage && spell.damage
						? calculateDamageDisplay(spell.damage, 'spell')
						: undefined
				return {
					id: spell.id,
					name: spell.name,
					description: spell.effect,
					source: 'spell' as const,
					sourceCategory: 'Spell',
					actionType: determineActionType(spell),
					rank: spell.rank,
					properties: spell.properties
						? Array.isArray(spell.properties)
							? spell.properties
							: [spell.properties]
						: undefined,
					damage: damageStr,
				}
			}),
		]

		/*
			The board, not a list of groups (M13 S8c, owner brief: rethink from first
			principles for gameable UX).

			The question this section answers, mid-turn, is "I have one Action and one
			Quick Action — what are my options?" So the axis stays action type, and the
			order is the order a turn is spent. What changes is that **a passive is not
			an option**: it is never taken on a turn, it is simply true. Listing it
			among the choices padded the menu you are scanning under time pressure with
			things you cannot pick.

			`Other` joins it, for the same reason from the other end: an entry whose
			timing nobody has stated is not a choice you can price.
		*/
		const byType = (type: ActionType) =>
			quickRefItems
				.filter((item) => item.actionType === type)
				// A stable read order. `sort` mutates, so this sorts the filtered copy
				// rather than the array every other course is drawn from.
				.sort((a, b) => a.name.localeCompare(b.name))

		const courses: QuickRefCourse[] = (
			[
				['Action', 'Action'],
				['Quick Action', 'Quick Action'],
				['Triggered', 'Triggered'],
				['Free', 'Free'],
			] as [ActionType, string][]
		)
			.map(([type, title]) => ({ type, title, items: byType(type) }))
			.filter((course) => course.items.length > 0)

		return {
			courses,
			inForce: [...byType('Passive'), ...byType('Other')],
		}
	}, [
		abilities,
		weapons,
		items,
		spells,
		quickRefSelections,
		// `calculateDamageDisplay` reads both, so a raised attribute or a new
		// catalyst has to recompute the strings. Without them a weapon kept the
		// damage it had when the section first rendered.
		statistics,
		spellCatalystDamage,
	])

	/*
		Counted from what RESOLVED, not from what is pinned.

		A pinned id whose ability or item has since been deleted renders no card and
		still counted here, so the header could claim 9 over a board of 7 with
		nothing to explain the difference.
	*/
	const totalSelected = useMemo(
		() =>
			quickRefBoard.courses.reduce(
				(sum, course) => sum + course.items.length,
				0,
			) + quickRefBoard.inForce.length,
		[quickRefBoard],
	)

	const handleClearAll = () => {
		setConfirmDialogOpen(true)
	}

	const handleConfirmClear = () => {
		dispatch(characterSheetActions.clearQuickRef())
		setConfirmDialogOpen(false)
	}

	const handleCancelClear = () => {
		setConfirmDialogOpen(false)
	}

	const handleRemoveItem = (
		itemId: string,
		source: 'ability' | 'weapon' | 'item' | 'spell',
	) => {
		switch (source) {
			case 'ability':
				dispatch(characterSheetActions.toggleQuickRefAbility(itemId))
				break
			case 'weapon':
				dispatch(characterSheetActions.toggleQuickRefWeapon(itemId))
				break
			case 'item':
				dispatch(characterSheetActions.toggleQuickRefItem(itemId))
				break
			case 'spell':
				dispatch(characterSheetActions.toggleQuickRefSpell(itemId))
				break
		}
	}

	const handleActionTypeChange = (itemId: string, actionType: ActionType) => {
		dispatch(
			characterSheetActions.setQuickRefActionType({ itemId, actionType }),
		)
	}

	if (totalSelected === 0) {
		return (
			<Box sx={{ mb: 3 }}>
				<ListSectionHeader label="Quick Ref" sx={{ mb: 1 }} />
				<Typography
					variant="body2"
					color="text.secondary"
					sx={{ fontStyle: 'italic' }}
				>
					Select abilities, weapons, items, or spells using the bookmark icon to
					see them here for quick reference during play.
				</Typography>
			</Box>
		)
	}

	return (
		<Box sx={{ mb: 3 }}>
			{/* M13 S3: Quick Ref was two nested bordered-box Accordions — a fourth
				and fifth list idiom on a sheet that now has one. The groups are
				`ListSection`s and the entries are ledger rows, so a bookmarked
				ability here and the same ability in its own category read alike. */}
			<ListSectionHeader
				label="Quick Ref"
				count={totalSelected}
				sx={{ mb: 1 }}
				actions={
					<Tooltip title="Clear all Quick Ref selections">
						<IconButton size="small" onClick={handleClearAll}>
							<Clear fontSize="inherit" />
						</IconButton>
					</Tooltip>
				}
			/>

			<Box className="cs-playboard">
				{quickRefBoard.courses.map((course) => (
					<Box
						key={course.type}
						component="section"
						className="cs-playboard__course"
						aria-label={course.title}
					>
						<Box className="cs-playboard__course-head">
							<ActionGlyph actionType={course.type} size={15} />
							<span className="cs-playboard__course-name">{course.title}</span>
							<span className="cs-playboard__course-count">
								{course.items.length}
							</span>
						</Box>
						<Box className="cs-playboard__cards">
							{course.items.map((item) => (
								<QuickRefCard
									key={item.id}
									item={item}
									onRemove={() => handleRemoveItem(item.id, item.source)}
									onActionTypeChange={(next) =>
										handleActionTypeChange(item.id, next)
									}
								/>
							))}
						</Box>
					</Box>
				))}

				{quickRefBoard.inForce.length > 0 && (
					<Box
						component="section"
						className="cs-playboard__course cs-playboard__course--quiet"
						aria-label="In force"
					>
						<Box className="cs-playboard__course-head">
							<ActionGlyph actionType="Passive" size={15} />
							<span className="cs-playboard__course-name">In force</span>
							<span className="cs-playboard__course-count">
								{quickRefBoard.inForce.length}
							</span>
						</Box>
						{/* Standing facts, not choices — so they are named and not spelled
							out. A passive does not get picked mid-turn, and giving it a card
							the size of an Action's would pad the menu you are scanning under
							time pressure with things you cannot take. */}
						<Box className="cs-playboard__inforce">
							{quickRefBoard.inForce.map((item) => (
								<Box key={item.id} className="cs-playboard__standing">
									<span className="cs-playboard__standing-name">
										{item.name}
									</span>
									<Tooltip title={`Remove ${item.name} from Quick Ref`}>
										<IconButton
											size="small"
											className="cs-playboard__unpin"
											aria-label={`Remove ${item.name} from Quick Ref`}
											onClick={() => handleRemoveItem(item.id, item.source)}
										>
											<Box component="span" sx={{ fontSize: '0.85em' }}>
												×
											</Box>
										</IconButton>
									</Tooltip>
								</Box>
							))}
						</Box>
					</Box>
				)}
			</Box>

			<ConfirmDialog
				open={confirmDialogOpen}
				title="Clear all quick references"
				confirmLabel="Clear all"
				onConfirm={handleConfirmClear}
				onCancel={handleCancelClear}
			>
				This drops every quick-reference pick at once, across all tabs. This
				cannot be undone.
			</ConfirmDialog>
		</Box>
	)
}
