import { MenuOutlined } from '@ant-design/icons';
import React from 'react';
import { Button } from '@/components/atoms';

const MenuButton = ({ onClick }) => {
  return (
    <>
      <Button
        className="menu-button btn--blue"
        content={<MenuOutlined className="menu-button__content" />}
        onClick={onClick}
      />
    </>
  );
};

export default MenuButton;
