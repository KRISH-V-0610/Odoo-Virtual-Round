// components/Header.js
import React from 'react';
import IconButton from './IconButton';
import SearchBar from './SearchBar';
import Pill from './Pill';
import { HamburgerIcon, CartIcon, LeafIcon } from './Icons';
import { useNavigate } from "react-router-dom";

const Header = ({
    searchQuery,
    onSearchChange,
    activeCategory,
    onCategoryChange,
    onMenuOpen,
    onUserMenuToggle,
    user
}) => {
    const categories = [
        { name: "Mobiles", emoji: "📱" },
        { name: "Laptops", emoji: "💻" },
        { name: "Fashion", emoji: "👗" },
        { name: "Home", emoji: "🛋️" },
    ];
  const navigate = useNavigate();

    return (
        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/85 backdrop-blur-md">
            <div className="mx-auto max-w-6xl px-4">
                <div className="flex items-center gap-3 py-3">
                    {/* Left: hamburger (mobile), logo (desktop) */}
                    <div className="flex items-center gap-3">
                        <IconButton
                            aria-label="Menu"
                            className="md:hidden"
                            onClick={onMenuOpen}
                        >
                            <HamburgerIcon className="h-5 w-5 text-slate-700" />
                        </IconButton>
                        <a href="#" className="hidden md:flex items-center gap-2 select-none text-lg font-semibold text-emerald-700">
                            <LeafIcon className="h-6 w-6 text-emerald-600" />
                            EcoFinds
                        </a>
                    </div>

                    {/* Center: logo (mobile) */}
                    <a href="#" className="mx-auto md:mx-0 md:ml-2 flex items-center gap-2 select-none text-lg font-semibold text-emerald-700 md:hidden">
                        <LeafIcon className="h-5 w-5 text-emerald-600" />
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
                            
                        >
                            <span className="block h-7 w-7 rounded-full bg-gradient-to-br from-emerald-400 to-sky-400" />
                        </IconButton>
                    </div>
                </div>

                {/* Search + actions */}
                <div className="pb-3">
                    <SearchBar value={searchQuery} onChange={onSearchChange} />
                    <div className="mt-3 flex gap-2 overflow-x-auto pb-1 md:justify-start hide-scrollbar">


                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;