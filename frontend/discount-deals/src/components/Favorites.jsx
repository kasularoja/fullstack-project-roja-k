import React, { useState, useEffect } from 'react';
import './Favorites.css';

export default function Favorites() {
  const userId = localStorage.getItem('userId');
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:8080/api/favorites/user/${userId}`)
        .then((res) => res.json())
        .then((data) => setFavorites(data))
        .catch(() => setFavorites([]));
    }
  }, [userId]);

  const removeFavorite = (favoriteId) => {
    fetch(`http://localhost:8080/api/favorites/${favoriteId}`, {
      method: 'DELETE',
    })
      .then(() => setFavorites((favs) => favs.filter((f) => f.id !== favoriteId)))
      .catch((err) => alert('Failed to remove favorite: ' + err));
  };

  return (
    <div className="favorites-container">
      <h2>Your Favorite Deals</h2>
      {favorites.length === 0 ? (
        <p className="empty-message">You have no favorite deals saved yet.</p>
      ) : (
        <table className="favorites-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Discount %</th>
              <th className="action-column">Remove</th>
            </tr>
          </thead>
          <tbody>
            {favorites.map((fav) => (
              <tr key={fav.id} className="favorite-row">
                <td>{fav.deal.title}</td>
                <td>{fav.deal.description}</td>
                <td>
                  {fav.deal.price
                    ? `${(((fav.deal.price - fav.deal.discountPrice) / fav.deal.price) * 100).toFixed(1)}%`
                    : '-'}
                </td>
                <td>
                  <button
                    className="favorite-remove-btn"
                    onClick={() => removeFavorite(fav.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
