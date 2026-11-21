import React from 'react';

export default function LegalPage({ type }) {
  const isPrivacy = type === 'privacy';

  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <h1>{isPrivacy ? 'Privacy Policy' : 'Terms & Conditions'}</h1>
          <p>
            {isPrivacy
              ? 'How TrustConnect safeguards beneficiary dignity, medical records, and supporter data.'
              : 'Guidelines for submitting assistance requests, pledging support, and using TrustConnect.'}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container card" style={{ maxWidth: '820px', padding: '2rem' }}>
          {isPrivacy ? (
            <>
              <h3>1. Beneficiary Privacy &amp; Consent</h3>
              <p>
                Private phone numbers, residential street addresses, and sensitive medical reports are
                never published on public pages. Display names, summaries, and redacted verification
                statuses are published only after explicit beneficiary consent.
              </p>
              <h3>2. Contributor Data Protection</h3>
              <p>
                Donor contact details are used solely by authorized Trust coordinators to verify and
                acknowledge assistance. Supporters may choose anonymous acknowledgment at any time.
              </p>
            </>
          ) : (
            <>
              <h3>1. Verification Before Publication</h3>
              <p>
                Submitting an assistance request does not guarantee immediate publication. All
                requests undergo document and field verification by TrustConnect administrators.
              </p>
              <h3>2. Willingness to Help vs. Verified Contributions</h3>
              <p>
                Publicly submitted support pledges are recorded as Pending Verification until the Trust
                confirms receipt or direct settlement with the hospital, school, or vendor.
              </p>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
