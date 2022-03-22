import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from '@/helpers/cookie';

export const serverApi = createApi({
  reducerPath: 'serverApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://server-cryptocurrency.herokuapp.com',
    prepareHeaders: (headers) => {
      const token = getCookie('accessToken');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Server'],
  endpoints: (builder) => ({
    postLogin: builder.mutation({
      query: (body) => ({
        url: `user/login`,
        method: 'POST',
        body,
      }),
    }),
    getFavorites: builder.query({
      query: () => ({ url: `/favorite` }),
      providesTags: ['Server'],
    }),
    addFavorite: builder.mutation({
      query: (body) => ({
        url: `/favorite`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Server'],
    }),
    removeFavorite: builder.mutation({
      query: (body) => ({
        url: `/favorite`,
        method: 'DELETE',
        body,
      }),
      invalidatesTags: ['Server'],
    }),
  }),
});

export const {
  usePostLoginMutation,
  useGetFavoritesQuery,
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
} = serverApi;
