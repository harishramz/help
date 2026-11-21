import React, { useState } from 'react';
import { useTrust } from '../context/TrustContext';
import DataTable from '../components/DataTable';
import StatusBadge from '../components/StatusBadge';
import ConfirmationModal from '../components/ConfirmationModal';
import NotificationMessage from '../components/NotificationMessage';

export default function ManageSuccessStories() {
  const { stories, requests, addSuccessStory, toggleStoryPublish, deleteSuccessStory } = useTrust();
  const [notice, setNotice] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [form, setForm] = useState({
    requestId: requests[0]?.id || '',
    thankYouMessage:
      'Thanks to the kindness of our supporters, this family received the assistance they needed. We sincerely thank everyone who contributed.',
    beforeSummary: '',
    afterSummary: ''
  });

  const handleCreate = (e) => {
    e.preventDefault();
    const req = requests.find((r) => r.id === form.requestId);
    if (!req) return;
    addSuccessStory({
      requestId: req.id,
      displayName: req.displayName,
      location: req.location,
      category: req.category,
      originalProblem: req.shortDescription,
      assistanceReceived: req.materialRequirements || req.helpRequired,
      contributorsCount: 1,
      totalSupportReceived: req.amountReceived || req.requiredAmount,
      thankYouMessage: form.thankYouMessage,
      beforeSummary: form.beforeSummary || req.currentSituation,
      afterSummary: form.afterSummary || 'Assistance completed with full Trust verification.'
    });
    setNotice(`Success story published for ${req.displayName}.`);
    setForm((prev) => ({ ...prev, beforeSummary: '', afterSummary: '' }));
  };

  const columns = [
    { key: 'id', header: 'Story ID' },
    { key: 'displayName', header: 'Person / Family' },
    { key: 'category', header: 'Category' },
    { key: 'completionDate', header: 'Completed Date' },
    {
      key: 'isPublished',
      header: 'Status',
      render: (s) => <StatusBadge status={s.isPublished ? 'Published' : 'Pending Verification'} />
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (s) => (
        <div className="table-actions">
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={() => toggleStoryPublish(s.id)}
          >
            {s.isPublished ? 'Unpublish' : 'Publish'}
          </button>
          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={() => setDeleteTarget(s)}
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

      <form className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }} onSubmit={handleCreate}>
        <h3 style={{ margin: '0 0 1rem' }}>Convert Request into Success Story</h3>
        <div className="grid-2">
          <div className="form-group">
            <label className="form-label">Select Help Request</label>
            <select
              className="form-control"
              value={form.requestId}
              onChange={(e) => setForm({ ...form, requestId: e.target.value })}
            >
              {requests.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.id} — {r.displayName} ({r.status})
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">After Outcome Summary (with Consent)</label>
            <input
              className="form-control"
              value={form.afterSummary}
              onChange={(e) => setForm({ ...form, afterSummary: e.target.value })}
              placeholder="e.g., Patient recovered and returned home."
            />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Thank-You Message</label>
          <textarea
            rows="2"
            className="form-control"
            value={form.thankYouMessage}
            onChange={(e) => setForm({ ...form, thankYouMessage: e.target.value })}
          />
        </div>
        <button type="submit" className="btn btn-primary btn-sm">
          Create &amp; Publish Story
        </button>
      </form>

      <DataTable columns={columns} rows={stories} />

      <ConfirmationModal
        isOpen={Boolean(deleteTarget)}
        title="Delete Success Story"
        message={`Delete success story ${deleteTarget?.id} (${deleteTarget?.displayName})?`}
        confirmLabel="Delete"
        variant="danger"
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => {
          deleteSuccessStory(deleteTarget.id);
          setNotice(`Deleted story ${deleteTarget.id}.`);
          setDeleteTarget(null);
        }}
      />
    </div>
  );
}
