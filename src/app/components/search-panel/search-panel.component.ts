import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list'; 
import { NewsService } from '@services/news.service';
import Utils from '@shared/utils';
import { NewsStore } from '@store/news.store';

@Component({
  selector: 'app-search-panel',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatListModule
  ],
  templateUrl: './search-panel.component.html',
  styleUrl: './search-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchPanelComponent {
  newsService = inject (NewsService);
  newsStore = inject(NewsStore);
  query: string = '';
  selectedSearchId: string = '';

  // ===================================================
  // searchStories
  // ---------------------------------------------------
  // Calls NewsService to load stories from the news API.
  // ===================================================
  searchStories(event: Event) : void {
    this.newsStore.clearSearch();
    this.query = Utils.sanitizeInput(this.query);
    this.newsStore.loadSearchResults(this.query).then((storyIds: string[]) => {
      setTimeout(() => {
        this.loadSelectedStories(event, null);
      }, 10);
    });
  }

  // ===================================================
  // loadSelectedStories
  // ---------------------------------------------------
  // Loads the stories selected by the user into the 
  //  stories view on the page.
  // ===================================================
  loadSelectedStories(event: Event, selectedSearchId: string | null) : void {
    event.preventDefault();
    if (selectedSearchId != null) {
      this.selectedSearchId = selectedSearchId;
    }
    else {
      this.newsService.currentQuery$.subscribe((query) => {
        let searchId: string | undefined = this.newsStore.searchQueue().find((item) => item.query == query)?.id;
        this.selectedSearchId = searchId != undefined ? searchId : '';
      });
    }
    
    if (this.selectedSearchId.length) {
      this.newsStore.loadStories(this.selectedSearchId);
    }
  }
}
