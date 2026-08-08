// `PersonalField` is gone (M13 S6, carried forward from M9): a thin `TextField` wrapper
// whose last consumers were the Personal tab's identity cards, which are now rows in a
// `RecordPlate`. `FieldText` is the field primitive it was standing in for.
export { NpcRelationshipsSection } from './NpcRelationshipsSection'
export { FolkSelectionDialog } from './FolkSelectionDialog'
export { UpbringingSelectionDialog } from './UpbringingSelectionDialog'
export { BackgroundSelectionDialog } from './BackgroundSelectionDialog'
export { ArchetypeSelectionDialog } from './ArchetypeSelectionDialog'
export { SingleSelectionDialog } from './SingleSelectionDialog'
// M13 S8 — the ledger dialog. It lived under `02_Items/SearchDialog/` and was
// imported by Skills, Spells and Items from three directions; it is a shared
// primitive now, which is also what let `SingleSelectionDialog` become an adapter
// over it rather than a second copy of its table.
export { SearchDialog } from './SearchDialog'
// M13 S8b — the one filter facet. Seven hand-built copies across four dialogs
// before this, which is why `displayEmpty` was missing from all of them.
export { FilterSelect } from './SearchDialog'
// M13 S8 — the one confirmation shape, for the four actions whose loss cannot be
// rebuilt from the rulebook. Everything else on the sheet deletes on the spot.
export { ConfirmDialog } from './ConfirmDialog'
export { QuickRefButton } from './QuickRefButton'
export { DeleteButton } from './DeleteButton'
export { UsesDisplay } from './UsesDisplay'
export { PipRow, SigilPip } from './PipRow'
export { GlossMark } from './GlossMark'
export { RuleInfo } from './RuleInfo'
export { SheetChip } from './SheetChip'
export { MarkButton } from './MarkButton'
export { Chevron } from './Chevron'
// M13 S6 — the reorder grip, drawn in the sheet's own shape language.
export { DragMark } from './DragMark'
// M13 S2 — the ledger primitives, exported alongside the M9 field library so a
// list tab reaches for a row the same way a stat card reaches for a field.
export {
	DynamicList,
	DynamicListItem,
	UnifiedListItem,
	reorder,
} from './DynamicList'
export { ListSection, ListSectionHeader } from './ListSection'
// M13 S4d — a menu of switches: the panel's structure and the row that is a
// toggle. Everything visual about them is in the MUI theme.
export { SheetMenu, ToggleMenuItem } from './SheetMenu'
// M13 S4b/S5 — the expanded-row details panel and its field registers. Moved here
// out of `02_Items/components/` when the Spells tab became the second consumer.
export {
	DetailsPanel,
	DetailsGroup,
	DetailField,
	Inscription,
} from './DetailsPanel'
// M13 S6 — a tab's opening plate: the carved frame, spent once per tab rather than
// once per field.
export { TabHeader } from './TabHeader'
// M13 S5 — the labelled either/or switch (`static`, `deals damage`).
export { ToggleMark } from './ToggleMark'
// M13 S4e — the sheet's tab bar: a rail of nameplates that knows when it overflows.
export { SheetTabBar } from './SheetTabBar'
// M13 S4d — the record plate: an entity's numeric facts as a ledger of marked
// rows, which is the shape every other numeric surface on the sheet already has.
export { RecordPlate, RecordRow } from './RecordPlate'
// M13 S8c — the general ledger read cell. Lifted out of `02_Items/` when
// Abilities became the third consumer; see its docblock for why S5's decision to
// keep a local twin was right then and wrong now.
export { ReadCell, SpacerCell, LEDGER_BREAKPOINT } from './LedgerCell'
// M13 S8b — a rulebook entry's prose with the structure its JSON carries: a
// talent's rank ladder, a spell's success tiers. Shares the docs generators'
// parsers, not their cards; see the component's docblock for why.
export {
	EntryProse,
	TalentLadder,
	entrySummary,
	talentRankSpan,
} from './EntryProse'
// M13 S4d — the meta band: a bounded line of facts about a tab or a section, at
// two ranks. Two tabs' worth of hand-built `Box` trees before this existed.
export {
	MetaBand,
	MetaBandField,
	MetaBandLabel,
	MetaBandValue,
	MetaBandNote,
	metaBandInputClass,
	metaBandInputSx,
} from './MetaBand'
export {
	SheetField,
	SheetInput,
	DerivedPart,
	FieldText,
	AdjustStepper,
	FieldGroupLabel,
	SHEET_FIELD_SIZE,
} from './SheetField'
export { CharacterSheetCard, CardHeader, CardContent } from './Card'

export type { FolkData } from './FolkSelectionDialog'
export type { UpbringingData } from './UpbringingSelectionDialog'
export type { BackgroundData } from './BackgroundSelectionDialog'
export type { ArchetypeData } from './ArchetypeSelectionDialog'
export type { SearchDialogColumn, SearchDialogProps } from './SearchDialog'
export type { ConfirmDialogProps } from './ConfirmDialog'
export type { QuickRefButtonProps } from './QuickRefButton'
export type { DeleteButtonProps } from './DeleteButton'
export type { UsesDisplayProps } from './UsesDisplay'
export type { PipRowProps, SigilPipProps } from './PipRow'
export type { GlossMarkProps } from './GlossMark'
export type { RuleInfoProps } from './RuleInfo'
export type { SheetChipProps, SheetChipVariant } from './SheetChip'
export type { MarkButtonProps, MarkButtonGlyph } from './MarkButton'
export type { ChevronProps } from './Chevron'
export type { UnifiedListItemProps } from './DynamicList'
export type { ListSectionProps, ListSectionHeaderProps } from './ListSection'
export type {
	SheetFieldProps,
	SheetInputProps,
	SheetFieldSize,
	DerivedPartProps,
	FieldTextProps,
	AdjustStepperProps,
	FieldGroupLabelProps,
} from './SheetField'
export type {
	CharacterSheetCardProps,
	CardHeaderProps,
	CardContentProps,
} from './Card'
