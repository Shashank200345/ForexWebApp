import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="pt-20 pb-12 bg-gradient-to-r from-blue-600 to-blue-800">
      <div className="container mx-auto px-4 pt-16">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 text-center md:text-left text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Expert Forex Trading Signals
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Get professional trading signals with high accuracy and real-time market analysis to maximize your trading potential.
            </p>
            <div className="space-x-4">
              <a
                href="#signal-packs"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Get Started
              </a>
              <a
                href="#features"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-0">
            <img
              src="/trading-chart.png"
              alt="Trading Chart"
              className="w-full max-w-lg mx-auto rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 