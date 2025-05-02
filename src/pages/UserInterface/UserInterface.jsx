import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearUserData } from '../../store/slices/userSlice';
import { setPageTitle } from '../../utils/pageTitle';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Calendar from './components/Calendar';
import TaskTracker from './components/TaskTracker';
import PerformanceAnalytics from './components/PerformanceAnalytics';
import Profile from './components/Profile';

function UserInterface() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    setPageTitle('User Dashboard');
    
    if (!localStorage.getItem('userEmail')) {
      navigate('/login');
    }
    
    // Check for tab parameter in URL whenever location changes
    const queryParams = new URLSearchParams(location.search);
    const tabParam = queryParams.get('tab');
    
    if (tabParam) {
      setActiveTab(tabParam);
      // Clean up the URL after reading the parameter (optional)
      navigate('/userinterface', { replace: true });
      
      // Set page title based on the tab
      setPageTitle(tabParam.charAt(0).toUpperCase() + tabParam.slice(1));
    }
  }, [location, navigate]);

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
