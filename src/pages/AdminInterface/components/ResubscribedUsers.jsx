import { useState } from 'react';
import { FiCheckCircle } from 'react-icons/fi';

function ResubscribedUsers() {
  const [resubscribedUsers, setResubscribedUsers] = useState([
    {
      id: 1,
      name: 'Charlie Brown',
      email: 'charlie@example.com',
      resubscribedDate: '2024-02-15',
      previousPlan: 'Basic',
      newPlan: 'Premium',
      status: 'resubscribed'
    },
    // Add more mock data as needed
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white mb-8">Resubscribed Users</h1>

      <div className="bg-[#1F0B38] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#5D17E9]/20">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Resubscribed Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Previous Plan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">New Plan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#5D17E9]/10">
              {resubscribedUsers.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-white">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-white">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-white">{user.resubscribedDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-400">{user.previousPlan}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                      {user.newPlan}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="flex items-center text-green-500">
                      <FiCheckCircle size={20} className="mr-2" />
                      Resubscribed
                    </span>
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

export default ResubscribedUsers;