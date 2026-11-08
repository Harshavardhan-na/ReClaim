import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useItems } from "../context/ItemContext";
import { useAuth } from "../context/AuthContext";
import StatusBadge from "../components/StatusBadge";
import Modal from "../components/Modal";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Tag,
  Phone,
  Mail,
  User,
  ShieldCheck,
  Trash2,
  CheckCircle,
  AlertTriangle
} from "lucide-react";

export default function ItemDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { getItem, deleteItem, updateStatus } = useItems();
  const { currentUser, isAdmin } = useAuth();

  const item = getItem(id);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [statusChangeSuccess, setStatusChangeSuccess] = useState("");
  const [processing, setProcessing] = useState(false);
  const [actionError, setActionError] = useState("");

  if (!item) {
    return (
      <div
        className="container"
        style={{
          padding: "80px 24px",
          textAlign: "center"
        }}
      >
        <h2
          style={{
            fontSize: "1.8rem",
            color: "var(--color-primary)",
            marginBottom: "12px"
          }}
        >
          Item Not Found
        </h2>

        <p
          style={{
            color: "var(--color-text-secondary)",
            marginBottom: "24px"
          }}
        >
          The item record you are looking for may have been removed or does not exist.
        </p>

        <Link
          to={isAdmin ? "/admin/browse" : "/student/browse"}
          className="btn btn-primary"
        >
          <ArrowLeft size={16} />
          <span>Back to Browse</span>
        </Link>
      </div>
    );
  }

  const isOwner =
    currentUser && item.postedBy === currentUser.id;

  const canEdit = isOwner || isAdmin;
  const canDelete = isOwner || isAdmin;
  const canChangeStatus = isAdmin;

  // DELETE ITEM
  const handleDelete = async () => {
    setProcessing(true);
    setActionError("");

    try {
      await deleteItem(item.id);

      setDeleteModalOpen(false);

      if (isAdmin) {
        navigate("/admin/manage-items");
      } else {
        navigate("/student/my-posts");
      }
    } catch (error) {
      console.error("Item deletion failed:", error);

      setActionError(
        error.message || "Failed to delete item. Please try again."
      );
    } finally {
      setProcessing(false);
    }
  };

  // UPDATE ITEM STATUS
  const handleStatusChange = async (newStatus) => {
    if (processing || item.status === newStatus) return;

    setProcessing(true);
    setActionError("");
    setStatusChangeSuccess("");

    try {
      await updateStatus(item.id, newStatus);

      setStatusChangeSuccess(
        `Item status updated to ${newStatus}`
      );

      setTimeout(() => {
        setStatusChangeSuccess("");
      }, 3500);
    } catch (error) {
      console.error("Status update failed:", error);

      setActionError(
        error.message || "Failed to update item status."
      );
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div
      className="container"
      style={{
        paddingTop: "36px",
        paddingBottom: "72px"
      }}
    >
      {/* BACK BUTTON */}
      <div style={{ marginBottom: "24px" }}>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="btn btn-outline btn-sm"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px"
          }}
        >
          <ArrowLeft size={15} />
          <span>Back</span>
        </button>
      </div>

      {/* STATUS SUCCESS MESSAGE */}
      {statusChangeSuccess && (
        <div
          style={{
            backgroundColor: "var(--color-success-bg)",
            border: "1px solid rgba(16, 185, 129, 0.4)",
            color: "var(--color-success-text)",
            padding: "12px 18px",
            borderRadius: "var(--radius-md)",
            marginBottom: "24px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontWeight: 600
          }}
        >
          <CheckCircle size={18} />
          <span>{statusChangeSuccess}</span>
        </div>
      )}

      {/* ACTION ERROR MESSAGE */}
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

      {/* MAIN DETAILS GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "36px",
          alignItems: "start"
        }}
      >
        {/* LEFT COLUMN: ITEM IMAGE */}
        <div>
          <div
            className="card"
            style={{
              overflow: "hidden",
              backgroundColor: "#FFFFFF",
              border: "1px solid var(--color-border)"
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                paddingTop: "75%",
                backgroundColor: "#F1F5F9"
              }}
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover"
                }}
              />

              <div
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "16px"
                }}
              >
                <StatusBadge
                  status={item.status}
                  size="md"
                />
              </div>
            </div>

            {/* PHOTO FOOTER */}
            <div
              style={{
                padding: "14px 20px",
                backgroundColor: "#F8FAFC",
                borderTop: "1px solid var(--color-border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: "0.8rem",
                color: "var(--color-text-secondary)"
              }}
            >
              <span>Verified Campus Item Image</span>
              <span>Record ID: {item.id}</span>
            </div>
          </div>

          {/* ADMIN STATUS MANAGEMENT */}
          {canChangeStatus && (
            <div
              className="card"
              style={{
                marginTop: "24px",
                padding: "20px 24px",
                backgroundColor: "#F8FAFC",
                borderLeft: "4px solid var(--color-primary)"
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "12px",
                  color: "var(--color-primary)",
                  fontWeight: 700,
                  fontSize: "0.95rem"
                }}
              >
                <ShieldCheck
                  size={18}
                  color="var(--color-secondary)"
                />

                <span>Admin Status Controls</span>
              </div>

              <p
                style={{
                  fontSize: "0.825rem",
                  color: "var(--color-text-secondary)",
                  marginBottom: "14px"
                }}
              >
                Update item lifecycle state according to campus verification protocol:
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  flexWrap: "wrap"
                }}
              >
                <button
                  type="button"
                  disabled={processing || item.status === "AVAILABLE"}
                  onClick={() => handleStatusChange("AVAILABLE")}
                  className={`btn btn-sm ${item.status === "AVAILABLE"
                      ? "btn-success"
                      : "btn-outline"
                    }`}
                >
                  Mark Available
                </button>

                <button
                  type="button"
                  disabled={processing || item.status === "CLAIMED"}
                  onClick={() => handleStatusChange("CLAIMED")}
                  className={`btn btn-sm ${item.status === "CLAIMED"
                      ? "btn-secondary"
                      : "btn-outline"
                    }`}
                  style={
                    item.status === "CLAIMED"
                      ? {
                        backgroundColor: "var(--color-warning)",
                        borderColor: "var(--color-warning)"
                      }
                      : {}
                  }
                >
                  Mark Claimed
                </button>

                <button
                  type="button"
                  disabled={processing || item.status === "RETURNED"}
                  onClick={() => handleStatusChange("RETURNED")}
                  className={`btn btn-sm ${item.status === "RETURNED"
                      ? "btn-primary"
                      : "btn-outline"
                    }`}
                >
                  Mark Returned
                </button>
              </div>

              {processing && (
                <p
                  style={{
                    marginTop: "12px",
                    fontSize: "0.8rem",
                    color: "var(--color-text-secondary)"
                  }}
                >
                  Updating...
                </p>
              )}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: ITEM DETAILS */}
        <div>
          <div
            className="card"
            style={{
              padding: "32px",
              backgroundColor: "#FFFFFF"
            }}
          >
            {/* CATEGORY AND FOUND DATE */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "16px",
                flexWrap: "wrap"
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  backgroundColor: "rgba(20, 45, 78, 0.08)",
                  color: "var(--color-primary)",
                  padding: "4px 12px",
                  borderRadius: "var(--radius-full)",
                  fontSize: "0.8rem",
                  fontWeight: 600
                }}
              >
                <Tag
                  size={13}
                  color="var(--color-secondary)"
                />

                <span>{item.category}</span>
              </span>

              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "0.825rem",
                  color: "var(--color-text-secondary)"
                }}
              >
                <Calendar size={14} />
                <span>Found on: {item.foundDate}</span>
              </span>
            </div>

            {/* ITEM TITLE */}
            <h1
              style={{
                fontSize: "1.85rem",
                color: "var(--color-primary)",
                marginBottom: "16px",
                lineHeight: 1.25
              }}
            >
              {item.name}
            </h1>

            {/* FOUND LOCATION */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
                padding: "14px 18px",
                backgroundColor: "var(--color-bg)",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--color-border)",
                marginBottom: "24px"
              }}
            >
              <MapPin
                size={20}
                color="var(--color-secondary)"
                style={{
                  flexShrink: 0,
                  marginTop: "2px"
                }}
              />

              <div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    color: "var(--color-text-secondary)"
                  }}
                >
                  Found Location
                </div>

                <div
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    color: "var(--color-text-primary)"
                  }}
                >
                  {item.location}
                </div>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div style={{ marginBottom: "28px" }}>
              <h3
                style={{
                  fontSize: "1.05rem",
                  color: "var(--color-primary)",
                  marginBottom: "8px"
                }}
              >
                Full Description
              </h3>

              <p
                style={{
                  fontSize: "0.95rem",
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.7,
                  whiteSpace: "pre-line"
                }}
              >
                {item.description}
              </p>
            </div>

            {/* CONTACT INFORMATION */}
            <div
              style={{
                padding: "24px",
                backgroundColor: "#F8FAFC",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--color-border)",
                marginBottom: "28px"
              }}
            >
              <h3
                style={{
                  fontSize: "1.1rem",
                  color: "var(--color-primary)",
                  marginBottom: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}
              >
                <User
                  size={18}
                  color="var(--color-secondary)"
                />

                <span>Contact Person Information</span>
              </h3>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  marginBottom: "20px"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px"
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--color-text-secondary)",
                      width: "90px"
                    }}
                  >
                    Name:
                  </span>

                  <span
                    style={{
                      fontSize: "0.95rem",
                      fontWeight: 700,
                      color: "var(--color-text-primary)"
                    }}
                  >
                    {item.contactName}
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px"
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--color-text-secondary)",
                      width: "90px"
                    }}
                  >
                    Phone:
                  </span>

                  <span
                    style={{
                      fontSize: "0.95rem",
                      fontWeight: 600,
                      color: "var(--color-primary)"
                    }}
                  >
                    {item.contactPhone}
                  </span>
                </div>

                {item.contactEmail && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px"
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.85rem",
                        color: "var(--color-text-secondary)",
                        width: "90px"
                      }}
                    >
                      Email:
                    </span>

                    <span
                      style={{
                        fontSize: "0.95rem",
                        color: "var(--color-text-primary)"
                      }}
                    >
                      {item.contactEmail}
                    </span>
                  </div>
                )}
              </div>

              {/* CALL AND EMAIL BUTTONS */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px"
                }}
              >
                <a
                  href={`tel:${item.contactPhone}`}
                  className="btn btn-secondary"
                  style={{ textDecoration: "none" }}
                >
                  <Phone size={16} />
                  <span>Call Finder</span>
                </a>

                {item.contactEmail ? (
                  <a
                    href={`mailto:${item.contactEmail}?subject=ReClaim: Inquiry regarding ${encodeURIComponent(item.name)}`}
                    className="btn btn-outline-primary"
                    style={{ textDecoration: "none" }}
                  >
                    <Mail size={16} />
                    <span>Send Email</span>
                  </a>
                ) : (
                  <button
                    type="button"
                    className="btn btn-outline"
                    disabled
                  >
                    <Mail size={16} />
                    <span>No Email Provided</span>
                  </button>
                )}
              </div>
            </div>

            {/* OWNER / ADMIN MANAGEMENT */}
            {canDelete && (
              <div
                style={{
                  paddingTop: "20px",
                  borderTop: "1px solid var(--color-border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "12px"
                }}
              >
                <span
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--color-text-muted)"
                  }}
                >
                  {isAdmin
                    ? "Admin authority enabled"
                    : "You reported this item"}
                </span>

                <div
                  style={{
                    display: "flex",
                    gap: "10px"
                  }}
                >
                  <button
                    type="button"
                    disabled={processing}
                    onClick={() => {
                      setActionError("");
                      setDeleteModalOpen(true);
                    }}
                    className="btn btn-outline btn-sm"
                    style={{
                      color: "var(--color-danger)",
                      borderColor: "rgba(239, 68, 68, 0.4)"
                    }}
                  >
                    <Trash2 size={14} />
                    <span>Delete Record</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => {
          if (!processing) {
            setDeleteModalOpen(false);
            setActionError("");
          }
        }}
        title="Confirm Record Deletion"
      >
        <div
          style={{
            textAlign: "center",
            padding: "10px 0"
          }}
        >
          <div
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "50%",
              backgroundColor: "var(--color-danger-bg)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px auto",
              color: "var(--color-danger)"
            }}
          >
            <AlertTriangle size={28} />
          </div>

          <h4
            style={{
              fontSize: "1.15rem",
              color: "var(--color-primary)",
              marginBottom: "8px"
            }}
          >
            Permanently Delete Item?
          </h4>

          <p
            style={{
              fontSize: "0.875rem",
              color: "var(--color-text-secondary)",
              marginBottom: "24px"
            }}
          >
            Are you sure you want to delete{" "}
            <strong>"{item.name}"</strong>? This action cannot be undone.
          </p>

          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center"
            }}
          >
            <button
              type="button"
              disabled={processing}
              onClick={() => setDeleteModalOpen(false)}
              className="btn btn-outline"
            >
              Cancel
            </button>

            <button
              type="button"
              disabled={processing}
              onClick={handleDelete}
              className="btn btn-danger"
            >
              {processing
                ? "Processing..."
                : "Yes, Delete Record"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}