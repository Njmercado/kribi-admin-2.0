'use client'

import CustomFetch from "./custom_fetch";
import { ArticleDTO, IArticle } from "@/models";
import { PREFIXES, API_ENDPOINTS } from "@/contants";

const customFetch = new CustomFetch(PREFIXES.ARTICLE);

export function search(query: string = '') {
  const encodedQuery = encodeURIComponent(query);
  return customFetch.get<Array<ArticleDTO>>({ path: `${API_ENDPOINTS.ARTICLE.SEARCH}${encodedQuery}` });
}

export function update(article: ArticleDTO) {
  return customFetch.put<ArticleDTO>({ path: `/${article.id}`, body: article });
}

export function erase(id: string) {
  return customFetch.del({ path: `/${id}` });
}

export function create(article: IArticle) {
  return customFetch.post<ArticleDTO>({ path: '/', body: article });
}
