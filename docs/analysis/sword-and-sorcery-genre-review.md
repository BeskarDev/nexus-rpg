# Sword & Sorcery Genre Review — Rules & Mechanics

> **Scope:** Core resolution system, wounds/HP/Fatigue, rest and recovery, magic (Arcana and Mysticism), progression, folk traits, talents, and the travel and challenge sub-systems. All references are to the published ruleset as of April 2026.

---

## Executive Summary

Nexus RPG has a **structurally sound S&S skeleton.** The wound system, Fatigue attrition, magic risk (Wild Surges and Penance), no-alignment design, and slow XP progression are all genre-correct; several are strong enough to serve as selling points of the system. The travel sub-system is a genuine strength that most OSR-adjacent games claiming S&S proximity don't match.

The two most pressing genre problems are mechanical, localized, and fixable without architectural changes:

1. **Short Break restores full HP freely.** This collapses non-wound encounter attrition, turning the wound system into a trap that only triggers when players are unlucky within a single fight. The proposed fix is a *Recoveries* resource — a Fortitude-based daily pool spent during short breaks to restore HP or Focus. This preserves the short break's purpose while creating real multi-fight attrition and a meaningful HP/Focus trade-off for spellcasters: the sorcerer who burns Recoveries on casting arrives at the third fight without a HP buffer.

2. **Focus fully recharges on a night's rest.** Magic becomes a predictable daily budget — the exact "safe recharge cycle" S&S rejects. Tiering Focus recovery (partial on a camp night, full only at an inn or safe haven) shifts magic from a managed schedule to a pressured resource across an adventure arc, while keeping it viable for regular play.

Two structural additions would meaningfully deepen genre feel without touching core resolution:

3. **Vices.** The Motivation system places characters in the material world with personal drives but has no shadow side. S&S characters are defined by their compulsions and flaws as much as their goals. Adding Vices as bidirectional character traits — invokable by both player and GM — grounds the Resolve economy in the genre's moral texture and creates the pressure that generates drama between encounters, not just during them.

4. **Persistent Arcane Corruption.** Arcana's mutation track exists but is optional. Reclassifying it as standard for rank 3+ casters costs nothing to implement and produces the genre's defining sorcerer identity.

Everything else is medium-priority dilution or framing-level noise.

---

## Phase 1 — S&S-Aligned Elements (What Already Works)

### 1.1 Wound System with Lasting Mechanical Injury

**Mechanic:** Three wounds before dying. Each wound is a permanent attribute bane (Broken Bone, Concussion, Head Injury, etc.) that persists until treated by a success on a night's rest roll, and then permanently healed only on a subsequent hard Strength + Fortitude roll under the same conditions. Treating first, then healing — two-stage investment.

**S&S behavior produced:** Combat has lasting consequences that linger across sessions. A second wound before the first heals is a compounding mechanical crisis. Death is three wound-triggers away and each one requires intentional recovery work to erase.

**Assessment:** Strong as-is. This is the genre's core injury model and Nexus implements it correctly. The two-stage treatment/healing split is particularly well-designed — it mirrors field medicine vs. real recovery.

---

### 1.2 Fatigue as HP-Attrition Layer

**Mechanic:** Fatigue points (max 6) reduce maximum HP by 2 each. 6 Fatigue = unconscious. Sources: abilities, journey strain, fleeing combat (1 Fatigue), Deprived condition (2/day), suffocation, and casting below 0 Focus (immediate HP damage). Night's rest removes up to 2; full rest removes all.

**S&S behavior produced:** Characters wear down across sessions and throughout difficult stretches of play. Fleeing costs something. Going without food or water is mechanically punishing, not just narrated flavor. The interaction with the HP pool means Fatigue directly increases wound susceptibility.

**Assessment:** Strong as-is. The Deprived condition (2 Fatigue/day, +1 bane all rolls, only ½ HP from short breaks) is excellent. The Fatigue-from-fleeing mechanic correctly charges a toll for the most anti-heroic outcome.

---

### 1.3 No Alignment System

**Mechanic:** Characters have a *Motivation* — a personal drive (Duty, Fame, Fortune, Freedom, Justice, Knowledge, Power, Redemption, Revenge, Survival). No cosmic good/evil axis. No virtue points.

**S&S behavior produced:** Moral choices are consequence-driven, not score-driven. The Motivation system rewards characters acting in their own self-interest at the right moment, not for being traditionally heroic.

**Assessment:** Strong as-is. The motivation list is all personal-scale stakes, which is correct for S&S. "Justice" reads as vendetta, not cosmic paladiny, given the context.

---

### 1.4 Arcane Wild Surge Table

