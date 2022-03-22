import React, { useEffect, useState } from 'react';
import { Menu, Typography, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import {
  HomeOutlined,
  BulbOutlined,
  FundOutlined,
  LoginOutlined,
  HeartOutlined,
  LogoutOutlined,
} from '@ant-design/icons/lib/icons';
import { useDispatch } from 'react-redux';

import icon from '@/images/logo-criptocurrency.png';
import { MenuButton } from '@/components/molecules';
import { getCookie, removeCookie } from '@/helpers/cookie';
import { useSelector } from 'react-redux';
import { setIsLogin } from '@/features/userSlice';

const { Item } = Menu;

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(false);
  const [screenSize, setScreenSize] = useState(null);
  const isLogin = useSelector((state) => state.userSlice.isLogin);
  const dispatch = useDispatch();
  const accessToken = getCookie('accessToken');

  useEffect(() => {
    if (accessToken) {
      dispatch(setIsLogin(true));
    } else {
      dispatch(setIsLogin(false));
    }
  }, [accessToken, isLogin, dispatch]);

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
            {isLogin ? (
              <Item key={5} icon={<LogoutOutlined />}>
                <Link
                  to="/"
                  onClick={() => {
                    removeCookie('accessToken');
                  }}
                >
                  Logout
                </Link>
              </Item>
            ) : (
              <Item key={6} icon={<LoginOutlined />}>
                <Link to="/login">Login</Link>
              </Item>
            )}
          </Menu>
        )}
      </div>
    </div>
  );
};

export default Navbar;
