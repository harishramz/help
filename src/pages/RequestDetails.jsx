import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTrust } from '../context/TrustContext';
import StatusBadge from '../components/StatusBadge';
import ProgressBar from '../components/ProgressBar';
import DonorForm from '../components/DonorForm';

export default function RequestDetails() {
  const { id } = useParams();
  const { requests, contributions } = useTrust();

  const request = requests.find((r) => r.id === id && r.isPublished);

  if (!request) {
    return (
      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2>Help Request Not Found</h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            This case may have been archived or is currently under private review.
          </p>
          <Link to="/requests" className="btn btn-primary">
            Back to Help Requests
          </Link>
        </div>
      </section>
    );
  }

  const remaining = Math.max(0, Number(request.requiredAmount || 0) - Number(request.amountReceived || 0));

  // Only show verified/completed contributions publicly; respect publicAck consent
  const verifiedContributors = contributions.filter(
    (c) =>
      c.requestId === request.id &&
      (c.verificationStatus === 'Verified' || c.verificationStatus === 'Completed')
  );

  const scrollToHelp = () => {
    const el = document.getElementById('help-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <section className="page-hero" style={{ textAlign: 'left', padding: '2.5rem 0' }}>
        <div className="container">
          <Link to="/requests" style={{ fontSize: '0.9rem', color: 'var(--primary-blue-dark)', fontWeight: 600 }}>
            &larr; Back to All Help Requests
          </Link>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.65rem', marginTop: '0.9rem' }}>
            <span className="category-tag">{request.category}</span>
            <StatusBadge status={request.status} />
            <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Case ID: {request.id}</span>
          </div>
          <h1 style={{ marginTop: '0.65rem', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}>{request.title}</h1>
          <p style={{ margin: '0.4rem 0 0', maxWidth: 'none' }}>
            Approved Display Name: <strong>{request.displayName}</strong> · &#128205; {request.location}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container details-layout">
          {/* Left Column: Full Story & Verification */}
          <div className="card details-panel">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <h2 style={{ margin: 0 }}>Case Story &amp; Situation</h2>
              {request.status !== 'Completed' && (
                <button type="button" className="btn btn-primary" onClick={scrollToHelp}>
                  I Want to Help
                </button>
              )}
            </div>

            <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>{request.story}</p>

            <div className="details-section">
              <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.05rem' }}>Current Situation</h3>
              <p style={{ margin: 0, color: 'var(--text-secondary)' }}>{request.currentSituation}</p>
            </div>

            <div className="details-section">
              <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.05rem' }}>Why Assistance Is Needed</h3>
              <p style={{ margin: 0, color: 'var(--text-secondary)' }}>{request.whyNeeded}</p>
            </div>

            <div className="details-section">
              <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.05rem' }}>Required Support &amp; Materials</h3>
              <p style={{ margin: '0 0 0.4rem', color: 'var(--text-secondary)' }}>{request.helpRequired}</p>
              {request.materialRequirements && (
                <div style={{ fontSize: '0.9rem', color: 'var(--primary-blue-dark)' }}>
                  <strong>Specific Requirements:</strong> {request.materialRequirements}
                </div>
              )}
            </div>

            {request.status === 'Completed' && (
              <div
                className="details-section"
                style={{
                  background: 'var(--bg-soft-green)',
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-md)',
                  borderTop: 'none'
                }}
              >
                <h3 style={{ margin: '0 0 0.5rem', color: '#065f46' }}>
                  Completed Assistance Summary
                </h3>
                <p style={{ margin: '0 0 0.5rem', color: '#065f46' }}>
                  Fulfilled on <strong>{request.completedDate || 'Verified Completion'}</strong> with total
                  verified support of <strong>₹{Number(request.amountReceived).toLocaleString('en-IN')}</strong>.
                </p>
                {request.thankYouMessage && (
                  <blockquote className="story-quote" style={{ background: '#ffffff' }}>
                    “{request.thankYouMessage}”
                  </blockquote>
                )}
              </div>
            )}

            <div className="details-section">
              <h3 style={{ margin: '0 0 0.65rem', fontSize: '1.05rem' }}>
                Trust Verification &amp; Supporting Documents
              </h3>
              <p style={{ margin: '0 0 0.8rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Verified by <strong>{request.verifiedBy}</strong> on {request.verifiedDate}. Private contact
                information and unredacted medical records are protected by TrustConnect privacy policy.
              </p>
              {request.supportingDocsConsent && request.supportingDocs?.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                  {request.supportingDocs.map((doc, idx) => (
                    <span key={idx} className="doc-pill">
                      &#10003; {doc.label}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="details-section">
              <h3 style={{ margin: '0 0 0.85rem', fontSize: '1.05rem' }}>Latest Updates</h3>
              <ul className="timeline-list">
                {(request.updates || []).map((upd, idx) => (
                  <li key={idx} className="timeline-item">
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{upd.date}</div>
                    <div style={{ fontSize: '0.93rem', color: 'var(--text-main)' }}>{upd.note}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Progress & Verified Contributors */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="card details-panel">
              <h3 style={{ margin: '0 0 1rem' }}>Assistance Progress</h3>
              {request.requiredAmount > 0 && (
                <>
                  <div className="request-amounts" style={{ marginBottom: '1rem' }}>
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

              {request.status !== 'Completed' && (
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  style={{ width: '100%', marginTop: '1.25rem' }}
                  onClick={scrollToHelp}
                >
                  I Want to Help
                </button>
              )}
            </div>

            <div className="card details-panel">
              <h3 style={{ margin: '0 0 0.75rem' }}>Verified Help Contributors</h3>
              {verifiedContributors.length === 0 ? (
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  No verified contributions recorded yet. Be the first supporter to pledge assistance.
                </p>
              ) : (
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {verifiedContributors.map((c) => (
                    <li
                      key={c.id}
                      style={{
                        padding: '0.75rem',
                        background: 'var(--bg-subtle)',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.9rem'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
                        <span>{c.publicAck ? c.donorName : 'Anonymous Well-Wisher'}</span>
                        <span style={{ color: 'var(--primary-green-dark)' }}>
                          {c.amount > 0 ? `₹${Number(c.amount).toLocaleString('en-IN')}` : c.supportType}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        {c.supportType} · {c.date}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {request.status !== 'Completed' && (
          <div className="container" style={{ marginTop: '2.5rem' }}>
            <DonorForm preselectedRequestId={request.id} />
          </div>
        )}
      </section>
    </div>
  );
}
