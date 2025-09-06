import React, { useRef, useState } from "react";
import { FiUpload, FiX, FiArrowLeft, FiMenu } from "react-icons/fi";
import axios from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { CartIcon } from "../Components/Icons";

// Import Components
import IconButton from "../Components/IconButton";
import MobileMenu from "../Components/MobileMenu";
import UserMenu from "../Components/UserMenu";
import { PiLeafBold } from "react-icons/pi";

const CATEGORY_OPTIONS = [
  "Clothing",
  "Electronics",
  "Books",
  "Furniture",
  "Sports",
  "Toys",
  "Other",
];

export default function AddProduct() {
  const navigate = useNavigate();
  const fileRef = useRef(null);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);        // File[]
  const [previews, setPreviews] = useState([]);  // string[]
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // State for mobile menu and user menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Demo user data
  const [user] = useState({
    name: "Alex Johnson",
    email: "alex@example.com",
    cartItems: 3,
    avatarUrl: ""
  });

  const pickFiles = (fileList) => {
    const picked = Array.from(fileList || []).slice(0, 8);
    setFiles((prev) => [...prev, ...picked].slice(0, 8));
    const urls = picked.map((f) => URL.createObjectURL(f));
    setPreviews((prev) => [...prev, ...urls].slice(0, 8));
  };

  const onDrop = (e) => {
    e.preventDefault();
    pickFiles(e.dataTransfer.files);
  };

  const removeImage = (idx) => {
    // Revoke the object URL to prevent memory leaks
    URL.revokeObjectURL(previews[idx]);
    
    setFiles((prev) => prev.filter((_, i) => i !== idx));
    setPreviews((prev) => prev.filter((_, i) => i !== idx));
  };

  const resetForm = () => {
    setTitle("");
    setCategory("");
    setPrice("");
    setDescription("");
    
    // Revoke all object URLs to prevent memory leaks
    previews.forEach(url => URL.revokeObjectURL(url));
    
    setFiles([]);
    setPreviews([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title || !category || !price || !description) {
      setError("Please fill Title, Category, Price, and Description.");
      return;
    }

    if (files.length === 0) {
      setError("Please upload at least one image.");
      return;
    }

    const fd = new FormData();
    fd.append("title", title);
    fd.append("description", description);
    fd.append("category", category);
    fd.append("price", price);
    files.forEach((f) => fd.append("images", f));   // Field name: "images" (matches backend multer)

    try {
      setLoading(true);
      await axios.post("/api/products", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      resetForm();
      navigate("/my-listings"); // or navigate(`/products/${data._id}`) if your API returns it
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create product");
    } finally {
      setLoading(false);
    }
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
                      e.stopPropagation();   // if inside another clickable area
                      navigate("/cart");
                  }}
                >
                  <CartIcon className="h-5 w-5 text-slate-700" />
                  <span className="absolute -top-1.5 -right-1.5 grid h-5 w-5 place-items-center rounded-full bg-rose-500 text-[10px] font-semibold text-white shadow">
                      {user.cartItems}
                  </span>
                </IconButton>
              <IconButton 
                aria-label="Profile" 
                className="h-10 w-10"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
              >
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

          {/* Back button */}
          <div className="pb-3">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-sm font-medium text-emerald-700"
            >
              <FiArrowLeft className="h-4 w-4" />
              Back
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)}
        user={user}
      />

      {/* User Menu */}
      <UserMenu 
        user={user} 
        isOpen={userMenuOpen} 
        onClose={() => setUserMenuOpen(false)}
      />

      {/* Main */}
      <main className="mx-auto max-w-5xl px-4 py-6 md:py-8">
        <h1 className="mb-6 text-2xl font-semibold text-slate-900 text-center">List a New Product</h1>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-xl backdrop-blur md:p-6"
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDrop}
        >
          {/* Uploader */}
          <section className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 md:p-6">
            <div className="flex flex-col items-center justify-center gap-2 text-center">
              <div className="rounded-full bg-emerald-100 p-3 mb-2">
                <FiUpload className="h-6 w-6 text-emerald-600" />
              </div>
              <h2 className="text-lg font-medium text-slate-800">Add product images</h2>
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition-colors"
                disabled={loading}
              >
                <FiUpload className="h-4 w-4" />
                Select images
              </button>
              <p className="text-xs text-slate-500 mt-2">
                JPG/PNG/WEBP up to 5MB each • drag & drop supported • max 8 images
              </p>
              <input
                ref={fileRef} 
                type="file"
                accept="image/*"
                multiple
                hidden
                onChange={(e) => pickFiles(e.target.files)}
              />
            </div>

            {previews.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-slate-700 mb-3">Selected images ({previews.length}/8)</h3>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                  {previews.map((src, idx) => (
                    <div key={idx} className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white">
                      <img src={src} alt={`upload ${idx + 1}`} className="aspect-square w-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute right-1.5 top-1.5 rounded-md bg-white/90 p-1.5 text-slate-700 shadow hover:bg-rose-50 hover:text-rose-600 transition-colors"
                        aria-label="Remove image"
                      >
                        <FiX className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Fields */}
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              label="Product Title"
              placeholder="e.g., Vintage Denim Jacket"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={loading}
            />

            <Select
              label="Product Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              disabled={loading}
            >
              <option value="" disabled>
                Select category
              </option>
              {CATEGORY_OPTIONS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>

            <Input
              label="Price (₹)"
              type="number"
              min="0"
              step="1"
              placeholder="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              disabled={loading}
            />

            <Textarea
              className="md:col-span-2"
              label="Product Description"
              placeholder="Describe the item, condition, size, brand, and any notes buyers should know…"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              disabled={loading}
              rows={5}
            />
          </div>

          {error && (
            <div className="mt-6 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {error}
            </div>
          )}

          <div className="mt-8 flex flex-col-reverse gap-3 md:flex-row md:justify-center md:gap-4">
            <button
              type="button"
              onClick={resetForm}
              disabled={loading}
              className="rounded-2xl border border-slate-300 bg-white px-6 py-3 font-medium text-slate-700 shadow hover:bg-slate-50 transition-colors"
            >
              Reset Form
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`rounded-2xl px-6 py-3 font-medium shadow focus:outline-none focus:ring-4 transition-all ${
                loading
                  ? "bg-emerald-300 text-white cursor-not-allowed"
                  : "bg-emerald-600 text-white hover:bg-emerald-500 focus:ring-emerald-300"
              }`}
            >
              {loading ? "Publishing…" : "Publish Item"}
            </button>
          </div>
        </form>

        {/* Tips section */}
        <div className="mt-8 rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-xl backdrop-blur md:p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Tips for Successful Listings</h3>
          <ul className="space-y-2 text-sm text-slate-600">
            <li className="flex items-start gap-2">
              <span className="text-emerald-600">•</span>
              Use clear, well-lit photos from multiple angles
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600">•</span>
              Be honest about the condition of your item
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600">•</span>
              Include measurements for clothing and furniture
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600">•</span>
              Price competitively based on condition and market value
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}

