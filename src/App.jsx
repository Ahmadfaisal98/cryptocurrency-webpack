import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout, Switch } from 'antd';

import 'antd/dist/antd.css';
import './sass/main.scss';
import { Homepage, Cryptocurrencies, CryptoDetails, News } from './pages';
import { Footer, Navbar } from './components/organisms';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className={`app ${isDarkMode ? 'dark-mode' : ''}`}>
      <Navbar />

      <Switch
        defaultChecked
        className="toggle-theme"
        onChange={() => setIsDarkMode(!isDarkMode)}
      />

      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route exact path="/" element={<Homepage />} />
              <Route
                exact
                path="/cryptocurrencies"
                element={<Cryptocurrencies />}
              />
              <Route exact path="/crypto/:coinId" element={<CryptoDetails />} />
              <Route exact path="News" element={<News />} />
            </Routes>
          </div>
        </Layout>

        <Footer />
      </div>
    </div>
  );
};

export default App;
