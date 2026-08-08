import React from 'react'

export type DocTableProps = React.ComponentPropsWithoutRef<'table'>

/**
 * Every markdown table, wrapped in its carved stone slab (M8 S3). Registered as
 * the global `table` element mapping, so tables get the treatment with no
 * per-page work.
 *
 * A component is needed rather than pure CSS because Infima renders tables as
 * `display: block; overflow: auto` — the table's own box then spans the full
 * column while its ROWS are only as wide as their content, so a frame drawn on
 * the table element floats detached from the rows it is supposed to hold. The
 * wrapper takes over the scroll container and the frame; the table inside goes
 * back to a real `display: table` at full width, so frame and rows agree.
 *
 * Props are passed straight through, so `thead` / `tbody` stay ordinary
 * intrinsics — `RollableTable`, which inspects them by element type, is
 * unaffected.
 */
export default function DocTable({ children, ...rest }: DocTableProps) {
	return (
		<div className="codex-table-slab">
			<table {...rest}>{children}</table>
		</div>
	)
}
