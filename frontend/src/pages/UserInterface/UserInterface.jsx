import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUserData } from "../../store/slices/userSlice";
import { setPageTitle } from "../../utils/pageTitle";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Calendar from "./components/Calendar";
import TaskTracker from "./components/TaskTracker";
import PerformanceAnalytics from "./components/PerformanceAnalytics";
import Profile from "./components/Profile";
import userService from "../../services/userService";
import authService from "../../services/authService";

function UserInterface() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isExpanded, setIsExpanded] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Set active tab based on URL query parameter
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab");
    if (
      tab &&
      ["dashboard", "calendar", "tasks", "performance", "profile"].includes(tab)
    ) {
      setActiveTab(tab);
    }
  }, [location]);

  useEffect(() => {
    setPageTitle("User Dashboard");

    const fetchUserData = async () => {
      try {
        setIsLoading(true);

        // Check if user is authenticated
        if (!authService.isAuthenticated()) {
          navigate("/login");
          return;
        }

        // Fetch user profile data
        const profileData = await userService.getUserProfile();

        // Fetch subscription details if needed
        let subscriptionData = {};
        try {
          subscriptionData = await userService.getSubscriptionDetails();
        } catch (subError) {
          console.error("Error fetching subscription data:", subError);
          // Continue without subscription data
        }

        // Set user data in state based on the actual response structure
        setUserData({
          ...profileData.data,
          subscription: subscriptionData,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(error.message || "Failed to load user data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleSignOut = () => {
    localStorage.clear();
    dispatch(clearUserData());
    navigate("/login");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".user-dropdown")) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "calendar":
        return <Calendar />;
      case "tasks":
        return <TaskTracker />;
      case "performance":
        return <PerformanceAnalytics />;
      case "profile":
        return <Profile userData={userData} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#29104A]">
      <Navbar
        setActiveTab={setActiveTab}
        handleSignOut={handleSignOut}
        showDropdown={showDropdown}
        setShowDropdown={setShowDropdown}
        userData={userData}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
        />

        <div className="flex-1 overflow-auto p-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-white">Loading your dashboard...</div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-red-400">{error}</div>
            </div>
          ) : (
            renderContent()
          )}
        </div>
      </div>
    </div>
  );
}

export default UserInterface;
