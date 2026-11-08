import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useItems } from "../context/ItemContext";
import {
  Users,
  Search,
  ShieldCheck,
  GraduationCap,
  Mail,
  CheckCircle2,
  Lock,
  Info
} from "lucide-react";

export default function AdminUsersPage() {
  const { usersList } = useAuth();
  const { items } = useItems();
  const [search, setSearch] = useState("");

  const filtered = usersList.filter((u) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      (u.regNumber || "").toLowerCase().includes(q)
    );
  });

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "1.6rem", color: "var(--color-primary)", marginBottom: "4px" }}>
          Campus User Overview ({usersList.length})
        </h2>
        <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
          Registry of authenticated university students and administrative campus security personnel.
        </p>
      </div>

      {/* Security Architecture Notice */}
      <div
        style={{
          padding: "14px 18px",
          backgroundColor: "#F8FAFC",
          borderRadius: "var(--radius-md)",
          border: "1px solid var(--color-border)",
          marginBottom: "24px",
          display: "flex",
          alignItems: "flex-start",
          gap: "10px",
          fontSize: "0.825rem",
          color: "var(--color-text-secondary)",
        }}
      >
        <Info size={18} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: "2px" }} />
        <span>
          <strong>Cognito User Pool Groups:</strong> Account roles (<code style={{ color: "var(--color-secondary)", fontWeight: 700 }}>STUDENT</code> vs <code style={{ color: "var(--color-primary)", fontWeight: 700 }}>ADMIN</code>) are governed by AWS Cognito User Pool Group assignments. Neither students nor administrators can alter their permissions through client-side state.
        </span>
      </div>

      {/* Search Input */}
      <div className="card" style={{ padding: "16px 20px", marginBottom: "20px", backgroundColor: "#FFFFFF" }}>
        <div style={{ position: "relative", maxWidth: "420px" }}>
          <Search
            size={16}
            color="var(--color-text-muted)"
            style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Search users by name, email, or reg number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: "36px", height: "38px", fontSize: "0.85rem" }}
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="card" style={{ padding: 0, backgroundColor: "#FFFFFF", overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.875rem" }}>
            <thead>
              <tr style={{ backgroundColor: "#F8FAFC", borderBottom: "2px solid var(--color-border)" }}>
                <th style={{ padding: "14px 18px", fontWeight: 700, color: "var(--color-primary)" }}>User Name</th>
                <th style={{ padding: "14px 18px", fontWeight: 700, color: "var(--color-primary)" }}>University Email</th>
                <th style={{ padding: "14px 18px", fontWeight: 700, color: "var(--color-primary)" }}>Reg / Staff ID</th>
                <th style={{ padding: "14px 18px", fontWeight: 700, color: "var(--color-primary)" }}>Assigned Group</th>
                <th style={{ padding: "14px 18px", fontWeight: 700, color: "var(--color-primary)" }}>Campus Entity</th>
                <th style={{ padding: "14px 18px", fontWeight: 700, color: "var(--color-primary)", textAlign: "center" }}>Posts</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => {
                const isAdmin = user.role === "admin";
                const userPostsCount = items.filter((i) => i.postedBy === user.id).length;
                return (
                  <tr
                    key={user.id}
                    style={{ borderBottom: "1px solid var(--color-border)", transition: "background-color 0.15s" }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#F8FAFC")}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                  >
                    <td style={{ padding: "14px 18px", verticalAlign: "middle" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div
                          style={{
                            width: "34px",
                            height: "34px",
                            borderRadius: "50%",
                            backgroundColor: isAdmin ? "var(--color-primary)" : "var(--color-secondary)",
                            color: "#FFFFFF",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 700,
                            fontSize: "0.85rem",
                          }}
                        >
                          {user.name.charAt(0)}
                        </div>
                        <span style={{ fontWeight: 700, color: "var(--color-primary)" }}>{user.name}</span>
                      </div>
                    </td>

                    <td style={{ padding: "14px 18px", verticalAlign: "middle", color: "var(--color-text-secondary)" }}>
                      {user.email}
                    </td>

                    <td style={{ padding: "14px 18px", verticalAlign: "middle", fontWeight: 600 }}>
                      {user.regNumber || "N/A"}
                    </td>

                    <td style={{ padding: "14px 18px", verticalAlign: "middle" }}>
                      {isAdmin ? (
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "5px",
                            fontSize: "0.72rem",
                            fontWeight: 700,
                            color: "var(--color-primary)",
                            backgroundColor: "rgba(20, 45, 78, 0.08)",
                            padding: "3px 8px",
                            borderRadius: "var(--radius-full)",
                            border: "1px solid rgba(20, 45, 78, 0.2)",
                          }}
                        >
                          <ShieldCheck size={12} color="var(--color-primary)" />
                          <span>COGNITO ADMIN</span>
                        </span>
                      ) : (
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "5px",
                            fontSize: "0.72rem",
                            fontWeight: 700,
                            color: "var(--color-secondary)",
                            backgroundColor: "var(--color-secondary-subtle)",
                            padding: "3px 8px",
                            borderRadius: "var(--radius-full)",
                            border: "1px solid rgba(15, 157, 146, 0.2)",
                          }}
                        >
                          <GraduationCap size={12} color="var(--color-secondary)" />
                          <span>COGNITO STUDENT</span>
                        </span>
                      )}
                    </td>

                    <td style={{ padding: "14px 18px", verticalAlign: "middle", color: "var(--color-text-secondary)", fontSize: "0.825rem" }}>
                      {user.department || user.campus}
                    </td>

                    <td style={{ padding: "14px 18px", verticalAlign: "middle", textAlign: "center", fontWeight: 700 }}>
                      {userPostsCount}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
