import React from 'react';
import ScrollReveal from '../components/ScrollReveal';

const galleryImages = [
  ['thisaigal_community_outreach1.jpeg', 'Community outreach and relief support'],
  ['thisaigal_community_outreach2.jpeg', 'ThisaiGal community care programme'],
  ['thisaigal_children_kits.jpeg', 'Education support kits for children'],
  ['thisaigal_child_welfare.jpeg', 'Child welfare and community giving'],
  ['thisaigal_women_rights_campaign.jpeg', 'Women rights and legal advocacy'],
  ['thisaigal_yuva_samvad.jpeg', 'Youth leadership and dialogue'],
  ['thisaigal_tanuvas_seminar.jpeg', 'Skills, FPO, and entrepreneurship training'],
  ['thisaigal_stationery_drive.jpeg', 'Stationery and learning support']
];

export default function Gallery() {
  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <h1>Gallery</h1>
          <p>A look at the people, programmes, and community moments behind our work.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-4">
            {galleryImages.map(([file, label], index) => (
              <ScrollReveal key={file} delay={(index % 4) * 60}>
                <figure className="card" style={{ margin: 0, overflow: 'hidden' }}>
                  <div className="image-reveal-frame" style={{ height: '220px', borderRadius: 0 }}>
                    <img src={`/assets/images/thisaigal/${file}`} alt={label} loading="lazy" />
                  </div>
                  <figcaption style={{ padding: '0.9rem 1rem', color: 'var(--charcoal-muted)', fontSize: '0.9rem' }}>{label}</figcaption>
                </figure>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
