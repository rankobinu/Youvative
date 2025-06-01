import api from './api';

// Mock data for development if needed
const useMockData = import.meta.env.VITE_USE_MOCK_DATA === 'true';

const adminService = {
  getDashboardStats: async () => {
    try {
      // If using mock data for development
      if (useMockData) {
        return {
          totalUsers: 120,
          newUsers: 15,
          activeUsers: 80,
          inactiveUsers: 20,
          resubscribedUsers: 5
        };
      }
      
      const response = await api.get('/api/admin/dashboard.php?endpoint=stats');
      
      if (!response.data.success) {
        throw new Error(response.data.error || 'Failed to fetch stats');
      }

      // Transform backend keys to frontend expected format
      return {
        totalUsers: response.data.data.total_users || 0,
        newUsers: response.data.data.new_users || 0,
        activeUsers: response.data.data.active_users || 0,
        inactiveUsers: response.data.data.inactive_users || 0,
        resubscribedUsers: response.data.data.resubscribed_users || 0
      };
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      
      // If there's a CORS error or network error, provide mock data in development
      if (import.meta.env.DEV && (error.message.includes('CORS') || error.message.includes('Network Error'))) {
        console.warn('Using mock data due to CORS/Network error in development');
        return {
          totalUsers: 120,
          newUsers: 15,
          activeUsers: 80,
          inactiveUsers: 20,
          resubscribedUsers: 5
        };
      }
      
      throw error;
    }
  },
  
  getNewUsers: async () => {
    try {
      if (useMockData) {
        return {
          success: true,
          data: {
            users: [
              {
                id: 1,
                username: 'John Doe',
                email: 'john@example.com',
                created_at: '2024-02-20 10:30:00',
                status: 'pending'
              },
              {
                id: 2,
                username: 'Sarah Smith',
                email: 'sarah@example.com',
                created_at: '2024-02-21 14:45:00',
                status: 'pending'
              }
            ],
            pagination: {
              total: 2,
              page: 1,
              limit: 10,
              pages: 1
            }
          }
        };
      }
      
      const response = await api.get('/api/admin/users.php?endpoint=new');
      
      if (!response.data.success) {
        throw new Error(response.data.error || 'Failed to fetch new users');
      }
      
      return response.data;
    } catch (error) {
      console.error('Error fetching new users:', error);
      
      if (import.meta.env.DEV && (error.message.includes('CORS') || error.message.includes('Network Error'))) {
        return {
          success: true,
          data: {
            users: [
              {
                id: 1,
                username: 'John Doe',
                email: 'john@example.com',
                created_at: '2024-02-20 10:30:00',
                status: 'pending'
              },
              {
                id: 2,
                username: 'Sarah Smith',
                email: 'sarah@example.com',
                created_at: '2024-02-21 14:45:00',
                status: 'pending'
              }
            ],
            pagination: {
              total: 2,
              page: 1,
              limit: 10,
              pages: 1
            }
          }
        };
      }
      
      throw error;
    }
  },
  
  getActiveUsers: async () => {
    try {
      if (useMockData) {
        return {
          success: true,
          data: {
            users: [
              {
                id: 1,
                username: 'John Doe',
                email: 'john@example.com',
                created_at: '2024-02-20 10:30:00',
                status: 'active'
              },
              {
                id: 2,
                username: 'Sarah Smith',
                email: 'sarah@example.com',
                created_at: '2024-02-21 14:45:00',
                status: 'active'
              }
            ],
            pagination: {
              total: 2,
              page: 1,
              limit: 10,
              pages: 1
            }
          }
        };
      }
      
      const response = await api.get('/api/admin/users.php?endpoint=active');
      
      if (!response.data.success) {
        throw new Error(response.data.error || 'Failed to fetch active users');
      }
      
      return response.data;
    } catch (error) {
      console.error('Error fetching active users:', error);
      
      if (import.meta.env.DEV && (error.message.includes('CORS') || error.message.includes('Network Error'))) {
        return {
          success: true,
          data: {
            users: [
              {
                id: 1,
                username: 'John Doe',
                email: 'john@example.com',
                created_at: '2024-02-20 10:30:00',
                status: 'active'
              },
              {
                id: 2,
                username: 'Sarah Smith',
                email: 'sarah@example.com',
                created_at: '2024-02-21 14:45:00',
                status: 'active'
              }
            ],
            pagination: {
              total: 2,
              page: 1,
              limit: 10,
              pages: 1
            }
          }
        };
      }
      
      throw error;
    }
  },
  
  getInactiveUsers: async () => {
    try {
      if (useMockData) {
        return {
          success: true,
          data: {
            users: [
              {
                id: 1,
                username: 'John Doe',
                email: 'john@example.com',
                created_at: '2024-02-20 10:30:00',
                status: 'inactive'
              },
              {
                id: 2,
                username: 'Sarah Smith',
                email: 'sarah@example.com',
                created_at: '2024-02-21 14:45:00',
                status: 'inactive'
              }
            ],
            pagination: {
              total: 2,
              page: 1,
              limit: 10,
              pages: 1
            }
          }
        };
      }
      
      const response = await api.get('/api/admin/users.php?endpoint=inactive');
      
      if (!response.data.success) {
        throw new Error(response.data.error || 'Failed to fetch inactive users');
      }
      
      return response.data;
    } catch (error) {
      console.error('Error fetching inactive users:', error);
      
      if (import.meta.env.DEV && (error.message.includes('CORS') || error.message.includes('Network Error'))) {
        return {
          success: true,
          data: {
            users: [
              {
                id: 1,
                username: 'John Doe',
                email: 'john@example.com',
                created_at: '2024-02-20 10:30:00',
                status: 'inactive'
              },
              {
                id: 2,
                username: 'Sarah Smith',
                email: 'sarah@example.com',
                created_at: '2024-02-21 14:45:00',
                status: 'inactive'
              }
            ],
            pagination: {
              total: 2,
              page: 1,
              limit: 10,
              pages: 1
            }
          }
        };
      }
      
      throw error;
    }
  },
  
  getResubscribedUsers: async () => {
    try {
      if (useMockData) {
        return {
          success: true,
          data: {
            users: [
              {
                id: 1,
                username: 'John Doe',
                email: 'john@example.com',
                created_at: '2024-02-20 10:30:00',
                status: 'resubscribed'
              },
              {
                id: 2,
                username: 'Sarah Smith',
                email: 'sarah@example.com',
                created_at: '2024-02-21 14:45:00',
                status: 'resubscribed'
              }
            ],
            pagination: {
              total: 2,
              page: 1,
              limit: 10,
              pages: 1
            }
          }
        };
      }
      
      const response = await api.get('/api/admin/users.php?endpoint=resubscribed');
      
      if (!response.data.success) {
        throw new Error(response.data.error || 'Failed to fetch resubscribed users');
      }
      
      return response.data;
    } catch (error) {
      console.error('Error fetching resubscribed users:', error);
      
      if (import.meta.env.DEV && (error.message.includes('CORS') || error.message.includes('Network Error'))) {
        return {
          success: true,
          data: {
            users: [
              {
                id: 1,
                username: 'John Doe',
                email: 'john@example.com',
                created_at: '2024-02-20 10:30:00',
                status: 'resubscribed'
              },
              {
                id: 2,
                username: 'Sarah Smith',
                email: 'sarah@example.com',
                created_at: '2024-02-21 14:45:00',
                status: 'resubscribed'
              }
            ],
            pagination: {
              total: 2,
              page: 1,
              limit: 10,
              pages: 1
            }
          }
        };
      }
      
      throw error;
    }
  },
  
  getUserDetails: async (userId) => {
    try {
      console.log('Fetching user details for ID:', userId);
      const response = await api.get(`/api/admin/users.php?id=${userId}`);
      console.log('Backend response:', response.data);
      
      if (!response.data.success || !response.data.data.status) {
        throw new Error(response.data.message || 'Failed to fetch user details');
      }

      // Extract user data from the nested structure
      const userData = response.data.data.user;
      const tasks = response.data.tasks
      const strategies = response.data.strategies
      console.log('Extracted user data:', userData);

      return {
        id: userData.id,
        userName: userData.username,
        email: userData.email,
        instagram: userData.instagram || '',
        location: userData.location || '',
        occupation: userData.occupation || '',
        goals: userData.goal || '',
        description: userData.comment || '',
        registrationDate: userData.created_at,
        subscriptionEndDate: null, // Since subscription is null in the response
        avatar: userData.avatar,
        plan: 'Not subscribed', // Since subscription is null
        strategy: userData.strategy_type || '',
        status: userData.status || 'new subscriber',
        // Since strategies array is empty, provide default values
        generalStrategy: strategies.filter(strat => ),
        monthlyStrategy: {
          goal: '',
          description: '',
        },
        tasks: tasks
      };
    } catch (error) {
      console.error(`Error fetching user details for user ${userId}:`, error);
      throw error;
    }
  },
  
  setUserStrategy: async (userId, strategyData) => {
    try {
      const response = await api.post(`/api/admin/create_strategy.php`, {
        userId,
        ...strategyData
      });
      
      if (!response.data.success) {
        throw new Error(response.data.error || 'Failed to set user strategy');
      }
      
      return response.data;
    } catch (error) {
      console.error(`Error setting strategy for user ${userId}:`, error);
      throw error;
    }
  },
  
  addUserTask: async (userId, taskData) => {
    try {
      const response = await api.post(`/api/admin/users.php?endpoint=tasks&userId=${userId}`, taskData);
      return response.data;
    } catch (error) {
      console.error(`Error adding task for user ${userId}:`, error);
      throw error;
    }
  }
};

export default adminService;
