import { DamageType } from '../../types/Character'

export type ParsedDamage = {
	base: 'SPI' | 'MND' | ''
	weapon: number
	other: number
	otherWeak: number
	otherStrong: number
	otherCritical: number
	type: DamageType
	staticDamage: boolean
}

/**
 * Parses spell effect text to extract damage information
 * @param effect The spell effect description
 * @param magicType The type of magic (Arcana uses MND, Mysticism uses SPI)
 * @returns Parsed damage object
 */
export const parseDamageFromEffect = (
	effect: string,
	magicType: 'Arcana' | 'Mysticism',
): ParsedDamage => {
	const damage: ParsedDamage = {
		base: magicType === 'Mysticism' ? 'SPI' : 'MND',
		weapon: 0,
		other: 0,
		otherWeak: 0,
		otherStrong: 0,
		otherCritical: 0,
		type: 'physical',
		staticDamage: false,
	}

	// Clean the effect text by removing HTML tags
	const cleanEffect = effect.replace(/<[^>]*>/g, ' ')

	// Look for damage patterns in weak/strong/critical sections
	const weakMatch = cleanEffect.match(
		/Weak\.\s*.*?(\+?)(\d+)\s*(?:(\w+)\s+)?damage/i,
	)
	const strongMatch = cleanEffect.match(
		/Strong\.\s*.*?(\+?)(\d+)\s*(?:(\w+)\s+)?damage/i,
	)
	const criticalMatch = cleanEffect.match(
		/Critical\.\s*.*?(\+?)(\d+)\s*(?:(\w+)\s+)?damage/i,
	)

	// Fallback: generic '+X damage' (e.g. Cyclone) and alternative in Klammern
	// Suche: '+8 damage (or +12 ...)'
	const genericAll = [...cleanEffect.matchAll(/\+?(\d+)\s*(\w+)?\s*damage/gi)]
	const altMatch = cleanEffect.match(/\(or\s*\+?(\d+)\s*(\w+)?\s*damage.*?\)/i)

	if (weakMatch && strongMatch && criticalMatch) {
		const weakDamage = parseInt(weakMatch[2]) || 0
		const strongDamage = parseInt(strongMatch[2]) || 0
		const criticalDamage = parseInt(criticalMatch[2]) || 0
		// ...bestehende Logik...
		let damageType = 'physical'
		const weakType = weakMatch[3]?.toLowerCase()
		const strongType = strongMatch[3]?.toLowerCase()
		const criticalType = criticalMatch[3]?.toLowerCase()
		const specificType = weakType || strongType || criticalType
		if (specificType) {
			damageType = mapDamageType(specificType)
		}
		damage.type = damageType as DamageType
		if (strongDamage === weakDamage * 2 && criticalDamage === weakDamage * 3) {
			damage.weapon = weakDamage
			damage.staticDamage = false
		} else if (weakDamage === 0 && strongDamage > 0) {
			if (criticalDamage === strongDamage * 2) {
				damage.weapon = strongDamage
				damage.other = -strongDamage
				damage.staticDamage = false
			} else {
				damage.otherWeak = weakDamage
				damage.otherStrong = strongDamage
				damage.otherCritical = criticalDamage
				damage.staticDamage = false
			}
		} else if (
			weakDamage > 0 &&
			strongDamage === weakDamage &&
			criticalDamage === weakDamage
		) {
			damage.other = weakDamage
			damage.staticDamage = true
		} else {
			damage.otherWeak = weakDamage
			damage.otherStrong = strongDamage
			damage.otherCritical = criticalDamage
			damage.staticDamage = true
		}
	} else if (genericAll.length > 0) {
		// Nimm das erste Vorkommen als Standard-Schaden
		const dmg = parseInt(genericAll[0][1]) || 0
		const dmgType = genericAll[0][2]?.toLowerCase()
		damage.other = dmg
		damage.staticDamage = true
		damage.type = dmgType ? (mapDamageType(dmgType) as DamageType) : 'physical'
		// Wenn ein alternatives Vorkommen existiert (z.B. (or +12 ...)), trage es als otherCritical ein
		if (altMatch) {
			const altDmg = parseInt(altMatch[1]) || 0
			damage.otherCritical = altDmg
		} else if (genericAll.length > 1) {
			// Falls mehrere Vorkommen, nimm das zweite als otherCritical
			const altDmg = parseInt(genericAll[1][1]) || 0
			damage.otherCritical = altDmg
		}
	}

	return damage
}

/**
 * Maps damage type strings to valid DamageType values
 */
const mapDamageType = (damageType: string): string => {
	const typeMap: Record<string, string> = {
		fire: 'fire',
		frost: 'frost',
		lightning: 'lightning',
		acid: 'acid',
		necrotic: 'necrotic',
		radiant: 'radiant',
		psychic: 'psychic',
		poison: 'poison',
		blast: 'blast',
		physical: 'physical',
		// Common variations
		cold: 'frost',
		ice: 'frost',
		electric: 'lightning',
		shock: 'lightning',
		force: 'blast',
	}

	return typeMap[damageType] || 'physical'
}
