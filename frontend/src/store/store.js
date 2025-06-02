import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import authReducer from "./slices/authSlice";
import tasksReducer from "./slices/tasksSlice";
import subscriptionReducer from "./slices/subscreptionSlice";
import registerReducer from "./slices/registerSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    tasks: tasksReducer,
    subscription: subscriptionReducer,
    register: registerReducer,
  },
});
