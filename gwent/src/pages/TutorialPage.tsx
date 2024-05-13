import React from 'react';
import { Link } from 'react-router-dom';
import styles from './TutorialPage.module.css';

const MenuPage: React.FC = () => {
  return (
    <div className="menu-page">
      <div className={styles['menu-page']}>
        <h1>How to play!</h1>
      <p>At the start of a match, each player draws 10 cards from their deck.</p>
        <p>
        The goal of the game is to win the game by lowering the enemies health to 0. You can do this by playing cards from your hand to the board. Each card has a power value, and the player with the highest power value at the end of the round wins the round. The player who wins 2 rounds wins the game.
        </p>
        <p>
        There are 2 types of cards in the game: Unit cards (which are divided into Melee, Ranged and Siege types) and Weather cards. Unit cards are played on the board and have a power value. Weather cards have a special effect and can be played on the board, which affects all currently placed cards in a specific field.
        </p>
        <p>
        Each player can play one card per turn. The player who goes first in the first round is chosen randomly.
        </p>
      <Link className={styles['start']} to="/menu">
        <div className={styles['start-text']}>
          Back to Menu
        </div>
      </Link>
      </div>
    </div>
  );
};

export default MenuPage;