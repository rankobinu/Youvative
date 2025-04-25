import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../../store/slices/userSlice';
import { MdTaskAlt } from 'react-icons/md';
import { FaExclamationCircle } from 'react-icons/fa';
import logo from "../../../assets/svg/logoBlack.svg";

function StrategySection() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedStrategy, setSelectedStrategy] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const strategies = [
    {
      id: 'growth',
      title: 'Growth Strategy',
      description: 'Focus on rapidly expanding your audience and engagement',
      features: [
        'Aggressive content scheduling',
        'Trend-focused content',
        'Community engagement tactics',
        'Collaboration opportunities',
        'Growth metrics tracking'
      ]
    },
    {
      id: 'brand',
      title: 'Brand Building Strategy',
      description: 'Establish a strong, recognizable brand identity',
      features: [
        'Consistent brand messaging',
        'Visual identity development',
        'Storytelling focus',
        'Brand voice guidelines',
        'Authority building content'
      ]
    },
    {
      id: 'monetization',
      title: 'Monetization Strategy',
      description: 'Optimize content for revenue generation',
      features: [
        'Sponsored content optimization',
        'Product integration guidelines',
        'Affiliate marketing setup',
        'Revenue stream diversification',
        'Audience monetization tactics'
      ]
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!selectedStrategy) {
      setError('Please select a strategy');
      setIsSubmitting(false);
      return;
    }

    const strategy = strategies.find(s => s.id === selectedStrategy);
    
    dispatch(setUserData({
      strategy: selectedStrategy,
      strategyTitle: strategy.title
    }));

    localStorage.setItem('userStrategy', selectedStrategy);
    localStorage.setItem('userStrategyTitle', strategy.title);

    navigate('/payment'); // Changed from '/userinterface' to '/payment'
  };

  return (
    <div className="min-h-screen flex flex-col px-8">
      <div>
        <RouterLink to="/homepage">
          <img src={logo} alt="Youvative Logo" className="-mt-7 -ml-10"/>
        </RouterLink>
      </div>
      <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col position-relative -mt-25">
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
          <div className="text-center mb-6">
            <div className="flex justify-center items-center gap-6">
              <MdTaskAlt className="text-4xl text-[#5E15EB]" />
              <MdTaskAlt className="text-4xl text-[#5E15EB]" />
              <MdTaskAlt className="text-4xl text-[#5E15EB]" />
              <MdTaskAlt className="text-gray-500 text-4xl" />
            </div>
            <h1 className="text-[#5E15EB] text-4xl font-extrabold">Choose Your Strategy</h1>
            <p className="text-white/80 mt-2 text-lg">Select the strategy that best aligns with your content creation goals</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {strategies.map((strategy) => (
              <div 
                key={strategy.id}
                className={`rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                  selectedStrategy === strategy.id 
                  ? 'bg-[#5E15EB] text-white ring-4 ring-purple-400' 
                  : 'bg-[#B28FFA4F] text-white hover:bg-[#5E15EB]/50'
                }`}
                onClick={() => {
                  setSelectedStrategy(strategy.id);
                  setError('');
                }}
              >
                <div className="p-5 h-full flex flex-col">
                  <h2 className="text-xl font-bold mb-3">{strategy.title}</h2>
                  <p className="text-base mb-4 text-white/90">{strategy.description}</p>
                  <div className="flex-grow">
                    <ul className="space-y-2">
                      {strategy.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <MdTaskAlt className="mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {error && (
            <p className="text-red-500 text-center mb-4">{error}</p>
          )}

          <div className="flex flex-col items-center mt-auto pb-20 gap-4">
            <button
              type="submit"
              className="bg-[#5D17E9] text-white text-xl rounded-lg py-3 px-16 font-bold transition-all duration-300 hover:bg-[#4A12BA] hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : 'Continue to Payment'}
            </button>

            <RouterLink 
              to="/form" 
              className="text-[#9B9B9B] hover:text-white transition-colors duration-300 "
            >
              Back to Form
            </RouterLink>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StrategySection;
