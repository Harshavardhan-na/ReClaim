import React, { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Compass,
  LayoutDashboard,
  Search,
  PlusCircle,
  FileText,
  User,
  LogOut,
  Menu,
  X,
  GraduationCap
} from "lucide-react";

export default function StudentDashboardLayout() {
  const { currentUser, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navLinks = [
    { name: "Dashboard", path: "/student/dashboard", icon: LayoutDashboard },
    { name: "Browse Items", path: "/student/browse", icon: Search },
    { name: "Post Found Item", path: "/student/post", icon: PlusCircle },
    { name: "My Posts", path: "/student/my-posts", icon: FileText },
    { name: "My Profile", path: "/student/profile", icon: User },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Student Dedicated Top Header */}
      <header
        style={{
          backgroundColor: "#FFFFFF",
          borderBottom: "1px solid var(--color-border)",
          position: "sticky",
          top: 0,
          zIndex: 50,
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <div style={{ padding: "0 24px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: "70px",
            }}
          >
            {/* Logo & Mobile Sidebar Button */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <button
                type="button"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="mobile-sidebar-toggle"
                style={{
                  display: "none",
                  background: "none",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-sm)",
                  padding: "6px",
                  cursor: "pointer",
                  color: "var(--color-primary)",
                }}
              >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>

              <Link
                to="/student/dashboard"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  textDecoration: "none",
                }}
              >
                <div
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "9px",
                    backgroundColor: "var(--color-primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#FFFFFF",
                  }}
                >
                  <Compass size={22} color="#0F9D92" strokeWidth={2.5} />
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "1.25rem",
                      fontWeight: 800,
                      color: "var(--color-primary)",
                      lineHeight: 1.1,
                    }}
                  >
                    Re<span style={{ color: "var(--color-secondary)" }}>Claim</span>
                  </div>
                  <div style={{ fontSize: "0.68rem", color: "var(--color-text-secondary)", fontWeight: 500 }}>
                    Student Portal
                  </div>
                </div>
              </Link>
            </div>

            {/* Right: Student's Name, Student Account Indicator, Logout */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              {/* Student Account Indicator Pill */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "6px 14px",
                  borderRadius: "var(--radius-full)",
                  backgroundColor: "var(--color-secondary-subtle)",
                  border: "1px solid rgba(15, 157, 146, 0.25)",
                }}
              >
                <GraduationCap size={16} color="var(--color-secondary)" />
                <span
                  style={{
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    color: "var(--color-secondary-dark)",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                  }}
                >
                  Student Account
                </span>
              </div>

              {/* Student Profile Info */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }} className="student-profile-info">
                <div
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "50%",
                    backgroundColor: "var(--color-secondary)",
                    color: "#FFFFFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                  }}
                >
                  {currentUser?.name ? currentUser.name.charAt(0) : "S"}
                </div>
                <div style={{ textAlign: "left", lineHeight: 1.2 }}>
                  <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--color-text-primary)" }}>
                    {currentUser?.name || "Student"}
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "var(--color-text-secondary)" }}>
                    {currentUser?.regNumber || "22BCE1042"}
                  </div>
                </div>
              </div>

              {/* Logout Button */}
              <button
                type="button"
                onClick={handleLogout}
                className="btn btn-outline btn-sm"
                title="Sign out of student account"
                style={{ padding: "6px 12px", color: "var(--color-danger)" }}
              >
                <LogOut size={15} />
                <span className="logout-text">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout Container with Sidebar and Content */}
      <div className="dashboard-layout" style={{ flex: 1 }}>
        {/* Mobile Backdrop */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(20, 45, 78, 0.4)",
              zIndex: 40,
              backdropFilter: "blur(2px)",
            }}
          />
        )}

        {/* Left Sidebar */}
        <aside
          style={{
            width: "260px",
            backgroundColor: "#FFFFFF",
            borderRight: "1px solid var(--color-border)",
            display: "flex",
            flexDirection: "column",
            flexShrink: 0,
            minHeight: "calc(100vh - 70px)",
          }}
          className={`student-sidebar ${sidebarOpen ? "open" : ""}`}
        >
          {/* Sidebar Section Title */}
          <div style={{ padding: "20px 18px 12px 18px" }}>
            <div
              style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--color-text-muted)",
              }}
            >
              Student Workspace
            </div>
          </div>

          {/* 5 Required Student Navigation Options */}
          <nav style={{ flex: 1, padding: "0 12px", display: "flex", flexDirection: "column", gap: "4px" }}>
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/student/dashboard"}
                  onClick={() => setSidebarOpen(false)}
                  style={({ isActive }) => ({
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "11px 16px",
                    borderRadius: "var(--radius-md)",
                    fontSize: "0.925rem",
                    fontWeight: 600,
                    color: isActive ? "var(--color-secondary)" : "var(--color-text-primary)",
                    backgroundColor: isActive ? "var(--color-secondary-subtle)" : "transparent",
                    transition: "all var(--transition-fast)",
                    borderLeft: isActive ? "4px solid var(--color-secondary)" : "4px solid transparent",
                  })}
                >
                  <Icon size={18} strokeWidth={2.2} />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Logout Section in Sidebar */}
          <div style={{ padding: "12px", borderTop: "1px solid var(--color-border)" }}>
            <button
              type="button"
              onClick={handleLogout}
              className="btn btn-outline btn-block"
              style={{
                justifyContent: "flex-start",
                gap: "10px",
                color: "var(--color-danger)",
                borderColor: "transparent",
              }}
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>

          {/* Campus Safety Desk Box */}
          <div style={{ padding: "14px", margin: "0 12px 14px 12px", backgroundColor: "var(--color-bg)", borderRadius: "var(--radius-md)", fontSize: "0.78rem" }}>
            <div style={{ fontWeight: 700, color: "var(--color-primary)", marginBottom: "4px" }}>
              Campus Security Desk
            </div>
            <div style={{ color: "var(--color-text-secondary)" }}>
              Central Security Office: Ground Floor, Main Block. Available 24x7.
            </div>
          </div>
        </aside>

        {/* Main Content Area: Renders the active student page */}
        <main className="main-content" style={{ flex: 1, backgroundColor: "var(--color-bg)", minWidth: 0 }}>
          <div className="content-body">
            <Outlet />
          </div>
        </main>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .mobile-sidebar-toggle {
            display: flex !important;
          }
          .student-sidebar {
            position: fixed !important;
            top: 70px;
            bottom: 0;
            left: 0;
            z-index: 50;
            transform: translateX(-100%);
            box-shadow: var(--shadow-xl);
            transition: transform 0.25s ease-in-out;
          }
          .student-sidebar.open {
            transform: translateX(0);
          }
          .student-profile-info {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
