import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrust } from '../context/TrustContext';
import NotificationMessage from '../components/NotificationMessage';

export default function Login() {
  const { login } = useTrust();
  const navigate = useNavigate();

  const [mode, setMode] = useState('donor'); // 'donor' | 'admin'
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!form.email.trim() || !form.password.trim()) {
      setError('Please enter both email and password.');
      return;
    }

    if (mode === 'admin') {
      if (form.email === 'admin@trustconnect.org' && form.password === 'trust2026') {
        login({ role: 'admin', name: 'Meera Sundararajan (Admin)', email: form.email });
        navigate('/admin');
        return;
      }
      setError('Invalid administrator credentials. Use the demo admin credentials shown below.');
      return;
    }

    login({
      role: 'donor',
      name: form.name.trim() || 'Priya Venkatesh',
      email: form.email.trim()
    });
    navigate('/donor-portal');
  };

  const quickDemoLogin = (role) => {
    if (role === 'admin') {
      login({ role: 'admin', name: 'Meera Sundararajan (Admin)', email: 'admin@trustconnect.org' });
      navigate('/admin');
    } else {
      login({ role: 'donor', name: 'Priya Venkatesh', email: 'priya.v@example.com' });
      navigate('/donor-portal');
    }
  };

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: '480px' }}>
        <div className="card" style={{ padding: '2rem' }}>
          <h1 style={{ margin: '0 0 0.35rem', fontSize: '1.65rem', textAlign: 'center' }}>
            {isRegister ? 'Create Supporter Account' : 'Sign In to TrustConnect'}
          </h1>
          <p style={{ margin: '0 0 1.5rem', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
            Access your supporter contribution history or authorized Trust Administrator tools.
          </p>

          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <button
              type="button"
              className={`btn btn-sm ${mode === 'donor' ? 'btn-primary' : 'btn-outline'}`}
              style={{ flex: 1 }}
              onClick={() => { setMode('donor'); setError(''); }}
            >
              Supporter / Donor
            </button>
            <button
              type="button"
              className={`btn btn-sm ${mode === 'admin' ? 'btn-secondary' : 'btn-outline'}`}
              style={{ flex: 1 }}
              onClick={() => { setMode('admin'); setIsRegister(false); setError(''); }}
            >
              Trust Administrator
            </button>
          </div>

          {error && <NotificationMessage type="error" message={error} onClose={() => setError('')} />}

          <form onSubmit={handleSubmit}>
            {isRegister && mode === 'donor' && (
              <div className="form-group">
                <label className="form-label" htmlFor="authName">Full Name</label>
                <input
                  id="authName"
                  className="form-control"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your full name"
                />
              </div>
            )}

            <div className="form-group">
              <label className="form-label" htmlFor="authEmail">Email Address</label>
              <input
                id="authEmail"
                type="email"
                className="form-control"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder={mode === 'admin' ? 'admin@trustconnect.org' : 'priya.v@example.com'}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="authPassword">Password</label>
              <input
                id="authPassword"
                type="password"
                className="form-control"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              {mode === 'admin' ? 'Sign In to Admin Dashboard' : isRegister ? 'Register' : 'Sign In'}
            </button>
          </form>

          {mode === 'donor' && (
            <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.88rem' }}>
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => setIsRegister((prev) => !prev)}
              >
                {isRegister ? 'Already have an account? Sign In' : 'New supporter? Create an account'}
              </button>
            </div>
          )}

          <div
            style={{
              marginTop: '1.5rem',
              padding: '1rem',
              background: 'var(--bg-subtle)',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.84rem',
              color: 'var(--text-secondary)'
            }}
          >
            <strong>Demo Access (Frontend Preview):</strong>
            <div style={{ margin: '0.35rem 0 0.75rem' }}>
              Admin: <code>admin@trustconnect.org</code> / <code>trust2026</code>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button type="button" className="btn btn-outline btn-sm" style={{ flex: 1 }} onClick={() => quickDemoLogin('donor')}>
                Demo Donor
              </button>
              <button type="button" className="btn btn-outline-green btn-sm" style={{ flex: 1 }} onClick={() => quickDemoLogin('admin')}>
                Demo Admin
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
