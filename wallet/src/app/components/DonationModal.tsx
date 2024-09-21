import { RootState } from '@/store/store';
import React from 'react';
import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';

interface DonationModalProps {
  amount: number;
  onClose: () => void;
}

const DonationModal: React.FC<DonationModalProps> = ({ amount, onClose }) => {
  const user = useSelector((state: RootState) => state.user);
  

  const handleShareTwitter = () => {
    const tweetText = encodeURIComponent(`I just donated $${amount.toFixed(2)} to support freedom of the press through my crypto trade! #CryptoForPress`);
    window.open(`https://twitter.com/intent/tweet?text=${tweetText}`, '_blank');
  };

  const modalContent = (
    <div className="fixed inset-0 bg-purple-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center mb-4">
          <div>
            <h3 className="font-bold text-lg text-purple-800">{user.user?.first_name}</h3>
            <p className="text-purple-600">Trade to Donate</p>
          </div>
        </div>
        <p className="text-xl font-bold mb-2 text-purple-700">Donor #{Math.floor(Math.random() * 10) + 1} today</p>
        <p className="text-4xl font-bold mb-4 text-purple-900">You've donated ${amount.toFixed(2)}</p>
        <p className="text-sm text-purple-600 mb-4">Supporting Freedom of the Press Foundation</p>
        <img src="https://freedom-press-store.myshopify.com/cdn/shop/products/FOTP.Punchout.mask_mock_1512x.png?v=1642175441" alt="Donation Image" className="w-full mb-4 rounded-lg" />
        <button 
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition-colors"
          onClick={handleShareTwitter}
        >
          Share on Twitter
        </button>
        <button 
          className="w-full mt-2 bg-purple-100 text-purple-800 py-2 rounded hover:bg-purple-200 transition-colors"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  )

  return ReactDOM.createPortal(
    modalContent,
    document.body
  );
};

export default DonationModal;