**Mechanic:** When an Arcana user blunders on a rank 1+ spell, they roll 1d100 on the Wild Surge table. One hundred entries of environmental and personal chaos effects — area damage to everyone including allies, teleportation, polymorph, summoning, reality distortion. Effects scale by spell rank. Optional permanent mutation track with four stages (Subtle → Noticeable → Empowered [trade-off] → Transformed [significant trade-off + power]).

**S&S behavior produced:** Arcane magic is genuinely dangerous. Blundering at high ranks against powerful targets creates catastrophic results that affect everyone in the scene, including the caster's party. The mutation track (even optional) creates a long-term consequence model where sorcerers become increasingly marked by their power.

**Assessment:** Strong mechanic, weak delivery. The mutation track is optional, which buries the most S&S-appropriate element (see Phase 4). The table itself is well-designed.

---

### 1.5 Mystic Penance & Oath System

**Mechanic:** Mystic blunders on rank 1+ spells require penance ranging from 1-minute offerings to full-day rituals before the misfired spell can be cast again. Breaking the tradition oath (deliberately or repeatedly transgressing its tenets) removes all spellcasting access until atonement.

**S&S behavior produced:** Divine magic isn't free. Misfires have cascading schedule costs (a Ritual penance replaces a night's rest with a bad night). The oath creates social and behavioral friction — a caster aligned with Twilight is bound to "embrace transformation" and "never dismiss messages in shadows." Violating this breaks the channel.

**Assessment:** Solid, though the Penance table could skew heavily toward recoverable results (Revelation on a 1 is a bonus; Dissonance on a 3 is minor). The oath transgression rule is the most S&S-appropriate element and could be foregrounded more.

---

### 1.6 Focus-Below-Zero HP Damage

**Mechanic:** Spending Focus that would take you below 0 instead deals 2 HP per point below 0, ignoring AV. If this drops HP to 0, suffer Fatigue.

**S&S behavior produced:** Desperate casting is physically dangerous on a mechanical level. The incentive to push magic beyond safe limits (because a spell might win the fight) is real, and the cost is real immediate HP damage and potential Fatigue. This is the "overreaching sorcerer burns himself out" trope with actual rules teeth.

**Assessment:** Strong as-is.

---

### 1.7 Supply Die System and Travel Sub-System

**Mechanic:** All items — including rations, torches, and ammo — track exactly **3 uses**. When a supply check is called (by a daily event, an ammo weapon property, etc.), roll the item's Durability die (typically d6); on a 1–3, spend 1 use. When the third use is spent, the supply is depleted. Kits and non-supply gear degrade the same way on failed Durability checks. The travel sub-system uses challenge dice for journey length, daily navigation and scouting rolls against terrain-based difficulties (Medium 8 to Extreme 14), checkpoint types including ambushes and extreme climate hazards, and a daily event table with resource drain, wear and tear, and encounter threats.

**S&S behavior produced:** Overland travel has real procedural danger. Supply attrition creates pressure before characters arrive at their destination. Extreme climate checkpoints require Fortitude rolls or suffer Fatigue. Hostile terrain stretches out journeys and burns through limited resources.

**Assessment:** This is a genuine strength. The travel system has more mechanical depth than most games claiming genre proximity to S&S. The supply die degradation model is elegant.

---

### 1.8 Bounded Power Ceiling

**Mechanic:** Maximum defenses hard-capped at 16. Maximum HP hard-capped at 50. Damage formula (½ attribute + weapon bonus − AV, min 1) scales against creatures built to the same tier. Attributes cap at d12 (d12+1 for Monstrous).

**S&S behavior produced:** Characters at maximum level do not become demigods. A level 10 character has roughly 44 HP, a max defense of 16, and can still be killed by a concentrated attack. Level-appropriate enemies remain threatening at all points in the campaign.

**Assessment:** Strong structural choice. The fact that both ends of the power scale use the same resolution mechanic with the same caps means genre feel doesn't drift as characters advance.

---

### 1.9 Slow XP Progression

**Mechanic:** 1–2 XP per session; 90 XP required for level 10; per-skill XP caps tightly gated by level (rank 5 unreachable until level 9). Skills cost cumulative XP, not flat per rank.

**S&S behavior produced:** Characters remain in a grounded register for a long time. Power spikes are structurally prevented by the level-skill-cap linkage. A new character cannot dump all their XP into a single skill to become an expert instantly.

**Assessment:** Well-calibrated. The 2 XP/session variant (mentioned in the dice analysis) would maintain this even for groups that play less frequently.

---

## Phase 2 — Conflicts & Drift (What Pulls Away from S&S)

### 2.1 Short Break Restores Full HP

