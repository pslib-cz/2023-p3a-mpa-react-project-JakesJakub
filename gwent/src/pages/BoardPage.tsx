import React, { useState, useEffect } from 'react';
import { Game, Card, Player, CardClass } from '../components/types';
import { player1Deck, player2Deck } from '../components/cards';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/Board-bg.png';

const initialGame: Game = {
  players: [
    {
      currentPlayer: null,
      hand: [],
      deck: player1Deck,
      fields: [
        { type: CardClass.Melee, cards: [], totalPower: 0 },
        { type: CardClass.Ranged, cards: [], totalPower: 0 },
        { type: CardClass.Siege, cards: [], totalPower: 0 }
      ],
      lifeCrystals: 2
    },
    {
      currentPlayer: null,
      hand: [],
      deck: player2Deck,
      fields: [
        { type: CardClass.Melee, cards: [], totalPower: 0 },
        { type: CardClass.Ranged, cards: [], totalPower: 0 },
        { type: CardClass.Siege, cards: [], totalPower: 0 }
      ],
      lifeCrystals: 2
    }
  ],
  currentPlayerIndex: 0
};

const BoardPage: React.FC = () => {
  const [game, setGame] = useState<Game>(initialGame);
  const [initialCardsDrawn, setInitialCardsDrawn] = useState(false);

  useEffect(() => {
    if (!initialCardsDrawn) {
      setGame(prevGame => ({
        ...prevGame,
        players: prevGame.players.map((player, index) => ({
          ...player,
          hand: drawInitialCards(player),
        })),
      }));
      setInitialCardsDrawn(true);
    }
  }, [initialCardsDrawn]);

  const drawInitialCards = (player: Player): Card[] => {
    const drawnCards: Card[] = [];
    let newDeck = [...player.deck];

    for (let i = 0; i < 10; i++) {
      if (newDeck.length > 0) {
        const randomIndex = Math.floor(Math.random() * newDeck.length);
        const drawnCard = newDeck[randomIndex];
        drawnCards.push(drawnCard);
        newDeck = newDeck.filter(card => card.id !== drawnCard.id);
      }
    }

    return drawnCards;
  };

  const cardClassToIndex: { [key in CardClass]: number } = {
    [CardClass.Melee]: 0,
    [CardClass.Ranged]: 1,
    [CardClass.Siege]: 2,
    [CardClass.Weather]: 3,
    [CardClass.Clear]: 4,
  };

  const handleCardPlacement = (card: Card, fieldIndex: number) => {
    setGame(prevGame => ({
      ...prevGame,
      players: prevGame.players.map((player, index) => {
        if (index === prevGame.currentPlayerIndex) {
          const newHand = player.hand.filter(c => c.id !== card.id);
          const newFields = player.fields.map((field, i) => {
            if (i === cardClassToIndex[card.class]) {
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
    }));
  };

  return (
    <div className="board" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', height: '100vh', width: '150vh'}}>
      <h1>Game</h1>
      <Link to="/">Return to menu</Link>
      
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {game.players[0].hand.map(card => (
          <img
            key={card.id}
            src={card.image}
            alt={card.name}
            className="card"
            style={{ height: '200px', width: 'auto', margin: '5px', bottom : '0' }}
            onClick={() => handleCardPlacement(card, cardClassToIndex[card.class])}
          />
        ))}
      </div>
  
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {game.players[game.currentPlayerIndex].fields.map((field, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'center',  height: '200px' }}>
            {field.cards.map(card => (
              <img
                key={card.id}
                src={card.image}
                alt={card.name}
                className="card"
              />
            ))}
          </div>
        ))}
      </div>
  
      <div>
        {game.players[game.currentPlayerIndex].hand.map((card) => (
          <button
            key={card.id}
            onClick={() => handleCardPlacement(card, cardClassToIndex[card.class])}
          >
            {card.name}
          </button>
        ))}
      </div>
  
      <div style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', fontSize: 36, fontWeight: 'bold'}}>
        Total Power: {game.players[game.currentPlayerIndex].fields.reduce((total, field) => total + field.totalPower, 0)}
      </div>
    </div>
  );
};

export default BoardPage;
