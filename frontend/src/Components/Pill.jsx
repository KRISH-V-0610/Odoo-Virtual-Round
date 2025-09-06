// components/Pill.js
import React from 'react';

const Pill = ({ children, className = "", ...props }) => (
  <button
    className={
      "whitespace-nowrap rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition-all " +
      className
    }
    {...props}
  >
    {children}
  </button>
);

export default Pill;