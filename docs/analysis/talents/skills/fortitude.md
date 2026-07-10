# Fortitude — Talent Design Workbench

> **Source:** [docs/03-statistics/06-talents/fortitude.md](../../../03-statistics/06-talents/fortitude.md) | **Main Analysis:** [TALENT_SYSTEM_ANALYSIS.md](../TALENT_SYSTEM_ANALYSIS.md)

## 1. Skill Identity

**Role Spread:** Excels: Defense | Decent: Healing, Support | Weak: Offense, Utility, Control

**Primary Archetypes:** Barbarian (support), Brawler (support), Champion (support), Fighter (support), Gladiator (support), Hoplite (support), Monk (support), Warlock (support), Warlord (support)

**Identity Tags:** endurance threshold, damage shrugging, condition shaking, long-haul stamina, rally point

**Design Lens:** Fortitude is the body and will — the measure of how long a character keeps going when everything else says stop. Where Fighting expresses *how* you fight, Fortitude expresses *how long*. Its unique talent contribution is the "threshold" fantasy: reactive toughness that activates specifically when HP is low, conditions land, or allies need anchoring. No other skill offers Second Wind, Battle Rage's HP-fueled damage spends, or Drunken Technique's attack redirection — these mechanics are Fortitude's alone. The skill is well-served for martial archetypes but thin on the social-command dimension (rallying demoralised allies, steadying a breaking line) that its "Support/decent" role rating implies.

---

## 2. Current Talent Inventory

| Talent | Path | Max Rank | Status | Role | Notes |
|--------|------|----------|--------|------|-------|
| Adrenaline Rush | Basic | — | Incomplete | Combat | Stub only: "something with taking damage to gain benefits" |
| Battle Rage | Basic | R3 | Complete | Combat | Core Barbarian signature; HP-spend damage at each rank |
| Body of Bronze | Basic | R3 | Complete | Combat | Unarmored AV + HP; resistance at R3 |
| Drunken Technique | Basic | R3 | Complete | Combat | Only redirection talent in system; requires intoxication |
| Explorer's Tenacity | Basic | R3 | Complete | Utility | Travel integration; injury-as-fatigue at R2 |
| Hard to Kill | Signature | R3 | Complete | Combat | Wound-ignore; Signature designation means should reach R5 |
| Heavy Armor Mastery | Basic | R3 | Complete | Combat | AV-doubling reaction; rigid reduction |
| Juggernaut | Basic | R3 | Complete | Combat | Multi-enemy melee; Cleave upgrade at R2 |
| Second Wind | Basic | R3 | Complete | Combat | Self-healing on Quick Action; twice/scene at R3 |
| Strong Mind | Basic | R3 | Complete | Utility | Mental defense and psychic resistance |
| Tough Stomach | Basic | R3 | Complete | Utility | Condition removal; per-turn use at R3 |

**Summary:** 11 talents total — 10 complete, 1 incomplete. Max rank: R3. Role distribution: ~64% combat / ~27% utility / 9% incomplete.

---

## 3. Gaps & Priorities

**Signature gap:** Battle Rage is a strong Barbarian signature. Hard to Kill serves survivalists across martial archetypes. However, Fortitude has no talent expressing the "rally" dimension of its Support/decent role — neither Champion (holy warrior endurance) nor Warlord (inspiring presence while taking hits) have a Fortitude-native anchor. Monk and Warlock use Fortitude for concentration and endurance but have no dedicated Fortitude talent supporting their specific fantasies (spiritual discipline, sustained pact-cost).

**Role gaps:** Healing/Support is rated as "decent" but only Second Wind and partial Explorer's Tenacity deliver any HP economy — and Second Wind is self-only. No talent empowers an ally through Fortitude. The "rally" aspect — stabilising allies' morale or HP via the character's visible toughness — is entirely absent. Fortitude has no downtime talent beyond Explorer's Tenacity.

**System integration gaps:** Explorer's Tenacity is excellent Travel integration. Strong Mind interacts with morale/fear in Challenge-adjacent scenes. But no talent explicitly uses Challenge system language, and Social Intrigue has zero Fortitude hooks. A talent for the "endurance challenge" type (resisting poisons in ritual trials, outlasting opponents in endurance contests) would be natural.

**Rank gaps:** Hard to Kill reaches R3 but its Signature designation requires R4 and R5 content — currently 2 ranks are missing. No Fortitude talent reaches R4 with complete content. A Grandmaster Fortitude character has 5+ unspendable TP. Adrenaline Rush must be completed before any new talent is added to avoid a broken progression path.

**Priority ranking for design work:**
1. Complete Adrenaline Rush stub — blocks character builds that invested TP expecting it to work
2. Extend Hard to Kill to R4 and R5 per Signature designation
3. Add a Rally/Morale talent serving Warlord and Champion's support dimension
4. Add a Concentration-under-pressure talent for Monk and Champion (Spell Concentration interaction when taking damage)

---

## 4. Design Space

