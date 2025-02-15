import React, { useState } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  packTitle: string;
  packPrice: string;
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  packTitle,
  packPrice
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/registrations', {
        ...formData,
        packTitle,
        packPrice
      });

      if (response.data.success) {
        setSuccess(true);
        setTimeout(() => {
          onClose();
          setSuccess(false);
          setFormData({
            name: '',
            email: '',
            phone: '',
            country: ''
          });
        }, 2000);
      }
    } catch (err) {
      setError('Failed to submit registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1A1D23] rounded-2xl p-8 max-w-md w-full text-white">
        <div className="flex justify-between items-center mb-6">
          <div>
            <div className="inline-flex px-3 py-1 rounded-full bg-[#DFFF88]/10 text-[#DFFF88] text-sm mb-2">
              Registration Form
            </div>
            <h2 className="text-2xl font-bold">{packTitle}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-[#8A95A3] hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-2xl font-bold text-[#DFFF88]">{packPrice}</p>
          <p className="text-[#8A95A3]">Quarterly subscription</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 text-red-400 rounded-lg border border-red-500/20">
            {error}
          </div>
        )}

        {success ? (
          <div className="mb-4 p-3 bg-[#DFFF88]/10 text-[#DFFF88] rounded-lg border border-[#DFFF88]/20">
            Registration successful! We'll contact you soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#8A95A3] mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-[#13161C] border border-[#2A2F3C] rounded-lg px-4 py-3 text-white 
                  placeholder-[#4A5260] focus:outline-none focus:border-[#DFFF88] transition-colors"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#8A95A3] mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-[#13161C] border border-[#2A2F3C] rounded-lg px-4 py-3 text-white 
                  placeholder-[#4A5260] focus:outline-none focus:border-[#DFFF88] transition-colors"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-[#8A95A3] mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-[#13161C] border border-[#2A2F3C] rounded-lg px-4 py-3 text-white 
                  placeholder-[#4A5260] focus:outline-none focus:border-[#DFFF88] transition-colors"
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <label htmlFor="country" className="block text-sm font-medium text-[#8A95A3] mb-1">
                Country
              </label>
              <input
                type="text"
                id="country"
                name="country"
                required
                value={formData.country}
                onChange={handleChange}
                className="w-full bg-[#13161C] border border-[#2A2F3C] rounded-lg px-4 py-3 text-white 
                  placeholder-[#4A5260] focus:outline-none focus:border-[#DFFF88] transition-colors"
                placeholder="Enter your country"
              />
            </div>

            <div className="flex justify-end space-x-3 mt-8">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 rounded-lg border border-[#2A2F3C] text-[#8A95A3] hover:text-white 
                  hover:border-[#4A5260] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 rounded-lg bg-[#DFFF88] text-black font-semibold hover:bg-[#DFFF88]/90 
                  transition-colors disabled:opacity-50 disabled:hover:bg-[#DFFF88]"
              >
                {isSubmitting ? 'Submitting...' : 'Register Now'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default RegistrationModal; 