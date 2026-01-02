import React from 'react';
import { X, MessageCircle } from 'lucide-react';

interface JoinGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const JoinGroupModal: React.FC<JoinGroupModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const whatsappLink = 'https://chat.whatsapp.com/CnRDTn9naceCJybJqfnLN8';
  const telegramLink = 'https://t.me/+sOOvC2RXEy03N2U1';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-[#1A1D23] rounded-2xl shadow-2xl max-w-md w-full p-8 border border-white/10
        transform transition-all duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#8A95A3] hover:text-[#DFFF88] 
            transition-colors duration-300 rounded-full hover:bg-white/5"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#DFFF88]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-8 h-8 text-[#DFFF88]" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Join Our Community
          </h2>
          <p className="text-[#8A95A3]">
            Connect with traders and get the latest market updates
          </p>
        </div>

        {/* Buttons */}
        <div className="space-y-4">
          {/* WhatsApp Button */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full px-6 py-4 rounded-lg
              bg-gradient-to-r from-[#25D366] to-[#128C7E]
              text-white font-semibold hover:from-[#25D366]/90 hover:to-[#128C7E]/90
              transition-all duration-300 transform hover:scale-[1.02]
              shadow-lg hover:shadow-xl"
          >
            <svg 
              className="w-6 h-6 mr-3" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            Join WhatsApp Group
          </a>

          {/* Telegram Button */}
          <a
            href={telegramLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full px-6 py-4 rounded-lg
              bg-gradient-to-r from-[#0088cc] to-[#0077b5]
              text-white font-semibold hover:from-[#0088cc]/90 hover:to-[#0077b5]/90
              transition-all duration-300 transform hover:scale-[1.02]
              shadow-lg hover:shadow-xl"
          >
            <svg 
              className="w-6 h-6 mr-3" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
            Join Telegram Channel
          </a>
        </div>
      </div>
    </div>
  );
};

export default JoinGroupModal;

