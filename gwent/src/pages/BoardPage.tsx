import React, { useState, useEffect } from 'react';
import { Game, Card, Player, CardClass, cardClassToIndex } from '../components/types';
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
  const [roundsEnded, setRoundsEnded] = useState<number>(0);

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
    if (!game.players[game.currentPlayerIndex].hasPlacedCard) {
      setGame(prevGame => {
        let newPlayers = prevGame.players.map((player, index) => {
          if (index === prevGame.currentPlayerIndex) {
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
    }
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

  const handleEndRound = () => {
    setRoundsEnded(prevRoundsEnded => prevRoundsEnded + 1);

  
    if (roundsEnded === 1) {
      const player1TotalPower = game.players[0].fields.reduce((total, field) => total + field.cards.reduce((fieldTotal, card) => fieldTotal + (field.weatherEffect || card.power), 0), 0);
      const player2TotalPower = game.players[1].fields.reduce((total, field) => total + field.cards.reduce((fieldTotal, card) => fieldTotal + (field.weatherEffect || card.power), 0), 0);
  
      if (player1TotalPower < player2TotalPower) {
        setGame(prevGame => ({
          ...prevGame,
          players: [
            { ...prevGame.players[0], lifeCrystals: prevGame.players[0].lifeCrystals - 1, fields: initialGame.players[0].fields },
            { ...prevGame.players[1], fields: initialGame.players[1].fields }
          ]
        }));
      } else if (player1TotalPower > player2TotalPower) {
        setGame(prevGame => ({
          ...prevGame,
          players: [
            { ...prevGame.players[0], fields: initialGame.players[0].fields },
            { ...prevGame.players[1], lifeCrystals: prevGame.players[1].lifeCrystals - 1, fields: initialGame.players[1].fields }
          ]
        }));
      } else {

        setGame(prevGame => ({
          ...prevGame,
          players: [
            { ...prevGame.players[0], lifeCrystals: prevGame.players[0].lifeCrystals - 1, fields: initialGame.players[0].fields },
            { ...prevGame.players[1], lifeCrystals: prevGame.players[1].lifeCrystals - 1, fields: initialGame.players[1].fields }
          ]
        }));
      }
  
      setRoundsEnded(0);
  
      
    }
  };
  

  return (
    <div className="board" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', height: '100vh', width: '150vh'}}>
      <h1>Game</h1>
      <p style={{fontSize: 24, color: 'red', fontWeight: 'bold'}}>{`Player ${game.currentPlayerIndex + 1}'s Turn`}</p>
      <Link to="/">Return to menu</Link>

      
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {game.players.map((player, playerIndex) => (
          <div key={playerIndex}>
            {player.hand.map(card => (
              <button
                key={card.id}
                onClick={() => handleCardPlacement(card, cardClassToIndex[card.class])}
                disabled={playerIndex !== game.currentPlayerIndex || player.hasPlacedCard}
                style={{ margin: '5px' }}
              >
                <img
                  src={playerIndex === game.currentPlayerIndex ? card.image : card.cardback}
                  alt={card.name}
                  className="card"
                  style={{ height: '200px', width: 'auto' }}
                />
              </button>
            ))}
          </div>
        ))}
      </div>


      {game.players[game.currentPlayerIndex].hasPlacedCard && (
        <button onClick={switchTurn}>End Turn</button>
      )}

      {game.players[game.currentPlayerIndex].hasPlacedCard && (
        <button onClick={() => { handleEndRound(); switchTurn()}}>End Round</button>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {game.players.map((player, playerIndex) => (
          <div key={playerIndex}>
            <p>Player {playerIndex + 1} Life Crystals: {player.lifeCrystals}</p>
            {player.fields.map((field, i) => (
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
        ))}
      </div>


      <div style={{ position: 'absolute', justifyContent: 'center', left: 0, top: '10%', transform: 'translateX(125%)', fontSize: 36, fontWeight: 'bold', color: 'yellow'}}>
        Player1 Total Power: {game.players[0].fields.reduce((total, field) => total + field.cards.reduce((fieldTotal, card) => fieldTotal + (field.weatherEffect || card.power), 0), 0)} <br />
        Player2 Total Power: {game.players[1].fields.reduce((total, field) => total + field.cards.reduce((fieldTotal, card) => fieldTotal + (field.weatherEffect || card.power), 0), 0)}
      </div>
    </div>
  );
};

export default BoardPage;
