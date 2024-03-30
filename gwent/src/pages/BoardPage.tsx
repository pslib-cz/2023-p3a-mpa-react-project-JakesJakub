import React from 'react';
import { Link } from 'react-router-dom';

const BoardPage: React.FC = () => {
  return (
    
    <div className="board-page">
      <h1>Board</h1>
      <Link to="/">
        Return to Main Menu
      </Link>
    </div>
  );
};

export default BoardPage;
