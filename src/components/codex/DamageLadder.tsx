import React from 'react'
import styles from './DamageLadder.module.css'

export interface DamageLadderProps {
	/** The weak/strong/critical damage triple, as written: `"6/9/12"`. */
	values: string
	/**
	 * The damage TYPE, as children so a markdown chip survives.
	 *
	 * In the docs this is the type's name, which the chips plugin turns into a
	 * damage chip. The character sheet passes a `DamageSigil` instead — same slot,
	 * because in both cases it is the mark that says what KIND of damage the three
	 * numbers are. Omitted entirely for plain untyped damage.
	 */
	children?: React.ReactNode
}

const LEVELS = ['Weak', 'Strong', 'Critical']

/**
 * An attack's damage triple, split into its three success levels — INLINE.
 *
 * `6/9/12 damage` is one of the densest notations in the game: three numbers
 * keyed to weak / strong / critical, written as a slash-run that has to be
 * decoded every time. 265 of the 317 published attacks open with one.
 *
 * A first version stacked a full-width label under each number. It parsed well
 * but cost a line of height per attack and pushed the following sentence off the
 * text baseline, so a list of attacks no longer aligned. This version keeps the
 * whole thing on the text line: each number carries a single small-caps initial
 * (W/S/C) as a suffix, with escalating weight across the three. The full level
 * name goes to screen readers and to the title, so nothing is lost.
 *
 * The trailing word "damage" is dropped: the three success-level ticks already
 * say that these numbers are damage, so repeating it on every attack was pure
 * redundancy.
 *
 * Attacks whose text does not open with a clean triple keep their prose untouched
 * — the generator only emits this when it can split the value with certainty.
 *
 * ## Why it is its own module (M13 S4d)
 *
 * It was defined inside `CreatureStatBlock.tsx` and styled from that card's CSS
 * module, because the stat block was the only consumer. The character sheet's
 * weapon rows show the same notation and were rendering it as plain `6/9/12`
 * text, so the app had two treatments for one notation — the player's own weapon
 * read as a slash-run while a creature's attack was graded. It moved out here
 * rather than being copied, and `CreatureStatBlock` re-exports it so the docs
 * imports and the MDX registration are untouched.
 */
export function DamageLadder({ values, children }: DamageLadderProps) {
	const cells = values.split('/')
	/**
	 * One number means STATIC damage: the same value at every success level.
	 *
	 * It gets no tick and the middle cell's neutral ink (S4d, owner review). A lone
	 * `6ᵂ` claimed the number was the WEAK reading of a ladder that does not exist,
	 * which is the opposite of what static means — and the escalating ink only says
	 * something when there are three values to escalate across.
	 */
	const isStatic = cells.length === 1
	return (
		<span
			className={styles.ladder}
			title={
				isStatic
					? `${values} damage at every success level`
					: `${values} damage (weak / strong / critical)`
			}
		>
			{cells.map((cell, i) => (
				<React.Fragment key={i}>
					{i > 0 && <span className={styles.ladderSlash}>/</span>}
					<span className={styles[isStatic ? 'ladderCell1' : `ladderCell${i}`]}>
						{cell}
						{!isStatic && (
							<span className={styles.ladderTick}>
								{(LEVELS[i] ?? '').charAt(0)}
							</span>
						)}
					</span>
				</React.Fragment>
			))}
			{children && <span className={styles.ladderKind}> {children}</span>}
			<span className={styles.srOnly}>
				{isStatic
					? ` damage (${cells[0]} at every success level)`
					: ` damage (${cells.map((c, i) => `${LEVELS[i]} ${c}`).join(', ')})`}
			</span>
		</span>
	)
}

export default DamageLadder
