import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CompanionBond, CompanionTrait } from '../../types/companion'
import {
	MAX_COMPANION_COMBAT_ARTS,
	NO_BOND,
} from '../../utils/typescript/companion/companionBond'

export interface CompanionBuilderState {
	tier: number
	size: string
	trait: CompanionTrait | null
	/** The owner's Animal Companion talent and Wild Companion spell. */
	bond: CompanionBond
	/**
	 * Which owner the bond was last prefilled from, so reopening the builder (or
	 * remounting the tab) does not overwrite what the player edited since.
	 */
	bondPrefillKey: string | null
}

const initialState: CompanionBuilderState = {
	tier: 0,
	size: '',
	trait: null,
	bond: NO_BOND,
	bondPrefillKey: null,
}

const companionBuilderSlice = createSlice({
	name: 'companionBuilder',
	initialState,
	reducers: {
		setTier: (state, action: PayloadAction<number>) => {
			state.tier = action.payload
		},
		setSize: (state, action: PayloadAction<string>) => {
			state.size = action.payload
		},
		setTrait: (state, action: PayloadAction<CompanionTrait | null>) => {
			state.trait = action.payload
		},
		updateBond: (state, action: PayloadAction<Partial<CompanionBond>>) => {
			state.bond = { ...state.bond, ...action.payload }
		},
		/** Learn or forget one of the companion's Combat Arts (two at most). */
		toggleBondCombatArt: (state, action: PayloadAction<string>) => {
			const name = action.payload
			const arts = state.bond.combatArts
			if (arts.includes(name)) {
				state.bond.combatArts = arts.filter((art) => art !== name)
			} else if (arts.length < MAX_COMPANION_COMBAT_ARTS) {
				state.bond.combatArts = [...arts, name]
			}
		},
		prefillBond: (
			state,
			action: PayloadAction<{ key: string; bond: CompanionBond }>,
		) => {
			if (state.bondPrefillKey === action.payload.key) return
			state.bond = action.payload.bond
			state.bondPrefillKey = action.payload.key
		},
		/** Clears the commission. The bond belongs to the owner and is kept. */
		resetBuilder: (state) => ({
			...initialState,
			bond: state.bond,
			bondPrefillKey: state.bondPrefillKey,
		}),
	},
})

export const companionBuilderActions = companionBuilderSlice.actions
export default companionBuilderSlice.reducer
