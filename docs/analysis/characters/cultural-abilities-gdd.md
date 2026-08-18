# Cultural Abilities — Game Design Document

> **Status:** Open design document. Extracted 2026-08-18 from the folk traits & ancestry balance analysis (archived at `_archive_/folk-traits-ancestry-balance-analysis.md`). Canonical data: `src/utils/data/json/folk.json`; published page: `docs/02-adventurers/01-folk.md`.

This GDD proposes a new character creation subsystem: one cultural ability per character, chosen by culture, in addition to the folk's innate biological abilities. It is a separate design decision from the innate folk ability rebalance (see `folk-rework-gdd.md`), though the two interlock at one point — the Human rework moves Arcane Awakening from the innate set into the Sefkari cultural ability defined here.

## Context: Why Culture-Dependent Abilities

The archived balance audit examined the feasibility of culture-dependent abilities and recommended adoption. Summary of that analysis:

Currently, all members of a folk share identical abilities regardless of culture — an Ash-Dwarf (military dictatorship, volcanic wasteland) and a Sea-Dwarf (seafaring merchants) are mechanically identical. The audit evaluated a **fixed core + cultural ability** model: each folk keeps 1–2 core abilities defining its biological identity, while culture grants an additional varying ability.

**Advantages found:** increased build diversity within each folk, reduced "always optimal" folk picks (notably Human caster dominance, if Arcane Awakening becomes a Sefkari cultural ability), deeper worldbuilding integration, expanded design space (3–7 cultural abilities per folk instead of one fixed set), and culture becoming a meaningful mechanical choice rather than pure flavor.

**Disadvantages found:** more character creation complexity, larger balance surface area, character sheet and tooling impact (the folk selection UI must accommodate variable abilities per culture), uneven option counts (some folk have only 3 cultures, others 5–7), and minor GM tracking burden.

**Audit verdict:** adopt the system — the advantages significantly outweigh the disadvantages, and it addresses the two most critical folk balance issues (Human caster dominance and the Minotaur/Lizardfolk advantage). Recommended implementation priority: (1) immediate — redesign Human's Arcane Awakening as a cultural ability, (2) near-term — cultural variants for the weakest-balance folk (Elf, Dogfolk, Gnome, Goblin), (3) long-term — complete variants for all 12 folk.

The audit's per-folk analysis of which ability is core (biological, keep) versus culturally variable informed the design below, but this proposal takes the simpler additive form: cultural abilities do not replace innate abilities, they are a separate category on top (see Implementation Notes).

---

## Cultural Abilities Proposal

This section presents fully designed cultural abilities for all 50 cultures across the 12 folk. Each ability is designed at roughly **Rank 1 talent power level** — a nice bonus that fits a playstyle or provides an interesting roleplaying opportunity, but is not build-defining or highly combat-optimized.

### Design Principles

1. **Power level ≈ Rank 1 talent.** Reference examples: Born Haggler (sell at 60% instead of 50%), Expert Rider (+1 boon on mount rolls), Beast Lore (re-roll Nature test once/scene), Sharpshooter (ignore first range bane). **Exception:** Sefkari Arcane Awakening is deliberately at Rank 2 talent power level — it is an intentional archetype enabler and the most powerful cultural ability in the system (see Sefkari design note below).
2. **Cultural, not biological.** These abilities reflect training, environment, and tradition — not innate physiology. A Fortress-Dwarf's architectural knowledge is learned, not genetic.
3. **Not build-defining.** No cultural ability should be so powerful that it forces a specific archetype. The exception is Sefkari (Oasis-Humans), whose Arcane Awakening is intentionally archetype-enabling — this is the design's highest-impact cultural ability.
4. **Context-specific boons only.** Boons must be limited to specific situations (e.g., "+1 boon on Fortitude rolls to resist cold-based hazards"), not blanket skill bonuses.
5. **Roughly balanced within each folk.** All cultures of the same folk should offer similarly weighted abilities so no single culture is dominant.
6. **Flavor-forward.** Each ability should immediately evoke the culture's identity and create roleplaying hooks.

### Cultural Abilities by Folk

---

#### Dwarf

**Ghahar (Fortress-Dwarves)** — *Fortress Knowledge*
You can identify structural weaknesses and strengths in constructed buildings and fortifications by sight and touch. You gain +1 boon on Education or Crafting rolls related to architecture, engineering, or structural assessment.

