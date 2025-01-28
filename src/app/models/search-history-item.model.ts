import { NewsItem } from "./news-item.model";
import { SearchItem } from "./search-item.model";

export class SearchHistoryItem extends SearchItem {
    searchTime: number;

    // ===================================================
    // SearchHistoryItem constructor
    // ---------------------------------------------------
    // Accepts the query test that produced the search 
    //  results, along with the first page of results.
    // ===================================================
    constructor(query: string, firstPageResults: NewsItem[]) {
        super(query, firstPageResults);
        this.searchTime = Date.now();
    }

    // ===================================================
    // getAge
    // ---------------------------------------------------
    // Returns: Number of milliseconds elapsed since 
    //  creation of history item.
    // ===================================================
    getAge() {
        return Date.now() - this.searchTime;
    }

    // ===================================================
    // resetAge
    // ---------------------------------------------------
    // Resets number of milliseconds elapsed since 
    //  creation of history item to zero.
    // ===================================================
    resetAge() {
        this.searchTime = Date.now();
    }
}
