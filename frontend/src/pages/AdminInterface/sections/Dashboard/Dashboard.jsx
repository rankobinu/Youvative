import { useState, useEffect } from 'react';
import { FiUsers, FiUserPlus, FiUserX, FiRefreshCw } from 'react-icons/fi';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import adminService from '../../../../services/adminService';

function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    newUsers: 0,
    activeUsers: 0,
    inactiveUsers: 0,
    resubscribedUsers: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setIsLoading(true);
        const response = await adminService.getDashboardStats();
        setStats({
          totalUsers: response.totalUsers || 0,
          newUsers: response.newUsers || 0,
          activeUsers: response.activeUsers || 0,
          inactiveUsers: response.inactiveUsers || 0,
          resubscribedUsers: response.resubscribedUsers || 0
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        setError(error.message || 'Failed to load dashboard statistics');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  const statCards = [
    {
      title: 'New Users',
      value: stats.newUsers,
      icon: FiUserPlus,
      color: 'from-green-400/70 to-green-600/70',
      textColor: 'text-green-400'
    },
    {
      title: 'Active Users',
      value: stats.activeUsers,
      icon: FiUsers,
      color: 'from-[#21BFE4]/70 to-blue-600/70',
      textColor: 'text-[#21BFE4]'
    },
    {
      title: 'Inactive Users',
      value: stats.inactiveUsers,
      icon: FiUserX,
      color: 'from-red-400/70 to-red-600/70',
      textColor: 'text-red-400'
    },
    {
      title: 'Resubscribed',
      value: stats.resubscribedUsers,
      icon: FiRefreshCw,
      color: 'from-[#5E15EB]/70 to-purple-700/70',
      textColor: 'text-[#5E15EB]'
    }
  ];

  // Data for the first pie chart: Inactive vs Others
  const inactiveVsOthersData = [
    { name: 'Inactive Users', value: stats.inactiveUsers, color: 'rgba(239, 68, 68, 0.7)' },
    { name: 'Other Users', value: stats.activeUsers + stats.newUsers + stats.resubscribedUsers, color: 'rgba(33, 191, 228, 0.7)' }
  ];

  // Data for the second pie chart: Resubscribed vs (Inactive + Resubscribed)
  const resubscribedVsInactiveData = [
    { name: 'Resubscribed Users', value: stats.resubscribedUsers, color: 'rgba(94, 21, 235, 0.7)' },
    { name: 'Inactive Users', value: stats.inactiveUsers, color: 'rgba(239, 68, 68, 0.7)' }
  ];

  // Custom tooltip for pie charts
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1F0B38]/90 p-3 border border-[#5E15EB]/50 rounded-lg shadow-lg backdrop-blur-md">
          <p className="text-white font-semibold">{`${payload[0].name}: ${payload[0].value}`}</p>
          <p className="text-gray-400 text-sm">{`${Math.round((payload[0].value / stats.totalUsers) * 100)}% of total`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      ) : (
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
            <div className="text-sm text-gray-400">
              <span className="text-[#21BFE4] font-medium">{stats.totalUsers}</span> total users
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statCards.map((card, index) => (
              <div 
                key={index}
                className="bg-white/5 backdrop-blur-md rounded-lg shadow-lg border border-white/10 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`bg-gradient-to-r ${card.color} p-3 rounded-full`}>
                      <card.icon size={24} className="text-white" />
                    </div>
                    <p className="text-gray-400 text-sm font-medium">{card.title}</p>
                  </div>
                  <h2 className="text-3xl font-bold text-white">{card.value}</h2>
                  <p className={`${card.textColor} text-sm mt-2`}>
                    {Math.round((card.value / stats.totalUsers) * 100)}% of total users
                  </p>
                </div>
                <div className={`h-1 w-full bg-gradient-to-r ${card.color}`}></div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white/5 backdrop-blur-md rounded-lg shadow-lg border border-white/10 p-6">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                <span className="inline-block w-2 h-6 bg-[#21BFE4]/70 rounded-full mr-3"></span>
                Inactive vs Other Users
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={inactiveVsOthersData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      innerRadius={40}
                      fill="#8884d8"
                      dataKey="value"
                      startAngle={90}
                      endAngle={-270}
                    >
                      {inactiveVsOthersData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend 
                      layout="vertical" 
                      verticalAlign="middle" 
                      align="right"
                      formatter={(value) => <span className="text-white">{value}</span>}
                      iconType="circle"
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                  <p className="text-gray-400 text-sm">Inactive Rate</p>
                  <div className="flex items-end gap-2">
                    <p className="text-white text-2xl font-bold">
                      {Math.round((stats.inactiveUsers / stats.totalUsers) * 100)}%
                    </p>
                    <p className="text-red-400/80 text-sm mb-1">
                      {stats.inactiveUsers} users
                    </p>
                  </div>
                </div>
                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                  <p className="text-gray-400 text-sm">Active Rate</p>
                  <div className="flex items-end gap-2">
                    <p className="text-white text-2xl font-bold">
                      {Math.round(((stats.totalUsers - stats.inactiveUsers) / stats.totalUsers) * 100)}%
                    </p>
                    <p className="text-[#21BFE4]/80 text-sm mb-1">
                      {stats.totalUsers - stats.inactiveUsers} users
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-md rounded-lg shadow-lg border border-white/10 p-6">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                <span className="inline-block w-2 h-6 bg-[#5E15EB]/70 rounded-full mr-3"></span>
                Resubscribed vs Inactive Users
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={resubscribedVsInactiveData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      innerRadius={40}
                      fill="#8884d8"
                      dataKey="value"
                      startAngle={90}
                      endAngle={-270}
                    >
                      {resubscribedVsInactiveData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend 
                      layout="vertical" 
                      verticalAlign="middle" 
                      align="right"
                      formatter={(value) => <span className="text-white">{value}</span>}
                      iconType="circle"
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                  <p className="text-gray-400 text-sm">Resubscription Rate</p>
                  <div className="flex items-end gap-2">
                    <p className="text-white text-2xl font-bold">
                      {Math.round((stats.resubscribedUsers / (stats.inactiveUsers + stats.resubscribedUsers)) * 100)}%
                    </p>
                    <p className="text-[#5E15EB]/80 text-sm mb-1">
                      {stats.resubscribedUsers} users
                    </p>
                  </div>
                </div>
                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                  <p className="text-gray-400 text-sm">Recovery Potential</p>
                  <div className="flex items-end gap-2">
                    <p className="text-white text-2xl font-bold">
                      {stats.inactiveUsers} users
                    </p>
                    <p className="text-red-400/80 text-sm mb-1">
                      to recover
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;
