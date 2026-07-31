import { MenuItem, MenuList } from '@mui/material'
import { SheetField, SigilPip } from '../../components'
import DieToken from '@site/src/components/codex/DieToken'
import {
	Attribute,
	AttributeType,
	attributeTypeArray,
} from '@site/src/types/Character'
import React from 'react'
import type { StatSigilName } from '@site/src/components/codex/stat-sigils'

export type AttributeCardProps = {
	attribute: Attribute
	label: string
	/** M9 S11: the mark is data now, not a rendered node — SheetField draws it. */
	sigil: StatSigilName
	updateAttribute: (update: Partial<Attribute>) => void
	totalWounds: number
	color: string
}

const getWoundTooltip = (label: string) => {
	switch (label) {
		case 'Strength':
			return 'Broken Bone (upper body): +1 bane on STR rolls'
		case 'Agility':
			return 'Broken Bone (legs): +1 bane on AGI rolls'
		case 'Spirit':
			return 'Head Injury: +1 bane on SPI rolls'
		case 'Mind':
			return 'Concussion: +1 bane on MND rolls'
		default:
			return 'Wound: +1 bane on rolls'
	}
}

const getAttributeDescription = (label: string) => {
	switch (label) {
		case 'Strength':
			return 'Strength: Physical power, melee damage, carrying capacity'
		case 'Agility':
			return 'Agility: Speed, reflexes, ranged accuracy, dodging'
		case 'Spirit':
			return 'Spirit: Willpower, perception, mystic magic, initiative'
		case 'Mind':
			return 'Mind: Intelligence, knowledge, arcane magic, tactics'
		default:
			return label
	}
}

// Get attribute abbreviation
export const getAttributeAbbr = (label: string) => {
	switch (label) {
		case 'Strength':
			return 'STR'
		case 'Agility':
			return 'AGI'
		case 'Spirit':
			return 'SPI'
		case 'Mind':
			return 'MND'
		default:
			return label.substring(0, 3).toUpperCase()
	}
}

export const AttributeCard: React.FC<AttributeCardProps> = ({
	attribute,
	label,
	sigil,
	updateAttribute,
	totalWounds,
	color,
}) => {
	const handleWoundChange = () => {
		if (!attribute.wounded) {
			// Adding a wound
			if (totalWounds >= 3) return // Max 3 wounds
			updateAttribute({ wounded: true })
		} else {
			// Removing a wound
			updateAttribute({ wounded: false })
		}
	}

	const abbr = getAttributeAbbr(label)
	const isWounded = attribute.wounded
	return (
		<SheetField
			label={abbr}
			sigil={sigil}
			tone={color}
			// M9 S6: a column inside the attribute plate, which supplies the single
			// frame for all four. A wounded attribute still draws its own red keyline
			// (borderColor), since that is state rather than decoration.
			weight="column"
			editLabel={`Change ${label} die`}
			minWidth="3.5rem"
			maxWidth="5rem"
			info={`${getAttributeDescription(label)} — Wound: ${getWoundTooltip(label)}`}
			infoLabel={`About ${label}`}
			sx={{ flex: '1 1 auto' }}
			borderColor={isWounded ? 'error.main' : undefined}
			editorWidth="6rem"
			// M9 S11: the die chooser is now SheetField's own popover rather than a
			// MUI `Select` rendered as the value. The Select looked identical but
			// behaved differently from every other stat card — it owned its own open
			// state, so a click outside could close it and immediately re-open it via
			// the card's trigger, and it was the one editor on the sheet that did not
			// dismiss like the rest. One popover implementation, one behaviour.
			editor={(close) => (
				<MenuList sx={{ p: 0 }}>
					{attributeTypeArray.map((at) => (
						<MenuItem
							key={at}
							selected={at === attribute.value}
							onClick={() => {
								updateAttribute({ value: at as AttributeType })
								close()
							}}
							sx={{ fontSize: 'var(--nexus-text-xs)', justifyContent: 'center' }}
						>
							{/* M13 S1 (D2): text alone. The menu used to render the token AND
								    the `dX` label, stating one value twice in one row. Text won
								    here because a menu is a list of choices read once at
								    level-up, where an unambiguous label beats a shape ladder.
								    The ladder's job is the at-a-glance comparison across the
								    four cards, which is where the token stays (see below). */}
								d{at}
						</MenuItem>
					))}
				</MenuList>
			)}
			footer={
				// The vessel of life, intact, then split: the same jar the HP card
				// carries, cracked through once the attribute is wounded.
				<SigilPip
					sigil="wound"
					emptySigil="hp"
					tone="error.main"
					size="0.8rem"
					filled={attribute.wounded}
					disabled={!attribute.wounded && totalWounds >= 3}
					onToggle={handleWoundChange}
					label={`${label} wound`}
					sx={{ p: 0, mt: 0 }}
				/>
			}
		>
			{/* The die token IS the read state: the polygon's side count encodes the
			    die size, so a glance across four columns reads the spread in a way
			    four same-face numerals cannot. */}
			<DieToken value={`d${attribute.value}`} className="cs-die-token" />
		</SheetField>
	)
}
