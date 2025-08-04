import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminForm.css';

export default function AdminForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Electronics');
  const [expiryDate, setExpiryDate] = useState('');
  const [discountPercent, setDiscountPercent] = useState('');
  const [price, setPrice] = useState('');
  const [deals, setDeals] = useState([]);
  const [showExpired, setShowExpired] = useState(true);
  const [sortAsc, setSortAsc] = useState(true);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const r = localStorage.getItem('role');
    setRole(r);
    if (r !== 'admin') navigate('/login');
  }, [navigate]);

  // Fetch all deals from backend
  const fetchDeals = () => {
    fetch('http://localhost:8080/api/deals')
      .then((res) => res.json())
      .then(setDeals)
      .catch(() => setDeals([]));
  };

  useEffect(() => {
    fetchDeals();
  }, []);

    // Handle form submission to add a new deal

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !expiryDate || discountPercent === '' || price === '') {
      alert('All fields are required.');
      return;
    }
    const priceVal = parseFloat(price);
    const discountPercentVal = parseFloat(discountPercent);
    if (isNaN(priceVal) || priceVal < 0) {
      alert('Please enter a valid positive price.');
      return;
    }
    if (isNaN(discountPercentVal) || discountPercentVal < 0 || discountPercentVal > 100) {
      alert('Enter discount % between 0 and 100.');
      return;
    }
    // Backend model requires price and discountPrice
    const discountPrice = parseFloat((priceVal * (1 - discountPercentVal / 100)).toFixed(2));
    const deal = {
      title,
      description,
      price: priceVal,
      discountPrice,
      category,
      expiryDate,
    };

    // Send POST request to backend to add the deal
    fetch('http://localhost:8080/api/deals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(deal),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to add deal');
        return res.json();
      })
      .then(() => {
        fetchDeals();
        setTitle('');
        setDescription('');
        setCategory('Electronics');
        setExpiryDate('');
        setPrice('');
        setDiscountPercent('');
      })
      .catch((err) => alert(err));
  };

  const handleDelete = (id) => {
    if (!window.confirm('Delete this deal?')) return;
    fetch(`http://localhost:8080/api/deals/${id}`, { method: 'DELETE' })
      .then((res) => {
        if (!res.ok && res.status !== 204) throw new Error('Delete failed');
        setDeals((ds) => ds.filter((d) => d.id !== id));
      })
      .catch((err) => alert('Failed to delete: ' + err));
  };

  const isExpired = (date) => new Date(date) < new Date();
  let filteredDeals = [...deals];
  filteredDeals.sort((a, b) =>
    sortAsc
      ? new Date(a.expiryDate) - new Date(b.expiryDate)
      : new Date(b.expiryDate) - new Date(a.expiryDate)
  );
  if (!showExpired) filteredDeals = filteredDeals.filter((d) => !isExpired(d.expiryDate));

  return (
    <div className="admin-container">
      <h2>Admin Deal Manager</h2>
      <form className="deal-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Deal Title"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
          rows={3}
        />
        <div className="form-row">
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option>Electronics</option>
            <option>Fashion</option>
            <option>Groceries</option>
            <option>Travel</option>
          </select>
          <input
            type="date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            required
          />
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            min="0"
            step="0.01"
            required
          />
          <input
            type="number"
            value={discountPercent}
            onChange={(e) => setDiscountPercent(e.target.value)}
            placeholder="Discount %"
            min="0"
            max="100"
            step="0.1"
            required
            className="discount-input"
          />
          <button type="submit" className="deal-form-button">
            Add Deal
          </button>
        </div>
      </form>
      <div className="deal-list-controls">
        <button onClick={() => setSortAsc((prev) => !prev)} className="control-btn">
          {sortAsc ? 'Sort: Soonest First' : 'Sort: Latest First'}
        </button>
        <button onClick={() => setShowExpired((x) => !x)} className="control-btn">
          {showExpired ? 'Hide Expired Deals' : 'Show Expired Deals'}
        </button>
      </div>
      <div className="deal-list">
        {filteredDeals.length === 0 ? (
          <div className="empty-message">No deals to show.</div>
        ) : (
          filteredDeals.map((deal) => (
            <div
              key={deal.id}
              className={`deal-card${isExpired(deal.expiryDate) ? ' expired' : ''}`}
            >
              <div className="deal-main">
                <div className="deal-info">
                  <div className="deal-title">{deal.title}</div>
                  <div className="deal-description">{deal.description}</div>
                </div>
                <div className="deal-meta">
                  <span className="meta-cat">{deal.category}</span>
                  <span>
                    <b>Expires:</b> {deal.expiryDate}
                  </span>
                  <span
                    className={`deal-countdown${isExpired(deal.expiryDate) ? ' expired-text' : ''}`}
                  >
                    {isExpired(deal.expiryDate)
                      ? 'Expired'
                      : `Time left: ${Math.ceil(
                          (new Date(deal.expiryDate) - new Date()) / (1000 * 60 * 60 * 24)
                        )}d`}
                  </span>
                  <span className="meta-discount">
                    <b>Discount:</b> {deal.price > 0 ? `${(((deal.price - deal.discountPrice) / deal.price) * 100).toFixed(1)}%` : '-'}
                  </span>
                </div>
              </div>
              <button className="delete-btn" onClick={() => handleDelete(deal.id)}>
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
