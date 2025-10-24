import React from 'react'
import { Provider } from 'react-redux'
import { setupCreatureBuilderStore } from '../features/CreatureBuilder/store'
import { CreatureBuilder } from './CreatureBuilder'

const store = setupCreatureBuilderStore()

export const CreatureBuilderContainer: React.FC = () => {
	return (
		<Provider store={store}>
			<CreatureBuilder />
		</Provider>
	)
}
