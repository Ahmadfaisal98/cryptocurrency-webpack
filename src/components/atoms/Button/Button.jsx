import React from 'react';
import { Button as AntButton } from 'antd';
import PropTypes from 'prop-types';

const Button = ({ content, className, onClick, color, size, text }) => {
  return (
    <AntButton
      className={`btn ${className} color_${color} size_${size}`}
      onClick={onClick}
    >
      {content ? content : text}
    </AntButton>
  );
};

export default Button;

Button.defaultProps = {
  content: undefined,
  className: '',
  onClick: undefined,
  color: 'default',
  size: 'default',
  text: 'Button',
};

Button.propTypes = {
  content: PropTypes.element,
  className: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func,
  color: PropTypes.oneOf(['default', 'green', 'blue']),
  size: PropTypes.oneOf(['default', 'small', 'medium', 'large']),
};
