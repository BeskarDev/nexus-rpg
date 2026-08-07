export { fitSize } from './fitSize'
export type { FitRange, FitResult } from './fitSize'
export {
	useAutofit,
	useAutofitPending,
	FIT_MIN_PT,
	FIT_MAX_PT,
	FIT_VARIABLE,
	FIT_SLACK_PX,
	FIT_BLOCK_ATTRIBUTE,
} from './useAutofit'
export type { AutofitOptions } from './useAutofit'
export { splitHtmlBlocks, bodyBlocks } from './splitBlocks'
export type { BodyBlock } from './splitBlocks'
export { FittedBody } from './FittedBody'
export type { FittedBodyProps } from './FittedBody'
export { useSpillPlan } from './useSpillPlan'
export type { SpillPlan, SpillPart, Cuts } from './useSpillPlan'
export {
	autofitPending,
	whenAutofitSettled,
	subscribeAutofit,
	beginFit,
	endFit,
	resetAutofitBarrier,
} from './autofitBarrier'
