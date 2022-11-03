// MUI Components
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

// ###################

const FormBody = ({ children }) => {
  return (
    <Box sx={{ px: 2, mt: 5, display: 'flex', justifyContent: 'center' }}>
      <Paper
        sx={{
          p: 3,
          maxWidth: '500px',
        }}
        elevation={3}>
        {children}
      </Paper>
    </Box>
  );
};

export default FormBody;
