import { useEffect, useState } from 'react'

export interface FieldDraft<T> {
	/** The live draft — bind this to the input, not the store value. */
	value: T
	/** Updates the draft only. No dispatch, so typing does not re-render the tree. */
	onChange: (next: T) => void
	/** Commits the draft to the store, if it actually changed. */
	onBlur: () => void
}

/**
 * The sheet's edit-locally, commit-on-blur convention, supplied rather than
 * merely documented (M9 S11).
 *
 * The root CLAUDE.md names this convention — "local-state + `onBlur` dispatch
 * pattern for text fields (avoids dispatch-per-keystroke)" — but nothing shipped
 * it, so five components hand-rolled the same three parts: a `useState` seeded
 * from the prop, a `useEffect` re-seeding it when the prop changes externally
 * (character switch, an import, a migration), and a blur handler that dispatches.
 *
 * ## One deliberate behaviour change
 *
 * Every hand-rolled copy committed **unconditionally** on blur, so merely tabbing
 * through the Items tab dispatched `updateCharacter` per field, set
 * `unsavedChanges`, and woke the autosave loop into a Firestore write — for edits
 * nobody made. This commits only when the draft differs from the store value.
 * Called out rather than slipped in, because PR H is otherwise behaviour-
 * preserving and this is the one place it is not.
 */
export function useFieldDraft<T>(
	value: T,
	commit: (next: T) => void,
): FieldDraft<T> {
	const [draft, setDraft] = useState<T>(value)

	// Re-seed when the value changes underneath us. Guarded so an in-flight edit
	// is not clobbered by the echo of its own commit.
	useEffect(() => {
		setDraft(value)
	}, [value])

	return {
		value: draft,
		onChange: setDraft,
		onBlur: () => {
			if (draft !== value) commit(draft)
		},
	}
}
