# Special Materials — Implementation Catalog

> **Status:** Design proposals pending owner approval. Nothing here is published. Current state verified against `docs/04-equipment/07-magic-items/materials.md` on 2026-07-19: all 10 Exotic (Q3–Q4) materials have effects; of the Greater (Q5–Q6) tier only Mithril has effects (armor/shield only); none of the 10 Legendary (Q7–Q8) materials have effects.
>
> **Relationship to [materials-mechanical-effects-analysis.md](../../materials-mechanical-effects-analysis.md):** that document is the deep-dive prerequisite (vault lore integration, coherence audits, escalation charts). This catalog is the implementable spec — its proposals revised against the 2026-07-19 owner rulings (principles 21–23). Where the two diverge, this catalog governs; divergences are listed per entry.

## Category Identity

Materials are the third pillar of the magic item system beside quality bonuses and enchantments. They define what an item **is made of**: intrinsic, always-there properties, distinct from what an enchantment lets it *do*. Material + enchantment always coexist on one item; neither may duplicate the other's identity.

**Binding design rules** (materials analysis §1 + owner rulings 2026-07-19):

1. **Low mental load (principle 22).** Passive first; cooldown reactive (1/scene, 1/day, simple trigger) at most. No per-hit decision menus, no multi-clause conditionals, no die-level micro-decisions.
2. **Multi-type coverage (principle 23).** Each material states effects for every item type it plausibly makes — minimum three unless the fiction forbids it (stated in the entry).
3. **No baseline stacking.** Never +weapon damage, +AV, +spell power, +max Focus — materials provide lateral benefits.
4. **No passive casting boons.** Spellcasting help is cooldown-limited or type-conversion only.
5. **Tier budgets:** Exotic = one modest passive or 1/scene reactive. Greater = one strong passive + one secondary. Legendary = two strong passives, or passive + potent reactive + unique ability. Thematically linked materials must clearly escalate across tiers, never duplicate.
6. **Q7–Q8 sourcing (principle 21):** legendary materials can be *worked* by mortal masters into Q7 items. Q8 items are artifacts — legendary material in a Q8 context is part of an artifact's story, not a shopping decision.
7. Immunities granted by materials are narrow, condition-scoped, and visible on the item (principle 13 applies).
8. **Catalyst scoping (principle 24 + addendum, owner rulings 2026-07-19).** Catalysts are **cores inlaid into a held or worn item** — a loose core casts nothing, and an inlaid core uses its host item's material and enchantment, bringing none of its own. "Spell Catalyst" lines below therefore apply only to fixed implements whose core is inseparable from the item (wands, staffs, orbs) — those are their own host. Moving a core between items takes an artisan an hour and one Crafting roll (Difficulty by core quality).
9. **Wearable slot gate (principle 25, owner ruling 2026-07-19).** "Wearable" lines below apply only to garment-scale slots: **Body, Back, Feet, and Hands** (robes, tunics, cloaks, mantles, boots, bracers, gloves). Head, Neck, Rings, and Waist items can be made of special materials for value and appearance but gain no material effect. A ring must not grant the same passive as a robe; this also caps the wearable material-passive pile at four. Materials whose garment form strains the fiction (solid metals, bone, crystal) take the form of woven threads, sewn scales, or studded panels on the garment — state the form in the item description.

## Item-Type Coverage Variance (owner check 2026-07-19)

Can every base item type be built from a tier-appropriate special material? Matrix by material class:

| Item need | Exotic (Q3–Q4) | Greater (Q5–Q6) | Legendary (Q7–Q8) |
|-----------|----------------|------------------|--------------------|
| Blades, axes, maces (metal) | Iron, Dwarf-Steel | Meteorite, Deep Iron, Mithril, Solarite, Adamantite | Orichalcum, Aegium, Titanium, Eternite |
| Bows, staffs, spears (wood/horn) | Darkwood, Silverroot, Runebark | Treantwood, Dragon Bone | Elderwood, Elder Dragon Bone, Infernal Horn |
| Light armor (hide/silk/scale) | Chitin, Giant Spider Silk, Monster Scales, Wyrmhide | Phantom-Silk, Dragon Scales, Mithril | Elder Dragon Scales, Dreamweave, Celestial Feathers |
| Heavy armor (metal/scale) | Dwarf-Steel, Monster Scales | Deep Iron, Dragon Scales, Adamantite, Mithril | Aegium, Titanium, Elder Dragon Scales |
| Shields (wood/metal/hide) | Darkwood, Runebark, Monster Bone | Treantwood, Deep Iron, Adamantite | Elderwood, Aegium, Titanium |
| Spell catalysts (crystal/wood/bone) | **GAP — none in docs** | Meteorite, Treantwood, Solarite, Dragon Bone | Orichalcum, Eternite, Elderwood, Elder Dragon Bone, Infernal Horn |
| Wearables, robes (cloth/silk/crystal) — Body/Back/Feet/Hands slots only (principle 25) | Giant Spider Silk (light armor only — **partial gap**) | Phantom-Silk, Lunarite, Solarite | Dreamweave, Celestial Feathers, Eternite |
| Ammo (wood/bone/stone) | Darkwood, Silverroot | Dragon Bone | Elder Dragon Bone |

