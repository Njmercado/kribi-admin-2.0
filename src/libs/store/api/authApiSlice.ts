import { baseApi } from './baseApi';
import { AuthResponse, Token } from '@/models';
import { PREFIXES } from '@/contants';

export const authApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    logIn: builder.mutation<Token, FormData>({
      query: (formData) => ({
        url: `${PREFIXES.AUTH}/login`,
        method: 'POST',
        body: formData,
      }),
    }),
    logOut: builder.mutation<void, void>({
      query: () => ({
        url: `${PREFIXES.AUTH}/logout`,
        method: 'POST',
      }),
      invalidatesTags: ['Me'],
    }),
    checkAuth: builder.query<AuthResponse, void>({
      query: () => `${PREFIXES.AUTH}/me`,
      providesTags: ['Me'],
    }),
  }),
});

export const {
  useLogInMutation,
  useLogOutMutation,
  useCheckAuthQuery,
  useLazyCheckAuthQuery,
} = authApiSlice;
