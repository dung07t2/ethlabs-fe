import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  MenuItem,
  Typography
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { MenuPopover } from 'components';
import { getAuth } from 'firebase/auth';
import Link from 'next/link';
import { useRef, useState } from 'react';

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: () => (
      <HomeIcon
        sx={{
          mr: 2,
          width: 24,
          height: 24
        }}
      />
    ),
    linkTo: '/'
  },
  {
    label: 'Profile',
    icon: () => (
      <PersonIcon
        sx={{
          mr: 2,
          width: 24,
          height: 24
        }}
      />
    ),
    linkTo: '#'
  },
  {
    label: 'Settings',
    icon: () => (
      <SettingsIcon
        sx={{
          mr: 2,
          width: 24,
          height: 24
        }}
      />
    ),
    linkTo: '#'
  }
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const auth = getAuth();
  const { currentUser } = auth;

  return (
    <>
      {currentUser && (
        <IconButton
          ref={anchorRef}
          onClick={handleOpen}
          sx={{
            padding: 0,
            width: 44,
            height: 44,
            ...(open && {
              '&:before': {
                zIndex: 1,
                content: "''",
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                position: 'absolute',
                bgcolor: theme => alpha(theme.palette.grey[900], 0.72)
              }
            })
          }}
        >
          <Avatar
            src={
              currentUser?.photoURL ||
              '/static/mock-images/avatars/avatar_default.jpg'
            }
            alt="photo"
          />
        </IconButton>
      )}

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {currentUser?.displayName || currentUser?.email}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {currentUser?.email}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {MENU_OPTIONS.map(option => (
          <Link key={option.label} href={option.linkTo}>
            <MenuItem
              component="a"
              onClick={handleClose}
              sx={{ typography: 'body2', py: 1, px: 2.5 }}
            >
              {option.icon}
              {option.label}
            </MenuItem>
          </Link>
        ))}

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button fullWidth color="inherit" variant="outlined">
            Logout
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}
