# Writing the Text

Part of [designer-principles.md](../designer-principles.md); numbers are global and never renumbered.

Read before writing any stat block text or `lore` prose, and again as a final pass. Binds ability text, lore prose and treasure rows.

## In this file — How the text reads

| # | |
|---|---|
| **19** | SL escalation has one canonical wording: `increase the SL by one step (max. critical)`. |
| **28** | When two creatures share a sentence, name the subject — do not reach for a pronoun. |
| **29** | Lore prose: write for a middle schooler — one idea per sentence, concrete first, wit last. |
| **29a** | …and run the **register pass** on the finished draft: the hard word, and the clever construction. |
| **30** | Read every prose sentence aloud, and fix what the mouth stumbles on. |
| **31** | Lore prose has no modern narrator. Never debunk the setting's superstitions — record them. |
| **32** | Say it once. Never add the sentence that defends the first one. |
| **33** | `tactics` is a neutral briefing for the GM, with the creature as its subject. |

**Numbers are global and never renumbered, so this file is ordered for reading rather than by date.** Full text below in the same order.

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

### 29a. The register pass — the two defects that survive every other check

**The tier-3 lore shipped six of these past a clean punctuation sweep, a length check and a read-through**
(owner review, 2026-08-11). Every one is covered by the rule above and none was caught by it, because the
rule is a *standard* and what a draft needs is a *pass*. **Run the register pass as its own step, on the
finished draft, one noun and one construction at a time.** The two defects it looks for:

**The hard word.** A word the reader has to already know. The test is not "is this word real" but **would
a twelve-year-old stop here** — and if the plain word says the same thing, the hard one was never the
precise one.

| ❌ | ✅ | why |
|---|---|---|
| "between one polity and the next" | "out on the bad ground that no city has ever bothered to claim" | `polity` is a political-science word doing a job "city" does |
| "Rebound at the socket with wire" | "Bound at the socket with wire, twice over" | reads as the verb *rebound* before it reads as *bound again* |
| "Refaced twice" | "Faced over twice" | same defect, same word-shape |

`sinew`, `signet`, `carnelian`, `haft` and `cuirass` all stay. They are the precise word for a specific
thing and no plain word replaces them. That is the whole difference.

**The clever construction.** Harder to catch, because **every word in it is common** — the reader has to
decode a *shape* rather than a word. It always feels like the best sentence in the block while writing it.

| ❌ | ✅ | why |
|---|---|---|
| "Read forward it is the safe way through the hills, and read at the scoring it is where this ogre works" | three plain sentences: what it is, then what the crossing-out means | a two-clause riddle in a treasure row a GM reads mid-session |
| "Once somebody is inside the club" | "Once somebody is right up against them the club is no use" | states the fact instead of trusting a coined idiom to carry it |
| "the alternative is the ogre dealing with them" | "the alternative is having the ogre come to them" | the pun has to be unpacked before the fact arrives |
| "calls the difference the prayer" | "tells itself the prayer is the difference" | compressed to the point of inversion |
| "both things are true of the same night" | "those are the rites somebody interrupted" | elegant, and the reader cannot tell what happened |
| "Three metres of hungry" | "Three metres tall and always hungry" | a figure of speech in the slot where the establishing fact goes |

**The test for both: point at the fact the sentence delivers, then count the steps to reach it.** More than
zero is the defect. Wit is still allowed and still goes last (above) — a joke the reader gets *after* they
have the fact costs them nothing, and one they must solve *to* get the fact costs them the fact.

**Say what you swapped.** The pass is only real if it produces a list, because a pass that finds nothing is
indistinguishable from a pass that was not run. *(Owner review, 2026-08-11.)*

**30. Read every prose sentence aloud, and fix what the mouth stumbles on.** Grammatical is not the standard — a sentence can parse and still make a reader back up and take a second run at it. Three defects cause almost all of it, and all three survive a grammar check:

- **A half-finished idiom.** "Where someone is about to put their foot" is missing *down*: English says *put your foot down*, or just *step*. The reader completes the phrase themselves and loses a beat doing it. If a phrase has a fixed ending, write the ending or use a different verb.
- **A hedge stacked on an absolute.** "They are **simply always** where…" pairs a softener with a word that admits no exceptions, and each one undercuts the other. Pick the hedge or pick the absolute.
- **A modifier landing on the wrong noun**, or a clause whose subject changes halfway through.

Fixed: *"They are just always lying where somebody is about to step."* The test is mechanical and takes seconds: **read it out. If you pause anywhere you did not mean to, that is the defect** — do not go looking for a grammar rule to justify keeping it. This is prose craft, so it binds `narrative`, `ecology`, `tactics` and `physiology.reproduction`, and nothing on the stat block. *(Owner ruling, 2026-08-10, Reed Viper narrative.)*

