import API from './baseURL';

// Quizzes Routes
export const fetchAllQuizzes = () => API.get('/quizzes');
export const fetchQuiz = (quizId) => API.get(`/quizzes/${quizId}`);

// Results Routes
export const fetchQuizResults = (quizId, data, token) =>
  API.post(`/quizzes/${quizId}/results`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const updateQuizResults = (resultId, data, token) =>
  API.patch(`/results/${resultId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

// Auth Routes
export const fetchLogin = (formData) => API.post('/users/login', formData);
export const fetchSignup = (formData) => API.post('/users/signup', formData);

// Reset Passwords
export const fetchForgotPassword = (formData) =>
  API.post('/users/forgotPassword', formData);

export const fetchResetPassword = (resetToken, formData) =>
  API.patch(`/users/resetPassword/${resetToken}`, formData);

// User Routes
export const fetchGetMe = (token) =>
  API.get('/users/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const fetchUpdateMe = (formData, token) =>
  API.patch('/users/updateMe', formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const fetchUpdatePassword = (formData, token) =>
  API.patch('/users/updatePassword', formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
