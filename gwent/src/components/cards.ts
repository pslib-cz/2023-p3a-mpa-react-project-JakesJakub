import { Card, WeatherCard, CardClass, ClearCard, WeatherEffect } from './types';
import Geralt from '../assets/geralt.png';
import Ciri from '../assets/ciri.png';
import Yennefer from '../assets/yen.png';
import Triss from '../assets/triss.png';
import Vesemir from '../assets/vesemir.png';
import Albrich from '../assets/albrich.png';
import Archer from '../assets/archer.png';
import Assire from '../assets/assire_var_anahid.png';
import Ballista from '../assets/ballista1.png';
import Ceallach from '../assets/ceallach.png';
import Roche from '../assets/roche.png';
import Puttkammer from '../assets/puttkammer.png';
import Sabrina from '../assets/sabrina.png';
import Toruviel from '../assets/toruviel.png';
import Ves from '../assets/ves.png';
import Dijkstra from '../assets/dijkstra.png';
import Dethmold from '../assets/dethmold.png';
import Draug from '../assets/draug.png';
import Fiend from '../assets/fiend.png';
import FootSoldier from '../assets/foot_soldier2.png';
import Morteisen from '../assets/morteisen.png';
import Frost from '../assets/frost.png';
import Fog from '../assets/fog.png';
import Rain from '../assets/rain.png';
import Clear from '../assets/clear.png';
import Scorpion from '../assets/fire_scorpion.png';
import Voorhis from '../assets/voorhis.png';
import Trebuchet1 from '../assets/trebuchet1.png';
import Trebuchet2 from '../assets/trebuchet2.png';
import SiegeTower from '../assets/siege_tower.png';
import Botchling from '../assets/botchling.png';
import Defender1 from '../assets/defender1.png';
import Wyvern from '../assets/wyvern.png';
import Sivney from '../assets/sivney.png';
import RottenMangonel from '../assets/rotten_mangonel.png';
import IceGiant from '../assets/ice_giant.png';
import CardBack from '../assets/card.png';

