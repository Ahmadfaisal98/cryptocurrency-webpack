import React from 'react';
import Navbar from './Navbar';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '@/app/store';

export default {
  title: 'Design/organisms/Navbar',
  component: Navbar,
};

const Template = (args) => (
  <Provider store={store}>
    <Router>
      <Navbar {...args} />
    </Router>
  </Provider>
);

export const Default = Template.bind({});
