import { Card, WeatherCard, CardClass, ClearCard, WeatherEffect } from './types';


export const cards: (Card | WeatherCard | ClearCard)[] = [
    {
      id: 1,
      name: 'Geralt of Rivia',
      power: 15,
      class: CardClass.Melee,
      image: '../assets/geralt.png'
    },
    {
        id: 2,
      name: 'Ciri',
      power: 15,
      class: CardClass.Melee,
      image: '../assets/ciri.png'
    },
    {
        id: 3,
      name: 'Yennefer of Vengerberg',
      power: 7,
      class: CardClass.Ranged,
      image: '../assets/yen.png'
    },
    {
      id: 4,
        name: 'Triss Merigold',
        power: 7,
        class: CardClass.Melee,
        image: '../assets/triss.png'  
    },
    {
        id: 5,
        name: 'Vesemir',
        power: 6,
        class: CardClass.Melee,
        image: '../assets/vesemir.png'
    },
    {
        id: 6,
        name: 'Albrich',
        power: 2,
        class: CardClass.Ranged,
        image: '../assets/albrich.png'
    },
    {
        id: 7,
        name: 'Dol Blathanna Archer',
        power: 4,
        class: CardClass.Ranged,
        image: '../assets/archer.png'
    },
    {
        id: 8,
        name: 'Assire var Anahid',
        power: 6,
        class: CardClass.Ranged,
        image: '../assets/assire_var_anahid.png'
    },
    {
        id: 9,
        name: 'Balista',
        power: 6,
        class: CardClass.Siege,
        image: '../assets/balista1.png'
    },
    {
        id: 10,
        name: 'Cahir Mawe Dyffryn aep Ceallach',
        power: 6,
        class: CardClass.Melee,
        image: '../assets/ceallach.png'
    },
    {
        id: 11,
        name: 'Vernon Roche',
        power: 10,
        class: CardClass.Melee,
        image: '../assets/roche.png'
    },
    {
        id: 12,
        name: 'Puttkammer',
        power: 3,
        class: CardClass.Ranged,
        image: '../assets/puttkammer.png'
    },
    {
        id: 13,
        name: 'Sabrina Glevissig',
        power: 4,
        class: CardClass.Ranged,
        image: '../assets/sabrina.png'
    },
    {
        id: 14,
        name: 'Toruviel',
        power: 2,
        class: CardClass.Ranged,
        image: '../assets/toruviel.png'
    },
    {
        id: 15,
        name: 'Ves',
        power: 5,
        class: CardClass.Melee,
        image: '../assets/ves.png'
    },
    {
        id: 16,
        name: 'Sigismund Dijkstra',
        power: 4,
        class: CardClass.Melee,
        image: '../assets/dijkstra.png'
    },
    {
        id: 17,
        name: 'Dethmold',
        power: 6,
        class: CardClass.Ranged,
        image: '../assets/dethmold.png'
    },
    {
        id: 18,
        name: 'Draug',
        power: 10,
        class: CardClass.Melee,
        image: '../assets/draug.png'
    },
    {
        id: 19,
        name: 'Fiend',
        power: 6,
        class: CardClass.Melee,
        image: '../assets/fiend.png'
    },
    {
        id: 20,
        name: 'Redanian Foot Soldier',
        power: 1,
        class: CardClass.Melee,
        image: '../assets/foot_soldier2.png'
    },
    {
        id: 21,
        name: 'Morteisen',
        power: 3,
        class: CardClass.Melee,
        image: '../assets/morteisen.png'
    },
    {
        id: 22,
        name: 'Frost',
        power: 0,
        class: CardClass.Weather,
        type: 'Weather',
        effect: WeatherEffect.Frost,
        image: '../assets/frost.png'
      },
      {
        id: 23,
        name: 'Fog',
        power: 0,
        class: CardClass.Weather,
        type: 'Weather',
        effect: WeatherEffect.Fog,
        image: '../assets/fog.png'
      },
      {
        id: 24,
        name: 'Rain',
        power: 0,
        class: CardClass.Weather,
        type: 'Weather',
        effect: WeatherEffect.Rain,
        image: '../assets/rain.png'
      },
      {
        id: 25,
        name: 'Clear',
        power: 0,
        class: CardClass.Weather,
        type: 'Weather',
        effect: WeatherEffect.Clear,
        image: '../assets/clear.png'
      }
  ];
  
  
  export const player1Deck: Card[] = [
    cards[0],
    cards[1],
    cards[2],
    cards[3],
    cards[4],
    cards[5],
    cards[6],
    cards[7],
    cards[8],
    cards[9],
    cards[10],
    cards[11],
    cards[12],
    cards[13],
    cards[14],
    cards[15],
    cards[16],
    cards[17],
    cards[18],
    cards[19],
    cards[20],
    cards[21],
    cards[22],
    cards[23],
    cards[24]


  ];
  
  export const player2Deck: Card[] = [
    cards[0],
    cards[1],
    cards[2],
    cards[3],
    cards[4],
    cards[5],
    cards[6],
    cards[7],
    cards[8],
    cards[9],
    cards[10],
    cards[11],
    cards[12],
    cards[13],
    cards[14],
    cards[15],
    cards[16],
    cards[17],
    cards[18],
    cards[19],
    cards[20],
    cards[21],
    cards[22],
    cards[23],
    cards[24]


  ];

  export const weatherCards: WeatherCard[] = cards.filter(card => card.class === 'Weather') as WeatherCard[];

  export const clearCard: ClearCard = cards.find(card => (card as WeatherCard).effect === 'Clear') as ClearCard;
