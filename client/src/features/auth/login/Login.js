import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// MUI Components
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Collapse from '@mui/material/Collapse';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';

// React Components
import FormBody from '../components/FormBody';
import TextInput from '../../../components/formComponents/TextInput';

// Functions and Hooks
import { useLogin } from './useLogin';

// ############################

const initialState = {
  email: '',
  password: '',
};

const Login = () => {
  const [formData, setFormData] = useState(initialState);
  const [rememberMe, setRememberMe] = useState(true);
  const { user, loading } = useSelector((state) => state.users);
  const { login, alert } = useLogin();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData, rememberMe);
  };

  // Redirected user to the home page if he accessed login route when he is already logged in
  useEffect(() => {
    // if (user) navigate('/');
    if (user) navigate('/');
  }, [user, navigate]);

  return (
    <FormBody>
      <Typography variant="h3" mb={3}>
        Login
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Collapse in={Boolean(alert)}>
          <Alert severity={alert?.type || 'error'}>{alert?.message}</Alert>
        </Collapse>
        <TextInput
          name="email"
          label="Email"
          type="email"
          handleChange={handleChange}
        />
        <TextInput
          name="password"
          label="Password"
          type="password"
          handleChange={handleChange}
          isPassword={true}
          textHelper={{ link: './../forgotPassword', text: 'forgot password' }}
        />
        <FormControlLabel
          sx={{ width: 'fit-content' }}
          control={
            <Switch
              checked={rememberMe}
              onChange={() => {
                setRememberMe((prev) => !prev);
              }}
            />
          }
          label="Remember me"
        />
        <Box sx={{ position: 'relative' }}>
          <Button
            sx={{ mt: 3, mb: 3 }}
            type="submit"
            variant="contained"
            color="secondary"
            fullWidth
            disabled={loading}>
            Log in
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
        Don't have an account?{' '}
        <Link to="./../signup" component={RouterLink}>
          Sign up
        </Link>
      </Typography>
    </FormBody>
  );
};

export default Login;
