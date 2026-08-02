import { SheetLayout } from './SheetLayout'
import { BaseDamageType, Character, Damage } from '@site/src/types/Character'
import { Field, Group, Rows, Stat } from './SheetPrimitives'

/**
 * The Spells sheet (M16 S3).
 *
 * ## A bug the rebuild removes rather than fixes
 *
 * The old table rendered its Damage cell only `{Boolean(spell.dealsDamage) && …}`
 * — per ROW. So a spell that dealt no damage printed one cell fewer, and every
 * column to its right shifted left on that line. A table whose columns move
 * between rows is not a table, and on a printed page there is no hover to
 * disambiguate it.
 *
 * `Rows` takes a column set once and every row fills it, so a spell with no
 * damage prints an empty Damage cell and the column holds.
 *
 * Spell DESCRIPTIONS stay cut (D3): eleven spells of rule text cannot fit on
 * 133 × 191mm above 5.5pt, and the name plus target, range and properties is
 * what is actually read mid-turn.
 */
export const SpellsSheet: React.FC<{ char: Character }> = ({ char }) => {
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
		const catalyst = char.spells.spellCatalystDamage
		return [
			baseDamage + weapon + catalyst + other + otherWeak,
			baseDamage + weapon * 2 + catalyst * 2 + other + otherStrong,
			baseDamage + weapon * 3 + catalyst * 3 + other + otherCritical,
		].join('/')
	}

	return (
		<SheetLayout>
			<div style={{ display: 'flex', gap: '1.5mm', alignItems: 'flex-end' }}>
				<Field
					label="Magic Skill"
					sigil="magic"
					value={char.spells.magicSkill}
					width="28mm"
				/>
				<Field
					label="Disciplines or Traditions"
					sigil="specialization"
					value={char.spells.specialization}
					grow
				/>
				<Stat
					label="Focus"
					sigil="focus"
					value={char.spells.focus.current}
					write
					width="18mm"
				/>
				<Stat label="Max Focus" value={char.spells.focus.total} width="18mm" />
			</div>

			<Group name="Learned Spells" sigil="scroll">
				<Rows
					noun="spells"
					limit={40}
					fill
					columns={[
						{ label: 'Cost', width: '8mm', align: 'center' },
						{ label: 'Rank', width: '8mm', align: 'center' },
						{ label: 'Name', width: '34mm' },
						{ label: 'Damage', width: '14mm', align: 'center' },
						{ label: 'Target', width: '14mm' },
						{ label: 'Range', width: '14mm' },
						{ label: 'Properties', width: '26mm' },
					]}
					rows={char.spells.spells.map((spell) => [
						spell.cost,
						spell.rank,
						spell.name,
						spell.dealsDamage ? printDamageField({ ...spell.damage }) : '',
						spell.target,
						spell.range,
						spell.properties,
					])}
				/>
			</Group>
		</SheetLayout>
	)
}
