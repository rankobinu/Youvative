import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPageTitle } from "../../utils/pageTitle";
import { useNavigate } from 'react-router-dom';
import { clearUserData } from '../../store/slices/userSlice';

// Import components
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Calendar from './components/Calendar';
import TaskTracker from './components/TaskTracker';
import PerformanceAnalytics from './components/PerformanceAnalytics';

function UserInterface() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.user-dropdown')) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'calendar':
        return <Calendar />;
      case 'tasks':
        return <TaskTracker />;
      case 'performance':
        return <PerformanceAnalytics />;
      case 'profile':
        return <Profile userData={userData} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#29104A]">
      <Navbar 
        setActiveTab={setActiveTab}
        handleSignOut={handleSignOut}
        showDropdown={showDropdown}
        setShowDropdown={setShowDropdown}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
        />

        <div className="flex-1 overflow-auto p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default UserInterface;
