import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import subscriptionService from "../../services/subscriptionService";

export const createSubscription = createAsyncThunk(
  "subscription/create",
  async ({ userId, subscriptionData }, { rejectWithValue }) => {
    try {
      const data = await subscriptionService.createSubscription(
        userId,
        subscriptionData,
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Subscription creation failed" },
      );
    }
  },
);

const initialState = {
  subscriptionId: null,
  loading: false,
  error: null,
  success: false,
};

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    clearSubscriptionState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.subscriptionId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createSubscription.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.subscriptionId = action.payload.subscription_id;
      })
      .addCase(createSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to create subscription";
      });
  },
});

export const { clearSubscriptionState } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
