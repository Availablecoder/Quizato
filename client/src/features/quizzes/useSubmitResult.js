import { useSelector, useDispatch } from 'react-redux';

// Functions
import { fetchQuizResults, updateQuizResults } from '../../App/api';
import { setError } from './quizSlice';

// ##################

export const useSubmitResult = () => {
  const { token } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const submitResult = async (quizId, choices, timeTaken, oldResult) => {
    try {
      dispatch(setError(null));
      // We check if the user already took this quiz before or not to fetch the correct API
      const { data } = !!!oldResult
        ? await fetchQuizResults(quizId, { choices, timeTaken }, token)
        : await updateQuizResults(
            oldResult,
            {
              choices,
              timeTaken,
              quiz: quizId,
            },
            token
          );

      return data.result;
    } catch (err) {
      console.log(err);
      dispatch(setError(err.response.data.message));
    }
  };

  const submitReview = async (resultId, review) => {
    try {
      dispatch(setError(null));
      await updateQuizResults(resultId, { review }, token);
      return 'Thanks for your feedback.';
    } catch (err) {
      console.log(err);
      dispatch(setError(err.response.data.message));
    }
  };

  return { submitResult, submitReview };
};
