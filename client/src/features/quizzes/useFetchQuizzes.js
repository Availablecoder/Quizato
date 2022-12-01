import { useDispatch } from 'react-redux';

// Functions
import { fetchAllQuizzes } from '../../App/api';
import { endLoading, setError, startLoading, getQuizzes } from './quizSlice';

// ##################

export const useFetchQuizzes = () => {
  const dispatch = useDispatch();

  const fetchAll = async () => {
    try {
      dispatch(setError(null));
      dispatch(startLoading());
      const { data } = await fetchAllQuizzes();
      console.log(data);

      dispatch(getQuizzes(data));
    } catch (err) {
      console.log(err);
      dispatch(setError(err.response.data.message));
    } finally {
      dispatch(endLoading());
    }
  };

  return { fetchAll };
};