export const cards: (Card | WeatherCard | ClearCard)[] = [
    {
        id: 1,
        name: 'Geralt of Rivia',
        power: 15,
        class: CardClass.Melee,
        image: Geralt,
        cardback: CardBack
    },
    {
        id: 2,
        name: 'Ciri',
        power: 15,
        class: CardClass.Melee,
        image: Ciri,
        cardback: CardBack
    },
    {
        id: 3,
        name: 'Yennefer of Vengerberg',
        power: 7,
        class: CardClass.Ranged,
        image: Yennefer,
        cardback: CardBack
    },
    {
        id: 4,
        name: 'Triss Merigold',
        power: 7,
        class: CardClass.Melee,
        image: Triss,
        cardback: CardBack
    },
    {
        id: 5,
        name: 'Vesemir',
        power: 6,
        class: CardClass.Melee,
        image: Vesemir,
        cardback: CardBack
    },
    {
        id: 6,
        name: 'Albrich',
        power: 2,
        class: CardClass.Ranged,
        image: Albrich,
        cardback: CardBack
    },
    {
        id: 7,
        name: 'Dol Blathanna Archer',
        power: 4,
        class: CardClass.Ranged,
        image: Archer,
        cardback: CardBack
    },
    {
        id: 8,
        name: 'Assire var Anahid',
        power: 6,
        class: CardClass.Ranged,
        image: Assire,
        cardback: CardBack
    },
    {
        id: 9,
        name: 'Balista',
        power: 6,
        class: CardClass.Siege,
        image: Ballista,
        cardback: CardBack
    },
    {
        id: 10,
        name: 'Cahir Mawe Dyffryn aep Ceallach',
        power: 6,
        class: CardClass.Melee,
        image: Ceallach,
        cardback: CardBack
    },
    {
        id: 11,
        name: 'Vernon Roche',
        power: 10,
        class: CardClass.Melee,
        image: Roche,
        cardback: CardBack
    },
    {
        id: 12,
        name: 'Puttkammer',
        power: 3,
        class: CardClass.Ranged,
        image: Puttkammer,
        cardback: CardBack
    },
    {
        id: 13,
        name: 'Sabrina Glevissig',
        power: 4,
        class: CardClass.Ranged,
        image: Sabrina,
        cardback: CardBack
    },
    {
        id: 14,
        name: 'Toruviel',
        power: 2,
        class: CardClass.Ranged,
        image: Toruviel,
        cardback: CardBack
    },
    {
        id: 15,
        name: 'Ves',
        power: 5,
        class: CardClass.Melee,
        image: Ves,
        cardback: CardBack
    },
    {
        id: 16,
        name: 'Sigismund Dijkstra',
        power: 4,
        class: CardClass.Melee,
        image: Dijkstra,
        cardback: CardBack
    },
    {
        id: 17,
        name: 'Dethmold',
        power: 6,
        class: CardClass.Ranged,
        image: Dethmold,
        cardback: CardBack
    },
    {
        id: 18,
        name: 'Draug',
        power: 10,
        class: CardClass.Melee,
        image: Draug,
        cardback: CardBack
    },
    {
        id: 19,
        name: 'Fiend',
        power: 6,
        class: CardClass.Melee,
        image: Fiend,
        cardback: CardBack
    },
    {
        id: 20,
        name: 'Redanian Foot Soldier',
        power: 1,
        class: CardClass.Melee,
        image: FootSoldier,
        cardback: CardBack
    },
    {
        id: 21,
        name: 'Morteisen',
        power: 3,
        class: CardClass.Melee,
        image: Morteisen,
        cardback: CardBack
    },
    {
        id: 22,
        name: 'Frost',
        power: 0,
        class: CardClass.Weather,
        type: 'Weather',
        effect: WeatherEffect.Frost,
        image: Frost,
        cardback: CardBack
    },
    {
        id: 23,
        name: 'Fog',
        power: 0,
        class: CardClass.Weather,
        type: 'Weather',
        effect: WeatherEffect.Fog,
        image: Fog,
        cardback: CardBack
    },
    {
        id: 24,
        name: 'Rain',
        power: 0,
        class: CardClass.Weather,
        type: 'Weather',
        effect: WeatherEffect.Rain,
        image: Rain,
        cardback: CardBack
    },
    {
        id: 25,
        name: 'Clear',
        power: 0,
        class: CardClass.Weather,
        type: 'Weather',
        effect: WeatherEffect.Clear,
        image: Clear,
        cardback: CardBack
    },
    {
        id: 26,
        name: 'Fire Scorpion',
        power: 5,
        class: CardClass.Siege,
        image: Scorpion,
        cardback: CardBack
    },
    {
        id: 27,
        name: 'Morvran Voorhis',
        power: 10,
        class: CardClass.Siege,
        image: Voorhis,
        cardback: CardBack
    },
    {
        id: 28,
        name: 'Trebuchet',
        power: 6,
        class: CardClass.Siege,
        image: Trebuchet1,
        cardback: CardBack
    },
    {
        id: 29,
        name: 'Trebuchet',
        power: 6,
        class: CardClass.Siege,
        image: Trebuchet2,
        cardback: CardBack
    },
    {
        id: 30,
        name: 'Siege Tower',
        power: 6,
        class: CardClass.Siege,
        image: SiegeTower,
        cardback: CardBack
    },
    {
        id: 31,
        name: 'Frost',
        power: 0,
        class: CardClass.Weather,
        type: 'Weather',
        effect: WeatherEffect.Frost,
        image: Frost,
        cardback: CardBack
    },
    {
        id: 32,
        name: 'Fog',
        power: 0,
        class: CardClass.Weather,
        type: 'Weather',
        effect: WeatherEffect.Fog,
        image: Fog,
        cardback: CardBack
    },
    {
        id: 33,
        name: 'Rain',
        power: 0,
        class: CardClass.Weather,
        type: 'Weather',
        effect: WeatherEffect.Rain,
        image: Rain,
        cardback: CardBack
    },
    {
        id: 34,
        name: 'Clear',
        power: 0,
        class: CardClass.Weather,
        type: 'Weather',
        effect: WeatherEffect.Clear,
        image: Clear,
        cardback: CardBack
    },
    {
        id: 35,
        name: 'Botchling',
        power: 4,
        class: CardClass.Melee,
        image: Botchling,
        cardback: CardBack
    },
    {
        id: 36,
        name: 'Mahakaman Defender',
        power: 5,
        class: CardClass.Melee,
        image: Defender1,
        cardback: CardBack
    },
    {
        id: 37,
        name: 'Wyvern',
        power: 2,
        class: CardClass.Ranged,
        image: Wyvern,
        cardback: CardBack
    },
    {
        id: 38,
        name: 'Ida Emean aep Sivney',
        power: 6,
        class: CardClass.Ranged,
        image: Sivney,
        cardback: CardBack
    },
    {
        id: 39,
        name: 'Rotten Mangonel',
        power: 3,
        class: CardClass.Siege,
        image: RottenMangonel,
        cardback: CardBack
    },
    {
        id: 40,
        name: 'Ice Giant',
        power: 5,
        class: CardClass.Siege,
        image: IceGiant,
        cardback: CardBack
    },
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
    cards[24],
    cards[25],
    cards[26],
    cards[27],
    cards[28],
    cards[29],
    cards[30],
    cards[31],
    cards[32],
    cards[33],
    cards[34],
    cards[35],
    cards[36],
    cards[37],
    cards[38],
    cards[39],


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
    cards[24],
    cards[25],
    cards[26],
    cards[27],
    cards[28],
    cards[29],
    cards[30],
    cards[31],
    cards[32],
    cards[33],
    cards[34],
    cards[35],
    cards[36],
    cards[37],
    cards[38],
    cards[39],


  ];

  export const weatherCards: WeatherCard[] = cards.filter(card => card.class === 'Weather') as WeatherCard[];

  export const clearCard: ClearCard = cards.find(card => (card as WeatherCard).effect === 'Clear') as ClearCard;
