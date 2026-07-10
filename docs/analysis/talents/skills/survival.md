# Survival — Talent Design Workbench

> **Source:** [docs/03-statistics/06-talents/survival.md](../../../03-statistics/06-talents/survival.md) | **Main Analysis:** [TALENT_SYSTEM_ANALYSIS.md](../TALENT_SYSTEM_ANALYSIS.md)

## 1. Skill Identity

**Role Spread:** Excels: Defense | Decent: Utility, Support | Weak: Offense, Healing, Control

**Primary Archetypes:** Barbarian (support), Druid (support), Ranger (key support), Slinger (key support), Tamer (support)

**Identity Tags:** terrain mastery, prey tracking, camp security, wilderness crafting, group endurance

**Design Lens:** Survival is the wilderness-living skill — keeping the group operational between adventures through shelter, food, tracking, trap-setting, and camp discipline. Unlike most skills, its talents primarily operate in the "between fights" space: even Monster Hunter and Trap Maker have strong out-of-combat dimensions. This is the skill that earns the Travel system's greatest integration dividend — shelter, tracking, foraging, firecraft, and campcraft all map directly to Travel roles. The urgent problem is that three of six talents are partially incomplete, undermining the reliable foundation that Ranger and Slinger archetypes depend on. Until those are completed, the skill cannot be adequately expanded.

---

## 2. Current Talent Inventory

| Talent | Path | Max Rank | Status | Role | Notes |
|--------|------|----------|--------|------|-------|
| Explorer of Nature | Basic | R3 | Incomplete | Utility | Chosen environments (up to 3); travel roll re-rolls; R3 XXX (environment bonus missing) |
| Makeshift Artisan | Basic | R3 | Complete | Hybrid | Field-craft makeshift weapons/tools; explosive destruction use at R2; quality improvement at R3 |
| Monster Hunter | Basic | R3 | Complete | Combat | Target large creature for +Survival damage; free Evade/Guard at R2; stun 1/scene at R3 |
| Relentless Tracker | Basic | R3 | Incomplete | Utility | Tracking re-roll at R1; R2–3 XXX (tracking progression entirely missing) |
| Trap Maker | Basic | R3 | Complete | Hybrid | Field trap construction (pit/rocks/net); harder save at R2; damage bonus and very-hard save at R3 |
| Wilderness Expert | Basic | R3 | Incomplete | Utility | Ration creation from forage; camp establishment boon at R2; R3 XXX (camp mastery missing) |

**Summary:** 6 talents total — 3 complete, 3 incomplete. Max rank: R3. Role distribution: ~17% combat / ~33% hybrid / ~17% utility / ~33% incomplete.

---

## 3. Gaps & Priorities

**Signature gap:** Ranger depends on Relentless Tracker for advanced tracking — this talent is missing R2 and R3, which means the Ranger's most iconic non-combat ability has no developed progression. Slinger's mobile-wilderness-warrior identity should have a Survival anchor for field craft and terrain exploitation, but only Makeshift Artisan serves this loosely. Barbarian's primal wilderness connection (living off the land in extreme conditions) has Monster Hunter but nothing about actual wilderness living. Druid's land stewardship fantasy has no Survival-native expression beyond Wilderness Expert R1–2.

**Role gaps:** Firecraft has no dedicated talent despite being a named aspect. Making camp in dangerous terrain (the campcraft aspect) is partially covered by Wilderness Expert R1–2 but the critical R3 mastery is missing. Group sustain during extended wilderness travel — keeping multiple characters fed, warm, and rested — is the most direct expression of the "Support/decent" role rating and the most absent. Hunting as a distinct activity (stalking prey, tracking game animals, setting game traps different from combat traps) has no dedicated talent.

**System integration gaps:** Travel system is the strongest integration opportunity in the entire talent pool — Survival's aspects (shelter, tracking, foraging, campcraft) map directly to Travel roles. Explorer of Nature already has partial Travel hooks (Navigator role, Scout role, supply-gathering). Completing the three incomplete talents would substantially improve Travel integration. Challenge: Wilderness survival challenges (surviving extreme weather, navigating without landmarks, enduring resource deprivation) have no explicit talent hooks. Social: None applicable.

