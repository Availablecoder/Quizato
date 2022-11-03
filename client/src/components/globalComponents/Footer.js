// MUI Components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// #######################

const Footer = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        zIndex: '1300',
      }}>
      <Typography p={2} bgcolor="#222" color="#fff" textAlign="center">
        &copy; {new Date(Date.now()).getFullYear()} Quizato , All Right Reserved
      </Typography>
    </Box>
  );
};

export default Footer;
