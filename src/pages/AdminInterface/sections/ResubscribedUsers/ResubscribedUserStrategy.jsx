import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaTiktok, FaYoutube, FaInstagram } from "react-icons/fa";
import { FiArrowLeft, FiPlus, FiCalendar, FiCheckCircle, FiXCircle, FiClock } from 'react-icons/fi';
import Navbar from '../../components/Navbar.jsx';
import Sidebar from '../../components/Sidebar.jsx';
import Select from 'react-select';

function UserStrategy() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const activeTab='resubscribed-users';
  // Custom Select Styles
  const customSelectStyles = {
    control: (base) => ({
      ...base,
      background: 'rgba(255, 255, 255, 0.05)',
      border: 'none',
      boxShadow: 'none',
      padding: '0',
      '&:hover': {
        border: 'none'
      }
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected ? '#5E15EB' : 'rgba(178, 143, 250, 0.5)',
      color: 'white',
      '&:hover': {
        backgroundColor: '#5E15EB'
      }
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: 'rgba(178, 143, 250, 0.31)',
      backdropFilter: 'blur(10px)'
    }),
    singleValue: (base) => ({
      ...base,
      color: 'white'
    }),
    placeholder: (base) => ({
      ...base,
      color: 'rgba(255, 255, 255, 0.5)'
    })
  };
  // Options for the Select component
  const taskTypes=[
    { value: "video", label: "Video" },
    { value: "story", label: "Story" },
    { value: "reel", label: "Real" },
    { value: "post", label: "Post" }   
  ]

  // Strategy data states
  const [generalStrategy, ] = useState({
    headline: 'Build a Consistent TikTok Presence',
    description: 'Focus on creating a recognizable personal brand through consistent posting schedule and visual identity. Leverage trending sounds and hashtags while maintaining your unique style to stand out in the algorithm.'
  });
  
  const [monthlyStrategy, ] = useState({
    goal: 'Increase engagement rate by 15% and gain 500 new followers by creating consistent, high-quality content that resonates with the target audience.',
    tasks: [
      {
        id: 1,
        date: '2024-05-10',
        type: 'Reel',
        title: 'Day in the Life',
        purpose: 'Show authentic behind-the-scenes to connect with audience',
        completed: true,
        status: 'done'
      },
      {
        id: 2,
        date: '2024-05-15',
        type: 'Story',
        title: 'Q&A Session',
        purpose: 'Increase engagement through direct interaction',
        completed: false,
        status: 'missed'
      },
      {
        id: 3,
        date: '2024-05-20',
        type: 'Video',
        title: 'Product Review',
        purpose: 'Showcase expertise and provide value to followers',
        completed: false,
        status: 'upcoming'
      },
      {
        id: 4,
        date: '2024-05-25',
        type: 'Reel',
        title: 'Trending Challenge',
        purpose: 'Leverage current trends for increased reach',
        completed: false,
        status: 'upcoming'
      },
      {
        id: 5,
        date: '2024-05-05',
        type: 'Post',
        title: 'Motivational Quote',
        purpose: 'Inspire audience and reinforce brand values',
        completed: true,
        status: 'done'
      }
    ]
  });

  // Task counts
  const [taskCounts, setTaskCounts] = useState({
    done: 0,
    missed: 0,
    upcoming: 0
  });
  
  // Strategy setting states
  const [showStrategyForms, setShowStrategyForms] = useState(false);
  const [monthlyGoal, setMonthlyGoal] = useState('');
  const [tasks, setTasks] = useState([]);
  
  // New task form states
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [taskDate, setTaskDate] = useState('');
  const [taskType, setTaskType] = useState(null); // Changed from '' to null for react-select
  const [taskTitle, setTaskTitle] = useState('');
  const [taskPurpose, setTaskPurpose] = useState('');
  
  // Success message states
  const [monthlyStrategySet, setMonthlyStrategySet] = useState(false);

  // Custom setActiveTab function to handle navigation
  const handleTabChange = (tabId) => {
    // Navigate to the admin interface with the selected tab as a URL parameter
    navigate(`/admin?tab=${tabId}`);
  };

 // Fetch user info when component mounts
 useEffect(() => {
  // This should be replaced with an API call that fetches user data by userId
  setUserInfo({
    id: userId,
    userName: 'John Doe',
    email: 'john@example.com',
    instagram: '@johndoe',
    location: 'Algeria, DZ',
    goals: 'Grow audience and increase engagement',
    description: 'Content creator focused on lifestyle and tech reviews',
    registrationDate: '2024-02-20',
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=John${userId}`,
    plan: 'Growth Plan',
    strategy: 'Branding Strategy'
  });
  
  // Calculate task counts
  const counts = {
    done: monthlyStrategy.tasks.filter(task => task.status === 'done').length,
    missed: monthlyStrategy.tasks.filter(task => task.status === 'missed').length,
    upcoming: monthlyStrategy.tasks.filter(task => task.status === 'upcoming').length
  };
  setTaskCounts(counts);
  
  // In a real app, you would fetch the general and monthly strategies here
}, [userId, monthlyStrategy.tasks]);

  const handleSignOut = () => {
    localStorage.removeItem('adminEmail');
    localStorage.removeItem('adminPassword');
    navigate('/login');
  };

  // Map of strategy icons
  const strategyIcons = {
    'Branding Strategy': {platformIcon:<FaTiktok className="text-2xl"/>,platform:'TikTok' },
    'Engagement Booster': {platformIcon:<FaInstagram className="text-2xl" />,platform:'Instagram'},
    'YouTube Starter Kit': {platformIcon:<FaYoutube className="text-2xl" />,platform:'YouTube'},
    'Growth Boost': {platformIcon:<FaInstagram className="text-2xl" /> ,platform:'Instagram'},
    'Niche Domination': {platformIcon:<div className="flex gap-2"><FaTiktok className="text-2xl" /><FaYoutube className="text-2xl" /><FaInstagram className="text-2xl" /></div>,platform:'TikTok, YouTube, Instagram'}
  };

  // Strategy descriptions
  const strategyDescriptions = {
    'Branding Strategy': 'Build a consistent and professional personal brand with 3 reels/week + Q&A scheme guide',
    'Engagement Booster': 'Improve interaction and comments on posts with a goal of +20% engagement rate',
    'YouTube Starter Kit': 'Align content between platforms for wider reach with 2 videos/week + Q&A post',
    'Growth Boost': 'Increase reach and attract new followers with a goal of +500 followers in 1 month',
    'Niche Domination': 'Focus on dominating a specific niche with weekly expert content across platforms'
  };
  
  // Handle adding a new task
  const handleAddTask = () => {
    if (!taskDate || !taskType || !taskTitle || !taskPurpose) {
      alert('Please fill in all task fields');
      return;
    }
    
    const newTask = {
      id: Date.now(),
      date: taskDate,
      type: taskType.value, // Extract value from the Select component option
      title: taskTitle,
      purpose: taskPurpose,
      completed: false,
      status: 'upcoming'
    };
    
    setTasks([...tasks, newTask]);
    
    // Reset form fields
    setTaskDate('');
    setTaskType(null); // Reset to null for react-select
    setTaskTitle('');
    setTaskPurpose('');
    setShowTaskForm(false);
  };
  
  // Handle setting general strategy
  
  
  // Handle setting monthly strategy
  const handleSetMonthlyStrategy = () => {
    if (!monthlyGoal || tasks.length === 0) {
      alert('Please set a monthly goal and add at least one task');
      return;
    }
    
    // Here you would make an API call to save the monthly strategy and tasks
    console.log('Setting monthly strategy:', { monthlyGoal, tasks });
    setMonthlyStrategySet(true);
    
    // Show success message for 3 seconds
    setTimeout(() => {
      setMonthlyStrategySet(false);
    }, 3000);
  };

  if (!userInfo) {
    return (
      <div className="flex flex-col h-screen bg-[#29104A]">
        <Navbar 
          handleSignOut={handleSignOut}
          showDropdown={showDropdown}
          setShowDropdown={setShowDropdown}
        />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar 
            activeTab={activeTab}
            setActiveTab={handleTabChange}
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
          />
          <div className="flex-1 overflow-auto p-6 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-[#29104A]">
      <Navbar 
        handleSignOut={handleSignOut}
        showDropdown={showDropdown}
        setShowDropdown={setShowDropdown}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          activeTab={activeTab}
          setActiveTab={handleTabChange}
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
        />

        <div className="flex-1 overflow-auto p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => navigate('/admin?tab=resubscribed-users')}
              className="flex items-center text-gray-400 hover:text-white transition-colors"
            >
              <FiArrowLeft className="mr-2" /> Back to Resubscribed Users
            </button>
          </div>

          {/* User Profile Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Profile Information
            </h2>
            
            <div className="flex gap-6 flex-col md:flex-row">
              {/* Profile Information Section */}
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg flex-1">
                <div className="flex items-center space-x-4 mb-6">
                  <img
                    src={userInfo.avatar}
                    alt={userInfo.userName}
                    className="w-16 h-16 rounded-full border-2 border-[ffffff]"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-white">{userInfo.userName}</h3>
                    <p className="text-gray-400">{userInfo.occupation || 'Content Creator'}</p>
                  </div>
                </div>
                
                <div className="space-y-4 text-white">
                  <div className="flex space-x-2">
                    <p className="text-white font-semibold">Email:</p>
                    <p>{userInfo.email}</p>
                  </div>
                  <div className="flex space-x-2">
                    <p className="text-white font-semibold">Instagram:</p>
                    <p>{userInfo.instagram}</p>
                  </div>
                  <div className="flex space-x-2">
                    <p className="text-white font-semibold">Location:</p>
                    <p>{userInfo.location}</p>
                  </div>
                  <div className="flex space-x-2">
                    <p className="text-white font-semibold">Goals:</p>
                    <p>{userInfo.goals}</p>
                  </div>
                  <div className="flex space-x-2">
                    <p className="text-white font-semibold">Description:</p>
                    <p>{userInfo.description}</p>
                  </div>
                </div>
              </div>

              {/* Subscription Details Section */}
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg flex-1">
                <h3 className="text-xl font-semibold mb-4 text-white">Subscription Details</h3>
                <div className="space-y-4">
                  <div className="bg-white/5 p-4 rounded">
                    <p className="text-[#21BFE4] font-semibold">Selected Plan</p>
                    <p className="text-white">{userInfo.plan}</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded">
                    <p className="text-[#21BFE4] font-semibold">Selected Strategy</p>
                    <p className="text-white">{userInfo.strategy}</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded">
                    <p className="text-[#21BFE4] font-semibold">Registration Date</p>
                    <p className="text-white">{userInfo.registrationDate}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Strategy Details Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Strategy Details
            </h2>
            
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg">
              <div className="flex items-center gap-4 mb-4">
                {strategyIcons[userInfo.strategy].platformIcon || <FaInstagram className="text-2xl text-white" />}
                <h3 className="text-xl font-bold text-white">{userInfo.strategy}</h3>
              </div>
              
              <p className="text-gray-300 mb-6">
                {strategyDescriptions[userInfo.strategy] || 'Custom strategy for content creation and audience growth.'}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded">
                  <p className="text-[#21BFE4] font-semibold">Platform Focus</p>
                  <div className="flex gap-2 mt-2 text-white">
                    {strategyIcons[userInfo.strategy].platform || <FaInstagram className="text-2xl" />}
                  </div>
                </div>
                
                <div className="bg-white/5 p-4 rounded">
                  <p className="text-[#21BFE4] font-semibold">Status</p>
                  <div className="flex items-center mt-2">
                  <span className='px-2 py-[0.25em] text-sm font-semibold rounded-full bg-white text-yellow-800'>
                    pending
                  </span>
                  </div>
                </div>
              </div>
            </div>
          </div>


          {/* General Strategy Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-white mb-4">
              General Strategy
            </h2>
            
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2">{generalStrategy.headline}</h3>
                <p className="text-gray-300">
                  {generalStrategy.description}
                </p>
              </div>
            </div>
          </div>


          {/* Monthly Strategy Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Last Active Month Achievement
            </h2>
                      
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2">Monthly Goal</h3>
                <p className="text-gray-300">
                  {monthlyStrategy.goal}
                </p>
                </div>
                        
                {/* Task Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white/5 p-4 rounded">
                    <div className="flex justify-between items-center">
                      <p className="text-[#21BFE4] font-semibold">Done Tasks</p>
                      <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-semibold">
                        {taskCounts.done}
                      </span>
                    </div>
                  </div>
                          
                  <div className="bg-white/5 p-4 rounded">
                            <div className="flex justify-between items-center">
                              <p className="text-[#21BFE4] font-semibold">Missed Tasks</p>
                              <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm font-semibold">
                                {taskCounts.missed}
                              </span>
                            </div>
                  </div>
                          
                  <div className="bg-white/5 p-4 rounded">
                            <div className="flex justify-between items-center">
                              <p className="text-[#21BFE4] font-semibold">Upcoming Tasks</p>
                              <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm font-semibold">
                                {taskCounts.upcoming}
                              </span>
                            </div>
                  </div>
                </div>
                        
                {/* Task Categories */}
                <div className="space-y-6">
                  {/* Done Tasks */}
                  {monthlyStrategy.tasks.filter(task => task.status === 'done').length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                                <FiCheckCircle className="text-green-400 mr-2" /> Done Tasks
                      </h3>
                      <div className="space-y-3">
                        {monthlyStrategy.tasks
                          .filter(task => task.status === 'done')
                          .map(task => (
                            <div key={task.id} className="bg-white/5 p-4 rounded-lg flex items-start justify-between border-l-4 border-green-400">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                          <span className="text-[#21BFE4] font-semibold">{task.date}</span>
                                          <span className="text-white">{task.title}</span>
                                </div>
                                <p className="text-gray-400">{task.purpose}</p>
                              </div>
                              <div className="flex items-center">
                                <span className="text-[#21BFE4] font-semibold mr-2">{task.type}</span>
                                  <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">
                                    Completed
                                  </span>
                              </div>
                      </div>
                                  ))}
                      </div>
                    </div>
                  )}
                          
                  {/* Missed Tasks */}
                  {monthlyStrategy.tasks.filter(task => task.status === 'missed').length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                                <FiXCircle className="text-red-400 mr-2" /> Missed Tasks
                      </h3>
                      <div className="space-y-3">
                        {monthlyStrategy.tasks
                          .filter(task => task.status === 'missed')
                          .map(task => (
                            <div key={task.id} className="bg-white/5 p-4 rounded-lg flex items-start justify-between border-l-4 border-red-400">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-[#21BFE4] font-semibold">{task.date}</span>
                                  <span className="text-white">{task.title}</span>
                                </div>
                                <p className="text-gray-400">{task.purpose}</p>
                              </div>
                              <div className="flex items-center">
                                <span className="text-[#21BFE4] font-semibold mr-2">{task.type}</span>
                                <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs">
                                  Missed
                                </span>
                              </div>
                            </div>
                        ))}
                      </div>
                    </div>
                  )}
                                           
                </div>
              </div>
            </div>

          {/* Strategy Setting Forms (shown after clicking Set Strategy) */}
          {showStrategyForms && (
            <div className="mt-8 space-y-8">            
              
              {/* Monthly Strategy Section */}
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg">
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Set Current Month Strategy
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-white mb-2">Monthly Goal</label>
                    <textarea
                      value={monthlyGoal}
                      onChange={(e) => setMonthlyGoal(e.target.value)}
                      placeholder="Describe the goal for this month"
                      className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white min-h-[100px]"
                    />
                  </div>
                  
                  {/* Task List */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-semibold text-white">Tasks</h3>
                      <button
                        onClick={() => setShowTaskForm(true)}
                        className="flex items-center px-4 py-2 bg-[#5D17E9]/70 hover:bg-[#5D17E9] text-white rounded-lg transition-colors"
                      >
                        <FiPlus className="mr-2" /> Add Task
                      </button>
                    </div>
                    
                    {/* Task Form */}
                    {showTaskForm && (
                      <div className="bg-white/5 p-4 rounded-lg mb-4">
                        <h4 className="text-lg font-semibold text-white mb-3">New Task</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-white mb-1">Date</label>
                            <input
                              type="date"
                              value={taskDate}
                              onChange={(e) => setTaskDate(e.target.value)}
                              className="w-full p-2 bg-white/5 border border-white/20 rounded-lg text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-white mb-1">Type</label>
                            <Select
                              styles={customSelectStyles}
                              options={taskTypes}
                              value={taskType}
                              onChange={(selectedOption) => setTaskType(selectedOption)}
                              placeholder="Select task type"
                              className="w-full bg-white/5 border border-white/20 rounded-lg text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-white mb-1">Title</label>
                            <input
                              type="text"
                              value={taskTitle}
                              onChange={(e) => setTaskTitle(e.target.value)}
                              placeholder="Task title"
                              className="w-full p-2 bg-white/5 border border-white/20 rounded-lg text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-white mb-1">Purpose</label>
                            <input
                              type="text"
                              value={taskPurpose}
                              onChange={(e) => setTaskPurpose(e.target.value)}
                              placeholder="Task purpose"
                              className="w-full p-2 bg-white/5 border border-white/20 rounded-lg text-white"
                            />
                          </div>
                        </div>
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => setShowTaskForm(false)}
                            className="px-4 py-2 rounded-lg font-semibold bg-gray-600 text-white hover:bg-gray-700 transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleAddTask}
                            className="px-4 py-2 rounded-lg font-semibold bg-[#5D17E9] text-white hover:bg-[#4A12BA] transition-colors"
                          >
                            Add Task
                          </button>
                        </div>
                      </div>
                    )}
                    
                    {/* Task List */}
                    {tasks.length > 0 ? (
                      <div className="space-y-3">
                        {tasks.map(task => (
                          <div key={task.id} className="bg-white/5 p-4 rounded-lg flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-[#21BFE4] font-semibold">{task.date}</span>
                                <span className="text-white">{task.title}</span>
                              </div>
                              <p className="text-gray-400">{task.purpose}</p>
                            </div>
                            <div className="flex items-center">
                              <span className="text-[#21BFE4] font-semibold mr-2">{task.type}</span>
                              <span className="text-white">{!task.completed ? 'Pending' : 'Completed'}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-white/5 p-4 rounded-lg text-white text-center">
                        No tasks added yet.
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      onClick={handleSetMonthlyStrategy}
                      className="px-6 py-3 rounded-lg font-semibold bg-[#5D17E9] text-white hover:bg-[#4A12BA] transition-colors"
                    >
                      Set Monthly Strategy
                    </button>
                  </div>
                  
                  {monthlyStrategySet && (
                    <div className="mt-2 p-3 bg-green-500/20 border border-green-500 rounded-lg text-green-400 flex items-center">
                      <FiCheckCircle className="mr-2" /> Monthly strategy has been set successfully!
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-8">
            <button
              onClick={() => navigate('/admin')}
              className="px-6 py-3 rounded-lg font-semibold bg-gray-600 text-white hover:bg-gray-700 transition-colors"
            >
              Back to Dashboard
            </button>
            
            <button
              onClick={() => {
                // Here you would implement the logic to approve the user
                setShowStrategyForms(true)               
              }}
              className="px-6 py-3 rounded-lg font-semibold bg-[#5D17E9] text-white hover:bg-[#4A12BA] transition-colors"
            >
              Set Strategy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserStrategy;
