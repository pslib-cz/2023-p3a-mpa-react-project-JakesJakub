import React from 'react';
import { Link } from 'react-router-dom';
import styles from './MenuPage.module.css';

const MenuPage: React.FC = () => {
  return (
    <div className="menu-page">
      <div className={styles['menu-page']}>
        <div className={styles['container']}>
          <Link className={styles['start']} to="/board">
          <div className={styles['start-text']}>
            Play Game
          </div>
        </Link>
        <Link className={styles['start']} to="/tutorial">
          <div className={styles['start-text']}>
            Tutorial
          </div>
        </Link>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;