**31. Lore prose has no modern narrator. Never debunk the setting's superstitions — record them.** This world is Bronze Age sword and sorcery, and its people do not have the scientific viewpoint that would let anyone say what a thing "really" is. A lore block that reaches for one is writing from outside the setting, and it costs the entry the only thing lore is for.

The failure sounds authoritative, which is why it slips through — three worked dismissals from the first Tomb Beetles draft are in [../case-studies.md](../case-studies.md#p31).

**Write what people believe, as the thing that is so.** The beetles are what the necropolis priests call the last of the offerings. A quay without leatherwings is a quay the sea has turned against, and no captain who believes it ties up there. **Two competing beliefs beat one belief and one correction**: some cities take the jackals as the dead being met on the road, others as a sign the rites were begun badly.

**The vagueness is the deliverable, not a gap in the entry.** A belief left unresolved is an offer to the GM: they decide at their table which rumours are true, which are half true, and which are pure superstition, and the same creature can be an omen in one campaign and a nuisance in the next. Settling it in the text takes that choice away and hands back one fixed answer, which is worth less than the question. So attribute beliefs and stop — *the priests call them*, *sailors say*, *some cities take it as* — and never append the sentence that tells the reader which camp is right.

Two habits keep the door open: **attribute rather than assert**, and **avoid "actually", "in truth", "really"** entirely, since each one announces that the entry is about to rule on something.

Mechanical truth is the exception and it lives elsewhere: the stat block and `tactics` say what is definitely so, because a GM has to run the fight. The beetles genuinely will not cross fire. Whether they are the tomb's unpaid offerings is not the stat block's business. *(Owner rulings, 2026-08-10, Tomb Beetles narrative.)*

**32. Say it once. Never add the sentence that defends the first one.** The commonest padding in this bestiary is not decoration, it is **anticipated objection**: a clause that guards a statement the reader had already accepted. `Primitive materials, Quality 1, swept up by the handful. Chitin proper is a Quality 3 special material, and this is not that.` The Quality was stated four words in. Nobody was going to confuse the two, and the defence is longer than the thing defended.

The tell is a clause that argues rather than informs — *and this is not that*, *rather than merely damaged*, *which is worth coins and nothing in a fight*, *as looted gear almost always is*, *the amount a medium creature yields*, *since there is almost nothing on them*. Every one of those either repeats a value already given, or restates a published rule the GM applies anyway. Cut the clause and nothing is lost.

Two questions catch it before it ships. **Did I already say this?** — if the row opens `Quality 1`, it does not close by ruling out Quality 3. **Would a reader have got this wrong?** — if not, the sentence is answering a question nobody asked, and it makes the entry sound unsure of itself.

**Trust the reader and trust the rules.** A stat block is read by someone who has the rulebook; a term used correctly needs no chaperone. This is a writing rule with a design edge: text spent defending is text not spent on the thing that makes the creature worth reading. *(Owner ruling, 2026-08-10, Tomb Beetles treasure table.)*

**33. `tactics` is a neutral briefing for the GM, with the creature as its subject.** It says what the
creature does, what it goes for, what stops it and when it breaks off. It does not stage the scene, does
not state the obvious, and does not tell the players what to do.

**The full rule lives in [../lore-schema.md](../lore-schema.md#tactics)** — the five things the field
covers, the ❌/✅ table, and the three bans — because that is the file open when the field is being
written. Do not restate it here; this entry exists so a writing pass knows the field has its own rule.

The two failures worth carrying in the writing file, because they are prose defects rather than schema
ones:

**Cut, do not convert.** A stage direction rewritten as an instruction is still a defect.

> **Before.** …so cutting that person free costs the crocodile its whole turn. Say so out loud when it happens.
>
> **After.** …so cutting that person free costs the crocodile its whole turn.

**Turn every limit into behaviour.** A sentence whose subject is the party has drifted into a player
handout. The fact survives, the subject changes:

| ❌ party as subject | ✅ creature as subject |
|---|---|
| "a party standing back to back has already beaten them" | "run them in pairs working one target, and have them give up on anyone they cannot get behind" |
| "a party warned to watch the ground has taken the ambush away" | "once they are spotted they have nothing left to do but leave" |
| "the party's answer is distance and patience, not damage" | "they never speed up, never flank, and never choose a better target" |
| "cutting that person free costs the crocodile its whole turn" | "a crocodile with someone in their jaws spends the turn dragging rather than attacking" |

Naming the party is fine where they are genuinely the object of the creature's behaviour — "they go for
whoever stands between them and the grain" — because the creature is still doing the verb.

**The test: would this sentence survive in a scout's report?** Emphasis is still allowed and still carries
weight; **bolding the one fact that decides the fight** is briefing, not staging. Both rounds of
correction: [../case-studies.md](../case-studies.md#p33). *(Owner rulings, 2026-08-10 and 2026-08-11,
D-083.)*
