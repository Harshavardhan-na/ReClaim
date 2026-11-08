import React, { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Compass,
  LayoutDashboard,
  Search,
  PlusCircle,
  SlidersHorizontal,
  Users,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  ShieldAlert
} from "lucide-react";

export default function AdminDashboardLayout() {
  const { currentUser, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navLinks = [
    { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Browse Items", path: "/admin/browse", icon: Search },
    { name: "Post Found Item", path: "/admin/post", icon: PlusCircle },
    { name: "Manage All Items", path: "/admin/manage-items", icon: SlidersHorizontal },
    { name: "User Overview", path: "/admin/users", icon: Users },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Administrator Dedicated Top Header */}
      <header
        style={{
          backgroundColor: "#142D4E",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          position: "sticky",
          top: 0,
          zIndex: 50,
          boxShadow: "var(--shadow-sm)",
          color: "#FFFFFF",
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
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "var(--radius-sm)",
                  padding: "6px",
                  cursor: "pointer",
                  color: "#FFFFFF",
                }}
              >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>

              <Link
                to="/admin/dashboard"
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
                    backgroundColor: "rgba(15, 157, 146, 0.25)",
                    border: "1px solid var(--color-secondary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#FFFFFF",
                  }}
                >
                  <Compass size={22} color="#14C2B4" strokeWidth={2.5} />
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "1.25rem",
                      fontWeight: 800,
                      color: "#FFFFFF",
                      lineHeight: 1.1,
                    }}
                  >
                    Re<span style={{ color: "#14C2B4" }}>Claim</span>
                  </div>
                  <div style={{ fontSize: "0.68rem", color: "#94A3B8", fontWeight: 600, letterSpacing: "0.04em" }}>
                    Security Admin Console
                  </div>
                </div>
              </Link>
            </div>

            {/* Right: Administrator Name, Account Indicator, Logout */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              {/* Admin Account Indicator Pill */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "6px 14px",
                  borderRadius: "var(--radius-full)",
                  backgroundColor: "rgba(15, 157, 146, 0.2)",
                  border: "1px solid rgba(15, 157, 146, 0.4)",
                }}
              >
                <ShieldCheck size={16} color="#14C2B4" />
                <span
                  style={{
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    color: "#14C2B4",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Administrator
                </span>
              </div>

              {/* Admin Profile Info */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }} className="admin-profile-info">
                <div
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "50%",
                    backgroundColor: "var(--color-primary-light)",
                    border: "1.5px solid var(--color-secondary)",
                    color: "#FFFFFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                  }}
                >
                  {currentUser?.name ? currentUser.name.charAt(0) : "A"}
                </div>
                <div style={{ textAlign: "left", lineHeight: 1.2 }}>
                  <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "#FFFFFF" }}>
                    {currentUser?.name || "Administrator"}
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "#94A3B8" }}>
                    {currentUser?.regNumber || "Campus Security Office"}
                  </div>
                </div>
              </div>

              {/* Logout Button */}
              <button
                type="button"
                onClick={handleLogout}
                className="btn btn-outline btn-sm"
                title="Sign out of admin session"
                style={{
                  padding: "6px 12px",
                  borderColor: "rgba(239, 68, 68, 0.4)",
                  color: "#FCA5A5",
                  backgroundColor: "rgba(239, 68, 68, 0.1)",
                }}
              >
                <LogOut size={15} />
                <span className="logout-text">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container with Admin Sidebar & Content */}
      <div className="dashboard-layout" style={{ flex: 1 }}>
        {/* Mobile Backdrop */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(11, 27, 48, 0.6)",
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
          className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}
        >
          {/* Sidebar Section Title */}
          <div style={{ padding: "20px 18px 12px 18px" }}>
            <div
              style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--color-primary)",
              }}
            >
              Institutional Authority
            </div>
          </div>

          {/* 5 Required Admin Navigation Options */}
          <nav style={{ flex: 1, padding: "0 12px", display: "flex", flexDirection: "column", gap: "4px" }}>
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/admin/dashboard"}
                  onClick={() => setSidebarOpen(false)}
                  style={({ isActive }) => ({
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "11px 16px",
                    borderRadius: "var(--radius-md)",
                    fontSize: "0.925rem",
                    fontWeight: 600,
                    color: isActive ? "var(--color-primary)" : "var(--color-text-secondary)",
                    backgroundColor: isActive ? "rgba(20, 45, 78, 0.08)" : "transparent",
                    transition: "all var(--transition-fast)",
                    borderLeft: isActive ? "4px solid var(--color-primary)" : "4px solid transparent",
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

          {/* Security Protocols Notice */}
          <div style={{ padding: "14px", margin: "0 12px 14px 12px", backgroundColor: "#F8FAFC", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", fontSize: "0.78rem" }}>
            <div style={{ fontWeight: 700, color: "var(--color-primary)", marginBottom: "4px" }}>
              Campus Security Oversight
            </div>
            <div style={{ color: "var(--color-text-secondary)" }}>
              Admin actions are audited. Status transitions from Available to Returned require ID inspection.
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
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
          .admin-sidebar {
            position: fixed !important;
            top: 70px;
            bottom: 0;
            left: 0;
            z-index: 50;
            transform: translateX(-100%);
            box-shadow: var(--shadow-xl);
            transition: transform 0.25s ease-in-out;
          }
          .admin-sidebar.open {
            transform: translateX(0);
          }
          .admin-profile-info {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
