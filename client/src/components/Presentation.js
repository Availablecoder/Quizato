import { Link as RouterLink } from 'react-router-dom';

// MUI Components
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// MUI Hooks
import useTheme from '@mui/material/styles/useTheme';

// #######################

const Presentation = ({ text, isHomePage }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        p: 2,
        mb: 4,
        bgcolor: theme.palette.secondary.light,
        background:
          'linear-gradient(90deg,rgba(255,0,177,0.27) 0%, #ccc5ee 80%)',
        minHeight: '350px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}>
      <Typography variant="h1" gutterBottom>
        {text}
      </Typography>
      {isHomePage && (
        <Button
          variant="contained"
          size="large"
          to="/auth/signup"
          component={RouterLink}>
          Get Started
        </Button>
      )}
    </Box>
  );
};

export default Presentation;
