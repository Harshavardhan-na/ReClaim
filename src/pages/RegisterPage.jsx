import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Compass,
  User,
  Mail,
  Lock,
  AlertCircle,
  Info
} from "lucide-react";
import { validateUniversityEmail } from "../config/authConfig";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // 1. Validate Full Name
    if (!fullName.trim()) {
      setError("Please provide your full legal name.");
      return;
    }
    if (fullName.trim().length < 2) {
      setError("Full name must contain at least 2 characters.");
      return;
    }

    // 2. Validate University Email (accepts both Student and Admin formats)
    const emailValidation = validateUniversityEmail(email.trim());
    if (!emailValidation.isValid) {
      setError(emailValidation.message);
      return;
    }

    // 3. Validate Password
    if (password.length < 6) {
      setError("Password must be at least 6 characters in length.");
      return;
    }

    // 4. Validate Confirm Password
    if (password !== confirmPassword) {
      setError("Password confirmation does not match the entered password.");
      return;
    }

    setLoading(true);

    try {
      // Common registration: automatically sets role according to email format
      const newUser = await register({
        fullName: fullName.trim(),
        email: email.trim(),
        password,
      });

      // Automatic Role-Based Redirection
      if (newUser.role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/student/dashboard", { replace: true });
      }
    } catch (err) {
      setError(err.message || "Registration failed. Please check information.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - 150px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 20px",
        backgroundColor: "var(--color-bg)",
      }}
    >
      <div
        className="card"
        style={{
          width: "100%",
          maxWidth: "480px",
          padding: "36px 32px",
          backgroundColor: "#FFFFFF",
          boxShadow: "var(--shadow-lg)",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              backgroundColor: "var(--color-secondary)",
              color: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 14px auto",
              boxShadow: "0 4px 12px rgba(15, 157, 146, 0.25)",
            }}
          >
            <Compass size={28} color="#FFFFFF" strokeWidth={2.5} />
          </div>
          <h2 style={{ fontSize: "1.6rem", color: "var(--color-primary)", marginBottom: "6px" }}>
            Register
          </h2>
          <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
            Create your campus account on ReClaim
          </p>
        </div>

        {/* Informational Guidance on University Formats */}
        <div
          style={{
            backgroundColor: "rgba(15, 157, 146, 0.08)",
            border: "1px solid rgba(15, 157, 146, 0.25)",
            padding: "11px 14px",
            borderRadius: "var(--radius-md)",
            fontSize: "0.8rem",
            color: "var(--color-primary)",
            marginBottom: "20px",
            display: "flex",
            alignItems: "flex-start",
            gap: "8px",
            lineHeight: 1.45,
          }}
        >
          <Info size={16} color="var(--color-secondary)" style={{ flexShrink: 0, marginTop: "2px" }} />
          <div>
            <strong>Campus Email Formats:</strong>
            <div style={{ marginTop: "3px" }}>
              &bull; <strong>Student:</strong> <code>22BCE1042@vitap.ac.in</code>
            </div>
            <div>
              &bull; <strong>Administrator:</strong> <code>admin.harsha@vitap.ac.in</code>
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div
            style={{
              backgroundColor: "var(--color-danger-bg)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              color: "var(--color-danger-text)",
              padding: "10px 14px",
              borderRadius: "var(--radius-md)",
              fontSize: "0.85rem",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "20px",
            }}
          >
            <AlertCircle size={16} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="form-group">
            <label className="form-label" htmlFor="reg-name">
              Full Name <span className="required">*</span>
            </label>
            <div style={{ position: "relative" }}>
              <User
                size={17}
                color="var(--color-text-muted)"
                style={{
                  position: "absolute",
                  left: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              />
              <input
                id="reg-name"
                type="text"
                className="form-control"
                placeholder="Enter full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                style={{ paddingLeft: "42px" }}
                required
                autoComplete="name"
              />
            </div>
          </div>

          {/* University Email */}
          <div className="form-group">
            <label className="form-label" htmlFor="reg-email">
              University Email <span className="required">*</span>
            </label>
            <div style={{ position: "relative" }}>
              <Mail
                size={17}
                color="var(--color-text-muted)"
                style={{
                  position: "absolute",
                  left: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              />
              <input
                id="reg-email"
                type="email"
                className="form-control"
                placeholder="e.g. 22BCE1042@vitap.ac.in or admin.harsha@vitap.ac.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ paddingLeft: "42px" }}
                required
                autoComplete="email"
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="form-label" htmlFor="reg-password">
              Password <span className="required">*</span>
            </label>
            <div style={{ position: "relative" }}>
              <Lock
                size={17}
                color="var(--color-text-muted)"
                style={{
                  position: "absolute",
                  left: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              />
              <input
                id="reg-password"
                type="password"
                className="form-control"
                placeholder="Minimum 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ paddingLeft: "42px" }}
                required
                autoComplete="new-password"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label className="form-label" htmlFor="reg-confirm">
              Confirm Password <span className="required">*</span>
            </label>
            <div style={{ position: "relative" }}>
              <Lock
                size={17}
                color="var(--color-text-muted)"
                style={{
                  position: "absolute",
                  left: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              />
              <input
                id="reg-confirm"
                type="password"
                className="form-control"
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{ paddingLeft: "42px" }}
                required
                autoComplete="new-password"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-secondary btn-block btn-lg"
            style={{ marginTop: "12px", marginBottom: "20px" }}
            disabled={loading}
          >
            {loading ? "Registering Account..." : "Register"}
          </button>
        </form>

        {/* Existing Account Link */}
        <div style={{ textAlign: "center", fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "var(--color-primary)",
              fontWeight: 700,
              textDecoration: "underline",
            }}
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
