import React, { useState, useEffect } from 'react';
import './DealList.css';

export default function DealList() {
  const [deals, setDeals] = useState([]);
  const [role, setRole] = useState(() => localStorage.getItem('role'));
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const savedDeals = JSON.parse(localStorage.getItem('deals')) || [];
    setDeals(savedDeals);
  }, []);

  useEffect(() => {
    const updateRole = () => setRole(localStorage.getItem('role'));
    window.addEventListener('storage', updateRole);
    window.addEventListener('focus', updateRole);
    return () => {
      window.removeEventListener('storage', updateRole);
      window.removeEventListener('focus', updateRole);
    };
  }, []);

  const addToFavorites = (deal) => {
    if (!favorites.find((fav) => fav.id === deal.id)) {
      const updated = [...favorites, deal];
      setFavorites(updated);
      localStorage.setItem('favorites', JSON.stringify(updated));
    }
  };

  const isFavorite = (dealId) => favorites.some((fav) => fav.id === dealId);

  return (
    <div className="deal-list-container">
      <h1>Available Deals</h1>
      {deals.length === 0 ? (
        <p>No deals available yet. Please check back later!</p>
      ) : (
        <table className="deal-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              {(role === 'user' || role === 'admin') && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {deals.map((deal) => (
              <DealRow
                key={deal.id}
                deal={deal}
                role={role}
                isFavorite={isFavorite}
                addToFavorites={addToFavorites}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
  