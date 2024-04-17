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
      lifeCrystals: 2,
      hasPlacedCard: false
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
      lifeCrystals: 2,
      hasPlacedCard: false
    }
  ],
  currentPlayerIndex: Math.random() < 0.5 ? 0 : 1
};

const BoardPage: React.FC = () => {
  const [game, setGame] = useState<Game>(initialGame);

  useEffect(() => {
    setGame(prevGame => ({
      ...prevGame,
      players: prevGame.players.map(player => ({
        ...player,
        hand: drawInitialCards(player),
      })),
    }));
  }, []);

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

  const handleCardPlacement = (card: Card, fieldIndex: number) => {
    setGame(prevGame => {
      let newPlayers = prevGame.players.map((player, index) => {
        if (index === prevGame.currentPlayerIndex && !player.hasPlacedCard) {
          const newHand = player.hand.filter(c => c.id !== card.id);
          let newFields = player.fields.map((field, i) => {
            if (i === fieldIndex) {
              const newCards = [...field.cards, card];
              const totalPower = newCards.reduce((total, card) => total + card.power, 0);
              return { ...field, cards: newCards, totalPower };
            }
            return field;
          });
  
          if (card.class === CardClass.Weather) {
            newFields = newFields.map(field => {
              if ((card.name === 'Frost' && field.type === CardClass.Melee) ||
                  (card.name === 'Fog' && field.type === CardClass.Ranged) ||
                  (card.name === 'Rain' && field.type === CardClass.Siege)) {
                    return { ...field, weatherEffect: 1 };
                  } else if (card.name === 'Clear') {
                    return { ...field, weatherEffect: undefined };
              }
              return field;
            });
          }
  
          return { ...player, hand: newHand, fields: newFields, hasPlacedCard: true };
        }
        return player;
      });
  
      if (card.class === CardClass.Weather) {
        newPlayers = newPlayers.map(player => {
          let newFields = player.fields.map(field => {
            if ((card.name === 'Frost' && field.type === CardClass.Melee) ||
                (card.name === 'Fog' && field.type === CardClass.Ranged) ||
                (card.name === 'Rain' && field.type === CardClass.Siege)) {
                  return { ...field, weatherEffect: 1 };
                } else if (card.name === 'Clear') {
                  return { ...field, weatherEffect: undefined };
            }
            return field;
          });
          return { ...player, fields: newFields };
        });
      }
  
      return { ...prevGame, players: newPlayers };
    });
  };
  
  

  const switchTurn = () => {
    setGame(prevGame => {
      const nextPlayerIndex = prevGame.currentPlayerIndex === 0 ? 1 : 0;
      const updatedPlayers = prevGame.players.map(player => ({
        ...player,
        hasPlacedCard: false
      }));

      return {
        ...prevGame,
        currentPlayerIndex: nextPlayerIndex,
        players: updatedPlayers
      };
    });
  };

  return (
    <div className="board" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', height: '100vh', width: '150vh'}}>
      <h1>Game</h1>
      <p>{`Player ${game.currentPlayerIndex + 1}'s Turn`}</p>
      <Link to="/">Return to menu</Link>
      
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {game.players[game.currentPlayerIndex].hand.map(card => (
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


      {game.players[game.currentPlayerIndex].hasPlacedCard && (
        <button onClick={switchTurn}>End Turn</button>
      )}


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


      <div style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', fontSize: 36, fontWeight: 'bold'}}>
      Total Power: {game.players[game.currentPlayerIndex].fields.reduce((total, field) => total + field.cards.reduce((fieldTotal, card) => fieldTotal + (field.weatherEffect || card.power), 0), 0)}
      </div>
    </div>
  );
};

export default BoardPage;

const cardClassToIndex: { [key in CardClass]: number } = {
  [CardClass.Melee]: 0,
  [CardClass.Ranged]: 1,
  [CardClass.Siege]: 2,
  [CardClass.Weather]: 3,
  [CardClass.Clear]: 4,
};
