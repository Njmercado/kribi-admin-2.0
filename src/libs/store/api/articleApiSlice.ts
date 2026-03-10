import { baseApi } from './baseApi';
import { ArticleDTO, IArticle, ArticleSearchDTO } from '@/models';
import { PREFIXES, API_ENDPOINTS } from '@/contants';

export const articleApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    searchArticles: builder.query<ArticleSearchDTO, { value: string; limit?: number; page?: number }>({
      query: ({ value = '', limit = 10, page = 1 }) =>
        `${PREFIXES.ARTICLE}${API_ENDPOINTS.ARTICLE.SEARCH}?value=${encodeURIComponent(value)}&limit=${limit}&page=${page}`,
      providesTags: ['Article'],
    }),
    createArticle: builder.mutation<ArticleDTO, IArticle>({
      query: (article) => ({
        url: `${PREFIXES.ARTICLE}/`,
        method: 'POST',
        body: article,
      }),
      invalidatesTags: ['Article'],
    }),
    updateArticle: builder.mutation<ArticleDTO, ArticleDTO>({
      query: (article) => ({
        url: `${PREFIXES.ARTICLE}/${article.id}`,
        method: 'PUT',
        body: article,
      }),
      invalidatesTags: ['Article'],
    }),
    deleteArticle: builder.mutation<void, string>({
      query: (id) => ({
        url: `${PREFIXES.ARTICLE}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Article'],
    }),
  }),
});

export const {
  useSearchArticlesQuery,
  useCreateArticleMutation,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
} = articleApiSlice;
