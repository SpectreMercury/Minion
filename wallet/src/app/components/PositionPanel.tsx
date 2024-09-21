import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { formatLargeNumber } from '../utils/tools';
import SkeletonLoader from './SkeletonLoader';

const PositionPanel: React.FC = () => {
  const positions = useSelector((state: RootState) => state.user.positions);
  const [isLoading, setIsLoading] = useState(true);
  const [countdown, setCountdown] = useState(3);

  const calculateEarnings = (position: any) => {
    const now = Date.now();
    const durationInHours = (now - position.startTime) / (1000 * 60 * 60);
    return (position.amount * position.apy * durationInHours) / (365 * 24);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown === 1) {
          clearInterval(timer);
          setIsLoading(false);
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (isLoading) {
    return (
      <SkeletonLoader count={3} />
    );
  }

  return (
    <div className="space-y-4">
      {positions.length === 0 ? (
        <div className="text-center text-purple-600 py-8">
          You don't have any positions yet. Start trading to see your positions here!
        </div>
      ) : (
        positions.map((position) => (
          <div key={position.id} className="bg-white bg-opacity-50 rounded-lg p-4 shadow-md">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-bold text-purple-800">{position.pair} Pool</h3>
              <span className={`text-sm text-white px-1 bg-yellow-600 rounded`}>
                Pending
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <p className="text-purple-600">Amount: ${position.amount.toFixed(2)}</p>
              <p className="text-purple-600">APY: {position.apy >= 0 ? '+' : ''}{formatLargeNumber(position.apy)}%</p>
              <p className="text-purple-600">Duration: {((Date.now() - position.startTime) / (1000 * 60 * 60 * 24)).toFixed(0)} days</p>
              <p className="text-purple-600">Earnings: ${formatLargeNumber(Number(calculateEarnings(position).toFixed(2)))}</p>
            </div>
            <button disabled className="w-full mt-2 bg-gray-500 text-white py-2 rounded hover:bg-gray-300 transition-colors">
              Redeem
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default PositionPanel;
