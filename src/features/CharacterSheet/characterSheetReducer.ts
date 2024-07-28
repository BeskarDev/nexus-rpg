import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type CharacterSheetReducerState = {}

const initialState: CharacterSheetReducerState = {}

export const {
	reducer: characterSheetReducer,
	actions: characterSheetActions,
} = createSlice({
	name: 'characterSheet',
	initialState,
	reducers: {
		setState(state, action: PayloadAction<{}>) {
			const newState = action.payload || initialState
			return {
				...newState,
				creating: !Boolean(action.payload),
			}
		},
	},
})
