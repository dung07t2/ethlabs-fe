import AddIcon from '@mui/icons-material/Add';
import NewfeedIcon from '@mui/icons-material/Newspaper';
import PieChartIcon from '@mui/icons-material/PieChart';

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/account/dashboard',
    icon: <PieChartIcon sx={{ width: '22px', height: '22px' }} />
  },
  {
    title: 'newfeed',
    path: '/newfeed',
    icon: <NewfeedIcon sx={{ width: '22px', height: '22px' }} />
  },
  {
    title: 'Create newfeed',
    path: '/newfeed/create',
    icon: <AddIcon sx={{ width: '22px', height: '22px' }} />
  }
];

export default sidebarConfig;
