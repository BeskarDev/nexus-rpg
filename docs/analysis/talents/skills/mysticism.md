# Mysticism — Talent Design Workbench

> **Source:** [docs/03-statistics/06-talents/mysticism.md](../../../03-statistics/06-talents/mysticism.md) | **Main Analysis:** [TALENT_SYSTEM_ANALYSIS.md](../TALENT_SYSTEM_ANALYSIS.md)

## 1. Skill Identity

**Role Spread:** Excels: Offense | Decent: Support, Healing | Weak: Defense, Utility, Control

**Primary Archetypes:** Bard (pillar), Champion (support), Druid (pillar), Monk (support), Oracle (pillar), Priest (pillar), Shaman (pillar)

**Identity Tags:** spiritual blessing, divine rite, sacred ward, form alteration, patron attunement

**Design Lens:** Mysticism is connected power — where Arcana draws on raw force, Mysticism draws on relationships: with gods, ancestor spirits, natural forces, and the covenant between self and patron. Its talents reflect this in their division between combat amplification that is powered by devotion (Shape Changer, Mystic Champion, Pact of Devotion) and communal support that requires an audience (Communal Practices, Divine Sense, Divine Rites). The unique mechanical contribution is the Devotion-path system (Pact of Devotion's Glory/Piety/Protection/Vengeance options) and the form-alteration chassis (Shape Changer). The most critical gap is that two of five Mysticism-pillar archetypes — Bard and Oracle — have no dedicated Mysticism signature.

---

## 2. Current Talent Inventory

| Talent | Path | Max Rank | Status | Role | Notes |
|--------|------|----------|--------|------|-------|
| Armor of the Faithful | Basic | R3 | Complete | Combat | Unarmored AV from Mysticism; weapon attack rolls at R2; fear/confusion immunity at R3 |
| Communal Practices | Basic | R3 | Complete | Hybrid | Multi-target spell exclusion; second target for singular spells at R2; up to 4 extra targets at R3 |
| Divine Favor | Basic | — | Incomplete | Hybrid | Stub only: Favor pool equal to Mysticism per day, no rank structure designed |
| Divine Rites | Basic | R3 | Complete | Utility | Focus recovery on short break; critical spell half-cost at R2; full Focus recovery at R3 |
| Divine Sense | Basic | R3 | Complete | Utility | Detect spirits/undead/holy/cursed within medium range; immunity to charm/fear/poison at R2; extends to allies at R3 |
| Elemental Adept | Basic | R3 | Complete | Combat | Ignore spell damage resistances; treat immunities as resistances at R2; strip all protections 1/scene at R3 |
| Master of Principles | Basic | R3 | Complete | Combat | Cantrip enhancement; Opportunity Attack cantrip at R2; cantrip double-cast at R3 |
| Mystic Champion | Basic | R3 | Complete | Combat | Spell-infused weapon strike (mystic cantrips); extends to rank 1 spells at R2; rank 2 spells at R3 |
| Mystical Spell Knowledge | Signature | R4 | Complete | Utility | Mystic spell access line; repeatable; should reach R5 |
| Pact of Devotion | Signature | R3 | Complete | Hybrid | Devotion pact with four subtype options; R3 provides powerful pact abilities; Signature — should reach R5 |
| Shape Changer | Basic | R3 | Complete | Combat | Form-change enhancement (temp HP, natural weapon damage, AV); resistance stack at R3 |

**Summary:** 11 talents total — 10 complete, 1 incomplete. Max rank: R4. Role distribution: ~55% combat / ~27% utility / ~18% hybrid.

---

## 3. Gaps & Priorities

**Signature gap:** Priest is well-served by Pact of Devotion. Druid has Shape Changer. Champion has Mystic Champion. Shaman has Divine Sense as partial coverage. Bard has no Mysticism-native signature at all — their music-magic identity requires a performance-concentration mechanic that doesn't exist. Oracle has no Mysticism-native prophetic talent — their divination and omen identity is entirely absent from their pillar skill. Divine Favor stub contains the seed of a Favor-pool blessing mechanic that could serve the Priest and Oracle identities but has no designed content.

**Role gaps:** Healing as Mysticism's "decent" role is almost invisible — Pact of Devotion's Piety subtype has a healing aura at R2, but no talent directly amplifies the healing output of Life-tradition spells. The "ward" and "sacrifice" aspects are the most underexplored thematic clusters: group warding (protecting allies from specific harm types) is entirely absent, and spending vital resources (HP, Resolve, consecrated items) for power conversion is touched only in Battle Rage (Fighting). Both belong to Mysticism's design space. No downtime Mysticism talent beyond Divine Rites.

**System integration gaps:** Challenge system: Divine ceremonies and rituals are Mysticism's natural challenge type — a "Ritual Performance" talent explicitly using Challenge language for religious ceremony rolls would be the direct win. Social Intrigue: Divine authority and institutional religious leverage have no Mysticism talent hook — a "Clerical Authority" or "Sacred Standing" talent granting social advantages when representing a religious institution would serve Priest and Champion. Travel: Celestial attunement or spirit-guide navigation has zero coverage.

**Rank gaps:** Pact of Devotion is Signature-designated and should reach R5 — currently missing R4 and R5. Mystical Spell Knowledge should reach R5 per Signature designation — currently capped at R4. No talent reaches R5. Pact of Devotion's R4/R5 design would be the highest-impact single addition for the skill.

**Priority ranking for design work:**
1. Complete Divine Favor stub — the Favor-pool mechanic is conceptually designed (Favor = Mysticism per day), needs proper rank structure
2. Add Bard's music-magic signature — performance-as-concentration-mechanic with escalating ally benefits
3. Add Oracle's divination/omen signature — a Mysticism-native foretelling talent with bounded information outputs
4. Extend Pact of Devotion to R4 and R5 per its Signature designation

---

## 4. Design Space

Mysticism's deepest unexplored territory is **sacrifice mechanics** — spending something of value (HP, an item, a relationship) to gain spiritual power. This is expressed in the skill's aspects ("sacrifice," "tether") but has no talent expression. The design distinction from Battle Rage's HP-spend is that Mysticism's sacrifice should be meaningful rather than tactical: consecrating an object permanently, taking on a spiritual wound that reduces future capacity, or binding a spirit by giving it a claim on the character's fate. These are decisions with lasting consequences, not round-to-round resources — and they express the "cost of power" that distinguishes mystic magic from arcane magic.

The second major gap is **group warding**: creating protective spiritual effects over an area or group that persist through a scene. Armor of the Faithful is personal unarmored defense; Communal Practices extends single-target spells to multiple targets; but neither expresses the "ring of salt against evil spirits," "blessing the threshold," or "ward against corruption" fantasy that Mysticism's "ward" aspect promises. A ward talent would be mechanically distinct — creating a persistent defensive field rather than a single reaction or cast.

### Unexplored Thematic Angles
- **Performance-as-concentration:** A Bard-signature sustained-performance mechanic — while maintaining a musical or spoken performance, nearby allies gain escalating benefits (morale, HP regeneration, boon accumulation); concentration-based to prevent stacking; the most critical missing design in Mysticism
- **Sacred warding:** Creating persistent spiritual wards over an area or group — protection against specific damage types, creature origins (undead, daemonic), or condition effects for a scene; distinct from Armor of the Faithful (personal) and Communal Practices (spell extension)
- **Sacrifice for power:** Spending a permanent or session-length resource (consecrated item, a portion of max HP, a narrative oath) to unlock a one-time spiritual power beyond normal limits — the "cost of miracles" fantasy distinct from Focus economy
- **Divination sight:** Oracle's Mysticism-native talent for reading omens and receiving bounded supernatural information — celestial interpretation, entrail-reading, prophetic dream — with the same bounded-menu principle as Lore's omen talent (concrete choices from constrained options)

### System Integration Opportunities
- **Challenges:** Religious ceremonies, exorcisms, and spirit-banishment rites are natural challenge types for Mysticism; a "Ritual Casting" talent granting Mysticism as a primary skill for religious challenge scenes would be the clearest win
- **Social Intrigue:** Divine authority and temple standing as social capital — a "Sacred Office" or "Clerical Authority" talent granting social advantages when representing a religious tradition in formal scenes; serves Priest, Champion, and Oracle
- **Travel:** Celestial attunement for navigation — reading the stars, interpreting spirit-signs, following the path of a divine patron's constellation; distinct from Nature-based navigation because it uses supernatural knowledge rather than environmental expertise

---

## 5. Talent Suggestions

> **Status:** Deep design phase complete. All six designs below are production-ready pending owner review.

---

### Divine Favor (Mysticism, Basic)
*Through focused prayer and sacred ritual, you petition your deity or spirit patron to bless your companions before they face hardship.*

**Rank 1.** Once between rests, you can spend 10 minutes in focused prayer. Roll Spirit + Mysticism (TN 8). On a success, choose one ally who participated in the prayer and name one skill. Until their next rest, that ally gains +1 boon on the next roll they make using the named skill. The boon is lost when used or when the ally next rests.

**Rank 2.** On a Strong success or better, you can include yourself and one ally (rather than just one ally). The boon now applies to any single roll using the named skill before the ally next rests (not only their very next roll).

**Rank 3.** On any success, you can name two skills instead of one, granting a separate boon for each named skill. On a Strong success or better, yourself and up to two allies each receive a boon for one of the named skills.

**Archetype enablement:** Priest (primary — pre-encounter blessing ritual), Oracle (divine favor as foresight boon), Bard (group preparation before a performance or difficult undertaking).
**Design notes:** The once-per-rest constraint and 10-minute cost make this a preparation tool, not a combat resource. The roll requirement prevents automatic success — the blessing can fail, which gives it the weight of genuine prayer rather than a guaranteed buff. Naming the skill at prayer time (not at the moment of rolling) prevents retroactive optimization: the caster commits to a blessing type before knowing exactly which checks lie ahead. Rank 3's two-skill option creates meaningful advance decisions without exploding the number of boons in play. This replaces the undeveloped Favor-pool stub mechanic, which had no rank structure; the prayer-roll approach is mechanically consistent with the rest of the system.

---

### Mystical Spell Knowledge — Rank 5 (Mysticism, Signature)
*Extends the Signature talent to its pinnacle, granting access to the most powerful mystic spells of any tradition.*

**Rank 5.** +2 Focus. Learn two rank 5 or lower spells for any of your traditions. You can choose this Talent multiple times.

**Archetype enablement:** Druid, Priest, Oracle, Bard, Shaman — any Mysticism-primary build seeking pinnacle spells.
**Design notes:** Mirrors the R1–R4 pattern exactly. The +2 Focus per rank ensures the resource pool keeps pace with the increased cost of rank 5 spells.

---

### Pact of Devotion — Ranks 4 and 5 (Mysticism, Signature)
*At the highest ranks of devotion, your pact transcends personal covenant and becomes a force that reshapes entire encounters — inspiring armies, shielding the innocent, or delivering divine judgment on those who violate your sacred charge.*

**Rank 4.** You gain additional abilities based on your pact type:

**Glory.** Once per scene when you trigger your Glory ability, all allies within close range who also made a weapon attack or cast a spell that round may each apply the same Glory bonus (+2 damage or 2 HP recovery) to their own action.

**Piety.** Your Piety aura (from Rank 2) now extends to medium range. Once per scene, when an ally within your aura is targeted by an attack that uses their Resist as the difficulty, they can use your Resist score instead of their own.

**Protection.** Your healing pool increases to a maximum of 40 HP. Once per day, you can cure one Wound affecting a creature by spending 15 HP from your pool instead of 10 HP.

**Vengeance.** Your Vow of Enmity can target two creatures simultaneously when you speak it. When you use your Focus-to-damage ability (from Rank 2), deal +3 damage per Focus spent instead of +2.

**Rank 5.** You gain pinnacle abilities based on your pact type:

**Glory — Victory Surge.** Once per day, immediately after you reduce a creature to 0 HP, you can invoke a Victory Surge. For a short duration, you and all allies within short range each deal +3 damage (ability bonus) on their next hit, and each affected creature regains 6 HP.

**Piety — Divine Intercession.** Once per day, when you or any ally within medium range would be reduced to 0 HP, you can invoke Divine Intercession (no action required). That creature is instead reduced to 1 HP and gains resistance to all damage briefly.

**Protection — Sanctuary.** Once per day, as an Action, you invoke Sanctuary. All allies within close range gain +4 AV (armor bonus) and resistance to all damage for a short duration. While Sanctuary is active, you cannot attack. When a condition (dazed, stunned, frightened, or confused) is applied to an ally within range during Sanctuary, you can choose to have it transferred to you instead (you decide when it triggers, once per condition instance).

**Vengeance — Blood Oath.** Once per day, when your current Vow of Enmity target hits you or an ally, you can invoke Blood Oath as a reaction. Immediately make a free attack against the target with +2 boons. If this attack reduces them to 0 HP, regain all spent Focus and gain 10 temporary HP. If this attack does not reduce them to 0 HP, they are briefly stunned.

**Archetype enablement:** Priest and Champion (Glory, Protection, Piety), Shaman and Monk (Vengeance, Piety).
**Design notes:** Rank 4 expands each pact's unique scope rather than just adding a new number. Glory goes from "adjacent allies copy my trigger" to "allies can independently trigger the benefit on their own actions" — a genuine group-engagement shift that rewards coordinated teams. Piety's Resist-sharing makes a high-Mysticism Priest a magical shield for the entire group, not just themselves. Protection's R4 Wound-cure cost (15 HP from the pool) is a net improvement over the R2 rate (10 HP per Wound) because the pool doubles — total Wound-curing capacity increases substantially. Vengeance's dual-target Vow is the most impactful R4 mechanically, because the Focus-damage rider and +1 boon both now apply against two threats simultaneously. Rank 5 abilities are each a single triggered active — not semi-permanent passives. Glory's Victory Surge fires from the kill it rewards, turning a decisive strike into a group offensive surge (active, once/day, true to "Glory through victory"). Piety's Divine Intercession is a no-action reactive save-from-death — the most dramatic expression of protective righteousness, limited to one ally-save per day. Protection's Sanctuary is explicitly self-limiting (cannot attack while active) and adds the condition-transfer mechanic so the Protector genuinely sacrifices for allies rather than just buffing them from safety. Vengeance's Blood Oath converts the ongoing Vow of Enmity into a climactic reaction-strike; the kill-trigger Resolve refund and temporary HP together create comeback scenarios where eliminating the marked target pays for itself entirely, while the stunned fallback ensures the strike always matters even on a non-lethal hit.

---

### Song of Power (Mysticism, High-Level | Prerequisites: Mysticism 3, Influence 3)
*Your music, poetry, or spoken rite becomes a living mystic working — a performance that lifts your companions and unnerves your enemies as long as your voice holds.*

**Rank 4.** As an Action, you begin a mystic performance (concentration). While performing, at the start of each ally's turn within close range who can hear you, that ally gains +1 boon on their next roll before the start of their following turn. You maintain the performance using your Quick Action each turn. The performance ends if you are incapacitated, choose to stop, or lose concentration.

**Rank 5.** While you are performing, each enemy within close range who can hear you must roll Spirit + Fortitude against your Resist at the start of their turn or suffer +1 bane on their next roll (once per scene per creature). The effective range of your performance extends to short range for both the ally benefit and the enemy effect.

**Archetype enablement:** Bard (primary — performance-as-concentration is the defining Bard fantasy). Shaman (spoken rite or spirit-chant as the performance equivalent).
**Design notes:** Concentration limits this to a caster willing to forgo casting spells on most turns — a genuine trade-off that prevents stacking Song of Power with a full offensive spell barrage. The +1 boon per ally per round is ongoing (not once/scene total) because it only functions while maintaining concentration, which consumes the Quick Action every turn. Rank 5's enemy debuff uses the existing Resist mechanic, which is already defined in the system, and the "once per scene per creature" cap prevents the debuff from infinitely cycling on one target. Extending range to short at Rank 5 is meaningful because it lets the Bard stay outside melee while the performance reaches front-line allies and still pressures nearby enemies.

---

### Prophetic Sight (Mysticism, High-Level | Prerequisites: Mysticism 3, Insight 3)
*The Oracle's gift — glimpsing the web of fate before it is woven — manifests as truthful visions you can seek and the power to redirect destiny's hand at the critical moment.*

**Rank 4.** Once per day, you can spend 10 minutes in a prophetic trance. Name a specific subject: a creature, a place, or a forthcoming event. The GM provides a truthful vision of 1–3 sentences about the subject that includes at least one concrete, actionable detail. If the subject is shielded or genuinely unknowable, the GM states this directly rather than offering a misleading or empty answer.

**Rank 5.** Once per day, spend 1 Resolve to grant any ally a re-roll of any single failed roll. The ally must use the new result. Once per scene, you can declare "I saw this coming" — you and one ally of your choice automatically act before all enemies in the first round of combat.

**Archetype enablement:** Oracle (primary — divination is the defining Oracle fantasy). Shaman (ancestor-vision variant). Priest (divine omen interpretation).
**Design notes:** Rank 4's vision deliberately follows the "give the GM parameters, never open-ended" principle: the GM must include at least one concrete actionable detail, with an explicit fallback clause if the subject is shielded. This prevents the talent from being "ask the GM to invent something" and prevents deceptive or misleading answers that feel like traps. Rank 5 has two mechanically distinct abilities: the Resolve-spend re-roll is a tactical save (rescue an ally's critical failure) while "I saw this coming" is a pre-combat positioning advantage. Together they define the Oracle as a character who bends probability rather than generates raw force. The once/scene limit on the initiative jump prevents it from being used in every skirmish; the once/day limit on the re-roll prevents it from trivially saving every roll.

---

### Divine Authority (Mysticism, High-Level | Prerequisite: Mysticism 4)
*You speak with the full weight of the divine — your rites reach further and endure longer, and your presence alone can shatter the will of the profane and command the dead to still themselves.*

**Rank 4.** Once per scene when you cast a mystic spell, you can increase the spell's range by one step or its duration by one step (maximum scene duration) without increasing the spell's Focus cost.

**Rank 5.** Once per day, you can invoke divine authority as an Action. All enemies within short range who can see and hear you must roll Spirit + Fortitude against your Resist or be briefly frightened. Undead and spirits suffer +1 bane on this roll.

**Archetype enablement:** Priest (primary), Shaman (primary), Champion (secondary).
**Design notes:** Rank 4 provides a single-use spell upgrade without touching damage or Focus economy — it is pure scope expansion, and the one-step limit with a scene-duration cap prevents it from trivially converting brief-duration spells into permanent effects. The choice between range or duration must be made when casting; no retroactive selection. Rank 5's fear aura is not encounter-trivializing because "briefly frightened" is a one-round effect, and the once/day limit makes it a pivotal dramatic moment rather than a reliable opener. The undead and spirits penalty echoes the thematic role of a religious authority over liminal beings without granting hard immunity bypass against other creature types.
