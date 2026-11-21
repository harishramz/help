import React from 'react';

const STATUS_CLASS_MAP = {
  'Pending Verification': 'status-pending',
  'Under Review': 'status-review',
  Verified: 'status-verified',
  Published: 'status-published',
  'Assistance in Progress': 'status-progress',
  'Partially Fulfilled': 'status-partial',
  Completed: 'status-completed',
  Rejected: 'status-rejected'
};

export default function StatusBadge({ status }) {
  const cls = STATUS_CLASS_MAP[status] || 'status-pending';
  return (
    <span className={`status-badge ${cls}`}>
      <span className="status-dot" aria-hidden="true" />
      {status}
    </span>
  );
}
