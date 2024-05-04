import React, { useState, useEffect } from 'react';
import { Game, Card, Player, CardClass, cardClassToIndex } from '../components/types';
import { player1Deck, player2Deck } from '../components/cards';
import { Link } from 'react-router-dom';
import styles from './BoardPage.module.css';
import backgroundImage from '../assets/Board-bg5.png';
import lifeCrystalImage from '../assets/lifeCrystal.png';

const initialGame: Game = {
  players: [
    {
      currentPlayer: null,
      hand: [],
      deck: player1Deck,
      fields: [
        { type: CardClass.Siege, cards: [], totalPower: 0 },
        { type: CardClass.Ranged, cards: [], totalPower: 0 },
        { type: CardClass.Melee, cards: [], totalPower: 0 }
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
  const [winner, setWinner] = useState<number | null>(null);
  const [hoveredCard, setHoveredCard] = useState<Card | null>(null);
  const [isHovering, setIsHovering] = useState(false);


  const handleCardMouseEnter = (card: Card) => {
    setHoveredCard(card);
    setIsHovering(true);
  };

  const handleCardMouseLeave = () => {
    setHoveredCard(null);
    setIsHovering(false);
  };

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
    const correctedFieldIndex = game.currentPlayerIndex === 0 ? (fieldIndex === 0 ? 2 : (fieldIndex === 2 ? 0 : fieldIndex)) : fieldIndex;

    if (!game.players[game.currentPlayerIndex].hasPlacedCard) {
      setGame(prevGame => {
        let newPlayers = prevGame.players.map((player, index) => {
          if (index === prevGame.currentPlayerIndex) {
            const newHand = player.hand.filter(c => c.id !== card.id);
            let newFields = player.fields.map((field, i) => {
              if (i === correctedFieldIndex) {
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

  useEffect(() => {
    if (game.players[0].lifeCrystals === 0) {
      setWinner(2);
    } else if (game.players[1].lifeCrystals === 0) {
      setWinner(1);
    }
  }, [game]);


  return (
    
    <div className={styles.board}>
            {isHovering && hoveredCard && (
        <div className={styles.hoveredCard}>
          <img src={hoveredCard.image} alt={hoveredCard.name} className={styles.hoveredCardImage} />
        </div>
        )}
      <div>
        <Link to="/" className={styles.returnLink}>Return</Link>
        <div className={styles.powerCrystals}>
          <div className={styles.totalPower1}>
            {game.players[0].fields.reduce((total, field) => total + field.cards.reduce((fieldTotal, card) => fieldTotal + (field.weatherEffect || card.power), 0), 0)} 
          </div>
          <div className={styles.lifeCrystals}>
          {Array.from({ length: game.players[0].lifeCrystals }, (_, index) => (
            <img key={index} src={lifeCrystalImage} alt="Life Crystal" className={styles.lifeCrystalImage} />
          ))}
        </div>
        <div className={styles.totalPower2}>
            {game.players[1].fields.reduce((total, field) => total + field.cards.reduce((fieldTotal, card) => fieldTotal + (field.weatherEffect || card.power), 0), 0)} 
          </div>
          <div className={styles.lifeCrystals}>
          {Array.from({ length: game.players[1].lifeCrystals }, (_, index) => (
            <img key={index} src={lifeCrystalImage} alt="Life Crystal" className={styles.lifeCrystalImage} />
          ))}
        </div>
        </div>
      </div>

      <div className={styles.leftContainer}>
      <p className={styles.currentTurn}>{`Player ${game.currentPlayerIndex + 1}'s Turn`}</p>
      {winner && (
      <div className={styles.winnerBox}>
        <p className={styles.winnerMessage}>Player {winner} has won the game!</p>
        <Link to="/" className={styles.returnLink}>Return to menu</Link>
      </div>
    )}
        {game.players.map((player, playerIndex) => (
          <div key={playerIndex}>
            {player.fields.map((field, fieldIndex) => (
              <div key={fieldIndex} className={styles.fieldContainer}>
                {field.cards.map(card => (
                  <img
                    key={card.id}
                    src={card.image}
                    alt={card.name}
                    className={styles.cardImage}
                    onMouseEnter={() => handleCardMouseEnter(card)}
                    onMouseLeave={handleCardMouseLeave}
                  />
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className={styles.rightContainer}>
        <div className={styles.buttonContainer}>
          {game.players.map((player, playerIndex) => (
            <div key={playerIndex} className={styles.handContainer}>
              {player.hand.map(card => (
                <button
                  key={card.id}
                  onClick={() => handleCardPlacement(card, cardClassToIndex[card.class])}
                  disabled={playerIndex !== game.currentPlayerIndex || player.hasPlacedCard}
                  className={styles.cardButton}
                >
                  <img
                    src={playerIndex === game.currentPlayerIndex ? card.image : card.cardback}
                    alt={card.name}
                    className={styles.cardImage}
                  />
                </button>
              ))}
            </div>
          ))}
        </div>

        {game.players[game.currentPlayerIndex].hasPlacedCard && (
          <a className={styles.endTurn} onClick={switchTurn}>End Turn</a>
        )}

        {game.players[game.currentPlayerIndex].hasPlacedCard && (
          <a className={styles.endRound} onClick={() => { handleEndRound(); switchTurn() }}>End Round</a>
        )}

      </div>
    </div>
  );
};

export default BoardPage;
