import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
	BuilderShell,
	BuilderTrigger,
	BuilderVerb,
	BuilderVerbSpacer,
} from '../builder'
import { creatureBuilderActions } from '../../features/CreatureBuilder/creatureBuilderReducer'
import { useCreatureBuilderState } from '../../hooks/useCreatureBuilderState'
import { generateCreatureMarkdown } from '../../utils/typescript/creature/creatureBuilderFormatting'
import { validateTier } from '../../utils/typescript/creature/creatureBuilderCalculations'
import { CreatureCommission } from './CreatureCommission'
import { CreatureTraits } from './CreatureTraits'
import { CreaturePlate } from './CreaturePlate'

/**
 * The Creature Builder, as a commission (M15 S1).
 *
 * ## What it was
 *
 * An MUI `Dialog` holding a `Grid` of form controls, a tab bar, an "Advanced"
 * toggle hiding four accordions, and a hand-rolled `<table>` preview. 23 form
 * controls and 8 papers in one view, which is the form-of-boxes the theme's first
 * rule names.
 *
 * ## What it is
 *
 * The frame the Companion Builder and the Magic Item Builder already share
 * (`BuilderShell`), on the owner's instruction to start from the Companion
 * Builder — with the caveat they attached to it: **this one is more complex.**
 * That complexity is real and it lands in the courses, not the frame. The
 * Companion Builder makes three choices; this makes six before its lists open.
 *
 * ## What the commission line says
 *
 * The shell's one piece of always-visible feedback, which on a phone is the only
 * thing surviving the pane split. So it carries the builder's own judgement:
 * either the creature named as it stands, or the tier validation's first
 * complaint. That is where the warning lives now, rather than in the preview —
 * a card is a record, and a record does not scold (D3).
 */
export const CreatureBuilder: React.FC = () => {
	const [open, setOpen] = useState(false)
	const [showSource, setShowSource] = useState(false)
	const [copied, setCopied] = useState(false)
	const dispatch = useDispatch()
	const { state, builtCreature } = useCreatureBuilderState()

	const markdown = builtCreature ? generateCreatureMarkdown(builtCreature) : ''

	const validation = builtCreature
		? validateTier(
				builtCreature.tier,
				typeof builtCreature.hp === 'number'
					? builtCreature.hp
					: Number(String(builtCreature.hp).split('×').pop()),
				Number(String(builtCreature.av).replace(/[^0-9]/g, '')) || 0,
				builtCreature.parry,
				builtCreature.dodge,
				builtCreature.resist,
				builtCreature.armorType,
			)
		: null

	const commission = (() => {
		if (!builtCreature) return 'Pick a tier to begin.'
		if (validation && !validation.valid && validation.warnings.length > 0) {
			return validation.warnings[0]
		}
		const named = state.name || 'An unnamed creature'
		return `${named}: tier ${builtCreature.tier} ${builtCreature.category.toLowerCase()}, ${builtCreature.size.toLowerCase()} ${builtCreature.type.toLowerCase()}, ${state.archetype.toLowerCase()}.`
	})()

	const copySource = async () => {
		await navigator.clipboard?.writeText(markdown)
		setCopied(true)
		setTimeout(() => setCopied(false), 1800)
	}

	return (
		<>
			<BuilderTrigger onClick={() => setOpen(true)}>
				Build Creature
			</BuilderTrigger>

			<BuilderShell
				open={open}
				onClose={() => setOpen(false)}
				title="Creature Builder"
				commission={commission}
				paneLabels={{ build: 'Build', result: 'Creature' }}
				result={
					<>
						<CreaturePlate creature={builtCreature} />

						<div className="cb-source">
							<button
								type="button"
								className="cb-source__toggle"
								aria-expanded={showSource}
								aria-controls="creature-source-body"
								disabled={!builtCreature}
								onClick={() => setShowSource(!showSource)}
							>
								{showSource ? '▾' : '▸'} Markdown source
							</button>
							<pre
								id="creature-source-body"
								className="cb-source__body"
								hidden={!showSource || !builtCreature}
							>
								{markdown}
							</pre>
						</div>
					</>
				}
				actions={
					<>
						<BuilderVerb
							onClick={() => dispatch(creatureBuilderActions.resetBuilder())}
						>
							Reset
						</BuilderVerb>
						<BuilderVerbSpacer />
						{copied && (
							<span className="cb-flash" role="status">
								Copied
							</span>
						)}
						<BuilderVerb
							tone="primary"
							disabled={!builtCreature}
							onClick={copySource}
						>
							Copy markdown
						</BuilderVerb>
						<BuilderVerb onClick={() => setOpen(false)}>Close</BuilderVerb>
					</>
				}
			>
				<CreatureCommission />
				<CreatureTraits />
			</BuilderShell>
		</>
	)
}
