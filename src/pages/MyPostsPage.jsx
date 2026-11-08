import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useItems } from "../context/ItemContext";
import StatusBadge from "../components/StatusBadge";
import Modal from "../components/Modal";
import { CATEGORIES, CAMPUS_LOCATIONS } from "../data/sampleData";

import {
  PlusCircle,
  Eye,
  Edit2,
  Trash2,
  MapPin,
  Calendar,
  AlertTriangle,
  CheckCircle,
  PackageOpen,
} from "lucide-react";

export default function MyPostsPage() {
  const { currentUser } = useAuth();

  const { items, updateItem, deleteItem } = useItems();

  // Filter logged-in user's posts
  const myPosts = currentUser
    ? items.filter((item) => item.postedBy === currentUser.id)
    : [];

  // Edit Modal State
  const [editingItem, setEditingItem] = useState(null);
  const [editName, setEditName] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [editPhone, setEditPhone] = useState("");

  // Delete Modal State
  const [deletingId, setDeletingId] = useState(null);
  const [successNotice, setSuccessNotice] = useState("");
  const [saving, setSaving] = useState(false);

  // ==================================================
  // OPEN EDIT MODAL
  // ==================================================

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setEditName(item.name || "");
    setEditCategory(item.category || "");
    setEditDescription(item.description || "");
    setEditLocation(item.location || "");
    setEditPhone(item.contactPhone || "");
  };

  // ==================================================
  // SAVE EDITED ITEM
  // ==================================================

  const handleSaveEdit = async (e) => {
    e.preventDefault();

    if (!editingItem || saving) return;

    setSaving(true);

    try {
      await updateItem(editingItem.id, {
        name: editName.trim(),
        category: editCategory,
        description: editDescription.trim(),
        location: editLocation,
        contactPhone: editPhone.trim(),
      });

      setEditingItem(null);

      setSuccessNotice("Item details updated successfully.");

      setTimeout(() => setSuccessNotice(""), 3500);

    } catch (error) {
      console.error("Item update failed:", error);

      setSuccessNotice(
        error.message || "Failed to update item. Please try again."
      );

    } finally {
      setSaving(false);
    }
  };

  // ==================================================
  // DELETE ITEM
  // ==================================================

  const handleConfirmDelete = async () => {
    if (!deletingId || saving) return;

    setSaving(true);

    try {
      await deleteItem(deletingId);

      setDeletingId(null);

      setSuccessNotice("Post deleted successfully.");

      setTimeout(() => setSuccessNotice(""), 3500);

    } catch (error) {
      console.error("Item deletion failed:", error);

      setSuccessNotice(
        error.message || "Failed to delete post. Please try again."
      );

    } finally {
      setSaving(false);
    }
  };

  // ==================================================
  // PAGE UI
  // ==================================================

  return (
    <div>

      {/* PAGE HEADER */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "28px",
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
            My Reported Posts ({myPosts.length})
          </h2>

          <p
            style={{
              fontSize: "0.875rem",
              color: "var(--color-text-secondary)",
            }}
          >
            Review, edit, and track statuses of items you reported across campus.
          </p>
        </div>

        <Link to="/student/post" className="btn btn-secondary">
          <PlusCircle size={16} />
          <span>Report New Item</span>
        </Link>
      </div>

      {/* SUCCESS NOTIFICATION */}

      {successNotice && (
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
            gap: "8px",
            fontWeight: 600,
          }}
        >
          <CheckCircle size={18} />
          <span>{successNotice}</span>
        </div>
      )}

      {/* POSTS LIST */}

      {myPosts.length > 0 ? (

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >

          {myPosts.map((post) => (

            <div
              key={post.id}
              className="card"
              style={{
                padding: "20px 24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "20px",
                backgroundColor: "#FFFFFF",
              }}
            >

              {/* PHOTO AND ITEM INFORMATION */}

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  flex: 1,
                  minWidth: "280px",
                }}
              >
                <img
                  src={post.imageUrl}
                  alt={post.name}
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "10px",
                    objectFit: "cover",
                    backgroundColor: "#F1F5F9",
                    border: "1px solid var(--color-border)",
                    flexShrink: 0,
                  }}
                />

                <div style={{ flex: 1 }}>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "6px",
                    }}
                  >
                    <StatusBadge status={post.status} size="sm" />

                    <span
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--color-text-muted)",
                      }}
                    >
                      {post.category}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      color: "var(--color-primary)",
                      marginBottom: "6px",
                    }}
                  >
                    {post.name}
                  </h3>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                      fontSize: "0.8rem",
                      color: "var(--color-text-secondary)",
                      flexWrap: "wrap",
                    }}
                  >
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <MapPin size={14} color="var(--color-secondary)" />
                      {post.location}
                    </span>

                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <Calendar size={14} />
                      {post.foundDate}
                    </span>
                  </div>

                </div>
              </div>

              {/* ACTION BUTTONS */}

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >

                <Link
                  to={`/student/item/${post.id}`}
                  className="btn btn-outline btn-sm"
                  title="View Public Details"
                >
                  <Eye size={15} />
                  <span>View</span>
                </Link>

                <button
                  type="button"
                  onClick={() => handleOpenEdit(post)}
                  className="btn btn-outline-primary btn-sm"
                  title="Edit post details"
                >
                  <Edit2 size={15} />
                  <span>Edit</span>
                </button>

                <button
                  type="button"
                  onClick={() => setDeletingId(post.id)}
                  className="btn btn-outline btn-sm"
                  style={{
                    color: "var(--color-danger)",
                    borderColor: "rgba(239, 68, 68, 0.4)",
                  }}
                  title="Delete post"
                >
                  <Trash2 size={15} />
                  <span>Delete</span>
                </button>

              </div>

            </div>

          ))}

        </div>

      ) : (

        /* EMPTY STATE */

        <div
          className="card"
          style={{
            padding: "60px 24px",
            textAlign: "center",
            backgroundColor: "#FFFFFF",
          }}
        >
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              backgroundColor: "rgba(15, 157, 146, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px auto",
              color: "var(--color-secondary)",
            }}
          >
            <PackageOpen size={30} />
          </div>

          <h3
            style={{
              fontSize: "1.25rem",
              color: "var(--color-primary)",
              marginBottom: "8px",
            }}
          >
            No Reported Posts Yet
          </h3>

          <p
            style={{
              fontSize: "0.9rem",
              color: "var(--color-text-secondary)",
              maxWidth: "460px",
              margin: "0 auto 24px auto",
            }}
          >
            You haven't reported any lost or found items on campus yet.
            When you find an item, report it here so the owner can reclaim it.
          </p>

          <Link to="/student/post" className="btn btn-secondary">
            <PlusCircle size={16} />
            <span>Report Found Item</span>
          </Link>

        </div>

      )}

      {/* EDIT ITEM MODAL */}

      <Modal
        isOpen={Boolean(editingItem)}
        onClose={() => !saving && setEditingItem(null)}
        title="Edit Reported Item"
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
              <label className="form-label">Location</label>

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

            <div className="form-group">
              <label className="form-label">Contact Phone</label>

              <input
                type="text"
                className="form-control"
                value={editPhone}
                onChange={(e) => setEditPhone(e.target.value)}
                required
              />
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
                marginTop: "20px",
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
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>

          </form>

        )}
      </Modal>

      {/* DELETE CONFIRMATION MODAL */}

      <Modal
        isOpen={Boolean(deletingId)}
        onClose={() => !saving && setDeletingId(null)}
        title="Delete Post"
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
            Remove Post?
          </h4>

          <p
            style={{
              fontSize: "0.875rem",
              color: "var(--color-text-secondary)",
              marginBottom: "24px",
            }}
          >
            Are you sure you want to delete this reported item?
            This will remove it from campus listings.
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
              disabled={saving}
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleConfirmDelete}
              className="btn btn-danger"
              disabled={saving}
            >
              {saving ? "Deleting..." : "Delete Post"}
            </button>
          </div>

        </div>
      </Modal>

    </div>
  );
}