import React, { useState } from 'react';
import { useTrust } from '../context/TrustContext';
import { REQUEST_CATEGORIES } from '../data/mockRequests';
import DataTable from '../components/DataTable';
import ConfirmationModal from '../components/ConfirmationModal';
import NotificationMessage from '../components/NotificationMessage';

export default function ManagePeople() {
  const { requests, addRequest, updateRequest, deleteRequest } = useTrust();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [notice, setNotice] = useState('');

  const [form, setForm] = useState({
    displayName: '',
    fullName: '',
    age: '',
    location: '',
    privatePhone: '',
    privateAddress: '',
    category: REQUEST_CATEGORIES[0],
    title: '',
    shortDescription: '',
    requiredAmount: ''
  });

  const openCreate = () => {
    setEditingId(null);
    setForm({
      displayName: '',
      fullName: '',
      age: '',
      location: '',
      privatePhone: '',
      privateAddress: '',
      category: REQUEST_CATEGORIES[0],
      title: '',
      shortDescription: '',
      requiredAmount: ''
    });
    setShowForm(true);
  };

  const openEdit = (row) => {
    setEditingId(row.id);
    setForm({
      displayName: row.displayName,
      fullName: row.fullName,
      age: row.age || '',
      location: row.location,
      privatePhone: row.privatePhone || '',
      privateAddress: row.privateAddress || '',
      category: row.category,
      title: row.title,
      shortDescription: row.shortDescription,
      requiredAmount: row.requiredAmount || ''
    });
    setShowForm(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!form.displayName.trim() || !form.location.trim()) return;

    if (editingId) {
      updateRequest(editingId, {
        ...form,
        age: Number(form.age || 0),
        requiredAmount: Number(form.requiredAmount || 0)
      });
      setNotice('Person record updated successfully.');
    } else {
      addRequest({
        ...form,
        age: Number(form.age || 0),
        requiredAmount: Number(form.requiredAmount || 0),
        consentGiven: true,
        filterGroup: 'Family Support',
        story: form.shortDescription,
        currentSituation: form.shortDescription,
        whyNeeded: 'Verified by Trust field coordinator.',
        helpRequired: 'Financial or essential support',
        urgency: 'Medium',
        isUrgent: false,
        isPublished: false,
        status: 'Pending Verification',
        verifiedBy: 'Trust Admin',
        verifiedDate: new Date().toISOString().slice(0, 10)
      });
      setNotice('New person / family added to registry.');
    }
    setShowForm(false);
  };

  const columns = [
    { key: 'personId', header: 'Person ID' },
    { key: 'displayName', header: 'Display Name' },
    { key: 'category', header: 'Category' },
    { key: 'location', header: 'District / City' },
    { key: 'privatePhone', header: 'Private Phone (Admin Only)' },
    {
      key: 'actions',
      header: 'Actions',
      render: (row) => (
        <div className="table-actions">
          <button type="button" className="btn btn-outline btn-sm" onClick={() => openEdit(row)}>
            Edit
          </button>
          <button type="button" className="btn btn-danger btn-sm" onClick={() => setDeleteTarget(row)}>
            Archive
          </button>
        </div>
      )
    }
  ];

  return (
    <div>
      {notice && <NotificationMessage type="success" message={notice} onClose={() => setNotice('')} />}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
          Manage beneficiary profiles, private contact records, and assigned categories.
        </p>
        <button type="button" className="btn btn-primary btn-sm" onClick={openCreate}>
          + Add Patient / Family
        </button>
      </div>

      {showForm && (
        <form className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }} onSubmit={handleSave}>
          <h3 style={{ margin: '0 0 1rem' }}>{editingId ? 'Edit Person Record' : 'Add Patient / Family'}</h3>
          <div className="grid-3">
            <div className="form-group">
              <label className="form-label">Approved Display Name</label>
              <input className="form-control" required value={form.displayName} onChange={(e) => setForm({ ...form, displayName: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Full Legal Name</label>
              <input className="form-control" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select className="form-control" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                {REQUEST_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Public Location (City, State)</label>
              <input className="form-control" required value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Private Phone</label>
              <input className="form-control" value={form.privatePhone} onChange={(e) => setForm({ ...form, privatePhone: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Required Amount (₹)</label>
              <input type="number" className="form-control" value={form.requiredAmount} onChange={(e) => setForm({ ...form, requiredAmount: e.target.value })} />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Request Headline &amp; Summary</label>
            <input className="form-control" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Case title" />
          </div>
          <div className="form-group">
            <label className="form-label">Short Description</label>
            <textarea rows="2" className="form-control" value={form.shortDescription} onChange={(e) => setForm({ ...form, shortDescription: e.target.value })} />
          </div>
          <div style={{ display: 'flex', gap: '0.65rem' }}>
            <button type="submit" className="btn btn-primary btn-sm">Save Record</button>
            <button type="button" className="btn btn-outline btn-sm" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </form>
      )}

      <DataTable columns={columns} rows={requests} />

      <ConfirmationModal
        isOpen={Boolean(deleteTarget)}
        title="Archive Beneficiary Record"
        message={`Are you sure you want to archive ${deleteTarget?.displayName}?`}
        confirmLabel="Archive"
        variant="danger"
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => {
          deleteRequest(deleteTarget.id);
          setNotice(`${deleteTarget.displayName} archived.`);
          setDeleteTarget(null);
        }}
      />
    </div>
  );
}
