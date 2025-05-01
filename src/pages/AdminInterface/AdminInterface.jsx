import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from "../../utils/pageTitle";
import { useNavigate, useLocation } from 'react-router-dom';
import { clearUserData } from '../../store/slices/userSlice';

// Import components
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import Dashboard from './sections/Dashboard/Dashboard.jsx';
import NewUsers from './sections/NewUsers/NewUsers.jsx';
import ActiveUsers from './sections/ActiveUsers/ActiveUsers.jsx';
import UnactiveUsers from './sections/UnactiveUsers/UnactiveUsers.jsx';
import ResubscribedUsers from './sections/ResubscribedUsers/ResubscribedUsers.jsx';
import NewUserStrategy from './sections/NewUsers/NewUserStrategy.jsx';
import ActiveUserStrategy from './sections/ActiveUsers/ActiveUserStrategy.jsx';
import UnactiveUserStrategy from './sections/UnactiveUsers/UnactiveUserStrategy.jsx';
import ResubscribedUserStrategy from './sections/ResubscribedUsers/ResubscribedUserStrategy.jsx';

const ADMIN_CREDENTIALS = {
  email: "m_beyahmedkhernache@estin.dz",
  password: "123456789"
};

function AdminInterface() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  //const userData = useSelector((state) => state.user);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    setPageTitle('Admin Dashboard');
    const adminEmail = localStorage.getItem('adminEmail');
    const adminPassword = localStorage.getItem('adminPassword');
    
    if (adminEmail !== ADMIN_CREDENTIALS.email || adminPassword !== ADMIN_CREDENTIALS.password) {
      navigate('/login');
    }
  }, [navigate]);

  // Check for tab parameter in URL whenever location changes
  useEffect(() => {
    // Get tab from URL query parameters
    const queryParams = new URLSearchParams(location.search);
    const tabParam = queryParams.get('tab');
    
    if (tabParam) {
      setActiveTab(tabParam);
      // Clean up the URL after reading the parameter
      navigate('/admin', { replace: true });
    }
  }, [location, navigate]);

  const handleSignOut = () => {
    localStorage.removeItem('adminEmail');
    localStorage.removeItem('adminPassword');
    dispatch(clearUserData());
    navigate('/login');
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'new-users':
        return <NewUsers />;
      case 'active-users':
        return <ActiveUsers />;
      case 'unactive-users':
        return <UnactiveUsers />;
      case 'resubscribed-users':
        return <ResubscribedUsers />;
      case 'new-user-strategy':
        return < NewUserStrategy />;
        case 'active-user-strategy':
        return < ActiveUserStrategy />;
        case 'unactive-user-strategy':
        return < UnactiveUserStrategy />;
        case 'resubscribed-user-strategy':
        return < ResubscribedUserStrategy />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#29104A]">
      <Navbar 
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

export default AdminInterface;
