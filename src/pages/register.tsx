import {
  Box,
  Card,
  Container,
  Link as MuiLink,
  Typography
} from '@mui/material';
// material
import { styled } from '@mui/material/styles';
import { Layout } from 'components';
import { AuthLayout, RegisterForm } from 'modules/Auth';
import Link from 'next/link';
import React from 'react';

const RootStyle = styled(Layout)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function RegisterPage() {
  return (
    <RootStyle variant="blank" title="Register">
      <AuthLayout>
        Already have an account? &nbsp;
        <Link href="/login">
          <MuiLink
            underline="none"
            variant="subtitle2"
            component="a"
            href="/login"
          >
            Login
          </MuiLink>
        </Link>
      </AuthLayout>

      <SectionStyle sx={{ display: { xs: 'none', md: 'flex' } }}>
        <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
          Manage the job more effectively with {process.env.siteName}
        </Typography>
        <img
          alt="register"
          src="/static/illustrations/illustration_register.png"
        />
      </SectionStyle>

      <Container>
        <ContentStyle>
          <Box sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Get started absolutely free.
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Free forever. No credit card needed.
            </Typography>
          </Box>

          <RegisterForm />

          <Typography
            variant="body2"
            align="center"
            sx={{ color: 'text.secondary', mt: 3 }}
          >
            By registering, I agree to Minimal&nbsp;
            <Link href="/terms">
              <MuiLink underline="always" color="textPrimary" href="/terms">
                Terms of Service
              </MuiLink>
            </Link>
            &nbsp;and&nbsp;
            <Link href="/policy">
              <MuiLink underline="always" color="textPrimary" href="/policy">
                Privacy Policy
              </MuiLink>
            </Link>
            .
          </Typography>

          <Typography
            variant="subtitle2"
            sx={{
              mt: 3,
              textAlign: 'center',
              display: { sm: 'none' }
            }}
          >
            Already have an account?&nbsp;
            <Link href="/login">
              <MuiLink underline="hover" href="/login" component="a">
                Login
              </MuiLink>
            </Link>
          </Typography>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
