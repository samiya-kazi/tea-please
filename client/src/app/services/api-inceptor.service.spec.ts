import { TestBed } from '@angular/core/testing';

import { ApiInceptorService } from './api-inceptor.service';

describe('ApiInceptorService', () => {
  let service: ApiInceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiInceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
