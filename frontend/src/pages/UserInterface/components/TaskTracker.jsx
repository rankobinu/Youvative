import React, { useState, useEffect } from "react";
import { FiCheckCircle, FiXCircle, FiClock, FiCalendar } from "react-icons/fi";
import taskService from "../../../services/taskService";

function TaskTracker() {
  const [tasks, setTasks] = useState([]);
  const [taskCounts, setTaskCounts] = useState({
    done: 0,
    missed: 0,
    upcoming: 0,
    total: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateError, setUpdateError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        // Fetch tasks from the backend
        const tasksData = await taskService.getUserTasks();
        setTasks(tasksData);

        // Calculate task counts
        const counts = {
          done: tasksData.filter((task) => task.status === "done").length,
          missed: tasksData.filter((task) => task.status === "missed").length,
          upcoming: tasksData.filter((task) => task.status === "upcoming")
            .length,
          total: tasksData.length,
        };

        setTaskCounts(counts);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setError("Failed to load tasks");
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const markTaskAsDone = async (taskId) => {
    try {
      setIsUpdating(true);
      setUpdateError(null);

      // Update task status in the backend
      await taskService.updateTaskStatus(taskId, "done");

      // Update local state
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId
            ? { ...task, status: "done", completed: true }
            : task,
        ),
      );

      // Update task counts
      setTaskCounts((prev) => ({
        ...prev,
        done: prev.done + 1,
        upcoming: prev.upcoming - 1,
      }));

      setIsUpdating(false);
    } catch (err) {
      console.error("Error marking task as done:", err);
      setUpdateError("Failed to mark task as done. Please try again.");
      setIsUpdating(false);
    }
  };

  const getTodayTask = () => {
    const today = new Date().toISOString().split("T")[0];
    return tasks.find(
      (task) => task.date === today && task.status === "upcoming",
    );
  };

  const getNextUpcomingTasks = () => {
    const today = new Date().toISOString().split("T")[0];
    return tasks
      .filter((task) => task.status === "upcoming" && task.date > today)
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  const todayTask = getTodayTask();
  const nextUpcomingTasks = getNextUpcomingTasks();

  if (loading) {
    return <div className="text-white text-center py-10">Loading tasks...</div>;
  }

  if (error) {
    return <div className="text-red-400 text-center py-10">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-white mb-4">Task Tracker</h2>

      {updateError && (
        <div className="bg-red-500/10 text-red-400 p-4 rounded-lg mb-4">
          {updateError}
        </div>
      )}

      {/* Task Summary */}
      <div className="max-w-sm mb-6">
        <div className="flex justify-start items-center">
          <p className="text-white text-xl font-bold">Upcoming Tasks:</p>
          <span className="text-white mx-2 text-xl font-semibold">
            {taskCounts.upcoming}
          </span>
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
                <span className="text-[#21BFE4] font-semibold">
                  {todayTask.date}
                </span>
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
                disabled={isUpdating}
                className={`px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors ${isUpdating ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {isUpdating ? "Updating..." : "Mark as Done"}
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
        <h3 className="text-xl font-semibold mb-4 text-white">Next Task</h3>

        {nextUpcomingTasks[0] ? (
          <div className="bg-white/5 p-4 rounded-lg border-l-4 border-[#21BFE4]">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <FiCalendar className="text-[#21BFE4]" />
                <span className="text-[#21BFE4] font-semibold">
                  {nextUpcomingTasks[0].date}
                </span>
              </div>
              <span className="px-2 py-1 text-xs font-semibold rounded-full bg-white/10 text-white">
                {nextUpcomingTasks[0].type}
              </span>
            </div>
            <h4 className="text-white font-semibold mb-1">
              {nextUpcomingTasks[0].title}
            </h4>
            <p className="text-gray-400 text-sm mb-3">
              {nextUpcomingTasks[0].purpose}
            </p>
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-gray-400">No Upcoming Tasks</p>
          </div>
        )}
      </div>

      {/* Task Categories */}
      <div className="space-y-6">
        {/* Upcoming Tasks */}
        {nextUpcomingTasks.length > 0 && (
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
              Upcoming Tasks
            </h3>
            <div className="space-y-3">
              {nextUpcomingTasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-white/5 p-4 rounded-lg flex items-start justify-between border-l-4 border-white"
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
