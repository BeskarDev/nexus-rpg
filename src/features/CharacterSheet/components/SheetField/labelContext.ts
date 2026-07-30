import React from 'react'

/**
 * The enclosing field's label, published to whatever renders its value.
 *
 * Exists so a value component can derive its accessible name and placeholder
 * without the label being passed twice. The Personal tab's inputs had no
 * accessible name at all before this — `CardHeader` renders a visual label, not
 * an associated one, so every free-text field on the sheet announced as an
 * unlabelled text box. Deriving it from the label the field already has makes
 * that unreachable by forgetting a prop, the same way `SheetField` derives
 * `editLabel` and `infoLabel`.
 */
export const SheetFieldLabelContext = React.createContext<string | undefined>(
	undefined,
)

export const useSheetFieldLabel = () => React.useContext(SheetFieldLabelContext)
