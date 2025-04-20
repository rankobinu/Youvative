import { useState, useEffect } from 'react';
import { setPageTitle } from "../../utils/pageTitle";
import { Link as RouterLink, useNavigate } from 'react-router-dom';

function UserInterface() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    setPageTitle('Dashboard');


    const savedEmail = localStorage.getItem('userEmail');
    if (!savedEmail) {

      navigate('/login');
    } else {
      setUserEmail(savedEmail);
    }
  }, [navigate]);

  return (
    <div className="bg-[#29104A] w-full min-h-screen p-8 text-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">User Dashboard</h1>
        <button
          onClick={() => {
            localStorage.removeItem('userEmail');
            navigate('/login');
          }}
          className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded transition-colors duration-300"
        >
          Sign Out
        </button>
      </div>

      <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">Welcome, {userEmail}!</h2>
        <p className="mb-4">Your dashboard is under construction. Soon you'll be able to manage your content here.</p>
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
