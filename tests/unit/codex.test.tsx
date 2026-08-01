import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'

// theme-classic ships JSX inside `.js`, which Vite's loader cannot parse, so the
// default `img` that `MdxImage` falls back to is stood in for here. The tests
// below therefore assert OUR routing decision — plate or no plate, and what
// reaches `alt` — never Docusaurus's own attributes, which are not ours to
// claim.
vi.mock('@theme/MDXComponents/Img', () => ({
	default: (props: React.ComponentProps<'img'>) => (
		<img data-testid="docusaurus-default-img" {...props} />
	),
}))
import {
	SigilIcon,
	RuneHeading,
	OrnamentDivider,
	MagicCallout,
	ChapterSigil,
	MdxImage,
	parseImageAlt,
	BANNER_CROP,
	DEFAULT_BANNER_CROP,
	bannerCrop,
} from '@site/src/components/codex'
import {
	pageSigilForSourcePath,
	pageSigilForDocId,
	pageSigilForHref,
} from '@site/src/components/codex/page-sigils'

describe('codex kit', () => {
	it('SigilIcon renders a mask-safe currentColor silhouette', () => {
		const { container } = render(<SigilIcon name="rune" />)
		const svg = container.querySelector('svg')
		expect(svg).toBeTruthy()
		expect(svg?.getAttribute('viewBox')).toBe('0 0 32 32')
		expect(svg?.getAttribute('fill')).toBe('currentColor')
		// No stroke anywhere: the navbar renders these through `mask-image`, which
		// resolves alpha, so a mark has to be a correct solid silhouette.
		expect(svg?.getAttribute('stroke')).toBeNull()
		expect(svg?.innerHTML).not.toContain('stroke=')
		// Decorative by default: hidden from the a11y tree.
		expect(svg?.getAttribute('aria-hidden')).toBe('true')
	})

	it('SigilIcon exposes a label when given a title', () => {
		const { container } = render(<SigilIcon name="sun" title="Sun disc" />)
		const svg = container.querySelector('svg')
		expect(svg?.getAttribute('aria-label')).toBe('Sun disc')
		expect(svg?.getAttribute('aria-hidden')).toBeNull()
	})

	it('RuneHeading pairs a pulsing magic glyph with readable text', () => {
		const { container, getByText } = render(
			<RuneHeading sigil="rune">Sorcery</RuneHeading>,
		)
		expect(getByText('Sorcery')).toBeTruthy()
		// Glyph carries the global magic-accent + runeGlyph pulse classes.
		const glyph = container.querySelector('.magic-accent.runeGlyph')
		expect(glyph).toBeTruthy()
		expect(glyph?.querySelector('svg')).toBeTruthy()
	})

	it('OrnamentDivider is a static bronze separator by default', () => {
		const { container } = render(<OrnamentDivider />)
		const sep = container.querySelector('[role="separator"]')
		expect(sep).toBeTruthy()
		// No magic accent unless explicitly requested.
		expect(container.querySelector('.magic-accent')).toBeNull()
	})

	it('OrnamentDivider takes the magic accent when magic', () => {
		const { container } = render(<OrnamentDivider magic />)
		expect(container.querySelector('.magic-accent.runeGlyph')).toBeTruthy()
	})

	it('ChapterSigil renders a decorative sigil with the heading-sigil class', () => {
		const { container } = render(<ChapterSigil name="key" />)
		const svg = container.querySelector('svg.heading-sigil')
		expect(svg).toBeTruthy()
		expect(svg?.getAttribute('aria-hidden')).toBe('true')
		expect(svg?.getAttribute('fill')).toBe('currentColor')
	})

	it('resolves the same page sigil from a source path, doc id, and href', () => {
		// The three call sites (remark plugin / sidebar doc item / sidebar
		// category) must agree, or the heading, side-nav, and breadcrumb drift.
		expect(
			pageSigilForSourcePath('/repo/docs/01-basic-rules/01-how-to-roll.md'),
		).toBe('casting-sticks')
		expect(pageSigilForDocId('basic-rules/how-to-roll')).toBe('casting-sticks')

		// Index/overview normalization: category href, overview doc id, and the
		// index source all collapse to one key.
		expect(pageSigilForHref('/docs/magic/magic-spells/')).toBe('orb')
		expect(
			pageSigilForSourcePath('/x/docs/07-magic/01-magic-spells/index.md'),
		).toBe('orb')
		expect(
			pageSigilForHref('/docs/basic-rules/quickstart-characters/overview'),
		).toBe('votive-mask')
		expect(
			pageSigilForSourcePath(
				'/x/docs/01-basic-rules/03-quickstart-characters/00-overview.md',
			),
		).toBe('votive-mask')

		// Unmapped leaf page (never had an emoji) → no bespoke sigil.
		expect(
			pageSigilForSourcePath(
				'/x/docs/01-basic-rules/03-quickstart-characters/apothecary.md',
			),
		).toBeUndefined()
	})

	it('MagicCallout renders the magic admonition with title and body', () => {
		const { container, getByText } = render(
			<MagicCallout title="Omen">A star falls.</MagicCallout>,
		)
		const box = container.querySelector('.alert.alert--magic')
		expect(box).toBeTruthy()
		expect(getByText('Omen')).toBeTruthy()
		expect(getByText('A star falls.')).toBeTruthy()
		expect(container.querySelector('.magic-accent.runeGlyph')).toBeTruthy()
	})
})

