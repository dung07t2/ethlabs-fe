import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import React from 'react';
import { varWrapEnter } from './variants';

const MotionContainer = ({ open, children, ...props }) => {
  return (
    <Box
      component={motion.div}
      initial={false}
      animate={open ? 'animate' : 'exit'}
      variants={varWrapEnter}
      {...props}
    >
      {children}
    </Box>
  );
};
export default MotionContainer;
