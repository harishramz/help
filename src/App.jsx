import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { TrustProvider } from './context/TrustContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import About from './pages/About';
import HelpRequests from './pages/HelpRequests';
import RequestDetails from './pages/RequestDetails';
import RequestAssistance from './pages/RequestAssistance';
import SuccessStories from './pages/SuccessStories';
import Activities from './pages/Activities';
import Services from './pages/Services';
import Gallery from './pages/Gallery';
import FAQ from './pages/FAQ';
import Transparency from './pages/Transparency';
import DonorPortal from './pages/DonorPortal';
import Contact from './pages/Contact';
import Login from './pages/Login';
import LegalPage from './pages/LegalPage';

import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/AdminDashboard';
import ManagePeople from './admin/ManagePeople';
import ManageRequests from './admin/ManageRequests';
import ManageDirectRequests from './admin/ManageDirectRequests';
import ManageDonors from './admin/ManageDonors';
import ManageContributions from './admin/ManageContributions';
import ManageSuccessStories from './admin/ManageSuccessStories';
import ManageActivities from './admin/ManageActivities';
import ManageContent from './admin/ManageContent';

function PublicLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <TrustProvider>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/requests" element={<HelpRequests />} />
          <Route path="/requests/:id" element={<RequestDetails />} />
          <Route path="/request-assistance" element={<RequestAssistance />} />
          <Route path="/success-stories" element={<SuccessStories />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/events" element={<Activities />} />
          <Route path="/services" element={<Services />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/transparency" element={<Transparency />} />
          <Route path="/donor-portal" element={<DonorPortal />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/privacy-policy" element={<LegalPage type="privacy" />} />
          <Route path="/terms" element={<LegalPage type="terms" />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="people" element={<ManagePeople />} />
          <Route path="requests" element={<ManageRequests />} />
          <Route path="direct-requests" element={<ManageDirectRequests />} />
          <Route path="donors" element={<ManageDonors />} />
          <Route path="contributions" element={<ManageContributions />} />
          <Route path="stories" element={<ManageSuccessStories />} />
          <Route path="activities" element={<ManageActivities />} />
          <Route path="content" element={<ManageContent />} />
        </Route>
      </Routes>
    </TrustProvider>
  );
}
