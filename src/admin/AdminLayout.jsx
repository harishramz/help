import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useTrust } from '../context/TrustContext';
import AdminSidebar from '../components/AdminSidebar';
import AdminNavbar from '../components/AdminNavbar';

const TITLE_MAP = {
  '/admin': 'Admin Dashboard Overview',
  '/admin/people': 'Manage People & Beneficiaries',
  '/admin/requests': 'Manage Help Requests',
  '/admin/direct-requests': 'Manage Direct Assistance Requests',
  '/admin/donors': 'Manage Donors',
  '/admin/contributions': 'Manage Contributions',
  '/admin/stories': 'Manage Success Stories',
  '/admin/activities': 'Manage Trust Activities',
  '/admin/content': 'Manage Website Content'
};

export default function AdminLayout() {
  const { currentUser } = useTrust();
  const location = useLocation();

  if (!currentUser || currentUser.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  const title = TITLE_MAP[location.pathname] || 'TrustConnect Admin';

  return (
    <div className="admin-shell">
      <AdminSidebar />
      <div className="admin-main">
        <AdminNavbar title={title} />
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
