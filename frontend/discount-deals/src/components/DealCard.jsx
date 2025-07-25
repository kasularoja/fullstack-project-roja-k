import React from 'react';
import './DealList.css'; // or use DealCard.css if you'd like to separate styles

export default function DealCard({ deal, onFavorite, isFavorite, showButton }) {
  return (
    <li className="deal-item">
      <h3>{deal.title}</h3>
      <p>{deal.description}</p>
      {showButton && (
        <button
          onClick={() => onFavorite(deal)}
          disabled={isFavorite(deal.id)}
        >
          {isFavorite(deal.id) ? 'Added to Favorites' : 'Add to Favorites'}
        </button>
      )}
    </li>
  );
}
 