# Talent System Analysis - Quick Reference

> **Full Analysis:** [TALENT_SYSTEM_ANALYSIS.md](./TALENT_SYSTEM_ANALYSIS.md)

## Current State

| Metric | Value |
|--------|-------|
| Total Talents | 115 |
| Skills | 16 |
| Focus | 58% combat / 22% utility / 19% hybrid |
| **Under-supported** | **Insight (4), Streetwise (4), Influence (5), Perception (5)** |

## Top 3 Priorities

### 1. Missing Identity Tags (0 talents)

- **Infiltration** - Rogue, Duelist, Bard
- **Whip control** - Tamer
- **Zone control** - Hoplite, Fighter, Warlord

### 2. Critical Archetypes

| Archetype | Missing | Skills Affected |
|-----------|---------|-----------------|
| Oracle | Prophecy/omens/foresight | Insight, Mysticism, Lore |
| Bard | Music magic/performance | Influence, Mysticism, Education |
| Tamer | Whip/beast training/snares | Fighting, Nature, Survival |
| Hoplite | Formations/zone control | Fighting, Athletics, Influence |
| Warlock | Pacts/curses/familiars | Arcana, Lore, Fortitude |
| Rogue | Infiltration/lockpicking | Stealth, Streetwise, Insight |

### 3. Design Aspect Gaps

| Aspect | Current | Target | Gap |
|--------|---------|--------|-----|
| Defensive - Redirection | 0% | 10% | -10% |
| Travel | 3% | 15% | -12% |
| Defensive - Avoidance | 5% | 15% | -10% |

## Recommended Phases

**Phase 1 (15-20 talents):** Fill critical skill and identity tag gaps  
**Phase 2 (10-15 talents):** Add archetype-specific mechanics  
**Phase 3 (10-15 talents):** Balance design aspects  

**Target:** 145-160 total talents

## Implementation Steps

1. **Review** - Validate findings with design team
2. **Prioritize** - Select Phase 1 additions
3. **Design** - Create full talent descriptions
4. **Playtest** - Test for balance
5. **Iterate** - Refine and implement

## Travel System Integration

> **Full Analysis:** [TRAVEL_TALENT_INTEGRATION.md](./TRAVEL_TALENT_INTEGRATION.md)

The [travel system](../../06-scenes/09-travel.md) introduces mechanics for multi-day overland journeys with specific roles (Navigator, Scout, Quartermaster, Forager, Hunter, Fisher), challenge dice for progress, and daily events. The travel talent integration analysis reviews all existing talents for travel interactions and proposes 6 new travel-focused talents:

| Proposed Talent | Skill | Travel Role |
|----------------|-------|-------------|
| **Pathfinder** | Survival | Navigator |
| **Trailblazer** | Athletics | Fatigue/terrain mitigation |
| **Cartographer's Eye** | Perception | Scout |
| **Expedition Leader** | Education | Quartermaster |
| **Road Warden** | Streetwise | Scout (roads) |
| **Seasoned Forager** | Nature | Forager |

These additions would raise travel talent coverage from 3% to ~10% across 7 skills (up from 3).

---

See [TALENT_SYSTEM_ANALYSIS.md](./TALENT_SYSTEM_ANALYSIS.md) for detailed data, archetype breakdowns, and complete talent recommendations.

See [TRAVEL_TALENT_INTEGRATION.md](./TRAVEL_TALENT_INTEGRATION.md) for the full travel talent integration analysis.
