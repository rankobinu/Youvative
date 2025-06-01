import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearUserData } from '../../store/slices/userSlice';
import { useNavigate, useLocation } from 'react-router-dom';

// Import components
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import Dashboard from './sections/Dashboard/Dashboard.jsx';
import NewUsers from './sections/NewUsers/NewUsers.jsx';
import ActiveUsers from './sections/ActiveUsers/ActiveUsers.jsx';
import InactiveUsers from './sections/InactiveUsers/InactiveUsers.jsx';
import ResubscribedUsers from './sections/ResubscribedUsers/ResubscribedUsers.jsx';

// Admin email for role-based access control
const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || "m_beyahmedkhernache@estin.dz";

function AdminInterface() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    // Check if user is authenticated and is admin
    const checkAdminAuth = () => {
      setIsCheckingAuth(true);
      
      const token = localStorage.getItem('authToken');
      const userEmail = localStorage.getItem('userEmail');
      
      if (!token || userEmail !== ADMIN_EMAIL) {
        navigate('/login');
        return;
      }
      
      setIsAdminAuthenticated(true);
      setIsCheckingAuth(false);
    };
    
    checkAdminAuth();
    
    // Check for tab parameter in URL whenever location changes
    const queryParams = new URLSearchParams(location.search);
    const tabParam = queryParams.get('tab');
    
    if (tabParam) {
      setActiveTab(tabParam);
      // Clean up the URL after reading the parameter
      navigate('/admin', { replace: true });
    }
  }, [location, navigate]);

  const handleSignOut = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    setIsAdminAuthenticated(false);
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

  // Show loading state while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#29104A]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  // If not authenticated, this component shouldn't render anything
  // The useEffect will redirect to login
  if (!isAdminAuthenticated) {
    return null;
  }

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
