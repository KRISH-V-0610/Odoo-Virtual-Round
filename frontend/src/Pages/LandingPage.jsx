import React, { useState } from "react";

const IconButton = ({ children, className = "", ...props }) => (
  <button
    className={
      "relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm hover:bg-slate-50 active:scale-[0.99] " +
      className
    }
    {...props}
  >
    {children}
  </button>
);

const Pill = ({ children, className = "", ...props }) => (
  <button
    className={
      "whitespace-nowrap rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 " +
      className
    }
    {...props}
  >
    {children}
  </button>
);

const SearchBar = ({ value, onChange }) => (
  <div className="relative">
    <input
      value={value}
      onChange={onChange}
      placeholder="Search products…"
      className="w-full rounded-2xl border border-slate-300 bg-white pl-11 pr-4 py-3 text-slate-900 placeholder:slate-400 shadow-sm focus:border-emerald-500 focus:ring-4 focus:ring-emerald-200 transition"
    />
    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
  </div>
);

const Banner = () => (
  <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md">
    <div className="aspect-[16/9] w-full bg-gradient-to-r from-emerald-200 via-emerald-100 to-sky-200 grid place-items-center">
      <div className="text-center px-4">
        <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">
          Find great pre-loved deals
        </h2>
        <p className="mt-2 text-slate-700 text-sm sm:text-base">
          Buy & sell second-hand items. Save money, reduce waste.
        </p>
        <a
          href="#categories"
          className="mt-4 inline-flex rounded-2xl bg-emerald-600 px-4 py-2.5 text-white shadow hover:bg-emerald-500"
        >
          Explore now
        </a>
      </div>
    </div>
  </section>
);

const CategoryCard = ({ name, emoji }) => (
  <button className="flex flex-col items-center gap-2 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:bg-slate-50 active:scale-[0.99]">
    <div className="grid h-16 w-20 place-items-center rounded-xl bg-slate-100 text-2xl">
      {emoji}
    </div>
    <span className="text-xs font-medium text-slate-700">{name}</span>
  </button>
);

const ProductGhost = () => (
  <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
    <div className="aspect-square w-full bg-slate-100 rounded-t-2xl" />
    <div className="p-3">
      <div className="h-4 w-2/3 bg-slate-100 rounded mb-2" />
      <div className="h-4 w-1/3 bg-slate-100 rounded" />
    </div>
  </div>
);

export default function LandingPage() {
  const [q, setQ] = useState("");

  const categories = [
    { name: "Mobiles", emoji: "📱" },
    { name: "Laptops", emoji: "💻" },
    { name: "Fashion", emoji: "👗" },
    { name: "Home", emoji: "🛋️" },
    { name: "Books", emoji: "📚" },
    { name: "Sports", emoji: "🏏" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-sky-50">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-center gap-3 py-3">
            <IconButton aria-label="Menu">
              <HamburgerIcon className="h-5 w-5 text-slate-700" />
            </IconButton>

            <div className="select-none text-lg font-semibold text-emerald-700">
              EcoFinds
            </div>

            <div className="ml-auto flex items-center gap-2">
              <IconButton aria-label="Cart" className="h-10 w-10">
                <CartIcon className="h-5 w-5 text-slate-700" />
                <span className="absolute -top-1.5 -right-1.5 grid h-5 w-5 place-items-center rounded-full bg-rose-500 text-[10px] font-semibold text-white shadow">
                  3
                </span>
              </IconButton>
              <IconButton aria-label="Profile">
                <span className="block h-7 w-7 rounded-full bg-gradient-to-br from-emerald-400 to-sky-400" />
              </IconButton>
            </div>
          </div>

          {/* Search + actions */}
          <div className="pb-3">
            <SearchBar value={q} onChange={(e) => setQ(e.target.value)} />
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
              <Pill>Sort</Pill>
              <Pill>Filter</Pill>
              <Pill>Group by</Pill>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-6xl px-4 py-6">
        <Banner />

        {/* Categories */}
        <section id="categories" className="mt-6">
          <Pill className="w-full justify-center">All Categories</Pill>
          <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-6">
            {categories.map((c) => (
              <CategoryCard key={c.name} {...c} />
            ))}
          </div>
        </section>

        {/* Product previews (ghost placeholders) */}
        <section className="mt-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <ProductGhost />
            <ProductGhost />
            <ProductGhost />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-8 border-t border-slate-200 bg-white/70 py-4 text-center text-xs text-slate-600">
        © {new Date().getFullYear()} EcoFinds · Buy less, choose well ♻️
      </footer>
    </div>
  );
}

/* ——— Icons ——— */
function HamburgerIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}
function SearchIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
      <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}
function CartIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M3 4h2l2.4 12.2A2 2 0 0 0 9.36 18h7.78a2 2 0 0 0 1.97-1.64L21 8H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="10" cy="20" r="1.5" fill="currentColor"/>
      <circle cx="18" cy="20" r="1.5" fill="currentColor"/>
    </svg>
  );
}
