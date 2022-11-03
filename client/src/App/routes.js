import ErrorPage from '../components/globalComponents/ErrorPage';
import Navbar from '../components/globalComponents/Navbar';
import ForgotPassword from '../features/auth/forgotPassword/ForgotPassword';
import ResetPassword from '../features/auth/forgotPassword/ResetPassword';
import Login from '../features/auth/login/Login';
import Signup from '../features/auth/signup/Signup';
import Home from '../features/quizzes/Home';
import QuizDetails from '../features/quizzes/QuizDetails';
import UserInfo from '../features/user/UserInfo';
import UserResults from '../features/user/UserResults';

const renderPage = (component) => (
  <>
    <Navbar />
    {component}
  </>
);

const routes = [
  {
    path: '/',
    element: renderPage(<Home />),
    errorElement: (
      <ErrorPage
        title="Page Not Found"
        description="We could not find the page you were looking for 😕"
      />
    ),
  },
  {
    path: '/quizzes/:quizSlug',
    element: renderPage(<QuizDetails />),
  },

  {
    path: '/auth/login',
    element: renderPage(<Login />),
  },
  {
    path: '/auth/signup',
    element: renderPage(<Signup />),
  },
  {
    path: '/auth/forgotPassword',
    element: renderPage(<ForgotPassword />),
  },
  {
    path: '/auth/resetPassword/:token',
    element: renderPage(<ResetPassword />),
  },

  {
    path: '/user/home',
    element: <UserInfo />,
  },
  {
    path: '/user/results',
    element: <UserResults />,
  },
];

export default routes;
