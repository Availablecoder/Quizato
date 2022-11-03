import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

// React Components
import ErrorPage from '../../components/globalComponents/ErrorPage';
import Loader from '../../components/globalComponents/Loader';
import Presentation from '../../components/Presentation';
import MainHeading from '../../components/MainHeading';
import ResultCard from '../../components/ResultCard';
import QuestionsModal from './components/QuestionsModal';

// MUI Components
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Mansory from '@mui/lab/Masonry';

// Icons
import BookRoundedIcon from '@mui/icons-material/BookRounded';
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded';
import PercentRoundedIcon from '@mui/icons-material/PercentRounded';
import StarHalfRoundedIcon from '@mui/icons-material/StarHalfRounded';

// Functions and Hooks
import {
  getQuiz,
  startLoading,
  endLoading,
  setError,
  popSnack,
} from './quizSlice';
import { fetchQuiz } from '../../App/api';

// #######################################

const QuizDetails = () => {
  const [quiz, setQuiz] = useState(null);
  const [openQuestions, setOpenQuestions] = useState(false);

  const { loading, error, openSnack } = useSelector((state) => state.quizzes);
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const { quizSlug } = useParams();

  const handleOpenQuestions = () => {
    setOpenQuestions(true);
  };

  const handleCloseQuestions = () => {
    setOpenQuestions(false);
  };

  // Fetching Quiz Details in the beginning of the program
  useEffect(() => {
    // Get quiz from the API
    (async (quizSlug) => {
      dispatch(startLoading());
      try {
        const { data } = await fetchQuiz(quizSlug);
        dispatch(getQuiz(data.quiz));
        setQuiz(data.quiz);
        dispatch(endLoading());
      } catch (err) {
        console.log(err);
        dispatch(setError(err.response.data.message));
        dispatch(endLoading());
      }
    })(quizSlug);
  }, [dispatch, quizSlug]);

  // Close Questions Model if there is any errors
  useEffect(() => {
    if (error) {
      dispatch(popSnack({ type: 'error', message: error }));
      dispatch(setError(null));
      setOpenQuestions(false);
    }
  }, [error, dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : !quiz ? (
        <ErrorPage title="Can't Find Quiz" description={error} />
      ) : (
        <>
          <Presentation text={quiz.title} isHomePage={false} />
          <Container maxWidth="xl">
            <MainHeading text="Description" />
            <Typography variant="subtitle1" mb={2}>
              {quiz.description}
            </Typography>
            <Box textAlign="end">
              <Button
                variant="contained"
                onClick={handleOpenQuestions}
                disabled={!!!user}>
                Start Quiz
              </Button>
            </Box>
            <Divider sx={{ mb: 3, mt: 3 }} />
            <MainHeading text="Results" />
            <Mansory columns={{ lg: 2, xs: 1 }} spacing={2}>
              {quiz.results.map((result, i) => (
                <ResultCard
                  key={`result-card-${i}`}
                  heading={result.user.name}
                  image={result.user.image}
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
                />
              ))}
            </Mansory>
          </Container>
          {/* Quiz Questions */}
          {openQuestions && (
            <QuestionsModal
              quiz={quiz}
              handleCloseQuestions={handleCloseQuestions}
            />
          )}

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
    </>
  );
};

export default QuizDetails;
