import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MdTaskAlt } from 'react-icons/md';
import { FaTiktok, FaYoutube, FaInstagram } from "react-icons/fa";
import logo from "../../../assets/svg/logoBlack.svg";
import { updateStrategyData, submitRegistration } from '../../../store/slices/registerSlice';

function StrategySection() {
  const [scrolled, setScrolled] = useState(false);
  const [showTransition, setShowTransition] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [strategyId, setStrategyId] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitButtonRef = useRef(null);
  const [visibleRows, setVisibleRows] = useState(1);
  
  // Get registration state from Redux
  const { status, error: registrationError } = useSelector(state => state.register);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
      if (isScrolled) {
        setShowTransition(true);
      } else {
        setShowTransition(false);
      }

      // Calculate visible rows based on scroll position
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const newVisibleRows = Math.ceil((scrollPosition + windowHeight) / 300); // Adjust 300 based on your row height
      setVisibleRows(Math.min(newVisibleRows, Math.ceil(strategies.length / 4))); // 4 is the number of columns
    };

    window.addEventListener("scroll", handleScroll);
    return () => (
      window.removeEventListener("scroll", handleScroll)
    );
  },);

  // Update error state when registration error changes
  useEffect(() => {
    if (registrationError) {
      setError(registrationError);
      setIsSubmitting(false);
    }
  }, [registrationError]);

  // Update loading state when status changes
  useEffect(() => {
    if (status === 'loading') {
      setIsSubmitting(true);
    } else if (status === 'succeeded') {
      navigate('/payment');
    } else if (status !== 'loading') {
      setIsSubmitting(false);
    }
  }, [status, navigate]);

  const strategies = [
    {
      id: 'branding-strategy',
      title: 'Branding Strategy',
      description: 'Build a consistent and professional personal brand',
      platform: <FaTiktok/>,
      goalExample: '3 reels/week + Q&A scheme guide',
    },    
    {
      id: 'engagement-booster',
      title: 'Engagement Booster',
      description: 'Improve interaction and comments on posts',
      platform: <FaInstagram/>,
      goalExample: '+20% engagement rate',
    },
    {
      id: 'youTube-starter-kit',
      title: 'YouTube Starter Kit',
      description: 'Align content between platforms for wider reach',
      platform: <FaYoutube/>,
      goalExample: '2 videos/week + Q&A post',
    },
    {
      id: 'growth-boost',
      title: 'Growth Boost',
      description: 'Increase reach and attract new followers',
      platform: <FaInstagram/>,
      goalExample: '+500 followers in 1 month',
    },    
    {
      id: 'product-promotion',
      title: 'Product Promotion',
      description: 'Promote a specific product or service effectively',
      platform: <FaInstagram/>,
      goalExample: '5 story promos/week',
    },
    {
      id: 'tikok-viral Push',
      title: 'TikTok Viral Push',
      description: 'Boost inactive creators aiming to return',
      platform: <FaTiktok/>,
      goalExample: '1 trending challenge/week',
    },
    {
      id: 'community-builder',
      title: 'Community Builder',
      description: 'For inactive creators aiming to return with a bang',
      platform: <FaInstagram/>,
      goalExample: '1 live/week + 2 reels/week',
    },
    {
      id: 'niche-domination',
      title: 'Niche Domination',
      description: 'Focus on dominating a specific niche (e.g., fitness, tech, etc.)',
      platform: [
        <FaTiktok key="tiktok"/>,
        <FaYoutube key="youtube"/>,
        <FaInstagram key="instagram"/>
      ],
      goalExample: 'Weekly expert content',
    }  
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    if (!strategyId) {
      setError('Please select a strategy to continue');
      setIsSubmitting(false);
      return;
    }
    
    try {
      // Update strategy data in Redux store
      dispatch(updateStrategyData({ strategy_type: strategyId }));
      
      // Submit all registration data to backend
      dispatch(submitRegistration());
      
      // Navigation is handled in the useEffect that watches status
    } catch (error) {
      console.error('Error selecting strategy:', error);
      setError(error.message || 'Failed to select strategy');
      setIsSubmitting(false);
    }
  };

  const handleStrategyClick = (strategyId) => {
    setStrategyId(strategyId);
    setError('');
    
    // Scroll to submit button
    submitButtonRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'center'
    });
  };

  // Group strategies into rows (4 items per row)
  const strategyRows = strategies.reduce((rows, strategy, index) => {
    if (index % 4 === 0) rows.push([]);
    rows[rows.length - 1].push(strategy);
    return rows;
  }, []);

  return (
    <div className="flex flex-col  bg-gradient-to-t from-[#5E4683] to-[#150F1D]">
      {/* Fixed Header */}
      <div className={`sticky flex top-0 right-0 left-0 -px-8 ${showTransition? "transition-color":"" }  ${scrolled? "bg-[#150F1D]": ""} my-5 py-3 z-10`}>
        <div>
          <RouterLink to="/homepage">
            <img src={logo} alt="Youvative Logo" className="absolute -my-10 -ml-10 "/>
          </RouterLink>
        </div>
        <div className="text-center mx-auto">
          <div className="flex justify-center items-center gap-6">
            <MdTaskAlt className="text-4xl text-[#5E15EB]" />
            <MdTaskAlt className="text-4xl text-[#5E15EB]" />
            <MdTaskAlt className="text-4xl text-[#5E15EB]" />
            <MdTaskAlt className="text-gray-500 text-4xl" />
          </div>
          <h1 className="text-[#5E15EB] text-4xl font-extrabold">Choose Your Strategy</h1>
          <p className="text-white/80 mt-2 text-lg">Select the strategy that best aligns with your content creation goals</p>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1">
        <div className="max-w-6xl mx-auto w-full">
          <form onSubmit={handleSubmit}>
            <div className="space-y-16"> {/* Added vertical spacing between rows */}
              {strategyRows.map((row, rowIndex) => (
                <div 
                  key={`row-${rowIndex}`}
                  className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-all duration-700 ${
                    rowIndex < visibleRows 
                      ? 'opacity-100 transform translate-y-0' 
                      : 'opacity-0 transform translate-y-20 pointer-events-none'
                  }`}
                >
                  {row.map((strategy, colIndex) => (
                    <div 
                      key={`column-${colIndex}`}
                      className={`rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                        strategyId === strategy.id 
                          ? 'bg-[#5E15EB] text-white ring-4 ring-purple-400' 
                          : 'bg-[#B28FFA4F] text-white hover:bg-[#5E15EB]/50'
                      }`}
                      onClick={() => handleStrategyClick(strategy.id)}
                    >
                      <div className="px-5 py-2 h-full flex flex-col">
                        <div className="my-3">
                          <span className="text-white px-2 rounded-full text-xl flex gap-3">
                            {strategy.platform}
                          </span>
                        </div>
                        <h2 className="text-xl font-bold mb-3">{strategy.title}</h2>
                        <p className="text-sm mb-4 text-white/90">{strategy.description}</p>
                        <p className="text-sm mb-4 text-white/80 italic">Goal: {strategy.goalExample}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </form>
        </div>

      {/* Fixed Footer */}
        <div className="bottom-0 left-0 right-0 p-8" ref={submitButtonRef}>
        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={handleSubmit}
            className={`bg-[#5D17E9] text-white text-xl rounded-lg py-3 px-16 font-bold transition-all duration-500 hover:bg-[#4A12BA] hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${
              strategyId ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Continue to Payment'}
          </button>

          <RouterLink 
            to="/form" 
            className="text-[#9B9B9B] hover:text-white transition-colors duration-300"
          >
            Back to Form
          </RouterLink>
        </div>
        </div>
      </div>
    </div>
  );
}

export default StrategySection;
