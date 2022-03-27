import React, { useEffect, useState } from 'react';
import { Menu, Typography, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { LoginOutlined, LogoutOutlined } from '@ant-design/icons/lib/icons';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import icon from '@/images/logo-criptocurrency.png';
import { MenuButton } from '@/components/molecules';
import { getCookie, removeCookie } from '@/helpers/cookie';
import { setIsLogin } from '@/features/userSlice';
import { listNavbar } from './constans';

const { Item } = Menu;

const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(false);
  const [screenSize, setScreenSize] = useState(null);
  const [selectMenu, setSelectMenu] = useState(location.pathname);
  const isLogin = useSelector((state) => state.userSlice.isLogin);
  const accessToken = getCookie('accessToken');

  useEffect(() => {
    if (accessToken) {
      dispatch(setIsLogin(true));
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

  useEffect(() => {
    setSelectMenu(location.pathname);
  }, [location.pathname]);

  console.log({ selectMenu });

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
            {listNavbar.map((el, index) => (
              <Item
                key={index}
                icon={el.icon}
                onClick={() => setSelectMenu(el.to)}
                className={selectMenu === el.to ? 'ant-menu-item-selected' : ''}
              >
                <Link to={el.to}>{el.label}</Link>
              </Item>
            ))}
            {isLogin ? (
              <Item key={5} icon={<LogoutOutlined />}>
                <Link
                  to="/"
                  onClick={() => {
                    removeCookie('accessToken');
                    dispatch(setIsLogin(false));
                  }}
                >
                  Logout
                </Link>
              </Item>
            ) : (
              <Item
                key={6}
                className={
                  selectMenu === '/login' ? 'ant-menu-item-selected' : ''
                }
                icon={<LoginOutlined />}
              >
                <Link to="/login" onClick={() => setSelectMenu('/login')}>
                  Login
                </Link>
              </Item>
            )}
          </Menu>
        )}
      </div>
    </div>
  );
};

export default Navbar;
