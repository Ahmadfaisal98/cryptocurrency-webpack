import React from 'react';
import Popup from './Popup';
import { BrowserRouter as Router } from 'react-router-dom';

export default {
  title: 'Design/organisms/Popup',
  component: Popup,
};

const Template = (args) => (
  <Router>
    <Popup {...args} />
  </Router>
);

export const Default = Template.bind({});
