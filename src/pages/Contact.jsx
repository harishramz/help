import React, { useState } from 'react';
import { useTrust } from '../context/TrustContext';
import NotificationMessage from '../components/NotificationMessage';

export default function Contact() {
  const { siteContent } = useTrust();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setSent(true);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <h1>Contact Us</h1>
          <p>
            Reach out to our trust office for case inquiries, corporate sponsorships, volunteering, or
            verification follow-ups.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container grid-2" style={{ alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="card" style={{ padding: '1.5rem' }}>
              <h2 style={{ margin: '0 0 1rem', fontSize: '1.25rem' }}>Trust Office Details</h2>
              <p style={{ margin: '0 0 0.65rem', color: 'var(--text-secondary)' }}>
                <strong>Address:</strong> {siteContent.contact.address}
              </p>
              <p style={{ margin: '0 0 0.65rem', color: 'var(--text-secondary)' }}>
                <strong>Phone:</strong> {siteContent.contact.phone}
              </p>
              <p style={{ margin: '0 0 0.65rem', color: 'var(--text-secondary)' }}>
                <strong>Email:</strong> {siteContent.contact.email}
              </p>
              <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
                <strong>Office Hours:</strong> {siteContent.contact.officeHours}
              </p>
            </div>

            <div
              className="card"
              style={{
                padding: '1.75rem',
                background: 'linear-gradient(135deg, #f0f9ff, #ecfdf5)',
                textAlign: 'center'
              }}
            >
              <h3 style={{ margin: '0 0 0.45rem' }}>Google Maps Integration</h3>
              <p style={{ margin: '0 0 0.9rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Map container ready for Google Maps Embed API / coordinates for{' '}
                <strong>{siteContent.contact.address}</strong>.
              </p>
              <span className="status-badge status-published">Map Embed Ready</span>
            </div>
          </div>

          <form className="card" style={{ padding: '1.75rem' }} onSubmit={handleSubmit}>
            <h2 style={{ margin: '0 0 1rem', fontSize: '1.25rem' }}>Send a Message</h2>
            {sent && (
              <NotificationMessage
                type="success"
                message="Your message has been received. Our team will respond within 1–2 business days."
                onClose={() => setSent(false)}
              />
            )}
            <div className="form-group">
              <label className="form-label" htmlFor="contactName">Your Name</label>
              <input
                id="contactName"
                className="form-control"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="contactEmail">Email Address</label>
              <input
                id="contactEmail"
                type="email"
                className="form-control"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="contactSubject">Subject</label>
              <input
                id="contactSubject"
                className="form-control"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="contactMessage">Message</label>
              <textarea
                id="contactMessage"
                rows="4"
                className="form-control"
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
