import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminForm.css';

export default function AdminForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Electronics');
  const [expiryDate, setExpiryDate] = useState('');
  const [deals, setDeals] = useState([]);
  const [showExpired, setShowExpired] = useState(true); // For admin filter toggle
  const [sortAsc, setSortAsc] = useState(true); // For sort toggle
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  // Role check & redirect
  useEffect(() => {
    const currentRole = localStorage.getItem('role');
    setRole(currentRole);
    if (!currentRole) {
      navigate('/login');
    }
  }, [navigate]);

  // Load deals from localStorage
  useEffect(() => {
    const savedDeals = JSON.parse(localStorage.getItem('deals')) || [];
    setDeals(savedDeals);
  }, []);

  // Utility
  const saveDeals = (updated) => {
    setDeals(updated);
    localStorage.setItem('deals', JSON.stringify(updated));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !expiryDate) {
      alert("All fields including expiry date are required.");
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
    const updated = deals.filter(deal => deal.id !== id);
    saveDeals(updated);
  };

  // Is deal expired?
  const isExpired = (date) => new Date(date) < new Date();

  // Countdown calculation
  const getCountdown = (date) => {
    const now = new Date();
    const expiry = new Date(date);
    const diff = expiry - now;
    if (diff <= 0) return "Expired";
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    return `${days}d ${hours}h ${minutes}m`;
  };

  // Sorted & filtered deals for view
  let filteredDeals = deals;
  // Sort
  filteredDeals = filteredDeals.sort((a, b) => {
    if (sortAsc) {
      return new Date(a.expiryDate) - new Date(b.expiryDate);
    } else {
      return new Date(b.expiryDate) - new Date(a.expiryDate);
    }
  });
  // If NOT admin, hide expired
  if (role !== 'admin') {
    filteredDeals = filteredDeals.filter(deal => !isExpired(deal.expiryDate));
  } else {
    // If admin, apply the showExpired filter toggle
    if (!showExpired) {
      filteredDeals = filteredDeals.filter(deal => !isExpired(deal.expiryDate));
    }
  }

  return (
    <div className="admin-form">
      <h2>{role === 'admin' ? "Admin Deal Manager" : "Deals"}</h2>
      {/* Show form only for admin */}
      {role === 'admin' && (
        <form onSubmit={handleSubmit}>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Deal Title" required />
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option>Electronics</option>
            <option>Fashion</option>
            <option>Groceries</option>
            <option>Travel</option>
          </select>
          <input type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} required />
          <button type="submit">Add Deal</button>
        </form>
      )}
      {/* Sort and (for admin) show/hide expired toggles */}
      <div className="deal-list-controls">
        <button onClick={() => setSortAsc(prev => !prev)}>
          {sortAsc ? "Sort: Soonest First" : "Sort: Latest First"}
        </button>
        {role === 'admin' && (
          <button onClick={() => setShowExpired(prev => !prev)}>
            {showExpired ? "Hide Expired Deals" : "Show Expired Deals"}
          </button>
        )}
      </div>
      {/* Deal List */}
      <div className="deal-list">
        {filteredDeals.length === 0
          ? <p>No deals to show.</p>
          : filteredDeals.map((deal) => (
            <div
              key={deal.id}
              className={
                "deal-item" +
                (role === 'admin' && isExpired(deal.expiryDate) ? " expired" : "")
              }
            >
              <h3>{deal.title}</h3>
              <p>{deal.description}</p>
              <p><strong>Category:</strong> {deal.category}</p>
              <p><strong>Expires:</strong> {deal.expiryDate}</p>
              <p><strong>
                {isExpired(deal.expiryDate) ? "Expired" : "Time left:"}
                {!isExpired(deal.expiryDate) && ` ${getCountdown(deal.expiryDate)}`}
              </strong></p>
              {role === 'admin' && (
                <button onClick={() => handleDelete(deal.id)}>Delete</button>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
