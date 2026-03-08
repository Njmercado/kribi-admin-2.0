import { baseApi } from './baseApi';
import { ArticleDTO, IArticle } from '@/models';
import { PREFIXES, API_ENDPOINTS } from '@/contants';

export const articleApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    searchArticles: builder.query<Array<ArticleDTO>, string>({
      query: (searchQuery = '') =>
        `${PREFIXES.ARTICLE}${API_ENDPOINTS.ARTICLE.SEARCH}${encodeURIComponent(searchQuery)}`,
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
