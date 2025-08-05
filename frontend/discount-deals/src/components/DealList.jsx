import React, { useState, useEffect } from 'react';
import './DealList.css';

export default function DealList() {
  const [deals, setDeals] = useState([]);
  const [role, setRole] = useState(() => localStorage.getItem('role'));
  const [favorites, setFavorites] = useState([]);
  const [sortByExpiry, setSortByExpiry] = useState(false);
  const [showExpired, setShowExpired] = useState(false);

  const userId = localStorage.getItem('userId');

  // Fetch all deals (public)
  useEffect(() => {
    fetch('http://localhost:8080/api/deals')
      .then((res) => res.json())
      .then(setDeals)
      .catch(() => setDeals([]));
  }, []);

  // Fetch user favorites (only for logged-in users)
useEffect(() => {
    setRole(localStorage.getItem('role'));
    if (userId && (role === 'user' || role === 'admin')) {
      fetch(`http://localhost:8080/api/favorites/user/${userId}`)
        .then((res) => res.json())
        .then((favs) =>
          setFavorites(favs.map((f) => ({ ...f.deal, favId: f.id })))
        )
        .catch(() => setFavorites([]));
    }
  }, [role, userId]);

  const isExpired = (date) => new Date(date) < new Date();

  // Add deal to favorites (user only) via backend
  const addToFavorites = (deal) => {
    if (!(role === 'user' && userId)) return;
    // Do not add if already favorite
    if (favorites.some((fav) => fav.id === deal.id)) return;
    fetch(`http://localhost:8080/api/favorites?userId=${userId}&dealId=${deal.id}`, {
      method: 'POST',
    })
      .then((res) => res.json())
      .then(() => {
        // Add to favorites in state
        setFavorites([...favorites, deal]);
      });
  };

  const isFavorite = (dealId) => favorites.some((fav) => fav.id === dealId);

  // Filtering logic
  let visibleDeals = [...deals];
  if (role !== 'admin' || !showExpired) {
    visibleDeals = visibleDeals.filter((deal) => !isExpired(deal.expiryDate));
  }
  if (sortByExpiry) {
    visibleDeals.sort(
      (a, b) => new Date(a.expiryDate) - new Date(b.expiryDate)
    );
  }

return (
    <div className="deal-list-container">
      <h1>Available Deals</h1>
      {role === 'admin' && (
        <div className="admin-controls">
          <label>
            <input
              type="checkbox"
              checked={showExpired}
              onChange={() => setShowExpired(!showExpired)}
            />
            Show Expired Deals
          </label>
          <label>
            <input
              type="checkbox"
              checked={sortByExpiry}
              onChange={() => setSortByExpiry(!sortByExpiry)}
            />
            Sort by Expiry Date
          </label>
        </div>
      )}
      {visibleDeals.length === 0 ? (
        <p>No deals available yet. Please check back later!</p>
      ) : (
        <table className="deal-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Expires In</th>
              <th>Discount %</th>
              {role === 'user' && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {visibleDeals.map((deal) => {
              const expiryTime = new Date(deal.expiryDate) - new Date();
              const daysLeft = Math.ceil(expiryTime / (1000 * 60 * 60 * 24));
              const discountPercent = deal.price
                ? (((deal.price - deal.discountPrice) / deal.price) * 100).toFixed(1)
                : '-';
              return (
                <tr
                  key={deal.id}
                  className={isExpired(deal.expiryDate) ? 'expired-deal-row' : ''}
                >
                  <td>{deal.title}</td>
                  <td>{deal.description}</td>
                  <td>
                    {isExpired(deal.expiryDate) ? (
                      <span className="expired-text">Expired</span>
                    ) : (
                      `${daysLeft} day${daysLeft !== 1 ? 's' : ''}`
                    )}
                  </td>
                  <td>{discountPercent}%</td>
                  {role === 'user' && (
                    <td>
                      <button
                        className={`favorite-btn ${isFavorite(deal.id) ? 'added' : ''}`}
                        onClick={() => addToFavorites(deal)}
                        disabled={isExpired(deal.expiryDate) || isFavorite(deal.id)}
                        title={
                          isExpired(deal.expiryDate)
                            ? "Can't save expired deal"
                            : isFavorite(deal.id)
                            ? "Already in favorites"
                            : "Save to favorites"
                        }
                      >
                        {isFavorite(deal.id) ? 'Saved' : 'Save'}
                      </button>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
