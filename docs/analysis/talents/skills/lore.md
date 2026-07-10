# Lore — Talent Design Workbench

> **Source:** [docs/03-statistics/06-talents/lore.md](../../../03-statistics/06-talents/lore.md) | **Main Analysis:** [TALENT_SYSTEM_ANALYSIS.md](../TALENT_SYSTEM_ANALYSIS.md)

## 1. Skill Identity

**Role Spread:** Excels: Support | Decent: Control, Utility | Weak: Offense, Defense, Healing

**Primary Archetypes:** Druid (support), Magus (support), Oracle (key support), Shaman (key support), Sorcerer (support), Summoner (support), Warlock (key support)

**Identity Tags:** mythic authority, artifact mastery, superstition weaponization, magical awareness, prophetic counsel

**Design Lens:** Lore is occult scholarship — authority over the hidden rules of the supernatural world. Where Education is institutional knowledge of visible structures, Lore is esoteric knowledge of invisible ones: the true names, the forbidden rites, the mythology that certain creatures fear and certain places embody. Its talent pool correctly divides between knowledge-as-weapon (Mage Hunter disrupts casters, Channel Superstition weaponizes belief, Consult the Myths stuns supernatural creatures) and knowledge-as-tool (Identify Artifact reveals, Magical Sense detects, Divine Scholar unlocks). The unique contribution is "exploiting the supernatural through knowing what it fears." The critical gap is that Oracle's prophetic core and Warlock's pact mechanics both depend on Lore as a key support skill, yet neither has a single dedicated Lore talent.

---

## 2. Current Talent Inventory

| Talent | Path | Max Rank | Status | Role | Notes |
|--------|------|----------|--------|------|-------|
| Channel Superstition | Basic | R3 | Complete | Combat | Demoralize upgrades to fear; AoE fear at R2; harder fear-save at R3 |
| Consult the Myths | Basic | R3 | Complete | Hybrid | Magical/supernatural re-roll; +boon at R2; daze supernatural creatures at R3 |
| Divine Scholar | Basic | R3 | Complete | Utility | Cross-tradition spell access without devotion requirement |
| Identify Artifact | Basic | R3 | Complete | Utility | Magic item sensing and identification; auto-sense at R3 |
| Mage Hunter | Basic | R3 | Complete | Combat | Concentration disruption; Opportunity Attack on caster at R2; Lore-to-Defense at R3 |
| Magical Sense | Signature | R4 | Incomplete | Utility | Magic detection and analysis; extends to long range at R4; R4 bonus is ??? |

**Summary:** 6 talents total — 5 complete, 1 incomplete. Max rank: R4. Role distribution: ~33% combat / ~50% utility / ~17% hybrid.

---

## 3. Gaps & Priorities

**Signature gap:** Oracle's prophecy and omen identity — the defining feature of the Oracle archetype — has zero talent coverage in Lore or anywhere else in the system. Oracle lists Lore as a key support skill specifically for its prophetic dimension, yet every Lore talent is about the past (artifacts, myths, superstitions) rather than the future (omens, divinations, fate-reading). Warlock's pact attunement — the bond with a specific patron entity, unlocking knowledge and ability from that relationship — is equally absent. Shaman's "ancestor communion" is tangentially served by Consult the Myths but lacks a direct spirit-channeling Lore talent. All three archetypes are partially stranded.

