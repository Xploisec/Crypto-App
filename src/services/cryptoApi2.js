import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';




export const cryptoApi2 = createApi({
  reducerPath: 'cryptoApi2',
  baseQuery: fetchBaseQuery({ baseUrl:"https://api.coingecko.com/api/v3"}),
  endpoints: (builder) => ({
    getCryptos2: builder.query({
      query: () => "/search/trending"
    }),
     getCryptoDetails2: builder.query({
         query: (coinId2) => `/coins/${coinId2}`
     }) ,
 
  }),
});

export const { useGetCryptos2Query, useGetCryptoDetails2Query} = cryptoApi2;