import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppContent from './components/AppContent';
import SignalPackDetails from './pages/SignalPackDetails';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

const courses = [
  {
    id: 1,
    title: "Forex Signals Pack",
    price: "$650",
    popular: false,
    features: [
      "The foreign exchange (forex) market serves as a platform for trading currencies",
      "Facilitating asset allocation strategies",
      "Evaluating the appropriateness of various securities",
      "Based on individual financial objectives",
      "Real-time market analysis and signals"
    ]
  },
  {
    id: 2,
    title: "Comex Signals Pack",
    price: "$1100",
    popular: true,
    features: [
      "COMEX serves as the primary market for trading base metals",
      "Trading copper, zinc, lead, aluminum",
      "Access to precious metals including gold(XAUUSD)",
      "Silver(XAGUSD) and PLATINUM trading",
      "Expert metal market analysis"
    ]
  },
  {
    id: 3,
    title: "Combo Signals Pack",
    price: "$1900",
    popular: false,
    features: [
      "This comprehensive package addresses both markets",
      "Currency market and base metal market access",
      "Providing a holistic approach to trading",
      "Investment strategies across sectors",
      "Combined market analysis and signals"
    ]
  }
];

function App() {
  return (
    <Routes>
      <Route 
        path="/" 
        element={<AppContent courses={courses} />}
      />
      <Route
        path="/signal-pack/:id"
        element={<SignalPackDetails courses={courses} />}
      />
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;