| Property | Value |
|---|---|
| **Mechanic** | Short break (5–10 minutes of calm) restores all HP |
| **Classification** | 🔴 Critical |

**Genre-incompatible behavior:** A single short break between encounters fully resets the HP buffer, as long as the characters are in a "safe" location. This means that at any point players can get to 0 HP, survive (no wound triggered), and within the span of a single delving turn, return to peak physical condition.

This collapses the tactical attrition model. The wound system is supposed to be the permanent consequence of depleted HP, but if HP refreshes fully after 5–10 minutes, wounds are only triggered when characters are unlucky within a single encounter — not worn down across multiple. Two back-to-back fights become functionally equivalent to one fight followed by 10 minutes of hiding.

In S&S, taking a sword across the ribs doesn't go away after catching your breath. The entire middle layer of resource pressure — the one that makes individual fights feel consequential at the multi-encounter scale — is absent.

---

### 2.2 Focus Fully Recharges on Night's Rest

| Property | Value |
|---|---|
| **Mechanic** | Night's rest restores all Focus; Bad Night restores ½ max Focus |
| **Classification** | 🟡 Medium |

**Genre-incompatible behavior:** Magic is a daily budget that reliably resets every morning. This is structurally identical to the D&D spell slot model that S&S design explicitly rejects. A caster who knows they will have a safe camp tonight can calculate exactly how much Focus they can spend today, eliminating the "magic as dangerous and unpredictable" feel at the session scale.

The Focus-below-zero HP damage creates meaningful within-day risk. But the overnight full reset means this risk is bracketed and predictable — mages know the next morning wipes the slate. There is no accumulating magic debt across days.

---

### 2.3 Divine Rites Rank 3 — Full Focus Refresh During Short Break

| Property | Value |
|---|---|
| **Mechanic** | Divine Rites R3 + short break = regain all Focus |
| **Classification** | 🟡 Medium |

**Genre-incompatible behavior:** A Mysticism character with Divine Rites at rank 3 can, during a 5–10 minute short break, regain all Focus. This is the 5e short-rest recharge problem transplanted directly into the system. Combined with the short break restoring all HP, a high-rank mystic can effectively reset both their health and their magic resource in minutes between every encounter.

The talent requires Mysticism rank 3 (a genuine investment), which limits the frequency, but once available it eliminates the entire tension model of the resource system for that character.

---

### 2.4 Pact of Devotion (Protection) Rank 2 — Instant Wound Removal

| Property | Value |
|---|---|
| **Mechanic** | Spend 10 HP from daily pool to instantly heal one Wound from any target (once per day per creature) |
| **Classification** | 🟡 Medium |

