import { useState } from 'react';
import { FiMail, FiTrash2 } from 'react-icons/fi';

function UnactiveUsers() {
  const [unactiveUsers, setUnactiveUsers] = useState([
    {
      id: 1,
      name: 'Bob Wilson',
      email: 'bob@example.com',
      lastActive: '2024-01-01',
      inactiveDays: 50,
      status: 'inactive'
    },
    // Add more mock data as needed
  ]);

  const handleSendReminder = (userId) => {
    // Implement reminder email logic
    console.log('Sending reminder to user:', userId);
  };

  const handleDeleteUser = (userId) => {
    setUnactiveUsers(unactiveUsers.filter(user => user.id !== userId));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white mb-8">Unactive Users</h1>

      <div className="bg-[#1F0B38] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#5D17E9]/20">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Last Active</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Inactive Days</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#5D17E9]/10">
              {unactiveUsers.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-white">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-white">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-white">{user.lastActive}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                      {user.inactiveDays} days
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleSendReminder(user.id)}
                      className="text-blue-500 hover:text-blue-700 mr-4"
                    >
                      <FiMail size={20} />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FiTrash2 size={20} />
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

export default UnactiveUsers;