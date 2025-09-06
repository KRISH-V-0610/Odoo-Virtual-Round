// Components/ProductCard.js
import React from 'react';
import { FiEye } from 'react-icons/fi';

const ProductCard = ({ title, price, index }) => (
  <article className="rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all overflow-hidden group">
    <div className="aspect-square w-full rounded-t-2xl bg-gradient-to-br from-slate-100 to-slate-200 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
    </div>
    <div className="p-3">
      <h4 className="line-clamp-1 text-sm font-medium text-slate-900 group-hover:text-emerald-700 transition-colors">
        {title} {index + 1}
      </h4>
      <p className="mt-1 text-emerald-700 font-semibold text-sm">₹{999 + index}</p>
      <button className="mt-2 w-full py-1.5 text-xs bg-slate-100 hover:bg-emerald-100 text-slate-700 rounded-lg transition-colors flex items-center justify-center gap-1">
        <FiEye className="h-3 w-3" />
        Quick View
      </button>
    </div>
  </article>
);

export default ProductCard;