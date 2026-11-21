import React, { useState } from 'react';
import { useTrust } from '../context/TrustContext';
import DataTable from '../components/DataTable';
import StatusBadge from '../components/StatusBadge';
import ConfirmationModal from '../components/ConfirmationModal';
import NotificationMessage from '../components/NotificationMessage';

const IMAGE_PRESETS = [
  { label: 'ThisaiGal Children Education Kits', value: '/assets/images/thisaigal/thisaigal_children_kits.jpeg' },
  { label: 'ThisaiGal Women Rights Campaign', value: '/assets/images/thisaigal/thisaigal_women_rights_campaign.jpeg' },
  { label: 'ThisaiGal Yuva Samvad Seminar', value: '/assets/images/thisaigal/thisaigal_yuva_samvad.jpeg' },
  { label: 'ThisaiGal TANUVAS Training', value: '/assets/images/thisaigal/thisaigal_tanuvas_seminar.jpeg' },
  { label: 'ThisaiGal Child Welfare Drive', value: '/assets/images/thisaigal/thisaigal_child_welfare.jpeg' },
  { label: 'ThisaiGal Community Outreach', value: '/assets/images/thisaigal/thisaigal_community_outreach1.jpeg' },
  { label: 'Volunteers & Medical Camp', value: '/assets/images/volunteering/volunteers-helping.jpg' },
  { label: 'Nature & Environment', value: '/assets/images/nature/forest-background.jpg' }
];

export default function ManageActivities() {
  const { activities, addActivity, toggleActivityPublish, deleteActivity } = useTrust();
  const [notice, setNotice] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [form, setForm] = useState({
    title: '',
    category: 'Medical Assistance Programs',
    date: '',
    location: '',
    imageUrl: IMAGE_PRESETS[0].value,
    description: ''
  });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.location.trim()) return;
    addActivity({
      ...form,
      date: form.date || new Date().toISOString().slice(0, 10),
      imageLabel: form.category
    });
    setNotice(`Activity "${form.title}" published.`);
    setForm({
      title: '',
      category: 'Medical Assistance Programs',
      date: '',
      location: '',
      imageUrl: IMAGE_PRESETS[0].value,
      description: ''
    });
  };

  const columns = [
    { key: 'id', header: 'ID' },
    { key: 'title', header: 'Activity Title' },
    { key: 'category', header: 'Program' },
    { key: 'date', header: 'Date' },
    { key: 'location', header: 'Location' },
    {
      key: 'isPublished',
      header: 'Status',
      render: (a) => <StatusBadge status={a.isPublished ? 'Published' : 'Pending Verification'} />
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (a) => (
        <div className="table-actions">
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={() => toggleActivityPublish(a.id)}
          >
            {a.isPublished ? 'Unpublish' : 'Publish'}
          </button>
          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={() => setDeleteTarget(a)}
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

      <form className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }} onSubmit={handleAdd}>
        <h3 style={{ margin: '0 0 1rem' }}>Add Trust Activity / Initiative</h3>
        <div className="grid-2">
          <div className="form-group">
            <label className="form-label">Activity Title</label>
            <input className="form-control" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Program Category</label>
            <select className="form-control" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
              <option>Medical Assistance Programs</option>
              <option>Food Distribution</option>
              <option>Educational Support</option>
              <option>Community Welfare Programs</option>
              <option>Emergency Assistance</option>
              <option>Charity Events</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Event Date</label>
            <input type="date" className="form-control" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Location</label>
            <input className="form-control" required value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Featured Photo</label>
          <select className="form-control" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}>
            {IMAGE_PRESETS.map((p) => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea rows="2" className="form-control" required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </div>
        <button type="submit" className="btn btn-primary btn-sm">Add &amp; Publish Activity</button>
      </form>

      <DataTable columns={columns} rows={activities} />

      <ConfirmationModal
        isOpen={Boolean(deleteTarget)}
        title="Delete Activity"
        message={`Delete activity "${deleteTarget?.title}"?`}
        confirmLabel="Delete"
        variant="danger"
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => {
          deleteActivity(deleteTarget.id);
          setNotice(`Activity "${deleteTarget.title}" deleted.`);
          setDeleteTarget(null);
        }}
      />
    </div>
  );
}
