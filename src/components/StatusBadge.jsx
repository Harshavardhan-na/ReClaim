import React from "react";
import { CheckCircle2, Clock, CheckCheck } from "lucide-react";

export default function StatusBadge({ status, size = "md" }) {
  const normStatus = (status || "AVAILABLE").toUpperCase();

  const config = {
    AVAILABLE: {
      label: "Available",
      className: "badge-available",
      icon: CheckCircle2,
      dotColor: "#10B981"
    },
    CLAIMED: {
      label: "Claimed",
      className: "badge-claimed",
      icon: Clock,
      dotColor: "#F59E0B"
    },
    RETURNED: {
      label: "Returned",
      className: "badge-returned",
      icon: CheckCheck,
      dotColor: "#2563EB"
    }
  };

  const item = config[normStatus] || config.AVAILABLE;
  const IconComponent = item.icon;
  const iconSize = size === "sm" ? 12 : 14;

  return (
    <span
      className={`badge ${item.className}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        fontSize: size === "sm" ? "0.7rem" : "0.78rem",
        padding: size === "sm" ? "3px 8px" : "4px 11px",
      }}
    >
      <IconComponent size={iconSize} strokeWidth={2.5} />
      <span>{item.label}</span>
    </span>
  );
}
