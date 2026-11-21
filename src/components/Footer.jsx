import React from 'react';
import { Link } from 'react-router-dom';
import { useTrust } from '../context/TrustContext';

export default function Footer() {
  const { siteContent } = useTrust();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.85rem' }}>
              <span className="brand-mark" aria-hidden="true">
                TG
              </span>
              <strong style={{ color: '#ffffff', fontSize: '1.15rem' }}>{siteContent.trustName}</strong>
            </div>
            <p style={{ margin: '0 0 0.75rem', fontSize: '0.9rem', lineHeight: 1.6 }}>
              {siteContent.aboutIntro}
            </p>
            <div style={{ fontSize: '0.82rem', color: 'var(--sage)' }}>
              {siteContent.pan80GStatus}
            </div>
          </div>

          <div>
            <h4 className="footer-heading">Explore</h4>
            <ul className="footer-links">
              <li><Link to="/requests">Help Requests</Link></li>
              <li><Link to="/request-assistance">Request Assistance</Link></li>
              <li><Link to="/success-stories">Success Stories</Link></li>
              <li><Link to="/activities">Our Initiatives</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/faq">FAQs</Link></li>
              <li><Link to="/transparency">Transparency &amp; Reports</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-heading">Organization</h4>
            <ul className="footer-links">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/donor-portal">Donor Portal</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms &amp; Conditions</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-heading">Administrative Office</h4>
            <ul className="footer-links">
              <li>{siteContent.contact.address}</li>
              <li>Email: {siteContent.contact.email}</li>
              <li>Website: {siteContent.website || 'www.thisaigal.org'}</li>
              <li style={{ display: 'flex', gap: '0.75rem', marginTop: '0.35rem' }}>
                <a href="https://www.thisaigal.org" target="_blank" rel="noreferrer">Official Site</a>
                <a href="#instagram" onClick={(e) => e.preventDefault()}>Instagram</a>
                <a href="#linkedin" onClick={(e) => e.preventDefault()}>LinkedIn</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} {siteContent.trustName}. All rights reserved.</span>
          <span>{siteContent.tagline} · Section 80G Public Charitable Trust</span>
        </div>
      </div>
    </footer>
  );
}
