import { useState } from 'react';
import { FiCheck, FiX } from 'react-icons/fi';

function NewUsers() {
  const [newUsers, setNewUsers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      registrationDate: '2024-02-20',
      status: 'pending'
    },
    // Add more mock data as needed
  ]);

  const handleApprove = (userId) => {
    setNewUsers(newUsers.map(user => 
      user.id === userId ? {...user, status: 'approved'} : user
    ));
  };

  const handleReject = (userId) => {
    setNewUsers(newUsers.map(user => 
      user.id === userId ? {...user, status: 'rejected'} : user
    ));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white mb-8">New User Requests</h1>

      <div className="bg-[#1F0B38] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#5D17E9]/20">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Registration Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#5D17E9]/10">
              {newUsers.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-white">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-white">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-white">{user.registrationDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${user.status === 'approved' ? 'bg-green-100 text-green-800' : 
                        user.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                        'bg-yellow-100 text-yellow-800'}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleApprove(user.id)}
                      className="text-green-500 hover:text-green-700 mr-4"
                      disabled={user.status !== 'pending'}
                    >
                      <FiCheck size={20} />
                    </button>
                    <button
                      onClick={() => handleReject(user.id)}
                      className="text-red-500 hover:text-red-700"
                      disabled={user.status !== 'pending'}
                    >
                      <FiX size={20} />
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

export default NewUsers;