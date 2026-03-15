export interface IArticle {
  title: string;
  content: string; // Markdown formatted content
  tags: string[];
  summary: string;
  published: boolean;
  cover: any;
}
