import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { EnhanceLogo } from 'components';
import React from 'react';

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7)
  }
}));

// ----------------------------------------------------------------------

interface AuthLayoutProps {
  children: React.ReactNode;
}
export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <HeaderStyle>
      <EnhanceLogo />

      <Typography
        variant="body2"
        sx={{
          display: { xs: 'none', sm: 'block' },
          mt: { md: -2 }
        }}
      >
        {children}
      </Typography>
    </HeaderStyle>
  );
};
