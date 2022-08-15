import { Container, Stack, styled, Typography } from '@mui/material';
import { Layout } from 'components';
import { ForgotPasswordForm } from 'modules/Auth';
import React from 'react';

const ContentStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(12, 0)
}));
const ContentFormStyle = styled('div')(({ theme }) => ({
  maxWidth: '480px',
  margin: 'auto'
}));

export default function ForgotPasswordPage() {
  return (
    <Layout variant="blank" title="Forgot password" sx={{ height: '100%' }}>
      <ContentStyle>
        <Container maxWidth="lg">
          <ContentFormStyle>
            <Stack sx={{ mb: 4 }}>
              <Typography variant="h4" gutterBottom>
                Forgot your password?
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                Please enter the email address associated with your account and
                We will email you a link to reset your password.
              </Typography>
            </Stack>
            <ForgotPasswordForm />
          </ContentFormStyle>
        </Container>
      </ContentStyle>
    </Layout>
  );
}
