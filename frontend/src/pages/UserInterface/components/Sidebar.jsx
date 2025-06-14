import { FiCalendar, FiClipboard, FiBarChart2, FiGrid } from "react-icons/fi";

function Sidebar({ activeTab, setActiveTab, isExpanded, setIsExpanded }) {
  const menuItems = [
    {
      id: "dashboard",
      icon: FiGrid,
      label: "Dashboard",
    },
    {
      id: "calendar",
      icon: FiCalendar,
      label: "Calendar",
    },
    {
      id: "tasks",
      icon: FiClipboard,
      label: "Task Tracker",
    },
    {
      id: "performance",
      icon: FiBarChart2,
      label: "Performance Analytics",
    },
  ];

  return (
    <div
      className={`${
        isExpanded ? "w-64" : "w-20"
      } bg-[#1F0B38] text-white py-6 px-3 transition-all duration-300 ease-in-out hover:w-64 cursor-pointer`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="space-y-8">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex items-center w-full p-3 rounded-lg transition-colors cursor-pointer ${
              activeTab === item.id
                ? "bg-[#5D17E9] text-white"
                : "hover:bg-[#5D17E9]/20"
            }`}
          >
            <item.icon
              size={20}
              className={`${isExpanded ? "mr-3" : "mx-auto"} cursor-pointer`}
            />
            <span
              className={`${isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0"} transition-all duration-300 whitespace-nowrap cursor-pointer`}
            >
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
