import { SheetLayout } from './SheetLayout'
import { Character, Damage } from '@site/src/types/Character'
import { useDerivedCharacter } from '../../CharacterSheet/utils/deriveCharacter'
import { calculateDamageValue } from '../../CharacterSheet/utils/calculateDamageDisplay'
import { Band, Field, Group, Rows, Stat } from './SheetPrimitives'

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
 * Spell DESCRIPTIONS stay cut (M16 D3): eleven spells of rule text cannot fit
 * on an A5 half above 5.5pt, and the name plus target, range and properties is
 * what is actually read mid-turn.
 *
 * ## M17 S5, and what is deliberately NOT done here
 *
 * This page takes the register the other two established — the carved band over
 * the header stats, the wash reserved for tracking a wide line, and no
 * general-purpose write-lines (D3, S4) — and nothing else.
 *
 * M17 S5 also asks whether this page should be a compact INDEX rather than a
 * table: D3 says spells travel as printed cards when detail is needed, which
 * would make name, cost and an action mark enough, and the page would then want
 * LESS room than it has. That is a change to what the page is for, and the slice
 * requires the owner to confirm it first. Until then the table stands.
 */
export const SpellsSheet: React.FC<{ char: Character }> = ({ char }) => {
	// Max Focus and spell damage from the same code the digital Spells tab reads.
	// Max Focus used to print the stored total, a copy written only at creation.
	const derived = useDerivedCharacter(char)
	const printDamageField = (damage: Damage) =>
		calculateDamageValue(damage, 'spell', char)

	return (
		<SheetLayout crest="magic">
			{/* "Magic" is the rules' own word for this; "The Art" was invented here and
				appears nowhere in the game (owner review). `vortex` marks the band, since
				`sparkle` is already the Magic Skill cell's own mark. */}
			<Band name="Magic" sigil="vortex">
				<Field
					label="Magic Skill"
					sigil="magic"
					value={char.spells.magicSkill}
					width="30mm"
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
					width="20mm"
				/>
				<Stat label="Max Focus" value={derived.focus.max} width="20mm" />
			</Band>

			<Group name="Learned Spells" sigil="scroll">
				<Rows
					noun="spells"
					limit={40}
					track
					columns={[
						{ label: 'Cost', width: '8mm', align: 'center' },
						{ label: 'Rank', width: '8mm', align: 'center' },
						{ label: 'Name', width: '34mm' },
						{ label: 'Damage', width: '16mm', align: 'center' },
						{ label: 'Target', width: '15mm' },
						{ label: 'Range', width: '15mm' },
						{ label: 'Properties', width: '23mm' },
					]}
					/* A nameless spell is an empty row of the app's editor, not a
					   spell the character knows (M17 S5). */
					rows={char.spells.spells
						.filter((spell) => spell.name)
						.map((spell) => [
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
