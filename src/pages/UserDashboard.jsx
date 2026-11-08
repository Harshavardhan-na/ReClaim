import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useItems } from "../context/ItemContext";
import StatCard from "../components/StatCard";
import ItemCard from "../components/ItemCard";
import {
  PackageSearch,
  FileText,
  Clock,
  CheckCheck,
  PlusCircle,
  Search,
  Sparkles,
  ArrowRight
} from "lucide-react";

export default function UserDashboard() {
  const { currentUser } = useAuth();
  const { items, getStats } = useItems();
  const stats = getStats();

  // Latest 3 items posted across the campus
  const recentCampusItems = items.slice(0, 3);

  // User's own items
  const userItems = currentUser ? items.filter((i) => i.postedBy === currentUser.id) : [];

  return (
    <div>
      {/* Welcome Banner Card */}
      <div
        className="card"
        style={{
          padding: "28px 32px",
          marginBottom: "32px",
          background: "linear-gradient(135deg, #142D4E 0%, #1D3F6E 100%)",
          color: "#FFFFFF",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px",
          boxShadow: "var(--shadow-md)",
        }}
      >
        <div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              backgroundColor: "rgba(15, 157, 146, 0.2)",
              color: "#14C2B4",
              padding: "4px 12px",
              borderRadius: "var(--radius-full)",
              fontSize: "0.78rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              marginBottom: "12px",
            }}
          >
            <Sparkles size={13} />
            <span>Student Dashboard</span>
          </div>
          <h2 style={{ fontSize: "1.75rem", color: "#FFFFFF", marginBottom: "6px" }}>
            Welcome back, {currentUser?.name || "Student"}!
          </h2>
          <p style={{ color: "#CBD5E1", fontSize: "0.95rem", maxWidth: "560px" }}>
            Track your lost &amp; found reports, claim items found by fellow campus peers, and help reunite belongings at VIT-AP.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <Link to="/student/post" className="btn btn-secondary">
            <PlusCircle size={18} />
            <span>Report Found Item</span>
          </Link>
          <Link
            to="/student/browse"
            className="btn btn-outline"
            style={{
              borderColor: "rgba(255, 255, 255, 0.3)",
              color: "#FFFFFF",
              backgroundColor: "rgba(255, 255, 255, 0.08)",
            }}
          >
            <Search size={18} />
            <span>Search Items</span>
          </Link>
        </div>
      </div>

      {/* 4 Statistics Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          marginBottom: "36px",
        }}
      >
        <StatCard
          title="Available Items"
          value={stats.availableCount}
          subtitle="Currently waiting for claimant"
          icon={PackageSearch}
          variant="success"
        />
        <StatCard
          title="My Posts"
          value={stats.myPostsCount}
          subtitle="Items reported by you"
          icon={FileText}
          variant="secondary"
        />
        <StatCard
          title="Claimed Items"
          value={stats.claimedCount}
          subtitle="Verification in progress"
          icon={Clock}
          variant="warning"
        />
        <StatCard
          title="Returned Items"
          value={stats.returnedCount}
          subtitle="Successfully reunited"
          icon={CheckCheck}
          variant="primary"
        />
      </div>

      {/* Quick Action Tiles */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "20px",
          marginBottom: "40px",
        }}
      >
        <div
          className="card"
          style={{
            padding: "22px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#FFFFFF",
          }}
        >
          <div>
            <h4 style={{ fontSize: "1.05rem", color: "var(--color-primary)", marginBottom: "4px" }}>
              Report a Found Item
            </h4>
            <p style={{ fontSize: "0.825rem", color: "var(--color-text-secondary)" }}>
              Add photos, building room &amp; contact info
            </p>
          </div>
          <Link to="/student/post" className="btn btn-secondary btn-sm">
            <span>Report Now</span>
          </Link>
        </div>

        <div
          className="card"
          style={{
            padding: "22px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#FFFFFF",
          }}
        >
          <div>
            <h4 style={{ fontSize: "1.05rem", color: "var(--color-primary)", marginBottom: "4px" }}>
              My Reported Posts
            </h4>
            <p style={{ fontSize: "0.825rem", color: "var(--color-text-secondary)" }}>
              Manage, edit or review status of your {userItems.length} posts
            </p>
          </div>
          <Link to="/student/my-posts" className="btn btn-outline-primary btn-sm">
            <span>View ({userItems.length})</span>
          </Link>
        </div>

        <div
          className="card"
          style={{
            padding: "22px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#FFFFFF",
          }}
        >
          <div>
            <h4 style={{ fontSize: "1.05rem", color: "var(--color-primary)", marginBottom: "4px" }}>
              Campus Directory
            </h4>
            <p style={{ fontSize: "0.825rem", color: "var(--color-text-secondary)" }}>
              Browse all {stats.totalItems} listed campus items
            </p>
          </div>
          <Link to="/student/browse" className="btn btn-outline-secondary btn-sm">
            <span>Browse Directory</span>
          </Link>
        </div>
      </div>

      {/* Recently Posted Items on Campus Section */}
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <div>
            <h3 style={{ fontSize: "1.3rem", color: "var(--color-primary)" }}>
              Recently Posted Items on Campus
            </h3>
            <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>
              Fresh entries logged across university blocks
            </p>
          </div>

          <Link
            to="/student/browse"
            className="btn btn-outline btn-sm"
            style={{ display: "flex", alignItems: "center", gap: "6px" }}
          >
            <span>View All ({stats.totalItems})</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "24px",
          }}
        >
          {recentCampusItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
