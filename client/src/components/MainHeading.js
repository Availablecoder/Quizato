// MUI Components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// MUI Hooks
import useTheme from '@mui/material/styles/useTheme';

// ##############################

const MainHeading = ({ text }) => {
  const theme = useTheme();
  return (
    <Box>
      <Typography
        variant="h2"
        sx={{
          position: 'relative',
          pb: '2px',
          pr: 2,
          mb: 3,
          width: 'fit-content',
          // box-shadow: 0px -3px 0px -1px rgba(0,0,0,1) inset;
          boxShadow: `0px -3px 0px -1px ${theme.palette.secondary.light} inset`,
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 1.5,
            right: 0,
            width: '15px',
            height: '15px',
            bgcolor: theme.palette.secondary.light,
            borderRadius: '50%',
            transform: 'translate(50%,50%)',
          },
        }}>
        {text}
      </Typography>
    </Box>
  );
};

export default MainHeading;
