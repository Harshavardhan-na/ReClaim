import React from "react";
import { Link } from "react-router-dom";
import { Compass, Cloud, ShieldCheck, Database, Server, Cpu, Activity, ExternalLink, Heart } from "lucide-react";

export default function Footer() {
  const awsServices = [
    { name: "Amazon S3", role: "Web Hosting & Image Storage", icon: Database },
    { name: "Amazon CloudFront", role: "Global Edge Content Delivery", icon: Cloud },
    { name: "Amazon Cognito", role: "User Authentication & Pools", icon: ShieldCheck },
    { name: "AWS Lambda", role: "Serverless Microservice Operations", icon: Cpu },
    { name: "Amazon API Gateway", role: "Secured REST API Router", icon: Server },
    { name: "Amazon DynamoDB", role: "High Performance NoSQL Database", icon: Database },
    { name: "Amazon CloudWatch", role: "Real-time Metrics & Audit Logs", icon: Activity },
  ];

  return (
    <footer
      style={{
        backgroundColor: "var(--color-primary-dark)",
        color: "#94A3B8",
        paddingTop: "60px",
        paddingBottom: "36px",
        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "40px",
            marginBottom: "48px",
          }}
        >
          {/* Brand Info */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "8px",
                  backgroundColor: "#142D4E",
                  border: "1px solid var(--color-secondary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--color-secondary)",
                }}
              >
                <Compass size={20} strokeWidth={2.5} />
              </div>
              <span
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.35rem",
                  fontWeight: 800,
                  color: "#FFFFFF",
                  letterSpacing: "-0.01em",
                }}
              >
                Re<span style={{ color: "var(--color-secondary)" }}>Claim</span>
              </span>
            </div>

            <p
              style={{
                fontSize: "0.95rem",
                color: "#E2E8F0",
                fontWeight: 600,
                marginBottom: "8px",
              }}
            >
              "Lost Something? Find It. Found Something? Return It."
            </p>

            <p
              style={{
                fontSize: "0.85rem",
                color: "#94A3B8",
                lineHeight: 1.6,
                marginBottom: "16px",
              }}
            >
              An intelligent, reliable campus lost and found platform built for the student and faculty community at VIT-AP University.
            </p>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "rgba(15, 157, 146, 0.12)",
                border: "1px solid rgba(15, 157, 146, 0.3)",
                padding: "6px 12px",
                borderRadius: "var(--radius-sm)",
                fontSize: "0.78rem",
                color: "var(--color-secondary-light)",
              }}
            >
              <span>🎓 AWS Solution Architecture Internal Assessment III</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4
              style={{
                color: "#FFFFFF",
                fontSize: "1rem",
                marginBottom: "18px",
                fontWeight: 700,
              }}
            >
              Quick Navigation
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.875rem" }}>
              <li>
                <Link to="/" style={{ color: "#CBD5E1", transition: "color 0.2s" }} onMouseOver={(e) => e.target.style.color = "#0F9D92"} onMouseOut={(e) => e.target.style.color = "#CBD5E1"}>
                  Home Landing Page
                </Link>
              </li>
              <li>
                <Link to="/browse" style={{ color: "#CBD5E1", transition: "color 0.2s" }} onMouseOver={(e) => e.target.style.color = "#0F9D92"} onMouseOut={(e) => e.target.style.color = "#CBD5E1"}>
                  Browse Lost &amp; Found Items
                </Link>
              </li>
              <li>
                <Link to="/post" style={{ color: "#CBD5E1", transition: "color 0.2s" }} onMouseOver={(e) => e.target.style.color = "#0F9D92"} onMouseOut={(e) => e.target.style.color = "#CBD5E1"}>
                  Report a Found Item
                </Link>
              </li>
              <li>
                <Link to="/dashboard" style={{ color: "#CBD5E1", transition: "color 0.2s" }} onMouseOver={(e) => e.target.style.color = "#0F9D92"} onMouseOut={(e) => e.target.style.color = "#CBD5E1"}>
                  Student Dashboard
                </Link>
              </li>
              <li>
                <Link to="/admin" style={{ color: "#CBD5E1", transition: "color 0.2s" }} onMouseOver={(e) => e.target.style.color = "#0F9D92"} onMouseOut={(e) => e.target.style.color = "#CBD5E1"}>
                  Security Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Planned AWS Architecture */}
          <div style={{ gridColumn: "span 1" }}>
            <h4
              style={{
                color: "#FFFFFF",
                fontSize: "1rem",
                marginBottom: "18px",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Cloud size={18} color="#0F9D92" />
              <span>Target AWS Architecture</span>
            </h4>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "8px",
                fontSize: "0.78rem",
              }}
            >
              {awsServices.slice(0, 5).map((srv, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "6px 10px",
                    backgroundColor: "rgba(255, 255, 255, 0.04)",
                    borderRadius: "6px",
                    border: "1px solid rgba(255, 255, 255, 0.06)",
                  }}
                >
                  <span style={{ color: "#FFFFFF", fontWeight: 600 }}>{srv.name}</span>
                  <span style={{ color: "#94A3B8", fontSize: "0.72rem" }}>{srv.role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            paddingTop: "24px",
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "14px",
            fontSize: "0.8rem",
          }}
        >
          <div>
            &copy; {new Date().getFullYear()} ReClaim Platform &bull; VIT-AP University. All rights reserved.
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", color: "#64748B" }}>
            <span>Frontend Tier (Ready for AWS Cloud Integration)</span>
            <span>&bull;</span>
            <span style={{ color: "var(--color-secondary)" }}>Status: Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
