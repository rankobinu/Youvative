import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: 'aly@example.com',
  userName: 'Aly',
  instagram: 'Alyy',
  location: 'Algeria',
  goals: 'Grow Followers',
  description: 'Content creator focused on lifestyle and tech reviews',
  strategy: 'Branding Strategy',
  plan: 'Growth Plan',
  status: 'inactive'
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearUserData: () => {
      return initialState;
    }
  }
});

export const { setUserData, clearUserData } = userSlice.actions;
export default userSlice.reducer;
