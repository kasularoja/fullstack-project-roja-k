import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminForm.css';

export default function AdminForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Electronics');
  const [expiryDate, setExpiryDate] = useState('');
  const [deals, setDeals] = useState([]);
  const [showExpired, setShowExpired] = useState(true);
  const [sortAsc, setSortAsc] = useState(true);
  const [role, setRole] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const currentRole = localStorage.getItem('role');
    setRole(currentRole);
    if (!currentRole) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const savedDeals = JSON.parse(localStorage.getItem('deals')) || [];
    setDeals(savedDeals);
  }, []);

  const saveDeals = (updated) => {
    setDeals(updated);
    localStorage.setItem('deals', JSON.stringify(updated));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !expiryDate) {
      alert('All fields including expiry date are required.');
      return;
    }
    const newDeal = {
      id: Date.now(),
      title,
      description,
      category,
      expiryDate,
    };
    const updated = [...deals, newDeal];
    saveDeals(updated);
    setTitle('');
    setDescription('');
    setCategory('Electronics');
    setExpiryDate('');
  };

  const handleDelete = (id) => {
    const updated = deals.filter((deal) => deal.id !== id);
    saveDeals(updated);
  };

  const isExpired = (date) => new Date(date) < new Date();

  const getCountdown = (date) => {
    const now = new Date();
    const expiry = new Date(date);
    const diff = expiry - now;
    if (diff <= 0) return 'Expired';
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    return `${days}d ${hours}h ${minutes}m`;
  };

  // Sort and filter deals
  let filteredDeals = [...deals];

  filteredDeals.sort((a, b) => {
    if (sortAsc) return new Date(a.expiryDate) - new Date(b.expiryDate);
    else return new Date(b.expiryDate) - new Date(a.expiryDate);
  });

  if (role !== 'admin') {
    filteredDeals = filteredDeals.filter((deal) => !isExpired(deal.expiryDate));
  } else if (!showExpired) {
    filteredDeals = filteredDeals.filter((deal) => !isExpired(deal.expiryDate));
  }

  return (
    <div className="admin-container">
      <h2>Admin Deal Manager</h2>

      {role === 'admin' && (
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
              <option>Food</option>
              <option>Books</option>
              <option>Kids</option>
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
            <button type="submit" className="deal-form-button">
              Add Deal
            </button>
          </div>
        </form>
      )}

      <div className="deal-list-controls">
        <button onClick={() => setSortAsc((prev) => !prev)} className="control-btn">
          {sortAsc ? 'Sort: Soonest First' : 'Sort: Latest First'}
        </button>
        {role === 'admin' && (
          <button onClick={() => setShowExpired((x) => !x)} className="control-btn">
            {showExpired ? 'Hide Expired Deals' : 'Show Expired Deals'}
          </button>
        )}
      </div>

      <div className="deal-list">
        {filteredDeals.length === 0 ? (
          <div className="empty-message">No deals to show.</div>
        ) : (
          filteredDeals.map((deal) => (
            <div
              key={deal.id}
              className={`deal-card${role === 'admin' && isExpired(deal.expiryDate) ? ' expired' : ''}`}
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
                  <span className={`deal-countdown${isExpired(deal.expiryDate) ? ' expired-text' : ''}`}>
                    {isExpired(deal.expiryDate) ? 'Expired' : <>Time left: <b>{getCountdown(deal.expiryDate)}</b></>}
                  </span>
                </div>
              </div>
              {role === 'admin' && (
                <button className="delete-btn" onClick={() => handleDelete(deal.id)}>
                  Delete
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
