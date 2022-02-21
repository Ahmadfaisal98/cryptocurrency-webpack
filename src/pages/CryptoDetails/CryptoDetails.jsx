import React, { useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Typography, Select } from 'antd';
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';

import { useGetCryproDetailsQuery, useGetCryproHistoryQuery } from '../../services/cryptoApi';
import { LineChart } from '../../components/organisms';
import { Loader } from '../../components/atoms';

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState('7d');
  const { data, isFetching: isFetchDetails } = useGetCryproDetailsQuery(coinId);
  const { data: coinHistory, isFetching: isFetchHistory } = useGetCryproHistoryQuery({
    coinId,
    timePeriod,
  });
  const cryptoDetails = data?.data?.coin;

  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  const stats = [
    { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    {
      title: 'Price to USD',
      value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: '24h Volume',
      value: `$ ${cryptoDetails?.['24hVolume'] && millify(cryptoDetails?.['24hVolume'])}`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: 'Market Cap',
      value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: 'All-time-high(daily avg.)',
      value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
    {
      title: 'Number Of Exchanges',
      value: cryptoDetails?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: 'Aprroved Supply',
      value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: 'Total Supply',
      value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: 'Circulating Supply',
      value: `$ ${
        cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  if (isFetchDetails) return <Loader />;

  return (
    <Col className="crypto-detail">
      <Col className="crypto-detail__heading">
        <Title level={2} className="crypto-detail__heading-name">
          {cryptoDetails.name} ({cryptoDetails.symbol}) Price
        </Title>
        <p>
          {cryptoDetails.name} live price in US dollars. View value statistics, market cap and
          supply
        </p>
      </Col>
      <Select
        defaultValue="7d"
        className="crypto-detail__select-period"
        placeholder="Select Time Period"
        onChange={(value) => setTimePeriod(value)}
      >
        {time.map((date) => (
          <Option key={date}>{date}</Option>
        ))}
      </Select>

      {isFetchHistory ? (
        <Loader />
      ) : (
        <LineChart
          coinHistory={coinHistory}
          currentPrice={millify(cryptoDetails.price)}
          coinName={cryptoDetails.name}
        />
      )}

      <Col className="crypto-detail__stats">
        <Col className="crypto-detail__stats-value">
          <Col className="crypto-detail__stats-heading">
            <Title level={3} className="crypto-detail__title">
              {cryptoDetails.name} Value Statistics
            </Title>
            <p>An overview showing the stats of {cryptoDetails.name}</p>
          </Col>
          {stats.map(({ icon, title, value }) => (
            <Col className="crypto-detail__coin" key={title}>
              <Col className="crypto-detail__coin--name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="crypto-detail__coin--value">{value}</Text>
            </Col>
          ))}
        </Col>
        <Col className="crypto-detail__info">
          <Col className="crypto-detail__info-heading">
            <Title level={3} className="crypto-detail__title">
              Other Statistics
            </Title>
            <p>An overview showing the stats of all cryptocurrency</p>
          </Col>
          {genericStats.map(({ icon, title, value }) => (
            <Col className="crypto-detail__coin" key={title}>
              <Col className="crypto-detail__coin--name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="crypto-detail__coin--value">{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>

      <Col className="crypto-detail__desc">
        <Row className="crypto-detail__desc-coin">
          <Title level={3} className="crypto-detail__title">
            What is {cryptoDetails.name}?{HTMLReactParser(cryptoDetails.description)}
          </Title>
        </Row>
        <Col className="crypto-detail__desc-link">
          <Title level={3} className="crypto-detail__title">
            {cryptoDetails.name} Links
          </Title>
          {cryptoDetails.links.map((link) => (
            <Row className="crypto-detail__link" key={link.name}>
              <Title level={5} className="crypto-detail__link--name">
                {link.type}
              </Title>
              <a href={link.url} target="_blank" rel="noreferrer">
                {link.name}
              </a>
            </Row>
          ))}
        </Col>
      </Col>
    </Col>
  );
};

export default CryptoDetails;
