// pages/LandingPage.js
import React, { useState, useEffect, useMemo } from "react";
import Header from "../Components/Header";
import Banner from "../Components/Banner";
import CategoryCard from "../Components/CategoryCard";
import ProductCard from "../Components/ProductCard";
import SustainabilitySection from "../Components/SustainabilitySection";
import Footer from "../Components/Footer";
import MobileMenu from "../Components/MobileMenu";
import UserMenu from "../Components/UserMenu";

// React Icons
import {
  FiSmartphone,
  FiShoppingBag,
  FiHome,
  FiBook,
  FiActivity,
  FiArrowRight,
  FiFilter,
} from "react-icons/fi";

/* ------------------------- Dummy product data ------------------------- */
const PRODUCTS = [
  { id: 1,  title: "Redmi Note 11 (Used, Mint)",     category: "Mobiles", price: 7999,  condition: "used",  date: "2025-08-05" },
  { id: 2,  title: "iPhone 11 – Good Battery",        category: "Mobiles", price: 18999, condition: "used",  date: "2025-08-01" },
  { id: 3,  title: "Samsung Galaxy A15 (New Seal)",    category: "Mobiles", price: 15999, condition: "new",   date: "2025-07-22" },
  { id: 4,  title: "Vintage Denim Jacket",             category: "Fashion", price: 1299,  condition: "used",  date: "2025-07-28" },
  { id: 5,  title: "Running Shoes (Brand New)",        category: "Fashion", price: 2599,  condition: "new",   date: "2025-07-15" },
  { id: 6,  title: "IKEA Side Table",                  category: "Home",    price: 1499,  condition: "used",  date: "2025-06-30" },
  { id: 7,  title: "Desk Lamp – Warm Light",           category: "Home",    price: 899,   condition: "used",  date: "2025-08-03" },
  { id: 8,  title: "Non-stick Pan Set (New)",          category: "Home",    price: 1799,  condition: "new",   date: "2025-07-09" },
  { id: 9,  title: "Programming in JS – 2nd Ed.",      category: "Books",   price: 499,   condition: "used",  date: "2025-06-20" },
  { id: 10, title: "Clean Code (Like New)",            category: "Books",   price: 699,   condition: "used",  date: "2025-07-11" },
  { id: 11, title: "Cricket Bat – English Willow",     category: "Sports",  price: 3499,  condition: "used",  date: "2025-08-04" },
  { id: 12, title: "Dumbbell Set 10kg (New)",          category: "Sports",  price: 2999,  condition: "new",   date: "2025-07-25" },
];

