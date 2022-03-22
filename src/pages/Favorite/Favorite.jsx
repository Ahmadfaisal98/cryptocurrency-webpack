import React from 'react';
import { useSelector } from 'react-redux';

import { Typography } from 'antd';
import {
  useRemoveFavoriteMutation,
  useGetFavoritesQuery,
} from '@/services/serverApi';
import { useGetCryptosQuery } from '@/services/cryptoApi';
import { Cryptocurrencies } from '@/pages';

const { Title } = Typography;

const Favorite = () => {
  const [removeFavorite] = useRemoveFavoriteMutation();
  const { data: cryptosList } = useGetCryptosQuery(100);
  const { data: uuidFavorite } = useGetFavoritesQuery();
  const isLogin = useSelector((state) => state.userSlice.isLogin);

  // const favorites = useSelector((state) => state.userSlice.favorite);

  const arrUuidFavorite = uuidFavorite?.favorite.map((fav) => fav.uuidCrypto);

  let favorites = cryptosList?.data.coins.filter((coin) => {
    return arrUuidFavorite?.includes(coin.uuid);
  });

  if (!isLogin) {
    favorites = [];
  }

  const handleFavorite = (uuidCrypto) => {
    // dispatch(removeFavorite(currency));
    removeFavorite({ uuidCrypto });
  };

  return (
    <>
      <Title className="heading" level={2}>
        Favorite
      </Title>
      <Cryptocurrencies
        data={favorites}
        handleFavorite={handleFavorite}
        uuidFavorite={uuidFavorite}
      />
    </>
  );
};

export default Favorite;
