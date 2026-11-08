import React from "react";
import { useAuth } from "../context/AuthContext";
import { useItems } from "../context/ItemContext";
import {
  User,
  GraduationCap,
  Mail,
  Building,
  Calendar,
  CheckCircle,
  FileText,
  Shield,
  Phone
} from "lucide-react";
import { Link } from "react-router-dom";

export default function StudentProfilePage() {
  const { currentUser } = useAuth();
  const { getUserItems } = useItems();

  const myItems = currentUser ? getUserItems(currentUser.id) : [];

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "1.6rem", color: "var(--color-primary)", marginBottom: "4px" }}>
          My Student Profile
        </h2>
        <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
          Official university student credential and campus reporting record.
        </p>
      </div>

      {/* Main Profile Card */}
      <div className="card" style={{ padding: "32px", backgroundColor: "#FFFFFF", marginBottom: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "24px", marginBottom: "28px", flexWrap: "wrap" }}>
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              backgroundColor: "var(--color-secondary)",
              color: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.8rem",
              fontWeight: 800,
              boxShadow: "0 4px 14px rgba(15, 157, 146, 0.3)",
            }}
          >
            {currentUser?.name ? currentUser.name.charAt(0) : "S"}
          </div>

          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
              <h3 style={{ fontSize: "1.4rem", color: "var(--color-primary)", margin: 0 }}>
                {currentUser?.name || "Student User"}
              </h3>
              <span
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  padding: "3px 8px",
                  borderRadius: "var(--radius-full)",
                  backgroundColor: "var(--color-secondary-subtle)",
                  color: "var(--color-secondary)",
                  border: "1px solid rgba(15, 157, 146, 0.3)",
                }}
              >
                Student Account
              </span>
            </div>
            <div style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>
              Registration Number: <strong>{currentUser?.regNumber || "22BCE1042"}</strong> &bull; VIT-AP University
            </div>
          </div>
        </div>

        {/* Credentials Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "18px",
            paddingTop: "20px",
            borderTop: "1px solid var(--color-border)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "38px", height: "38px", borderRadius: "8px", backgroundColor: "rgba(20, 45, 78, 0.06)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-primary)" }}>
              <Mail size={18} />
            </div>
            <div>
              <div style={{ fontSize: "0.72rem", color: "var(--color-text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
                University Email
              </div>
              <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--color-text-primary)" }}>
                {currentUser?.email || "student@vitap.ac.in"}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "38px", height: "38px", borderRadius: "8px", backgroundColor: "var(--color-secondary-subtle)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-secondary)" }}>
              <Building size={18} />
            </div>
            <div>
              <div style={{ fontSize: "0.72rem", color: "var(--color-text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
                Campus Department
              </div>
              <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--color-text-primary)" }}>
                {currentUser?.department || "School of Computer Science & Engineering"}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "38px", height: "38px", borderRadius: "8px", backgroundColor: "var(--color-success-bg)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-success)" }}>
              <CheckCircle size={18} />
            </div>
            <div>
              <div style={{ fontSize: "0.72rem", color: "var(--color-text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
                Account Status
              </div>
              <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--color-success)" }}>
                Active &bull; Verified Student
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "38px", height: "38px", borderRadius: "8px", backgroundColor: "rgba(20, 45, 78, 0.06)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-primary)" }}>
              <FileText size={18} />
            </div>
            <div>
              <div style={{ fontSize: "0.72rem", color: "var(--color-text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
                Reported Items
              </div>
              <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--color-text-primary)" }}>
                {myItems.length} items logged
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Banner */}
      <div
        className="card"
        style={{
          padding: "20px 24px",
          backgroundColor: "#F8FAFC",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "14px",
        }}
      >
        <div>
          <h4 style={{ fontSize: "1rem", color: "var(--color-primary)", marginBottom: "4px" }}>
            Manage Your Reported Items
          </h4>
          <p style={{ fontSize: "0.825rem", color: "var(--color-text-secondary)" }}>
            Review, edit, or delete items you have posted on the campus lost &amp; found board.
          </p>
        </div>

        <Link to="/student/my-posts" className="btn btn-outline-primary btn-sm">
          View My Posts ({myItems.length})
        </Link>
      </div>
    </div>
  );
}
