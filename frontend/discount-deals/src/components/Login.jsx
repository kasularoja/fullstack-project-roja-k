import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const [role, setRole] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

// Handles login form submission
  const handleLogin = (e) => {
    e.preventDefault();

    if (!role || (role !== 'guest' && (!username || !password))) {
      alert('Please fill in all fields');
      return;
    }

    if (role === 'admin' && username === 'admin' && password === 'admin123') {
  localStorage.setItem('role', 'admin');
  localStorage.setItem('username', 'admin'); // Save username
  navigate('/adminform'); // Redirect to admin form
} else if (role === 'user' && username === 'user' && password === 'user123') {
  localStorage.setItem('role', 'user');
  localStorage.setItem('username', 'user');
  navigate('/favorites'); // Redirect to favorites page
} else if (role === 'guest') {
  localStorage.setItem('role', 'guest');
  localStorage.setItem('username', 'guest');
  navigate('/'); // Redirect guest to home
}

  };

  return (
    <div className="login-container">
      <h2>Login to Discount Deals</h2>
      <form onSubmit={handleLogin}>
        <label>
          Role:
          <select value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="">Select role</option>
            <option value="admin">Admin</option>
            <option value="user">org.discountdeals.model.User</option>
            <option value="guest">Guest</option>
          </select>
        </label>

        {role !== 'guest' && (
          <>
            <label>
              Username:
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
              />
            </label>

            <label>
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </label>
          </>
        )}

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