**Urduk (Ash-Dwarves)** — *Ashen Endurance*
You can tolerate extreme heat environments without penalty. You gain +1 boon on Fortitude rolls to resist fire-based environmental hazards.

**Dhurvar (Ice-Dwarves)** — *Glacial Tenacity*
You can tolerate extreme cold environments without penalty. You gain +1 boon on Fortitude rolls to resist cold-based environmental hazards.

**Dharok (Hill-Dwarves)** — *Stoneworker's Intuition*
You can intuitively sense hidden passages, mechanisms, or structural anomalies in stone construction within melee range. You gain +1 boon on Perception rolls to detect hidden doors, traps, or passages within stone structures.

**Mahruk (Sea-Dwarves)** — *Sea Legs*
You are immune to seasickness. You gain +1 boon on Athletics rolls to maintain balance on watercraft or in rough seas.

---

#### Elf

**Ho'shien (River-Elves)** — *River's Memory*
Your culture preserves ancient knowledge through oral tradition and song. You gain +1 boon on Education rolls related to history, ancient languages, or diplomatic protocol.

**Anutep (Sun-Elves)** — *Sun-Blessed Dignity*
You can tolerate extreme heat and direct sunlight without penalty. You gain +1 boon on Influence rolls when invoking religious or imperial authority.

**Imentep (Shadow-Elves)** — *Tomb Warden*
You gain +1 boon on Perception rolls in underground or tomb environments. You can sense the presence of undead creatures within close range as a faint chill in the air.

**Alfir (Dark-Elves)** — *Shadow Attunement*
While in dim light or darkness, you gain +1 boon on Stealth rolls. You can communicate silently using a gestural sign language known only to the Alfir.

**Sylvar (Wood-Elves)** — *Forest-Born*
You can identify any natural plant, mushroom, or herb on sight and know its basic properties (edible, poisonous, medicinal). You gain +1 boon on Survival rolls to find food, water, or shelter in forested environments.

**Xilvan (Jungle-Elves)** — *Jungle Instinct*
You can move through natural undergrowth without leaving a visible trail. You gain +1 boon on Survival rolls to navigate or find resources in jungle or dense vegetation environments.

**Morvael (Vampire-Elves)** — *Blood Discipline*
You gain +1 boon on Fortitude rolls to resist bleeding, blood loss, or blood-based magical effects. You can subsist on a diet of raw blood in place of normal food for up to one week without ill effects.

---

#### Gnome

**Shangri (Cloud-Gnomes)** — *Centered Mind*
Through monastic meditation techniques, you gain +1 boon on Spirit + Fortitude rolls to resist being charmed, confused, or mentally dominated. You can enter a meditative trance for 10 minutes to recover from the frightened condition.

**Burrin (Desert-Gnomes)** — *Desert Intuition*
Your empathic abilities have adapted to the harsh desert. You gain +1 boon on Survival rolls to navigate or find water in desert environments. Your Natural Empath ability functions normally even in extreme heat or sandstorms, where environmental factors would normally hinder similar abilities.

**Auflin (Willow-Gnomes)** — *Empathic Rapport*
When using Natural Empath on a creature, you can also sense if it is diseased, poisoned, or under the influence of a magical effect. You gain +1 boon on Insight rolls to determine if someone is lying during conversation.

---

#### Hune

**Gajahar (Elephant-Hune)** — *Elder Wisdom*
Your culture values the preservation of knowledge above all else. You gain +1 boon on Education rolls to recall obscure historical or scholarly knowledge. Once per day, you can meditate for 10 minutes to gain a flash of insight — the GM provides one useful piece of information about a topic you have studied or experienced.

**Hataar (Mountain-Hune)** — *Star Reader*
You can navigate by the stars with unerring accuracy. You gain +1 boon on Survival rolls to navigate at night or determine your location. You can predict weather changes for the next day with reasonable accuracy.

**Jotnir (Ice-Hune)** — *Frost-Hardened*
You can tolerate extreme cold environments without penalty. You gain +1 boon on Fortitude rolls to resist cold-based environmental hazards or magical effects.

**Empyros (Island-Hune)** — *Trade Winds*
Your culture thrives on maritime commerce. You gain +1 boon on Influence rolls during trade negotiations or bartering. You can gauge the approximate market value of trade goods by brief inspection.

**Ta'uuri (Island-Hune)** — *Seafarer's Instinct*
You gain +1 boon on Athletics rolls to swim or dive. You can hold your breath for one additional minute beyond your normal limits.

