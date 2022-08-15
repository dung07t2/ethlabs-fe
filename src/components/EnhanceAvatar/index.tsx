import React from 'react';
import Image from 'next/image';
import { Avatar, AvatarProps } from '@mui/material';

export interface EnhanceAvatarProps extends AvatarProps {
  name?: string | undefined;
  image?: StaticImageData;
  imgWidth?: number;
  imgHeight?: number;
  size?: 'sm' | 'md' | 'lg';
}

export const EnhanceAvatar: React.FC<EnhanceAvatarProps> = ({
  name,
  image,
  alt,
  imgWidth,
  imgHeight,
  size,
  sx,
  ...props
}) => {
  const avatarName = name ? name : 'Account Name';
  let imgSize = {
    width: '80px',
    height: '80px',
    fontSize: '24px'
  };
  if (size === 'sm') {
    imgSize = {
      width: '24px',
      height: '24px',
      fontSize: '12px'
    };
  }
  if (size === 'md') {
    imgSize = {
      width: '40px',
      height: '40px',
      fontSize: '18px'
    };
  }
  if (size === 'lg') {
    imgSize = {
      width: '140px',
      height: '140px',
      fontSize: '48px'
    };
  }
  // stringToColor
  const stringToColor = (string: string) => {
    let hash = 0;
    let i;
    if (!string) return;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }

    return color;
  };

  //stringAvatar
  const stringAvatar = (name: string) => {
    if (!name) return;
    const firstKeyword = name.split(' ')[0][0];
    const secondKeyword = name.split(' ')[1] ? name.split(' ')[1][0] : '';
    const keyword = firstKeyword + secondKeyword;

    return {
      sx: {
        bgcolor: stringToColor(name),
        ...sx,
        ...imgSize
      },
      children: `${keyword.toLocaleUpperCase()}`
    };
  };

  return (
    <>
      {avatarName ? (
        <Avatar {...stringAvatar(avatarName)} {...props} />
      ) : (
        <Avatar {...props}>
          <Image
            src={image as any}
            alt={alt}
            width={imgWidth}
            height={imgHeight}
          />
        </Avatar>
      )}
    </>
  );
};
