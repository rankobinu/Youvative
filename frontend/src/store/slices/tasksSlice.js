import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import taskService from '../../services/taskService';

export const fetchUserTasks = createAsyncThunk(
  'tasks/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const data = await taskService.getUserTasks();
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateStatus',
  async ({ taskId, status }, { rejectWithValue }) => {
    try {
      const data = await taskService.updateTaskStatus(taskId, status);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  tasks: [],
  statistics: {
    done: 0,
    missed: 0,
    upcoming: 0,
    total: 0
  },
  loading: false,
  error: null
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    clearTasks: () => {
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
        
        // Calculate statistics
        state.statistics = {
          done: action.payload.filter(task => task.status === 'done').length,
          missed: action.payload.filter(task => task.status === 'missed').length,
          upcoming: action.payload.filter(task => task.status === 'upcoming').length,
          total: action.payload.length
        };
      })
      .addCase(fetchUserTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch tasks';
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        // Update the task in the tasks array
        const index = state.tasks.findIndex(task => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
        
        // Recalculate statistics
        state.statistics = {
          done: state.tasks.filter(task => task.status === 'done').length,
          missed: state.tasks.filter(task => task.status === 'missed').length,
          upcoming: state.tasks.filter(task => task.status === 'upcoming').length,
          total: state.tasks.length
        };
      });
  }
});

export const { clearTasks } = tasksSlice.actions;
export default tasksSlice.reducer;