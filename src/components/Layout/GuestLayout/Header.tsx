import { publicMenu } from '@mock/menu';
import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';
import Logo from '@public/static/logo.svg';
import { useWindowSize } from 'common/hooks';
import { EnhanceLink, Navbar } from 'components';
import Image from 'next/image';
import { MenuSP } from './MenuSP';

export const Header = () => {
  const { width } = useWindowSize();
  return (
    <AppBar
      position="static"
      color="inherit"
      sx={{
        boxShadow: ' 0px 1px 0px #E2E2E2',
        marginBottom: { xs: 3, sm: 5 }
      }}
    >
      <Container>
        <Toolbar
          disableGutters={true}
          sx={{
            height: '68px'
          }}
        >
          <MenuSP />
          <Box display="flex" alignItems="center">
            <Box mt="8px">
              <EnhanceLink url="/">
                <Image
                  src={Logo}
                  width={width && width < 420 ? '40px ' : '60px'}
                  height={width && width < 420 ? '40px ' : '60px'}
                />
              </EnhanceLink>
            </Box>
            <Typography
              component="h1"
              variant="h4"
              sx={{
                fontSize: width && width < 420 ? '20px ' : undefined,
                fontFamily: '"Montserrat", "Roboto", "Arial", sans-serif'
              }}
            ></Typography>
          </Box>
          <Box
            display={{ xs: 'none', md: 'block' }}
            ml={{ md: 4, lg: 10, xl: 12 }}
          >
            <Navbar data={publicMenu} />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
