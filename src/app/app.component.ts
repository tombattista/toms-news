import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchPanelComponent } from './components/search-panel/search-panel.component';
import { StoriesComponent } from './pages/stories/stories.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NewsStore } from '@store/news.store';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    StoriesComponent,
    SearchPanelComponent,
    MatSidenavModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = "Tom's News";
  newsStore = inject(NewsStore);
}
