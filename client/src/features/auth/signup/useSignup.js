import { useState } from 'react';
import { useDispatch } from 'react-redux';

// Functions
import { fetchSignup } from '../../../App/api';
import { endLoading, userData, setError, startLoading } from '../authSlice';

// ##########################

export const useSignup = () => {
  const [alert, setAlert] = useState(null);
  const dispatch = useDispatch();

  const signup = async (formData, rememberMe) => {
    // Start loading && Clear Errors
    dispatch(startLoading());
    dispatch(setError(null));
    try {
      // Send a Request of login to our API
      formData.url = `${window.location.origin}/user/home`;
      const { data } = await fetchSignup(formData);

      console.log(data);

      // Save user date in our redux
      dispatch(userData(data));

      // save user data in local storage in the case of checked remeber me switch
      if (rememberMe) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      // Show a success message to user
      setAlert({ type: 'success', message: 'Signed up successfully.' });
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
    }, 4000);
  };

  return { signup, alert };
};
