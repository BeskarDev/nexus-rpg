// a little function to help us with reordering the result
export const reorder = <T>(
	list: T[],
	startIndex: number,
	endIndex: number,
): T[] => {
	console.log('reorder with', list, startIndex, endIndex)
	const result = Array.from(list)
	console.log('result1', result)
	const [removed] = result.splice(startIndex, 1)
	console.log('removed', removed)
	result.splice(endIndex, 0, removed)
	console.log('result2', result)

	return result
}
