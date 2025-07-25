

export default function DealRow({ deal, role, isFavorite, addToFavorites }) {
  return (
    <tr>
      <td>{deal.title}</td>
      <td>{deal.description}</td>
      {(role === 'user' || role === 'admin') && (
        <td>
          <button
            onClick={() => addToFavorites(deal)}
            disabled={isFavorite(deal.id)}
          >
            {isFavorite(deal.id) ? 'Added' : 'Add to Favorites'}
          </button>
        </td>
      )}
    </tr>
  );
}
