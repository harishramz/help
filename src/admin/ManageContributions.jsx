import React, { useState } from 'react';
import { useTrust } from '../context/TrustContext';
import { SUPPORT_TYPES } from '../data/mockRequests';
import DataTable from '../components/DataTable';
import StatusBadge from '../components/StatusBadge';
import ConfirmationModal from '../components/ConfirmationModal';
import NotificationMessage from '../components/NotificationMessage';

export default function ManageContributions() {
  const { contributions, requests, addContribution, verifyContribution, deleteContribution } = useTrust();
  const [notice, setNotice] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [form, setForm] = useState({
    donorName: '',
    donorEmail: '',
    donorPhone: '',
    requestId: requests[0]?.id || '',
    supportType: SUPPORT_TYPES[0],
    amount: '',
    message: ''
  });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.donorName.trim() || !form.requestId) return;
    addContribution(form);
    setNotice(`Verified contribution from ${form.donorName} recorded.`);
    setForm({
      donorName: '',
      donorEmail: '',
      donorPhone: '',
      requestId: requests[0]?.id || '',
      supportType: SUPPORT_TYPES[0],
      amount: '',
      message: ''
    });
    setShowAdd(false);
  };

  const handleVerify = (row, status) => {
    verifyContribution(row.id, status);
    setNotice(`Contribution ${row.id} updated to ${status}.`);
  };

  const columns = [
    { key: 'id', header: 'Ref ID' },
    {
      key: 'donorName',
      header: 'Contributor',
      render: (c) => (
        <div>
          <strong>{c.donorName}</strong>
          <div style={{ fontSize: '0.8rem', color: 'var(--charcoal-muted)' }}>
            {c.donorEmail} · {c.donorPhone}
          </div>
        </div>
      )
    },
    { key: 'requestTitle', header: 'Target Request' },
    { key: 'supportType', header: 'Type' },
    {
      key: 'amount',
      header: 'Amount',
      render: (c) => (c.amount > 0 ? `₹${Number(c.amount).toLocaleString('en-IN')}` : 'In-Kind')
    },
    {
      key: 'verificationStatus',
      header: 'Status',
      render: (c) => <StatusBadge status={c.verificationStatus} />
    },
    {
      key: 'actions',
      header: 'Controls',
      render: (c) => (
        <div className="table-actions">
          <button
            type="button"
            className="btn btn-primary btn-sm"
            disabled={c.verificationStatus === 'Verified' || c.verificationStatus === 'Completed'}
            onClick={() => handleVerify(c, 'Verified')}
          >
            Verify
          </button>
          <button
            type="button"
            className="btn btn-outline-green btn-sm"
            disabled={c.verificationStatus === 'Completed'}
            onClick={() => handleVerify(c, 'Completed')}
          >
            Complete
          </button>
          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={() => setDeleteTarget(c)}
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
          Record, verify, or remove contributions before counting them toward public request totals.
        </p>
        <button type="button" className="btn btn-primary btn-sm" onClick={() => setShowAdd((v) => !v)}>
          {showAdd ? 'Close Form' : '+ Record Contribution'}
        </button>
      </div>

      {showAdd && (
        <form className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }} onSubmit={handleAdd}>
          <h3 style={{ margin: '0 0 1rem' }}>Record Verified Contribution</h3>
          <div className="grid-3">
            <div className="form-group">
              <label className="form-label">Donor Name</label>
              <input className="form-control" required value={form.donorName} onChange={(e) => setForm({ ...form, donorName: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" value={form.donorEmail} onChange={(e) => setForm({ ...form, donorEmail: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Target Request</label>
              <select className="form-control" value={form.requestId} onChange={(e) => setForm({ ...form, requestId: e.target.value })}>
                {requests.map((r) => (
                  <option key={r.id} value={r.id}>{r.id} — {r.displayName}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Support Type</label>
              <select className="form-control" value={form.supportType} onChange={(e) => setForm({ ...form, supportType: e.target.value })}>
                {SUPPORT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Amount (₹)</label>
              <input type="number" className="form-control" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-sm">Save Verified Contribution</button>
        </form>
      )}

      <DataTable columns={columns} rows={contributions} />

      <ConfirmationModal
        isOpen={Boolean(deleteTarget)}
        title="Delete Contribution Record"
        message={`Delete contribution ${deleteTarget?.id} from ${deleteTarget?.donorName}?`}
        confirmLabel="Delete"
        variant="danger"
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => {
          deleteContribution(deleteTarget.id);
          setNotice(`Contribution ${deleteTarget.id} deleted.`);
          setDeleteTarget(null);
        }}
      />
    </div>
  );
}