**Rank gaps:** No talent reaches R4. Monster Hunter is the strongest R4 candidate — Master-rank monster hunters should be able to mark multiple targets or exploit creature weaknesses more systematically. No talent has R5. Three of six talents are incomplete, meaning two of the three priorities must be completions before any new design begins.

**Priority ranking for design work:**
1. Complete Explorer of Nature R3 — the Travel system anchor for Navigator/Scout roles; highest-value completion in the skill
2. Complete Relentless Tracker R2–3 — Ranger's most iconic ability is missing two ranks; blocking Ranger and Druid tracker builds
3. Complete Wilderness Expert R3 — the camp mastery that Barbarian and Ranger builds depend on for long-duration wilderness play
4. Add 2–3 new talents after completions to reach 8–9 baseline (firecraft, hunting, group endurance)

---

## 4. Design Space

Survival's most undeveloped territory is **the campfire as a mechanical scene**: using the act of making, tending, and managing a camp as an active game activity rather than a passive time-skip. Current talents touch this (Wilderness Expert creates rations, Explorer of Nature reduces travel penalties) but no talent makes the camp itself a defensible, resource-productive space. A "Camp Establishment" talent that converts Survival skill into active camp benefits — better rest recovery, early warning rings, food preservation techniques — would express the "campcraft" aspect that the skill names but barely implements.

Tracking is the second major design space: Relentless Tracker's R2–3 are entirely empty, and the tracking fantasy (pursuing quarry over days, reading environmental signs, predicting prey movement) is mechanically rich. Advanced tracking should be about more than re-rolling — it should produce actionable intelligence (how far ahead is the quarry, what condition are they in, where are they going) and potentially grant a mechanical advantage when the tracker finally closes on their target (the quarry is surprised, or the tracker gets to choose where the encounter starts).

### Unexplored Thematic Angles
- **Camp security and management:** A talent making camp-setting an active activity with measurable benefits — better ambush detection, faster Fatigue recovery, ration efficiency, and camp fortification; the "this is where we sleep, and we'll know if anything approaches" fantasy
- **Hunting as a dedicated activity:** Stalking and killing game animals through patient technique, separate from combat traps; produces food, materials, and potentially useful creature components; a form of Relentless Tracker applied to non-hostile prey
- **Environmental exploitation:** Using terrain features as tactical assets — natural traps, defensive positions, terrain advantages that reward knowledge of the land; the "this is my ground and I choose where we fight" fantasy
- **Group endurance management:** Active resource management for the group's sustained wilderness operation — rationing, rotation of camp roles, preventing Fatigue accumulation through smart resource use; the "how do we all survive a week in the deep wilderness" challenge that no current talent addresses

### System Integration Opportunities
- **Challenges:** Wilderness survival challenges are the most natural home for Survival in the entire system — surviving extreme weather, escaping a hostile environment, enduring resource deprivation; Explorer of Nature partially engages with Travel challenges but no talent has explicit Challenge system language; a "Wilderness Trial" talent would be the direct win
- **Social Intrigue:** No applicable direct connection — but a Survival character's ability to supply food, medicine, and shelter creates social leverage in resource-scarce environments (villages after harsh winters, sieges, expeditions); this is indirect social capital rather than a formal Social Intrigue mechanic
- **Travel:** Survival has the strongest natural connection to Travel of any skill; completing Explorer of Nature, Relentless Tracker, and Wilderness Expert unlocks most of the existing Travel hooks; a new talent explicitly assigning Survival to the Supply Officer travel role (foraging, ration management, emergency food production) would complete the integration

---

## 5. Talent Suggestions

### Completion Designs

---

### Explorer of Nature — Rank 3 Completion (Survival, Basic)
*A veteran of three terrains who finds efficient paths others cannot see.*

**Rank 3.** Choose a third environment. In any of your chosen environments, once per day you can lead the group along paths others would miss: treat the terrain as one difficulty category easier for progress calculation that day (for example, Forest becomes Plains, or Mountains become Forest). You may also use SPI + Survival instead of the normal roll for any Navigator or Scout check when traveling in one of your chosen environments.