---

#### Orc

**Orgon (Island-Orcs)** — *Liberator's Resolve*
When you witness an ally being harmed or restrained, you gain +1 boon on your next attack or Influence roll made to help them, if it occurs within the same scene. You gain +1 boon on Influence rolls when rallying oppressed or downtrodden folk.

**Zakhar (Wasteland-Orcs)** — *Canyon Runner*
You gain +1 boon on Athletics rolls to climb or traverse rocky terrain. While in contact with stone ground, you can feel vibrations and estimate the number and general direction of large creatures moving within medium range.

**Jinkai (Mountain-Orcs)** — *Honor-Forged*
You gain +1 boon on Crafting rolls related to metalworking, weapon repair, or armor repair. You can assess the quality tier and approximate value of any metal weapon or armor by handling it briefly.

**Thuran (Jungle-Orcs)** — *River Warrior*
You gain +1 boon on Athletics rolls to swim or navigate river currents. You can determine if water is safe to drink by taste and smell alone.

---

#### Goblin

**Goki (Monkey-Goblins)** — *Monastic Agility*
You gain +1 boon on Athletics rolls to climb, leap, or perform acrobatic maneuvers. You can meditate for 10 minutes to recover from the frightened or dazed condition.

**Grikku (Jungle-Goblins)** — *Treetop Runner*
You gain +1 boon on Athletics rolls to climb. You take half damage from falls (rounded down) and can move at full speed while climbing without penalty.

**Snikrez (Cave-Goblins)** — *Tunnel Sense*
While underground, you gain +1 boon on Perception rolls to notice environmental details such as air currents, moisture, or structural instability. You can feel air currents and estimate the direction and approximate distance to exits or openings in enclosed spaces.

---

#### Human

**Khatok (Savanna-Humans)** — *Grassland Endurance*
You gain +1 boon on Fortitude rolls to resist exhaustion from forced marches, heat, or prolonged physical labor. You can estimate distances across open terrain with remarkable accuracy.

**Sefkari (Oasis-Humans)** — *Arcane Awakening*
You have a natural talent for the arcane arts. If you have learned Arcana, you gain +2 Focus. You can cast arcane spells without a Spell Catalyst, but suffer +1 bane on the roll.

> *Design note: This is the original Human innate ability, now moved to a cultural ability. Sefkari is the culture that canonically "harnesses human affinity for arcane magic at the watering holes of Atakhet." This makes Sefkari Humans the optimal Arcana caster folk — an intentional archetype enabler — while freeing other Human cultures from a caster-only ability. This is the most powerful cultural ability in the system, roughly equivalent to a Rank 2 talent.*

**Vornheimr (Snow-Humans)** — *Northerner's Grit*
You can tolerate extreme cold environments without penalty. You gain +1 boon on Fortitude rolls to resist cold-based environmental hazards. You gain +1 boon on Survival rolls to find shelter or build fire in snowy or icy terrain.

---

#### Catfolk

**Vyaghral (Tiger-Folk)** — *Patient Predator*
When you spend at least one minute observing a creature's movement and behavior, you gain +1 boon on your first attack against that creature in the following scene. You gain +1 boon on Stealth rolls in forested or mountainous terrain.

**Jakharii (Savanna-Lionfolk)** — *Pride Authority*
You gain +1 boon on Influence rolls to command respect or assert dominance in social situations with creatures that can see your full stature.

**Tuvak (Sabertooth-Folk)** — *Megafauna Hunter*
You gain +1 boon on Survival rolls to track creatures of large size or bigger. When you hit a creature at least two sizes larger than you with a melee attack, you add +1 to the total damage.

**Saghal (Jungle-Pantherfolk)** — *Shadow Stalker*
You gain +1 boon on Stealth rolls in dim light, darkness, or dense foliage. You leave no visible tracks in natural terrain unless you choose to.

---

#### Lizardfolk

**Vaashk (Swamp-Lizardfolk)** — *Swamp-Born*
You can move through muddy or waterlogged terrain without penalty. You gain +1 boon on Survival rolls to find food, shelter, or safe paths in wetland or swamp environments.

**Ceratos (Threehorns)** — *Ironhide*
Your naturally thick head plates provide additional protection. You gain +1 boon on Fortitude rolls to resist being stunned or dazed by physical impacts or blows to the head.

