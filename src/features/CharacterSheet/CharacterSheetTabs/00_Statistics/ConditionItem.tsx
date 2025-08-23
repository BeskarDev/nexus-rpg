import React from 'react'
import {
	Chip,
	IconButton,
	Tooltip,
} from '@mui/material'
import {
	Edit as EditIcon,
	Delete as DeleteIcon,
	Bloodtype,
	VisibilityOff,
	Whatshot,
	Favorite,
	Psychology,
	RemoveRedEye,
	HearingDisabled,
	SentimentDissatisfied,
	CenterFocusWeak,
	SentimentVeryDissatisfied,
	PanTool,
	VisibilityOutlined,
	MyLocation,
	FlashOff,
	Coronavirus,
	ArrowDownward,
	ArrowForward,
	Link,
	VoiceOverOff,
	Speed,
	RotateLeft,
	StarRate,
	Air,
	Bedtime,
} from '@mui/icons-material'
import { StatusEffect, StatusEffectType } from '@site/src/types/Character'

interface ConditionItemProps {
	condition: StatusEffect
	onEdit: (condition: StatusEffect) => void
	onDelete: (condition: StatusEffect) => void
}

const getConditionIcon = (type: StatusEffectType) => {
	switch (type) {
		case 'bleeding':
			return <Bloodtype />
		case 'blinded':
			return <VisibilityOff />
		case 'burning':
			return <Whatshot />
		case 'charmed':
			return <Favorite />
		case 'confused':
			return <Psychology />
		case 'dazed':
			return <RemoveRedEye />
		case 'deafened':
			return <HearingDisabled />
		case 'despair':
			return <SentimentDissatisfied />
		case 'disoriented':
			return <CenterFocusWeak />
		case 'frightened':
			return <SentimentVeryDissatisfied />
		case 'grappled':
			return <PanTool />
		case 'hidden':
			return <VisibilityOutlined />
		case 'hindered':
			return <MyLocation />
		case 'incapacitated':
			return <FlashOff />
		case 'poisoned':
			return <Coronavirus />
		case 'prone':
			return <ArrowDownward />
		case 'pushed':
			return <ArrowForward />
		case 'restrained':
			return <Link />
		case 'silenced':
			return <VoiceOverOff />
		case 'slowed':
			return <Speed />
		case 'stunned':
			return <RotateLeft />
		case 'blessed':
			return <StarRate />
		case 'airborne':
			return <Air />
		case 'unconscious':
			return <Bedtime />
		default:
			return <CheckCircle />
	}
}

const getConditionColor = (type: StatusEffectType): 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' => {
	const negativeConditions: StatusEffectType[] = [
		'bleeding', 'blinded', 'burning', 'charmed', 'confused', 'dazed',
		'deafened', 'despair', 'disoriented', 'frightened', 'grappled',
		'hindered', 'incapacitated', 'poisoned', 'prone', 'pushed',
		'restrained', 'silenced', 'slowed', 'stunned', 'unconscious'
	]

	if (negativeConditions.includes(type)) {
		return 'error'
	}

	if (type === 'blessed') {
		return 'success'
	}

	return 'default'
}

export const ConditionItem: React.FC<ConditionItemProps> = ({
	condition,
	onEdit,
	onDelete,
}) => {
	const displayText = condition.duration
		? `${condition.type} (${condition.duration})`
		: condition.type

	return (
		<Chip
			icon={getConditionIcon(condition.type)}
			label={displayText}
			color={getConditionColor(condition.type)}
			onDelete={() => onDelete(condition)}
			deleteIcon={
				<Tooltip title="Remove condition">
					<DeleteIcon />
				</Tooltip>
			}
			onClick={() => onEdit(condition)}
			sx={{
				m: 0.5,
				cursor: 'pointer',
				'& .MuiChip-deleteIcon': {
					margin: 0,
				},
			}}
		/>
	)
}