import React from 'react';

export default function DashboardCard({ label, value, accent }) {
  return (
    <div className="dashboard-card" style={accent ? { borderTop: `3px solid ${accent}` } : undefined}>
      <div className="dashboard-card-label">{label}</div>
      <div className="dashboard-card-value">{value}</div>
    </div>
  );
}
