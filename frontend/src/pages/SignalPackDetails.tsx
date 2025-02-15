import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Check, ArrowLeft } from 'lucide-react';
import RegistrationModal from '../components/RegistrationModal';

interface Course {
  id: number;
  title: string;
  price: string;
  popular: boolean;
  features: string[];
}

interface SignalPackDetailsProps {
  courses: Course[];
}

const SignalPackDetails: React.FC<SignalPackDetailsProps> = ({ courses }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const course = courses.find(c => c.id === Number(id));
  
  if (!course) {
    return null;
  }

  const commonFeatures = [
    "There will be 2-4 signals provided daily.",
    "The Risk-to-Reward ratio is 1:1.5.",
    "We provide comprehensive support and resistance levels throughout the day.",
    "We strive to maintain a high level of accuracy.",
    "Daily and weekly newsletters with fundamental market reports.",
    "Daily and weekly research reports are available via different platforms such as SMS, WhatsApp, Telegram and voice calls."
  ];

  return (
    <div className="min-h-screen bg-[#13161C] text-white pt-24 pb-20">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Back Button */}
        <button 
          onClick={() => navigate('/')}
          className="flex items-center text-[#8A95A3] hover:text-[#DFFF88] mb-12 group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
          Back to Services
        </button>

        {/* Header Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <div className="inline-flex px-3 py-1 rounded-full bg-[#DFFF88]/10 text-[#DFFF88] text-sm mb-4">
              Signal Pack Details
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{course.title}</h1>
            <p className="text-[#8A95A3] text-lg mb-8">
              Get expert trading signals and comprehensive market analysis to enhance your trading success.
            </p>
            <div className="flex items-baseline mb-8">
              <span className="text-5xl font-bold">{course.price}</span>
              <span className="text-[#8A95A3] ml-2">Quarterly</span>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-4 rounded-lg bg-[#DFFF88] text-black font-semibold hover:bg-[#DFFF88]/90 
                transition-all duration-300 transform hover:scale-[1.02]"
            >
              Get Started
            </button>
          </div>
          
          <div className="bg-[#1A1D23] rounded-2xl p-8">
            <h3 className="text-xl font-semibold mb-6">What's Included:</h3>
            <ul className="space-y-4">
              {course.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Check className="w-5 h-5 mr-3 text-[#DFFF88] mt-1 flex-shrink-0" />
                  <span className="text-[#8A95A3]">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {commonFeatures.map((feature, index) => (
            <div 
              key={index}
              className="bg-[#1A1D23] p-6 rounded-xl hover:bg-[#1A1D23]/80 transition-colors"
            >
              <div className="w-12 h-12 bg-[#DFFF88]/10 rounded-lg flex items-center justify-center mb-4">
                <Check className="w-6 h-6 text-[#DFFF88]" />
              </div>
              <p className="text-[#8A95A3]">{feature}</p>
            </div>
          ))}
        </div>

        {/* Communication Channels */}
        <div className="bg-[#1A1D23] rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-bold mb-6">Available Communication Channels</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              'WhatsApp', 'Telegram', 'Voice Calls'
            ].map((channel, index) => (
              <div 
                key={index}
                className="bg-[#13161C] p-4 rounded-lg text-center hover:bg-[#13161C]/80 transition-colors"
              >
                <span className="text-[#DFFF88]">{channel}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                q: "How will I receive the signals?",
                a: "Signals are delivered through multiple channels including WhatsApp, Telegram, SMS, and other platforms of your choice for maximum convenience."
              },
              {
                q: "What is the success rate of the signals?",
                a: "We maintain a high accuracy rate and provide detailed analysis with each signal. Our risk-to-reward ratio of 1:1.5 ensures profitable trading opportunities."
              },
              {
                q: "Do you provide support during trading hours?",
                a: "Yes, we offer comprehensive support throughout trading hours, including real-time market analysis and guidance."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-[#1A1D23] p-6 rounded-xl">
                <h3 className="font-semibold mb-2">{faq.q}</h3>
                <p className="text-[#8A95A3]">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <RegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        packTitle={course.title}
        packPrice={course.price}
      />
    </div>
  );
};

export default SignalPackDetails; 