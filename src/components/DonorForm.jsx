import React, { useState, useEffect } from 'react';
import { useTrust } from '../context/TrustContext';
import { SUPPORT_TYPES } from '../data/mockRequests';
import NotificationMessage from './NotificationMessage';

export default function DonorForm({ preselectedRequestId = '' }) {
  const { requests, submitContributionPledge, currentUser } = useTrust();
  const activeRequests = requests.filter(
    (r) => r.isPublished && r.status !== 'Completed' && r.status !== 'Rejected'
  );

  const [form, setForm] = useState({
    donorName: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: '',
    requestId: preselectedRequestId || (activeRequests[0]?.id || ''),
    supportType: SUPPORT_TYPES[0],
    amount: '',
    message: '',
    publicAck: true
  });

  const [errors, setErrors] = useState({});
  const [submittedPledge, setSubmittedPledge] = useState(null);

  useEffect(() => {
    if (preselectedRequestId) {
      setForm((prev) => ({ ...prev, requestId: preselectedRequestId }));
    }
  }, [preselectedRequestId]);

  const validate = () => {
    const next = {};
    if (!form.donorName.trim()) next.donorName = 'Please enter your name.';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) {
      next.email = 'Please enter a valid email address.';
    }
    if (!form.phone.trim() || form.phone.replace(/\D/g, '').length < 10) {
      next.phone = 'Please enter a valid 10-digit phone number.';
    }
    if (!form.requestId) next.requestId = 'Please select a request to support.';
    if (form.amount && Number(form.amount) <= 0) {
      next.amount = 'Contribution amount must be greater than zero.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const saved = submitContributionPledge(form);
    setSubmittedPledge(saved);
    setForm((prev) => ({ ...prev, amount: '', message: '' }));
  };

  return (
    <div className="card" style={{ padding: '1.75rem' }} id="help-form">
      <h3 style={{ margin: '0 0 0.35rem' }}>Submit Your Willingness to Help</h3>
      <p style={{ margin: '0 0 1.25rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
        This form records your support pledge with our Trust team. No online payment is processed here; our
        coordinator will contact you with verified direct-transfer or material drop-off details.
      </p>

      {submittedPledge && (
        <NotificationMessage
          type="success"
          message={
            <>
              <strong>Thank you, {submittedPledge.donorName}!</strong> Your willingness to help (Ref:{' '}
              <strong>{submittedPledge.id}</strong>) has been recorded as{' '}
              <strong>Pending Verification</strong>. Our trust coordinator will reach out shortly to coordinate
              verified assistance.
            </>
          }
          onClose={() => setSubmittedPledge(null)}
        />
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid-2">
          <div className="form-group">
            <label className="form-label" htmlFor="donorName">
              Donor Name <span className="form-required">*</span>
            </label>
            <input
              id="donorName"
              className="form-control"
              value={form.donorName}
              onChange={(e) => setForm({ ...form, donorName: e.target.value })}
              placeholder="Your full name"
            />
            {errors.donorName && <span className="form-error">{errors.donorName}</span>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="donorEmail">
              Email <span className="form-required">*</span>
            </label>
            <input
              id="donorEmail"
              type="email"
              className="form-control"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
            />
            {errors.email && <span className="form-error">{errors.email}</span>}
          </div>
        </div>

        <div className="grid-2">
          <div className="form-group">
            <label className="form-label" htmlFor="donorPhone">
              Phone Number <span className="form-required">*</span>
            </label>
            <input
              id="donorPhone"
              type="tel"
              className="form-control"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="+91 98765 43210"
            />
            {errors.phone && <span className="form-error">{errors.phone}</span>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="selectedRequest">
              Selected Request <span className="form-required">*</span>
            </label>
            <select
              id="selectedRequest"
              className="form-control"
              value={form.requestId}
              onChange={(e) => setForm({ ...form, requestId: e.target.value })}
            >
              <option value="">-- Select a verified request --</option>
              {activeRequests.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.displayName} — {r.category} ({r.id})
                </option>
              ))}
            </select>
            {errors.requestId && <span className="form-error">{errors.requestId}</span>}
          </div>
        </div>

        <div className="grid-2">
          <div className="form-group">
            <label className="form-label" htmlFor="supportType">
              Type of Assistance <span className="form-required">*</span>
            </label>
            <select
              id="supportType"
              className="form-control"
              value={form.supportType}
              onChange={(e) => setForm({ ...form, supportType: e.target.value })}
            >
              {SUPPORT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="contributionAmount">
              Contribution Amount (₹, if applicable)
            </label>
            <input
              id="contributionAmount"
              type="number"
              min="1"
              className="form-control"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              placeholder="Optional for material/item support"
            />
            {errors.amount && <span className="form-error">{errors.amount}</span>}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="donorMessage">
            Message of Support (Optional)
          </label>
          <textarea
            id="donorMessage"
            rows="3"
            className="form-control"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Share a note of encouragement or specify items you can provide..."
          />
        </div>

        <label style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
          <input
            type="checkbox"
            checked={form.publicAck}
            onChange={(e) => setForm({ ...form, publicAck: e.target.checked })}
          />
          I agree to have my name publicly acknowledged once my contribution is verified by the Trust.
        </label>

        <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
          Submit Willingness to Help
        </button>
      </form>
    </div>
  );
}
