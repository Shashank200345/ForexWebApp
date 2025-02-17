import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Mail, Package, LogOut, Search, Calendar, RefreshCw, Phone, Download } from 'lucide-react';

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

        const res = await fetch('http://localhost:5000/api/admin/dashboard', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        console.log('Dashboard data:', data); // Debug log

        if (data.success) {
          setContacts(data.contacts || []);
          setRegistrations(data.registrations || []);
        } else {
          console.error('Failed to fetch dashboard data:', data.message);
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

  return (
    <div className="min-h-screen bg-[#13161C]">
      {/* Header */}
      <header className="bg-[#1A1D23] border-b border-[#2A2F3C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 text-sm text-[#8A95A3] hover:text-white transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#1A1D23] border border-[#2A2F3C] rounded-lg p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <Users className="w-6 h-6 text-blue-500" />
              </div>
              <div className="ml-4">
                <p className="text-[#8A95A3] text-sm">Total Contacts</p>
                <p className="text-white text-2xl font-bold">{contacts.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-[#1A1D23] border border-[#2A2F3C] rounded-lg p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-500/10 rounded-lg">
                <Package className="w-6 h-6 text-green-500" />
              </div>
              <div className="ml-4">
                <p className="text-[#8A95A3] text-sm">Total Registrations</p>
                <p className="text-white text-2xl font-bold">{registrations.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-[#1A1D23] border border-[#2A2F3C] rounded-lg p-6">
            <div className="flex items-center">
              <div className="p-3 bg-[#DFFF88]/10 rounded-lg">
                <Calendar className="w-6 h-6 text-[#DFFF88]" />
              </div>
              <div className="ml-4">
                <p className="text-[#8A95A3] text-sm">Today's Date</p>
                <p className="text-white text-2xl font-bold">
                  {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Download Section */}
        <div className="bg-[#1A1D23] border border-[#2A2F3C] rounded-lg mb-8">
          <div className="p-4 border-b border-[#2A2F3C] flex justify-between items-center">
            <div className="relative flex-1 mr-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4A5260] w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#13161C] border border-[#2A2F3C] rounded-lg text-white placeholder-[#4A5260] focus:outline-none focus:ring-2 focus:ring-[#DFFF88] focus:border-transparent"
              />
            </div>

            <button
              onClick={activeTab === 'contacts' ? handleDownloadContacts : handleDownloadRegistrations}
              className="flex items-center px-4 py-2 bg-[#DFFF88]/10 text-[#DFFF88] rounded-lg hover:bg-[#DFFF88]/20 transition-colors"
            >
              <Download className="w-4 h-4 mr-2" />
              Download {activeTab === 'contacts' ? 'Contacts' : 'Registrations'}
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-[#2A2F3C]">
            <button
              className={`flex-1 px-4 py-3 text-sm font-medium ${
                activeTab === 'contacts'
                  ? 'text-[#DFFF88] border-b-2 border-[#DFFF88]'
                  : 'text-[#8A95A3] hover:text-white'
              }`}
              onClick={() => setActiveTab('contacts')}
            >
              <Mail className="w-4 h-4 inline-block mr-2" />
              Contacts
            </button>
            <button
              className={`flex-1 px-4 py-3 text-sm font-medium ${
                activeTab === 'registrations'
                  ? 'text-[#DFFF88] border-b-2 border-[#DFFF88]'
                  : 'text-[#8A95A3] hover:text-white'
              }`}
              onClick={() => setActiveTab('registrations')}
            >
              <Package className="w-4 h-4 inline-block mr-2" />
              Registrations
            </button>
          </div>

          {/* Content */}
          <div className="p-4">
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <RefreshCw className="w-6 h-6 text-[#DFFF88] animate-spin" />
              </div>
            ) : activeTab === 'contacts' ? (
              <div className="space-y-4">
                {filteredContacts.map((contact) => (
                  <div
                    key={contact._id}
                    className="bg-[#13161C] border border-[#2A2F3C] rounded-lg p-4 hover:border-[#DFFF88]/50 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-white font-medium">{contact.name}</h3>
                        <p className="text-[#8A95A3] text-sm">{contact.email}</p>
                        <p className="text-[#8A95A3] text-sm">{contact.phone}</p>
                        <p className="text-white mt-2">{contact.message}</p>
                      </div>
                      <span className="text-[#4A5260] text-sm">
                        {new Date(contact.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              filteredRegistrations.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-[#8A95A3]">No registrations found</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredRegistrations.map((registration) => (
                    <div
                      key={registration._id}
                      className="bg-[#13161C] border border-[#2A2F3C] rounded-lg p-4 hover:border-[#DFFF88]/50 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center space-x-3">
                            <h3 className="text-white font-medium">{registration.name}</h3>
                            <span className="px-2 py-1 text-xs rounded-full bg-[#2A2F3C] text-[#8A95A3]">
                              {registration.country}
                            </span>
                          </div>
                          <div className="mt-2 space-y-1">
                            <p className="text-[#8A95A3] text-sm flex items-center">
                              <Mail className="w-4 h-4 mr-2 text-[#4A5260]" />
                              {registration.email}
                            </p>
                            <p className="text-[#8A95A3] text-sm flex items-center">
                              <Phone className="w-4 h-4 mr-2 text-[#4A5260]" />
                              {registration.phone}
                            </p>
                          </div>
                          <div className="mt-3 flex items-center">
                            <div className="px-3 py-1.5 rounded-lg bg-[#DFFF88]/10 border border-[#DFFF88]/20">
                              <p className="text-[#DFFF88] text-sm font-medium">
                                {registration.packTitle}
                                <span className="ml-2 text-[#8A95A3]">
                                  {registration.packPrice}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-[#4A5260] text-sm">
                            {new Date(registration.createdAt).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard; 