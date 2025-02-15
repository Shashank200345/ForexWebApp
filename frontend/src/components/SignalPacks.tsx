import React, { useState } from 'react';
import SignalSubscriptionModal from './SignalSubscriptionModal';

interface SignalPack {
  id: number;
  title: string;
  price: string;
  features: string[];
}

const signalPacks: SignalPack[] = [
  {
    id: 1,
    title: 'Basic Pack',
    price: '$99/month',
    features: [
      '10-15 signals per day',
      'Entry, take profit & stop loss',
      'Success rate 85%',
      'Email notifications',
      'Basic market analysis'
    ]
  },
  {
    id: 2,
    title: 'Premium Pack',
    price: '$199/month',
    features: [
      '20-25 signals per day',
      'Entry, take profit & stop loss',
      'Success rate 90%',
      'Email & SMS notifications',
      'Detailed market analysis',
      'Priority support'
    ]
  },
  {
    id: 3,
    title: 'VIP Pack',
    price: '$299/month',
    features: [
      '30-35 signals per day',
      'Entry, take profit & stop loss',
      'Success rate 95%',
      'Email, SMS & app notifications',
      'Advanced market analysis',
      '24/7 dedicated support',
      'One-on-one consultation'
    ]
  }
];

const SignalPacks: React.FC = () => {
  const [selectedPack, setSelectedPack] = useState<SignalPack | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGetStarted = (pack: SignalPack) => {
    setSelectedPack(pack);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPack(null);
  };

  return (
    <section className="py-20 bg-gray-50" id="signal-packs">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Signal Packs</h2>
          <p className="text-xl text-gray-600">Choose the perfect signal pack for your trading needs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {signalPacks.map((pack) => (
            <div
              key={pack.id}
              className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{pack.title}</h3>
              <p className="text-3xl font-bold text-blue-600 mb-6">{pack.price}</p>
              <ul className="space-y-4 mb-8">
                {pack.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <svg
                      className="w-5 h-5 text-green-500 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleGetStarted(pack)}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
              >
                Get Started
              </button>
            </div>
          ))}
        </div>

        {selectedPack && (
          <SignalSubscriptionModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            signalPack={selectedPack}
          />
        )}
      </div>
    </section>
  );
};

export default SignalPacks; 