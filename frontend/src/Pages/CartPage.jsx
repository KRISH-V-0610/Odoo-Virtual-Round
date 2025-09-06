import React, { useMemo, useState } from "react";
import {
  FiShoppingCart,
  FiPlus,
  FiMinus,
  FiTrash2,
  FiArrowLeft,
  FiChevronRight
} from "react-icons/fi";
import { CartIcon } from "../Components/Icons";
import { useNavigate } from "react-router-dom";

// Import Components
import IconButton from "../Components/IconButton";
import MobileMenu from "../Components/MobileMenu";
import UserMenu from "../Components/UserMenu";
import { PiLeafBold } from "react-icons/pi";

const INR = new Intl.NumberFormat("en-IN", { 
  style: "currency", 
  currency: "INR", 
  maximumFractionDigits: 0 
});


export default function CartPage() {
  // State management
  const [items, setItems] = useState([
    {
      id: 1,
      title: "Vintage Denim Jacket",
      price: 1299,
      thumbnail: "https://images.unsplash.com/photo-1520975922313-827d622b9f8d?q=80&w=400&auto=format&fit=crop",
      qty: 1,
      category: "Clothing",
      condition: "Used - Very Good"
    },
    {
      id: 2,
      title: "IKEA Side Table",
      price: 1499,
      thumbnail: "https://images.unsplash.com/photo-1493666438817-866a91353ca9?q=80&w=400&auto=format&fit=crop",
      qty: 2,
      category: "Furniture",
      condition: "Used - Good"
    },
    {
      id: 3,
      title: "Clean Code (Like New)",
      price: 699,
      thumbnail: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=400&auto=format&fit=crop",
      qty: 1,
      category: "Books",
      condition: "Used - Excellent"
    },
  ]);
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Demo user data
  const [user] = useState({
    name: "Alex Johnson",
    email: "alex@example.com",
    cartItems: items.reduce((total, item) => total + item.qty, 0),
    avatarUrl: ""
  });

  // ---- actions ----
  const inc = (id) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, qty: it.qty + 1 } : it)));
    // Update cart count
    user.cartItems = items.reduce((total, item) => total + item.qty, 0) + 1;
  };

  const dec = (id) => {
    setItems((prev) =>
      prev.map((it) =>
        it.id === id ? { ...it, qty: Math.max(1, it.qty - 1) } : it
      )
    );
    // Update cart count
    user.cartItems = items.reduce((total, item) => total + item.qty, 0) - 1;
  };

  const removeItem = (id) => {
    const itemToRemove = items.find(item => item.id === id);
    setItems((prev) => prev.filter((it) => it.id !== id));
    // Update cart count
    user.cartItems = items.reduce((total, item) => total + item.qty, 0) - (itemToRemove ? itemToRemove.qty : 0);
  };

  const clearCart = () => {
    setItems([]);
    user.cartItems = 0;
  };

  // ---- totals ----
  const { subtotal, shipping, total } = useMemo(() => {
    const sub = items.reduce((s, it) => s + it.price * it.qty, 0);
    const ship = items.length ? 49 : 0; // flat shipping for demo
    return { subtotal: sub, shipping: ship, total: sub + ship };
  }, [items]);

  const checkout = () => {
    if (!items.length) return;
    alert(`Proceeding to checkout: ${INR.format(total)}`);
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
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-slate-700">
                  <path d="M4 6h16M4 12h16M4 18极16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
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

          <div className="pb-3 flex items-center justify-between">
            <a href="/home" className="flex items-center gap-1 text-sm text-emerald-700 font-medium">
              <FiArrowLeft className="h-4 w-4" />
              Continue Shopping
            </a>
            <h1 className="text-base font-medium text-slate-700">
              Your Cart ({items.length} {items.length === 1 ? 'item' : 'items'})
            </h1>
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
      <main className="mx-auto max-w-6xl px-4 py-6 md:py-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:items-start">
          {/* Items list */}
          <section className="md:col-span-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow">
              {items.length === 0 ? (
                <div className="p-8 text-center text-slate-600">
                  <FiShoppingCart className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-lg font-medium text-slate-700">Your cart is empty</p>
                  <p className="text-sm text-slate-500 mt-2">Start shopping to add items to your cart</p>
                  <a 
                    href="/home" 
                    className="mt-4 inline-block rounded-2xl bg-emerald-600 px-6 py-2.5 text-white hover:bg-emerald-500 transition-colors"
                  >
                    Browse Products
                  </a>
                </div>
              ) : (
                <>
                  <ul className="space-y-4">
                    {items.map((it) => (
                      <li
                        key={it.id}
                        className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md"
                      >
                        <img
                          src={it.thumbnail}
                          className="h-20 w-20 rounded-xl object-cover"
                          alt={it.title}
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-slate-900 truncate">
                            {it.title}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                              {it.category}
                            </span>
                            <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                              {it.condition}
                            </span>
                          </div>
                          <p className="text-sm text-emerald-700 font-semibold mt-2">
                            {INR.format(it.price)}
                          </p>
                          <div className="mt-3 flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => dec(it.id)}
                                className="grid h-8 w-8 place-items-center rounded-md border border-slate-300 bg-white hover:bg-slate-50 transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <FiMinus className="h-3.5 w-3.5" />
                              </button>
                              <span className="min-w-[2ch] text-center text-sm font-medium text-slate-800">
                                {it.qty}
                              </span>
                              <button
                                onClick={() => inc(it.id)}
                                className="grid h-8 w-8 place-items-center rounded-md border border-slate-300 bg-white hover:bg-slate-50 transition-colors"
                                aria-label="Increase quantity"
                              >
                                <FiPlus className="h-3.5 w-3.5" />
                              </button>
                            </div>
                            <button
                              onClick={() => removeItem(it.id)}
                              className="flex items-center gap-1.5 rounded-lg bg-rose-50 px-3 py-1.5 text-xs font-medium text-rose-600 hover:bg-rose-100 transition-colors"
                            >
                              <FiTrash2 className="h-3.5 w-3.5" />
                              Remove
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-base font-semibold text-slate-900">
                            {INR.format(it.price * it.qty)}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4">
                    <button
                      onClick={clearCart}
                      className="text-sm font-medium text-slate-500 hover:text-rose-600 transition-colors flex items-center gap-2"
                    >
                      <FiTrash2 className="h-4 w-4" />
                      Clear cart
                    </button>
                    <span className="text-sm text-slate-500">
                      {items.reduce((total, item) => total + item.qty, 0)} item{items.reduce((total, item) => total + item.qty, 0) > 1 ? "s" : ""}
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Recently viewed section */}
            {items.length > 0 && (
              <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow">
                <h3 className="text-base font-semibold text-slate-900 mb-4">You might also like</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { title: "Wireless Headphones", price: 1999, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=300&auto=format&fit=crop" },
                    { title: "Canvas Backpack", price: 899, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=300&auto=format&fit=crop" }
                  ].map((item, index) => (
                    <div key={index} className="rounded-xl border border-slate-200 p-3 hover:shadow-md transition-shadow">
                      <img src={item.image} alt={item.title} className="h-20 w-full object-cover rounded-lg mb-2" />
                      <p className="text-xs font-medium text-slate-900 truncate">{item.title}</p>
                      <p className="text-sm font-semibold text-emerald-700">{INR.format(item.price)}</p>
                      <button className="mt-2 w-full text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 py-1.5 rounded-lg transition-colors">
                        Add to cart
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Summary / totals */}
          <aside className="md:sticky md:top-24">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Order Summary</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Subtotal ({items.reduce((total, item) => total + item.qty, 0)} items)</span>
                  <span className="font-medium text-slate-900">
                    {INR.format(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Shipping</span>
                  <span className="font-medium text-slate-900">
                    {shipping ? INR.format(shipping) : "Free"}
                  </span>
                </div>
                
                {/* Environmental impact */}
                <div className="bg-emerald-50 rounded-xl p-3 mt-4">
                  <div className="flex items-center justify-between text-xs text-emerald-800">
                    <span>Carbon-neutral shipping</span>
                    <span className="font-medium">✓ Included</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-emerald-800 mt-1">
                    <span>Items saved from landfill</span>
                    <span className="font-medium">{items.length}</span>
                  </div>
                </div>
                
                <hr className="my-4 border-slate-200" />
                <div className="flex justify-between text-base font-semibold">
                  <span className="text-slate-900">Total</span>
                  <span className="text-emerald-700">
                    {INR.format(total)}
                  </span>
                </div>
              </div>

              <button
                onClick={checkout}
                disabled={!items.length}
                className={`mt-6 w-full rounded-2xl px-4 py-3.5 font-medium shadow focus:outline-none focus:ring-4 transition-all ${
                  items.length
                    ? "bg-emerald-600 text-white hover:bg-emerald-500 focus:ring-emerald-300"
                    : "bg-emerald-300 text-white cursor-not-allowed"
                }`}
              >
                {items.length ? "Proceed to Checkout" : "Cart is Empty"}
              </button>
              
              <div className="mt-4 text-xs text-slate-500 space-y-1">
                <div className="flex items-center justify-center gap-2">
                  <span>Secure payment</span>
                  <span>•</span>
                  <span>Buyer protection</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span>UPI</span>
                  <span>•</span>
                  <span>Cards</span>
                  <span>•</span>
                  <span>Netbanking</span>
                </div>
              </div>

              {/* Continue shopping link for mobile */}
              <a 
                href="/home" 
                className="mt-4 md:hidden flex items-center justify-center gap-2 text-sm text-emerald-700 hover:text-emerald-600"
              >
                Continue Shopping
                <FiChevronRight className="h-4 w-4" />
              </a>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}