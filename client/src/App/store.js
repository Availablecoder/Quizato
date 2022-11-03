import { configureStore } from '@reduxjs/toolkit';
import quizzesReducer from '../features/quizzes/quizSlice';
import usersReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    quizzes: quizzesReducer,
    users: usersReducer,
  },
});
