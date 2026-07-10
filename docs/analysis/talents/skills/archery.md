# Archery — Talent Design Workbench

> **Source:** [docs/03-statistics/06-talents/archery.md](../../../03-statistics/06-talents/archery.md) | **Main Analysis:** [TALENT_SYSTEM_ANALYSIS.md](../TALENT_SYSTEM_ANALYSIS.md)

## 1. Skill Identity

**Role Spread:** Excels: Offense | Decent: Control, Utility | Weak: Healing, Support, Defense

**Primary Archetypes:** Ranger (pillar), Slinger (pillar); also support for Engineer

**Identity Tags:** shot precision, range bracket mastery, ammo exploitation, swift fire volume, reactive positioning

**Design Lens:** Archery is the system's most focused combat skill — 8 of 9 talents are pure ranged offense or combat-adjacent reactions, giving it the clearest single-dimension identity in the pool. Its distinguishing mechanical contribution is range bracket manipulation: Sharpshooter progressively removes range banes, Reflexive Shooter adapts to melee crowding, Strong Grip handles heavy weapon restrictions. This is the "mastering all the ways a ranged weapon can be wrong" design philosophy. The skill's blind spot is equally clear: "trapline" and "wind-reading" — two named aspects — have zero talent representation, leaving Ranger's wilderness-guide half entirely to Nature and Survival.

---

## 2. Current Talent Inventory

| Talent | Path | Max Rank | Status | Role | Notes |
|--------|------|----------|--------|------|-------|
| Ammo Specialist | Basic | R3 | Complete | Combat | Supply roll advantage; special ammo types at R2; +Archery damage at R3 |
| Art of Archery | Signature | R4 | Complete | Combat | Combat Art access; Signature should reach R5 |
| Crossbow Mastery | Basic | R3 | Complete | Combat | Quick-Action reload; AV ignore at R2; stun on hit at R3 |
| Disciplined Archer | Basic | R3 | Complete | Combat | Re-roll + Combat Art frequency boost |
| Expert Slinger | Basic | R3 | Complete | Hybrid | Supply re-roll; +Archery damage at R2; free movement at R3 |
| Rapid Shot | Basic | R3 | Complete | Combat | Two attacks with bane; bane removal at R2; marked on hit at R3 |
| Reflexive Shooter | Basic | R3 | Complete | Combat | Melee-range adaptation; Opportunity Attacks at close range |
| Sharpshooter | Basic | R3 | Complete | Combat | Range bane removal; marked on stationary shot at R3 |
| Strong Grip | Basic | R3 | Complete | Combat | Heavy ranged weapon enabler; +½ Str damage at R3 |

**Summary:** 9 talents total — 9 complete, 0 incomplete. Max rank: R4. Role distribution: ~89% combat / ~11% hybrid.

---

## 3. Gaps & Priorities

**Signature gap:** Ranger is well-covered for ranged combat: Sharpshooter (precision), Art of Archery (breadth), Disciplined Archer (reliability), Ammo Specialist (supply). Slinger has dedicated coverage (Expert Slinger). Engineer has no Archery-native signature — their interest in ranged weapons is mechanical/siege-oriented rather than personal combat, and no talent reflects siege weapon operation, ballista training, or engineered projectile design.

**Role gaps:** No talent serves utility, travel, scouting, exploration, or social roles. The "trapline" aspect — setting mechanical distance traps that leverage archery skill — has zero coverage. The "wind-reading" and "sightline" aspects, which express the wilderness-survival and environmental observation side of archery, are entirely absent. A skilled archer who can read the battlefield, set ambush positions, and scout enemy locations from distance should have Archery-native talent support for those activities.

**System integration gaps:** No talent interacts with Challenge mechanics, Travel, or Social Intrigue. Archery competitions (a natural social or downtime scene), long-range scouting (a natural Travel role), and ambush-setting (a natural infiltration challenge) all have zero talent coverage. Ranger's role as wilderness guide is entirely dependent on Nature and Survival because Archery offers nothing outside combat.

**Rank gaps:** Art of Archery reaches R4 but not R5 per its Signature designation. All other talents cap at R3. No High-Level (R4–R5) talent exists for the "Elite Archer" identity that a Grandmaster Ranger should express. A Ranger with Archery 5 has 5+ unspendable TP with only combat options to spend them on.

