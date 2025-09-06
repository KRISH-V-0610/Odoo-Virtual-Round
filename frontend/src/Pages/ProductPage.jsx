import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiShoppingCart, FiUser, FiChevronLeft, FiChevronRight } from "react-icons/fi";

// Import Components
import IconButton from "../Components/IconButton";
import MobileMenu from "../Components/MobileMenu";
import UserMenu from "../Components/UserMenu";
import { PiLeafBold } from "react-icons/pi";
import { CartIcon } from "../Components/Icons";

export default function ProductPage() {
    // ----- dummy product -----
    const product = {
        title: "Vintage Denim Jacket",
        price: 1299,
        category: "Fashion",
        seller: "Ananya",
        condition: "Used - Very Good",
        description:
            "Classic denim jacket with a relaxed fit. Lightly worn, no tears or stains. Size M. Perfect for layering in all seasons.",
        images: [
            "https://images.unsplash.com/photo-1520975922313-827d622b9f8d?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop",
        ],
    };

    // ----- state -----
    const [index, setIndex] = useState(0);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const trackRef = useRef(null);
    const touchStartX = useRef(0);
    const touchDeltaX = useRef(0);

    // Demo user data
    const [user] = useState({
        name: "Alex Johnson",
        email: "alex@example.com",
        cartItems: 1,
        avatarUrl: ""
    });
    const navigate = useNavigate(); 

    // ----- slider functions -----
    const prev = () => setIndex((i) => (i - 1 + product.images.length) % product.images.length);
    const next = () => setIndex((i) => (i + 1) % product.images.length);
    const goTo = (i) => setIndex(i);

    // keyboard arrows
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "ArrowLeft") prev();
            if (e.key === "ArrowRight") next();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    // swipe handlers (mobile)
    const onTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
        touchDeltaX.current = 0;
    };
    const onTouchMove = (e) => {
        touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
    };
    const onTouchEnd = () => {
        if (touchDeltaX.current > 50) prev();
        else if (touchDeltaX.current < -50) next();
        touchStartX.current = 0;
        touchDeltaX.current = 0;
    };

    const addToCart = () => {
        // TODO: integrate with your cart store/API
        alert(`Added "${product.title}" to cart!`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white极to-sky-50">
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
                                    <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
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

                    <div className="pb-3">
                        <div className="mx-auto w-full max-w-xs rounded-2xl border border-slate-200 bg-white px-4 py-2 text-center text-sm text-slate-700 shadow-sm">
                            Product Page
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

            {/* User Menu */}
            <UserMenu
                user={user}
                isOpen={userMenuOpen}
                onClose={() => setUserMenuOpen(false)}
            />

            {/* Main */}
            <main className="mx-auto max-w-5xl px-4 py-6 md:py-8">
                {/* Image slider */}
                <section
                    className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow"
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                >
                    <div
                        ref={trackRef}
                        className="flex transition-transform duration-300 ease-out"
                        style={{ transform: `translateX(-${index * 100}%)` }}
                    >
                        {product.images.map((src, i) => (
                            <div key={i} className="min-w-full">
                                <div className="aspect-[4/5] w-full bg-slate-100">
                                    <img
                                        src={src}
                                        alt={`${product.title} ${i + 1}`}
                                        className="h-full w-full object-cover"
                                        draggable="false"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* prev/next buttons (hidden on small if you like) */}
                    <button
                        onClick={prev}
                        className="absolute left-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/90 p-2 shadow md:grid"
                        aria-label="Previous image"
                    >
                        <FiChevronLeft className="h-5 w-5 text-slate-800" />
                    </button>
                    <button
                        onClick={next}
                        className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/90 p-2 shadow md:grid"
                        aria-label="Next image"
                    >
                        <FiChevronRight className="h-5 w-5 text-slate-800" />
                    </button>

                    {/* dots */}
                    <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-2">
                        {product.images.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => goTo(i)}
                                className={`h-2.5 w-2.5 rounded-full transition ${i === index ? "bg-emerald-600" : "bg-white/80"
                                    } border border-emerald-400/40 shadow`}
                                aria-label={`Go to image ${i + 1}`}
                            />
                        ))}
                    </div>
                </section>

                {/* Details */}
                <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Description */}
                    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow lg:col-span-2">
                        <h1 className="text-xl font-semibold text-slate-900">{product.title}</h1>
                        <p className="mt-1 text-emerald-700 text-lg font-semibold">₹{product.price}</p>

                        <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-700 md:grid-cols-4">
                            <InfoPill label="Category" value={product.category} />
                            <InfoPill label="Seller" value={product.seller} />
                            <InfoPill label="Condition" value={product.condition} />
                            <InfoPill label="Return" value="No returns" />
                        </div>

                        <div className="mt-5 space-y-2 text-slate-700 leading-relaxed">
                            <h2 className="text-sm font-semibold text-slate-900">Product Description</h2>
                            <p>{product.description}</p>
                            <ul className="list-disc pl-5 text-sm">
                                <li>No defects or tears</li>
                                <li>Machine washable</li>
                                <li>Ships in eco-friendly packaging</li>
                            </ul>
                        </div>
                    </div>

                    {/* Add to cart box */}
                    <div className="h-fit rounded-3xl border border-slate-200 bg-white p-5 shadow">
                        <p className="text-sm text-slate-600">Ready to make it yours?</p>
                        <p className="mt-2 text-2xl font-semibold text-slate-900">₹{product.price}</p>
                        <button
                            onClick={addToCart}
                            className="mt-4 w-full rounded-2xl bg-emerald-600 px-4 py-3 text-white shadow hover:bg-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-300 transition-colors"
                        >
                            Add to cart
                        </button>
                        <p className="mt-3 text-xs text-slate-500">
                            Safe payments • Buyer protection • Carbon-aware shipping
                        </p>
                    </div>
                </section>
            </main>
        </div>
    );
}

function InfoPill({ label, value }) {
    return (
        <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
            <span className="block text-[11px] font-medium uppercase tracking-wide text-slate-500">
                {label}
            </span>
            <span className="text-slate-800">{value}</span>
        </div>
    );
}