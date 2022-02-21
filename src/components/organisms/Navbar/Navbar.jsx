import React, { useEffect, useState } from 'react';
import { Menu, Typography, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, BulbOutlined, FundOutlined } from '@ant-design/icons/lib/icons';

import icon from '../../../images/logo-criptocurrency.png';
import { MenuButton } from '../../molecules';

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
        <div className="navbar__logo">
          <Avatar src={icon} size="large" />
          <Typography.Title level={2} className="navbar__name">
            <Link to="/">Cryptoverse</Link>
          </Typography.Title>
          <MenuButton onClick={() => setActiveMenu(!activeMenu)} />
        </div>

        {activeMenu && (
          <Menu theme="dark">
            <Menu.Item icon={<HomeOutlined />}>
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item icon={<FundOutlined />}>
              <Link to="/cryptocurrencies">Crytocurrencies</Link>
            </Menu.Item>
            <Menu.Item icon={<BulbOutlined />}>
              <Link to="/news">News</Link>
            </Menu.Item>
          </Menu>
        )}
      </div>
    </div>
  );
};

export default Navbar;
