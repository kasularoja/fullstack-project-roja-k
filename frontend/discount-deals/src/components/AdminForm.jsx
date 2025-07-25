import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminForm.css';

export default function AdminForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Electronics');
  const [deals, setDeals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'admin') {
      alert('Access denied: Admins only');
      navigate('/login'); // Prevent access if not admin
    }
  }, [navigate]);

  useEffect(() => {
    const savedDeals = JSON.parse(localStorage.getItem('deals')) || [];
    setDeals(savedDeals);
  }, []);

  // Save updated deals to state and localStorage
  const saveDeals = (updated) => {
    setDeals(updated);
    localStorage.setItem('deals', JSON.stringify(updated));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDeal = {
      id: Date.now(),
      title,
      description,
      category,
    };
    const updatedDeals = [...deals, newDeal];
    saveDeals(updatedDeals);
    setTitle('');
    setDescription('');
    setCategory('Electronics');
  };

  const handleDelete = (id) => {
    const updated = deals.filter((deal) => deal.id !== id);
    saveDeals(updated);
  };

  return (
    <div className="admin-form-container">
      <h2>Admin Panel: Post New org.discountdeals.model.Deal</h2>
      <form onSubmit={handleSubmit} className="admin-form">
        <input
          type="text"
          placeholder="org.discountdeals.model.Deal title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="org.discountdeals.model.Deal description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={4}
        />

        <label>
          Category:
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Home & Garden">Home & Garden</option>
            <option value="Sports">Sports</option>
            <option value="Toys">Toys</option>
            <option value="Health & Beauty">Health & Beauty</option>
            <option value="Automotive">Automotive</option>
          </select>
        </label>

        <button type="submit">Post org.discountdeals.model.Deal</button>
      </form>

      <ul className="deal-list">
        {deals.map((deal) => (
          <li key={deal.id} className="deal-list-item">
            <strong>{deal.title}</strong> [{deal.category}]: {deal.description}
            <button className="delete-btn" onClick={() => handleDelete(deal.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
 