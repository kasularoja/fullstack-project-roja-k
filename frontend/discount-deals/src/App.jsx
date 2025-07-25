import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './components/About';
import Login from './components/Login';
import Favorites from './components/Favorites';
import Home from './components/Home';
import AdminForm from './components/AdminForm';
import DealList from './components/DealList';
import background from './assets/bg.jpg';


import './App.css';

function App() {
  // Add state for role
  const [role, setRole] = useState(localStorage.getItem('role'));

  // Sync role state with localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setRole(localStorage.getItem('role'));
    };

    window.addEventListener('storage', handleStorageChange);
    // Optional: update on tab focus (in case of login in another tab)
    window.addEventListener('focus', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleStorageChange);
    };
  }, []);

  return (
     <div
    className="app"
  style={{
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    backgroundRepeat: 'no-repeat',
    backgroundBlendMode: 'overlay',          
    backgroundColor: 'rgba(255,255,255,0.2)', 
    minHeight: '100vh',
    }}
  >
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />

          {/* Conditional routing using role from state */}
          <Route
            path="/favorites"
            element={
              role === 'user' || role === 'admin' ? (
                <Favorites />
              ) : (
                <h3 style={{ padding: '2rem', color: 'crimson' }}>
                  Access denied. Please <Link to="/login">log in</Link> to view your favorites.
                </h3>
              )
            }
          />
          <Route path="/dealList" element={<DealList />} /> 
          <Route path="/adminform" element={<AdminForm />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );

  
}

export default App;
