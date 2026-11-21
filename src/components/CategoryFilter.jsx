import React from 'react';

const FILTER_OPTIONS = [
  'All Requests',
  'Medical',
  'Education',
  'Food',
  'Family Support',
  'Emergency',
  'Completed Requests'
];

export default function CategoryFilter({ activeFilter, onSelectFilter }) {
  return (
    <div className="filter-pills" role="group" aria-label="Filter help requests">
      {FILTER_OPTIONS.map((filter) => (
        <button
          key={filter}
          type="button"
          className={`filter-pill ${activeFilter === filter ? 'active' : ''}`}
          onClick={() => onSelectFilter(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
