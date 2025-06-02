import { useState } from "react";
import {
  FiGrid,
  FiUserPlus,
  FiUsers,
  FiUserX,
  FiRefreshCw,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import adminService from "../../../services/adminService";

function Sidebar({ activeTab, setActiveTab, isExpanded, setIsExpanded }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const menuItems = [
    {
      id: "dashboard",
      icon: FiGrid,
      label: "Dashboard",
      endpoint: "stats",
      action: () => fetchDashboardStats(),
    },
    {
      id: "new-users",
      icon: FiUserPlus,
      label: "New Users",
      endpoint: "new",
      action: () => fetchNewUsers(),
    },
    {
      id: "active-users",
      icon: FiUsers,
      label: "Active Users",
      endpoint: "active",
      action: () => fetchActiveUsers(),
    },
    {
      id: "inactive-users",
      icon: FiUserX,
      label: "Inactive Users",
      endpoint: "inactive",
      action: () => fetchInactiveUsers(),
    },
    {
      id: "resubscribed-users",
      icon: FiRefreshCw,
      label: "Resubscribed Users",
      endpoint: "resubscribed",
      action: () => fetchResubscribedUsers(),
    },
  ];

  const fetchDashboardStats = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await adminService.getDashboardStats();
      // No need to store the result as it will be fetched by the Dashboard component
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      setError("Failed to load dashboard stats");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchNewUsers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await adminService.getNewUsers();
      // No need to store the result as it will be fetched by the NewUsers component
    } catch (error) {
      console.error("Error fetching new users:", error);
      setError("Failed to load new users");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchActiveUsers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await adminService.getActiveUsers();
      // No need to store the result as it will be fetched by the ActiveUsers component
    } catch (error) {
      console.error("Error fetching active users:", error);
      setError("Failed to load active users");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchInactiveUsers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await adminService.getInactiveUsers();
      // No need to store the result as it will be fetched by the InactiveUsers component
    } catch (error) {
      console.error("Error fetching inactive users:", error);
      setError("Failed to load inactive users");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchResubscribedUsers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await adminService.getResubscribedUsers();
      // No need to store the result as it will be fetched by the ResubscribedUsers component
    } catch (error) {
      console.error("Error fetching resubscribed users:", error);
      setError("Failed to load resubscribed users");
    } finally {
      setIsLoading(false);
    }
  };

  const handleMenuItemClick = async (item) => {
    setActiveTab(item.id);

    // Update URL with the selected tab
    navigate(`/admin?tab=${item.id}`, { replace: true });

    // Execute the associated action (API call)
    if (item.action) {
      await item.action();
    }
  };

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
            onClick={() => handleMenuItemClick(item)}
            className={`flex items-center w-full p-3 rounded-lg transition-colors cursor-pointer ${
              activeTab === item.id
                ? "bg-[#5D17E9] text-white"
                : "hover:bg-[#5D17E9]/20"
            } ${isLoading && activeTab === item.id ? "opacity-75 cursor-wait" : ""}`}
            disabled={isLoading && activeTab === item.id}
          >
            <item.icon
              size={20}
              className={`${isExpanded ? "mr-3" : "mx-auto"} cursor-pointer`}
            />
            <span
              className={`${isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0"} transition-all duration-300 whitespace-nowrap cursor-pointer`}
            >
              {item.label}
              {isLoading && activeTab === item.id && (
                <span className="ml-2 inline-block w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
              )}
            </span>
          </button>
        ))}
      </div>

      {error && (
        <div className="mt-4 p-2 bg-red-500/20 text-red-300 rounded text-xs">
          {error}
        </div>
      )}
    </div>
  );
}

export default Sidebar;
