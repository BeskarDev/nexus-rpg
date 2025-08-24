import React from 'react'
import { StatisticsTab } from '../CharacterSheetTabs/00_Statistics/StatisticsTab'
import { SkillsTab } from '../CharacterSheetTabs/01_Skills/SkillsTab'
import { ItemsTab } from '../CharacterSheetTabs/02_Items/ItemsTab'
import { SpellsTab } from '../CharacterSheetTabs/03_Spells/SpellsTab'
import { PersonalTab } from '../CharacterSheetTabs/04_Personal/PersonalTab'
import { CompanionsTab } from '../CharacterSheetTabs/05_Companions/CompanionsTab'
import { SharedNotes } from '../CharacterSheetTabs/06_SharedNotes/SharedNotes'

export type TabInfo = {
	id: string
	label: string
	component: React.ComponentType
}

/**
 * Configuration for character sheet tabs
 */
export const mobileTabsConfig: TabInfo[] = [
	{ id: '0', label: 'Statistics', component: StatisticsTab },
	{ id: '1', label: 'Skills', component: SkillsTab },
	{ id: '2', label: 'Items', component: ItemsTab },
	{ id: '3', label: 'Spells', component: SpellsTab },
	{ id: '4', label: 'Personal', component: PersonalTab },
	{ id: '5', label: 'Companions', component: CompanionsTab },
	{ id: '6', label: 'Party', component: SharedNotes },
]

export const desktopTabsConfig: TabInfo[] = [
	{ id: '0', label: 'Skills', component: SkillsTab },
	{ id: '1', label: 'Items', component: ItemsTab },
	{ id: '2', label: 'Spells', component: SpellsTab },
	{ id: '3', label: 'Personal', component: PersonalTab },
	{ id: '4', label: 'Companions', component: CompanionsTab },
	{ id: '5', label: 'Party', component: SharedNotes },
]

/**
 * Get the appropriate tab component for the given tab index and device type
 */
export function getTabComponent(activeTab: number, isMobile: boolean): React.ComponentType | null {
	const config = isMobile ? mobileTabsConfig : desktopTabsConfig
	return config[activeTab]?.component || null
}

/**
 * Get tab labels for the given device type
 */
export function getTabLabels(isMobile: boolean): string[] {
	const config = isMobile ? mobileTabsConfig : desktopTabsConfig
	return config.map(tab => tab.label)
}