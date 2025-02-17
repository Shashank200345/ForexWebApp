import React, { useState } from 'react';
import { X } from 'lucide-react';

interface Props {
  onClose: () => void;
  packTitle: string;
  packPrice: string;
}

const RegistrationForm: React.FC<Props> = ({ onClose, packTitle, packPrice }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/registrations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          packTitle,
          packPrice
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        setFormData({ name: '', email: '', phone: '', country: '' });
        setTimeout(onClose, 2000);
      } else {
        setError(data.message || 'Failed to submit registration');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('Failed to submit registration. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-[#1A1D23] rounded-lg max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>

        <div className="p-6">
          <h2 className="text-[#DFFF88] text-xl font-semibold mb-2">
            Registration Form
          </h2>
          <h3 className="text-white text-2xl font-bold mb-1">{packTitle}</h3>
          <p className="text-[#8A95A3] mb-6">{packPrice}</p>
          <p className="text-sm text-[#8A95A3] mb-4">Quarterly subscription</p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-2 rounded mb-4">
              {error}
            </div>
          )}

          {success ? (
            <div className="bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-2 rounded">
              Registration submitted successfully!
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  required
                  className="w-full px-4 py-2 bg-[#13161C] border border-[#2A2F3C] rounded-lg text-white placeholder-[#4A5260] focus:outline-none focus:ring-2 focus:ring-[#DFFF88] focus:border-transparent"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                  className="w-full px-4 py-2 bg-[#13161C] border border-[#2A2F3C] rounded-lg text-white placeholder-[#4A5260] focus:outline-none focus:ring-2 focus:ring-[#DFFF88] focus:border-transparent"
                />
              </div>
              <div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  required
                  className="w-full px-4 py-2 bg-[#13161C] border border-[#2A2F3C] rounded-lg text-white placeholder-[#4A5260] focus:outline-none focus:ring-2 focus:ring-[#DFFF88] focus:border-transparent"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Country"
                  required
                  className="w-full px-4 py-2 bg-[#13161C] border border-[#2A2F3C] rounded-lg text-white placeholder-[#4A5260] focus:outline-none focus:ring-2 focus:ring-[#DFFF88] focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 bg-[#DFFF88] text-black rounded-lg font-medium hover:bg-[#DFFF88]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Registering...' : 'Register Now'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full py-2 border border-[#2A2F3C] text-[#8A95A3] rounded-lg font-medium hover:text-white transition-colors mt-2"
              >
                Cancel
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm; 