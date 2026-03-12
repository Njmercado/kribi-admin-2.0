import { baseApi } from './baseApi';
import { UserDTO, UserUpdateDTO, UserSearchDTO, UserSearchResponseDTO } from '@/models';
import { PREFIXES, API_ENDPOINTS } from '@/contants';

export const userApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    searchUser: builder.query<UserSearchResponseDTO, UserSearchDTO>({
      query: ({ value, page, limit }) =>
        `${PREFIXES.USER}${API_ENDPOINTS.USER.BY_NAME}?value=${encodeURIComponent(value)}&page=${page}&limit=${limit}`,
      providesTags: ['User'],
    }),
    restoreUser: builder.mutation<UserDTO, string | number>({
      query: (id) => ({
        url: `${PREFIXES.USER}${API_ENDPOINTS.USER.RESTORE}/${id}`,
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),
    deleteUser: builder.mutation<void, string | number>({
      query: (id) => ({
        url: `${PREFIXES.USER}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
    updateUser: builder.mutation<UserDTO, UserUpdateDTO>({
      query: (user) => ({
        url: `${PREFIXES.USER}/`,
        method: 'PUT',
        body: user,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useLazySearchUserQuery,
  useRestoreUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = userApiSlice;
