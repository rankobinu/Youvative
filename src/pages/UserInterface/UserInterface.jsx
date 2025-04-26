import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPageTitle } from "../../utils/pageTitle";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { clearUserData } from '../../store/slices/userSlice';
import logoBlack from "../../assets/svg/logo.svg";
import { FiSettings, FiCalendar, FiClipboard, FiBarChart2, FiGrid } from 'react-icons/fi';

function UserInterface() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setPageTitle('Dashboard');
    if (!localStorage.getItem('userEmail')) {
      navigate('/login');
    }
  }, [navigate]);

  const handleSignOut = () => {
    localStorage.clear();
    dispatch(clearUserData());
    navigate('/login');
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return <DashboardContent userData={userData} />;
      case 'calendar':
        return <div>Calendar Content</div>;
      case 'tasks':
        return <div>Task Tracker Content</div>;
      case 'performance':
        return <div>Performance Analytics Content</div>;
      default:
        return <DashboardContent userData={userData} />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#29104A]">
      {/* Navbar - Moved to top */}
      <div className="h-16 bg-white/10 backdrop-blur-md flex items-center justify-between px-6 border-b border-white/10">
        <img src={logoBlack} alt="Logo" className="h-8" />
        
        <div className="flex items-center space-x-4">
          <span className="text-white">
            {userData.userName || localStorage.getItem('userName')}
          </span>
          <button className="text-white hover:text-[#5D17E9] transition-colors">
            <FiSettings size={24} />
          </button>
        </div>
      </div>

      {/* Main content area with sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div 
          className={`${
            isExpanded ? 'w-64' : 'w-20'
          } bg-[#1F0B38] text-white py-6 px-3 transition-all duration-300 ease-in-out hover:w-64`}
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
        >
          <div className="space-y-8">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                activeTab === 'dashboard' ? 'bg-[#5D17E9] text-white' : 'hover:bg-[#5D17E9]/20'
              }`}
            >
              <FiGrid size={20} className={`${isExpanded ? 'mr-3' : 'mx-auto'}`} />
              <span className={`${isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0'} transition-all duration-300 whitespace-nowrap`}>
                Dashboard
              </span>
            </button>

            <button 
              onClick={() => setActiveTab('calendar')}
              className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                activeTab === 'calendar' ? 'bg-[#5D17E9] text-white' : 'hover:bg-[#5D17E9]/20'
              }`}
            >
              <FiCalendar size={20} className={`${isExpanded ? 'mr-3' : 'mx-auto'}`} />
              <span className={`${isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0'} transition-all duration-300 whitespace-nowrap`}>
                Calendar
              </span>
            </button>

            <button 
              onClick={() => setActiveTab('tasks')}
              className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                activeTab === 'tasks' ? 'bg-[#5D17E9] text-white' : 'hover:bg-[#5D17E9]/20'
              }`}
            >
              <FiClipboard size={20} className={`${isExpanded ? 'mr-3' : 'mx-auto'}`} />
              <span className={`${isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0'} transition-all duration-300 whitespace-nowrap`}>
                Task Tracker
              </span>
            </button>

            <button 
              onClick={() => setActiveTab('performance')}
              className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                activeTab === 'performance' ? 'bg-[#5D17E9] text-white' : 'hover:bg-[#5D17E9]/20'
              }`}
            >
              <FiBarChart2 size={20} className={`${isExpanded ? 'mr-3' : 'mx-auto'}`} />
              <span className={`${isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0'} transition-all duration-300 whitespace-nowrap`}>
                Performance Analytics
              </span>
            </button>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

// Dashboard Content Component
function DashboardContent({ userData }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-white mb-4">
        Welcome, {userData.userName || localStorage.getItem('userName')}!
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-white">Profile Information</h3>
          <div className="space-y-2 text-white">
            <p><span className="font-semibold">Email:</span> {userData.email || localStorage.getItem('userEmail')}</p>
            <p><span className="font-semibold">Instagram:</span> {userData.instagram || localStorage.getItem('userInsta')}</p>
            <p><span className="font-semibold">Location:</span> {userData.location || localStorage.getItem('userLocation')}</p>
            <p><span className="font-semibold">Goals:</span> {userData.goals || localStorage.getItem('userGoals')}</p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-white">Subscription Details</h3>
          <div className="space-y-4">
            <div className="bg-white/5 p-4 rounded">
              <p className="text-[#21BFE4] font-semibold">Selected Plan</p>
              <p className="text-white">{userData.planTitle || localStorage.getItem('userPlanTitle')}</p>
            </div>
            <div className="bg-white/5 p-4 rounded">
              <p className="text-[#21BFE4] font-semibold">Selected Strategy</p>
              <p className="text-white">{userData.strategyTitle || localStorage.getItem('userStrategyTitle')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInterface;
