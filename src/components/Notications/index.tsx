import { makeStyles } from '@mui/styles';
import { SnackbarProvider, SnackbarProviderProps } from 'notistack';
import React from 'react';
import palette from 'themes/palette';

const useStyles = makeStyles(() => ({
  contentRoot: {
    backgroundColor: 'aqua'
  },
  variantSuccess: {
    backgroundColor: palette.success.main
  },
  variantError: {
    backgroundColor: palette.success.main
  },
  variantInfo: {
    backgroundColor: palette.info.main
  },
  variantWarning: {
    backgroundColor: palette.warning.main
  }
}));
export interface NoticationsProps extends SnackbarProviderProps {
  children: React.ReactNode;
}

export const Notications: React.FC<NoticationsProps> = ({ children }) => {
  const classes = useStyles();

  return (
    <SnackbarProvider
      variant="success"
      autoHideDuration={2000}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      classes={classes}
    >
      {children}
    </SnackbarProvider>
  );
};
