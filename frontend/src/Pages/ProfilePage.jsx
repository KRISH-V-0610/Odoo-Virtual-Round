import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
/* ————— Import Components ————— */
import IconButton from "../Components/IconButton";
import Pill from "../Components/Pill";
import MobileMenu from "../Components/MobileMenu";
import { CartIcon } from "../Components/Icons";
import useAuthStore from "../Store/authStore";
import axiosInstance from "../api/axiosInstance";

/* ————— Import Icons ————— */
import {
  FiUser,
  FiCamera,
  FiClipboard,
  FiShoppingBag,
  FiChevronRight,
  FiMenu,
  FiLogOut,
  FiArrowLeft,
} from "react-icons/fi";
import { PiLeafBold } from "react-icons/pi";

/* ————— Small atoms ————— */
const Field = ({ label, value }) => (
  <div className="flex flex-col gap-1">
    <span className="text-xs font-medium text-slate-500">{label}</span>
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-slate-900 shadow-sm">
      {value || <span className="text-slate-400">—</span>}
    </div>
  </div>
);

const Input = ({ label, type = "text", value, onChange, placeholder, ...props }) => (
  <label className="flex flex-col gap-1">
    <span className="text-xs font-medium text-slate-500">{label}</span>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder:text-slate-400 shadow-sm focus:border-emerald-500 focus:ring-4 focus:ring-emerald-200 outline-none transition"
      {...props}
    />
  </label>
);

