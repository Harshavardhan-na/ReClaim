import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Calendar, ArrowRight, Tag, Lock } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { useAuth } from "../context/AuthContext";

export default function ItemCard({ item }) {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!item) return null;

  // Compute destination path preserving the appropriate layout
  const targetPath = !isAuthenticated
    ? "/login"
    : isAdmin
    ? `/admin/item/${item.id}`
    : `/student/item/${item.id}`;

  return (
    <div
      className="card card-hover"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: "#FFFFFF",
      }}
    >
      {/* Photograph Container with Status Badge Overlay */}
      <div
        style={{
          position: "relative",
          width: "100%",
          paddingTop: "60%",
          backgroundColor: "#F1F5F9",
          overflow: "hidden",
        }}
      >
        <img
          src={item.imageUrl || "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=800&q=80"}
          alt={item.name}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.4s ease",
          }}
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=800&q=80";
          }}
        />

        {/* Status Badge in Top-Right */}
        <div
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            zIndex: 2,
          }}
        >
          <StatusBadge status={item.status} size="sm" />
        </div>

        {/* Category Pill in Bottom-Left */}
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            left: "12px",
            zIndex: 2,
            backgroundColor: "rgba(20, 45, 78, 0.85)",
            color: "#FFFFFF",
            fontSize: "0.72rem",
            fontWeight: 600,
            padding: "3px 8px",
            borderRadius: "4px",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <Tag size={11} color="#0F9D92" />
          <span>{item.category}</span>
        </div>
      </div>

      {/* Card Body */}
      <div
        style={{
          padding: "18px 20px 20px 20px",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <h3
          style={{
            fontSize: "1.05rem",
            fontWeight: 700,
            color: "var(--color-primary)",
            marginBottom: "8px",
            lineHeight: 1.35,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: "2.7rem",
          }}
          title={item.name}
        >
          {item.name}
        </h3>

        <p
          style={{
            fontSize: "0.85rem",
            color: "var(--color-text-secondary)",
            lineHeight: 1.5,
            marginBottom: "16px",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            flex: 1,
          }}
        >
          {item.description}
        </p>

        {/* Metadata Details */}
        <div
          style={{
            borderTop: "1px solid var(--color-border)",
            paddingTop: "12px",
            marginBottom: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            fontSize: "0.8rem",
            color: "var(--color-text-secondary)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <MapPin size={14} color="var(--color-secondary)" style={{ flexShrink: 0 }} />
            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {item.location}
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <Calendar size={14} color="var(--color-text-muted)" style={{ flexShrink: 0 }} />
            <span>Found on: {item.foundDate}</span>
          </div>
        </div>

        {/* Action Button */}
        <Link
          to={targetPath}
          className="btn btn-outline-primary btn-sm btn-block"
          style={{
            marginTop: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            fontWeight: 600,
          }}
        >
          {!isAuthenticated ? (
            <>
              <Lock size={13} />
              <span>Login to View Details</span>
            </>
          ) : (
            <>
              <span>View Details</span>
              <ArrowRight size={14} />
            </>
          )}
        </Link>
      </div>
    </div>
  );
}