**Priority ranking for design work:**
1. Add a scouting/wind-reading utility talent connecting Archery to the Travel system
2. Add a trapline/ambush-setting talent for the Ranger's preparation-based playstyle
3. Extend Art of Archery to R5 per Signature designation
4. Add a High-Level (R4–R5) talent for the Master/Grandmaster archery identity

---

## 4. Design Space

Archery's unexplored design territory divides into two clusters: **environmental mastery** (wind, light, terrain reading) and **pre-combat positioning** (ambush setup, trap-from-distance, zone denial). Both express the "patient hunter" side of archery that the current talent pool ignores in favour of the "spray-and-pray" combat optimisation that Rapid Shot and Disciplined Archer already cover.

Environmental mastery is the more distinctive of the two. Wind-reading as a mechanic — spending an action to "read" the battlefield and remove upcoming banes for a limited window — would be unique in the system. It expresses the deliberate, preparation-oriented archer fantasy (the sniper who waits for the perfect moment) against the reactive combat-focused pool. This would also synergise naturally with Sharpshooter's stationary-shot requirement and create a "patience build" that rewards not moving.

Trapline is the second major gap: a talent that allows placing a delayed-trigger ranged attack effect (a stretched bow trigger, a deadfall weight-and-line, a spring-loaded bolt) as a short-duration trap. This differs from Survival's Trap Maker (which uses physical force) because it uses archery technique and ammo — the mechanic would reference the archer's own attack statistics.

### Unexplored Thematic Angles
- **Wind-reading and sightline mastery:** Spending time to read environmental conditions (wind, light, cover geometry) to gain a window of penalty-free shooting or improved range; expresses the patient hunter who earns their shot
- **Trapline and deadfall:** Setting a delayed-trigger archery-based trap — a held bow or spring-loaded launcher — using ammo supply and Archery skill; distinct from Survival's trap-making because it uses archery statistics
- **Overwatch positioning:** A talent for pre-battle positioning that grants a free Opportunity Attack reaction at the start of a combat scene if the archer was stationary during the previous exploration turn — the "I had you in my sights" fantasy
- **Archery culture:** A social or downtime talent tied to archery competitions, hunting contests, or fletching craft — the only non-combat anchor the skill currently lacks

### System Integration Opportunities
- **Challenges:** Long-range scouting, ambush detection from distance, and timed precision shots (shooting a torch across a canyon to signal allies) are natural challenge-type uses for Archery
- **Social Intrigue:** Archery competitions (accuracy trials, hunting matches) as social scene mini-games; skilled hunters having cultural authority in wilderness-culture social scenes
- **Travel:** Scout role for Travel is the clearest integration opportunity — a talent giving the archer the lead Scout role with a specific Encounter Die bonus or advance warning mechanic

---

## 5. Talent Suggestions

---

### Phase 1 — Diverge: Design Space Exploration

**12 seed concepts covering Archery's unexplored territory:**

1. **Suppression Fire** — Pin creatures in place by flooding their space with arrows, forcing them to take cover rather than advance freely across open ground.
2. **Wind Reading** — Study environmental conditions (wind direction, light angle, shadow geometry) to earn a window where all situational banes on your ranged attacks are stripped away.
3. **Trapline** — Set a spring-loaded arrow trap using Archery technique. Fires automatically when a creature crosses the trigger cord; distinguishable from Survival's traps by using AGI + Archery statistics and requiring ammo.
4. **Overwatch Position** — Declare a firing lane before combat starts; creatures that enter it trigger a free attack before completing their movement.
5. **Trick Shot / Ricochet** — Strike targets behind cover by deflecting projectiles off walls or around obstacles. Extreme precision, extreme risk.
6. **Utility Arrows (Smoke, Fire, Signal, Rope)** — Expand beyond combat ammo into environmental tools: smoke arrows for concealment, fire arrows for hazards, rope arrows for traversal and scaling.
7. **Quarry Marking** — Designate a single target and gain sustained tracking and combat bonuses against them — the favored-quarry Ranger fantasy.
8. **Volley Shot** — Fire a spread of arrows targeting a zone, hitting all creatures in the area rather than a single target.
9. **Master Sniper** — Spend a full round stationary for a devastating single attack from concealment, bypassing AV or guaranteeing a minimum Success Level.
10. **Archery Competitions** — A social/downtime talent tied to hunting trials, accuracy contests, and the cultural authority the master archer holds in warrior-societies.
11. **Arrow Caller** — Direct coordinated fire: signal allies to loose at the same target, granting the group a bonus against that creature for one round.
12. **Field Preparation** — Survey terrain before combat, mark firing positions and sight lines. When battle begins on prepared ground, the archer's group gains significant first-round advantages.

