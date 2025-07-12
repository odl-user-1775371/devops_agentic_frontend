import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [contact, setContact] = useState({ name: '', email: '', message: '' });
  const [contactStatus, setContactStatus] = useState('');

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(() => setProducts([]));
  }, []);

  const handleContactChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactStatus('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contact)
      });
      const msg = await res.text();
      setContactStatus(msg);
      setContact({ name: '', email: '', message: '' });
    } catch {
      setContactStatus('Failed to submit.');
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Acme Products</h1>
        <p>Your one-stop shop for quality products!</p>
      </header>
      <section>
        <h2>Products</h2>
        <div className="products">
          {products.length === 0 ? (
            <p>No products available.</p>
          ) : (
            <ul>
              {products.map(p => (
                <li key={p.id}>
                  <strong>{p.name}</strong><br />
                  {p.description}<br />
                  <span>${p.price}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
      <section>
        <h2>Contact Us</h2>
        <form onSubmit={handleContactSubmit} className="contact-form">
          <input name="name" value={contact.name} onChange={handleContactChange} placeholder="Name" required />
          <input name="email" value={contact.email} onChange={handleContactChange} placeholder="Email" type="email" required />
          <textarea name="message" value={contact.message} onChange={handleContactChange} placeholder="Message" required />
          <button type="submit">Send</button>
        </form>
        {contactStatus && <p>{contactStatus}</p>}
      </section>
      <footer>
        <p>&copy; 2025 Acme Inc.</p>
      </footer>
    </div>
  );
}

export default App;
