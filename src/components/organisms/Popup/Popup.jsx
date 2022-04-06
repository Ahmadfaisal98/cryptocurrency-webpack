import React, { useState } from 'react';
import { Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Popup({ title }) {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const navigate = useNavigate();

  const handleOk = () => {
    setIsModalVisible(false);
    navigate('/login');
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Modal
        title={title}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        className="popup"
      >
        <img
          src="https://www.piftechnologies.com/wp-content/uploads/secure-icon.gif"
          alt="gif"
          className="popup__gif"
          onClick={handleOk}
        />
      </Modal>
    </>
  );
}

Popup.defaultProps = {
  title: 'This is a title!',
};

Popup.propTypes = {
  title: PropTypes.string,
};
