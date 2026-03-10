import { baseApi } from './baseApi';
import { WordDTO, WordSearchDTO, IWord } from '@/models';
import { PREFIXES, API_ENDPOINTS } from '@/contants';

export const wordApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    searchWords: builder.query<WordSearchDTO, { word?: string; limit?: number; page?: number }>({
      query: ({ word = '', limit = 10, page = 1 }) =>
        `${PREFIXES.WORD}${API_ENDPOINTS.WORD.SEARCH}?word=${encodeURIComponent(word)}&limit=${limit}&page=${page}`,
      providesTags: ['Word'],
    }),
    createWord: builder.mutation<WordDTO, IWord>({
      query: (word) => ({
        url: `${PREFIXES.WORD}/`,
        method: 'POST',
        body: word,
      }),
      invalidatesTags: ['Word'],
    }),
    updateWord: builder.mutation<WordDTO, WordDTO>({
      query: (word) => ({
        url: `${PREFIXES.WORD}/${word.id}`,
        method: 'PUT',
        body: word,
      }),
      invalidatesTags: ['Word'],
    }),
    deleteWord: builder.mutation<void, string>({
      query: (id) => ({
        url: `${PREFIXES.WORD}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Word'],
    }),
  }),
});

export const {
  useSearchWordsQuery,
  useCreateWordMutation,
  useUpdateWordMutation,
  useDeleteWordMutation,
} = wordApiSlice;
