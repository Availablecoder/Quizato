import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// MUI Components
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import Switch from '@mui/material/Switch';
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';

// React Components
import FormBody from '../components/FormBody';
import TextInput from '../../../components/formComponents/TextInput';

// Functions and Hooks
import { useSignup } from './useSignup';

// ############################

const initialState = {
  name: '',
  email: '',
  password: '',
  passwordConfirm: '',
};

const Login = () => {
  const [formData, setFormData] = useState(initialState);
  const [rememberMe, setRememberMe] = useState(true);
  const { user } = useSelector((state) => state.users);
  const { signup, alert } = useSignup();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(formData, rememberMe);
  };

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  return (
    <FormBody>
      <Typography variant="h3" mb={3}>
        Signup
      </Typography>
      <Box component="form" autoComplete="off" onSubmit={handleSubmit}>
        <Collapse in={Boolean(alert)}>
          <Alert severity={alert?.type || 'error'}>{alert?.message}</Alert>
        </Collapse>
        <TextInput
          name="name"
          label="Full Name"
          type="text"
          handleChange={handleChange}
        />
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
        />
        <TextInput
          name="passwordConfirm"
          label="Confirm Password"
          type="password"
          handleChange={handleChange}
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

        <Button
          sx={{ mt: 3, mb: 3 }}
          type="submit"
          variant="contained"
          color="secondary"
          fullWidth>
          Sign up
        </Button>
      </Box>
      <Typography variant="subtitle2" color="text.secondary">
        Already have an account?{' '}
        <Link to="./../login" component={RouterLink}>
          Log in
        </Link>
      </Typography>
    </FormBody>
  );
};

export default Login;
