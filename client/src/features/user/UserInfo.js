import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// React Components
import MainHeading from '../../components/MainHeading';
import UserDrawer from './components/UserDrawer';
import TextInput from '../../components/formComponents/TextInput';

// MUI Components
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

// Functions and Hooks
import useUpdateInfo from './useUpdateInfo';
import { setError, popSnack } from '../auth/authSlice';
import ErrorPage from '../../components/globalComponents/ErrorPage';

// #####################

const UserInfo = () => {
  const { user, error, loading, openSnack } = useSelector(
    (state) => state.users
  );

  const [personalInfoData, setPersonalInfoData] = useState({
    name: user?.name,
    email: user?.email,
    image: user?.image,
  });
  const [tempSrc, setTempSrc] = useState('');
  const [passwordUpdateData, setPasswordUpdateData] = useState({
    currentPassword: '',
    newPassword: '',
    newPasswordConfirm: '',
  });

  const { updateUser, updatePassword } = useUpdateInfo();
  const dispatch = useDispatch();

  const handleChangeUpdateData = (e) => {
    const value = e.target.files ? e.target.files[0] : e.target.value;

    if (e.target.files) {
      // Make a link for the uploaded image
      setTempSrc(URL.createObjectURL(e.target.files[0]));
    }

    setPersonalInfoData((prev) => ({
      ...prev,
      [e.target.name]: value,
    }));
  };
  const handleSubmitUpdateData = async (e) => {
    e.preventDefault();
    const message = await updateUser(personalInfoData);
    dispatch(popSnack({ type: 'success', message }));
  };

  const handleChangeUpdatePassword = (e) => {
    setPasswordUpdateData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    console.log(passwordUpdateData);
  };
  const handleSubmitUpdatePassword = async (e) => {
    e.preventDefault();

    const message = await updatePassword(passwordUpdateData);
    dispatch(popSnack({ type: 'success', message }));
  };

  useEffect(() => {
    setPersonalInfoData({
      name: user?.name,
      email: user?.email,
      image: user?.image,
    });
  }, [user]);

  useEffect(() => {
    if (error) {
      dispatch(popSnack({ type: 'error', message: error }));
      dispatch(setError(null));
    }
  }, [error, dispatch]);

  return (
    <UserDrawer>
      {!user ? (
        <ErrorPage
          title="Unauthorized"
          description="You are not logged, Please login to get access to this page"
          navigator={{ to: '/auth/login', text: 'Login' }}
        />
      ) : (
        <>
          {/* Updating Normal Data */}
          <Box component="form" onSubmit={handleSubmitUpdateData}>
            <MainHeading text="Personal Info" />
            <Stack direction={{ sm: 'column', md: 'row' }} sx={{ mb: 2 }}>
              <TextInput
                name="name"
                label="Full Name"
                type="text"
                handleChange={handleChangeUpdateData}
                defaultValue={user.name}
              />
              <Box sx={{ width: '32px' }} />
              <TextInput
                name="email"
                label="Email"
                type="email"
                handleChange={handleChangeUpdateData}
                defaultValue={user.email}
              />
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center">
              <IconButton variant="outlined" component="label">
                <Tooltip title="Change user image">
                  <Avatar
                    alt={user.name}
                    src={tempSrc || user.image}
                    sx={{
                      width: '75px',
                      height: '75px',
                      bgcolor: 'secondary.light',
                      fontSize: { xs: '22px', md: '30px' },
                    }}>
                    {user.name.split(' ').map((e) => e[0])}
                  </Avatar>
                </Tooltip>
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  name="image"
                  onChange={handleChangeUpdateData}
                />
              </IconButton>
              <Button
                variant="contained"
                type="submit"
                sx={{ position: 'relative' }}
                disabled={loading}>
                Save Changes
                {loading && (
                  <CircularProgress
                    size={24}
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      marginTop: '-12px',
                      marginLeft: '-12px',
                    }}
                  />
                )}
              </Button>
            </Stack>
          </Box>

          <Divider sx={{ my: 4 }} />

          {/* Updating Password */}
          <Box component="form" onSubmit={handleSubmitUpdatePassword}>
            <MainHeading text="Change Password" />
            <Stack direction="column" sx={{ mb: 2 }}>
              <TextInput
                name="currentPassword"
                label="Current Password"
                type="password"
                handleChange={handleChangeUpdatePassword}
              />
              <TextInput
                name="newPassword"
                label="New Password"
                type="password"
                handleChange={handleChangeUpdatePassword}
                isPassword={true}
              />
              <TextInput
                name="newPasswordConfirm"
                label="Confirm New Password"
                type="password"
                handleChange={handleChangeUpdatePassword}
              />
              <Box textAlign="end" pt={2}>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ position: 'relative' }}
                  disabled={loading}>
                  Update Password
                  {loading && (
                    <CircularProgress
                      size={24}
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        marginTop: '-12px',
                        marginLeft: '-12px',
                      }}
                    />
                  )}
                </Button>
              </Box>
            </Stack>
          </Box>

          {/* Snackbar */}
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={!!openSnack}
            onClose={() => dispatch(popSnack(null))}>
            <Alert
              severity={openSnack?.type}
              variant="filled"
              onClose={() => dispatch(popSnack(null))}>
              {openSnack?.message}
            </Alert>
          </Snackbar>
        </>
      )}
    </UserDrawer>
  );
};

export default UserInfo;
