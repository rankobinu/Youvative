import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCheckCircle, FiClock, FiCalendar } from 'react-icons/fi';

function Dashboard() {
  const navigate = useNavigate();
  const [monthlyGoal, setMonthlyGoal] = useState('');
  const [taskStats, setTaskStats] = useState({ total: 0, completed: 0 });
  const [currentTask, setCurrentTask] = useState(null);
  
  // Mock data - In a real app, this would come from an API
  useEffect(() => {
    // Fetch monthly goal and description
    setMonthlyGoal({
      goal: 'Increase engagement rate by 15% and gain 500 new followers by creating consistent, high-quality content that resonates with the target audience.',
      description: 'Focus on creating authentic content that showcases your expertise while maintaining a consistent posting schedule.'
    });
    
    // Fetch tasks for the current month
    const mockTasks = [
      {
        id: 1,
        date: '5/1/2025',
        type: 'Reel',
        title: 'Day in the Life',
        purpose: 'Show authentic behind-the-scenes to connect with audience',
        completed: true,
        status: 'done'
      },
      {
        id: 2,
        date: '5/2/2025',
        type: 'Story',
        title: 'Q&A Session',
        purpose: 'Increase engagement through direct interaction',
        completed: false,
        status: 'upcoming'
      },
      {
        id: 3,
        date: '5/5/2025',
        type: 'Video',
        title: 'Product Review',
        purpose: 'Showcase expertise and provide value to followers',
        completed: false,
        status: 'upcoming'
      },
      {
        id: 4,
        date: '5/25/2025',
        type: 'Reel',
        title: 'Trending Challenge',
        purpose: 'Leverage current trends for increased reach',
        completed: false,
        status: 'upcoming'
      }
    ];
    
    // Calculate task statistics
    const completed = mockTasks.filter(task => task.status === 'done').length;
    const total = mockTasks.length;
    setTaskStats({ total, completed });
    
    // Get today's date
    const today = new Date().toLocaleDateString('en-US');
    console.log(today);
  
    // Find the nearest upcoming task
    const upcomingTasks = mockTasks
      .filter(task => task.status === 'upcoming' && task.date >= today)
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    
    if (upcomingTasks.length > 0) {
      setCurrentTask(upcomingTasks[0]);
    }
   
  }, []);
  
  const navigateToTasks = () => {
    navigate('/user?tab=tasks');
  };
  
  const calculateCompletionPercentage = () => {
    if (taskStats.total === 0) return 0;
    return Math.round((taskStats.completed / taskStats.total) * 100);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-white mb-4">Dashboard Overview</h2>
      
      {/* Monthly Goal Section */}
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4 text-white">Current Month Goal</h3>
        <div className="mb-6">
          <p className="text-gray-300 mb-4">
            {monthlyGoal.goal}
          </p>
          <p className="text-gray-400 text-sm italic">
            {monthlyGoal.description}
          </p>
        </div>
      </div>
      
      {/* Task Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-white">Task Progress</h3>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[#21BFE4] font-semibold">Completion Rate</p>
              <p className="text-white text-2xl font-bold">{calculateCompletionPercentage()}%</p>
            </div>
            <div className="h-20 w-20 rounded-full border-4 border-[#5D17E9] flex items-center justify-center">
              <div className="text-center">
                <p className="text-white font-bold">{taskStats.completed}/{taskStats.total}</p>
                <p className="text-xs text-gray-400">Tasks</p>
              </div>
            </div>
          </div>
          <div className="w-full bg-white/5 rounded-full h-2.5">
            <div 
              className="bg-[#5D17E9] h-2.5 rounded-full" 
              style={{ width: `${calculateCompletionPercentage()}%` }}
            ></div>
          </div>
        </div>
        
        {/* Current/Upcoming Task Section */}
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-white">
            Upcoming Task
          </h3>
          
          {currentTask ? (
            <div className="bg-white/5 p-4 rounded-lg border-l-4 border-yellow-400">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <FiCalendar className="text-[#21BFE4]" />
                  <span className="text-[#21BFE4] font-semibold">{currentTask.date}</span>
                </div>
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-white/10 text-white">
                  {currentTask.type}
                </span>
              </div>
              <h4 className="text-white font-semibold mb-1">{currentTask.title}</h4>
              <p className="text-gray-400 text-sm mb-3">{currentTask.purpose}</p>
              <div className="flex items-center text-yellow-400">
                <FiClock className="mr-1" />
                <span className="text-sm">Upcoming</span>
              </div>
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-gray-400">No upcoming tasks scheduled</p>
            </div>
          )}
          
          <button 
            onClick={navigateToTasks}
            className="w-full mt-4 bg-[#5D17E9]/70 hover:bg-[#5D17E9] text-white py-2 rounded-lg transition-colors"
          >
            View All Tasks
          </button>
        </div>
      </div>
      
    </div>
  );
}

export default Dashboard;
