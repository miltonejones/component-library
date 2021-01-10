import { NewsArticleItem } from "./news-article-item";

export interface NewsArticleList {
    status: string;
    totalResults: number;
    articles: NewsArticleItem[];
}
 