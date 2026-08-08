import React, { useEffect, useMemo, useState } from 'react'
import {
	BuilderRegister,
	BuilderShell,
	BuilderVerb,
	BuilderVerbSpacer,
	ChoiceRail,
	FilterChip,
	GrantLine,
	Ledger,
	LedgerEmpty,
	LedgerRow,
	SearchField,
	type RailOption,
} from '@site/src/components/builder'
import { ConfirmDialog } from '../../../components'
import { MagicItemPlate } from './MagicItemPlate'
import {
	ARMOR_CATEGORIES,
	CATEGORIES,
	CATEGORY_LABEL,
	CATEGORY_SIGIL,
	WEAPON_CATEGORIES,
} from './magicItemMarks'

import type {
	CharacterDocument,
	Item,
	Weapon,
	EquipmentSlotType,
} from '../../../../../types/Character.ts'
import {
	type QualityTier,
	type ItemCategory,
	type BaseItem,
	type SpecialMaterial,
	type Enchantment,
	qualityTierLabels,
	baseItems,
	getAvailableMaterials,
	getAvailableEnchantments,
	calculateMagicItemCost,
	getMagicItemBaseCost,
	getSpecialMaterialExtraCost,
	getEnchantmentCost,
	getWeaponDamageBonus,
	getSpellDamageBonus,
	getAmmoDamageBonus,
	getArmorAVBonus,
	getTotalAV,
	getDurabilityDie,
	generateItemName,
	generateItemDescription,
	calculatePropertyModifications,
	calculateFinalLoad,
	modifyPropertiesString,
	getMaxSpellRank,
	getWandCharges,
	getStaffCharges,
	getStaffSpellCapacity,
} from '../utils/magicItemsConfig'
import {
	getCulturalVariants,
	hasCulturalVariants,
} from '../utils/culturalVariants'
import { getBaseDamageType } from '../utils/weaponDamage'

const isWandItem = (item: BaseItem | null): boolean =>
	!!item && item.properties?.includes('wand') === true
const isStaffItem = (item: BaseItem | null): boolean =>
	!!item && item.properties?.includes('staff') === true
const isWandOrStaff = (item: BaseItem | null): boolean =>
	isWandItem(item) || isStaffItem(item)

const QUALITIES: QualityTier[] = [3, 4, 5, 6, 7, 8]
const coins = (value: number) => value.toLocaleString('en-US')

export type MagicItemBuilderDialogProps = {
	open: boolean
	onClose: () => void
	onCreateItem?: (item: Partial<Item> | Partial<Weapon>) => void
	character?: CharacterDocument
	onItemCreated?: (
		item: Partial<Item> | Partial<Weapon>,
		itemName: string,
	) => void
}

/** Which register is showing its controls. */
type OpenRegister =
	'item' | 'quality' | 'material' | 'enchantment' | 'appearance'

/**
 * The Magic Item Builder — a commission, and the item it prices (M13 S8).
 *
 * ## What this replaced
 *
 * A five-step MUI `Stepper` over four `TableContainer`s of `Radio` rows, plus a
 * review `Card`. Roughly 1,100 lines of the 1,623 were the tables. Its faults were
 * the ones the Companion Builder had already been rebuilt out of, plus two of its
 * own:
 *
 * - **`weaponCategoryColorMap`** put nine weapon categories on MUI's SEMANTIC
 *   palette — an Axe was `error`, a Bow was `success`. See `magicItemMarks.ts`;
 *   this is the third such palette deleted in this slice.
 * - **Five `Alert severity="info"` boxes** carried the rules ("Magic items start at
 *   Quality 3", "All magic items require a material"). A filled severity box is
 *   Material's voice, and the rule it states belongs on the control it constrains,
 *   not in a notification above it. Each is now the register's own note, or the
 *   reason printed on a locked register.
 * - **Nothing showed the consequence of a choice while making it.** Quality is the
 *   lever that prices the whole item, and its effects were spread across four
 *   columns of a table you left behind on the next step. It has a grant line now,
 *   the same device the companion tier rail uses.
 * - **The cost — the one calculation the tool exists to perform — was a `Grid` of
 *   label/value pairs** at body weight, indistinguishable from the six fields under
 *   it. It is the plate's most legible register now. See `MagicItemPlate`.
 *
 * ## Why the registers collapse, when the Companion Builder's do not
 *
 * Four dependent decisions, three of them long lists (37 weapons, 88 materials, 50
 * enchantments before filtering). One growing register cannot hold three lists, and
 * three capped ones would be a column of scrollbars. So a settled register states
 * its answer and gets out of the way, and the one being decided takes the height —
 * the expanded-row pattern applied to a decision rather than to an item.
 *
 * This is what the `Stepper` was really for. The difference is that a step you have
 * passed is still ON SCREEN with its answer, and every step is reachable in one
 * press instead of by walking back through the ones between.
 */
