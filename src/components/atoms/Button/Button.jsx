import React from 'react';
import { Button as AntButton } from 'antd';
import PropTypes from 'prop-types';

const Button = ({ content, className, onClick, color, size, text }) => {
  return (
    <AntButton
      className={`btn ${className} color_${color} size_${size}`}
      onClick={onClick}
    >
      {text ? text : content}
    </AntButton>
  );
};

export default Button;

Button.defaultProps = {
  content: <div />,
  className: '',
  onClick: undefined,
  color: 'default',
  size: 'default',
  text: 'Button',
};

Button.propTypes = {
  content: PropTypes.node,
  className: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func,
  color: PropTypes.oneOf(['default', 'green', 'blue']),
  size: PropTypes.oneOf(['default', 'small', 'medium', 'large']),
};
