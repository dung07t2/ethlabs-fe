import React, { useEffect, useState } from 'react';
import { Box, IconButton, SwipeableDrawer } from '@mui/material';
import { publicMenu } from '_mocks_/menu';
import { useWindowSize } from 'common/hooks';
import MenuIcon from '@mui/icons-material/Menu';
import { Navbar } from 'components/Navbar';

export const MenuSP = () => {
  const { width } = useWindowSize();
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  useEffect(() => {
    if (!width) return;
    width > 900 && setOpenMenu(false);
  }, [width]);

  return (
    <Box display={{ xs: 'flex', md: 'none' }}>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={() => setOpenMenu(!openMenu)}
        color="inherit"
        sx={{ ml: -1 }}
      >
        <MenuIcon />
      </IconButton>
      <SwipeableDrawer
        anchor="left"
        open={openMenu}
        swipeAreaWidth={0}
        onClose={() => setOpenMenu(false)}
        onOpen={() => setOpenMenu(true)}
      >
        <Box width={240}>
          <Navbar data={publicMenu} />
        </Box>
      </SwipeableDrawer>
    </Box>
  );
};
