import { SheetLayout } from './SheetLayout'
import { Field, Group, Rows } from './SheetPrimitives'
import { BaseDamageType, Character, Damage } from '@site/src/types/Character'

/**
 * The Equipment sheet, and the printed register's first proof (M16 S1).
 *
 * ## What changed, and why
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
 * ## What was cut
 *
 * **Cost, on both tables** (D3). Cost is a shopping number and shopping happens
 * between sessions, in the app, where the whole catalogue is. Damage and
 * properties are read every turn; what a staff cost is read once, ever.
 */
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

	// Worn first, then carried, alphabetical within each — the order a player
	// packs in, which is the order they look for something in.
	const sortedItems = [...char.items.items]
		.filter((i) => i.location === 'worn' || i.location === 'carried')
		.sort((a, b) => {
			if (a.location === 'worn' && b.location !== 'worn') return -1
			if (b.location === 'worn' && a.location !== 'worn') return 1
			return a.name.localeCompare(b.name)
		})

	const weapons = char.items.weapons.filter((w) => w.location === 'worn')

	return (
		<SheetLayout>
			<div style={{ display: 'flex', gap: '1.5mm' }}>
				<Field
					label="Coins"
					sigil="coins"
					value={char.items.coins}
					write
					width="24mm"
				/>
				<Field
					label="Load"
					sigil="load"
					value={char.items.encumbrance.currentLoad}
					write
					width="18mm"
				/>
				<Field
					label="Carry Cap"
					value={char.items.encumbrance.encumberedAt}
					width="18mm"
				/>
				<Field
					label="Max Cap"
					value={char.items.encumbrance.overencumberedAt}
					width="14mm"
				/>
			</div>

			<Group name="Weapons" sigil="sword">
				<Rows
					noun="weapons"
					limit={8}
					fill
					columns={[
						{ label: 'Name', width: '34mm' },
						{ label: 'Damage', width: '18mm' },
						{ label: 'Properties', width: '58mm' },
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

			<Group name="Equipment & Items" sigil="pack">
				<Rows
					noun="items"
					limit={31}
					fill
					columns={[
						{ label: 'Name', width: '62mm' },
						{ label: 'Worn / Carried', width: '40mm' },
						{ label: 'Load', width: '8mm', align: 'center' },
					]}
					rows={sortedItems.map((i) => [
						`${i.name}${i.amount > 1 ? ` ×${i.amount}` : ''}`,
						i.location === 'worn' && i.slot ? i.slot : i.location,
						i.load,
					])}
				/>
			</Group>
		</SheetLayout>
	)
}
