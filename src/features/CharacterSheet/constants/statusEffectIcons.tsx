import React from 'react'
import {
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
import { StatusEffectType } from '@site/src/types/Character'

/**
 * Icon mapping for status effects using Material-UI icons
 */
export const statusEffectIcons: Record<StatusEffectType, React.ReactElement> = {
	bleeding: <Bloodtype />,
	blinded: <VisibilityOff />,
	burning: <Whatshot />,
	charmed: <Favorite />,
	confused: <Psychology />,
	dazed: <RemoveRedEye />,
	deafened: <HearingDisabled />,
	deprived: <SentimentDissatisfied />,
	distracted: <CenterFocusWeak />,
	frightened: <SentimentVeryDissatisfied />,
	grappled: <PanTool />,
	hidden: <VisibilityOutlined />,
	marked: <MyLocation />,
	paralyzed: <FlashOff />,
	poisoned: <Coronavirus />,
	prone: <ArrowDownward />,
	pushed: <ArrowForward />,
	restrained: <Link />,
	silenced: <VoiceOverOff />,
	slowed: <Speed />,
	staggered: <RotateLeft />,
	stunned: <StarRate />,
	suffocating: <Air />,
	unconscious: <Bedtime />,
}

/**
 * Duration options for status effects
 */
export const durationOptions = [
	{ value: 'briefly', label: 'Briefly' },
	{ value: 'short', label: 'Short' },
	{ value: 'medium', label: 'Medium' },
	{ value: 'long', label: 'Long' },
	{ value: '', label: 'Custom' },
]