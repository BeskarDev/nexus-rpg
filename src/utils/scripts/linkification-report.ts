/**
 * Linkification report — the ongoing safety net for the auto-keyword and
 * table-chips remark plugins.
 *
 * Runs both plugins over every doc and reports exactly what they convert, so a
 * reviewer can eyeball false positives from a diffable text artifact instead of
 * rendering the whole site. Anomalies (a flavor word linked dozens of times, a
 * term converting where it should not) stand out immediately.
 *
 * Usage:
 *   bun run report:links                 # summary, whole docs tree
 *   bun run report:links -- <substr>...  # only files whose path contains a substr
 *   bun run report:links -- --terms fire,light   # only these converted terms
 *
 * See docs/analysis/keyword-chip-detection-plan.md (Phase 5).
 */

import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import { visit } from 'unist-util-visit'
import fs from 'fs'
import path from 'path'
import glob from 'fast-glob'
import autoKeywordPlugin from '../../remark/auto-keyword-plugin'
import tableChipsPlugin from '../../remark/table-chips-plugin'

const ROOT = path.resolve(__dirname, '../../..')
const DOCS = path.join(ROOT, 'docs')

type Conv = { term: string; kind: 'link' | 'chip' }

function conversionsFor(plugin: any, md: string, filePath: string): Conv[] {
	const tree = remark().use(remarkGfm).parse(md)
	plugin()(tree, { path: filePath })
	const out: Conv[] = []
	visit(tree, 'link', (n: any) => {
		const style = n.data?.hProperties?.style
		const cls = n.data?.hProperties?.className
		const text = (n.children || []).map((c: any) => c.value || '').join('')
		if (cls?.includes('chip')) out.push({ term: text, kind: 'chip' })
		else if (typeof style === 'string' && style.includes('small-caps'))
			out.push({ term: text, kind: 'link' }) // plugin link (not author link)
	})
	return out
}

function main() {
	const argv = process.argv.slice(2)
	let termFilter: Set<string> | null = null
	const pathSubstrings: string[] = []
	for (let i = 0; i < argv.length; i++) {
		if (argv[i] === '--terms') termFilter = new Set(argv[++i].split(','))
		else pathSubstrings.push(argv[i])
	}

	let files = glob.sync('**/*.{md,mdx}', { cwd: DOCS, absolute: true })
	if (pathSubstrings.length)
		files = files.filter((f) => pathSubstrings.some((s) => f.includes(s)))

	// key: "relPath\tkind:term" -> count
	const tally = new Map<string, number>()
	let totalConversions = 0
	for (const abs of files) {
		const md = fs.readFileSync(abs, 'utf8')
		const rel = abs.replace(ROOT + '/', '')
		for (const plugin of [autoKeywordPlugin, tableChipsPlugin]) {
			for (const c of conversionsFor(plugin, md, rel)) {
				if (termFilter && !termFilter.has(c.term)) continue
				totalConversions++
				const key = `${rel}\t${c.kind}:${c.term}`
				tally.set(key, (tally.get(key) || 0) + 1)
			}
		}
	}

	const rows = [...tally.entries()].sort()
	let lastFile = ''
	for (const [key, n] of rows) {
		const [rel, conv] = key.split('\t')
		if (rel !== lastFile) {
			process.stdout.write(`\n${rel}\n`)
			lastFile = rel
		}
		process.stdout.write(`  ${String(n).padStart(3)}x  ${conv}\n`)
	}
	process.stdout.write(
		`\n${totalConversions} conversions, ${rows.length} distinct (file,kind,term), ${files.length} files\n`,
	)
}

main()