/* ————— Page ————— */
export default function ProfilePage() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    profilePicture: "", // Changed from avatarUrl to profilePicture
    password: ""
  });
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const fileRef = useRef(null);
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  // Clean up blob URLs on unmount
  useEffect(() => {
    return () => {
      // Clean up any blob URLs when component unmounts
      if (user.profilePicture?.startsWith('blob:')) {
        URL.revokeObjectURL(user.profilePicture);
      }
    };
  }, [user.profilePicture]);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/users/profile", {
        withCredentials: true,
      });
      setUser(res.data.data.user);
    } catch (err) {
      console.error("Failed to fetch user profile:", err);
      setError("Failed to load profile data");
    } finally {
      setLoading(false);
    }
  };

  const onSave = async (e) => {
    e?.preventDefault();
    setSaveLoading(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();
      formData.append("username", user.username);
      formData.append("email", user.email);
      
      // Only include password if it's not empty
      if (user.password) {
        formData.append("password", user.password);
      }
      
      // Append profile picture file if selected
      if (fileRef.current?.files?.[0]) {
        formData.append("profilePicture", fileRef.current.files[0]);
      }

      const response = await axiosInstance.put("/users/profile", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.status === 'success') {
        setSuccess("Profile updated successfully!");
        
        // Update user state with the actual server response
        setUser(prev => ({
          ...prev,
          ...response.data.data.user, // This includes the actual Cloudinary URL
          password: "" // Clear password field
        }));
        
        setEditing(false);
        
        // Clean up the blob URL if we created one
        if (fileRef.current?.files?.[0] && user.profilePicture?.startsWith('blob:')) {
          URL.revokeObjectURL(user.profilePicture);
        }
        
        // Reset file input
        if (fileRef.current) {
          fileRef.current.value = "";
        }
      }
    } catch (err) {
      if (err.response?.data?.status === 'fail') {
        setError(err.response.data.message);
      } else if (err.response?.status === 409) {
        setError("Username or email already taken");
      } else {
        setError("Failed to update profile");
      }
      console.error("Update error:", err);
    } finally {
      setSaveLoading(false);
    }
  };

  const onCancel = () => {
    // Clean up blob URL if we created one
    if (fileRef.current?.files?.[0] && user.profilePicture?.startsWith('blob:')) {
      URL.revokeObjectURL(user.profilePicture);
    }
    
    // Re-fetch original data to reset any changes
    fetchUserProfile();
    setEditing(false);
    setError("");
    setSuccess("");
    setUser(prev => ({ ...prev, password: "" })); // Clear password field
    
    // Reset file input
    if (fileRef.current) {
      fileRef.current.value = "";
    }
  };

  const onAvatarPick = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Clean up previous blob URL if exists
    if (user.profilePicture?.startsWith('blob:')) {
      URL.revokeObjectURL(user.profilePicture);
    }
    
    const url = URL.createObjectURL(file);
    setUser((u) => ({ ...u, profilePicture: url }));
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleInputChange = (field, value) => {
    setUser(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-sky-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

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
              <a href="/home" className="hidden md:flex items-center gap-2 select-none text-lg font-semibold text-emerald-700">
                <PiLeafBold className="h-6 w-6 text-emerald-600" />
                EcoFinds
              </a>
            </div>

            {/* Center: logo (mobile) */}
            <a href="/home" className="mx-auto md:mx-0 md:ml-2 flex items-center gap-2 select-none text-lg font-semibold text-emerald-700 md:hidden">
              <PiLeafBold className="h-5 w-5 text-emerald-600" />
              EcoFinds
            </a>

            {/* Right: cart + profile */}
            <div className="ml-auto flex items-center gap-2">
              <IconButton
                aria-label="Cart"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("/cart");
                }}
              >
                <CartIcon className="h-5 w-5 text-slate-700" />
                <span className="absolute -top-1.5 -right-1.5 grid h-5 w-5 place-items-center rounded-full bg-rose-500 text-[10px] font-semibold text-white shadow">
                  {user.cartItems || 0}
                </span>
              </IconButton>
              <IconButton aria-label="Profile" className="h-10 w-10">
                {user.profilePicture ? ( // Changed from avatarUrl to profilePicture
                  <img
                    src={user.profilePicture}
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
          <button onClick={() => navigate("/home")} className="flex items-center gap-2 text-sm font-medium text-emerald-700">
            <FiArrowLeft className="h-4 w-4" />
            Back to Home
          </button>
        </div>

        {/* Error and Success Messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
            {success}
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {/* Left: Profile card spans 2 cols on desktop */}
          <section className="md:col-span-2">
            <div className="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-xl backdrop-blur md:p-6">
              <div className="flex items-start justify-between">
                <h2 className="text-xl font-semibold text-slate-900">Profile</h2>
                {!editing ? (
                  <Pill onClick={() => setEditing(true)}>
                    Edit Profile
                  </Pill>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={onCancel}
                      className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
                      disabled={saveLoading}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={onSave}
                      disabled={saveLoading}
                      className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-500 disabled:bg-emerald-400"
                    >
                      {saveLoading ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                )}
              </div>

              {/* Avatar + basic info */}
              <div className="mt-6 flex flex-col items-center gap-6 sm:flex-row sm:items-start">
                <div className="relative">
                  <div className="grid h-28 w-28 place-items-center overflow-hidden rounded-full bg-slate-100 sm:h-32 sm:w-32">
                    {user.profilePicture ? ( // Changed from avatarUrl to profilePicture
                      <img
                        src={user.profilePicture}
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
                        className="absolute -right-1.5 -bottom-1.5 rounded-full border border-slate-200 bg-white/90 p-2 shadow hover:bg-slate-50"
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
                      <Field label="Username" value={user.username} />
                      <Field label="Email" value={user.email} />
                    </>
                  ) : (
                    <>
                      <Input
                        label="Username"
                        value={user.username}
                        onChange={(e) => handleInputChange('username', e.target.value)}
                      />
                      <Input
                        type="email"
                        label="Email"
                        value={user.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                    </>
                  )}
                </div>
              </div>

              {/* Password field (only shown in edit mode) */}
              {editing && (
                <div className="mt-6 w-full">
                  <Input
                    type="password"
                    label="New Password (optional)"
                    placeholder="Leave blank to keep current password"
                    value={user.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                  />
                </div>
              )}
            </div>

            {/* Additional sections for desktop */}
            <div className="mt-6 hidden md:block">
              <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-xl backdrop-blur">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Activity Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-slate-50 p-4 text-center">
                    <div className="text-极xl font-bold text-emerald-700">{user.listingsCount || 0}</div>
                    <div className="text-sm text-slate-600">Items Listed</div>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-4 text-center">
                    <div className="text-2xl font-bold极 text-emerald-700">{user.soldCount || 0}</div>
                    <div className="text-sm text-slate-600">Items Sold</div>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-4 text-center">
                    <div className="text-2xl font-bold text-emerald-700">{user.purchasesCount || 0}</div>
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
              <div className="flex极flex-col gap-3">
                <button
                  onClick={() => navigate("/mylistings")}
                  className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-800 shadow-sm hover:bg-slate-50 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <FiClipboard className="h-5 w-5 text-slate-500" />
                    My listings
                  </span>
                  <FiChevronRight className="h-4 w-4 text-slate-400" />
                </button>

                <button
                  onClick={() => navigate("/mypurchases")}
                  className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4极 py-3 text-slate-800 shadow-sm hover:bg-slate-50 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <FiShoppingBag className="h-5 w-5 text-slate-500" />
                    My Purchases
                  </span>
                  <FiChevronRight className="h-4 w-4 text-slate-400" />
                </button>
              </div>
            </div>

            {/* Sign out button */}
            <button onClick={handleLogout} className="mt-6 w-full rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-rose-700 shadow-sm hover:bg-rose-100 transition-colors">
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