**Role gaps:** Ritual casting interaction is absent — no talent makes Lore useful during the performance of actual ritual ceremonies (only the outcome, not the process). Taboo mechanics (using knowledge of a culture's prohibitions as leverage against creatures of that culture) are a named aspect with zero coverage. Symbolic/cult-based social leverage — invoking Lore knowledge as social authority in religious or occult social scenes — has no talent. Downtime Lore research (extended study yielding permanent or scene-specific knowledge advantages) has no dedicated talent.

**System integration gaps:** Social Intrigue: Knowledge of a faction's mythological foundations should grant direct social advantages in scenes with religious or occult-aligned NPCs — no talent provides this. Challenge: A "Mythic Research" talent for challenge preparation phases is the natural entry point. Travel: Lore-based navigation via ancient roads, celestial myth-knowledge, or omen-reading for route selection has zero coverage.

**Rank gaps:** Magical Sense R4 is incomplete (???). Magical Sense is Signature-designated and should reach R5 — currently missing both R4 completion and R5 design. A Lore 4 character is blocked from the full progression of the only Signature talent in the skill. Needs 2–4 new talents to reach 8-talent baseline, plus R4 completion and R5 design for Magical Sense.

**Priority ranking for design work:**
1. Complete Magical Sense R4 immediately — blocks character progression for Lore 4 characters
2. Design an Oracle prophecy/omen signature talent — the most critical archetype gap in the Lore skill
3. Design a Warlock pact-attunement talent — eldritch knowledge through patron relationship
4. Extend Magical Sense to R5 per its Signature designation

---

## 4. Design Space

Lore's deepest unexplored territory is **futuresight and omen mechanics**: translating mythological knowledge of cycles, signs, and portents into actionable mechanical information. This is Oracle's core fantasy and differs from Insight's Foresight (which is about individual intuition) because it is about reading external signs — the flight of birds, the pattern of entrails, the alignment of stars — against a framework of mythological knowledge. The design challenge is the same as Foresight: avoid open-ended "ask the GM a question" mechanics. A bounded-menu approach works best — a talent that grants one piece of specific information from a limited list of question types (what is the greatest current threat, what action will the target take next, is there a supernatural presence within range) gives the Oracle player power without forcing GM improvisation.

The second major design cluster is **taboo exploitation**: using knowledge of a creature's or culture's prohibitions, sacred constraints, and mythological vulnerabilities as leverage. A creature bound by ancient oaths can be commanded through those oaths; a warrior of a culture that forbids fighting in a sacred space can be stopped there; a demon that must answer truthfully when its true name is spoken can be questioned. This expresses the "taboo" and "symbolism" aspects and has no mechanical representation anywhere in the system.

### Unexplored Thematic Angles
- **Omen and prophecy:** A preparation-phase talent reading external signs to grant specific bounded information about the scene ahead — not open-ended vision but a constrained menu of actionable revelations; Oracle's signature and the most important missing talent in the skill
- **Taboo exploitation:** Knowledge of cultural or supernatural prohibitions used as leverage — commanding bound entities, restricting creatures to sacred/forbidden spaces, invoking oath-bindings that constrain a target's actions for a scene
- **Esoteric ritual support:** A talent making Lore useful during the performance of rituals — granting advantage to allied spellcasters during ritual casting, reducing ritual casting times, or enabling ritual improvisation from partial knowledge
- **Pact attunement:** A Warlock-specific talent representing the knowledge granted by an eldritch patron — unlocking specific forbidden knowledge, detecting patron-related entities, or receiving cryptic intelligence relevant to the session's events

### System Integration Opportunities
- **Challenges:** Mythic research challenges (identifying an ancient cult's summoning ritual before they complete it, deciphering a prophetic inscription, understanding a haunted location's history) are natural Lore domains; a "Scholarly Investigation" talent providing a Challenge preparation bonus would be the most direct win
- **Social Intrigue:** Religious and occult social scenes should favor characters with Lore expertise — a talent granting social advantages when invoking mythological or religious authority in scenes with spiritually-oriented NPCs
- **Travel:** Omen-reading for route selection (interpreting celestial events, unusual natural signs, or ancient marker stones as navigation aids); distinct from Knowledgeable Wanderer (Nature) because it uses mythological knowledge rather than natural familiarity

---

## 5. Talent Suggestions

The five designs below complete Magical Sense as a full Signature talent (R1–R5), add the ritual-knowledge and curse-mechanics identities, integrate Lore with the Challenge system, and provide a High-Level mythological capstone. Together they bring Lore to 11 talent proposals (6 existing + 5 new).

**On Magical Sense's path:** Magical Sense currently has R1–R3 complete and R4 incomplete (???). Because it is already designated as one of the 10 Signature talents in the system analysis (§8.3), the correct resolution is to extend it to R5 as designed — not to split it or cap it at R3. The two designs below (R4 and R5) complete the Signature. R1–R3 are unchanged.

---

### Magical Sense — R4 and R5 (Lore, Signature — completing existing talent)
*R1–R3 text is unchanged. Only R4 and R5 are new.*

**Rank 4.** You gain the following abilities:
- Your Magical Sense ability extends to long range.
- When you detect magical sources, you can identify the specific tradition or discipline of each (arcane or mystic) and its approximate power level. The GM tells you whether it is rank 0–1, rank 2–3, or rank 4 or higher.
- You no longer need to use Spell Concentration to maintain Magical Sense beyond brief duration. It persists for a **short** duration with no concentration cost.

**Rank 5.** You gain the following abilities:
- Your awareness of magic is now constant. You automatically sense any active magical effect, creature, or item within long range. This requires no action and is not subject to Spell Concentration.
- Once per day, you can attempt to suppress one magical effect within short range for a **short** duration. The effect is treated as if it were dispelled for that duration: active spells pause, magical traps become inert, and enchantments on objects cease. At the end of the duration, the effect returns.

**Archetype enablement:** Warlock (patron attunement detection), Sorcerer (passive arcane awareness), Oracle (sensing the supernatural landscape), Shaman (spirit presence detection), Magus (counter-magic foundation)
**Design notes:** R4 resolves the ??? with a meaningful capability upgrade. Tradition identification (knowing it is Fire discipline vs. Shadow discipline) is a concrete information reward with tactical and narrative value. Removing the Concentration cost at R4 is important because Concentration is scarce at high play — asking a Master-level character to Concentrate just to sense things in their environment is a tax that does not match the tier. R5's always-on detection is the natural apex: the Grandmaster lives in constant awareness of the magical world. The once-per-day suppression is deliberately limited and brief — it is not permanent dispel magic but a tactical pause, comparable in scope to other R5 once-per-day abilities.

---

### Ancient Rites (Lore, Basic)
*You possess working knowledge of ritual formats across cultures — not as a practitioner, but as a recognized authority who understands what rites do and why they work.*

**Rank 1.** When attempting any ritual or ceremonial action that a culture would recognize as legitimate, you can roll MND + Lore in place of the skill that would normally be required. You also know the correct form of the following basic rites without research: funerals, oaths, blessings, consecrations, and ward-setting. Characters of any culture treat your performance of these rites as authoritative.

**Rank 2.** When you research a specific ritual, taboo, or religious practice by spending 10 minutes with access to local information, witnesses, or relevant texts, roll MND + Lore vs. TN 8. On a success, you learn one concrete mechanical consequence or benefit that the ritual provides. The GM states the effect using one of the following categories: a stat or defense bonus, a condition immunity or resistance, a behavioral constraint on participants, or a resource gain or loss. On a failure, you know the ritual exists and is significant but not what it does.

**Rank 3.** Once per scene, you can invoke a cultural taboo against a creature that holds that culture sacred. Roll MND + Lore vs. the creature's Resist. On a weak success, the creature is **briefly dazed**. On a strong or critical success, the creature is **briefly stunned**. A creature that succeeds on their Resist roll against this ability is immune to it for the rest of the scene.

**Archetype enablement:** Oracle (ritual foundation), Shaman (ancestor rites and cultural ceremonies), Warlock (forbidden and eldritch rites), Druid (natural ceremonies), Priest (comparative liturgy for cross-cultural authority)
**Design notes:** R1 establishes Lore as a ritual-competence skill; the MND + Lore substitution is not "use the better roll" — it replaces the normally required skill when the character's expertise is specifically ritual knowledge. R2's research roll provides a specific answer from a bounded four-category menu rather than open-ended "GM decides what it does." This gives the GM a structured frame while ensuring the player receives actionable information. R3 connects ritual knowledge to combat through cultural vulnerability: brief condition on weak / stunned on strong is calibrated to avoid crowd-control dominance, and the immunity on success prevents a single roll from locking creatures indefinitely.

---

### Curse Lore (Lore, Basic)
*You have studied the mechanics of hexes, banes, and maledictions — not to cast them, but to identify, understand, and redirect them.*

**Rank 1.** You can identify whether a creature or object is cursed without a roll by spending 1 minute examining it. When you identify a curse, you automatically learn two things: its source type (bestowed by a caster, bound to an artifact, or environmental and natural) and its general effect category (harm, compulsion, degradation, binding, or ill fortune).

**Rank 2.** When a curse effect targets you, you gain +1 boon on any saving roll against it. When you examine a cursed creature or object, you can attempt to identify the specific condition that would break or suppress the curse: roll MND + Lore vs. TN 10. On a success, the GM tells you one true condition that would lift or temporarily suppress it. On a failure, you determine that the condition is not accessible through ordinary means and requires either a specific ritual, a specific location, or a specific person.

**Rank 3.** Once per scene, when a curse effect targets you or an adjacent ally, you can attempt to redirect it to a different creature within close range (not yourself). Roll MND + Lore vs. the original curse's source TN, or vs. TN 10 if the source TN is unknown. On a success, the curse affects the new target instead. On a failure, the original target is unaffected and the curse dissipates.

**Archetype enablement:** Warlock (hex knowledge and tactical redirection), Shaman (curse understanding and removal), Oracle (prophetic curse identification), Sorcerer (arcane curse resilience as background knowledge)
**Design notes:** R1 is purely informational with no roll and no per-scene limit — establishing Curse Lore as a tool for discovery and preparation rather than reactive defense. The source-type and effect-category information gives players enough to seek solutions without spoiling the curse's exact mechanics. R2's saving throw boon applies to saves against curses broadly without granting immunity; the condition-identification roll uses a bounded answer on success (one true condition from specific options) and a meaningful negative-space answer on failure (the condition is inaccessible through ordinary means). R3's redirect is strong but strictly limited: once per scene, close range only, cannot redirect to yourself, and a failed attempt still protects the original target by dissipating the curse.

---

### Scholar's Preparation (Lore, Basic)
*You know how to use knowledge as a tactical asset before a challenge even begins — turning research time into mechanical advantage.*

**Rank 1.** Before entering a known challenge about which you have some prior information, you can spend 10 minutes in study or research. Roll MND + Lore vs. TN 8. On a success, the challenge die starts 1 step lower than it normally would. This ability can only be used when you have advance knowledge of the challenge's subject: a scouted location, a known antagonist, an identified ritual, or a described threat.

**Rank 2.** After studying relevant texts, artifacts, or a knowledgeable source for at least 1 hour, you can designate one skill as prepared for the coming challenge. All rolls using that designated skill during the challenge gain a +1 situational bonus. This bonus ends when the challenge resolves.

**Rank 3.** When you succeed on a Lore roll during any Research-type challenge, reduce the challenge die by 3 instead of 2. When you assist another character's Lore roll in a challenge, they gain an additional +1 boon on the roll.

**Archetype enablement:** Oracle (prophetic preparation before danger), Warlock (forbidden knowledge applied to investigation), Magus (arcane creature lore for dungeon challenges), Summoner (summoning circle and binding research), Sorcerer (arcane heritage used as research background)
**Design notes:** This talent directly integrates Lore into the Challenge system — the primary system integration gap identified in the analysis. R1 requires advance knowledge as an explicit prerequisite; it cannot be used as a free challenge-die reduction on any encounter the party stumbles into blind. The "starts 1 lower" effect is calibrated at roughly one pre-emptive success on a d6 challenge die — meaningful but not decisive. R2's situational bonus for one designated skill is thematic preparation: you studied specifically for this domain. R3's enhanced Lore reduction (3 instead of 2) makes Lore specialists genuinely valuable in Research challenges rather than merely competitive. The assist bonus at R3 rewards playing a supportive knowledge role in the group.

---

### Master of Myths (Lore, High-Level)
*Your mastery of mythology spans all known cultures — you can identify supernatural vulnerabilities and amplify your group's ability to exploit them.*

**Rank 4.** Once per scene, when you encounter a creature, trap, or magical effect, you can recall mythological parallels as a **Quick Action**. Roll MND + Lore vs. TN 10. On a success, your party gains +1 boon on all rolls against that specific target for the rest of the scene, and you learn one of the following (your choice): one specific vulnerability the target has, one condition or damage type it resists, one behavioral pattern it follows under stress, or one thing it cannot do under certain circumstances.

**Rank 5.** Once per day, when you or an ally exploits a target's vulnerability identified through *Consult the Myths* or *Master of Myths*, you can amplify the exploitation as a **Quick Action**. All party members' attacks and effects against that vulnerability treat each hit as one **Success Level** higher for that instance. Each character can benefit from this amplification once per scene.

**Archetype enablement:** Oracle (mythic authority as tactical foundation), Shaman (spirit knowledge exploitation in combat), Warlock (eldritch weakness identification from patron lore), Magus (arcane creature lore applied to combat)
**Design notes:** R4 combines the information-gathering identity of Consult the Myths with a group-wide boon but requires a roll (TN 10) and is once per scene, preventing it from being reliable on every encounter. The four-option vulnerability menu gives the player a meaningful choice while keeping the GM's answer in a bounded format (specific category, not "anything"). R5's Success Level upgrade is deliberately once per character per scene and requires activation (once per day for the player, once per scene per ally) — this prevents it from functioning as a round-one "win" button on boss encounters. The +1 SL upgrade matters most against creatures with damage thresholds or condition-triggering SL requirements, making it a smart fight-finishing tool rather than raw damage inflation.

---

> **Status:** Five designs complete. Magical Sense is now a full Signature talent (R1–R5). Four new Basic and High-Level talents address ritual knowledge (Ancient Rites), curse mechanics (Curse Lore), challenge integration (Scholar's Preparation), and mythological capstone (Master of Myths). Lore has 11 talent proposals (6 existing + 5 new) with coverage of Oracle, Warlock, and Shaman dependencies. Master of Myths is the first High-Level talent.

---

### True Name (Lore, High-Level)
*In ancient traditions, knowing a being's true name grants authority over it — and you have studied deeply enough to know names that should not be spoken.*

**Rank 4.** Once per scene, when you face a supernatural creature (spirit, undead, demon, extraplanar entity, or mythological beast), you can attempt to recall its true name through your scholarship as a **Quick Action**. Roll MND + Lore vs. TN 12. On a success, you know its true name for this scene. Invoking the true name is an **Action**: roll MND + Lore vs. the creature's Resist.
- **Weak success:** The creature cannot move toward you or any ally for a **brief** duration.
- **Strong success:** The creature is also **briefly stunned**.
- **Critical success:** The creature is also compelled to answer one question truthfully before the stun ends.

**Rank 5.** Once per day, when you know a supernatural creature's true name (through this talent or any other means), you can perform a rite of binding as a 1-minute ritual. Roll MND + Lore vs. the creature's Resist. On a success, choose one constraint that lasts for a **medium** duration:
- The creature cannot take harmful actions against any creature.
- The creature must answer any yes-or-no question you ask truthfully.
- The creature cannot leave the area it currently occupies.
- The creature must obey one specific command you have spoken aloud during the rite.

The binding ends early if the creature is attacked by you or any ally.

**Archetype enablement:** Warlock (eldritch pact knowledge extended to naming authority), Summoner (binding summoned entities rather than fighting them), Oracle (ancient naming traditions as prophetic practice), Shaman (spirit names and ancestor names as tools of communion)
**Capstone feeling:** The scholar who knows what things are truly called — and therefore what authority over them truly means.
**Design notes:** TN 12 for the naming roll is intentionally difficult; failing to recall the name of a major spirit or demon is plausible even at Lore R4 and raises the stakes of research before a confrontation. The three-tier invoke follows standard success-level structure. R5's 1-minute ritual cost prevents mid-combat use, making it a preparation and interrogation tool rather than a fight-ender. The binding ends if the party attacks, creating a genuine tension between information-gathering and combat. All four binding options come from a bounded menu per the design principle of giving the GM parameters rather than open-ended discretion.

---

### Voice of Ages (Lore, High-Level)
*Your command of historical cycles is so complete that you can read what forces are at work and predict what they will do next.*

**Rank 4.** Once per scene, after observing a faction, location, or group for at least 5 minutes (or when you have relevant prior information from research), you can identify its historical pattern as a **Quick Action**. Roll MND + Lore vs. TN 10. On a success, choose two of the following. The GM answers from this bounded menu:
- **Faction movement:** The faction's most likely immediate action. The GM names one of: aggressive expansion, defensive consolidation, pursuit of a specific resource, internal conflict, or preparation for a ritual or ceremony.
- **Location significance:** One item, danger, or historical artifact this site has held in its past, and whether current conditions suggest it is likely still present.
- **Historical weakness:** One specific failure point this type of group has shown in the past. The GM names one condition, circumstance, or opponent type that has undone similar groups before.
- **Alliance forecast:** The most unstable relationship within this faction. The GM names one specific pairing at risk of betrayal or an unexpected alliance.

**Rank 5.** Once per day, before entering any scene (combat, negotiation, challenge, or exploration), you can spend 10 minutes in contemplation or study. State one specific prediction aloud: what an enemy will do, where a threat will emerge, or what offer a person will make. If your prediction proves correct, your whole party gains +1 boon on all rolls directly related to that predicted event for its entire duration. If your prediction proves incorrect, you gain +1 boon on your next roll — the analysis was still instructive.

**Archetype enablement:** Oracle (the prophetic-history identity that distinguishes Oracle from Insight's Foresight), Shaman (ancestor-pattern recognition as spirit knowledge), Warlock (forbidden historical lore applied to tactical advantage), Summoner (understanding the historical conditions that created and constrain summoned entities)
**Capstone feeling:** The scholar who can walk into a room and already understand the forces at play — not through supernatural vision, but by knowing what has always happened under these conditions.
**Design notes:** R4's four-category bounded menu prevents "tell me everything about the dungeon" from being a valid use; the GM picks one answer within the named category rather than inventing freely. Each category maps to a distinct decision-point type players face in play. R5 is high-risk in the sense that the prediction must be stated before the scene begins — no retroactive application. The consolation prize (single +1 boon on a wrong prediction) prevents the ability from being purely punishing when the situation shifts mid-session.

---

> **Status:** Seven designs complete. Lore now has 13 talent proposals (6 existing + 7 new). Magical Sense is a full Signature talent (R1–R5). Master of Myths, True Name, and Voice of Ages are the three High-Level talents (R4–R5).