**Nakhash (Serpentfolk)** — *Serpent's Gaze*
You gain +1 boon on Influence rolls to mesmerize, entrance, or persuade a creature when you can maintain eye contact. You can communicate basic emotions and intentions through subtle body language that other reptilian creatures instinctively understand.

**Quexa-kul (Jungle-Lizardfolk)** — *Chameleon Skin*
Your scales shift color subtly to match your surroundings in natural environments. You gain +1 boon on Stealth rolls while in natural terrain.

**Thalassi (Sea-Lizardfolk)** — *Deep Diver*
You can hold your breath for an additional 2 minutes beyond your Aquatic Nature limit. You gain +1 boon on Perception rolls while underwater.

---

#### Minotaur

**Khutu (Steppe-Minotaurs)** — *Endurance Runner*
You gain +1 boon on Fortitude rolls to resist exhaustion from forced marches or prolonged running. During overland travel, you can cover an additional half-day's travel distance without becoming exhausted.

**Enkeddu (Grassland-Minotaurs)** — *Herder's Intuition*
You gain +1 boon on Nature rolls related to herd animals or livestock. You can predict weather changes for the next day with reasonable accuracy by observing animal behavior and wind patterns.

**Yettnar (Mountain-Minotaurs)** — *Stone Circle Guardian*
You gain +1 boon on Lore rolls related to nature spirits, sacred sites, or druidic traditions. While in natural environments, you can sense the presence of active supernatural effects within close range.

**Minokos (Island-Minotaurs)** — *Stormborn Navigator*
You gain +1 boon on Survival rolls to navigate at sea. You can read ocean currents and weather patterns, predicting storms and major weather changes up to a day in advance.

---

#### Dogfolk

**Kerbei (Jackal-Folk)** — *Ruin Delver*
You gain +1 boon on Perception rolls to detect hidden passages, mechanisms, or traps in ancient ruins or constructed structures. You can sense the age and general purpose of constructed structures by scent.

**Lycanin (Wolf-Folk)** — *Wolf's Resolve*
When an ally within close range takes damage, you gain +1 boon on your next attack against the creature that damaged them, if it occurs before the end of your next turn. You can use this ability once per scene.

**Coyotl (Coyote-Folk)** — *Cunning Scavenger*
You gain +1 boon on Streetwise rolls to find useful items, shelter, or information in any settlement. You can determine if food or drink is poisoned or spoiled by scent.

**Kithar (Fox-Folk)** — *Silver Tongue*
You gain +1 boon on Influence rolls during trade negotiations or when attempting to talk your way out of trouble. You can gauge the approximate value of goods and detect counterfeit items by inspection.

---

#### Satyr

**Bakkyr (Wine-Satyrs)** — *Revelmaster*
You gain +1 boon on Influence rolls during celebrations, feasts, or social gatherings. You are immune to the negative effects of alcohol (you can still drink and enjoy it, but you cannot become intoxicated).

**Panyr (Coastal-Satyrs)** — *Sea Song*
You gain +1 boon on Influence rolls to calm, inspire, or entertain through music or song. While performing music on a sea vessel, the crew gains +1 boon on their next Fortitude roll to resist seasickness or exhaustion.

**Silvan (Grove-Satyrs)** — *Grove Warden*
You can identify any natural plant, fungus, or natural remedy on sight and know its basic properties. You gain +1 boon on Nature rolls to prepare herbal remedies or treat natural poisons and diseases.

---

### Implementation Notes

**One cultural ability per character.** Each character receives one cultural ability based on their chosen culture during character creation. This is in addition to their folk's innate biological abilities.

**Cultural abilities do not replace innate abilities.** They are a separate category. A Sefkari Human has: Will of Perseverance (innate) + Arcane Sensitivity (innate) + Arcane Awakening (cultural).

**Power variance is intentional.** The Sefkari Arcane Awakening is deliberately the strongest cultural ability in the game — it's an archetype enabler. Most other cultural abilities are pure utility/flavor at Rank 1 talent level. This variance is acceptable because:
1. It creates the game's most meaningful culture choice (Sefkari vs. other Human cultures).
2. It solves the Human caster dominance problem by making it opt-in rather than default.
3. Non-Sefkari humans gain Arcane Sensitivity instead, which is universally useful.

**Future expansion.** As new cultures are added to the setting, new cultural abilities can be designed using the same power-level guidelines without affecting the core folk balance.