**Seeds eliminated at convergence:**

| Seed | Reason |
|------|--------|
| Trick Shot (5) | Sharpshooter already owns precision/cover-reduction; ricochet mechanics add complexity without a clear niche |
| Utility Arrows (6) | Ammo Specialist already handles special ammo types; utility arrows (smoke, signal) can extend Ammo Specialist R3 rather than requiring a new talent |
| Volley Shot (8) | Rapid Shot already serves the multi-attack fantasy; area-of-effect ranged attacks should remain rare in the system |
| Master Sniper (9) | Sharpshooter + Disciplined Archer already reward the long-stationary-shot playstyle; a third sniper talent cannibalizes those builds |
| Archery Competitions (10) | Thin as a standalone talent at current priority; better addressed as a design note (Archery could anchor social scenes and downtime challenges as a future skill-integration pass) |
| Arrow Caller (11) | Team coordination belongs to Education/Influence/Warlord; Archery's team contribution comes through zone control, not command |

---

### Phase 2 — Converge: Selected Designs

**Three additions beyond Art of Archery R5 and Predator's Mark:**

| Design | Path | Gap Filled | Key Reasoning |
|--------|------|------------|---------------|
| **Covering Fire** | Basic R1–R3 | Zone control / suppression | No existing Archery talent denies free movement at range; seeds 1 + 4 merged; Hoplite + Ranger identity support |
| **Windreader** | Basic R1–R3 | Non-combat utility + Travel | Archery's only travel integration; the "sightline" and "wind-reading" aspects given mechanical weight; seeds 2 + 12 merged |
| **Trapline** | Basic R1–R3 | Preparation / ambush; trapline aspect | Named Archery aspect with zero talent representation; mechanically distinct from Survival's Trap Maker (uses AGI + Archery, requires ammo) |

**On utility ammo:** Smoke, fire, and signal arrows are a design gap, but adding a new talent would dilute Ammo Specialist. The cleaner fix is a future extension of Ammo Specialist R2 or R3 to include utility types alongside barbed/bodkin/blunt. No new talent needed.

**Note — Expert Slinger R2 underperformance:** Expert Slinger R2 adds Archery to damage only at close or short range — the range bracket where the slinger is most vulnerable to Opportunity Attacks from melee threats. The damage bonus is in direct competition with the danger zone. Flagged for future review; not redesigned here.

---

### Phase 3 — Develop: Full Talent Designs

---

#### 5.1 Art of Archery R5 — Signature Extension

> **Path:** Signature (R1–R5) | **Archetype(s):** Ranger, Slinger | **Role:** Combat (offense)

**Design rationale:** Mirrors Art of Fighting R5 (analysis §9.4: "once/day treat Fighting roll as Critical Success"). Declaring before the roll means a miss still expends the daily use — a genuine commitment decision that earns its power. The legendary shot fantasy: the arrow that finds its mark against all odds. Natural capstone for the Combat Arts breadth Art of Archery builds over four ranks.

**Publication text (R5 only; R1–R4 published):**

**(Rank 5):** Once per day, declare *The Perfect Shot* before making an Archery attack roll. If the attack succeeds, treat the result as a Critical Success for all purposes, including damage calculation, triggered ability conditions, and Combat Art effects that require a specific Success Level.

**Validation:**
- R5 budget: once per day, outcome-reversal (SL → Critical) → ✓
- No internal scaling: fixed SL upgrade, not a damage formula → ✓
- Trigger and limit explicit: "declare before rolling; once per day" → ✓
- Does not interact with Disciplined Archer's reroll (different resource, different decision point) → ✓

---

#### 5.2 Predator's Mark — High-Level Cross-Skill Talent

> **Path:** High-Level (R4–R5) | **Prerequisites:** Archery 3, Survival 3 | **Archetype(s):** Ranger | **Role:** Combat (offense + control) + Utility (tracking)

