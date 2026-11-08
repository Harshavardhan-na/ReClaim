import React, { useState, useMemo } from "react";
import { useItems } from "../context/ItemContext";
import { useAuth } from "../context/AuthContext";
import ItemCard from "../components/ItemCard";
import FilterBar from "../components/FilterBar";
import { Search, PackageOpen, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function BrowseItemsPage() {
  const { items } = useItems();
  const { isAdmin } = useAuth();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedLocation, setSelectedLocation] = useState("ALL");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [sortBy, setSortBy] = useState("newest"); // "newest" | "oldest"

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Search text match across name, description, location, contact
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesLoc = item.location.toLowerCase().includes(query);
        const matchesCat = item.category.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesLoc && !matchesCat) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory !== "ALL" && item.category !== selectedCategory) {
        return false;
      }

      // Location filter
      if (selectedLocation !== "ALL" && item.location !== selectedLocation) {
        return false;
      }

      // Status filter
      if (selectedStatus !== "ALL" && item.status !== selectedStatus) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      const dateA = new Date(a.foundDate || a.createdAt).getTime();
      const dateB = new Date(b.foundDate || b.createdAt).getTime();
      if (sortBy === "oldest") {
        return dateA - dateB;
      }
      return dateB - dateA;
    });
  }, [items, searchQuery, selectedCategory, selectedLocation, selectedStatus, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("ALL");
    setSelectedLocation("ALL");
    setSelectedStatus("ALL");
    setSortBy("newest");
  };

  return (
    <div className="container" style={{ paddingTop: "40px", paddingBottom: "72px" }}>
      {/* Header section */}
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontSize: "2rem", color: "var(--color-primary)", marginBottom: "8px" }}>
          Browse Lost &amp; Found Items
        </h1>
        <p style={{ color: "var(--color-text-secondary)", fontSize: "1rem" }}>
          Search active entries across all VIT-AP academic blocks, labs, libraries, and hostels.
        </p>
      </div>

      {/* Filter Toolbar */}
      <FilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        sortBy={sortBy}
        setSortBy={setSortBy}
        totalResults={filteredItems.length}
        onReset={handleResetFilters}
      />

      {/* Items Grid or Empty State */}
      {filteredItems.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "24px",
          }}
        >
          {filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
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
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              backgroundColor: "rgba(20, 45, 78, 0.06)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px auto",
              color: "var(--color-text-muted)",
            }}
          >
            <PackageOpen size={32} />
          </div>
          <h3 style={{ fontSize: "1.25rem", color: "var(--color-primary)", marginBottom: "8px" }}>
            No Matching Items Found
          </h3>
          <p
            style={{
              fontSize: "0.9rem",
              color: "var(--color-text-secondary)",
              maxWidth: "460px",
              margin: "0 auto 24px auto",
            }}
          >
            We couldn't find any items matching your selected criteria. Try adjusting your search query, or clear some filters.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
            <button type="button" onClick={handleResetFilters} className="btn btn-outline-primary">
              Clear All Filters
            </button>
            <Link to={isAdmin ? "/admin/post" : "/student/post"} className="btn btn-secondary">
              <PlusCircle size={16} />
              <span>Report a Found Item</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
