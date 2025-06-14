import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaTiktok, FaYoutube, FaInstagram } from "react-icons/fa";
import { FiArrowLeft, FiPlus, FiCalendar, FiCheckCircle } from "react-icons/fi";
import Navbar from "../../components/Navbar.jsx";
import Sidebar from "../../components/Sidebar.jsx";
import Select from "react-select";
import adminService from "../../../../services/adminService";

function NewUserStrategy() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const activeTab = "new-users";
  const [showDropdown, setShowDropdown] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const customSelectStyles = {
    control: (base) => ({
      ...base,
      background: "rgba(255, 255, 255, 0.05)",
      border: "none",
      boxShadow: "none",
      padding: "0",
      "&:hover": {
        border: "none",
      },
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#5E15EB"
        : "rgba(178, 143, 250, 0.5)",
      color: "white",
      "&:hover": {
        backgroundColor: "#5E15EB",
      },
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "rgba(178, 143, 250, 0.31)",
      backdropFilter: "blur(10px)",
    }),
    singleValue: (base) => ({
      ...base,
      color: "white",
    }),
    placeholder: (base) => ({
      ...base,
      color: "rgba(255, 255, 255, 0.5)",
    }),
  };

  const taskTypes = [
    { value: "video", label: "Video" },
    { value: "story", label: "Story" },
    { value: "reel", label: "Reel" },
    { value: "post", label: "Post" },
  ];

  // Strategy setting states
  const [showStrategyForms, setShowStrategyForms] = useState(false);
  const [generalHeadline, setGeneralHeadline] = useState("");
  const [generalStrategy, setGeneralStrategy] = useState("");
  const [monthlyGoal, setMonthlyGoal] = useState("");
  const [monthlyDescription, setMonthlyDescription] = useState("");
  const [tasks, setTasks] = useState([]);

  // New task form states
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [taskDate, setTaskDate] = useState("");
  const [taskType, setTaskType] = useState(null); // Changed from '' to null for react-select
  const [taskTitle, setTaskTitle] = useState("");
  const [taskPurpose, setTaskPurpose] = useState("");

  // Success message states
  const [strategySubmitted, setStrategySubmitted] = useState(false);

  // Custom setActiveTab function to handle navigation
  const handleTabChange = (tabId) => {
    // Navigate to the admin interface with the selected tab as a URL parameter
    navigate(`/admin?tab=${tabId}`);
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

        // If user has existing strategies, populate the form
        if (userData.generalStrategy) {
          console.log("Setting general strategy:", userData.generalStrategy);
          setGeneralHeadline(userData.generalStrategy.headline || "");
          setGeneralStrategy(userData.generalStrategy.description || "");
        }

        if (userData.monthlyStrategy) {
          console.log("Setting monthly strategy:", userData.monthlyStrategy);
          setMonthlyGoal(userData.monthlyStrategy.goal || "");
          setMonthlyDescription(userData.monthlyStrategy.description || "");
          setTasks(userData.monthlyStrategy.tasks || []);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        setError(error.message || "Failed to load user details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);

  // Add console log for user state changes
  useEffect(() => {
    console.log("User state updated:", user);
  }, [user]);

  const handleSignOut = () => {
    localStorage.removeItem("adminEmail");
    localStorage.removeItem("adminPassword");
    navigate("/login");
  };

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

  // Handle adding a new task
  const handleAddTask = () => {
    if (!taskDate || !taskType || !taskTitle || !taskPurpose) {
      alert("Please fill in all task fields");
      return;
    }

    const newTask = {
      id: Date.now(),
      date: taskDate,
      type: taskType.value, // Extract value from the Select component option
      headline: taskTitle,
      purpose: taskPurpose,
      completed: false,
      status: "upcoming",
    };

    setTasks([...tasks, newTask]);

    // Reset form fields
    setTaskDate("");
    setTaskType(null); // Reset to null for react-select
    setTaskTitle("");
    setTaskPurpose("");
    setShowTaskForm(false);
  };

  // Handle submitting both strategies together
  const handleSubmitStrategy = async () => {
    if (!generalHeadline || !generalStrategy) {
      alert("Please fill in all general strategy fields");
      return;
    }

    if (!monthlyGoal || !monthlyDescription || tasks.length === 0) {
      alert(
        "Please set a monthly goal, description, and add at least one task",
      );
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare data for API
      const strategyData = {
        generalStrategy: {
          goal: generalHeadline,
          description: generalStrategy,
        },
        monthlyStrategy: {
          goal: monthlyGoal,
          description: monthlyDescription,
          tasks: tasks,
        },
      };

      // Send to API
      const response = await adminService.setGlobalStrategy(
        userId,
        strategyData,
      );

      if (response.success) {
        setStrategySubmitted(true);

        // Show success message for 3 seconds
        setTimeout(() => {
          setStrategySubmitted(false);
          // Optionally navigate back or refresh
          navigate("/admin?tab=new-users");
        }, 3000);
      } else {
        throw new Error(response.error || "Failed to set strategy");
      }
    } catch (error) {
      console.error("Error setting strategy:", error);
      setError(error.message || "Failed to set strategy");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading state
  if (isLoading) {
    console.log("Rendering loading state");
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
    console.log("Rendering error state:", error);
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
    console.log("User data is null, rendering loading state");
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

  console.log("Rendering main component with user:", user);

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
              onClick={() => navigate("/admin?tab=new-users")}
              className="flex items-center text-gray-400 hover:text-white transition-colors cursor-pointer"
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
                    <p className="text-white">{user.subscriptionEndDate}</p>
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
                    <span className="px-2 text-md font-semibold rounded-full bg-white text-yellow-800">
                      {user.status}
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
                    <label className="block text-white mb-2">
                      General Headline
                    </label>
                    <input
                      type="text"
                      value={generalHeadline}
                      onChange={(e) => setGeneralHeadline(e.target.value)}
                      placeholder="Enter a headline for the general strategy"
                      className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-white mb-2">
                      General Strategy Description
                    </label>
                    <textarea
                      value={generalStrategy}
                      onChange={(e) => setGeneralStrategy(e.target.value)}
                      placeholder="Describe the general strategy for this user"
                      className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white min-h-[120px]"
                    />
                  </div>
                </div>
              </div>

              {/* Monthly Strategy Section */}
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg">
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Set Current Month Strategy
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-white mb-2">
                      Monthly Goal
                    </label>
                    <textarea
                      value={monthlyGoal}
                      onChange={(e) => setMonthlyGoal(e.target.value)}
                      placeholder="Describe the goal for this month"
                      className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white min-h-[100px]"
                    />
                  </div>

                  <div>
                    <label className="block text-white mb-2">
                      Monthly Strategy Description
                    </label>
                    <textarea
                      value={monthlyDescription}
                      onChange={(e) => setMonthlyDescription(e.target.value)}
                      placeholder="Describe the strategy approach for this month"
                      className="w-full p-3 bg-white/5 border border-white/20 rounded-lg text-white min-h-[100px]"
                    />
                  </div>

                  {/* Task List */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-semibold text-white">
                        Tasks
                      </h3>
                      <button
                        onClick={() => setShowTaskForm(true)}
                        className="flex items-center px-4 py-2 bg-[#5D17E9]/70 hover:bg-[#5D17E9] text-white rounded-lg transition-colors cursor-pointer"
                      >
                        <FiPlus className="mr-2" /> Add Task
                      </button>
                    </div>

                    {/* Task Form */}
                    {showTaskForm && (
                      <div className="bg-white/5 p-4 rounded-lg mb-4">
                        <h4 className="text-lg font-semibold text-white mb-3">
                          New Task
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-white mb-1">
                              Date
                            </label>
                            <input
                              type="date"
                              value={taskDate}
                              onChange={(e) => setTaskDate(e.target.value)}
                              className="w-full p-2 bg-white/5 border border-white/20 rounded-lg text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-white mb-1">
                              Type
                            </label>
                            <Select
                              styles={customSelectStyles}
                              options={taskTypes}
                              value={taskType}
                              onChange={(selectedOption) =>
                                setTaskType(selectedOption)
                              }
                              placeholder="Select task type"
                              className="w-full bg-white/5 border border-white/20 rounded-lg text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-white mb-1">
                              Title
                            </label>
                            <input
                              type="text"
                              value={taskTitle}
                              onChange={(e) => setTaskTitle(e.target.value)}
                              placeholder="Task title"
                              className="w-full p-2 bg-white/5 border border-white/20 rounded-lg text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-white mb-1">
                              Purpose
                            </label>
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
                            className="px-4 py-2 rounded-lg font-semibold bg-[#5D17E9] text-white hover:bg-[#4A12BA] transition-colors cursor-pointer"
                          >
                            Add Task
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Task List */}
                    {tasks.length > 0 ? (
                      <div className="space-y-3">
                        {tasks.map((task) => (
                          <div
                            key={task.id}
                            className="bg-white/5 p-4 rounded-lg flex items-start justify-between"
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
                              <span className="text-white">
                                {!task.completed ? "Pending" : "Completed"}
                              </span>
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
                </div>
              </div>

              {/* Submit Button for Both Strategies */}
              <div className="flex justify-end">
                <button
                  onClick={handleSubmitStrategy}
                  disabled={isSubmitting}
                  className={`px-6 py-3 rounded-lg font-semibold bg-[#5D17E9] text-white hover:bg-[#4A12BA] transition-colors cursor-pointer ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {isSubmitting ? "Submitting..." : "Submit Strategy"}
                </button>
              </div>

              {strategySubmitted && (
                <div className="mt-2 p-3 bg-green-500/20 border border-green-500 rounded-lg text-green-400 flex items-center">
                  <FiCheckCircle className="mr-2" /> Strategy has been set
                  successfully!
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-8">
            <button
              onClick={() => navigate("/admin")}
              className="px-6 py-3 rounded-lg font-semibold bg-gray-600 text-white hover:bg-gray-700 transition-colors cursor-pointer"
            >
              Back to Dashboard
            </button>

            {!showStrategyForms && (
              <button
                onClick={() => setShowStrategyForms(true)}
                className="px-6 py-3 rounded-lg font-semibold bg-[#5D17E9] text-white hover:bg-[#4A12BA] transition-colors cursor-pointer"
              >
                Set Strategy
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewUserStrategy;