**Design rationale:** The Ranger's quarry mechanic. R4 enables the hunt — the mark identifies the target and provides a combat advantage as long as the archer can see them. R5 enables the chase — the hunter still knows which way their quarry fled even beyond line of sight, and can unleash burst damage once per day when the hunt concludes. The cross-skill prerequisite rewards the natural Ranger build path (Archery 3, Survival 3 are both expected investments) without locking out other builds entirely.

**Publication text:**

**(Rank 4):** As a Quick Action, mark one creature you can see within long range. While the mark is active and you can see the marked creature, your attacks against them gain +1 boon and ignore light cover. The mark lasts for a short duration or until you mark a different creature. Only one mark can be active at a time.

**(Rank 5):** While your mark is active, you always know the marked creature's approximate direction and whether they are within long range, even if you cannot see them. Once per day, your attacks against your marked creature deal +3 damage (ability bonus) for one round.

**Validation:**
- R4 budget: Quick Action setup, short duration (~1 min), one mark at a time → encounter-shaping, not overwhelming → ✓
- R5 budget: narrow permanent sense (single target only); +3 ability bonus once per day (fixed, not scaling) → ✓
- +1 boon: conditional on sight + active mark; properly gatekept situational benefit → ✓
- +3 damage: ability bonus, fixed → ✓ Anti-pattern compliant
- "Approximate direction": intentionally imprecise, GM adjudicates; bounded menu (direction + within/outside long range) avoids open-ended "GM decides" → ✓
- Does not overlap with Sharpshooter (range/precision) or Reflexive Shooter (reactive shots) → ✓

---

#### 5.3 Covering Fire — Basic Talent

> **Path:** Basic (R1–R3) | **Archetype(s):** Ranger, Hoplite (support) | **Role:** Control (zone denial, suppression)

**Design rationale:** Zone control is the named gap in Archery's role distribution and the system-wide identity tag "zone control" has no talent representation in Archery. Covering Fire creates a cost-benefit decision at R1 (sacrifice damage for suppression), removes that cost at R2 making suppression freely available with a frequency cap, and spreads the effect to nearby targets at R3. The directional movement restriction ("cannot move closer") captures the historical suppression dynamic: enemies can retreat or move laterally but cannot advance freely across open ground while under withering fire. The attack bane reflects the "keeping their head down" reality of sustained ranged pressure.

**Publication text:**

**(Rank 1):** Once per scene, when you hit a creature with a ranged weapon, you can choose to deal no damage and instead suppress the target. A suppressed target cannot spend Movement to move closer to you and suffers +1 bane on all attack rolls until the end of their next turn.

**(Rank 2):** You can use Covering Fire twice per scene, and your attacks deal normal damage even when you choose to suppress.

**(Rank 3):** When you suppress a target with Covering Fire, all creatures within close range of the suppressed target (other than the suppressed target) must roll Agility + Athletics vs. TN 8 or also be suppressed until the end of their next turn.

**Validation:**
- R1: once per scene with cost (no damage) → ✓ R1 budget
- R2: twice per scene, cost removed → ✓ Clear payoff without new capability
- R3: area spread via skill check; frequency governed by R2's twice-per-scene limit → ✓ Mastery
- Suppression is an inline state (not a named condition keyword) → ✓ No condition-list abuse
- Does not overlap with Sharpshooter (precision/bane-removal, different trigger and fantasy) → ✓
- Does not overlap with Reflexive Shooter (reaction shots on enemy movement — inverts the role: they shoot at you, not you suppressing their movement) → ✓
- No damage bonus, no "+skill rank" scaling → ✓ Anti-pattern compliant

---

#### 5.4 Windreader — Basic Talent

> **Path:** Basic (R1–R3) | **Archetype(s):** Ranger, Scout | **Role:** Utility (Travel, exploration, pre-combat positioning)

**Design rationale:** Archery's only non-combat talent. R1 slots Archery into the Travel system's Scout role — reading sight lines and wind patterns to find ambush points is the archetypal Ranger wilderness function. R2 splits: a once-per-scene wind-read strips all situational banes from the next shot (the "I waited for the perfect moment" fantasy), while a 1-minute observation passive provides exploration value at zero action cost. R3 rewards the player who scouted their ground — the prepared archer is never surprised in familiar terrain and gets the opening shot. Windreader's observation ability reads movement patterns and open-field presence; it complements Eagle Eye (Perception — fine detail, hidden creatures) rather than replacing it.

**Publication text:**

