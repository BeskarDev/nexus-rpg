export interface GlossaryEntry {
	/** The display name of the term */
	term: string
	/** A concise summary of what the term means */
	summary: string
	/** The rules section or category where the term originates */
	origin: string
	/** Link to the relevant documentation page */
	link: string
}

export const glossary: GlossaryEntry[] = [
	// ── Basic Rules ──────────────────────────────────────────────
	{
		term: 'Skill Test',
		summary:
			'A roll of your Attribute Die + 1d6 + Skill Rank compared against a Target Number to determine success or failure.',
		origin: 'Basic Rules',
		link: '/docs/basic-rules/how-to-roll#skill-tests',
	},
	{
		term: 'Target Number (TN)',
		summary:
			'The difficulty value (default 8) you must meet or beat with your roll to succeed at a Skill Test.',
		origin: 'Basic Rules',
		link: '/docs/basic-rules/how-to-roll#skill-tests',
	},
	{
		term: 'Difficulty',
		summary:
			'A classification of task complexity (Trivial through Legendary) that sets the Target Number for a Skill Test.',
		origin: 'Basic Rules',
		link: '/docs/basic-rules/how-to-roll#skill-tests',
	},
	{
		term: 'Success Level (SL)',
		summary:
			'A measure of how well you succeeded or failed relative to the Target Number, ranging from Blunder to Critical.',
		origin: 'Basic Rules',
		link: '/docs/basic-rules/how-to-roll#success-levels',
	},
	{
		term: 'Blunder',
		summary:
			'A catastrophic failure when rolling 6 or more below the Target Number, causing major negative consequences.',
		origin: 'Basic Rules',
		link: '/docs/basic-rules/how-to-roll#success-levels',
	},
	{
		term: 'Weak Success',
		summary:
			'A result meeting the Target Number or up to 2 above it, indicating a bare success that may carry consequences.',
		origin: 'Basic Rules',
		link: '/docs/basic-rules/how-to-roll#success-levels',
	},
	{
		term: 'Strong Success',
		summary:
			'A result rolling 3–5 above the Target Number, indicating clean and complete success.',
		origin: 'Basic Rules',
		link: '/docs/basic-rules/how-to-roll#success-levels',
	},
	{
		term: 'Critical Success',
		summary:
			'A result rolling 6 or more above the Target Number, indicating exceptional success with additional benefits.',
		origin: 'Basic Rules',
		link: '/docs/basic-rules/how-to-roll#success-levels',
	},
	{
		term: 'Boon',
		summary:
			'An advantage on a roll that lets you roll 2d6 and use the higher result alongside your Attribute Die.',
		origin: 'Basic Rules',
		link: '/docs/basic-rules/how-to-roll#boons-and-banes',
	},
	{
		term: 'Bane',
		summary:
			'A disadvantage on a roll that forces you to roll 2d6 and use the lower result alongside your Attribute Die.',
		origin: 'Basic Rules',
		link: '/docs/basic-rules/how-to-roll#boons-and-banes',
	},
	{
		term: 'Re-roll',
		summary:
			'An ability to roll a test again and accept the new result, often granted by spending Resolve.',
		origin: 'Basic Rules',
		link: '/docs/basic-rules/how-to-roll#re-rolling-tests',
	},
	{
		term: 'Durability Check',
		summary:
			"A roll of an item's Durability die to determine if equipment loses a use (1–3) or remains intact (4+).",
		origin: 'Basic Rules',
		link: '/docs/basic-rules/how-to-roll#durability-checks',
	},
	{
		term: 'Supply Check',
		summary:
			"A roll of a supply item's die to determine if one use is consumed (1–3) or the supply holds (4+).",
		origin: 'Basic Rules',
		link: '/docs/basic-rules/how-to-roll#supply-checks',
	},

	// ── Character Progression ────────────────────────────────────
	{
		term: 'Experience Points (XP)',
		summary:
			'Rewards earned each session (1–2 XP) that are spent to improve skills and unlock new talents.',
		origin: 'Character Progression',
		link: '/docs/basic-rules/character-progression#experience-points-xp',
	},
	{
		term: 'Skill Rank',
		summary:
			'Your level of expertise in a skill, ranging from 0 (untrained) to 5 (Grandmaster).',
		origin: 'Character Progression',
		link: '/docs/basic-rules/character-progression#skill-ranks',
	},
	{
		term: 'Character Level',
		summary:
			'Your overall advancement tier (1–10) that increases automatically when total spent XP reaches certain thresholds.',
		origin: 'Character Progression',
		link: '/docs/basic-rules/character-progression#character-level',
	},
	{
		term: 'Talent',
		summary:
			'A specialized ability gained at specific skill ranks that provides unique techniques and methods.',
		origin: 'Character Progression',
		link: '/docs/basic-rules/character-progression#talents',
	},
	{
		term: 'Talent Points (TP)',
		summary:
			'Points earned at a rate of 1 TP per 2 XP spent in a skill, used to learn or improve talents.',
		origin: 'Character Progression',
		link: '/docs/basic-rules/character-progression#talents',
	},

	// ── Attributes ───────────────────────────────────────────────
	{
		term: 'Attribute',
		summary:
			'One of four core stats (Strength, Agility, Spirit, Mind) represented by die sizes that define your character.',
		origin: 'Statistics',
		link: '/docs/statistics/attributes',
	},
	{
		term: 'Strength (STR)',
		summary:
			'An attribute representing physical power, endurance, and brute force.',
		origin: 'Statistics',
		link: '/docs/statistics/attributes',
	},
	{
		term: 'Agility (AGI)',
		summary:
			'An attribute representing speed, precision, and graceful coordination.',
		origin: 'Statistics',
		link: '/docs/statistics/attributes',
	},
	{
		term: 'Spirit (SPI)',
		summary:
			'An attribute representing awareness, intuition, and connection to the unseen.',
		origin: 'Statistics',
		link: '/docs/statistics/attributes',
	},
	{
		term: 'Mind (MND)',
		summary:
			'An attribute representing mental acuity, knowledge, and reasoning.',
		origin: 'Statistics',
		link: '/docs/statistics/attributes',
	},

	// ── Hit Points & Wounds ──────────────────────────────────────
	{
		term: 'Hit Points (HP)',
		summary:
			'Your short-term endurance pool that decreases when you take damage; reaching 0 HP causes a Wound.',
		origin: 'Statistics',
		link: '/docs/statistics/hit-points-wounds#hit-points-hp',
	},
	{
		term: 'Wound',
		summary:
			'Lasting damage to your body (maximum 3 Wounds) that inflicts permanent penalties until treated.',
		origin: 'Statistics',
		link: '/docs/statistics/hit-points-wounds#wounds',
	},
	{
		term: 'Temporary HP',
		summary:
			'A secondary damage buffer absorbed before regular HP that does not replenish during short rests.',
		origin: 'Statistics',
		link: '/docs/statistics/hit-points-wounds#hit-points-hp',
	},
	{
		term: 'Fatigue',
		summary:
			'A long-term exhaustion measure (up to 6 points) reducing max HP by 2 per point; 6 Fatigue causes unconsciousness.',
		origin: 'Statistics',
		link: '/docs/statistics/hit-points-wounds#fatigue',
	},
	{
		term: 'Dying',
		summary:
			'A critical state entered upon receiving a third Wound, giving you only a few turns to be stabilized before death.',
		origin: 'Statistics',
		link: '/docs/statistics/hit-points-wounds#dying',
	},

	// ── Defenses ─────────────────────────────────────────────────
	{
		term: 'Defense',
		summary:
			'One of three protective values (Parry, Dodge, Resist) that attackers must meet or exceed to hit you.',
		origin: 'Statistics',
		link: '/docs/statistics/defenses',
	},
	{
		term: 'Parry',
		summary:
			'Your defense against melee and touch attacks, calculated from 7 + Fighting skill rank.',
		origin: 'Statistics',
		link: '/docs/statistics/defenses',
	},
	{
		term: 'Dodge',
		summary:
			'Your defense against ranged attacks and area effects, calculated from 5 + half Agility attribute.',
		origin: 'Statistics',
		link: '/docs/statistics/defenses',
	},
	{
		term: 'Resist',
		summary:
			'Your defense against mental attacks and environmental hazards, calculated from 5 + half Spirit or Mind attribute.',
		origin: 'Statistics',
		link: '/docs/statistics/defenses',
	},

	// ── Resolve ──────────────────────────────────────────────────
	{
		term: 'Resolve',
		summary:
			'A pool of tenacity (max 3) that can be spent to re-roll a test and accept the new result.',
		origin: 'Statistics',
		link: '/docs/statistics/resolve',
	},
	{
		term: 'Motivation',
		summary:
			'A personal drive that grants +1 Resolve when invoked during a fitting skill test that succeeds.',
		origin: 'Statistics',
		link: '/docs/statistics/resolve',
	},

	// ── Skills ───────────────────────────────────────────────────
	{
		term: 'Skill',
		summary:
			'A trained ability (General or Expert) that adds its rank to relevant tests to overcome challenges.',
		origin: 'Statistics',
		link: '/docs/statistics/skills',
	},
	{
		term: 'General Skill',
		summary:
			'A common skill (Athletics, Fortitude, Influence, Insight, Perception, Stealth) usable without penalty when untrained.',
		origin: 'Statistics',
		link: '/docs/statistics/skills',
	},
	{
		term: 'Expert Skill',
		summary:
			'A specialized skill (Arcana, Archery, Crafting, etc.) that imposes +1 bane when untrained; magic skills cannot be attempted untrained.',
		origin: 'Statistics',
		link: '/docs/statistics/skills',
	},

	// ── Equipment ────────────────────────────────────────────────
	{
		term: 'Quality',
		summary:
			'An item rating (Q1 Primitive to Q8 Mythical) determining its effectiveness, rarity, and value.',
		origin: 'Equipment',
		link: '/docs/equipment/items#quality',
	},
	{
		term: 'Load',
		summary:
			'An abstracted weight measure for items; exceeding your Carrying Capacity incurs movement penalties.',
		origin: 'Equipment',
		link: '/docs/equipment/items#load',
	},
	{
		term: 'Carrying Capacity',
		summary:
			'The maximum load you can carry without penalty, calculated as half Strength + 8.',
		origin: 'Equipment',
		link: '/docs/equipment/items#load',
	},
	{
		term: 'Durability',
		summary:
			"An item's integrity tracked by 3 uses; depleting all uses makes the item damaged.",
		origin: 'Equipment',
		link: '/docs/equipment/items#durability',
	},
	{
		term: 'Supply',
		summary:
			'A consumable bundle (rations, arrows, torches) with 3 uses representing remaining quantity.',
		origin: 'Equipment',
		link: '/docs/equipment/items#item-types',
	},
	{
		term: 'Armor Value (AV)',
		summary:
			'A protective value from worn armor that reduces incoming damage from attacks.',
		origin: 'Equipment',
		link: '/docs/combat/attacking#damage',
	},

	// ── Weapon Properties ────────────────────────────────────────
	{
		term: 'Agile (property)',
		summary:
			'A weapon property allowing attacks with Agility instead of Strength.',
		origin: 'Equipment Properties',
		link: '/docs/equipment/armor-weapon-properties',
	},
	{
		term: 'Crush (property)',
		summary:
			"A weapon property that ignores half of the enemy's Armor Value (rounded up).",
		origin: 'Equipment Properties',
		link: '/docs/equipment/armor-weapon-properties',
	},
	{
		term: 'Light (property)',
		summary:
			'A weapon property allowing the weapon to be dual-wielded with another light weapon.',
		origin: 'Equipment Properties',
		link: '/docs/equipment/armor-weapon-properties',
	},
	{
		term: 'Pierce (property)',
		summary:
			'A weapon property allowing one failed attack roll to be re-rolled between turns.',
		origin: 'Equipment Properties',
		link: '/docs/equipment/armor-weapon-properties',
	},
	{
		term: 'Reach (property)',
		summary:
			'A weapon property that allows attacking enemies at close range but with +1 bane at melee range.',
		origin: 'Equipment Properties',
		link: '/docs/equipment/armor-weapon-properties',
	},
	{
		term: 'Slash (property)',
		summary:
			'A weapon property adding weapon damage again on a hit against lightly or unarmored targets.',
		origin: 'Equipment Properties',
		link: '/docs/equipment/armor-weapon-properties',
	},
	{
		term: 'Two-handed (property)',
		summary:
			'A weapon property requiring both hands to wield, with +2 banes if used one-handed.',
		origin: 'Equipment Properties',
		link: '/docs/equipment/armor-weapon-properties',
	},
	{
		term: 'Versatile (property)',
		summary:
			'A weapon property allowing two-handed use for additional weapon damage.',
		origin: 'Equipment Properties',
		link: '/docs/equipment/armor-weapon-properties',
	},
	{
		term: 'Heavy (property)',
		summary:
			'A weapon or armor property imposing +1 bane for each Strength value below the requirement.',
		origin: 'Equipment Properties',
		link: '/docs/equipment/armor-weapon-properties',
	},
	{
		term: 'Rigid (property)',
		summary:
			'An armor property imposing banes on Strength/Agility movement rolls and Arcana spellcasting.',
		origin: 'Equipment Properties',
		link: '/docs/equipment/armor-weapon-properties',
	},

	// ── Combat ───────────────────────────────────────────────────
	{
		term: 'Initiative',
		summary:
			'A roll determining turn order in combat, based on Agility or Spirit + Perception (highest acts first).',
		origin: 'Combat',
		link: '/docs/combat/combat-scenes#initiative',
	},
	{
		term: 'Turn',
		summary:
			'Your opportunity to act during a combat round, allowing one Action, one Movement, and Quick Actions.',
		origin: 'Combat',
		link: '/docs/combat/combat-scenes#combat-turns',
	},
	{
		term: 'Action',
		summary:
			'A major activity on your turn such as Attack, Cast Spell, Dash, Defend, Disarm, Grapple, or Retreat.',
		origin: 'Combat',
		link: '/docs/combat/combat-scenes#actions',
	},
	{
		term: 'Quick Action',
		summary:
			'A minor reactive ability usable once per turn, such as Evade, Guard, or Opportunity Attack.',
		origin: 'Combat',
		link: '/docs/combat/combat-scenes#quick-actions',
	},
	{
		term: 'Movement',
		summary:
			'Your ability to move during a turn; 1 Movement lets you move to one area within short distance.',
		origin: 'Combat',
		link: '/docs/combat/distances-movement#movement',
	},
	{
		term: 'Attack',
		summary:
			'An Action to strike with a weapon or cast a damaging spell against a target.',
		origin: 'Combat',
		link: '/docs/combat/attacking',
	},
	{
		term: 'Dash',
		summary:
			'An Action that doubles your available Movement for the current turn.',
		origin: 'Combat',
		link: '/docs/combat/combat-scenes#combat-turns',
	},
	{
		term: 'Defend',
		summary:
			'An Action granting +1 bane on incoming attacks until your next turn and free Evade/Guard Quick Actions.',
		origin: 'Combat',
		link: '/docs/combat/combat-scenes#combat-turns',
	},
	{
		term: 'Disarm',
		summary:
			"An Action attempting to knock or grab a held item from an opponent's hand.",
		origin: 'Combat',
		link: '/docs/combat/combat-scenes#combat-turns',
	},
	{
		term: 'Grapple',
		summary:
			'An Action that locks you and an enemy into close physical combat, reducing Movement to 0 for both.',
		origin: 'Combat',
		link: '/docs/combat/combat-scenes#combat-turns',
	},
	{
		term: 'Retreat',
		summary:
			'An Action that prevents Opportunity Attacks against you while you spend Movement to disengage.',
		origin: 'Combat',
		link: '/docs/combat/combat-scenes#combat-turns',
	},
	{
		term: 'Cover',
		summary:
			'Partial concealment behind an object that imposes +1 bane on ranged attacks targeting you.',
		origin: 'Combat',
		link: '/docs/combat/attacking#cover',
	},
	{
		term: 'Damage',
		summary:
			'Harm dealt by attacks, calculated as half attribute + weapon damage × Success Level, minus Armor Value.',
		origin: 'Combat',
		link: '/docs/combat/attacking#damage',
	},
	{
		term: 'Lasting Damage',
		summary:
			'Persistent harm (like bleeding or burning) taken at the start of each turn rather than immediately.',
		origin: 'Combat',
		link: '/docs/combat/attacking#lasting-damage',
	},
	{
		term: 'Damage Type',
		summary:
			'A category of harm (Physical, Fire, Frost, Lightning, etc.) that interacts with resistances and weaknesses.',
		origin: 'Combat',
		link: '/docs/combat/attacking#damage-types',
	},
	{
		term: 'Resistance',
		summary:
			'A defense against a specific damage type that halves incoming damage of that type.',
		origin: 'Combat',
		link: '/docs/combat/attacking#resistances-or-weaknesses-to-damage-types',
	},
	{
		term: 'Weakness',
		summary:
			'A vulnerability to a specific damage type that increases incoming damage of that type by 1.5×.',
		origin: 'Combat',
		link: '/docs/combat/attacking#resistances-or-weaknesses-to-damage-types',
	},
	{
		term: 'Surprise',
		summary:
			'Catching enemies unaware before combat by rolling Agility + Stealth vs. their Resist.',
		origin: 'Combat',
		link: '/docs/combat/combat-scenes#surprise',
	},

	// ── Distances ────────────────────────────────────────────────
	{
		term: 'Melee Range',
		summary:
			'Touching or fighting distance (less than 2 meters), required for melee weapon attacks.',
		origin: 'Combat',
		link: '/docs/combat/distances-movement#distances',
	},
	{
		term: 'Close Range',
		summary:
			'Within a few steps (2–4 meters), the distance for close interactions and some abilities.',
		origin: 'Combat',
		link: '/docs/combat/distances-movement#distances',
	},
	{
		term: 'Short Range',
		summary:
			'Normal speaking distance (5–10 meters), equaling 1 area in combat.',
		origin: 'Combat',
		link: '/docs/combat/distances-movement#distances',
	},
	{
		term: 'Medium Range',
		summary:
			'A short sprint distance (11–20 meters), equaling 2 areas in combat.',
		origin: 'Combat',
		link: '/docs/combat/distances-movement#distances',
	},
	{
		term: 'Long Range',
		summary:
			'Louder shouting distance (21–40 meters), equaling 3–4 areas in combat.',
		origin: 'Combat',
		link: '/docs/combat/distances-movement#distances',
	},
	{
		term: 'Extreme Range',
		summary:
			'Barely perceivable distance (81–160 meters), the farthest range for most abilities.',
		origin: 'Combat',
		link: '/docs/combat/distances-movement#distances',
	},
	{
		term: 'Area',
		summary:
			'An abstract combat space (up to 6×6 meters) where creatures within it are at close range to each other.',
		origin: 'Combat',
		link: '/docs/combat/distances-movement#distances',
	},
	{
		term: 'Difficult Terrain',
		summary:
			'Ground that requires 2 Movement to enter instead of the normal 1.',
		origin: 'Combat',
		link: '/docs/combat/distances-movement#movement',
	},

	// ── Conditions ───────────────────────────────────────────────
	{
		term: 'Condition',
		summary:
			'A temporary status effect (such as bleeding, stunned, or frightened) that modifies your capabilities.',
		origin: 'Combat',
		link: '/docs/combat/conditions',
	},
	{
		term: 'Bleeding',
		summary:
			'A condition inflicting additional damage whenever you take damage; ended with a Spirit + Nature roll.',
		origin: 'Conditions',
		link: '/docs/combat/conditions',
	},
	{
		term: 'Blinded',
		summary:
			'A condition preventing sight; sight-based rolls fail and attacks against you gain +1 boon.',
		origin: 'Conditions',
		link: '/docs/combat/conditions',
	},
	{
		term: 'Burning',
		summary:
			'A condition dealing lasting fire damage each turn and imposing +1 bane on all rolls.',
		origin: 'Conditions',
		link: '/docs/combat/conditions',
	},
	{
		term: 'Charmed',
		summary:
			'A condition preventing you from harming the source and granting them social advantages.',
		origin: 'Conditions',
		link: '/docs/combat/conditions',
	},
	{
		term: 'Confused',
		summary:
			'A condition removing Quick Actions and forcing you to roll each turn for random behavior.',
		origin: 'Conditions',
		link: '/docs/combat/conditions',
	},
	{
		term: 'Dazed',
		summary:
			'A condition inflicting +1 bane on all rolls and preventing Quick Actions.',
		origin: 'Conditions',
		link: '/docs/combat/conditions',
	},
	{
		term: 'Deafened',
		summary:
			'A condition preventing hearing; all hearing-based rolls automatically fail.',
		origin: 'Conditions',
		link: '/docs/combat/conditions',
	},
	{
		term: 'Frightened',
		summary:
			'A condition forcing you to roll each turn to determine if you cower, flee, or act at a penalty.',
		origin: 'Conditions',
		link: '/docs/combat/conditions',
	},
	{
		term: 'Grappled',
		summary:
			'A condition locking you in physical combat with 0 Movement while engaged.',
		origin: 'Conditions',
		link: '/docs/combat/conditions',
	},
	{
		term: 'Hidden',
		summary:
			'A condition making you undetectable; unaware creatures cannot target you with attacks.',
		origin: 'Conditions',
		link: '/docs/combat/conditions',
	},
	{
		term: 'Paralyzed',
		summary:
			'A condition reducing Movement to 0 and causing automatic failure on Strength/Agility rolls.',
		origin: 'Conditions',
		link: '/docs/combat/conditions',
	},
	{
		term: 'Poisoned',
		summary:
			'A condition inflicting +1 bane on all rolls.',
		origin: 'Conditions',
		link: '/docs/combat/conditions',
	},
	{
		term: 'Prone',
		summary:
			'A condition from lying down where ranged attacks against you suffer +1 bane but melee attacks gain +1 boon.',
		origin: 'Conditions',
		link: '/docs/combat/conditions',
	},
	{
		term: 'Restrained',
		summary:
			'A condition reducing Movement to 0 while granting attackers +1 boon and imposing +1 bane on your attacks.',
		origin: 'Conditions',
		link: '/docs/combat/conditions',
	},
	{
		term: 'Silenced',
		summary:
			'A condition preventing speech, causing speech-based rolls to fail and blocking spellcasting.',
		origin: 'Conditions',
		link: '/docs/combat/conditions',
	},
	{
		term: 'Slowed',
		summary:
			'A condition requiring +1 Movement to move a close or short distance.',
		origin: 'Conditions',
		link: '/docs/combat/conditions',
	},
	{
		term: 'Staggered',
		summary:
			'A condition limiting you to either moving or taking an Action (not both) and preventing Quick Actions.',
		origin: 'Conditions',
		link: '/docs/combat/conditions',
	},
	{
		term: 'Stunned',
		summary:
			'A condition requiring extra Movement, granting attackers +1 boon, and limiting you to moving or acting.',
		origin: 'Conditions',
		link: '/docs/combat/conditions',
	},
	{
		term: 'Unconscious',
		summary:
			'A condition preventing all actions, movement, and perception; you drop items and fall prone.',
		origin: 'Conditions',
		link: '/docs/combat/conditions',
	},

	// ── Scenes & Time ────────────────────────────────────────────
	{
		term: 'Scene',
		summary:
			'A distinct moment with a clear goal that begins when adventurers face a situation and ends upon resolution.',
		origin: 'Scenes',
		link: '/docs/scenes/scenes-time-intervals',
	},
	{
		term: 'Encounter',
		summary:
			'A scene type with 5–10 seconds per action, used for combat and immediate conflict.',
		origin: 'Scenes',
		link: '/docs/scenes/scenes-time-intervals',
	},
	{
		term: 'Delving',
		summary:
			'A scene type with 5–10 minutes per action, used for dungeon exploration.',
		origin: 'Scenes',
		link: '/docs/scenes/scenes-time-intervals',
	},
	{
		term: 'Exploration',
		summary:
			'A scene type with 2–4 hours per action, used for wilderness navigation.',
		origin: 'Scenes',
		link: '/docs/scenes/scenes-time-intervals',
	},
	{
		term: 'Travel',
		summary:
			"A scene type with roughly one day per action, covering a full day's journey.",
		origin: 'Scenes',
		link: '/docs/scenes/scenes-time-intervals',
	},
	{
		term: 'Downtime',
		summary:
			'A scene type with roughly one week per action, used for crafting, research, or training.',
		origin: 'Scenes',
		link: '/docs/scenes/scenes-time-intervals',
	},

	// ── Effect Durations ─────────────────────────────────────────
	{
		term: 'Briefly',
		summary:
			'An effect duration lasting until the end of your next combat turn.',
		origin: 'Scenes',
		link: '/docs/scenes/effect-durations#briefly',
	},
	{
		term: 'Short Duration',
		summary:
			'An effect duration lasting until you take a short break or for one delving turn.',
		origin: 'Scenes',
		link: '/docs/scenes/effect-durations#short',
	},
	{
		term: 'Medium Duration',
		summary:
			'An effect duration lasting for one hour or one exploration turn.',
		origin: 'Scenes',
		link: '/docs/scenes/effect-durations#medium',
	},
	{
		term: 'Long Duration',
		summary:
			"An effect duration lasting until the end of a night's rest or for one travel turn.",
		origin: 'Scenes',
		link: '/docs/scenes/effect-durations#long',
	},

	// ── Resting ──────────────────────────────────────────────────
	{
		term: 'Short Break',
		summary:
			'A brief pause after one delving turn that lets you regain all HP and refresh once-per-combat abilities.',
		origin: 'Scenes',
		link: '/docs/scenes/resting#a-short-break',
	},
	{
		term: "Night's Rest",
		summary:
			'8+ hours of rest restoring Focus, up to 1 Resolve, removing Fatigue, and healing treated Wounds.',
		origin: 'Scenes',
		link: "/docs/scenes/resting#a-nights-rest",
	},

	// ── Professions ──────────────────────────────────────────────
	{
		term: 'Profession',
		summary:
			'A crafting specialization (Alchemist, Smith, Woodworker, etc.) granting +1 boon on related crafting rolls.',
		origin: 'Scenes',
		link: '/docs/scenes/crafting-professions#list-of-professions',
	},

	// ── Magic ────────────────────────────────────────────────────
	{
		term: 'Focus',
		summary:
			'Your magical casting pool, spent to cast spells; calculated from (attribute − 2) + (2 × spell skill rank).',
		origin: 'Magic',
		link: '/docs/magic/magic-spells#focus',
	},
	{
		term: 'Spell Power',
		summary:
			'Your base magic damage or healing value, equal to half your relevant attribute (Mind for Arcana, Spirit for Mysticism).',
		origin: 'Magic',
		link: '/docs/magic/magic-spells#spell-power',
	},
	{
		term: 'Arcana',
		summary:
			'An expert magic skill channeling mental power through arcane disciplines, requiring an arcane conduit.',
		origin: 'Magic',
		link: '/docs/magic/magic-spells#arcana',
	},
	{
		term: 'Mysticism',
		summary:
			'An expert magic skill channeling spiritual energy through mystic traditions, requiring a mystic talisman.',
		origin: 'Magic',
		link: '/docs/magic/magic-spells#mysticism',
	},
	{
		term: 'Spell Catalyst',
		summary:
			'A held item required to cast spells (arcane conduit for Arcana, mystic talisman for Mysticism).',
		origin: 'Magic',
		link: '/docs/magic/magic-spells#spell-catalysts',
	},
	{
		term: 'Concentration',
		summary:
			'An ongoing requirement to maintain certain spells, broken if you fail a Spirit + Fortitude roll when taking damage.',
		origin: 'Magic',
		link: '/docs/magic/magic-spells#spell-concentration',
	},
	{
		term: 'Spell Rank',
		summary:
			'The power level of a spell (0–5), determining its Focus Cost and casting difficulty.',
		origin: 'Magic',
		link: '/docs/magic/magic-spells#spells',
	},
	{
		term: 'Arcane Discipline',
		summary:
			'A school of arcane magic (Evocation, Illusion, Conjuration, Telepathy, Telekinetics, Necromancy).',
		origin: 'Magic',
		link: '/docs/magic/magic-spells#arcana',
	},
	{
		term: 'Mystic Tradition',
		summary:
			'A path of mystic magic (Light, Twilight, Life, Death, Nature, Tempest, Peace, War).',
		origin: 'Magic',
		link: '/docs/magic/magic-spells#mysticism',
	},
	{
		term: 'Heightening',
		summary:
			'Casting a spell at a higher rank to increase its potency at greater Focus Cost and difficulty.',
		origin: 'Magic',
		link: '/docs/magic/magic-spells#heightening-spells',
	},
	{
		term: 'Wild Surge',
		summary:
			'A chaotic magical side-effect triggered when an arcane spell results in a Blunder.',
		origin: 'Magic',
		link: '/docs/magic/magic-spells#arcana',
	},
	{
		term: 'Mystic Penance',
		summary:
			'A divine consequence triggered when a mystic spell results in a Blunder.',
		origin: 'Magic',
		link: '/docs/magic/magic-spells#mysticism',
	},

	// ── Creatures ────────────────────────────────────────────────
	{
		term: 'Size',
		summary:
			'A creature classification (Tiny, Small, Medium, Large, Huge, Gargantuan, Colossal) affecting combat interactions.',
		origin: 'Creatures',
		link: '/docs/creatures/creature-rules#size',
	},
]
