import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
/* ————— Import Components ————— */
import IconButton from "../Components/IconButton";
import Pill from "../Components/Pill";
import MobileMenu from "../Components/MobileMenu";
import { CartIcon } from "../Components/Icons";

/* ————— Import Icons ————— */
import {
  FiShoppingCart,
  FiUser,
  FiCamera,
  FiClipboard,
  FiShoppingBag,
  FiChevronRight,
  FiMenu,
  FiHeart,
  FiSettings,
  FiLogOut,
  FiArrowLeft,
} from "react-icons/fi";
import { PiLeafBold } from "react-icons/pi";

/* ————— Small atoms ————— */
const Field = ({ label, value }) => (
  <div className="flex flex-col gap-1">
    <span className="text-xs font-medium text-slate-500">{label}</span>
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-slate-极 shadow-sm">
      {value || <span className="text-slate-400">—</span>}
    </div>
  </div>
);

const Input = ({ label, ...props }) => (
  <label className="flex极flex-col gap-1">
    <span className="text-xs font-medium text-slate-500">{label}</span>
    <input
      className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder:text-slate-400 shadow-sm focus:border-emerald-500 focus:ring-4 focus:ring-emerald-200 outline-none transition"
      {...props}
    />
  </label>
);

/* ————— Page ————— */
export default function ProfilePage() {
  // Demo user state
  const [user, setUser] = useState({
    name: "Aarav Sharma",
    email: "aarav@example.com",
    
  });
  const [editing, setEditing] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const fileRef = useRef(null);
  const navigate = useNavigate(); 

  const onSave = (e) => {
    e?.preventDefault();
    setEditing(false);
    // TODO: call API to persist user state
  };

  const onAvatarPick = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setUser((u) => ({ ...u, avatarUrl: url }));
  };

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
              <a href="#" className="hidden md:flex items-center gap-2 select-none text-lg font-semibold text-emerald-700">
                <PiLeafBold className="h-6 w-6 text-emerald-600" />
                EcoFinds
              </a>
            </div>

            {/* Center: logo (mobile) */}
            <a href="#" className="mx-auto md:mx-0 md:ml-2 flex items-center gap-2 select-none text-lg font-semibold text-emerald-700 md:hidden">
              <PiLeafBold className="h-5 w-5 text-emerald-600" />
              EcoFinds
            </a>

            {/* Right: cart + profile */}
            <div className="ml-auto flex items-center gap-2">
               <IconButton
                            aria-label="Cart"
                            onClick={(e) => {
                                e.stopPropagation();   // if inside another clickable area
                                navigate("/cart");
                            }}
                        >
                            <CartIcon className="h-5 w-5 text-slate-700" />
                            <span className="absolute -top-1.5 -right-1.5 grid h-5 w-5 place-items-center rounded-full bg-rose-500 text-[10px] font-semibold text-white shadow">
                                {user.cartItems}
                            </span>
                        </IconButton>
              <IconButton aria-label="Profile" className="h-10 w-10">
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
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)}
        user={user}
      />

      {/* Main */}
      <main className="mx-auto max-w-6xl px-4 py-6 md:py-8">
        {/* Back button for mobile */}
        <div className="mb-6 md:hidden">
          <button className="flex items-center gap-2 text-sm font-medium text-emerald-700">
            <FiArrowLeft className="h-4 w-4" />
            Back to Home
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {/* Left: Profile card spans 2 cols on desktop */}
          <section className="md:col-span-2">
            <div className="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-xl backdrop-blur md:p-6">
              <div className="极lex items-start justify-between">
                <h2 className="text-xl font-semibold text-slate-900">Profile</h2>
                {!editing ? (
                  <Pill onClick={() => setEditing(true)}>
                    Edit Profile
                  </Pill>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditing(false)}
                      className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={onSave}
                      className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-500"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </div>

              {/* Avatar + basic info */}
              <div className="mt-6 flex flex-col items-center gap-6 sm:flex-row sm:items-start">
                <div className="relative">
                  <div className="grid h-28 w-28 place-items-center overflow-hidden rounded-full bg-slate-100 sm:h-32 sm:w-32">
                    {user.avatarUrl ? (
                      <img
                        src={user.avatarUrl}
                        alt="User avatar"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <FiUser className="h-12 w-12 text-slate-400" />
                    )}
                  </div>
                  {editing && (
                    <>
                      <button
                        onClick={() => fileRef.current?.click()}
                        className="absolute -right-1.5 -bottom-1.5 rounded-full border border-slate-200 bg-white/90 p-2 shadow hover:极-slate-50"
                        title="Change photo"
                        type="button"
                      >
                        <FiCamera className="h-4 w-4 text-slate-700" />
                      </button>
                      <input
                        ref={fileRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={onAvatarPick}
                      />
                    </>
                  )}
                </div>

                <div className="w-full grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {!editing ? (
                    <>
                      <Field label="Name" value={user.name} />
                      <Field label="Email" value={user.email} />
                      
                    </>
                  ) : (
                    <>
                      <Input
                        label="Name"
                        value={user.name}
                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                      />
                      <Input
                        type="email"
                        label="Email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                      />
                      
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Additional sections for desktop */}
            <div className="mt-6 hidden md:block">
              <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-xl backdrop-blur">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Activity Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-slate-50 p-4 text-center">
                    <div className="text-2xl font-bold text-emerald-700">24</div>
                    <div className="text-sm text-slate-600">Items Listed</div>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-4 text-center">
                    <div className="text-2xl font-bold text-emerald-700">18</div>
                    <div className="text-sm text-slate-600">Items Sold</div>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-4 text-center">
                    <div className="text-2xl font-bold text-emerald-700">12</div>
                    <div className="text-sm text-slate-600">Items Bought</div>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-4 text-center">
                    <div className="text-2xl font-bold text-emerald-700">4.8</div>
                    <div className="text-sm text-slate-600">Avg Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Right: Navigations */}
          <aside className="md:col-span-1">
            <div className="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-xl backdrop-blur md:p-6">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">Account</h3>
              <div className="flex flex-col gap-3">
                <a
                  href="/my-listings"
                  className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-800 shadow-sm hover:bg-slate-50 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <FiClipboard className="h-5 w-5 text-slate-500" />
                    My listings
                  </span>
                  <FiChevronRight className="h-4 w-4 text-slate-400" />
                </a>

                <a
                  href="/my-purchases"
                  className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-800 shadow-sm hover:bg-slate-50 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <FiShoppingBag className="h-5 w-5 text-slate-500" />
                    My Purchases
                  </span>
                  <FiChevronRight className="h-4 w-4 text-slate-400" />
                </a>

               
              </div>
            </div>

           

            {/* Sign out button */}
            <button className="mt-6 w-full rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-rose-700 shadow-sm hover:bg-rose-100 transition-colors">
              <span className="flex items-center justify-center gap-2 font-medium">
                <FiLogOut className="h-5 w-5" />
                Sign Out
              </span>
            </button>
          </aside>
        </div>
      </main>
    </div>
  );
}