**Variance verdict:** coverage is sound at Greater and Legendary once this catalog lands — every base item type has 2+ material options per tier, including composite-bow horn (Infernal Horn), bow wood (Treantwood/Elderwood), and robe cloth (Phantom-Silk/Dreamweave). Two Exotic-tier gaps remain:

1. **No Exotic spell catalyst material.** Recommend adopting **Elemental Stones** from the vault proposals (materials analysis §2.2.3), simplified per principle 22: *Catalyst — choose one element at creation; once per scene, a spell dealing that element's damage deals +2 damage. Ammo — deals the chosen element instead of physical damage.*
2. **No Exotic cloth/wearable material.** Recommend extending **Giant Spider Silk** with a Wearable line: *Wearable — this item has 0 load and cannot be torn by mundane means.*

## Greater Materials (Q5–Q6) — Full Implementation

### Mithril (rework of published effects)

*Silver-blue metal, feather-light with tremendous hardness, from sky-veins of the highest peaks.*

| Item Type | Effect |
|-----------|--------|
| Any | -1 load (min. 0). |
| Armor | Reduce the rigid property by 1 (min. 0). Heavy armor also loses the noisy property. |
| Shield | Reduce the rigid property by 1 (min. 0). You can wield a heavy shield with one hand free of penalty where a talent or ability would normally require adjustment. |
| Weapon | Also -1 load applies (Any); the weapon counts as one step lighter for carrying and drawing (drawing it is never an Action). |

> **Divergence from old proposal + tier-power finding (owner-prompted):** published Mithril was armor/shield only — a principle 23 violation — and its budget (-1 load, -1 rigid) sat closer to Exotic Chitin than a Greater material. The rework keeps the pure-lightness identity but spreads it across all types and adds the noisy removal. **Open question:** if this still reads under-tier, the ceiling-safe buff is a second utility passive (armor counts as one category lighter for swimming and climbing penalties), not a defense stat.

### Meteorite

*Blue-silver cosmic metal from fallen stars, saturated with wild magic.*

| Item Type | Effect |
|-----------|--------|
| Weapon/Ammo | Once per scene, on a hit, you can deal the damage as one elemental type of your choice (fire, frost, lightning, or acid). |
| Spell Catalyst | Once per scene, you can change a damaging spell's damage type to fire, frost, lightning, or acid. |
| Armor | Once per scene, when you take fire, frost, lightning, or acid damage, you can gain resistance against that damage. |
| Wearable | Once per day, when you take fire, frost, lightning, or acid damage, you can gain resistance against that damage. |

All meteorite items emit dim light in melee range. (Cooldown reactives with one simple choice — the versatility *is* the identity; principle 22 boundary case, accepted.)

### Treantwood

*Wood given freely by awakened trees. It still lives, and it remembers.*

| Item Type | Effect |
|-----------|--------|
| Any | Once per day, ignore a failed Durability check for this item. |
| Weapon/Shield | During a short break in natural surroundings, this item regains 1 lost Durability die. |
| Spell Catalyst | Once per scene, when you fail to cast a mystic nature-tradition spell, you keep the Focus that cast would have spent. |

> Weapon line added (principle 23) — covers bows, staffs, spears, clubs. The living-wood regrowth is the shared identity across combat types.

### Dragon Bone

*Bones of true dragons, marrow still burning with their element. Bones attack.*

