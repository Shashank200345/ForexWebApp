import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Mail, Package, LogOut, Search, Calendar, RefreshCw, Download } from 'lucide-react';

interface Contact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
}

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

const AdminDashboard = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [activeTab, setActiveTab] = useState('contacts');
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('adminToken');
        if (!token) {
          navigate('/admin');
          return;
        }

        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/dashboard`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (data.success) {
          setContacts(data.contacts || []);
          setRegistrations(data.registrations || []);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredRegistrations = registrations.filter(reg =>
    reg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const downloadCSV = (data: any[], filename: string) => {
    // Convert data to CSV format
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(item => Object.values(item).join(','));
    const csv = [headers, ...rows].join('\n');

    // Create blob and download
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}_${new Date().toLocaleDateString()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const handleDownloadContacts = () => {
    const formattedContacts = contacts.map(contact => ({
      Name: contact.name,
      Email: contact.email,
      Phone: contact.phone,
      Message: contact.message,
      'Submitted On': new Date(contact.createdAt).toLocaleString()
    }));
    downloadCSV(formattedContacts, 'contacts');
  };

  const handleDownloadRegistrations = () => {
    const formattedRegistrations = registrations.map(reg => ({
      Name: reg.name,
      Email: reg.email,
      Phone: reg.phone,
      Country: reg.country,
      'Package Title': reg.packTitle,
      'Package Price': reg.packPrice,
      'Registered On': new Date(reg.createdAt).toLocaleString()
    }));
    downloadCSV(formattedRegistrations, 'registrations');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#13161C] text-white flex items-center justify-center">
        <RefreshCw className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#13161C] text-white">
      {/* Header */}
      <header className="bg-[#1A1D23] border-b border-gray-800 px-6 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 text-gray-400 hover:text-[#DFFF88] transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#1A1D23] p-6 rounded-lg border border-[#DFFF88]/20 hover:border-[#DFFF88]/40 transition-colors">
            <div className="flex items-center space-x-3">
              <Users className="w-6 h-6 text-[#DFFF88]" />
              <h2 className="text-lg font-semibold">Total Contacts</h2>
            </div>
            <p className="text-3xl font-bold mt-4">{contacts.length}</p>
          </div>
          <div className="bg-[#1A1D23] p-6 rounded-lg border border-[#DFFF88]/20 hover:border-[#DFFF88]/40 transition-colors">
            <div className="flex items-center space-x-3">
              <Package className="w-6 h-6 text-[#DFFF88]" />
              <h2 className="text-lg font-semibold">Total Registrations</h2>
            </div>
            <p className="text-3xl font-bold mt-4">{registrations.length}</p>
          </div>
          <div className="bg-[#1A1D23] p-6 rounded-lg border border-[#DFFF88]/20 hover:border-[#DFFF88]/40 transition-colors">
            <div className="flex items-center space-x-3">
              <Calendar className="w-6 h-6 text-[#DFFF88]" />
              <h2 className="text-lg font-semibold">Today's Date</h2>
            </div>
            <p className="text-xl font-bold mt-4">{new Date().toLocaleDateString()}</p>
          </div>
        </div>

        {/* Tabs and Search */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab('contacts')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'contacts'
                  ? 'bg-[#DFFF88] text-black'
                  : 'bg-[#1A1D23] text-gray-400 hover:text-[#DFFF88]'
              }`}
            >
              <Mail className="w-5 h-5" />
              <span>Contacts</span>
            </button>
            <button
              onClick={() => setActiveTab('registrations')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'registrations'
                  ? 'bg-[#DFFF88] text-black'
                  : 'bg-[#1A1D23] text-gray-400 hover:text-[#DFFF88]'
              }`}
            >
              <Package className="w-5 h-5" />
              <span>Registrations</span>
            </button>
            {/* Download Button */}
            <button
              onClick={activeTab === 'contacts' ? handleDownloadContacts : handleDownloadRegistrations}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-[#1A1D23] text-gray-400 hover:text-[#DFFF88] hover:border-[#DFFF88]/40 transition-colors border border-gray-800"
              title={`Download ${activeTab} as CSV`}
            >
              <Download className="w-5 h-5" />
              <span>Download</span>
            </button>
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#1A1D23] border border-gray-800 rounded-lg focus:outline-none focus:border-[#DFFF88] focus:ring-1 focus:ring-[#DFFF88]/50"
            />
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-[#1A1D23] rounded-lg border border-[#DFFF88]/20 overflow-x-auto">
          {activeTab === 'contacts' ? (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="px-6 py-3 text-left text-[#DFFF88]">Name</th>
                  <th className="px-6 py-3 text-left text-[#DFFF88]">Email</th>
                  <th className="px-6 py-3 text-left text-[#DFFF88]">Phone</th>
                  <th className="px-6 py-3 text-left text-[#DFFF88]">Message</th>
                  <th className="px-6 py-3 text-left text-[#DFFF88]">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredContacts.map((contact) => (
                  <tr key={contact._id} className="border-b border-gray-800 hover:bg-[#DFFF88]/5">
                    <td className="px-6 py-4">{contact.name}</td>
                    <td className="px-6 py-4">{contact.email}</td>
                    <td className="px-6 py-4">{contact.phone}</td>
                    <td className="px-6 py-4">{contact.message}</td>
                    <td className="px-6 py-4">
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="px-6 py-3 text-left text-[#DFFF88]">Name</th>
                  <th className="px-6 py-3 text-left text-[#DFFF88]">Email</th>
                  <th className="px-6 py-3 text-left text-[#DFFF88]">Phone</th>
                  <th className="px-6 py-3 text-left text-[#DFFF88]">Country</th>
                  <th className="px-6 py-3 text-left text-[#DFFF88]">Package</th>
                  <th className="px-6 py-3 text-left text-[#DFFF88]">Price</th>
                  <th className="px-6 py-3 text-left text-[#DFFF88]">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredRegistrations.map((reg) => (
                  <tr key={reg._id} className="border-b border-gray-800 hover:bg-[#DFFF88]/5">
                    <td className="px-6 py-4">{reg.name}</td>
                    <td className="px-6 py-4">{reg.email}</td>
                    <td className="px-6 py-4">{reg.phone}</td>
                    <td className="px-6 py-4">{reg.country}</td>
                    <td className="px-6 py-4">{reg.packTitle}</td>
                    <td className="px-6 py-4">{reg.packPrice}</td>
                    <td className="px-6 py-4">
                      {new Date(reg.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 