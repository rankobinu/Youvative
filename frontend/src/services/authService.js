import api from './api';

const authService = {
  login: async (email, password) => {
    try {
      const response = await api.post('/api/auth.php?endpoint=login', { email, password });
      
      if (!response.data.token) {
        throw new Error('Authentication failed: No token received');
      }
      
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('userEmail', email);
      
      return {
        token: response.data.token,
        user: response.data.user // Ensure backend returns user data
      };
    } catch (error) {
      // Improved error handling
      if (error.response?.status === 401) {
        throw new Error('Invalid email or password');
      }
      if (error.response?.status === 500) {
        throw new Error('Server error. Please try again later.');
      }
      throw new Error(error.response?.data?.message || 'Login failed. Please try again.');
    }
  },
  
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
  },
  
  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  }
};

export default authService;
