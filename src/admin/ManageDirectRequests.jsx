import React, { useState } from 'react';
import { useTrust } from '../context/TrustContext';
import DataTable from '../components/DataTable';
import StatusBadge from '../components/StatusBadge';
import ConfirmationModal from '../components/ConfirmationModal';
import NotificationMessage from '../components/NotificationMessage';

export default function ManageDirectRequests() {
  const { directRequests, updateDirectRequestStatus, convertDirectToPublicRequest, deleteDirectRequest } = useTrust();
  const [notice, setNotice] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);

  const handleConvert = (row) => {
    const created = convertDirectToPublicRequest(row.id);
    if (created) {
      setNotice(`Approved ${row.fullName}'s submission and published as public Help Request ${created.id}.`);
    }
  };

  const columns = [
    { key: 'id', header: 'Ref ID' },
    {
      key: 'applicant',
      header: 'Applicant (Private Details)',
      render: (d) => (
        <div>
          <strong>{d.fullName}</strong> (Age {d.age})
          <div style={{ fontSize: '0.8rem', color: 'var(--charcoal-muted)' }}>
            {d.phone} · {d.district}
          </div>
        </div>
      )
    },
    { key: 'category', header: 'Category' },
    {
      key: 'documents',
      header: 'Uploaded Documents',
      render: (d) => (
        <div style={{ fontSize: '0.82rem' }}>
          {(d.documents || []).map((doc, i) => (
            <div key={i}>&#128196; {doc}</div>
          ))}
        </div>
      )
    },
    {
      key: 'status',
      header: 'Status',
      render: (d) => <StatusBadge status={d.status} />
    },
    {
      key: 'actions',
      header: 'Review Actions',
      render: (d) => (
        <div className="table-actions">
          <button
            type="button"
            className="btn btn-primary btn-sm"
            disabled={d.status === 'Verified'}
            onClick={() => handleConvert(d)}
          >
            Approve &amp; Publish
          </button>
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={() => {
              updateDirectRequestStatus(d.id, 'Under Review');
              setNotice(`Marked ${d.id} as Under Review.`);
            }}
          >
            Review
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
      <p style={{ margin: '0 0 1.25rem', color: 'var(--charcoal-muted)' }}>
        Review direct assistance requests submitted through the public form, convert approved submissions
        into public help requests, or delete spam/duplicate entries.
      </p>
      <DataTable columns={columns} rows={directRequests} />

      <ConfirmationModal
        isOpen={Boolean(deleteTarget)}
        title="Delete Direct Submission"
        message={`Delete submission ${deleteTarget?.id} from ${deleteTarget?.fullName}?`}
        confirmLabel="Delete"
        variant="danger"
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => {
          deleteDirectRequest(deleteTarget.id);
          setNotice(`Deleted submission ${deleteTarget.id}.`);
          setDeleteTarget(null);
        }}
      />
    </div>
  );
}
