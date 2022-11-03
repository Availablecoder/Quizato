import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

// MUI Conponents
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Button, Divider } from '@mui/material';

// Icons
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';

// Functions and hooks
import { useLogout } from '../../features/auth/useLogout';

// -----------------

const Navbar = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { user } = useSelector((state) => state.users);
  const logout = useLogout();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    handleCloseUserMenu();
    logout();
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Typography
            variant="h3"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              fontWeight: 700,
              letterSpacing: '2px',
              color: 'inherit',
              textDecoration: 'none',
            }}>
            Quizato
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            {user ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={user.name}
                      src={user.image || ''}
                      sx={{ bgcolor: 'secondary.light' }}>
                      {user.name.split(' ').map((e) => e[0])}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}>
                  <MenuItem
                    onClick={handleCloseUserMenu}
                    component={RouterLink}
                    to="/user/home">
                    <PersonRoundedIcon fontSize="small" /> &nbsp;&nbsp;Account
                  </MenuItem>
                  <MenuItem
                    onClick={handleCloseUserMenu}
                    component={RouterLink}
                    to="/user/results">
                    <SettingsRoundedIcon fontSize="small" /> &nbsp;&nbsp;Results
                  </MenuItem>

                  <Divider />
                  <MenuItem onClick={handleLogout}>
                    <ExitToAppRoundedIcon fontSize="small" /> &nbsp;&nbsp;Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button
                  color="grey"
                  to="/auth/login"
                  component={RouterLink}
                  variant="contained"
                  size="medium">
                  Login
                </Button>
                &nbsp;&nbsp;&nbsp;
                <Button
                  color="secondary"
                  to="/auth/signup"
                  component={RouterLink}
                  variant="contained"
                  size="medium">
                  Sign up
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
