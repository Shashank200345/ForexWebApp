import React, { useState } from 'react';
import CountrySelector from './CountrySelector';

const RequestCallForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-white mb-2">
        Request a call from our Expert
      </h2>
      <p className="text-[#8A95A3] mb-8">
        Get personalized trading guidance from our experts
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-[#8A95A3] mb-2">
            Your name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter your name"
            className="w-full px-4 py-3 rounded-lg bg-[#1A1D23] border border-[#8A95A3]/30 
              text-white placeholder-[#8A95A3]
              focus:outline-none focus:border-[#DFFF88] transition-colors"
          />
        </div>

        <div>
          <label className="block text-[#8A95A3] mb-2">
            Your email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Enter your email"
            className="w-full px-4 py-3 rounded-lg bg-[#1A1D23] border border-[#8A95A3]/30 
              text-white placeholder-[#8A95A3]
              focus:outline-none focus:border-[#DFFF88] transition-colors"
          />
        </div>

        <div>
          <label className="block text-[#8A95A3] mb-2">
            Phone number
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="Enter your phone number"
            className="w-full px-4 py-3 rounded-lg bg-[#1A1D23] border border-[#8A95A3]/30 
              text-white placeholder-[#8A95A3]
              focus:outline-none focus:border-[#DFFF88] transition-colors"
          />
        </div>

        <div>
          <label className="block text-[#8A95A3] mb-2">
            Country
          </label>
          <CountrySelector
            value={formData.country}
            onChange={(value) => setFormData({ ...formData, country: value })}
          />
        </div>

        <button
          type="submit"
          className="w-full py-4 rounded-lg bg-gradient-to-r from-[#DFFF88] to-[#DFFF88]/80
            text-black font-semibold hover:from-[#DFFF88]/90 hover:to-[#DFFF88]/70
            transition-all duration-300 transform hover:scale-[1.02]
            focus:ring-2 focus:ring-[#DFFF88]/50 focus:ring-offset-2 focus:ring-offset-[#13161C]"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default RequestCallForm; 