**Genre-incompatible behavior:** This talent allows Wounds to be removed during a scene, outside of the rest/recovery cycle. While it has a resource cost (the HP pool regenerates each night's rest), it bypasses the treatment+healing two-stage process that gives wounds their mechanical permanence.

In S&S, injuries that need to be treated at camp are part of the genre's rhythm. The Protection pact makes wounds feel more like an HP sub-pool than lasting scars. The once-per-day limit means it doesn't break the system, but it creates an easy out for the single most narrative consequence in the game.

---

### 2.5 Divine Sense Rank 2–3 — Status Condition Immunity

| Property | Value |
|---|---|
| **Mechanic** | Rank 2: personal immunity to charmed/frightened/poisoned while conscious. Rank 3: all allies within short range share the immunity. |
| **Classification** | 🟡 Medium (Rank 3 is the primary concern) |

**Genre-incompatible behavior:** Group-wide immunity to three conditions from a passive aura is a classic High Fantasy "divine champion" mechanic. S&S characters can be afraid, poisoned, and manipulated — that vulnerability is part of what makes them compelling. An aura that preemptively removes narrative threat from an entire party for free (no action, no resource cost beyond the talent investment) is plot-armor delivered at the group level.

Rank 2 (personal immunity) is milder — the genre does include hard-bitten characters who are hard to unsettle. Rank 3 extends this without any additional cost.

---

### 2.6 Oracle / Foresight Design Direction

| Property | Value |
|---|---|
| **Mechanic** | Oracle archetype identity: "Prophecy, divination, fate." Foresight (Insight) talent: currently a stub described as "instinctively predicting the future." |
| **Classification** | 🟡 Medium |

**Genre-incompatible behavior (latent):** The Oracle is framed as "the party's guide" with "destiny guidance" and "fate-bound wisdom." If the Foresight talent develops as written — giving reliable, actionable glimpses of the future — it becomes the "infallible oracle / prophetic guidance system" pattern that structurally undermines the stakes-based play S&S requires. If a character can reliably preview the outcome of upcoming scenes, surprise, consequence, and resource risk all deflate.

The concern is latent (the talent isn't finalized) but the design direction is set by the archetype framing and needs a clear constraint before development.

---

### 2.7 Hard to Kill Rank 2 — Ignore One Wound per Day

| Property | Value |
|---|---|
| **Mechanic** | Once per day, choose to ignore a Wound you would suffer |
| **Classification** | 🟢 Minor |

**Genre-incompatible behavior:** This is plot armor as a talent. Wounds being the final consequence layer of combat, and ignoring one negates that layer entirely in a single exchange. Orc Folk Trait "Pride above Death" does the same thing (once per day). These are not equivalent to "resist the damage" or "reduce it" — they remove the consequence after it has been determined.

The investment cost (rank 2 Fortitude, or being an Orc) limits frequency but doesn't remove the genre concern.

---

### 2.8 Resolve Framing as "Divine Favor"

| Property | Value |
|---|---|
| **Mechanic** | Resolve rules text: "represents an adventurer's tenacity, divine favor, and will to fight on." Flavor: "the well of divine favor runs deeper than you know. This is the moment when heroes are forged." |
| **Classification** | 🟢 Minor |

**Genre-incompatible behavior:** The mechanic itself is fine for S&S — a small pool of re-rolls earned through personal drives and creative play, not virtue. The framing wraps it in "divine favor" and "heroes are forged" language that implies cosmic endorsement of the PCs' cause. These are framing-level issues without mechanical teeth, but they shape player expectations of the system.

---

### 2.9 Character Progression — "Path of the Gods" Framing

| Property | Value |
|---|---|
| **Mechanic** | Progression flavor: "Through trial and sacrifice, the worthy rise from dust to stand among legends. This is the way of all who would walk the path of the gods." Level titles: Heroic (8), Epic (9), Legendary (10). |
| **Classification** | 🟢 Minor |

**Genre-incompatible behavior:** High Fantasy positions characters as ascending toward godhood; S&S positions them as exceptional humans who remain mortal and vulnerable. The level-title arc and flavor text suggest divine apotheosis rather than earned reputation. No mechanical issue, but the aspiration it frames is HF.

---

### 2.10 Motivation System — No Shadow Axis

| Property | Value |
|---|---|
| **Mechanic** | Characters choose a single Motivation (Duty, Fame, Fortune, Freedom, Justice, Knowledge, Power, Redemption, Revenge, Survival) invoked once per session to earn +1 Resolve on a successful roll |
| **Classification** | 🟡 Medium |

**Genre-incompatible behavior:** S&S characters are as defined by their flaws as their drives. Conan's pride, Elric's addiction to Stormbringer, the Grey Mouser's recklessness — these aren't decorative backstory, they are the source of drama. The current Motivation system correctly places characters in the material world with personal stakes, but it only fires on an upside trigger: invoked when the player chooses to lean in, and only rewarded if the roll succeeds. There is no mechanic for the GM to leverage a character's weakness as pressure, and nothing that fires against the player's interest.

In S&S, at least one moment per session should arise where a character's worst quality creates a problem. The current system has no mechanical surface for this. The Resolve economy rewards self-interest but never makes characters pay for it — and in S&S, cost is always coming.

---

## Phase 3 — Action Items (Prioritized)

### 3.1 Introduce Recoveries — Replace Flat Short Break HP with a Managed Resource

| | |
|---|---|
| **Addresses** | Phase 2 items 2.1 (🔴 Critical), 2.3 (🟡 Medium) |
| **Priority** | High |
| **Type** | New mechanic (targeted addition) |

**What should change:**

Introduce **Recoveries** as a new character resource alongside HP, Focus, and Resolve.

**Maximum Recoveries:** 2 + Fortitude rank (2 at rank 0, up to 7 at rank 5). A typical starting character has 3–4.

**Spending a Recovery:** During a short break, spend 1 Recovery to choose one:
- Regain **½ your max HP**
- Regain **¼ your max Focus**

Multiple Recoveries may be spent during the same short break.

**Regaining Recoveries:**

| Rest Type | Recoveries Regained | Passive HP Regained |
|---|---|---|
| **Bad night** | ½ max (round down, min 1) | None |
| **Night's rest** (camp) | All | **¼ your max HP** |
| **Full rest** (inn/safe haven) | All | All HP |

Remove the existing short break rule "regain all of your HP." All other short break benefits (once-per-combat abilities, short-lasting effects) are unchanged.

**Deprived condition:** Restate as "you regain only ½ the HP you would normally gain from spending a Recovery on HP."

**Divine Rites integration:** Divine Rites uses Recoveries as its mechanism rather than operating independently:
- *Rank 1:* "During a short break, you can spend a Recovery to regain ½ your max Focus instead of recovering HP. You can trigger this a number of times per day equal to your Mysticism."
- *Rank 3:* "When combining Divine Rites and the short break ability, you regain all your Focus instead of ½ your max Focus when spending the Recovery." This maintains the rank 3 payoff while tying it to the shared resource budget; the free full-recharge exception is removed.

**Design goal:** Recoveries accomplish three things simultaneously:

1. **Multi-fight attrition.** The Recovery pool is finite per day. Characters who spend freely in early encounters face the third fight with a depleted buffer. The wound system now functions as intended — not as a single-fight spike failure but as the consequence of sustained pressure.
2. **The spellcaster's dilemma.** A caster who burns Recoveries on Focus early in the day arrives at later fights without HP recovery. This is the S&S sorcerer who pays with their body for their power — a structural identity, not narrated flavor.
3. **Fortitude relevance.** Fortitude becomes a meaningful investment for all archetypes including casters. A high-Fortitude mystic sustains both martial resilience and magical endurance longer than one who ignored physical training, creating a real build decision.

**Mechanical note:** Second Wind (Fortitude talent, Quick Action in-combat HP recovery once per scene) is unchanged — it is a separate in-combat tool and does not draw from Recoveries.

---

### 3.2 Tier Focus Recovery by Rest Quality

| | |
|---|---|
| **Addresses** | Phase 2 item 2.2 (🟡 Medium); works in tandem with 3.1 |
| **Priority** | High |
| **Type** | Targeted tweak |

**What should change:**

Replace the flat overnight Focus recovery with a tiered model:

| Rest Type | Focus Regained |
|---|---|
| **Bad night** | Up to **¼ max Focus** |
| **Night's rest** (camp) | Up to **½ max Focus** |
| **Full rest** (inn/comfortable haven) | **All Focus** |

Short break: no passive Focus recovery. Casters who need Focus mid-adventure spend a Recovery (see 3.1). Divine Rites adjustments are handled by 3.1 — the talent uses Recoveries as its mechanism, and the Rank 3 full-recharge exception is removed.

**Design goal:** Magic wears down across an adventure arc rather than resetting each morning. A caster who spends heavily on the way to a dungeon arrives at half-pool. Two consecutive camp nights in the field won't fully restore reserves — that requires reaching a safe, comfortable location with economic cost.

This is not intended to frustrate spellcasting. At ½ max Focus per camp rest, a rank 2 caster recovers 5–6 Focus — enough for 2–3 rank 1 spells the following day. The intended feeling is not "you can't cast" but "you can't waste it." Recoveries provide a supplementary in-adventure source for urgent situations, and full Focus recharge rewards actively seeking safety — which is very S&S. Characters have concrete reasons to spend money on inns beyond flavor.

**Integration with Phase 4.3 (Wealth Tiers):** Full Focus recovery only at a full rest gives the Comfortable/Prosperous Wealth Tier direct mechanical value for spellcasters, not just social access.

---

### 3.3 Change Pact of Devotion (Protection) Wound Healing to Treatment

| | |
|---|---|
| **Addresses** | Phase 2 item 2.4 (🟡 Medium) |
| **Priority** | Medium |
| **Type** | Targeted tweak |

**What should change:**

Replace "you can spend 10 HP from this ability to instantly heal one Wound or Fatigue from a creature" with "you can spend 10 HP from this ability to immediately treat one untreated Wound or remove one Fatigue from a creature."

A treated Wound still requires the hard Strength + Fortitude roll during rest to permanently heal. The treated Wound still reopens if HP drops to 0.

**Design goal:** In-scene divine intervention can stabilize and prepare an injury for recovery without trivializing the wound system's permanence. A field medic with divine power is a dramatic asset; a healer who removes wounds like items is a genre corruption.

---

### 3.4 Replace Divine Sense Rank 3 Immunity Aura

| | |
|---|---|
| **Addresses** | Phase 2 item 2.5 (🟡 Medium) |
| **Priority** | Medium |
| **Type** | Targeted tweak |

**What should change:**

Replace Rank 3 ("allies in short range are also immune to charmed/frightened/poisoned") with: "Once per scene, you can extend your Rank 2 immunity to one ally within short range for a short duration."

Optionally, replace the personal immunity at Rank 2 with a boon on saves: "+2 boons on Resist rolls against being charmed, frightened, or poisoned while conscious."

**Design goal:** Characters should be capable of resisting threats through ability and discipline, not erasing threat categories from the fiction. A single protected ally for a short duration is heroic and situational; a passive group aura removes the entire threat class from the table without decision or cost.

---

### 3.5 Constrain the Foresight / Oracle Design Direction

| | |
|---|---|
| **Addresses** | Phase 2 item 2.6 (🟡 Medium) |
| **Priority** | Medium |
| **Type** | Design constraint (governs future development) |

**What should change:**

When designing the Foresight talent (Insight) and any Oracle-specific abilities, follow this constraint: **prophecy must be ambiguous, costly, and fallible.**

Specifically:
- Never grant automatic success on a future roll, auto-knowledge of upcoming encounter contents, or "guaranteed true" information about future events.
- Allow: cryptic visions that require interpretation; visions that reveal one possible future but the future is not fixed; information about general threat direction (not specific content).
- Consider: visions that impose a mechanical cost (Fatigue, Resolve cost, forced check for concentration) when received.
- The "destiny guidance" framing should be redesigned to "reading omens and patterns" — the oracle perceives signals, not fixed fates.

**Design goal:** Maintain stakes by keeping the future uncertain. Players who can reliably preview scene outcomes lose the pressure that creates S&S drama.

---

### 3.6 Change Wound-Negation Talents to Wound-Treatment

| | |
|---|---|
| **Addresses** | Phase 2 items 2.7 (Hard to Kill R2, Orc Pride above Death) (🟢 Minor) |
| **Priority** | Low |
| **Type** | Targeted tweak |

**What should change:**

_Hard to Kill Rank 2:_ Replace "choose to ignore it once per day" with "choose to immediately treat it once per day (the wound effects do not apply until the Wound reopens)."

_Orc — Pride above Death:_ Replace "ignore 1 Wound once per day" with "immediately treat 1 Wound once per day."

**Design goal:** Exceptional resilience in a S&S frame means enduring wounds, not avoiding them. The Fafhrd and Grey Mouser model: characters fight on despite injury, not despite the absence of injury. Treating a wound gives the same short-term mechanical relief (wound effects cease until HP drops to 0) while preserving the scar on the character sheet.

---

### 3.7 Reframe Resolve and Progression Language

| | |
|---|---|
| **Addresses** | Phase 2 items 2.8 and 2.9 (🟢 Minor) |
| **Priority** | Low |
| **Type** | Targeted tweak (text only) |

**What should change:**

_Resolve:_ Remove "divine favor" from the definition. New framing: "Resolve represents the sheer force of an adventurer's will, stubbornness, and hard-won experience." Remove the "heroes are forged" flavor quote.

_Character Progression:_ Remove "This is the way of all who would walk the path of the gods." Replace Level 8/9 titles "Heroic/Epic" with "Storied/Feared" or similar reputation-based vocabulary. "Legendary" at level 10 is acceptable — it signals reputation, not divine status.

**Design goal:** Every text-level cue shapes player expectation. "This is how heroes are forged by the gods" positions the campaign as a destiny arc; "this is what survivors earn" positions it correctly for S&S.

---

### 3.8 Introduce Vices and Simplify the Resolve Economy

| | |
|---|---|
| **Addresses** | Phase 2 item 2.10 (🟡 Medium); resolves Phase 2 item 2.8 on the mechanical side |
| **Priority** | Medium |
| **Type** | New mechanic (additive) |

**What should change:**

Add **Vices** as a second character trait alongside Motivations, and simplify the Resolve invocation economy to cover both.

**Vices:** A Vice is one dominant negative character trait — a compulsion, weakness, or flaw that defines the character as much as their goals. Choose one at character creation.

*Suggested Vice list (non-exhaustive): Greed, Pride, Wrath, Cowardice, Addiction [substance], Obsession [target/person], Recklessness, Paranoia, Cruelty, Debt, Jealousy, Hubris, Vengefulness, Lust for Power*

**Revised Resolve Economy** (replaces the current Motivation invocation rule):

- **Player invocation (Motivation):** Once per session, invoke your Motivation during a skill roll where it drives your action. Describe how. Gain +1 Resolve immediately; spend it now or bank it (max 3).
- **Player invocation (Vice):** Once per session, invoke your Vice when making a roll — describe how this flaw or compulsion shapes what you're doing. Gain +1 Resolve immediately; spend it now or bank it.
- **GM invocation of Vice:** When the GM frames a scene where your Vice would compel action (treasure clearly unattended for the Greedy, a direct insult to the Prideful, the substance within reach for the Addicted), they may offer +1 Resolve in exchange for acting on the Vice. You can accept and act on it, or decline by spending 1 Resolve to resist.

Resolve regain rules for rest and GM creative-solution bonus are unchanged.

**Example Vice at play:** Arzhag (Vice: Pride) is offered a tactically sensible retreat. The GM offers: "Act on your Pride and refuse — take 1 Resolve." Arzhag's player accepts; the party holds an indefensible position. The scene now has a complication that flows from character, not narrative convenience.

**Design goal:** Three genre-critical outcomes become reliably accessible:

1. **Dramatic irony.** The gap between what a character wants (Motivation) and what they can't help doing (Vice) is the engine of S&S character arcs. The two traits now pull in different mechanical directions: the Motivation fires on moments of purposeful success; the Vice fires on failure of judgment or in the GM's hands.
2. **Earned Resolve, not bestowed Resolve.** The current system gates Resolve on success — you had to pass the roll to get it. Vices grant Resolve when characters act badly, which is more S&S than when they act well.
3. **No alignment required.** There is no virtue tracking or cosmic arbiter. But the Vice-invocation structure means every character at the table has a publicly acknowledged weakness that the GM and other players can play against. That is the S&S moral model: not good vs. evil axes, but capability vs. a specific, personal vulnerability.

**Integration note:** The revised invocation description also resolves Phase 2 item 2.8 (Resolve framed as "divine favor"). Update the Resolve definition to: "Resolve represents the sheer force of an adventurer's will — the tension between their sharpest drives and their worst instincts."

---

## Phase 4 — Missing Mechanics (Structural Gaps)

### 4.1 Urban Danger — City as Threat System

**What's missing:** There are no formal mechanics for the legal heat, guild debt, faction enmity, or wanted-level that city life should generate for S&S characters. Streetwise skill exists, as do Influence and Stealth, but none of them are organized into a system that makes the city a mechanically dangerous place with ongoing pressure.

**Why it matters for S&S:** Nexus's setting (ancient culture-inspired urban centers) should be as threatening as the wilderness. Conan is as likely to be arrested in Shadizar as eaten in the jungle. Without mechanics, every city session defaults to roleplay-only social encounters with no attrition loop, economic consequence, or escalating threat. The city becomes a safe zone between dungeons — the opposite of S&S genre logic.

**Design direction:** Model urban danger as an escalating resource using a small set of parallel faction-standing dice (like supply dice, but representing heat/standing). When characters steal, kill, or draw attention: check the relevant faction's die. When it degrades to zero, that faction takes direct action (pursuit, arrest, assassination, price increase). Include a table of faction consequences by tier. Integrate with Streetwise (lower heat), Stealth (avoid triggering checks), and Influence (repair standing at cost). Keep it lightweight — the travel system's daily-roll model is the right level of resolution.

---

### 4.2 Persistent Arcane Corruption

**What's missing:** The mutation track (Wild Surge optional rules) puts potentially permanent marks on Arcana users, but it is explicitly optional. There is no mechanic that structurally ensures arcane power changes the caster over time — physically, socially, or psychologically.

**Why it matters for S&S:** The S&S sorcerer is identifiably *other* — Thoth-Amon, Elric, the Nameless Ones. Their power comes with visible cost. A game that lets arcane users reach Grandmaster rank (Arcana 5, Focus of 20) without any mandatory mark on their person has no mechanical way to generate this genre feel. The mutation system gestures toward it clearly; the problem is the genre-critical element is filed under "optional."

**Design direction:** Make the mutation track non-optional for Arcana users upon reaching rank 3 or beyond. Each wild surge blunder advances the track. Stage 3 (Empowered) should have a genuine social detriment alongside the power (visible mark, social fear, specific NPC reactions). Stage 4 (Transformed) should be rare and consequential — the point at which the sorcerer has genuinely crossed a line. This doesn't require new mechanics, only reclassifying existing optional content as standard.

---

### 4.3 Wealth Tiers as Lifestyle Lever

**What's partially present:** The downtime system already requires characters to spend coins every week — every activity has an expense, the fallback Leisure activity costs 25 coins/week, and there is no option to simply do nothing. XP sources include finding valuable treasure, and equipment degradation and repair create ongoing spending. The economic pressure is real, not absent.

**What's missing:** The pressure is flat. A character with 5,000 coins and one with 50 coins face exactly the same activity costs and the same mechanical options. There is no upside to wealth (beyond buying higher-quality gear) and no additional downside to poverty beyond inability to afford specific activities.

**Why it matters for S&S:** The S&S hero needs money specifically because having it and not having it feel different. The genre loop (flush → extravagant → broke → desperate → dangerous job → flush) requires that being wealthy *opens doors* and being broke *closes them*, beyond the binary of "can I afford this activity or not."

**Design direction:** Introduce a lightweight **Wealth Tier** (1–4: Destitute / Common / Comfortable / Prosperous) that characters declare at the start of each downtime scene. Tier determines two things only: which social doors are open (access to higher-rank NPCs, quality of lodging for the Recover activity, Haggle boon/bane), and what the weekly base expense is at that tier (0 / 10 / 25 / 75 coins, replacing or supplementing activity expenses). This is additive — it doesn't replace the existing cost structure, it layers one meaningful decision on top. Characters who want to maintain Prosperous status need incoming wealth; characters who go Destitute lose social access. The gear-and-training costs already in the system provide the floor of spending pressure; this adds the ceiling.

---

### 4.4 Patron/Faction Obligation Mechanics

**What's missing:** Character progression rewards completing tasks for a patron or deity (2 XP trigger). But the relationship has no formal counter-direction. There is no mechanic for what happens when players fail a patron, refuse a task, incur debt to a faction, or become known enemies of a powerful actor. Patrons currently apply reward pressure (XP) without consequence pressure (obligation, debt, danger).

**Why it matters for S&S:** In S&S, power relationships are transactional and dangerous in both directions. Belit doesn't just reward Conan — she expects things. The patron dynamic should function like a contract with teeth, not an optional XP upgrade. Characters who regularly deal with patrons should feel the pull of obligation as a mechanical force, not just as narrative flavor.

**Design direction:** A simple Obligation Die (d4–d10) attached to any formal patron relationship. The die represents the current level of unmet obligation. Taking a job from a patron sets the die; completing the job removes it. Failing or refusing increases its size. When the die reaches a certain threshold, the patron acts — sends agents, withdraws resources, calls in a marker. The existing wealth, Streetwise, and Influence systems already provide the tools to manage these relationships; the Obligation Die just ensures they have mechanical stakes.

---

## Summary Tables

### Phase 2 At a Glance

| # | Mechanic | S&S Conflict | Severity |
|---|---|---|---|
| 2.1 | Short Break = Full HP | Removes encounter-scale attrition; wounds only trigger on bad luck within a fight | 🔴 Critical |
| 2.2 | Focus fully recharges overnight | Magic is a predictable daily budget, not a scarce and dangerous resource | 🟡 Medium |
| 2.3 | Divine Rites R3: full Focus from short break | Short-rest recharge for magic users at rank 3 | 🟡 Medium |
| 2.4 | Pact of Devotion (Protection) R2: instant Wound removal | In-scene bypasses the treatment/healing two-stage wound system | 🟡 Medium |
| 2.5 | Divine Sense R3: group immunity aura | Passive plot armor at the party level, removes entire condition threat categories | 🟡 Medium |
| 2.6 | Oracle / Foresight design direction | Reliable prophecy enables infallible guidance pattern, deflates stakes | 🟡 Medium |
| 2.7 | Hard to Kill R2 / Orc Pride above Death | Wound negation once/day = plot armor | 🟢 Minor |
| 2.8 | Resolve framed as "divine favor" | Heroic-destiny framing where personal-will framing is correct | 🟢 Minor |
| 2.9 | Level titles and "path of the gods" | Divine apotheosis arc conflicts with mortal-scale S&S feel | 🟢 Minor |
| 2.10 | Motivation only — no shadow axis | No mechanical surface for character flaws; Vice-invocation pattern absent | 🟡 Medium |

### Phase 3 Priority Matrix

| Priority | Item | Type |
|---|---|---|
| **High** | Introduce Recoveries — replace flat short break HP | New resource |
| **High** | Tier Focus recovery by rest quality | Tweak |
| **Medium** | Add Vices + simplify Resolve economy | New mechanic |
| **Medium** | Pact of Protection: wound healing → wound treatment | Tweak |
| **Medium** | Divine Sense R3: replace group immunity aura | Tweak |
| **Medium** | Foresight/Oracle: constrain design direction | Design constraint |
| **Low** | Wound-negation talents → wound-treatment talents | Tweak |
| **Low** | Reframe Resolve and progression language | Text revision |

### Phase 4 Priority

| Gap | Genre Impact | Effort |
|---|---|---|
| Urban danger / city-as-threat system | High — city safety is anti-genre | Medium |
| Persistent arcane corruption (mandatory mutation track) | High — sorcerer identity is genre-critical | Low (reclassify, don't redesign) |
| Wealth Tiers as lifestyle lever | Medium — shapes Fortune/Survival motivation loop and spellcaster rest incentives | Low (additive layer) |
| Patron/faction obligation mechanics | Medium — completes the transactional power-relationship model | Low (Obligation Die is additive) |

---

*Analysis based on ruleset version as published in docs/ April 2026. References to specific mechanics use the exact names from the published text.*
