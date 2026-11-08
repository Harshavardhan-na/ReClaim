import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Compass,
  Lock,
  Mail,
  Eye,
  EyeOff,
  AlertCircle,
  Info
} from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [forgotPasswordMsg, setForgotPasswordMsg] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setForgotPasswordMsg(false);

    if (!email.trim()) {
      setError("Please enter your university email address.");
      return;
    }

    if (!password) {
      setError("Please enter your account password.");
      return;
    }

    setLoading(true);

    try {
      const authenticatedUser = await login(email, password);

      // Automatic Role Identification & Redirection
      if (authenticatedUser.role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else {
        if (from && from.startsWith("/student")) {
          navigate(from, { replace: true });
        } else {
          navigate("/student/dashboard", { replace: true });
        }
      }
    } catch (err) {
      setError(err.message || "Authentication failed. Please verify credentials.");
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
          maxWidth: "460px",
          padding: "36px 32px",
          backgroundColor: "#FFFFFF",
          boxShadow: "var(--shadow-lg)",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "26px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              backgroundColor: "var(--color-primary)",
              color: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 14px auto",
              boxShadow: "0 4px 12px rgba(20, 45, 78, 0.2)",
            }}
          >
            <Compass size={28} color="#0F9D92" strokeWidth={2.5} />
          </div>
          <h2 style={{ fontSize: "1.6rem", color: "var(--color-primary)", marginBottom: "6px" }}>
            Login
          </h2>
          <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
            Sign in with your university credentials
          </p>
        </div>

        {/* Protected route redirect warning */}
        {from && (
          <div
            style={{
              backgroundColor: "#FFFBEB",
              border: "1px solid #FDE68A",
              color: "#92400E",
              padding: "10px 14px",
              borderRadius: "var(--radius-md)",
              fontSize: "0.825rem",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "18px",
            }}
          >
            <Info size={16} style={{ flexShrink: 0 }} />
            <span>Please login to access the requested page.</span>
          </div>
        )}

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

        {/* Forgot Password Notice Placeholder */}
        {forgotPasswordMsg && (
          <div
            style={{
              backgroundColor: "rgba(15, 157, 146, 0.08)",
              border: "1px solid rgba(15, 157, 146, 0.3)",
              color: "var(--color-primary)",
              padding: "12px 14px",
              borderRadius: "var(--radius-md)",
              fontSize: "0.825rem",
              marginBottom: "20px",
              lineHeight: 1.5,
            }}
          >
            <strong>Password Recovery:</strong> In production, self-service password recovery is securely performed through Amazon Cognito User Pools via email OTP. For demonstration test accounts, please use the test credentials provided below.
          </div>
        )}

        {/* Common Login Form */}
        <form onSubmit={handleSubmit}>
          {/* University Email */}
          <div className="form-group">
            <label className="form-label" htmlFor="login-email">
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
                id="login-email"
                type="email"
                className="form-control"
                placeholder="22BCE1042@vitap.ac.in or admin.harsha@vitap.ac.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ paddingLeft: "42px" }}
                required
                autoComplete="email"
              />
            </div>
          </div>

          {/* Password with Show/Hide */}
          <div className="form-group">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
              <label className="form-label" htmlFor="login-password" style={{ margin: 0 }}>
                Password <span className="required">*</span>
              </label>
              <button
                type="button"
                onClick={() => setForgotPasswordMsg(!forgotPasswordMsg)}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--color-secondary)",
                  fontSize: "0.78rem",
                  cursor: "pointer",
                  fontWeight: 600,
                  textDecoration: "underline",
                }}
              >
                Forgot Password?
              </button>
            </div>
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
                id="login-password"
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ paddingLeft: "42px", paddingRight: "44px" }}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--color-text-muted)",
                  padding: "4px",
                  display: "flex",
                  alignItems: "center",
                }}
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="btn btn-primary btn-block btn-lg"
            style={{ marginTop: "12px", marginBottom: "20px" }}
            disabled={loading}
          >
            {loading ? "Authenticating..." : "Login"}
          </button>
        </form>

        {/* Test Accounts Reference Card */}
        <div
          style={{
            padding: "12px 14px",
            backgroundColor: "#F8FAFC",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--color-border)",
            marginBottom: "20px",
            fontSize: "0.78rem",
            color: "var(--color-text-secondary)",
            lineHeight: 1.5,
          }}
        >
          <div style={{ fontWeight: 700, color: "var(--color-primary)", marginBottom: "4px" }}>
            Demonstration Credentials:
          </div>
          <div>&bull; <strong>STUDENT:</strong> <code>22BCE1042@vitap.ac.in</code> / <code>Student@123</code></div>
          <div>&bull; <strong>ADMIN:</strong> <code>admin.harsha@vitap.ac.in</code> / <code>Admin@123</code></div>
        </div>

        {/* Register Link */}
        <div style={{ textAlign: "center", fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
          Don't have an account?{" "}
          <Link
            to="/register"
            style={{
              color: "var(--color-secondary)",
              fontWeight: 700,
              textDecoration: "underline",
            }}
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
