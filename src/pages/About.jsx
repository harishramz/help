import React from 'react';
import { Link } from 'react-router-dom';
import { useTrust } from '../context/TrustContext';
import ScrollReveal from '../components/ScrollReveal';

export default function About() {
  const { siteContent } = useTrust();

  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <h1>About {siteContent.trustName}</h1>
          <p>{siteContent.aboutIntro}</p>
        </div>
      </section>

      <section className="section">
        <div className="container grid-2">
          <ScrollReveal>
            <div className="card" style={{ padding: '1.85rem', background: 'var(--sand)', height: '100%' }}>
              <span className="section-eyebrow">Our Vision</span>
              <h2 style={{ margin: '0 0 0.65rem' }}>Empowerment &amp; Dignity for All</h2>
              <p style={{ margin: 0, color: 'var(--charcoal)' }}>{siteContent.vision}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={90}>
            <div className="card" style={{ padding: '1.85rem', height: '100%' }}>
              <span className="section-eyebrow">Our Mission</span>
              <h2 style={{ margin: '0 0 0.65rem' }}>Verify, Empower, Sustain</h2>
              <p style={{ margin: 0, color: 'var(--charcoal-muted)' }}>{siteContent.mission}</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section section-sand">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Core Pillars</span>
            <h2 className="section-title">Key Welfare &amp; Empowerment Programs</h2>
          </div>

          <div className="grid-3">
            {[
              {
                title: 'Women Rights, Entrepreneurship & FPO',
                desc: 'Legal & Advocacy Center for Women, IBM Vocational Training (Fashion Designing, Hospitality, IT), and Women Farmer Producer Organization (FPO).'
              },
              {
                title: 'Child Welfare, Rights & Education',
                desc: 'Supporting physical health, emotional well-being, social adaptation, and distributing school notebooks and stationery kits.'
              },
              {
                title: 'ThisaiGal Relief Funds & Conservation',
                desc: '80G-exempt financial aid for medical treatments, accidents, and disaster victims alongside women- and child-led environmental protection.'
              }
            ].map((item) => (
              <div key={item.title} className="card" style={{ padding: '1.65rem' }}>
                <h3 style={{ margin: '0 0 0.55rem' }}>{item.title}</h3>
                <p style={{ margin: 0, color: 'var(--charcoal-muted)', fontSize: '0.94rem' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Official Activity Brochure</span>
            <h2 className="section-title">The Activities of ThisaiGal</h2>
            <p className="section-subtitle">
              Official program documentation from our Administrative Office at {siteContent.contact.address}.
            </p>
          </div>

          <div className="grid-2">
            <div className="card" style={{ overflow: 'hidden' }}>
              <img
                src="/assets/images/thisaigal/Activity_Report_Page1.jpeg"
                alt="ThisaiGal Foundation Activity Report Page 1"
                loading="lazy"
              />
            </div>
            <div className="card" style={{ overflow: 'hidden' }}>
              <img
                src="/assets/images/thisaigal/Activity_Report_Page2.jpeg"
                alt="ThisaiGal Foundation Activity Report Page 2"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section section-sand">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Program Desks</span>
            <h2 className="section-title">Foundation Teams &amp; Desks</h2>
          </div>

          <div className="grid-4">
            {siteContent.teamMembers.map((member) => (
              <div key={member.id || member.name} className="card" style={{ padding: '1.4rem', textAlign: 'center' }}>
                <div
                  className="avatar-circle"
                  style={{ margin: '0 auto 0.9rem', width: '58px', height: '58px' }}
                >
                  {member.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .slice(0, 2)}
                </div>
                <h3 style={{ margin: '0 0 0.25rem', fontSize: '1.05rem' }}>{member.name}</h3>
                <div style={{ fontSize: '0.83rem', color: 'var(--earth)', fontWeight: 600, marginBottom: '0.6rem' }}>
                  {member.role}
                </div>
                <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--charcoal-muted)' }}>{member.bio}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link to="/transparency" className="btn btn-primary">
              View Transparency &amp; Section 80G Details
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
