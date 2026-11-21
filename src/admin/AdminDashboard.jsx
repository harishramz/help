import React from 'react';
import { Link } from 'react-router-dom';
import { useTrust } from '../context/TrustContext';
import DashboardCard from '../components/DashboardCard';
import StatusBadge from '../components/StatusBadge';

export default function AdminDashboard() {
  const { requests, directRequests, contributions, donors } = useTrust();

  const totalRequests = requests.length + directRequests.length;
  const pendingRequests =
    requests.filter((r) => r.status === 'Pending Verification' || r.status === 'Under Review').length +
    directRequests.filter((d) => d.status === 'Pending Verification' || d.status === 'Under Review').length;
  const verifiedRequests = requests.filter((r) => r.status === 'Verified').length;
  const activeRequests = requests.filter(
    (r) => r.isPublished && r.status !== 'Completed' && r.status !== 'Rejected'
  ).length;
  const completedRequests = requests.filter((r) => r.status === 'Completed').length;
  const totalSupportReceived = contributions
    .filter((c) => c.verificationStatus === 'Verified' || c.verificationStatus === 'Completed')
    .reduce((sum, c) => sum + Number(c.amount || 0), 0);
  const totalContributors = donors.length;

  return (
    <div>
      <div className="dashboard-kpi-grid">
        <DashboardCard label="Total Requests" value={totalRequests} accent="var(--primary-blue)" />
        <DashboardCard label="Pending Requests" value={pendingRequests} accent="var(--warning)" />
        <DashboardCard label="Verified Requests" value={verifiedRequests} accent="var(--primary-green)" />
        <DashboardCard label="Active Requests" value={activeRequests} accent="var(--primary-blue-dark)" />
        <DashboardCard label="Completed Requests" value={completedRequests} accent="var(--success)" />
        <DashboardCard
          label="Total Support Received"
          value={`₹${totalSupportReceived.toLocaleString('en-IN')}`}
          accent="var(--primary-green-dark)"
        />
        <DashboardCard label="Total Contributors" value={totalContributors} accent="var(--primary-blue)" />
      </div>

      <div className="grid-2">
        <div className="card" style={{ padding: '1.35rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ margin: 0 }}>Recent Direct Submissions</h3>
            <Link to="/admin/direct-requests" className="btn btn-outline btn-sm">Review All</Link>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {directRequests.slice(0, 4).map((d) => (
              <li key={d.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem' }}>
                <div>
                  <strong>{d.fullName}</strong> · {d.category} ({d.district})
                </div>
                <StatusBadge status={d.status} />
              </li>
            ))}
          </ul>
        </div>

        <div className="card" style={{ padding: '1.35rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ margin: 0 }}>Pending Contribution Verifications</h3>
            <Link to="/admin/contributions" className="btn btn-outline-green btn-sm">Manage</Link>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {contributions.slice(0, 4).map((c) => (
              <li key={c.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem' }}>
                <div>
                  <strong>{c.donorName}</strong> · ₹{Number(c.amount).toLocaleString('en-IN')}
                </div>
                <StatusBadge status={c.verificationStatus} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
