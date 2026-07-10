# Nature — Talent Design Workbench

> **Source:** [docs/03-statistics/06-talents/nature.md](../../../03-statistics/06-talents/nature.md) | **Main Analysis:** [TALENT_SYSTEM_ANALYSIS.md](../TALENT_SYSTEM_ANALYSIS.md)

## 1. Skill Identity

**Role Spread:** Excels: Healing | Decent: Support, Utility | Weak: Offense, Defense, Control

**Primary Archetypes:** Druid (support), Ranger (key support), Shaman (support), Tamer (key support)

**Identity Tags:** creature bonding, natural remedy, plant mastery, rider's command, poison knowledge

**Design Lens:** Nature is the living world as ally — understanding it, healing through it, moving with it, and directing its creatures. Its talent pool is the most thematically diverse in the system, covering animal companionship, mounted combat, field medicine, herbalism, poison crafting, plant knowledge, and wilderness navigation — an unusually broad design space for a single skill. The healing-primary role rating is justified by Field Medic, which is one of only three healing talents in the entire system. The critical problem is completion: three of eight talents are incomplete, and two of the three stubs or partials (Herbalist, Knowledgeable Wanderer R3) are anchors for the Apothecary and Ranger archetypes respectively. The weather and ecology aspects have almost no coverage.

---

## 2. Current Talent Inventory

| Talent | Path | Max Rank | Status | Role | Notes |
|--------|------|----------|--------|------|-------|
| Animal Companion | Signature | R3 | Complete | Hybrid | Companion control; dual companions or Combat Arts at R2; pack synergy or damage bonus at R3; Signature — should reach R5 |
| Beast Lore | Basic | R3 | Complete | Utility | Animal knowledge re-roll; animal communication at R2; charm animal at R3 |
| Expert Rider | Basic | R3 | Complete | Hybrid | Mounted combat bonuses; protect mount at R2; auto-calm mount and add Nature to mount AV at R3 |
| Field Medic | Basic | R3 | Complete | Utility | Dying prevention boost; Injury treatment during delving turn; +1 to dying roll at R2; consciousness restore at R3 |
| Herbalist | Basic | — | Incomplete | Utility | Stub only: "Create potent remedies" |
| Knowledgeable Wanderer | Basic | R3 | Incomplete | Utility | No bane for multiple travel roles; navigation boon at R2; R3 travel-progress mechanic TODO |
| Plant Lore | Basic | R3 | Incomplete | Utility | Plant/herb knowledge re-roll; +boon + foraging bonus at R2; R3 XXX |
| Poison Maker | Basic | R3 | Incomplete | Hybrid | Field poison creation (weak/decent/strong by rank); Supply check + Nature roll; specific poison type options are "…" placeholders — list contents unwritten |

**Summary:** 8 talents total — 4 complete, 4 incomplete. Max rank: R3. Role distribution: ~12% healing / ~38% utility / ~37% hybrid / ~12% incomplete (1 stub, 3 partial).

---

## 3. Gaps & Priorities

**Signature gap:** Ranger uses Nature as a key support for wilderness survival and creature tracking — Beast Lore and Plant Lore partially serve this, but Knowledgeable Wanderer R3 (incomplete) is the Travel system anchor and blocks the full Ranger progression. Tamer's key support need is Animal Companion (Signature) plus a whip/control talent (which lives in Fighting, not Nature) — but the Animal Companion Signature is stalled at R3 instead of progressing to R5. Apothecary's entire identity depends on Herbalist (stub only), making their pillar-skill signature completely absent. Druid has Shape Changer (Mysticism) but no dedicated Nature-side shapeshifting support.

**Role gaps:** Weather and ecology aspects have almost zero coverage — only Knowledgeable Wanderer's travel roll benefits touch environmental awareness, and that talent is incomplete. A weather-reading talent (forecasting, using weather as a tactical resource) would fill the "weather" aspect entirely. The "husbandry" and "calming" design notes suggest a social-nature talent for managing groups of animals or calming panicked crowds through naturalist presence — absent entirely.

