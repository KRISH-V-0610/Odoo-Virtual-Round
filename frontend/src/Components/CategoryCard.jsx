// Components/CategoryCard.js
import React from 'react';

const CategoryCard = ({ name, icon, onClick, isActive = false }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center gap-2 rounded-2xl border p-4 shadow-sm hover:bg-slate-50 active:scale-[0.99] transition-transform ${
      isActive 
        ? 'border-emerald-300 bg-emerald-50' 
        : 'border-slate-200 bg-white'
    }`}
    aria-label={name}
  >
    <div className="grid h-16 w-16 md:h-20 md:w-20 place-items-center rounded-xl bg-slate-100">
      {icon}
    </div>
    <span className="text-xs font-medium text-slate-700">{name}</span>
  </button>
);

export default CategoryCard;