/**
 * M11 image plates. Symmetry is the one property of an ornament that CAN be
 * checked mechanically, so it is — whether the motif reads as Bronze Age is a
 * separate, visual question this file makes no claim about.
 */

/**
 * Every coordinate pair in an SVG subtree, as `[x, y]`, from paths and circles.
 * Takes markup rather than a node so the helper needs no DOM lib types.
 */
function inkPoints(markup: string): [number, number][] {
	const pts: [number, number][] = []
	for (const m of markup.matchAll(/\sd="([^"]*)"/g)) {
		const nums = m[1].match(/-?\d+(?:\.\d+)?/g) ?? []
		for (let i = 0; i + 1 < nums.length; i += 2) {
			pts.push([parseFloat(nums[i]), parseFloat(nums[i + 1])])
		}
	}
	for (const m of markup.matchAll(/<circle[^>]*>/g)) {
		const cx = /cx="(-?[\d.]+)"/.exec(m[0])
		const cy = /cy="(-?[\d.]+)"/.exec(m[0])
		pts.push([parseFloat(cx?.[1] ?? '0'), parseFloat(cy?.[1] ?? '0')])
	}
	return pts
}

/** True when every point in `a` has a partner in `b` within `tol`. */
function pointsMatch(
	a: [number, number][],
	b: [number, number][],
	tol = 0.02,
): boolean {
	if (a.length !== b.length) return false
	const pool = [...b]
	for (const [x, y] of a) {
		const i = pool.findIndex(
			([px, py]) => Math.abs(px - x) < tol && Math.abs(py - y) < tol,
		)
		if (i === -1) return false
		pool.splice(i, 1)
	}
	return true
}

