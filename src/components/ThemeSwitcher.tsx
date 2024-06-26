import { useColorMode } from '@docusaurus/theme-common'
import { useColorScheme } from '@mui/material'
import { useEffect } from 'react'

export const ThemeSwitcher: React.FC = () => {
	const { colorMode } = useColorMode()
	const { setMode } = useColorScheme()

	useEffect(() => {
		setMode(colorMode)
	}, [colorMode])

	return undefined
}
