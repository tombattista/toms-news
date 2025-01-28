import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, max, Observable } from 'rxjs';
import { environment } from '@env/environment';
import { SearchItem } from '@models/search-item.model';
import Utils from '@shared/utils';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private http = inject(HttpClient);
  private envId: string = '';
  private apiUrl: string = '';
  private maxWordCount: number = 1;

  private currentQuerySubject: BehaviorSubject<string> = new BehaviorSubject<string>("");
  currentQuery$: Observable<string> = this.currentQuerySubject.asObservable();

  private selectedQueryWordCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  selectedQueryWordCount$: Observable<number> = this.selectedQueryWordCountSubject.asObservable();
  
  private isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();

  constructor() {
    this.envId = environment.env;
    this.apiUrl = environment.apiUrl;
    this.maxWordCount = environment.maxSearchWords;
  }

  // ===================================================
  // getStoriesFromQuery
  // ---------------------------------------------------
  // Returns: Array of search items, categorically 
  //  separated by combinations of words found in the
  //  query text.
  // ===================================================
  getStoriesFromQuery(query: string) : Observable<SearchItem[]> {
    const inputQuery = Utils.getWords(query, this.maxWordCount);
    this.currentQuerySubject.next(inputQuery);
    this.selectedQueryWordCountSubject.next(inputQuery.split(" ").length);

    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('projectid', this.envId);
    let params = new HttpParams()
      .set("query", inputQuery)
    return this.http.get<SearchItem[]>(this.apiUrl + "/" + "search", { headers: headers, params: params });
  }

  // ===================================================
  // clearCurrentQuery
  // ---------------------------------------------------
  // Clears current query.
  // ===================================================
  clearCurrentQuery() {
    this.currentQuerySubject.next("");
    this.selectedQueryWordCountSubject.next(0);
  }

  // ===================================================
  // setSelectedQueryWordCount
  // ---------------------------------------------------
  // Sets query selection to specified number of words.
  // ===================================================
  setSelectedQueryWordCount(selectedQueryWords: number) {
    this.currentQuery$.subscribe((query) => {
      if (query.length) {
        this.selectedQueryWordCountSubject.next(Math.min(selectedQueryWords, query.split(" ").length));
      }
    })
  }

  // ===================================================
  // getSelectedQueryWords
  // ---------------------------------------------------
  // Gets selected word count.
  // ===================================================
  getSelectedQueryWordCount() {
    this.selectedQueryWordCount$.subscribe((wordCount) => {
      return wordCount;
    });
  }

  // ===================================================
  // getMaxWordCount
  // ---------------------------------------------------
  // Gets maximum word count.
  // ===================================================
  getMaxWordCount() {
    return this.maxWordCount;
  }

  // ===================================================
  // setSelectedQueryWordCount
  // ---------------------------------------------------
  // Sets query selection to specified number of words.
  // ===================================================
  setLoadingStatus(isLoading: boolean) {
    this.isLoadingSubject.next(isLoading);
  }
}