**(Rank 1):** When acting as Scout during Travel, you can roll Agility + Archery in place of the normal Scout roll. When you succeed, your party gains advance warning of any ambush at that checkpoint — you and all allies are not surprised and act normally in the first round of any combat that begins at that checkpoint.

**(Rank 2):** Once per scene, as a Quick Action before making a ranged attack, study the wind and light conditions. Your next ranged attack roll this turn ignores all situational banes (from range, cover, weather, and darkness).
After spending at least 1 minute in calm observation of an area without taking any other actions, you learn the approximate position and count of any creatures within long range that are in the open or actively moving.

**(Rank 3):** You are never surprised in terrain you have personally scouted within the last scene. Additionally, once per scene at the start of any combat in such terrain, you can make one free ranged attack against one creature within long range before initiative is determined.

**Validation:**
- R1: passive skill substitution (Travel only) + conditional ambush protection → ✓ Minor always-on R1 passive
- R2: once per scene Quick Action (combat) + unlimited passive requiring 1-minute inaction (exploration; the inaction cost is the gate) → ✓ R2 budget
- R3: always-on in scouted terrain (passive) + once-per-scene free pre-combat attack → ✓ R3 mastery
- "Approximate position and count" is intentionally limited (open/moving only; not a detection pierce) → ✓ Doesn't replicate Stealth's concealment or Perception's Danger Sense
- "Scouted within the last scene" uses the standard scene duration (~1-hour arc) → ✓
- Travel system integration: Scout role via Archery fills §5.7 identified gap → ✓
- No damage bonus, no internal scaling → ✓ Anti-pattern compliant

---

#### 5.5 Trapline — Basic Talent

> **Path:** Basic (R1–R3) | **Archetype(s):** Ranger, Engineer | **Role:** Control (preparation, ambush) + Utility

**Design rationale:** The "trapline" aspect is listed in Archery's skill identity but has zero talent representation. Distinct from Survival's Trap Maker: this uses AGI + Archery for the attack roll (not Survival), requires ammo supply, and fires a ranged weapon rather than relying on physical force (deadfall, snare, pit). The Ranger setting a perimeter of spring-loaded crossbows around camp is a different fantasy from the Survivalist digging pit traps. Engineer archetype (Crafting, Education, Archery, Perception) accesses this naturally alongside Survival's Trap Maker. R1 grounds the talent in out-of-combat preparation; R2 scales quantity and adds a tactical restraint option; R3 enables in-combat deployment for emergency use and introduces the signal variant for camp security and warning systems.

**Publication text:**

**(Rank 1):** Outside of combat, when you have at least 10 minutes undisturbed, you can set one Trapline — a taut cord attached to a loaded shortbow, hand crossbow, or similar ranged weapon on a spring mechanism. Any creature that crosses the Trapline's trigger zone activates an immediate attack roll using your Agility + Archery, dealing damage as if you had fired that weapon. The Trapline can be detected with a careful Perception check (TN 10) and disarmed with a careful Agility check (TN 10). It remains active until triggered, disarmed, or your next long rest. You can maintain one active Trapline at a time.

**(Rank 2):** You can maintain up to three active Traplines at a time. When a Trapline triggers, the target must also roll Agility + Athletics vs. TN 8 or be briefly restrained. You can now set a Trapline during a short rest.

**(Rank 3):** Once per scene during combat, you can set a Trapline as a Quick Action in any adjacent space or passageway within close range. Additionally, you can build Signal Traplines — these deal no damage but immediately alert you and all allies within medium range when triggered and briefly daze the creature that sets them off.

**Validation:**
- R1: out-of-combat preparation, single use at a time, long-rest recovery → ✓ R1 scope
- R2: fixed count increase (1 → 3, not scaling) + official condition (briefly restrained) + short-rest access → ✓ R2 payoff; fixed number, no "+skill rank" formula
- R3: once-per-scene Quick Action in combat (conditional — creature must cross the space) + signal variant → ✓ R3 mastery
- "Briefly dazed" at R3: dazed is an official condition → ✓
- Mechanically distinct from Survival's Trap Maker: uses AGI + Archery roll (not Survival), requires ammo, fires a loaded ranged weapon → ✓
- Engineer archetype supported: Archery is Engineer's second skill; Trapline + Siege Engineer prestige talent (§8.5) form a natural capstone progression → ✓
- No damage bonus, no internal scaling → ✓ Anti-pattern compliant

