import api from './api';

const taskService = {
  getUserTasks: async () => {
    try {
      const response = await api.get('/api/task.php');
      
      // Check if the response has the expected structure
      if (response.data && response.data.status && response.data.tasks) {
        // Map backend task format to frontend expected format
        return response.data.tasks.map(task => ({
          id: task.id,
          date: task.date,
          type: task.type,
          title: task.headline, // Map headline to title
          purpose: task.purpose,
          status: task.status
        }));
      }
      
      return [];
    } catch (error) {
      console.error('Error fetching tasks:', error);
      return [];
    }
  },
  
  getNextUpcomingTask: async () => {
    try {
      const response = await api.get('/api/task.php');
      
      // Extract tasks from the response
      const tasks = response.data.tasks || [];
      
      // Get today's date in YYYY-MM-DD format
      const today = new Date().toISOString().split('T')[0];
      
      // Find the nearest upcoming task
      const upcomingTasks = tasks
        .filter(task => task.status === 'upcoming' && task.date >= today)
        .sort((a, b) => new Date(a.date) - new Date(b.date));
      
      if (upcomingTasks.length > 0) {
        const nextTask = upcomingTasks[0];
        return {
          id: nextTask.id,
          date: nextTask.date,
          type: nextTask.type,
          title: nextTask.headline, // Map headline to title
          purpose: nextTask.purpose,
          status: nextTask.status
        };
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching next upcoming task:', error);
      return null;
    }
  },
  
  updateTaskStatus: async (taskId, status) => {
    try {
      // Update to use the correct endpoint format
      const response = await api.put(`/api/task.php?task_id=${taskId}`, { status });
      
      if (!response.data.status) {
        throw new Error(response.data.message || 'Failed to update task status');
      }
      
      return response.data;
    } catch (error) {
      console.error(`Error updating task ${taskId}:`, error);
      throw error;
    }
  },
  
  getTasksByDate: async (date) => {
    try {
      const response = await api.get(`/api/task.php?date=${date}`);
      
      if (response.data && response.data.status && response.data.tasks) {
        // Filter tasks by the requested date and map to expected format
        return response.data.tasks
          .filter(task => task.date === date)
          .map(task => ({
            id: task.id,
            date: task.date,
            type: task.type,
            title: task.headline, // Map headline to title
            purpose: task.purpose,
            status: task.status
          }));
      }
      
      return [];
    } catch (error) {
      console.error('Error fetching tasks by date:', error);
      return [];
    }
  }
};

export default taskService;
