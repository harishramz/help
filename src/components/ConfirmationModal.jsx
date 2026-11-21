import React from 'react';

export default function ConfirmationModal({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'primary',
  onConfirm,
  onCancel
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-box">
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={onCancel}
            aria-label="Close dialog"
          >
            ✕
          </button>
        </div>
        <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{message}</p>
        <div className="modal-actions">
          <button type="button" className="btn btn-outline btn-sm" onClick={onCancel}>
            {cancelLabel}
          </button>
          <button
            type="button"
            className={`btn btn-sm ${variant === 'danger' ? 'btn-danger' : 'btn-primary'}`}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
