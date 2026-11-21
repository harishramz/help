import React from 'react';
import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import ProgressBar from './ProgressBar';

export default function HelpRequestCard({ request }) {
  const remaining = Math.max(0, Number(request.requiredAmount || 0) - Number(request.amountReceived || 0));
  const urgencyClass = `urgency-${(request.urgency || 'normal').toLowerCase()}`;

  return (
    <article className="card card-hover request-card">
      <div className="request-card-header">
        <div
          className="avatar-circle"
          style={{ background: request.avatarColor || 'var(--primary-blue)' }}
          title="Approved display profile (published with consent)"
        >
          {request.avatarInitials || 'TC'}
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: '1.02rem', color: 'var(--text-main)' }}>
            {request.displayName}
          </div>
          <div style={{ fontSize: '0.83rem', color: 'var(--text-muted)' }}>
            &#128205; {request.location}
          </div>
        </div>
      </div>

      <div className="request-card-body">
        <div className="request-meta-row">
          <span className="category-tag">{request.category}</span>
          <span className={`urgency-tag ${urgencyClass}`}>{request.urgency} Urgency</span>
          <StatusBadge status={request.status} />
        </div>

        <h3 style={{ margin: '0.2rem 0 0', fontSize: '1.05rem', lineHeight: 1.35 }}>
          {request.title}
        </h3>
        <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          {request.shortDescription}
        </p>

        {request.requiredAmount > 0 && (
          <>
            <div className="request-amounts">
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Required</span>
                <strong>₹{Number(request.requiredAmount).toLocaleString('en-IN')}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Received</span>
                <strong style={{ color: 'var(--primary-green-dark)' }}>
                  ₹{Number(request.amountReceived || 0).toLocaleString('en-IN')}
                </strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Remaining</span>
                <strong style={{ color: 'var(--primary-blue-dark)' }}>
                  ₹{remaining.toLocaleString('en-IN')}
                </strong>
              </div>
            </div>
            <ProgressBar received={request.amountReceived} required={request.requiredAmount} />
          </>
        )}

        <div className="request-card-footer">
          <Link to={`/requests/${request.id}`} className="btn btn-outline btn-sm">
            View Details
          </Link>
          {request.status !== 'Completed' ? (
            <Link to={`/requests/${request.id}#help-form`} className="btn btn-primary btn-sm">
              Help Now
            </Link>
          ) : (
            <Link to="/success-stories" className="btn btn-outline-green btn-sm">
              View Outcome
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
