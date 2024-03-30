import React, { useState } from 'react';
import { Game, Card, Player, Field } from '../components/types';
import { player1Deck, player2Deck } from '../components/cards';

const initialGame: Game = {
  players: [
    {
      hand: [],
      deck: player1Deck,
      fields: [],
      lifeCrystals: 2,
    },
    {
      hand: [],
      deck: player2Deck,
      fields: [],
      lifeCrystals: 2,
    },
  ],
  currentPlayerIndex: 0
};

const BoardPage: React.FC = () => {
  const [game, setGame] = useState<Game>(initialGame);

  const handleCardPlacement = (card: Card, fieldIndex: number) => {
    const currentPlayerIndex = game.currentPlayerIndex;
    const currentPlayer: Player = game.players[currentPlayerIndex];
    const updatedFields = [...currentPlayer.fields];


    if (updatedFields[fieldIndex] === undefined) {
      const newField: Field = {
        type: 'Melee',
        cards: [card],
        totalPower: card.power,
      };

      updatedFields[fieldIndex] = newField;

      const updatedPlayer: Player = {
        ...currentPlayer,
        fields: updatedFields,
        hand: currentPlayer.hand.filter(c => c.id !== card.id),
      };

      const updatedPlayers: Player[] = [...game.players];
      updatedPlayers[currentPlayerIndex] = updatedPlayer;

      setGame({
        players: updatedPlayers,
        currentPlayerIndex: currentPlayerIndex === 0 ? 1 : 0,
      });
    }
  };

  return (
    <div>
      {/* Display the current player's hand */}
      {game.players[game.currentPlayerIndex].hand.map((card) => (
        <button
          key={card.id}
          onClick={() => handleCardPlacement(card, 0)}
        >
          {card.name}
        </button>
      ))}
    </div>
  );
};

export default BoardPage;
