import { configureStore } from '@reduxjs/toolkit';

import { cryptoApi } from '@/services/cryptoApi';
import { cryptoNewsApi } from '@/services/cryptoNewsApi';
import { serverApi } from '@/services/serverApi';
import userSlice from '@/features/userSlice';

export default configureStore({
  reducer: {
    userSlice,
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
    [serverApi.reducerPath]: serverApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(cryptoApi.middleware)
      .concat(cryptoNewsApi.middleware)
      .concat(serverApi.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});
