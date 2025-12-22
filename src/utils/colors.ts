// Centralized color constants for reuse across the app
// Export attribute colors and re-export skill color getter
// Attribute-specific palette (kept light for cards)
export const ATTRIBUTE_COLORS = {
    strength: '#ef9a9a', // light red
    agility: '#81c784', // light green
    spirit: '#ce93d8', // light purple
    mind: '#90caf9', // light blue
}

// Common UI color constants used in the character sheet
export const UI_COLORS = {
    danger: '#f44336', // red
    success: '#4caf50', // green
    info: '#2196f3', // primary blue
    warning: '#ff9800', // orange
    purple: '#ba68c8',
    amber: '#ffb74d',
    lightBlue: '#64b5f6',
    grey: '#9e9e9e',
    greyBlue: '#78909c',
    // Additional semantic color used by Resolve card
    resolve: '#9575cd',
}

export { getSkillChipColor, getProfessionChipColor } from '../constants/skills'

export default ATTRIBUTE_COLORS
