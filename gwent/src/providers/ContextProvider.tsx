import React, { PropsWithChildren, createContext, useContext, useReducer } from 'react';
import { Game, Card } from '../components/types';


type Action =
  | { type: 'DRAW_CARD'; playerIndex: number }
  | { type: 'PLACE_CARD'; playerIndex: number; fieldIndex: number; card: Card };


const reducer = (state: Game, action: Action): Game => {
    switch (action.type) {
        case 'DRAW_CARD':
            const newPlayers = [...state.players];
            const currentPlayer = newPlayers[action.playerIndex];
            const newDeck = [...currentPlayer.deck];
            const newHand = [...currentPlayer.hand];
          
            for (let i = 0; i < 10; i++) {
              if (newDeck.length > 0) {
                const drawnCard = newDeck.pop()!;
                newHand.push(drawnCard);
              }
            }
          
            currentPlayer.deck = newDeck;
            currentPlayer.hand = newHand;
          
            return {
              ...state,
              players: newPlayers,
            };
  
      case 'PLACE_CARD':

        const updatedPlayers = [...state.players];
        const currPlayer = updatedPlayers[action.playerIndex];
        const currHand = [...currPlayer.hand];
        const currFields = [...currPlayer.fields];
  
        const placedCardIndex = currHand.findIndex(card => card.id === action.card.id);
        const placedCard = currHand.splice(placedCardIndex, 1)[0];
  
        const targetField = currFields[action.fieldIndex];
  
        targetField.cards.push(placedCard);
        targetField.totalPower += placedCard.power;
  
        currPlayer.hand = currHand;
        currPlayer.fields = currFields;
  
        return {
          ...state,
          players: updatedPlayers,
        };
  
      default:
        return state;
    }
  };
  

const initialState: Game = {
    players: [],
    currentPlayerIndex: 0
};

const GameContext = createContext<{ state: Game; dispatch: React.Dispatch<Action> } | undefined>(undefined);


export const GameProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return <GameContext.Provider value={{ state, dispatch }}>{children}</GameContext.Provider>;
};

export const useGame = () => {
    const context = useContext(GameContext);

    if (!context) {
        throw new Error('useGame must be used within a GameProvider');
    }

    return context;
};
