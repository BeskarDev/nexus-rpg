# Domain NPCs & Staff

> **Companion to:** [Build Your Domain — GDD](DOMAIN_SYSTEM_GDD.md), §10. Staff are the faces of the domain: the roguelike hub-camp vendors and questgivers, made of the game's existing NPC relationship rules.

---

## 1. Two Layers: Seats and Specialists

- **Specialists** are skilled NPCs with a **grade** from 1 to 5, mirroring skill ranks (Novice, Adept, Expert, Master, Grandmaster). Facilities of Tier 2+ require a specialist of grade ≥ tier to function fully. One specialist staffs one facility.
- **Seats** are leadership offices. A seat is held by one specialist (who can also staff one facility in their field). A filled seat grants a standing benefit and a service menu. Seats have no build cost: they exist as soon as someone worthy holds them.

Every staff member is a real NPC: they have a role (Adventurer, Artisan, Authority, Scholar, Scoundrel, Seeker), a disposition toward the party, and the full use of the existing NPC relationship rules. **Tend to Relationships** works on staff. Feast Hall feasts work on staff. Insulting, underpaying, or ignoring staff has the consequences it sounds like it has.

---

## 2. Grades, Wages & Availability

| Grade | Title | Weekly Wage | How You Get Them |
|-------|-------|-------------|------------------|
| 1 | Novice | 10 coins | Hire freely at the domain or any settlement |
| 2 | Adept | 25 coins | Hire after a 1-week search in a settlement of rank 2+ |
| 3 | Expert | 50 coins | Hire after a 1-week search in a settlement of rank 3+, or a Recruit mission |
| 4 | Master | 150 coins | Never for hire on the open market. A Recruit mission gets a meeting. Winning them is a negotiation, a favor, or an adventure |
| 5 | Grandmaster | 400 coins | Always a story. There are perhaps a handful in the world per craft. Finding one is an arc, convincing them is another |

