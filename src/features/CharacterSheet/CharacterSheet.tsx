import {
	Box,
	Button,
	CssBaseline,
	Experimental_CssVarsProvider,
	Tab,
	Tabs,
	ThemeProvider,
	Typography,
	experimental_extendTheme,
} from '@mui/material'
import { LoginComponent } from '@site/src/components/LoginComponent'
import { theme } from '@site/src/hooks/createTheme'
import { AuthProvider } from '@site/src/hooks/firebaseAuthContext'
import React from 'react'

export const CharacterSheet: React.FC = () => {
	const [value, setValue] = React.useState(0)
	// const { colorMode } = useColorMode()

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue)
	}

	const customTheme = experimental_extendTheme(theme)

	return (
		<AuthProvider>
			<Experimental_CssVarsProvider theme={customTheme}>
				<Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
					<Tabs
						value={value}
						onChange={handleChange}
						aria-label="basic tabs example"
					>
						<Tab id="0" label="Item One" />
						<Tab id="1" label="Item Two" />
						<Tab id="2" label="Item Three" />
					</Tabs>
				</Box>
				<LoginComponent />
			</Experimental_CssVarsProvider>
		</AuthProvider>
	)
}
