import { useSelector } from 'react-redux';

// React Components
import QuizCard from './QuizCard';

// MUI Components
import Grid from '@mui/material/Grid';

// ##################

const Quizzes = () => {
  const { quizzes } = useSelector((state) => state.quizzes);

  return (
    <Grid container spacing={3}>
      {quizzes &&
        quizzes.map((quiz) => (
          <Grid item key={quiz._id} xs={12} sm={6} lg={4}>
            <QuizCard
              title={quiz.title}
              subDescription={quiz.subDescription}
              image={quiz.image}
              tags={quiz.tags}
              averageRating={quiz.averageRating}
              slug={quiz.slug || '/'}
            />
          </Grid>
        ))}
    </Grid>
  );
};

export default Quizzes;
