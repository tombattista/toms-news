import { TestBed } from '@angular/core/testing';

import { LoaderInterceptor } from './loader-interceptor.service';

describe('LoaderService', () => {
  let service: LoaderInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
