import React, { useState, useEffect } from 'react';
import './Favorites.css';

export default function Favorites() {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites)); // Save updated favorites back to localStorage
  }, [favorites]);

  // Function to remove a deal from favorites
  const removeFavorite = (id) => {
    setFavorites(favorites.filter(deal => deal.id !== id)); // Keep only deals that don't match the given ID
  };

  // If no favorites are saved, show a message
 if (favorites.length === 0) {
    return (
      <div className="favorites-container">
        <h1>Your org.discountdeals.model.Favorite Deals</h1>
        <p>You have no favorite deals saved yet.</p>
      </div>
    );
  }

  // If there are favorites, show them in a table
  return (
    <div className="favorites-container">
      <h1>Your org.discountdeals.model.Favorite Deals</h1>
      <table className="favorites-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {favorites.map(deal => (
            <tr key={deal.id}>
              <td>{deal.title}</td>
              <td>{deal.description}</td>
              <td>
                <button onClick={() => removeFavorite(deal.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
