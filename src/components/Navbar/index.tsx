import { MenuItem, MenuList, styled } from '@mui/material';
import { EnhanceLink, EnhanceLinkProps } from 'components';
import React from 'react';

const RootStyle = styled(MenuList)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginLeft: 'auto'
}));
export interface NavbarProps {
  className?: string;
  data: EnhanceLinkProps[];
}

export const Navbar: React.FC<NavbarProps> = ({ data = [], className }) => {
  return (
    <RootStyle className={className}>
      {data?.map((item, i) => (
        <MenuItem
          key={i}
          sx={{
            mx: { md: 3 },
            px: { xs: 3, md: 3 },
            py: { xs: 1, md: 0.75 },
            ':hover': {
              borderRadius: '40px'
            }
          }}
        >
          <EnhanceLink
            url={item.url}
            name={item.name}
            target="_blank"
            underline="none"
          />
        </MenuItem>
      ))}
    </RootStyle>
  );
};
