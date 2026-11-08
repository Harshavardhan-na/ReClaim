import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useItems } from "../context/ItemContext";
import StatusBadge from "../components/StatusBadge";
import Modal from "../components/Modal";
import { CATEGORIES, CAMPUS_LOCATIONS } from "../data/sampleData";

import {
  Search,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  AlertTriangle,
  RotateCcw,
  PlusCircle,
} from "lucide-react";

export default function AdminManageItemsPage() {
  const {
    items,
    updateItem,
    deleteItem,
    updateStatus,
  } = useItems();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [categoryFilter, setCategoryFilter] = useState("ALL");

  // Edit Modal State
  const [editingItem, setEditingItem] = useState(null);
  const [editName, setEditName] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [editStatus, setEditStatus] = useState("AVAILABLE");
  const [editDescription, setEditDescription] = useState("");
  const [editContactName, setEditContactName] = useState("");
  const [editContactPhone, setEditContactPhone] = useState("");

  // Delete Modal State
  const [deletingId, setDeletingId] = useState(null);
  const [notice, setNotice] = useState("");
  const [saving, setSaving] = useState(false);

  // ==================================================
  // FILTER ITEMS
  // ==================================================

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();

        const matchesName = (item.name || "").toLowerCase().includes(q);
        const matchesLoc = (item.location || "").toLowerCase().includes(q);
        const matchesContact = (item.contactName || "").toLowerCase().includes(q);

        if (!matchesName && !matchesLoc && !matchesContact) {
          return false;
        }
      }

      if (statusFilter !== "ALL" && item.status !== statusFilter) {
        return false;
      }

      if (categoryFilter !== "ALL" && item.category !== categoryFilter) {
        return false;
      }

      return true;
    });
  }, [items, searchQuery, statusFilter, categoryFilter]);

  // ==================================================
  // OPEN EDIT MODAL
  // ==================================================

  const handleOpenEdit = (item) => {
    setEditingItem(item);

    setEditName(item.name || "");
    setEditCategory(item.category || "");
    setEditLocation(item.location || "");
    setEditStatus(item.status || "AVAILABLE");
    setEditDescription(item.description || "");
    setEditContactName(item.contactName || "");
    setEditContactPhone(item.contactPhone || "");
  };

  // ==================================================
  // SAVE ITEM EDITS
  // ==================================================

  const handleSaveEdit = async (e) => {
    e.preventDefault();

    if (!editingItem || saving) return;

    setSaving(true);

    try {
      await updateItem(editingItem.id, {
        name: editName.trim(),
        category: editCategory,
        location: editLocation,
        description: editDescription.trim(),
        contactName: editContactName.trim(),
        contactPhone: editContactPhone.trim(),
      });

      if (editingItem.status !== editStatus) {
        await updateStatus(editingItem.id, editStatus);
      }

      setEditingItem(null);

      setNotice(
        "Item record successfully updated by Administrator."
      );

      setTimeout(() => setNotice(""), 3500);

    } catch (error) {
      console.error("Failed to update item:", error);

      setNotice(
        error.message || "Failed to update item. Please try again."
      );

    } finally {
      setSaving(false);
    }
  };

  // ==================================================
  // CHANGE ITEM STATUS
  // ==================================================

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateStatus(id, newStatus);

      setNotice(`Item status updated to ${newStatus}`);

      setTimeout(() => setNotice(""), 3500);

    } catch (error) {
      console.error("Status update failed:", error);

      setNotice(
        error.message || "Failed to update item status."
      );
    }
  };

  // ==================================================
  // DELETE ITEM
  // ==================================================

  const handleConfirmDelete = async () => {
    if (!deletingId) return;

    try {
      await deleteItem(deletingId);

      setDeletingId(null);

      setNotice(
        "Item successfully deleted by Administrator."
      );

      setTimeout(() => setNotice(""), 3500);

    } catch (error) {
      console.error("Item deletion failed:", error);

      setNotice(
        error.message || "Failed to delete item."
      );
    }
  };

  // ==================================================
  // PAGE UI
  // ==================================================

  return (
    <div>

      {/* HEADER */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
          flexWrap: "wrap",
          gap: "14px",
        }}
      >
        <div>
          <h2
            style={{
              fontSize: "1.6rem",
              color: "var(--color-primary)",
            }}
          >
            Manage All Campus Items ({filteredItems.length})
          </h2>

          <p
            style={{
              fontSize: "0.875rem",
              color: "var(--color-text-secondary)",
            }}
          >
            Administrative master table: Edit details, delete records,
            or transition item statuses.
          </p>
        </div>

        <Link to="/admin/post" className="btn btn-secondary">
          <PlusCircle size={16} />
          <span>Log Security Item</span>
        </Link>
      </div>

      {/* NOTIFICATION */}

      {notice && (
        <div
          style={{
            backgroundColor: "var(--color-success-bg)",
            border: "1px solid rgba(16, 185, 129, 0.4)",
            color: "var(--color-success-text)",
            padding: "12px 18px",
            borderRadius: "var(--radius-md)",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontWeight: 600,
          }}
        >
          <CheckCircle size={18} />
          <span>{notice}</span>
        </div>
      )}

      {/* FILTERS */}

      <div
        className="card"
        style={{
          padding: "18px 20px",
          marginBottom: "24px",
          backgroundColor: "#FFFFFF",
          display: "flex",
          alignItems: "center",
          gap: "14px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            flex: 1,
            minWidth: "220px",
            position: "relative",
          }}
        >
          <Search
            size={16}
            color="var(--color-text-muted)"
            style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          />

          <input
            type="text"
            className="form-control"
            placeholder="Search by name, location, or reporter..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              paddingLeft: "36px",
              height: "38px",
              fontSize: "0.85rem",
            }}
          />
        </div>

        <div style={{ minWidth: "150px" }}>
          <select
            className="form-control"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              height: "38px",
              fontSize: "0.85rem",
            }}
          >
            <option value="ALL">All Statuses</option>
            <option value="AVAILABLE">AVAILABLE</option>
            <option value="CLAIMED">CLAIMED</option>
            <option value="RETURNED">RETURNED</option>
          </select>
        </div>

        <div style={{ minWidth: "170px" }}>
          <select
            className="form-control"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{
              height: "38px",
              fontSize: "0.85rem",
            }}
          >
            <option value="ALL">All Categories</option>

            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {(searchQuery ||
          statusFilter !== "ALL" ||
          categoryFilter !== "ALL") && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setStatusFilter("ALL");
                setCategoryFilter("ALL");
              }}
              className="btn btn-outline btn-sm"
              style={{ height: "38px" }}
            >
              <RotateCcw size={14} /> Reset
            </button>
          )}
      </div>

      {/* MASTER DATA TABLE */}

      <div
        className="card"
        style={{
          padding: "0",
          backgroundColor: "#FFFFFF",
          overflow: "hidden",
        }}
      >
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "left",
              fontSize: "0.875rem",
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: "#F8FAFC",
                  borderBottom: "2px solid var(--color-border)",
                }}
              >
                <th style={thStyle}>Photo &amp; Item</th>
                <th style={thStyle}>Category &amp; Date</th>
                <th style={thStyle}>Location</th>
                <th style={thStyle}>Current Status</th>
                <th style={thStyle}>Status Control</th>
                <th
                  style={{
                    ...thStyle,
                    textAlign: "right",
                  }}
                >
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredItems.map((item) => (
                <tr
                  key={item.id}
                  style={{
                    borderBottom: "1px solid var(--color-border)",
                    transition: "background-color 0.15s",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = "#F8FAFC";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  <td style={tdStyle}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "8px",
                          objectFit: "cover",
                          border: "1px solid var(--color-border)",
                          backgroundColor: "#F1F5F9",
                        }}
                      />

                      <div>
                        <div
                          style={{
                            fontWeight: 700,
                            color: "var(--color-primary)",
                            maxWidth: "240px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {item.name}
                        </div>

                        <div
                          style={{
                            fontSize: "0.75rem",
                            color: "var(--color-text-secondary)",
                          }}
                        >
                          Contact: {item.contactName} ({item.contactPhone})
                        </div>
                      </div>
                    </div>
                  </td>

                  <td style={tdStyle}>
                    <div style={{ fontWeight: 600 }}>
                      {item.category}
                    </div>

                    <div
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--color-text-muted)",
                      }}
                    >
                      {item.foundDate}
                    </div>
                  </td>

                  <td
                    style={{
                      ...tdStyle,
                      color: "var(--color-text-secondary)",
                      maxWidth: "200px",
                    }}
                  >
                    {item.location}
                  </td>

                  <td style={tdStyle}>
                    <StatusBadge status={item.status} size="sm" />
                  </td>

                  <td style={tdStyle}>
                    <select
                      className="form-control"
                      value={item.status}
                      onChange={(e) =>
                        handleStatusChange(item.id, e.target.value)
                      }
                      style={{
                        padding: "4px 8px",
                        fontSize: "0.78rem",
                        height: "32px",
                        fontWeight: 700,
                        backgroundColor: "#FFFFFF",
                      }}
                    >
                      <option value="AVAILABLE">AVAILABLE</option>
                      <option value="CLAIMED">CLAIMED</option>
                      <option value="RETURNED">RETURNED</option>
                    </select>
                  </td>

                  <td
                    style={{
                      ...tdStyle,
                      textAlign: "right",
                    }}
                  >
                    <div
                      style={{
                        display: "inline-flex",
                        gap: "6px",
                      }}
                    >
                      <Link
                        to={`/admin/item/${item.id}`}
                        className="btn btn-outline btn-sm"
                        style={{ padding: "6px 8px" }}
                        title="View Public Details"
                      >
                        <Eye size={14} />
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleOpenEdit(item)}
                        className="btn btn-outline-primary btn-sm"
                        style={{ padding: "6px 8px" }}
                        title="Edit Item as Admin"
                      >
                        <Edit size={14} />
                      </button>

                      <button
                        type="button"
                        onClick={() => setDeletingId(item.id)}
                        className="btn btn-outline btn-sm"
                        style={{
                          padding: "6px 8px",
                          color: "var(--color-danger)",
                          borderColor: "rgba(239, 68, 68, 0.4)",
                        }}
                        title="Delete Item as Admin"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredItems.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    style={{
                      padding: "40px",
                      textAlign: "center",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    No items found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADMIN EDIT MODAL */}

      <Modal
        isOpen={Boolean(editingItem)}
        onClose={() => !saving && setEditingItem(null)}
        title="Admin Edit Item Record"
        maxWidth="640px"
      >
        {editingItem && (
          <form onSubmit={handleSaveEdit}>
            <div className="form-group">
              <label className="form-label">Item Name</label>

              <input
                type="text"
                className="form-control"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                required
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "14px",
              }}
            >
              <div className="form-group">
                <label className="form-label">Category</label>

                <select
                  className="form-control"
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                >
                  {CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Status Override</label>

                <select
                  className="form-control"
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                >
                  <option value="AVAILABLE">AVAILABLE</option>
                  <option value="CLAIMED">CLAIMED</option>
                  <option value="RETURNED">RETURNED</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Found Location</label>

              <select
                className="form-control"
                value={editLocation}
                onChange={(e) => setEditLocation(e.target.value)}
              >
                {CAMPUS_LOCATIONS.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "14px",
              }}
            >
              <div className="form-group">
                <label className="form-label">
                  Contact Person Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  value={editContactName}
                  onChange={(e) => setEditContactName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Contact Phone</label>

                <input
                  type="text"
                  className="form-control"
                  value={editContactPhone}
                  onChange={(e) => setEditContactPhone(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>

              <textarea
                rows={3}
                className="form-control"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                required
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
                marginTop: "24px",
              }}
            >
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="btn btn-outline"
                disabled={saving}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={saving}
              >
                {saving ? "Updating..." : "Update Record"}
              </button>
            </div>
          </form>
        )}
      </Modal>

      {/* ADMIN DELETE MODAL */}

      <Modal
        isOpen={Boolean(deletingId)}
        onClose={() => setDeletingId(null)}
        title="Admin Record Removal"
      >
        <div style={{ textAlign: "center", padding: "10px 0" }}>
          <div
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              backgroundColor: "var(--color-danger-bg)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px auto",
              color: "var(--color-danger)",
            }}
          >
            <AlertTriangle size={26} />
          </div>

          <h4
            style={{
              fontSize: "1.15rem",
              color: "var(--color-primary)",
              marginBottom: "8px",
            }}
          >
            Permanently Remove Campus Item?
          </h4>

          <p
            style={{
              fontSize: "0.875rem",
              color: "var(--color-text-secondary)",
              marginBottom: "24px",
            }}
          >
            As Administrator, removing this item will purge it from
            campus searches and audits.
          </p>

          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
            }}
          >
            <button
              type="button"
              onClick={() => setDeletingId(null)}
              className="btn btn-outline"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleConfirmDelete}
              className="btn btn-danger"
            >
              Permanently Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}


// ==================================================
// REUSABLE TABLE STYLES
// ==================================================

const thStyle = {
  padding: "14px 18px",
  fontWeight: 700,
  color: "var(--color-primary)",
};

const tdStyle = {
  padding: "14px 18px",
  verticalAlign: "middle",
};