import { Creature, Attack, Ability } from '@site/src/types/Creature'

export const parseCreatureMarkdown = (markdown: string): Creature[] => {
  const creatures: Creature[] = []
  
  // Split by creature headers (### **Name** (Type))
  const creatureBlocks = markdown.split(/(?=### \*\*[^*]+\*\* \([^)]+\))/)
  
  for (const block of creatureBlocks) {
    if (!block.trim()) continue
    
    const headerMatch = block.match(/### \*\*([^*]+)\*\* \(([^)]+)\)/)
    if (!headerMatch) continue
    
    const name = headerMatch[1]
    const type = headerMatch[2]
    
    try {
      const creature = parseCreatureContent(name, type, block)
      creatures.push(creature)
    } catch (error) {
      console.warn(`Failed to parse creature ${name}:`, error)
    }
  }
  
  return creatures
}

const parseCreatureContent = (name: string, type: string, content: string): Creature => {
  // Parse tier and category
  const tierMatch = content.match(/\*\*Tier:\*\* (\d+) \(([^)]+)\)/)
  const tier = tierMatch ? parseInt(tierMatch[1]) : 1
  const category = tierMatch ? tierMatch[2] : 'Basic'
  
  // Parse stats table - look for the data row after the header and separator
  // We'll look for any line with 9 pipe-separated values after the table header
  const tableLines = content.split('\n').filter(line => line.includes('|'))
  let statsLine = ''
  
  // Find the stats line (should be after the header and separator lines)
  for (let i = 0; i < tableLines.length; i++) {
    const line = tableLines[i]
    if (line.includes('HP') && line.includes('AV') && line.includes('STR')) {
      // This is the header line, check the next non-separator line
      for (let j = i + 1; j < tableLines.length; j++) {
        const nextLine = tableLines[j]
        if (!nextLine.includes('---') && nextLine.split('|').length >= 10) {
          statsLine = nextLine
          break
        }
      }
      break
    }
  }
  
  if (!statsLine) {
    console.error('Failed to find stats line for creature:', name)
    console.error('Available table lines:', tableLines)
    throw new Error('Could not parse stats table')
  }
  
  // Extract values from the stats line
  const statsParts = statsLine.split('|').map(s => s.trim()).filter(s => s.length > 0)
  if (statsParts.length < 9) {
    console.error('Not enough stats parts:', statsParts)
    throw new Error('Could not parse stats table - insufficient columns')
  }
  
  const [hp, av, str, agi, spi, mnd, parry, dodge, resist] = statsParts
  
  // Parse skills
  const skillsMatch = content.match(/\*\*Skills:\*\* ([^\n]+)/)
  const skills = skillsMatch ? parseCommaSeparatedList(skillsMatch[1]) : []
  
  // Parse immunities, resistances, weaknesses
  const immunitiesMatch = content.match(/\*\*Immunities:\*\* ([^\n]+)/)
  const immunities = immunitiesMatch ? parseCommaSeparatedList(immunitiesMatch[1]) : []
  
  const resistancesMatch = content.match(/\*\*Resistances:\*\* ([^\n]+)/)
  const resistances = resistancesMatch ? parseCommaSeparatedList(resistancesMatch[1]) : []
  
  const weaknessesMatch = content.match(/\*\*Weaknesses:\*\* ([^\n]+)/)
  const weaknesses = weaknessesMatch ? parseCommaSeparatedList(weaknessesMatch[1]) : []
  
  // Parse attacks
  const attacksSection = content.match(/\*\*Attacks:\*\*([\s\S]*?)(?=\*\*Abilities:\*\*|$)/)
  const attacks = attacksSection ? parseAttacks(attacksSection[1]) : []
  
  // Parse abilities
  const abilitiesSection = content.match(/\*\*Abilities:\*\*([\s\S]*)/)
  const abilities = abilitiesSection ? parseAbilities(abilitiesSection[1]) : []

  return {
    name,
    tier,
    category,
    type,
    hp: parseInt(hp),
    av,
    str,
    agi,
    spi,
    mnd,
    parry: parseInt(parry),
    dodge: parseInt(dodge),
    resist: parseInt(resist),
    skills,
    immunities,
    resistances,
    weaknesses,
    attacks,
    abilities,
  }
}

const parseCommaSeparatedList = (text: string): string[] => {
  if (text.trim() === '-') return []
  return text.split(',').map(item => item.trim()).filter(item => item.length > 0)
}

const parseAttacks = (attacksText: string): Attack[] => {
  const attacks: Attack[] = []
  const lines = attacksText.split('\n').filter(line => line.trim())
  
  for (const line of lines) {
    if (!line.trim().startsWith('- **')) continue
    
    // Match: - **Name** (*properties*). damage. Optional description
    // Example: - **Claws** (*light, slash*). 6/10/14 damage (4 base + 2 weapon). On a hit, attempts to grapple the target.
    const match = line.match(/- \*\*([^*]+)\*\*\s*\(([^)]*)\)\.\s*([^.]+\.?)(.*)/)
    if (match) {
      const [, name, propertiesText, damage, description] = match
      // Remove the asterisks from properties and clean up
      const cleanProperties = propertiesText.replace(/\*/g, '').split(',').map(p => p.trim()).filter(p => p.length > 0)
      
      attacks.push({
        name: name.trim(),
        properties: cleanProperties,
        damage: damage.trim(),
        description: description?.trim() || undefined,
      })
    }
  }
  
  return attacks
}

const parseAbilities = (abilitiesText: string): Ability[] => {
  const abilities: Ability[] = []
  const lines = abilitiesText.split('\n').filter(line => line.trim())
  
  let currentAbility: Ability | null = null
  let spells: string[] = []
  
  for (const line of lines) {
    const trimmedLine = line.trim()
    
    // Check if this is a spell line (indented with 2 or more spaces and starts with -)
    if (currentAbility && line.match(/^\s{2,}- /)) {
      // Extract spell and add it to the spells array
      const spellMatch = trimmedLine.match(/^- (.+)/)
      if (spellMatch) {
        spells.push(spellMatch[1].trim())
      }
      continue
    }
    
    // Check if this is a main ability line
    if (!trimmedLine.startsWith('- **')) {
      continue
    }
    
    // Save the previous ability if we were building one
    if (currentAbility) {
      // Add spells as comma-separated list if any
      if (spells.length > 0) {
        currentAbility.description += `\n${spells.join(', ')}`
        spells = [] // Reset for next ability
      }
      abilities.push(currentAbility)
      currentAbility = null
    }
    
    // Handle abilities with recharge: - **Name** (Recharge d6). description
    let match = trimmedLine.match(/- \*\*([^*]+)\*\*\s*\(([^)]+)\)\.\s*(.+)/)
    if (match) {
      const [, name, recharge, description] = match
      currentAbility = {
        name: name.trim(),
        description: description.trim(),
        recharge: recharge.trim(),
      }
      continue
    }
    
    // Handle regular abilities: - **Name.** description  
    match = trimmedLine.match(/- \*\*([^*]+)\*\*\s*(.+)/)
    if (match) {
      const [, name, description] = match
      currentAbility = {
        name: name.trim().replace(/\.$/, ''), // Remove trailing period from name
        description: description.trim(),
      }
    }
  }
  
  // Don't forget to add the last ability
  if (currentAbility) {
    // Add spells as comma-separated list if any
    if (spells.length > 0) {
      currentAbility.description += `\n${spells.join(', ')}`
    }
    abilities.push(currentAbility)
  }
  
  return abilities
}
