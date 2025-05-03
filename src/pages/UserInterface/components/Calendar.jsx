import React, { useState, useEffect } from 'react';
import { FiCalendar, FiClock, FiX } from 'react-icons/fi';

function Calendar() {
  const [calendarDays, setCalendarDays] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedDateTasks, setSelectedDateTasks] = useState([]);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to beginning of day for accurate comparison
  
  // Mock data - In a real app, this would come from an API
  useEffect(() => {
    // Mock subscription start date (in a real app, this would come from user data)
    const subscriptionStartDate = new Date('2025-05-01');
    // Generate 30 days starting from subscription date
    const days = [];
    for (let i = 0; i < 30; i++) {
      const currentDate = new Date(subscriptionStartDate);
      currentDate.setDate(subscriptionStartDate.getDate() + i);
      days.push({
        date: currentDate,
        formattedDate: currentDate.toISOString().split('T')[0],
        dayOfMonth: currentDate.getDate(),
        dayName: currentDate.toLocaleDateString('en-US', { weekday: 'short' }),
        monthName: currentDate.toLocaleDateString('en-US', { month: 'long' }),
        isPast: currentDate < today
      });
    }
    setCalendarDays(days);
    
    // Mock tasks data
    const mockTasks = [
      {
        id: 1,
        date: '2025-05-05',
        type: 'Reel',
        title: 'Day in the Life',
        purpose: 'Show authentic behind-the-scenes to connect with audience',
        status: 'done'
      },
      {
        id: 2,
        date: '2025-05-10',
        type: 'Story',
        title: 'Q&A Session',
        purpose: 'Increase engagement through direct interaction',
        status: 'upcoming'
      },
      {
        id: 3,
        date: '2025-05-15',
        type: 'Video',
        title: 'Product Review',
        purpose: 'Showcase expertise and provide value to followers',
        status: 'upcoming'
      },
      {
        id: 4,
        date: '2025-05-20',
        type: 'Reel',
        title: 'Trending Challenge',
        purpose: 'Leverage current trends for increased reach',
        status: 'upcoming'
      },
      {
        id: 5,
        date: '2025-05-25',
        type: 'Post',
        title: 'Motivational Quote',
        purpose: 'Inspire audience and reinforce brand values',
        status: 'upcoming'
      }
    ];
    setTasks(mockTasks);
  }, []); // Empty dependency array to run only once on component mount
  
  const hasTasksForDate = (date) => {
    return tasks.some(task => task.date === date);
  };
  
  const getTasksForDate = (date) => {
    return tasks.filter(task => task.date === date);
  };
  
  const handleDateClick = (date) => {
    if (hasTasksForDate(date)) {
      setSelectedDate(date);
      setSelectedDateTasks(getTasksForDate(date));
      setShowTaskModal(true);
    }
  };
  
  const closeTaskModal = () => {
    setShowTaskModal(false);
    setSelectedDate(null);
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'done':
        return 'border-green-400';
      case 'missed':
        return 'border-red-400';
      case 'upcoming':
        return 'border-yellow-400';
      default:
        return 'border-gray-400';
    }
  };
  
  const getStatusBadge = (status) => {
    switch (status) {
      case 'done':
        return (
          <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">
            Done
          </span>
        );
      case 'missed':
        return (
          <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs">
            Missed
          </span>
        );
      case 'upcoming':
        return (
          <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-xs">
            Upcoming
          </span>
        );
      default:
        return null;
    }
  };

  // Group days by week for better display
  const weeks = [];
  for (let i = 0; i < calendarDays.length; i += 7) {
    weeks.push(calendarDays.slice(i, i + 7));
  }

  // Get the first 7 days of the calendar to use for the header
  const headerDays = calendarDays.slice(0, 7).map(day => 
    new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' })
  );

  // Check if a date is today
  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() && 
           date.getMonth() === today.getMonth() && 
           date.getFullYear() === today.getFullYear();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-white mb-4">Calendar</h2>
      
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-6 text-white">Your Content Schedule</h3>
        
        {/* Calendar Header - Days of Week */}
        <div className="grid grid-cols-7 gap-1 mb-2 text-center">
          {headerDays.map((day, index) => (
            <div key={index} className="text-[#21BFE4] font-semibold p-2">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar Grid */}
        <div className="space-y-1">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="grid grid-cols-7 gap-1">
              {week.map((day, dayIndex) => {
                const hasTask = hasTasksForDate(day.formattedDate);
                const isPastDay = day.isPast;
                const isTodayDay = isToday(day.date);
                
                return (
                  <div 
                    key={dayIndex}
                    className={`
                      p-2 rounded-lg text-center min-h-[80px] flex flex-col
                      ${isPastDay ? 'opacity-60' : ''}
                      ${isTodayDay ? 'ring-2 ring-[#21BFE4]' : ''}
                      ${hasTask 
                        ? isPastDay 
                          ? 'bg-white/5 cursor-pointer hover:bg-white/10 hover:opacity-80' 
                          : 'bg-white/10 cursor-pointer hover:bg-white/20' 
                        : 'bg-white/5'}
                    `}
                    onClick={() => handleDateClick(day.formattedDate)}
                  >
                    <div className="flex flex-col items-center">
                      <span className={`text-xs ${isPastDay ? 'text-gray-500' : 'text-gray-400'}`}>
                        {day.monthName}
                      </span>
                      <span className={`text-lg font-bold ${isPastDay ? 'text-gray-400' : 'text-white'}`}>
                        {day.dayOfMonth}
                      </span>
                      <span className={`text-xs ${isPastDay ? 'text-gray-500' : 'text-gray-400'}`}>
                        {day.dayName}
                      </span>
                    </div>
                    
                    {hasTask && (
                      <div className="mt-auto">
                        <button 
                          className={`
                            w-full mt-2 px-2 py-1 text-xs rounded transition-colors
                            ${isPastDay 
                              ? 'bg-[#5D17E9]/40 hover:bg-[#5D17E9]/60 text-white/80' 
                              : 'bg-[#5D17E9]/70 hover:bg-[#5D17E9] text-white'}
                          `}
                        >
                          View Tasks
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      
      </div>
      
      {/* Task Modal */}
      {showTaskModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1F0B38] rounded-lg w-full max-w-md max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-white">
                  Tasks for {new Date(selectedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </h3>
                <button 
                  onClick={closeTaskModal}
                  className="text-gray-400 hover:text-white"
                >
                  <FiX size={24} />
                </button>
              </div>
              
              <div className="space-y-4">
                {selectedDateTasks.length > 0 ? (
                  selectedDateTasks.map(task => (
                    <div 
                      key={task.id} 
                      className={`bg-white/5 p-4 rounded-lg border-l-4 ${getStatusColor(task.status)}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <FiCalendar className="text-[#21BFE4]" />
                          <span className="text-[#21BFE4] font-semibold">{task.date}</span>
                        </div>
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-white/10 text-white">
                          {task.type}
                        </span>
                      </div>
                      <h4 className="text-white font-semibold mb-1">{task.title}</h4>
                      <p className="text-gray-400 text-sm mb-3">{task.purpose}</p>
                      <div className="flex items-center">
                        <FiClock className="mr-1 text-gray-400" />
                        <span className="text-sm text-gray-400 mr-2">Status:</span>
                        {getStatusBadge(task.status)}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-center py-4">No tasks for this date.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Calendar;
