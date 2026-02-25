---
sidebar_position: 8
---

# 🗣️ Social Intrigue

Social Intrigue covers the messy, back-and-forth work of negotiation, persuasion, deception, and alliance-building. It is a specialized application of the [Challenge rules](./07-challenges.md), built for situations where a single skill roll is not enough and the NPC's stance needs to be tracked over time.

This page adds the social-specific layer on top: **Interest**, **Patience**, **Motivations**, and **Pitfalls**.

---

## When to Use Social Intrigue

Use a Social Intrigue when:

- The NPC has reasons to resist and won't simply agree after one good argument.
- The stakes are high: alliances, trade deals, political support, information, safe passage.
- Multiple approaches could work, and different party members can contribute in different ways.
- The interaction would benefit from dramatic pacing, with rising tension and the possibility of things going wrong.

Do **not** use a Social Intrigue for:

- Simple transactional exchanges (buying supplies from a friendly merchant).
- Interactions where the NPC has no reason to resist (asking an ally for publicly available information).
- Situations better resolved by a single skill test (a quick bluff to get past a distracted guard).

---

## Interest

**Interest** tracks how willing the NPC is to cooperate. It is a simple modifier applied directly to the challenge TN: positive Interest makes rolls easier, negative Interest makes them harder.

**Setting Initial Interest**

Combine two modifiers to find the starting value:

1. **Disposition.** Use the NPC's current disposition from the [NPCs and Relationships](../02-adventurers/05-npc-relations.md) table (Intimate +2, Friendly +1, Indifferent 0, Suspicious −1, Hostile −2, Hateful −3).

2. **Request Alignment.** How well the request fits the NPC's own goals:

| Alignment | Modifier |
| --- | --- |
| Directly benefits the NPC | +1 |
| Neutral to the NPC | 0 |
| Opposed to the NPC's interests | −1 |

Starting Interest equals the Disposition modifier plus the Request Alignment modifier. If the result is −2 or lower, the NPC refuses without a challenge.

**Applying Interest to TN.** Subtract the current Interest value from the base challenge TN. Positive Interest lowers the TN; negative Interest raises it.

> **Example.** Base TN 10 (Hard). Interest +2 gives an effective TN of 8. Interest −1 gives an effective TN of 11.

**Changing Interest during the challenge:**

- Appealing to a Motivation raises Interest by +1 (maximum +3).
- Triggering a Pitfall lowers Interest by −1. If Interest drops to −2 or lower at any point, the intrigue ends in a **Breakdown**: the NPC refuses and may become hostile.

---

## Patience

**Patience** is the challenge die for a Social Intrigue. Choose its size based on how long the NPC is willing to engage:

| Die | Exchanges | Best For |
| --- | --- | --- |
| d4 | 4 | Impatient, busy, or cautious NPCs |
| d6 | 6 | A willing NPC with competing interests |
| d8 | 8 | A deliberate NPC who prefers to take their time |

Unlike standard challenges, the die advances by 1 on **every roll**, success or failure alike. A critical success advances it by 2. Failures and blunders still add consequences as normal; they simply don't pause the clock.

A small die means a short, high-pressure negotiation. The NPC will make up their mind quickly, and the party needs to build Interest fast. A larger die gives more room to maneuver, discover Motivations, and recover from mistakes.

When the die reaches 0, the NPC has heard enough. The outcome is determined by the final Interest value (see [Resolution](#resolution) below).

> **Example.** A d4 die means at most four exchanges. Each roll reduces it by 1 (or by 2 on a critical success). The party has a narrow window to win the NPC over before they make their decision.

---

## Motivations & Pitfalls

Motivations and Pitfalls are GM-facing notes that give the NPC a recognizable personality. They reward players who pay attention and punish those who don't.

### Motivations

A Motivation is something the NPC genuinely cares about: a desire, a fear, a bond, or a deeply held value. When an adventurer makes a successful appeal that speaks to a Motivation, Interest increases by +1.

Prepare 2–3 Motivations per NPC. Examples:

- *Desire: Profit.* Coin matters above most things. Generous payment or clear financial gain gets this NPC's attention.
- *Fear: Public disgrace.* Losing face in front of the community is a genuine nightmare. Offering discretion and a way to avoid embarrassment goes a long way.
- *Bond: Family.* This NPC would take real risks for their children. Framing the request around family safety makes it personal.
- *Value: Justice.* They believe in fairness. Showing that the request punishes wrongdoing or corrects an injustice is a strong play.

Motivations can be discovered through successful Insight, Education, or Lore rolls, or through patient roleplay and careful listening.

### Pitfalls

A Pitfall is something that offends, threatens, or alarms the NPC. Stumbling into one, even by accident, lowers Interest by −1.

Prepare 1–2 Pitfalls per NPC. Examples:

- *Threat: Mentioning their past crimes.* Anything that sounds like leverage will shut this NPC down fast.
- *Insult: Underestimating their expertise.* They take pride in what they do. Dismissing the difficulty of the task stings.
- *Rival: Invoking a hated faction's name.* Any association with their old enemy raises immediate suspicion.
- *Taboo: Certain topics.* Cultural, religious, or personal matters that are simply not up for discussion in this context.

---

## Resolution

When the challenge die reaches 0, the NPC decides. The outcome depends on the final Interest value:

| Final Interest | Outcome |
| --- | --- |
| +3 or higher | **Full success.** The NPC agrees fully and willingly. |
| +1 to +2 | **Partial success.** The NPC agrees with conditions or a reduced scope. |
| 0 | **Failure.** The NPC declines; they weren't convinced. |
| −1 or lower | **Breakdown.** The NPC refuses and may become hostile. |

If Interest drops to −2 or lower at any point mid-challenge, the intrigue ends in a Breakdown immediately. Don't wait for the die to run out.

---

## Example

**Situation.** The party needs Kaleth, a busy merchant, to smuggle a sealed crate past harbor customs. Kaleth is Friendly toward the party (+1), but the request directly opposes his interests (−1).

**Starting Interest:** +1 (Friendly) + (−1) (Opposed) = 0. Base TN is Hard (10), so effective TN starts at 10.

**Patience (challenge die):** d4. Kaleth is preparing his ship and has little time.

**Motivations:** *Desire: Profit*, *Fear: Customs authority*.

**Pitfalls:** *Threat: Mentioning past smuggling*, *Insult: Suggesting the job is easy*.

> **Exchange 1.** Theron opens by offering double the standard rate, appealing to *Desire: Profit*. The GM confirms this hits a Motivation: Interest rises from 0 to +1, and effective TN drops to 9. Theron rolls Spirit + Influence: **Strong Success**. Die: 4 to 3.
>
> *"Double rate? That gets my attention. But what's in the crate?"*
>
> **Exchange 2.** Mira uses Insight to read Kaleth before the party commits to anything else. She rolls Spirit + Insight vs Kaleth's Resist: **Critical Success**. The GM reveals both Pitfalls. Die: 3 to 1 (critical success advances by 2).
>
> *Mira notices Kaleth glance nervously at the harbor master's tower and go rigid when his past shipping work is mentioned.*
>
> **Exchange 3.** One exchange left. Theron addresses *Fear: Customs authority*, shows a plan for handling the inspection, and is careful to praise the difficulty of the job. Interest rises from +1 to +2, and effective TN drops to 8. He rolls vs TN 8: **Weak Success**. Die: 1 to 0.

**Resolution.** Final Interest is +2, which is a **Partial success**. Kaleth agrees, but he wants assurances: triple rate and a signed letter putting legal responsibility on the party.

