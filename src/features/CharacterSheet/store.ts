import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { characterSheetReducer } from './characterSheetReducer'

const rootReducer = combineReducers({
	characterSheet: characterSheetReducer,
})

export const setupStore = () =>
	configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				serializableCheck: false,
			}),
	})

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
