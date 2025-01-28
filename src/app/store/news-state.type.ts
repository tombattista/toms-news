import { NewsItem } from "@models/news-item.model";
import { SearchHistoryItem } from "@models/search-history-item.model";
import { SearchItem } from "@models/search-item.model";

export type NewsState = {
    searchQueue: SearchItem[],
    stories: NewsItem[],
    currentQuery: string,
    searchHistory: SearchHistoryItem[]
}