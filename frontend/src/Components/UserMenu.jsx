// components/UserMenu.js
import React from 'react';

const UserMenu = ({ user, isOpen, onClose }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-30" onClick={onClose}>
      <div className="absolute top-16 right-4 bg-white rounded-xl shadow-lg border border-slate-200 w-60 overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-400 to-sky-400 flex items-center justify-center text-white font-semibold">
              {user.name.charAt(0)}
            </div>
            <div>
              <p className="font-medium text-slate-900 text-sm">{user.name}</p>
              <p className="text-xs text-slate-500">{user.email}</p>
            </div>
          </div>
        </div>
        
        <div className="p-2">
          {['Profile', 'My Orders', 'Wishlist', 'Sell Items', 'Settings'].map(item => (
            <button key={item} className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-slate-100 text-sm text-slate-700">
              {item}
            </button>
          ))}
        </div>
        
        <div className="p-3 border-t border-slate-100">
          <button className="w-full py-2 text-center text-sm font-medium text-rose-600 hover:bg-rose-50 rounded-lg">
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;