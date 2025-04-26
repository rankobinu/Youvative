import { useState } from 'react';
import { FiMoreVertical } from 'react-icons/fi';

function ActiveUsers() {
  const [activeUsers, setActiveUsers] = useState([
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice@example.com',
      lastActive: '2024-02-20',
      subscription: 'Premium',
      status: 'active'
    },
    // Add more mock data as needed
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white mb-8">Active Users</h1>

      <div className="bg-[#1F0B38] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#5D17E9]/20">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Last Active</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Subscription</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#5D17E9]/10">
              {activeUsers.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-white">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-white">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-white">{user.lastActive}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {user.subscription}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-gray-400 hover:text-white">
                      <FiMoreVertical size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ActiveUsers;