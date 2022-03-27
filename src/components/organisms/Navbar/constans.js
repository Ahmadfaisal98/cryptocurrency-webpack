import {
  HomeOutlined,
  BulbOutlined,
  FundOutlined,
  HeartOutlined,
} from '@ant-design/icons/lib/icons';

export const listNavbar = [
  {
    icon: <HomeOutlined />,
    to: '/',
    label: 'Home',
  },
  {
    icon: <FundOutlined />,
    to: '/cryptocurrencies',
    label: 'Crytocurrencies',
  },
  {
    icon: <BulbOutlined />,
    to: '/news',
    label: 'News',
  },
  {
    icon: <HeartOutlined />,
    to: '/favorite',
    label: 'Favorite',
  },
];
