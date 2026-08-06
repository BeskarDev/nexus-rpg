import { SheetLayout } from './SheetLayout'
import {
	Band,
	Group,
	Pips,
	Rows,
	SlotPanel,
	SplitRows,
	Stat,
} from './SheetPrimitives'
import type { SigilSlot, WornSlot } from './SheetPrimitives'
import {
	BaseDamageType,
	Character,
	Damage,
	EquipmentSlotType,
	Item,
} from '@site/src/types/Character'

/**
 * The Equipment sheet, and the printed register's first proof (M16 S1, M17 S3).
 *
 * ## What M16 changed, and why
 *
 * It was 307 lines of MUI `TextField`s inside two fixed-height boxes with
 * `overflowY: 'hidden'`. Two faults came out of that shape, and they are the
 * same fault:
 *
 * - **It clipped in silence.** More weapons than fit meant the rows were simply
 *   not on the paper, with nothing saying so. An empty table is obvious; a
 *   truncated one is not.
 * - **It wasted half the page.** The heights were sized for a maximum nobody
 *   reaches, so the common character printed 55% white.
 *
 * `Rows` answers both: the lists size to their content, and a list that overruns
 * prints what it dropped rather than losing it.
 *
 * ## What M17 rebuilt
 *
 * One table held everything a character owned, with the body slot collapsed into
 * a text column — so "what am I wearing on my hands?" was answered by reading a
 * whole list instead of by looking at one place, and an EMPTY slot could not be
 * stated at all. It becomes three blocks: weapons sized for five, a worn slot
 * panel, and carried inventory.
 *
 * ## What the owner's review changed
 *
 * - **Worn kit lives in the worn panel, all of it.** Anything worn WITHOUT a
 *   slot assigned used to fall through into carried inventory, marked with a
 *   location glyph to explain itself. That is the wrong answer to the right
 *   question: it is worn, so it belongs in the worn block, and the panel grows
 *   past its eight fixed slots to hold it. With no worn kit left in the carried
 *   list, that list's location column had nothing left to say and is gone.
 * - **Both blocks say more.** A worn slot carries its item's properties, load
 *   and cost on a second line; a carried row carries its wear track and its cost.
 * - **Carried runs in two tracks**, which doubles the block from 24 rows to 48
 *   in the same height (`SplitRows`).
 *
 * ## What is still cut
 *
 * Weapon cost (M16 D3). A weapon's damage and properties are read every turn and
 * its price is read once, ever — and unlike an item's, it does not fit beside
 * three columns that are all read more often.
 */

/**
 * The eight worn slots, in the order a person is dressed, each with the mark it
 * already carries on the digital sheet.
 */
const WORN_SLOTS: {
	slot: Exclude<EquipmentSlotType, ''>
	label: string
	sigil: SigilSlot
}[] = [
	{ slot: 'head', label: 'Head', sigil: 'slot-head' },
	{ slot: 'neck', label: 'Neck', sigil: 'slot-neck' },
	{ slot: 'back', label: 'Back', sigil: 'slot-back' },
	{ slot: 'body', label: 'Body', sigil: 'slot-body' },
	{ slot: 'hands', label: 'Hands', sigil: 'slot-hands' },
	{ slot: 'ring', label: 'Ring', sigil: 'slot-ring' },
	{ slot: 'waist', label: 'Waist', sigil: 'slot-waist' },
	{ slot: 'feet', label: 'Feet', sigil: 'slot-feet' },
]

