import {
	combineReducers,
	configureStore,
	PreloadedState,
} from '@reduxjs/toolkit'
import { characterSheetReducer } from './characterSheetReducer'

const rootReducer = combineReducers({
	characterSheet: characterSheetReducer,
})

export const setupStore = (preloadedState?: PreloadedState<RootState>) =>
	configureStore({
		reducer: rootReducer,
		preloadedState,
	})

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
