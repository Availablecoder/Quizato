import { Link as RouterLink } from 'react-router-dom';

// MUI Components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// ############################

const ErrorPage = ({
  title,
  description,
  navigator = { to: '/', text: 'Back Home' },
}) => {
  return (
    <Box
      sx={{
        height: 'calc(100vh - 70px)',
        maxWidth: '700px',
        p: 3,
        m: 'auto',
      }}>
      <Typography variant="h1" mt={3} mb={2}>
        {title}
      </Typography>
      <Typography mb={2}>{description}</Typography>
      {navigator.to === 'reload' ? (
        <Button
          variant="contained"
          color="secondary"
          component={RouterLink}
          reloadDocument>
          {navigator.text}
        </Button>
      ) : (
        <Button
          component={RouterLink}
          to={navigator.to}
          variant="contained"
          color="secondary">
          {navigator.text}
        </Button>
      )}
    </Box>
  );
};

export default ErrorPage;
