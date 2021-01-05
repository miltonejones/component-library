import { NewsArticle } from "./news-article";

export interface NewsResponse {
    articles: NewsArticle[];
    status: string;
    totalResults: number
  } 