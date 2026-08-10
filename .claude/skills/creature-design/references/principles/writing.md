# Writing the Text

Part of [designer-principles.md](../designer-principles.md); numbers are global and never renumbered.

Read before writing any stat block text or `lore` prose, and again as a final pass. Binds ability text, lore prose and treasure rows.

**19. SL escalation has one canonical wording: `increase the SL by one step (max. critical)`.** Copy it verbatim, never paraphrase. `SL` is published and defined in `docs/01-basic-rules/01-how-to-roll.md`, so the abbreviation costs the reader nothing, and the parenthetical carries the cap in two words. The longhand it replaces — "increases the success level of a hit by one step, to a maximum of a critical hit" — is twenty-two words for the same rule on a card where space is the scarce resource. The same discipline applies to every recurring mechanic: **once a pattern has a canonical form, drift is a defect**, because a GM who has read the phrase once should recognise it instantly rather than re-parse a variant. *(Owner ruling, 2026-08-09.)*

**28. When two creatures share a sentence, name the subject — do not reach for a pronoun.** The house rule that creatures are **they/their/them** stands and is not the problem. The problem is that *any* pronoun fails once a second creature is in scope: "When this creature uses Protect Ally, **they** take half the damage" could be the protector or the ally, and swapping to "it" would only disambiguate by accident — it reads as the protector *because the ally happens to be a person*, and breaks the moment both are beasts.

**Write `This creature` as the subject instead, and the pronoun usually disappears along with a word or two.** The published trait library already does this and never reaches for a pronoun at all: `Natural Climber`, `Undead Nature` and `Keen Scent` each open with "This creature". The fix is normally shorter than the ambiguity:

> ~~When this creature uses Protect Ally, they take half the damage from the attack.~~
> **When using Protect Ally, this creature takes half damage.**

**And order the sentence general to specific:** the situation first, the detail last. "This creature takes half damage when using Protect Ally" is unambiguous but makes the reader hold a number before learning what it belongs to. Leading with the origin lets a GM scanning a stat block discard the line the moment it does not apply. This is the ability template (`trigger, effect, limit`) at sentence scale, so a line that opens with its effect has usually inverted the template rather than found an exception to it.

`they/their/them` stays correct wherever **only one creature is in scope** — `Blood Up`'s "they stop fighting carefully", `Grave-Bound`'s "they rise again at the next sunset" — and everywhere in lore and flavour text. Never use `it/its` for a creature: that is reserved for objects, zones, areas and spells. *(Owner ruling, 2026-08-09.)*

