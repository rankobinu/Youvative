import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  userName: '',
  instagram: '',
  location: '',
  goals: '',
  description: '',
  strategy: '',
  strategyTitle: '',
  plan: '',
  planTitle: '',
  paymentCompleted: false
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
