import HideImageIcon from '@mui/icons-material/HideImage';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Tooltip,
  Typography
} from '@mui/material';
import { EnhanceLink } from 'components';
import { format } from 'date-fns';

interface CardItemProps {
  id: number;
  title: string;
  content: string;
  link: string;
  imgUrls: string[];
  postedBy: string;
  postedAt: string;
}

const getInitials = (name = '') =>
  name
    .replace(/\s+/, ' ')
    .split(' ')
    .slice(0, 2)
    .map(v => v && v[0].toUpperCase())
    .join('');

const IMG_DEFAULT =
  'https://images.pexels.com/photos/3278215/pexels-photo-3278215.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500';

export const CardItem: React.FC<CardItemProps> = ({
  title,
  content,
  link,
  imgUrls,
  postedBy,
  postedAt
}): JSX.Element => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          m: 1
        }}
      >
        <Tooltip
          title={format(new Date(postedAt), "MMM dd, yyyy 'at' hh:mm a")}
        >
          <Avatar alt="Author">{getInitials(postedBy)}</Avatar>
        </Tooltip>

        <Typography
          variant="h5"
          color="text.secondary"
          sx={{
            m: 1
          }}
        >
          {postedBy}
        </Typography>
      </Box>
      {imgUrls && imgUrls.length > 0 ? (
        <CardMedia
          component="img"
          height="194"
          image={imgUrls ? imgUrls[0] : IMG_DEFAULT}
        />
      ) : (
        <HideImageIcon sx={{ width: '100%', height: '194px' }} />
      )}

      <CardContent>
        <EnhanceLink url={link} name={title} target="_blank" underline="none">
          <Typography variant="h5" color="text.secondary">
            {title}
          </Typography>
        </EnhanceLink>

        <Typography color="text.secondary">{content}</Typography>
      </CardContent>
    </Card>
  );
};
