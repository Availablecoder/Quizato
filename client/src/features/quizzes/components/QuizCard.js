import { Link as RouterLink } from 'react-router-dom';

// MUI Components
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, Divider } from '@mui/material';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

// Icons
import StarHalfRoundedIcon from '@mui/icons-material/StarHalfRounded';

// #########################

const QuizCard = ({
  title,
  subDescription,
  image,
  tags,
  averageRating,
  slug,
}) => {
  return (
    <Card sx={{ p: 1 }}>
      <Box
        sx={{
          height: '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '4px',
          bgcolor: '#eee',
        }}>
        <Box component="img" src={image} width="128px" />
      </Box>
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 1,
          }}>
          <Typography variant="h3">{title}</Typography>
          <Box textAlign="center">
            <StarHalfRoundedIcon sx={{ color: 'gold', fontSize: '30px' }} />
            <br />
            {averageRating}
          </Box>
        </Box>
        <Typography variant="body2" color="text.secondary" mb={2}>
          {subDescription}
        </Typography>
        <Stack direction="row" spacing={1}>
          {tags.map((tag, i) => (
            <Chip
              key={`tag-${i}`}
              label={tag}
              component="a"
              size="small"
              href="#"
              variant="outlined"
              clickable
            />
          ))}
        </Stack>
      </CardContent>
      <Divider sx={{ mb: 1 }} />
      <CardActions>
        <Button
          variant="outlined"
          fullWidth
          to={`quizzes/${slug}`}
          component={RouterLink}>
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default QuizCard;
