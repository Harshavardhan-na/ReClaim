import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useItems } from "../context/ItemContext";
import { useAuth } from "../context/AuthContext";
import ItemCard from "../components/ItemCard";
import {
  Search,
  PlusCircle,
  ShieldCheck,
  Zap,
  Sparkles,
  ArrowRight,
  CheckCircle,
  MapPin,
  Clock,
  Award,
  Users,
  Lock
} from "lucide-react";

export default function LandingPage() {
  const { items } = useItems();
  const { isAuthenticated, isStudent, isAdmin } = useAuth();
  const navigate = useNavigate();

  // Top recently found items
  const recentItems = items.slice(0, 4);

  // Compute CTA destinations
  const searchDestination = !isAuthenticated
    ? "/login"
    : isAdmin
    ? "/admin/browse"
    : "/student/browse";

  const postDestination = !isAuthenticated
    ? "/login"
    : isAdmin
    ? "/admin/post"
    : "/student/post";

  return (
    <div>
      {/* Hero Section */}
      <section
        style={{
          background: "linear-gradient(135deg, #142D4E 0%, #0F2038 100%)",
          color: "#FFFFFF",
          paddingTop: "72px",
          paddingBottom: "88px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle decorative background circles */}
        <div
          style={{
            position: "absolute",
            top: "-10%",
            right: "-5%",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(15, 157, 146, 0.15) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-20%",
            left: "-10%",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(20, 63, 110, 0.25) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div style={{ maxWidth: "780px", margin: "0 auto", textAlign: "center" }}>
            {/* Campus & Cloud Badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "rgba(15, 157, 146, 0.16)",
                border: "1px solid rgba(15, 157, 146, 0.35)",
                padding: "6px 16px",
                borderRadius: "var(--radius-full)",
                fontSize: "0.825rem",
                fontWeight: 600,
                color: "#14C2B4",
                marginBottom: "24px",
              }}
            >
              <Sparkles size={15} />
              <span>Intelligent Campus Lost &amp; Found Platform &bull; VIT-AP University</span>
            </div>

            {/* Tagline & Headline */}
            <h1
              style={{
                fontSize: "clamp(2.2rem, 5vw, 3.4rem)",
                fontWeight: 800,
                color: "#FFFFFF",
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
                marginBottom: "20px",
              }}
            >
              Lost Something? <span style={{ color: "var(--color-secondary-light)" }}>Find It.</span>
              <br />
              Found Something? <span style={{ color: "var(--color-secondary-light)" }}>Return It.</span>
            </h1>

            <p
              style={{
                fontSize: "1.1rem",
                color: "#CBD5E1",
                lineHeight: 1.6,
                marginBottom: "36px",
                maxWidth: "640px",
                marginRight: "auto",
                marginLeft: "auto",
              }}
            >
              ReClaim is the centralized university lost and found system for VIT-AP. Designed to reunite students and staff with their valued belongings through safe, verified campus identity checks and high-resolution photographic proof.
            </p>

            {/* Call To Action Buttons: Redirect to Login if unauthenticated */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "16px",
                flexWrap: "wrap",
              }}
            >
              <Link
                to={searchDestination}
                className="btn btn-secondary btn-lg"
                style={{ minWidth: "190px" }}
              >
                <Search size={19} />
                <span>Search Items</span>
              </Link>

              <Link
                to={postDestination}
                className="btn btn-outline btn-lg"
                style={{
                  minWidth: "190px",
                  borderColor: "rgba(255, 255, 255, 0.3)",
                  color: "#FFFFFF",
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                }}
              >
                <PlusCircle size={19} />
                <span>Report Found Item</span>
              </Link>
            </div>

            {/* Notice for unauthenticated visitors */}
            {!isAuthenticated && (
              <div
                style={{
                  marginTop: "16px",
                  fontSize: "0.8rem",
                  color: "#94A3B8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                }}
              >
                <Lock size={13} color="var(--color-secondary)" />
                <span>Campus member authentication required to access full records &amp; post reports</span>
              </div>
            )}

            {/* Key Platform Highlights */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "28px",
                marginTop: "44px",
                paddingTop: "24px",
                borderTop: "1px solid rgba(255, 255, 255, 0.12)",
                fontSize: "0.85rem",
                color: "#94A3B8",
                flexWrap: "wrap",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <ShieldCheck size={18} color="var(--color-secondary)" />
                <span>Campus ID Verified</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Clock size={18} color="var(--color-secondary)" />
                <span>Real-Time Updates</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Zap size={18} color="var(--color-secondary)" />
                <span>Safe Verification Channels</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recently Found Items Section */}
      <section style={{ padding: "72px 0", backgroundColor: "var(--color-bg)" }}>
        <div className="container">
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginBottom: "36px",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--color-secondary)",
                  marginBottom: "6px",
                }}
              >
                Campus Live Feed
              </div>
              <h2 style={{ fontSize: "1.9rem", color: "var(--color-primary)" }}>
                Recently Found Items
              </h2>
            </div>

            <Link
              to={searchDestination}
              className="btn btn-outline-primary"
              style={{ display: "flex", alignItems: "center", gap: "6px" }}
            >
              <span>{isAuthenticated ? "Explore All Items" : "Log In to Explore All"}</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Cards Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))",
              gap: "24px",
            }}
          >
            {recentItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* How ReClaim Works Section */}
      <section style={{ padding: "80px 0", backgroundColor: "#FFFFFF", borderTop: "1px solid var(--color-border)" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 56px auto" }}>
            <div
              style={{
                fontSize: "0.8rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--color-secondary)",
                marginBottom: "8px",
              }}
            >
              Simple 3-Step Process
            </div>
            <h2 style={{ fontSize: "2rem", color: "var(--color-primary)", marginBottom: "14px" }}>
              How ReClaim Works
            </h2>
            <p style={{ color: "var(--color-text-secondary)", fontSize: "1rem" }}>
              Designed to reunite lost personal belongings with their rightful owners safely, quickly, and transparently.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "32px",
            }}
          >
            {/* Step 1 */}
            <div
              className="card"
              style={{
                padding: "36px 28px",
                textAlign: "left",
                position: "relative",
                borderTop: "4px solid var(--color-primary)",
              }}
            >
              <div
                style={{
                  fontSize: "3rem",
                  fontWeight: 800,
                  color: "rgba(20, 45, 78, 0.08)",
                  position: "absolute",
                  top: "16px",
                  right: "24px",
                  lineHeight: 1,
                  fontFamily: "var(--font-heading)",
                }}
              >
                01
              </div>
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "12px",
                  backgroundColor: "rgba(20, 45, 78, 0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--color-primary)",
                  marginBottom: "20px",
                }}
              >
                <PlusCircle size={26} strokeWidth={2.2} />
              </div>
              <h3 style={{ fontSize: "1.2rem", marginBottom: "10px", color: "var(--color-primary)" }}>
                Report or Spot an Item
              </h3>
              <p style={{ color: "var(--color-text-secondary)", fontSize: "0.9rem", lineHeight: 1.6 }}>
                Found a forgotten water bottle, calculator, ID card, or keys? Take a quick photo, specify the campus building or room, and post it within 60 seconds.
              </p>
            </div>

            {/* Step 2 */}
            <div
              className="card"
              style={{
                padding: "36px 28px",
                textAlign: "left",
                position: "relative",
                borderTop: "4px solid var(--color-secondary)",
              }}
            >
              <div
                style={{
                  fontSize: "3rem",
                  fontWeight: 800,
                  color: "rgba(15, 157, 146, 0.12)",
                  position: "absolute",
                  top: "16px",
                  right: "24px",
                  lineHeight: 1,
                  fontFamily: "var(--font-heading)",
                }}
              >
                02
              </div>
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "12px",
                  backgroundColor: "var(--color-secondary-subtle)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--color-secondary)",
                  marginBottom: "20px",
                }}
              >
                <Search size={26} strokeWidth={2.2} />
              </div>
              <h3 style={{ fontSize: "1.2rem", marginBottom: "10px", color: "var(--color-primary)" }}>
                Search &amp; Filter
              </h3>
              <p style={{ color: "var(--color-text-secondary)", fontSize: "0.9rem", lineHeight: 1.6 }}>
                Filter listings by location (AB-1, Library, SAC, Cafeteria), category, or date. Search keyword matches find items even with partial names.
              </p>
            </div>

            {/* Step 3 */}
            <div
              className="card"
              style={{
                padding: "36px 28px",
                textAlign: "left",
                position: "relative",
                borderTop: "4px solid var(--color-success)",
              }}
            >
              <div
                style={{
                  fontSize: "3rem",
                  fontWeight: 800,
                  color: "rgba(16, 185, 129, 0.12)",
                  position: "absolute",
                  top: "16px",
                  right: "24px",
                  lineHeight: 1,
                  fontFamily: "var(--font-heading)",
                }}
              >
                03
              </div>
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "12px",
                  backgroundColor: "var(--color-success-bg)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--color-success)",
                  marginBottom: "20px",
                }}
              >
                <CheckCircle size={26} strokeWidth={2.2} />
              </div>
              <h3 style={{ fontSize: "1.2rem", marginBottom: "10px", color: "var(--color-primary)" }}>
                Verify &amp; Reclaim
              </h3>
              <p style={{ color: "var(--color-text-secondary)", fontSize: "0.9rem", lineHeight: 1.6 }}>
                Connect directly with the finder via instant call or email, verify ownership through distinctive identification marks, and mark items claimed safely.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: "80px 0", backgroundColor: "var(--color-bg)", borderTop: "1px solid var(--color-border)" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "640px", margin: "0 auto 52px auto" }}>
            <div
              style={{
                fontSize: "0.8rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--color-secondary)",
                marginBottom: "8px",
              }}
            >
              Built for VIT-AP Campus Life
            </div>
            <h2 style={{ fontSize: "2rem", color: "var(--color-primary)", marginBottom: "12px" }}>
              Enterprise Grade Campus Features
            </h2>
            <p style={{ color: "var(--color-text-secondary)", fontSize: "0.95rem" }}>
              Engineered with clean architectural principles to support the high volume of daily campus activities.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "24px",
            }}
          >
            <div className="card" style={{ padding: "26px", backgroundColor: "#fff" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
                <div style={{ width: "42px", height: "42px", borderRadius: "10px", backgroundColor: "rgba(20, 45, 78, 0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-primary)" }}>
                  <MapPin size={22} />
                </div>
                <h4 style={{ fontSize: "1.05rem" }}>Campus Zone Mapping</h4>
              </div>
              <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
                Granular location tags specifically matching campus zones: Academic Blocks, Hostels, SAC, Library, and Cafeterias.
              </p>
            </div>

            <div className="card" style={{ padding: "26px", backgroundColor: "#fff" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
                <div style={{ width: "42px", height: "42px", borderRadius: "10px", backgroundColor: "var(--color-secondary-subtle)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-secondary)" }}>
                  <ShieldCheck size={22} />
                </div>
                <h4 style={{ fontSize: "1.05rem" }}>Role-Based Access</h4>
              </div>
              <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
                Clear segregation of duties: Students post and manage their reports; Campus Security Administrators maintain institutional oversight.
              </p>
            </div>

            <div className="card" style={{ padding: "26px", backgroundColor: "#fff" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
                <div style={{ width: "42px", height: "42px", borderRadius: "10px", backgroundColor: "var(--color-success-bg)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-success)" }}>
                  <Award size={22} />
                </div>
                <h4 style={{ fontSize: "1.05rem" }}>High-Res Visual Proof</h4>
              </div>
              <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
                Instant preview uploads that support visual matching for electronic serial numbers, stickers, keychains, and tags.
              </p>
            </div>

            <div className="card" style={{ padding: "26px", backgroundColor: "#fff" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
                <div style={{ width: "42px", height: "42px", borderRadius: "10px", backgroundColor: "var(--color-warning-bg)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-warning)" }}>
                  <Users size={22} />
                </div>
                <h4 style={{ fontSize: "1.05rem" }}>Secure Contact Cards</h4>
              </div>
              <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
                Direct, one-tap mobile calls and campus email composition without exposing sensitive personal information publicly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section
        style={{
          padding: "60px 0",
          backgroundColor: "var(--color-primary)",
          color: "#FFFFFF",
          textAlign: "center",
        }}
      >
        <div className="container" style={{ maxWidth: "700px" }}>
          <h2 style={{ fontSize: "2rem", color: "#FFFFFF", marginBottom: "16px" }}>
            Found an item on campus today?
          </h2>
          <p style={{ color: "#CBD5E1", fontSize: "1rem", marginBottom: "28px" }}>
            Be a good campus citizen. Report it in less than two minutes and help someone recover their valued belongings.
          </p>
          <Link to={postDestination} className="btn btn-secondary btn-lg">
            <PlusCircle size={18} />
            <span>Submit Found Item Report</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
