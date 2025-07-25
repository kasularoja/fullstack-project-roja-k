import React from 'react';
import './Home.css';

export default function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to Discount Deals!</h1>
      <p>
        Discount Deals is your one-stop destination to discover and share the best offers, sales,
        and limited-time promotions. Whether you're a user looking to save money or an admin posting
        the hottest deals — we've got you covered.
      </p>

      <p>
        💡 <strong>Users</strong> can browse and favorite exciting deals.<br />
        🛒 <strong>Admins</strong> can post new deals or manage existing ones.<br />
        👀 <strong>Guests</strong> can preview the app before signing in.
      </p>

      <p>
        Start exploring now by logging in or visiting the deals page!
      </p>
    </div>
  );
}
