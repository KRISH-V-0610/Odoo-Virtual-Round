// components/SearchBar.js
import React from 'react';


const SearchBar = ({ value, onChange }) => (
  <div className="relative">
    <input
      value={value}
      onChange={onChange}
      placeholder="Search products…"
      className="w-full rounded-2xl border border-slate-300 bg-white pl-11 pr-4 py-3 text-slate-900 placeholder:slate-400 shadow-sm focus:border-emerald-500 focus:ring-4 focus:ring-emerald-200 transition"
      aria-label="Search products"
    />
    
  </div>
);

export default SearchBar;