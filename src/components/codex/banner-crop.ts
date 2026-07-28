/**
 * Where the 4:1 band sits inside a banner's native 1584 x 672 frame.
 *
 * Banners ship at their native 2.36:1 and are cropped to 4:1 by CSS
 * (`.img-banner` in `ImagePlate.module.css`), not baked at publish time. That
 * costs ~30MB across the set and buys two things: the crop stays adjustable
 * from this one file forever, and it does not depend on a gitignored staging
 * folder still existing.
 *
 * The alternative was tried first and rejected. Baking a centre-crop threw away
 * 41% of every render's height, and Register A asks for sky across 40-60% of the
 * frame, so the horizon sits near mid-height and a centred 4:1 window clips
 * whatever is tall: a ziggurat's top, a toppled column, foreground ground
 * detail. A prompt-side "central band" rule cannot absorb a 41% cut unaimed, so
 * the crop has to be a per-image decision.
 *
 * A value is a CSS `object-position`. Only the vertical half matters — the frame
 * is never cropped horizontally — so every entry reads `50% <n>%`, where 0%
 * keeps the top edge, 100% keeps the bottom edge, and 50% is dead centre.
 *
 * Keyed by BASENAME, not by path, so a file that moves does not lose its
 * framing. `bannerCrop()` is the only reader.
 */

/**
 * What a banner with no entry below gets: **66%, not centre.**
 *
 * Measured, not chosen. Of the 49 banners moved off centre in the M12 review, 46
 * went DOWN and only 3 up, landing at a median of 67 and a mean of 66.3. That is
 * a property of the register rather than of any one picture: sky takes the top
 * 40-60% of the frame, so the part worth keeping is the bottom ~59% — which is
 * exactly the size of a 4:1 slice of a 2.36:1 frame.
 *
 * So a new banner arriving with no entry starts where its neighbours ended up
 * instead of at a value the review showed to be wrong 94% of the time. It is
 * still a starting point: aim it and add an entry.
 */
export const DEFAULT_BANNER_CROP = '50% 66%'

/**
 * Every banner is listed, including the ones that sit at centre, because
 * `DEFAULT_BANNER_CROP` is 66% — an omission would silently move a reviewed
 * image rather than leave it alone. An entry here is a decision; the default is
 * only for files nobody has looked at yet.
 *
 * Values from the M12 framing review (2026-07-28), one pass over all 55 at
 * native height. Not derived from the prompts — several renders put the subject
 * somewhere the prompt did not ask for.
 */
export const BANNER_CROP: Record<string, string> = {
	// 01 basic rules
	'how-to-roll-banner.png': '50% 77%',
	'character-creation-banner.png': '50% 70%',
	'character-progression-banner.png': '50% 57%',
	'rulings-banner.png': '50% 91%',
	// 02 adventurers
	'folk-banner.png': '50% 71%',
	'languages-banner.png': '50% 64%',
	'upbringing-banner.png': '50% 76%',
	'background-banner.png': '50% 65%',
	'npc-relations-banner.png': '50% 79%',
	// 03 statistics
	'attributes-banner.png': '50% 67%',
	'hp-wounds-banner.png': '50% 63%',
	'defenses-banner.png': '50% 68%',
	'resolve-banner.png': '50% 52%',
	'skills-banner.png': '50% 67%',
	'talents-banner.png': '50% 62%',
	// 04 equipment
	'equipment-banner.png': '50% 85%',
	'items-banner.png': '50% 74%',
	'weapons-banner.png': '50% 70%',
	'armor-banner.png': '50% 54%',
	'weapon-armor-properties-banner.png': '50% 49%',
	'masterwork-exotic-weapons-banner.png': '50% 46%',
	'magic-items-banner.png': '50% 71%',
	'enchanting-banner.png': '50% 54%',
	'magic-effects-banner.png': '50% 50%',
	'curses-banner.png': '50% 50%',
	'magic-materials-banner.png': '50% 61%',
	// 05 combat
	'combat-scenes-banner.png': '50% 54%',
	'attacking-banner.png': '50% 64%',
	'distances-movement-banner.png': '50% 53%',
	'conditions-banner.png': '50% 69%',
	'combat-arts-banner.png': '50% 58%',
	// 06 scenes
	'scenes-banner.png': '50% 57%',
	'effect-duration-banner.png': '50% 50%',
	'resting-banner.png': '50% 73%',
	'crafting-banner.png': '50% 68%',
	'downtime-activities-banner.png': '50% 50%',
	'crafting-professions-banner.png': '50% 66%',
	'field-alchemy-banner.png': '50% 73%',
	'harvesting-parts-banner.png': '50% 62%',
	'challenges-banner.png': '50% 63%',
	'social-intrigue-banner.png': '50% 65%',
	'travel-banner.png': '50% 59%',
	// 07 magic
	'magic-banner.png': '50% 50%',
	'wild-surge-banner.png': '50% 76%',
	'mystic-penance-banner.png': '50% 82%',
	'arcane-spells-banner.png': '50% 69%',
	'mystic-spells-banner.png': '50% 76%',
	'metamagic-arts-banner.png': '50% 78%',
	'spell-properties-banner.png': '50% 61%',
	// 08 creatures
	'creature-rules-banner.png': '50% 71%',
	'creatures-banner.png': '50% 36%',
	'mounts-companions-banner.png': '50% 73%',
	'companion-traits-banner.png': '50% 87%',
	// 10 gm tools
	'gm-tools-banner.png': '50% 61%',

	// `home-banner.png` is deliberately absent. It is the homepage hero, not an
	// in-doc banner: it never routes through `MdxImage`, its box is 3:1 (2:1 on
	// narrow screens), and its `cropPosition` is passed at the call site in
	// `src/pages/index.tsx`. An entry here would be dead code.
}

/**
 * The `object-position` for a banner, from any `src` that ends in a filename.
 *
 * Accepts the full `src` rather than a basename because that is what the call
 * site has: an MDX `![banner-img](/img/banner/x.png)` and a webpack-hashed
 * import both arrive as a path, and hashing means the basename can be
 * `x.a1b2c3.png` in production. The extension and any hash are stripped, so the
 * key stays the authored filename in both.
 */
export function bannerCrop(src: string): string {
	const file = src.split('/').pop() ?? ''
	// `name.hash.png` in production, `name.png` in dev — take the leading
	// segment, which is the authored stem in both.
	const stem = file.split('.')[0]
	return BANNER_CROP[`${stem}.png`] ?? BANNER_CROP[stem] ?? DEFAULT_BANNER_CROP
}
