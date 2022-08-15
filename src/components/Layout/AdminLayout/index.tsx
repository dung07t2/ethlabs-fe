import { styled } from '@mui/material';
import { useWindowSize } from 'common/hooks';
import { useAppDispatch } from 'common/redux';
import { actionsApp } from 'modules/App';
import React, { useEffect } from 'react';
import Header from './Header';
import { Sidebar } from './Sidebar';

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}));

interface AdminLayout {
  title: string | undefined;
  children: React.ReactNode;
}
export const AdminLayout: React.FC<AdminLayout> = ({ title, children }) => {
  const { width } = useWindowSize();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!width) return;
    width < 768
      ? dispatch(actionsApp.closeSidebar())
      : dispatch(actionsApp.openSidebar());
  }, [dispatch, width]);

  return (
    <>
      <Header />
      <Sidebar />
      <MainStyle>{children}</MainStyle>
    </>
  );
};
