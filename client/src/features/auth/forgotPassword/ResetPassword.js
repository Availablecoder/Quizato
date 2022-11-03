import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';

// MUI Components
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Collapse from '@mui/material/Collapse';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

// React Component
import FormBody from '../components/FormBody';
import TextInput from '../../../components/formComponents/TextInput';

// Functions and hooks
import useResetPassword from './useResetPassword';
import { userData } from '../authSlice';

// #################

const ResetPassword = () => {
  const [formData, setFormData] = useState({});

  const { resetPassword, alert, loading } = useResetPassword();
  const dipatch = useDispatch();
  const { token } = useParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(token, formData);
    const response = await resetPassword(token, formData);
    if (response.status === 'success') {
      dipatch(userData({ user: response.user, token: response.token }));
      setTimeout(() => {
        navigate('/');
      }, 1500);
    }
  };

  return (
    <FormBody>
      <Typography variant="h3" mb={3}>
        Reset Password
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Collapse in={!!alert}>
          <Alert severity={alert?.type || 'error'}>{alert?.message}</Alert>
        </Collapse>

        <TextInput
          name="password"
          label="Password"
          type="password"
          isPassword={true}
          handleChange={handleChange}
        />
        <TextInput
          name="passwordConfirm"
          label="Confirm Password"
          type="password"
          handleChange={handleChange}
        />
        <Box sx={{ position: 'relative' }}>
          <Button
            sx={{ mt: 3, mb: 3 }}
            type="submit"
            variant="contained"
            color="secondary"
            fullWidth
            disabled={loading}>
            Update Password
          </Button>
          {loading && (
            <CircularProgress
              size={24}
              color="secondary"
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: '-12px',
                marginLeft: '-12px',
              }}
            />
          )}
        </Box>
      </Box>
      <Typography variant="subtitle2" color="text.secondary">
        Are you facing Problems?{' '}
        <Link to="/" component={RouterLink}>
          Contact support
        </Link>
      </Typography>
    </FormBody>
  );
};

export default ResetPassword;
