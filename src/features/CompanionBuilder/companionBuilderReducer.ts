import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CompanionTrait } from '../../types/companion'

export interface CompanionBuilderState {
	tier: number
	size: string
	trait: CompanionTrait | null
}

const initialState: CompanionBuilderState = {
	tier: 0,
	size: '',
	trait: null,
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
		resetBuilder: () => initialState,
	},
})

export const companionBuilderActions = companionBuilderSlice.actions
export default companionBuilderSlice.reducer
