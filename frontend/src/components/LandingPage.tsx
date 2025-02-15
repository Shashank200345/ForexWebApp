import { useAuth0 } from '@auth0/auth0-react';

const LandingPage = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const handleGetStarted = () => {
    if (!isAuthenticated) {
      loginWithRedirect({
        appState: { returnTo: "/dashboard" },
        authorizationParams: {
          prompt: "login",
          screen_hint: "signin"
        }
      });
    } else {
      window.location.href = '/dashboard';
    }
  };

  return (
    <div className="min-h-screen bg-[#13161C]">
      {/* Hero Section */}
      <section className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-bold text-white mb-6">
            Start Trading Today
          </h1>
          <button
            onClick={handleGetStarted}
            className="px-8 py-3 rounded bg-[#DFFF88] text-black font-bold hover:bg-[#DFFF88]/90 transition-colors"
          >
            Get Started
          </button>
        </div>
      </section>
      
      {/* Rest of your landing page content */}
    </div>
  );
};

export default LandingPage; 