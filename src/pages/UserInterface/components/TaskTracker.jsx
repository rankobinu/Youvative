import React, { useState, useEffect } from 'react';
import { FiCheckCircle, FiXCircle, FiClock, FiCalendar } from 'react-icons/fi';

function TaskTracker() {
  const [tasks, setTasks] = useState([]);
  const [taskCounts, setTaskCounts] = useState({
    done: 0,
    missed: 0,
    upcoming: 0,
    total: 0
  });
  
  // Mock data - In a real app, this would come from an API
  useEffect(() => {
    // Fetch tasks for the current month
    const mockTasks = [
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
        date: '2025-05-02',
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
    ];
    
    setTasks(mockTasks);
    
    // Calculate task counts
    const counts = {
      done: mockTasks.filter(task => task.status === 'done').length,
      missed: mockTasks.filter(task => task.status === 'missed').length,
      upcoming: mockTasks.filter(task => task.status === 'upcoming').length,
      total: mockTasks.length
    };
    
    setTaskCounts(counts);
  }, []);
  
  const markTaskAsDone = (taskId) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { ...task, status: 'done', completed: true } 
          : task
      )
    );
    
    // Update task counts
    setTaskCounts(prev => ({
      ...prev,
      done: prev.done + 1,
      upcoming: prev.upcoming - 1
    }));
  };
  
  const getTodayTask = () => {
    const today = new Date().toISOString().split('T')[0];
    return tasks.find(task => 
      task.date === today && task.status === 'upcoming'
    );
  };
  
  const getNextUpcomingTasks = () => {
    const today = new Date().toISOString().split('T')[0];
    tasks
      .filter(task => 
        task.status === 'upcoming' && 
        task.date > today
      )
      .sort((a, b) => new Date(a.date) - new Date(b.date));
      return tasks[0];
  };
  
  const calculateCompletionPercentage = () => {
    if (taskCounts.total === 0) return 0;
    return Math.round((taskCounts.done / taskCounts.total) * 100);
  };

  const todayTask = getTodayTask();
  const nextUpcomingTasks = getNextUpcomingTasks();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-white mb-4">Task Tracker</h2>
      
      {/* Task Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <p className="text-[#21BFE4] font-semibold">Done Tasks</p>
            <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-semibold">
              {taskCounts.done}
            </span>
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <p className="text-[#21BFE4] font-semibold">Missed Tasks</p>
            <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm font-semibold">
              {taskCounts.missed}
            </span>
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <p className="text-[#21BFE4] font-semibold">Upcoming Tasks</p>
            <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm font-semibold">
              {taskCounts.upcoming}
            </span>
          </div>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[#21BFE4] font-semibold">Completion Rate</p>
            <p className="text-white text-2xl font-bold">{calculateCompletionPercentage()}%</p>
          </div>
          <div className="h-20 w-20 rounded-full border-4 border-[#5D17E9] flex items-center justify-center">
            <div className="text-center">
              <p className="text-white font-bold">{taskCounts.done}/{taskCounts.total}</p>
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
      
      {/* Today's Task */}
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg mb-6">
        <h3 className="text-xl font-semibold mb-4 text-white">Today's Task</h3>
        
        {todayTask ? (
          <div className="bg-white/5 p-4 rounded-lg border-l-4 border-yellow-400">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <FiCalendar className="text-[#21BFE4]" />
                <span className="text-[#21BFE4] font-semibold">{todayTask.date}</span>
              </div>
              <span className="px-2 py-1 text-xs font-semibold rounded-full bg-white/10 text-white">
                {todayTask.type}
              </span>
            </div>
            <h4 className="text-white font-semibold mb-1">{todayTask.title}</h4>
            <p className="text-gray-400 text-sm mb-3">{todayTask.purpose}</p>
            <div className="flex justify-between items-center">
              <div className="flex items-center text-yellow-400">
                <FiClock className="mr-1" />
                <span className="text-sm">Due Today</span>
              </div>
              <button 
                onClick={() => markTaskAsDone(todayTask.id)}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
              >
                Mark as Done
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-gray-400">No tasks scheduled for today</p>
          </div>
        )}
      </div>

        {/* Next Task */}
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg mb-6">
        <h3 className="text-xl font-semibold mb-4 text-white">Upcoming Task</h3>
        
        {nextUpcomingTasks ? (
          <div className="bg-white/5 p-4 rounded-lg border-l-4 border-yellow-400">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <FiCalendar className="text-[#21BFE4]" />
                <span className="text-[#21BFE4] font-semibold">{nextUpcomingTasks.date}</span>
              </div>
              <span className="px-2 py-1 text-xs font-semibold rounded-full bg-white/10 text-white">
                {nextUpcomingTasks.type}
              </span>
            </div>
            <h4 className="text-white font-semibold mb-1">{nextUpcomingTasks.title}</h4>
            <p className="text-gray-400 text-sm mb-3">{nextUpcomingTasks.purpose}</p>
            <div className="flex justify-between items-center">
              
              
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-gray-400">No Upcoming Tasks</p>
          </div>
        )}
      </div>
      
      {/* Task Categories */}
      <div className="space-y-6">
        {/* Done Tasks */}
        {tasks.filter(task => task.status === 'done').length > 0 && (
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
              <FiCheckCircle className="text-green-400 mr-2" /> Done Tasks
            </h3>
            <div className="space-y-3">
              {tasks
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
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-white/10 text-white">
                        {task.type}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
        
        {/* Missed Tasks */}
        {tasks.filter(task => task.status === 'missed').length > 0 && (
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
              <FiXCircle className="text-red-400 mr-2" /> Missed Tasks
            </h3>
            <div className="space-y-3">
              {tasks
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
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-white/10 text-white">
                        {task.type}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
        
        {/* Upcoming Tasks */}
        {tasks.filter(task => task.status === 'upcoming').length > 0 && (
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
              <FiClock className="text-yellow-400 mr-2" /> Upcoming Tasks
            </h3>
            <div className="space-y-3">
              {tasks
                .filter(task => task.status === 'upcoming')
                .map(task => (
                  <div key={task.id} className="bg-white/5 p-4 rounded-lg flex items-start justify-between border-l-4 border-yellow-400">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[#21BFE4] font-semibold">{task.date}</span>
                        <span className="text-white">{task.title}</span>
                    </div>
                    <p className="text-gray-400">{task.purpose}</p>
                  </div>
                  <div className="flex items-center">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-white/10 text-white">
                      {task.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskTracker;
