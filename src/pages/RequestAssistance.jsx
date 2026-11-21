import React from 'react';
import AssistanceRequestForm from '../components/AssistanceRequestForm';

export default function RequestAssistance() {
  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <h1>Request Assistance</h1>
          <p>
            If you or your family are facing a medical emergency, financial hardship, or educational
            need, submit your details confidentially for verification by our Trust team.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <AssistanceRequestForm />
        </div>
      </section>
    </div>
  );
}
