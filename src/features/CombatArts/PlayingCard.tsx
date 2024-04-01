import React from 'react'
import Markdown from 'react-markdown';
import { CombatArt } from "src/types/CombatArt";
import parse from 'html-react-parser';

export const PlayingCard: React.FC<CombatArt> = ({ name, weapons, effect }) => {
    return (
      <div className="playing-card">
        <h3>{name}</h3>
        <p>Weapons: {weapons}</p>
        <p>Effect: {parse(effect)}</p>
      </div>
    );
  };
  