**Archetype enablement:** Ranger's environment specialization reaches mastery. Druid's territorial knowledge gains a mechanical payoff. Barbarian wilderness survivors can navigate their home terrain reliably without investing in Nature.

**Design notes:** Once-per-day constraint on terrain downgrade prevents trivializing entire journeys. The SPI + Survival substitution mirrors the Beast Lore pattern (use Nature for companion rolls instead of required skill) — an established system precedent. The terrain category downgrade is concrete and bounded by the existing terrain difficulty table in the travel rules.

---

### Relentless Tracker — Ranks 2 and 3 Completion (Survival, Basic)
*A hunter who never truly loses a trail, and who chooses where the reckoning happens.*

**Rank 2.** You can follow a creature's trail without a roll, provided the trail was made within the past 24 hours. When a tracking roll fails, you can spend 1 Supply to treat the failure as a Weak success: you remain on the trail but fall behind, and the GM chooses from the following consequences — the quarry gains 1 hour on you, or you take a detour that costs 1 additional progress on the current day's travel.

**Rank 3.** After following a creature's trail for at least 1 hour, you instinctively know their approximate direction if they are within long range of your current position. Once per scene, when you locate your quarry while tracking and have not been spotted yourself, you may set up an ambush: your quarry is treated as unaware for the first attack of the encounter.

**Archetype enablement:** Ranger's tracking identity reaches its full arc — from re-rolling to automatic trailing to ambush setup. Druid builds tracking feral spirits or corrupt beasts benefit from roll-free trailing. The ambush clause directly enables the Ranger's Striker secondary identity: you chose where the fight starts.

**Design notes:** The 1-hour active tracking prerequisite for R3's direction sense prevents trivial instant-detection of hidden creatures. The Supply-to-save-failure at R2 uses the standard spend-resource-to-rescue-a-roll pattern. The GM menu for failure consequences (time lost or travel penalty) is concrete and bounded. The ambush setup requires narrative justification (you haven't been spotted) rather than being automatic, rewarding good play.

---

### Wilderness Expert — Rank 3 Completion (Survival, Basic)
*A campmaster who turns any clearing into a defensible home.*

**Rank 3.** When you establish camp, your party automatically succeeds on finding shelter even in harsh or extreme weather (no Scout roll required for the shelter condition). Once per rest, you can spend one exploration turn fortifying the camp position. A fortified camp grants all resting allies +2 AV (armor bonus) while resting. Any creature attempting to approach the camp undetected must succeed on a Stealth check vs. TN 10 + your Survival.

**Archetype enablement:** Druid and Ranger "keeper of the camp" fantasy gets mechanical teeth. Barbarian primal survivors: weather is not a threat. Fortification converts camp from a passive resource check into a tactically meaningful defensive position.

**Design notes:** Auto-shelter removes a frustrating failure chain at Expert tier where multiple Scout failures accumulate Fatigue penalties. The +2 AV is an armor bonus (only highest of same type applies), primarily benefiting lightly armored party members who don't already have high AV. Stealth check TN scales with Survival to keep the fortification relevant as the character improves. Once-per-rest for fortification reflects the meaningful exploration turn cost.

---

### New Talent Designs

---

### Pathfinder (Survival, Basic)
*A wilderness-trained navigator who reads the land to move faster and smarter than any road map.*

**Rank 1.** When you take the Navigator role during travel, you may use MND + Survival instead of the normal roll. You can also re-roll one Navigator check per day.

**Rank 2.** On a Strong or Critical success as Navigator, add 1 additional progress to the day's total in addition to any normal bonus. When you would blunder on a Navigator roll, treat it as a failure instead.

**Rank 3.** Once per journey, when the party reaches a Blockade or Ambush checkpoint, roll MND + Survival vs. the checkpoint's TN before the checkpoint scene begins. On a success, you find an alternate route that bypasses the checkpoint. The GM chooses the alternate route's nature from the following options: a detour that adds 1 to the current challenge die's remaining progress, a hidden trail with no cost, or elevated terrain that grants +1 boon on the next day's Navigator and Scout rolls. On a failure, the checkpoint proceeds normally.

