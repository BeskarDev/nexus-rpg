---
sidebar_position: 8
---

# 🗣️ Social Intrigue

Social Intrigue scenes are a **specialized application of the Challenge system** for resolving complex social encounters — negotiations, persuasion, deception, alliance-building, and other multi-step interactions where a single skill roll is insufficient to capture the dramatic weight of the scene.

Use the [Challenge rules](./07-challenges.md) as the foundation. This page adds only the social-specific layer on top: **Interest**, **Patience**, **Motivations**, and **Pitfalls**.

---

## When to Use Social Intrigue

Use a Social Intrigue when:

- The NPC has **reasons to resist** and won't simply agree after one good argument.
- The outcome involves **meaningful stakes** — alliances, trade deals, political support, information, safe passage.
- **Multiple approaches** could work, and different party members could contribute in different ways.
- The interaction would benefit from **dramatic pacing** with rising tension and potential reversals.

Do **not** use a Social Intrigue for:

- Simple transactional exchanges (buying supplies from a friendly merchant).
- Interactions where the NPC has no reason to resist (asking an ally for publicly available information).
- Situations better resolved by a single skill test (a quick bluff to get past a distracted guard).

---

## Interest

**Interest** represents an NPC's willingness to engage and cooperate. It ranges from **Eager** to **Resistant** and directly modifies the effective TN of all social rolls in the challenge.

| Level | Interest | TN Modifier |
| --- | --- | --- |
| +3 | **Eager** | −2 |
| +2 | **Receptive** | −1 |
| +1 | **Open** | +0 |
| 0 | **Skeptical** | +1 |
| −1 | **Resistant** | +2 |

### Setting Initial Interest

Derive the NPC's starting Interest from two factors:

1. **Disposition** — use the NPC's current disposition toward the adventurers (see [NPCs and Relationships](../02-adventurers/05-npc-relations.md)):

| Disposition | Interest Modifier |
| --- | --- |
| Intimate (+2) | +2 |
| Friendly (+1) | +1 |
| Indifferent (0) | 0 |
| Suspicious (−1) | −1 |
| Hostile (−2) | −2 |
| Hateful (−3) | Breakdown (refuse immediately) |

2. **Request Alignment** — how well the request aligns with the NPC's own goals and interests:

| Request | Interest Modifier |
| --- | --- |
| Directly benefits the NPC | +1 |
| Neutral to the NPC | 0 |
| Opposed to the NPC's interests | −1 |

Add both modifiers together, then look up the result in the Interest table above. Clamp the result between Resistant (−1) and Eager (+3). If the starting Interest would fall below Resistant, the NPC refuses without a challenge.

### Changing Interest

Interest changes during the challenge when adventurers **appeal to Motivations** or **trigger Pitfalls**:

- **Appealing to a Motivation**: +1 Interest (maximum Eager).
- **Triggering a Pitfall**: −1 Interest. If Interest drops below Resistant, the social intrigue ends immediately in a **Breakdown** — the NPC refuses and may become hostile.

---

## Patience

**Patience** is the timer die for a Social Intrigue — separate from the standard challenge die that tracks progress toward the goal. It represents how many exchanges the NPC will tolerate before making up their mind.

Choose Patience based on the NPC's temperament and situation:

| Die | Exchanges | Best For |
| --- | --- | --- |
| d4 | 4 | Impatient, busy, or cautious NPCs |
| d6 | 6 | Typical negotiation with a willing NPC |
| d8 | 8 | A deliberate NPC who prefers to take their time |

Patience ticks down with **every roll** made during the challenge (successes and failures alike), while the challenge die ticks down only on successful rolls. Both dice are on the table simultaneously. When Patience reaches 0, the challenge ends and resolves based on current progress.

> **Example**: A d6 challenge die (progress) and a d4 Patience die are placed on the table. Each success reduces the challenge die. Every roll — regardless of success or failure — reduces Patience. If the challenge die reaches 0 first, the party fully convinces the NPC. If Patience reaches 0 first, the outcome depends on how far the challenge die has progressed.

---

## Motivations & Pitfalls

