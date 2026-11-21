import React, { useState } from 'react';
import { useTrust } from '../context/TrustContext';
import NotificationMessage from '../components/NotificationMessage';

export default function ManageContent() {
  const {
    siteContent,
    volunteers,
    updateSiteContent,
    addTeamMember,
    deleteTeamMember,
    addAreaOfCare,
    deleteAreaOfCare,
    addAnnualReport,
    deleteAnnualReport,
    deleteVolunteer
  } = useTrust();

  const [form, setForm] = useState({
    homeAnnouncement: siteContent.homeAnnouncement,
    urgentBannerText: siteContent.urgentBannerText,
    aboutIntro: siteContent.aboutIntro,
    vision: siteContent.vision,
    mission: siteContent.mission,
    phone: siteContent.contact.phone,
    email: siteContent.contact.email,
    address: siteContent.contact.address
  });

  const [newMember, setNewMember] = useState({ name: '', role: '', bio: '' });
  const [newArea, setNewArea] = useState({ title: '', categoryFilter: '', description: '' });
  const [newReport, setNewReport] = useState({ year: '', title: '', casesFulfilled: '' });
  const [notice, setNotice] = useState('');

  const handleSaveGeneral = (e) => {
    e.preventDefault();
    updateSiteContent({
      homeAnnouncement: form.homeAnnouncement,
      urgentBannerText: form.urgentBannerText,
      aboutIntro: form.aboutIntro,
      vision: form.vision,
      mission: form.mission,
      contact: {
        ...siteContent.contact,
        phone: form.phone,
        email: form.email,
        address: form.address
      }
    });
    setNotice('General website content, announcements, and contact details updated.');
  };

  const handleAddMember = (e) => {
    e.preventDefault();
    if (!newMember.name.trim() || !newMember.role.trim()) return;
    addTeamMember(newMember);
    setNewMember({ name: '', role: '', bio: '' });
    setNotice('Team member added.');
  };

  const handleAddArea = (e) => {
    e.preventDefault();
    if (!newArea.title.trim()) return;
    addAreaOfCare(newArea);
    setNewArea({ title: '', categoryFilter: '', description: '' });
    setNotice('Area of Care added to homepage.');
  };

  const handleAddReport = (e) => {
    e.preventDefault();
    if (!newReport.year.trim() || !newReport.title.trim()) return;
    addAnnualReport({ ...newReport, casesFulfilled: Number(newReport.casesFulfilled || 0) });
    setNewReport({ year: '', title: '', casesFulfilled: '' });
    setNotice('Annual Impact Report added.');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', maxWidth: '920px' }}>
      {notice && <NotificationMessage type="success" message={notice} onClose={() => setNotice('')} />}

      {/* General Settings */}
      <form className="card" style={{ padding: '1.75rem' }} onSubmit={handleSaveGeneral}>
        <h2 style={{ margin: '0 0 1rem' }}>Announcements, Mission &amp; Contact Info</h2>
        <div className="form-group">
          <label className="form-label">Top Navigation Announcement Strip</label>
          <input className="form-control" value={form.homeAnnouncement} onChange={(e) => setForm({ ...form, homeAnnouncement: e.target.value })} />
        </div>
        <div className="form-group">
          <label className="form-label">Urgent Help Banner Text</label>
          <input className="form-control" value={form.urgentBannerText} onChange={(e) => setForm({ ...form, urgentBannerText: e.target.value })} />
        </div>
        <div className="form-group">
          <label className="form-label">About Us Introduction</label>
          <textarea rows="2" className="form-control" value={form.aboutIntro} onChange={(e) => setForm({ ...form, aboutIntro: e.target.value })} />
        </div>
        <div className="grid-2">
          <div className="form-group">
            <label className="form-label">Vision Statement</label>
            <textarea rows="2" className="form-control" value={form.vision} onChange={(e) => setForm({ ...form, vision: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Mission Statement</label>
            <textarea rows="2" className="form-control" value={form.mission} onChange={(e) => setForm({ ...form, mission: e.target.value })} />
          </div>
        </div>
        <div className="grid-2">
          <div className="form-group">
            <label className="form-label">Office Phone</label>
            <input className="form-control" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Support Email</label>
            <input className="form-control" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Office Address</label>
          <input className="form-control" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
        </div>
        <button type="submit" className="btn btn-primary btn-sm">Save General Content</button>
      </form>

      {/* Areas of Care (Add & Delete) */}
      <div className="card" style={{ padding: '1.75rem' }}>
        <h2 style={{ margin: '0 0 1rem' }}>Areas of Care (Add / Delete)</h2>
        <form className="grid-3" style={{ marginBottom: '1.25rem', alignItems: 'end' }} onSubmit={handleAddArea}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Program Title</label>
            <input className="form-control" required value={newArea.title} onChange={(e) => setNewArea({ ...newArea, title: e.target.value })} />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Description</label>
            <input className="form-control" required value={newArea.description} onChange={(e) => setNewArea({ ...newArea, description: e.target.value })} />
          </div>
          <button type="submit" className="btn btn-primary btn-sm">+ Add Area of Care</button>
        </form>
        <div style={{ display: 'grid', gap: '0.6rem' }}>
          {(siteContent.areasOfCare || []).map((area) => (
            <div key={area.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem 0.9rem', background: 'var(--ivory)', borderRadius: 'var(--radius-sm)' }}>
              <div>
                <strong>{area.title}</strong> — <span style={{ fontSize: '0.86rem', color: 'var(--charcoal-muted)' }}>{area.description}</span>
              </div>
              <button type="button" className="btn btn-danger btn-sm" onClick={() => deleteAreaOfCare(area.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>

      {/* Team Members (Add & Delete) */}
      <div className="card" style={{ padding: '1.75rem' }}>
        <h2 style={{ margin: '0 0 1rem' }}>Trust Members &amp; Team (Add / Delete)</h2>
        <form className="grid-3" style={{ marginBottom: '1.25rem', alignItems: 'end' }} onSubmit={handleAddMember}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Name</label>
            <input className="form-control" required value={newMember.name} onChange={(e) => setNewMember({ ...newMember, name: e.target.value })} />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Role</label>
            <input className="form-control" required value={newMember.role} onChange={(e) => setNewMember({ ...newMember, role: e.target.value })} />
          </div>
          <button type="submit" className="btn btn-primary btn-sm">+ Add Team Member</button>
        </form>
        <div style={{ display: 'grid', gap: '0.6rem' }}>
          {siteContent.teamMembers.map((m) => (
            <div key={m.id || m.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem 0.9rem', background: 'var(--ivory)', borderRadius: 'var(--radius-sm)' }}>
              <div>
                <strong>{m.name}</strong> · <span style={{ fontSize: '0.86rem', color: 'var(--charcoal-muted)' }}>{m.role}</span>
              </div>
              <button type="button" className="btn btn-danger btn-sm" onClick={() => deleteTeamMember(m.id || m.name)}>Delete</button>
            </div>
          ))}
        </div>
      </div>

      {/* Annual Impact Reports (Add & Delete) */}
      <div className="card" style={{ padding: '1.75rem' }}>
        <h2 style={{ margin: '0 0 1rem' }}>Annual Impact Reports (Add / Delete)</h2>
        <form className="grid-3" style={{ marginBottom: '1.25rem', alignItems: 'end' }} onSubmit={handleAddReport}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Year (e.g., 2026–2027)</label>
            <input className="form-control" required value={newReport.year} onChange={(e) => setNewReport({ ...newReport, year: e.target.value })} />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Report Title</label>
            <input className="form-control" required value={newReport.title} onChange={(e) => setNewReport({ ...newReport, title: e.target.value })} />
          </div>
          <button type="submit" className="btn btn-primary btn-sm">+ Add Report</button>
        </form>
        <div style={{ display: 'grid', gap: '0.6rem' }}>
          {siteContent.annualReports.map((rep) => (
            <div key={rep.id || rep.year} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem 0.9rem', background: 'var(--ivory)', borderRadius: 'var(--radius-sm)' }}>
              <div>
                <strong>{rep.year}</strong> — {rep.title}
              </div>
              <button type="button" className="btn btn-danger btn-sm" onClick={() => deleteAnnualReport(rep.id || rep.year)}>Delete</button>
            </div>
          ))}
        </div>
      </div>

      {/* Registered Volunteers (Delete) */}
      {volunteers.length > 0 && (
        <div className="card" style={{ padding: '1.75rem' }}>
          <h2 style={{ margin: '0 0 1rem' }}>Volunteer Registrations</h2>
          <div style={{ display: 'grid', gap: '0.6rem' }}>
            {volunteers.map((v) => (
              <div key={v.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem 0.9rem', background: 'var(--ivory)', borderRadius: 'var(--radius-sm)' }}>
                <div>
                  <strong>{v.name}</strong> ({v.email}) · {v.interest}
                </div>
                <button type="button" className="btn btn-danger btn-sm" onClick={() => deleteVolunteer(v.id)}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
