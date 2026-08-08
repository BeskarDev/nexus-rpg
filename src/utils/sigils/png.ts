/**
 * Minimal greyscale PNG encoder — enough to dump a sigil contact sheet for
 * visual review without pulling an image library into the repo. Plain
 * `Uint8Array` throughout, no Node `Buffer`, so it type-checks under the same
 * browser-facing lint config as the rest of `src/`.
 */
import { deflateSync } from 'node:zlib'

const CRC_TABLE = (() => {
	const table = new Int32Array(256)
	for (let n = 0; n < 256; n++) {
		let c = n
		for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
		table[n] = c
	}
	return table
})()

function crc32(bytes: Uint8Array): number {
	let c = -1
	for (let i = 0; i < bytes.length; i++) {
		c = CRC_TABLE[(c ^ bytes[i]) & 0xff] ^ (c >>> 8)
	}
	return (c ^ -1) >>> 0
}

function concat(parts: Uint8Array[]): Uint8Array {
	const out = new Uint8Array(parts.reduce((n, p) => n + p.length, 0))
	let at = 0
	for (const part of parts) {
		out.set(part, at)
		at += part.length
	}
	return out
}

function uint32(value: number): Uint8Array {
	const out = new Uint8Array(4)
	new DataView(out.buffer).setUint32(0, value >>> 0)
	return out
}

function chunk(type: string, data: Uint8Array): Uint8Array {
	const tag = Uint8Array.from(type, (c) => c.charCodeAt(0))
	const body = concat([tag, data])
	return concat([uint32(data.length), body, uint32(crc32(body))])
}

/** Encode an 8-bit greyscale image (`pixels` is row-major, length `width * height`). */
export function encodeGrayPng(
	pixels: Uint8Array,
	width: number,
	height: number,
): Uint8Array {
	// PNG scanlines each carry a leading filter byte; 0 means "no filter".
	const raw = new Uint8Array((width + 1) * height)
	for (let y = 0; y < height; y++) {
		raw.set(pixels.subarray(y * width, (y + 1) * width), y * (width + 1) + 1)
	}
	const ihdr = new Uint8Array(13)
	ihdr.set(uint32(width), 0)
	ihdr.set(uint32(height), 4)
	ihdr[8] = 8 // bit depth
	ihdr[9] = 0 // colour type: greyscale
	return concat([
		Uint8Array.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
		chunk('IHDR', ihdr),
		chunk('IDAT', new Uint8Array(deflateSync(raw))),
		chunk('IEND', new Uint8Array(0)),
	])
}
