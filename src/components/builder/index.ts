/**
 * The codex builder shell (M13 S8).
 *
 * The chrome two builder dialogs share — the Companion Builder and the Magic Item
 * Builder. Both are the same kind of tool (a few dependent choices, and the thing
 * they produce shown live beside them) mounting in the same two places (the
 * character sheet, and a docs page).
 *
 * It was written for the first of them and lifted here when the second arrived,
 * rather than copied: the milestone already records what copy-then-diverge costs in
 * the two meta bands that drifted apart in S4d.
 *
 * `codexBuilder.css` carries the whole look and explains the two rules that hold it
 * together — a keyline means you can press it, and everything is flat.
 */
export {
	BuilderShell,
	BuilderTrigger,
	BuilderVerb,
	BuilderVerbSpacer,
} from './BuilderShell'
export type { BuilderShellProps, BuilderVerbProps } from './BuilderShell'
export { BuilderRegister, GrantLine } from './BuilderRegister'
export type { BuilderRegisterProps, GrantLineProps } from './BuilderRegister'
export {
	SearchField,
	FilterChip,
	Ledger,
	LedgerRow,
	LedgerEmpty,
} from './BuilderLedger'
export type {
	SearchFieldProps,
	FilterChipProps,
	LedgerProps,
	LedgerRowProps,
	LedgerEmptyProps,
} from './BuilderLedger'
export { ChoiceRail } from './ChoiceRail'
export type { ChoiceRailProps, RailOption } from './ChoiceRail'
