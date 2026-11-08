import React from "react";

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  variant = "primary", // primary, secondary, warning, success, danger
}) {
  const variantStyles = {
    primary: {
      accentColor: "var(--color-primary)",
      iconBg: "rgba(20, 45, 78, 0.08)",
      iconColor: "var(--color-primary)",
    },
    secondary: {
      accentColor: "var(--color-secondary)",
      iconBg: "rgba(15, 157, 146, 0.12)",
      iconColor: "var(--color-secondary)",
    },
    success: {
      accentColor: "var(--color-success)",
      iconBg: "var(--color-success-bg)",
      iconColor: "var(--color-success)",
    },
    warning: {
      accentColor: "var(--color-warning)",
      iconBg: "var(--color-warning-bg)",
      iconColor: "var(--color-warning)",
    },
    danger: {
      accentColor: "var(--color-danger)",
      iconBg: "var(--color-danger-bg)",
      iconColor: "var(--color-danger)",
    },
  };

  const style = variantStyles[variant] || variantStyles.primary;

  return (
    <div
      className="card"
      style={{
        padding: "24px 22px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderTop: `4px solid ${style.accentColor}`,
        backgroundColor: "#FFFFFF",
      }}
    >
      <div>
        <div
          style={{
            fontSize: "0.85rem",
            fontWeight: 600,
            color: "var(--color-text-secondary)",
            textTransform: "uppercase",
            letterSpacing: "0.04em",
            marginBottom: "6px",
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: "2rem",
            fontWeight: 800,
            fontFamily: "var(--font-heading)",
            color: "var(--color-primary)",
            lineHeight: 1.1,
          }}
        >
          {value}
        </div>
        {subtitle && (
          <div
            style={{
              fontSize: "0.75rem",
              color: "var(--color-text-muted)",
              marginTop: "6px",
            }}
          >
            {subtitle}
          </div>
        )}
      </div>

      {Icon && (
        <div
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "14px",
            backgroundColor: style.iconBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: style.iconColor,
            flexShrink: 0,
          }}
        >
          <Icon size={26} strokeWidth={2.2} />
        </div>
      )}
    </div>
  );
}
