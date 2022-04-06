import React from 'react';
import LineChart from './LineChart';

export default {
  title: 'Design/Organisms/LineChart',
  component: LineChart,
};

const Template = (args) => <LineChart {...args} />;

export const Default = Template.bind({});
Default.play = async () => {};
