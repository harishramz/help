import React from 'react';

export default function NotificationMessage({ type = 'info', message, onClose }) {
  if (!message) return null;

  return (
    <div className={`notification-banner notification-${type}`} role="status">
      <div>{message}</div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="btn btn-ghost btn-sm"
          aria-label="Dismiss notification"
          style={{ padding: '0.15rem 0.5rem' }}
        >
          ✕
        </button>
      )}
    </div>
  );
}
