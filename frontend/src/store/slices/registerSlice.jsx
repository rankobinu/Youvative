import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import registerService from '../../services/registerService';

// Initial state for the registration process
const initialState = {
  currentStep: 1,
  // Step 1: Sign Up data
  signUpData: {
    email: '',
    username: '',
    password: ''
  },
  // Step 2: Form data
  formData: {
    instagram: '',
    location: '',
    goal: '',
    occupation: '',
    comment: ''
  },
  // Step 3: Strategy data
  strategyData: {
    strategy_type: ''
  },
  // Status tracking
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
};

// Async thunk for submitting registration data
export const submitRegistration = createAsyncThunk(
  'register/submit',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const { signUpData, formData, strategyData } = state.register;
      // Log the data being sent for debugging
      console.log('Submitting registration data:', {
        ...signUpData,
        ...formData,
        strategy_type: strategyData.strategy_type
      });
      
      // Combine all data for submission
      const registrationData = {
        ...signUpData,
        ...formData,
        strategy_type: strategyData.strategy_type
      };
      
      // Submit to backend
      const response = await registerService.registerUser(registrationData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Registration failed');
    }
  }
);

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    // Update sign up data (step 1)
    updateSignUpData: (state, action) => {
      state.signUpData = {
        ...state.signUpData,
        ...action.payload
      };
    },
    
    // Update form data (step 2)
    updateFormData: (state, action) => {
      state.formData = {
        ...state.formData,
        ...action.payload
      };
    },
    
    // Update strategy data (step 3)
    updateStrategyData: (state, action) => {
      state.strategyData = {
        ...state.strategyData,
        ...action.payload
      };
    },
    
    // Move to next step
    nextStep: (state) => {
      if (state.currentStep < 3) {
        state.currentStep += 1;
      }
    },
    
    // Move to previous step
    prevStep: (state) => {
      if (state.currentStep > 1) {
        state.currentStep -= 1;
      }
    },
    
    // Set specific step
    setStep: (state, action) => {
      state.currentStep = action.payload;
    },
    
    // Reset registration state
    resetRegistration: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitRegistration.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(submitRegistration.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(submitRegistration.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Registration failed';
      });
  }
});

export const { 
  updateSignUpData, 
  updateFormData, 
  updateStrategyData,
  nextStep,
  prevStep,
  setStep,
  resetRegistration
} = registerSlice.actions;

export default registerSlice.reducer;