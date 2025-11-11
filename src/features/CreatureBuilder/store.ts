import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { creatureBuilderReducer } from './creatureBuilderReducer'

const rootReducer = combineReducers({
	creatureBuilder: creatureBuilderReducer,
})

export const setupCreatureBuilderStore = () =>
	configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				serializableCheck: false,
			}),
	})

export type CreatureBuilderRootState = ReturnType<typeof rootReducer>
export type CreatureBuilderAppStore = ReturnType<
	typeof setupCreatureBuilderStore
>
