import React from 'react';
import { useTrust } from '../context/TrustContext';
import StatisticsCards from '../components/StatisticsCards';
import StatusBadge from '../components/StatusBadge';

export default function Transparency() {
  const { impactStats, contributions, activities, siteContent } = useTrust();

  // Only show verified/completed contributions in public transparency ledger
  const verifiedRecords = contributions.filter(
    (c) => c.verificationStatus === 'Verified' || c.verificationStatus === 'Completed'
  );

  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <h1>Transparency &amp; Public Accountability</h1>
          <p>
            Verified assistance totals, confirmed contribution records, and annual impact reports.
            Pending pledges are never counted until verified by Trust administrators.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <StatisticsCards stats={impactStats} />

          <div className="grid-2" style={{ marginTop: '2.5rem', alignItems: 'start' }}>
            <div className="card" style={{ padding: '1.5rem' }}>
              <h2 style={{ margin: '0 0 0.75rem', fontSize: '1.2rem' }}>
                Trust Registration &amp; Governance
              </h2>
              <p style={{ margin: '0 0 0.5rem', color: 'var(--text-secondary)' }}>
                <strong>Organization:</strong> {siteContent.trustName}
              </p>
              <p style={{ margin: '0 0 0.5rem', color: 'var(--text-secondary)' }}>
                <strong>Registration:</strong> {siteContent.registrationNumber}
              </p>
              <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
                <strong>Certification:</strong> {siteContent.pan80GStatus}
              </p>
            </div>

            <div className="card" style={{ padding: '1.5rem' }}>
              <h2 style={{ margin: '0 0 0.75rem', fontSize: '1.2rem' }}>Annual Impact Reports</h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {siteContent.annualReports.map((rep) => (
                  <li
                    key={rep.year}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '0.75rem',
                      background: 'var(--bg-subtle)',
                      borderRadius: 'var(--radius-sm)'
                    }}
                  >
                    <div>
                      <strong>{rep.year}</strong> — {rep.title}
                      <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                        {rep.casesFulfilled} cases fulfilled
                      </div>
                    </div>
                    <span className="status-badge status-completed">{rep.status}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div style={{ marginTop: '2.5rem' }}>
            <h2 style={{ margin: '0 0 1rem' }}>Verified Contribution Records</h2>
            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Record ID</th>
                    <th>Contributor</th>
                    <th>Case Supported</th>
                    <th>Support Type</th>
                    <th>Verified Amount</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {verifiedRecords.map((rec) => (
                    <tr key={rec.id}>
                      <td><strong>{rec.id}</strong></td>
                      <td>{rec.publicAck ? rec.donorName : 'Anonymous Well-Wisher'}</td>
                      <td>{rec.requestTitle}</td>
                      <td>{rec.supportType}</td>
                      <td>{rec.amount > 0 ? `₹${Number(rec.amount).toLocaleString('en-IN')}` : 'In-Kind'}</td>
                      <td>{rec.date}</td>
                      <td><StatusBadge status={rec.verificationStatus} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div style={{ marginTop: '2.5rem' }}>
            <h2 style={{ margin: '0 0 1rem' }}>Recent Assistance Activities</h2>
            <div className="grid-2">
              {activities.slice(0, 4).map((act) => (
                <div key={act.id} className="card" style={{ padding: '1.25rem' }}>
                  <strong>{act.title}</strong>
                  <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', margin: '0.25rem 0 0.5rem' }}>
                    {act.date} · {act.location}
                  </div>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{act.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
