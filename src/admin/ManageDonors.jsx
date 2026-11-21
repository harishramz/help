import React, { useState } from 'react';
import { useTrust } from '../context/TrustContext';
import DataTable from '../components/DataTable';
import StatusBadge from '../components/StatusBadge';
import ConfirmationModal from '../components/ConfirmationModal';
import NotificationMessage from '../components/NotificationMessage';

export default function ManageDonors() {
  const { donors, contributions, addDonor, toggleDonorVerification, deleteDonor } = useTrust();
  const [showAdd, setShowAdd] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [notice, setNotice] = useState('');
  const [form, setForm] = useState({ name: '', email: '', phone: '', city: '' });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;
    addDonor(form);
    setNotice(`Donor "${form.name}" added.`);
    setForm({ name: '', email: '', phone: '', city: '' });
    setShowAdd(false);
  };

  const columns = [
    { key: 'id', header: 'Donor ID' },
    {
      key: 'name',
      header: 'Donor & Contact',
      render: (d) => (
        <div>
          <strong>{d.name}</strong>
          <div style={{ fontSize: '0.8rem', color: 'var(--charcoal-muted)' }}>
            {d.email} · {d.phone}
          </div>
        </div>
      )
    },
    { key: 'city', header: 'City' },
    {
      key: 'supported',
      header: 'Supported Requests',
      render: (d) => {
        const list = contributions.filter((c) => c.donorId === d.id || c.donorEmail === d.email);
        return (
          <span>
            {list.length} pledge(s) · ₹
            {list.reduce((sum, c) => sum + Number(c.amount || 0), 0).toLocaleString('en-IN')}
          </span>
        );
      }
    },
    {
      key: 'verifiedDonor',
      header: 'Verification',
      render: (d) => <StatusBadge status={d.verifiedDonor ? 'Verified' : 'Pending Verification'} />
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (d) => (
        <div className="table-actions">
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={() => toggleDonorVerification(d.id)}
          >
            {d.verifiedDonor ? 'Revoke' : 'Verify'}
          </button>
          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={() => setDeleteTarget(d)}
          >
            Delete
          </button>
        </div>
      )
    }
  ];

  return (
    <div>
      {notice && <NotificationMessage type="success" message={notice} onClose={() => setNotice('')} />}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', gap: '1rem', flexWrap: 'wrap' }}>
        <p style={{ margin: 0, color: 'var(--charcoal-muted)' }}>
          Add, verify, or remove supporter profiles and review their contribution history.
        </p>
        <button type="button" className="btn btn-primary btn-sm" onClick={() => setShowAdd((v) => !v)}>
          {showAdd ? 'Close Form' : '+ Add Donor'}
        </button>
      </div>

      {showAdd && (
        <form className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }} onSubmit={handleAdd}>
          <h3 style={{ margin: '0 0 1rem' }}>Register New Donor</h3>
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Donor Name</label>
              <input className="form-control" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Phone</label>
              <input className="form-control" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">City</label>
              <input className="form-control" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-sm">Save Donor</button>
        </form>
      )}

      <DataTable columns={columns} rows={donors} />

      <ConfirmationModal
        isOpen={Boolean(deleteTarget)}
        title="Delete Donor Record"
        message={`Remove ${deleteTarget?.name} from the donor registry?`}
        confirmLabel="Delete"
        variant="danger"
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => {
          deleteDonor(deleteTarget.id);
          setNotice(`Donor ${deleteTarget.name} removed.`);
          setDeleteTarget(null);
        }}
      />
    </div>
  );
}
