import { useState } from 'react';
import { useDispatch } from 'react-redux';

// MUI Components
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// Icons
import StarRoundedIcon from '@mui/icons-material/StarRounded';

// Functions and Hooks
import { useSubmitResult } from '../../useSubmitResult';
import { popSnack } from '../../quizSlice';

// ###########################

const ReviewForm = ({ resultId, handleCloseQuestions }) => {
  const [review, setReview] = useState({ stars: 4 });

  const dispatch = useDispatch();
  const { submitReview } = useSubmitResult();

  const handleChange = (key, value) => {
    setReview((prevData) => {
      return { ...prevData, [key]: value };
    });
  };

  const handleSubmitReview = async (e) => {
    handleCloseQuestions();
    try {
      await submitReview(resultId, review);

      dispatch(
        popSnack({ type: 'success', message: 'Thanks for your feedback!' })
      );
    } catch (err) {
      dispatch(popSnack({ type: 'error', message: 'Failed to send review' }));
    }
  };

  return (
    <Box>
      <Typography
        variant="h4"
        color="secondary"
        textAlign="center"
        gutterBottom>
        Leave a review
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 3,
        }}>
        <Rating
          defaultValue={4}
          precision={0.5}
          icon={<StarRoundedIcon sx={{ fontSize: '40px' }} />}
          emptyIcon={
            <StarRoundedIcon sx={{ color: '#eee', fontSize: '40px' }} />
          }
          onChange={(e, val) => {
            handleChange('stars', val);
          }}
        />
        <Typography sx={{ width: '50px' }} variant="h5" ml={1}>
          {review.stars}
        </Typography>
      </Box>
      <TextField
        label="Review text"
        multiline
        fullWidth
        rows={3}
        onChange={(e) => {
          handleChange('text', e.target.value);
        }}
      />
      <Button
        color="primary"
        variant="contained"
        sx={{ my: 2 }}
        fullWidth
        onClick={handleSubmitReview}>
        Submit Review
      </Button>
      <Button color="grey" fullWidth onClick={handleCloseQuestions}>
        Close
      </Button>
    </Box>
  );
};

export default ReviewForm;