Fortitude's deepest unexplored territory is the **communal endurance** space: the character whose toughness actively protects or stabilises those around them. Currently every Fortitude talent is strictly personal — even Battle Rage's R2 temporary HP and Juggernaut's adjacency AV bonus ultimately serve only the caster's combat survival. A Fortitude-based "anchor" talent — where standing firm and absorbing damage creates a boon for nearby allies (morale, temporary HP, repositioning freedom) — would express the "rally point" identity tag and justify Fortitude's "Support/decent" rating with real mechanical weight.

The "tolerance" and "tenacity" aspects also suggest a more gradual design space: talents that improve under accumulated stress rather than resetting. Adrenaline Rush was intended to be damage-receipt-triggered, and that design vector — bonuses that unlock *because* you took hits, not before — is unique in the system and worth developing carefully. Characters who fight better at low HP (not just survive longer) are a distinct fantasy from Second Wind's recovery loop.

### Unexplored Thematic Angles
- **Communal anchoring:** A talent where the character's visible toughness — taking damage without flinching — grants adjacent allies a morale bonus or resistance to being frightened/demoralised; the "rally point" fantasy
- **Escalating pressure:** Abilities that improve as the character takes more damage — stacking damage-to-bonus conversion like Adrenaline Rush was sketched to be — expressing the "tenacity" aspect in a mechanically unique way
- **Concentration discipline:** A talent specifically for maintaining Spell Concentration under duress (Champion, Monk, Warlock all require this), reinforcing Fortitude's "concentration" aspect that currently only Strong Mind touches indirectly
- **Ritual endurance:** Fasting, vigil, or ritual self-denial as a downtime activity that temporarily boosts Fortitude or unlocks a spiritual boon — expressing the ascetic discipline side of Monk and Champion

### System Integration Opportunities
- **Challenges:** Endurance contests (forced marches, poison trials, extended sieges) are natural Fortitude challenge types; no talent currently names Challenge mechanics explicitly; an "Indomitable" or "Grit" talent enabling Fortitude rolls in physical endurance challenge phases would be the clearest win
- **Social Intrigue:** A "Steadfast Presence" talent converting visible physical toughness into social authority — useful for Champion (religious intimidation), Warlord (military presence), and Gladiator (arena reputation)
- **Travel:** Explorer's Tenacity already does this well; a second travel-interaction talent giving Fortitude characters a defined Travel role (the one who carries the group's burdens when supplies run short) would complete the coverage

---

## 5. Talent Suggestions

> **Status:** Deep design pass complete (2026-07). Three designs produced: one stub completion (Adrenaline Rush), one Signature extension (Hard to Kill R4–R5), one High-Level capstone (Unbreakable). Battle Rage activation issue noted below without redesign.

> **Battle Rage activation flag (do not redesign here):** Battle Rage R1 does not specify an action cost or trigger for entering the rage — it says "you can enter a battle rage on your turn" without clarifying whether this costs an Action, Quick Action, or is free. This is a design ambiguity that should be resolved in the talent itself (not here), but is noted to avoid designing other talents that assume a specific activation cost.

---

### Adrenaline Rush (Fortitude, Basic)
*Pain is fuel. The harder you're hit, the harder you hit back — each blow stoking a fire that burns brighter the longer the fight goes.*

**Rank 1.** Once per scene, when you take 5 or more damage from a single source (after subtracting AV), you gain 4 temporary HP and +1 boon on your next attack roll or Fortitude roll. This boon expires at the end of your next turn (briefly).

**Rank 2.** Your Adrenaline Rush now activates on 4 or more damage instead. When it activates, you may also immediately remove one condition affecting you: dazed, weakened, or frightened.

**Rank 3.** Once per scene, when your Adrenaline Rush ability would activate, you may choose to enter an amped state instead of gaining the normal benefits. While amped (short duration), your attacks deal +2 damage (ability bonus) and each hit against you deals 2 less damage (to a minimum of 0). You can still gain the normal Adrenaline Rush benefits on subsequent activations within the same scene if you did not choose the amped state for them.

**Archetype enablement:** Barbarian (taking hits while raging), Fighter (absorbing frontline punishment), Brawler (gritty close-quarters attrition), Champion (holy resilience under fire), Monk (spiritual discipline tested under duress).

**Design notes:** Completes the long-standing stub ("something with taking damage to gain benefits"). Fills the analysis gap for a damage-receipt-triggered mechanic — a fantasy unique in the system and distinct from Second Wind (proactive recovery) and Battle Rage (stance-based offensive mode). The graduated design: R1 establishes the trigger and basic benefit (temp HP + boon), R2 expands the trigger window and adds the "shake-it-off" condition removal that suits Fortitude's "tenacity" aspect, R3 converts the reactive buff into an offensive stance. The amped state deliberately uses the "short duration" window: it covers a full combat encounter but isn't permanent, and the once-per-scene activation cap prevents abuse by pre-staging it.

---

### Hard to Kill (Fortitude, Signature — R4 and R5 extension)

*[Ranks 1–3 already exist in the talent file.]*

**Rank 4.** +2 HP. Once per day, when you would be reduced to 0 HP by any source of damage, you are instead reduced to 1 HP and remain conscious. You may act on your next turn as normal.

