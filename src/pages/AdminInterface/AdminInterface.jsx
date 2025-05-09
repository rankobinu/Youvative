import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPageTitle } from "../../utils/pageTitle";
import { useNavigate, useLocation } from 'react-router-dom';
import { clearUserData } from '../../store/slices/userSlice';

// Import components
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import Dashboard from './sections/Dashboard/Dashboard.jsx';
import NewUsers from './sections/NewUsers/NewUsers.jsx';
import ActiveUsers from './sections/ActiveUsers/ActiveUsers.jsx';
import InactiveUsers from './sections/InactiveUsers/InactiveUsers.jsx';
import ResubscribedUsers from './sections/ResubscribedUsers/ResubscribedUsers.jsx';

const ADMIN_CREDENTIALS = {
  email: "m_beyahmedkhernache@estin.dz",
  password: "123456789"
};

function AdminInterface() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
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
    
    // Check for tab parameter in URL whenever location changes
    const queryParams = new URLSearchParams(location.search);
    const tabParam = queryParams.get('tab');
    
    if (tabParam) {
      setActiveTab(tabParam);
      // Clean up the URL after reading the parameter (optional)
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
      case 'inactive-users':
        return <InactiveUsers />;
      case 'resubscribed-users':
        return <ResubscribedUsers />;
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
