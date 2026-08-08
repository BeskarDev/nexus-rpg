import React, { useEffect, useState } from 'react'
import { TextField } from '@mui/material'
import { metaBandInputClass, metaBandInputSx } from '../../components'

interface PartyNameCardProps {
	partyName: string
	onSave: (newName: string) => Promise<void>
	loading?: boolean
}

/**
 * The party's name, as a band field (M13 S7).
 *
 * ## What it was
 *
 * A `CharacterSheetCard` with its own `party` sigil header and an explicit **edit mode**: a
 * pencil to enter it, then a `Save` and a `Cancel` — three Material icons and a mode, for
 * one line of text. Its own card, too, sitting inside a `Paper` inside the party panel.
 *
 * ## What it is
 *
 * The field itself, inside the party's meta band, committing on blur like every other text
 * field on this sheet. The band supplies the label and the mark, so this component is now
 * only the thing a card was wrapping: an input and the async write behind it.
 *
 * The local draft is what makes the blur-commit honest — the write is a network call, so the
 * field has to keep showing what you typed while it is in flight, and has to fall back to
 * the stored name if it fails.
 */
export const PartyNameCard: React.FC<PartyNameCardProps> = ({
	partyName,
	onSave,
	loading = false,
}) => {
	const [draft, setDraft] = useState(partyName)
	useEffect(() => setDraft(partyName), [partyName])

	const commit = async () => {
		const next = draft.trim()
		if (!next || next === partyName) {
			setDraft(partyName)
			return
		}
		try {
			await onSave(next)
		} catch {
			// The write failed and `PartyManagement` has already reported it; the field
			// falls back to what the party actually holds rather than showing a name that
			// was never saved.
			setDraft(partyName)
		}
	}

	return (
		<TextField
			className={metaBandInputClass.text}
			variant="standard"
			size="small"
			value={draft}
			disabled={loading}
			onChange={(event) => setDraft(event.target.value)}
			onBlur={commit}
			onKeyDown={(event) => {
				if (event.key === 'Enter') (event.target as HTMLInputElement).blur()
				if (event.key === 'Escape') setDraft(partyName)
			}}
			inputProps={{ 'aria-label': 'Party name' }}
			sx={{ ...metaBandInputSx, flex: '1 1 8rem', maxWidth: '16rem' }}
		/>
	)
}
