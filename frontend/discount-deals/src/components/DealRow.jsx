import React from 'react';
import './DealRow.css';

// Component to render a single row of deal information
export default function DealRow({ deal, role, isFavorite, addToFavorites, countdown, expired, discountPercent }) {
  const handleAddFavorite = () => {
    if (!isFavorite(deal.id)) {
      addToFavorites(deal);
    }
  };

  return (
    <tr className={expired ? 'expired-deal-row' : ''}>
      <td>{deal.title}</td>
      <td>{deal.description}</td>
      <td>
        {expired ? (
          <span className="expired-text">Expired</span>
        ) : (
          `${countdown} day${countdown !== 1 ? 's' : ''}`
        )}
      </td>
      <td>
        {discountPercent != null ? `${discountPercent}%` : '-'}
      </td>
      {(role === 'user') && (
        <td>
          <button
            className={`favorite-btn ${isFavorite(deal.id) ? 'added' : ''}`}
            onClick={handleAddFavorite}
            disabled={expired}
            title={expired ? "Can't save expired deal" : "Save to favorites"}
          >
            {isFavorite(deal.id) ? 'Saved' : 'Save'}
          </button>
        </td>
      )}
    </tr>
  );
}
