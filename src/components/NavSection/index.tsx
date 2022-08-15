import { Box, Collapse, List, ListItemText } from '@mui/material';
import { BoxProps } from '@mui/system';
import { EnhanceIcon } from 'components';
import React, { useState } from 'react';
import { ListItemIconStyle, ListItemStyle } from './style';

interface NavItemProps {
  item: {
    title: string;
    path: string;
    icon?: React.ReactNode;
    info?: string;
    children?: React.ReactNode;
  };
}

function NavItem({ item }: NavItemProps) {
  const { title, path, icon, info, children } = item || {};
  const [open, setOpen] = useState(true);

  const handleOpen = () => {
    setOpen(prev => !prev);
  };

  if (children) {
    return (
      <>
        <ListItemStyle onClick={handleOpen}>
          <ListItemIconStyle>
            {icon && (
              <EnhanceIcon icon={icon} sx={{ width: '22px', height: '22px' }} />
            )}
          </ListItemIconStyle>
          <ListItemText disableTypography primary={title} />
          {info && info}
          <EnhanceIcon
            icon={open ? 'arrow-downward' : 'arrow-forward'}
            sx={{ width: 16, height: 16, ml: 1 }}
          />
        </ListItemStyle>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children?.map(item => {
              const { title, path } = item;
              return (
                <ListItemStyle key={title} component="a" href={path}>
                  <ListItemIconStyle>
                    <Box
                      component="span"
                      sx={{
                        width: 4,
                        height: 4,
                        display: 'flex',
                        borderRadius: '50%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'text.disabled',
                        transition: theme =>
                          theme.transitions.create('transform')
                      }}
                    />
                  </ListItemIconStyle>
                  <ListItemText disableTypography primary={title} />
                </ListItemStyle>
              );
            })}
          </List>
        </Collapse>
      </>
    );
  }

  return (
    <ListItemStyle disableGutters component="a" href={path}>
      <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
      <ListItemText disableTypography primary={title} />
      {info && info}
    </ListItemStyle>
  );
}

interface NavSectionProps extends BoxProps {
  navConfig: any;
}
export const NavSection = ({ navConfig, ...other }: NavSectionProps) => {
  return (
    <Box {...other}>
      <List sx={{ padding: '0 16px' }}>
        {navConfig?.map(item => (
          <NavItem key={item.title} item={item} />
        ))}
      </List>
    </Box>
  );
};
