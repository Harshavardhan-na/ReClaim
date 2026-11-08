import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Compass,
  LayoutDashboard,
  ShieldAlert,
  LogOut,
  Menu,
  X,
  User,
  ArrowRight
} from "lucide-react";

export default function Navbar() {
  const { currentUser, isAuthenticated, isStudent, isAdmin, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const dashboardPath = isAdmin ? "/admin/dashboard" : "/student/dashboard";

  return (
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
      <div className="container">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "72px",
          }}
        >
          {/* ReClaim Logo */}
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              textDecoration: "none",
            }}
          >
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "10px",
                backgroundColor: "var(--color-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FFFFFF",
                boxShadow: "0 4px 10px rgba(20, 45, 78, 0.2)",
              }}
            >
              <Compass size={24} color="#0F9D92" strokeWidth={2.5} />
            </div>
            <div>
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.35rem",
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  color: "var(--color-primary)",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <span>Re</span>
                <span style={{ color: "var(--color-secondary)" }}>Claim</span>
                <span
                  style={{
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    backgroundColor: "var(--color-secondary-subtle)",
                    color: "var(--color-secondary)",
                    padding: "2px 6px",
                    borderRadius: "4px",
                    marginLeft: "4px",
                    letterSpacing: "0.05em",
                  }}
                >
                  VIT-AP
                </span>
              </div>
              <div
                style={{
                  fontSize: "0.72rem",
                  color: "var(--color-text-secondary)",
                  lineHeight: 1,
                  marginTop: "2px",
                  fontWeight: 500,
                }}
              >
                Intelligent Lost &amp; Found
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            style={{
              display: "none",
              alignItems: "center",
              gap: "24px",
            }}
            className="desktop-nav"
          >
            <NavLink
              to="/"
              style={({ isActive }) => ({
                fontSize: "0.925rem",
                fontWeight: 600,
                color: isActive ? "var(--color-secondary)" : "var(--color-text-primary)",
              })}
            >
              Home
            </NavLink>

            {/* If NOT authenticated: Only Home, Login, Register */}
            {!isAuthenticated ? (
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginLeft: "12px" }}>
                <Link to="/login" className="btn btn-outline btn-sm">
                  Login
                </Link>
                <Link to="/register" className="btn btn-secondary btn-sm">
                  Register
                </Link>
              </div>
            ) : (
              /* If Authenticated: Link to Dashboard and User Profile indicator with Logout */
              <div style={{ display: "flex", alignItems: "center", gap: "14px", marginLeft: "12px" }}>
                <Link
                  to={dashboardPath}
                  className="btn btn-outline-primary btn-sm"
                  style={{ display: "flex", alignItems: "center", gap: "6px" }}
                >
                  {isAdmin ? <ShieldAlert size={15} /> : <LayoutDashboard size={15} />}
                  <span>{isAdmin ? "Admin Console" : "My Dashboard"}</span>
                  <ArrowRight size={13} />
                </Link>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "5px 12px",
                    borderRadius: "var(--radius-full)",
                    backgroundColor: isAdmin ? "rgba(20, 45, 78, 0.08)" : "var(--color-secondary-subtle)",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    color: isAdmin ? "var(--color-primary)" : "var(--color-secondary-dark)",
                  }}
                >
                  <User size={13} />
                  <span>{currentUser.name}</span>
                  <span
                    style={{
                      fontSize: "0.7rem",
                      padding: "1px 6px",
                      borderRadius: "4px",
                      backgroundColor: "#FFFFFF",
                      fontWeight: 700,
                      textTransform: "uppercase",
                    }}
                  >
                    {isAdmin ? "Admin" : "Student"}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="btn btn-outline btn-sm"
                  title="Sign Out"
                  style={{ padding: "6px 12px", color: "var(--color-danger)" }}
                >
                  <LogOut size={14} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </nav>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: "none",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--color-primary)",
              padding: "8px",
            }}
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div
            style={{
              padding: "16px 0 24px 0",
              borderTop: "1px solid var(--color-border)",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              style={{ fontWeight: 600, padding: "8px 0" }}
            >
              Home
            </Link>

            {!isAuthenticated ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", paddingTop: "8px" }}>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn btn-outline btn-block"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn btn-secondary btn-block"
                >
                  Register
                </Link>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", paddingTop: "8px" }}>
                <Link
                  to={dashboardPath}
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn btn-secondary btn-block"
                >
                  Go to {isAdmin ? "Admin Console" : "Dashboard"}
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="btn btn-outline btn-block"
                  style={{ color: "var(--color-danger)" }}
                >
                  <LogOut size={16} /> Sign Out
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
        @media (max-width: 767px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </header>
  );
}
