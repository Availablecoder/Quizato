// MUI Components
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';

// ####################3

const Loader = () => {
  return (
    <Paper
      sx={{
        p: 4,
        m: 3,
        textAlign: 'center',
      }}
      elevation={0}>
      <CircularProgress size={60} color="secondary" disableShrink />
    </Paper>
  );
};

export default Loader;