**29. Lore prose: write for a middle schooler — one idea per sentence, concrete first, wit last.** The register is set in [../../../game-basics.md](../../../game-basics.md#reading-level) and applies to every design skill: plain words, short clauses, and a hard word only when it is the precise one. `sinew` and `signet` stay; a `bund` is a bank and `offal` is guts. `narrative`, `ecology` and `tactics` are the only free prose in the creature schema, so they are the only place the writing can drift. The recurring defect is a sentence carrying three ideas — a subject, a participial aside, and a second clause bolted on with "and" — which reads as sophistication and lands as work. **Long sentences are fine when they are long about one thing.**

**Open on the concrete and close on the turn.** The first sentence is an establishing shot: what a person would actually see. An aphorism in the opening slot makes a reader decode before they have anything to decode with. Put the dry observation last, where it has an image to land on — the joke is not lost, it is aimed.

**Never make the reader unpack an idiom to reach a fact.** "Keeping the distance a thrown stone travels" is a riddle whose answer is "just out of reach". Ornament belongs on things the reader already understands, never on the thing they are trying to learn. Same for meta-phrasing that narrates the sentence you are writing ("which in practice means") — saying the thing is always shorter.

This is **not** an instruction to write flatly. The worked before/after keeps the original's joke word for word and simply moves it behind the image:

> **Before.** They are the funeral's other congregation. Every burial road out of a city has its jackals, keeping the distance a thrown stone travels, and every gravedigger knows the ones that work their stretch. Nobody has ever successfully driven them off anything.
>
> **After.** A lean grey scavenger of the burial roads. Jackals follow funerals at the edge of a thrown stone's range, and they have learned which processions leave food. Every gravedigger knows the ones that work their stretch, and none of them has ever driven one off for good.

Same length, same facts, and the reader now sees the animal before being told what to think about it. The checklist form of all of this is in [../lore-schema.md](../lore-schema.md) § Writing the prose. *(Owner ruling, 2026-08-09.)*

**30. Read every prose sentence aloud, and fix what the mouth stumbles on.** Grammatical is not the standard — a sentence can parse and still make a reader back up and take a second run at it. Three defects cause almost all of it, and all three survive a grammar check:

- **A half-finished idiom.** "Where someone is about to put their foot" is missing *down*: English says *put your foot down*, or just *step*. The reader completes the phrase themselves and loses a beat doing it. If a phrase has a fixed ending, write the ending or use a different verb.
- **A hedge stacked on an absolute.** "They are **simply always** where…" pairs a softener with a word that admits no exceptions, and each one undercuts the other. Pick the hedge or pick the absolute.
- **A modifier landing on the wrong noun**, or a clause whose subject changes halfway through.

Fixed: *"They are just always lying where somebody is about to step."* The test is mechanical and takes seconds: **read it out. If you pause anywhere you did not mean to, that is the defect** — do not go looking for a grammar rule to justify keeping it. This is prose craft, so it binds `narrative`, `ecology`, `tactics` and `physiology.reproduction`, and nothing on the stat block. *(Owner ruling, 2026-08-10, Reed Viper narrative.)*

**31. Lore prose has no modern narrator. Never debunk the setting's superstitions — record them.** This world is Bronze Age sword and sorcery, and its people do not have the scientific viewpoint that would let anyone say what a thing "really" is. A lore block that reaches for one is writing from outside the setting, and it costs the entry the only thing lore is for.

The failure sounds authoritative, which is why it slips through. Three sentences from the first draft, all of them dismissals dressed as clarity:

- *"They are not a plague and not an omen. They are what happens to a sealed room over four hundred years."* — states the modern answer and rules out the two readings a Bronze Age priest would actually hold.
- *"Some cities read that as an omen. Others read it as a jackal knowing where the food is."* — offers a belief and then overrules it with the rational reading, so the belief is scenery.
- *"Almost nobody stops to think that they are looking at a dinosaur."* — the same voice plus a 19th-century coinage, which principle 22 already forbids on names.

**Write what people believe, as the thing that is so.** The beetles are what the necropolis priests call the last of the offerings. A quay without leatherwings is a quay the sea has turned against, and no captain who believes it ties up there. **Two competing beliefs beat one belief and one correction**: some cities take the jackals as the dead being met on the road, others as a sign the rites were begun badly.

**The vagueness is the deliverable, not a gap in the entry.** A belief left unresolved is an offer to the GM: they decide at their table which rumours are true, which are half true, and which are pure superstition, and the same creature can be an omen in one campaign and a nuisance in the next. Settling it in the text takes that choice away and hands back one fixed answer, which is worth less than the question. So attribute beliefs and stop — *the priests call them*, *sailors say*, *some cities take it as* — and never append the sentence that tells the reader which camp is right.

Two habits keep the door open: **attribute rather than assert**, and **avoid "actually", "in truth", "really"** entirely, since each one announces that the entry is about to rule on something.

Mechanical truth is the exception and it lives elsewhere: the stat block and `tactics` say what is definitely so, because a GM has to run the fight. The beetles genuinely will not cross fire. Whether they are the tomb's unpaid offerings is not the stat block's business. *(Owner rulings, 2026-08-10, Tomb Beetles narrative.)*

**32. Say it once. Never add the sentence that defends the first one.** The commonest padding in this bestiary is not decoration, it is **anticipated objection**: a clause that guards a statement the reader had already accepted. `Primitive materials, Quality 1, swept up by the handful. Chitin proper is a Quality 3 special material, and this is not that.` The Quality was stated four words in. Nobody was going to confuse the two, and the defence is longer than the thing defended.

The tell is a clause that argues rather than informs — *and this is not that*, *rather than merely damaged*, *which is worth coins and nothing in a fight*, *as looted gear almost always is*, *the amount a medium creature yields*, *since there is almost nothing on them*. Every one of those either repeats a value already given, or restates a published rule the GM applies anyway. Cut the clause and nothing is lost.

Two questions catch it before it ships. **Did I already say this?** — if the row opens `Quality 1`, it does not close by ruling out Quality 3. **Would a reader have got this wrong?** — if not, the sentence is answering a question nobody asked, and it makes the entry sound unsure of itself.

**Trust the reader and trust the rules.** A stat block is read by someone who has the rulebook; a term used correctly needs no chaperone. This is a writing rule with a design edge: text spent defending is text not spent on the thing that makes the creature worth reading. *(Owner ruling, 2026-08-10, Tomb Beetles treasure table.)*

**33. `tactics` is a neutral briefing written for the GM, with the creature as its subject. Cut every sentence that stages the scene, states the obvious, or tells the players what to do.** The field says what the creature does, what it goes for, what stops it, and when it breaks off. It does not tell the GM how to present any of that, and it does not narrate the consequence of a fact it has already given.

Two rounds of correction landed on the same rule from opposite sides, and the second is the one to remember.

**Round one, the stage directions.** *"Whoever cuts their friend loose has genuinely solved the problem, and the party should be allowed to notice."* Allowed by whom, doing what? It asks the GM to arrange an emotion, and pads itself with `genuinely` and `the problem` because there is no concrete claim underneath. Same shape: *"the lesson only lands if the party watches it happen"*, *"and that frustration is the point"*, *"let them retreat where the players can see it"*, *"make that boundary visible"*.

**Round two: rewriting them as instructions was still wrong.** The stage direction became *"Say so out loud when it happens"*, which has a verb and is still a defect — it states the obvious and **breaks the register of a neutral briefing**. The mechanical fact was already there in the sentence before it. A GM who has read "cutting that person free costs the crocodile its whole turn" does not need to be told to mention it.

So the rule is not "convert staging into instructions", it is **cut**:

> **Before.** …so cutting that person free costs the crocodile its whole turn. Say so out loud when it happens.
>
> **After.** …so cutting that person free costs the crocodile its whole turn.

The same pass removed *"Run one as a hazard, not as a threat"*, *"and none of it is a rule"*, *"a fight with one should almost never be rolled at all"* and *"that is the counterplay"*. Every one was the entry explaining itself to the GM instead of briefing them.

**Write from the GM's chair, with the creature as the subject.** The field exists to help someone *run* these creatures, so a sentence whose subject is the party has drifted into a player handout. The first pass was full of them: *"a party standing back to back has already beaten them"*, *"a party warned to watch the ground has already taken the ambush away"*, *"the party's answer is distance and patience"*, *"scattering them is the real work of the fight"*. Each states a true thing about the creature's limits and then points it at the wrong reader — the GM does not need to be told what the players should do, and telling them makes the counterplay read as a solution to apply rather than a weakness to play honestly.

**Turn every limit into behaviour.** The fact survives, the subject changes, and the GM gets an instruction instead of a spoiler:

| ❌ party as subject | ✅ creature as subject |
|---|---|
| "a party standing back to back has already beaten them" | "run them in pairs working one target, and have them give up on anyone they cannot get behind" |
| "a party warned to watch the ground has taken the ambush away" | "once they are spotted they have nothing left to do but leave" |
| "the party's answer is distance and patience, not damage" | "they never speed up, never flank, and never choose a better target" |
| "cutting that person free costs the crocodile its whole turn" | "a crocodile with someone in their jaws spends the turn dragging rather than attacking" |
| "scattering them is the real work of the fight" | "keep them shoulder to shoulder, and have them reform the line whenever it breaks" |

Naming the party is still fine where they are genuinely the object of the creature's behaviour — "they go for whoever stands between them and the grain" — because the creature is still doing the verb.

**The test: would this sentence survive in a scout's report?** A briefing states what is true and stops. It does not coach delivery, it does not label its own content ("that is the counterplay"), and it does not spell out what follows from the line above. Emphasis is still allowed and still carries weight — **bolding the one fact that decides the fight** is briefing, not staging. *(Owner rulings, 2026-08-10, Young Crocodile tactics.)*
