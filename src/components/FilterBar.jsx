import React from "react";
import { Search, Filter, RotateCcw, ArrowUpDown } from "lucide-react";
import { CATEGORIES, CAMPUS_LOCATIONS } from "../data/sampleData";

export default function FilterBar({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedLocation,
  setSelectedLocation,
  selectedStatus,
  setSelectedStatus,
  sortBy,
  setSortBy,
  totalResults,
  onReset,
}) {
  const isFiltered =
    searchQuery ||
    selectedCategory !== "ALL" ||
    selectedLocation !== "ALL" ||
    selectedStatus !== "ALL" ||
    sortBy !== "newest";

  return (
    <div
      className="card"
      style={{
        padding: "20px 24px",
        marginBottom: "28px",
        backgroundColor: "#FFFFFF",
      }}
    >
      {/* Search Input Row */}
      <div style={{ marginBottom: "16px" }}>
        <div style={{ position: "relative" }}>
          <Search
            size={18}
            color="var(--color-text-muted)"
            style={{
              position: "absolute",
              left: "14px",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Search by item name, detailed description, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              paddingLeft: "42px",
              fontSize: "0.95rem",
              height: "46px",
            }}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              style={{
                position: "absolute",
                right: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                color: "var(--color-text-muted)",
                cursor: "pointer",
                fontSize: "0.85rem",
                fontWeight: 600,
              }}
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Dropdown Filters Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "14px",
          alignItems: "center",
        }}
      >
        {/* Category Filter */}
        <div>
          <label
            style={{
              display: "block",
              fontSize: "0.75rem",
              fontWeight: 700,
              color: "var(--color-text-secondary)",
              marginBottom: "4px",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
            }}
          >
            Category
          </label>
          <select
            className="form-control"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{ height: "40px", fontSize: "0.85rem" }}
          >
            <option value="ALL">All Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Location Filter */}
        <div>
          <label
            style={{
              display: "block",
              fontSize: "0.75rem",
              fontWeight: 700,
              color: "var(--color-text-secondary)",
              marginBottom: "4px",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
            }}
          >
            Location
          </label>
          <select
            className="form-control"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            style={{ height: "40px", fontSize: "0.85rem" }}
          >
            <option value="ALL">All Campus Locations</option>
            {CAMPUS_LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label
            style={{
              display: "block",
              fontSize: "0.75rem",
              fontWeight: 700,
              color: "var(--color-text-secondary)",
              marginBottom: "4px",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
            }}
          >
            Status
          </label>
          <select
            className="form-control"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            style={{ height: "40px", fontSize: "0.85rem" }}
          >
            <option value="ALL">All Statuses</option>
            <option value="AVAILABLE">Available</option>
            <option value="CLAIMED">Claimed</option>
            <option value="RETURNED">Returned</option>
          </select>
        </div>

        {/* Sorting Dropdown */}
        <div>
          <label
            style={{
              display: "block",
              fontSize: "0.75rem",
              fontWeight: 700,
              color: "var(--color-text-secondary)",
              marginBottom: "4px",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
            }}
          >
            Sort By
          </label>
          <select
            className="form-control"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{ height: "40px", fontSize: "0.85rem" }}
          >
            <option value="newest">Date: Newest First</option>
            <option value="oldest">Date: Oldest First</option>
          </select>
        </div>
      </div>

      {/* Results and Reset Bar */}
      <div
        style={{
          marginTop: "16px",
          paddingTop: "12px",
          borderTop: "1px solid var(--color-border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <div style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", fontWeight: 500 }}>
          Showing <strong>{totalResults}</strong> {totalResults === 1 ? "item" : "items"} found
        </div>

        {isFiltered && (
          <button
            type="button"
            onClick={onReset}
            className="btn btn-outline btn-sm"
            style={{
              fontSize: "0.8rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <RotateCcw size={13} />
            <span>Reset All Filters</span>
          </button>
        )}
      </div>
    </div>
  );
}
