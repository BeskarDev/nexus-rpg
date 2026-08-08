/**
 * Every Material icon the character sheet still renders, and why it is still here
 * (M13 S9).
 *
 * ## The rule this encodes
 *
 * The sigil set depicts **objects** — a hearth, a khopesh, a pack. That law is
 * what makes the marks readable as one carved vocabulary, and it is also why the
 * set has no honest mark for *search*, *save*, *reorder* or *delete*: those are
 * VERBS, acts a reader performs on the sheet rather than things the world
 * contains. `Chevron`, `CheckMark`, `MarkButton` and `ActionMark` were all drawn
 * outside the set for exactly this reason.
 *
 * So the sheet's icon vocabulary is two registers, and the split is the decision:
 *
 * | Register | Depicts | Drawn as |
 * |---|---|---|
 * | Sigils (`StatSigil`, `SigilIcon`) | things the game contains | the carved set |
 * | Material icons | acts the reader performs on the app | Material's set |
 *
 * A verb icon in Material's own hand is honest — it is app furniture and it is
 * dressed as app furniture, sitting in a control strip that already reads as
 * chrome. A carved sigil pressed into service as "save" would be the opposite:
 * the reading vocabulary lying about what it is.
 *
 * ## What this file is FOR
 *
 * M9 logged three icons in a docblock and M13 found five more that nobody had
 * logged. Prose in a component cannot be checked. Every entry here is asserted
 * against the actual imports by `__tests__/materialIcons.test.ts`, which fails on
 * an icon that is used and not listed **and** on an entry that is listed and no
 * longer used — so the ledger cannot rot in either direction.
 *
 * **Adding an icon means adding a line here with a reason.** If the reason is
 * "this depicts a thing in the game", it is a sigil and it does not belong in
 * Material's register at all.
 */
export type MaterialIconEntry = {
	/** The act it stands for, in the reader's terms. */
	verb: string
	/** Why no sigil replaces it. */
	why: string
}

export const MATERIAL_ICON_LEDGER: Record<string, MaterialIconEntry> = {
	// ---- Navigation and file handling: the app frame, not the game ----
	/*
		`ArrowBackIosNew` is GONE (M13 S13), and the ledger's stale-entry check is
		what noticed. The masthead's way back is a worded plate now — a caret and
		the word "Characters" — because a bare `<` is the browser's own back button
		drawn a second time and it does not say where back goes.
	*/
	Save: {
		verb: 'save now',
		why: 'A verb about the document, not the character. The sheet also autosaves; this is the manual push.',
	},
	Upload: {
		verb: 'import a character file',
		why: 'File handling. Nothing in a Bronze Age vocabulary depicts a JSON import.',
	},
	Download: {
		verb: 'export a character file',
		why: 'Same register as Upload, and the pair must match.',
	},
	Refresh: {
		verb: 'reload the party from the server',
		why: 'A network act. `Autorenew` next to it means something different on purpose (see below).',
	},
	ContentCopy: {
		verb: 'copy the invite code',
		why: 'Clipboard. A purely browser-level act.',
	},

	// ---- Acts on entries ----
	Delete: {
		verb: 'delete this entry',
		why: 'A verb, and the most pre-learned glyph in the app. It now opens a confirmation rather than deleting outright (see `DeleteButton`).',
	},
	Clear: {
		verb: 'clear every Quick Ref pick',
		why: 'A verb. Deliberately NOT the delete bin: this unpins, it destroys nothing.',
	},
	Search: {
		verb: 'open the rulebook search',
		why: 'A verb, and the one glyph every reader already knows. A carved lens would be slower to read for no gain.',
	},
	SwapVert: {
		verb: 'enter reorder mode',
		why: 'A verb about the LIST, not its contents. `DragMark` is the drawn mark for the handle that appears once the mode is on — the mode toggle and the handle are two different things.',
	},
	Autorenew: {
		verb: 'refresh this entry from the rulebook',
		why: 'A verb about content drift, distinct from `Refresh` (reload from the server) and it must stay distinct.',
	},
	Bookmark: {
		verb: 'pinned to Quick Ref',
		why: 'A verb-state pair with BookmarkBorder. A bookmark is an object, but the thing it marks here is an app list, not a game object.',
	},
	BookmarkBorder: {
		verb: 'not pinned to Quick Ref',
		why: 'The off half of the pair. The plate fill already carries the state; the outline keeps the two readable apart at 18px.',
	},

	// ---- The account panel, which the masthead opens (M13 S13) ----
	Person: {
		verb: 'the player name on file',
		why: 'A row marker in the account panel. The carved `figure` mark does this job on the user plate itself, where it is the only thing in a 28px square; in a menu row beside four other Material rows, mixing one carved mark in would be the register clash S9 forbids.',
	},
	Edit: {
		verb: 'change the player name',
		why: 'A verb, and the pencil is the most pre-learned one there is.',
	},
	Logout: {
		verb: 'end the session',
		why: 'A verb about the app, not the character. Danger ink on hover only: signing out is reversible with the password the reader already has.',
	},
	AdminPanelSettings: {
		verb: 'open the admin panel',
		why: 'App administration — as far from the game world as this app gets.',
	},
	Visibility: {
		verb: 'view the table as an admin',
		why: 'A verb about what the app shows, and it pairs with the switch beside it.',
	},

	// ---- Builders ----
	Build: {
		verb: 'open a builder',
		why: 'A tool for authoring content, which is an act on the app rather than a thing in the world.',
	},
	AutoFixHigh: {
		verb: 'open the magic item builder',
		why: 'Distinguishes the magic builder from the plain one beside it. Both are authoring tools.',
	},
	Warning: {
		verb: 'unsaved changes on the shared notes',
		why: 'A status glyph on a control. `--cs-warning` carries the tone; the mark carries the state for anyone not reading colour.',
	},

	// ---- The rest types (logged by M9, and the reasoning still holds) ----
	Fireplace: {
		verb: 'take a short break',
		why: 'These three depict SCENES, so two of them do have honest sigils (`hearth`, `moon`) — but "a night that went badly" has none, and drawing one mark to complete a set of three is an F7 spend plus a legibility pass. Two carved and one Material would be worse than three Material. Revisit as a trio or not at all.',
	},
	DarkMode: {
		verb: "take a night's rest",
		why: 'See Fireplace: the trio moves together.',
	},
	Thunderstorm: {
		verb: 'suffer a bad night',
		why: 'See Fireplace. This is the one with no honest sigil: `vortex` is spoken for by wild magic and `icicles` claims cold specifically, when the rule also covers hunger and interrupted sleep.',
	},

	// ---- Not an icon ----
	SvgIconComponent: {
		verb: '(a TYPE, not a mark)',
		why: 'The type of the three rest icons above, imported so their table can be typed. It renders nothing.',
	},
}
