import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User } from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const response = await axios.post(`${API_URL}/api/admin/login`, {
        username: username.trim(),
        password: password.trim()
      });

      const { data } = response;
      console.log('Login response:', data);

      if (data.success && data.token) {
        localStorage.setItem('adminToken', data.token);
        navigate('/admin/dashboard');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error: any) {
      console.error('Login error:', error.response?.data || error);
      setError(error.response?.data?.message || 'Failed to connect to server');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#13161C] flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-white">
            Admin Dashboard
          </h2>
          <p className="mt-2 text-sm text-[#8A95A3]">
            Enter your credentials to access the admin panel
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6 bg-[#1A1D23] p-8 rounded-xl border border-[#2A2F3C]" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-[#8A95A3] mb-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-[#4A5260]" />
                </div>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="appearance-none relative block w-full px-3 py-3 pl-10
                    bg-[#13161C] border border-[#2A2F3C] placeholder-[#4A5260]
                    text-white rounded-lg focus:outline-none focus:ring-2
                    focus:ring-[#DFFF88] focus:border-transparent"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#8A95A3] mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-[#4A5260]" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="appearance-none relative block w-full px-3 py-3 pl-10
                    bg-[#13161C] border border-[#2A2F3C] placeholder-[#4A5260]
                    text-white rounded-lg focus:outline-none focus:ring-2
                    focus:ring-[#DFFF88] focus:border-transparent"
                  placeholder="Enter your password"
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4
                text-sm font-semibold rounded-lg text-black bg-[#DFFF88]
                hover:bg-[#DFFF88]/90 focus:outline-none focus:ring-2
                focus:ring-offset-2 focus:ring-[#DFFF88] transition-colors
                duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </div>
              ) : (
                'Sign in to Dashboard'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin; 