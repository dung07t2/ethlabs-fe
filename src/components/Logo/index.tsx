import { Box } from '@mui/material';
import Link from 'next/link';
import React from 'react';

// ----------------------------------------------------------------------

interface LogoProps {
  sx?: Object;
}

export const Logo = ({ sx }: LogoProps) => {
  return (
    <Link href="/">
      <Box
        component="img"
        src="/static/logo.svg"
        sx={{ width: 40, height: 40, ...sx }}
      />
    </Link>
  );
};
