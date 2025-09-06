// components/Footer.js
import React from 'react';
import { LeafIcon, FacebookIcon, InstagramIcon, TwitterIcon } from './Icons';

const Footer = () => (
  <footer className="mt-10 border-t border-slate-200 bg-white/80 py-8 text-center">
    <div className="max-w-6xl mx-auto px-4">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <div className="mb-4 md:mb-0">
          <div className="flex items-center justify-center md:justify-start gap-2 text-lg font-semibold text-emerald-700">
            <LeafIcon className="h-5 w-5 text-emerald-600" />
            EcoFinds
          </div>
          <p className="mt-1 text-slate-600 text-sm">Buy less, choose well ♻️</p>
        </div>
        
        <div className="flex justify-center gap-6 mb-4 md:mb-0">
          {['About', 'Contact', 'Blog', 'Careers'].map(item => (
            <a key={item} href="#" className="text-slate-600 hover:text-emerald-700 text-sm">
              {item}
            </a>
          ))}
        </div>
        
        <div className="flex justify-center gap-3">
          <button className="h-10 w-10 rounded-full border border-slate-200 grid place-items-center text-slate-600 hover:bg-slate-50">
            <FacebookIcon className="h-5 w-5" />
          </button>
          <button className="h-10 w-10 rounded-full border border-slate-200 grid place-items-center text-slate-600 hover:bg-slate-50">
            <InstagramIcon className="h-5 w-5" />
          </button>
          <button className="h-10 w-10 rounded-full border border-slate-200 grid place-items-center text-slate-600 hover:bg-slate-50">
            <TwitterIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <div className="mt-6 pt-6 border-t border-slate-100 text-xs text-slate-500">
        © {new Date().getFullYear()} EcoFinds · All rights reserved
      </div>
    </div>
  </footer>
);

export default Footer;