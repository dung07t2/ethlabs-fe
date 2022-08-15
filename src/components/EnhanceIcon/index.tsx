import { Box, Icon } from '@mui/material';
import { BoxProps } from '@mui/system';
import React from 'react';

interface EnhanceIconProps extends BoxProps {
  icon: string;
}
export const EnhanceIcon = ({ icon, sx, ...other }: EnhanceIconProps) => {
  return (
    <Box component={Icon} {...other}>
      {icon}
    </Box>
  );
};
