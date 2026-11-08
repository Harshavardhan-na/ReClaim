import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ItemProvider } from "./context/ItemContext";

// Layouts
import MainLayout from "./layouts/MainLayout";
import StudentDashboardLayout from "./layouts/StudentDashboardLayout";
import AdminDashboardLayout from "./layouts/AdminDashboardLayout";

// Components
import ProtectedRoute from "./components/ProtectedRoute";

// Public Pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

// Student & Shared Pages
import UserDashboard from "./pages/UserDashboard";
import BrowseItemsPage from "./pages/BrowseItemsPage";
import PostItemPage from "./pages/PostItemPage";
import MyPostsPage from "./pages/MyPostsPage";
import StudentProfilePage from "./pages/StudentProfilePage";
import ItemDetailsPage from "./pages/ItemDetailsPage";

// Admin Pages
import AdminDashboard from "./pages/AdminDashboard";
import AdminManageItemsPage from "./pages/AdminManageItemsPage";
import AdminUsersPage from "./pages/AdminUsersPage";

/**
 * Helper component for root/legacy redirect logic
 */
function GenericRedirect({ to }) {
  const { isAuthenticated, isStudent, isAdmin } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (to === "dashboard") {
    return <Navigate to={isAdmin ? "/admin/dashboard" : "/student/dashboard"} replace />;
  }

  if (to === "browse") {
    return <Navigate to={isAdmin ? "/admin/browse" : "/student/browse"} replace />;
  }

  if (to === "post") {
    return <Navigate to={isAdmin ? "/admin/post" : "/student/post"} replace />;
  }

  if (to === "my-posts") {
    return <Navigate to={isAdmin ? "/admin/manage-items" : "/student/my-posts"} replace />;
  }

  return <Navigate to="/" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <ItemProvider>
        <BrowserRouter>
          <Routes>
            {/* =========================================
                PUBLIC ROUTES (Accessible without login)
                ========================================= */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>

            {/* =========================================
                STUDENT PROTECTED ROUTES
                Strictly requires authenticated student role
                Preserves StudentDashboardLayout
                ========================================= */}
            <Route element={<ProtectedRoute requiredRole="student" />}>
              <Route path="/student" element={<StudentDashboardLayout />}>
                <Route index element={<Navigate to="/student/dashboard" replace />} />
                <Route path="dashboard" element={<UserDashboard />} />
                <Route path="browse" element={<BrowseItemsPage />} />
                <Route path="post" element={<PostItemPage />} />
                <Route path="my-posts" element={<MyPostsPage />} />
                <Route path="profile" element={<StudentProfilePage />} />
                <Route path="item/:id" element={<ItemDetailsPage />} />
              </Route>
            </Route>

            {/* =========================================
                ADMINISTRATOR PROTECTED ROUTES
                Strictly requires authenticated admin role
                Preserves AdminDashboardLayout
                ========================================= */}
            <Route element={<ProtectedRoute requiredRole="admin" />}>
              <Route path="/admin" element={<AdminDashboardLayout />}>
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="browse" element={<BrowseItemsPage />} />
                <Route path="post" element={<PostItemPage />} />
                <Route path="manage-items" element={<AdminManageItemsPage />} />
                <Route path="users" element={<AdminUsersPage />} />
                <Route path="item/:id" element={<ItemDetailsPage />} />
              </Route>
            </Route>

            {/* =========================================
                SMART LEGACY & FALLBACK REDIRECTS
                Redirects user to their appropriate role zone
                ========================================= */}
            <Route path="/dashboard" element={<GenericRedirect to="dashboard" />} />
            <Route path="/browse" element={<GenericRedirect to="browse" />} />
            <Route path="/post" element={<GenericRedirect to="post" />} />
            <Route path="/my-posts" element={<GenericRedirect to="my-posts" />} />
            <Route path="/item/:id" element={<GenericRedirect to="browse" />} />

            {/* Catch-all unknown routes */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ItemProvider>
    </AuthProvider>
  );
}
