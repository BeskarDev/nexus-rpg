// to also copy elements and not just use same references
export const deepCopy = <T>(obj: T): T => {
	return JSON.parse(JSON.stringify(obj)) as T
}

// a little function to help us with reordering the result
export const reorder = <T>(
	list: T[],
	startIndex: number,
	endIndex: number,
): T[] => {
	const result = deepCopy<T[]>(list)
	const [removed] = result.splice(startIndex, 1)
	result.splice(endIndex, 0, removed)

	return result
}