| Item Type | Effect |
|-----------|--------|
| Weapon/Ammo | Choose one element at creation (fire, frost, lightning, or acid). The weapon deals that element instead of physical damage. Once per scene, on a hit, deal +2 damage of that element (ignore AV). |
| Spell Catalyst | Choose one element at creation. Once per scene, a spell dealing that element's damage deals +2 damage. |
| Heavy Armor | Choose one element at creation. You gain resistance against it. |

> **Divergence:** shield and wearable lines moved to Dragon Scales — bones attack, scales protect. Catalyst line added (bone wands and staffs).

### Dragon Scales

*Scales of true dragons, elementally attuned. Scales protect.*

| Item Type | Effect |
|-----------|--------|
| Light Armor | Choose one element at creation (fire, frost, lightning, or acid). You gain resistance against it. -1 load (min. 0). |
| Heavy Armor | Choose one element at creation. You gain resistance against it. Once per day, ignore one condition inflicted by an attack dealing that element's damage. |
| Shield | Choose one element at creation. You gain resistance against it. |
| Wearable | Choose one element at creation. Once per scene, when you take damage of that element, you can gain resistance against it. |

### Deep Iron

*Ore from the deepest mines, twice the weight of steel, deaf to magic.*

| Item Type | Effect |
|-----------|--------|
| Weapon | +1 load. Once per scene, on a hit, your damage ignores the target's magical resistances and magical AV bonuses (natural and mundane AV still apply). |
| Heavy Armor | +1 load. Once per scene, when you take damage from a spell or magical ability, you can gain resistance against that damage. |
| Shield | +1 load. Once per scene, when you take damage from any source, you can gain resistance against that damage. |
| Wearable | Once per day, when you take damage from a spell, you can gain resistance against that damage. |

> Weapon rider simplified per principle 22 (was a strong/crit conditional with a clause list; now a 1/scene reactive). Wearable line added (principle 23).

### Phantom-Silk

*Silk of spectral spiders, nearly weightless, half in this world.*

| Item Type | Effect |
|-----------|--------|
| Light Armor | -1 load (min. 0). Once per day, move through one non-magical wall or barrier up to 1 pace thick as part of your movement. |
| Wearable | Once per scene, when a creature hits you with an attack, you can become briefly intangible and gain resistance against that attack's damage. |
| Spell Catalyst | 0 load. Once per day, cast a spell without giving any visible or audible sign of casting (as the Silent Spell metamagic, without the Focus surcharge). |

> **Divergence:** shield line dropped — a silk shield fails the fiction test (principle 23 exception, stated). Catalyst line added: a woven casting-veil fits the spectral identity; effect borrowed from published metamagic to stay low-load.

### Solarite

*Sun-crystal alloyed with bronze in temple ritual. It has never been cold.*

| Item Type | Effect |
|-----------|--------|
| Weapon/Ammo | The weapon deals fire damage instead of physical damage. It emits bright light in melee range and dim light in close range. |
| Spell Catalyst | Once per scene, one spell's fire damage ignores resistance to fire. |
| Armor | You are immune to the burning (X) condition. The armor emits dim light in melee range. |
| Wearable | Once per day, ignore the burning (X) condition when it would be applied to you. The item emits dim light in melee range. |

> The burning immunity is narrow, condition-scoped, and visibly glowing (principle 13 satisfied). The light is also the counterplay: solarite and stealth do not mix.

### Lunarite

*Moon-crystal that drinks heat and magic. The great equalizer.*

| Item Type | Effect |
|-----------|--------|
| Heavy Armor | You are immune to the charmed condition. Once per day, when you take damage from a spell, you can gain resistance against that damage. |
| Shield | Once per scene, when you take damage from a spell or magical ability, you can gain resistance against that damage. |
| Wearable | You are immune to the charmed condition. Magical attempts to detect, locate, or scry you fail. |

> Deliberately no weapon or catalyst line: lunarite suppresses magic — a lunarite catalyst is a contradiction (principle 23 exception, stated). The anti-scrying passive carries worldbuilding reach (principle 19): flag to owner that lunarite jewelry is the counter-tool to Seer's Mirrors and similar items, which is a feature if priced Q5+.

### Adamantite

*Near-indestructible metal of the lost deep clans. Only heirlooms remain.*

| Item Type | Effect |
|-----------|--------|
| Any | The item never requires Durability checks and cannot be broken by non-magical means. |
| Weapon | Ignores the AV and HP of non-magical objects and structures — it cuts through doors, chains, and walls without resistance. |
| Armor | Once per scene, when you take physical damage, reduce it by 2 (after AV). |
| Shield | Once per scene, when you take physical damage, reduce it by 2 (after AV). Cannot be sundered by any weapon or ability. |

