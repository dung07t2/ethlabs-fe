import {
  Card,
  Container,
  Link as MuiLink,
  Stack,
  styled,
  Typography
} from '@mui/material';
import IconLogin from '@public/static/illustrations/illustration_login.png';
import { Layout } from 'components';
import { AuthLayout, AuthSocial, LoginForm } from 'modules/Auth';
import Image from 'next/image';
import Link from 'next/link';

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

export default function LoginPage() {
  return (
    <RootStyle variant="blank" title="Login to your account">
      <AuthLayout>
        Don’t have an account? &nbsp;
        <Link href="/register">
          <MuiLink
            underline="none"
            variant="subtitle2"
            component="a"
            href="/register"
          >
            Get started
          </MuiLink>
        </Link>
      </AuthLayout>

      <SectionStyle sx={{ display: { xs: 'none', md: 'flex' } }}>
        <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
          Hi, Welcome Back
        </Typography>
        <Image src={IconLogin} alt="login" />
      </SectionStyle>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 4 }}>
            <Typography variant="h4" gutterBottom>
              Sign in to Minimal
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Enter your details below.
            </Typography>
          </Stack>
          <AuthSocial />

          <LoginForm />

          <Typography
            variant="body2"
            align="center"
            sx={{
              mt: 3,
              display: { sm: 'none' }
            }}
          >
            Don’t have an account?&nbsp;
            <Link href="/register">
              <MuiLink
                variant="subtitle2"
                component="a"
                href="/register"
                underline="hover"
              >
                Get started
              </MuiLink>
            </Link>
          </Typography>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
