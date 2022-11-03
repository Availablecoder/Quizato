// MUI Components
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';

// ##############################

const ResultCard = ({ heading, image, details, reviewText, squaredAvatar }) => {
  return (
    <Paper elevation={2} sx={{ p: { xs: 2, md: 3 }, borderRadius: '10px' }}>
      <Stack direction="row">
        <Avatar
          alt={heading}
          src={image}
          variant={squaredAvatar && 'rounded'}
          sx={{
            width: { xs: '50px', md: '75px' },
            height: { xs: '50px', md: '75px' },
            bgcolor: !image ? 'primary.light' : 'none',
            mr: { xs: 1, md: 3 },
            fontSize: { xs: '22px', md: '30px' },
          }}>
          {heading.split(' ')[0][0] + heading.split(' ')[1][0]}
        </Avatar>
        <Box sx={{ flex: 1, pr: { md: 3 } }}>
          <Typography variant="h4" gutterBottom>
            {heading}
          </Typography>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center">
            {details.map((detail, i) => (
              <Tooltip key={`det-${i}`} title={detail.key}>
                <Typography
                  color="text.secondary"
                  sx={{ display: 'flex', alignItems: 'center' }}>
                  {detail.icon}&nbsp;{detail.value}
                </Typography>
              </Tooltip>
            ))}
          </Stack>
        </Box>
      </Stack>
      {reviewText && (
        <Stack direction="row">
          <Typography
            variant="subtitle1"
            mt={2}
            sx={{
              width: { md: '75px' },
              mr: { xs: 1, md: 3 },
            }}>
            <b>Review: </b>
          </Typography>
          <Typography variant="subtitle1" mt={2}>
            {reviewText}
          </Typography>
        </Stack>
      )}
    </Paper>
  );
};

export default ResultCard;
