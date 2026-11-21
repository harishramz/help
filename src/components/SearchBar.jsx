import React from 'react';

export default function SearchBar({ value, onChange, placeholder = 'Search by name, category, or location...' }) {
  return (
    <div className="search-box">
      <span className="search-icon" aria-hidden="true">
        &#128269;
      </span>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
      />
    </div>
  );
}
