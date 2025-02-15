import { useAuth0 } from '@auth0/auth0-react';
import { AuthButton } from './auth/AuthButton';
import Logo from '../assets/logo.png';

export const Navigation = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-[#13161C] z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src={Logo} 
              alt="Your Logo" 
              className="h-24 w-auto object-contain max-w-[300px]"
            />
            <span className="text-white text-3xl font-bold ml-3">Your Brand</span>
          </div>
          
          <div className="flex items-center gap-6">
            <a href="#features" className="text-white hover:text-[#DFFF88] text-lg">
              Features
            </a>
            <a href="#pricing" className="text-white hover:text-[#DFFF88] text-lg">
              Pricing
            </a>
            {isAuthenticated && (
              <a href="/dashboard" className="text-white hover:text-[#DFFF88] text-lg">
                Dashboard
              </a>
            )}
            <AuthButton />
          </div>
        </div>
      </div>
    </nav>
  );
}; 