Wages are paid from the treasury as part of upkeep bookkeeping (fold them into the weekly upkeep total rather than tracking separately: add the wages of all staff to the domain's upkeep line once, when hired).

**Availability cap.** The open market never offers a specialist of grade higher than the local settlement rank + 1 or the domain rank + 1, whichever is higher. Grade 4 and 5 specialists are people with names, histories, and reasons, and they arrive through play. The "Wandering Talent" domain event is the lucky exception.

**Leaving.** Staff at Suspicious disposition or worse may quit, steal, or turn informant when events test them (the GM uses the Domain Event and Exposure tables' staff results on them first). Staff at Friendly or better may warn the party of trouble one event early, once per downtime phase.

---

## 3. The Seats

Each seat lists its standing benefit (always on while the seat is filled and its holder is at Indifferent disposition or better) and its service menu (things the party can ask for during downtime). A seat holder's grade caps what they staff, exactly like any specialist.

### Steward

*Typical role: Authority or Artisan. Runs the household and the books.*

- **Standing:** +1 boon on the weekly **upkeep check**. During party absences, the Steward keeps the domain running: catch-up Domain Turns resolve with the Steward rolling Oversee (grade as flat bonus, max +2) before any Disrepair lands.
- **Services:** Manage a construction project (tick one timer 1 extra step per downtime phase, grade 3+), prepare the seasonal accounts (the GM states the treasury's exact position and the next phase's expected costs).

### Master-at-Arms

*Typical role: Adventurer. Drills the guards, plans the defense.*

- **Standing:** +1 flat bonus on mission rolls resolved with **Force**, and on Force checks defending the domain.
- **Services:** Qualified teacher for Fighting, Archery, and Athletics (Train with a Master, if grade 3+), assess a threat (the GM states an enemy force's rough tier and numbers before a defense).

### Spymaster

*Typical role: Scoundrel. Runs the agents and the quiet work.*

- **Standing:** +1 flat bonus on mission rolls resolved with **Secrecy**, and the party may launch one mission per downtime phase without an adventurer spending a free action on it (the Spymaster initiates it).
- **Services:** Vet a newcomer (the GM states truthfully whether a new hire or contact hides hostile intent, once per newcomer), manage Heat (grade 3+: the Lay Low activity can be taken by the Spymaster once per downtime phase without costing any adventurer their week, using Secrecy + their grade bonus).

### Hierophant

*Typical role: Scholar or Authority. Keeps the rites and the faith.*

- **Standing:** **Provide Offering** on site gains +1 boon, and once per downtime phase the Hierophant performs the offering on the party's behalf without costing any adventurer their week.
- **Services:** Consecrate or purify a place or item (bounded: the GM confirms what mortal rites can and cannot cleanse, and names the quest if they cannot), counsel (one adventurer removes 1 Lingering Fatigue through a week of guided reflection, once each per downtime phase).

### Artificer

*Typical role: Artisan. Master of the workshop chain.*

- **Standing:** Staffs the Workshop chain up to their grade's Quality ceiling (see the [Facility Catalog](facility-catalog.md)). Commission fees at the domain drop from 25% to 10%.
- **Services:** Appraise any item truthfully, advise on materials (before a crafting project starts, the GM states the full material cost and where the materials can be found).

### Quartermaster

*Typical role: Artisan or Scoundrel. Keeps stores, supplies, and kit.*

- **Standing:** Readying Provisions is their job: the domain readies 1 additional Provision per departure (still respecting the 2-per-adventurer cap).
- **Services:** Outfit an expedition (buy any mundane gear up to the domain's rank cap without market searches, at list price), maintain kit (each departure, one item per adventurer gets a free Durability repair).

### Loremaster

*Typical role: Scholar. Keeper of the library and the questions.*

- **Standing:** +1 boon on **Research** on site, and the Loremaster can undertake Research on the party's behalf (one topic per downtime phase, resolved at their grade as the skill bonus).
- **Services:** Identify (name a creature, relic, or phenomenon from evidence, with the GM providing what a scholar of their grade would know), translate or decipher documents at one week per work.

### Envoy

*Typical role: Authority. The domain's voice abroad.*

- **Standing:** +1 flat bonus on mission rolls resolved with **Influence**, and one patron obligation timer can be delayed by 1 tick per downtime phase through the Envoy's diplomacy (as the Envoy Quarters benefit, and it does not stack with it).
- **Services:** Carry a message or offer to any named power and return with a true account of the reception, arrange an audience (halve the expense scope tier of one Petition/Negotiate, minimum Minor).

### Beastmaster

*Typical role: Seeker. Speaks the languages that have no words.*

- **Standing:** Mounts and companions housed at the domain recover fully each downtime week, and the "Sick Livestock" event is ignored on a 3+ (roll d6).
- **Services:** Train a mount or companion (per the mounts and companions rules, on site), source an animal (locate any mount of tier ≤ their grade for purchase at standard prices).

### Physician

*Typical role: Scholar or Artisan. Herbs, knives, and honesty.*

- **Standing:** **Recover** on site removes all Lingering Fatigue in addition to its normal benefit (as the Infirmary, and it does not stack with it: staffed Infirmary or Physician grants this once).
- **Services:** Diagnose truthfully (the GM states what ails a character or NPC and whether mortal medicine can treat it), attend the wounded after a defense (no follower or staff NPC dies of wounds from a domain event or defense mission while a Physician of grade 2+ serves).

---

## 4. Making Staff Memorable

Roll or pick once per hire. A staff NPC with a want is a questgiver waiting to happen.

**Quirk (d6):** 1 keeps a strange pet in their workspace, 2 old scars and older stories they won't finish, 3 devout beyond the domain's norm, 4 writes everything down in a cipher, 5 feuds politely with another staff member, 6 too famous locally for a quiet domain.

**Want (d6):** 1 a family member found or freed, 2 a rival humiliated or reconciled, 3 a masterwork completed before they die, 4 a debt paid off quietly, 5 a place in the domain's inner circle, 6 to go home someday, wherever that is.

> **Design Note:** Seats deliberately do the same kind of work everywhere: flat mission bonuses, one free activity per phase, one truthful answer from the GM. That is the "NPC services" fantasy of hub-camp games translated into the game's own verbs, and every truthful-answer service comes with parameters (what they can know, what needs a quest) so no GM is left improvising an oracle.