**Archetype enablement:** Ranger's overland-navigation identity, distinct from Explorer of Nature's environment bonuses. Druid wilderness guides benefit from the Survival-based Navigator option. Barbarian trail-runners who invest in Survival but not Nature can fulfill the Navigator role effectively.

**Design notes:** Survival-for-Navigator substitution at R1 is the foundation, making this usable by pure Survival builds without requiring Nature investment. Blunder-to-failure conversion at R2 protects against catastrophic navigation failures, paired with bonus progress on strong successes. The checkpoint bypass at R3 uses a concrete GM menu — three options, all fully defined — to prevent open-ended "GM decides what the alternate route costs." The three options cover the primary cost dimensions: time, narrative access, and tactical positioning.

---

### Seasoned Forager (Survival, Basic)
*A wilderness provider who stretches every meal and every rest into more than it appeared.*

**Rank 1.** When you take the Forager, Hunter, or Fisher role during travel, your yield increases by 1 Supply on any success.

**Rank 2.** You can identify edible plants, clean water sources, and active game trails without a roll. Once per day during a rest, you can gather 1 Supply as a Quick Action. This gathering does not count as your travel role for the day.

**Rank 3.** On a Strong or Critical success as Forager, Hunter, or Fisher, your yield increases by 2 Supply instead of 1. When you forage successfully, you also collect enough medicinal herbs to provide 1 Supply worth of herbal materials, usable as materials for Herbalist preparations if you have that talent.

**Archetype enablement:** Ranger's supply-chain identity — never runs dry on long journeys. Druid's natural abundance expression. Tamer builds whose companions require extra daily food benefit from the safety net. The Herbalist cross-synergy rewards Ranger or Druid characters who take both talents.

**Design notes:** +1 Supply on any success at R1 is modest but applies to three different roles, giving immediate value regardless of which role the character fills. R2's no-roll identification is mastery expression that removes a gate without adding resources. The Quick Action rest-gathering explicitly does not consume the travel role slot to avoid role-economy conflicts. The R3 Herbalist cross-synergy means on days you forage successfully, Herbalist preparations cost 0 additional Supply.

---

### Apex Predator (Survival, High-Level, Requires Nature R3)
*The ultimate hunter: quarry is already caught the moment they are found.*

**Rank 4.** You can follow any creature's trail without a roll, provided the trail was made within the past day. Your traps (if you have the Trap Maker talent) deal +2 additional damage (ability bonus) and their trigger TN increases by 2. When you take the Scout role during travel, enemies cannot make surprise attacks against your group for natural hazards or creature encounters in terrain you personally scouted that day.

**Rank 5.** Once per day, declare one creature as your Quarry. Until the end of the scene: you gain +1 boon on all rolls against the Quarry, your attacks against them deal +3 damage (ability bonus), and you always know their approximate direction if they are within long range. When the Quarry is reduced to 0 HP, you may immediately declare a new creature as your Quarry for free. This does not reset the daily use — the ability may only be used once per day regardless of how many creatures are designated during that scene.

**Archetype enablement:** Ranger's pinnacle hunting identity. Roll-free tracking at R4 is mastery, not magic. The Scout anti-surprise clause gives the Ranger's scouting role reliable group protection at high tiers. R5's Quarry mechanic makes encounters against major threats feel decisive: you chose this target, you hunted them, and when they fall you shift to the next. The Trap Maker cross-synergy rewards deep Survival builds.

**Design notes:** Prerequisites (Survival R4 + Nature R3) require investment across both wilderness skills, appropriate for a capstone of the hunting fantasy. The +3 damage on Quarry is an ability bonus. Monster Hunter's damage (adds your Survival as ability bonus) is the same bonus type and does not stack with the Quarry bonus: only the higher value applies. The "once per day regardless of new declarations" clause prevents chaining Quarry designations into an all-day effect. "Approximate direction within long range" is situational awareness, not exact position tracking.
