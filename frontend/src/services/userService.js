import api from './api';

const userService = {
  getUserProfile: async () => {
    try {
      const response = await api.get('/api/profile.php');
      return response.data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  },
  
  // Get only username and avatar for navbar
  getUserBasicInfo: async () => {
    try {
      const response = await api.get('/api/profile.php');
      
      // Extract username from the response based on the actual structure
      const { username, email } = response.data.data || {};
      
      // Generate avatar using the email or username
      const avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${email || username || 'fallback'}`;
      
      return { 
        userName: username || 'User', 
        avatar 
      };
    } catch (error) {
      console.error('Error fetching user basic info:', error);
      throw error;
    }
  },
  
  getSubscriptionDetails: async () => {
    const response = await api.get('/user/subscription');
    return response.data;
  },
  
  submitUserForm: async (formData) => {
    const response = await api.post('/user/form', {
      instagram: formData.instagram,
      location: formData.location,
      goal: formData.goals,
      occupation: formData.occupation,
      comment: formData.description
    });
    return response.data;
  }
};

export default userService;
