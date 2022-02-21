import React from 'react';
import milify from 'millify';
import { Typography, Row, Col, Statistic } from 'antd';
import { Link } from 'react-router-dom';

import { useGetCryptosQuery } from '../../services/cryptoApi';
import { Cryptocurrencies, News } from '../../pages';
import { Loader } from '../../components/atoms';

const { Title } = Typography;

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;

  if (isFetching) return <Loader />;

  return (
    <>
      <Title className="heading" level={2}>
        Global Crypto Stats
      </Title>
      <Row>
        <Col span={12}>
          <Statistic title="Total Cryptocurrencies" value={globalStats.total} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Exchanges" value={milify(globalStats.totalExchanges)} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Market Cap" value={milify(globalStats.totalMarketCap)} />
        </Col>
        <Col span={12}>
          <Statistic title="Total 24h Volume" value={milify(globalStats.total24hVolume)} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Markets" value={milify(globalStats.totalMarkets)} />
        </Col>
      </Row>

      <div className="homepage">
        <Title level={2} className="homepage__title">
          Top 10 Cryptocurrencies in the Word
        </Title>
        <Title level={3} className="homepage__show-more">
          <Link to="/cryptocurrencies">Show more</Link>
        </Title>
      </div>
      <Cryptocurrencies simplified />
      <div className="homepage">
        <Title level={2} className="homepage__title">
          Latest Crypto News
        </Title>
        <Title level={3} className="homepage__show-more">
          <Link to="/news">Show more</Link>
        </Title>
      </div>
      <News simplified />
    </>
  );
};

export default Homepage;
