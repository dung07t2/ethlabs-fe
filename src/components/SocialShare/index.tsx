import { Stack } from '@mui/material';
import React from 'react';
import {
  FacebookShareButton,
  FacebookIcon,
  PinterestShareButton,
  PinterestIcon,
  TwitterShareButton,
  TwitterIcon,
  EmailShareButton,
  EmailIcon
} from 'react-share';

interface SocialShareProps {
  link: string;
  media: any;
  result?: any;
}

export const SocialShare: React.FC<SocialShareProps> = ({
  link,
  media,
  result
}) => {
  const contentShare = result ? `I got ${result.title}` : undefined;
  return (
    <Stack alignItems="end">
      <Stack direction="row" spacing={1}>
        <FacebookShareButton url={link} quote={contentShare}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <PinterestShareButton
          media={media}
          url={link}
          description={contentShare}
        >
          <PinterestIcon size={32} round />
        </PinterestShareButton>
        <TwitterShareButton url={link} title={contentShare}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <EmailShareButton url={link} body={contentShare}>
          <EmailIcon size={32} round />
        </EmailShareButton>
      </Stack>
    </Stack>
  );
};
