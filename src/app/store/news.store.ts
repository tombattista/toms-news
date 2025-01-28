import { computed, inject } from "@angular/core";
import { of } from 'rxjs';
import { SearchHistoryItem } from "@models/search-history-item.model";
import { patchState, signalStore, withComputed, withMethods, withProps, withState } from "@ngrx/signals";
import { NewsService } from "@services/news.service";
import { initialNewsState } from '@store/initial-news-state';
import { SearchItem } from "@models/search-item.model";

export const NewsStore = signalStore(
    { providedIn: 'root' },
    withState(initialNewsState),
    withMethods((store, newsService = inject(NewsService)) => ({
        // loadSearchResults:
        // Calls the news service to get search results.
        loadSearchResults(query: string) : Promise<string[]> {
            patchState(store, () => ({
                currentQuery: "",
                searchQueue: []
            }));
            newsService.setLoadingStatus(true);
            newsService.getStoriesFromQuery(query).subscribe((result) => {
                //console.log(result);
                patchState(store, () => ({
                    currentQuery: query,
                    searchQueue: result
                }));
                newsService.setLoadingStatus(false);
            });
            
            return new Promise((resolve) => {
                of(store.searchQueue()).subscribe((data) => {
                    resolve(data.map((item) => item.id))
                })
            });
        },
        // loadStories:
        // loads stories into the store from the search results.
        loadStories(searchId: string) {
            newsService.setLoadingStatus(true);
            const storiesToLoad: SearchItem | undefined = store.searchQueue().find(searchItem => searchItem.id == searchId);
            if (storiesToLoad == undefined) {
                return;
            }

            newsService.setSelectedQueryWordCount(storiesToLoad.query.split(" ").length);
            if (storiesToLoad != undefined) {
                patchState(store, () => ({
                    stories: storiesToLoad.items
                }));
            }
            newsService.setLoadingStatus(false);
        },
        // clearStories:
        // Clears current search and removes all stories from the store.
        clearSearch() {
            newsService.clearCurrentQuery();
            patchState(store, () => ({
                stories: []
            }));
        },
        // setCurrentPage:
        // Sets current stories page to the specified index.
        setCurrentPage(currentPage: number, pageSize: number) {
            const fromIndex = (currentPage - 1) * pageSize;
            const toIndex = currentPage * pageSize - 1;
            const newHistoryItem: SearchHistoryItem = new SearchHistoryItem(
                store.currentQuery(), 
                store.stories().slice(fromIndex - 1, toIndex));

            // Save current stories to history
            patchState(store, (state) => ({
                searchHistory: [...state.searchHistory, newHistoryItem]
            }));
        }
    })),
    withProps(({ currentQuery }) => ({
        currentQuery$: of(currentQuery),
    }))
);