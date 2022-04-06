import React from 'react';
import PropTypes from 'prop-types';
import { MenuOutlined } from '@ant-design/icons';
import { Button } from '@/components/atoms';

const MenuButton = ({ onClick }) => {
  return (
    <>
      <Button
        className="menu-button"
        content={<MenuOutlined className="menu-button__content" />}
        onClick={onClick}
        color="blue"
      />
    </>
  );
};

export default MenuButton;

MenuButton.defaultProps = {
  onClick: undefined,
};

MenuButton.propTypes = {
  onClick: PropTypes.func,
};
