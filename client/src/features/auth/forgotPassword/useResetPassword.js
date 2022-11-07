import { useState } from 'react';

// Functions and Hooks
import { fetchForgotPassword, fetchResetPassword } from '../../../App/api';

// ###########################

const useResetPassword = () => {
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendResetToken = async (formData) => {
    setLoading(true);
    setAlert(null);
    try {
      formData.url = `${window.location.origin}/quizato/auth/resetPassword`;
      const { data } = await fetchForgotPassword(formData);
      setAlert({ type: 'info', message: data.message });
      setLoading(false);
      return data;
    } catch (err) {
      console.log(err);
      setAlert({ type: 'error', message: err.response.data.message });
      setLoading(false);
    }
    // setTimeout(() => {
    //   setAlert(null);
    // }, 3000);
  };

  const resetPassword = async (resetToken, formData) => {
    setLoading(true);
    setAlert(null);
    try {
      console.log(formData);
      const { data } = await fetchResetPassword(resetToken, formData);
      console.log(data);
      setAlert({ type: 'success', message: 'Password Updated successfully.' });
      setLoading(false);
      return data;
    } catch (err) {
      console.log(err);
      setAlert({ type: 'error', message: err.response.data.message });
      setLoading(false);
    }
    // setTimeout(() => {
    //   setAlert(null);
    // }, 3000);
  };

  return { sendResetToken, resetPassword, alert, loading };
};

export default useResetPassword;
