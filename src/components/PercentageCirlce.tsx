"use client"

import * as React from 'react';
import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number },
) {
    function colorit(){
        if(props.value < 20){
            return 'success'
        } else if (props.value < 70) {
            return 'warning'
        } else {
            return 'error'
        }
    }

  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress size={100} color={colorit()} variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="white"
          fontSize={20}
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function CircularWithValueLabel({value}:{value:number}) {
    const [progress, setProgress] = React.useState(0);
  
    React.useEffect(() => {
      const timer = setInterval(() => {
        setProgress((prevProgress) => (prevProgress >= value ? value : prevProgress + 5));
      }, 80);
      return () => {
        clearInterval(timer);
      };
    }, []);
  
    return <CircularProgressWithLabel value={progress} />;
  }