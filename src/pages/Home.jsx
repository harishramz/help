import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTrust } from '../context/TrustContext';
import HeroSection from '../components/HeroSection';
import ScrollReveal from '../components/ScrollReveal';
import StatisticsCards from '../components/StatisticsCards';
import HelpRequestCard from '../components/HelpRequestCard';
import SuccessStoryCard from '../components/SuccessStoryCard';
import DonorForm from '../components/DonorForm';
import NotificationMessage from '../components/NotificationMessage';

export default function Home() {
  const { requests, stories, activities, siteContent, impactStats, registerVolunteer } = useTrust();
  const [volForm, setVolForm] = useState({ name: '', email: '', interest: 'Elderly Care & Camps' });
  const [volSuccess, setVolSuccess] = useState(false);

  const urgentRequests = requests
    .filter((r) => r.isPublished && r.status !== 'Completed' && r.status !== 'Rejected')
    .slice(0, 3);

  const publishedStories = stories.filter((s) => s.isPublished).slice(0, 2);
  const recentActivities = activities.filter((a) => a.isPublished).slice(0, 3);

  const handleVolunteerSubmit = (e) => {
    e.preventDefault();
    if (!volForm.name.trim() || !volForm.email.trim()) return;
    registerVolunteer(volForm);
    setVolSuccess(true);
    setVolForm({ name: '', email: '', interest: 'Elderly Care & Camps' });
  };

  return (
    <div>
      {/* Section 01 — Hero */}
      <HeroSection stats={impactStats} />

      {/* Calm, image-led campaign banners */}
      <section className="home-banners" aria-label="Foundation campaigns">
        <div className="container">
          <div className="home-banners-heading">
            <span className="section-eyebrow">Together, We Can</span>
            <h2 className="section-title">Small acts. Stronger communities.</h2>
            <p className="section-subtitle">
              Explore the people-first work your support makes possible across Villuppuram and beyond.
            </p>
          </div>
          <div className="banner-grid">
            <Link to="/activities" className="campaign-banner campaign-banner-tall">
              <img src="/assets/images/thisaigal/thisaigal_women_rights_campaign.jpeg" alt="Women participating in an empowerment campaign" />
              <span className="campaign-banner-overlay" />
              <span className="campaign-banner-copy">
                <small>Women’s empowerment</small>
                <strong>Her voice. Her choices. Her future.</strong>
                <span>Discover our advocacy work →</span>
              </span>
            </Link>
            <Link to="/activities" className="campaign-banner">
              <img src="/assets/images/thisaigal/thisaigal_children_kits.jpeg" alt="Children receiving education support kits" />
              <span className="campaign-banner-overlay" />
              <span className="campaign-banner-copy">
                <small>Child welfare</small>
                <strong>Give every child room to learn.</strong>
                <span>See education initiatives →</span>
              </span>
            </Link>
            <Link to="/activities" className="campaign-banner">
              <img src="/assets/images/thisaigal/thisaigal_community_outreach1.jpeg" alt="Foundation volunteers supporting a local community" />
              <span className="campaign-banner-overlay" />
              <span className="campaign-banner-copy">
                <small>Community care</small>
                <strong>Hope grows when we show up.</strong>
                <span>Join a local drive →</span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Section 02 — About Our Trust */}
      <section className="section">
        <div className="container grid-2" style={{ alignItems: 'center', gap: '3rem' }}>
          <ScrollReveal>
            <span className="section-eyebrow">About Our Trust</span>
            <h2 className="section-title">Grounded in Humanity, Guided by Accountability</h2>
            <p style={{ color: 'var(--charcoal-muted)', fontSize: '1.04rem', marginBottom: '1.25rem' }}>
              {siteContent.aboutIntro}
            </p>
            <div style={{ display: 'grid', gap: '1rem', marginBottom: '1.5rem' }}>
              <div className="card" style={{ padding: '1.15rem', background: 'var(--sand)' }}>
                <strong style={{ color: 'var(--forest-deep)' }}>Our Vision:</strong>{' '}
                <span style={{ color: 'var(--charcoal)' }}>{siteContent.vision}</span>
              </div>
              <div className="card" style={{ padding: '1.15rem' }}>
                <strong style={{ color: 'var(--forest-deep)' }}>Our Mission:</strong>{' '}
                <span style={{ color: 'var(--charcoal-muted)' }}>{siteContent.mission}</span>
              </div>
            </div>
            <Link to="/about" className="btn btn-outline">
              Read Our Story &amp; Governance &rarr;
            </Link>
          </ScrollReveal>

          <ScrollReveal delay={120}>
            <div className="image-reveal-frame" style={{ height: '440px', boxShadow: 'var(--shadow-lg)' }}>
              <img
                src="/assets/images/elderly-care/elderly-care-support.jpg"
                alt="Caregiver holding hands with an elderly woman in a sunlit courtyard"
                loading="lazy"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Section 03 — Our Mission (Sticky Storytelling) */}
      <section className="section section-forest">
        <div className="container sticky-mission-grid">
          <div className="sticky-media-column">
            <span className="section-eyebrow">Our Mission in Action</span>
            <h2 className="section-title">How Every Verified Case Moves From Need to Hope</h2>
            <p className="section-subtitle" style={{ marginBottom: '1.75rem' }}>
              Scroll through our three-stage verification and direct support process.
            </p>
            <div className="image-reveal-frame" style={{ height: '320px', border: '1px solid rgba(168,185,161,0.25)' }}>
              <img
                src="/assets/images/children/children-education.jpg"
                alt="School children reading books together under a shaded tree"
                loading="lazy"
              />
            </div>
          </div>

          <div>
            {(siteContent.missionChapters || []).map((chap) => (
              <ScrollReveal key={chap.step}>
                <div className="mission-chapter">
                  <div className="mission-chapter-num">Chapter {chap.step}</div>
                  <h3 style={{ margin: '0 0 0.65rem', fontSize: '1.55rem' }}>{chap.title}</h3>
                  <p style={{ margin: '0 0 1.25rem', color: 'rgba(247,245,239,0.84)' }}>
                    {chap.description}
                  </p>
                  <div className="image-reveal-frame" style={{ height: '220px' }}>
                    <img src={chap.image} alt={chap.title} loading="lazy" />
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Section 04 — Areas of Care */}
      <section className="section section-sand">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Areas of Care</span>
            <h2 className="section-title">Supporting Dignity Across Every Stage of Life</h2>
            <p className="section-subtitle">
              Focused humanitarian programs for elderly residents, children, families, and urgent medical care.
            </p>
          </div>

          <div className="grid-4">
            {(siteContent.areasOfCare || []).map((area, idx) => (
              <ScrollReveal key={area.id} delay={idx * 70}>
                <article className="care-card" style={{ height: '100%' }}>
                  <div className="care-card-media">
                    <img src={area.image} alt={area.title} loading="lazy" />
                  </div>
                  <div className="care-card-body">
                    <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.18rem' }}>{area.title}</h3>
                    <p style={{ margin: '0 0 1.15rem', fontSize: '0.9rem', color: 'var(--charcoal-muted)', flex: 1 }}>
                      {area.description}
                    </p>
                    <Link to="/requests" className="btn btn-outline-green btn-sm">
                      Explore Cases &rarr;
                    </Link>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Section 05 — Our Initiatives & Active Help Requests */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Active Cases &amp; Initiatives</span>
            <h2 className="section-title">Verified Requests Awaiting Your Support</h2>
            <p className="section-subtitle">
              Each request below has been field-checked by TrustConnect coordinators and published with consent.
            </p>
          </div>

          <div className="grid-3">
            {urgentRequests.map((req, idx) => (
              <ScrollReveal key={req.id} delay={idx * 80}>
                <HelpRequestCard request={req} />
              </ScrollReveal>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem', display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/requests" className="btn btn-primary btn-lg">
              View All Help Requests
            </Link>
            <Link to="/activities" className="btn btn-outline btn-lg">
              See Trust Activities ({recentActivities.length})
            </Link>
          </div>
        </div>
      </section>

      {/* Section 06 — Impact & Change */}
      <section className="section section-sand">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Impact &amp; Change</span>
            <h2 className="section-title">Transparent, Verified Community Outcomes</h2>
            <p className="section-subtitle">
              Every figure reflects confirmed assistance delivered and verified contributor receipts.
            </p>
          </div>
          <ScrollReveal>
            <StatisticsCards stats={impactStats} />
          </ScrollReveal>
        </div>
      </section>

      {/* Section 07 — Stories of Humanity */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Stories of Humanity</span>
            <h2 className="section-title">Together, We Changed Lives.</h2>
            <p className="section-subtitle">
              Real outcomes published only with beneficiary consent and verified completion receipts.
            </p>
          </div>

          <div className="grid-2">
            {publishedStories.map((story) => (
              <ScrollReveal key={story.id}>
                <SuccessStoryCard story={story} />
              </ScrollReveal>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.25rem' }}>
            <Link to="/success-stories" className="btn btn-outline">
              Read All Success Stories &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Section 08 & 09 — Get Involved & Donation Experience */}
      <section className="section section-sand" id="get-involved">
        <div className="container grid-2" style={{ alignItems: 'start', gap: '2.5rem' }}>
          <ScrollReveal>
            <span className="section-eyebrow">Get Involved</span>
            <h2 className="section-title">Stand With a Family or Volunteer Your Time</h2>
            <p style={{ color: 'var(--charcoal-muted)', marginBottom: '1.5rem' }}>
              Support a verified request directly, pledge essential supplies, or join our weekend
              community drives. No fake payment gateways — our coordinator contacts you with verified
              direct settlement details.
            </p>

            <div className="image-reveal-frame get-involved-images" style={{ height: '240px', marginBottom: '1.5rem' }}>
              <img
                src="/assets/images/thisaigal/thisaigal_community_outreach2.jpeg"
                alt="ThisaiGal team members supporting a community outreach programme"
                loading="lazy"
              />
              <img
                src="/assets/images/thisaigal/thisaigal_yuva_samvad.jpeg"
                alt="Young people participating in a ThisaiGal community discussion"
                loading="lazy"
              />
            </div>

            <form className="card" style={{ padding: '1.5rem' }} onSubmit={handleVolunteerSubmit}>
              <h3 style={{ margin: '0 0 0.85rem', fontSize: '1.2rem' }}>Volunteer With Us</h3>
              {volSuccess && (
                <NotificationMessage
                  type="success"
                  message="Thank you! Our volunteer coordinator will reach out shortly."
                  onClose={() => setVolSuccess(false)}
                />
              )}
              <div className="grid-2">
                <div className="form-group">
                  <input
                    className="form-control"
                    placeholder="Your Full Name"
                    required
                    value={volForm.name}
                    onChange={(e) => setVolForm({ ...volForm, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email Address"
                    required
                    value={volForm.email}
                    onChange={(e) => setVolForm({ ...volForm, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="form-group">
                <select
                  className="form-control"
                  value={volForm.interest}
                  onChange={(e) => setVolForm({ ...volForm, interest: e.target.value })}
                >
                  <option>Elderly Care &amp; Camps</option>
                  <option>Food &amp; Ration Drives</option>
                  <option>Education Mentoring</option>
                  <option>Sapling &amp; Green Drives</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                Join as a Volunteer
              </button>
            </form>
          </ScrollReveal>

          <ScrollReveal delay={120}>
            <DonorForm />
          </ScrollReveal>
        </div>
      </section>

      {/* Section 10 — Environmental Responsibility */}
      <section className="section env-section">
        <div className="env-bg-media">
          <img
            src="/assets/images/nature/forest-background.jpg"
            alt="Sunlit forest canopy representing environmental stewardship"
            loading="lazy"
          />
        </div>
        <div className="container env-content">
          <div className="grid-2" style={{ alignItems: 'center', gap: '3rem' }}>
            <ScrollReveal>
              <span className="section-eyebrow">Environmental Responsibility</span>
              <h2 className="section-title">Caring for People Means Caring for the Earth</h2>
              <p style={{ color: 'rgba(247,245,239,0.86)', marginBottom: '1.5rem' }}>
                Every community food drive and relief camp is designed to minimize single-use plastic
                and nurture greener neighborhoods.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.85rem' }}>
                {(siteContent.environmentalCommitments || []).map((item, idx) => (
                  <li key={idx} style={{ display: 'flex', gap: '0.65rem', alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--sage)', fontWeight: 700 }}>&#10003;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            <ScrollReveal delay={120}>
              <div className="card" style={{ padding: '2rem', background: 'rgba(247,245,239,0.95)', color: 'var(--charcoal)' }}>
                <h3 style={{ margin: '0 0 0.65rem' }}>Need Direct Assistance?</h3>
                <p style={{ margin: '0 0 1.25rem', color: 'var(--charcoal-muted)' }}>
                  If you or someone in your neighborhood needs medical, food, elderly, or educational
                  support, submit a confidential request to our verification desk.
                </p>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <Link to="/request-assistance" className="btn btn-primary">
                    Submit Assistance Request
                  </Link>
                  <Link to="/contact" className="btn btn-outline">
                    Contact Trust Office
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
