import { useState, useEffect } from 'react'
import { CompanionTrait, CompanionStats } from '../types/companion'
import { calculateStats, getAvailableSizes } from '../utils/companionCalculations'

export const useCompanionBuilder = () => {
	const [selectedTier, setSelectedTier] = useState<number>(0)
	const [selectedSize, setSelectedSize] = useState<string>('')
	const [selectedTrait, setSelectedTrait] = useState<CompanionTrait | null>(null)
	const [builtCompanion, setBuiltCompanion] = useState<CompanionStats | null>(null)

	const handleTierChange = (newTier: number) => {
		setSelectedTier(newTier)
		
		// Only reset size if it's not available in the new tier
		const availableSizes = getAvailableSizes(newTier)
		if (selectedSize && !availableSizes.includes(selectedSize)) {
			setSelectedSize('')
		}
	}

	const handleSizeChange = (size: string) => {
		setSelectedSize(size)
	}

	const handleTraitChange = (trait: CompanionTrait | null) => {
		setSelectedTrait(trait)
	}

	const buildCompanion = () => {
		if (!selectedTrait || !selectedSize) return

		const calculatedStats = calculateStats(
			selectedTier,
			selectedSize,
			selectedTrait,
		)
		const companion: CompanionStats = {
			tier: selectedTier,
			size: selectedSize,
			trait: selectedTrait,
			calculatedStats,
		}

		setBuiltCompanion(companion)
	}

	const resetBuilder = () => {
		setSelectedTier(0)
		setSelectedSize('')
		setSelectedTrait(null)
	}

	// Auto-build companion when all selections are made
	useEffect(() => {
		if (selectedTier !== undefined && selectedSize && selectedTrait) {
			buildCompanion()
		} else {
			setBuiltCompanion(null)
		}
	}, [selectedTier, selectedSize, selectedTrait])

	return {
		selectedTier,
		selectedSize,
		selectedTrait,
		builtCompanion,
		handleTierChange,
		handleSizeChange,
		handleTraitChange,
		resetBuilder,
	}
}
