import { styled, TextField, TextFieldProps } from '@mui/material'

export type SheetInputProps = TextFieldProps

/**
 * The sheet's field input — the one text/number/select control every data field
 * in the tool is built from (M9 S11).
 *
 * ## What it is
 *
 * A `TextField` with centred content and a compact default width. That is the
 * whole of it, and it is deliberately thin: the codex look (small-caps labels,
 * the engraved baseline, the bronze focus keyline) already comes from the
 * `MuiInput` / `MuiOutlinedInput` / `MuiInputLabel` overrides PR C put in
 * `createTheme.ts`, so a wrapper that restyled anything here would be fighting
 * the theme rather than using it.
 *
 * ## Why it replaced `AttributeField`
 *
 * This shipped as `AttributeField`, declared in `CharacterSheet.tsx` next to the
 * tab shell. The name was wrong in the way the sigil law warns about — it is not
 * about attributes, and 42 of its 43 call sites were weapon uses, skill ranks,
 * spell ranges, item costs, damage values and calculator parts. A name that
 * describes one of its consumers makes every future use look like a misuse.
 *
 * Its defaults are carried over unchanged (`size: 'medium'`, centred input) so
 * promoting it is a rename, not a restyle. Call sites that want a different
 * width override `maxWidth` through `sx`, as they already did.
 *
 * ## Relationship to the rest of the family
 *
 * `SheetField` is the CARD — sigil, label, weight, editor popover.
 * `SheetInput` is the CONTROL inside a card, an editor popover, or a dense row.
 * {@link FieldText} and {@link DerivedPart} are the two presets of this control;
 * the row components in Items, Spells and Skills use it directly, because a
 * weapon row is a dense inline grid rather than a labelled card and wrapping it
 * in `SheetField` would be the wrong shape.
 */
export const SheetInput = styled(TextField)({
	maxWidth: '5rem',
})

SheetInput.defaultProps = {
	size: 'medium',
	inputProps: {
		sx: {
			textAlign: 'center',
		},
	},
}
