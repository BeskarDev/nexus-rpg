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

**Interest** is a numeric modifier representing how willing the NPC is to cooperate. It is applied directly to the challenge TN — positive Interest makes rolls easier, negative Interest makes them harder.

**Setting Initial Interest:**

Combine two modifiers:

1. **Disposition** — use the NPC's current disposition value from the [NPCs and Relationships](../02-adventurers/05-npc-relations.md) table (Intimate +2, Friendly +1, Indifferent 0, Suspicious −1, Hostile −2, Hateful −3).

2. **Request Alignment** — how well the request fits the NPC's own goals:

| Alignment | Modifier |
| --- | --- |
| Directly benefits the NPC | +1 |
| Neutral to the NPC | 0 |
| Opposed to the NPC's interests | −1 |

**Starting Interest = Disposition modifier + Request Alignment modifier.** If the starting Interest is −2 or lower, the NPC refuses without a challenge.

**Applying Interest to TN:** Subtract the current Interest from the challenge TN (positive Interest reduces the TN; negative Interest increases it).

> **Example:** Base TN 10 (Hard). Interest +2 → Effective TN 8. Interest −1 → Effective TN 11.

**Changing Interest during the challenge:**

- **Appealing to a Motivation**: +1 Interest (maximum +3).
- **Triggering a Pitfall**: −1 Interest. If Interest drops to −2 or lower, the intrigue ends immediately in a **Breakdown** — the NPC refuses and may become hostile.

---

## Patience

**Patience** is the challenge die for a Social Intrigue. Choose its size based on how long the NPC is willing to engage:

| Die | Exchanges | Best For |
| --- | --- | --- |
| d4 | 4 | Impatient, busy, or cautious NPCs |
| d6 | 6 | Typical negotiation with a willing NPC |
| d8 | 8 | A deliberate NPC who prefers to take their time |

**The key difference from standard challenges:** the challenge die advances by 1 on **every roll** — regardless of whether it was a success or failure. A critical success advances it by 2. This reflects the NPC's patience ticking down with each exchange; they will make up their mind when it runs out, no matter how the conversation went.

Failures and blunders add consequences as normal — they do not slow the die down. Consequences shape the difficulty of later exchanges and the NPC's final state.

When the die reaches 0, the NPC has heard enough. The outcome is determined by the **final Interest level** (see [Resolution](#resolution)).

> **Example:** A d4 Patience die represents a four-exchange negotiation. Each roll — success or failure — reduces it by 1. A critical success reduces it by 2. The negotiation ends after at most 4 exchanges; the party must build Interest before time runs out.

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

When the challenge die reaches 0, the NPC makes their decision. The outcome is determined by the **final Interest level**:

| Final Interest | Outcome |
| --- | --- |
| +3 or higher | **Full success.** The NPC agrees fully and willingly. |
| +1 to +2 | **Partial success.** The NPC agrees with conditions or reduced scope. |
| 0 | **Failure.** The NPC declines — they weren't persuaded. |
| −1 or lower | **Breakdown.** The NPC refuses and may become hostile. |

> If Interest drops to −2 or lower at **any point during the challenge**, the intrigue ends immediately in a Breakdown — don't wait for the die to run out.

---

## Example

**Situation**: The party needs Kaleth, a busy merchant, to smuggle a sealed crate past harbor customs. Kaleth has a **Friendly** disposition (+1) toward the party, but the request **opposes his interests** (−1).

**Starting Interest**: +1 (Friendly) + (−1) (Opposed) = **0**. Base TN is Hard (10). Effective TN = 10 − 0 = **10**.

**Patience (challenge die)**: d4 — Kaleth is preparing his ship and has little time.

**Motivations**: *Desire: Profit*, *Fear: Customs authority*.

**Pitfalls**: *Threat: Mentioning past smuggling*, *Insult: Suggesting the job is easy*.

> **Exchange 1** — Theron opens by offering double the standard rate, appealing to *Desire: Profit*. The GM confirms this addresses a Motivation: Interest rises from 0 to **+1**. Effective TN drops to **9**. Theron rolls Spirit + Influence vs TN 9: **Strong Success**. No consequence. Die: 4 → 3.
>
> *"Double rate? That gets my attention. But what's in the crate?"*
>
> **Exchange 2** — Mira uses Insight to read Kaleth's body language before committing further. She rolls Spirit + Insight vs Kaleth's Resist: **Critical Success**. The GM reveals both Pitfalls. Die: 3 → 1 (critical success advances by 2).
>
> *Mira notices Kaleth glance nervously at the harbor master's tower and stiffen when his past shipping work is mentioned.*
>
> **Exchange 3** — One exchange left. Theron, armed with Mira's intelligence, addresses *Fear: Customs authority* without mentioning past smuggling and acknowledges the difficulty of the job. Interest rises from +1 to **+2**. Effective TN drops to **8**. Theron rolls vs TN 8: **Weak Success**. No consequence. Die: 1 → 0.

**Resolution**: Final Interest = +2 → **Partial success** — Kaleth agrees, but he wants assurances: triple rate and the party takes full legal responsibility if anything goes wrong.

