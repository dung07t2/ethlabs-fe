import { Box, Button, Container, styled, Typography } from '@mui/material';
import { Layout, MotionContainer, varBounceIn } from 'components';
import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';

// ----------------------------------------------------------------------

const RootStyle = styled(Layout)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10)
}));

// ----------------------------------------------------------------------
export default function Page404() {
  return (
    <RootStyle variant="blank" title="404 | Page Not Found">
      <Container>
        <MotionContainer initial="initial" open>
          <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
            <motion.div variants={varBounceIn}>
              <Typography variant="h3" paragraph>
                Sorry, page not found!
              </Typography>
            </motion.div>
            <Typography sx={{ color: 'text.secondary' }}>
              Sorry, we couldn’t find the page you’re looking for. Perhaps
              you’ve mistyped the URL? Be sure to check your spelling.
            </Typography>

            <motion.div variants={varBounceIn}>
              <Box
                component="img"
                src="/static/illustrations/illustration_404.svg"
                sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
              />
            </motion.div>
            <Link href="/">
              <Button component="a" size="large" variant="contained">
                Go to Home
              </Button>
            </Link>
          </Box>
        </MotionContainer>
      </Container>
    </RootStyle>
  );
}
