import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaTiktok, FaYoutube, FaInstagram } from "react-icons/fa";
import {
  FiArrowLeft,
  FiPlus,
  FiCalendar,
  FiCheckCircle,
  FiXCircle,
  FiClock,
} from "react-icons/fi";
import Navbar from "../../components/Navbar.jsx";
import Sidebar from "../../components/Sidebar.jsx";
import Select from "react-select";
import adminService from "../../../../services/adminService";

function ActiveUserStrategy() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const activeTab = "active-users";

  // Map of strategy icons
  const strategyIcons = {
    "branding-strategy": {
      platformIcon: <FaTiktok className="text-2xl" />,
      platform: "TikTok",
    },
    "engagement-booster": {
      platformIcon: <FaInstagram className="text-2xl" />,
      platform: "Instagram",
    },
    "youtube-starter": {
      platformIcon: <FaYoutube className="text-2xl" />,
      platform: "YouTube",
    },
    "growth-boost": {
      platformIcon: <FaInstagram className="text-2xl" />,
      platform: "Instagram",
    },
    "niche-domination": {
      platformIcon: (
        <div className="flex gap-2">
          <FaTiktok className="text-2xl" />
          <FaYoutube className="text-2xl" />
          <FaInstagram className="text-2xl" />
        </div>
      ),
      platform: "TikTok, YouTube, Instagram",
    },
  };

  // Strategy descriptions
  const strategyDescriptions = {
    "branding-strategy":
      "Build a consistent and professional personal brand with 3 reels/week + Q&A scheme guide",
    "engagement-booster":
      "Improve interaction and comments on posts with a goal of +20% engagement rate",
    "youtube-starter":
      "Align content between platforms for wider reach with 2 videos/week + Q&A post",
    "growth-boost":
      "Increase reach and attract new followers with a goal of +500 followers in 1 month",
    "niche-domination":
      "Focus on dominating a specific niche with weekly expert content across platforms",
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);
        console.log("Fetching user details for ID:", userId);
        const userData = await adminService.getUserDetails(userId);
        console.log("Received user data:", userData);
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setError(error.message || "Failed to load user details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const handleSignOut = () => {
    localStorage.removeItem("adminEmail");
    localStorage.removeItem("adminPassword");
    navigate("/login");
  };

  // Custom setActiveTab function to handle navigation
  const handleTabChange = (tabId) => {
    navigate(`/admin?tab=${tabId}`);
  };

  // Loading state
  if (isLoading) {
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

  // Error state
  if (error) {
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
            <div className="bg-red-500/10 text-red-400 p-4 rounded-lg">
              {error}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Add null check for user
  if (!user) {
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
            <div className="text-white">Loading user data...</div>
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
              onClick={() => navigate("/admin?tab=active-users")}
              className="flex items-center text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <FiArrowLeft className="mr-2" /> Back to Active Users
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
                    src={user.avatar}
                    alt={user.userName}
                    className="w-16 h-16 rounded-full border-2 border-[ffffff]"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {user.userName}
                    </h3>
                    <p className="text-gray-400">{user.occupation}</p>
                  </div>
                </div>

                <div className="space-y-4 text-white">
                  <div className="flex space-x-2">
                    <p className="text-white font-semibold">Email:</p>
                    <p>{user.email}</p>
                  </div>
                  <div className="flex space-x-2">
                    <p className="text-white font-semibold">Instagram:</p>
                    <p>{user.instagram}</p>
                  </div>
                  <div className="flex space-x-2">
                    <p className="text-white font-semibold">Location:</p>
                    <p>{user.location}</p>
                  </div>
                  <div className="flex space-x-2">
                    <p className="text-white font-semibold">Occupation:</p>
                    <p>{user.occupation}</p>
                  </div>
                  <div className="flex space-x-2">
                    <p className="text-white font-semibold">Goals:</p>
                    <p>{user.goals}</p>
                  </div>
                  <div className="flex space-x-2">
                    <p className="text-white font-semibold">Description:</p>
                    <p>{user.description}</p>
                  </div>
                </div>
              </div>

              {/* Subscription Details Section */}
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg flex-1">
                <h3 className="text-xl font-semibold mb-4 text-white">
                  Subscription Details
                </h3>
                <div className="space-y-4">
                  <div className="bg-white/5 p-4 rounded">
                    <p className="text-[#21BFE4] font-semibold">
                      Selected Plan
                    </p>
                    <p className="text-white">{user.plan}</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded">
                    <p className="text-[#21BFE4] font-semibold">
                      Selected Strategy
                    </p>
                    <p className="text-white">{user.strategy}</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded">
                    <p className="text-[#21BFE4] font-semibold">
                      Registration Date
                    </p>
                    <p className="text-white">{user.registrationDate}</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded">
                    <p className="text-[#21BFE4] font-semibold">
                      Subscription End Date
                    </p>
                    <p className="text-white">
                      {user.subscriptionEndDate || "Not available"}
                    </p>
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
              <div className="flex items-center gap-4 mb-4 text-white">
                {strategyIcons[user.strategy]?.platformIcon || (
                  <FaInstagram className="text-2xl" />
                )}
                <h3 className="text-xl font-bold text-white">
                  {user.strategy}
                </h3>
              </div>

              <p className="text-gray-300 mb-6">
                {strategyDescriptions[user.strategy] ||
                  "Custom strategy for content creation and audience growth."}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded">
                  <p className="text-[#21BFE4] font-semibold">Platform Focus</p>
                  <div className="flex gap-2 mt-2 text-white">
                    {strategyIcons[user.strategy]?.platform || "Instagram"}
                  </div>
                </div>

                <div className="bg-white/5 p-4 rounded">
                  <p className="text-[#21BFE4] font-semibold">Status</p>
                  <div className="flex items-center mt-2">
                    <span className="px-2 text-md font-semibold rounded-full bg-white text-green-600">
                      {user.status}
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
                <h3 className="text-xl font-bold text-white mb-2">
                  {user.generalStrategy[0].goal}
                </h3>
                <p className="text-gray-300">
                  {user.generalStrategy[0].description ||
                    "There is no general strategy defined."}
                </p>
              </div>
            </div>
          </div>

          {/* Monthly Strategy Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Current Month Achievement
            </h2>

            <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  Monthly Goal
                </h3>
                <p className="text-gray-300">{user.monthlyStrategy[0].goal}</p>
                <p className="text-gray-300">
                  {user.monthlyStrategy[0].description}
                </p>
              </div>

              {/* Task Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white/5 p-4 rounded">
                  <div className="flex justify-between items-center">
                    <p className="text-[#21BFE4] font-semibold">Done Tasks</p>
                    <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-semibold">
                      {user.tasks?.filter((task) => task.status === "done")
                        .length || 0}
                    </span>
                  </div>
                </div>

                <div className="bg-white/5 p-4 rounded">
                  <div className="flex justify-between items-center">
                    <p className="text-[#21BFE4] font-semibold">Missed Tasks</p>
                    <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm font-semibold">
                      {user.tasks?.filter((task) => task.status === "missed")
                        .length || 0}
                    </span>
                  </div>
                </div>

                <div className="bg-white/5 p-4 rounded">
                  <div className="flex justify-between items-center">
                    <p className="text-[#21BFE4] font-semibold">
                      Upcoming Tasks
                    </p>
                    <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm font-semibold">
                      {user.tasks?.filter((task) => task.status === "upcoming")
                        .length || 0}
                    </span>
                  </div>
                </div>
              </div>

              {/* Task Categories */}
              <div className="space-y-6">
                {/* Done Tasks */}
                {user.tasks?.filter((task) => task.status === "done").length >
                  0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                      <FiCheckCircle className="text-green-400 mr-2" /> Done
                      Tasks
                    </h3>
                    <div className="space-y-3">
                      {user.tasks
                        ?.filter((task) => task.status === "done")
                        .map((task) => (
                          <div
                            key={task.id}
                            className="bg-white/5 p-4 rounded-lg flex items-start justify-between border-l-4 border-green-400"
                          >
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-[#21BFE4] font-semibold">
                                  {task.date}
                                </span>
                                <span className="text-white">{task.title}</span>
                              </div>
                              <p className="text-gray-400">{task.purpose}</p>
                            </div>
                            <div className="flex items-center">
                              <span className="text-[#21BFE4] font-semibold mr-2">
                                {task.type}
                              </span>
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
                {user.tasks?.filter((task) => task.status === "missed").length >
                  0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                      <FiXCircle className="text-red-400 mr-2" /> Missed Tasks
                    </h3>
                    <div className="space-y-3">
                      {user.tasks
                        ?.filter((task) => task.status === "missed")
                        .map((task) => (
                          <div
                            key={task.id}
                            className="bg-white/5 p-4 rounded-lg flex items-start justify-between border-l-4 border-red-400"
                          >
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-[#21BFE4] font-semibold">
                                  {task.date}
                                </span>
                                <span className="text-white">{task.title}</span>
                              </div>
                              <p className="text-gray-400">{task.purpose}</p>
                            </div>
                            <div className="flex items-center">
                              <span className="text-[#21BFE4] font-semibold mr-2">
                                {task.type}
                              </span>
                              <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs">
                                Missed
                              </span>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* Upcoming Tasks */}
                {user.tasks?.filter((task) => task.status === "upcoming")
                  .length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                      <FiClock className="text-yellow-400 mr-2" /> Upcoming
                      Tasks
                    </h3>
                    <div className="space-y-3">
                      {user.tasks
                        ?.filter((task) => task.status === "upcoming")
                        .map((task) => (
                          <div
                            key={task.id}
                            className="bg-white/5 p-4 rounded-lg flex items-start justify-between border-l-4 border-yellow-400"
                          >
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-[#21BFE4] font-semibold">
                                  {task.date}
                                </span>
                                <span className="text-white">{task.title}</span>
                              </div>
                              <p className="text-gray-400">{task.purpose}</p>
                            </div>
                            <div className="flex items-center">
                              <span className="text-[#21BFE4] font-semibold mr-2">
                                {task.type}
                              </span>
                              <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-xs">
                                Upcoming
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

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-8">
            <button
              onClick={() => navigate("/admin")}
              className="px-6 py-3 rounded-lg font-semibold bg-gray-600 text-white hover:bg-gray-700 transition-colors cursor-pointer"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActiveUserStrategy;
