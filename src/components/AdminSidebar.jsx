import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const ADMIN_LINKS = [
  { to: '/admin', label: 'Dashboard Overview', end: true },
  { to: '/admin/people', label: 'Manage People' },
  { to: '/admin/requests', label: 'Manage Help Requests' },
  { to: '/admin/direct-requests', label: 'Direct Submissions' },
  { to: '/admin/donors', label: 'Manage Donors' },
  { to: '/admin/contributions', label: 'Manage Contributions' },
  { to: '/admin/stories', label: 'Manage Success Stories' },
  { to: '/admin/activities', label: 'Manage Activities' },
  { to: '/admin/content', label: 'Website Content' }
];

export default function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      <div className="admin-brand">
        <span className="brand-mark" style={{ width: '32px', height: '32px', fontSize: '0.9rem' }}>
          TC
        </span>
        <div>
          <div>TrustConnect</div>
          <div style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 400 }}>Admin Console</div>
        </div>
      </div>

      <nav className="admin-nav" aria-label="Admin navigation">
        {ADMIN_LINKS.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.end} className="admin-nav-link">
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid #1e293b' }}>
        <Link to="/" className="admin-nav-link">
          &larr; Back to Public Site
        </Link>
      </div>
    </aside>
  );
}