export const EquipmentSheet: React.FC<{ char: Character }> = ({ char }) => {
	const calculateBaseDamage = (base: BaseDamageType) => {
		switch (base) {
			case 'STR':
				return char.statistics.strength.value / 2
			case 'AGI':
				return char.statistics.agility.value / 2
			case 'SPI':
				return char.statistics.spirit.value / 2
			case 'MND':
				return char.statistics.mind.value / 2
			default:
				return 0
		}
	}

	const printDamageField = ({
		base,
		weapon,
		other,
		otherWeak,
		otherStrong,
		otherCritical,
	}: Damage) => {
		const baseDamage = calculateBaseDamage(base)
		return [
			baseDamage + weapon + other + otherWeak,
			baseDamage + weapon * 2 + other + otherStrong,
			baseDamage + weapon * 3 + other + otherCritical,
		].join('/')
	}

	const label = (item: { name: string; amount: number }) =>
		`${item.name}${item.amount > 1 ? ` ×${item.amount}` : ''}`

	const properties = (item: Item) =>
		Array.isArray(item.properties)
			? item.properties.join(', ')
			: (item.properties ?? '')

	const worn = char.items.items.filter((i) => i.name && i.location === 'worn')

	/*
	 * The panel is the eight slots, PLUS a place for anything worn that has no
	 * slot assigned (owner review).
	 *
	 * More than one thing in a slot is legal — two rings, a ring and a signet —
	 * so they share the place rather than one of them silently winning it. An
	 * unslotted item gets its own cell under the generic worn figure, which is
	 * honest: the app knows it is worn and does not know where.
	 */
	const slots: WornSlot[] = [
		...WORN_SLOTS.map(({ slot, label: slotLabel, sigil }) => {
			const inSlot = worn.filter((i) => i.slot === slot)
			return {
				key: slot,
				label: slotLabel,
				sigil,
				item: inSlot.map(label).join(', '),
				properties: inSlot.map(properties).filter(Boolean).join(', '),
				load: inSlot.reduce((sum, i) => sum + (i.load ?? 0), 0),
				cost: inSlot.reduce((sum, i) => sum + (i.cost ?? 0), 0),
			}
		}),
		...worn
			.filter((i) => !i.slot)
			.map((i) => ({
				key: i.id,
				label: 'Worn',
				sigil: 'location-worn' as SigilSlot,
				item: label(i),
				properties: properties(i),
				load: i.load,
				cost: i.cost,
			})),
	]

	// Only the pack. Everything worn is in the panel above, which is what let the
	// location column go.
	const carried = [...char.items.items]
		.filter((i) => i.name && i.location === 'carried')
		.sort((a, b) => a.name.localeCompare(b.name))

	/*
	 * A nameless weapon is an empty row of the app's editor, not a weapon. The
	 * blank sheet ships with eight of them, so an unfiltered list against a limit
	 * of five printed "+ 3 more weapons — see the app" on a character who owns
	 * none (M17 S3).
	 */
	const weapons = char.items.weapons.filter(
		(w) => w.name && w.location === 'worn',
	)

	return (
		<SheetLayout crest="equipment">
			{/* `scales` is what weighs a load, and it is not a mark any of this
				band's own cells carry (owner review). */}
			<Band name="Inventory & Load" sigil="scales">
				<Stat
					label="Coins"
					sigil="coins"
					value={char.items.coins}
					width="22mm"
				/>
				<Stat
					label="Load"
					sigil="load"
					value={char.items.encumbrance.currentLoad}
					width="18mm"
				/>
				<Stat
					label="Encumbered At"
					value={char.items.encumbrance.encumberedAt}
					width="24mm"
				/>
				<Stat
					label="Max Load"
					value={char.items.encumbrance.overencumberedAt}
					width="20mm"
				/>
			</Band>

			<Group name="Weapons" sigil="sword">
				<Rows
					noun="weapons"
					/* The owner carries three, five in the extreme case (F3). The old
					   eight was a page budget pretending to be a rule. */
					limit={5}
					reserve={5}
					track
					columns={[
						{ label: 'Name', width: '36mm' },
						{ label: 'Damage', width: '20mm' },
						{ label: 'Properties', width: '54mm' },
						{ label: 'Load', width: '8mm', align: 'center' },
					]}
					rows={weapons.map((w) => [
						w.name,
						w.damage ? printDamageField({ ...w.damage }) : '',
						w.properties,
						w.load,
					])}
				/>
			</Group>

			<Group name="Worn" sigil="location-worn">
				<SlotPanel slots={slots} />
			</Group>

			<Group name="Carried" sigil="pack">
				<SplitRows
					noun="items"
					/*
					 * Two tracks of 24 (owner review). The single-track block held 24 and
					 * was measured against the page; splitting it doubles the count in the
					 * same height, so the limit doubles with it.
					 */
					limit={48}
					track
					columns={[
						{ label: 'Name', width: '29mm' },
						{ label: 'Uses', width: '11mm', align: 'center' },
						{ label: 'Load', width: '7mm', align: 'center' },
						{ label: 'Cost', width: '9mm', align: 'right' },
					]}
					rows={carried.map((i) => [
						label(i),
						/* The wear track, as the same three jars the digital ledger and the
						   attribute wounds use — no new mark, and one idiom for "this is
						   being used up" across the whole artifact. */
						<Pips
							key={i.id}
							count={3}
							filled={i.uses ?? 0}
							sigil="wound"
							emptySigil="hp"
							size="2.6mm"
						/>,
						i.load,
						i.cost ? `${i.cost}c` : '',
					])}
				/>
			</Group>
		</SheetLayout>
	)
}
