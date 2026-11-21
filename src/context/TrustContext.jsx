import React, { createContext, useContext, useState, useMemo } from 'react';
import { mockRequests, mockDirectRequests } from '../data/mockRequests';
import { mockDonors, mockContributions } from '../data/mockDonors';
import { mockStories } from '../data/mockStories';
import { mockActivities } from '../data/mockActivities';
import { mockSiteContent } from '../data/mockSiteContent';

const TrustContext = createContext(null);

export function TrustProvider({ children }) {
  const [requests, setRequests] = useState(mockRequests);
  const [directRequests, setDirectRequests] = useState(mockDirectRequests);
  const [donors, setDonors] = useState(mockDonors);
  const [contributions, setContributions] = useState(mockContributions);
  const [stories, setStories] = useState(mockStories);
  const [activities, setActivities] = useState(mockActivities);
  const [siteContent, setSiteContent] = useState(mockSiteContent);

  const [currentUser, setCurrentUser] = useState(null);
  const [volunteers, setVolunteers] = useState([]);

  const impactStats = useMemo(() => {
    const verifiedContributions = contributions.filter(
      (c) => c.verificationStatus === 'Verified' || c.verificationStatus === 'Completed'
    );
    const totalDonationsReceived = verifiedContributions.reduce((sum, c) => sum + Number(c.amount || 0), 0);
    const completedRequestsCount = requests.filter((r) => r.status === 'Completed').length;
    const medicalCasesCount = requests.filter((r) => r.category === 'Medical Assistance').length;
    const familiesSupportedCount = requests.filter(
      (r) => r.status === 'Completed' || r.status === 'Partially Fulfilled' || r.status === 'Assistance in Progress'
    ).length;

    return {
      totalPeopleHelped: 184 + completedRequestsCount,
      totalFamiliesSupported: 96 + familiesSupportedCount,
      totalMedicalCases: 64 + medicalCasesCount,
      totalDonationsReceived: 1450000 + totalDonationsReceived,
      activeRequestsCount: requests.filter((r) => r.isPublished && r.status !== 'Completed' && r.status !== 'Rejected').length,
      completedRequestsCount: 142 + completedRequestsCount,
      verifiedContributorsCount: donors.filter((d) => d.verifiedDonor).length
    };
  }, [contributions, requests, donors]);

  // Public Action: Submit Direct Assistance Request
  const submitDirectRequest = (formData) => {
    const newSubmission = {
      id: `DIR-${300 + directRequests.length + Date.now() % 1000}`,
      ...formData,
      submittedDate: new Date().toISOString().slice(0, 10),
      status: 'Pending Verification'
    };
    setDirectRequests((prev) => [newSubmission, ...prev]);
    return newSubmission;
  };

  // Public Action: Submit Donor Willingness to Help (Pending Verification)
  const submitContributionPledge = (pledgeData) => {
    const targetReq = requests.find((r) => r.id === pledgeData.requestId);
    const newContribution = {
      id: `CON-${800 + contributions.length + Date.now() % 1000}`,
      donorId: currentUser?.role === 'donor' ? 'DON-USER' : `DON-${500 + donors.length + 1}`,
      donorName: pledgeData.donorName,
      donorEmail: pledgeData.email,
      donorPhone: pledgeData.phone,
      requestId: pledgeData.requestId,
      requestTitle: targetReq ? targetReq.title : 'General Trust Fund',
      supportType: pledgeData.supportType,
      amount: Number(pledgeData.amount || 0),
      message: pledgeData.message,
      date: new Date().toISOString().slice(0, 10),
      verificationStatus: 'Pending Verification',
      publicAck: Boolean(pledgeData.publicAck)
    };
    setContributions((prev) => [newContribution, ...prev]);

    if (!donors.some((d) => d.email.toLowerCase() === pledgeData.email.toLowerCase())) {
      setDonors((prev) => [
        {
          id: newContribution.donorId,
          name: pledgeData.donorName,
          email: pledgeData.email,
          phone: pledgeData.phone,
          city: 'Supporter',
          publicAck: Boolean(pledgeData.publicAck),
          verifiedDonor: false,
          joinedDate: newContribution.date
        },
        ...prev
      ]);
    }
    return newContribution;
  };

  // Admin: Help Requests (Add, Update, Delete)
  const addRequest = (reqData) => {
    const newReq = {
      id: `REQ-${1000 + requests.length + Date.now() % 1000}`,
      personId: `PER-${200 + requests.length + 1}`,
      avatarInitials: (reqData.displayName || 'TC')
        .split(' ')
        .map((w) => w[0])
        .join('')
        .slice(0, 2)
        .toUpperCase(),
      avatarColor: '#234B3D',
      amountReceived: 0,
      updates: [{ date: new Date().toISOString().slice(0, 10), note: 'Case created by Trust Admin.' }],
      supportingDocs: reqData.supportingDocs || [{ label: 'Trust Field Verification Record', verified: true }],
      ...reqData
    };
    setRequests((prev) => [newReq, ...prev]);
    return newReq;
  };

  const updateRequest = (id, patch) => {
    setRequests((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        const updated = { ...r, ...patch };
        if (updated.status === 'Completed') {
          updated.isUrgent = false;
          updated.completedDate = updated.completedDate || new Date().toISOString().slice(0, 10);
        }
        return updated;
      })
    );
  };

  const deleteRequest = (id) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
  };

  // Admin: Direct Requests (Update, Delete, Convert)
  const updateDirectRequestStatus = (id, status) => {
    setDirectRequests((prev) => prev.map((d) => (d.id === id ? { ...d, status } : d)));
  };

  const deleteDirectRequest = (id) => {
    setDirectRequests((prev) => prev.filter((d) => d.id !== id));
  };

  const convertDirectToPublicRequest = (directId) => {
    const item = directRequests.find((d) => d.id === directId);
    if (!item) return null;
    const filterMap = {
      'Medical Assistance': 'Medical',
      "Children's Education": 'Education',
      'Food Assistance': 'Food',
      'Emergency Support': 'Emergency'
    };
    const created = addRequest({
      displayName: item.fullName,
      fullName: item.fullName,
      age: item.age,
      consentGiven: item.consentGiven,
      category: item.category,
      filterGroup: filterMap[item.category] || 'Family Support',
      title: `${item.category} for ${item.fullName}`,
      shortDescription: item.situation.slice(0, 130),
      story: item.situation,
      currentSituation: item.situation,
      whyNeeded: item.whyNeeded,
      helpRequired: item.helpType,
      location: `${item.district}, Tamil Nadu`,
      privateAddress: item.address,
      privatePhone: item.phone,
      requiredAmount: Number(item.requiredAmount || 0),
      materialRequirements: item.helpType,
      urgency: 'High',
      isUrgent: false,
      isPublished: true,
      status: 'Published',
      verifiedBy: 'Trust Admin Review',
      verifiedDate: new Date().toISOString().slice(0, 10),
      publishedDate: new Date().toISOString().slice(0, 10),
      supportingDocsConsent: item.consentGiven
    });
    updateDirectRequestStatus(directId, 'Verified');
    return created;
  };

  // Admin: Donors (Add, Toggle Verify, Delete)
  const addDonor = (donorData) => {
    const newDonor = {
      id: `DON-${500 + donors.length + Date.now() % 1000}`,
      joinedDate: new Date().toISOString().slice(0, 10),
      publicAck: true,
      verifiedDonor: true,
      ...donorData
    };
    setDonors((prev) => [newDonor, ...prev]);
    return newDonor;
  };

  const toggleDonorVerification = (donorId) => {
    setDonors((prev) =>
      prev.map((d) => (d.id === donorId ? { ...d, verifiedDonor: !d.verifiedDonor } : d))
    );
  };

  const deleteDonor = (donorId) => {
    setDonors((prev) => prev.filter((d) => d.id !== donorId));
  };

  // Admin: Contributions (Add, Verify, Delete)
  const addContribution = (contribData) => {
    const targetReq = requests.find((r) => r.id === contribData.requestId);
    const newCon = {
      id: `CON-${800 + contributions.length + Date.now() % 1000}`,
      donorId: 'DON-ADMIN',
      requestTitle: targetReq ? targetReq.title : 'General Trust Fund',
      date: new Date().toISOString().slice(0, 10),
      verificationStatus: 'Verified',
      publicAck: true,
      ...contribData,
      amount: Number(contribData.amount || 0)
    };
    setContributions((prev) => [newCon, ...prev]);
    if (targetReq && newCon.amount > 0) {
      updateRequest(targetReq.id, {
        amountReceived: Number(targetReq.amountReceived || 0) + newCon.amount
      });
    }
    return newCon;
  };

  const verifyContribution = (contributionId, nextStatus) => {
    const target = contributions.find((c) => c.id === contributionId);
    if (!target) return;

    const wasVerified =
      target.verificationStatus === 'Verified' || target.verificationStatus === 'Completed';
    const willBeVerified = nextStatus === 'Verified' || nextStatus === 'Completed';

    setContributions((prev) =>
      prev.map((c) => (c.id === contributionId ? { ...c, verificationStatus: nextStatus } : c))
    );

    if (!wasVerified && willBeVerified && target.amount > 0) {
      setRequests((prev) =>
        prev.map((r) => {
          if (r.id !== target.requestId) return r;
          const nextReceived = Number(r.amountReceived || 0) + Number(target.amount);
          const isNowComplete = r.requiredAmount > 0 && nextReceived >= r.requiredAmount;
          return {
            ...r,
            amountReceived: nextReceived,
            status: isNowComplete ? 'Completed' : 'Partially Fulfilled',
            isUrgent: isNowComplete ? false : r.isUrgent
          };
        })
      );
      setDonors((prev) =>
        prev.map((d) => (d.id === target.donorId ? { ...d, verifiedDonor: true } : d))
      );
    }
  };

  const deleteContribution = (contributionId) => {
    setContributions((prev) => prev.filter((c) => c.id !== contributionId));
  };

  // Admin: Success Stories (Add, Toggle Publish, Delete)
  const addSuccessStory = (storyData) => {
    const newStory = {
      id: `STR-${400 + stories.length + Date.now() % 1000}`,
      completionDate: new Date().toISOString().slice(0, 10),
      isPublished: true,
      beforeAfterConsent: true,
      ...storyData
    };
    setStories((prev) => [newStory, ...prev]);
    return newStory;
  };

  const toggleStoryPublish = (storyId) => {
    setStories((prev) =>
      prev.map((s) => (s.id === storyId ? { ...s, isPublished: !s.isPublished } : s))
    );
  };

  const deleteSuccessStory = (storyId) => {
    setStories((prev) => prev.filter((s) => s.id !== storyId));
  };

  // Admin: Activities (Add, Toggle Publish, Delete)
  const addActivity = (actData) => {
    const newAct = {
      id: `ACT-${700 + activities.length + Date.now() % 1000}`,
      accentColor: '#234B3D',
      isPublished: true,
      ...actData
    };
    setActivities((prev) => [newAct, ...prev]);
    return newAct;
  };

  const toggleActivityPublish = (actId) => {
    setActivities((prev) =>
      prev.map((a) => (a.id === actId ? { ...a, isPublished: !a.isPublished } : a))
    );
  };

  const deleteActivity = (actId) => {
    setActivities((prev) => prev.filter((a) => a.id !== actId));
  };

  // Admin: Site Content, Team Members, Areas of Care, Annual Reports (Add, Update, Delete)
  const updateSiteContent = (patch) => {
    setSiteContent((prev) => ({ ...prev, ...patch }));
  };

  const addTeamMember = (member) => {
    const item = { id: `TEAM-${Date.now() % 10000}`, ...member };
    setSiteContent((prev) => ({ ...prev, teamMembers: [...prev.teamMembers, item] }));
  };

  const deleteTeamMember = (id) => {
    setSiteContent((prev) => ({
      ...prev,
      teamMembers: prev.teamMembers.filter((m) => (m.id || m.name) !== id)
    }));
  };

  const addAreaOfCare = (area) => {
    const item = {
      id: `CARE-${Date.now() % 10000}`,
      image: '/assets/images/community/community-food-support.jpg',
      ...area
    };
    setSiteContent((prev) => ({ ...prev, areasOfCare: [...prev.areasOfCare, item] }));
  };

  const deleteAreaOfCare = (id) => {
    setSiteContent((prev) => ({
      ...prev,
      areasOfCare: prev.areasOfCare.filter((a) => a.id !== id)
    }));
  };

  const addAnnualReport = (report) => {
    const item = { id: `REP-${Date.now() % 10000}`, status: 'Published', ...report };
    setSiteContent((prev) => ({ ...prev, annualReports: [item, ...prev.annualReports] }));
  };

  const deleteAnnualReport = (id) => {
    setSiteContent((prev) => ({
      ...prev,
      annualReports: prev.annualReports.filter((r) => r.id !== id)
    }));
  };

  // Auth & Volunteers
  const login = (userObj) => setCurrentUser(userObj);
  const logout = () => setCurrentUser(null);

  const registerVolunteer = (volData) => {
    setVolunteers((prev) => [{ id: `VOL-${prev.length + 1}`, ...volData }, ...prev]);
  };

  const deleteVolunteer = (id) => {
    setVolunteers((prev) => prev.filter((v) => v.id !== id));
  };

  const value = {
    requests,
    directRequests,
    donors,
    contributions,
    stories,
    activities,
    siteContent,
    currentUser,
    volunteers,
    impactStats,
    submitDirectRequest,
    submitContributionPledge,
    addRequest,
    updateRequest,
    deleteRequest,
    updateDirectRequestStatus,
    deleteDirectRequest,
    convertDirectToPublicRequest,
    addDonor,
    toggleDonorVerification,
    deleteDonor,
    addContribution,
    verifyContribution,
    deleteContribution,
    addSuccessStory,
    toggleStoryPublish,
    deleteSuccessStory,
    addActivity,
    toggleActivityPublish,
    deleteActivity,
    updateSiteContent,
    addTeamMember,
    deleteTeamMember,
    addAreaOfCare,
    deleteAreaOfCare,
    addAnnualReport,
    deleteAnnualReport,
    login,
    logout,
    registerVolunteer,
    deleteVolunteer
  };

  return <TrustContext.Provider value={value}>{children}</TrustContext.Provider>;
}

export function useTrust() {
  const ctx = useContext(TrustContext);
  if (!ctx) throw new Error('useTrust must be used within TrustProvider');
  return ctx;
}
