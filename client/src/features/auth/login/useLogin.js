import { useState } from 'react';
import { useDispatch } from 'react-redux';
// ---

// Functions
import { fetchLogin } from '../../../App/api';
import { endLoading, userData, setError, startLoading } from '../authSlice';

// #####################

export const useLogin = () => {
  const [alert, setAlert] = useState(null);
  const dispatch = useDispatch();

  const login = async (formData, rememberMe) => {
    // Start loading && Clear Errors
    dispatch(startLoading());
    dispatch(setError(null));
    try {
      // Send a Request of login to our API
      const { data } = await fetchLogin(formData);

      // Save user date in our redux
      dispatch(userData(data));

      // save user data in local storage in the case of checked remeber me switch
      if (rememberMe) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      // Show a success message to user
      setAlert({ type: 'success', message: 'Logged in successfully.' });
    } catch (err) {
      console.log(err); // log error to the console
      const errorMessage = err.response.data.message;

      // Set the error message into our redux and show it to the user
      dispatch(setError(errorMessage));
      setAlert({ type: 'error', message: errorMessage });
    }

    // End loading and hiding alert after 3 seconds
    dispatch(endLoading());
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  return { login, alert };
};
