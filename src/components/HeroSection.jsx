import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HeroCanvas3D from './HeroCanvas3D';

export default function HeroSection({ stats }) {
  const [parallaxY, setParallaxY] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const onScroll = () => {
      const y = window.scrollY || 0;
      if (y < 900) setParallaxY(y * 0.18);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="hero-cinematic">
      <div
        className="hero-media-layer"
        style={{ transform: `translate3d(0, ${parallaxY}px, 0) scale(1.06)` }}
      >
        <div className="hero-image-collage">
          <img
            src="/assets/images/thisaigal/thisaigal_community_outreach1.jpeg"
            alt="ThisaiGal volunteers supporting a local community"
          />
          <img
            src="/assets/images/thisaigal/thisaigal_children_kits.jpeg"
            alt="Children receiving education support kits"
          />
          <img
            src="/assets/images/thisaigal/thisaigal_women_rights_campaign.jpeg"
            alt="Women participating in a rights and empowerment campaign"
          />
        </div>
      </div>

      <div className="hero-scrim" aria-hidden="true" />
      <HeroCanvas3D />

      <div className="container hero-content-grid">
        <div>
          <span className="hero-eyebrow">ThisaiGal Foundation · Ensure Empowerment and Dignity for All</span>
          <h1 className="hero-title">
            Every Life Deserves
            <br />
            Care, Dignity &amp; Hope.
          </h1>
          <p className="hero-description">
            Supporting women’s empowerment, child welfare, IBM vocational training, women farmer
            collectives (FPO), environmental conservation, and 80G-exempt community relief from
            Villuppuram.
          </p>

          <div className="hero-actions">
            <Link to="/requests" className="btn btn-sage btn-lg">
              Support Our Mission
            </Link>
            <Link to="/activities" className="btn btn-outline-light btn-lg">
              Explore Our Work
            </Link>
          </div>
        </div>

        <div className="hero-glass-card">
          <div style={{ fontSize: '0.78rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--sage)', marginBottom: '0.5rem' }}>
            100% Transparency · Section 80G Trust
          </div>
          <div className="editorial-serif" style={{ fontSize: '1.65rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--ivory)' }}>
            {stats.activeRequestsCount} Verified Cases Open
          </div>
          <p style={{ margin: '0 0 1.25rem', fontSize: '0.92rem', color: 'rgba(247,245,239,0.85)' }}>
            {stats.completedRequestsCount} requests fulfilled with beneficiary consent and audited
            medical, educational, and relief records.
          </p>
          <Link to="/transparency" className="btn btn-outline-light btn-sm">
            View Transparency Ledger &rarr;
          </Link>
        </div>
      </div>

      <div className="hero-scroll-cue">Scroll to explore our mission &darr;</div>
    </section>
  );
}
