// components/IconButton.js
import React from 'react';

const IconButton = ({ children, className = "", ...props }) => (
  <button
    className={
      "relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm hover:bg-slate-50 active:scale-[0.99] transition-all " +
      className
    }
    {...props}
  >
    {children}
  </button>
);

export default IconButton;