---

---

#### 5.6 Phantom Strike — High-Level Cross-Skill Talent

> **Path:** High-Level (R4–R5) | **Prerequisites:** Archery 3, Stealth 3 | **Archetype(s):** Slinger, Ranger | **Role:** Combat (offense + concealment)

**Design rationale:** The "shadow archer" cross-skill fantasy — an archer who attacks from hiding without ever becoming a targetable presence on the battlefield. The current talent pool has no talent that modifies the Stealth-and-ranged-attack interaction. By default, a hidden attacker is revealed after hitting. Phantom Strike inverts that default: R4 costs a once-per-scene use for concealment-preservation on hit; R5 is the legendary turn-long "ghost" state that the stealthy slinger or ranger earns through five ranks of combined investment. Cross-skill prerequisites (Archery 3 + Stealth 3) encode the dual investment — this is a prestige build capstone, not a free upgrade. An active enemy countermeasure (search + Perception check) is always available to prevent auto-win scenarios.

**Publication text:**

**(Rank 4):** Once per scene, the first time you attack with a ranged weapon from hiding during that scene, you are not automatically revealed regardless of whether you hit or miss. On a hit, creatures within close range of the target know the attack came from your general direction but cannot pinpoint your position. They must spend Movement to search and succeed on a Perception check against your Stealth to locate you.

**(Rank 5):** Once per day, declare *Shadow Volley* before making any action on your turn. Until the start of your next turn, none of your ranged attacks reveal your hiding position. Enemies can only locate you by spending Movement to physically search your area and succeeding on a Perception check against your Stealth. Shadow Volley ends immediately if you take an action that would normally break hiding.

**Validation:**
- R4: once per scene; concealment-preservation with active enemy countermeasure (search + Perception check) → R4 budget ✓
- R5: once per day; full-turn window with explicit termination condition → R5 budget ✓
- Not supernatural: uses the Stealth system's existing Perception-vs-Stealth framework → bounded ceiling ✓
- Enemy countermeasure always available — prevents auto-win → ✓
- Requires being hidden before activation (does not grant initial concealment) → ✓ Dependent on Stealth skill investment
- No overlap with Sharpshooter (precision/range) or Disciplined Archer (reroll/frequency) → ✓
- No damage bonus, no "+skill rank" scaling → ✓ Anti-pattern compliant

---

#### 5.7 Living Cyclone — High-Level Talent

> **Path:** High-Level (R4–R5) | **Prerequisites:** Archery 3, Athletics 2 | **Archetype(s):** Slinger | **Role:** Combat (offense + mobility)

