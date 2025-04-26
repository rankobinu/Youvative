import { FiCalendar, FiClipboard, FiBarChart2, FiGrid } from 'react-icons/fi';

function Sidebar({ activeTab, setActiveTab, isExpanded, setIsExpanded }) {
  return (
    <div 
      className={`${
        isExpanded ? 'w-64' : 'w-20'
      } bg-[#1F0B38] text-white py-6 px-3 transition-all duration-300 ease-in-out hover:w-64 cursor-pointer`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="space-y-8">
        <button 
          onClick={() => setActiveTab('dashboard')}
          className={`flex items-center w-full p-3 rounded-lg transition-colors cursor-pointer ${
            activeTab === 'dashboard' ? 'bg-[#5D17E9] text-white' : 'hover:bg-[#5D17E9]/20'
          }`}
        >
          <FiGrid size={20} className={`${isExpanded ? 'mr-3' : 'mx-auto'} cursor-pointer`} />
          <span className={`${isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0'} transition-all duration-300 whitespace-nowrap cursor-pointer`}>
            Dashboard
          </span>
        </button>

        <button 
          onClick={() => setActiveTab('calendar')}
          className={`flex items-center w-full p-3 rounded-lg transition-colors cursor-pointer ${
            activeTab === 'calendar' ? 'bg-[#5D17E9] text-white' : 'hover:bg-[#5D17E9]/20'
          }`}
        >
          <FiCalendar size={20} className={`${isExpanded ? 'mr-3' : 'mx-auto'} cursor-pointer`} />
          <span className={`${isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0'} transition-all duration-300 whitespace-nowrap cursor-pointer`}>
            Calendar
          </span>
        </button>

        <button 
          onClick={() => setActiveTab('tasks')}
          className={`flex items-center w-full p-3 rounded-lg transition-colors cursor-pointer ${
            activeTab === 'tasks' ? 'bg-[#5D17E9] text-white' : 'hover:bg-[#5D17E9]/20'
          }`}
        >
          <FiClipboard size={20} className={`${isExpanded ? 'mr-3' : 'mx-auto'} cursor-pointer`} />
          <span className={`${isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0'} transition-all duration-300 whitespace-nowrap cursor-pointer`}>
            Task Tracker
          </span>
        </button>

        <button 
          onClick={() => setActiveTab('performance')}
          className={`flex items-center w-full p-3 rounded-lg transition-colors cursor-pointer ${
            activeTab === 'performance' ? 'bg-[#5D17E9] text-white' : 'hover:bg-[#5D17E9]/20'
          }`}
        >
          <FiBarChart2 size={20} className={`${isExpanded ? 'mr-3' : 'mx-auto'} cursor-pointer`} />
          <span className={`${isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0'} transition-all duration-300 whitespace-nowrap cursor-pointer`}>
            Performance Analytics
          </span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
