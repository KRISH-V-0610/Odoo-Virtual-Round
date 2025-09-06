import React, { useMemo, useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import {
  FiSearch,
  FiChevronRight,
  FiMenu,
  FiArrowLeft
} from "react-icons/fi";

// Import Components
import IconButton from "../Components/IconButton";
import MobileMenu from "../Components/MobileMenu";
import UserMenu from "../Components/UserMenu";
import { PiLeafBold } from "react-icons/pi";

// —— dummy purchases (replace with API/store) ——
const PURCHASES = [
  {
    id: "o-101",
    productId: "p1",
    title: "Vintage Denim Jacket",
    price: 1299,
    category: "Clothing",
    seller: "Ananya",
    date: "2025-08-03",
    thumb:
      "https://images.unsplash.com/photo-1520975922313-827d622b9f8d?q=80&w=400&auto=format&fit=crop",
    status: "delivered"
  },
  {
    id: "o-102",
    productId: "p2",
    title: "IKEA Side Table",
    price: 1499,
    category: "Furniture",
    seller: "Rahul",
    date: "2025-07-29",
    thumb:
      "https://images.unsplash.com/photo-1493666438817-866a91353ca9?q=80&w=400&auto=format&fit=crop",
    status: "shipped"
  },
  {
    id: "o-103",
    productId: "p3",
    title: "Clean Code (Like New)",
    price: 699,
    category: "Books",
    seller: "Priya",
    date: "2025-07-18",
    thumb:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=400&auto=format&fit=crop",
    status: "delivered"
  },
];

const STATUS_BADGE = {
  delivered: "bg-emerald-50 text-emerald-700 border-emerald-200",
  shipped: "bg-blue-50 text-blue-700 border-blue-200",
  processing: "bg-amber-50 text-amber-700 border-amber-200",
  cancelled: "bg-rose-50 text-rose-700 border-rose-200",
};

const CATEGORY_OPTIONS = ["All", "Clothing", "Electronics", "Books", "Furniture", "Sports", "Toys", "Other"];
const STATUS_OPTIONS = ["All", "delivered", "shipped", "processing", "cancelled"];

export default function MyPurchases() {
  const navigate = useNavigate();
  
  // State for mobile menu and user menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Demo user data
    const [user,setUser] = useState(null);
     const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get("/users/profile", {
          withCredentials: true, // ✅ include cookies
        });
        setUser(res.data.data.user); // assuming controller returns { data: { user } }
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);



  // controls
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("All");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("recent");
  const [groupBy, setGroupBy] = useState("none");

  const filtered = useMemo(() => {
    let data = PURCHASES.slice();

    // search
    if (q.trim()) {
      const needle = q.toLowerCase();
      data = data.filter(
        (p) =>
          p.title.toLowerCase().includes(needle) ||
          p.category.toLowerCase().includes(needle) ||
          p.seller.toLowerCase().includes(needle)
      );
    }

    // filter
    if (status !== "All") data = data.filter((p) => p.status === status);
    if (category !== "All") data = data.filter((p) => p.category === category);

    // sort
    if (sortBy === "recent") {
      data.sort((a, b) => +new Date(b.date) - +new Date(a.date));
    } else if (sortBy === "priceAsc") {
      data.sort((a, b) => a.price - b.price);
    } else if (sortBy === "priceDesc") {
      data.sort((a, b) => b.price - a.price);
    }

    return data;
  }, [q, status, category, sortBy]);

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

    if (loading) return <p>Loading...</p>;
    
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
              <Link to="/home" className="hidden md:flex items-center gap-2 select-none text-lg font-semibold text-emerald-700">
                <PiLeafBold className="h-6 w-6 text-emerald-600" />
                EcoFinds
              </Link>
            </div>

            {/* Center: logo (mobile) */}
            <Link to="/home" className="mx-auto md:mx-0 md:ml-2 flex items-center gap-2 select-none text-lg font-semibold text-emerald-700 md:hidden">
              <PiLeafBold className="h-5 w-5 text-emerald-600" />
              EcoFinds
            </Link>

            {/* Right: cart + profile */}
            <div className="ml-auto flex items-center gap-2">
              <IconButton
                aria-label="Cart"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("/cart");
                }}
              >
                <CartIcon className="h-5 w-5 text-slate-700" />
                <span className="absolute -top-1.5 -right-1.5 grid h-5 w-5 place-items-center rounded-full bg-rose-500 text-[10px] font-semibold text-white shadow">
                  {user.cartItems}
                </span>
              </IconButton>
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

          <div className="pb-3 flex items-center justify-between">
            <Link to="/home" className="flex items-center gap-1 text-sm text-emerald-700 font-medium">
              <FiArrowLeft className="h-4 w-4" />
              Continue Shopping
            </Link>
            <h1 className="text-base font-medium text-slate-700">
              Your Purchases ({PURCHASES.length} {PURCHASES.length === 1 ? 'item' : 'items'})
            </h1>
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
        {/* title */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">My Purchases</h1>
            <p className="text-sm text-slate-600 mt-1">Review your purchase history and order status</p>
          </div>
        </div>

        {/* search */}
        <div className="mb-6">
          <div className="relative">
            <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search your purchases…"
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
            ]}
          />
          <Select
            label="Filter status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            options={STATUS_OPTIONS.map((s) => ({ value: s, label: s.charAt(0).toUpperCase() + s.slice(1) }))}
          />
          <Select
            label="Filter category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            options={CATEGORY_OPTIONS.map((c) => ({ value: c, label: c }))}
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
                  <p className="text-lg font-medium text-slate-700">No purchases found</p>
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
                            <Badge className={STATUS_BADGE[p.status] || "bg-slate-100 text-slate-700 border-slate-200"}>
                              {p.status}
                            </Badge>
                            <span className="text-slate-500">{new Date(p.date).toLocaleDateString()}</span>
                          </div>

                          <div className="mt-2 text-xs text-slate-600">
                            Seller: {p.seller}
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <button
                            onClick={() => navigate(`/products/${p.productId}`)}
                            className="p-2 text-slate-600 hover:text-emerald-600 transition-colors"
                            title="View product"
                          >
                            <FiChevronRight className="h-5 w-5" />
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
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
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

// CartIcon component (you'll need to import your actual CartIcon component)
function CartIcon({ className }) {
  return (
    <svg 
      className={className} 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth="2" 
        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
      ></path>
    </svg>
  );
}