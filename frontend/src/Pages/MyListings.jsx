import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiPlus,
  FiSearch,
  FiChevronRight,
  FiMenu,
  FiEdit,
  FiTrash2,
  FiEye
} from "react-icons/fi";

// Import Components
import IconButton from "../Components/IconButton";
import MobileMenu from "../Components/MobileMenu";
import UserMenu from "../Components/UserMenu";
import { PiLeafBold } from "react-icons/pi";

/* ——— dummy data (replace with API/store) ——— */
const DUMMY = [
  {
    id: "p1",
    title: "Vintage Denim Jacket",
    price: 1299,
    category: "Clothing",
    status: "available",
    sellerName: "You",
    thumb:
      "https://images.unsplash.com/photo-1520975922313-827d622b9f8d?q=80&w=400&auto=format&fit=crop",
    createdAt: "2025-08-01",
    views: 42,
    likes: 8
  },
  {
    id: "p2",
    title: "IKEA Side Table",
    price: 1499,
    category: "Furniture",
    status: "pending",
    sellerName: "You",
    thumb:
      "https://images.unsplash.com/photo-1493666438817-866a91353ca9?q=80&w=极00&auto=format&fit=crop",
    createdAt: "2025-07-25",
    views: 28,
    likes: 5
  },
  {
    id: "p3",
    title: "Clean Code (Like New)",
    price: 699,
    category: "Books",
    status: "sold",
    sellerName: "You",
    thumb:
      "极ttps://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=400&auto=format&fit=crop",
    createdAt: "2025-07-10",
    views: 67,
    likes: 12
  },
  {
    id: "p4",
    title: "Android Phone – A15",
    price: 15999,
    category: "Electronics",
    status: "available",
    sellerName: "You",
    thumb:
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=400&auto=format&fit=crop",
    createdAt: "2025-08-05",
    views: 89,
    likes: 15
  },
];

const STATUS_BADGE = {
  available: "bg-emerald-50 text-emerald-700 border-emerald-200",
  sold: "bg-slate-100 text-slate-700 border-slate-200",
  pending: "bg-amber-50 text-amber-700 border-amber-200",
};

export default function MyListings() {
  const navigate = useNavigate();
  const [items] = useState(DUMMY);
  
  // State for mobile menu and user menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Demo user data
  const [user] = useState({
    name: "Alex Johnson",
    email: "alex@example.com",
    cartItems: 3,
    avatarUrl: ""
  });

  // controls
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [groupBy, setGroupBy] = useState("none");

  const filtered = useMemo(() => {
    let data = items.slice();

    // search
    if (q.trim()) {
      const needle = q.toLowerCase();
      data = data.filter(
        (p) =>
          p.title.toLowerCase().includes(needle) ||
          p.category.toLowerCase().includes(needle) ||
          p.status.toLowerCase().includes(needle)
      );
    }

    // filter
    if (status !== "all") data = data.filter((p) => p.status === status);
    if (category !== "all") data = data.filter((p) => p.category === category);

    // sort
    if (sortBy === "recent") {
      data.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
    } else if (sortBy === "priceAsc") {
      data.sort((a, b) => a.price - b.price);
    } else if (sortBy === "priceDesc") {
      data.sort((a, b) => b.price - a.price);
    } else if (sortBy === "popular") {
      data.sort((a, b) => b.views - a.views);
    }

    return data;
  }, [items, q, status, category, sortBy]);

  // optional grouping
  const grouped = useMemo(() => {
    if (groupBy === "none") return { All: filtered };
    return filtered.reduce((acc, p) => {
      const key = groupBy === "status" ? p.status : p.category;
      acc[key] = acc[key] || [];
      acc[key].push(p);
      return acc;
    }, {});
  }, [filtered, groupBy]);

  const handleEdit = (id, e) => {
    e.stopPropagation();
    navigate(`/edit-product/${id}`);
  };

  const handleDelete = (id, e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this listing?")) {
      // TODO: Delete logic
      console.log("Delete listing:", id);
    }
  };

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

            {/* Right: cart + profile */}
            <div className="ml-auto flex items-center gap-2">
                
                
                
              <IconButton 
                aria-label="Profile" 
                className="h-10 w-10"
                
              >
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
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
            
          </Link>
        </div>

        {/* Stats summary */}
       

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
                  {arr.map((p) => (
                    <div key={p.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex gap-4">
                        <img
                          src={p.thumb}
                          alt={p.title}
                          className="h-20 w-20 flex-none rounded-xl object-cover sm:h-24 sm:w-24"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="text-sm font-semibold text-slate-900 truncate">
                              {p.title}
                            </h3>
                            <span className="text-sm font-semibold text-emerald-700">
                              ₹{p.price.toLocaleString()}
                            </span>
                          </div>
                          
                          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                            <Badge className="border-slate-200 bg-slate-50 text-slate-700">
                              {p.category}
                            </Badge>
                            <Badge className={STATUS_BADGE[p.status]}>
                              {p.status}
                            </Badge>
                            <span className="text-slate-500">{new Date(p.createdAt).toLocaleDateString()}</span>
                          </div>

                          
                        </div>
                        
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => navigate(`/products/${p.id}`)}
                            className="p-2 text-slate-600 hover:text-emerald-600 transition-colors"
                            title="View listing"
                          >
                            <FiEye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={(e) => handleEdit(p.id, e)}
                            className="p-2 text-slate-600 hover:text-blue-600 transition-colors"
                            title="Edit listing"
                          >
                            <FiEdit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={(e) => handleDelete(p.id, e)}
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