import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Initialize an empty api service that we'll inject endpoints into later as needed
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: 'include',
  }),
  tagTypes: ['Word', 'Article', 'Auth', 'Me'], // Definitions for caching logic
  endpoints: () => ({}), // Endpoints are injected by specific feature slices
});
