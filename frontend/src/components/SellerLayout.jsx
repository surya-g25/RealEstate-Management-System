import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import SellerSidebar from './SellerSidebar'
import { Outlet, useLocation } from 'react-router-dom'
import DashboardNavbar from './DashboardNavbar'
import PendingApproval from '../pages/seller/PendingApproval'

const SellerLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { user } = useAuth();
    const location = useLocation();

    // allow access to public route for seller
    const isPublicDashboardRoute = ['/contact', '/profile'].includes(location.pathname);

    return (

        <div className="flex h-screen bg-bg-alt overflow-hidden">
            <SellerSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden transition-all duration-300 md:ml-[260px]">
                <DashboardNavbar onMenuClick={() => setIsSidebarOpen(true)} />
                <main className="flex-1 overflow-y-auto p-5 md:p-8 relative scroll-smooth fade-in">
                    {user?.isApproved || isPublicDashboardRoute ? (
                        <Outlet />
                    ) : (
                        <PendingApproval />
                    )}
                </main>
            </div>
        </div>
    )
}

export default SellerLayout