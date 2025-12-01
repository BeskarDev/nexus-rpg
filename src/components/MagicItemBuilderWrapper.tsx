import {
	Experimental_CssVarsProvider,
	experimental_extendTheme,
  Tooltip,
} from '@mui/material'
import { theme } from '@site/src/hooks/createTheme'
import { ThemeSwitcher } from '@site/src/components/ThemeSwitcher'
import { useColorMode } from '@docusaurus/theme-common'
import React, { useState } from 'react'
import { MagicItemBuilderDialog } from '@site/src/features/CharacterSheet/CharacterSheetTabs/02_Items/SearchDialog'
import { Button, Box } from '@mui/material'
import type { Item, Weapon } from '@site/src/types/Character.ts'
import { AutoFixHigh } from '@mui/icons-material'

export const MagicItemBuilderWrapper: React.FC = () => {
	const customTheme = experimental_extendTheme(theme)
	const [open, setOpen] = useState(false)
	const [generatedItem, setGeneratedItem] = useState<
		(Partial<Weapon> | Partial<Item>) & { slot?: string } | null
	>(null)

	const handleItemCreated = (
		item: Partial<Weapon> | Partial<Item>,
		name: string,
	) => {
		setGeneratedItem(item)
	}


	return (
		<Experimental_CssVarsProvider theme={customTheme}>
			<ThemeSwitcher />
			<Box sx={{ my: 2, textAlign: 'center' }}>
        <Tooltip title="Create custom magic item">
            <Button
              variant="outlined"
              startIcon={<AutoFixHigh />}
              onClick={() => setOpen(true)}
              sx={{
                minWidth: 'auto',
                px: 1,
                textTransform: 'none',
              }}
            >
              Magic Item Builder
            </Button>
          </Tooltip>
			</Box>
			<MagicItemBuilderDialog
				open={open}
				onClose={() => setOpen(false)}
				onItemCreated={handleItemCreated}
			/>
		</Experimental_CssVarsProvider>
	)
}

export default MagicItemBuilderWrapper
