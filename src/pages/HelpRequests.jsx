import React, { useState, useMemo } from 'react';
import { useTrust } from '../context/TrustContext';
import HelpRequestCard from '../components/HelpRequestCard';
import CategoryFilter from '../components/CategoryFilter';
import SearchBar from '../components/SearchBar';

export default function HelpRequests() {
  const { requests } = useTrust();
  const [activeFilter, setActiveFilter] = useState('All Requests');
  const [searchQuery, setSearchQuery] = useState('');

  const publishedRequests = useMemo(
    () => requests.filter((r) => r.isPublished && r.status !== 'Rejected'),
    [requests]
  );

  const filteredRequests = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return publishedRequests.filter((r) => {
      // Filter pills
      if (activeFilter === 'Completed Requests') {
        if (r.status !== 'Completed') return false;
      } else if (activeFilter !== 'All Requests') {
        const matchesGroup =
          r.filterGroup === activeFilter ||
          r.category.toLowerCase().includes(activeFilter.toLowerCase());
        if (!matchesGroup) return false;
      }

      // Search by name, category, location
      if (q) {
        const haystack = `${r.displayName} ${r.category} ${r.location} ${r.title}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [publishedRequests, activeFilter, searchQuery]);

  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <h1>Verified Help Requests</h1>
          <p>
            Explore approved assistance requests. Every case is reviewed by TrustConnect administrators
            with beneficiary consent before publication.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="filter-toolbar">
            <CategoryFilter activeFilter={activeFilter} onSelectFilter={setActiveFilter} />
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>

          {filteredRequests.length === 0 ? (
            <div className="card" style={{ padding: '2.5rem', textAlign: 'center' }}>
              <h3 style={{ margin: '0 0 0.5rem' }}>No matching requests found</h3>
              <p style={{ margin: '0 0 1rem', color: 'var(--text-secondary)' }}>
                Try clearing your search term or switching to another category filter.
              </p>
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => {
                  setActiveFilter('All Requests');
                  setSearchQuery('');
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid-3">
              {filteredRequests.map((req) => (
                <HelpRequestCard key={req.id} request={req} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
