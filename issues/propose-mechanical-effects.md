### Problem Statement
The current materials documentation at `docs/04-equipment/07-magic-items/materials.md` lists several high-tier materials (Greater and Legendary) that lack mechanical effects. While the flavor text is present, these need to be translated into game mechanics to support crafting and item generation.

### Design Goals
- **Consistency:** Use the format established for Exotic materials (e.g., "Armor/Shield: -1 load").
- **Scaling:** Higher quality materials should offer more powerful or versatile effects than lower-tier ones.
- **Passivity:** Focus on passive effects or reactive abilities (limited by scene/day). Avoid active abilities, as those are reserved for enchantments.
- **Source Material:** Refer to the [Nexus RPG Vault](https://github.com/BeskarDev/nexus-rpg-vault/tree/main/(12)%20%F0%9F%97%9D%EF%B8%8F%20Artefakte/Materialien) for detailed flavor and existing lore-based abilities.

### Proposed Analysis & Examples

Based on the worldbuilding vault, here are initial proposals for some materials:

#### Greater Materials (Q5-Q6)
- **Mithril:** 
    - *Armor/Shield:* -1 load (min. 0). Reduce the item's rigid property by 1 (min. 0).
    - *Weapon:* +1 to initiative or speed-related checks.
- **Adamantite:**
    - *Armor:* Reduce incoming physical damage by 1 (passive).
    - *Weapon:* The item cannot be broken or blunted; ignore 1 point of enemy armor.
- **Solarite:** 
    - *Weapon:* Once per scene, when you strike, deal +1d6 fire damage.
    - *Armor:* Resistance to cold damage.
- **Lunarite:**
    - *Armor:* +1 to saves against spells.
    - *Weapon:* Once per scene, suppress a target's magical aura on hit.

#### Legendary Materials (Q7-Q8)
- **Orichalcum:**
    - *Armor:* -2 load (min. 0), provides resistance to one elemental type chosen at crafting.
- **Aegium:**
    - *Armor/Shield:* Once per day, negate one instance of damage from a supernatural/divine source.
- **Eternite:**
    - *General:* The item can store one additional enchantment or resonance slot.

### Next Steps
1. Review all materials in the `Greater` and `Legendary` tables.
2. Draft formal mechanical text for each entry.
3. Update `docs/04-equipment/07-magic-items/materials.md` with the new effects.