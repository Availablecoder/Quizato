import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// MUI Components
import Container from '@mui/material/Container';

// React Components
import Presentation from '../../components/Presentation';
import MainHeading from '../../components/MainHeading';
import Quizzes from './components/Quizzes';
import Loader from '../../components/globalComponents/Loader';

// Functions
import { useFetchQuizzes } from './useFetchQuizzes';

// ###################3

const Home = () => {
  const { loading } = useSelector((state) => state.quizzes);
  const { fetchAll } = useFetchQuizzes();

  useEffect(() => {
    (async () => {
      await fetchAll();
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Presentation
            text="The best Quizzes in your hands"
            isHomePage={true}
          />
          <Container maxWidth="xl">
            <MainHeading text="Quizzes" />
            <Quizzes />
          </Container>
        </>
      )}
    </>
  );
};

export default Home;
