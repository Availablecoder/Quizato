import { useState, memo } from 'react';

// MUI Components
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';

// Icons
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';
import RadioButtonCheckedRoundedIcon from '@mui/icons-material/RadioButtonCheckedRounded';

// #########################3

const QuizQuestions = ({
  quiz,
  choices,
  setChoices,
  setSubmitButtonAvailablility,
}) => {
  const [question, setQuestion] = useState(1);
  const [currentChoice, setCurrentChoice] = useState(0);

  const handlePaginate = (_e, value) => {
    setQuestion(value);
    setCurrentChoice(0);
  };

  const handleCurrentChoice = (_e, choice) => {
    /**
     * HANDLING CHOICES
     * - Making one choice is a must
     * - making choices array length equal to the questions length in beginning
     * - Checking if the submit button is available to be pressed ot not
     */
    setCurrentChoice(choice ?? currentChoice);

    setChoices((prevChoices) => {
      const newChoices =
        prevChoices.length !== quiz.questions.length
          ? new Array(quiz.questions.length).fill(0)
          : prevChoices;
      newChoices[question - 1] = choice ? choice : newChoices[question - 1];
      return newChoices;
    });

    setSubmitButtonAvailablility(choices.every((e) => !!e));
  };

  return (
    <Box>
      <Typography variant="h4" mb={2}>
        {quiz.questions[question - 1].title}
      </Typography>
      <ToggleButtonGroup
        orientation="vertical"
        color="primary"
        exclusive
        fullWidth
        value={choices[question - 1]}
        onChange={handleCurrentChoice}>
        {quiz.questions[question - 1].choices.map((choice, i) => (
          <ToggleButton
            key={`choice-${i}`}
            value={i + 1}
            sx={{
              justifyContent: 'flex-start',
              textAlign: 'start',
            }}>
            {i + 1 === choices[question - 1] ? (
              <RadioButtonCheckedRoundedIcon sx={{ mr: 1 }} />
            ) : (
              <RadioButtonUncheckedRoundedIcon sx={{ mr: 1 }} />
            )}
            {choice}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <Pagination
        count={10}
        page={question}
        onChange={handlePaginate}
        sx={{
          mt: 2,
          mb: 3,
          display: 'flex',
          justifyContent: 'center',
        }}
      />
    </Box>
  );
};

export default memo(QuizQuestions);
