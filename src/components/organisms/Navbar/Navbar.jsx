import React, { useEffect, useState } from 'react';
import { Menu, Typography, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import {
  HomeOutlined,
  BulbOutlined,
  FundOutlined,
  LoginOutlined,
  HeartOutlined,
} from '@ant-design/icons/lib/icons';

import icon from '@/images/logo-criptocurrency.png';
import { MenuButton } from '@/components/molecules';

const { Item } = Menu;

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(false);
  const [screenSize, setScreenSize] = useState(null);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize < 768) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <div className="navbar">
      <div className="navbar__container">
        <div className="navbar__header">
          <Avatar src={icon} size="large" alt="logo" />
          <Typography.Title level={2} className="navbar__name">
            <Link to="/">Cryptoverse</Link>
          </Typography.Title>
          <MenuButton onClick={() => setActiveMenu(!activeMenu)} />
        </div>

        {activeMenu && (
          <Menu theme="dark">
            <Item key={1} icon={<HomeOutlined />}>
              <Link to="/">Home</Link>
            </Item>
            <Item key={2} icon={<FundOutlined />}>
              <Link to="/cryptocurrencies">Crytocurrencies</Link>
            </Item>
            <Item key={3} icon={<BulbOutlined />}>
              <Link to="/news">News</Link>
            </Item>
            <Item key={4} icon={<HeartOutlined />}>
              <Link to="/favorite">Favorite</Link>
            </Item>
            <Item key={5} icon={<LoginOutlined />}>
              <Link to="/login">Login</Link>
            </Item>
          </Menu>
        )}
      </div>
    </div>
  );
};

export default Navbar;
