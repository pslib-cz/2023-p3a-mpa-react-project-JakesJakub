export enum CardClass {
  Melee = 'Melee',
  Ranged = 'Ranged',
  Siege = 'Siege',
  Weather = 'Weather',
  Clear = 'Clear',
}

export enum WeatherEffect {
  Frost = 'Frost',
  Fog = 'Fog',
  Rain = 'Rain',
  Clear = 'Clear',
}

export interface Card {
  id: number;
  name: string;
  power: number;
  class: CardClass;
  image: string;
}


export interface WeatherCard extends Card {
  type: 'Weather';
  effect: WeatherEffect;
}

export interface ClearCard extends Card {
  type: 'Weather';
  effect: WeatherEffect.Clear;
}

export interface Field {
  type: CardClass.Melee | CardClass.Ranged | CardClass.Siege;
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