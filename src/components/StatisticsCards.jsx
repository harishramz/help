import React from 'react';

export default function StatisticsCards({ stats }) {
  const items = [
    {
      label: 'Total People Helped',
      value: stats.totalPeopleHelped.toLocaleString('en-IN'),
      icon: '♥'
    },
    {
      label: 'Total Families Supported',
      value: stats.totalFamiliesSupported.toLocaleString('en-IN'),
      icon: '⌂'
    },
    {
      label: 'Total Medical Cases Supported',
      value: stats.totalMedicalCases.toLocaleString('en-IN'),
      icon: '+'
    },
    {
      label: 'Total Donations Received',
      value: `₹${stats.totalDonationsReceived.toLocaleString('en-IN')}`,
      icon: '₹'
    }
  ];

  return (
    <div className="stats-grid">
      {items.map((item) => (
        <div key={item.label} className="stat-card">
          <div className="stat-icon" aria-hidden="true">
            {item.icon}
          </div>
          <div className="stat-value">{item.value}</div>
          <div className="stat-label">{item.label}</div>
        </div>
      ))}
    </div>
  );
}
