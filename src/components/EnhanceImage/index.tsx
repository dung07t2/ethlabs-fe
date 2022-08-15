import { Box, BoxProps, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import NoImage from '@public/static/logo.svg';
import clsx from 'clsx';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  thumbnail: {
    position: 'relative',
    display: 'block',
    width: '100%',
    height: 0,
    marginBottom: 0,
    overflow: 'hidden',
    '&> img': {
      position: 'absolute',
      top: '50%',
      left: '50%',
      zIndex: 1,
      width: '100%',
      height: '100%',
      transform: 'translate(-50%, -50%)',
      objectFit: 'cover',
      objectPosition: 'center',
      marginBottom: 0
    }
  }
}));

interface EnhanceImageProps extends BoxProps {
  imageUrl?: string;
  alt?: string;
  size?: '1x1' | '6x4' | '4x3' | '16x9' | '24x9';
  className?: string;
}
export const EnhanceImage: React.FC<EnhanceImageProps> = ({
  imageUrl,
  className,
  size = '6x4',
  sx,
  ...props
}) => {
  const classes = useStyles();
  let sizeStyle = {};
  switch (size) {
    case '1x1':
      sizeStyle = { paddingBottom: '100%' };
      break;
    case '4x3':
      sizeStyle = { paddingBottom: '75%' };
      break;
    case '16x9':
      sizeStyle = { paddingBottom: '56.25%' };
      break;
    case '24x9':
      sizeStyle = { paddingBottom: '37.5%' };
      break;
    default:
      sizeStyle = { paddingBottom: '66.67%' };
      break;
  }
  return (
    <Box
      className={clsx(classes.thumbnail, className)}
      sx={{ ...sx, ...sizeStyle }}
      {...props}
    >
      <img src={imageUrl ? imageUrl : NoImage.src} alt="thumbnail" />
    </Box>
  );
};
