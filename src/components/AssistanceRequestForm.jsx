import React, { useState } from 'react';
import { REQUEST_CATEGORIES } from '../data/mockRequests';
import { useTrust } from '../context/TrustContext';
import StatusBadge from './StatusBadge';
import NotificationMessage from './NotificationMessage';

export default function AssistanceRequestForm() {
  const { submitDirectRequest } = useTrust();

  const [form, setForm] = useState({
    fullName: '',
    age: '',
    phone: '',
    email: '',
    address: '',
    district: '',
    category: REQUEST_CATEGORIES[0],
    situation: '',
    whyNeeded: '',
    helpType: '',
    requiredAmount: '',
    familyMembers: '',
    supportingDocName: '',
    medicalReportName: '',
    otherDocName: '',
    consentGiven: false
  });

  const [errors, setErrors] = useState({});
  const [submittedRecord, setSubmittedRecord] = useState(null);

  const validate = () => {
    const next = {};
    if (!form.fullName.trim()) next.fullName = 'Full name is required.';
    if (!form.age || Number(form.age) < 1 || Number(form.age) > 120) next.age = 'Enter a valid age.';
    if (!form.phone.trim() || form.phone.replace(/\D/g, '').length < 10) {
      next.phone = 'Enter a valid 10-digit phone number.';
    }
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) next.email = 'Enter a valid email address.';
    if (!form.address.trim()) next.address = 'Address is required for field verification.';
    if (!form.district.trim()) next.district = 'District is required.';
    if (!form.situation.trim() || form.situation.trim().length < 20) {
      next.situation = 'Please describe your situation (at least 20 characters).';
    }
    if (!form.whyNeeded.trim()) next.whyNeeded = 'Please explain why you need help.';
    if (!form.helpType.trim()) next.helpType = 'Please specify the type of help required.';
    if (!form.consentGiven) {
      next.consentGiven = 'Consent is required so our trust team can review your request.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleFileChange = (field) => (e) => {
    const file = e.target.files?.[0];
    setForm((prev) => ({ ...prev, [field]: file ? file.name : '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const docs = [form.supportingDocName, form.medicalReportName, form.otherDocName].filter(Boolean);
    const saved = submitDirectRequest({
      fullName: form.fullName,
      age: Number(form.age),
      phone: form.phone,
      email: form.email,
      address: form.address,
      district: form.district,
      category: form.category,
      situation: form.situation,
      whyNeeded: form.whyNeeded,
      helpType: form.helpType,
      requiredAmount: form.requiredAmount ? Number(form.requiredAmount) : 0,
      familyMembers: form.familyMembers ? Number(form.familyMembers) : 1,
      documents: docs.length ? docs : ['Pending document submission during call'],
      consentGiven: form.consentGiven
    });
    setSubmittedRecord(saved);
  };

  if (submittedRecord) {
    return (
      <div className="card" style={{ padding: '2rem', maxWidth: '720px', margin: '0 auto' }}>
        <NotificationMessage
          type="success"
          message="Your request has been submitted successfully. Our trust team will review your information and contact you."
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Reference ID</div>
            <strong style={{ fontSize: '1.2rem' }}>{submittedRecord.id}</strong>
          </div>
          <StatusBadge status={submittedRecord.status} />
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Your personal phone number, home address, and uploaded documents are kept strictly confidential
          and will never be published publicly without your explicit approval.
        </p>
        <button
          type="button"
          className="btn btn-outline"
          onClick={() => {
            setSubmittedRecord(null);
            setForm({
              fullName: '',
              age: '',
              phone: '',
              email: '',
              address: '',
              district: '',
              category: REQUEST_CATEGORIES[0],
              situation: '',
              whyNeeded: '',
              helpType: '',
              requiredAmount: '',
              familyMembers: '',
              supportingDocName: '',
              medicalReportName: '',
              otherDocName: '',
              consentGiven: false
            });
          }}
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <form className="card" style={{ padding: '2rem', maxWidth: '860px', margin: '0 auto' }} onSubmit={handleSubmit} noValidate>
      <h2 style={{ margin: '0 0 0.35rem' }}>Personal Information</h2>
      <p style={{ margin: '0 0 1.25rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
        Private details (phone number, email, and street address) are visible only to authorized Trust reviewers.
      </p>

      <div className="grid-2">
        <div className="form-group">
          <label className="form-label" htmlFor="reqFullName">
            Full Name <span className="form-required">*</span>
          </label>
          <input
            id="reqFullName"
            className="form-control"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          />
          {errors.fullName && <span className="form-error">{errors.fullName}</span>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="reqAge">
            Age <span className="form-required">*</span>
          </label>
          <input
            id="reqAge"
            type="number"
            min="1"
            max="120"
            className="form-control"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
          />
          {errors.age && <span className="form-error">{errors.age}</span>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="reqPhone">
            Phone Number <span className="form-required">*</span>
          </label>
          <input
            id="reqPhone"
            type="tel"
            className="form-control"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          {errors.phone && <span className="form-error">{errors.phone}</span>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="reqEmail">
            Email <span className="form-required">*</span>
          </label>
          <input
            id="reqEmail"
            type="email"
            className="form-control"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          {errors.email && <span className="form-error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="reqAddress">
            Address <span className="form-required">*</span>
          </label>
          <input
            id="reqAddress"
            className="form-control"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
          {errors.address && <span className="form-error">{errors.address}</span>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="reqDistrict">
            District <span className="form-required">*</span>
          </label>
          <input
            id="reqDistrict"
            className="form-control"
            value={form.district}
            onChange={(e) => setForm({ ...form, district: e.target.value })}
          />
          {errors.district && <span className="form-error">{errors.district}</span>}
        </div>
      </div>

      <h2 style={{ margin: '1.5rem 0 0.75rem' }}>Request Information</h2>
      <div className="grid-2">
        <div className="form-group">
          <label className="form-label" htmlFor="reqCategory">
            Request Category <span className="form-required">*</span>
          </label>
          <select
            id="reqCategory"
            className="form-control"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            {REQUEST_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="reqHelpType">
            What Type of Help Do You Require? <span className="form-required">*</span>
          </label>
          <input
            id="reqHelpType"
            className="form-control"
            value={form.helpType}
            onChange={(e) => setForm({ ...form, helpType: e.target.value })}
            placeholder="e.g., Surgery medicines, school fees, dry groceries"
          />
          {errors.helpType && <span className="form-error">{errors.helpType}</span>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="reqAmount">
            Required Amount (₹, optional)
          </label>
          <input
            id="reqAmount"
            type="number"
            min="0"
            className="form-control"
            value={form.requiredAmount}
            onChange={(e) => setForm({ ...form, requiredAmount: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="reqFamilyMembers">
            Number of Family Members (optional)
          </label>
          <input
            id="reqFamilyMembers"
            type="number"
            min="1"
            className="form-control"
            value={form.familyMembers}
            onChange={(e) => setForm({ ...form, familyMembers: e.target.value })}
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="reqSituation">
          Describe Your Situation <span className="form-required">*</span>
        </label>
        <textarea
          id="reqSituation"
          rows="4"
          className="form-control"
          value={form.situation}
          onChange={(e) => setForm({ ...form, situation: e.target.value })}
          placeholder="Explain your current hardship and background..."
        />
        {errors.situation && <span className="form-error">{errors.situation}</span>}
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="reqWhy">
          Why Do You Need Help? <span className="form-required">*</span>
        </label>
        <textarea
          id="reqWhy"
          rows="3"
          className="form-control"
          value={form.whyNeeded}
          onChange={(e) => setForm({ ...form, whyNeeded: e.target.value })}
          placeholder="How will this support help you or your family recover?"
        />
        {errors.whyNeeded && <span className="form-error">{errors.whyNeeded}</span>}
      </div>

      <h2 style={{ margin: '1.5rem 0 0.75rem' }}>Supporting Information</h2>
      <div className="grid-3">
        <div className="form-group">
          <label className="form-label" htmlFor="docSupport">Upload Supporting Documents</label>
          <input id="docSupport" type="file" className="form-control" onChange={handleFileChange('supportingDocName')} />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="docMedical">Upload Medical Reports (if applicable)</label>
          <input id="docMedical" type="file" className="form-control" onChange={handleFileChange('medicalReportName')} />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="docOther">Upload Other Relevant Documents</label>
          <input id="docOther" type="file" className="form-control" onChange={handleFileChange('otherDocName')} />
        </div>
      </div>

      <div className="form-group">
        <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.9rem' }}>
          <input
            type="checkbox"
            checked={form.consentGiven}
            onChange={(e) => setForm({ ...form, consentGiven: e.target.checked })}
            style={{ marginTop: '0.25rem' }}
          />
          <span>
            I confirm the information provided is accurate and consent to TrustConnect verifying my
            documents confidentially. Only approved, non-sensitive summary details will be published.
          </span>
        </label>
        {errors.consentGiven && <span className="form-error">{errors.consentGiven}</span>}
      </div>

      <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
        Submit Request
      </button>
    </form>
  );
}
