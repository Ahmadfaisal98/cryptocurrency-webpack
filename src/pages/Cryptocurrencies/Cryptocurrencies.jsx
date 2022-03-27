import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { useNavigate } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';
import { HeartFilled } from '@ant-design/icons';
import { useSelector } from 'react-redux';

import { useGetCryptosQuery } from '@/services/cryptoApi';
import { Loader } from '@/components/atoms';
// import { addFavorite } from '@/features/userSlice';
import {
  useAddFavoriteMutation,
  useGetFavoritesQuery,
  useRemoveFavoriteMutation,
} from '@/services/serverApi';
import { Popup } from '@/components/organisms';

const Cryptocurrencies = ({ simplified, data, handleFavorite }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [addFavorite, { error }] = useAddFavoriteMutation();
  const [removeFavorite] = useRemoveFavoriteMutation();
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  let { data: uuidFavorite } = useGetFavoritesQuery();
  const isLogin = useSelector((state) => state.userSlice.isLogin);

  let dataDisplay = cryptos;
  if (data) {
    dataDisplay = data;
  }
  if (!isLogin) {
    uuidFavorite = [];
  }

  let arrUuidFavorite = uuidFavorite?.favorite?.map((fav) => fav.uuidCrypto);

  useEffect(() => {
    const filteredData = cryptosList?.data.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  if (isFetching) return <Loader />;

  return (
    <>
      {error?.data.message === 'Please login first' && (
        <Popup title={error?.data.message} />
      )}
      {!simplified && !data && (
        <div className="cryptocurrencies__search">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      <Row gutter={[32, 32]} className="cryptocurrencies">
        {dataDisplay?.map((currency, index) => (
          <Col
            xs={24}
            sm={12}
            lg={6}
            className="cryptocurrencies__card"
            key={index}
          >
            <Card
              title={`${currency.rank}. ${currency.name}`}
              extra={
                <img
                  className="cryptocurrencies__image"
                  src={currency.iconUrl}
                  alt={currency.name}
                  onClick={() => navigate(`/crypto/${currency.uuid}`)}
                />
              }
            >
              <p>Price: {millify(currency.price)}</p>
              <p>Market Cap: {millify(currency.marketCap)}</p>
              <p>Daily Change: {currency.change && millify(currency.change)}</p>
              <HeartFilled
                className={`cryptocurrencies__heart ${
                  arrUuidFavorite?.includes(currency.uuid) ? 'active' : ''
                }`}
                onClick={() => {
                  data
                    ? handleFavorite(currency.uuid)
                    : arrUuidFavorite?.includes(currency.uuid)
                    ? removeFavorite({ uuidCrypto: currency.uuid })
                    : addFavorite({ uuidCrypto: currency.uuid });
                }}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
