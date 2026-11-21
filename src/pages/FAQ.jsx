import React from 'react';

const questions = [
  ['How does ThisaiGal verify a support request?', 'Our coordinators review the request, speak with the family or institution, check supporting records, and publish only consented cases that meet our verification standards.'],
  ['How can I donate or offer material support?', 'Use the Donate button or submit a willingness-to-help form. A coordinator will contact you with verified direct-transfer or material drop-off details.'],
  ['Can I volunteer with the Foundation?', 'Yes. You can join elderly care, food and ration drives, education mentoring, or sapling and green drives through the volunteer form on the homepage.'],
  ['How do I request assistance?', 'Submit a confidential request through Request Assistance. The verification desk will review your need and contact you for the next steps.'],
  ['Are contributions eligible for 80G benefits?', 'ThisaiGal Foundation presents eligible contributions and supporting records transparently. Please contact the Trust office for the latest documentation applicable to your contribution.'],
  ['Where can I see how support is used?', 'Visit Transparency & Reports to review verified outcomes, contribution records, and published community impact information.']
];

export default function FAQ() {
  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <h1>Frequently Asked Questions</h1>
          <p>Clear answers about support requests, donations, volunteering, and accountability.</p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: '850px' }}>
          <div style={{ display: 'grid', gap: '0.85rem' }}>
            {questions.map(([question, answer]) => (
              <details key={question} className="card" style={{ padding: '1.2rem 1.35rem' }}>
                <summary style={{ cursor: 'pointer', color: 'var(--forest-deep)', fontWeight: 700 }}>{question}</summary>
                <p style={{ margin: '0.8rem 0 0', color: 'var(--charcoal-muted)' }}>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
