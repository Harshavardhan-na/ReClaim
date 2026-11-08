import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useItems } from "../context/ItemContext";
import StatCard from "../components/StatCard";
import StatusBadge from "../components/StatusBadge";
import {
  ShieldAlert,
  Package,
  PackageCheck,
  CheckCircle2,
  Clock,
  Users,
  SlidersHorizontal,
  PlusCircle,
  ExternalLink
} from "lucide-react";

export default function AdminDashboard() {
  const { items, getStats, updateStatus } = useItems();

  const stats = getStats();

  const [statusFilter, setStatusFilter] = useState("ALL");
  const [processing, setProcessing] = useState(false);
  const [actionError, setActionError] = useState("");

  const filteredItems =
    statusFilter === "ALL"
      ? items.slice(0, 6)
      : items.filter((i) => i.status === statusFilter).slice(0, 6);

  const handleQuickStatusChange = async (id, newStatus) => {
    if (processing) return;

    setProcessing(true);
    setActionError("");

    try {
      await updateStatus(id, newStatus);
    } catch (error) {
      console.error("Dashboard status update failed:", error);

      setActionError(
        error.message ||
        "Unable to update item status. Please try again."
      );
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div>
      {/* ADMINISTRATOR HEADER BANNER */}
      <div
        className="card"
        style={{
          padding: "28px 32px",
          marginBottom: "32px",
          backgroundColor: "#142D4E",
          color: "#FFFFFF",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px",
          boxShadow: "var(--shadow-md)",
          borderLeft: "6px solid var(--color-secondary)"
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
              letterSpacing: "0.06em",
              marginBottom: "10px"
            }}
          >
            <ShieldAlert size={14} />
            <span>VIT-AP Campus Security Administration</span>
          </div>

          <h2
            style={{
              fontSize: "1.75rem",
              color: "#FFFFFF",
              marginBottom: "6px"
            }}
          >
            Admin Security Command Console
          </h2>

          <p
            style={{
              color: "#CBD5E1",
              fontSize: "0.95rem",
              maxWidth: "600px"
            }}
          >
            Centralized institutional dashboard to oversee campus found
            reports, verify claimant credentials, and audit lost property
            lifecycles.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap"
          }}
        >
          <Link
            to="/admin/manage-items"
            className="btn btn-secondary"
          >
            <SlidersHorizontal size={17} />
            <span>Manage All Items</span>
          </Link>

          <Link
            to="/admin/post"
            className="btn btn-outline"
            style={{
              borderColor: "#64748B",
              color: "#FFFFFF"
            }}
          >
            <PlusCircle size={17} />
            <span>Log Security Found Item</span>
          </Link>
        </div>
      </div>

      {/* STATISTICS CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "18px",
          marginBottom: "36px"
        }}
      >
        <StatCard
          title="Total Items"
          value={stats.totalItems}
          subtitle="All campus records"
          icon={Package}
          variant="primary"
        />

        <StatCard
          title="Available Items"
          value={stats.availableCount}
          subtitle="In storage / active"
          icon={PackageCheck}
          variant="success"
        />

        <StatCard
          title="Claimed Items"
          value={stats.claimedCount}
          subtitle="Verification pending"
          icon={Clock}
          variant="warning"
        />

        <StatCard
          title="Returned Items"
          value={stats.returnedCount}
          subtitle="Resolved handovers"
          icon={CheckCircle2}
          variant="secondary"
        />

        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          subtitle="Registered accounts"
          icon={Users}
          variant="primary"
        />
      </div>

      {/* ERROR MESSAGE */}
      {actionError && (
        <div
          style={{
            backgroundColor: "var(--color-danger-bg)",
            color: "var(--color-danger)",
            padding: "12px 18px",
            borderRadius: "var(--radius-md)",
            marginBottom: "24px",
            border: "1px solid rgba(239, 68, 68, 0.3)"
          }}
        >
          {actionError}
        </div>
      )}

      {/* RECENT ITEMS TABLE */}
      <div
        className="card"
        style={{
          padding: "26px",
          backgroundColor: "#FFFFFF"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "20px",
            flexWrap: "wrap",
            gap: "14px"
          }}
        >
          <div>
            <h3
              style={{
                fontSize: "1.25rem",
                color: "var(--color-primary)"
              }}
            >
              Recent Campus Records &amp; Status Control
            </h3>

            <p
              style={{
                fontSize: "0.85rem",
                color: "var(--color-text-secondary)"
              }}
            >
              Administrators possess elevated permissions to update
              statuses or audit records
            </p>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px"
            }}
          >
            <select
              className="form-control"
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              style={{
                height: "36px",
                fontSize: "0.825rem",
                minWidth: "150px"
              }}
            >
              <option value="ALL">All Statuses</option>
              <option value="AVAILABLE">Available Only</option>
              <option value="CLAIMED">Claimed Only</option>
              <option value="RETURNED">Returned Only</option>
            </select>

            <Link
              to="/admin/manage-items"
              className="btn btn-outline-primary btn-sm"
            >
              <span>View Full Management Table</span>
            </Link>
          </div>
        </div>

        {/* RESPONSIVE TABLE */}
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "left",
              fontSize: "0.875rem"
            }}
          >
            <thead>
              <tr
                style={{
                  borderBottom: "2px solid var(--color-border)",
                  backgroundColor: "var(--color-bg)"
                }}
              >
                <th
                  style={{
                    padding: "12px 14px",
                    fontWeight: 700,
                    color: "var(--color-text-secondary)"
                  }}
                >
                  Item Photograph &amp; Name
                </th>

                <th
                  style={{
                    padding: "12px 14px",
                    fontWeight: 700,
                    color: "var(--color-text-secondary)"
                  }}
                >
                  Category
                </th>

                <th
                  style={{
                    padding: "12px 14px",
                    fontWeight: 700,
                    color: "var(--color-text-secondary)"
                  }}
                >
                  Location &amp; Date
                </th>

                <th
                  style={{
                    padding: "12px 14px",
                    fontWeight: 700,
                    color: "var(--color-text-secondary)"
                  }}
                >
                  Current Status
                </th>

                <th
                  style={{
                    padding: "12px 14px",
                    fontWeight: 700,
                    color: "var(--color-text-secondary)"
                  }}
                >
                  Admin Status Control
                </th>

                <th
                  style={{
                    padding: "12px 14px",
                    fontWeight: 700,
                    color: "var(--color-text-secondary)",
                    textAlign: "right"
                  }}
                >
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredItems.map((item) => (
                <tr
                  key={item.id}
                  style={{
                    borderBottom:
                      "1px solid var(--color-border)",
                    transition: "background-color 0.15s"
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "#F8FAFC";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "transparent";
                  }}
                >
                  {/* PHOTO AND NAME */}
                  <td
                    style={{
                      padding: "14px",
                      verticalAlign: "middle"
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px"
                      }}
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        style={{
                          width: "48px",
                          height: "48px",
                          borderRadius: "8px",
                          objectFit: "cover",
                          border:
                            "1px solid var(--color-border)",
                          backgroundColor: "#F1F5F9"
                        }}
                      />

                      <div>
                        <div
                          style={{
                            fontWeight: 700,
                            color: "var(--color-primary)"
                          }}
                        >
                          {item.name}
                        </div>

                        <div
                          style={{
                            fontSize: "0.75rem",
                            color: "var(--color-text-muted)"
                          }}
                        >
                          ID: {item.id}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* CATEGORY */}
                  <td
                    style={{
                      padding: "14px",
                      verticalAlign: "middle",
                      color: "var(--color-text-secondary)"
                    }}
                  >
                    {item.category}
                  </td>

                  {/* LOCATION AND DATE */}
                  <td
                    style={{
                      padding: "14px",
                      verticalAlign: "middle"
                    }}
                  >
                    <div
                      style={{
                        fontSize: "0.825rem",
                        color: "var(--color-text-primary)",
                        fontWeight: 500
                      }}
                    >
                      {item.location}
                    </div>

                    <div
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--color-text-muted)"
                      }}
                    >
                      {item.foundDate}
                    </div>
                  </td>

                  {/* STATUS BADGE */}
                  <td
                    style={{
                      padding: "14px",
                      verticalAlign: "middle"
                    }}
                  >
                    <StatusBadge
                      status={item.status}
                      size="sm"
                    />
                  </td>

                  {/* QUICK STATUS CHANGE */}
                  <td
                    style={{
                      padding: "14px",
                      verticalAlign: "middle"
                    }}
                  >
                    <select
                      className="form-control"
                      value={item.status}
                      disabled={processing}
                      onChange={(e) =>
                        handleQuickStatusChange(
                          item.id,
                          e.target.value
                        )
                      }
                      style={{
                        padding: "4px 8px",
                        fontSize: "0.78rem",
                        height: "32px",
                        fontWeight: 600,
                        backgroundColor: "#FFFFFF"
                      }}
                    >
                      <option value="AVAILABLE">
                        AVAILABLE
                      </option>

                      <option value="CLAIMED">
                        CLAIMED
                      </option>

                      <option value="RETURNED">
                        RETURNED
                      </option>
                    </select>
                  </td>

                  {/* ACTIONS */}
                  <td
                    style={{
                      padding: "14px",
                      verticalAlign: "middle",
                      textAlign: "right"
                    }}
                  >
                    <Link
                      to={`/admin/item/${item.id}`}
                      className="btn btn-outline btn-sm"
                      style={{
                        display: "inline-flex",
                        padding: "6px 10px"
                      }}
                      title="View Details"
                    >
                      <ExternalLink size={14} />
                    </Link>
                  </td>
                </tr>
              ))}

              {filteredItems.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    style={{
                      padding: "30px",
                      textAlign: "center",
                      color:
                        "var(--color-text-secondary)"
                    }}
                  >
                    No items found for this status.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}