/* ————— small inputs ————— */
function Input({ label, className = "", ...props }) {
  return (
    <label className={`flex flex-col gap-1 ${className}`}>
      <span className="text-xs font-medium text-slate-600">{label}</span>
      <input
        className="rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-slate-900 placeholder:text-slate-400 shadow-sm focus:border-emerald-500 focus:ring-4 focus:ring-emerald-200 outline-none transition"
        {...props}
      />
    </label>
  );
}

function Select({ label, className = "", children, ...props }) {
  return (
    <label className={`flex flex-col gap-1 ${className}`}>
      <span className="text-xs font-medium text-slate-600">{label}</span>
      <select
        className="rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-slate-900 shadow-sm focus:border-emerald-500 focus:ring-4 focus:ring-emerald-200 outline-none transition"
        {...props}
      >
        {children}
      </select>
    </label>
  );
}

function Textarea({ label, className = "", rows = 3, ...props }) {
  return (
    <label className={`flex flex-col gap-1 ${className}`}>
      <span className="text-xs font-medium text-slate-600">{label}</span>
      <textarea
        className="min-h-[96px] rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-slate-900 placeholder:text-slate-400 shadow-sm focus:border-emerald-500 focus:ring-4 focus:ring-emerald-200 outline-none transition"
        rows={rows}
        {...props}
      />
    </label>
  );
}