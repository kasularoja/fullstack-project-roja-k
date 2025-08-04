import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const [role, setRole] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // This function runs when the user submits the login form
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!role || (role !== 'guest' && (!username || !password))) {
      alert('Please fill in all fields');
      return;
    }

    if (role === 'guest') {
      // For guest, just log in without real user record
      localStorage.setItem('role', 'guest');
      localStorage.setItem('username', 'guest');
      localStorage.setItem('userId', ''); // No real user
      navigate('/');
      return;
    }
    setLoading(true);

    try {
      // Get all users from the backend
      const res = await fetch('http://localhost:8080/api/users');
      if (!res.ok) throw new Error('Failed to load users');
      const users = await res.json();

      // Find a user with matching username, password, and role
      const user = users.find(
        (u) =>
          u.role === role &&
          u.username === username &&
          u.password === password
      );

      if (user) {
        // Save session to localStorage
        localStorage.setItem('role', user.role);
        localStorage.setItem('username', user.username);
        localStorage.setItem('userId', user.id);
        if (role === 'admin') {
          navigate('/adminForm');
        } else {
          navigate('/favorites');
        }
      } else {
        alert('Invalid credentials or role');
      }
    } catch (err) {
      alert('Error while logging in: ' + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      <h2>Login to Discount Deals</h2>
      <form onSubmit={handleLogin}>
        <label>
          Role:
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="">Select role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
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
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
