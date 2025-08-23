import { useMemo } from 'react'

export interface RouteParams {
	collectionId?: string
	activeCharacterId?: string
}

export const useRouteParams = (): RouteParams => {
	return useMemo(() => {
		const queryString = window.location.search
		const urlParams = new URLSearchParams(queryString)
		const idParam = urlParams.get('id')

		if (!idParam) {
			return {}
		}

		const parts = idParam.split('-')
		if (parts.length < 2) {
			return {}
		}

		if (parts[0] === 'mock' && parts[1] === 'collection') {
			return {
				collectionId: 'mock-collection',
				activeCharacterId: parts.slice(2).join('-'),
			}
		}

		return {
			collectionId: parts[0],
			activeCharacterId: parts.slice(1).join('-'),
		}
	}, [])
}