import React from 'react';
import Footer from './Footer';
import { BrowserRouter as Router } from 'react-router-dom';

export default {
  title: 'Design/Organisms/Footer',
  component: Footer,
};

const Template = (args) => (
  <Router>
    <Footer {...args} />
  </Router>
);

export const Default = Template.bind({});
