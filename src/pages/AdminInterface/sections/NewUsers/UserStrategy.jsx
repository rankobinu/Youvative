import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaTiktok, FaYoutube, FaInstagram } from "react-icons/fa";
import { FiArrowLeft, FiPlus, FiCalendar, FiCheckCircle } from 'react-icons/fi';
import Navbar from '../../components/Navbar.jsx';
import Sidebar from '../../components/Sidebar.jsx';

function UserStrategy() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState('new-users');
  
  // Strategy setting states
  const [showStrategyForms, setShowStrategyForms] = useState(false);
  const [generalHeadline, setGeneralHeadline] = useState('');
  const [generalStrategy, setGeneralStrategy] = useState('');
  const [monthlyGoal, setMonthlyGoal] = useState('');
  const [tasks, setTasks] = useState([]);
  
  // New task form states
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [taskDate, setTaskDate] = useState('');
  const [taskType, setTaskType] = useState('');
  const [taskTitle, setTaskTitle] = useState('');
  const [taskPurpose, setTaskPurpose] = useState('');
  
  // Success message states
  const [generalStrategySet, setGeneralStrategySet] = useState(false);
  const [monthlyStrategySet, setMonthlyStrategySet] = useState(false);

  // Fetch user info when component mounts
  useEffect(() => {
    // This should be replaced with an API call that fetches user data by userId
    setUserInfo({
      id: userId,
      userName: 'John Doe',
      email: 'john@example.com',
      instagram: '@johndoe',
      location: 'New York, USA',
      goals: 'Grow audience and increase engagement',
      description: 'Content creator focused on lifestyle and tech reviews',
      registrationDate: '2024-02-20',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=John${userId}`,
      plan: 'Growth Plan',
      strategy: 'Branding Strategy'
    });
  }, [userId]);

  const handleSignOut = () => {
    localStorage.removeItem('adminEmail');
    localStorage.removeItem('adminPassword');
    navigate('/login');
  };

  // Map of strategy icons
  const strategyIcons = {
    'Branding Strategy': <FaTiktok className="text-2xl" />,
    'Engagement Booster': <FaInstagram className="text-2xl" />,
    'YouTube Starter Kit': <FaYoutube className="text-2xl" />,
    'Growth Boost': <FaInstagram className="text-2xl" />,
    'Niche Domination': <div className="flex gap-2"><FaTiktok className="text-2xl" /><FaYoutube className="text-2xl" /><FaInstagram className="text-2xl" /></div>
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
      type: taskType,
      title: taskTitle,
      purpose: taskPurpose,
      completed: false
    };
    
    setTasks([...tasks, newTask]);
    
    // Reset form fields
    setTaskDate('');
    setTaskType('');
    setTaskTitle('');
    setTaskPurpose('');
    setShowTaskForm(false);
  };
  
  // Handle setting general strategy
  const handleSetGeneralStrategy = () => {
    if (!generalHeadline || !generalStrategy) {
      alert('Please fill in all general strategy fields');
      return;
    }
    
    // Here you would make an API call to save the general strategy
    console.log('Setting general strategy:', { generalHeadline, generalStrategy });
    setGeneralStrategySet(true);
    
    // Show success message for 3 seconds
    setTimeout(() => {
      setGeneralStrategySet(false);
    }, 3000);
  };
  
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
            setActiveTab={setActiveTab}
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
          setActiveTab={setActiveTab}
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
        />

        <div className="flex-1 overflow-auto p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => navigate('/admin')}
              className="flex items-center text-gray-400 hover:text-white transition-colors"
            >
              <FiArrowLeft className="mr-2" /> Back to New Users
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
                    className="w-16 h-16 rounded-full border-2 border-[#5D17E9]"
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
                {strategyIcons[userInfo.strategy] || <FaInstagram className="text-2xl text-white" />}
                <h3 className="text-xl font-bold text-white">{userInfo.strategy}</h3>
              </div>
              
              <p className="text-gray-300 mb-6">
                {strategyDescriptions[userInfo.strategy] || 'Custom strategy for content creation and audience growth.'}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded">
                  <p className="text-[#21BFE4] font-semibold">Platform Focus</p>
                  <div className="flex gap-2 mt-2 text-white">
                    {strategyIcons[userInfo.strategy] || <FaInstagram className="text-2xl" />}
                  </div>
                </div>
                
                <div className="bg-white/5 p-4 rounded">
                  <p className="text-[#21BFE4] font-semibold">Status</p>
                  <div className="flex items-center mt-2">
                    <span className="px-3 py-1 text-sm font-semibold rounded-full bg-yellow-500 text-white">
                      Pending Activation
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Strategy Setting Forms (shown after clicking Set Strategy) */}
          {showStrategyForms && (
            <div className="mt-8 space-y-8">
              {/* General Strategy Section */}
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg">
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Set General Strategy
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-white mb-2">General Headline</label>
                    <input
                      type="text"
                      value={generalHeadline}
                      onChange={(e) => setGeneralHeadline(e.target.value)}
                      placeholder="Enter a headline for the general strategy"
                      className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white mb-2">General Strategy Description</label>
                    <textarea
                      value={generalStrategy}
                      onChange={(e) => setGeneralStrategy(e.target.value)}
                      placeholder="Describe the general strategy for this user"
                      className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white min-h-[120px]"
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      onClick={handleSetGeneralStrategy}
                      className="px-6 py-3 rounded-lg font-semibold bg-[#5D17E9] text-white hover:bg-[#4A12BA] transition-colors"
                    >
                      Set General Strategy
                    </button>
                  </div>
                  
                  {generalStrategySet && (
                    <div className="mt-2 p-3 bg-green-500/20 border border-green-500 rounded-lg text-green-400 flex items-center">
                      <FiCheckCircle className="mr-2" /> General strategy has been set successfully!
                    </div>
                  )}
                </div>
              </div>
              
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
                            <select
                              value={taskType}
                              onChange={(e) => setTaskType(e.target.value)}
                              className="w-full p-2 bg-white/5 border border-white/20 rounded-lg text-white"
                            >
                              <option value="">Select Type</option>
                              <option value="Content Creation">Content Creation</option>
                              <option value="Engagement">Engagement</option>
                              <option value="Analytics">Analytics</option>
                              <option value="Planning">Planning</option>
                            </select>
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
