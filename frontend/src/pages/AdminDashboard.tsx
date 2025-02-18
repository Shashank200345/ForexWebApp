import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Mail, Package, LogOut, Search, Calendar, RefreshCw, Phone, Download } from 'lucide-react';

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  createdAt: string;
}

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
  const [users, setUsers] = useState<User[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [activeTab, setActiveTab] = useState('contacts');
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log('Fetching users...'); // Debug log
        const token = localStorage.getItem('adminToken');
        
        if (!token) {
          navigate('/admin');
          return;
        }

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/users`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        console.log('Response status:', response.status); // Debug log

        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        console.log('Users data:', data); // Debug log
        
        setUsers(data.data);
      } catch (error) {
        console.error('Error:', error);
        setError(error instanceof Error ? error.message : 'Failed to fetch users');
      }
    };

    fetchUsers();
  }, [navigate]);

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

  if (isLoading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center text-red-500 p-4">{error}</div>;

  return (
    <div className="min-h-screen bg-[#13161C] text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-[#1A1D23] rounded-lg">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Phone</th>
              <th className="px-6 py-3 text-left">Country</th>
              <th className="px-6 py-3 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b border-gray-700 hover:bg-[#2A2D33]">
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.phone}</td>
                <td className="px-6 py-4">{user.country}</td>
                <td className="px-6 py-4">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard; 