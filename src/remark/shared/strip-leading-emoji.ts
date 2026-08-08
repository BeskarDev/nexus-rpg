// A run of leading decorative symbols plus any trailing space. Each token is
// either a keycap sequence (#️⃣, 1️⃣ — a digit/#/* followed by the enclosing
// keycap mark) or a pictographic/symbol char, optionally with variation
// selectors, ZWJ, and skin-tone modifiers so full emoji sequences (🧝‍♀️, 🛡️)
// are removed cleanly. Extended_Pictographic covers most emoji and ⚔ ⚙ ⏳ ✅ ❌;
// the extra ranges add gender signs (♀ ♂), stars/arrows (⭐ ➡), and the odd
// Indic section marks (e.g. 𑗊 U+115CA Siddham) used as decorative dividers.
// Plain leading digits are NOT stripped (keycap needs the trailing U+20E3), so
// "3.1 Present" is preserved.
// The Indic-mark range (U+11000–U+116FF) spans blocks that also contain
// combining marks, which trips no-misleading-character-class. That is
// intentional here: these leading heading glyphs are stripped as whole
// decorative marks, never composed, and the behaviour is covered by tests.
// prettier-ignore
// eslint-disable-next-line no-misleading-character-class
export const LEADING_EMOJI = /^(?:(?:[#*0-9]️?⃣|[\p{Extended_Pictographic}\u{2B00}-\u{2BFF}\u{11000}-\u{116FF}♀♂])(?:️|‍|\u{1F3FB}|\u{1F3FC}|\u{1F3FD}|\u{1F3FE}|\u{1F3FF})*\s*)+/u

/** Remove a leading emoji / decorative-symbol run from a string. */
export function stripLeadingEmoji(value: string): string {
	return value.replace(LEADING_EMOJI, '')
}
