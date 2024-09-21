import React, { useEffect, useState } from 'react';
import TradingPairModal from './TradingPairModal';
import DonationModal from './DonationModal';
import SkeletonLoader from './SkeletonLoader';
import axios from 'axios';
import { addPosition } from '@/store/userSlice';
import { useDispatch } from 'react-redux';
import { formatLargeNumber } from '../utils/tools';

interface TradingPair {
  id: string;
  pair: string;
  change: number;
  apy: string;
  tvl: string;
  source: string;
  volumeFiat: string;
  riskScore: string;
}

interface TradingPairResponse {
  data: TradingPair[];
  total: number;
}

const TradingPanel: React.FC = () => {
  const [selectedPair, setSelectedPair] = useState<TradingPair | null>(null);
  const [showTradingPairModal, setShowTradingPairModal] = useState(false);
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [donationAmount, setDonationAmount] = useState(0);
  const [tradingPairs, setTradingPairs] = useState<TradingPair[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const handleExecuteTrade = (amount: number, pair: TradingPair) => {
    setDonationAmount(amount);
    setSelectedPair(null);
    setShowDonationModal(true);
    dispatch(addPosition({
      id: Date.now().toString(),
      pair: `${pair.pair}`,
      amount: amount / 0.01,
      apy: parseFloat(pair.apy),
      startTime: Date.now(),
      token0Symbol: pair.pair.split('/')[0],
      token1Symbol: pair.pair.split('/')[1],
    }));
  };

  const fetchTradingPairs = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get<TradingPairResponse>('/api/list');
      setTradingPairs(response.data.data);
      setIsLoading(false);
    } catch (err) {
      setError('Failed to fetch trading pairs');
      console.log(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTradingPairs();
  }, []);

  if (isLoading) {
    return <SkeletonLoader count={5} />;
  }

  if (error) {
    return <div className="text-red-500 text-center py-4">{error}</div>;
  }

  return (
    <>
      <div className="flex flex-col w-full h-full bg-purple-50 bg-opacity-30 rounded-xl overflow-hidden">
        <div className="flex-grow overflow-y-auto">
          <div className="space-y-4 p-4">
            {tradingPairs.map((pair, index) => (
              <div 
                key={index} 
                className="bg-white bg-opacity-50 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                onClick={() => setSelectedPair(pair)}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-purple-800">{pair.pair}</h3>
                  <span className={`text-sm px-1 rounded-sm text-white font-bold ${parseFloat(pair.riskScore) < 5 ? 'bg-green-500' : 'bg-red-500'}`}>
                    Risk: {parseFloat(pair.riskScore).toFixed(2)}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-purple-600">APY:</p>
                    <p className="font-bold text-purple-800">{ parseFloat(pair.apy) && parseFloat(pair.apy) > 0 ? `${formatLargeNumber(parseFloat(pair.apy))}%` : 'Undisclosed'}</p>
                  </div>
                  <div>
                    <p className="text-purple-600">TVL:</p>
                    <p className="font-bold text-purple-800">{parseFloat(pair.tvl) ? parseFloat(pair.tvl).toFixed(2) : pair.tvl} USDC</p>
                  </div>
                  <div>
                    <p className="text-purple-600">Source:</p>
                    <div className='flex items-center'>
                      <img src={'https://logotyp.us/file/the-graph.svg'} alt={'the graph'} className='w-6 h-6' />
                      <p className="font-medium text-black">The Graph</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-purple-600">Volume:</p>
                    <p className="font-bold text-purple-800">{parseFloat(pair.volumeFiat) && parseFloat(pair.volumeFiat) > 0 ? `${parseFloat(pair.volumeFiat).toFixed(2)} USDC` : 'Undisclosed'}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {selectedPair && (
        <TradingPairModal
          pair={{
            id: selectedPair.id,
            name: selectedPair.pair,
            price: '$0.065',
            change: `${selectedPair.change >= 0 ? '+' : ''}${selectedPair.change}% (24h)`,
            apy: `${selectedPair.apy}%`,
            tvl: selectedPair.tvl,
            volume24h: selectedPair.volumeFiat,
            riskScore: '7.5/10',
          }}
          onClose={() => setSelectedPair(null)}
          onExecuteTrade={(amount: number) => handleExecuteTrade(amount, selectedPair)}

        />
      )}
      {showDonationModal && (
        <DonationModal
          amount={donationAmount}
          onClose={() => setShowDonationModal(false)}
        />
      )}
    </>
  );
};

export default TradingPanel;
