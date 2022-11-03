import { useSelector, useDispatch } from 'react-redux';

// Functions
import { fetchUpdateMe, fetchUpdatePassword } from '../../App/api';
import {
  endLoading,
  setError,
  startLoading,
  userData,
} from '../auth/authSlice';

// ####################

const useUpdateInfo = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.users);

  const updateUser = async (data) => {
    const formData = new FormData();

    for (const key in data) {
      formData.append(key, data[key]);
    }

    try {
      // Starting API request
      dispatch(setError(null));
      dispatch(startLoading());
      const { data } = await fetchUpdateMe(formData, token);

      // Save user data
      dispatch(userData({ user: data.user }));
      // We check if the user is existed in the session or the local storage
      if (localStorage.getItem('user')) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      dispatch(endLoading());

      // Return success message
      return 'Data updated successfully';
    } catch (err) {
      console.log(err);
      dispatch(setError(err.response.data.message));
      dispatch(endLoading());
      throw Error(err.response.data.message);
    }
  };

  const updatePassword = async (passwordData) => {
    try {
      dispatch(setError(null));
      dispatch(startLoading());
      const { data } = await fetchUpdatePassword(passwordData, token);
      dispatch(endLoading());

      dispatch(userData({ token: data.token }));
      if (localStorage.getItem('token')) {
        localStorage.setItem('token', JSON.stringify(data.token));
      }

      // Return success message
      return 'Password Changed Successfully';
    } catch (err) {
      console.log(err);
      dispatch(setError(err.response.data.message));
      dispatch(endLoading());
      throw Error(err.response.data.message);
    }
  };

  return { updateUser, updatePassword };
};

export default useUpdateInfo;
