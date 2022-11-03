import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// MUI Components
import ThemeProvider from '@mui/system/ThemeProvider';
import CssBaseline from '@mui/material/CssBaseline';

// React Components
import Footer from '../components/globalComponents/Footer';

// Functions and hooks
import theme from './theme';
import routes from './routes';
import { userData } from '../features/auth/authSlice';

// ###########################

const router = createBrowserRouter(routes, {
  basename: '/quizato',
});

function App() {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      !user &&
      localStorage.getItem('user') &&
      localStorage.getItem('token')
    ) {
      dispatch(
        userData({
          user: JSON.parse(localStorage.getItem('user')),
          token: localStorage.getItem('token'),
        })
      );
    }
  }, [user, dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <Navbar /> */}
      <RouterProvider router={router} />
      <Footer />
    </ThemeProvider>
  );
}

export default App;
