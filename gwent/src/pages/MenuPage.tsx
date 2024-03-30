import React from 'react';
import { Link } from 'react-router-dom';

const MenuPage: React.FC = () => {
  return (
    <div className="menu-page">
      
      <h1>Gwent</h1>
      <Link to="/board">
        Start
      </Link>
    </div>
  );
};

export default MenuPage;