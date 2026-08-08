import React from 'react'
import SigilIcon, { SigilName } from './SigilIcon'
import styles from './ToolIndex.module.css'

export interface ToolEntryProps {
	/** Where the tool lives. */
	href: string
	/** What it is called, in the reader's terms. */
	name: string
	/** The mark that names it, from the shared sigil set. */
	sigil?: SigilName
	/** One line saying what is inside. Never optional in practice. */
	children: React.ReactNode
}

/**
 * One ruled row of a section's contents page (M14 S3).
 *
 * The codex composition rule: a landing page opens on a CONTENTS page — ruled
 * rows, a mark, a name, and a line saying what is inside — not a grid of
 * equally-weighted tiles and not a naked bullet list. A list of ten labels tells
 * a newcomer nothing; the line beside each one is the whole point.
 */
export const ToolEntry: React.FC<ToolEntryProps> = ({
	href,
	name,
	sigil,
	children,
}) => (
	<li className={styles.entry}>
		<a className={styles.row} href={href}>
			<span className={styles.mark} aria-hidden="true">
				{sigil ? <SigilIcon name={sigil} size={16} /> : null}
			</span>
			<span className={styles.name}>{name}</span>
			<span className={styles.blurb}>{children}</span>
		</a>
	</li>
)

export interface ToolIndexProps {
	children: React.ReactNode
}

/**
 * A section's contents page.
 *
 * Built for the GM Tools landing page, which was three bullet lists of bare
 * links — two of them incomplete (six of nine random tables, four of five
 * printables), all of them headed by an emoji on a site that has a sigil set, and
 * closed by a paragraph in which the page offered to expand itself if the reader
 * would tell it what to add. That last line was a chatbot talking to a player.
 */
const ToolIndex: React.FC<ToolIndexProps> = ({ children }) => (
	<ul className={styles.index}>{children}</ul>
)

export default ToolIndex