describe('image plate ornaments (M11)', () => {
	it('the palmette corner is its own transpose about y = x', async () => {
		const { PlateFrame } = await import('@site/src/components/codex')
		const { container } = render(<PlateFrame weight="banner" />)
		const corners = container.querySelectorAll('svg[viewBox="0 0 48 48"]')
		expect(corners.length).toBe(4)
		const pts = inkPoints(corners[0].innerHTML)
		expect(pts.length).toBeGreaterThan(20)
		// CSS rotate() transposes an SVG's axes (ornament-craft §5). The four
		// corners are oriented by rotation, so the drawing has to be invariant
		// under that transpose or three of the four come out subtly wrong — the
		// exact failure that hid in CardFrame's asymmetric rails.
		expect(
			pointsMatch(
				pts,
				pts.map(([x, y]) => [y, x] as [number, number]),
			),
		).toBe(true)
	})

	it('the rosette keystone is radially symmetric', async () => {
		const { RosetteMark } = await import('@site/src/components/codex')
		const { container } = render(<RosetteMark size={52} />)
		const svg = container.querySelector('svg')!
		const turn = (pts: [number, number][], by: number) =>
			pts.map(([x, y]) => {
				const dx = x - 50
				const dy = y - 50
				return [
					50 + dx * Math.cos(by) - dy * Math.sin(by),
					50 + dx * Math.sin(by) + dy * Math.cos(by),
				] as [number, number]
			})

		// Radial symmetry is the load-bearing property of this motif: it is why
		// the same mark can sit on all four edges of a surround without being
		// upside down on one of them. The whole mark holds at a quarter turn —
		// the floor the frame actually needs — because the carved heart is the
		// kit's lozenge, which is 4-fold.
		const all = inkPoints(svg.innerHTML)
		expect(all.length).toBeGreaterThan(40)
		expect(pointsMatch(all, turn(all, Math.PI / 2), 0.05)).toBe(true)

		// The petal ring itself is the full 8-fold, which is what makes it a
		// rosette rather than a cross.
		const ring = inkPoints(svg.querySelector('g')!.innerHTML)
		expect(pointsMatch(ring, turn(ring, Math.PI / 4), 0.05)).toBe(true)
	})

	it('the plate frame draws four corners, four runs and its own keystone', async () => {
		const { PlateFrame } = await import('@site/src/components/codex')
		const { container } = render(<PlateFrame weight="banner" />)
		expect(container.querySelectorAll('svg[viewBox="0 0 48 48"]').length).toBe(
			4,
		)
		expect(
			container.querySelectorAll('svg[viewBox="0 0 100 100"]').length,
		).toBe(1)
		expect(container.querySelectorAll('span[class*="plateRun"]').length).toBe(4)
		// Decorative throughout.
		expect(container.querySelector('[aria-hidden="true"]')).toBeTruthy()
	})

	it('the frontispiece carries NO keystone, so the page crest is unopposed', async () => {
		// Counter-intuitive for the heaviest weight, and load-bearing: the
		// homepage hangs a SolarMedallion at the plate's lower edge and that
		// medallion is the site's central mark. A rosette on the same edge put two
		// crests within ~40px of each other. `figure` is empty for its own reason
		// (it carries a caption cartouche instead).
		const { PlateFrame } = await import('@site/src/components/codex')
		const keystones = (w: 'frontispiece' | 'banner' | 'inline' | 'figure') =>
			render(<PlateFrame weight={w} />).container.querySelectorAll(
				'svg[viewBox="0 0 100 100"]',
			).length
		expect(keystones('frontispiece')).toBe(0)
		expect(keystones('figure')).toBe(0)
		// The weights that have no competing mark still carry theirs.
		expect(keystones('banner')).toBe(1)
		expect(keystones('inline')).toBe(1)
	})

	it('the frontispiece frame stays lighter than it draws its corners for', async () => {
		// The step-down may not go below the smallest surround five palmette lobes
		// survive: lobe count is a React prop, so a container query cannot thin the
		// fan to match a smaller surround the way the `inline` redraw does.
		const { readFileSync } = await import('node:fs')
		const css = readFileSync(
			'src/components/codex/ornaments.module.css',
			'utf8',
		)
		const surround = (sel: string) =>
			parseFloat(
				new RegExp(
					`${sel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[^}]*--plate-surround:\\s*([\\d.]+)px`,
					's',
				).exec(css)![1],
			)
		const base = surround('.plate-frontispiece')
		const stepped = surround('.plate-frontispiece .plateBox')
		const banner = surround('.plate')
		expect(base).toBeLessThan(28) // lighter than it shipped at
		expect(base).toBeGreaterThan(banner) // still the heaviest weight
		expect(stepped).toBeGreaterThanOrEqual(20) // the five-lobe floor
		expect(stepped).toBeLessThan(base)
	})

	it('the inline weight is a redraw, not a scale', async () => {
		const { PlateFrame } = await import('@site/src/components/codex')
		const banner = render(<PlateFrame weight="banner" />)
		const inline = render(<PlateFrame weight="inline" />)
		const cornerPaths = (r: ReturnType<typeof render>) =>
			r.container.querySelectorAll('svg[viewBox="0 0 48 48"] path').length
		// Fewer palmette lobes at the small size: five lobes on a 14px surround
		// puts every lobe under the ~3px floor where a feature stops being
		// anatomy and becomes mud (ornament-craft §8).
		expect(cornerPaths(inline)).toBeLessThan(cornerPaths(banner))
		// And the rosette drops its inter-petal spurs for the same reason.
		const spurs = (r: ReturnType<typeof render>) =>
			r.container.querySelectorAll('svg[viewBox="0 0 100 100"] path').length
		expect(spurs(inline)).toBeLessThan(spurs(banner))
	})
})

