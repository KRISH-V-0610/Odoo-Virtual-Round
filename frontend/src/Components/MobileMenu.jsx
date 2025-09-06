// components/MobileMenu.js
import React from 'react';
import { CloseIcon } from './Icons';
import { Link, useNavigate } from 'react-router-dom';

const MobileMenu = ({ isOpen, onClose, user }) => (
    <div className={`fixed inset-0 z-50 bg-black/20 backdrop-blur-sm transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div
            className={`absolute top-0 left-0 h-full w-80 bg-white shadow-xl transform transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
            <div className="p-5 border-b border-slate-200">
                <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-emerald-700">Menu</span>
                    <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100">
                        <CloseIcon className="h-6 w-6 text-slate-600" />
                    </button>
                </div>
            </div>

            <div className="p-5 border-b border-slate-200">
                {user ? (
                    <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-emerald-400 to-sky-400 flex items-center justify-center text-white font-semibold">
                            {user.name.charAt(0)}
                        </div>
                        <Link
                            to="/profile"
                            className="block rounded-lg px-2 py-1 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                            onClick={() => setUserMenuOpen?.(false)}
                        >
                            <p className="font-medium text-slate-900">{user.name}</p>
                            <p className="text-sm text-slate-500">{user.email}</p>
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-3">
                        <button className="w-full py-2.5 rounded-xl bg-emerald-600 text-white font-medium">
                            Sign In
                        </button>
                        <button className="w-full py-2.5 rounded-xl border border-slate-300 text-slate-700 font-medium">
                            Create Account
                        </button>
                    </div>
                )}
            </div>

            <nav className="p-5">
                <ul className="space-y-2">
                    {['Home', 'My Orders', 'Wishlist', 'Sell Items', 'Notifications', 'Settings', 'Help Center'].map(item => (
                        <li key={item}>
                            <button className="w-full text-left py-2.5 px-3 rounded-lg hover:bg-slate-100 text-slate-700 font-medium">
                                {item}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    </div>
);

export default MobileMenu;