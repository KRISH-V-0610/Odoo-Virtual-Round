// Components/SustainabilitySection.js
import React from 'react';
import { FiRepeat, FiUsers, FiAward } from 'react-icons/fi';

const SustainabilitySection = () => (
  <section className="mt-10 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
    <div className="text-center max-w-2xl mx-auto">
      <FiRepeat className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-slate-800 mb-2">Shop Sustainably</h3>
      <p className="text-slate-600 mb-4">
        Every purchase on EcoFinds helps reduce waste and supports a circular economy. 
        Join our community of conscious shoppers making a difference.
      </p>
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-emerald-700">10K+</div>
          <div className="text-sm text-slate-600">Items Saved</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-emerald-700">5K+</div>
          <div className="text-sm text-slate-600">Happy Customers</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-emerald-700">2.5T</div>
          <div className="text-sm text-slate-600">CO₂ Reduced</div>
        </div>
      </div>
    </div>
  </section>
);

export default SustainabilitySection;