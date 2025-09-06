import React, { useMemo, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiPlus,
  FiSearch,
  FiMenu,
  FiEdit,
  FiTrash2,
  FiEye,
  FiLoader
} from "react-icons/fi";
import axiosInstance from "../api/axiosInstance";

// Import Components
import IconButton from "../Components/IconButton";
import MobileMenu from "../Components/MobileMenu";
import UserMenu from "../Components/UserMenu";
import { PiLeafBold } from "react-icons/pi";

const STATUS_BADGE = {
  available: "bg-emerald-50 text-emerald-700 border-emerald-200",
  sold: "bg-slate-100 text-slate-700 border-slate-200",
  pending: "bg-amber-50 text-amber-700 border-amber-200",
};

export default function MyListings() {
  const navigate = useNavigate();
  
  // State for actual listings data
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // State for mobile menu and user menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // User data
  const [user, setUser] = useState(null);

  // Filter and search controls
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [groupBy, setGroupBy] = useState("none");

  // Fetch user data and listings
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch user profile
        const userRes = await axiosInstance.get("/users/profile", {
          withCredentials: true,
        });
        setUser(userRes.data.data.user);
        
        // Fetch user listings
        const listingsRes = await axiosInstance.get("/users/listings", {
          withCredentials: true,
        });
        setListings(listingsRes.data.data.listings || []);
        
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError("Failed to load your listings. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Delete listing function
  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this listing?")) {
      try {
        await axiosInstance.delete(`/api/products/${id}`, {
          withCredentials: true,
        });
        
        // Remove the deleted listing from state
        setListings(prev => prev.filter(listing => listing._id !== id));
        
      } catch (err) {
        console.error("Failed to delete listing:", err);
        setError("Failed to delete listing. Please try again.");
      }
    }
  };

  const handleEdit = (id, e) => {
    e.stopPropagation();
    navigate(`/edit-product/${id}`);
  };

  const filtered = useMemo(() => {
    let data = [...listings];

    // search
    if (q.trim()) {
      const needle = q.toLowerCase();
      data = data.filter(
        (p) =>
          p.title.toLowerCase().includes(needle) ||
          (p.category && p.category.toLowerCase().includes(needle)) ||
          (p.status && p.status.toLowerCase().includes(needle))
      );
    }

    // filter
    if (status !== "all") data = data.filter((p) => p.status === status);
    if (category !== "all") data = data.filter((p) => p.category === category);

    // sort
    if (sortBy === "recent") {
      data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === "priceAsc") {
      data.sort((a, b) => a.price - b.price);
    } else if (sortBy === "priceDesc") {
      data.sort((a, b) => b.price - a.price);
    } else if (sortBy === "popular") {
      // Using views if available, otherwise fallback to createdAt
      data.sort((a, b) => (b.views || 0) - (a.views || 0));
    }

    return data;
  }, [listings, q, status, category, sortBy]);

  // Group listings
  const grouped = useMemo(() => {
    if (groupBy === "none") return { All: filtered };
    return filtered.reduce((acc, p) => {
      const key = groupBy === "status" ? p.status : p.category;
      acc[key] = acc[key] || [];
      acc[key].push(p);
      return acc;
    }, {});
  }, [filtered, groupBy]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-sky-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <FiLoader className="h-8 w-8 text-emerald-600 animate-spin mb-4" />
          <p className="text-slate-600">Loading your listings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-sky-50">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/85 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-center gap-3 py-3">
            {/* Left: hamburger (mobile), logo (desktop) */}
            <div className="flex items-center gap-3">
              <IconButton
                aria-label="Menu"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(true)}
              >
                <FiMenu className="h-5 w-5 text-slate-700" />
              </IconButton>
              <a href="/home" className="hidden md:flex items-center gap-2 select-none text-lg font-semibold text-emerald-700">
                <PiLeafBold className="h-6 w-6 text-emerald-600" />
                EcoFinds
              </a>
            </div>

            {/* Center: logo (mobile) */}
            <a href="/home" className="mx-auto md:mx-0 md:ml-2 flex items-center gap-2 select-none text-lg font-semibold text-emerald-700 md:hidden">
              <PiLeafBold className="h-5 w-5 text-emerald-600" />
              EcoFinds
            </a>

            {/* Right: profile */}
            <div className="ml-auto flex items-center gap-2">
              <IconButton
                aria-label="Profile"
                className="h-10 w-10"
                onClick={() => setUserMenuOpen(true)}
              >
                {user?.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt="avatar"
                    className="h-7 w-7 rounded-full object-cover"
                  />
                ) : (
                  <span className="block h-7 w-7 rounded-full bg-gradient-to-br from-emerald-400 to-sky-400" />
                )}
              </IconButton>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        user={user}
      />

      {/* User Menu */}
      <UserMenu
        user={user}
        isOpen={userMenuOpen}
        onClose={() => setUserMenuOpen(false)}
      />

      {/* Main */}
      <main className="mx-auto max-w-6xl px-4 py-6 md:py-8">
        {/* title + add new */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">My Listings</h1>
            <p className="text-sm text-slate-600 mt-1">Manage your products and track their performance</p>
          </div>
          <Link
            to="/addproduct"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white shadow hover:bg-emerald-500 transition-colors"
          >
            <FiPlus className="h-4 w-4" />
            Add New
          </Link>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        )}

        {/* Stats summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatCard label="Total Listings" value={listings.length} />
          <StatCard 
            label="Available" 
            value={listings.filter(item => item.status === 'available').length} 
          />
          <StatCard 
            label="Pending" 
            value={listings.filter(item => item.status === 'pending').length} 
          />
          <StatCard 
            label="Sold" 
            value={listings.filter(item => item.status === 'sold').length} 
          />
        </div>

        {/* search */}
        <div className="mb-6">
          <div className="relative">
            <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search your listings…"
              className="w-full rounded-2xl border border-slate-300 bg-white pl-11 pr-4 py-3 text-slate-900 placeholder:text-slate-400 shadow-sm focus:border-emerald-500 focus:ring-4 focus:ring-emerald-200 transition"
            />
          </div>
        </div>

        {/* actions */}
        <div className="grid grid-cols-2 gap-3 mb-6 sm:grid-cols-4">
          <Select
            label="Sort by"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            options={[
              { value: "recent", label: "Most Recent" },
              { value: "priceAsc", label: "Price: Low to High" },
              { value: "priceDesc", label: "Price: High to Low" },
              { value: "popular", label: "Most Popular" },
            ]}
          />
          <Select
            label="Filter status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            options={[
              { value: "all", label: "All status" },
              { value: "available", label: "Available" },
              { value: "pending", label: "Pending" },
              { value: "sold", label: "Sold" },
            ]}
          />
          <Select
            label="Filter category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            options={[
              { value: "all", label: "All categories" },
              "Clothing",
              "Electronics",
              "Books",
              "Furniture",
              "Sports",
              "Toys",
              "Other",
            ].map((c) =>
              typeof c === "string" ? { value: c, label: c } : c
            )}
          />
          <Select
            label="Group by"
            value={groupBy}
            onChange={(e) => setGroupBy(e.target.value)}
            options={[
              { value: "none", label: "No grouping" },
              { value: "status", label: "Status" },
              { value: "category", label: "Category" },
            ]}
          />
        </div>

        {/* list */}
        <div className="space-y-6">
          {Object.entries(grouped).map(([group, arr]) => (
            <section key={group}>
              {groupBy !== "none" && (
                <h2 className="mb-4 text-lg font-semibold text-slate-800">
                  {group.charAt(0).toUpperCase() + group.slice(1)} ({arr.length})
                </h2>
              )}

              {arr.length === 0 ? (
                <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-600">
                  <FiSearch className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-lg font-medium text-slate-700">No listings found</p>
                  <p className="text-sm text-slate-500 mt-2">Try adjusting your search or filters</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {arr.map((listing) => (
                    <div key={listing._id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex gap-4">
                        <img
                          src={listing.images && listing.images.length > 0 ? listing.images[0] : "/placeholder-image.jpg"}
                          alt={listing.title}
                          className="h-20 w-20 flex-none rounded-xl object-cover sm:h-24 sm:w-24"
                          onError={(e) => {
                            e.target.src = "https://images.unsplash.com/photo-1560472355-536de3962603?w=400&h=300&fit=crop";
                          }}
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="text-sm font-semibold text-slate-900 truncate">
                              {listing.title}
                            </h3>
                            <span className="text-sm font-semibold text-emerald-700">
                              ₹{listing.price?.toLocaleString()}
                            </span>
                          </div>

                          <p className="mt-1 text-sm text-slate-600 line-clamp-2">
                            {listing.description}
                          </p>

                          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                            <Badge className="border-slate-200 bg-slate-50 text-slate-700">
                              {listing.category || "Uncategorized"}
                            </Badge>
                            <Badge className={STATUS_BADGE[listing.status] || "bg-slate-100 text-slate-700 border-slate-200"}>
                              {listing.status || "unknown"}
                            </Badge>
                            <span className="text-slate-500">
                              {new Date(listing.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => navigate(`/products/${listing._id}`)}
                            className="p-2 text-slate-600 hover:text-emerald-600 transition-colors"
                            title="View listing"
                          >
                            <FiEye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={(e) => handleEdit(listing._id, e)}
                            className="p-2 text-slate-600 hover:text-blue-600 transition-colors"
                            title="Edit listing"
                          >
                            <FiEdit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={(e) => handleDelete(listing._id, e)}
                            className="p-2 text-slate-600 hover:text-rose-600 transition-colors"
                            title="Delete listing"
                          >
                            <FiTrash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}

/* ——— small UI helpers ——— */
function Select({ label, options, className = "", ...props }) {
  return (
    <label className={`flex flex-col gap-1 ${className}`}>
      <span className="text-xs font-medium text-slate-600">{label}</span>
      <select
        className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm focus:border-emerald-500 focus:ring-4 focus:ring-emerald-200 outline-none transition"
        {...props}
      >
        {options.map((o) =>
          typeof o === "string" ? (
            <option key={o} value={o}>
              {o}
            </option>
          ) : (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          )
        )}
      </select>
    </label>
  );
}

function Badge({ children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium ${className}`}
    >
      {children}
    </span>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 text-center">
      <div className="text-2xl font-bold text-emerald-700">{value}</div>
      <div className="text-xs text-slate-600 mt-1">{label}</div>
    </div>
  );
}