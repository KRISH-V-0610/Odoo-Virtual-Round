// Components/Banner.js
import React from 'react';
import { FiArrowRight } from 'react-icons/fi';

const Banner = () => (
  <section
    aria-label="Promo"
    className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md"
  >
    <div className="aspect-[16/10] md:aspect-[16/6] w-full bg-gradient-to-r from-emerald-200 via-emerald-100 to-sky-200 grid place-items-center">
      <div className="text-center px-4 md:px-8">
        <h2 className="text-2xl md:text-4xl font-semibold text-slate-900">Sustainable Shopping</h2>
        <p className="mt-2 text-slate-700 text-sm md:text-base max-w-md">
          Discover pre-loved treasures. Save money, reduce waste, and help our planet.
        </p>
        <a
          href="#categories"
          className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-5 py-2.5 text-white shadow hover:bg-emerald-500 transition-colors"
        >
          Explore Collections
          <FiArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  </section>
);

export default Banner;