/**
 * The vertical frieze tile is the horizontal one hand-transposed — a mask
 * cannot import geometry, so the two data URIs are maintained side by side.
 * This is the guard that keeps them in step: a recut of one that misses the
 * other fails here rather than showing up as a frame whose side runs are a
 * different band from its top and bottom.
 */
describe('frieze tiles', () => {
	/** Flatten an SVG path of M/L/H/V/Z commands into one point set per subpath. */
	function subpaths(d: string): Set<string>[] {
		const toks = d.match(/[MmHhVvLlZz]|-?\d+(?:\.\d+)?/g) ?? []
		const out: [number, number][][] = []
		let cur: [number, number][] = []
		let x = 0
		let y = 0
		let cmd = ''
		let i = 0
		const num = () => parseFloat(toks[i++])
		while (i < toks.length) {
			if (/[A-Za-z]/.test(toks[i])) {
				cmd = toks[i++]
				if (cmd === 'Z' || cmd === 'z') {
					if (cur.length) out.push(cur)
					cur = []
					continue
				}
			}
			if (cmd === 'M' || cmd === 'm') {
				const a = num()
				const b = num()
				;[x, y] = cmd === 'M' ? [a, b] : [x + a, y + b]
				if (cur.length) out.push(cur)
				cur = [[x, y]]
				cmd = cmd === 'M' ? 'L' : 'l'
			} else if (cmd === 'L' || cmd === 'l') {
				const a = num()
				const b = num()
				;[x, y] = cmd === 'L' ? [a, b] : [x + a, y + b]
				cur.push([x, y])
			} else if (cmd === 'H' || cmd === 'h') {
				const a = num()
				x = cmd === 'H' ? a : x + a
				cur.push([x, y])
			} else if (cmd === 'V' || cmd === 'v') {
				const a = num()
				y = cmd === 'V' ? a : y + a
				cur.push([x, y])
			}
		}
		if (cur.length) out.push(cur)
		return out.map((s) => new Set(s.map(([px, py]) => `${px},${py}`)))
	}

	it('the vertical merlon course is an exact transpose of the horizontal one', async () => {
		const { readFileSync } = await import('node:fs')
		// Path from the repo root: vitest runs with cwd at the project root, and
		// jsdom's URL shim cannot take import.meta.url as a base.
		const css = readFileSync('src/css/custom.css', 'utf8')
		const tile = (name: string) => {
			const uri = new RegExp(`${name}:\\s*url\\("(.*?)"\\);`, 's').exec(css)
			expect(uri).toBeTruthy()
			const svg = decodeURIComponent(uri![1].split(',').slice(1).join(','))
			return /d='(.*?)'/s.exec(svg)![1]
		}
		const h = subpaths(tile('--nexus-frieze-tile'))
		const v = subpaths(tile('--nexus-frieze-tile-v'))
		expect(h.length).toBe(v.length)
		h.forEach((sub, i) => {
			const transposed = new Set(
				[...sub].map((p) => p.split(',').reverse().join(',')),
			)
			expect([...transposed].sort()).toEqual([...v[i]].sort())
		})
	})

	// The frontispiece steps down to the banner geometry inside a narrow plate
	// (ornament-craft §10, "a weight is a RATIO"). Whether it LOOKS right is the
	// owner's call, but the wiring has one silent failure mode that is checkable:
	// a custom property is substituted where it is DECLARED, so if the derived
	// chain sits on `.plate` while the query overrides `--plate-surround` lower
	// down, the corners move and the runs do not. Assert the two halves of the
	// chain live on the same element the override targets.
	it('the plate step-down declares its derived chain where the override lands', async () => {
		const { readFileSync } = await import('node:fs')
		const css = readFileSync(
			'src/components/codex/ornaments.module.css',
			'utf8',
		)

		// Anchored to the start of a line, or `.plateBox` also matches inside
		// `.plate-frontispiece .plateBox` and the two assertions swap targets.
		const rule = (selector: string) => {
			const m = new RegExp(
				`^[\\t ]*${selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*\\{([^}]*)\\}`,
				'm',
			).exec(css)
			expect(m, `no rule for ${selector}`).toBeTruthy()
			return m![1]
		}

		// The container query exists, targets the frontispiece, and overrides the
		// SOURCE token rather than any derived one.
		expect(css).toMatch(/@container \(max-width: 640px\)/)
		const stepDown = rule('.plate-frontispiece .plateBox')
		expect(stepDown).toMatch(/--plate-surround:/)
		expect(stepDown).not.toMatch(/--plate-course:|--plate-run-inset:/)

		// The derived half is declared on `.plateBox` — the same element — so it
		// resolves against whichever surround won there...
		const box = rule('.plateBox')
		expect(box).toMatch(/--plate-course:\s*calc\(var\(--plate-surround\)/)
		expect(box).toMatch(/--plate-run-inset:\s*calc\(var\(--plate-surround\)/)

		// ...and NOT on `.plate`, where it would freeze against the un-overridden
		// value and inherit down already resolved.
		const plate = rule('.plate')
		expect(plate).not.toMatch(/--plate-course:|--plate-run-inset:/)
		expect(plate).toMatch(/container-type:\s*inline-size/)
	})
})

describe('MdxImage — the alt-marker router (M11 S2)', () => {
	const marked = (alt: string) =>
		render(<MdxImage alt={alt} src="/img/banner/folk-banner.png" />).container

	it('maps each marker to its plate weight', () => {
		expect(parseImageAlt('banner-img').weight).toBe('banner')
		expect(parseImageAlt('folk-img').weight).toBe('inline')
		expect(parseImageAlt('figure-img').weight).toBe('figure')
	})

	it('splits an authored description off the marker', () => {
		expect(parseImageAlt('folk-img|A dwarf smith')).toEqual({
			weight: 'inline',
			alt: 'A dwarf smith',
		})
		// A description may itself contain a pipe; only the FIRST one delimits.
		expect(parseImageAlt('folk-img|Catfolk | lionfolk.jpeg').alt).toBe(
			'Catfolk | lionfolk.jpeg',
		)
	})

	it('never lets a marker reach the DOM', () => {
		for (const marker of ['banner-img', 'folk-img', 'figure-img']) {
			const img = marked(marker).querySelector('img')
			expect(img).toBeTruthy()
			// Empty, not absent: an absent `alt` is a missing description, an empty
			// one is a claim that the image is decorative.
			expect(img!.getAttribute('alt')).toBe('')
			expect(img!.getAttribute('role')).toBe('presentation')
			expect(marked(marker).innerHTML).not.toContain(marker)
		}
	})

	it('emits an authored description as the real alt, with no role', () => {
		const { container } = render(
			<MdxImage alt="folk-img|A dwarf smith" src="./img/dwarf.jpeg" />,
		)
		const img = container.querySelector('img')!
		expect(img.getAttribute('alt')).toBe('A dwarf smith')
		expect(img.getAttribute('role')).toBeNull()
		expect(container.innerHTML).not.toContain('folk-img')
	})

	it('reserves the box before the file lands', () => {
		const img = marked('banner-img').querySelector('img')!
		// The banner inventory is uniform 1584x672, so the ratio is known. These
		// describe the FILE, which is native 2.36:1 — the 4:1 the page shows comes
		// from `.img-banner`, and the no-CSS fallback wants the whole picture.
		expect(img.getAttribute('width')).toBe('1584')
		expect(img.getAttribute('height')).toBe('672')
	})

	it('aims the 4:1 window per banner, and only for banners', () => {
		// A banner is native 2.36:1 inside a 4:1 box, so which slice survives is a
		// per-picture call. Everything else is square in a square box or reserves
		// no ratio at all, so an object-position would be meaningless there.
		//
		// Asserted against the MAP rather than a literal: the fixture src is a real
		// banner, so hard-coding its value here would make re-aiming one picture
		// fail a test about routing.
		const banner = marked('banner-img').querySelector('img')!
		expect(banner.style.objectPosition).toBe(BANNER_CROP['folk-banner.png'])
		expect(marked('folk-img').querySelector('img')!.style.objectPosition).toBe(
			'',
		)
	})

	it('falls back to the measured default for a banner nobody has aimed yet', () => {
		const img = render(
			<MdxImage
				alt="banner-img"
				src="/img/banner/not-yet-reviewed-banner.png"
			/>,
		).container.querySelector('img')!
		expect(img.style.objectPosition).toBe(DEFAULT_BANNER_CROP)
	})

	it('lists every in-doc banner, because the default is not centre', () => {
		// `DEFAULT_BANNER_CROP` is 66%, so an omission does not mean "leave it
		// alone" — it moves the picture. A banner reviewed and left at centre has
		// to say so explicitly, which is why the map holds all 54 rather than only
		// the ones that moved.
		expect(Object.keys(BANNER_CROP)).toHaveLength(54)
		expect(BANNER_CROP).not.toHaveProperty('home-banner.png')
	})

	it('looks the crop up by filename stem, so a content hash cannot break it', () => {
		// Docusaurus serves `x.png` in dev and `x.a1b2c3.png` in production. A
		// lookup keyed on the full basename would silently fall back to centre for
		// every banner in the built site — the one place it matters.
		const key = Object.keys(BANNER_CROP)[0]
		if (!key) return // map is empty until the framing review lands
		const stem = key.replace(/\.png$/, '')
		expect(bannerCrop(`/img/banner/${stem}.a1b2c3d4.png`)).toBe(
			BANNER_CROP[key],
		)
	})

	it('wraps the plate in spans only, so it is legal inside a <p>', () => {
		// A lone `![alt](src)` is parsed as a paragraph containing an image. A
		// <div> or <figure> there is closed out by the HTML parser and hydration
		// breaks, so every box in the plate has to be a span blocked in CSS.
		const html = marked('banner-img').innerHTML
		expect(html).not.toMatch(/<(div|figure|p)[\s>]/)
	})

	it('passes an unmarked image through to the Docusaurus default', () => {
		// The opt-out: an image that wants no frame just omits the marker, so no
		// author has to know this component exists.
		const { container, getByTestId } = render(
			<MdxImage alt="A carved tablet" src="/img/tablet.png" />,
		)
		expect(getByTestId('docusaurus-default-img')).toBeTruthy()
		expect(container.querySelector('[class*="plate"]')).toBeNull()
		expect(container.querySelector('img')!.getAttribute('alt')).toBe(
			'A carved tablet',
		)
	})

	it('passes through when there is no src to plate', () => {
		const { getByTestId } = render(<MdxImage alt="banner-img" />)
		expect(getByTestId('docusaurus-default-img')).toBeTruthy()
	})
})
