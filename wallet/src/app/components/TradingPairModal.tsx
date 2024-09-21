import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import * as echarts from 'echarts';
import { XMarkIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { showNotification } from '@/store/notificationSlice';
import { useDispatch } from 'react-redux';

interface TradingPairModalProps {
  pair: {
    id: string;
    name: string;
    price: string;
    change: string;
    apy: string;
    tvl: string;
    volume24h: string;
    riskScore: string;
  };
  onClose: () => void;
  onExecuteTrade: (amount: number, pair: TradingPair) => void; 
}

interface TradingPair {
  apy: string;
  tvl: string;
  poolAddress: string;
  riskScore: string;
  token0Symbol: string;
  token1Symbol: string;
}

interface TradingPairDetail extends TradingPair {
  // 添加详细信息中可能包含的额外字段
  volume24h: string;
  priceChange: string;
  // ... 其他详细字段
}

interface TradingPairDetailResponse {
  data: {
    apy: string;
    tvl: string;
    poolAddress: string;
    riskScore: string;
    token0Symbol: string;
    token1Symbol: string;
  };
  code: string | null;
  msg: string | null;
}

const TradingPairModal: React.FC<TradingPairModalProps> = ({ pair, onClose, onExecuteTrade }) => {
  // const chartRef = useRef<HTMLDivElement>(null);
  const [selectedPair, setSelectedPair] = useState<TradingPair | null>(null);
  const [inputAmount, setInputAmount] = useState<string>('');
  const dispatch = useDispatch();
  const handleExecuteTrade = () => {
    const amount = parseFloat(inputAmount);
    if (amount > 0 && selectedPair) {
      onExecuteTrade(parseFloat(inputAmount) * 0.01 || 0, selectedPair);
    } else {
      dispatch(showNotification({ message: 'Amount must be greater than 0', type: 'error' }));
    }
    onClose(); 
  };

  const fetchPairDetail = async (id: string) => {
    try {
      const response = await axios.get<TradingPairDetailResponse>(`/api/detail?id=${id}`);
      setSelectedPair(response.data.data);
    } catch (err) {
      console.error('Failed to fetch pair detail:', err);
    }
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {  // 只允许输入数字和小数点
      setInputAmount(value);
    }
  };


  useEffect(() => {
    fetchPairDetail(pair.id);
  }, [pair.id]);  

  

  const modalContent = (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md m-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-purple-800">{pair.name}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        {/* <div className="mb-4">
          <span className="text-3xl font-bold text-purple-900">{pair.price}</span>
          <span className={`ml-2 ${pair.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
            {pair.change}
          </span>
        </div> */}
        {/* <div ref={chartRef} className="w-full h-48 mb-4"></div> */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-purple-100 p-3 rounded-lg">
            <p className="text-purple-600">APY</p>
            <p className="text-xl font-bold text-purple-800">{parseFloat(selectedPair?.apy || '0').toFixed(2)}%</p>
          </div>
          <div className="bg-purple-100 p-3 rounded-lg">
            <p className="text-purple-600">TVL</p>
            <p className="text-xl font-bold text-purple-800">{parseFloat(selectedPair?.tvl || '0').toFixed(2)}</p>
          </div>
          {/* <div className="bg-purple-100 p-3 rounded-lg">
            <p className="text-purple-600">24h Volume</p>
            <p className="text-xl font-bold text-purple-800">{pair.volume24h}</p>
          </div> */}
          <div className="bg-purple-100 p-3 rounded-lg">
            <p className="text-purple-600">Risk Score</p>
            <p className="text-xl font-bold text-purple-800">{parseFloat(selectedPair?.riskScore || '0').toFixed(2)} / 10</p>
          </div>
        </div>

        {/* <div className="bg-purple-50 p-4 rounded-lg mb-4">
          <h3 className="font-bold text-purple-800 mb-2">Market Sentiment</h3>
          <p className="text-purple-600">Social Media Mentions: High</p>
          <p className="text-purple-600">Trader Sentiment: <span className="text-green-500">Bullish</span></p>
        </div> */}
        <div className='text-purple-800 pb-2'>
          Contract Address: <a className='text-purple-600 text-underline' href={`https://etherscan.io/address/${selectedPair?.poolAddress}`} target="_blank" rel="noopener noreferrer">{selectedPair?.poolAddress}</a>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="font-bold text-purple-800 mb-2">Trade</h3>
          <input
            type="text"
            value={inputAmount}
            onChange={handleInputChange}
            placeholder={`Enter USDC amount`}
            className="w-full p-2 mb-2 border border-purple-300 rounded"
          />
          <p className="text-purple-600 mb-2">
            Estimated USDC: {parseFloat(inputAmount) ? parseFloat(inputAmount) * 0.99 : 0} 
          </p>
          <p className="text-purple-600 mb-2">Fees: 1%</p>
          
          
          <div className="bg-blue-100 p-3 rounded-lg mb-3 text-sm flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-info"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
            <p className="text-blue-800">
              Our fees will be donated to <a href="https://freedom.press" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Freedom of the Press Foundation</a> for public welfare.
            </p>
          </div>

          <button onClick={handleExecuteTrade} className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition-colors">
            Execute Trade
          </button>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(
    modalContent,
    document.body
  );
};

export default TradingPairModal;
