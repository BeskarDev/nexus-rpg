import { Box, BoxProps } from '@mui/material'

export const SheetLayout: React.FC<BoxProps> = ({ children, ...props }) => {
	return (
		<Box
			{...props}
			sx={{
				height: '191mm',
				width: '133mm',
				border: '1px solid white',
				backgroundColor: 'white',
				display: 'flex',
				...props.sx,
			}}
		>
			<Box
				sx={{
					m: 1,
					p: 1,
					flexGrow: 1,
					border: '1px solid black',
					borderRadius: '4mm',
					backgroundColor: 'white',
					display: 'flex',
					flexDirection: 'column',
					gap: 1,
				}}
			>
				{children}
			</Box>
		</Box>
	)
}
