import React from 'react'
import { useAuth } from "../../context/AuthContext"
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
    const { user, loading } = useAuth();
    if (loading) {
        return (
            <div className='flex justify-center p-25'>
                <div className='loader'></div>
            </div>
        )
    }
    const isGuestAllowed = allowedRoles?.includes(undefined);
    if (!user && !isGuestAllowed) { // if there is no user and guest are not allowed
        return <Navigate to="/login" replace />
    }

    if (user && allowedRoles && !allowedRoles.includes(user.role)) //user's role is NOT in the allowed roles
    {
        if (user.role === 'admin') {
            return <Navigate to="/admin-dashboard" replace />
        }
        if (user.role === 'seller') {
            return <Navigate to="/dashboard" replace />
        }
        else {
            return <Navigate to="/" replace />
        }
    }
    return <Outlet />
}

// public routes

const PublicRoute = () => {
    const { user, loading } = useAuth();
    if (loading) {
        return (
            <div className='flex justify-center p-25'>
                <div className='loader'></div>
            </div>
        )
    }

    if (user) {
        if (user.role === 'admin') {
            return <Navigate to="/admin-dashboard" replace />
        }
        if (user.role === 'seller') {
            return <Navigate to="/dashboard" replace />
        }
        else {
            return <Navigate to="/" replace />
        }
    }
    return <Outlet />;
}
export { ProtectedRoute, PublicRoute }; 