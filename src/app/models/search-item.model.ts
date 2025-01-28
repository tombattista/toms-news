import Utils from "@shared/utils";
import { NewsItem } from "./news-item.model";

export class SearchItem {
    id: string;
    query: string;
    items: NewsItem[];

    // ===================================================
    // SearchItem constructor
    // ---------------------------------------------------
    // Accepts the query test that produced the search 
    //  results, along with the resulting news items.
    // ===================================================
    constructor(query: string, items: NewsItem[]) {
        this.id = Utils.generateId();
        this.query = query;
        this.items = items;
    }
}