/* ------------------------------ Component ----------------------------- */
const LandingPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  // filter state
  const [condition, setCondition] = useState("all"); // all | new | used
  const [sortBy, setSortBy] = useState("recent");   // recent | priceLow | priceHigh
  const priceBounds = useMemo(() => {
    const prices = PRODUCTS.map(p => p.price);
    return { min: Math.min(...prices), max: Math.max(...prices) };
  }, []);
  const [minPrice, setMinPrice] = useState(priceBounds.min);
  const [maxPrice, setMaxPrice] = useState(priceBounds.max);

  const [user] = useState({
    name: "Alex Johnson",
    email: "alex@example.com",
    cartItems: 3,
  });

  const categories = [
    { name: "Mobiles", icon: <FiSmartphone className="text-2xl" /> },
    { name: "Fashion", icon: <FiShoppingBag className="text-2xl" /> },
    { name: "Home",    icon: <FiHome className="text-2xl" /> },
    { name: "Books",   icon: <FiBook className="text-2xl" /> },
    { name: "Sports",  icon: <FiActivity className="text-2xl" /> },
  ];

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => userMenuOpen && setUserMenuOpen(false);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [userMenuOpen]);

  /* --------------------------- Filtering logic --------------------------- */
  const filteredProducts = useMemo(() => {
    let items = PRODUCTS.slice();

    // category
    if (activeCategory !== "All") {
      items = items.filter((p) => p.category === activeCategory);
    }

    // search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // condition
    if (condition !== "all") {
      items = items.filter((p) => p.condition === condition);
    }

    // price range
    items = items.filter((p) => p.price >= Number(minPrice) && p.price <= Number(maxPrice));

    // sort
    if (sortBy === "recent") {
      items.sort((a, b) => +new Date(b.date) - +new Date(a.date));
    } else if (sortBy === "priceLow") {
      items.sort((a, b) => a.price - b.price);
    } else if (sortBy === "priceHigh") {
      items.sort((a, b) => b.price - a.price);
    }

    return items;
  }, [activeCategory, searchQuery, condition, minPrice, maxPrice, sortBy]);

  const clearFilters = () => {
    setActiveCategory("All");
    setCondition("all");
    setSortBy("recent");
    setMinPrice(priceBounds.min);
    setMaxPrice(priceBounds.max);
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-sky-50">
      <Header
        searchQuery={searchQuery}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        onMenuOpen={() => setMobileMenuOpen(true)}
        onUserMenuToggle={() => setUserMenuOpen(!userMenuOpen)}
        user={user}
      />

      <UserMenu
        user={user}
        isOpen={userMenuOpen}
        onClose={() => setUserMenuOpen(false)}
      />

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        user={user}
      />

      <main className="mx-auto max-w-6xl px-4 py-6 md:py-8">
        <Banner />

        {/* Categories */}
        <section id="categories" className="mt-6 md:mt-8">
          <h2 className="text-xl font-semibold text-slate-800 text-center mb-4">
            Shop by Category
          </h2>

          <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
            {/* All category */}
            <CategoryCard
              key="All"
              name="All"
              icon={<span className="text-lg font-semibold">All</span>}
              onClick={() => setActiveCategory("All")}
              isActive={activeCategory === "All"}
            />
            {categories.map((category) => (
              <CategoryCard
                key={category.name}
                name={category.name}
                icon={category.icon}
                onClick={() => setActiveCategory(category.name)}
                isActive={activeCategory === category.name}
              />
            ))}
          </div>
        </section>

        {/* Filters */}
        <section className="mt-8">
          <div className="flex flex-wrap items-end gap-3 rounded-3xl border border-slate-200 bg-white/90 p-4 shadow-sm">
            <div className="flex flex-col">
              <label className="text-xs font-medium text-slate-600">Condition</label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="mt-1 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-emerald-500 focus:outline-none"
              >
                <option value="all">All</option>
                <option value="new">New</option>
                <option value="used">Used</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-medium text-slate-600">Sort by</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="mt-1 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-emerald-500 focus:outline-none"
              >
                <option value="recent">Recent</option>
                <option value="priceLow">Price: Low → High</option>
                <option value="priceHigh">Price: High → Low</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-medium text-slate-600">Min Price</label>
              <input
                type="number"
                min={priceBounds.min}
                max={priceBounds.max}
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="mt-1 w-28 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-medium text-slate-600">Max Price</label>
              <input
                type="number"
                min={priceBounds.min}
                max={priceBounds.max}
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="mt-1 w-28 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <button
              onClick={clearFilters}
              className="ml-auto inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
              title="Clear filters"
            >
              <FiFilter className="h-4 w-4" />
              Clear
            </button>
          </div>
        </section>

        {/* Filtered products */}
        <section className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Fresh finds</h3>
            <button
              className="flex items-center gap-1 text-sm text-emerald-700 font-medium hover:underline"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              View all
              <FiArrowRight className="h-4 w-4" />
            </button>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center text-slate-600">
              No products match your filters.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {filteredProducts.map((p, i) => (
                <ProductCard key={p.id} title={p.title} price={p.price} index={i} />
              ))}
            </div>
          )}
        </section>

        <SustainabilitySection />
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