**Rank 5.** +2 HP. Once per day, when you would suffer your third Wound and die, you don't die. Instead, treat it as your second Wound — you are at 0 HP with 2 Wounds, you immediately gain 10 temporary HP, and you may act on your next turn. This temporary HP lasts until the end of the scene.

**Archetype enablement:** Barbarian, Fighter, Champion, Brawler, Hoplite — any archetype that invested in the full Hard to Kill Signature chain and whose primary function is absorbing punishment on behalf of the group.

**Design notes:** Hard to Kill is a Signature talent and must reach R5. The existing R1–R3 chain covers: improve death/wound d4 rolls (R1), ignore one Wound per day (R2), regain Strength HP on Wound-ignore (R3). R4 adds automatic 0→1 HP survival once per day — a "last stand" mechanic that makes the character literally impossible to drop unconscious once per day. R5 adds death prevention: the third Wound becomes the second, giving the character 10 temporary HP and one more turn at the absolute edge. The +2 HP per rank is consistent with R1–R3. Both R4 and R5 use "once per day" resource limits, appropriate for their power level as session-defining survival abilities.

---

### Unbreakable (Fortitude, High-Level)
*You have been poisoned, beaten, terrified, and left for dead — and learned that none of it is enough to stop you. You rise.*

**Rank 4.** Once per day, as a Quick Action, you immediately remove all conditions currently affecting you (any combination of dazed, stunned, frightened, confused, restrained, prone, marked, bleeding, or weakened). Until the start of your next turn, you also gain +2 AV (ability bonus) as your body surges with controlled endurance.

**Rank 5.** Once per day, as a Quick Action, you enter an Unbreakable state for a short duration (approximately 1 minute). While Unbreakable, you are immune to all conditions — any condition that would be applied to you is negated and has no effect. A grapple or restrain that was already in place when you activate this ability is suppressed during the duration and may resume after the state ends if the source is still valid.

**Archetype enablement:** Fighter, Champion, Hoplite, Barbarian — front-line archetypes for whom being locked down by conditions (restrained, stunned, frightened) is a critical vulnerability that ends encounters.

**Design notes:** Fills the High-Level Fortitude gap identified in §8.5 of the talent system analysis. Completes the "Unbreakable" concept ("once per day, become briefly immune to all conditions"). Existing Fortitude talents clear conditions individually and piecemeal (Tough Stomach R3 clears one condition between turns; Strong Mind R2 clears one mental effect per scene; Adrenaline Rush R2 clears one of three specific conditions) — no talent clears the full spectrum in one action. R4 is the emergency clearing ability: costly resource (once per day) for a powerful reactive effect with a brief AV bonus giving it secondary defensive value. R5 upgrades to proactive immunity for sustained combat, appropriate as a session-defining passive. Short duration at R5 covers a full combat encounter without being effectively permanent.

---

### Iron Anchor (Fortitude, High-Level)
*When you refuse to fall, others find the will to stand.*

**Rank 4.** Once per scene, when you take damage that reduces you to half your maximum HP or below (after subtracting AV), you may call out as a free action — all allies within short range who can see you immediately remove the frightened condition (if they have it) and each gains +1 boon on their next attack roll or saving roll. This ability triggers once even if multiple instances of damage reduce you past the threshold in the same turn.

**Rank 5.** Permanent passive: while you have more than half your maximum HP, allies within short range of you who can see you cannot gain the frightened condition. Once per day, as a Quick Action (Rally): every ally within short range who can see you regains 6 HP and removes the frightened condition if present. You suffer 1 Fatigue from the effort.

**Archetype enablement:** Champion (the holy warrior who holds the line while the faithful look on), Warlord (the battle leader who inspires through personal toughness, not just commands), Hoplite (the formation anchor whose presence keeps the phalanx from breaking), Barbarian (the unstoppable horror whose endurance emboldens allies rather than just serving the self).
**Capstone feeling:** You are the reason your allies don't break. Stories are told of the battle where you fought on at half-dead, holding the line together through sheer refusal to yield. Those stories aren't exaggerations.
**Design notes:** Fills the single remaining gap in Fortitude's High-Level coverage — the communal rally dimension that the skill's "Support/decent" role rating promised but no talent delivered. Hard to Kill and Unbreakable both cover personal survival; Iron Anchor is the talent that turns personal toughness into an active force for allies. R4 is reactive (triggers when you cross the damage threshold, no action cost, once per scene) — it fires at the moment enemies are focusing you down, immediately rallying allies as the cost of wounding you. R5 builds the aura (the HP threshold — more than half max — creates tactical tension: enemies can extinguish the aura by focusing damage on you, which is the correct adversarial move) and adds the once-per-day Rally as the session-defining moment. Healing numbers (6 HP per ally) sit well below the spell-healing ceiling and are capped by "once per day," range, and a 1 Fatigue cost — consistent with talent-healing design constraints. No cross-skill prerequisite: any Fortitude Grandmaster should be able to be the anchor, regardless of social or martial investment.
