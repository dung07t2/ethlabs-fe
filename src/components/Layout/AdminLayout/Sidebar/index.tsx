import sidebarConfig from '@mock/sidebar';
import { Avatar, Box, Drawer, Link, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useResponsive } from 'common/hooks';
import { useAppDispatch } from 'common/redux';
import { NavSection, Scrollbar } from 'components';
import { Logo } from 'components/Logo';
import { getAuth } from 'firebase/auth';
import { actionsApp, useSelectAppToggleSidebar } from 'modules/App';

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH
  }
}));

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12]
}));

export const Sidebar = () => {
  const dispatch = useAppDispatch();
  const isToggle = useSelectAppToggleSidebar();

  const toggleDrawer = () => {
    dispatch(actionsApp.toggleSidebar());
  };

  const isDesktop = useResponsive('up', 'lg', null, null);
  const auth = getAuth();
  const { currentUser } = auth;

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column'
        }
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
        <Logo />
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none" component="a" href="#">
          <AccountStyle>
            <Avatar
              src={
                currentUser?.photoURL ||
                '/static/mock-images/avatars/avatar_default.jpg'
              }
              alt="photo"
            />
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                {currentUser?.displayName || currentUser?.email}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {currentUser?.role || 'admin'}
              </Typography>
            </Box>
          </AccountStyle>
        </Link>
      </Box>

      <NavSection navConfig={sidebarConfig} />
    </Scrollbar>
  );

  return (
    <RootStyle>
      {!isDesktop && (
        <Drawer
          open={isToggle}
          onClose={toggleDrawer}
          PaperProps={{
            sx: { width: DRAWER_WIDTH }
          }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed'
            }
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
};
