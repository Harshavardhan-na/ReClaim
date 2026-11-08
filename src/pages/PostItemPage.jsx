import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useItems } from "../context/ItemContext";
import { uploadItemPhoto } from "../services/api";
import { CATEGORIES, CAMPUS_LOCATIONS } from "../data/sampleData";
import {
  PlusCircle,
  Upload,
  Image as ImageIcon,
  MapPin,
  Calendar,
  User,
  Phone,
  Mail,
  FileText,
  AlertCircle,
  CheckCircle,
  X
} from "lucide-react";

export default function PostItemPage() {
  const { currentUser, isAdmin } = useAuth();
  const { addItem } = useItems();
  const navigate = useNavigate();

  // Form State
  const [name, setName] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState(CAMPUS_LOCATIONS[0]);
  const [customLocation, setCustomLocation] = useState("");
  const [foundDate, setFoundDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [contactName, setContactName] = useState(currentUser?.name || "");
  const [contactPhone, setContactPhone] = useState(currentUser?.phone || "");
  const [contactEmail, setContactEmail] = useState(currentUser?.email || "");

  // Image Upload & Preview State
  const [imagePreview, setImagePreview] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [isUrlMode, setIsUrlMode] = useState(false);

  // Validation & Loading
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Handle local file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({ ...prev, image: "Please select an image file (PNG, JPG, or WEBP)." }));
        return;
      }
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setErrors((prev) => ({ ...prev, image: null }));
    }
  };

  // Handle image URL entry
  const handleUrlChange = (e) => {
    const val = e.target.value;
    setImageUrlInput(val);
    setImagePreview(val);
    if (val.trim()) {
      setErrors((prev) => ({ ...prev, image: null }));
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview("");
    setImageUrlInput("");
  };

  const validate = () => {
    const errs = {};
    if (!name.trim()) errs.name = "Item name is required.";
    if (!description.trim()) errs.description = "Please provide an accurate item description.";
    if (!contactName.trim()) errs.contactName = "Contact person name is required.";
    if (!contactPhone.trim()) errs.contactPhone = "Contact phone number is required.";
    if (!foundDate) errs.foundDate = "Date found is required.";
    if (!imagePreview) {
      errs.image = "Please attach a photograph of the found item for verification.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setSubmitting(true);

    try {
      let imageKey = "";
      let imageUrl = "";

      // Upload selected image file to S3
      if (imageFile) {
        const uploadedImage = await uploadItemPhoto(imageFile);

        imageKey = uploadedImage.imageKey || "";
        imageUrl = uploadedImage.imageUrl || "";
      }

      // If the user provides an external image URL
      else if (isUrlMode && imageUrlInput.trim()) {
        imageUrl = imageUrlInput.trim();
      }

      const finalLocation =
        location === "Other Specific Location..."
          ? customLocation.trim()
          : location;

      // Create item
      const newItem = await addItem({
        name: name.trim(),
        category,
        description: description.trim(),
        location: finalLocation || location,
        foundDate,

        imageKey,
        imageUrl,

        contactName: contactName.trim(),
        contactPhone: contactPhone.trim(),
        contactEmail: contactEmail.trim(),
      });

      if (!newItem || !newItem.id) {
        throw new Error("Unable to create item.");
      }

      // Redirect to item details
      navigate(
        isAdmin
          ? `/admin/item/${newItem.id}`
          : `/student/item/${newItem.id}`
      );

    } catch (err) {
      console.error("Item submission failed:", err);

      setErrors((prev) => ({
        ...prev,
        submit: err.message || "Failed to post item. Please try again.",
      }));

    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container" style={{ paddingTop: "36px", paddingBottom: "72px", maxWidth: "860px" }}>
      {/* Title */}
      <div style={{ marginBottom: "28px", textAlign: "center" }}>
        <h1 style={{ fontSize: "2rem", color: "var(--color-primary)", marginBottom: "8px" }}>
          Report a Found Item
        </h1>
        <p style={{ color: "var(--color-text-secondary)", fontSize: "0.95rem" }}>
          Submit details and an image of the item you found on the VIT-AP campus.
        </p>
      </div>

      <div className="card" style={{ padding: "36px", backgroundColor: "#FFFFFF" }}>
        {errors.submit && (
          <div
            style={{
              backgroundColor: "var(--color-danger-bg)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              color: "var(--color-danger-text)",
              padding: "12px",
              borderRadius: "var(--radius-md)",
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <AlertCircle size={16} />
            <span>{errors.submit}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Item Photograph Upload Section */}
          <div className="form-group" style={{ marginBottom: "28px" }}>
            <label className="form-label">
              Item Photograph <span className="required">*</span>
            </label>
            <p style={{ fontSize: "0.8rem", color: "var(--color-text-muted)", marginBottom: "10px" }}>
              Clear photographs ensure legitimate ownership verification before return.
            </p>

            {/* Toggle Mode between File Upload and URL */}
            <div style={{ display: "flex", gap: "10px", marginBottom: "12px" }}>
              <button
                type="button"
                onClick={() => setIsUrlMode(false)}
                className={`btn btn-sm ${!isUrlMode ? "btn-primary" : "btn-outline"}`}
              >
                Upload File
              </button>
              <button
                type="button"
                onClick={() => setIsUrlMode(true)}
                className={`btn btn-sm ${isUrlMode ? "btn-primary" : "btn-outline"}`}
              >
                Image URL
              </button>
            </div>

            {/* Upload Area or URL Input */}
            {!isUrlMode ? (
              <div
                style={{
                  border: `2px dashed ${errors.image ? "var(--color-danger)" : "var(--color-border)"}`,
                  borderRadius: "var(--radius-lg)",
                  padding: "24px",
                  textAlign: "center",
                  backgroundColor: "#F8FAFC",
                  cursor: "pointer",
                  position: "relative",
                }}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    opacity: 0,
                    cursor: "pointer",
                  }}
                />
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      backgroundColor: "var(--color-secondary-subtle)",
                      color: "var(--color-secondary)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Upload size={22} />
                  </div>
                  <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--color-primary)" }}>
                    Click or drag image file here to upload
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
                    Supported formats: PNG, JPG, JPEG, WEBP (Max 10MB)
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <input
                  type="url"
                  className={`form-control ${errors.image ? "is-invalid" : ""}`}
                  placeholder="Paste direct image URL (e.g. https://...)"
                  value={imageUrlInput}
                  onChange={handleUrlChange}
                />
              </div>
            )}

            {errors.image && <div className="form-error">{errors.image}</div>}

            {/* Image Preview Box */}
            {imagePreview && (
              <div
                style={{
                  marginTop: "16px",
                  position: "relative",
                  display: "inline-block",
                  borderRadius: "var(--radius-md)",
                  overflow: "hidden",
                  border: "2px solid var(--color-secondary)",
                }}
              >
                <img
                  src={imagePreview}
                  alt="Item Preview"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "220px",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
                <button
                  type="button"
                  onClick={removeImage}
                  style={{
                    position: "absolute",
                    top: "8px",
                    right: "8px",
                    backgroundColor: "rgba(20, 45, 78, 0.8)",
                    color: "#FFFFFF",
                    border: "none",
                    borderRadius: "50%",
                    width: "28px",
                    height: "28px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                  title="Remove image"
                >
                  <X size={16} />
                </button>
              </div>
            )}
          </div>

          {/* Item Name */}
          <div className="form-group">
            <label className="form-label" htmlFor="item-name">
              Item Name <span className="required">*</span>
            </label>
            <input
              id="item-name"
              type="text"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              placeholder="e.g. Blue Hydro Flask 32oz with React sticker"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <div className="form-error">{errors.name}</div>}
          </div>

          {/* Category & Found Date Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div className="form-group">
              <label className="form-label" htmlFor="item-category">
                Category <span className="required">*</span>
              </label>
              <select
                id="item-category"
                className="form-control"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="item-date">
                Found Date <span className="required">*</span>
              </label>
              <input
                id="item-date"
                type="date"
                className={`form-control ${errors.foundDate ? "is-invalid" : ""}`}
                value={foundDate}
                onChange={(e) => setFoundDate(e.target.value)}
              />
              {errors.foundDate && <div className="form-error">{errors.foundDate}</div>}
            </div>
          </div>

          {/* Found Location */}
          <div className="form-group">
            <label className="form-label" htmlFor="item-location">
              Found Location <span className="required">*</span>
            </label>
            <select
              id="item-location"
              className="form-control"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              {CAMPUS_LOCATIONS.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
              <option value="Other Specific Location...">Other Specific Location...</option>
            </select>
            {location === "Other Specific Location..." && (
              <input
                type="text"
                className="form-control"
                placeholder="Specify precise campus hall, room number, or landmark..."
                value={customLocation}
                onChange={(e) => setCustomLocation(e.target.value)}
                style={{ marginTop: "8px" }}
                required
              />
            )}
          </div>

          {/* Description */}
          <div className="form-group">
            <label className="form-label" htmlFor="item-desc">
              Detailed Description <span className="required">*</span>
            </label>
            <textarea
              id="item-desc"
              rows={4}
              className={`form-control ${errors.description ? "is-invalid" : ""}`}
              placeholder="Describe color, brand, condition, identifiable scratches, stickers, or specific contents..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {errors.description && <div className="form-error">{errors.description}</div>}
          </div>

          {/* Contact Information Sub-section */}
          <div
            style={{
              padding: "20px",
              backgroundColor: "var(--color-bg)",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--color-border)",
              marginTop: "24px",
              marginBottom: "28px",
            }}
          >
            <h3 style={{ fontSize: "1.05rem", color: "var(--color-primary)", marginBottom: "14px" }}>
              Contact Information for Verification
            </h3>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
              <div>
                <label className="form-label" htmlFor="contact-name">
                  Contact Person Name <span className="required">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  className={`form-control ${errors.contactName ? "is-invalid" : ""}`}
                  placeholder="Your Name"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                />
                {errors.contactName && <div className="form-error">{errors.contactName}</div>}
              </div>

              <div>
                <label className="form-label" htmlFor="contact-phone">
                  Phone Number <span className="required">*</span>
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  className={`form-control ${errors.contactPhone ? "is-invalid" : ""}`}
                  placeholder="+91 98765 43210"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                />
                {errors.contactPhone && <div className="form-error">{errors.contactPhone}</div>}
              </div>

              <div>
                <label className="form-label" htmlFor="contact-email">
                  University Email <span style={{ color: "var(--color-text-muted)" }}>(Optional)</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  className="form-control"
                  placeholder="name@vitap.ac.in"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Submit Actions */}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "14px" }}>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn btn-outline"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-secondary btn-lg"
              disabled={submitting}
            >
              <PlusCircle size={18} />
              <span>{submitting ? "Publishing Report..." : "Submit Found Item Report"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