**Design rationale:** Slinger's pillar identity ("mobile, elusive, slings and thrown weapons") is fully expressed at Basic R3 through Expert Slinger, but Expert Slinger R3 only grants one free Movement after a single attack once between turns — modest and reactive. At R4–R5 the grandmaster Slinger should be a combat force of nature: a fighter who never stands still, attacks multiple targets in a single fluid sequence, and cannot be cornered. Living Cyclone extends Expert Slinger's movement motif: R4 adds an extra attack (not just movement) and doubles the frequency to twice per scene; R5 elevates this into Cyclone State — a scene-long mode that makes the Slinger genuinely terrifying in open terrain. Athletics 2 is an accessible prerequisite for the target build (Athletics is Slinger's third skill). The +2 ability bonus at R5 is fixed and limited to thrown weapons during a once-per-day state, keeping it well within the combat-talent damage audit.

**Publication text:**

**(Rank 4):** Twice per scene, when you hit with a thrown weapon, you can immediately spend 1 Movement without provoking Opportunity Attacks and then make one additional attack with a thrown weapon against any target within range.

**(Rank 5):** Once per day as a Quick Action, enter *Cyclone State*. While active, you can spend Movement between your attacks on your turn without provoking Opportunity Attacks, your thrown weapon attacks ignore light cover, and they deal +2 damage (ability bonus). Cyclone State lasts until the end of the scene and ends early if you are restrained or knocked prone.

**Validation:**
- R4: twice per scene; extra attack gated on a hit (no free attacks) → R4 encounter-shaping budget ✓
- R5: once per day, Quick Action activation; scene-long passive with explicit termination conditions → R5 session-defining budget ✓
- +2 damage: ability bonus, fixed, thrown weapons only, only during Cyclone State → ✓ Anti-pattern compliant
- Light cover ignore: situational benefit scoped to Cyclone State; does not obsolete cover mechanics for other contexts → ✓
- Termination conditions (restrained, prone) are named game states → ✓ No GM-fiat termination
- Movement-between-attacks pattern established by Expert Slinger R3; R5 generalizes it for all attacks in state → ✓ Progressive escalation
- Cross-skill prerequisite (Athletics 2) accessible to Slinger build → ✓ Not overly gatekept; bar rewards natural multi-skill investment
- No interaction with Expert Slinger R3 abuse: Expert Slinger R3 grants 1 Movement once between turns outside state; Living Cyclone R5 covers all-attack movement during state — different contexts → ✓

---

### Updated Talent Pool Summary

| Talent | Path | Max Rank | Status | Role | Notes |
|--------|------|----------|--------|------|-------|
| Ammo Specialist | Basic | R3 | Published | Combat | Supply advantage; special ammo at R2; +Archery damage at R3 |
| Art of Archery | Signature | **R5** | R1–R4 published; **R5 proposed** | Combat | Combat Art access; The Perfect Shot at R5 |
| **Covering Fire** | Basic | R3 | **New** | Control | Suppression + zone denial; area spread at R3 |
| Crossbow Mastery | Basic | R3 | Published | Combat | Quick reload; AV ignore; stun on hit |
| Disciplined Archer | Basic | R3 | Published | Combat | Reroll + Combat Art frequency |
| Expert Slinger | Basic | R3 | Published | Hybrid | Supply reroll; +Archery damage at R2; free movement at R3 |
| **Living Cyclone** | High-Level | R5 | **New** | Combat | Slinger mobility mastery; hit-and-move extra attack; Cyclone State once/day; requires Archery 3 + Athletics 2 |
| **Phantom Strike** | High-Level | R5 | **New** | Combat + Control | Concealment-preserved ranged attacks; ghost-mode once/day; requires Archery 3 + Stealth 3 |
| **Predator's Mark** | High-Level | R5 | **New** | Combat + Utility | Quarry mark + direction sense; requires Archery 3 + Survival 3 |
| Rapid Shot | Basic | R3 | Published | Combat | Two attacks with bane; bane removal at R2; marked on hit |
| Reflexive Shooter | Basic | R3 | Published | Combat | Melee-range adaptation; Opportunity Attacks at close range |
| Sharpshooter | Basic | R3 | Published | Combat | Range bane removal; marked on stationary shot |
| Strong Grip | Basic | R3 | Published | Combat | Heavy ranged weapon; +½ STR damage at R3 |
| **Trapline** | Basic | R3 | **New** | Control + Utility | Spring-loaded traps via Archery statistics; in-combat deploy at R3 |
| **Windreader** | Basic | R3 | **New** | Utility | Travel Scout via Archery; bane removal; pre-combat free attack in scouted terrain |

**Role distribution (proposed pool of 15):**

| Role | Count | % |
|------|-------|---|
| Combat (offense/reactive) | 8 | 53% |
| Control (zone/suppression/concealment) | 2 | 13% |
| Utility (travel/exploration) | 2 | 13% |
| Hybrid (combat + other) | 3 | 20% |

**High-Level talent coverage (3 total — target reached):**

| Talent | Cross-Skill Gate | Archetype Served | Fantasy |
|--------|-----------------|------------------|---------|
| Predator's Mark | Survival 3 | Ranger | The quarry hunter — mark it, find it, end it |
| Phantom Strike | Stealth 3 | Slinger, Ranger | The battlefield ghost — kills from shadows no one can search |
| Living Cyclone | Athletics 2 | Slinger | Mobile death — a whirlwind of thrown steel that never stops |

All named Archery aspects now have at least one talent: precision (Sharpshooter), range (Sharpshooter, Disciplined Archer), volley (Rapid Shot), aim (Disciplined Archer), steady-breath (Strong Grip), sightline (Windreader), wind-reading (Windreader), trapline (Trapline).

---

> **Status:** Deep design phase complete. Seven talents designed (Art of Archery R5, Predator's Mark, Covering Fire, Windreader, Trapline, Phantom Strike, Living Cyclone). High-Level target of 3 reached. Ready for owner review. Publication requires: update Art of Archery in `docs/03-statistics/06-talents/archery.md` (add R5); add six new talent entries to the same file.
