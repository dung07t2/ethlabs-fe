import { Box } from '@mui/material';
import { BoxProps } from '@mui/system';
import Link from 'next/link';
import React from 'react';

export const EnhanceLogo = ({ sx }: BoxProps) => {
  return (
    <Link href="/">
      <a>
        <Box
          component="img"
          src="/static/logo.svg"
          sx={{ width: 40, height: 40, ...sx }}
        />
      </a>
    </Link>
  );
};
