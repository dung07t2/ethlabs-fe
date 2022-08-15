import React, { ReactNode } from 'react';
import { Box } from '@mui/material';
import { Header } from './Header';

export interface GuestLayoutProps {
  children: ReactNode;
}
export const GuestLayout: React.FC<GuestLayoutProps> = ({ children }) => {
  return (
    <Box component="main" className="main-container" pb={12}>
      <Header />
      {children}
    </Box>
  );
};
