import { configureStore } from '@reduxjs/toolkit'
import companionBuilderReducer from './companionBuilderReducer'

export const setupCompanionBuilderStore = () => {
	return configureStore({
		reducer: {
			companionBuilder: companionBuilderReducer,
		},
	})
}

export type CompanionBuilderStore = ReturnType<typeof setupCompanionBuilderStore>
export type CompanionBuilderRootState = ReturnType<CompanionBuilderStore['getState']>
export type CompanionBuilderDispatch = CompanionBuilderStore['dispatch']
