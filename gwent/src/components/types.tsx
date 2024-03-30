export interface Card {
    id: number;
    name: string;
    power: number;
    class: 'Melee' | 'Ranged' | 'Siege';
    image: string;
  }
  
  export interface WeatherCard {
    name: string;
    debuff: 'Melee' | 'Ranged' | 'Siege' | 'None';
    image: string;
  }
  
  export interface Field {
    type: 'Melee' | 'Ranged' | 'Siege';
    cards: Card[];
    totalPower: number;
  }
  
  export interface Player {
    hand: Card[];
    deck: Card[];
    fields: Field[];
    lifeCrystals: number;
  }
  
  export interface Game {
    players: Player[];
    currentPlayerIndex: number;
    weatherCards: WeatherCard[];
  }
  