import { Component, inject, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderService } from '@services/loader.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loader',
  imports: [
    MatProgressSpinnerModule
  ],
  templateUrl: './global-loader.component.html',
  styleUrl: './global-loader.component.scss'
})
export class GlobalLoaderComponent implements OnInit {
  private loaderService = inject(LoaderService);
  loading$!: Observable<boolean>;

  ngOnInit(): void {
    this.loading$ = this.loaderService.loading$;
  }
}
