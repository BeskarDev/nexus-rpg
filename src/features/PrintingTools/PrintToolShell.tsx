import React, { useState } from 'react'
import './printToolStyles.css'

interface PrintToolShellProps {
	/** The tool's controls — source picker, selection, print verb */
	controls: React.ReactNode
	/** The print preview — cards, sheets, etc. */
	preview: React.ReactNode
	/** Label for the controls tab (mobile only) */
	controlsLabel?: string
	/** Label for the preview tab (mobile only) */
	previewLabel?: string
}

/**
 * Two-column shell for print tools (M16 S4).
 *
 * On desktop: controls sticky on the left, preview scrollable on the right.
 * On mobile: a tab strip switches between the two panes (the same pattern
 * the Creature Builder uses for its commission / preview split).
 *
 * The flow inside the controls panel follows D6: source → selection → count →
 * verb. Nothing should sit to the left of the verb — it commits the task.
 */
export const PrintToolShell: React.FC<PrintToolShellProps> = ({
	controls,
	preview,
	controlsLabel = 'Select',
	previewLabel = 'Preview',
}) => {
	const [activeTab, setActiveTab] = useState<'controls' | 'preview'>(
		'controls',
	)

	return (
		<div className="pt-shell">
			{/* Mobile tab strip (hidden on desktop by CSS) */}
			<div className="pt-tabs" role="tablist" aria-label="Print tool">
				<button
					type="button"
					role="tab"
					aria-selected={activeTab === 'controls'}
					className={`pt-tab${activeTab === 'controls' ? ' is-active' : ''}`}
					onClick={() => setActiveTab('controls')}
				>
					{controlsLabel}
				</button>
				<button
					type="button"
					role="tab"
					aria-selected={activeTab === 'preview'}
					className={`pt-tab${activeTab === 'preview' ? ' is-active' : ''}`}
					onClick={() => setActiveTab('preview')}
				>
					{previewLabel}
				</button>
			</div>

			<div
				className="pt-controls"
				style={activeTab !== 'controls' ? { display: 'none' } : undefined}
			>
				{controls}
			</div>

			<div
				className="pt-preview"
				style={activeTab !== 'preview' ? { display: 'none' } : undefined}
			>
				{preview}
			</div>
		</div>
	)
}
