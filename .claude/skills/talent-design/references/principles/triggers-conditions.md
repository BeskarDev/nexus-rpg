# Designer Principles — Triggers & Conditions

Global stable numbering, never renumber. Index of all concerns: [../designer-principles.md](../designer-principles.md). If a number referenced here is missing, grep this directory for `^\*\*NN.`.

**8. Debuffs key off rolls that actually happen.** The acting side rolls against static Defenses; a defender only rolls in specific carve-outs (end-of-turn saves, entering a hazard, contested checks). "The target suffers +1 bane to resist X" is dead text when X resolves by the attacker rolling. Grant the boon to rolls the party makes, lower a Defense, or apply a condition. *(spell principle 90)*

**9. High-impact conditions never ride automatic, no-roll triggers.** An on-miss or on-hit emitter uses a low-impact condition (distracted, briefly slowed); frightened and stronger need a roll, a save, or an SL gate. A defensive talent that frightens every attacker who whiffs is repeated hard control for free. *(spell principle 88)*

**10. Check every condition against its definition; parameterized conditions carry their (X).** Write "suffers burning (4) for a short duration", never "briefly burning". Copy a published talent's or spell's exact phrasing rather than writing from memory. *(spell principle 73)*

**11. Kill-riders say "slain", and never key on a condition the triggering attack consumes.** Elite and Lord creatures refill HP on Wounds, so "reduced to 0 HP" erases a boss mid-fight. Marked ends when the next attack resolves, so an attack cannot both consume and be gated by it. *(spell principle 80)*

**26. Condition severity comes from the Nexus definitions, not genre assumptions.** Never reason about a condition from its name or its D&D counterpart — open `docs/05-combat/04-conditions.md` and design against what the condition actually does. The canonical trap: Nexus **stunned** does not disable a creature (they still move or act, at +1 bane, no Quick Actions); full incapacitation is **paralyzed** alone. Consequences: stunned is a legitimate rolled-AoE ceiling condition rather than an encounter-deleting one, while paralyzed sits a full severity tier higher and needs correspondingly harsher gates (rolled, single-target or very limited, repeat-save escape valves as in Paralyzing Poison and Sacred Covenant). Budget and drama assessments (principle 9, R4–R5 ceilings) key off the real text. *(Owner ruling 2026-07-18, P1.3 session: corrected an overestimation of Presence of Conquest R5's stun-on-critical — "stunned doesnt fully disable a creature in Nexus RPG, that is only achieved by paralyzing them.")*
