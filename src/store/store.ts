import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import teamReducer from './teamSlice';
import tasksReducer from './tasksSlice';
import analyticsReducer from './analyticsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    team: teamReducer,
    tasks: tasksReducer,
    analytics: analyticsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
