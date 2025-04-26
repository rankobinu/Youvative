import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../../store/slices/userSlice';
import { MdTaskAlt } from 'react-icons/md';
import { FaExclamationCircle } from 'react-icons/fa';
import logo from "../../../assets/svg/logoBlack.svg";


function StrategySection() {
  const [scrolled,setScrolled]=useState(false);
  const [showTransition, setShowTransition]=useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedStrategy, setSelectedStrategy] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitButtonRef = useRef(null);
  const [visibleRows, setVisibleRows] = useState(1);

  useEffect(()=>{
      const handleScroll= () =>{
        const isScrolled=window.scrollY>50
        setScrolled(isScrolled);
        if(isScrolled){
          setShowTransition(true)
        }else{
          setShowTransition(false)
        }

        // Calculate visible rows based on scroll position
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const newVisibleRows = Math.ceil((scrollPosition + windowHeight) / 300); // Adjust 300 based on your row height
        setVisibleRows(Math.min(newVisibleRows, Math.ceil(strategies.length / 4))); // 4 is the number of columns
      }
  
      window.addEventListener("scroll",handleScroll)
      return()=>(
        window.removeEventListener("scroll",handleScroll)
      )
    },)

  const strategies = [
    {
      id: 'viral-growth',
      title: 'Viral Growth Strategy',
      description: 'Focus on creating highly shareable, trending content to maximize reach',
      platform: 'TikTok',
      goalExample: 'Achieve 100K followers in 3 months through viral challenges',
    },
    {
      id: 'educational-content',
      title: 'Educational Content Strategy',
      description: 'Build authority through informative and educational content',
      platform: 'YouTube',
      goalExample: 'Create a learning series with 50K subscribers',
    },
    {
      id: 'lifestyle-influence',
      title: 'Lifestyle Influencer Strategy',
      description: 'Share authentic lifestyle content to build a loyal following',
      platform: 'Instagram',
      goalExample: 'Build an engaged community of 50K followers',
    },
    {
      id: 'entertainment',
      title: 'Entertainment Strategy',
      description: 'Create engaging entertainment content for maximum audience retention',
      platform: 'TikTok',
      goalExample: 'Reach 1M total likes across content',
    },
    {
      id: 'business-growth',
      title: 'Business Growth Strategy',
      description: 'Convert social media presence into business opportunities',
      platform: 'Instagram',
      goalExample: 'Generate 100 qualified leads per month',
    },
    {
      id: 'tech-review',
      title: 'Tech Review Strategy',
      description: 'Build authority in tech reviews and comparisons',
      platform: 'YouTube',
      goalExample: 'Achieve 10K watch hours in tech reviews',
    },
    {
      id: 'creative-arts',
      title: 'Creative Arts Strategy',
      description: 'Showcase artistic talent and creative process',
      platform: 'Instagram',
      goalExample: 'Build a portfolio with 30K followers',
    },
    {
      id: 'short-form',
      title: 'Short-Form Content Strategy',
      description: 'Master the art of impactful short-form video content',
      platform: 'TikTok',
      goalExample: 'Achieve 500K views per video average',
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

  const handleStrategyClick = (strategyId) => {
    setSelectedStrategy(strategyId);
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
      <div className={`sticky flex top-0 right-0 left-0 -px-8 ${showTransition? "transition-color duration-200":"" }  ${scrolled? "backdrop-blur-lg bg-[#150F1D]/50": ""} my-5 py-3 z-10`}>
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
                  key={rowIndex}
                  className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-all duration-700 ${
                    rowIndex < visibleRows 
                      ? 'opacity-100 transform translate-y-0' 
                      : 'opacity-0 transform translate-y-20 pointer-events-none'
                  }`}
                >
                  {row.map((strategy) => (
                    <div 
                      key={strategy.id}
                      className={`rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                        selectedStrategy === strategy.id 
                          ? 'bg-[#5E15EB] text-white ring-4 ring-purple-400' 
                          : 'bg-[#B28FFA4F] text-white hover:bg-[#5E15EB]/50'
                      }`}
                      onClick={() => handleStrategyClick(strategy.id)}
                    >
                      <div className="p-5 h-full flex flex-col">
                        <div className="mb-4">
                          <span className="bg-white/20 text-white px-2 py-1 rounded-full text-sm">
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
              selectedStrategy ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
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
