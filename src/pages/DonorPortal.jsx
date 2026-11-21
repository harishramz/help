import React from 'react';
import { Link } from 'react-router-dom';
import { useTrust } from '../context/TrustContext';
import DonorForm from '../components/DonorForm';
import StatusBadge from '../components/StatusBadge';

export default function DonorPortal() {
  const { contributions, currentUser } = useTrust();

  // If logged in as a donor, filter by email; otherwise show sample supporter history
  const myContributions = currentUser?.email
    ? contributions.filter((c) => c.donorEmail.toLowerCase() === currentUser.email.toLowerCase())
    : contributions.slice(0, 3);

  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <h1>Donor &amp; Supporter Portal</h1>
          <p>
            Pledge financial, medical, food, or educational assistance, and track whether your
            support is Pending Verification or Confirmed by the Trust.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          <DonorForm />

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
              <h2 style={{ margin: 0 }}>
                {currentUser ? `Your Contribution History (${currentUser.name})` : 'Recent Supporter Pledges & Verified Contributions'}
              </h2>
              <Link to="/requests" className="btn btn-outline btn-sm">
                Browse All Requests
              </Link>
            </div>

            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Ref ID</th>
                    <th>Supported Request</th>
                    <th>Type of Assistance</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Verification Status</th>
                  </tr>
                </thead>
                <tbody>
                  {myContributions.length === 0 ? (
                    <tr>
                      <td colSpan="6" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                        No contributions recorded for your account yet.
                      </td>
                    </tr>
                  ) : (
                    myContributions.map((c) => (
                      <tr key={c.id}>
                        <td><strong>{c.id}</strong></td>
                        <td>
                          <Link to={`/requests/${c.requestId}`} style={{ color: 'var(--primary-blue-dark)', fontWeight: 600 }}>
                            {c.requestTitle}
                          </Link>
                        </td>
                        <td>{c.supportType}</td>
                        <td>{c.amount > 0 ? `₹${Number(c.amount).toLocaleString('en-IN')}` : 'Material Support'}</td>
                        <td>{c.date}</td>
                        <td><StatusBadge status={c.verificationStatus} /></td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
