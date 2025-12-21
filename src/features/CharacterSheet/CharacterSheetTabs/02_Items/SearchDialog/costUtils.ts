export const parseCostValue = (value: string): number | null => {
	if (!value) return null
	const cleaned = value.replace(/[,\s]/g, '')
	const parsed = Number.parseInt(cleaned, 10)
	return Number.isNaN(parsed) ? null : parsed
}
