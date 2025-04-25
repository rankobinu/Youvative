import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  instagram: '',
  location: '',
  goals: '',
  description: ''
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearUserData: (state) => {
      return initialState;
    }
  }
});

export const { setUserData, clearUserData } = userSlice.actions;
export default userSlice.reducer;