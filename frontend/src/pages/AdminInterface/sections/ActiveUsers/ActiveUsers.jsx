import { useState, useEffect } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import adminService from '../../../../services/adminService';

function ActiveUsers() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchActiveUsers = async () => {
      try {
        setIsLoading(true);
        const response = await adminService.getActiveUsers();
        
        if (response.success && response.data) {
          setUsers(response.data.users || []);
          setPagination(response.data.pagination || null);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (error) {
        console.error('Error fetching active users:', error);
        setError(error.message || 'Failed to load active users');
      } finally {
        setIsLoading(false);
      }
    };

    fetchActiveUsers();
  }, []);

  const handleSetStrategy = (userId) => {
    navigate(`/admin/user/${userId}/activeuserstrategy`);
  };

  // Generate avatar URL based on username
  const getAvatarUrl = (username) => {
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`;
  };

  // Format date from backend format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
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
        <div className="space-y-6 p-4">
          <h1 className="text-3xl font-bold text-white mb-8">Active Users</h1>
          
          {pagination && (
            <div className="text-white mb-4">
              Showing {users.length} of {pagination.total} users
            </div>
          )}

          {users.length === 0 ? (
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg text-center">
              <p className="text-white text-lg">No active users found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {users.map((user) => (
                <div 
                  key={user.id}
                  className="bg-[#B28FFA4F] hover:bg-[#5E15EB]/50 rounded-xl overflow-hidden transition-transform hover:transform hover:scale-105"
                >
                  {/* Card Header with Avatar */}
                  <div className="relative">
                    <div className="h-24 "/>
                    <img 
                      src={getAvatarUrl(user.username)}
                      alt={user.username}
                      className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-20 h-20 rounded-full border-4 bg-[#5E15EB]/50"
                    />
                  </div>

                  {/* Card Body */}
                  <div className="pt-12 p-6 text-center">
                    <h3 className="text-xl font-bold text-white mb-1">{user.username}</h3>
                    <p className="text-white text-sm mb-2">{user.email}</p>
                    <p className="text-white text-sm mb-4">Joined: {formatDate(user.created_at)}</p>

                    {/* Action Buttons */}
                    <div className="flex justify-between items-center">
                      
                      <span className='px-3 py-[0.25em] text-sm font-semibold rounded-full bg-white text-green-800'>
                        {user.status}
                      </span>

                      <button
                        onClick={() => handleSetStrategy(user.id)}
                        className="flex items-center gap-2 px-3 py-2 backdrop-blur-md bg-white/20 text-white rounded-lg hover:bg-[#1f0e42] transition-colors cursor-pointer"
                      >
                        View More
                        <FiArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default ActiveUsers;
