import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

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

// #################

const ForgotPassword = () => {
  const [formData, setFormData] = useState({ email: '' });
  const [tokenSended, setTokenSended] = useState(false);

  const { sendResetToken, alert, loading } = useResetPassword();

  // const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, email: e.target.value }));
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await sendResetToken(formData);
    if (response.status === 'success') setTokenSended(true);
  };

  return (
    <FormBody>
      <Typography variant="h3" mb={3}>
        Forgot Password
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Collapse in={!!alert}>
          <Alert severity={alert?.type || 'error'}>{alert?.message}</Alert>
        </Collapse>
        {!tokenSended && (
          <>
            <TextInput
              name="email"
              label="Your email address"
              type="email"
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
                Send Reset Token
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
          </>
        )}
      </Box>
      {!tokenSended && (
        <Typography variant="subtitle2" color="text.secondary">
          Don't remeber your account?{' '}
          <Link to="/" component={RouterLink}>
            Contact support
          </Link>
        </Typography>
      )}
    </FormBody>
  );
};

export default ForgotPassword;
