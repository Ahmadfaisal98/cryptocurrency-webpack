import { Card, Col, Input, Row, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { useNavigate } from 'react-router-dom';
import { HeartFilled } from '@ant-design/icons';
import {
  useRemoveFavoriteMutation,
  useGetFavoritesQuery,
} from '@/services/serverApi';
import { useGetCryptosQuery } from '@/services/cryptoApi';

const { Title } = Typography;

const Favorite = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cryptos, setCryptos] = useState([]);
  const [removeFavorite] = useRemoveFavoriteMutation();
  const { data: cryptosList } = useGetCryptosQuery(100);
  const { data: uuidFavorite } = useGetFavoritesQuery();
  const navigate = useNavigate();

  // const favorites = useSelector((state) => state.userSlice.favorite);

  const arrUuidFavorite = uuidFavorite?.favorite.map((fav) => fav.uuidCrypto);

  const favorites = cryptosList?.data.coins.filter((coin) => {
    return arrUuidFavorite?.includes(coin.uuid);
  });

  useEffect(() => {
    const filteredData = favorites?.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCryptos(filteredData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uuidFavorite, searchTerm]);

  const handleFavorite = (uuidCrypto) => {
    // dispatch(removeFavorite(currency));
    removeFavorite({ uuidCrypto });
  };

  return (
    <>
      <Title className="heading" level={2}>
        Favorite
      </Title>
      <div className="cryptocurrencies__search">
        <Input
          placeholder="Search Cryptocurrency"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Row gutter={[32, 32]} className="cryptocurrencies">
        {cryptos?.map((currency, index) => (
          <Col
            xs={24}
            sm={12}
            lg={6}
            className="cryptocurrencies__card"
            key={index}
          >
            <Card
              title={`${currency.rank}. ${currency.name}`}
              hoverable
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
              <p>Daily Change: {millify(currency.change)}</p>
              <HeartFilled
                className="cryptocurrencies__heart active"
                onClick={() => handleFavorite(currency.uuid)}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Favorite;
