import { Fragment } from 'react';

// MUI Component
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// #######################

const UserResult = ({ resultData }) => {
  resultData = resultData.map((e) => e.split('||'));
  return (
    <Box>
      <Grid container>
        {resultData.map((data, i) => (
          <Fragment key={`data-${i}`}>
            <Grid item xs={4}>
              <Box p={1} sx={{ border: '1px solid #eee' }}>
                <Typography variant="h5">{data[0]}</Typography>
              </Box>
            </Grid>
            <Grid item xs={8}>
              <Box p={1} sx={{ border: '1px solid #eee' }}>
                <Typography variant="h5" color="text.secondary">
                  {data[1]}
                </Typography>
              </Box>
            </Grid>
          </Fragment>
        ))}
      </Grid>
    </Box>
  );
};

export default UserResult;
