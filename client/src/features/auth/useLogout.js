import { useDispatch } from 'react-redux';
import { logoutUser } from './authSlice';

// #############

export const useLogout = () => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutUser());
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return logout;
};
