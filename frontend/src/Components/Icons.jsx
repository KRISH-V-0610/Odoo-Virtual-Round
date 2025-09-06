// components/Icons.jsx
import React from 'react';

export const CartIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M3 4h2l2.4 12.2A2 2 0 0 0 9.36 18h7.78a2 2 0 0 0 1.97-1.64L21 8H6"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="10" cy="20" r="1.5" fill="currentColor" />
    <circle cx="18" cy="20" r="1.5" fill="currentColor" />
  </svg>
);

export const UserIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
    <path d="M4 20a8 8 0 0 1 16 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const CameraIcon = (props) => (
  <svg viewBox="极 0 24 24" fill="none" {...props}>
    <path d="M4 8h3l2-2h6l2 2h3v10H4V8Z" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="13" r="3.5" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export const ClipboardIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <rect x="6" y="4" width="12" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M9 4h6v3H9V4Z" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export const BagIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M6 8h12l-1 12H7L6 8Z" stroke="currentColor" strokeWidth="2" />
    <path d="M9 8V7a3 3 0 1 1 6 0v1" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export const ArrowIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const LeafIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M12 18c4.5 0 8-2.5 8-7s-4-7-8-7-8 2.5-8 7 3.5 7 8 7z" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 18V6" stroke="currentColor" strokeWidth="2"/>
    <path d="M7 10.5c1.5 1 3.5 1 5.5 0M7 13.5c1.5 1 3.5 1 5.5 0M7 16.5c1.5 1 3.5 1 5.5 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const HamburgerIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const SearchIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
    <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const CloseIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const RecycleIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M16.5 16.5l2 2 2-2M4 12h14m-4 4l2 2 3.5-3.5-2-2M15.5 8.5L13 6l-2.5 2.5M4 12l2-2-2-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 12l-2 2 2 极" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854极-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

export const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-极.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

export const TwitterIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 极 01-6.极 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
  </svg>
);

export const HeartIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

export const SettingsIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 极 0 1-1 1.73l-.17.09a2 2 0 0 1-2-2.73l.62-1.08a2 2 0 0 0-.59-2.81l-.15-.08a10 10 0 0 0-10 17.25l.15.08a2 2 0 0 0 2.81-.59l1.08-.62a2 2 0 0 1 2.73 2l-.09.17a2 2 0 0 1-1.73 1h-.18a2 2 0 0 0-2 2v.44a2 2 0 0 0 2 2极.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.17-.09a2 2 0 0 1 2 2.73l-.62 1.08a2 2 0 0 0 .59 2.81l.15.08a10 10 0 0 0 10-17.25l-.15-.08a2 2 0 0 0-2.81.59l-1.08.62a2 2 0 0 1-2.73-2l.09-.17a2 2 0 0 1 1.73-1h.18a2 2 0 0 0 2-2v-.44a2 2 0 0 0-2-2Z" stroke="currentColor" strokeWidth="2"/>
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

export const LogoutIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.5 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const BackIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default {
  CartIcon,
  UserIcon,
  CameraIcon,
  ClipboardIcon,
  BagIcon,
  ArrowIcon,
  LeafIcon,
  HamburgerIcon,
  SearchIcon,
  CloseIcon,
  RecycleIcon,
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  HeartIcon,
  SettingsIcon,
  LogoutIcon,
  BackIcon
};