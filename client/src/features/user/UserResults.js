import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// MUI Components
import Box from '@mui/material/Box';

// Icons
import BookRoundedIcon from '@mui/icons-material/BookRounded';
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded';
import PercentRoundedIcon from '@mui/icons-material/PercentRounded';
import StarHalfRoundedIcon from '@mui/icons-material/StarHalfRounded';

// React Components
import MainHeading from '../../components/MainHeading';
import UserDrawer from './components/UserDrawer';
import Loader from '../../components/globalComponents/Loader';
import ResultCard from '../../components/ResultCard';

// Functions
import { fetchGetMe } from '../../App/api';
import ErrorPage from '../../components/globalComponents/ErrorPage';

// ##################

const UserResults = () => {
  const [detailedUser, setDetailedUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const { user, token } = useSelector((state) => state.users);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await fetchGetMe(token);
        setDetailedUser(data.user);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    })();
  }, [token]);

  return (
    <UserDrawer>
      {loading ? (
        <Loader />
      ) : !detailedUser && !user ? (
        <ErrorPage
          title="Unauthorized"
          description="You are not logged, Please login to get access to this page"
          navigator={{ to: '/auth/login', text: 'Login' }}
        />
      ) : !detailedUser && user ? (
        <ErrorPage
          title="Reload Requies"
          description="Some changes may not be saved, please reload the page"
          navigator={{ to: 'reload', text: 'Reload' }}
        />
      ) : (
        <Box>
          <MainHeading text="Your Quiz Results" />
          {detailedUser.results.map((result, i) => (
            <Box key={`result-card-${i}`} mb={2}>
              <ResultCard
                heading={result.quiz.title}
                image={result.quiz.image}
                details={[
                  {
                    key: 'degree',
                    icon: <BookRoundedIcon />,
                    value: `${result.rightAnsweredQuestions} / ${result.numOfQuestions}`,
                  },
                  {
                    key: 'time taken',
                    icon: <AccessTimeFilledRoundedIcon />,
                    value: `${result.timeTaken} sec`,
                  },
                  {
                    key: 'percentage',
                    icon: <PercentRoundedIcon />,
                    value: result.percentage,
                  },
                  {
                    key: 'review rating',
                    icon: <StarHalfRoundedIcon />,
                    value: result?.review?.stars,
                  },
                ]}
                reviewText={result?.review?.text || ''}
                squaredAvatar={true}
              />
            </Box>
          ))}
        </Box>
      )}
    </UserDrawer>
  );
};

export default UserResults;
