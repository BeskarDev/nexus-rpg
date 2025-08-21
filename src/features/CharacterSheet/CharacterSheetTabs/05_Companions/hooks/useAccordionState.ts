import { useState, useEffect } from 'react'
import { Companion } from '../../../../../types/Character'

export const useAccordionState = (companions: Companion[]) => {
	const [expandedAccordions, setExpandedAccordions] = useState<Set<string>>(
		new Set(),
	)

	// Initialize with first companion expanded only when companions are first loaded
	useEffect(() => {
		if (companions.length > 0 && expandedAccordions.size === 0) {
			setExpandedAccordions(new Set([companions[0].id]))
		}
	}, [companions.length])

	const toggleAccordion = (companionId: string) => {
		setExpandedAccordions((prev) => {
			const newSet = new Set(prev)
			if (newSet.has(companionId)) {
				newSet.delete(companionId)
			} else {
				newSet.add(companionId)
			}
			return newSet
		})
	}

	const expandAccordion = (companionId: string) => {
		setExpandedAccordions((prev) => new Set([...prev, companionId]))
	}

	const expandNewCompanion = (companionId: string) => {
		setExpandedAccordions((prev) => new Set([companionId, ...prev]))
	}

	return {
		expandedAccordions,
		toggleAccordion,
		expandAccordion,
		expandNewCompanion,
	}
}
