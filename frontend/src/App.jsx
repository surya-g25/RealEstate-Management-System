import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Routes, Route, useLocation, Outlet } from 'react-router-dom';
import { FaChevronUp } from 'react-icons/fa';

import AdminLayout from './components/AdminLayout';
import SellerLayout from './components/SellerLayout';
import { ProtectedRoute, PublicRoute } from './components/common/ProtectedRoute';
import PageLoader from './components/common/PageLoader';
import { useAuth } from './context/AuthContext';

// Route-level code splitting with React.lazy
const LandingPage = lazy(() => import('./pages/shared/LandingPage'));
const Properties = lazy(() => import('./pages/shared/Properties'));
const PropertyDetails = lazy(() => import('./pages/shared/PropertyDetails'));
const Contact = lazy(() => import('./pages/shared/Contact'));
const ChatMessages = lazy(() => import('./pages/shared/ChatMessages'));
const Profile = lazy(() => import('./pages/shared/Profile'));
const NotFound = lazy(() => import('./pages/shared/NotFound'));

// Auth Pages
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const VerifyEmail = lazy(() => import('./pages/auth/VerifyEmail'));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/auth/ResetPassword'));

// Buyer Pages
const MyInquiries = lazy(() => import('./pages/buyer/MyInquiries'));
const Wishlist = lazy(() => import('./pages/buyer/Wishlist'));

// Seller Pages
const SellerDashboard = lazy(() => import('./pages/seller/SellerDashboard'));
const AddProperty = lazy(() => import('./pages/seller/AddProperty'));
const MyProperties = lazy(() => import('./pages/seller/MyProperties'));
const EditProperty = lazy(() => import('./pages/seller/EditProperty'));

// Admin Pages
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminUsers = lazy(() => import('./pages/admin/AdminUsers'));
const SellerRequests = lazy(() => import('./pages/admin/SellerRequests'));
const AdminProperties = lazy(() => import('./pages/admin/AdminProperties'));
const AdminInquiries = lazy(() => import('./pages/admin/AdminInquiries'));
const AdminContacts = lazy(() => import('./pages/admin/AdminContacts'));

// Scroll to top when the route changes
const ScrollToTopOnRouteChange = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
};

// Floating scroll to top button
const ScrollTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Scroll to top"
      className={`fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-all duration-300 
      ${visible
          ? "scale-100 opacity-100 bg-emerald-500 text-white hover:bg-green-400"
          : "pointer-events-none scale-0 opacity-0"}`}
    >
      <FaChevronUp size={22} />
    </button>
  );
};

// Smart layout wrapper for seller and buyer
const SellerLayoutWrapper = () => {
  const { user } = useAuth();
  return user?.role === 'seller' ? <SellerLayout /> : <Outlet />;
};

export const App = () => {
  useEffect(() => {
    document.body.style.overflowX = "hidden";
    document.documentElement.style.overflowX = "hidden";

    return () => {
      document.body.style.overflowX = "";
      document.documentElement.style.overflowX = "";
    };
  }, []);

  return (
    <div className='min-h-screen w-full overflow-x-hidden'>
      <ScrollToTopOnRouteChange />
      <ScrollTopButton />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public Auth Routes */}
          <Route element={<PublicRoute />}>
            <Route path='/login' element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
          </Route>

          {/* Public Shared Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/property/:id" element={<PropertyDetails />} />

          {/* Protected Authenticated Routes */}
          <Route element={<ProtectedRoute allowedRoles={["buyer", "seller", "admin"]} />}>
            <Route element={<SellerLayoutWrapper />}>
              <Route path='/inquiries' element={<MyInquiries />} />
              <Route path='/chat-messages' element={<ChatMessages />} />
              <Route path='/wishlist' element={<Wishlist />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/profile' element={<Profile />} />
            </Route>

            {/* Seller Dedicated Routes */}
            <Route element={<ProtectedRoute allowedRoles={["seller"]} />}>
              <Route element={<SellerLayout />}>
                <Route path='/dashboard' element={<SellerDashboard />} />
                <Route path='/seller-dashboard' element={<SellerDashboard />} />
                <Route path='/add-property' element={<AddProperty />} />
                <Route path='/my-properties' element={<MyProperties />} />
                <Route path='/edit-property/:id' element={<EditProperty />} />
              </Route>
            </Route>

            {/* Admin Dedicated Routes */}
            <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
              <Route element={<AdminLayout />}>
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path='/admin/users' element={<AdminUsers />} />
                <Route path="/admin/seller-requests" element={<SellerRequests />} />
                <Route path="/admin/properties" element={<AdminProperties />} />
                <Route path="/admin/inquiries" element={<AdminInquiries />} />
                <Route path='/admin/contacts' element={<AdminContacts />} />
              </Route>
            </Route>
          </Route>

          {/* 404 Catch-All Route */}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;