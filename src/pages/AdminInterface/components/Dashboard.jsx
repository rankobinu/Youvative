import { useState, useEffect } from 'react';
import { FiUsers, FiUserPlus, FiUserX, FiRefreshCw } from 'react-icons/fi';

function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    newUsers: 0,
    activeUsers: 0,
    unactiveUsers: 0,
    resubscribedUsers: 0
  });

  // Mock data - Replace with actual API calls
  useEffect(() => {
    // Simulated API data
    setStats({
      totalUsers: 1250,
      newUsers: 48,
      activeUsers: 892,
      unactiveUsers: 310,
      resubscribedUsers: 25
    });
  }, []);

  const statCards = [
    {
      title: 'New Users',
      value: stats.newUsers,
      icon: FiUserPlus,
      color: 'bg-green-500'
    },
    {
      title: 'Active Users',
      value: stats.activeUsers,
      icon: FiUsers,
      color: 'bg-blue-500'
    },
    {
      title: 'Unactive Users',
      value: stats.unactiveUsers,
      icon: FiUserX,
      color: 'bg-red-500'
    },
    {
      title: 'Resubscribed',
      value: stats.resubscribedUsers,
      icon: FiRefreshCw,
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <div 
            key={index}
            className="bg-[#1F0B38] rounded-lg p-6 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">{card.title}</p>
                <h2 className="text-2xl font-bold text-white mt-2">{card.value}</h2>
              </div>
              <div className={`${card.color} p-3 rounded-full`}>
                <card.icon size={24} className="text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-[#1F0B38] rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Recent Activity</h3>
          {/* Add activity chart or list here */}
        </div>
        
        <div className="bg-[#1F0B38] rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4">User Growth</h3>
          {/* Add user growth chart here */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;