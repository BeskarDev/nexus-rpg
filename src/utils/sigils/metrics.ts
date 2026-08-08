/**
 * Shape metrics over a rasterized sigil — the machine half of the sigil design
 * law (M10). Everything here works on a binary ink mask at a known scale, so a
 * threshold expressed in viewBox units ("min ink feature 2.5 units") converts to
 * pixels once, at the call site.
 *
 * Distances are exact (Felzenszwalb & Huttenlocher's squared-EDT), not chamfer
 * approximations: the thresholds are close enough to real geometry that a 5%
 * distance error would flip verdicts.
 */

export interface Grid {
	size: number
	mask: Uint8Array
}

const INF = 1e20

/** Exact Euclidean distance from every 0 cell to the nearest 1 cell, in pixels. */
export function distanceTransform(grid: Grid): Float64Array {
	const { size, mask } = grid
	const f = new Float64Array(size)
	const d = new Float64Array(size * size)
	const v = new Int32Array(size)
	const z = new Float64Array(size + 1)

	for (let i = 0; i < d.length; i++) d[i] = mask[i] ? 0 : INF

	const transform1D = (
		get: (i: number) => number,
		set: (i: number, val: number) => void,
	) => {
		for (let i = 0; i < size; i++) f[i] = get(i)
		let k = 0
		v[0] = 0
		z[0] = -INF
		z[1] = INF
		for (let q = 1; q < size; q++) {
			let s = (f[q] + q * q - (f[v[k]] + v[k] * v[k])) / (2 * q - 2 * v[k])
			while (s <= z[k]) {
				k--
				s = (f[q] + q * q - (f[v[k]] + v[k] * v[k])) / (2 * q - 2 * v[k])
			}
			k++
			v[k] = q
			z[k] = s
			z[k + 1] = INF
		}
		k = 0
		for (let q = 0; q < size; q++) {
			while (z[k + 1] < q) k++
			set(q, (q - v[k]) * (q - v[k]) + f[v[k]])
		}
	}

	for (let x = 0; x < size; x++) {
		transform1D(
			(y) => d[y * size + x],
			(y, val) => {
				d[y * size + x] = val
			},
		)
	}
	for (let y = 0; y < size; y++) {
		const base = y * size
		transform1D(
			(x) => d[base + x],
			(x, val) => {
				d[base + x] = val
			},
		)
	}
	for (let i = 0; i < d.length; i++) d[i] = Math.sqrt(d[i])
	return d
}

function invert(grid: Grid): Grid {
	const mask = new Uint8Array(grid.mask.length)
	for (let i = 0; i < mask.length; i++) mask[i] = grid.mask[i] ? 0 : 1
	return { size: grid.size, mask }
}

/** Erode by a disc of radius `r` px: keep ink at least `r` from the background. */
export function erode(grid: Grid, r: number): Grid {
	const dist = distanceTransform(invert(grid))
	const mask = new Uint8Array(grid.mask.length)
	for (let i = 0; i < mask.length; i++) mask[i] = dist[i] > r ? 1 : 0
	return { size: grid.size, mask }
}

/** Dilate by a disc of radius `r` px. */
export function dilate(grid: Grid, r: number): Grid {
	const dist = distanceTransform(grid)
	const mask = new Uint8Array(grid.mask.length)
	for (let i = 0; i < mask.length; i++) mask[i] = dist[i] <= r ? 1 : 0
	return { size: grid.size, mask }
}

/** Morphological opening — drops every feature thinner than `2r`. */
export function open(grid: Grid, r: number): Grid {
	return dilate(erode(grid, r), r)
}

export interface Component {
	area: number
	pixels: number[]
	touchesBorder: boolean
}

/** 8-connected components of the set cells. */
export function components(grid: Grid): Component[] {
	const { size, mask } = grid
	const seen = new Uint8Array(mask.length)
	const out: Component[] = []
	const stack: number[] = []
	for (let start = 0; start < mask.length; start++) {
		if (!mask[start] || seen[start]) continue
		const comp: Component = { area: 0, pixels: [], touchesBorder: false }
		stack.push(start)
		seen[start] = 1
		while (stack.length) {
			const i = stack.pop() as number
			const x = i % size
			const y = (i - x) / size
			comp.area++
			comp.pixels.push(i)
			if (x === 0 || y === 0 || x === size - 1 || y === size - 1)
				comp.touchesBorder = true
			for (let dy = -1; dy <= 1; dy++) {
				for (let dx = -1; dx <= 1; dx++) {
					const nx = x + dx
					const ny = y + dy
					if (nx < 0 || ny < 0 || nx >= size || ny >= size) continue
					const j = ny * size + nx
					if (mask[j] && !seen[j]) {
						seen[j] = 1
						stack.push(j)
					}
				}
			}
		}
		out.push(comp)
	}
	return out
}

/** Ink as a fraction of the box. */
export function coverage(grid: Grid): number {
	let n = 0
	for (let i = 0; i < grid.mask.length; i++) n += grid.mask[i]
	return n / grid.mask.length
}

/** Ink present in `a` but not in `b`, as a grid — used to isolate what an opening removed. */
export function difference(a: Grid, b: Grid): Grid {
	const mask = new Uint8Array(a.mask.length)
	for (let i = 0; i < mask.length; i++)
		mask[i] = a.mask[i] && !b.mask[i] ? 1 : 0
	return { size: a.size, mask }
}

/** Tight ink bounds in pixels, or undefined when the mark is empty. */
export function inkBounds(
	grid: Grid,
): { x0: number; y0: number; x1: number; y1: number } | undefined {
	const { size, mask } = grid
	let x0 = size
	let y0 = size
	let x1 = -1
	let y1 = -1
	for (let i = 0; i < mask.length; i++) {
		if (!mask[i]) continue
		const x = i % size
		const y = (i - x) / size
		if (x < x0) x0 = x
		if (y < y0) y0 = y
		if (x > x1) x1 = x
		if (y > y1) y1 = y
	}
	return x1 < 0 ? undefined : { x0, y0, x1: x1 + 1, y1: y1 + 1 }
}

/**
 * Silhouette signature: coverage averaged into an n×n grid. Compared with L2
 * distance, this is the "can I tell these two apart as blobs" test — deliberately
 * blurry, because that is what a 14px sidebar mark actually is.
 */
export function signature(
	data: Float32Array,
	size: number,
	cells = 8,
): Float64Array {
	const sig = new Float64Array(cells * cells)
	const step = size / cells
	for (let cy = 0; cy < cells; cy++) {
		for (let cx = 0; cx < cells; cx++) {
			let sum = 0
			let n = 0
			for (
				let y = Math.floor(cy * step);
				y < Math.floor((cy + 1) * step);
				y++
			) {
				for (
					let x = Math.floor(cx * step);
					x < Math.floor((cx + 1) * step);
					x++
				) {
					sum += data[y * size + x]
					n++
				}
			}
			sig[cy * cells + cx] = n ? sum / n : 0
		}
	}
	return sig
}

/** Root-mean-square difference between two signatures — 0 identical, 1 opposite. */
export function signatureDistance(a: Float64Array, b: Float64Array): number {
	let sum = 0
	for (let i = 0; i < a.length; i++) sum += (a[i] - b[i]) ** 2
	return Math.sqrt(sum / a.length)
}
