import React from 'react';
import DescriptionIcon from '@mui/icons-material/Description';
import { Stack, Typography } from '@mui/material';
import { theme } from 'themes';
import { NO_DATA } from 'constants/common';

export interface DataNotFoundProps {
  text?: string;
  showIcon?: boolean;
}

export const DataNotFound: React.FC<DataNotFoundProps> = ({
  text = NO_DATA,
  showIcon = false
}) => {
  return (
    <>
      {showIcon ? (
        <Stack display="flex" alignItems="center" py={8}>
          <DescriptionIcon
            sx={{ fontSize: 80, color: theme.palette.grey[300], mb: 3 }}
          />
          <Typography color="GrayText">{text}</Typography>
        </Stack>
      ) : (
        <Typography>{text}</Typography>
      )}
    </>
  );
};
