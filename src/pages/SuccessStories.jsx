import React from 'react';
import { Link } from 'react-router-dom';
import { useTrust } from '../context/TrustContext';
import SuccessStoryCard from '../components/SuccessStoryCard';

export default function SuccessStories() {
  const { stories } = useTrust();
  const publishedStories = stories.filter((s) => s.isPublished);

  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <h1>Success Stories</h1>
          <p>
            Real outcomes from verified assistance requests—published with beneficiary consent and
            verified support totals.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Verified Outcomes</span>
            <h2 className="section-title">Together, We Changed Lives.</h2>
            <p className="section-subtitle">
              Every completed case reflects the generosity of verified contributors and careful Trust follow-up.
            </p>
          </div>

          <div className="grid-2">
            {publishedStories.map((story) => (
              <SuccessStoryCard key={story.id} story={story} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/requests" className="btn btn-primary btn-lg">
              Support an Active Case Today
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
