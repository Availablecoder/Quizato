import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllQuizzes } from '../../App/api';

// Get All Quizzes
export const getAllQuizzes = createAsyncThunk(
  'quizzes/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetchAllQuizzes();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
const initialState = {
  quizzes: [],
  quiz: null,
  loading: false,
  error: null,
  openSnack: null,
};

// Quizzes Redux Slice
export const quizzesSlice = createSlice({
  name: 'quizzes',
  initialState,
  reducers: {
    getQuizzes: (state, action) => {
      console.log(action.payload.quizzes);
      state.quizzes = action.payload.quizzes;
    },
    getQuiz: (state, action) => {
      state.quiz = action.payload;
    },
    startLoading: (state) => {
      state.loading = true;
    },
    endLoading: (state) => {
      state.loading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    popSnack: (state, action) => {
      state.openSnack = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  getQuizzes,
  getQuiz,
  startLoading,
  endLoading,
  setError,
  popSnack,
} = quizzesSlice.actions;

export default quizzesSlice.reducer;