export const MagicItemBuilderDialog: React.FC<MagicItemBuilderDialogProps> = ({
	open,
	onClose,
	onCreateItem,
	character,
	onItemCreated,
}) => {
	const [selectedBaseItem, setSelectedBaseItem] = useState<BaseItem | null>(
		null,
	)
	const [selectedQuality, setSelectedQuality] = useState<QualityTier | ''>('')
	const [selectedMaterial, setSelectedMaterial] =
		useState<SpecialMaterial | null>(null)
	const [selectedEnchantment, setSelectedEnchantment] =
		useState<Enchantment | null>(null)
	/**
	 * The cultural weapon or armor type the item is styled as — a *Bastard Sword*
	 * rather than a *Longsword*. Null means the base item's own name.
	 *
	 * A NAME and nothing else, per the equipment chapter's two "of the Regions"
	 * sections. It is deliberately not part of `BaseItem`, so no cost, load or
	 * property calculation can ever read it.
	 */
	const [selectedAppearance, setSelectedAppearance] = useState<string | null>(
		null,
	)
	/**
	 * Where the item lands. NOT a question this dialog asks any more (M13 S8, second
	 * pass): it is a filing instruction, not a property of the item, and
	 * `ItemDetails` already carries a Location row that edits it on the sheet. It was
	 * a numbered register here only because the old `Stepper` had it as step 5.
	 * Everything arrives carried; the sheet moves it.
	 */
	const targetLocation: 'worn' | 'carried' = 'carried'
	const [openRegister, setOpenRegister] = useState<OpenRegister>('item')
	const [showConfirmClose, setShowConfirmClose] = useState(false)
	const [copied, setCopied] = useState(false)

	// Ledger-local filters.
	const [itemQuery, setItemQuery] = useState('')
	const [categoryFilter, setCategoryFilter] = useState<ItemCategory | null>(
		null,
	)
	const [materialQuery, setMaterialQuery] = useState('')
	const [materialKind, setMaterialKind] = useState<'base' | 'special' | null>(
		null,
	)
	const [enchantQuery, setEnchantQuery] = useState('')

	const category = (selectedBaseItem?.category ?? '') as ItemCategory | ''

	/**
	 * A base material is chosen for you when quality is set.
	 *
	 * Kept from the old builder: a material is REQUIRED, most items want the plain
	 * one, and making every reader pick "Bronze" before they can price anything is
	 * friction with no decision in it. The register still shows the answer and opens
	 * to change it.
	 */
	useEffect(() => {
		if (!category || !selectedQuality || selectedMaterial) return
		const materials = getAvailableMaterials(category, selectedQuality)
		const base =
			materials.find((m) => m.materialType === 'base' && m.name === 'Bronze') ||
			materials.find((m) => m.materialType === 'base')
		if (base) setSelectedMaterial(base)
	}, [category, selectedQuality, selectedMaterial])

	const availableMaterials = useMemo(
		() =>
			category && selectedQuality
				? getAvailableMaterials(category, selectedQuality)
				: [],
		[category, selectedQuality],
	)

	const availableEnchantments = useMemo(
		() =>
			category && selectedQuality
				? getAvailableEnchantments(category, selectedQuality)
				: [],
		[category, selectedQuality],
	)

	const shownItems = useMemo(() => {
		const needle = itemQuery.trim().toLowerCase()
		const pool = categoryFilter
			? baseItems[categoryFilter]
			: CATEGORIES.flatMap((key) => baseItems[key])
		return pool.filter(
			(item) =>
				!needle ||
				item.name.toLowerCase().includes(needle) ||
				item.properties?.toLowerCase().includes(needle) ||
				(item.weaponCategory ?? '').toLowerCase().includes(needle),
		)
	}, [itemQuery, categoryFilter])

	const shownMaterials = useMemo(() => {
		const needle = materialQuery.trim().toLowerCase()
		return availableMaterials.filter((material) => {
			if (materialKind && material.materialType !== materialKind) return false
			return (
				!needle ||
				material.name.toLowerCase().includes(needle) ||
				material.description.toLowerCase().includes(needle)
			)
		})
	}, [availableMaterials, materialQuery, materialKind])

	const shownEnchantments = useMemo(() => {
		const needle = enchantQuery.trim().toLowerCase()
		return availableEnchantments.filter(
			(enchantment) =>
				!needle ||
				enchantment.name.toLowerCase().includes(needle) ||
				enchantment.description.toLowerCase().includes(needle),
		)
	}, [availableEnchantments, enchantQuery])

	const cost = useMemo(() => {
		if (!selectedBaseItem || !selectedQuality) {
			return {
				baseCost: 0,
				magicItemBaseCost: 0,
				materialExtraCost: 0,
				enchantmentCost: 0,
				totalCost: 0,
			}
		}
		return {
			baseCost: selectedBaseItem.cost,
			magicItemBaseCost: getMagicItemBaseCost(
				selectedQuality,
				selectedBaseItem.category,
			),
			materialExtraCost: getSpecialMaterialExtraCost(
				selectedMaterial,
				selectedQuality,
				selectedBaseItem.category,
			),
			enchantmentCost: selectedEnchantment
				? getEnchantmentCost(selectedQuality, selectedBaseItem.category)
				: 0,
			totalCost: calculateMagicItemCost(
				selectedBaseItem,
				selectedQuality,
				selectedMaterial,
				selectedEnchantment,
			),
		}
	}, [selectedBaseItem, selectedQuality, selectedMaterial, selectedEnchantment])

	const enhanceProperties = (
		baseProperties: string,
		quality: QualityTier,
		isWeapon: boolean,
	): string => {
		let properties = baseProperties

		if (
			ARMOR_CATEGORIES.includes(category as ItemCategory) &&
			selectedBaseItem
		) {
			const totalAV = getTotalAV(selectedBaseItem, quality)
			if (properties.includes('AV +')) {
				properties = properties.replace(/AV \+\d+/g, `AV +${totalAV}`)
			} else if (totalAV > 0) {
				properties = `AV +${totalAV}${properties ? ', ' + properties : ''}`
			}
		}

		if (category === 'ammo' && selectedBaseItem) {
			const damageBonus = getAmmoDamageBonus(
				Number(selectedBaseItem.quality),
				quality,
			)
			const ammoProperties: string[] = []
			if (damageBonus > 0) ammoProperties.push(`+${damageBonus} dmg`)
			ammoProperties.push(selectedEnchantment ? '3 pieces' : 'supply')
			const base = properties
				? properties
						.replace(/supply/g, '')
						.replace(/,\s*$/, '')
						.replace(/^,\s*/, '')
				: ''
			properties = (base ? [base, ...ammoProperties] : ammoProperties)
				.filter((p) => p.trim())
				.join(', ')
		}

		return modifyPropertiesString(
			properties,
			calculatePropertyModifications(
				category as ItemCategory,
				selectedMaterial,
				selectedEnchantment,
			),
		)
	}

	const finalName = useMemo(
		() =>
			selectedBaseItem && selectedQuality
				? generateItemName(
						selectedBaseItem,
						selectedMaterial,
						selectedEnchantment,
						selectedQuality,
						selectedAppearance,
					)
				: '',
		[
			selectedBaseItem,
			selectedMaterial,
			selectedEnchantment,
			selectedQuality,
			selectedAppearance,
		],
	)

	/** The appearances open to the chosen base item, its own name first. */
	const appearances = useMemo(
		() => (selectedBaseItem ? getCulturalVariants(selectedBaseItem.name) : []),
		[selectedBaseItem],
	)
	const itemHasVariants = Boolean(
		selectedBaseItem && hasCulturalVariants(selectedBaseItem.name),
	)

	const finalDescription = useMemo(() => {
		if (!selectedBaseItem || !selectedQuality) return ''
		let description = generateItemDescription(
			selectedBaseItem,
			selectedQuality,
			selectedMaterial,
			selectedEnchantment,
		)
		if (category === 'ammo' && selectedEnchantment) {
			description +=
				'\n\nEach shot consumes 1 use, regardless of whether it hits.'
		}
		return description
	}, [
		selectedBaseItem,
		selectedQuality,
		selectedMaterial,
		selectedEnchantment,
		category,
	])

	const finalProperties =
		selectedBaseItem && selectedQuality
			? enhanceProperties(
					selectedBaseItem.properties,
					selectedQuality,
					WEAPON_CATEGORIES.includes(category as ItemCategory),
				)
			: ''

	const finalLoad =
		selectedBaseItem && selectedQuality
			? calculateFinalLoad(
					selectedBaseItem.load,
					calculatePropertyModifications(
						category as ItemCategory,
						selectedMaterial,
						selectedEnchantment,
					),
				)
			: null

	const hasDraft = Boolean(
		selectedBaseItem || selectedQuality || selectedEnchantment,
	)
	const canCreate = Boolean(
		selectedBaseItem && selectedQuality && selectedMaterial,
	)

	const handleReset = () => {
		setSelectedBaseItem(null)
		setSelectedQuality('')
		setSelectedMaterial(null)
		setSelectedEnchantment(null)
		setSelectedAppearance(null)
		setOpenRegister('item')
		setItemQuery('')
		setCategoryFilter(null)
		setMaterialQuery('')
		setMaterialKind(null)
		setEnchantQuery('')
	}

	const handleClose = () => {
		if (hasDraft) setShowConfirmClose(true)
		else {
			handleReset()
			onClose()
		}
	}

	const chooseItem = (item: BaseItem) => {
		setSelectedBaseItem(item)
		// The material and enchantment pools are derived from the category, so a
		// different category invalidates both. Cleared rather than silently kept.
		setSelectedMaterial(null)
		setSelectedEnchantment(null)
		// The appearance list is the base item's own, so a different item invalidates
		// it as surely as the category invalidates the material.
		setSelectedAppearance(null)
		/*
			Appearance next, where it has anything to offer (owner review).

			It sat last on the theory that the register changing nothing but the name
			must not interrupt the ones that price the item. But it is answered ENTIRELY
			by the base item — nothing downstream feeds it — so putting it last made the
			reader carry "what is this thing called" past three decisions that have no
			bearing on it. Naming the sword is part of picking the sword.

			Items with no variants skip straight to quality: advancing into a locked
			register would state a decision that is not there.
		*/
		setOpenRegister(hasCulturalVariants(item.name) ? 'appearance' : 'quality')
	}

	const chooseAppearance = (name: string | null) => {
		setSelectedAppearance(name)
		setOpenRegister('quality')
	}

	const chooseQuality = (value: QualityTier) => {
		setSelectedQuality(value)
		// A material or enchantment can fall out of range when quality drops.
		setSelectedMaterial(null)
		setSelectedEnchantment(null)
		/*
			Straight to the ENCHANTMENT, not the material.

			Material is required by the rules, but the plain one is chosen for you and
			is what most items want — so leading with it puts a settled question in
			front of the interesting one. The enchantment is what makes the thing
			magic, and it is the reason anyone opened this dialog. Material sits after
			it as a refinement, already answered.
		*/
		setOpenRegister('enchantment')
	}

	/*
		Choosing ADVANCES the chain, it does not just record an answer (owner review).

		Every register up to here handed you the next one, and the enchantment did not:
		picking one left its own list open, so the material was reachable only through
		its `Change` control, which a reader who had never seen it open had no reason
		to press. A settled register that stays open is also the one thing the collapse
		rule exists to prevent.
	*/
	const chooseEnchantment = (enchantment: Enchantment | null) => {
		setSelectedEnchantment(enchantment)
		setOpenRegister('material')
	}

	// Material is the end of the chain, so it stays open with its answer marked.
	const chooseMaterial = (material: SpecialMaterial) => {
		setSelectedMaterial(material)
	}

	const handleCreateItem = () => {
		if (!selectedBaseItem || !selectedQuality || !selectedMaterial || !category)
			return

		const isWeapon = WEAPON_CATEGORIES.includes(category)
		const baseProps = {
			name: finalName,
			description: finalDescription,
			cost: cost.totalCost,
			load: finalLoad ?? selectedBaseItem.load,
			location: targetLocation,
			uses: 0,
			durability: getDurabilityDie(selectedBaseItem, selectedQuality) as any,
		}

		let itemToCreate: Partial<Weapon> | Partial<Item> | null = null

		if (isWeapon || category === 'spell-catalyst') {
			const baseDamage = Number(selectedBaseItem.damage) || 0
			const bonus = isWeapon
				? getWeaponDamageBonus(
						Number(selectedBaseItem.quality),
						selectedQuality,
					)
				: getSpellDamageBonus(selectedQuality)
			itemToCreate = {
				...baseProps,
				damage: {
					/*
						The rules default, from the weapon's own type (owner report: a
						Cleaver arrived with an empty base attribute).

						This was a hardcoded `''`, so every weapon the builder has ever made
						landed on the sheet with no base attribute at all and a damage
						equation that could not be read. `importWeapons` defaults it to
						`STR`, but the builder's payload is spread OVER that default, so the
						empty string won every time.

						A spell catalyst keeps the empty base on purpose: its bonus applies
						to a spell, and the spell carries its own attribute.
					*/
					base: isWeapon
						? getBaseDamageType(selectedBaseItem.weaponCategory)
						: '',
					weapon: baseDamage + bonus,
					other: 0,
					otherWeak: 0,
					otherStrong: 0,
					otherCritical: 0,
					type: 'physical',
				},
				properties: enhanceProperties(
					selectedBaseItem.properties,
					selectedQuality,
					isWeapon,
				),
				quality: selectedQuality,
			} as Partial<Weapon>
		} else {
			const enhanced = enhanceProperties(
				selectedBaseItem.properties,
				selectedQuality,
				false,
			)
			itemToCreate = {
				...baseProps,
				properties: enhanced ? enhanced.split(', ') : [],
				/*
					Everything arrives in the pack. The builder no longer asks where the
					item goes — that is a filing decision the Items tab's own Location row
					owns — so the two `worn` branches that used to sit here are gone rather
					than left as dead conditionals on a constant.

					The item's `slot` is still carried through, so moving it to Equipment on
					the sheet knows where it belongs without the reader re-stating it.
				*/
				container: 'backpack',
				slot: (selectedBaseItem.slot || '') as EquipmentSlotType,
				amount: 1,
				quality: selectedQuality,
			} as Partial<Item>
		}

		if (character && onCreateItem && itemToCreate) onCreateItem(itemToCreate)
		if (onItemCreated && itemToCreate) onItemCreated(itemToCreate, finalName)

		/*
			Adding the item ENDS the commission (owner review).

			It used to flash "Created X" and leave the whole draft standing, which put
			the reader in front of a builder holding an item that already exists —
			pressing the verb again silently made a second copy, and closing then asked
			whether to discard work that had already been saved. The item's real home is
			the Items tab, which is behind this dialog, so the deliverable is only
			visible once the dialog is gone.

			`handleReset` rather than `handleClose`: the draft was committed, so there is
			nothing to confirm the loss of.
		*/
		handleReset()
		onClose()
	}

	/**
	 * The item as JSON, for a reader with no character sheet open.
	 *
	 * The docs page mounts this builder to DESIGN an item, not to own one, and the
	 * old flow put that behind a post-create screen (`MagicItemBuilderOutput`) that
	 * only appeared after pressing Create. Since the plate is live, the copy does not
	 * need a screen of its own — it is a verb, exactly as the Companion Builder's
	 * "Copy markdown" is.
	 */
	const copyItem = () => {
		if (!selectedBaseItem || !selectedQuality) return
		const isWeapon = WEAPON_CATEGORIES.includes(category as ItemCategory)
		const payload: Record<string, unknown> = {
			name: finalName,
			category: isWeapon ? 'Weapon' : CATEGORY_LABEL[category as ItemCategory],
			quality: selectedQuality,
			cost: cost.totalCost,
			load: finalLoad ?? selectedBaseItem.load,
			durability: getDurabilityDie(selectedBaseItem, selectedQuality),
			description: finalDescription,
		}
		if (finalProperties) payload.properties = finalProperties
		navigator.clipboard.writeText(JSON.stringify(payload, null, 2)).then(() => {
			setCopied(true)
			setTimeout(() => setCopied(false), 1800)
		})
	}

	/** What the quality buys, read off the rulebook's own tables. */
	const qualityGrant = (): [string, React.ReactNode][] => {
		if (!selectedBaseItem || !selectedQuality) return []
		const pairs: [string, React.ReactNode][] = [
			[
				'Magic cost',
				cost.magicItemBaseCost > 0
					? `+${coins(cost.magicItemBaseCost)}`
					: '— skipped',
			],
		]
		if (selectedBaseItem.damage) {
			pairs.push([
				'Weapon dmg',
				`+${getWeaponDamageBonus(Number(selectedBaseItem.quality), selectedQuality)}`,
			])
		}
		if (category === 'spell-catalyst') {
			pairs.push(['Spell dmg', `+${getSpellDamageBonus(selectedQuality)}`])
		}
		if (ARMOR_CATEGORIES.includes(category as ItemCategory)) {
			pairs.push(['AV', `+${getArmorAVBonus(selectedQuality)}`])
		}
		if (category === 'ammo') {
			pairs.push([
				'Dmg bonus',
				`+${getAmmoDamageBonus(Number(selectedBaseItem.quality), selectedQuality)}`,
			])
		}
		if (isWandOrStaff(selectedBaseItem) && selectedQuality >= 4) {
			pairs.push(['Spell rank', getMaxSpellRank(selectedQuality)])
			pairs.push([
				'Charges',
				isStaffItem(selectedBaseItem)
					? getStaffCharges(selectedQuality)
					: getWandCharges(selectedQuality),
			])
			if (isStaffItem(selectedBaseItem)) {
				pairs.push(['Spells held', getStaffSpellCapacity(selectedQuality)])
			}
		}
		pairs.push([
			'Durability',
			getDurabilityDie(selectedBaseItem, selectedQuality),
		])
		return pairs
	}

	/**
	 * `qualityTierLabels` reads `Q4 (formidable)` — the figure and the descriptor in
	 * one string. The plate shows them separately, so printing the label whole would
	 * put "Q4" on the plate twice. Split for display, kept whole for the accessible
	 * name, since neither half identifies the option on its own.
	 */
	const qualityOptions: RailOption[] = QUALITIES.map((value) => {
		const label = qualityTierLabels[value]
		const descriptor = label.match(/\(([^)]+)\)/)?.[1] ?? label
		/*
			Armour starts at Q4.
			
			The effects chapter is explicit: magic armor, shields and helmets "are only
			available at minimum Quality 4 in contrast to weapons", and their AV table
			starts at Q4. The builder offered Q3 for them anyway, which charged the Q3
			magic-item base cost (500 coins for a shield, 1,000 for heavy armour) and
			granted +0 AV in return — a legal-looking item the rules do not have.
			
			Shown disabled with the reason rather than dropped, so the cap reads as a
			rule rather than as a shorter rail.
		*/
		const armourBelowFloor =
			value === 3 && ARMOR_CATEGORIES.includes(category as ItemCategory)
		return {
			value,
			figure: `Q${value}`,
			name: descriptor,
			ariaLabel: label,
			disabled: armourBelowFloor,
			disabledReason: armourBelowFloor
				? 'armour, shields and helmets start at Q4'
				: undefined,
		}
	})

	const commission = selectedBaseItem ? (
		<>
			<b>{finalName || selectedBaseItem.name}</b>
			{selectedQuality
				? ` — ${coins(cost.totalCost)} coins`
				: ' — choose a quality'}
		</>
	) : (
		<>Choose a base item</>
	)

	return (
		<>
			<BuilderShell
				open={open}
				onClose={handleClose}
				title="Magic Item Builder"
				commission={commission}
				paneLabels={{ build: 'Build', result: 'Item' }}
				result={
					<MagicItemPlate
						baseItem={selectedBaseItem}
						quality={selectedQuality}
						material={selectedMaterial}
						enchantment={selectedEnchantment}
						cost={cost}
						name={finalName}
						description={finalDescription}
						properties={finalProperties}
						load={finalLoad}
						isWandOrStaff={isWandOrStaff(selectedBaseItem)}
						isStaff={isStaffItem(selectedBaseItem)}
					/>
				}
				actions={
					<>
						<BuilderVerb disabled={!hasDraft} onClick={handleReset}>
							Reset
						</BuilderVerb>
						<BuilderVerbSpacer />
						{copied && (
							<span className="cb-flash" role="status">
								Copied
							</span>
						)}
						{/*
							The primary verb only exists where there is something to add the item
							TO. On the docs page there is no character, `onCreateItem` is never
							called, and "Create item" did nothing but flash a message — a verb
							that lies about having done something. There, copying IS the
							deliverable, so it takes the primary weight instead.
						*/}
						<BuilderVerb
							tone={character ? 'quiet' : 'primary'}
							disabled={!canCreate}
							onClick={copyItem}
						>
							Copy JSON
						</BuilderVerb>
						{character && (
							<BuilderVerb
								tone="primary"
								disabled={!canCreate}
								onClick={handleCreateItem}
							>
								Add to inventory
							</BuilderVerb>
						)}
						<BuilderVerb onClick={handleClose}>Close</BuilderVerb>
					</>
				}
			>
				<BuilderRegister
					step="I"
					label="Base item"
					note={
						selectedQuality
							? `costs shown at Q${selectedQuality}`
							: 'what the magic is worked into'
					}
					grow
					open={openRegister === 'item'}
					onOpen={() => setOpenRegister('item')}
					summary={
						selectedBaseItem ? (
							<>
								<b>{selectedBaseItem.name}</b> —{' '}
								{CATEGORY_LABEL[category as ItemCategory]},{' '}
								{coins(selectedBaseItem.cost)} coins
							</>
						) : null
					}
				>
					<div className="cb-ledger__filters">
						<SearchField
							value={itemQuery}
							onChange={setItemQuery}
							placeholder="Search items"
						/>
						{CATEGORIES.map((key) => (
							<FilterChip
								key={key}
								pressed={categoryFilter === key}
								sigil={CATEGORY_SIGIL[key]}
								onClick={() =>
									setCategoryFilter(categoryFilter === key ? null : key)
								}
							>
								{CATEGORY_LABEL[key]}
							</FilterChip>
						))}
					</div>
					<Ledger
						label="Base item"
						columns="15px minmax(6rem, 1.4fr) 2.5rem 3.5rem 2.5rem minmax(0, 1.6fr)"
						headings={[
							{ label: '' },
							{ label: 'Name' },
							{ label: 'Q', align: 'center' },
							{
								label: selectedQuality ? `Cost at Q${selectedQuality}` : 'Cost',
								align: 'right',
							},
							{ label: 'Load', align: 'right' },
							{ label: 'Properties' },
						]}
					>
						{shownItems.map((item) => (
							<LedgerRow
								key={`${item.category}-${item.name}`}
								selected={
									selectedBaseItem?.name === item.name &&
									selectedBaseItem?.category === item.category
								}
								sigil={CATEGORY_SIGIL[item.category]}
								onSelect={() => chooseItem(item)}
							>
								<span className="cb-row__name">{item.name}</span>
								<span className="cb-row__num" style={{ textAlign: 'center' }}>
									{item.quality}
								</span>
								<span className="cb-row__num">
									{coins(
										selectedQuality
											? item.cost +
													getMagicItemBaseCost(selectedQuality, item.category)
											: item.cost,
									)}
								</span>
								<span className="cb-row__num">{item.load}</span>
								<span className="cb-row__skills">{item.properties}</span>
							</LedgerRow>
						))}
						{shownItems.length === 0 && (
							<LedgerEmpty
								onClear={() => {
									setItemQuery('')
									setCategoryFilter(null)
								}}
							>
								{categoryFilter
									? `No ${CATEGORY_LABEL[categoryFilter]} matches “${itemQuery.trim()}”`
									: `Nothing matches “${itemQuery.trim()}”`}
							</LedgerEmpty>
						)}
					</Ledger>
				</BuilderRegister>

				{/*
					The equipment chapter's two "of the Regions" sections, which the builder
					could not reach before: every item it made was a *Bronze Longsword*,
					never a *Bronze Bastard Sword*.

					Directly behind the base item (owner review). It was last, on the
					theory that the register changing nothing but the name must not
					interrupt the ones that price the item. But it is answered ENTIRELY by
					the base item and nothing downstream feeds it, so putting it last made
					the reader carry "what is this thing called" past three decisions with
					no bearing on it. Naming the sword is part of picking the sword.
				*/}
				<BuilderRegister
					step="II"
					label="Appearance"
					note="a name only, no mechanical change"
					open={openRegister === 'appearance'}
					onOpen={() => setOpenRegister('appearance')}
					locked={
						!selectedBaseItem
							? 'Choose a base item to see its cultural types'
							: !itemHasVariants
								? `A ${selectedBaseItem.name} has no cultural variants`
								: undefined
					}
					summary={
						<>
							<b>{selectedAppearance ?? selectedBaseItem?.name}</b>
							{selectedAppearance ? ` — a ${selectedBaseItem?.name}` : ''}
						</>
					}
				>
					<Ledger
						label="Appearance"
						columns="15px minmax(6rem, 1fr) 9.5rem minmax(0, 1.6fr)"
						headings={[
							{ label: '' },
							{ label: 'Called' },
							{ label: 'Common in' },
							{ label: 'Counts as' },
						]}
					>
						{appearances.map(({ name, region }, index) => (
							<LedgerRow
								key={name}
								selected={
									index === 0
										? selectedAppearance === null
										: selectedAppearance === name
								}
								/* The standard name is a real row, not the absence of one —
									the same rule the "No enchantment" row above follows. It
									stores `null` so the name tracks the base item rather than
									going stale against it. */
								onSelect={() => chooseAppearance(index === 0 ? null : name)}
							>
								<span className="cb-row__name">{name}</span>
								{/* Where the shape is COMMON, never who may carry one — the
									rules are explicit that the keying is suggestive. The
									standard form belongs to no one people, so it says so
									rather than claiming a region. */}
								<span className="cb-row__skills">
									{index === 0
										? '—'
										: region === 'Common'
											? 'every land'
											: region}
								</span>
								<span className="cb-row__skills">
									{index === 0
										? 'the standard form'
										: `${selectedBaseItem?.name}, unchanged in every stat`}
								</span>
							</LedgerRow>
						))}
					</Ledger>
				</BuilderRegister>

				<BuilderRegister
					step="III"
					label="Quality"
					note="magic items start at Q3"
					open={openRegister === 'quality'}
					onOpen={() => setOpenRegister('quality')}
					locked={selectedBaseItem ? undefined : 'Choose a base item first'}
					summary={
						selectedQuality ? (
							// `qualityTierLabels` already reads `Q5 (exceptional)` — prefixing
							// another `Q5` printed it twice.
							<b>{qualityTierLabels[selectedQuality]}</b>
						) : null
					}
				>
					<ChoiceRail
						label="Quality"
						variant="quality"
						options={qualityOptions}
						value={selectedQuality}
						onChange={(value) => chooseQuality(Number(value) as QualityTier)}
					/>
					{selectedQuality && <GrantLine pairs={qualityGrant()} />}
				</BuilderRegister>

				<BuilderRegister
					step="IV"
					label="Enchantment"
					note="optional"
					grow
					open={openRegister === 'enchantment'}
					onOpen={() => setOpenRegister('enchantment')}
					locked={
						!selectedBaseItem || !selectedQuality
							? 'Choose a base item and its quality first'
							: undefined
					}
					summary={
						selectedEnchantment ? (
							<>
								<b>{selectedEnchantment.name}</b> — +
								{coins(cost.enchantmentCost)} coins
							</>
						) : (
							<>No enchantment</>
						)
					}
				>
					<div className="cb-ledger__filters">
						<SearchField
							value={enchantQuery}
							onChange={setEnchantQuery}
							placeholder="Search enchantments"
						/>
					</div>
					<Ledger
						label="Enchantment"
						columns="15px minmax(6rem, 1fr) 3.5rem minmax(0, 2fr)"
						headings={[
							{ label: '' },
							{ label: 'Enchantment' },
							{ label: 'Kind', align: 'center' },
							{ label: 'Effect' },
						]}
					>
						{/* Choosing nothing is a real choice here, so it is a real row —
							not the absence of one. */}
						<LedgerRow
							selected={selectedEnchantment === null}
							onSelect={() => chooseEnchantment(null)}
						>
							<span className="cb-row__name">No enchantment</span>
							<span className="cb-row__num">—</span>
							<span className="cb-row__skills">A material upgrade only.</span>
						</LedgerRow>
						{shownEnchantments.map((enchantment) => (
							<LedgerRow
								key={enchantment.id}
								selected={selectedEnchantment?.id === enchantment.id}
								onSelect={() => chooseEnchantment(enchantment)}
							>
								<span className="cb-row__name">{enchantment.name}</span>
								<span className="cb-row__num" style={{ textAlign: 'center' }}>
									{enchantment.type}
								</span>
								<span className="cb-row__skills">
									{enchantment.description}
								</span>
							</LedgerRow>
						))}
						{shownEnchantments.length === 0 && enchantQuery.trim() && (
							<LedgerEmpty onClear={() => setEnchantQuery('')}>
								{`Nothing matches “${enchantQuery.trim()}”`}
							</LedgerEmpty>
						)}
					</Ledger>
				</BuilderRegister>

				<BuilderRegister
					step="V"
					label="Material"
					note="required; a base material costs nothing extra"
					grow
					open={openRegister === 'material'}
					onOpen={() => setOpenRegister('material')}
					locked={
						!selectedBaseItem || !selectedQuality
							? 'Choose a base item and its quality first'
							: undefined
					}
					summary={
						selectedMaterial ? (
							<>
								<b>{selectedMaterial.name}</b>
								{selectedMaterial.materialType === 'base'
									? ' — base material, no extra cost'
									: ` — +${coins(cost.materialExtraCost)} coins`}
							</>
						) : null
					}
				>
					<div className="cb-ledger__filters">
						<SearchField
							value={materialQuery}
							onChange={setMaterialQuery}
							placeholder="Search materials"
						/>
						{(['base', 'special'] as const).map((kind) => (
							<FilterChip
								key={kind}
								pressed={materialKind === kind}
								onClick={() =>
									setMaterialKind(materialKind === kind ? null : kind)
								}
							>
								{kind}
							</FilterChip>
						))}
					</div>
					<Ledger
						label="Material"
						columns="15px minmax(6rem, 1fr) 4rem minmax(0, 2fr)"
						headings={[
							{ label: '' },
							{ label: 'Material' },
							{ label: 'Extra', align: 'right' },
							{ label: 'Effect' },
						]}
					>
						{shownMaterials.map((material) => {
							const extra =
								selectedQuality && category
									? getSpecialMaterialExtraCost(
											material,
											selectedQuality,
											category,
										)
									: 0
							return (
								<LedgerRow
									key={material.id}
									selected={selectedMaterial?.id === material.id}
									onSelect={() => chooseMaterial(material)}
								>
									<span className="cb-row__name">{material.name}</span>
									<span className="cb-row__num">
										{extra > 0 ? `+${coins(extra)}` : '—'}
									</span>
									<span className="cb-row__skills">
										{material.properties || material.description}
									</span>
								</LedgerRow>
							)
						})}
						{shownMaterials.length === 0 && (
							<LedgerEmpty
								onClear={() => {
									setMaterialQuery('')
									setMaterialKind(null)
								}}
							>
								No material for this category at Q{selectedQuality}
							</LedgerEmpty>
						)}
					</Ledger>
				</BuilderRegister>
			</BuilderShell>

			{/* Kept by the S8 confirm audit: the builder holds a multi-step draft the
				sheet never persisted, so closing is the one press here that loses work
				rather than an entity that can be re-imported. */}
			<ConfirmDialog
				open={showConfirmClose}
				title="Unsaved changes"
				confirmLabel="Discard changes"
				cancelLabel="Keep editing"
				onConfirm={() => {
					setShowConfirmClose(false)
					handleReset()
					onClose()
				}}
				onCancel={() => setShowConfirmClose(false)}
			>
				Closing the builder discards the item you are building. This cannot be
				undone.
			</ConfirmDialog>
		</>
	)
}
