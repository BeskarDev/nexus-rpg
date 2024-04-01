import React, { useState, useEffect } from 'react';
import { PlayingCard } from './PlayingCard';
import { CombatArt } from '@site/src/types/CombatArt';
import combatArtsData from '../../utils/json/combat-arts.json';

export const CombatArtsGrid: React.FC = () => {
    const combatArts: CombatArt[] = combatArtsData;
  
    return (
      <div className="combat-arts-grid">
        {combatArts.map((combatArt) => (
          <PlayingCard key={combatArt.name} {...combatArt} />
        ))}
      </div>
    );
  };
  