import React from "react";
import { CloseIcon } from "./Icons";
import { NavLink, Link } from "react-router-dom";
import useAuthStore from "../Store/authStore";
import { useNavigate } from "react-router-dom";

const NAV_ITEMS = [
  { label: "Home", to: "/home" },
  { label: "My Listings", to: "/mylistings" },
  { label: "My purchases", to: "/mypurchases" },
  { label: "Add a Product to sell", to: "/addproduct" },
];

const MobileMenu = ({ isOpen, onClose, user }) => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    await logout(); // clear state + call API
    navigate("/login"); // redirect to login page
  };

  return (
    <div
      className={`fixed inset-0 z-50 bg-black/20 backdrop-blur-sm transition-opacity ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      <div
        className={`absolute top-0 left-0 h-full w-80 bg-white shadow-xl transform transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Make column layout so logout can stick to bottom */}
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="p-5 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-emerald-700">Menu</span>
              <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100">
                <CloseIcon className="h-6 w-6 text-slate-600" />
              </button>
            </div>
          </div>

          {/* User */}
          <div className="p-5 border-b border-slate-200">
            {user ? (
              <div className="flex items-center gap-3">
                {user.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt="avatar"
                    className="h-12 w-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-emerald-400 to-sky-400 grid place-items-center text-white font-semibold">
                    {user.name?.charAt(0) || user.username?.charAt(0) || "U"}
                  </div>
                )}
                <Link
                  to="/profile"
                  onClick={onClose}
                  className="block rounded-lg px-2 py-1 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                >
                  <p className="font-medium text-slate-900">{user.username}</p>
                  <p className="text-sm text-slate-500">{user.email}</p>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                <Link
                  to="/login"
                  onClick={onClose}
                  className="block w-full text-center py-2.5 rounded-xl bg-emerald-600 text-white font-medium"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={onClose}
                  className="block w-full text-center py-2.5 rounded-xl border border-slate-300 text-slate-700 font-medium"
                >
                  Create Account
                </Link>
              </div>
            )}
          </div>

          {/* Nav (grows) */}
          <nav className="p-5 flex-1 overflow-y-auto">
            <ul className="space-y-2">
              {NAV_ITEMS.map(({ label, to }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={to === "/"}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `block w-full text-left py-2.5 px-3 rounded-lg font-medium transition
                     ${isActive ? "bg-emerald-50 text-emerald-700" : "text-slate-700 hover:bg-slate-100"}`
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Logout (only when logged in) */}
          {user && (
            <div className="p-5 border-t border-slate-200">
              <button
                onClick={handleLogout}
                className="w-full py-2.5 rounded-xl bg-rose-600 text-white font-medium hover:bg-rose-500"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;