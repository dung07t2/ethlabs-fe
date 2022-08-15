import { Box, BoxProps, styled } from '@mui/material';
import Head from 'next/head';
import { forwardRef, Fragment, ReactNode } from 'react';
import { AdminLayout } from './AdminLayout';
import { GuestLayout } from './GuestLayout';

const AdminLayoutStyle = styled('main')(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    display: 'flex',
    minHeight: '100%',
    overflow: 'hidden'
  }
}));

const GuestLayoutStyle = styled('main')(({ theme }) => ({}));

export interface LayoutProps extends BoxProps {
  title?: string | undefined;
  description?: string;
  children: ReactNode;
  variant?: 'default' | 'auth' | 'blank';
  extraMetaTags?: ReactNode;
  className?: string;
}

export const Layout = forwardRef(
  (
    {
      title,
      description,
      children,
      variant = 'default',
      extraMetaTags,
      className,
      ...props
    }: LayoutProps,
    ref
  ) => {
    return (
      <Fragment>
        <Head>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <link
            rel="shortcut icon"
            href="/static/logo.svg"
            type="image/x-icon"
          />
          {extraMetaTags}
        </Head>

        {variant === 'blank' ? (
          <Box ref={ref} className={className} {...props}>
            {children}
          </Box>
        ) : variant === 'auth' ? (
          <AdminLayoutStyle>
            <AdminLayout title={title}>{children}</AdminLayout>
          </AdminLayoutStyle>
        ) : (
          <GuestLayoutStyle>
            <GuestLayout>{children}</GuestLayout>
          </GuestLayoutStyle>
        )}
      </Fragment>
    );
  }
);
