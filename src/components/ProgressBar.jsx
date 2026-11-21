import React from 'react';

export default function ProgressBar({ received = 0, required = 0 }) {
  const safeRequired = Number(required) || 0;
  const safeReceived = Number(received) || 0;
  const pct = safeRequired > 0 ? Math.min(100, Math.round((safeReceived / safeRequired) * 100)) : 0;

  return (
    <div className="progress-wrapper">
      <div
        className="progress-track"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="progress-meta">
        <span>{pct}% fulfilled</span>
        {safeRequired > 0 && (
          <span>
            ₹{safeReceived.toLocaleString('en-IN')} / ₹{safeRequired.toLocaleString('en-IN')}
          </span>
        )}
      </div>
    </div>
  );
}