Motivations and Pitfalls are GM-facing notes about the NPC's personality and life story. They provide **actionable hooks** for players who invest effort in reading the room — and clear stakes for those who don't.

### Motivations

A **Motivation** is something the NPC cares about: a desire, a fear, a bond, or a value. When an adventurer makes a successful appeal that speaks directly to a Motivation, **Interest increases by +1**.

Prepare 2–3 Motivations per NPC. Examples:

- *Desire: Profit* — Values coin above all. Offering generous payment or emphasizing financial gain appeals to this.
- *Fear: Public disgrace* — Dreads losing face in their community. Offering to handle matters discreetly appeals to this.
- *Bond: Their family* — Would do anything to protect their children. Framing the request in terms of family safety appeals to this.
- *Value: Justice* — Believes deeply in fairness. Demonstrating that the request serves a just cause appeals to this.

> Motivations are **discoverable** through successful Insight, Education, or Lore rolls — or through careful roleplay and listening.

### Pitfalls

A **Pitfall** is something that offends, threatens, or alarms the NPC. When an adventurer stumbles into a Pitfall — intentionally or not — **Interest decreases by −1**.

Prepare 1–2 Pitfalls per NPC. Examples:

- *Threat: Mentioning their past crimes* — The NPC panics and shuts down if it feels like leverage.
- *Insult: Underestimating their expertise* — The NPC takes pride in their skill; dismissing it provokes resentment.
- *Rival: Invoking a hated faction's name* — Any association with their old enemy raises immediate suspicion.
- *Taboo: Discussing certain topics* — Cultural, religious, or personal matters that are off-limits in this context.

---

## Resolution

Social Intrigue can end in three ways:

| Outcome | Condition |
| --- | --- |
| **Full success** | The challenge die reaches 0 before Patience expires. The NPC agrees fully. |
| **Partial success** | Patience expires with the challenge die at or below half its starting value. The NPC agrees with conditions or reduced scope. |
| **Failure** | Patience expires with the challenge die above half its starting value. The NPC refuses. |
| **Breakdown** | Interest drops below Resistant at any point. Immediate refusal; the NPC may become hostile. |

> Patience is the **timer** (ticks down every roll); the challenge die tracks **progress** (ticks down only on successes). Both are on the table simultaneously.

---

## Example

**Situation**: The party needs Kaleth, a busy merchant, to smuggle a sealed crate past harbor customs. Kaleth has a **Friendly** disposition (+1) toward the party, but the request **opposes his interests** (−1). Starting Interest: Friendly (+1) + Opposed (−1) = **Open (+1), TN modifier +0**. Base TN is Hard (10), so **Effective TN = 10**.

**Patience** (timer die): d4 (Kaleth is preparing his ship for departure).  
**Challenge die** (progress): d4 (a short negotiation — four successful exchanges needed).

**Motivations**: *Desire: Profit* (generous payment), *Fear: Customs authority* (showing the risk can be neutralized).

**Pitfalls**: *Threat: Mentioning past smuggling* (feels like blackmail), *Insult: Suggesting the job is easy* (dismisses his expertise).

> Exchange 1: Theron appeals to *Desire: Profit* — Interest rises from Open (+1) to Receptive (+2), TN modifier drops to −1, Effective TN = 9. Rolls Strong Success. Challenge die: 4 → 3. Patience: 4 → 3.
>
> Exchange 2: Mira uses Insight to investigate — Critical Success reveals both Pitfalls. Patience: 3 → 2. No challenge die progress (Investigate doesn't advance the challenge).
>
> Exchange 3: Theron addresses *Fear: Customs authority* and avoids both Pitfalls — Interest rises to Eager (+3), TN modifier drops to −2, Effective TN = 8. Rolls Weak Success. Challenge die: 3 → 2. Patience: 2 → 1.
>
> Exchange 4: Patience is at 1. Theron offers a concession — the party takes full legal responsibility. Rolls Weak Success. Challenge die: 2 → 1. Patience: 1 → 0.

**Result**: Patience expired with the challenge die at 1. Half of 4 = 2; the challenge die value of 1 is at or below half. **Partial success** — Kaleth agrees but demands triple rate and a signed letter of accountability.
