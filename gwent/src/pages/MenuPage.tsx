import React from 'react';
import { Link } from 'react-router-dom';
import styles from './MenuPage.module.css';

const MenuPage: React.FC = () => {
  return (
    <div className="menu-page">
      <div className={styles['menu-page']}>
      <Link className={styles['start']} to="/board">
        Play Game
      </Link>
      </div>
    </div>
  );
};

export default MenuPage;