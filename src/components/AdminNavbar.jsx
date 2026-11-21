import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrust } from '../context/TrustContext';

export default function AdminNavbar({ title }) {
  const { currentUser, logout } = useTrust();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="admin-topbar">
      <div>
        <h1 style={{ margin: 0, fontSize: '1.25rem' }}>{title}</h1>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
        <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
          Signed in as <strong>{currentUser?.name}</strong>
        </span>
        <button type="button" className="btn btn-outline btn-sm" onClick={handleLogout}>
          Sign Out
        </button>
      </div>
    </header>
  );
}
