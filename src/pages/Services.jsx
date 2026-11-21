import React from 'react';
import { Link } from 'react-router-dom';
import { useTrust } from '../context/TrustContext';
import ScrollReveal from '../components/ScrollReveal';

export default function Services() {
  const { siteContent } = useTrust();
  const services = [
    { title: 'Education', description: 'Quality education, learning support, and inclusive programmes for children and young people.', image: '/assets/images/thisaigal/thisaigal_children_kits.jpeg' },
    { title: 'Skill Development & Sustainable Livelihoods', description: 'Vocational training, entrepreneurship, digital literacy, and livelihood opportunities for rural and semi-urban communities.', image: '/assets/images/thisaigal/thisaigal_tanuvas_seminar.jpeg' },
    { title: 'Women & Child Empowerment', description: 'Safe, inclusive, and sustainable support that helps women and children live with dignity and confidence.', image: '/assets/images/thisaigal/thisaigal_women_rights_campaign.jpeg' },
    { title: 'Health & Hygiene Practice', description: 'Health awareness, screening, treatment support, wellness guidance, and community capacity building.', image: '/assets/images/thisaigal/thisaigal_community_outreach2.jpeg' },
    { title: 'Environment & Agriculture', description: 'Climate awareness, sustainable practices, green conservation, biodiversity, and responsible agriculture.', image: '/assets/images/nature/forest-background.jpg' },
    { title: 'Rural Infrastructure & Social Inclusion', description: 'Community-led solutions that bring together education, health, livelihoods, and social inclusion for resilience.', image: '/assets/images/thisaigal/thisaigal_community_outreach1.jpeg' },
    { title: 'Youth Development', description: 'Leadership development, employability skills, entrepreneurship, digital literacy, and personal growth for young people.', image: '/assets/images/thisaigal/thisaigal_yuva_samvad.jpeg' },
    { title: 'Sports & Cultural Development', description: 'Sports and cultural activities that encourage teamwork, talent, confidence, and the preservation of local heritage.', image: '/assets/images/thisaigal/thisaigal_child_welfare.jpeg' }
  ];
  const institutions = [
    ['CEDIS', 'Centre for Entrepreneurship Development & Incubation Support', 'Business mentoring, incubation support, and enterprise development for sustainable livelihoods.'],
    ['SAYN', 'Yoga & Naturopathic Wellness Center', 'Therapeutic yoga, naturopathic care, and lifestyle counselling for holistic wellbeing.'],
    ['BCT Dyslexia', 'Brain Care Tec Dyslexia Academy', 'Remedial education, cognitive skill enhancement, and behavioural support for learning challenges.'],
    ['SUGAM', 'Sustainable Growth & Advancement Mission', 'Vocational training, self-employment, and digital literacy programmes for communities.']
  ];

  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <h1>Our Services</h1>
          <p>People-first programs supporting dignity, opportunity, health, education, and sustainable communities.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">How We Serve</span>
            <h2 className="section-title">Practical support for every stage of life</h2>
            <p className="section-subtitle">Every service is verified by our Trust team and connected to a clear community need.</p>
          </div>
          <div className="grid-4">
            {services.map((service, index) => (
              <ScrollReveal key={service.title} delay={index * 60}>
                <article className="care-card" style={{ height: '100%' }}>
                  <div className="care-card-media">
                    <img src={service.image} alt={service.title} loading="lazy" />
                  </div>
                  <div className="care-card-body">
                    <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.18rem' }}>{service.title}</h2>
                    <p style={{ margin: '0 0 1.15rem', color: 'var(--charcoal-muted)', flex: 1 }}>{service.description}</p>
                    <Link to="/request-assistance" className="btn btn-outline-green btn-sm">Explore Support</Link>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-sand">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Specialist Institutions</span>
            <h2 className="section-title">Focused centres for deeper community support</h2>
          </div>
          <div className="grid-4">
            {institutions.map(([shortName, title, description]) => (
              <article key={shortName} className="card" style={{ padding: '1.5rem', height: '100%' }}>
                <span className="section-eyebrow">{shortName}</span>
                <h2 style={{ margin: '0 0 0.55rem', fontSize: '1.18rem' }}>{title}</h2>
                <p style={{ margin: 0, color: 'var(--charcoal-muted)', fontSize: '0.94rem' }}>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-sand">
        <div className="container grid-2" style={{ alignItems: 'center' }}>
          <div>
            <span className="section-eyebrow">Need Help?</span>
            <h2 className="section-title">Connect with our verification desk</h2>
            <p style={{ color: 'var(--charcoal-muted)' }}>Submit a confidential request and our coordinators will guide you to the right service.</p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            <Link to="/request-assistance" className="btn btn-primary">Request Assistance</Link>
            <Link to="/contact" className="btn btn-outline">Contact the Trust</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
