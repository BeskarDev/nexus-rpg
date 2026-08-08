import React, { useState } from 'react'
import { Button, Dialog } from '@mui/material'
import './codexBuilder.css'

export interface BuilderShellProps {
	open: boolean
	onClose: () => void
	/** The tool's name, in the dialog's title register. */
	title: string
	/**
	 * The commission as a sentence — what has been asked for so far, or the one
	 * thing still missing. It is the only feedback that survives the mobile pane
	 * split, so it must always say something.
	 */
	commission: React.ReactNode
	/** The choices. Scrolls on its own above the breakpoint. */
	children: React.ReactNode
	/** The thing being produced. Scrolls on its own. */
	result: React.ReactNode
	/** The verbs, in the action bar. */
	actions: React.ReactNode
	/** Labels for the two mobile panes. */
	paneLabels?: { build: string; result: string }
	maxWidth?: 'md' | 'lg' | 'xl'
}

/**
 * The frame every builder dialog shares (M13 S8).
 *
 * ## What it is
 *
 * A fixed frame holding a head, two columns, and an action bar — the composition
 * settled on the Companion Builder and lifted here when the Magic Item Builder
 * became the second consumer. The left column is the **commission** (the choices),
 * the right is the **result** (the thing being produced, live).
 *
 * ## Scrolling, which is the part that took three passes
 *
 * There is **no body scrollbar at any width**. The paper owns its height with the
 * head and action bar as fixed courses, and the scrolling happens as deep inside
 * the frame as it can — each column scrolls on its own, so browsing a long list
 * cannot scroll the result away and a long result cannot scroll the choices away.
 *
 * Below 900px the columns cannot sit side by side, so they become two PANES behind
 * a tab rail rather than a stack. Stacking costs the thing the layout exists for —
 * you change a choice and watch the result answer — because the result ends up a
 * screen below the control that changes it. What survives the split is the
 * commission line in the head, visible from both panes.
 *
 * Which pane is hidden is decided in CSS off `data-pane`, not here, so a piece of
 * state that only means something on a phone cannot break the desktop layout.
 */
export const BuilderShell: React.FC<BuilderShellProps> = ({
	open,
	onClose,
	title,
	commission,
	children,
	result,
	actions,
	paneLabels = { build: 'Build', result: 'Preview' },
	maxWidth = 'lg',
}) => {
	const [pane, setPane] = useState<'build' | 'preview'>('build')

	return (
		<Dialog
			open={open}
			onClose={onClose}
			maxWidth={maxWidth}
			fullWidth
			PaperProps={{ className: 'codex-builder' }}
		>
			<div className="cb-head">
				<h3 className="cb-head__title">{title}</h3>
				<span className="cb-head__line">{commission}</span>
			</div>

			<div className="cb-body" data-pane={pane}>
				{/* `tablist` markup at every width; the rail is simply not displayed
					above the breakpoint, where both panes are on screen and there is
					nothing to switch. */}
				<div className="cb-panes" role="tablist" aria-label="Builder view">
					{(
						[
							['build', paneLabels.build],
							['preview', paneLabels.result],
						] as const
					).map(([value, label]) => (
						<button
							key={value}
							type="button"
							role="tab"
							className="cb-pane-tab"
							aria-selected={pane === value}
							aria-controls={`cb-pane-${value}`}
							onClick={() => setPane(value)}
						>
							{label}
						</button>
					))}
				</div>

				<div
					className="cb-commission"
					id="cb-pane-build"
					role="tabpanel"
					aria-label={paneLabels.build}
				>
					{children}
				</div>

				<div
					className="cb-result"
					id="cb-pane-preview"
					role="tabpanel"
					aria-label={paneLabels.result}
				>
					{result}
				</div>
			</div>

			<div className="cb-actions">{actions}</div>
		</Dialog>
	)
}

export interface BuilderTriggerProps {
	onClick: () => void
	children: React.ReactNode
}

/**
 * The command that opens a builder — a plate, not a Material outlined button.
 *
 * On the SHEET this mostly loses to `.cs-section-actions .MuiButton-root`, which is
 * a three-class selector, and that is intended: it puts the trigger in the same
 * stamped plate as the marks beside it. That rule matches nothing on a docs page,
 * so the plate defined here is what a docs page gets.
 */
export const BuilderTrigger: React.FC<BuilderTriggerProps> = ({
	onClick,
	children,
}) => (
	<Button className="cb-trigger" onClick={onClick}>
		{children}
	</Button>
)

export interface BuilderVerbProps {
	onClick: () => void
	children: React.ReactNode
	/** `primary` is the one verb the dialog exists to perform. */
	tone?: 'quiet' | 'primary'
	disabled?: boolean
}

export const BuilderVerb: React.FC<BuilderVerbProps> = ({
	onClick,
	children,
	tone = 'quiet',
	disabled,
}) => (
	<Button className={`cb-verb--${tone}`} onClick={onClick} disabled={disabled}>
		{children}
	</Button>
)

/** Pushes the verbs after it to the right of the action bar. */
export const BuilderVerbSpacer: React.FC = () => (
	<span className="cb-actions__spacer" />
)
