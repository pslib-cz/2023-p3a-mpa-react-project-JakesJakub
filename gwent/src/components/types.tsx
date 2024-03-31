export interface Card {
  id: number;
  name: string;
  power: number;
  class: 'Melee' | 'Ranged' | 'Siege' | 'Weather' | 'Clear';
  image: string;
}


export type WeatherEffect = 'Frost' | 'Fog' | 'Rain' | 'Clear';

export interface WeatherCard extends Card {
  type: 'Weather';
  effect: WeatherEffect;
}


export interface ClearCard extends Card {
  type: 'Weather';
  effect: 'Clear';
}


export interface Field {
  type: 'Melee' | 'Ranged' | 'Siege';
  cards: Card[];
  totalPower: number;
}

export interface Player {
  currentPlayer: any;
  hand: Card[];
  deck: Card[];
  fields: Field[];
  lifeCrystals: number;
}

export interface Game {
  players: Player[];
  currentPlayerIndex: number;
}
