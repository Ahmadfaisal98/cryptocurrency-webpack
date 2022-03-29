require('!style-loader!css-loader!sass-loader!./scss-loader.scss');
import 'antd/dist/antd.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
