import React, { useState } from 'react';
import { useTrust } from '../context/TrustContext';
import { REQUEST_CATEGORIES, REQUEST_STATUSES } from '../data/mockRequests';
import DataTable from '../components/DataTable';
import StatusBadge from '../components/StatusBadge';
import ConfirmationModal from '../components/ConfirmationModal';
import NotificationMessage from '../components/NotificationMessage';

export default function ManageRequests() {
  const { requests, addRequest, updateRequest, deleteRequest, addSuccessStory } = useTrust();
  const [notice, setNotice] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [form, setForm] = useState({
    displayName: '',
    title: '',
    category: REQUEST_CATEGORIES[0],
    location: '',
    requiredAmount: '',
    urgency: 'High',
    shortDescription: ''
  });

  const handleCreate = (e) => {
    e.preventDefault();
    if (!form.displayName.trim() || !form.title.trim()) return;
    const created = addRequest({
      ...form,
      fullName: form.displayName,
      consentGiven: true,
      filterGroup: 'Family Support',
      story: form.shortDescription,
      currentSituation: form.shortDescription,
      whyNeeded: 'Verified by Trust Admin.',
      helpRequired: 'Financial or material assistance',
      requiredAmount: Number(form.requiredAmount || 0),
      isUrgent: form.urgency === 'Critical' || form.urgency === 'High',
      isPublished: true,
      status: 'Published',
      verifiedBy: 'Trust Admin',
      verifiedDate: new Date().toISOString().slice(0, 10),
      publishedDate: new Date().toISOString().slice(0, 10),
      supportingDocsConsent: true
    });
    setNotice(`Help Request ${created.id} created and published.`);
    setShowCreate(false);
    setForm({
      displayName: '',
      title: '',
      category: REQUEST_CATEGORIES[0],
      location: '',
      requiredAmount: '',
      urgency: 'High',
      shortDescription: ''
    });
  };

  const handleStatusChange = (row, nextStatus) => {
    updateRequest(row.id, {
      status: nextStatus,
      isPublished:
        nextStatus === 'Published' ||
        nextStatus === 'Partially Fulfilled' ||
        nextStatus === 'Assistance in Progress' ||
        nextStatus === 'Completed'
          ? true
          : row.isPublished
    });

    if (nextStatus === 'Completed') {
      addSuccessStory({
        requestId: row.id,
        displayName: row.displayName,
        location: row.location,
        category: row.category,
        originalProblem: row.shortDescription,
        assistanceReceived: row.materialRequirements || row.helpRequired,
        contributorsCount: 1,
        totalSupportReceived: row.amountReceived || row.requiredAmount,
        thankYouMessage:
          'Thanks to the kindness of our supporters, this family received the assistance they needed. We sincerely thank everyone who contributed.',
        beforeSummary: row.currentSituation,
        afterSummary: 'Verified assistance delivered and case fulfilled.'
      });
      setNotice(`Case ${row.id} marked Completed, removed from urgent queue, and added to Success Stories.`);
    } else {
      setNotice(`Case ${row.id} status updated to ${nextStatus}.`);
    }
  };

  const columns = [
    { key: 'id', header: 'ID' },
    {
      key: 'displayName',
      header: 'Beneficiary & Title',
      render: (r) => (
        <div>
          <strong>{r.displayName}</strong>
          <div style={{ fontSize: '0.82rem', color: 'var(--charcoal-muted)' }}>{r.title}</div>
        </div>
      )
    },
    {
      key: 'status',
      header: 'Status',
      render: (r) => (
        <select
          className="form-control"
          style={{ padding: '0.35rem 0.5rem', fontSize: '0.84rem', minWidth: '165px' }}
          value={r.status}
          onChange={(e) => handleStatusChange(r, e.target.value)}
        >
          {REQUEST_STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      )
    },
    {
      key: 'visibility',
      header: 'Visibility & Urgency',
      render: (r) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          <StatusBadge status={r.status} />
          <span style={{ fontSize: '0.78rem', color: 'var(--charcoal-muted)' }}>
            {r.isPublished ? 'Published' : 'Unpublished'} · {r.isUrgent ? 'Urgent' : 'Standard'}
          </span>
        </div>
      )
    },
    {
      key: 'actions',
      header: 'Controls',
      render: (r) => (
        <div className="table-actions">
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={() => updateRequest(r.id, { isPublished: !r.isPublished })}
          >
            {r.isPublished ? 'Unpublish' : 'Publish'}
          </button>
          <button
            type="button"
            className="btn btn-outline-green btn-sm"
            disabled={r.status === 'Completed'}
            onClick={() => updateRequest(r.id, { isUrgent: !r.isUrgent })}
          >
            {r.isUrgent ? 'Unmark Urgent' : 'Mark Urgent'}
          </button>
          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={() => setDeleteTarget(r)}
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
          Create, verify, publish, mark urgent, complete, or delete help requests.
        </p>
        <button type="button" className="btn btn-primary btn-sm" onClick={() => setShowCreate((v) => !v)}>
          {showCreate ? 'Close Form' : '+ Create Help Request'}
        </button>
      </div>

      {showCreate && (
        <form className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }} onSubmit={handleCreate}>
          <h3 style={{ margin: '0 0 1rem' }}>Create New Help Request</h3>
          <div className="grid-3">
            <div className="form-group">
              <label className="form-label">Approved Display Name</label>
              <input className="form-control" required value={form.displayName} onChange={(e) => setForm({ ...form, displayName: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Request Title</label>
              <input className="form-control" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select className="form-control" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                {REQUEST_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Location</label>
              <input className="form-control" required value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Required Amount (₹)</label>
              <input type="number" className="form-control" value={form.requiredAmount} onChange={(e) => setForm({ ...form, requiredAmount: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Urgency</label>
              <select className="form-control" value={form.urgency} onChange={(e) => setForm({ ...form, urgency: e.target.value })}>
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Normal">Normal</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea rows="2" className="form-control" required value={form.shortDescription} onChange={(e) => setForm({ ...form, shortDescription: e.target.value })} />
          </div>
          <button type="submit" className="btn btn-primary btn-sm">Publish Help Request</button>
        </form>
      )}

      <DataTable columns={columns} rows={requests} />

      <ConfirmationModal
        isOpen={Boolean(deleteTarget)}
        title="Delete Help Request"
        message={`Permanently delete request ${deleteTarget?.id} (${deleteTarget?.displayName})?`}
        confirmLabel="Delete"
        variant="danger"
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => {
          deleteRequest(deleteTarget.id);
          setNotice(`Deleted help request ${deleteTarget.id}.`);
          setDeleteTarget(null);
        }}
      />
    </div>
  );
}
