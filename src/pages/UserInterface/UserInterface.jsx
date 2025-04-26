import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPageTitle } from "../../utils/pageTitle";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { clearUserData } from '../../store/slices/userSlice';

function UserInterface() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);

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

  return (
    <div className="bg-[#29104A] w-full min-h-screen p-8 text-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">User Dashboard</h1>
        <button
          onClick={handleSignOut}
          className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded transition-colors duration-300"
        >
          Sign Out
        </button>
      </div>

      <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Welcome  {userData.userName || localStorage.getItem('userName')}. your strategy will be ready within 24 hours.
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/5 p-4 rounded">
            <h3 className="text-xl font-semibold mb-2">Profile Information</h3>
            <p className="mb-2">
              <span className="font-semibold">Email:</span> {userData.email || localStorage.getItem('userEmail')}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Instagram:</span> {userData.instagram || localStorage.getItem('userInsta')}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Location:</span> {userData.location || localStorage.getItem('userLocation')}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Goals:</span> {userData.goals || localStorage.getItem('userGoals')}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Content Description:</span> {userData.description || localStorage.getItem('userDescription')}
            </p>
          </div>
          
          <div className="bg-white/5 p-4 rounded">
            <h3 className="text-xl font-semibold mb-2">Subscription Details</h3>
            <div className="space-y-2">
              <div className="bg-white/5 p-3 rounded">
                <p className="font-semibold text-[#21BFE4]">Selected Plan</p>
                <p className="text-lg">{userData.planTitle || localStorage.getItem('userPlanTitle')}</p>
              </div>
              <div className="bg-white/5 p-3 rounded">
                <p className="font-semibold text-[#21BFE4]">Selected Strategy</p>
                <p className="text-lg">{userData.strategyTitle || localStorage.getItem('userStrategyTitle')}</p>
              </div>
              <div className="bg-white/5 p-3 rounded">
                <p className="font-semibold text-[#21BFE4]">Payment Status</p>
                <p className="text-lg">
                  {localStorage.getItem('paymentCompleted') === 'true' ? (
                    <span className="text-green-400">Active</span>
                  ) : (
                    <span className="text-yellow-400">Pending</span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <RouterLink to="/homepage">
          <button className="bg-[#5D17E9] text-xl text-black rounded-sm py-2 px-6 font-bold transition-transform hover:scale-105 duration-300 cursor-pointer">
            Back to Home
          </button>
        </RouterLink>
      </div>
    </div>
  );
}

export default UserInterface;
