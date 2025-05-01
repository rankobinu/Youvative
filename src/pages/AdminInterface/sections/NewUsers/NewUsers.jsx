// Move your existing NewUsers.jsx code here
// ... existing NewUsers component code ...
import { FiCheck, FiX, FiArrowRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

function NewUsers() {
  const navigate = useNavigate();
  const newUsers=[
    {
      id: 1,
      username: 'John Doe',
      instagram: '@johndoe',
      email: 'john@example.com',
      occupation: 'Content Creator',
      registrationDate: '2024-02-20',
      status: 'pending',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John' // Using DiceBear for demo avatars
    },
    {
      id: 2,
      username: 'Sarah Smith',
      instagram: '@sarahsmith',
      email: 'sarah@example.com',
      occupation: 'Fitness Influencer',
      registrationDate: '2024-02-21',
      status: 'pending',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
    },
    // Add more mock data as needed
  ];
 

  const handleSetStrategy = (userId) => {
    // Navigate to user info page with the user ID
    navigate(`/admin/user/${userId}/newuserstrategy`);
  };

  return (
    <div className="space-y-6 p-4">
      <h1 className="text-3xl font-bold text-white mb-8">New User Requests</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {newUsers.map((user) => (
          <div 
            key={user.id}
            className="bg-[#B28FFA4F] hover:bg-[#5E15EB]/50 rounded-xl overflow-hidden transition-transform hover:transform hover:scale-105"
          >
            {/* Card Header with Avatar */}
            <div className="relative">
              <div className="h-24 "/>
              <img 
                src={user.avatar}
                alt={user.username}
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-20 h-20 rounded-full border-4 bg-[#5E15EB]/50"
              />
            </div>

            {/* Card Body */}
            <div className="pt-12 p-6 text-center">
              <h3 className="text-xl font-bold text-white mb-1">{user.username}</h3>
              <p className="text-white text-sm mb-2">{user.instagram}</p>
              <p className="text-white font-bold text-sm mb-4">{user.occupation}</p>

              {/* Action Buttons */}
              <div className="flex justify-between  items-center ">
                
                <span className='px-2 py-[0.25em] text-sm font-semibold rounded-full bg-white text-yellow-800'>
                  pending
                </span>

                <button
                  onClick={() => handleSetStrategy(user.id)}
                  className="flex items-center  px-2 py-2 backdrop-blur-md bg-white/20 text-white rounded-lg hover:bg-[#1f0e42] transition-colors cursor-pointer"
                >
                  Set Strategy
                  <FiArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewUsers;
