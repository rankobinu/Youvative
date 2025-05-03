import { useState, useEffect } from 'react';
import { FiUsers, FiUserPlus, FiUserX, FiRefreshCw } from 'react-icons/fi';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    newUsers: 0,
    activeUsers: 0,
    inactiveUsers: 0,
    resubscribedUsers: 0
  });

  // Mock data - Replace with actual API calls
  useEffect(() => {
    // Simulated API data
    setStats({
      totalUsers: 1250,
      newUsers: 48,
      activeUsers: 892,
      inactiveUsers: 310,
      resubscribedUsers: 25
    });
  }, []);

  const statCards = [
    {
      title: 'New Users',
      value: stats.newUsers,
      icon: FiUserPlus,
      color: 'from-green-400 to-green-600'
    },
    {
      title: 'Active Users',
      value: stats.activeUsers,
      icon: FiUsers,
      color: 'from-[#21BFE4] to-blue-600'
    },
    {
      title: 'Inactive Users',
      value: stats.inactiveUsers,
      icon: FiUserX,
      color: 'from-red-400 to-red-600'
    },
    {
      title: 'Resubscribed',
      value: stats.resubscribedUsers,
      icon: FiRefreshCw,
      color: 'from-[#5E15EB] to-purple-700'
    }
  ];

  // Data for the first pie chart: Inactive vs Others
  const inactiveVsOthersData = [
    { name: 'Inactive Users', value: stats.inactiveUsers, color: '#EF4444' },
    { name: 'Other Users', value: stats.activeUsers + stats.newUsers + stats.resubscribedUsers, color: '#21BFE4' }
  ];

  // Data for the second pie chart: Resubscribed vs (Inactive + Resubscribed)
  const resubscribedVsInactiveData = [
    { name: 'Resubscribed Users', value: stats.resubscribedUsers, color: '#5E15EB' },
    { name: 'Inactive Users', value: stats.inactiveUsers, color: '#EF4444' }
  ];

  // Custom tooltip for pie charts
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1F0B38] p-3 border border-[#5E15EB] rounded-lg shadow-lg backdrop-blur-md">
          <p className="text-white font-semibold">{`${payload[0].name}: ${payload[0].value}`}</p>
          <p className="text-gray-400 text-sm">{`${Math.round((payload[0].value / stats.totalUsers) * 100)}% of total`}</p>
        </div>
      );
    }
    return null;
  };

  return (
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
              <p className="text-gray-400 text-sm mt-2">
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
            <span className="inline-block w-2 h-6 bg-[#21BFE4] rounded-full mr-3"></span>
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
                <p className="text-red-400 text-sm mb-1">
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
                <p className="text-[#21BFE4] text-sm mb-1">
                  {stats.totalUsers - stats.inactiveUsers} users
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white/5 backdrop-blur-md rounded-lg shadow-lg border border-white/10 p-6">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
            <span className="inline-block w-2 h-6 bg-[#5E15EB] rounded-full mr-3"></span>
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
                <p className="text-[#5E15EB] text-sm mb-1">
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
                <p className="text-red-400 text-sm mb-1">
                  to recover
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
