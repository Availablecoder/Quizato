import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// MUI Components
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';

// React Components
import Loader from '../../../components/globalComponents/Loader';
import UserResult from './questions/UserResult';
import ReviewForm from './questions/ReviewForm';
import QuizQuestions from './questions/QuizQuestions';

// Functions and Hooks
import { useSubmitResult } from '../useSubmitResult';

// ##############################

const QuestionsModal = ({ quiz, handleCloseQuestions }) => {
  const [loading, setLoading] = useState(false);
  const [choices, setChoices] = useState(
    new Array(quiz?.questions?.length).fill(0)
  ); // User Choices
  const [timeTaken, setTimeTaken] = useState(0);
  const [submitButtonAvailablility, setSubmitButtonAvailablility] =
    useState(false);
  const [modalRendered, setModalRendered] = useState('');
  const [modalData, setModalData] = useState(null);
  const [resultId, setResultId] = useState(''); // save result ID after posting (creating a result document)

  const { submitResult } = useSubmitResult();
  const { user } = useSelector((state) => state.users);

  const handleSubmitQuestions = async (e) => {
    // Check if there is a result or not to prevent dublicate error
    let result;
    if (quiz.results.length > 0) {
      result = quiz.results.find((e) => e.user._id === user?._id)?._id;
    }
    setLoading(true);
    const data = await submitResult(quiz._id, choices, timeTaken, result);
    setLoading(false);
    setResultId(data._id);

    // (||) is the separator that we will use to put data as {key, value}
    setModalData([
      `Result ||${data.rightAnsweredQuestions} / ${data.numOfQuestions}`,
      `Time taken ||${data.timeTaken}sec`,
      `Percentage ||${data.percentage}%`,
    ]);
    setModalRendered('user-result');
  };

  //
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeTaken((prevTime) => ++prevTime);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeTaken]);

  return (
    <Modal open={true}>
      <Paper
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          p: 3,
          width: 'calc(100% - 16px)',
          maxWidth: '500px',
          maxHeight: '90vh',
          overflow: 'auto',
        }}>
        <Typography variant="h3">{quiz.title} Questions</Typography>
        <Divider sx={{ my: 2 }} />

        {/* Questions Component */}
        {loading ? (
          <Loader />
        ) : modalRendered === 'user-result' ? (
          // Render User result after submiting results
          <>
            <UserResult resultData={modalData} />{' '}
            <Button
              color="primary"
              variant="contained"
              sx={{ my: 2 }}
              fullWidth
              onClick={() => setModalRendered('review-form')}>
              Leave a review
            </Button>
            <Button color="grey" fullWidth onClick={handleCloseQuestions}>
              May be Later
            </Button>
          </>
        ) : modalRendered === 'review-form' ? (
          // Render review form if the user wants to leave a review after quiz
          <ReviewForm
            resultId={resultId}
            handleCloseQuestions={handleCloseQuestions}
          />
        ) : (
          // Default Render which is the quiz questions
          <>
            <QuizQuestions
              quiz={quiz}
              choices={choices}
              setChoices={setChoices}
              setSubmitButtonAvailablility={setSubmitButtonAvailablility}
            />
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-end">
              <Button
                variant="contained"
                color="grey"
                onClick={handleCloseQuestions}>
                Close
              </Button>
              <Typography variant="h6">time: {timeTaken} sec</Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleSubmitQuestions}
                disabled={!submitButtonAvailablility}>
                Submit
              </Button>
            </Stack>
          </>
        )}
      </Paper>
    </Modal>
  );
};

export default QuestionsModal;
