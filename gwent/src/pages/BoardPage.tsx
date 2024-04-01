//BoardPage.tsx
import React, { useState, useEffect } from 'react';
import { Game, Card, Player} from '../components/types';
import { player1Deck, player2Deck } from '../components/cards';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/Board-bg.png';


const initialGame: Game = {
  players: [
    {
      currentPlayer: null,
      hand: [],
      deck: player1Deck,
      fields: [{ type: 'Melee', cards: [], totalPower: 0 }, { type: 'Ranged', cards: [], totalPower: 0 }, { type: 'Siege', cards: [], totalPower: 0 }],
      lifeCrystals: 2
    },
    {
      currentPlayer: null,
      hand: [],
      deck: player2Deck,
      fields: [{ type: 'Melee', cards: [], totalPower: 0 }, { type: 'Ranged', cards: [], totalPower: 0 }, { type: 'Siege', cards: [], totalPower: 0 }],
      lifeCrystals: 2
    }
  ],
  currentPlayerIndex: 0
};

const BoardPage: React.FC = () => {
  const [game, setGame] = useState<Game>(initialGame);

  useEffect(() => {

    if (game.players[0].hand.length === 0) {
      setGame(prevGame => ({
        ...prevGame,
        players: [
          {
            ...prevGame.players[0],
            hand: drawInitialCards(prevGame.players[0]),
          },
          prevGame.players[1],
        ],
      }));
    }

    if (game.players[1].hand.length === 0) {
      setGame(prevGame => ({
        ...prevGame,
        players: [
          prevGame.players[0],
          {
            ...prevGame.players[1],
            hand: drawInitialCards(prevGame.players[1]),
          },
        ],
      }));
    }
  }, [game]);

  const drawInitialCards = (player: Player): Card[] => {
    const drawnCards: Card[] = [];
    const newDeck = [...player.deck];


    for (let i = 0; i < 10; i++) {
      if (newDeck.length > 0) {
        const randomIndex = Math.floor(Math.random() * newDeck.length);
        const drawnCard = newDeck[randomIndex];
        drawnCards.push(drawnCard);
        newDeck.splice(randomIndex, 1);
      }
    }

    

    return drawnCards;
  };

  const handleCardPlacement = (card: Card, fieldIndex: number) => {
    setGame(prevGame => ({
      ...prevGame,
      players: prevGame.players.map((player, index) => {
        if (index === prevGame.currentPlayerIndex) {
          const newHand = player.hand.filter(c => c.id !== card.id);
          const newFields = player.fields.map((field, i) => {
            if (i === fieldIndex) {
              const newCards = [...field.cards, card];
              const newTotalPower = field.totalPower + card.power;
              return { ...field, cards: newCards, totalPower: newTotalPower };
            }
            return field;
          });

          return { ...player, hand: newHand, fields: newFields };
        }
        return player;
      }),
    } as Game));
  };

  return (
    <div className="board" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', height: '100vh', width: '150vh'}}>
      <h1>Game</h1>
      <Link to="/">Return to menu</Link>
      
      {/* Display initial cards for each player */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {game.players[0].hand.map(card => (
          <img
            key={card.id}
            src={card.image}
            alt={card.name}
            className="card"
            onClick={() => handleCardPlacement(card, 0)}
          />
        ))}
      </div>

      {/* Current player's hand */}
      <div>
        {game.players[game.currentPlayerIndex].hand.map((card) => (
          <button
            key={card.id}
            onClick={() => handleCardPlacement(card, 0)}
          >
            {card.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BoardPage;
