import React from 'react';
import { useTrust } from '../context/TrustContext';
import ScrollReveal from '../components/ScrollReveal';

const ACTIVITY_IMAGES = [
  '/assets/images/volunteering/volunteers-helping.jpg',
  '/assets/images/community/community-food-support.jpg',
  '/assets/images/children/children-education.jpg',
  '/assets/images/elderly-care/elderly-care-support.jpg'
];

export default function Activities() {
  const { activities } = useTrust();
  const published = activities.filter((a) => a.isPublished);

  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <h1>Our Initiatives &amp; Activities</h1>
          <p>
            Medical camps, food distribution drives, educational kits, and emergency relief organized
            by TrustConnect volunteers and partners.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container grid-2">
          {published.map((act, idx) => (
            <ScrollReveal key={act.id} delay={idx * 60}>
              <article className="card card-hover" style={{ overflow: 'hidden', height: '100%' }}>
                <div className="image-reveal-frame" style={{ height: '240px', borderRadius: 0 }}>
                  <img
                    src={act.imageUrl || ACTIVITY_IMAGES[idx % ACTIVITY_IMAGES.length]}
                    alt={act.title}
                    loading="lazy"
                  />
                </div>

                <div style={{ padding: '1.65rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem', gap: '0.5rem' }}>
                    <span className="category-tag">{act.category}</span>
                    <span style={{ fontSize: '0.84rem', color: 'var(--charcoal-muted)' }}>{act.date}</span>
                  </div>
                  <h2 style={{ margin: '0 0 0.45rem', fontSize: '1.3rem' }}>{act.title}</h2>
                  <div style={{ fontSize: '0.86rem', color: 'var(--earth)', fontWeight: 600, marginBottom: '0.75rem' }}>
                    &#128205; {act.location}
                  </div>
                  <p style={{ margin: 0, color: 'var(--charcoal-muted)', fontSize: '0.94rem' }}>
                    {act.description}
                  </p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
}
