import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Users, Phone, Mail, Globe, LogOut } from 'lucide-react';

interface Registration {
  _id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  packTitle: string;
  packPrice: string;
  createdAt: string;
}

interface Contact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  createdAt: string;
}

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'registrations' | 'contacts'>('registrations');
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    const fetchData = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        
        const [registrationsRes, contactsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/registrations', { headers }),
          axios.get('http://localhost:5000/api/contacts', { headers })
        ]);

        setRegistrations(registrationsRes.data.data);
        setContacts(contactsRes.data.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch data');
        if (err.response?.status === 401) {
          localStorage.removeItem('adminToken');
          navigate('/admin/login');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#13161C] text-white flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#13161C] text-white">
      {/* Header */}
      <header className="bg-[#1A1D23] border-b border-[#2A2F3C] px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center text-[#8A95A3] hover:text-white transition-colors"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 text-red-400 rounded-lg border border-red-500/20">
            {error}
          </div>
        )}

        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('registrations')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeTab === 'registrations'
                ? 'bg-[#DFFF88] text-black'
                : 'bg-[#1A1D23] text-[#8A95A3] hover:text-white'
            } transition-colors`}
          >
            <Users className="w-5 h-5 mr-2" />
            Registrations
          </button>
          <button
            onClick={() => setActiveTab('contacts')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeTab === 'contacts'
                ? 'bg-[#DFFF88] text-black'
                : 'bg-[#1A1D23] text-[#8A95A3] hover:text-white'
            } transition-colors`}
          >
            <Mail className="w-5 h-5 mr-2" />
            Contacts
          </button>
        </div>

        {/* Data Table */}
        <div className="bg-[#1A1D23] rounded-xl overflow-hidden">
          {activeTab === 'registrations' ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#13161C]">
                    <th className="px-6 py-4 text-left text-[#8A95A3]">Name</th>
                    <th className="px-6 py-4 text-left text-[#8A95A3]">Contact Info</th>
                    <th className="px-6 py-4 text-left text-[#8A95A3]">Signal Pack</th>
                    <th className="px-6 py-4 text-left text-[#8A95A3]">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2A2F3C]">
                  {registrations.map((reg) => (
                    <tr key={reg._id} className="hover:bg-[#13161C]/50">
                      <td className="px-6 py-4">
                        <div className="font-medium">{reg.name}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center text-[#8A95A3] mb-1">
                          <Mail className="w-4 h-4 mr-2" />
                          {reg.email}
                        </div>
                        <div className="flex items-center text-[#8A95A3] mb-1">
                          <Phone className="w-4 h-4 mr-2" />
                          {reg.phone}
                        </div>
                        <div className="flex items-center text-[#8A95A3]">
                          <Globe className="w-4 h-4 mr-2" />
                          {reg.country}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium">{reg.packTitle}</div>
                        <div className="text-[#DFFF88]">{reg.packPrice}</div>
                      </td>
                      <td className="px-6 py-4 text-[#8A95A3]">
                        {formatDate(reg.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#13161C]">
                    <th className="px-6 py-4 text-left text-[#8A95A3]">Name</th>
                    <th className="px-6 py-4 text-left text-[#8A95A3]">Contact Info</th>
                    <th className="px-6 py-4 text-left text-[#8A95A3]">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2A2F3C]">
                  {contacts.map((contact) => (
                    <tr key={contact._id} className="hover:bg-[#13161C]/50">
                      <td className="px-6 py-4">
                        <div className="font-medium">{contact.name}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center text-[#8A95A3] mb-1">
                          <Mail className="w-4 h-4 mr-2" />
                          {contact.email}
                        </div>
                        <div className="flex items-center text-[#8A95A3] mb-1">
                          <Phone className="w-4 h-4 mr-2" />
                          {contact.phone}
                        </div>
                        <div className="flex items-center text-[#8A95A3]">
                          <Globe className="w-4 h-4 mr-2" />
                          {contact.country}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[#8A95A3]">
                        {formatDate(contact.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard; 