## Legendary Materials (Q7–Q8) — Full Implementation

Craftable into Q7 items by living masters; in Q8 artifacts they are part of the story (principle 21).

### Orichalcum

*Gold steeped in ley-line magic over aeons. Enchantments placed on it deepen.*

| Item Type | Effect |
|-----------|--------|
| Any | Any enchantment on this item with daily uses gains +1 daily use. |
| Weapon | Once per scene, on a hit, deal the damage as any one damage type of your choice. |
| Armor/Shield | -1 load (min. 0). Reduce the rigid property by 1 (min. 0). |
| Spell Catalyst | Once per day, after a successful cast, treat the result as one SL higher (weak → strong, strong → critical). |

### Celestial Feathers

*Feathers fallen from divine wings. They remember the sky.*

| Item Type | Effect |
|-----------|--------|
| Any | -1 load (min. 0). You never take falling damage. The item emits dim light in melee range. |
| Light Armor | +1 Movement per turn. Once per day, fly up to medium distance as part of your movement (land or hover gently at turn's end). |
| Heavy Armor | Reduce the rigid property by 1 (min. 0). Once per day, fly up to short distance as part of your movement. |
| Shield/Wearable | Once per day, fly up to short distance as part of your movement. |

### Elder Dragon Bone

*Fossil bones of primordial dragons. The marrow never cooled.*

| Item Type | Effect |
|-----------|--------|
| Weapon/Ammo | Choose one element at creation (fire, frost, lightning, or acid). The weapon deals that element instead of physical damage, and its damage ignores resistance to that element. |
| Spell Catalyst | Choose one element at creation. Once per scene, one spell dealing that element ignores resistance to it. |
| Heavy Armor | Choose one element at creation. You gain resistance against it. Once per scene, when you take damage of a different element, you can gain resistance against that damage too. |
| Wearable | Choose one element at creation. You gain resistance against it. |

### Elder Dragon Scales

*Scales enough for one armor per era. Scratches heal overnight.*

| Item Type | Effect |
|-----------|--------|
| Light Armor | Resistance against acid, fire, frost, and lightning damage. -1 load (min. 0). |
| Heavy Armor | Resistance against acid, fire, frost, and lightning damage. Regains 1 lost Durability die after each night's rest. |
| Shield | Resistance against acid, fire, frost, and lightning damage. |
| Wearable | Once per scene, when you take acid, fire, frost, or lightning damage, you can gain resistance against it. |

### Aegium

*White-gold metal of the High Realms. It burns the unworthy.*

| Item Type | Effect |
|-----------|--------|
| Any | Emits dim light in melee range. You are immune to the poisoned condition and to natural diseases. |
| Weapon | Deals +2 radiant damage (ignore AV) on hits against Undead and infernal Spirit creatures. |
| Heavy Armor | Once per day, when you would drop to 0 HP, you remain at 1 HP instead. |
| Shield | Once per scene, when you take necrotic or poison damage, you can gain resistance against it. |

> The poison/disease immunity is narrow and the glow is the visible tell (principle 13). The 0-HP ward matches the Deathless Ward capstone shape at material scope — flag: an Aegium heavy armor with the Deathless Ward capstone would double up; the artifact framework should forbid stacking identical wards.

### Eternite

*Crystal of shattered moons. Weight obeys it.*

| Item Type | Effect |
|-----------|--------|
| Any | -1 load (min. 0). You automatically succeed on travel and exploration tests against extreme heat and extreme cold. |
| Spell Catalyst | 0 load. Once per day, cast one spell without spending Focus (its effects resolve as if Focus were spent). |
| Heavy Armor | Reduce the rigid property by 2 (min. 0). |
| Shield | Once per scene, when you would be pushed or knocked prone, ignore it. |
| Wearable | Once per day, levitate yourself or one willing creature you touch up to short distance vertically; the target hovers for a short duration, then descends gently. |

### Elderwood

*Wood of trees whose roots drink from ley-lines. It does not die.*

| Item Type | Effect |
|-----------|--------|
| Any | Regains 1 lost Durability die after each night's rest. If destroyed, the item lies inert for one day, then reforms with 1 Durability die. |
| Weapon | Also functions as a spell catalyst for mystic nature-tradition spells at the item's quality tier. |
| Spell Catalyst | Once per scene, when you fail a mystic spell cast, re-roll the test (keep the new result). |
| Shield | Once per scene, when you take damage from any source, you can gain resistance against it. |

### Dreamweave

*Cloth spun from crystallized dreams. It makes no sound at all.*

| Item Type | Effect |
|-----------|--------|
| Light Armor | -1 load (min. 0). Resistance against psychic damage. You are immune to the frightened condition. |
| Wearable | You are immune to the frightened condition. Once per day, when you take psychic damage, you can gain resistance against it. |
| Spell Catalyst | 0 load. Once per scene, when you fail to cast an illusion or telepathy spell, you keep the Focus that cast would have spent. |

> **Divergence:** heavy armor and shield lines dropped — dream-cloth plate fails the fiction test (principle 23 exception, stated). Catalyst line added, mirroring Treantwood's school-scoped Focus save.

### Titanium

*Rift-metal sheathed in a thin field of force. It drinks impact.*

| Item Type | Effect |
|-----------|--------|
| Weapon | Deals +2 damage (ignore AV) on hits against infernal Spirit creatures. Once per scene, on a hit, you can deal the damage as necrotic instead of its normal type. |
| Heavy Armor | Resistance against necrotic damage. Once per scene, when you take physical damage, reduce it by 4 (after AV). |
| Shield | Resistance against necrotic damage. Once per scene, when you take damage from any source, you can gain resistance against it. |
| Wearable | Resistance against necrotic damage. Once per scene, when you take physical damage, reduce it by 2 (after AV). |

### Infernal Horn

*Horn of arch-fiends, warm forever, runed by no mortal hand. Composite bows made of it are prized above kingdoms.*

| Item Type | Effect |
|-----------|--------|
| Weapon/Ammo | The weapon deals fire damage instead of physical damage. Deals +2 damage (ignore AV) on hits against celestial Spirit creatures. |
| Heavy Armor | Resistance against fire damage. You are immune to the burning (X) condition. |
| Spell Catalyst | Once per scene, change one spell's fire damage to necrotic or its necrotic damage to fire. |
| Wearable | Resistance against fire damage. Once per day, ignore the burning (X) condition when it would be applied. |

> Weapon line covers composite bows explicitly — the legendary ranged-weapon horn material (coverage matrix).

## Cross-Cutting Audit Notes

- **Escalation chains verified:** fire (Shine-Bronze* → Solarite → Infernal Horn), element-conversion (Elemental Stones* → Dragon Bone → Elder Dragon Bone), elemental defense (Wyrmhide → Dragon Scales → Elder Dragon Scales), living wood (Treantwood → Elderwood), indestructibility (Dwarf-Steel → Adamantite → *artifact-grade in Q8 context*), weight (Chitin/Darkwood → Mithril → Orichalcum/Celestial Feathers). *Starred = vault-only, pending adoption.*
- **Enchantment overlap spot-checks:** Meteorite/Orichalcum type-switching does not duplicate the elemental weapon enchantments (those add rider damage, materials convert base type). Eternite shield vs. Anchoring enchantment: same trigger — an Eternite shield with Anchoring should merge to the better effect, worth a one-line stacking note at publication. Aegium 0-HP ward vs. Deathless Ward capstone flagged above.
- **Mental-load pass applied:** every effect is a passive or a 1/scene / 1/day reactive with a single trigger. Removed from the old proposals: damage-die re-rolls (no damage dice exist), strong/crit conditional clauses, and per-hit choice menus beyond one choice per scene.

## Open Questions for Owner

1. Mithril rework power: sufficient at Greater tier as pure utility breadth, or add the "armor counts one category lighter for swim/climb penalties" passive?
2. Adopt the two vault-only materials needed to close Exotic gaps (Elemental Stones for catalysts, Giant Spider Silk wearable extension)? The other vault-only proposals (Shine-Bronze, Vine Wood, Dragon Hide, Shadow Pelt, Primordial Bone/Hide) stay in the deep-dive analysis until wanted.
3. Lunarite anti-scrying passive at Q5: accept the worldbuilding reach (counter-tool to scrying items), or move that line to Q6-range pricing?
4. Eternite catalyst free-cast 1/day: strongest catalyst material effect in the catalog — cap at spells of rank 3 or lower?
