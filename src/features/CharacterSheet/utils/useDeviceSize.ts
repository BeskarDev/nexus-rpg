import { useEffect, useState } from 'react'

export const useDeviceSize = () => {
	const [width, setWidth] = useState<number>(window.innerWidth)
	const [viewChanged, setViewChanged] = useState(false)

	function handleWindowSizeChange() {
		setWidth(window.innerWidth)
		setViewChanged(true)
	}
	useEffect(() => {
		window.addEventListener('resize', handleWindowSizeChange)
		return () => {
			window.removeEventListener('resize', handleWindowSizeChange)
			setViewChanged(false)
		}
	}, [])

	const isMobile = width <= 768

	return { isMobile, viewChanged }
}
