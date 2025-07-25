
import { useNavigate } from 'react-router-dom';
import './About.css';

export default function About() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };
  return (
    <div className="about-container">
      <h1>About Discount Deals</h1>
      <p>
        Discount Deals is a platform where users can post, browse, and save great deals on products and services. 
        Our mission is to help users save money while discovering amazing promotions from trusted sellers.
      </p>

      <form className="about-form">
  <h2>Contact Us</h2>

  <label>
    Name:
    <input type="text" name="name" placeholder="Your Name" required />
  </label>

  <label>
    Email:
    <input type="email" name="email" placeholder="you@example.com" required />
  </label>

  <label>
    Message:
    <textarea name="message" placeholder="Your message..." rows="4" required></textarea>
  </label>

  <button type="submit">Send Message</button>
  <button type="button" onClick={handleBack} className="back-button">Back to Homepage</button>
</form>

    </div>
  );
}
