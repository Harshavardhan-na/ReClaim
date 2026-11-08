import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * ProtectedRoute Component
 * Enforces role-based route access.
 * 
 * @param {Object} props
 * @param {"student" | "admin"} [props.requiredRole] - Required role to access this route
 * @param {React.ReactNode} [props.children] - Child components or uses Outlet
 */
export default function ProtectedRoute({ requiredRole, children }) {
  const { currentUser, isAuthenticated, isStudent, isAdmin } = useAuth();
  const location = useLocation();

  // 1. Unauthenticated users must be redirected to login
  if (!isAuthenticated || !currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. Role-specific protection
  if (requiredRole) {
    if (requiredRole === "admin" && !isAdmin) {
      // Student trying to access admin route -> redirect to student dashboard
      return <Navigate to="/student/dashboard" replace />;
    }

    if (requiredRole === "student" && !isStudent) {
      // Admin trying to access student route -> redirect to admin dashboard
      return <Navigate to="/admin/dashboard" replace />;
    }
  }

  return children ? children : <Outlet />;
}
