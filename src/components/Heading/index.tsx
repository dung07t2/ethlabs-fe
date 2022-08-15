import React from 'react';
import { Box, StyledComponentProps, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export interface HeadingProps extends StyledComponentProps {
  text: string;
  subText?: string;
  showStickyIcon?: boolean;
  style?: {};
}

export const Heading: React.FC<HeadingProps> = ({
  text,
  subText,
  showStickyIcon,
  style,
  ...props
}) => {
  return (
    <div className="heading" style={style}>
      <Box display="flex" alignItems="center" {...props}>
        <Typography color="text.secondary" variant="h3">
          {text}
        </Typography>
        {showStickyIcon && (
          <CheckCircleIcon
            sx={{
              fontSize: '16px',
              color: '#56CCF2',
              ml: 1,
              flexShrink: 0
            }}
          />
        )}
      </Box>
      {subText && (
        <Typography color="text.secondary" sx={{ fontSize: '18px', mt: 1 }}>
          {text}
        </Typography>
      )}
    </div>
  );
};
