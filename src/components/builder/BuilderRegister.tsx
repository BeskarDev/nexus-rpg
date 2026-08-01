import React from 'react'

export interface BuilderRegisterProps {
	/** The step's numeral — `I`, `II`, `III`. A codex numbers its courses. */
	step: string
	/** What is being decided. */
	label: string
	/** What the decision costs or means, in a quieter register beside the label. */
	note?: React.ReactNode
	children: React.ReactNode
	/**
	 * True for the one register holding an unbounded list, which takes whatever
	 * height the others leave and scrolls inside itself above the breakpoint.
	 */
	grow?: boolean
	/**
	 * Why this decision cannot be made yet — shown in place of the controls.
	 *
	 * A locked register is SHOWN rather than hidden, for the same reason the size
	 * rail shows the sizes a tier cannot reach: a dependency you can see is a rule
	 * you learn, where a register that appears only once it is satisfied just looks
	 * like the dialog growing.
	 */
	locked?: React.ReactNode
	/**
	 * What has been chosen, shown in place of the controls when the register is
	 * closed.
	 *
	 * Only used by builders with several long lists. The Companion Builder has one
	 * unbounded list and simply lets it grow; the Magic Item Builder has three, and
	 * they cannot all be open at once without the column becoming a stack of
	 * scrollbars. A settled register collapses to its answer, which is the
	 * expanded-row pattern applied to a decision: the row states the fact, and opens
	 * to change it.
	 */
	summary?: React.ReactNode
	/** Whether the controls are showing. Omit for a register that never collapses. */
	open?: boolean
	/** Reopen this register. Given only when it can be collapsed. */
	onOpen?: () => void
}

/**
 * One decision, in its own carved panel (M13 S8).
 *
 * Three underlined captions over three sets of hairline boxes was the first
 * attempt, and it gave no sense of where a decision started or which parts of it
 * could be pressed. A register is a bounded panel now — a wash and a hairline of
 * its own, with the caption riding ON its top edge as an inlaid nameplate rather
 * than floating above it.
 *
 * Note the panel's keyline is a hairline at `--cb-line` while a control's is 1.5px
 * at `--cb-line-strong`, and the panel sits on a wash while a control sits on the
 * page surface. That is what keeps "a keyline means you can press it" true even
 * though the container has one too.
 */
export const BuilderRegister: React.FC<BuilderRegisterProps> = ({
	step,
	label,
	note,
	children,
	grow,
	locked,
	summary,
	open = true,
	onOpen,
}) => {
	const collapsed = !open && !locked
	return (
		<div
			className={`cb-register${grow && open ? ' cb-register--grow' : ''}${
				collapsed ? ' cb-register--closed' : ''
			}`}
		>
			<p className="cb-register__caption">
				<span className="cb-register__step">{step}</span>
				{label}
				{note && !collapsed && (
					<span className="cb-register__note">{note}</span>
				)}
			</p>
			{locked ? (
				<p className="cb-locked">{locked}</p>
			) : collapsed ? (
				/* The settled answer, and the way back to change it. A real button:
					reopening is a press, and it must be reachable from the keyboard. */
				<button type="button" className="cb-register__summary" onClick={onOpen}>
					<span className="cb-register__answer">{summary}</span>
					<span className="cb-register__change">Change</span>
				</button>
			) : (
				children
			)}
		</div>
	)
}

export interface GrantLineProps {
	/** Label/value pairs, read straight off the rulebook's own table. */
	pairs: [string, React.ReactNode][]
}

/**
 * What the choice above actually buys — the rulebook's table, one column at a time.
 *
 * A READOUT, so no keyline: a flat wash with an engraved hairline seating it under
 * its rail. It carried a full keyline in the first pass and was indistinguishable
 * from the plates above it.
 */
export const GrantLine: React.FC<GrantLineProps> = ({ pairs }) => (
	<div className="cb-grant">
		{pairs.map(([label, value]) => (
			<span className="cb-grant__pair" key={label}>
				<span className="cb-grant__label">{label}</span>
				<span className="cb-grant__value">{value}</span>
			</span>
		))}
	</div>
)
