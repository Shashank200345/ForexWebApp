import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import LiveMarket from './LiveMarket';
import { 
  LineChart,
  Boxes,
  BookOpen,
  Building2,
  Bitcoin,
  ArrowRight,
  ChevronDown,
  Menu,
  X,
  Star,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Check
} from 'lucide-react';
import CountrySelector from './CountrySelector';

interface Course {
  id: number;
  title: string;
  price: string;
  popular: boolean;
  features: string[];
}

interface AppContentProps {
  courses: Course[];
}

const AppContent: React.FC<AppContentProps> = ({ 
  courses
}) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    acceptedTerms: false
  });
  const [formStatus, setFormStatus] = useState({
    loading: false,
    success: false,
    error: ''
  });

  const handleStartTrading = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLearnMore = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus({ loading: true, success: false, error: '' });

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setFormStatus({
        loading: false,
        success: true,
        error: ''
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        country: '',
        acceptedTerms: false
      });

      // Show success message
      alert('Thank you for your submission! We will contact you soon.');

    } catch (error) {
      setFormStatus({
        loading: false,
        success: false,
        error: error instanceof Error ? error.message : 'Something went wrong'
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Attempting to fetch data...');
        console.log('API URL:', import.meta.env.VITE_API_URL);
        
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/test`);
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Data received:', data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#13161C] text-white">
      {/* Navigation */}
      <nav className="fixed w-full z-[60] blur-overlay bg-[#13161C]/95 backdrop-blur-sm">
        <div className="container mx-auto px-6 max-w-7xl py-2 md:py-4">
          <div className="flex justify-between items-center md:justify-center relative">
            <div className="flex items-center space-x-2 md:absolute md:left-0 py-2">
              <img 
                src="/FB-removebg.png" 
                alt="Forex BHIDU" 
                className="h-24 md:h-32 w-[220px] md:w-[380px] object-contain"
              />
            </div>
            
            <div className="hidden md:flex items-center space-x-8 mt-8">
              <a 
                href="#home" 
                className="relative group hover:text-[#DFFF88] transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById('home');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-[#DFFF88]/40 via-[#DFFF88] to-[#DFFF88]/40 
                  group-hover:w-full transition-all duration-300 ease-out
                  shadow-[0_0_10px_rgba(223,255,136,0.5)] opacity-0 group-hover:opacity-100" 
                />
              </a>
              <a 
                href="#market"
                className="relative group hover:text-[#DFFF88] transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById('market');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                Live Market
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-[#DFFF88]/40 via-[#DFFF88] to-[#DFFF88]/40 
                  group-hover:w-full transition-all duration-300 ease-out
                  shadow-[0_0_10px_rgba(223,255,136,0.5)] opacity-0 group-hover:opacity-100" 
                />
              </a>
              <a 
                href="#features" 
                className="relative group hover:text-[#DFFF88] transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById('features');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                Features
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-[#DFFF88]/40 via-[#DFFF88] to-[#DFFF88]/40 
                  group-hover:w-full transition-all duration-300 ease-out
                  shadow-[0_0_10px_rgba(223,255,136,0.5)] opacity-0 group-hover:opacity-100" 
                />
              </a>
              <a 
                href="#services" 
                className="relative group hover:text-[#DFFF88] transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById('services');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                Services 
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-[#DFFF88]/40 via-[#DFFF88] to-[#DFFF88]/40 
                  group-hover:w-full transition-all duration-300 ease-out
                  shadow-[0_0_10px_rgba(223,255,136,0.5)] opacity-0 group-hover:opacity-100" 
                />
              </a>
              <a 
                href="#about" 
                className="relative group hover:text-[#DFFF88] transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById('about');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                About
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-[#DFFF88]/40 via-[#DFFF88] to-[#DFFF88]/40 
                  group-hover:w-full transition-all duration-300 ease-out
                  shadow-[0_0_10px_rgba(223,255,136,0.5)] opacity-0 group-hover:opacity-100" 
                />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full 
                bg-transparent border border-[#DFFF88] text-[#DFFF88]
                hover:bg-[#DFFF88]/10 transition-all duration-300
                focus:outline-none focus:ring-2 focus:ring-[#DFFF88]/50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className="fixed inset-0 z-[65] md:hidden pointer-events-none">
        <div 
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-in-out
            ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0'}`}
          onClick={() => setIsMenuOpen(false)}
        />
        <div 
          className={`absolute inset-y-0 left-0 w-full bg-[#13161C] transform transition-all duration-300 ease-in-out pointer-events-auto
            ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <div className="container mx-auto px-6">
            {/* Close Button */}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-6 right-6 p-2 text-[#8A95A3] hover:text-[#DFFF88] 
                transition-colors duration-300 rounded-full hover:bg-white/5"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex flex-col items-center space-y-6 pt-24">
              <a 
                href="#home" 
                className="text-lg text-white hover:text-[#DFFF88] transition-colors w-full text-center py-2" 
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById('home');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                  setIsMenuOpen(false);
                }}
              >
                Home
              </a>
              <a 
                href="#market" 
                className="text-lg text-white hover:text-[#DFFF88] transition-colors w-full text-center py-2"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById('market');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                  setIsMenuOpen(false);
                }}
              >
                Live Market
              </a>
              <a 
                href="#features" 
                className="text-lg text-white hover:text-[#DFFF88] transition-colors w-full text-center py-2"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById('features');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                  setIsMenuOpen(false);
                }}
              >
                Features
              </a>
              <a 
                href="#services" 
                className="text-lg text-white hover:text-[#DFFF88] transition-colors w-full text-center py-2"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById('services');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                  setIsMenuOpen(false);
                }}
              >
                Services
              </a>
              <a 
                href="#about" 
                className="text-lg text-white hover:text-[#DFFF88] transition-colors w-full text-center py-2"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById('about');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                  setIsMenuOpen(false);
                }}
              >
                About
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section id="home" className="pt-32 md:pt-40 pb-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Transform your trading journey
              </h1>
              <p className="text-[#8A95A3] text-lg mb-8">
                Access over 5600+ markets and learn from expert traders. Start your journey to financial freedom today.
              </p>
              <div className="flex space-x-4">
                <button 
                  onClick={handleStartTrading}
                  className="px-8 py-3 rounded-full neon-button"
                >
                  Start Trading
                </button>
                <button
                  onClick={handleLearnMore}
                  className="px-8 py-3 rounded-full border border-[#DFFF88] text-[#DFFF88] 
                    hover:bg-[#DFFF88]/10 transition-colors"
                >
                  Learn More
                </button>
              </div>
            </div>
            <div className="relative w-[90%] mx-auto">
              <img 
                src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80" 
                alt="Trading Platform" 
                className="rounded-lg shadow-2xl w-full"
              />
               
               {/* Bottom Left Card */}
               <div className="absolute -bottom-10 -left-10 bg-[#4D4D4D] p-6 rounded-lg shadow-xl max-w-[280px] animate-float-slow">
                 <div className="flex items-center space-x-4 mb-4">
                   <div className="w-12 h-12 bg-[#DFFF88]/20 rounded-full flex items-center justify-center">
                     <LineChart className="w-6 h-6 text-[#DFFF88]" />
                   </div>
                   <div>
                     <h3 className="font-bold">Live Trading</h3>
                     <p className="text-sm text-[#8A95A3]">Real-time market data</p>
                   </div>
                 </div>
                 <div className="flex items-center space-x-4">
                   <div className="w-12 h-12 bg-[#DFFF88]/20 rounded-full flex items-center justify-center">
                     <Boxes className="w-6 h-6 text-[#DFFF88]" />
                   </div>
                   <div>
                     <h3 className="font-bold">Advanced Analytics</h3>
                     <p className="text-sm text-[#8A95A3]">Powerful insights</p>
                   </div>
                 </div>
               </div>
 
               {/* Top Right Card */}
               <div className="absolute -top-10 -right-10 bg-[#4D4D4D] p-6 rounded-lg shadow-xl max-w-[280px] animate-float-normal">
                 <div className="flex items-center space-x-4">
                   <div className="w-12 h-12 bg-[#DFFF88]/20 rounded-full flex items-center justify-center">
                     <ChevronDown className="w-6 h-6 text-[#DFFF88]" />
                   </div>
                   <div>
                     <h3 className="font-bold">Market Signals</h3>
                     <p className="text-sm text-[#8A95A3]">Get market alerts</p>

                   </div>
                 </div>
               </div>
 
               {/* Middle Right Card */}
               <div className="absolute top-1/2 -right-16 transform -translate-y-1/2 bg-[#4D4D4D] p-6 rounded-lg shadow-xl max-w-[280px] animate-float-fast">
                 <div className="flex items-center space-x-4">
                   <div className="w-12 h-12 bg-[#DFFF88]/20 rounded-full flex items-center justify-center">
                     <Building2 className="w-6 h-6 text-[#DFFF88]" />
                   </div>
                   <div>
                     <h3 className="font-bold">Portfolio Growth</h3>
                     <p className="text-sm text-[#8A95A3]">+125% this month</p>
                   </div>
                 </div>
               </div>
 
               {/* Bottom Right Card */}
               <div className="absolute -bottom-20 right-10 bg-[#4D4D4D] p-6 rounded-lg shadow-xl max-w-[280px] animate-float-medium">
                 <div className="flex items-center space-x-4">
                   <div className="w-12 h-12 bg-[#DFFF88]/20 rounded-full flex items-center justify-center">
                     <Bitcoin className="w-6 h-6 text-[#DFFF88]" />
                   </div>
                   <div>
                     <h3 className="font-bold">Crypto Trading</h3>
                     <p className="text-sm text-[#8A95A3]">24/7 markets</p>
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Market Section */}
      <section id="market" className="py-20">
        <LiveMarket />
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 gradient-bg">
        <div className="container mx-auto px-6 max-w-7xl">
          <h2 className="text-4xl font-bold text-center mb-16">
            Investment Methods
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: <Building2 className="w-8 h-8" />,
                title: "Stocks Trading",
                description: "Trade shares of publicly listed companies with advanced analysis tools."
              },
              {
                icon: <Bitcoin className="w-8 h-8" />,
                title: "Cryptocurrency",
                description: "Access major cryptocurrencies and emerging digital assets."
              },
              {
                icon: <LineChart className="w-8 h-8" />,
                title: "Forex Trading",
                description: "Trade global currency pairs with real-time market data."
              },
              {
                icon: <Boxes className="w-8 h-8" />,
                title: "Commodities",
                description: "Invest in gold, silver, oil, and other valuable commodities."
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="bg-[#4D4D4D] p-8 rounded-lg relative group
                  transition-all duration-500 ease-out 
                  hover:-translate-y-4 hover:shadow-[0_0_30px_rgba(223,255,136,0.1)]
                  before:absolute before:inset-0
                  after:absolute after:inset-0
                  isolate
                  overflow-hidden"
              >
                {/* Moving border effect - Top */}
                <div className="absolute top-0 left-0 w-[100%] h-[2px] bg-gradient-to-r from-transparent via-[#DFFF88] to-transparent
                  animate-[moveRight_3s_linear_infinite] opacity-70 group-hover:opacity-100" />
                
                {/* Moving border effect - Right */}
                <div className="absolute top-0 right-0 w-[2px] h-[100%] bg-gradient-to-b from-transparent via-[#DFFF88] to-transparent
                  animate-[moveDown_3s_linear_infinite] opacity-70 group-hover:opacity-100" />
                
                {/* Moving border effect - Bottom */}
                <div className="absolute bottom-0 right-0 w-[100%] h-[2px] bg-gradient-to-l from-transparent via-[#DFFF88] to-transparent
                  animate-[moveLeft_3s_linear_infinite] opacity-70 group-hover:opacity-100" />
                
                {/* Moving border effect - Left */}
                <div className="absolute bottom-0 left-0 w-[2px] h-[100%] bg-gradient-to-t from-transparent via-[#DFFF88] to-transparent
                  animate-[moveUp_3s_linear_infinite] opacity-70 group-hover:opacity-100" />

                {/* Content */}
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-[#DFFF88]/10 rounded-lg flex items-center justify-center mb-6 
                    group-hover:bg-[#DFFF88]/20 transition-colors duration-300">
                    <div className="text-[#DFFF88]">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-4 group-hover:text-[#DFFF88] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-[#8A95A3] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-[#13161C]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-white mb-4">Our Services</h2>
            <p className="text-[#8A95A3] max-w-2xl mx-auto">
              Choose from our range of specialized signal packages designed to meet your trading needs
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div
                key={course.id}
                className="relative bg-[#1A1D23] rounded-2xl p-8 hover:transform hover:scale-[1.02] transition-all duration-300"
              >
                {course.popular && (
                  <div className="absolute -top-4 right-4 bg-black text-[#DFFF88] px-4 py-1 rounded-full text-sm">
                    Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold text-white mb-4">{course.title}</h3>
                <div className="flex items-baseline mb-8">
                  <span className="text-4xl font-bold text-white">{course.price}</span>
                  <span className="text-[#8A95A3] ml-2">Quarterly</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {course.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-5 h-5 mr-3 text-[#DFFF88] mt-1 flex-shrink-0" />
                      <span className="text-[#8A95A3]">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => navigate(`/signal-pack/${course.id}`)}
                  className="w-full py-4 rounded-lg bg-[#DFFF88] text-black font-semibold hover:bg-[#DFFF88]/90 transition-colors"
                >
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trading Account Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#13161C] via-[#13161C]/90 to-[#4D4D4D]/20"></div>
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Start Your Trading Journey Today
            </h2>
            <p className="text-[#8A95A3] mb-8">
              Create your trading account now and access global markets with professional tools and expert support.
            </p>
            <div className="bg-[#1A1D23]/80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/10 hover:border-[#DFFF88]/20 transition-colors">
              <div className="flex flex-col items-center space-y-6">
                <div className="w-16 h-16 bg-[#DFFF88]/10 rounded-full flex items-center justify-center mb-4">
                  <LineChart className="w-8 h-8 text-[#DFFF88]" />
                </div>
                <h3 className="text-2xl font-bold">Create Trading Account</h3>
                <p className="text-[#8A95A3] max-w-lg">
                  Join thousands of traders worldwide. Get access to multiple trading instruments, competitive spreads, and expert market analysis.
                </p>
                <a 
                  href="https://one.exnesstrack.org/a/lwvoks6viz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-lg bg-[#DFFF88] text-black font-semibold 
                    hover:bg-[#DFFF88]/90 transition-all duration-300 transform 
                    hover:scale-[1.02] flex items-center space-x-2"
                >
                  <span>Create Account</span>
                  <ArrowRight className="w-5 h-5" />
                </a>
                <div className="flex items-center space-x-8 mt-4">
                  <div className="flex items-center text-[#8A95A3]">
                    <Check className="w-5 h-5 text-[#DFFF88] mr-2" />
                    <span>Quick Registration</span>
                  </div>
                  <div className="flex items-center text-[#8A95A3]">
                    <Check className="w-5 h-5 text-[#DFFF88] mr-2" />
                    <span>24/7 Support</span>
                  </div>
                  <div className="flex items-center text-[#8A95A3]">
                    <Check className="w-5 h-5 text-[#DFFF88] mr-2" />
                    <span>Secure Platform</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto px-6 max-w-7xl">
          <h2 className="text-4xl font-bold text-center mb-4">
            What Our <span className="text-[#DFFF88]">Traders Say</span>
          </h2>
          <p className="text-[#8A95A3] text-center mb-16 max-w-2xl mx-auto">
            Join thousands of successful traders who have transformed their trading journey with FOREXBHIDU
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 group">
            {[
              {
                name: "Sarah Chen",
                role: "Professional Trader",
                image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&h=150&q=80",
                quote: "Forex Bhidu's analytical tools and educational resources have been instrumental in my trading success. The platform is intuitive and powerful.",
                rating: 5
              },
              {
                name: "Marcus Rodriguez",
                role: "Investment Analyst",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80",
                quote: "The real-time market data and advanced charting capabilities have completely transformed how I analyze trading opportunities.",
                rating: 5
              },
              {
                name: "Emma Thompson",
                role: "Crypto Investor",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80",
                quote: "As a crypto trader, I appreciate the comprehensive coverage of digital assets and the seamless integration of multiple markets.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div 
                key={index} 
                className={`bg-[#4D4D4D] p-8 rounded-lg relative 
                  transition-all duration-500 ease-out
                  group-hover:blur-sm hover:!blur-none hover:scale-105 hover:z-10
                  hover:transform hover:-translate-y-4
                  hover:shadow-[0_20px_50px_rgba(223,255,136,0.15)]
                  before:absolute before:inset-0
                  after:absolute after:inset-0
                  isolate
                  overflow-hidden
                  ${index === 0 ? 'animate-float-slow' : 
                    index === 1 ? 'animate-float-normal' : 
                    'animate-float-medium'}
                `}
              >
                {/* Moving glowing border effect - Top */}
                <div className="absolute top-0 left-0 w-[100%] h-[2px] bg-gradient-to-r from-transparent via-[#DFFF88] to-transparent
                  animate-[moveRight_3s_linear_infinite] opacity-70 group-hover:opacity-100 group-hover:shadow-[0_0_10px_#DFFF88]" />
                
                {/* Moving glowing border effect - Right */}
                <div className="absolute top-0 right-0 w-[2px] h-[100%] bg-gradient-to-b from-transparent via-[#DFFF88] to-transparent
                  animate-[moveDown_3s_linear_infinite] opacity-70 group-hover:opacity-100 group-hover:shadow-[0_0_10px_#DFFF88]" />
                
                {/* Moving glowing border effect - Bottom */}
                <div className="absolute bottom-0 right-0 w-[100%] h-[2px] bg-gradient-to-l from-transparent via-[#DFFF88] to-transparent
                  animate-[moveLeft_3s_linear_infinite] opacity-70 group-hover:opacity-100 group-hover:shadow-[0_0_10px_#DFFF88]" />
                
                {/* Moving glowing border effect - Left */}
                <div className="absolute bottom-0 left-0 w-[2px] h-[100%] bg-gradient-to-t from-transparent via-[#DFFF88] to-transparent
                  animate-[moveUp_3s_linear_infinite] opacity-70 group-hover:opacity-100 group-hover:shadow-[0_0_10px_#DFFF88]" />

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full mr-4 object-cover ring-2 ring-[#DFFF88]/20 
                        group-hover:ring-[#DFFF88]/40 group-hover:scale-110 transition-all duration-500"
                    />
                    <div>
                      <h3 className="font-bold text-white group-hover:text-[#DFFF88] transition-colors">
                        {testimonial.name}
                      </h3>
                      <p className="text-[#8A95A3] text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="w-5 h-5 text-[#DFFF88] fill-[#DFFF88] group-hover:animate-pulse
                          group-hover:scale-110 transition-transform duration-500" 
                      />
                    ))}
                  </div>
                  <p className="text-[#8A95A3] group-hover:text-[#8A95A3]/90 transition-colors">
                    {testimonial.quote}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#13161C] via-[#13161C]/90 to-[#4D4D4D]/20"></div>
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="max-w-xl mx-auto bg-[#1A1D23]/80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl
            border border-white/10 hover:border-[#DFFF88]/20 transition-colors">
            
            <h2 className="text-3xl font-bold text-center mb-2">Request a call from our Expert</h2>
            <p className="text-[#8A95A3] text-center mb-8">Get personalized trading guidance from our experts</p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[#8A95A3] mb-2 text-sm" htmlFor="name">
                  Your name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-[#13161C]/60 border border-white/10 
                    focus:border-[#DFFF88]/50 focus:ring-1 focus:ring-[#DFFF88]/50 
                    transition-colors outline-none text-white"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label className="block text-[#8A95A3] mb-2 text-sm" htmlFor="email">
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-[#13161C]/60 border border-white/10 
                    focus:border-[#DFFF88]/50 focus:ring-1 focus:ring-[#DFFF88]/50 
                    transition-colors outline-none text-white"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-[#8A95A3] mb-2 text-sm" htmlFor="phone">
                  Phone number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-[#13161C]/60 border border-white/10 
                    focus:border-[#DFFF88]/50 focus:ring-1 focus:ring-[#DFFF88]/50 
                    transition-colors outline-none text-white"
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              <div>
                <label className="block text-[#8A95A3] mb-2 text-sm" htmlFor="country">
                  Country
                </label>
                <CountrySelector 
                  onChange={(value) => setFormData(prev => ({ ...prev, country: value }))} 
                />
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="terms"
                  name="acceptedTerms"
                  checked={formData.acceptedTerms}
                  onChange={handleInputChange}
                  className="w-4 h-4 rounded border-white/10 bg-[#13161C]/60 
                    text-[#DFFF88] focus:ring-[#DFFF88]/50"
                  required
                />
                <label htmlFor="terms" className="text-sm text-[#8A95A3]">
                  I accept the <a href="#" className="text-[#DFFF88] hover:underline">Terms and Conditions</a>
                </label>
              </div>

              {formStatus.error && (
                <div className="text-red-500 text-sm">{formStatus.error}</div>
              )}

              <button
                type="submit"
                disabled={formStatus.loading}
                className="w-full py-4 rounded-lg bg-gradient-to-r from-[#DFFF88] to-[#DFFF88]/80
                  text-black font-semibold hover:from-[#DFFF88]/90 hover:to-[#DFFF88]/70
                  transition-all duration-300 transform hover:scale-[1.02]
                  focus:ring-2 focus:ring-[#DFFF88]/50 focus:ring-offset-2 focus:ring-offset-[#13161C]
                  disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {formStatus.loading ? 'Submitting...' : 'Submit Request'}
              </button>
            </form>

            {/* Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#DFFF88]/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#DFFF88]/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#4D4D4D] pt-20 pb-10">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            {/* Company Info */}
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <img 
                  src="/FB-removebg.png" 
                  alt="Forex BHIDU" 
                  className="h-52 w-[450px] object-contain"
                />
              </div>
              <p className="text-[#8A95A3] mb-6">
                Empowering traders with advanced tools and education for successful market navigation.
              </p>
              <div className="flex space-x-4">
                <a 
                  href="https://www.instagram.com/forexbhidu?igsh=MXJ2Zm14cjAwZGJtNQ==" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[#8A95A3] hover:text-[#DFFF88] transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-6">Quick Links</h3>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="text-[#8A95A3] hover:text-[#DFFF88] transition-colors">About Us</a>
                </li>
                <li>
                  <a href="#" className="text-[#8A95A3] hover:text-[#DFFF88] transition-colors">Our Services</a>
                </li>
                <li>
                  <a href="#" className="text-[#8A95A3] hover:text-[#DFFF88] transition-colors">Market Analysis</a>
                </li>
                <Link to="/admin" className="admin-link" style={{ opacity: 0.5 }}>Admin
                </Link>
              </ul>
            </div>

            {/* Trading */}
            <div>
              <h3 className="text-lg font-bold mb-6">Trading</h3>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="text-[#8A95A3] hover:text-[#DFFF88] transition-colors">Start Trading</a>
                </li>
                <li>
                  <a href="#" className="text-[#8A95A3] hover:text-[#DFFF88] transition-colors">Pricing Plans</a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-bold mb-6">Contact</h3>
              <ul className="space-y-4">
                <li className="flex items-center text-[#8A95A3]">
                  <Phone className="w-5 h-5 mr-3 text-[#DFFF88]" />
                  +916306557690
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-[#8A95A3]/20">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-[#8A95A3] text-sm mb-4 md:mb-0">
                © 2024 FOREX BHIDU All rights reserved.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="text-[#8A95A3] hover:text-[#DFFF88] text-sm transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-[#8A95A3] hover:text-[#DFFF88] text-sm transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="text-[#8A95A3] hover:text-[#DFFF88] text-sm transition-colors">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AppContent; 