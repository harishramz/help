import React from 'react';

export default function SuccessStoryCard({ story }) {
  return (
    <article className="card card-hover story-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem' }}>
        <div>
          <span className="category-tag">{story.category}</span>
          <h3 style={{ margin: '0.5rem 0 0.2rem', fontSize: '1.15rem' }}>{story.displayName}</h3>
          <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
            &#128205; {story.location} · Completed {story.completionDate}
          </div>
        </div>
        <span className="status-badge status-completed">
          <span className="status-dot" aria-hidden="true" />
          Fulfilled
        </span>
      </div>

      <div style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
        <strong>Original Need:</strong> {story.originalProblem}
      </div>
      <div style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
        <strong>Assistance Received:</strong> {story.assistanceReceived}
      </div>

      {story.beforeAfterConsent && (story.beforeSummary || story.afterSummary) && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0.75rem',
            background: 'var(--bg-subtle)',
            padding: '0.85rem',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.85rem'
          }}
        >
          <div>
            <strong style={{ color: 'var(--text-muted)' }}>Before:</strong>
            <div style={{ marginTop: '0.2rem' }}>{story.beforeSummary}</div>
          </div>
          <div>
            <strong style={{ color: 'var(--primary-green-dark)' }}>After:</strong>
            <div style={{ marginTop: '0.2rem' }}>{story.afterSummary}</div>
          </div>
        </div>
      )}

      <blockquote className="story-quote">“{story.thankYouMessage}”</blockquote>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '0.85rem',
          color: 'var(--text-muted)',
          borderTop: '1px solid var(--border-light)',
          paddingTop: '0.75rem',
          marginTop: 'auto'
        }}
      >
        <span>{story.contributorsCount} verified contributors</span>
        {story.totalSupportReceived > 0 && (
          <strong style={{ color: 'var(--primary-green-dark)' }}>
            Total Support: ₹{Number(story.totalSupportReceived).toLocaleString('en-IN')}
          </strong>
        )}
      </div>
    </article>
  );
}
