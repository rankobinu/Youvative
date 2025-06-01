import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCheckCircle, FiClock, FiCalendar } from 'react-icons/fi';
import strategyService from '../../../services/strategyService';
import taskService from '../../../services/taskService';
import userService from '../../../services/userService';

function Dashboard() {
  const navigate = useNavigate();
  const [monthlyGoal, setMonthlyGoal] = useState({ goal: '', description: '' });
  const [taskStats, setTaskStats] = useState({ total: 0, completed: 0 });
  const [currentTask, setCurrentTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch monthly strategy
        const strategyData = await strategyService.getMonthlyStrategy();
        setMonthlyGoal({
          goal: strategyData.goal || 'No goal set for this month.',
          description: strategyData.description || 'No description available.'
        });
        
        // Fetch all tasks to calculate statistics
        const tasks = await taskService.getUserTasks();
        const completed = tasks.filter(task => task.status === 'done').length;
        const total = tasks.length;
        setTaskStats({ total, completed });
        
        // Fetch next upcoming task
        const nextTask = await taskService.getNextUpcomingTask();
        setCurrentTask(nextTask);
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);
  
  const navigateToTasks = () => {
    // Navigate to userinterface with the tasks tab parameter
    navigate('/userinterface?tab=tasks');
  };
  
  const calculateCompletionPercentage = () => {
    if (taskStats.total === 0) return 0;
    return Math.round((taskStats.completed / taskStats.total) * 100);
  };

  if (loading) {
    return <div className="text-white text-center py-10">Loading dashboard data...</div>;
  }

  if (error) {
    return <div className="text-red-400 text-center py-10">{error}</div>;
  }

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
              <p className="text-gray-400">No upcoming tasks</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
