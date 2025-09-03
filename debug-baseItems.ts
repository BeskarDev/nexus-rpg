import { baseItems } from './src/features/CharacterSheet/CharacterSheetTabs/02_Items/utils/magicItemsConfig'

// Test each category
const categories = [
  'one-handed-weapon',
  'two-handed-weapon',
  'spell-catalyst',
  'light-armor',
  'heavy-armor',
  'shield',
  'helmet',
  'wearable',
  'ammo',
]

console.log('=== Base Items Debug ===')
categories.forEach(category => {
  const items = baseItems[category]
  console.log(`${category}: ${items?.length || 'undefined'} items`)
  if (items && items.length === 0) {
    console.log(`  ❌ ${category} has NO items`)
  } else if (items && items.length > 0) {
    console.log(`  ✅ ${category} has ${items.length} items`)
    console.log(`    First item: ${items[0].name}`)
  } else {
    console.log(`  ❌ ${category} is UNDEFINED`)
  }
})
