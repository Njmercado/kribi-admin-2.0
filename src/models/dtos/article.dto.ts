import { IArticle } from "../interfaces/article.interface";

export interface ArticleDTO extends IArticle {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface ArticleSearchDTO {
  articles: Array<ArticleDTO>,
  has_next_page: boolean
}