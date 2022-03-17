import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from '@/helpers/cookie';

const baseUrl = 'https://server-cryptocurrency.herokuapp.com';

const serverApiHeaders = {
  Authorization: `Bearer ${getCookie('accessToken')}`,
};

const createRequest = (url) => ({ url, headers: serverApiHeaders });

export const serverApi = createApi({
  reducerPath: 'serverApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
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
      query: () => createRequest(`/favorite`),
      providesTags: ['Server'],
    }),
    addFavorite: builder.mutation({
      query: (body) => ({
        url: `/favorite`,
        headers: serverApiHeaders,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Server'],
    }),
    removeFavorite: builder.mutation({
      query: (body) => ({
        url: `/favorite`,
        headers: serverApiHeaders,
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
