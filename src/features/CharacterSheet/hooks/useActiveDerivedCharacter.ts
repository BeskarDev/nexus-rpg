import { DerivedCharacter, useDerivedCharacter } from '../utils/deriveCharacter'
import { useAppSelector } from './useAppSelector'

/** The derived values of the character open in the sheet. */
export const useActiveDerivedCharacter = (): DerivedCharacter =>
	useDerivedCharacter(
		useAppSelector((state) => state.characterSheet.activeCharacter),
	)
