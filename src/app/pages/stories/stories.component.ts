import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { LoaderComponent } from '@components/loader/loader.component';
import { NewsStore } from '@store/news.store';
import { MatListModule } from '@angular/material/list'; 
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { NewsService } from '@services/news.service';
import { NewsItem } from '@models/news-item.model';
import Utils from '@shared/utils';
@Component({
  selector: 'app-stories',
  imports: [
    LoaderComponent,  
    MatListModule,
    MatIconModule,
    MatDividerModule,
    MatPaginator
  ],
  templateUrl: './stories.component.html',
  styleUrl: './stories.component.scss'
})
export class StoriesComponent implements AfterViewInit {
  protected newsService = inject(NewsService);
  protected newsStore = inject(NewsStore);
  private fullQuery: string = '';
  private defaultPageSize: number = 10;
  private defaultPageIndex: number = 0;
  pageSize: number = this.defaultPageSize;
  pageIndex: number = this.defaultPageIndex;
  totalStoryCount: number = 0;
  pageStories: NewsItem[] = [];
  currentQuery: string = '';
  isUpdating: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {
    // Observe currentQuery text
    this.newsService.currentQuery$.subscribe((query) => {
      this.fullQuery = query;
      this.currentQuery = this.fullQuery;
    });

    // Observe which query is selected, associated with word count
    this.newsService.selectedQueryWordCount$.subscribe((wordCount) => {
      this.currentQuery = Utils.getWords(this.fullQuery, wordCount);
    });

    
  }

  ngAfterViewInit(): void {
      // Observe whether or not service is loading
      this.newsService.isLoading$.subscribe((isLoading) => {
        // Set values for paginator
        this.totalStoryCount = this.newsStore.stories().length;

        console.log(`pageSize: ${this.pageSize}, pageIndex: ${this.pageIndex}`);
        const startIndex = this.pageIndex * this.pageSize;
        const endIndex = (this.pageIndex + 1) * this.pageSize;
        this.pageStories = this.newsStore.stories().slice(startIndex, endIndex);
        
        this.isUpdating = isLoading;
      });
  }

  onPageEvent(event: PageEvent) {
    if (this.paginator != null) {
      this.pageStories = this.newsStore.stories().slice(this.paginator.pageIndex * this.paginator.pageSize, (this.paginator.pageIndex + 1) * this.paginator.pageSize);
    }
  }
}
