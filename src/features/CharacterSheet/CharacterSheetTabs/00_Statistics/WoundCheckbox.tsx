import {
	HeartBroken,
	HeartBrokenOutlined,
	WaterDrop,
	WaterDropOutlined,
} from '@mui/icons-material'
import { Box, Checkbox } from '@mui/material'
import React from 'react'
import { Wound } from '../../../../types/Character'

export type WoundCheckbox = Wound & {
	setWound: (wound: Partial<Wound>) => void
}

export const WoundCheckbox: React.FC<WoundCheckbox> = ({
	injury,
	fatigueOne,
	fatigueTwo,
	setWound,
}) => {
	return (
		<Box>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
				}}
			>
				<Checkbox
					icon={<HeartBrokenOutlined />}
					checkedIcon={<HeartBroken color="error" />}
					checked={injury}
					onChange={() =>
						setWound({
							injury: !injury,
							fatigueOne: !injury ? false : fatigueOne,
							fatigueTwo: !injury ? false : fatigueTwo,
						})
					}
					sx={{
						p: 0.5,
					}}
				/>
				<Checkbox
					size="small"
					icon={<WaterDropOutlined />}
					checkedIcon={<WaterDrop color="warning" />}
					checked={fatigueOne}
					onChange={() =>
						setWound({
							injury: !fatigueOne ? false : injury,
							fatigueOne: !fatigueOne,
							fatigueTwo: fatigueOne ? false : fatigueTwo,
						})
					}
					sx={{
						p: 0.5,
					}}
				/>
				<Checkbox
					size="small"
					icon={<WaterDropOutlined />}
					checkedIcon={<WaterDrop color="warning" />}
					checked={fatigueTwo}
					onChange={() =>
						setWound({
							injury: !fatigueTwo ? false : injury,
							fatigueOne: !fatigueTwo ? true : fatigueOne,
							fatigueTwo: !fatigueTwo,
						})
					}
					sx={{
						p: 0.5,
					}}
				/>
			</Box>
		</Box>
	)
}