**System integration gaps:** Nature is the skill with the most natural Travel connections: Knowledgeable Wanderer (incomplete), Plant Lore's foraging bonus, and Field Medic's injury treatment all interact with travel activities. But the integration is partial and incomplete. Challenge system: wilderness survival challenges (tending to a wounded creature, identifying a plant's properties under time pressure) have no explicit talent hooks. Social: the "calming" design note — using naturalist presence to de-escalate animal or primitive-culture confrontations — has no talent.

**Rank gaps:** Animal Companion is Signature-designated and should reach R5 — currently missing R4 and R5. No talent reaches R4 with complete content. Three incomplete talents must be completed before new ones are added. Herbalist stub is the most critical completion item (Apothecary dependency). Knowledgeable Wanderer R3 and Plant Lore R3 block Travel integration for Ranger builds.

**Priority ranking for design work:**
1. Complete Herbalist stub — Apothecary's pillar archetype has no signature; this is the highest-priority stub in Nature
2. Complete Knowledgeable Wanderer R3 — the Travel system integration anchor for Ranger; the TODO text suggests a travel-progress mechanic
3. Complete Plant Lore R3 — unblocks foraging progression for Ranger and Druid builds
4. Extend Animal Companion to R4 and R5 per its Signature designation

---

## 4. Design Space

Nature's most significant unexplored territory is the **weather and ecology** axis: understanding natural systems at a scale beyond individual creatures or plants. A weather-reading talent would let a character predict upcoming conditions and translate that into tactical advantage (knowing that a storm is coming, using wind direction for archery, exploiting fog for stealth). This is distinct from all existing Nature talents — which are all reactive (what is this creature, what is this plant) rather than predictive (what will the environment do). It would be the only talent in the system where natural environmental forces become a tactical resource the character can leverage.

The second major design cluster is **healing amplification**: Field Medic is the only healing-primary talent in Nature, and it addresses acute injury treatment rather than recovery acceleration. A talent amplifying natural recovery — reducing the number of days for Injuries to heal, enabling enhanced rest effectiveness with medicinal plants, or creating a "therapeutic camp" that reduces Fatigue accumulation — would express the "Healing/excellent" role rating in a way that no current talent fully delivers.

### Unexplored Thematic Angles
- **Weather mastery:** Reading and leveraging weather conditions — forecasting upcoming weather, using wind/fog/rain as tactical or travel resources, predicting storm paths for navigation; the predictive side of naturalism that no current talent touches
- **Healing amplification:** Accelerating natural recovery — reducing Injury healing times through proper treatment, enabling enhanced rest with medicinal preparations, creating a "healer's camp" that improves the group's overnight recovery; distinct from Field Medic (acute injury) and poisons (offensive)
- **Taming and calming:** De-escalating encounters with animals or nature spirits, temporarily domesticating wild animals for a scene, using naturalist presence to calm panicking animals in combat; extends Beast Lore's charm ability into proactive crowd-management
- **Ecological awareness:** Reading an ecosystem to gain information about recent activity — who has been through this forest, what creature made these tracks, what is out of balance in this region; a Nature-based investigation distinct from Perception (which is sensory) and Insight (which is social)

### System Integration Opportunities
- **Challenges:** Wilderness survival challenges (treating mass casualties in the field, guiding a group through hostile terrain, finding food in extreme conditions) should heavily use Nature; Knowledgeable Wanderer partially covers this but needs completion; a dedicated "Wilderness Medicine" or "Survival Guide" talent with explicit Challenge language would be the most direct win
- **Social Intrigue:** Nature-speaking and creature communication in social scenes with druids, shamans, or nature-spirits; or the "healer's authority" in communities that depend on the party's naturalist; has no current talent expression
- **Travel:** Nature already has stronger Travel integration than most skills (Knowledgeable Wanderer, Plant Lore foraging); completing those incomplete talents and adding a weather-reading talent would make Nature the strongest Travel skill in the system, which matches the Ranger/Druid wilderness guide fantasy

---

## 5. Talent Suggestions

### Completion Designs

---

### Herbalist (Nature, Basic)
*A preparation-based healer who converts rest time and wild plants into a portable medicine kit.*

**Rank 1.** Spend 1 Supply and roll MND + Nature vs. TN 8 during any rest. On a success, prepare 1 herbal remedy. A remedy can be consumed as an Action to restore 4 HP. Prepared remedies expire when you complete your next rest. You can identify medicinal and poisonous plants on sight without a roll.

**Rank 2.** Prepare up to 2 remedies per rest. When preparing, you can make any dose an antidote (cures one poison or disease effect when consumed) or a stimulant (removes 1 Fatigue when consumed) instead of a healing remedy.

**Rank 3.** Spend 1 Supply during any rest. No MND + Nature roll is required — your preparations always succeed. Prepare up to 3 remedies. Each healing remedy restores 8 HP instead of 4. When preparing, you can also create a fortifying tonic (the consumer gains +4 temporary HP for a short duration) or a focus tincture (restores 2 Focus when consumed).

**Archetype enablement:** Apothecary pillar — preparation-based medicine distinct from Field Medic's emergency healing. Druid and Shaman use this as a natural healing supplement. Rangers benefit from self-sufficient field medicine during extended journeys.

**Design notes:** Supply cost applies once per rest, not per dose, to prevent trivial action-economy abuse. Fixed HP values (4/8) avoid per-rank scaling formulas. No craft roll at R3 — the roll was at preparation time; three ranks of investment earns certainty of output. Focus tincture at R3 adds a Support dimension beyond pure healing, reaching the energy-restoration space that Apothecary implies.

---

### Knowledgeable Wanderer — Rank 3 Completion (Nature, Basic)
*An encyclopedic wilderness guide whose hard-won knowledge accelerates every aspect of the journey.*

**Rank 3.** +2 HP. Once per day, when you succeed on any travel role (Navigator, Scout, Forager, Hunter, Fisher, or Quartermaster), the party gains 1 additional progress.

**Archetype enablement:** Completes the Ranger's travel-knowledge progression. Druid wilderness guides also benefit. The once-per-day constraint prevents this from trivializing progress while rewarding consistent role performance.

**Design notes:** "Any travel role" works with the established R1 multi-role ability (the character may be filling multiple roles simultaneously). The +2 HP follows the established per-rank pattern of this talent.

---

### Plant Lore — Rank 3 Completion (Nature, Basic)
*A naturalist who reads the land's chemistry like a living text.*

**Rank 3.** When in natural terrain, spend 1 minute inspecting any plant or plant-derived substance to determine whether it is poisonous, medicinal, narcotic, or edible and at what dose it is safe. No roll is required — the determination is certain. Once per scene, you can also determine how two known plant substances interact when combined. The GM describes the nature of the interaction, choosing from: the substances amplify each other's effect, cancel each other out, produce a third distinct effect, or are inert when mixed.

**Archetype enablement:** Apothecary's ingredient intelligence. Ranger's foraging safety. Druid's ecological mastery. Certain identification removes the "fail to identify the antidote" failure state at Expert-tier play.

**Design notes:** Certainty (no roll) at R3 reflects genuine mastery. The combination interaction ability uses a bounded GM menu — four options, all defined — rather than open-ended "GM decides." The four options cover all chemically meaningful outcomes, with a safety-valve "inert" option for when nothing dramatic applies.

---

### Poison Maker (Nature, Basic) — Full Rewrite
*A field chemist who turns foraged plants into targeted toxins.*

**Rank 1.** Spend 1 Supply and roll MND + Nature vs. TN 8 during any rest. On a success, craft 1 dose of basic poison. Choose the type when crafting:

- **Paralytic.** The target rolls STR + Fortitude vs. TN 8 or is briefly dazed.
- **Debilitating.** The target rolls STR + Fortitude vs. TN 8 or is briefly weakened.
- **Soporific.** The target rolls SPI + Fortitude vs. TN 8 or is briefly confused.

Apply poison to a weapon as a Quick Action. The poison remains potent for 1 scene or until the weapon hits a target once. You can carry up to 3 doses.

**Rank 2.** Craft up to 2 doses per rest. The saving roll TN for all your basic poisons increases to 10. You can also create contact poisons: coat a surface or object instead of a weapon. Creatures that touch the coated surface make the same saving roll at TN 10.

**Rank 3.** Craft up to 3 doses per rest. You can also create advanced poisons. Choose the type when crafting:

- **Lethal.** On a hit, the target suffers bleeding 3 for a short duration in addition to normal weapon damage. No saving roll.
- **Stupefying.** The target rolls SPI + Fortitude vs. TN 10 or is briefly frightened.

**Archetype enablement:** Apothecary's offensive toolkit and Ranger's field-control options. Rogue-flavored Nature builds gain status-application outside combat via contact poisons. The contact poison expands utility into infiltration scenarios such as poisoning a chalice, door handle, or food supply.

**Design notes:** Roll + Supply cost at R1-R2 means preparation can fail. At R3 the expanded options are the payoff with no additional harder roll required. Lethal avoids a saving roll because it applies bleeding rather than an incapacitating state, distinguishing it tactically from the save-or-suffer basics. TN escalation (8 to 10) at R2 is a clean numeric investment payoff. Carry limit (3 doses) prevents stockpiling beyond meaningful scene supply.

---

### Animal Companion — Ranks 4 and 5 (Nature, Signature)
*The bond between handler and companion deepens until they operate as genuine partners rather than master and beast.*

**Rank 4.** Your animal companion's maximum tier increases to your Nature rank + 1. Your companion now acts on its own Initiative each round rather than on your Initiative. Your companion can use up to 2 Combat Arts per scene independently, without requiring a command from you on your turn.

**Rank 5.** Your animal companion's maximum tier increases to your Nature rank + 2. Your companion permanently gains +1 to two attributes of your choice, one die size each, chosen when you reach this rank. Once per day, you can direct your companion to act with exceptional focus: this turn, your companion takes 3 Actions instead of their normal Action, Quick Action, and Movement.

**Archetype enablement:** Tamer's central identity reaches its capstone — a near-independent partner at a meaningful power tier. R4's independent initiative means the companion responds to threats without waiting for the handler's turn. R5 is the "call the beast" pinnacle moment: once per day the companion becomes briefly extraordinary. Ranger and Druid single-companion builds also benefit at this depth.

**Design notes:** Tier progression (Nature rank, then +1, then +2) scales gradually to prevent immediate access to powerful creatures at R5. The attribute bonus at R5 is one die size increase to each of two chosen attributes — meaningful without being a broad stat upgrade. The 3-Actions burst is once per day to keep it a special moment rather than a permanent action-economy advantage. Independent initiative at R4 is the defining upgrade: the companion becomes a full second combatant rather than an extension of the handler's turn.

---

### New Talent Designs

---

### Primal Calming (Nature, Basic)
*A naturalist who speaks the language of fear and aggression, quieting beasts before blows are exchanged.*

**Rank 1.** As an Action, roll SPI + Nature vs. TN 8 to calm a hostile or frightened animal you can see within short range. On a success, the animal is no longer hostile toward you for a short duration and will not attack unless attacked or further provoked. The effect ends if the animal takes any damage.

**Rank 2.** You can target up to 3 animals with a single calming roll at the same TN. Additionally, when an ally's animal companion would fail an obedience check or become uncontrolled, you can use a Quick Action to grant +1 boon on that companion's next roll.

**Rank 3.** Once per scene, roll SPI + Nature vs. TN 10 to calm any non-magical beast within short range, regardless of how hostile they are. On a Weak success, the beast is no longer hostile toward you for a short duration. On a Strong or Critical success, the beast becomes briefly friendly and will follow one simple command before returning to a neutral state.

**Archetype enablement:** Tamer's crowd-management tool for animals that are not their own companion. Druid and Shaman archetypes gain the "speaker of the wild" expression that their flavor implies but no talent previously covered. Rangers managing a mounted party benefit at R2 when multiple mounts might panic during dangerous travel.

**Design notes:** "Briefly friendly" at R3 Strong/Critical means 1 round of commanded behavior before returning to neutral, not long-term domestication. This is calming, not taming. TN increases from 8 to 10 at R3 to reflect the difficulty of overriding extreme hostility. The "not attack unless attacked or further provoked" clause at R1 prevents trivially ending all animal combat with one roll: the animal is neutral, not an ally.
