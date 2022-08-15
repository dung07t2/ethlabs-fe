import { Box, Link as NavLink, LinkProps } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import palette from 'themes/palette';

export interface EnhanceLinkProps extends LinkProps {
  name?: string;
  url: string;
  children?: React.ReactNode;
}

export const EnhanceLink: React.FC<EnhanceLinkProps> = ({
  name,
  url,
  sx,
  children,
  ...props
}) => {
  const sxs = {
    ...sx,
    transition: 'all 0.25s',
    '&:hover': { opacity: 0.85 }
  };
  return (
    <>
      {name ? (
        <Link href={url}>
          <NavLink href={url} sx={sxs} {...props}>
            {name}
          </NavLink>
        </Link>
      ) : (
        <Link href={url}>
          <Box
            component="a"
            href={url}
            sx={{
              ...sxs,
              color: palette.text.primary,
              textDecoration: 'none'
            }}
            {...props}
          >
            {children}
          </Box>
        </Link>
      )}
    </>
  );
};
